import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom'
import React from 'react'

class UpMov extends React.Component {
constructor(props) {
        super(props);

        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        today = yyyy + '-' + mm + '-' + dd;

        this.state = {
            movie_id: '',
            movie_name: '',
            movie_genre: '',
            released_date: today,
            movie_image: '',
            movie_rate: '',
            movie_starRate: '',
            movie_length: '',
            movie_soundtrack: 'EN',
            movie_subtitle: null,
            movie_synopsis: '',
        };
        this.domain = "http://localhost:4203";
        this.update = this.update.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount() {
        let url = `${this.domain}/movie/${this.props.movie_id}`
        console.log(url);
        axios.get(url)
            .then(response => {
                const data = response.data.data
                this.setState({
                    movie_id: data.movie_ID,
                    movie_name: data.movie_name,
                    movie_image: data.movie_image,
                    movie_rate: data.movie_rate,
                    movie_starRate: data.movie_starRate,
                    movie_length: data.movie_length,
                    movie_soundtrack: data.soundtrack,
                    movie_subtitle: data.subtitle,
                    movie_synopsis: data.synopsis,
                    released_date: data.release_date.slice(0,10)
                });
            })
            .catch(err => {
                console.log(err);
            })
    }

    update() {
        // let url = `${this.domain}/movie`
        // // const data = { 
        // //     movie_ID: 999,
        // //     movie_name: "TestMovie",
        // //     movie_genre: "Horror",
        // //     movie_rate: 18,
        // //     release_date: "2021-10-27",
        // //     movie_length: 999,
        // //     soundtrack: "TH",
        // //     subtitle: null,
        // //     movie_starRate: "0.0",
        // //     synopsis: "THIS IS A SYNOPSIS",
        // //     movie_image: "https://picsum.photos/seed/picsum/200/300"
        // // };
        const data = {
            movie_ID: this.state.movie_id,
            movie_name: this.state.movie_name,
            movie_genre: this.state.movie_genre,
            movie_rate: this.state.movie_rate,
            release_date: this.state.released_date,
            movie_length: this.state.movie_length,
            soundtrack: this.state.movie_soundtrack,
            subtitle: this.state.movie_subtitle,
            movie_starRate: this.state.movie_starRate,
            synopsis: this.state.movie_synopsis,
            movie_image: this.state.movie_image
        };
        if (data.movie_starRate.match('[0-4].[0-9]|5.0') == null) {
            throw Error(`Wrong starRate format`);
        }
        let url = `${this.domain}/movie`
        axios.put(url, { data: data })
            .then(response => {
                console.log(response);
                this.setState({
                    movies: response.data.data
                });
                this.props.navigate('/adminmovies');
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
        this.update();
    }

    render() {
        return (
            <div className="container bg-light p-4" style={{ borderRadius: '15px', margin: '20px auto' }}>
                <h1 className="text-center m-3">Edit Movie #{this.props.movie_ID}</h1>
                <form className="row g-3" onSubmit={this.handleSubmit}>
                    <div className="col-md-2">
                        <label htmlFor="movieid" className="form-label">Movie ID</label>
                        <input type="number" className="form-control" id="movieid"
                            name="movie_id" value={this.state.movie_id} onChange={this.handleChange} />
                    </div>
                    <div className="col-md-5">
                        <label htmlFor="inputPassword4" className="form-label">Movie Name</label>
                        <input type="text" className="form-control" id="moviename"
                            name="movie_name" value={this.state.movie_name} onChange={this.handleChange} />
                    </div>
                    <div className="col-5">
                        <label htmlFor="inputAddress" className="form-label">Release Date</label>
                        <input type="date" className="form-control" id="releasedate"
                            name="released_date" value={this.state.released_date} onChange={this.handleChange} />
                    </div>
                    <div className="col-12">
                        <label htmlFor="movieimage" className="form-label">Movie Image</label>
                        <input type="text" className="form-control" id="movieimage" placeholder="URL"
                            name="movie_image" value={this.state.movie_image} onChange={this.handleChange} />
                    </div>
                    <div className="col-md-2">
                        <label htmlFor="movierate" className="form-label">Movie Rate</label>
                        <input type="number" className="form-control" id="movierate"
                            name="movie_rate" value={this.state.movie_rate} onChange={this.handleChange} />
                    </div>
                    <div className="col-md-2">
                        <label htmlFor="movielength" className="form-label">Movie Length</label>
                        <input type="number" className="form-control" id="movielength"
                            name="movie_length" value={this.state.movie_length} onChange={this.handleChange} />
                    </div>
                    <div className="col-md-2">
                        <label htmlFor="moviestar" className="form-label" >Movie Star Rate</label>
                        <input type="number" className="form-control" id="moviestar" pattern="[0-4].[0-9]|5.0"
                            name="movie_starRate" value={this.state.movie_starRate} onChange={this.handleChange} />
                    </div>
                    <div className="col-md-3">
                        <label htmlFor="soundtrack" className="form-label">Soundtrack</label>
                        <select id="soundtrack" className="form-select"
                            name="movie_soundtrack" value={this.state.movie_soundtrack} onChange={this.handleChange}>
                            <option value="EN">EN</option>
                            <option value="Th">TH</option>
                            <option value="KR">KR</option>
                            <option value="JP">JP</option>
                        </select>
                    </div>
                    <div className="col-md-3">
                        <label htmlFor="subtitle" className="form-label">Subtitle</label>
                        <select id="subtitle" className="form-select"
                            name="movie_subtitle" value={this.state.movie_subtitle} onChange={this.handleChange}>
                            <option>None</option>
                            <option value="EN">EN</option>
                            <option value="Th">TH</option>
                            <option value="KR">KR</option>
                            <option value="JP">JP</option>
                        </select>
                    </div>
                    <div className="col-12">
                        <label htmlFor="synopsis" className="form-label">Synopsis</label>
                        <textarea className="form-control" id="synopsis" rows={5}
                            name="movie_synopsis" value={this.state.movie_synopsis} onChange={this.handleChange} />
                    </div>
                    <div className="d-grid col-6 mx-auto">
                        <button className="btn btn-lg btn-warning" type="submit">Confrim Update</button>
                    </div>

                </form>
            </div>
        )
    }
}

function UpdateMovie(props) {
    let navigate = useNavigate();
    console.log(props)
    return <UpMov{...props} navigate={navigate} />
}

export default UpdateMovie;