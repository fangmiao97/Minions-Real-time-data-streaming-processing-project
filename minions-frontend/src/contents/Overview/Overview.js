import React, { Component } from 'react';
import { Row, Col, Icon, Tooltip } from 'antd';
import 'ant-design-pro/dist/ant-design-pro.css';
import PVChartCard from "../../components/PageViews/ChartCard/ChartCard";
import moment from "moment";
import ClickCountPie from "../../components/ClickCountStatistics/ClickCountPie";
import TopReferWebList from "../../components/ReferenceStatistics/TopReferWebList";
import OverviewTitle from "../../components/Titles/OverviewTitle";
import SevenDaysPVMiniArea from "../../components/PageViews/7DayData/MiniArea";
import PVTrend from "../../components/PageViews/Trend/PVTrend";
import CategoriesPVTrend from "../../components/PageViews/Trend/CategoriesPVTrend";
import TodayHitSearchWordsCloud from "../../components/ReferenceStatistics/TodayHitSearchWordsCloud";

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
                        <PVChartCard date={this.state.date}/>
                        <SevenDaysPVMiniArea date={this.state.date}/>
                        <PVTrend date={this.state.date}/>
                    </Col>
                    <Col span={8}>
                        <ClickCountPie date={this.state.date}/>
                        <CategoriesPVTrend date={this.state.date}/>
                    </Col>
                    <Col span={8}>
                        <TopReferWebList date={this.state.date}/>
                        <TodayHitSearchWordsCloud/>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Overview;