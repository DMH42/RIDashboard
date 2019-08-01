import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import ResearcherBlock from '../../blocks/researcherBlock/ResearcherBlock'
import axios from 'axios'

import './Researcher.css'
import DocumentBlock from '../../blocks/documentBlock/DocumentBlock'
import GrantBlock from '../../blocks/grantBlock/GrantBlock'
import sorter from '../../../util/sortingFunctions'



export default class researcher extends Component {
  // static propTypes = {
  // }

  constructor(props) {
    super(props);
    this.state = {
      researcher: null,
      publications: null,
      grants: [],
      ID: null, 
      loading: false,
      selection: "Publications",
      selected: false,
      sortSelection: "Cited by Count",
      sortSelected: false,
      sortedPubs: [],

      sortGrantSelection: "Amount",
      sortGrantSelected: false,
      sortedGrants: [],


    }
    this.onChange = this.onChange.bind(this);
    this.getResearcher = this.getResearcher.bind(this);

    this.onSortOpen = this.onSortOpen.bind(this);
    this.onSortSelect = this.onSortSelect.bind(this);

    this.onSortGrantOpen = this.onSortGrantOpen.bind(this);
    this.onSortGrantSelect = this.onSortGrantSelect.bind(this);

    this.onOpen = this.onOpen.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);




  }

  handleClickOutside(event) {
    //if You click something that's otuside set it as false
    if (event.target.id !== "dropdownMenu2" && event.target.id !== "dropLeft") {
      if (event.target.name !== "Altmetric" && event.target.name !== "Date" && event.target.name !== "Field Citation Ratio" && event.target.name !== "Relative Citation Ratio"
        && event.target.name !== "Publications" && event.target.name !== "Grants" && event.target.name !== "Cited by Count" && event.target.name !== "Alphabetical"
        && event.target.name !== "title" && event.target.name !== "Amount" && event.target.name !== "End Date" && event.target.name !== "Start Date" && event.target.name !== "Source"
        ) {
        this.setState({selected: false, sortSelected: false });
        this.setState({sortGrantSelected: false });

      }
    }

  }

  newArray() {
    var ar = []
    for (let i = 0; i < 10; i++) {
      ar.push(Math.floor(100 * Math.random()))

    }
    console.log(ar);
    this.setState({ testArray: ar });
    return ar;
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

  onSortGrantSelect(event) {
    // console.log(this.state);
    this.setState({ sortGrantSelection: event.target.name });
    this.sortGrants(event.target.name);
    //sort decider goes here
    this.setState({ sortGrantSelected: false });


  }


  sortGrants(name) {

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



  sortPubs(name) {
    
    var arr = this.state.publications;
    console.log("sorting on:" + name);
    if (name === "Altmetric") {
      arr.sort((a, b) => {
        return sorter.sortNumberDec(a, b, "dimensionsAltmetric", "title")

      })
    } else if (name === "Date") {
      arr.sort((a, b) => {
        return sorter.sortDateDec(a, b, "prismCoverDate", "title")
      })
    } else if (name === "Field Citation Ratio") {
      arr.sort((a, b) => {
        return sorter.sortNumberDec(a, b, "dimensionsFieldCitationRatio", "title")

      })
    } else if (name === "Relative Citation Ratio") {
      arr.sort((a, b) => {
        return sorter.sortNumberDec(a, b, "dimensionsRelativeCitationRatio", "title")

      })
    } else if (name === "Cited by Count") {
      arr.sort((a, b) => {
        return sorter.sortNumberDec(a, b, "scopusCitedByCount", "title")
      })
      
    } else if (name === "Alphabetical") {
      arr.sort((a, b) => {
        return sorter.sortStringDec(a, b, "title")

      })
      
    }
    this.setState({ sortedPubs: arr });
  }


  onSortOpen(event) {
    if (event.target.id === "dropLeft") {
      this.setState({ sortSelected: true });
    }
  }
  
  onSortGrantOpen(event) {
    if (event.target.id === "dropLeft") {
      this.setState({ sortGrantSelected: true });
    }
  }
  


  onSelect(event) {
    console.log(this.state);
    this.setState({ selection: event.target.name });
    this.setState({ selected: false });


  }
  onOpen(event) {
    if (event.target.id === "dropdownMenu2") {
      this.setState({ selected: true });

    }
  }

  onChange(evt) {
    console.log(this.state.loading)
    this.setState({ [evt.target.name]: evt.target.value });
  }
  getResearcher() {
    this.setState({ loading: true });
    axios.get(`http://localhost:3001/api/researchers/getResearcher/`, {
      params: {
        ID: this.state.ID
      }
    })
      .then(res => {
        //console.log("logging: " + JSON.stringify(res.data));
        const researcher = res.data.payload.researcher;
        this.setState({ researcher });
        const publications = res.data.payload.publications;
        this.setState({ publications });
        this.sortPubs("Cited by Count")

        console.log(researcher);
        console.log(publications);
        this.setState({ loading: false })
        this.setState({ grants: res.data.payload.grants })



      })
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);

  }

  render() {
    return (
      <div>



        <div className="row justify-content-between">
          <h1>Researcher Search</h1>

          <div className="col-sm-3">
            <div className="input-group mb-3 ">
              <div className="input-group-prepend">
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
                onClick={this.getResearcher}
              >
                {this.state.loading ?
                  (
                    <span className="spinner-border spinner-border-sm text-dark" role="status" aria-hidden="true"></span>
                  ) : (<div>Search</div>)}
              </button>


            </div>
          </div>
        </div>


        {/* Don't display anything if there is no data. No results */}


        {this.state.researcher ? (
          <div>
            <h3>Researcher Statistics</h3>
            <ResearcherBlock
              key={this.state.researcher._id}
              firstName={this.state.researcher.firstName}
              lastName={this.state.researcher.lastName}
              scopusID={this.state.researcher.scopusID}
              scopusEID={this.state.researcher.scopusEID}
              scopusHIndex={this.state.researcher.scopusHIndex}
              scopusCoauthorCount={this.state.researcher.scopusCoauthorCount}
              scoupsDocCount={this.state.researcher.scoupsDocCount}
              scopusCitedByCount={this.state.researcher.scopusCitedByCount}
              scopusCitationCount={this.state.researcher.scopusCitationCount}
              publicationRStart={this.state.researcher.publicationRange.start}
              publicationREnd={this.state.researcher.publicationRange.end}
              mongoID={this.state.researcher.mongoID}
              dimensionsID={this.state.researcher.dimensionsID}
              grantTotal={this.state.researcher.grantTotal}
              grantCount={this.state.researcher.grantCount}

            />
          </div>) : (null)}

        {this.state.researcher ?
          <div className="row justify-content-between">
            <div className={this.state.selected === false ? "dropdown" : "dropdown show"}>
              <button
                className="btn btn-primary dropdown-toggle"
                type="button" id="dropdownMenu2"
                onClick={this.onOpen}
                data-toggle="dropdown" aria-haspopup="true" aria-expanded={this.state.selected === false ? "true" : "false"}>
                {this.state.selection}
              </button>
              <div className={this.state.selected === false ? "dropdown-menu" : "dropdown-menu show"} aria-labelledby="dropdownMenu2">
                <button className="dropdown-item" name="Publications" type="button"
                  onClick={this.onSelect}

                >Publications</button>

                <button className="dropdown-item" name="Grants" type="button"
                  onClick={this.onSelect}

                >Grants</button>

                {/* <button className="dropdown-item" type="button">Something else here</button> */}
              </div>
            </div>


          {this.state.selection === "Publications"? 
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
                
                <button className="dropdown-item" name="Altmetric" type="button"
                  onClick={this.onSortSelect}
                >Altmetric</button>
                <button className="dropdown-item" name="Date" type="button"
                  onClick={this.onSortSelect}
                >Date</button>
                <button className="dropdown-item" name="Cited by Count" type="button"
                  onClick={this.onSortSelect}
                >Cited by Count</button>

                <button className="dropdown-item" name="Field Citation Ratio" type="button"
                  onClick={this.onSortSelect}
                >Field Citation Ratio</button>

                <button className="dropdown-item" name="Relative Citation Ratio" type="button"
                  onClick={this.onSortSelect}
                >Relative Citation Ratio</button>

                

              
                {/* <button className="dropdown-item" type="button">Something else here</button> */}
              </div>
            </div>: null}

            {this.state.selection === "Grants" && this.state.grants.length > 0? 

            <div className={this.state.sortGrantSelected === false ? "dropleft" : "dropleft show"}>
              <button
                className="btn btn-primary dropdown-toggle"
                type="button" id="dropLeft"
                onClick={this.onSortGrantOpen}
                data-toggle="dropdown" aria-haspopup="true" aria-expanded={this.state.sortGrantSelected === false ? "true" : "false"}>
                {this.state.sortGrantSelection}
              </button>
              <div className={this.state.sortGrantSelected === false ? "dropdown-menu" : "dropdown-menu show"} aria-labelledby="dropLeft">
              
              <button className="dropdown-item" name="Alphabetical" type="button"
                onClick={this.onSortGrantSelect}
              >Alphabetical</button>

              <button className="dropdown-item" name="Amount" type="button"
                onClick={this.onSortGrantSelect}
              >Amount</button>
              <button className="dropdown-item" name="End Date" type="button"
                onClick={this.onSortGrantSelect}
              >End Date</button>

              <button className="dropdown-item" name="Start Date" type="button"
                onClick={this.onSortGrantSelect}
              >Start Date</button>

              <button className="dropdown-item" name="Source" type="button"
                onClick={this.onSortGrantSelect}
              >Source</button>

                

              
                {/* <button className="dropdown-item" type="button">Something else here</button> */}
              </div>
            </div>: null}



          </div>
          : null
        }




        {this.state.sortedPubs.length > 0 && this.state.selection === "Publications" ? <div>
          <div id="documentScroll">
            {this.state.sortedPubs.map(article =>
              (

                <DocumentBlock
                  key={article._id}
                  title={article.title}
                  prismPublicationName={article.prismPublicationName}
                  scopusID={article.scopusID}
                  scopusEID={article.scopusEID}
                  prismISSN={article.prismISSN}
                  prismDoi={article.prismDoi}
                  prismVolume={article.scoupsDocCount}
                  scopusCitedByCount={article.prismIssueId}
                  prismIssueId={article.prismIssueId}
                  prismCoverDate={article.prismCoverDate}
                  scopusDescription={article.scopusDescription}
                  scopusSourceID={article.scopusSourceID}
                  prismAggType={article.prismAggType}


                  altmetric={article.dimensionsAltmetric}
                  dimensionsRelativeCitationRatio={article.dimensionsRelativeCitationRatio}
                  dimensionsFieldCitationRatio={article.dimensionsFieldCitationRatio}
                  dimensionsId={article.dimensionsId}



                />
              ))}
          </div>

        </div> : (null)}


        {this.state.selection === "Grants" ? <div>

          {this.state.grants.length > 0 ?
            <div id="documentScroll">
              {this.state.grants.map(grant => (
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
            </div> : (<h1 style={{ textAlign: 'center' }}>No Grants Found for this Researcher</h1>)}

        </div> : (null)}








      </div>
    )
  }
}