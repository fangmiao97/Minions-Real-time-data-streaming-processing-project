import React, { Component } from 'react';
import {
    G2,
    Chart,
    Geom,
    Axis,
    Tooltip,
    Coord,
    Label,
    Legend,
    View,
    Guide,
    Shape,
    Facet,
    Util
} from "bizcharts";
import DataSet from "@antv/data-set";
import { Card } from 'antd';
import axios from "axios";
import Utils from "../../../utils/axiospath";

/**
 * 各类目PV趋势
 */
class CategoriesPVTrend extends Component{

    constructor(props) {
        super(props);
        this.state = {
            date: this.props.date,
            data :[]
        }
    }

    getCategoriesPVTrend(date) {
        let _this = this;
        axios.get(Utils.defaultURIdefaultURI + "/getCategoriesPVTrend",{
            params: {
                date: date
            }
        }).then(function (reponse) {

            _this.setState({
                data: reponse.data
            })
        })
    }

    componentWillMount() {
        this.getCategoriesPVTrend(this.state.date)
    }

    componentWillReceiveProps(nextProps) {
        if(this.state.date !== nextProps.date) {
            this.setState({
                date: nextProps.date
            },() => {
                this.getCategoriesPVTrend(nextProps.date)
            })
        }
    }

    componentDidMount() {
        this.timer = setInterval(
            () => {
                this.getCategoriesPVTrend(this.state.date)
            },
            1800000
        )
    }


    render() {
        var dv = new DataSet.View().source(this.state.data);
        dv.transform({
            type: "fold",
            fields: ["新近发布", "为你推荐", "今日歌单", "瞩目艺人", "今日专辑", "最近播放"],
            key: "type",
            value: "value"
        });
        return (
            <div style={{marginLeft:'8px', marginTop:'8px'}}>
                <Card title={"各类目访问趋势"}>
                    <Chart
                        height={400}
                        data={dv}
                        padding={"auto"}
                        forceFit
                    >
                        <Tooltip crosshairs />
                        <Axis />
                        <Legend />
                        <Geom type="area" position="time*value" color={['type',['#43a1ff','#4dc9cc','#44cb73','#fcd347','#f0637b','#985fe5']]} shape="smooth" />
                        <Geom
                            type="line"
                            position="time*value"
                            color={['type',['#43a1ff','#4dc9cc','#44cb73','#fcd347','#f0637b','#985fe5']]}
                            shape="smooth"
                            size={1}
                        />
                    </Chart>
                </Card>
            </div>
        );
    }
}
export default CategoriesPVTrend;