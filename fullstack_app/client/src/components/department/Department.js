import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ResearcherBlock from '../researcherBlock/ResearcherBlock'
import axios from 'axios'
export default class department extends Component {
    static propTypes = {
        prop: PropTypes
    }

    constructor(props){
        super(props);
        this.state = {
            researchers: [],
        }
    }

    getResearchers() {
        axios.get(`http://localhost:3001/api/researchers/getResearchers/`, {
          params: {
    
          }
        })
          .then(res => {
            //console.log("logging: " + JSON.stringify(res.data));
            const researchers = res.data.payload;
            this.setState({ researchers });
          })
      }
    
      componentDidMount() {
        this.getResearchers()
    
      }

    render() {
        return (
            <div>
                <h1>Department Overview</h1>
                <p> </p>

                <h3>Department Statistics</h3>
                <p> `</p>
                <p> `</p>
                <p> `</p>
                <p> `</p>


                <h3>Department Researchers</h3>
            <div id="researcherScroll">
              {this.state.researchers.map(researcher => (
                <ResearcherBlock
                  key={researcher._id}
                  firstName={researcher.firstName}
                  lastName={researcher.lastName}
                  scopusID={researcher.scopusID}
                  scopusEID={researcher.scopusEID}
                  scopusHIndex={researcher.scopusHIndex}
                  scopusCoauthorCount={researcher.scopusCoauthorCount}
                  scoupsDocCount={researcher.scoupsDocCount}
                  scopusCitedByCount={researcher.scopusCitedByCount}
                  scopusCitationCount={researcher.scopusCitationCount}
                  publicationRStart={researcher.publicationRange.start}
                  publicationREnd={researcher.publicationRange.end}
                />
              ))}
            </div>



            </div>
        )
    }
}
