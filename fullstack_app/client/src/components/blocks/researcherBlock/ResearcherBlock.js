import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './ResearcherBlock.css';
import axios from 'axios'


export default class researcher extends Component {

    constructor(props) {
        super(props);

        this.state = {
            dimensionsID: null,
            loading: false,
        };
        this.onChange = this.onChange.bind(this);
        this.searchDimensions = this.searchDimensions.bind(this);
    }


    onChange(evt) {
        console.log(this.state.loading)
        this.setState({ [evt.target.name]: evt.target.value });
    }

    searchDimensions() {
        this.setState({ loading: true });
        axios.post(`http://localhost:3001/api/researchers/updateGrants/`, {
            dimensionsID: this.state.dimensionsID,
            mongoID: this.props.mongoID,


        })
            .then(res => {
                console.log("updated grants ");
                this.setState({ loading: false })
            })
    }

    static propTypes = {
        firstName: PropTypes.string.isRequired,
        lastName: PropTypes.string.isRequired,
        scopusID: PropTypes.string,
        scopusEID: PropTypes.string,
        scopusHIndex: PropTypes.number,
        scopusCoauthorCount: PropTypes.number,
        scoupsDocCount: PropTypes.number,
        scopusCitedByCount: PropTypes.number,
        scopusCitationCount: PropTypes.number,
        publicationRStart: PropTypes.number,
        publicationREnd: PropTypes.number,
        mongoID: PropTypes.string,
        dimensionsID: PropTypes.string,
        grantTotal: PropTypes.number,
        grantCount: PropTypes.number,
    }

    render() {
        return (
            <div className="block">
                {/* Basic info */}
                <div className="leftBlock">
                    <span className="rName">{this.props.firstName + ' ' + this.props.lastName}</span>
                    <div><span className="ID">Scopus ID: </span>
                        <span className="IDValue">{this.props.scopusID}</span></div>
                    <div><span className="ID">Scopus EID: </span>
                        <span className="IDValue">{this.props.scopusEID}</span></div>
                    <div><span className="ID">Dimensions ID: </span>
                        <span className="IDValue">{this.props.dimensionsID}</span></div>




                </div>
                <div className="vertical-line" />
                {/* Scopus Data */}
                <div className="midBlock">
                    <span className="blockTitle">Scopus Data</span>
                    <div>
                        <div><span className="metricTitle">H-Index: </span>
                            <span className="metric">{this.props.scopusHIndex}</span>
                        </div>
                        <div><span className="metricTitle">Document Count: </span>
                            <span className="metric">{this.props.scoupsDocCount}</span></div>
                        <div><span className="metricTitle">Citation by Count: </span>
                            <span className="metric">{this.props.scopusCitedByCount}</span></div>

                        <div><span className="metricTitle">Coauthor Count: </span>
                            <span className="metric">{this.props.scopusCoauthorCount}</span></div>
                        
                    </div>
                </div>
                {/*Dimensions Data  */}
                <div className="vertical-line" />

                <div className="rightBlock">

                <span className="blockTitle">Dimensions Data</span>
                    <div>
                        <div><span className="metricTitle">Grant Count: </span>
                            <span className="metric">{this.props.grantCount}</span>
                        </div>
                        <div><span className="metricTitle">Total grant amount: </span>
                            <span className="metric">${this.props.grantTotal}</span></div>

                        
                    </div>

                    {/*This is a button to update values  */}
                    {/* <div >
                        <div className="input-group mb-3 ">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="basic-addon1">ID</span>
                            </div>
                            <input
                                type="text"
                                className="form-control"
                                name="dimensionsID"
                                onChange={this.onChange}
                                placeholder="Dimensions ID"
                                aria-label="Username"
                                aria-describedby="basic-addon1"></input>
                            <button
                                disabled={!this.state.dimensionsID || this.state.loading === true}
                                className="btn btn-info"
                                type="button"
                                onClick={this.searchDimensions}
                            >
                                {this.state.loading ?
                                    (
                                        <span className="spinner-border spinner-border-sm text-dark" role="status" aria-hidden="true"></span>
                                    ) : (<div>Update</div>)}
                            </button>
                        </div>
                    </div> */}


                </div>

            </div>
        )
    }
}
