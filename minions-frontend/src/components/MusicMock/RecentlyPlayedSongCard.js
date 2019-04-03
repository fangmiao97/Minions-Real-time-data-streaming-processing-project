import React, { Component} from 'react';
import {Card} from 'antd';

class RecentlyPlayedSongCard extends Component{

    render() {
        return (
            <div style={{marginLeft:'16px', marginTop:'16px'}}>
                <Card
                    style={{width:400}}
                title="近一小时播放TOP歌曲"/>
            </div>
        );
    }
}

export default RecentlyPlayedSongCard;