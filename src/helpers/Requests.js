import { checkLocalStorageGenres, transformMovie, getMovieGenres, isEmpty } from './Functions'
import httpRequest from './HttpRequest';


export const moviesUpcoming = async page => {
    try {
        let hasGenres = checkLocalStorageGenres('genres', null)

        if (isEmpty(hasGenres)) {
            hasGenres = await getGenres()
            localStorage.setItem('genres', JSON.stringify(hasGenres))
        }

        const movies = await getMoviesUpcoming(page)
        const moviesWithGenres = transformMovie(movies, hasGenres)
        return moviesWithGenres
    } catch (error) {
        window.alert('Alguem erro aconteceu. Tente novamente, por favor.')
    }
}

export const moviesSearch = async (query, page) => {
    try {
        let hasGenres = checkLocalStorageGenres('genres', null)

        if (isEmpty(hasGenres)) {
            hasGenres = await getGenres()
            localStorage.setItem('genres', JSON.stringify(hasGenres))
        }

        const movies = await getMoviesSearch(query, page)
        const moviesSearchWithGenres = transformMovie(movies, hasGenres)
        return moviesSearchWithGenres
    } catch (error) {
        window.alert('Alguem erro aconteceu. Tente novamente, por favor.')
    }
}

export const movieDetails = async (movieId) => {
    try {
        const movie = await getMovieDetails(movieId)
        return movie
    } catch (error) {
        window.alert('Alguem erro aconteceu. Tente novamente, por favor.')
    }
}

const getMoviesUpcoming = async (page) => {
    try {
        const req = await httpRequest({
            url: `/upcoming?page=${page}`,
            method: 'GET'
        })

        return await req;
    } catch (error) {
        window.alert('Alguem erro aconteceu. Tente novamente, por favor.')
    }
}

const getMoviesSearch = async (query, page) => {
    try {
        const req = await httpRequest({
            url: `/search?query=${query}&page=${page}`,
            method: 'GET'
        })

        return await req;
    } catch (error) {
        window.alert('Alguem erro aconteceu. Tente novamente, por favor.')
    }
}

const getMovieDetails = async (movieId) => {
    try {
        const req = await httpRequest({
            url: `/details/${movieId}`,
            method: 'GET'
        })

        return await req;
    } catch (error) {
        window.alert('Alguem erro aconteceu. Tente novamente, por favor.')
    }
}

const getGenres = async () => {
    try {
        const req = await httpRequest({
            url: `/genres`,
            method: 'GET'
        })

        return await req;
    } catch (error) {
        window.alert('Alguem erro aconteceu. Tente novamente, por favor.')
    }
}




