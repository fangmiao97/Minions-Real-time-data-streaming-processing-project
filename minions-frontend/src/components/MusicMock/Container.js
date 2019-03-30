import React, {Component} from 'react';
import MockSongComponent from "./Song";
import "./Container.css";
import axios from 'axios';
import Utils from "../../utils/axiospath"

class MusicWebMockContainer extends Component{

    constructor(props) {
        super(props);

        this.state = {
            songsInfoList:[]
        }
    }

    getSongInfoList() {

        let _this = this;

        axios.get(Utils.defaultURIdefaultURI + "/SongInfoList")
            .then(function (response) {
                _this.setState({
                    songsInfoList: response.data
                });
            })
    }

    componentWillMount() {
        this.getSongInfoList()
    }


    render() {

        let songInfoList = this.state.songsInfoList;

        return (
            <div>
                <div className="miniTitle">Songs</div>
            <div className="basement">
                {
                    songInfoList.map((item, index) => {
                        return <MockSongComponent key={index} songInfo={item}/>
                    })
                }
            </div>
            </div>
        );
    }
}

export default MusicWebMockContainer;