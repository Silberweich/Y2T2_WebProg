import React from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useAxiosGet } from '../request'
import UpdateMovie from './UpdateRequest';

function MovieUpdateForm() {
    const { movie_ID } = useParams()
    console.log(movie_ID);
    // Create your own Mock API: https://mockapi.io/
    const url = process.env.REACT_APP_WEBSERV_URL + `/movie/${movie_ID}`
        
    const navigate = useNavigate()
    let movie = useAxiosGet(url)
    console.log(url, movie);
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
    }

    return (
        <div className="container" style={{ margin: "20px auto", borderRadius: "15px", background: "white", width: "60%", padding: "20px", minHeight: '750px' }}>
            <button className="btn btn-primary" style={{ margin: "5px" }}>
                <Link to={`/movie/${movie_ID}`} style={{textDecoration:'none', color:'white'}}><i class="fa-solid fa-arrow-left"></i> Back </Link>
            </button>
            <UpdateMovie movie_id={movie_ID} />
        </div>
    )
}

export default MovieUpdateForm;