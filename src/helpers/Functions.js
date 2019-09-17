export const checkLocalStorageGenres = (key, defaultValue) => {
    const ls = localStorage.getItem(`${key}`)
        ? JSON.parse(localStorage.getItem(`${key}`)) || ""
        : defaultValue;

    return ls;
}

export const transformMovie = (movies, genres) => {
    movies.forEach((movie, i) => {        
        let genresName = genres.filter(genre => movie.genre_ids.includes(genre.id)).map(genre => genre.name);
        movie.genres = genresName;
    })

    return movies
}

export const isEmpty = (obj) => {
    for (var key in obj) {
        if (obj.hasOwnProperty(key))
            return false;
    }
    return true;
}
