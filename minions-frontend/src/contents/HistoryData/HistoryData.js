import React, { Component } from 'react';
import { Row, Col, Icon, Tooltip, Card } from 'antd';
import { DatePicker } from 'antd';
import moment from 'moment';
import 'ant-design-pro/dist/ant-design-pro.css';
import PVChartCard from "../../components/PageViews/ChartCard/ChartCard";
import ItemSalesPie from "../../components/ItmesSalesStatistics/Pie";
import HistorySalesPie from "../../components/ItmesSalesStatistics/HistorySalesPie";

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
                    >
                    <DatePicker defaultValue={moment(this.state.date)} format={dateFormat} onChange={this.dateChange.bind(this)} allowClear={false}/>
                    </Card>
                </Row>
                <Row style={{ marginTop:'16px'}}>
                    <Col span={6}>
                        <HistorySalesPie date={this.state.selectedDate}/>

                    </Col>
                    <Col span={6} offset={1}>
                        <PVChartCard/>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default HistoryData;