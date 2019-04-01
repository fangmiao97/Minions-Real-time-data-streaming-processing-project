import React, {Component} from 'react';
import { Table } from 'antd';
import axios from "axios";
import Utils from "../../utils/axiospath";

//TODO... 把歌手专辑单独成列
const columns = [
    {
        title: '歌曲信息',
        dataIndex: 'songInfo',
        key: 'name'
    },
    {
        title: '今日播放数',
        dataIndex: 'play_count',
        key: 'value'
    }
];

class SongPlayDataTable extends Component{

    constructor(props) {
        super(props);

        this.state = {
            date: this.props.date,
            dataSource: [
                {
                    key: 1,
                    songInfo: 'All too well-Taylor Swift',
                    play_count:22222
                },
                {
                    key: 2,
                    songInfo: 'All too fl-Taylor Swift',
                    play_count:22422
                },
                {
                    key: 3,
                    songInfo: 'Adtoo well-Taylor Swift',
                    play_count:22662
                }
            ]
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
            <div>
                <Table columns={columns} dataSource={this.state.dataSource} size="middle" />
            </div>
        );
    }
}

export default SongPlayDataTable;