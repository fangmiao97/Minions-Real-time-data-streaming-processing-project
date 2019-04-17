import React, {Component} from 'react';
import { TagCloud } from 'ant-design-pro/lib/Charts';
import axios from 'axios';
import Utils from "../../utils/axiospath";
import { Card } from 'antd'


class TodayHitSongsCloud extends Component{

    constructor(props) {
        super(props);

        this.state = {
            date:this.props.date,
            tags:[]
        }
    }

    getTagsDataByDate(date) {
        let _this = this;
        axios.get(Utils.defaultURIdefaultURI + "/getSongPlayedDataForCloudTags",{
            params:{
                date: date
            }
        }).then(function (response) {
            _this.setState({
                tags: response.data
            })
        })
    }

    componentWillMount() {
        this.getTagsDataByDate(this.state.date)
    }

    componentDidMount() {
        this.timer = setInterval(
            () => {
                this.getTagsDataByDate(this.state.date)
            },
            10000
        )
    }


    render() {
        return (
            <div style={{marginLeft:'16px', marginTop:'16px'}}>
                <Card
                title="今日热门歌曲TOP10">
                    <TagCloud data={this.state.tags} height={200}/>
                </Card>
            </div>
        );
    }
}

export default TodayHitSongsCloud;