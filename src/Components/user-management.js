import React from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';

function generateList(data) {
  var elements = [];
  for (let i = 0; i < data.length; i++) {
    elements.push(
      <tr>
        <td>{i + 1}</td>
        <td>{data[i].email}</td>
        <td>{data[i].first_name}</td>
        <td>{data[i].last_name}</td>
        <td>
          <Link to={`/user/${data[i].email}`}><button type="button" className="btn btn-outline-dark">View Profile</button></Link>
        </td>
      </tr>
    )
  }
  return elements
}

class Users extends React.Component {
  render() {
    return (
      <>{generateList(this.props.users)}</>
    );
  }
}

class UserManagement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      search: "",
      searchType: "Email",
    };
    this.domain = process.env.REACT_APP_WEBSERV_URL;
    this.search = this.search.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    fetch(`${this.domain}/user`, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      "method": "GET",
    })
      .then(response => response.json())
      .then(response => {
        console.log("Users Info:", response);
        this.setState({
          users: response.data
        })
      })
      .catch(err => {
        console.log(err);
      });
  }

  handleChange(changeObject) {
    this.setState(changeObject)
  }

  search() {
    let url = process.env.REACT_APP_WEBSERV_URL + `/userSearch${this.state.searchType}?${this.state.searchType.toLowerCase()}=${this.state.search}`
    if (this.state.search === "") {
      url = process.env.REACT_APP_WEBSERV_URL + '/user'
    }
    console.log(url);
    axios.get(url)
      .then(response => {
        console.log(response);
        this.setState({
          users: response.data.data
        });
      })
      .catch(err => {
        console.log(err);
      })
  }

  handleSubmit(e) {
    e.preventDefault();
    this.search();
  }

  render() {
    return (
      <div className="container" style={{ minHeight: '770px' }}>
        <div className="container bg-white p-3">
          <h1 className="m-3 text-center">User Management</h1>
          <form className="row" onSubmit={this.handleSubmit}>
            <div className="row mb-3">
              <label htmlFor="searchTxt" className="col-sm-2 col-form-label" style={{ color: 'black', fontFamily: 'Poppins', paddingRight: '0', width: '8em' }}>Search Type:</label>
              <div class="col-sm-3">
                <input className="form-control" name="search" id="searchTxt" type="text"
                  value={this.state.search} onChange={(e) => this.handleChange({ search: e.target.value })} />
              </div>
              <div class="col-sm-3">
                <select className="form-select" name="user_criteria" value={this.state.user_criteria} onChange={(e) => this.handleChange({ searchType: e.target.value })}>
                  <option value="Email">Email Search</option>
                  <option value="Fname">First Name Search</option>
                  <option value="Lname">Last Name Search</option>
                </select>
              </div>

              <div class="col-sm-3">
                <button className="btn btn-info" type='button' onClick={(e) => this.search()}>
                  Search
                </button>
              </div>
            </div>
          </form>

          <table className="table table-striped" style={{ background: "white" }}>
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Email</th>
                <th scope="col">Firstname</th>
                <th scope="col">Lastname</th>
                <th scope="col">Detail</th>
              </tr>
            </thead>
            <tbody>
              {<Users users={this.state.users} />}
            </tbody>
          </table>
        </div>
        <button className="btn btn-lg btn-primary position-fixed bottom-0 end-0 m-3"
          style={{ borderRadius: '10px' }}>
          <Link to="/adduser" style={{ textDecoration: 'none', color: 'white', padding: '0.5em 0' }}><i className="fa-solid fa-plus"></i> Add a new user</Link>
        </button>
      </div>
    );
  }
}

export default UserManagement;
