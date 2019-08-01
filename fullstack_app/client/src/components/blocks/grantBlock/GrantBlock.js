import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './GrantBlock.css';

export default class grantBlock extends Component {

    constructor(props){
        super(props);

        this.state = {};
    }

    static propTypes = {
        active_year: PropTypes.array,
        end_date: PropTypes.string, 
        original_title: PropTypes.string,
        id: PropTypes.string,
        funding_usd: PropTypes.number,

        linkout: PropTypes.string,
        funding_currency:PropTypes.string, 
        start_date: PropTypes.string,
        title: PropTypes.string,
        project_num: PropTypes.string,
        funding_org_name: PropTypes.string,

        start_year: PropTypes.string,
        researcherID: PropTypes.string,
}




    render() {
        return (
            <div className= "block">
                {/* Basic info */}
                <div className= "leftBlock">
                <span className = "rName">{this.props.title}</span>
                    <div> <span className = "metric">{this.props.start_date} to {this.props.end_date} </span>
                    </div>
                    <div><span className = "metricTitle">Amount: </span> 
                    <span className = "metric">${this.props.funding_usd}</span></div>
                   



                </div>
                <div className="vertical-line" />
                {/* Scopus Data */}
                <div className= "midsBlock">
                <div>
                <span className= "blockTitle">{this.props.funding_org_name}</span>
                
                    
                    

                    
                    
                     </div> 

            <a href={this.props.linkout}> 
            <button
            //   disabled={!this.state.ID || this.state.loading === true}
              className="btn btn-primary"
              type="button"
            >
            
            Source
            </button> 
            </a>
            
                     </div>   
                     <div className="vertical-line" />

                {/*Dimensions Data  */}
                <div className= "rightBlock">
                    
                <span className= "blockTitle">Document Identifers:</span>

                <div>


                    <div><span className = "ID">Grant ID: </span> 
                    <span className= "IDValue">{this.props.id}</span></div>
                    <div><span className = "ID">Researcher ID: </span> 
                    <span className= "IDValue">{this.props.researcherID}</span></div>
                    <div><span className = "ID">ProjectNumber: </span> 
                    <span className= "IDValue">{this.props.project_num}</span></div>
                    
                    </div>  
                    </div>           

            </div>
        )
    }
}
