import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './home.css';

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            movies: '',
            friends: '',
        }       
        this.domain = process.env.REACT_APP_WEBSERV_URL;
      }

    componentDidMount() {
        Promise.all([   // Combine from fetch to 1 single array
            fetch(`${this.domain}/movie`).then(response => response.json()),
            fetch(`${this.domain}/user`).then(response => response.json())
        ]).then(([dataMovies, dataFriends]) => {
            // console.log("data mov : ", dataMovies.data.length)
            // console.log("data fri : ", dataFriends.data.length)
            this.setState({
                movies: dataMovies.data.length,
                friends: dataFriends.data.length,
            });
            console.log(this.state.movies)
            console.log(this.state.friends)
        })
        .catch(err => {
            console.log(err);
        });
    }

    render() {
        return (
            <div>
                <main style={{ background: 'azure', height: "auto"}}> 
                    <div className="bigBanner">
                        <h1 className='welcome'>Welcome Admin</h1>
                        <Link to="/adminlogin">
                            <button type="button" className="btn btn-outline-dark">Login Page</button>
                        </Link>
                    </div>
                    
                    {/* <--- Progress Dashboard Bar ---> */}
                    <div className="shadow p-3 mb-5 bg-white rounded">
                        {/* Card */}
                        <h1 className="header">Overview</h1>
                        <div className="row">
                            <div className="col-md-4 col-xl-3">
                                <div className="card bg-c-blue order-card">
                                    <div className="card-block">
                                        <Link style={{textDecoration: "none", color: "white"}} to="/">
                                            <h4 className="text-right"><i className="fa-solid fa-eye"></i> Total Visted</h4>
                                            <h3>999</h3>
                                            <p className="card-text" style={{color: "rgb(255, 255, 255, 0.75)"}}>Last updated 3 mins ago</p>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="col-md-4 col-xl-3">
                                <div className="card bg-c-green order-card">
                                    <div className="card-block">
                                        <Link style={{textDecoration: "none", color: "white"}} to="/adminmovies">
                                            <h4 className="text-right"><i className="fa-solid fa-clapperboard"></i> Total Movies</h4>
                                            <h3>{this.state.movies}</h3>
                                            <p className="card-text" style={{color: "rgb(255, 255, 255, 0.75)"}}>Last updated 6 mins ago</p>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="col-md-4 col-xl-3">
                                <div className="card bg-c-yellow order-card">
                                    <div className="card-block">
                                        <Link style={{textDecoration: "none", color: "white"}} to="/adminusers">
                                            <h4 className="text-right"><i className="fa-solid fa-user"></i> Total Users</h4>
                                            <h3>{this.state.friends}</h3>
                                            <p className="card-text" style={{color: "rgb(255, 255, 255, 0.75)"}}>Last updated 16 mins ago</p>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="col-md-4 col-xl-3">
                                <div className="card bg-c-pink order-card">
                                    <div className="card-block">
                                        <Link style={{textDecoration: "none", color: "white"}} to="/">
                                            <h4 className="text-right"><i className="fa-brands fa-android"></i> Total Admins</h4>
                                            <h3>4</h3>
                                            <p className="card-text" style={{color: "rgb(255, 255, 255, 0.75)"}}>Last updated 15 mins ago</p>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* <--- Membruh Section ---> */}
                    <div className="shadow p-3 mb-5 bg-white rounded">
                        <section className="section-team">
                        <div className="container">
                            {/* Start Header Section */}
                                <div className="row justify-content-center text-center">
                                    <div className="col-md-8 col-lg-6">
                                        <div className="header-section">
                                            <h2 className="title">Let's meet with our team members</h2>
                                        </div>
                                    </div>
                                </div>
                            
                            <div className="row">
                                {/* Start Single Person 1 */}
                                <div className="col-sm-6 col-lg-4 col-xl-3">
                                <div className="single-person">
                                    <div className="person-image">
                                        <img src={require('../Assets/View.png')} alt="Boss" />
                                        <span className="icon"></span>
                                    </div>
                                    <div className="person-info">
                                        <h3 className="full-name">Kulawut Makkamoltham</h3>
                                        <span className="speciality">Web Developer</span>
                                        <div className="contact">
                                            <a href="https://www.linkedin.com/in/kulawut-makkamoltham-561478225/" target="_blank" rel="noreferrer"><i className="fa-brands fa-linkedin"></i></a>
                                            <a href="https://github.com/Vvidsky" target="_blank" rel="noreferrer"><i className="fa-brands fa-github-square"></i></a>
                                            <a href="https://www.instagram.com/view.klw/" target="_blank" rel="noreferrer"><i className="fa-brands fa-instagram-square"></i></a>    
                                        </div>
                                    </div>
                                </div>
                                </div>
                                {/* Start Single Person 2 */}
                                <div className="col-sm-6 col-lg-4 col-xl-3">
                                <div className="single-person">
                                    <div className="person-image">
                                        <img src={require('../Assets/Eng.png')}  alt="Eng" />
                                        <span className="icon"></span>
                                    </div>
                                    <div className="person-info">
                                        <h3 className="full-name">Phichayut Ngeonnim</h3>
                                        <span className="speciality">WordPress Developer</span>
                                        <div className="contact">
                                            <a href="https://www.linkedin.com/in/phi-ngoennim/" target="_blank" rel="noreferrer"><i className="fa-brands fa-linkedin"></i></a>
                                            <a href="https://github.com/Silberweich" target="_blank" rel="noreferrer"><i className="fa-brands fa-github-square"></i></a>
                                            <a href="/" rel="noreferrer"><i className="fa-brands fa-instagram-square"></i></a>    
                                        </div>
                                    </div>
                                </div>
                                </div>
                                {/* Start Single Person 3 */}
                                <div className="col-sm-6 col-lg-4 col-xl-3">
                                <div className="single-person">
                                    <div className="person-image">
                                        <img src={require('../Assets/Chan.png')}  alt="Chan" />
                                        <span className="icon"></span>
                                    </div>
                                    <div className="person-info">
                                        <h3 className="full-name">Ariya<br/>Phengphon</h3>
                                        <span className="speciality">Angular Developer</span>
                                        <div className="contact">
                                            <a href="https://www.linkedin.com/in/ariya-phengphon/" target="_blank" rel="noreferrer"><i className="fa-brands fa-linkedin"></i></a>
                                            <a href="https://github.com/ChanAndKlee" target="_blank" rel="noreferrer"><i className="fa-brands fa-github-square"></i></a>
                                            <a href="https://www.instagram.com/chanariya_/" target="_blank" rel="noreferrer"><i className="fa-brands fa-instagram-square"></i></a>    
                                        </div>
                                    </div>
                                </div>
                                </div>
                                {/* Start Single Person 4 */}
                                <div className="col-sm-6 col-lg-4 col-xl-3">
                                <div className="single-person">
                                    <div className="person-image">
                                        <img src={require('../Assets/Pete.png')} alt="Pete" />
                                        <span className="icon"></span>
                                    </div>
                                    <div className="person-info">
                                        <h3 className="full-name">Perakorn Nimitkul</h3>
                                        <span className="speciality">Javascript Developer</span>
                                        <div className="contact">
                                            <a href="/" rel="noreferrer"><i className="fa-brands fa-linkedin"></i></a>
                                            <a href="https://github.com/Nyavioly" target="_blank" rel="noreferrer"><i className="fa-brands fa-github-square"></i></a>
                                            <a href="https://www.instagram.com/perakorn_nimitkul/" target="_blank" rel="noreferrer"><i className="fa-brands fa-instagram-square"></i></a>    
                                        </div>
                                    </div>
                                </div>
                                </div>
                                {/* / End Single Person */}
                            </div>
                        </div>
                        </section>
                    </div>
                    {/* End here  */}
                </main>
            </div>
        )
    }
}

export default Home;