import React from 'react';
import "./MovieInfo.css"

const MovieInfo = (props) => {
    return (
        <div className="container">
            <div className="row go-back" onClick={props.closeMovieInfo}>
                <i className="fas fa-arrow-left"></i>
                <span>Go Back</span>
            </div>
            <div className="row">
                <div className="col s12 m4">
                    { props.currentMovie.poster_path == null ? <img src={"https://s3-ap-southeast-1.amazonaws.com/upcode/static/default-image.jpg"} alt="card-image" /> :
                        <img className="card-image" src={`http://image.tmdb.org/t/p/w500${props.currentMovie.poster_path}`} alt="card-image" />
                    }           
                </div>

                <div className="col s12 m8">
                    <div className="info-container">
                        <p>Name</p>
                        <p>{props.currentMovie.title}</p>
                        <p>{props.currentMovie.genres}</p>
                        <p>{props.currentMovie.overview}</p>
                        <p>{props.currentMovie.release_date.substring(5).split("-").concat(props.currentMovie.release_date.substring(0,4)).join('/')}</p>
                    </div>
                </div>
            </div>
        
        </div>
    )
}

export default MovieInfo