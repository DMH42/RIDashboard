import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import axios from 'axios'
import './MentionsView.css'
import MentionBlock from '../../blocks/mentionBlock/MentionBlock'
export default class departmentMentions extends Component {
    // static propTypes = {
    // }

    constructor(props) {
        super(props);
        this.state = {
            researchers: [],
            ID: "",
            loading: false,
            mentions: null,
        }
        // this.searchAndPost = this.searchAndPost.bind(this);
        this.getMentions = this.getMentions.bind(this);
    }





    getMentions() {
        axios.get(`http://localhost:3001/api/departments/getDepartmentMentions`, {
            params: {

            }
        })
            .then(res => {
                //console.log("logging: " + JSON.stringify(res.data));
                const mentions = res.data;
                console.log(mentions);
                this.setState({ mentions });

            })
    }



    componentDidMount() {
        this.getMentions();

    }

    render() {
        return (
            <div>
                <div className="row justify-content-between">


                    <h1>Recent Mentions</h1>
                    <a href="https://www.altmetric.com/explorer/mentions?department_id=83d9096f-1e0c-4f5a-856d-dfaf7d92c7ba%3Adepartment%3A19ad65e931f67b8de0725b8848a8a25f">
                        <button
                            //   disabled={!this.state.ID || this.state.loading === true}
                            className="btn btn-primary"
                            type="button"
                        >

                            Altmetric Explorer
            </button>
                    </a>
                </div>

                {this.state.mentions ? <div id="mentionScroll">
                    {this.state.mentions.data.map(mention => (
                    
                        <MentionBlock
                            key={mention.id}

                            title={mention.attributes.title}
                            url={mention.attributes.url}
                            date={mention.attributes["posted-on"]}
                            type={mention.attributes["post-type"]}




                        />
                    ))}
                </div> : 
            <div class="text-center mt-5">
            <div class="spinner-grow mt-5 text-info"
            // style="width: 3rem; height: 3rem;"
            style = {{width: '15rem', height: '15rem' }}
            
            role="status">
              <span class="sr-only">Loading...</span>
            </div>
          </div>
            
            
            }









            </div>
        )
    }
}
