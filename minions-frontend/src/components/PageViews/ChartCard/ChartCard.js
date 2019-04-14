import React, { Component } from 'react';
import { Icon, Tooltip } from 'antd';
import 'ant-design-pro/dist/ant-design-pro.css';
import { ChartCard, yuan, Field } from 'ant-design-pro/lib/Charts';
import Trend from 'ant-design-pro/lib/Trend';
import numeral from 'numeral';
import axios from 'axios';
import Utils from "../../../utils/axiospath"

class PVChartCard extends Component{


    constructor(props) {
        super(props);

        this.state = {

            date: this.props.date,
            total: 0,
            wow: 0,//周同比 week over week
            dod: 0,//日环比 day over day
            average: 0//均值
        }
    }

    getPVByDate(date) {

        let _this = this;

        axios.get(Utils.defaultURIdefaultURI+"/getPVData", {
            params:{
                date: date
            }
        }).then(function (response) {
            _this.setState({
                total:response.data
            });
            console.log(response.data)
        })
    }

    getCompData(date) {
        let _this = this;

        axios.get(Utils.defaultURIdefaultURI + "/getCompData", {
            params: {
                date: date
            }
        }).then(function (response) {
            _this.setState({
                wow: response.data.wow,
                dod: response.data.dod,
                average: response.data.average
            });
            console.log(response.data)
        })
    }

    componentWillMount() {
        this.getPVByDate(this.state.date)
        this.getCompData(this.state.date)
    }

    componentWillReceiveProps(nextProps) {
        if(this.state.date !== nextProps.date) {
            this.setState({
                date:nextProps.date
            },() => {
                this.getPVByDate(nextProps.date)
                this.getCompData(this.state.date)
            })
        }
    }

    componentDidMount() {
        this.timer = setInterval(
            () => {
                this.getPVByDate(this.state.date)
                this.getCompData(this.state.date)
            },
            60000
        );
    }



    render() {

        return(
            <div style={{ marginLeft:'8px', marginTop:'8px'}}>
                <ChartCard
                    title="PV统计"
                    action={
                      <Tooltip title="页面浏览总量">
                          <Icon type="info-circle-o" />
                       </Tooltip>
                    }
                     total={this.state.total}
                     footer={
                        <Field label="日均Page View" value={numeral(this.state.average).format("0,0")} />
                     }
                    contentHeight={46}
                    style={{ borderRadius:'4px 4px 4px 4px'}}>
                    <span>
                        周同比
                        <Trend flag="up" style={{ marginLeft: 8, color: "rgba(0,0,0,.85)" }}>
                            {this.state.wow}%
                        </Trend>
                    </span>
                    <span style={{ marginLeft: 16 }}>
                        日环比
                        <Trend
                            flag="down"
                            style={{ marginLeft: 8, color: "rgba(0,0,0,.85)" }}
                        >
                            {this.state.dod}%
                        </Trend>
                    </span>
                </ChartCard>
            </div>
        );
    }
}

export default PVChartCard;

