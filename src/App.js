import React, {Component}  from 'react';

import Nav from "./components/Nav/Nav"
import SearchArea from "./components/SearchArea/SearchArea"
import MovieList from "./components/MovieList/MovieList"
import Pagination from "./components/Pagination"
import Loading from "./components/Loading/Loading"
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn"
import MovieInfo from "./components/MovieInfo/MovieInfo"
import { moviesUpcoming, moviesSearch, movieDetails } from './helpers/Requests';

class App extends Component {
  constructor() {
    super()
    this.state = {
      movies: [],
      searchTerm: '',
      hasMore: false,
      currentPage: 1,
      currentMovie: null,
      loading: false
    }
  
  }
  
  componentDidMount(){
    this.loadMovies();
  }

  loadMovies = async (page) => {
    this.setState({ loading: true });

    let data = await moviesUpcoming(page)

    this.verifyHasMore(data)

    this.setState( { movies:[...this.state.movies, ...data], loading: false} )
    
  }

  handleSubmit = async (e) => {
    e.preventDefault();

    this.setState({movies: [],loading: true})

    let data = await moviesSearch(this.state.searchTerm)
    
    this.verifyHasMore(data)
    
    this.setState( { movies:[...data], loading: false } )
    
  };

  handleSearch = async(page) => {
    
    this.setState({movies: [],loading: true})

    let data = await moviesSearch(this.state.searchTerm, page);

    this.verifyHasMore(data)

    this.setState( { movies:[...this.state.movies, ...data], loading: false} )
  }

  verifyHasMore = (data) => {
    data.length < 20 ? this.setState({hasMore: false}) : this.setState({hasMore: true})
  }

  handleChange = (e) => {
    this.setState({ searchTerm: e.target.value })
  };

  loadMoreItems = () => {
    
    if(this.state.searchTerm === ""){
      this.loadMovies(this.state.currentPage + 1)
    }else{
      this.handleSearch(this.state.currentPage + 1)
    }

    this.setState({currentPage: this.state.currentPage + 1})
  };

  viewMovieInfo =  async (id) => {
    const filteredMovie = await movieDetails(id)

    this.setState({ currentMovie: filteredMovie })
  }

  closeMovieInfo = () => {
    this.setState({ currentMovie: null })
  }

  render(){
    
    return (
      <div className="App">
        <Nav/>
        { this.state.currentMovie == null ? 
            <div><SearchArea handleSubmit={this.handleSubmit} handleChange={this.handleChange}/> <MovieList loading={this.state.loading} viewMovieInfo={this.viewMovieInfo} movies={this.state.movies}/></div> : <MovieInfo currentMovie={this.state.currentMovie} closeMovieInfo={this.closeMovieInfo}/> }
        {this.state.loading ? <Loading /> : null}
        {this.state.hasMore && this.state.currentMovie == null? <LoadMoreBtn text="Load More" onClick={this.loadMoreItems} /> : '' }

      </div>
    );
  }
}

export default App;
