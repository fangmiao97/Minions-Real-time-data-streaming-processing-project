import React, { Component } from 'react';
import { Icon, Tooltip } from 'antd';
import 'ant-design-pro/dist/ant-design-pro.css';
import { ChartCard, yuan, Field } from 'ant-design-pro/lib/Charts';
import Trend from 'ant-design-pro/lib/Trend';
import numeral from 'numeral';

class PVChartCard extends Component{

    render() {

        return(
            <div>

                <ChartCard
                    bordered={false}
                    title="今日PV"
                    action={
                      <Tooltip title="页面浏览总量">
                          <Icon type="info-circle-o" />
                       </Tooltip>
                    }
                     total={1233}
                     footer={
                        <Field label="日均Page View" value={numeral(12423).format("0,0")} />
                     }
                    contentHeight={46}
                >
                    <span>
                        周同比
                        <Trend flag="up" style={{ marginLeft: 8, color: "rgba(0,0,0,.85)" }}>
                        12%
                        </Trend>
                    </span>
                    <span style={{ marginLeft: 16 }}>
                        日环比
                        <Trend
                            flag="down"
                            style={{ marginLeft: 8, color: "rgba(0,0,0,.85)" }}
                        >
                            11%
                        </Trend>
                    </span>
                </ChartCard>
            </div>
        );
    }
}

export default PVChartCard;

