import React, { Component } from 'react';
import axios from "axios";
import {Button} from "antd";
import Utils from "../../utils/axiospath"
import MusicWebMockTitle from "../../components/Titles/MusicWebMockTitle";
import { Row, Col, Icon, Tooltip, Card } from 'antd';
import MusicWebMockContainer from "../../components/MusicMock/Container";

class BrowseAnalysis extends Component{


    render() {
        return (
            <div>
                <Row>
                    <MusicWebMockTitle/>
                </Row>
                    <MusicWebMockContainer/>

            </div>
        );
    }
}

export default BrowseAnalysis;