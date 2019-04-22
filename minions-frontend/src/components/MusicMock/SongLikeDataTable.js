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
        dataIndex: 'like_count',
        key: 'value',
        sorter: (a, b) => a.like_count - b.like_count,
        defaultSortOrder: 'descend',
    }
];

/**
 * 歌曲收藏数据
 */
class SongLikeDataTable extends Component{

    constructor(props) {
        super(props);

        this.state = {
            date: this.props.date,
            dataSource: []
        }

    }

    getSonglikedDataByDate(date) {
        let _this = this;
        axios.get(Utils.defaultURIdefaultURI + "/getSongLikedDataForTable",{
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
        this.getSonglikedDataByDate(this.state.date)
    }

    componentDidMount() {
        this.timer = setInterval(
            () => {
                this.getSonglikedDataByDate(this.state.date)
            },
            10000
        )
    }


    render() {
        return (
            <div style={{marginTop:'16px', marginLeft:'16px'}}>
                <Card title="今日歌曲收藏量一览">
                    <Table columns={columns} dataSource={this.state.dataSource} size="small" />
                </Card>
            </div>
        );
    }
}

export default SongLikeDataTable;