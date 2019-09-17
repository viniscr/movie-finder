import React from 'react';
import Movie from '../Movie/Movie';

const MovieList = (props) =>{


    return (
        <div className="container">
            <div className="row">
                <div className="col s12">
                    {
                        props.movies.map((movie, i) => {
                            return (
                                <Movie key={i} viewMovieInfo={props.viewMovieInfo} movieId={movie.id} image={movie.poster_path} name={movie.title} genres={movie.genres} release_date={movie.release_date}/>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default MovieList;