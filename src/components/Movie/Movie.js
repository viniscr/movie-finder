import React from 'react';
import './Movie.css';

const Movie = (props) =>{
    return (
        <div className="col s12 m6 l3">
             <div className="card">
                <div className="card-image">
                    <a className="btn-floating halfway-fab waves-effect waves-light red" href="#" onClick={() => props.viewMovieInfo(props.movieId)}><i className="material-icons">add</i></a>
                    {
                        props.image == null ? 
                            <img src={`https://s3-ap-southeast-1.amazonaws.com/upcode/static/default-image.jpg`} alt="card-image"/> :
                            <img src={`http://image.tmdb.org/t/p/w500${props.image}`} alt="card-image"/>
                    }
                </div>
                <div className="card-content">
                    <strong>{props.name}</strong>
                    <p><strong>Genres: </strong> {props.genres.join(' ') || ''}</p>
                    <p><strong>Release Date: </strong> {props.release_date.substring(5).split("-").concat(props.release_date.substring(0,4)).join('/')}</p>
                </div>
             </div>
        </div>
    )
}

export default Movie;