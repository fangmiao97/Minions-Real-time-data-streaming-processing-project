import React, { Component} from 'react';
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
import { Card } from 'antd';
import axios from "axios";
import Utils from "../../utils/axiospath";

/**
 * 音乐类型统计-南丁格尔玫瑰花环
 */
class GenreInfoRose extends Component{

    constructor(props) {
        super(props);
        this.state = {
            date: this.props.date,
            data: []
        }
    }

    getSongGenreData(date) {
        let _this = this;
        axios.get(Utils.defaultURIdefaultURI + "/getSongGenreData",{
            params:{
                date: date
            }
        }).then(function (response) {
            _this.setState({
                data: response.data
            })
        })
    }

    componentWillMount() {
        this.getSongGenreData(this.state.date)
    }

    componentDidMount() {
        this.timer = setInterval(
            () => {
                this.getSongGenreData(this.state.date)
            },
            10000
        )
    }

    render() {
        return (
            <div style={{marginLeft:'16px', marginTop:'16px'}}>
                <Card title={"播放音乐类型统计-南丁格尔玫瑰花环"}>
                    <Chart height={400} data={this.state.data}  forceFit padding={"auto"}>
                        <Coord type="polar" innerRadius={0.2} />
                        <Tooltip />
                        <Legend
                            position="bottom"
                        />
                        <Geom
                            type="interval"
                            color={['genre',['#44cb73','#f0637b','#985fe5', '#4dc9cc', '#fcd347', '#43a1ff', '#fe2d55']]}
                            position="genre*count"
                            style={{
                                lineWidth: 1,
                                stroke: "#fff"
                            }}
                        />
                    </Chart>
                </Card>

            </div>
        );
    }
}

export default GenreInfoRose;