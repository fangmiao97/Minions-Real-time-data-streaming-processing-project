import React, { Component} from 'react';
import {ChartCard, Field, MiniArea }from 'ant-design-pro/lib/Charts';
import moment from 'moment';
import axios from 'axios';
import Utils from "../../../utils/axiospath"

const beginDay = new Date().getTime();

/**
 * 7日PV访问量走势
 */
class SevenDaysPVMiniArea extends Component{

    constructor(props) {
        super(props);

        this.state = {

            date: this.props.date,
            SevenDayData:[]
        }
    }

    get7daysPVData(date) {
        let _this = this;
        axios.get(Utils.defaultURIdefaultURI+"/getSevenDaysPVDate",{
            params: {
                date:date
            }
        }).then(function (response) {
            _this.setState({
                SevenDayData: response.data
            })
        })
    }

    componentWillMount() {
        this.get7daysPVData(this.state.date)
    }

    componentDidMount() {
        this.timer = setInterval(
            () => {
                this.get7daysPVData(this.state.date)
            },
            60000
        )
    }

    render() {
        return (
            <div style={{ marginLeft:'8px', marginTop:'8px'}}>
                <ChartCard title="7日PV数据走势">
                    <MiniArea height={80}
                              line
                              color="#FEDFE4"
                              borderColor="#FE2D55"
                              animate={true}
                              data={this.state.SevenDayData}/>
                </ChartCard>
            </div>
        );
    }
}

export default SevenDaysPVMiniArea;