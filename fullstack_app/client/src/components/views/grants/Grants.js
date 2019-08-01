import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import axios from 'axios'
import './Grants.css'
import GrantBlock from '../../blocks/grantBlock/GrantBlock'
import sorter from '../../../util/sortingFunctions'

export default class grants extends Component {
  // static propTypes = {
  // }

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      grants: [],
      sortedGrants: [],
      sortSelection: "Alphabetical",
      sortSelected: false,
    }
    this.handleClickOutside = this.handleClickOutside.bind(this);

    this.onSortOpen = this.onSortOpen.bind(this);
    this.onSortSelect = this.onSortSelect.bind(this);

    this.onChange = this.onChange.bind(this);
    // this.searchAndPost = this.searchAndPost.bind(this);
    this.getGrants = this.getGrants.bind(this);
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

    var arr = this.state.grants;
    console.log("sorting on:" + name);
    if (name === "Alphabetical") {
      arr.sort((a, b) => {
        return sorter.sortStringDec(a, b, "title")

      })
    } else if (name === "Amount") {
      arr.sort((a, b) => {
        return sorter.sortNumberDec(a, b, "funding_usd", "title")
      })
    } else if (name === "End Date") {
      arr.sort((a, b) => {
        return sorter.sortDateDec(a, b, "end_date", "title")
      })
    } else if (name === "Start Date") {
      arr.sort((a, b) => {
        return sorter.sortDateDec(a, b, "start_date", "title")
      })
    } else if (name === "Source") {
      arr.sort((a, b) => {
        return sorter.sortStringDec(a, b, "funding_org_name")
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
      if (event.target.name !== "Alphabetical" && event.target.name !== "Amount" && event.target.name !== "End Date" && event.target.name !== "Start Date"
        && event.target.name !== "Source") {
        this.setState({ sortSelected: false });
      }
    }

  }




  onChange(evt) {
    console.log(this.state.loading)
    this.setState({ [evt.target.name]: evt.target.value });
  }

  getGrants() {
    axios.get(`http://localhost:3001/api/departments/getAllGrants`, {
      params: {

      }
    })
      .then(res => {
        // console.log("logging: " + JSON.stringify(res.data));

        this.setState({ grants: res.data });
        this.sortPubs("Alphabetical")


      })
  }



  componentDidMount() {
    this.getGrants();
    document.addEventListener('mousedown', this.handleClickOutside);


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
          <h1>Grants</h1>

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

              <button className="dropdown-item" name="Amount" type="button"
                onClick={this.onSortSelect}
              >Amount</button>
              <button className="dropdown-item" name="End Date" type="button"
                onClick={this.onSortSelect}
              >End Date</button>

              <button className="dropdown-item" name="Start Date" type="button"
                onClick={this.onSortSelect}
              >Start Date</button>

              <button className="dropdown-item" name="Source" type="button"
                onClick={this.onSortSelect}
              >Source</button>





              {/* <button className="dropdown-item" type="button">Something else here</button> */}
            </div>
          </div>
        </div>


        <div id="grantScroll">
          {this.state.sortedGrants.map(grant => (
            <GrantBlock




              key={grant._id}
              active_year={grant.active_year}
              end_date={grant.end_date}
              original_title={grant.original_title}
              id={grant.id}
              funding_usd={grant.funding_usd}
              linkout={grant.linkout}

              funding_currency={grant.funding_currency}
              start_date={grant.start_date}
              title={grant.title}
              project_num={grant.project_num}

              funding_org_name={grant.funding_org_name}
              start_year={grant.start_year}
              researcherID={grant.researcherID}

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
