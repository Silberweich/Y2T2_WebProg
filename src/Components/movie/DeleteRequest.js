import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom'
import React from 'react'

class DelMov extends React.Component {
    constructor(props) {
        super(props);
        this.delete = this.delete.bind(this);
    }

    delete(e) {
        const url = `http://localhost:4203/movie/`;
        console.log(this.props.movie_id)
        axios(url, {
            "method": "DELETE",
            data: {
                movie_ID: this.props.movie_id
            }
        })
            .then(response => {
                console.log(response);
                if (response.data.error === false) {
                    this.props.navigate('/adminmovies');
                    alert("This movie is successfully deleted");
                }
            })
            .catch(err => {
                console.log(err);
            });
    }

    render() {
        return (
            <button className="btn btn-danger position-absolute end-0" style={{ margin: "20px" }}
                onClick={(e) => this.delete(e)}>
                <i class="fa-solid fa-trash-can"></i> Delete
            </button >
        )
    }
}

function DeleteMovie(props) {
    let navigate = useNavigate();
    return <DelMov{...props} navigate={navigate} />
}

export default DeleteMovie;