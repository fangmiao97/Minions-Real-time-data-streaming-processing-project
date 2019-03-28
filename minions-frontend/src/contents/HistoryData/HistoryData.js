import React, { Component } from 'react';
import { Row, Col, Icon, Tooltip, Card } from 'antd';
import { DatePicker } from 'antd';
import moment from 'moment';
import 'ant-design-pro/dist/ant-design-pro.css';
import PVChartCard from "../../components/PageViews/ChartCard/ChartCard";
import ClickCountPie from "../../components/ClickCountStatistics/ClickCountPie";

/**
 * HistoryData页布局
 */

const dateFormat = 'YYYYMMDD';

const today = moment().format('YYYYMMDD');


class HistoryData extends Component{

    constructor(props) {
        super(props);

        this.state = {
            selectedDate: today,
        }
    }

    dateChange(date, dateString) {

        let  _this = this;
        _this.setState({
            selectedDate: dateString
        })
        console.log("now:" , _this.state.selectedDate)

    }

    render() {
        return(
            <div>
                <Row>
                    <Card
                        title="选择查看时间"
                        style={{ borderRadius:'4px 4px 4px 4px',
                            boxShadow:'0px 0px 5px #cfcfcf'}}
                    >
                    <DatePicker defaultValue={moment(this.state.date)} format={dateFormat} onChange={this.dateChange.bind(this)} allowClear={false}/>
                    </Card>
                </Row>
                <Row style={{ marginTop:'32px'}}>
                    <Col span={6}>
                        <ClickCountPie date={this.state.selectedDate}/>

                    </Col>
                    <Col span={6}>
                        <PVChartCard date={this.state.selectedDate}/>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default HistoryData;