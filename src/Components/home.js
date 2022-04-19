import React, { Component } from 'react'
import { Link } from "react-router-dom";
import Nav from './navbar';
import Banner from '../Assets/minor_banner.jpg'

class Home extends Component {
    render() {
        return (
            <div>
                <main style={{ background: 'azure', height: '500px', }}>

                    <section class="item-wide highlighth_hov" style={{ textAlign: 'center', overflow: 'hidden', padding: '2%' }}>
                        <Link to="/adminlogin"><img src={Banner} class="auto-size" width="100%"/></Link>
                    </section>

                    <section class="item-wide-3" style={{ textAlign: 'center', overflow: 'hidden' }}>
                        <h1>BROWSE GENRE</h1>
                    </section>

                    {/* <section class="item-wide-4 auto-size" style="padding-bottom: 3%">
                        <div class="carousel " data-flickity='{"groupCells": true}'>
                            <cell class="carousel-cell">
                                <a href="search"><img src="Assets/Genre/action.jpg">
                                    <p class="centered-text">ACTION</p>
                                </a>
                            </cell>
                            <cell class="carousel-cell">
                                <a href="search"><img src="Assets/Genre/adventure.jpg">
                                    <p class="centered-text">ADVENTURE</p>
                                </a>
                            </cell>
                            <cell class="carousel-cell">
                                <a href="search"><img src="Assets/Genre/animated.jpg">
                                    <p class="centered-text">ANIMATED</p>
                                </a>
                            </cell>
                            <cell class="carousel-cell">
                                <a href="search"><img src="Assets/Genre/comedy.jpg">
                                    <p class="centered-text">COMEDY</p>
                                </a>
                            </cell>
                            <cell class="carousel-cell">
                                <a href="search"><img src="Assets/Genre/crime.jpg">
                                    <p class="centered-text">CRIME</p>
                                </a>
                            </cell>
                            <cell class="carousel-cell">
                                <a href="search"><img src="Assets/Genre/drama.jpg">
                                    <p class="centered-text">DRAMA</p>
                                </a>
                            </cell>
                            <cell class="carousel-cell">
                                <a href="search"><img src="Assets/Genre/fantasy.jpg">
                                    <p class="centered-text">FANTASY</p>
                                </a>
                            </cell>
                            <cell class="carousel-cell">
                                <a href="search"><img src="Assets/Genre/historical.jpg">
                                    <p class="centered-text">HISTORICAL</p>
                                </a>
                            </cell>
                            <cell class="carousel-cell">
                                <a href="search"><img src="Assets/Genre/horror.jpg">
                                    <p class="centered-text">HORROR</p>
                                </a>
                            </cell>
                            <cell class="carousel-cell">
                                <a href="search"><img src="Assets/Genre/scifi.jpg">
                                    <p class="centered-text">SCI-FI</p>
                                </a>
                            </cell>
                            <cell class="carousel-cell">
                                <a href="search"><img src="Assets/Genre/thriller.jpg">
                                    <p class="centered-text">THRILLER</p>
                                </a>
                            </cell>
                            <cell class="carousel-cell">
                                <a href="search"><img src="Assets/Genre/western.jpg">
                                    <p class="centered-text">WESTERN</p>
                                </a>
                            </cell>
                        </div>
                    </section> */}
                </main>
            </div>

        )
    }
}

export default Home;