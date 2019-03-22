import React, { Component } from 'react';
import {Button} from 'antd';
import './App.css';
import axios from 'axios';

class App extends Component {

    clickTry(){
        axios.get("http://localhost:8080/logtest", {
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
        axios.get("http://localhost:8080/logtest2", {
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
        axios.get("http://localhost:8080/hello")
            .then(function (response) {
                console.log(response)
            })
    }

    render() {
        return (
            <div className="App">
                <Button type="primary" onClick={this.clickHelloTest}>hello</Button>
                <Button type="primary" onClick={this.clickTry}>SMButton</Button>
                <Button type="primary" onClick={this.clickTrySecond}>LGButton</Button>
            </div>
        );
    }
}

export default App;
