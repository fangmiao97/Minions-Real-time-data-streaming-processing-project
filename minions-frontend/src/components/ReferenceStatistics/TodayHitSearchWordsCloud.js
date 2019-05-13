import React, {Component} from 'react';
import { TagCloud } from 'ant-design-pro/lib/Charts';
import axios from 'axios';
import Utils from "../../utils/axiospath";
import { Card } from 'antd'


class TodayHitSearchWordsCloud extends Component{

    constructor(props) {
        super(props);

        this.state = {
            date:this.props.date,
            tags:[
                {
                    name:'Beyonce',
                    value:101
                },
                {
                    name:'欧美音乐',
                    value:102
                },
                {
                    name:'Lady Gaga',
                    value:103
                },
                {
                    name:'抖音 欧美',
                    value:101
                },{
                    name:'Rihanna',
                    value:99
                },{
                    name:'Ariana Grande',
                    value:101
                },
                {
                    name:'Homecoming',
                    value:101
                },
                {
                    name:'今日歌单',
                    value:102
                },
                {
                    name:'瞩目艺人',
                    value:103
                },
                {
                    name:'SHE',
                    value:101
                },{
                    name:'Taylor Swift',
                    value:99
                },{
                    name:'A妹',
                    value:101
                },
                {
                    name:'Beyonce',
                    value:101
                },
                {
                    name:'欧美音乐',
                    value:102
                },
                {
                    name:'Lady Gaga',
                    value:103
                },
                {
                    name:'抖音 欧美',
                    value:101
                },{
                    name:'Rihanna',
                    value:99
                },{
                    name:'Ariana Grande',
                    value:101
                },
                {
                    name:'Homecoming',
                    value:101
                },
                {
                    name:'今日歌单',
                    value:102
                },
                {
                    name:'瞩目艺人',
                    value:103
                },
                {
                    name:'SHE',
                    value:101
                },{
                    name:'Taylor Swift',
                    value:99
                },{
                    name:'A妹',
                    value:101
                },

            ]
        }
    }


    render() {
        return (
            <div style={{marginLeft:'8px', marginTop:'8px'}}>
                <Card
                title="今日热搜词云">
                    <TagCloud data={this.state.tags} height={200}/>
                </Card>
            </div>
        );
    }
}

export default TodayHitSearchWordsCloud;