import React, { Component } from 'react'

class Addmovie extends Component {
    render() {
        return (
            <div className="container bg-light p-4" style={{borderRadius: '15px', margin: '20px auto'}}>
                <h1 className="text-center m-3">Add a new movie</h1>
                <form className="row g-3">
                    <div className="col-md-2">
                        <label htmlFor="movieid" className="form-label">Movie ID</label>
                        <input type="number" className="form-control" id="movieid" />
                    </div>
                    <div className="col-md-5">
                        <label htmlFor="inputPassword4" className="form-label">Movie Name</label>
                        <input type="text" className="form-control" id="inputPassword4" />
                    </div>
                    <div className="col-5">
                        <label htmlFor="inputAddress" className="form-label">Release Date</label>
                        <input type="date" className="form-control" id="inputAddress" placeholder="1234 Main St" />
                    </div>
                    <div className="col-12">
                        <label htmlFor="movieimage" className="form-label">Movie Image</label>
                        <input type="text" className="form-control" id="movieimage" placeholder="URL" />
                    </div>
                    <div className="col-md-2">
                        <label htmlFor="movierate" className="form-label">Movie Rate</label>
                        <input type="number" className="form-control" id="movierate" />
                    </div>
                    <div className="col-md-2">
                        <label htmlFor="movielength" className="form-label">Movie Length</label>
                        <input type="number" className="form-control" id="movielength" />
                    </div>
                    <div className="col-md-2">
                        <label htmlFor="moviestar" className="form-label" >Movie Star Rate</label>
                        <input type="number" className="form-control" id="moviestar" pattern="[0-4].[0-9]|5.0"/>
                    </div>
                    <div className="col-md-2">
                        <label htmlFor="soundtrack" className="form-label">Soundtrack</label>
                        <select id="soundtrack" className="form-select">
                            <option value="EN">EN</option>
                            <option value="Th">TH</option>
                            <option value="KR">KR</option>
                            <option value="JP">JP</option>
                        </select>
                    </div>
                    <div className="col-md-2">
                        <label htmlFor="subtitle" className="form-label">Subtitle</label>
                        <select id="subtitle" className="form-select">
                            <option>None</option>
                            <option value="EN">EN</option>
                            <option value="Th">TH</option>
                            <option value="KR">KR</option>
                            <option value="JP">JP</option>
                        </select>
                    </div>
                    <div className="col-12">
                        <label htmlFor="synopsis" className="form-label">Synopsis</label>
                        <textarea className="form-control" id="synopsis" rows={5} defaultValue={""} />
                    </div>
                    <div className="d-grid col-6 mx-auto">
                        <button className="btn btn-lg btn-warning" type="button">Add Movie!!!</button>
                    </div>

                </form>
            </div>
        )
    }
}

export default Addmovie;