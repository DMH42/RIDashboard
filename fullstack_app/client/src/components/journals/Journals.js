import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import axios from 'axios'
import './Journals.css'
import JournalBlock from '../journalBlock/JournalBlock'
export default class journal extends Component {
    // static propTypes = {
    // }

    constructor(props){
        super(props);
        this.state = {
            researchers: [],
            ID: "",
            loading: false,
            department: null,
            journals: [],
        }
        this.onChange = this.onChange.bind(this);
        // this.searchAndPost = this.searchAndPost.bind(this);
        this.getOverview = this.getOverview.bind(this);
    }

    // searchAndPost() {
    //   this.setState({ loading: true });
    //   axios.put(`http://localhost:3001/api/researchers/updateResearcher/`, {
    //     params: {
    //       ID: this.state.ID
    //     }
    //   })
    //     .then(res => {
    //       console.log("logging: " + JSON.stringify(res.data));
    //       const response = res.data;
    //       this.setState({ response });
    //       this.setState({ loading: false });
  
    //     })
    // };

    sortJournals(){
        var arr = this.state.department['topFieldJournals'];
        arr.sort((a, b) => (a.SJRScore > b.SJRScore) ? -1 : 1)
        this.setState({journals:arr});
    }
  
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
            this.sortJournals();
            console.log(this.state.journals)

          })
    }


    
      componentDidMount() {
        this.getOverview();
    
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

                <h1>Journals Overview</h1>

                <h3>Top Journals:</h3>

                <div id="journalScroll">
              {this.state.journals.map(journal => (
                <JournalBlock




                  key={journal._id}
                  title={journal.title}
                  coverageStartYear={journal.coverageStartYear}
                  coverageEndYear={journal.coverageEndYear}
                  scopusSourceID={journal.scopusSourceID}
                  prismISSN={journal.prismISSN}
                  prismEISSN={journal.prismEISSN}

                  SNIPScore={journal.SNIPScore}
                  SNIPYear={journal.SNIPYear}
                  SJRScore={journal.SJRScore}
                  SJRYear={journal.SJRYear}
                  
                  citeScoreMetric={journal.citeScoreMetric}
                  citeScoreCurrentMetricYear={journal.citeScoreCurrentMetricYear}
                  citeScoreTracker={journal.citeScoreTracker}
                  citeScoreTrackerYear={journal.citeScoreTrackerYear}

                />
              ))}
            </div>
                
                {/* <div className= "col-sm-3"> 
                
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
                </div> */}
                


            



            </div>
        )
    }
}
