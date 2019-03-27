import React, { Component } from 'react';
import Charts from 'ant-design-pro/lib/Charts';
import { Pie, yuan } from 'ant-design-pro/lib/Charts';
import { Card } from 'antd'
import 'ant-design-pro/dist/ant-design-pro.css';
import axios from 'axios';

class ItemSalesPie extends Component{

    constructor(props) {
        super(props);

        this.state = {
            salesPieData:[]
        }
    }

    getSalesData(){
        let _this = this;

        axios.get("http://localhost:8080/itemSaleStatisticsInOverview")
            .then(function (response) {
                _this.setState({
                    salesPieData: response.data
                });
                console.log(response.data)
            })
    }

    componentWillMount() {
        this.getSalesData()
    }

    /**
     * 60秒刷新一次
     */
    componentDidMount() {
        this.timer = setInterval(
            () => {
                this.getSalesData();
            },
            600000
        );
    }

    render() {
        return(
            <div>
                <Card title="TEST课程销售量统计" bordered={false}>
                    <p
                        style={{
                            fontSize: 14,
                            color: 'rgba(0, 0, 0, 0.85)',
                            marginBottom: 16,
                            fontWeight: 500,
                        }}>
                        课程销售量统计
                    </p>
                    <Pie
                        hasLegend = {true}
                        title="销售量"
                        subTitle="销售量"
                        total={() => (
                            <span
                                dangerouslySetInnerHTML={{
                                    __html: this.state.salesPieData.reduce((pre, now) => now.y + pre, 0)
                                }}
                            />
                        )}
                        data={this.state.salesPieData}
                        valueFormat={val => <span dangerouslySetInnerHTML={{ __html: val }} />}
                        height={294}
                    />

                </Card>
            </div>
        );
    }

}

export default ItemSalesPie;