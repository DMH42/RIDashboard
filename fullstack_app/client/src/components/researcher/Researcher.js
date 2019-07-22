import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import ResearcherBlock from '../researcherBlock/ResearcherBlock'
import axios from 'axios'
import './Researcher.css'
import DocumentBlock from '../documentBlock/DocumentBlock'


export default class researcher extends Component {
  // static propTypes = {
  // }

  constructor(props) {
    super(props);
    this.state = {
      researcher: null,
      publications: null,
      ID: null,
      loading: false

    }
    this.onChange = this.onChange.bind(this);
    this.getResearcher = this.getResearcher.bind(this);

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
        console.log(researcher);
        console.log(publications);
        this.setState({ loading: false })
      })
  }

  componentDidMount() {
    // this.getResearchers()

  }

  render() {
    return (
      <div>
        <div className = "row justify-content-between">
          <h1>Researcher Search</h1>

          <div className = "col-sm-3">
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
            />
          </div>) : (null)}


        {this.state.publications ? <div><h3>Documents published</h3>
          <div id="documentScroll">
            {this.state.publications.map(article => (
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



              />
            ))}
          </div>

        </div> : (null)}




      </div>
    )
  }
}