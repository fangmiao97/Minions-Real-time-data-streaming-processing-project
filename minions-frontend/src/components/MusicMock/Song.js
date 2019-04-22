import React, { Component} from 'react';
import { Card, Icon, Button, notification, message} from 'antd';
import axios from "axios";
import Utils from "../../utils/axiospath";

const { Meta } = Card;

Icon.setTwoToneColor('#fe2d55');

const openNotification = (songInfo) => {
    notification.open({
        duration: 60,
        message: "正在播放 "+ songInfo.name,
        description: songInfo.artist + " - " + songInfo.album,
        style: {
            width: 300,
            marginLeft: 70
        },
    });
}

/**
 * 歌曲卡片
 */
class MockSongComponent extends Component{

    constructor(props) {
        super(props);

        this.state = {
            songInfo: this.props.songInfo
        }
    }


    //播放歌曲记录
    songplay(songInfo){

        openNotification(songInfo);

        axios.get(Utils.defaultURIdefaultURI+"/actionLogger", {
            params:{
                K_topic: 'minions_songplay',
                songId: songInfo.songID
            }
        }).then(function (response) {
            if (response.data === 1){
                message.success('添加歌曲播放记录成功');
                console.log("日志记录成功")
            } else console.log("日志记录错误")
        }).catch(function (error) {
            console.log(error)
        })
    }

    //收藏歌曲
    likesong(songInfo){

        //openNotification(songInfo);

        axios.get(Utils.defaultURIdefaultURI+"/actionLogger", {
            params:{
                K_topic: 'minions_songlike',
                songId: songInfo.songID
            }
        }).then(function (response) {
            if (response.data === 1){
                message.success('收藏成功');
                console.log("日志记录成功")
            } else console.log("日志记录错误")
        }).catch(function (error) {
            console.log(error)
        })
    }

    //评论歌曲
    comment(songInfo){

        //openNotification(songInfo);

        axios.get(Utils.defaultURIdefaultURI+"/actionLogger", {
            params:{
                K_topic: 'minions_songcomment',
                songId: songInfo.songID
            }
        }).then(function (response) {
            if (response.data === 1){
                message.success('评论成功');
                console.log("日志记录成功")
            } else console.log("日志记录错误")
        }).catch(function (error) {
            console.log(error)
        })
    }

    render() {

        let songInfo = this.state.songInfo;

        return(
            <div style={{ marginLeft:32, marginTop:16}}>
              <Card
                  style={{width: 200, borderRadius:'5px 5px 5px 5px'}}
                  hoverable={true}
                  cover={<img src={songInfo.coverUrl}/>}
                  actions=
                      {
                          [
                              <Button shape="circle" ghost={true} onClick={this.songplay.bind(this, songInfo)}>
                                  <Icon type="right" style={{ color:"#fe2d55"}}/>
                              </Button>,
                              <Button shape="circle" ghost={true} onClick={this.likesong.bind(this, songInfo)}>
                                  <Icon type="heart" theme="twoTone" />
                              </Button>,
                              <Button shape="circle" ghost={true} onClick={this.comment.bind(this, songInfo)}>
                                  <Icon type="edit" theme="twoTone" />
                              </Button>
                          ]
                      }>
                  <Meta
                      title={songInfo.name + " - "+ songInfo.album}
                      description={songInfo.artist }
                  />
              </Card>
            </div>
        );
    }
}

export default MockSongComponent;