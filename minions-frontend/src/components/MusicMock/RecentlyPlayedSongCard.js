import React, { Component} from 'react';
import { Table, Card} from 'antd';
import axios from "axios";
import Utils from "../../utils/axiospath";


const columns = [
    {
        title: '歌名',
        dataIndex: 'name',
        key: 'name'
    },
    {
        title: '播放量',
        dataIndex: 'play_count',
        key: 'value',
        sorter: (a, b) => a.play_count - b.play_count,
        defaultSortOrder: 'descend',
    }
]


/**
 * 1小时TOPsong
 */
class RecentlyPlayedSongCard extends Component{

    constructor(props) {
        super(props);
        this.state = {
            date: this.props.date,
            dataSource: []
        }
    }

    getRecentTopSongs(date) {
        let _this = this;
        axios.get(Utils.defaultURIdefaultURI + "/getRecentTopSongs",{
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
        this.getRecentTopSongs(this.state.date)
    }

    componentDidMount() {
        this.timer = setInterval(
            () => {
                this.getRecentTopSongs(this.state.date)
            },
            300000
        )
    }

    render() {
        return (
            <div style={{marginLeft:'16px', marginTop:'16px'}}>
                <Card
                    style={{width:400}}
                title="近一小时播放TOP歌曲">
                    <Table columns={columns} dataSource={this.state.dataSource} size="middle" />
                </Card>
            </div>
        );
    }
}

export default RecentlyPlayedSongCard;