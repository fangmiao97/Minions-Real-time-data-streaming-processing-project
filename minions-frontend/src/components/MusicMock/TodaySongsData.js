import React, { Component} from 'react'
import "./TodaySongsData.css"
import moment from "moment";
import TodayHitSongsCloud from "./TodayHitSongsCloud";
import SongPlayDataTable from "./SongPlayDataTable";
import SevenDaysPVMiniArea from "../PageViews/7DayData/MiniArea";
import RecentlyPlayedSongCard from "./RecentlyPlayedSongCard";
import { Row, Col, Icon, Tooltip } from 'antd';
import GenreInfoRose from "./GenreInfoRose";
import SongLikeDataTable from "./SongLikeDataTable";


const dateFormat = 'YYYYMMDD';

const today = moment().format('YYYYMMDD');

/**
 * 今日歌曲播放数据容器
 */
class TodaySongsData extends Component{

    constructor(props) {
        super(props);

        this.state = {
            date: today,
        }
    }

    render() {
        return (
            <div className="base">
                <div>
                    <div className="title1">TODAY PLAY DATA</div>
                    <div className="title2">今日歌曲播放数据</div>
                </div>
                <Row>
                    <Col span={8}>
                        <SongPlayDataTable date={this.state.date}/>
                    </Col>
                    <Col span={8}>
                        <RecentlyPlayedSongCard date={this.state.date}/>
                        <GenreInfoRose date={this.state.date}/>
                    </Col>
                    <Col span={8}>
                        <TodayHitSongsCloud date={this.state.date}/>
                        <SongLikeDataTable date={this.state.date}/>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default TodaySongsData;