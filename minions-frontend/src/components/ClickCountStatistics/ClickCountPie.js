import React, { Component } from 'react';
import { Pie, yuan } from 'ant-design-pro/lib/Charts';
import { Card } from 'antd'
import 'ant-design-pro/dist/ant-design-pro.css';
import axios from 'axios';
import Utils from "../../utils/axiospath"

class ClickCountPie extends Component{

    constructor(props) {
        super(props);

        this.state = {

            date:this.props.date,
            salesPieData:[]
        }
    }

    getHistorySalesData(date){
        let _this = this;

        axios.get(Utils.defaultURIdefaultURI+"/getClickData",{
            params:{
                date: date
            }
        })
            .then(function (response) {
                _this.setState({
                    salesPieData: response.data
                });
                console.log(response.data)
            })
    }

    componentWillReceiveProps(nextProps) {
        if(this.state.date !== nextProps.date) {
            this.setState({
                date:nextProps.date
            },() => {
                this.getHistorySalesData(nextProps.date)
            })
        }
    }

    componentWillMount() {
        this.getHistorySalesData(this.state.date)
    }

    componentDidMount() {
        this.timer = setInterval(
            () => {
                this.getHistorySalesData(this.state.date)
            },
            60000
        );
    }


    render() {
        return(
            <div style={{ marginLeft:'8px', marginTop:'8px'}}>
                <Card
                    title="各类目访问统计"
                    style={{ borderRadius:'4px 4px 4px 4px'}}
                >
                    <Pie
                        hasLegend = {true}
                        title="访问量"
                        subTitle="访问量"
                        total={() => (
                            <span
                                dangerouslySetInnerHTML={{
                                    __html: this.state.salesPieData.reduce((pre, now) => now.y + pre, 0)
                                }}
                            />
                        )}
                        data={this.state.salesPieData}
                        valueFormat={val => <span dangerouslySetInnerHTML={{ __html: val }} />}
                        height={294}
                    />

                </Card>
            </div>
        );
    }

}

export default ClickCountPie;