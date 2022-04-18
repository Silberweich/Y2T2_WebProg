import React from 'react'
import { Link } from "react-router-dom";
import styled from 'styled-components';

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
    render() {
        return (
            <nav class="navbar navbar-light bg-light">
                <div class="container-fluid">
                    <a class="navbar-brand" href="#">Logo</a>
                
                
                <Myul className="nav nav-pills justify-content-end bg-light">
                    <li class="nav-item">
                        <Link className="nav-link" to="/">Home</Link>
                    </li>
                    <li class="nav-item">
                        <Link className="nav-link" to="/adminmovies">Movies</Link>
                    </li>
                    <li class="nav-item">
                        <Link className="nav-link" to="/adminusers">User Management</Link>
                    </li>
                    <li class="nav-item">
                        <Link className="nav-link active" to="/adminlogin">Login</Link>
                    </li>
                </Myul>
                </div>
            </nav>
        );
    }
}

export default Nav;
