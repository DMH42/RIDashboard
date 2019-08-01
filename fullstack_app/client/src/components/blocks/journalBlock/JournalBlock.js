import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './JournalBlock.css';

export default class journalBlock extends Component {

    constructor(props){
        super(props);

        this.state = {};
    }

    static propTypes = {

        title: PropTypes.string,
        coverageStartYear: PropTypes.string,
        coverageEndYear: PropTypes.string,
        scopusSourceID: PropTypes.string,
        prismISSN: PropTypes.string,
        prismEISSN: PropTypes.string,
    
        SNIPScore:  PropTypes.number,
        SNIPYear: PropTypes.string,
    
        SJRScore:  PropTypes.number,
        SJRYear: PropTypes.string,
    
        citeScoreMetric: PropTypes.number,
        citeScoreCurrentMetricYear: PropTypes.string,
        citeScoreTracker: PropTypes.string,
        citeScoreTrackerYear: PropTypes.string,

    }

    render() {
        return (
            <div className= "block">
                {/* Basic info */}
                <div className= "leftBlock">
                    <span className = "rName">{this.props.title }</span>
                    <div><span className = "ID">Scopus ID: </span> 
                    <span className= "IDValue">{this.props.scopusSourceID}</span></div>
                    <div><span className = "ID">EISSN: </span> 
                    <span className= "IDValue">{this.props.prismEISSN}</span></div>
                    <div><span className = "ID">ISSN: </span> 
                    <span className= "IDValue">{this.props.prismISSN}</span></div>
                    



                </div>
                <div className="vertical-line" />
                {/* Scopus Data */}
                <div className= "midBlock">
                <span className= "blockTitle">Metric Scores</span>
                <div>
                <div>
                <div><span className = "metricTitle">SJRScore: </span> 
                    <span className = "metric">{this.props.SJRScore}</span></div>

                    <span className = "metricTitle">SNIPScore: </span> 
                    <span className = "metric">{this.props.SNIPScore}</span>
                    </div>


                    <div><span className = "metricTitle">Cite Score: </span> 
                     <span className = "metric">{this.props.citeScoreMetric}</span></div>

                    {/* <div><span className = "metricTitle">Coauthor Count: </span> 
                    <span className = "metric">{this.props.scopusCoauthorCount}</span></div> */}
                     </div>  
                     </div>   
                {/*Dimensions Data  */}
                <div className= "rightBlock"></div>             

            </div>
        )
    }
}
