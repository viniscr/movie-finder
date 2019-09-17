import { parse, format } from 'date-fns'

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

export const formatDate = (formatDate) => {
    let parsedDate = parse(formatDate);
    let formatedDate = format(
        new Date(parsedDate),
        'MM/DD/YYYY'
      )

      return formatedDate
}

export const isEmpty = (obj) => {
    for (var key in obj) {
        if (obj.hasOwnProperty(key))
            return false;
    }
    return true;
}
