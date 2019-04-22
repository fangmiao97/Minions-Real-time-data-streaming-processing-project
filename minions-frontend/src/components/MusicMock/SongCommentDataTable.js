import React, {Component} from 'react';
import { Table, Card } from 'antd';
import axios from "axios";
import Utils from "../../utils/axiospath";

const columns = [
    {
        title: '歌名',
        dataIndex: 'name',
        key: 'name'
    },
    {
        title: '今日评论数',
        dataIndex: 'comment_count',
        key: 'value',
        sorter: (a, b) => a.comment_count - b.comment_count,
        defaultSortOrder: 'descend',
    }
];

/**
 * 歌曲评论数据，不和收藏数据放在一起因为可能有收藏但是没有评论
 */
class SongCommentDataTable extends Component{

    constructor(props) {
        super(props);

        this.state = {
            date: this.props.date,
            dataSource: []
        }

    }

    getSongCommentDataByDate(date) {
        let _this = this;
        axios.get(Utils.defaultURIdefaultURI + "/getSongCommentDataForTable",{
            params:{
                date: date
            }
        }).then(function (response) {
            _this.setState({
                dataSource: response.data
            })
        })
    }

    componentWillMount() {
        this.getSongCommentDataByDate(this.state.date)
    }

    componentDidMount() {
        this.timer = setInterval(
            () => {
                this.getSongCommentDataByDate(this.state.date)
            },
            10000
        )
    }


    render() {
        return (
            <div style={{marginTop:'16px', marginLeft:'16px'}}>
                <Card title="今日歌曲评论数一览">
                    <Table columns={columns} dataSource={this.state.dataSource} size="small" />
                </Card>
            </div>
        );
    }
}

export default SongCommentDataTable;