import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import ResearcherBlock from '../../blocks/researcherBlock/ResearcherBlock'
import axios from 'axios'
import './researchersView.css'

import sorter from '../../../util/sortingFunctions'

// const maxNum = 10;

export default class department extends Component {
  // static propTypes = {
  // }

  constructor(props) {
    super(props);
    this.state = {
      researchers: [],
      sortedResearchers: [],
      ID: "",
      loading: false,
      department: null,
      sortSelection: "H-Index",
      sortSelected: false,

    }
    this.handleClickOutside = this.handleClickOutside.bind(this);

    this.onSortOpen = this.onSortOpen.bind(this);
    this.onSortSelect = this.onSortSelect.bind(this);


  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }


  onSortSelect(event) {
    // console.log(this.state);
    this.setState({ sortSelection: event.target.name });
    this.sortPubs(event.target.name);
    //sort decider goes here
    this.setState({ sortSelected: false });


  }




  sortPubs(name) {

    var arr = this.state.researchers;
    console.log("sorting on:" + name);
    if (name === "Alphabetical") {
      arr.sort((a, b) => {
        return sorter.sortStringDec(a, b, "firstName")
        // return this.sortAlphabetical(a, b)
      })
    } else if (name === "Coauthor Count") {
      arr.sort((a, b) => {
        return sorter.sortNumberDec(a, b, "scopusCoauthorCount", "firstName")
      })
    } else if (name === "Cited by Count") {
      arr.sort((a, b) => {
        return sorter.sortNumberDec(a, b, "scopusCitedByCount", "firstName")

      })
    } else if (name === "Document Count") {
      arr.sort((a, b) => {
        return sorter.sortNumberDec(a, b, "scoupsDocCount", "firstName")

      })
    } else if (name === "Grant Count") {
      arr.sort((a, b) => {
        return sorter.sortNumberDec(a, b, "grantCount", "firstName")
      })

    } else if (name === "H-Index") {
      arr.sort((a, b) => {
        return sorter.sortNumberDec(a, b, "scopusHIndex", "firstName")
      })

    } else if (name === "Total Grant Amount") {
      arr.sort((a, b) => {
        return sorter.sortNumberDec(a, b, "grantTotal", "firstName")
      })

    }
    this.setState({ sortedResearchers: arr });
  }

  sortByTitle(a, b) {
    return (a.title > b.title) ? 1 : -1
  }

  onSortOpen(event) {
    if (event.target.id === "dropLeft") {
      this.setState({ sortSelected: true });

    }
  }




  handleClickOutside(event) {
    //if You click something that's otuside set it as false
    if (event.target.id !== "dropLeft") {
      if (event.target.name !== "Alphabetical" && event.target.name !== "Coauthor Count" && event.target.name !== "Cited by Count" && event.target.name !== "Document Count"
        && event.target.name !== "Grant Count" && event.target.name !== "H-Index" && event.target.name !== "Total Grant Amount") {
        this.setState({ sortSelected: false });
      }
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
        this.setState({ sortedResearchers: researchers });


      })
  }

  componentDidMount() {
    this.getResearchers()
    document.addEventListener('mousedown', this.handleClickOutside);


  }

  render() {
    return (
      <div>

        <div className="row justify-content-between">
          <h3>Department Researchers</h3>

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

              <button className="dropdown-item" name="Coauthor Count" type="button"
                onClick={this.onSortSelect}
              >Coauthor Count</button>
              <button className="dropdown-item" name="Cited by Count" type="button"
                onClick={this.onSortSelect}
              >Cited by Count</button>

              <button className="dropdown-item" name="Document Count" type="button"
                onClick={this.onSortSelect}
              >Document Count</button>

              <button className="dropdown-item" name="Grant Count" type="button"
                onClick={this.onSortSelect}
              >Grant Count</button>
              <button className="dropdown-item" name="H-Index" type="button"
                onClick={this.onSortSelect}
              >H-index</button>

              <button className="dropdown-item" name="Total Grant Amount" type="button"
                onClick={this.onSortSelect}
              >Total Grant Amount</button>




              {/* <button className="dropdown-item" type="button">Something else here</button> */}
            </div>
          </div>


        </div>
        <div id="researcherScroll">
          {this.state.sortedResearchers.map(researcher => (
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
              mongoID={researcher._id}
              dimensionsID={researcher.dimensionsID}
              grantTotal={researcher.grantTotal}
              grantCount={researcher.grantCount}

            />
          ))}
        </div>



      </div>
    )
  }
}
