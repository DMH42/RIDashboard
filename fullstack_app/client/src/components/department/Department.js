import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import ResearcherBlock from '../researcherBlock/ResearcherBlock'
import axios from 'axios'
import './Department.css'

// const maxNum = 10;

export default class department extends Component {
    // static propTypes = {
    // }

    constructor(props){
        super(props);
        this.state = {
            researchers: [],
            publishingJournals: [],
            citedJournals: [],
            ID: "",
            loading: false,
            department: null
        }
        this.onChange = this.onChange.bind(this);
        this.searchAndPost = this.searchAndPost.bind(this);
        this.getOverview = this.getOverview.bind(this);
        this.fillArrays = this.fillArrays.bind(this);

    }

    sortJournals(array){
      var arr = array;
      arr.sort((a, b) => (a.SJRScore > b.SJRScore) ? -1 : 1)
      return arr;

  }

    findInArray(array, jName){
      for (let i = 0; i < array.length; i++) {
        var jour = array[i]['title'];
        if(jour.toLowerCase() === jName.toLowerCase()){
          return array[i];
        } else {


          var fixedJournal = this.fixJournal(jName);

          while(fixedJournal != null){
            if(jour.toLowerCase() === fixedJournal.toLowerCase()){
              return array[i];
            }
            fixedJournal = this.fixJournal(jName.toLowerCase);
          }
        }
      }
      return null;
    }

    fixJournal(journal) {//Potentailly add more rules here
      var newJournalName = String(journal).toLowerCase();
      if (newJournalName.includes("and")) {
        newJournalName = newJournalName.replace("and", "&");
        return newJournalName;
      } else if (newJournalName.includes("the")) {
        newJournalName = newJournalName.replace("the", "");

        return newJournalName;
    
      }
      else if (newJournalName.includes("The")) {
        newJournalName = newJournalName.replace("The", "");

        return newJournalName;
    
      }
      return null;
    
    }
    

    fillArrays(){
      var pubArray = [];
      var citedArray = [];
      var val;
      var dep = this.state.department;
      for (let i = 0; i < dep.topPublishingJournals.length; i++) {
        val = this.findInArray(dep.topFieldJournals,dep.topPublishingJournals[i][0]);
        
        if(val){
          pubArray.push(val);
        }
      }


      for (let i = 0; i< dep.topCitedJournals.length; i++) {
        val = this.findInArray(dep.topFieldJournals,dep.topCitedJournals[i][0]);
        if(val){
          citedArray.push(val);
        }
      }
      
      citedArray = this.sortJournals(citedArray).slice(0,10);


      



      this.setState({publishingJournals:this.sortJournals(pubArray), citedJournals:citedArray })
      console.log(this.state.publishingJournals);
      console.log(this.state.citedJournals);


    }

    searchAndPost() {
      this.setState({ loading: true });
      axios.put(`http://localhost:3001/api/researchers/updateResearcher/`, {
        params: {
          ID: this.state.ID
        }
      })
        .then(res => {
          console.log("logging: " + JSON.stringify(res.data));
          const response = res.data;
          this.setState({ response });
          this.setState({ loading: false });
  
        })
    };
  
    onChange(evt) {
      console.log(this.state.loading)
      this.setState({ [evt.target.name]: evt.target.value });
    }

    getOverview(){
      axios.get(`http://localhost:3001/api/departments/departmentOverview`, {
          params: {
    
          }
        })
          .then(res => {
            //console.log("logging: " + JSON.stringify(res.data));
            const department = res.data;
            console.log(department);
            this.setState({ department });
            this.fillArrays();
          })
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
        this.getOverview()
    
      }

    render() {
        return (
            <div>

                              <div className="input-group mb-3 col-sm-3">
              {/* <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon1">ID</span>
              </div>
              <input
                type="text"
                className="form-control"
                name="ID"
                onChange={this.onChange}
                placeholder="Author ID"
                aria-label="Username"
                aria-describedby="basic-addon1"></input>
              <button
                disabled={!this.state.ID || this.state.loading === true}
                className="btn btn-info"
                type="button"
                onClick={this.searchAndPost}
              >
                {this.state.loading ?
                  (
                    <span className="spinner-border spinner-border-sm text-dark" role="status" aria-hidden="true"></span>
                  ) : (<div>Search</div>)}
              </button> */}
            </div>

                <h1>Department Overview</h1>
                <p> </p>

                <h3>Department Statistics:</h3>
                <h4>Department Top Publishing Journals:</h4>
                <div className = "row">
                <div className= "col-sm-3"> 
                {/* col-sm-3 */}
                <h5>Top Publishing Journals:</h5>
                {this.state.department? (
                  <ul className = "list-group list-group-flush">
                {this.state.department.topPublishingJournals.map(journal => 
                <li 
                className = "list-group-item d-flex justify-content-between align-items-center"
                key={journal[0]}>{journal[0]}
                <span className= "badge badge-primary badge-pill">{journal[1]}</span>
                </li>
                )}
                  </ul>
                
                
                ):null}
                </div>

                <div className= "col-sm-3"> 
                <h5>Ranked Publishing Journals:</h5>

                {/* col-sm-3 */}
                {this.state.department? (
                  <ul className = "list-group list-group-flush">
                {this.state.publishingJournals.map(journal => 
                <li 
                className = "list-group-item d-flex justify-content-between align-items-center"
                key={journal['title']}>{journal['title']}
                <span className= "badge badge-primary badge-pill">{journal['SJRScore']}</span>
                </li>
                )}
                  </ul>
                
                
                ):null}
                </div>

                <div className= "col-sm-3">
                <h5>Ranked Cited Journals:</h5>
 
                {/* col-sm-3 */}
                {this.state.department? (
                  <ul className = "list-group list-group-flush">
                {this.state.citedJournals.map(journal => 
                <li 
                className = "list-group-item d-flex justify-content-between align-items-center"
                key={journal['title']}>{journal['title']}
                <span className= "badge badge-primary badge-pill">{journal['SJRScore']}</span>
                </li>
                )}
                  </ul>
                
                
                ):null}
                </div>





                </div>

                


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
