import React, { Component } from 'react';
import { Row, Col, Icon, Tooltip } from 'antd';
import 'ant-design-pro/dist/ant-design-pro.css';
import PVChartCard from "../../components/PageViews/ChartCard/ChartCard";
import moment from "moment";
import ClickCountPie from "../../components/ClickCountStatistics/ClickCountPie";
import TopReferWebList from "../../components/ReferenceStatistics/TopReferWebList";
import OverviewTitle from "../../components/Titles/OverviewTitle";
import SevenDaysPVMiniArea from "../../components/PageViews/7DayData/MiniArea";

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
                    <OverviewTitle/>
                </Row>
            <Row>
                <Col span={8}>
                    <ClickCountPie date={this.state.date}/>

                </Col>
                <Col span={8}>
                    <PVChartCard date={this.state.date}/>
                    <SevenDaysPVMiniArea date={this.state.date}/>

                </Col>
                <Col span={8}>
                    <TopReferWebList date={this.state.date}/>
                </Col>
            </Row>
            </div>
        );
    }
}

export default Overview;