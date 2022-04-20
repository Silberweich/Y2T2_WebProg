import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class Movie extends Component {
  constructor(props) {
    super(props);
    this.state = {
        project: {}
    };
}
      
render() {

    return (
        <div>
            <h1>movie</h1>
        </div>
       );
   }
}
export default Movie;