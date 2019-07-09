import React, { Component } from 'react';

class NavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        return (
            <nav className = "navar navbar-expand-lg navbar-dark bg-primary">
                <a className = "navbar-brand" href="/home">btn1 </a>
            </nav>
            // <nav className = "navbar navbar-extend-lg "></nav>
        );
    }
}



export default NavBar;