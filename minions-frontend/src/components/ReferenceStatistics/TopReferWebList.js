import React, { Component } from 'react';
import { List, Card, Table } from 'antd';
import axios from 'axios';
import Utils from "../../utils/axiospath"

/**
 * Top来源网站列表
 */
class TopReferWebList extends Component{

    constructor(props) {
        super(props);

        this.state = {
            date: this.props.date,
            topWebList:[]
        }
    }

    getTopReferWebDate(date) {

        let _this = this;

        axios.get(Utils.defaultURIdefaultURI+"/getTopWebList", {
            params:{
                date: date
            }
        }).then(function (response) {
            _this.setState({
                topWebList: response.data
            });
        })
    }

    componentWillMount() {
        this.getTopReferWebDate(this.state.date)
    }

    componentWillReceiveProps(nextProps) {
        if(this.state.date !== nextProps.date) {
            this.setState({
                date: nextProps.date
            },() => {
                this.getTopReferWebDate(nextProps.date)
            })
        }
    }

    componentDidMount() {
        this.timer = setInterval(
            () => {
                this.getTopReferWebDate(this.state.date)
            },
            60000
        );
    }


    render() {

        const columns = [
            {
                title: '来源网站',
                dataIndex: 'website',
                key: 'website'
            },
            {
                title: '数量',
                dataIndex: 'count',
                key: 'count',
                sorter: (a, b) => a.count - b.count,
                defaultSortOrder: 'descend',
            }
        ]

        return (
            <div style={{ marginLeft:'8px', marginTop:'8px', marginRight:'8px' }}>
                <Card
                    title="Top Reference Web 来源网站">
                    <Table columns={columns} dataSource={this.state.topWebList} size="middle" />
                </Card>
            </div>
        );
    }
}

export default TopReferWebList;