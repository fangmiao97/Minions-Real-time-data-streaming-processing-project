import React, { Component } from 'react';
import { Row, Col, Icon, Tooltip } from 'antd';
import 'ant-design-pro/dist/ant-design-pro.css';
import { ChartCard, yuan, Field } from 'ant-design-pro/lib/Charts';
import Trend from 'ant-design-pro/lib/Trend';
import numeral from 'numeral';
import PVChartCard from "../../components/PageViews/ChartCard/ChartCard";

/**
 * Overview页布局
 */
class Overview extends Component{


    render() {
        return(
            <Row>
                <Col span={12}>
                    <PVChartCard/>
                </Col>
            </Row>
        );
    }
}

export default Overview;