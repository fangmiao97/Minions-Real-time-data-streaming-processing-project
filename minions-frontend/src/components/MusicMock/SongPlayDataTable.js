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
        title:'歌手',
        dataIndex: 'artist',
        key: 'artist'
    },
    {
        title:'专辑',
        dataIndex: 'album',
        key: 'album'
    },
    {
        title: '今日播放数',
        dataIndex: 'play_count',
        key: 'value',
        sorter: (a, b) => a.play_count - b.play_count,
        defaultSortOrder: 'descend',
    }
];

class SongPlayDataTable extends Component{

    constructor(props) {
        super(props);

        this.state = {
            date: this.props.date,
            dataSource: []
        }

    }

    getSongPlayedDataByDate(date) {
        let _this = this;
        axios.get(Utils.defaultURIdefaultURI + "/getSongPlayedDataForTable",{
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
        this.getSongPlayedDataByDate(this.state.date)
    }

    componentDidMount() {
        this.timer = setInterval(
            () => {
                this.getSongPlayedDataByDate(this.state.date)
            },
            10000
        )
    }


    render() {
        return (
            <div style={{marginLeft:'16px', marginTop:'16px'}}>
                <Card title="今日歌曲播放一览">
                    <Table columns={columns} dataSource={this.state.dataSource} size="middle" />
                </Card>
            </div>
        );
    }
}

export default SongPlayDataTable;