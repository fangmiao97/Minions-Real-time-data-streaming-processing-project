import React, { Component } from 'react';
import {Button} from 'antd';
import './App.css';
import axios from 'axios';

class App extends Component {

    clickTry(){
        axios.post("http://192.168.1.131:50000", {
            params:{
                headers:'from Mac mini',
                body: 'hope you can see it'
            }
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
