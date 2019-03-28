import React, { Component } from 'react';
import { Pie, yuan } from 'ant-design-pro/lib/Charts';
import { Card } from 'antd'
import 'ant-design-pro/dist/ant-design-pro.css';
import axios from 'axios';

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

        axios.get("http://localhost:8080/getClickData",{
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


    render() {
        return(
            <div style={{ marginLeft:'32px', marginTop:'32px'}}>
                <Card
                    title="TEST课程销售量统计"
                    style={{ borderRadius:'4px 4px 4px 4px',
                            boxShadow:'0px 0px 5px #cfcfcf'}}
                >
                    <p
                        style={{
                            fontSize: 14,
                            color: 'rgba(0, 0, 0, 0.85)',
                            marginBottom: 16,
                            fontWeight: 500,
                        }}>
                        课程销售量统计
                    </p>
                    <Pie
                        hasLegend = {true}
                        title="销售量"
                        subTitle="销售量"
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