import React, { Component } from 'react';

class SideNav extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        return (
          <nav className="col-md-2 d-none d-md-block bg-light sidebar">
          <div className="sidebar-sticky">
            <ul className="nav flex-column">
              <li className="nav-item">
                <button className ="list-group-item list-group-item-action">
                  Lorem Ipsum
                </button>
                {/* <a className="nav-link active" href="#">
                  <span data-feather="home"></span>
                  Lorem Ipsum <span className="sr-only">(current)</span>
                </a> */}
              </li>
              <li className="nav-item">
              <button className ="list-group-item list-group-item-action">
                  Lorem Ipsum
                </button>
                {/* <a className="nav-link" href="#">
                  <span data-feather="file"></span>
                  Lorem Ipsum
                </a> */}
              </li>
              <li className="nav-item">
              <button className ="list-group-item list-group-item-action">
                  Lorem Ipsum
                </button>
                {/* <a className="nav-link" href="#">
                  <span data-feather="shopping-cart"></span>
                  Lorem Ipsum
                </a> */}
              </li>
              <li className="nav-item">
              <button className ="list-group-item list-group-item-action">
                  Lorem Ipsum
                </button>
                {/* <a className="nav-link" href="#">
                  <span data-feather="users"></span>
                  Lorem Ipsum
                </a> */}
              </li>
              <li className="nav-item">
              <button className ="list-group-item list-group-item-action">
                  Lorem Ipsum
                </button>
                {/* <a className="nav-link" href="#">
                  <span data-feather="bar-chart-2"></span>
                  Lorem Ipsum
                </a> */}
              </li>
              <li className="nav-item">
              <button className ="list-group-item list-group-item-action">
                  Lorem Ipsum
                </button>
                {/* <a className="nav-link" href="#">
                  <span data-feather="layers"></span>
                  Lorem Ipsum
                </a> */}
              </li>
            </ul>

            <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
              <span>Lorem Ipsum</span>
              </h6>
              <button className ="list-group-item list-group-item-action">
                  Lorem Ipsum
                </button>
              {/* <a className="d-flex align-items-center text-muted" href="#">
                <span data-feather="plus-circle"></span>
              </a> */}
            
            <ul className="nav flex-column mb-2">
              <li className="nav-item">
              <button className ="list-group-item list-group-item-action">
                  Lorem Ipsum
                </button>
                {/* <a className="nav-link" href="#">
                  <span data-feather="file-text"></span>
                  Lorem Ipsum
                </a> */}
              </li>
              <li className="nav-item">
              <button className ="list-group-item list-group-item-action">
                  Lorem Ipsum
                </button>
                {/* <a className="nav-link" href="#">
                  <span data-feather="file-text"></span>
                  Lorem Ipsum
                </a> */}
              </li>
              <li className="nav-item">
              <button className ="list-group-item list-group-item-action">
                  Lorem Ipsum
                </button>
                {/* <a className="nav-link" href="#">
                  <span data-feather="file-text"></span>
                  Lorem Ipsum
                </a> */}
              </li>
              <li className="nav-item">
              <button className ="list-group-item list-group-item-action">
                  Lorem Ipsum
                </button>
                {/* <a className="nav-link" href="#">
                  <span data-feather="file-text"></span>
                  Lorem Ipsum
                </a> */}
              </li>
            </ul>
          </div>
        </nav>

        );
    }
}



export default SideNav;