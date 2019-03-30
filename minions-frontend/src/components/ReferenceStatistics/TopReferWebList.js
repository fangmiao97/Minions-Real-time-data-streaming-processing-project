import React, { Component } from 'react';
import { List, Typography, Card, Avatar } from 'antd';
import axios from 'axios';
import Utils from "../../utils/axiospath"

class TopReferWebList extends Component{

    constructor(props) {
        super(props);

        this.state = {
            date: this.props.date,
            topWebList:[]
        }
    }

    getTopReferWebDate(date) {

        let _this = this;

        axios.get(Utils.defaultURIdefaultURI+"/getTopWebList", {
            params:{
                date: date
            }
        }).then(function (response) {
            _this.setState({
                topWebList: response.data
            });
            console.log(response.data)
        })
    }

    componentWillMount() {
        this.getTopReferWebDate(this.state.date)
    }

    componentWillReceiveProps(nextProps) {
        if(this.state.date !== nextProps.date) {
            this.setState({
                date: nextProps.date
            },() => {
                this.getTopReferWebDate(nextProps.date)
            })
        }
    }


    render() {
        return (
            <div style={{ marginLeft:'32px', marginTop:'32px' }}>
                <Card
                    title="Top Reference Web 来源网站"
                    style={{ borderRadius:'4px 4px 4px 4px',
                        boxShadow:'0px 0px 5px #cfcfcf'}}>
                <List
                    dataSource={this.state.topWebList}
                      renderItem={item => (
                          <List.Item >
                              <List.Item.Meta
                                  title={item.rank}
                                  description={item.website}
                              />
                              <div>{item.count}</div>
                          </List.Item>
                      )
                      }/>
                </Card>
            </div>
        );
    }
}

export default TopReferWebList;