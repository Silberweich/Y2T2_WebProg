import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAxiosGet } from '../request'
import DeleteMovie from './DeleteRequest';

function Movie() {
    const { movie_ID } = useParams()
    // Create your own Mock API: https://mockapi.io/
    // const url = process.env.REACT_APP_WEBSERV_URL + `/movie/${movie_ID}`

    const url = process.env.REACT_APP_WEBSERV_URL + `/movie/${movie_ID}`

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
            <div className="row" >
                <div className="col-12 col-md-4" style={{paddingRight: '0'}}>
                    {/* test Img */}
                    <img src={movie.data.data.movie_image} style={{
                        background: "black", height: "550px", maxWidth: "350px", borderRadius: "10px", border: "2px solid red",
                        padding: "0", objectFit: "cover"
                    }} alt="movieImg" />
                </div>

                <div className="col-12 col-md-8">
                    <div className="card">
                        <div className="card-header">
                            <h3 className="text-center">Movie #{movie.data.data.movie_ID}</h3>
                        </div>
                        <div className="card-body">
                            <h5 className="card-title"><strong>Movie Name: {movie.data.data.movie_name}</strong></h5>
                            <p className="card-text">
                                Movie Genre: {movie.data.data.movie_genre} <br />
                                Movie Rate: PG{movie.data.data.movie_rate} <br />
                                Release Date: {date} <br />
                                Movie Length: {movie.data.data.movie_length} minute<br />
                                Soundtrack: {movie.data.data.soundtrack} &emsp; Subtitle: {movie.data.data.subtitle}<br />
                                Movie rating: {movie.data.data.movie_starRate} &#9733; <br />
                            </p>
                            <h5 className="card-title">Synopsis</h5>
                            <p className="card-text">{synopsis}</p>

                        </div>
                    </div>
                </div>
            </div>
    }

    return (
        <div className="container" style={{ margin: "20px auto", borderRadius: "15px", background: "white", width: "80%", padding: "20px 50px", minHeight: '750px' }}>

            <div className="position-relative">
                <button className="btn btn-primary" style={{ margin: "20px" }}
                    onClick={() => navigate("/adminmovies")}>
                    <i className="fa-solid fa-arrow-left"></i> Back
                </button>

                <DeleteMovie movie_id={movie_ID} />
            </div>
            {content}
            <div className="position-relative">
                <button className="btn btn-warning" style={{ margin: "20px" }}
                    onClick={() => navigate(`/movie/${movie_ID}/edit`)}>
                    <i className="fa-solid fa-pen-to-square"></i> Edit
                </button>
            </div>

        </div>
    )
}

export default Movie;