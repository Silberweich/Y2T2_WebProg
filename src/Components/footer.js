import React, { Component } from 'react'
import { Link } from "react-router-dom";

export default class Footer extends Component {
    render() {
        return (
            <footer className="py-3" style={{backgroundColor:'#272121', padding:'10px'}}>
                <span style={{color:'azure'}}>
                    <Link to='/' style={{color:'azure', textDecoration:'none', padding: '5px'}} >Home</Link> |
                    <Link to='/adminmovies' style={{color:'azure', textDecoration:'none', padding: '5px'}} >Movies</Link> |
                    <Link to='/adminusers' style={{color:'azure', textDecoration:'none', padding: '5px'}} >Users Management</Link> |
                    <Link to='/adminlogin' style={{color:'azure', textDecoration:'none', padding: '5px'}} >Login</Link> </span><br /><br />
                <span style={{color:'azure'}} className="center"> For MUICT Y2 web programming project</span><br />
            </footer>
        )
    }
}
