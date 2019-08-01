import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import axios from 'axios'
import './Journals.css'
import JournalBlock from '../../blocks/journalBlock/JournalBlock'
import sorter from '../../../util/sortingFunctions'


export default class journal extends Component {
  // static propTypes = {
  // }

  constructor(props) {
    super(props);
    this.state = {
      researchers: [],
      ID: "",
      loading: false,
      department: null,
      journals: [],
      sortedJournals: [],
      sortSelection: "SJRScore",
      sortSelected: false,
    }
    this.onChange = this.onChange.bind(this);
    // this.searchAndPost = this.searchAndPost.bind(this);
    this.getOverview = this.getOverview.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);

    this.onSortOpen = this.onSortOpen.bind(this);
    this.onSortSelect = this.onSortSelect.bind(this);

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

  sortJournals() {
    var arr = this.state.department['topFieldJournals'];
    arr.sort((a, b) => (a.SJRScore > b.SJRScore) ? -1 : 1)
    this.setState({ journals: arr });
  }

  onChange(evt) {
    console.log(this.state.loading)
    this.setState({ [evt.target.name]: evt.target.value });
  }

  getOverview() {
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
    document.addEventListener('mousedown', this.handleClickOutside);


  }

  onSortSelect(event) {
    // console.log(this.state);
    this.setState({ sortSelection: event.target.name });
    this.sortPubs(event.target.name);
    //sort decider goes here
    this.setState({ sortSelected: false });


  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  sortPubs(name) {

    var arr = this.state.journals;
    console.log("sorting on:" + name);
    if (name === "Alphabetical") {
      arr.sort((a, b) => {
        return sorter.sortStringDec(a, b, "title")

      })
    } else if (name === "SJRScore") {
      arr.sort((a, b) => {
        return sorter.sortNumberDec(a, b, "SJRScore", "title")
      })
    } else if (name === "SNIPScore") {
      arr.sort((a, b) => {
        return sorter.sortDateDec(a, b, "SNIPScore", "title")
      })
    } else if (name === "Cite Score") {
      arr.sort((a, b) => {
        return sorter.sortDateDec(a, b, "citeScoreMetric", "title")
      })
    }
    this.setState({ sortedGrants: arr });
  }



  onSortOpen(event) {
    if (event.target.id === "dropLeft") {
      this.setState({ sortSelected: true });

    }
  }




  handleClickOutside(event) {
    //if You click something that's otuside set it as false
    if (event.target.id !== "dropLeft") {
      if (event.target.name !== "Alphabetical" && event.target.name !== "SJRScore" && event.target.name !== "SNIPScore" && event.target.name !== "Cite Score") {
        this.setState({ sortSelected: false });
      }
    }

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



        <div className="row justify-content-between">
        <h1>Journals Overview</h1>

          <div className={this.state.sortSelected === false ? "dropleft" : "dropleft show"}>
            <button
              className="btn btn-primary dropdown-toggle"
              type="button" id="dropLeft"
              onClick={this.onSortOpen}
              data-toggle="dropdown" aria-haspopup="true" aria-expanded={this.state.sortSelected === false ? "true" : "false"}>
              {this.state.sortSelection}
            </button>
            <div className={this.state.sortSelected === false ? "dropdown-menu" : "dropdown-menu show"} aria-labelledby="dropLeft">
              <button className="dropdown-item" name="Alphabetical" type="button"
                onClick={this.onSortSelect}
              >Alphabetical</button>

              <button className="dropdown-item" name="SJRScore" type="button"
                onClick={this.onSortSelect}
              >SJRScore</button>
              <button className="dropdown-item" name="SNIPScore" type="button"
                onClick={this.onSortSelect}
              >SNIPScore</button>

              <button className="dropdown-item" name="Cite Score" type="button"
                onClick={this.onSortSelect}
              >Cite Score</button>





              {/* <button className="dropdown-item" type="button">Something else here</button> */}
            </div>
          </div>
        </div>



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
