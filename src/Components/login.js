import React, { Component } from 'react'
import { useNavigate } from "react-router-dom";
import Nav from './navbar';
import Redirect from './navbar';

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            loggedIn: false,
        };
        this.login = this.login.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    login(e) {
        e.preventDefault();
        fetch("/adminlogin", {
            "method": "POST",
            "headers": {
                "content-type": "application/json",
                "accept": "application/json"
            },
            "body": JSON.stringify({
                email: this.state.email,
                password: this.state.password
            })
        })
        .then(response => {
            console.log(response)
            if (response.redirected == true) {
                this.setState({ loggedIn: true })
                this.props.navigate('/');
            }
        })
        .catch(err => {
            console.log(err);
        });
    }
    handleChange(changeObject) {
        this.setState(changeObject)
    }
    render() {
        return (
            <div className="container" style={{ width: "40%" }}>
                <h1 className="text-center">This is Admin loginpage</h1>
                <div className="mb-3">
                    <form>
                        <legend className="text-center">Login</legend>
                        <div className="mb-3">
                            <label className="form-label">Email address </label>
                            <input type="email"
                                className="form-control" id="adminEmail"
                                aria-describedby="emailHelp"
                                value={this.state.email}
                                onChange={(e) => this.handleChange({ email: e.target.value })}
                                required />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Password</label>
                            <input type="password"
                                className="form-control" id="adminPassword"
                                value={this.state.password}
                                onChange={(e) => this.handleChange({ password: e.target.value })}
                                required />
                        </div>
                        <div className="mb-3 form-check">
                            <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                            <label className="form-check-label">Check me out</label>
                        </div>
                        <button type="submit" className="btn btn-primary" onClick={(e) => this.login(e)}>Login</button>
                    </form>
                </div>
            </div>
        )
    }
}

function Login(props) {
    let navigate = useNavigate();
    return <LoginForm{...props} navigate={navigate} />
}

export default Login;