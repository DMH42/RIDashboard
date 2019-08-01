import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './DocumentBlock.css';

export default class documentBlock extends Component {

    constructor(props){
        super(props);

        this.state = {};
    }

    static propTypes = {
        title: PropTypes.string.isRequired,
        scopusID: PropTypes.string, 
        scopusEID: PropTypes.string,
        prismDoi: PropTypes.string,
        scopusSourceID: PropTypes.number,

        prismPublicationName: PropTypes.string.isRequired,
        prismISSN:PropTypes.string, 
        prismVolume: PropTypes.string,
        prismIssueId: PropTypes.string,
        prismCoverDate: PropTypes.string,
        prismAggType: PropTypes.string,

        scopusCitedByCount: PropTypes.string,
        scopusDescription: PropTypes.string,

        altmetric:PropTypes.string,
        dimensionsRelativeCitationRatio:PropTypes.string,
        dimensionsFieldCitationRatio:PropTypes.string,
        dimensionsId:PropTypes.string,
}



    render() {
        return (
            <div className= "block">
                {/* Basic info */}
                <div className= "leftBlock">
                <span className = "rName">{this.props.title}</span>

                <div><span className = "metricTitle">Cited by count: </span> 
                    <span className = "metric">{this.props.scopusCitedByCount}</span></div>

                    <div><span className = "metricTitle">Document Type: </span> 
                    <span className = "metric">{this.props.scopusDescription}</span>
                    </div>
                   



                </div>
                <div className="vertical-line" />
                {/* Scopus Data */}
                <div className= "midBlock">
                <div>
                    <div><span className = "metricTitle">{this.props.prismAggType}: </span> 
                    <span className = "metric">{this.props.prismPublicationName}</span></div>
                    <div><span className = "metricTitle">Date: </span> 
                    <span className = "metric">{this.props.prismCoverDate}</span></div>
                    {this.props.prismVolume? <div><span className = "metricTitle">Volume: </span> 
                    <span className = "metric">{this.props.prismVolume}</span>
                    </div>: null }
                    {this.props.prismIssueId? <div><span className = "metricTitle">Issue: </span> 
                     <span className = "metric">{this.props.prismIssueId}</span></div>
                     : null }
                    {this.props.altmetric?
                    <div><span className="metricTitle">Altmetric: </span>
                    <span className="metric">{this.props.altmetric}</span></div>:null   
                    }
                    

                    {this.props.dimensionsRelativeCitationRatio?
                    <div><span className="metricTitle">Relative Citation Ratio: </span>
                    <span className="metric">{this.props.dimensionsRelativeCitationRatio}</span></div>:null   
                    }
                    {this.props.dimensionsFieldCitationRatio?
                    <div><span className="metricTitle">Field Citation Ratio: </span>
                    <span className="metric">{this.props.dimensionsFieldCitationRatio}</span></div>:null   
                    }
                    
                    

                    
                    
                     </div>  
                     </div>   
                     <div className="vertical-line" />

                {/*Dimensions Data  */}
                <div className= "rightBlock">
                    
                <span className= "blockTitle">Document Identifers:</span>

                <div>


                    <div><span className = "ID">Scopus ID: </span> 
                    <span className= "IDValue">{this.props.scopusID}</span></div>
                    <div><span className = "ID">Scopus EID: </span> 
                    <span className= "IDValue">{this.props.scopusEID}</span></div>
                    {this.props.prismDoi?<div><span className = "ID">DOI: </span> 
                    <span className= "IDValue">{this.props.prismDoi}</span></div>:null}
                    <div><span className = "ID">Scopus Source ID: </span> 
                    <span className= "IDValue">{this.props.scopusSourceID}</span></div>
                    {this.props.dimensionsId?
                    <div><span className="ID">Dimensions ID: </span>
                    <span className="IDValue">{this.props.dimensionsId}</span></div>:null   
                    }

                    </div>  
                    </div>           

            </div>
        )
    }
}
