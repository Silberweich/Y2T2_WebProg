import React from 'react';
import { Link } from "react-router-dom";

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
          <Link to={`/user/${data[i].email}`}><button type="button" class="btn btn-outline-dark">View Profile</button></Link>
        </td>
      </tr>
    )
  }
  return elements
}

class Friends extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      friends: [],
      search: "",
      searchType: "email",
      motherfucker: 1,
    };
    this.updateStateRightFuckingNow()
  }
  handleChange(changeObject) {
    this.setState(changeObject)
  }

  refreshPage() {
    window.location.reload(false);
  }

  reducedList(){
    console.log(this.state.friends)
    let _s = this.state.search
    let _t = this.state.searchType
    this.updateStateRightFuckingNow()
    
    switch(_t){
      case "email":
        console.log("email")
        console.log("fname")
        if(_s == ""){
          this.state.search = ""
          this.updateStateRightFuckingNow()
        }
        else{
          for (let i = 0; i < this.state.friends.length ; i++){
            if(!this.state.friends[i].email.includes(_s)){
              this.state.friends.splice(i,1)
            }
          }
        }

        this.updateStateRightFuckingNow()
      break;

      case "fname":
        console.log("fname")
        if(/[^a-zA-Z]/g.test(_s) || _s == ""){
          this.state.search = ""
          this.updateStateRightFuckingNow()
        }
        else{
          for (let i = 0; i < this.state.friends.length ; i++){
            for (let i = 0; i < this.state.friends.length ; i++){
              if(!this.state.friends[i].first_name.includes(_s)){
                this.state.friends.splice(i,1)
              }
            }
          }
        }

        this.updateStateRightFuckingNow()
      break;

      case "lname":
        console.log("lname")
        if(/[^a-zA-Z]/g.test(_s) || _s == ""){
          this.state.search = ""
          this.updateStateRightFuckingNow()
        }
        else{
          for (let i = 0; i < this.state.friends.length ; i++){
            for (let i = 0; i < this.state.friends.length ; i++){
              if(!this.state.friends[i].last_name.includes(_s)){
                this.state.friends.splice(i,1)
              }
            }
          }
        }
        this.updateStateRightFuckingNow()
      break;

      default:
        this.state.search = "ERROR:TYPE"
        this.updateStateRightFuckingNow()
    }
  }

  updateStateRightFuckingNow(){
    this.setState({motherfucker: 1})
  }

  render() {
    this.state.friends = this.props.friends;
    return (
      <><form>
        <label style={{ color: 'black', fontFamily: 'Poppins' }}>Search Type: </label>
        <label>
          <input
            name="search"
            id="search"
            type="text"
            className="form-control"
            value={this.state.search}
            onChange={(e) => this.handleChange({search: e.target.value})} />
        </label>

        <select name="movie_genre" value={this.state.movie_genre} onChange={(e) => this.handleChange({ searchType: e.target.value })}>
          <option value="email">Email Search</option>
          <option value="fname">First Name Search</option>
          <option value="lname">Last Name Search</option>
        </select>

        <button 
          className="btn btn-info"
          type='button'
          onClick={(e) => this.reducedList()}>
          Search 
        </button>
        <button 
          className="btn btn-info"
          type='button'
          onClick={(e) => this.refreshPage()}>
          Click to reload!
        </button>
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
            {generateList(this.state.friends)}
          </tbody>
        </table></>
    );
  }
}

class UserManagement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      friends: [],
      name: '',
      id: '',
      notes: '',
      getData: false,
    };
    this.domain = "http://localhost:4203";
    this.create = this.create.bind(this);
    this.handleChange = this.handleChange.bind(this);
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
          friends: response.data
        })
      })
      .catch(err => {
        console.log(err);
      });
  }

  create(e) {
    // add entity - POST
    e.preventDefault();
  }

  handleChange(changeObject) {
    this.setState(changeObject)
  }

  render() {
    return (
      <div className="container">
        <form>
          <legend className="text-center">CRUD User</legend>
          <label htmlFor="name">
            Email:
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
            Password:
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
            Firstname:
            <input
              name="id"
              id="id"
              type="text"
              className="form-control"
              value={this.state.id}
              onChange={(e) => this.handleChange({ id: e.target.value })}
            />
          </label>
          <label htmlFor="id">
            Lastname:
            <input
              name="id"
              id="id"
              type="text"
              className="form-control"
              value={this.state.id}
              onChange={(e) => this.handleChange({ id: e.target.value })}
            />
          </label>
          <label htmlFor="id">
            Age:
            <input
              name="id"
              id="id"
              type="number"
              className="form-control"
              value={this.state.id}
              onChange={(e) => this.handleChange({ id: e.target.value })}
            />
          </label>
          <button className="btn btn-primary" type='button' onClick={(e) => this.create(e)}>
            Add
          </button>
          <button className="btn btn-info" type='button' onClick={(e) => this.update(e)}>
            Update
          </button>
        </form>
        <Friends friends={this.state.friends}/>
      </div>
    );
  }
}

export default UserManagement;
