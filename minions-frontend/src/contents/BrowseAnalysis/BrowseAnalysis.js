import React, { Component } from 'react';
import axios from "axios";
import {Button} from "antd";
import Utils from "../../utils/axiospath"
import MusicWebMockTitle from "../../components/Titles/MusicWebMockTitle";
import { Row, Col, Icon, Tooltip, Card } from 'antd';
import MusicWebMockContainer from "../../components/MusicMock/Container";

class BrowseAnalysis extends Component{
    clickTry(){
        axios.get(Utils.defaultURIdefaultURI+"/logtest", {
            params:{
                K_topic: 'streamingtopic',
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

    clickTrySecond(){
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

    clickHelloTest(){
        axios.get(Utils.defaultURIdefaultURI+"/hello")
            .then(function (response) {
                console.log(response)
            })
    }

    render() {
        return (
            <div>
                <Row>
                    <MusicWebMockTitle/>
                </Row>
                    <MusicWebMockContainer/>
                    <Button type="primary" onClick={this.clickHelloTest}>hello</Button>
                    <Button type="primary" onClick={this.clickTry}>SMButton</Button>
                    <Button type="primary" onClick={this.clickTrySecond}>LGButton</Button>

            </div>
        );
    }
}

export default BrowseAnalysis;