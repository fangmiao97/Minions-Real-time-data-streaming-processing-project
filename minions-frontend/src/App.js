import React, { Component } from 'react';
import {Button} from 'antd';
import './App.css';
import axios from 'axios';

class App extends Component {

    clickTry(){
        axios.get("http://localhost:8080/logtest", {
            params:{
                headers:'from Mac mini',
                body: 'hope you can see it'
            }
        }).then(function (response) {
           if (response === 1){
               console.log("日志记录成功")
           } else console.log("日志记录错误")
        }).catch(function (error) {
            console.log(error)
        })
    }


    render() {
        return (
            <div className="App">
                <Button type="primary" onClick={this.clickTry}>Button</Button>
            </div>
        );
    }
}

export default App;
