import React, { Component } from 'react'
import { useNavigate } from "react-router-dom";
import Nav from './navbar';

function Redirect() {
    let navigate = useNavigate();
    function handleClick() {
      navigate('/')
    }
  }

class Login extends Component {
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
        // delete entity - DELETE
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
                if (response.status == 200) {
                    this.setState({ redirect: true })
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
                <div class="mb-3">
                    <form>
                        <legend className="text-center">Login</legend>
                        <div class="mb-3">
                            <label for="exampleInputEmail1" class="form-label">Email address </label>
                            <input type="email"
                                class="form-control" id="adminEmail"
                                aria-describedby="emailHelp"
                                value={this.state.email}
                                onChange={(e) => this.handleChange({ email: e.target.value })}
                                required />
                        </div>
                        <div class="mb-3">
                            <label for="exampleInputPassword1" class="form-label">Password</label>
                            <input type="password"
                                class="form-control" id="adminPassword"
                                value={this.state.password}
                                onChange={(e) => this.handleChange({ password: e.target.value })}
                                required />
                        </div>
                        <div class="mb-3 form-check">
                            <input type="checkbox" class="form-check-input" id="exampleCheck1" />
                            <label class="form-check-label" for="exampleCheck1">Check me out</label>
                        </div>
                        <button type="submit" class="btn btn-primary" onClick={(e) => this.login(e)}>Login</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default Login;