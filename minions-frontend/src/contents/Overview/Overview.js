import React, { Component } from 'react';
import { Row, Col, Icon, Tooltip } from 'antd';
import 'ant-design-pro/dist/ant-design-pro.css';
import PVChartCard from "../../components/PageViews/ChartCard/ChartCard";
import moment from "moment";
import ClickCountPie from "../../components/ClickCountStatistics/ClickCountPie";

/**
 * Overview页布局
 */


const today = moment().format('YYYYMMDD');

class Overview extends Component{

    constructor(props) {
        super(props);

        this.state = {
            date: today,
        }
    }

    render() {
        return(
            <div>
            <Row>
                <Col span={6}>
                    <ClickCountPie date={this.state.date}/>

                </Col>
                <Col span={6}>
                    <PVChartCard date={this.state.date}/>
                </Col>
            </Row>
            </div>
        );
    }
}

export default Overview;