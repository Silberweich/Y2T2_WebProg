import React, { Component } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'

class AddUse extends Component {
    constructor(props) {
        super(props);

        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 01
        var yyyy = today.getFullYear();
        today = yyyy + '-' + mm + '-' + dd;

        this.state = {
            email: '',
            passowrd: '',
            firstname: '',
            lastname: '',
            age: '',
        };
        this.domain = process.env.REACT_APP_WEBSERV_URL;
        this.update = this.create.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    create() {
        let url = `${this.domain}/user`
        // const data = { 
        //     movie_ID: 999,
        //     movie_name: "TestMovie",
        //     movie_genre: "Horror",
        //     movie_rate: 18,
        //     release_date: "2021-10-27",
        //     movie_length: 999,
        //     soundtrack: "TH",
        //     subtitle: null,
        //     movie_starRate: "0.0",
        //     synopsis: "THIS IS A SYNOPSIS",
        //     movie_image: "https://picsum.photos/seed/picsum/200/300"
        // };
        const data = {
            email: this.state.email,
            password: this.state.password,
            first_name: this.state.firstname,
            last_name: this.state.lastname,
            age: this.state.age,
        };
        axios.post(url, { data: data })
            .then(response => {
                console.log(response);
                this.setState({
                    movies: response.data
                });
                alert("Add user successfully");
                this.props.navigate('/adminusers')
            })
            .catch(err => {
                console.log(err);
            })
    }

    handleChange(e) {
        const targetName = e.target.name;           //Required the name of the element to match with the state variables
        console.log(targetName)
        this.setState({
            [targetName]: e.target.value,
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        this.create();
    }

    render() {
        return (
            <div className="container bg-light p-5" style={{ borderRadius: '15px', margin: '100px auto' }}>
                <button className="btn btn-primary" style={{ margin: "5px" }} onClick={()=>this.props.navigate('/adminusers')}>
                    <i class="fa-solid fa-arrow-left"></i> Back
                </button>
                <h1 className="text-center m-3">Add a new User</h1>
                <form className="row g-5" onSubmit={this.handleSubmit}>
                    <div className="col-md-6">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="text" className="form-control" id="email"
                            name="email" value={this.state.email} onChange={this.handleChange} />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="password" className="form-label">Passowrd</label>
                        <input type="password" className="form-control" id="password"
                            name="password" value={this.state.password} onChange={this.handleChange} />
                    </div>
                    <div className="col-5">
                        <label htmlFor="movieimage" className="form-label">First Name</label>
                        <input type="text" className="form-control" id="firstname"
                            name="firstname" value={this.state.firstname} onChange={this.handleChange} />
                    </div>
                    <div className="col-md-5">
                        <label htmlFor="lastname" className="form-label">Last Name</label>
                        <input type="text" className="form-control" id="lastname"
                            name="lastname" value={this.state.lastname} onChange={this.handleChange} />
                    </div>
                    <div className="col-md-2">
                        <label htmlFor="age" className="form-label">Age</label>
                        <input type="number" className="form-control" id="age"
                            name="age" value={this.state.age} onChange={this.handleChange} />
                    </div>
                    <div className="d-grid col-6 mx-auto">
                        <button className="btn btn-lg btn-success" type="submit">Add User!!!</button>
                    </div>
                </form>
            </div>
        )
    }
}

function AddUser(props) {
    let navigate = useNavigate();
    return <AddUse{...props} navigate={navigate} />
}

export default AddUser;