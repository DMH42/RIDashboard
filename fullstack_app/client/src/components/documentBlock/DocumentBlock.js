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
}

/*

scopusAuthorID: '56960692300',
[0]   prismUrl:
[0]    'https://api.elsevier.com/content/abstract/scopus_id/0012026263',
[0]   scopusID: '0012026263',
[0]   scopusEID: '2-s2.0-0012026263',
[0]   title: 'Tracer diffusion in polyatomic liquids. II',
[0]   prismPublicationName: 'The Journal of Chemical Physics',
[0]   prismISSN: '00219606',
[0]   prismDoi: '10.1063/1.442148',
[0]   scopusCitedByCount: '74',
[0]   prismVolume: '75',
[0]   prismIssueId: '3',
[0]   prismpageRange: '1422-1426',
[0]   prismCoverDate: '1981-01-01',
[0]   prismDisplayDate: '1981',
[0]   prismAggType: 'Journal',
[0]   scopusSubType: 'ar',
[0]   scopusDescription: 'Article',
[0]   scopusSourceID: 28134,

*/


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
                    <div><span className = "ID">DOI: </span> 
                    <span className= "IDValue">{this.props.prismDoi}</span></div>
                    <div><span className = "ID">Scopus Source ID: </span> 
                    <span className= "IDValue">{this.props.scopusSourceID}</span></div>

                    </div>  
                    </div>           

            </div>
        )
    }
}
