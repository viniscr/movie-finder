import React, {Component}  from 'react';

import Nav from "./components/Nav/Nav"
import SearchArea from "./components/SearchArea/SearchArea"
import MovieList from "./components/MovieList/MovieList"
import Pagination from "./components/Pagination"
import Loading from "./components/Loading/Loading"
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn"
import MovieInfo from "./components/MovieInfo/MovieInfo"
import { moviesUpcoming, moviesSearch } from './helpers/Requests';

class App extends Component {
  constructor() {
    super()
    this.state = {
      movies: [],
      searchTerm: '',
      totalResults: 0,
      currentPage: 1,
      currentMovie: null,

    }
    this.apiKey = '1f54bd990f1cdfb230adb312546d765d';
    this.apiUrl = 'http://localhost:3001/movies';
  
  }
  
  componentDidMount(){
    this.loadMovies();
  }

  loadMovies = async (page) => {
    let data = await moviesUpcoming(page)

    this.setState( { movies:[...this.state.movies, ...data], totalResults: data.total_results } )
    
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    let data = await moviesSearch(this.state.searchTerm)
    this.setState( { movies:[...data], totalResults: data.total_results } )
    
  };

  handleChange = (e) => {
    this.setState({ searchTerm: e.target.value })
  };

  nextPage = (pageNumber) => {
    fetch(`${this.apiUrl}/upcoming?page=${pageNumber}`)
    .then(data => data.json())
    .then(data => {
      console.log(data);
      this.setState( { movies:[...data.results], currentPage: pageNumber } )
    });
  }

  loadMoreItems = () => {
    this.setState({
      loading: true
    });

    if(this.state.searchTerm === ""){
      this.loadMovies(this.state.currentPage + 1)
    }else{
      this.handleSubmit(this.state.currentPage+1)
    }

    this.setState({currentPage: this.state.currentPage + 1, loading: false})
  };

  viewMovieInfo = (id) => {
    const filteredMovie = this.state.movies.filter(movie => movie.id == id )

    const newCurrentMovie = filteredMovie.length > 0 ? filteredMovie[0] : null

    this.setState({ currentMovie: newCurrentMovie })
  }

  closeMovieInfo = () => {
    this.setState({ currentMovie: null })
  }

  render(){
    const numberPages = Math.floor(this.state.totalResults / 20);

    return (
      <div className="App">
        <Nav/>
        { this.state.currentMovie == null ? <div><SearchArea handleSubmit={this.handleSubmit} handleChange={this.handleChange}/> <MovieList viewMovieInfo={this.viewMovieInfo} movies={this.state.movies}/></div> : <MovieInfo currentMovie={this.state.currentMovie} closeMovieInfo={this.closeMovieInfo}/> }
        {this.state.loading ? <Loading /> : null}
        
        <LoadMoreBtn text="Load More" onClick={this.loadMoreItems} />
          
        {this.state.totalResults > 20 && this.state.currentMovie == null? <Pagination pages={numberPages} nextPage={this.nextPage} currentPage={this.state.currentPage}/> : ''}
      </div>
    );
  }
}

export default App;
