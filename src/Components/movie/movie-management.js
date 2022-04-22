import React from 'react';
import { Link } from "react-router-dom";
import './search.css';
import axios from 'axios'

class Movies extends React.Component {
    render() {
        if (this.props.movies.length > 0) {
            return (
                <div className="movielists">
                    {this.props.movies && this.props.movies.map(movie => {
                        return <Link to={`/movie/${movie.movie_ID}`} style={{textDecoration: 'none'}}>
                            <article>
                                <div className="movies-box">
                                    <div className="movies-img">
                                        <div className="rating"><i className="fas fa-star" />{movie.movie_starRate}</div>
                                        <div className="fav"><i className="fas fa-heart" /></div>
                                        <img src={movie.movie_image} alt={movie.movie_name} />
                                    </div>
                                    <a href="#container-ranking">
                                        {movie.movie_name}<br />{movie.released_year}
                                    </a>
                                </div>
                            </article>
                        </Link>
                    })}
                </div>
            );
        } else {
            return (
                <div class="container">
                    <img style={{width: '25%', display: 'block', marginLeft: 'auto', marginRight: 'auto'}} 
                    src={require("../../Assets/404 Error with a cute animal-pana.png")} alt="Not"/>
                </div>
            )
        }
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
            genres: [],  
        };
        this.domain = "http://localhost:4203";
        this.create = this.search.bind(this);
        this.update = this.create.bind(this);
        this.handleCheckbox = this.handleCheckbox.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        fetch(`${this.domain}/movie`, {
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

    search() {
        // console.log(this.state.genres);
        let soundQuery = "";
        if (this.state.genres){
            this.state.genres.forEach(value => {
                soundQuery = soundQuery + "&movieSound=" + value
            })
        }
        console.log(soundQuery);
        // let url = `${this.domain}/searchMoviesReact?movieSound=${this.state.movie_sound}
        // &movieGenre=${this.state.movie_genre}
        // &movieReleasedYr=${this.state.released_year}
        // &movieName=${this.state.movie_name}`
        
        let url = `${this.domain}/searchMoviesReact?movieName=${this.state.movie_name}&movieReleasedYr=${this.state.released_year}&movieGenre=${this.state.movie_genre}${soundQuery}`
        console.log(url);
        axios.get(url)
            .then(response => {
                console.log(response);
                this.setState({
                    movies: response.data.data
                });
            })
            .catch(err => {
                console.log(err);
            })
    }

    //https://medium.com/codex/handling-checkboxes-in-react-3a2514b140d2
    handleCheckbox(e){
        var isChecked = e.target.checked;  
        console.log(isChecked);
        if(isChecked) {
            this.setState({ genres: [...this.state.genres, e.target.value ]});
        } else {
            const index = this.state.genres.indexOf(e.target.value);    //Get the index of the value in the array
            this.state.genres.splice(index, 1);                         //Remove the item at index with only 1 item
            // this.setState({ genres: this.state.genres});                //Update the state
        }
        console.log(this.state.genres)
    }

    handleSubmit(e) {
        e.preventDefault();
        this.search(this.state.menu);
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
            <div className="bg-white" style={{ width: '95%', margin: '0 5vh 20px 5vh', borderRadius: '0.5rem', paddingBottom: '50px' }}>
                <div class="search-container">
                    <h1 className="introduck" style={{ padding: '50px 0' }}>Searching Movie</h1>
                    <form onSubmit={this.handleSubmit}>
                        <div className="search-field">
                            <input id="search" type="text" placeholder="Enter a Movie Name" name="movie_name" value={this.state.movie_name} onChange={this.handleChange} />
                            <button type="submit" style={{ backgroundColor: "black", border: "none" }}><i class="fas fa-search"></i></button>
                        </div>

                        <div class="search" style={{ backgroundColor: 'rgb(229, 229, 229)', padding: '1rem', margin: '4vh', borderRadius: '0.5rem' }}>
                            <label style={{ margin: '2vh', color: 'black', fontFamily: 'Poppins' }}>Genre:</label>
                            <select style={{ fontFamily: "Poppins" }} id="sortByGenre" name="movie_genre" value={this.state.movie_genre} onChange={this.handleChange}>
                                <option value="All">All</option>
                                <option value="Action">Action</option>
                                <option value="Animation">Animation</option>
                                <option value="Drama">Drama</option>
                                <option value="Horror">Horror</option>
                                <option value="Thriller">Thriller</option>
                            </select>

                            <label style={{ margin: '2vh', color: 'black', fontFamily: 'Poppins' }}>Released Year (from recent):</label>
                            <select style={{ fontFamily: "Poppins" }} id="sortByReleasedYr" name="released_year" value={this.state.released_year} onChange={this.handleChange}>
                                <option value="All">All</option>
                                <option value="2021">2021</option>
                                <option value="2020">2020</option>
                                <option value="2019">2019</option>
                                <option value="2018">2018</option>
                            </select>

                            <div class="adjust" style={{ paddingTop: '0.5rem' }}>
                                <label style={{ margin: '2vh', color: 'black', fontFamily: 'Poppins' }}>Soundtrack:</label>
                                <input type="checkbox" className="search-checkbox" id="EN" name="movieSound" value="EN" 
                                onChange={this.handleCheckbox} />
                                <label for="EN" className="soundtrack-select">EN</label>
                                <input type="checkbox" className="search-checkbox" id="JP" name="movieSound" value="JP" onChange={this.handleCheckbox}/>
                                <label className="soundtrack-select">JP</label>
                                <input type="checkbox" className="search-checkbox" id="KR" name="movieSound" value="KR" onChange={this.handleCheckbox}/>
                                <label className="soundtrack-select">KR</label>
                                <input type="checkbox" className="search-checkbox" id="TH" name="movieSound" value="TH" onChange={this.handleCheckbox}/>
                                <label className="soundtrack-select">TH</label>
                            </div>
                        </div>
                    </form>
                    <h1 style={{
                        fontFamily: 'Poppins', padding: '1rem',
                        backgroundColor: 'rgb(28, 28, 28)', borderRadius: '0.5rem',
                        textAlign: 'center', margin: '4vh', color: 'white'
                    }}>
                        List of {this.state.movies.length} movies
                    </h1>
                    {<Movies movies={this.state.movies} />}
                </div>
                <button className="btn btn-lg btn-primary position-fixed bottom-0 end-0 m-3"
                style={{borderRadius: '10px'}}>
                    <Link to="/addmovie" style={{textDecoration: 'none', color:'white'}}><i class="fa-solid fa-plus"></i> Add a new movie</Link>
                </button>
            </div>
        );
    }
}

export default MovieManagement;