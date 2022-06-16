import React from 'react'
import { useParams, useNavigate} from 'react-router-dom'
import { useAxiosGet } from './request'
import UpdateUser from './userEditor';

function User() {
    const { email } = useParams()

    const url = process.env.REACT_APP_WEBSERV_URL + `/user/${email}`

    const navigate = useNavigate()
    let product = useAxiosGet(url)
    let content = null

    if (product.error) {
        content = <div>
            <div className="bg-blue-300 mb-2 p-3">
                If you see this error. Please remember to create your own <a href="https://mockapi.io/">mock API</a>.
            </div>
            <div className="bg-red-300 p-3">
                There was an error please refresh or try again later.
            </div>
        </div>
    }

    if (product.loading) {
        content = <div>Loading</div>
    }
    // big chuck of 'each' user
    if (product.data) {
        // console.log("proddata : ", product.data.data.password)
        content =
            <div className="row">
                <div className="col dummy" style={{ background: "black", height: "550px", width: "300px", marginLeft: "12px", borderRadius: "10px" }}>
                </div>
                <div className="col col-8">
                    <div className="card">
                        <div className="card-header">
                            <h3 className="text-center">Profile</h3>
                        </div>
                        <div className="card-body">
                            {/* <h3>Size: {product.data}</h3> */}
                            <h5 className="card-title">{product.data.data.first_name} {product.data.data.last_name}</h5>
                            <p className="card-text">Email: {product.data.data.email}</p>
                            <p className="card-text">Age: {product.data.data.age}</p>
                        </div>
                        <div className="card-body">
                            <h5 className="card-title">About me</h5>
                            <p className="card-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam temporibus dolores quis aut quisquam. Aliquam, voluptatibus eaque incidunt maxime ea, corrupti minima soluta cumque est voluptatem quasi saepe laborum facilis!
                                Velit sapiente architecto ad quo, illum, numquam aut facere natus excepturi labore esse, distinctio sequi! Delectus vero fugit, nulla voluptates doloribus ab asperiores, voluptatum quae cupiditate inventore, modi eum mollitia.
                                Omnis commodi distinctio inventore ipsum quasi aliquam voluptatem illo sit mollitia ipsam?
                            </p>
                        </div>
                    </div>
                </div>
            </div>
    }

    return (
        <div className="container" style={{ margin: "20px auto", borderRadius: "15px", background: "white", width: "60%",  padding: "20px"}}>
            <button className="btn btn-primary" style={{ margin: "20px" }}
                onClick={() => navigate("/adminusers")}>
                <i className="fa-solid fa-arrow-left"></i> Back
            </button>
            {content}
            <UpdateUser email={email}/>
        </div>
    )
}

export default User