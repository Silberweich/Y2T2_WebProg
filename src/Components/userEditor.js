import React from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios'

class UserEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            friends: [],
            name: '',
            id: '',
            notes: '',
            getData: false,
            email: "",
        };
        this.setState({ email: this.props.email })
        this.domain = "http://localhost:4203";
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    update(e) {
        // update entity - PUT
        e.preventDefault();
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
    handleChange(changeObject) {
        this.setState(changeObject)
    }

    render() {
        return (
            <div className="container" style={{ margin: "20px auto" }}>
                <form className="">
                    <label htmlFor="name">
                        Username:
                        <input name="name"
                            id="name"
                            type="text"
                            className="form-control"
                            value={this.state.name}
                            onChange={(e) => this.handleChange({ name: e.target.value })}
                            required
                        />
                    </label>
                    <label htmlFor="notes">
                        Friend notes:
                        <input
                            name="notes"
                            id="notes"
                            type="test"
                            className="form-control"
                            value={this.state.notes}
                            onChange={(e) => this.handleChange({ notes: e.target.value })}
                            required
                        />
                    </label>
                    <label htmlFor="id">
                        Friend ID:
                        <input
                            name="id"
                            id="id"
                            type="text"
                            className="form-control"
                            value={this.state.id}
                            onChange={(e) => this.handleChange({ id: e.target.value })}
                        />
                    </label>
                    <button className="btn btn-info" type='button' onClick={(e) => this.update(e)}>
                        Update
                    </button>
                    <button className="btn btn-danger" type='button' onClick={(e) => this.delete(e)}>
                        Delete
                    </button>
                </form>
            </div>
        )
    };
}

function Delete(props) {
    let navigate = useNavigate();
    return <UserEditor{...props} navigate={navigate} />
}

export default Delete;