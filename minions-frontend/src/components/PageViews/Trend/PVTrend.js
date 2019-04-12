import React, {Component} from 'react';
import {ChartCard, MiniArea, TimelineChart} from 'ant-design-pro/lib/Charts';
import axios from 'axios';
import Utils from "../../../utils/axiospath"

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

    componentDidMount() {
        this.timer = setInterval(
            () => {
                this.getPVTrend(this.state.date)
            },
            600000
        )
    }


    render() {
        return (//TODO...用Bizcharts做图标
            <div style={{ marginLeft:'8px', marginTop:'8px'}}>
                <ChartCard title="今日PV走势">
                    <MiniArea height={80}
                              line
                              color="#FEDFE4"
                              borderColor="#FE2D55"
                              animate={true}
                              data={this.state.Trend}/>
                </ChartCard>
            </div>
        );
    }
}

export default PVTrend;