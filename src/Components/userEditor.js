import React from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios'

class UserEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            first_name: '',
            last_name: '',
            age: '',
        };
        this.domain = process.env.REACT_APP_WEBSERV_URL;
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        let url = `${this.domain}/user/${this.props.email}`
        console.log(this.props.email, url);
        axios.get(url)
            .then(response => {
                const data = response.data.data
                this.setState({
                    email: data.email,
                    password: data.password,
                    first_name: data.first_name,
                    last_name: data.last_name,
                    age: data.age,
                });
            })
            .catch(err => {
                console.log(err);
            })
    }

    update(e) {
        e.preventDefault();
        const data = {
            email: this.state.email,
            password: this.state.password,
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            age: this.state.age,
        };
        let url = `${this.domain}/user`
        axios.put(url, { data: data })
            .then(response => {
                console.log(response);
                this.props.navigate('/adminusers');
            })
            .catch(err => {
                console.log(err);
            })
    }
    delete(e) {
        e.preventDefault();
        axios(`${this.domain}/user`, {
            "method": "DELETE",
            data: {
                email: this.props.email
            }
        })
            .then(response => {
                console.log(response);
                if (response.data.error === false) {
                    this.props.navigate('/adminusers');
                    alert("This user is successfully deleted");
                }
            })
            .catch(err => {
                console.log(err);
            });
    }

    handleChange(e) {
        const targetName = e.target.name;           //Required the name of the element to match with the state variables
        console.log(targetName)
        this.setState({
            [targetName]: e.target.value,
        });
    }

    render() {
        return (
            <div className="container" style={{ margin: "20px auto" }}>
                <form className="m-3">
                    <div class="collapse mt-3 mb-3" id="updateCollapse">
                        <label htmlFor="email">
                            Email:
                            <input name="email" id="email" type="text" className="form-control"
                                value={this.state.email} onChange={this.handleChange}
                                required
                            />
                        </label>
                        <label htmlFor="password">
                            Passowrd:
                            <input name="password" id="password" type="text" className="form-control"
                                value={this.state.password} onChange={this.handleChange}
                                required
                            />
                        </label>
                        <label htmlFor="first_name">
                            Firstname:
                            <input name="first_name" id="first_name" type="text" className="form-control"
                                value={this.state.first_name} onChange={this.handleChange}
                                required
                            />
                        </label>
                        <label htmlFor="last_name">
                            Lastname:
                            <input name="last_name" id="last_name" type="text" className="form-control"
                                value={this.state.last_name} onChange={this.handleChange}
                                required
                            />
                        </label>
                        <label htmlFor="age">
                            Age:
                            <input name="age" id="age" type="number" className="form-control"
                                value={this.state.age} onChange={this.handleChange}
                                required
                            />
                        </label>
                        <button className="btn btn-warning" type='button' onClick={(e) => this.update(e)}>
                            Update
                        </button>
                    </div>
                </form>
                <div className="position-relative">
                    <button className="btn btn-info" type='button' data-bs-toggle="collapse"
                        data-bs-target="#updateCollapse" aria-expanded="false" aria-controls="collapseExample">
                        Toggle Update form
                    </button>
                    <div class="position-absolute bottom-0 end-0">
                        <button className="btn btn-danger" type='button' onClick={(e) => this.delete(e)}>
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        )
    };
}

function UpdateUser(props) {
    let navigate = useNavigate();
    return <UserEditor{...props} navigate={navigate} />
}

export default UpdateUser;