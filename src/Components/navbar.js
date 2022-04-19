import React from 'react'
import { Link } from "react-router-dom";
import styled from 'styled-components';
import Login from './login'

const TopMenu = styled.nav`
    display: flex;
    flex-direction: row;
    justify-content: left;
    margin: 0px;
    background-color: #71F8D3;
`;

const Myul = styled.ul`
    padding: 10px;
`;
const Myli = styled.li`
    padding: 14px 20px;
    text-decoration: none;
`;

const MyLink = styled(Link)`
    color: black;
    text-decoration: none;
`;

class Nav extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loginTxt: "Login",
            isLoggedIn: false,
        };
        this.handleClick = this.handleClick.bind(this);
    }
    
    handleClick(e) {
        if (this.state.isLoggedIn === true){
            this.setState({
                loginTxt: "Logout",
            })
        } else {
            this.setState({
                loginTxt: "Login",
            })
        }
        // e.target.classList.toggle('bg-danger');
    }

    render() {
        return (
            <nav className="navbar navbar-light bg-light">
                <div className="container-fluid">
                    <a>Logo</a>                
                <Myul className="nav nav-pills justify-content-end bg-light">
                    <li className="nav-item">
                        
                        <Link className="nav-link" to="/"><i class="fa-solid fa-house" /> Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/adminmovies"><i class="fa-solid fa-film" /> Movies</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/adminusers"><i class="fa-solid fa-users" /> User Management</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link active" to="/adminlogin" onClick={this.handleClick}><i class="fa-solid fa-right-to-bracket"/> {this.state.loginTxt}</Link>
                    </li>
                </Myul>
                </div>
            </nav>
        );
    }
}

export default Nav;
