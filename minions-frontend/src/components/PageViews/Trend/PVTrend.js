import React, {Component} from 'react';
import {ChartCard, MiniArea, TimelineChart} from 'ant-design-pro/lib/Charts';
import axios from 'axios';
import Utils from "../../../utils/axiospath";
import {
    Chart,
    Geom,
    Axis,
    Tooltip,
} from "bizcharts";


/**
 * 30分钟页面浏览趋势
 */
class PVTrend extends Component{

    constructor(props) {
        super(props);

        this.state = {
            date: this.props.date,
            Trend:[]
        }
    }

    getPVTrend(date) {
        let _this = this;
        axios.get(Utils.defaultURIdefaultURI + "/getPVTrend",{
            params: {
                date: date
            }
        }).then(function (reponse) {

            _this.setState({
                Trend: reponse.data
            })
        })
    }

    componentWillMount() {
        this.getPVTrend(this.state.date)
    }

    componentWillReceiveProps(nextProps) {
        if(this.state.date !== nextProps.date) {
            this.setState({
                date: nextProps.date
            },() => {
                this.getPVTrend(nextProps.date)
            })
        }
    }

    componentDidMount() {
        this.timer = setInterval(
            () => {
                this.getPVTrend(this.state.date)
            },
            1800000
        )
    }

    render() {

        const cols = {
            x: {
                alias: "每30分钟窗口"
            },
            y: {
               alias:"访问量"
            }
        }


        return (
            <div style={{ marginLeft:'8px', marginTop:'8px'}}>
                <ChartCard title={"今日实时PV走势"}>
                    <Chart height={300} data={this.state.Trend} scale={cols} forceFit padding={"auto"}>
                        <Axis
                            name="x"
                            title
                            tickLine={{
                                lineWidth: 1, // 刻度线宽
                                stroke: '#ccc', // 刻度线的颜色
                                length: 4,
                            }}
                            line={{
                                stroke: "#E6E6E6"
                            }}
                            label={{
                                rotate:30
                            }}
                        />
                        <Axis
                            name="y"
                            line={false}
                            tickLine={null}
                            grid={null}
                            title={null}
                        />
                        <Tooltip />
                        <Geom
                            type="line"
                            position="x*y"
                            size={1}
                            color="l (270) 0:rgba(255, 146, 255, 1) .5:rgba(100, 268, 255, 1) 1:rgba(215, 0, 255, 1)"
                            shape="smooth"
                            style={{
                                shadowColor: "l (270) 0:rgba(21, 146, 255, 0)",
                                shadowBlur: 60,
                                shadowOffsetY: 6
                            }}
                        />
                    </Chart>
                </ChartCard>
            </div>
        );
    }
}

export default PVTrend;