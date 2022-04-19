import React from 'react';
class Movies extends React.Component {
    render() {
        return (
            <table className="table table-striped" style={{ background: "white", borderRadius: "5px"}}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Since</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.movies && this.props.movies.map(movie => {
                        return <tr>
                            <td>{movie.email}</td>
                            <td>{movie.first_name}</td>
                            <td>{movie.last_name}</td>
                        </tr>
                    })}
                </tbody>
            </table>
        );
    }
}

class MovieManagement extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            movies: [],
            movie_name: '',
            movie_genre: '',
            released_year: '',
            movie_sound: '',
        };
        this.domain = "http://localhost:4203";
        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
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
                console.log(response);
                this.setState({
                    movies: response.data
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
    update(e) {
        // update entity - PUT
        e.preventDefault();
    }
    delete(e) {
        // delete entity - DELETE
        e.preventDefault();
    }
    handleChange(changeObject) {
        this.setState(changeObject)
    }

    render() {
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <h1 className="display-4 text-center">Make An API Call in React</h1>
                        <form className="d-flex flex-column">
                            <legend className="text-center">Add-Update-Delete Friend</legend>
                            <label htmlFor="movie_name">
                                Movie Name:
                                <input name="movie_name"
                                    id="movie_name"
                                    type="text"
                                    className="form-control"
                                    value={this.state.movie_name}
                                    onChange={(e) => this.handleChange({ movie_name: e.target.value })}
                                    required
                                />
                            </label>
                            <label htmlFor="movie_genre">
                                Movie Genre:
                                <input
                                    name="movie_genre"
                                    id="movie_genre"
                                    type="test"
                                    className="form-control"
                                    value={this.state.movie_genre}
                                    onChange={(e) => this.handleChange({ movie_genre: e.target.value })}
                                    required
                                />
                            </label>
                            <label htmlFor="released_year">
                                Released Year:
                                <input
                                    name="released_year"
                                    id="released_year"
                                    type="number"
                                    className="form-control"
                                    value={this.state.released_year}
                                    onChange={(e) => this.handleChange({ released_year: e.target.value })}
                                />
                            </label>
                            <label htmlFor="movie_sound">
                                Movie Sound:
                                <input
                                    name="movie_sound"
                                    id="movie_sound"
                                    type="number"
                                    className="form-control"
                                    value={this.state.movie_sound}
                                    onChange={(e) => this.handleChange({ movie_sound: e.target.value })}
                                />
                            </label>
                                <Movies movies={this.state.movies} />
                            <button className="btn btn-primary" type='button' onClick={(e) => this.create(e)}>
                                Add
                            </button>
                            <button className="btn btn-info" type='button' onClick={(e) => this.update(e)}>
                                Update
                            </button>
                            <button className="btn btn-danger" type='button' onClick={(e) => this.delete(e)}>
                                Delete
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default MovieManagement;
