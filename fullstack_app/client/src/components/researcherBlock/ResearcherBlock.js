import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './ResearcherBlock.css';

export default class researcher extends Component {

    constructor(props){
        super(props);

        this.state = {};
    }

    static propTypes = {
        firstName: PropTypes.string.isRequired,
        lastName: PropTypes.string.isRequired,
        scopusID: PropTypes.string, 
        scopusEID: PropTypes.string,
        scopusHIndex:PropTypes.number, 
        scopusCoauthorCount: PropTypes.number,
        scoupsDocCount: PropTypes.number,
        scopusCitedByCount: PropTypes.number,
        scopusCitationCount: PropTypes.number,
        publicationRStart: PropTypes.number,
        publicationREnd: PropTypes.number,
}

    render() {
        return (
            <div className= "block">
                {/* Basic info */}
                <div className= "leftBlock">
                    <span className = "rName">{this.props.firstName + ' ' +  this.props.lastName}</span>
                    <div><span className = "ID">Scopus ID: </span> 
                    <span className= "IDValue">{this.props.scopusID}</span></div>
                    <div><span className = "ID">Scopus EID: </span> 
                    <span className= "IDValue">{this.props.scopusID}</span></div>
                    



                </div>
                <div className="vertical-line" />
                {/* Scopus Data */}
                <div className= "midBlock">
                <span className= "blockTitle">Scopus Data</span>
                <div>
                    <div><span className = "metricTitle">Document Count: </span> 
                    <span className = "metric">{this.props.scoupsDocCount}</span></div>

                    <div><span className = "metricTitle">H-Index: </span> 
                    <span className = "metric">{this.props.scopusHIndex}</span>
                    </div>
                    <div><span className = "metricTitle">Citation by Count: </span> 
                     <span className = "metric">{this.props.scopusCitedByCount}</span></div>

                    <div><span className = "metricTitle">Coauthor Count: </span> 
                    <span className = "metric">{this.props.scopusCoauthorCount}</span></div>
                     </div>  
                     </div>   
                {/*Dimensions Data  */}
                <div className= "rightBlock"></div>             

            </div>
        )
    }
}
