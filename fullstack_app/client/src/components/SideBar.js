import React, { Component } from 'react';

class SideBar extends Component {
    state = {  }
    // render() {
    //     return (
    //         <div className = "sidenav">
    //             <h5> content </h5>
    //             <button
    //                 className = " btn btn-secondary"
    //                 data-toggle = "collapse"
    //                 type= "button"
    //                 data-target = "#searchResearcher"
    //                 >Search Researcher</button>

    //         </div>
    //     );
    // }
    render() {
        return (
            
            <div className = "d-flex" >
                <div className = "flex-sm-column">
                <ul className = "list-group">
                    {/* I can add a .active to a group item to indicate which one is active */}
                    <button className = "list-group-item list-group-item-action">
                        Department
                    </button>
                    <button className = "list-group-item list-group-item-action">
                        Search Researcher
                    </button>
                    <button className = "list-group-item list-group-item-action">
                       Statistics
                    </button>
                </ul>
                </div>
                
                <div className = "flex-sm-colum disabled d-none"> 
                {/* d-none in order to disable the element */}

                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                </div>
                
            </div>
            
        );
    }
    
}


export default SideBar;