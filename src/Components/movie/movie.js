import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAxiosGet } from '../request'
import axios from 'axios';
import DeleteMovie from './DeleteRequest';

function Movie() {
    const { movie_ID } = useParams()
    // Create your own Mock API: https://mockapi.io/
    const url = `http://localhost:4203/movie/${movie_ID}`

    const navigate = useNavigate()
    let movie = useAxiosGet(url)
    // console.log(url, movie);
    let content = null

    if (movie.error) {
        content = <div>
            <div className="bg-blue-300 mb-2 p-3">
                If you see this error. Please remember to create your own <a href="https://mockapi.io/">mock API</a>.
            </div>
            <div className="bg-red-300 p-3">
                There was an error please refresh or try again later.
            </div>
        </div>
    }

    if (movie.loading) {
        content = <div>Loading</div>
    }

    if (movie.data) {
        const synopsis = movie.data.data.synopsis ? movie.data.data.synopsis : "No description";
        const date = movie.data.data.release_date.slice(0, 10);
        content =
            <div class="row">
                <div className="col-12 col-md-4">
                    <img src={movie.data.data.movie_image}
                        style={{
                            background: "black", height: "550px", maxWidth: "350px", borderRadius: "10px", border: "2px solid red",
                            padding: "0", objectFit: "cover"
                        }} />
                </div>

                <div className="col-12 col-md-8">
                    <div className="card">
                        <div class="card-header">
                            <h3 className="text-center">Movie #{movie.data.data.movie_ID}</h3>
                        </div>
                        <div class="card-body">
                            <h5 class="card-title"><strong>Movie Name: {movie.data.data.movie_name}</strong></h5>
                            <p class="card-text">
                                Movie Genre: {movie.data.data.movie_genre} <br />
                                Movie Rate: PG{movie.data.data.movie_rate} <br />
                                Release Date: {date} <br />
                                Movie Length: {movie.data.data.movie_length} minute<br />
                                Soundtrack: {movie.data.data.soundtrack} &emsp; Subtitle: {movie.data.data.subtitle}<br />
                                Movie rating: {movie.data.data.movie_starRate} &#9733; <br />
                            </p>
                            <h5 class="card-title">Synopsis</h5>
                            <p class="card-text">{synopsis}</p>
                        </div>
                    </div>
                </div>
            </div>
    }

    return (
        <div className="container" style={{ margin: "20px auto", borderRadius: "15px", background: "white", width: "60%", padding: "20px", minHeight: '750px' }}>
            <div class="position-relative">
                <button className="btn btn-primary" style={{ margin: "20px" }}
                    onClick={() => navigate("/adminmovies")}>
                    <i class="fa-solid fa-arrow-left"></i> Back
                </button>

                <DeleteMovie movie_id={movie_ID}/>
            </div>
            {content}
        </div>
    )
}

export default Movie;