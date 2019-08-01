import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './MentionBlock.css';

export default class mentionBlock extends Component {

    constructor(props) {
        super(props);

        this.state = {};
    }

    static propTypes = {

        title: PropTypes.string,
        url: PropTypes.string,
        date: PropTypes.string,
        type: PropTypes.string,

    }

    render() {
        if(this.props.type === "tweet"){
            return null;
        }

        return (
            <div className="block">
                {/* Basic info */}
                <div className="lBlock">
                    <span className="rName">{this.props.title}</span>
                    {this.props.date? <div><span className="detailType">Posted On: </span>
                        <span className="detail">{this.props.date}</span></div>:null}
                        {this.props.type? <div><span className="detailType">Post type: </span>
                        <span className="detail">{this.props.type}</span></div>:null}
                        





                </div>
                <div className="vertical-line" />
                {/* Scopus Data */}
                <div className="rBlock">

                    <a href={this.props.url}>
                        <button
                            //   disabled={!this.state.ID || this.state.loading === true}
                            className="btn btn-primary"
                            type="button"
                        >

                            Mention Source
            </button>
                    </a>

                </div>


            </div>
        )
    }
}
