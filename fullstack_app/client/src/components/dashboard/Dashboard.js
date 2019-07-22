import React, { Component } from 'react';
import SideNav from "../sidenav/SideNav"
import axios from 'axios'
// import ResearcherBlock from '../researcherBlock/ResearcherBlock'
import './Dashboard.css'
import Department from '../department/Department'
import Researcher from '../researcher/Researcher';
import Journals from '../journals/Journals'

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ID: "",
      loading: false,
      response: null,
      researchers: [],
      selected: "Department"
    };

    this.onChange = this.onChange.bind(this);
    this.searchAndPost = this.searchAndPost.bind(this);



  }

  onChangeSelected(newSelection){
    this.setState({selected:newSelection});
    // console.log(this.state.selected);
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

      <div className="container-fluid ">
        <div className="row">
          <SideNav changeSelected = {this.onChangeSelected.bind(this)} ></SideNav>
          <main role="main" className="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4">
            

            {/* {this.state.response ? (<p>{JSON.stringify(this.state.response, null, "\t")}</p>) : (null)} */}
            
            {this.state.selected === "Department" ? (<Department></Department>): (null) }
            {this.state.selected === "Researcher Search" ? (<Researcher></Researcher>): (null) }
            {this.state.selected === "Journals" ? (<Journals></Journals>): (null) }



{/* 
            <h2>Title</h2>
            <div className="table-responsive">
              <table className="table table-striped table-sm">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Header</th>
                    <th>Header</th>
                    <th>Header</th>
                    <th>Header</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1,001</td>
                    <td>Lorem</td>
                    <td>ipsum</td>
                    <td>dolor</td>
                    <td>sit</td>
                  </tr>
                  <tr>
                    <td>1,002</td>
                    <td>amet</td>
                    <td>consectetur</td>
                    <td>adipiscing</td>
                    <td>elit</td>
                  </tr>
                  <tr>
                    <td>1,003</td>
                    <td>Integer</td>
                    <td>nec</td>
                    <td>odio</td>
                    <td>Praesent</td>
                  </tr>
                  <tr>
                    <td>1,003</td>
                    <td>libero</td>
                    <td>Sed</td>
                    <td>cursus</td>
                    <td>ante</td>
                  </tr>
                  <tr>
                    <td>1,004</td>
                    <td>dapibus</td>
                    <td>diam</td>
                    <td>Sed</td>
                    <td>nisi</td>
                  </tr>
                  <tr>
                    <td>1,005</td>
                    <td>Nulla</td>
                    <td>quis</td>
                    <td>sem</td>
                    <td>at</td>
                  </tr>
                  <tr>
                    <td>1,006</td>
                    <td>nibh</td>
                    <td>elementum</td>
                    <td>imperdiet</td>
                    <td>Duis</td>
                  </tr>
                  <tr>
                    <td>1,007</td>
                    <td>sagittis</td>
                    <td>ipsum</td>
                    <td>Praesent</td>
                    <td>mauris</td>
                  </tr>
                  <tr>
                    <td>1,008</td>
                    <td>Fusce</td>
                    <td>nec</td>
                    <td>tellus</td>
                    <td>sed</td>
                  </tr>
                  <tr>
                    <td>1,009</td>
                    <td>augue</td>
                    <td>semper</td>
                    <td>porta</td>
                    <td>Mauris</td>
                  </tr>
                  <tr>
                    <td>1,010</td>
                    <td>massa</td>
                    <td>Vestibulum</td>
                    <td>lacinia</td>
                    <td>arcu</td>
                  </tr>
                  <tr>
                    <td>1,011</td>
                    <td>eget</td>
                    <td>nulla</td>
                    <td>Class</td>
                    <td>aptent</td>
                  </tr>
                  <tr>
                    <td>1,012</td>
                    <td>taciti</td>
                    <td>sociosqu</td>
                    <td>ad</td>
                    <td>litora</td>
                  </tr>
                  <tr>
                    <td>1,013</td>
                    <td>torquent</td>
                    <td>per</td>
                    <td>conubia</td>
                    <td>nostra</td>
                  </tr>
                  <tr>
                    <td>1,014</td>
                    <td>per</td>
                    <td>inceptos</td>
                    <td>himenaeos</td>
                    <td>Curabitur</td>
                  </tr>
                  <tr>
                    <td>1,015</td>
                    <td>sodales</td>
                    <td>ligula</td>
                    <td>in</td>
                    <td>libero</td>
                  </tr>
                </tbody>
              </table>
            </div> */}

          </main>
        </div>
      </div>
    );
  }
}



export default Dashboard;