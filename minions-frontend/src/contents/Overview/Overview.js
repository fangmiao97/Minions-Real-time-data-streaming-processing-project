import React, { Component } from 'react';
import { Row, Col, Icon, Tooltip } from 'antd';
import 'ant-design-pro/dist/ant-design-pro.css';
import PVChartCard from "../../components/PageViews/ChartCard/ChartCard";
import ItemSalesPie from "../../components/ItmesSalesStatistics/Pie";

/**
 * Overview页布局
 */
class Overview extends Component{


    render() {
        return(
            <div>
            <Row>
                <Col span={6}>
                    <ItemSalesPie/>

                </Col>
                <Col span={6} offset={1}>
                    <PVChartCard/>
                </Col>
            </Row>
            </div>
        );
    }
}

export default Overview;