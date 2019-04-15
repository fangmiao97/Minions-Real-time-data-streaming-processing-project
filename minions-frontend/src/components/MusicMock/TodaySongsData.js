import React, { Component} from 'react'
import "./TodaySongsData.css"
import moment from "moment";
import TodayHitSongsCloud from "./TodayHitSongsCloud";
import SongPlayDataTable from "./SongPlayDataTable";
import SevenDaysPVMiniArea from "../PageViews/7DayData/MiniArea";
import RecentlyPlayedSongCard from "./RecentlyPlayedSongCard";


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
                <div style={{ display:'flex', flexWrap:'wrap'}}>
                    <TodayHitSongsCloud date={this.state.date}/>
                    <SongPlayDataTable date={this.state.date}/>
                    <RecentlyPlayedSongCard date={this.state.date}/>
                </div>
            </div>
        );
    }
}

export default TodaySongsData;