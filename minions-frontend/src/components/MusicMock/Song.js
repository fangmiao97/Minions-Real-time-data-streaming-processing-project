import React, { Component} from 'react';
import { Card, Icon, Button, notification} from 'antd';
import axios from "axios";
import Utils from "../../utils/axiospath";

const { Meta } = Card;

Icon.setTwoToneColor('#fe2d55');

const openNotification = (songInfo) => {
    notification.open({
        message: songInfo.name,
        description: songInfo.artist + " - " + songInfo.album,
        style: {
            width: 600,
            marginLeft: 335 - 600,
        },
    });
}

class MockSongComponent extends Component{

    constructor(props) {
        super(props);

        this.state = {
            songInfo: this.props.songInfo
        }
    }



    clickTrySecond(songInfo){

        openNotification(songInfo);
        axios.get(Utils.defaultURIdefaultURI+"/logtest2", {
            params:{
                K_topic: 'hello_ladygaga_topic',
                contents: 'hopeyoucanseeit_nihao hhh'
            }
        }).then(function (response) {
            if (response.data === 1){
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
                              <Button shape="circle" ghost={true} onClick={this.clickTrySecond.bind(this, songInfo)}>
                                  <Icon type="right" style={{ color:"#fe2d55"}}/>
                              </Button>,
                              <Button shape="circle" ghost={true} onClick={this.clickTrySecond.bind(this, songInfo)}>
                                  <Icon type="heart" theme="twoTone" />
                              </Button>,
                              <Button shape="circle" ghost={true} onClick={this.clickTrySecond.bind(this, songInfo)}>
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