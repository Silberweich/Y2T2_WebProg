import React from 'react'
import { Link } from "react-router-dom";
import styled from 'styled-components';
import MClogo from '../Assets/minor_logo.svg'
import './global.css'

const Myul = styled.ul`
    padding: 10px;
`;
// const Myli = styled.li`
//     padding: 14px 20px;
//     text-decoration: none;
// `;

const MyLink = styled(Link)`
    color: white;
    height: 100%;
    &:hover {
        color: red;
        opacity: 80%;
        transition: 0.3s;
    }
`;

const LogoLink = styled(Link)`
    background-image: linear-gradient(to right, rgba(255, 255, 255, 0) 50%, #ff0000 50%);
    background-position: -0% 0;
    background-size: 200% auto;
    transition: background-position 0.5s ease-out;
    padding: 15px 1%;
    overflow: hidden;
    &:hover {
        background-position: -99.99% 0;
        overflow: hidden;
    }
`;

class Nav extends React.Component {
    //Unnecessary
    constructor(props) {
        super(props);
        this.state = {
            loginTxt: "Login",
            isLoggedIn: false,
        };
        this.handleClick = this.handleClick.bind(this);
    }
    //Unnecessary
    handleClick(e) {
        if (this.state.isLoggedIn === true) {
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
            <nav className="navbar navbar-light" style={{ padding: 0, background:"#272121" }}>
                <div className="container-fluid" style={{ padding: "0 1% 0 0"}}>
                    <LogoLink to="/"><img src={MClogo} alt="Logo" height={50} /></LogoLink>
                    <Myul className="nav nav-pills justify-content-end" >
                        <li className="nav-item">
                            <MyLink className="nav-link" to="/"><i className="fa-solid fa-house" /> Home</MyLink>
                        </li>
                        <li className="nav-item">
                            <MyLink className="nav-link" to="/adminmovies"><i className="fa-solid fa-film" /> Movies</MyLink>
                        </li>
                        <li className="nav-item">
                            <MyLink className="nav-link" to="/adminusers"><i className="fa-solid fa-users" /> User Management</MyLink>
                        </li>
                        <li className="nav-item">
                            <MyLink className="nav-link active" to="/adminlogin" onClick={this.handleClick} >
                                <i className="fa-solid fa-right-to-bracket" /> {this.state.loginTxt}
                            </MyLink>
                        </li>
                    </Myul>
                </div>
            </nav>
        );
    }
}

export default Nav;
