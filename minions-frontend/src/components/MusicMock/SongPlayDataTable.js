import React, {Component} from 'react';
import { Table, Card } from 'antd';
import axios from "axios";
import Utils from "../../utils/axiospath";

//TODO... 把歌手专辑单独成列
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

    getTagsDataByDate(date) {
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
        this.getTagsDataByDate(this.state.date)
    }


    render() {
        return (
            <div style={{marginLeft:'16px', marginTop:'16px'}}>
                <Card title="今日歌曲播放一览" style={{width:600}}>
                    <Table columns={columns} dataSource={this.state.dataSource} size="middle" />
                </Card>
            </div>
        );
    }
}

export default SongPlayDataTable;