import React from 'react';
import "./MovieInfo.css"

import notFound from '../../assets/image-not-found.png'

const MovieInfo = (props) => {
    
    return (
        <div className="container">
            <div className="row go-back" onClick={props.closeMovieInfo}>
                <i className="material-icons">arrow_back</i>
                <span>Go Back</span>
            </div>
            <div className="row">
                <div className="col s12 m4">
                    { props.currentMovie.poster_path == null ? <img className="card-image" src={notFound} alt="card-image" /> :
                        <img className="card-image" src={`http://image.tmdb.org/t/p/w500${props.currentMovie.poster_path}`} alt="card-image" />
                    }           
                </div>

                <div className="col s12 m8">
                    <div className="info-container">
                        <strong>Name</strong>
                        <p>{props.currentMovie.title}</p>
                        <strong>Genres</strong>
                        <p>{props.currentMovie.genres.join(', ')}</p>
                        <strong>Overview</strong>
                        <p>{props.currentMovie.overview}</p>
                        <strong>Release Date</strong>
                        <p>{props.currentMovie.release_date.substring(5).split("-").concat(props.currentMovie.release_date.substring(0,4)).join('/')}</p>
                    </div>
                </div>
            </div>
        
        </div>
    )
}

export default MovieInfo