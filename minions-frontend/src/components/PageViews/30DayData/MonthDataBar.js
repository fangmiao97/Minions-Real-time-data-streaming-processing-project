import React, {Component} from 'react';
import { ChartCard, Bar } from 'ant-design-pro/lib/Charts';
import axios from 'axios';
import Utils from "../../../utils/axiospath"

/**
 * 30天pv柱状图
 */
class MonthDataBar extends Component{

    constructor(props) {
        super(props);
        this.state = {
            date: this.props.date,
            data:[]
        }
    }

    getMonthPVDate(date) {
        let _this = this;
        axios.get(Utils.defaultURIdefaultURI+"/getMonthPVDate",{
            params: {
                date:date
            }
        }).then(function (response) {
            _this.setState({
                data: response.data
            })
        })
    }

    componentWillMount() {
        this.getMonthPVDate(this.state.date)
    }

    componentWillReceiveProps(nextProps) {
        if(this.state.date !== nextProps.date) {
            this.setState({
                date:nextProps.date
            },() => {
                this.getMonthPVDate(this.state.date)
            })
        }
    }

    componentDidMount() {
        this.timer = setInterval(
            () => {
                this.getMonthPVDate(this.state.date)
            },
            60000
        )
    }


    render() {
        return (
            <div style={{ marginLeft:'8px', marginTop:'8px'}}>
                <ChartCard title="月PV数据统计">
                    <Bar
                        height={200}
                        data={this.state.data}
                        color='#fe2d55'
                    />
                </ChartCard>
            </div>
        );
    }
}

export default MonthDataBar;