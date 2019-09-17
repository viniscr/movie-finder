import React, {Component}  from 'react';


import Nav from "../Nav/Nav"
import SearchArea from "../SearchArea/SearchArea"
import MovieList from "../MovieList/MovieList"
import Loading from "../Loading/Loading"
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn"
import MovieInfo from "../MovieInfo/MovieInfo"
import { moviesUpcoming, moviesSearch } from '../../helpers/Requests';

class Home extends Component {
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
    
    this.setState({loading: true})

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

  viewMovieInfo = (id) => {
    const filteredMovie = this.state.movies.filter(movie => movie.id == id )

    const newCurrentMovie = filteredMovie.length > 0 ? filteredMovie[0] : null

    this.setState({ currentMovie: newCurrentMovie })
  }

  closeMovieInfo = () => {
    this.setState({ currentMovie: null })
  }

  render(){
    
    return (
      <div className="Home">
        <Nav/>
        { this.state.currentMovie == null ? 
            <div><SearchArea handleSubmit={this.handleSubmit} handleChange={this.handleChange}/> <MovieList loading={this.state.loading} viewMovieInfo={this.viewMovieInfo} movies={this.state.movies}/></div> : <MovieInfo currentMovie={this.state.currentMovie} closeMovieInfo={this.closeMovieInfo}/> }
        {this.state.loading ? <Loading /> : null}
        {this.state.hasMore && this.state.currentMovie == null? <LoadMoreBtn text="Load More" onClick={this.loadMoreItems} /> : '' }

      </div>
    );
  }
}

export default Home;
