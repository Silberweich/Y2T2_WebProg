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
                                    <div style={{color: 'black', fontWeight: 'bold', textAlign: 'center', fontSize: '18px', margin: '15px'}}>
                                        {movie.movie_name}
                                    </div>
                                </div>
                            </article>
                        </Link>
                    })}
                </div>
            );
        } else {
            return (
                <div className="container">
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
            soundtracks: [],  
        };
        this.domain = process.env.REACT_APP_WEBSERV_URL;
        this.search = this.search.bind(this);
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

    search() {
        // console.log(this.state.soundtracks);
        let soundQuery = "";
        if (this.state.soundtracks){
            this.state.soundtracks.forEach(value => {
                soundQuery = soundQuery + "&movieSound=" + value
            })
        }
        console.log(soundQuery);
        // let url = `${this.domain}/searchMoviesReact?movieSound=${this.state.movie_sound}
        // &movieGenre=${this.state.movie_genre}
        // &movieReleasedYr=${this.state.released_year}
        // &movieName=${this.state.movie_name}`
        
        let url = process.env.REACT_APP_WEBSERV_URL + `/searchMoviesReact?movieName=${this.state.movie_name}&movieReleasedYr=${this.state.released_year}&movieGenre=${this.state.movie_genre}${soundQuery}`
        // let url = `${this.domain}/searchMoviesReact?movieName=${this.state.movie_name}&movieReleasedYr=${this.state.released_year}&movieGenre=${this.state.movie_genre}${soundQuery}`
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
            this.setState({ soundtracks: [...this.state.soundtracks, e.target.value ]});
        } else {
            const index = this.state.soundtracks.indexOf(e.target.value);    //Get the index of the value in the array
            this.state.soundtracks.splice(index, 1);                         //Remove the item at index with only 1 item
            // this.setState({ soundtracks: this.state.soundtracks});        //Update the state, This is the original one, but I think it works since line 113
        }
        console.log(this.state.soundtracks)
    }

    handleSubmit(e) {
        e.preventDefault();
        this.search();
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
                <div className="search-container">
                    <h1 className="introduck" style={{ padding: '50px 0' }}>Searching Movie</h1>
                    <form onSubmit={this.handleSubmit}>
                        <div className="search-field">
                            <input id="search" type="text" placeholder="Enter a Movie Name" name="movie_name" value={this.state.movie_name} onChange={this.handleChange}
                            style={{
                                WebkitTextFillColor: 'rgb(255, 255, 255)',
                                /*inset - the background color drawn inside this area */
                                WebkitBoxShadow: '0 0 0px 1000px rgb(0, 0, 0) inset'
                            }}/>
                            <button type="submit" style={{ backgroundColor: "black", border: "none" }}><i className="fas fa-search"></i></button>
                        </div>

                        <div className="search" style={{ backgroundColor: 'rgb(229, 229, 229)', padding: '1rem', margin: '4vh', borderRadius: '0.5rem' }}>
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

                            <div className="adjust" style={{ paddingTop: '0.5rem' }}>
                                <label style={{ margin: '2vh', color: 'black', fontFamily: 'Poppins' }}>Soundtrack:</label>
                                <input type="checkbox" className="search-checkbox" id="EN" name="movieSound" value="EN" 
                                onChange={this.handleCheckbox} />
                                <label htmlFor="EN" className="soundtrack-select">EN</label>
                                <input type="checkbox" className="search-checkbox" id="JP" name="movieSound" value="JP" onChange={this.handleCheckbox}/>
                                <label htmlFor="JP" className="soundtrack-select">JP</label>
                                <input type="checkbox" className="search-checkbox" id="KR" name="movieSound" value="KR" onChange={this.handleCheckbox}/>
                                <label htmlFor="KR" className="soundtrack-select">KR</label>
                                <input type="checkbox" className="search-checkbox" id="TH" name="movieSound" value="TH" onChange={this.handleCheckbox}/>
                                <label htmlFor="TH" className="soundtrack-select">TH</label>
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
                    <Link to="/addmovie" style={{textDecoration: 'none', color:'white', padding: '0.5em 0'}}><i className="fa-solid fa-plus"></i> Add a new movie</Link>
                </button>
            </div>
        );
    }
}

export default MovieManagement;