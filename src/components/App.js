import React, { useEffect, useReducer } from 'react';
import './App.css';
import Header from "./Header";
import spinner from "../assets/ajax-loader.gif";
import Movie from "./Movie";
import Search from "./Search";
import axios from "axios";

const MOVIE_API_URL = "http://www.omdbapi.com/?i=tt3896198&apikey=d5a6c0611";

const initialState = {
  loading: true,
  movies: [],
  errorMessage: null
}
const reducer = (state, action) => {
  switch (action.type) {
    case 'SWITCH_MOVIES_REQUEST':
      return {
        ...state,
        loading: true,
        errorMessage: null
      }
      case 'SWITCH_MOVIES_SUCCESS':
      return {
        ...state,
        loading: false,
        errorMessage: action.payload
      }
      case 'SWITCH_MOVIES_FAILURE':
      return {
        ...state,
        loading: true,
        errorMessage:action.error
      };
      default: 
      return state
  }
 
}

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState)


    useEffect(() => {
      axios.get(MOVIE_API_URL)
      .then(jsonResponse => {
        dispatch({
          type: 'SEARCH_MOVIES_SUCCESS',
          payload:jsonResponse.search
        })
      })
    }, [])


    const search = searchValue => {
      dispatch({
        type: 'SEARCH_MOVIES_REQUEST'
      })
      axios(`http://www.omdbapi.com/?i=tt3896198&apikey=d5a6c061`)
      .then(jsonResponse => {
       if (jsonResponse.Response === 'true') {
         dispatch ({
          type: 'SEARCH_MOVIES_SUCCESS',
          payload: jsonResponse.search
         }) 
        } else {
          dispatch ({
            type: 'SEARCH_MOVIES_FAILURE',
            error: jsonResponse.error
          })
        }
      })
    }

    const { movies, errorMessage, loading } = state;

    const retrievedMovies =
    loading && !errorMessage ? (
      <img className="spinner" src={spinner} alt="Loading spinner" />
    ) : errorMessage ? (
      <div className="errorMessage">{errorMessage}</div>
    ) : (
      movies.map((movie, index) => (
        <Movie key={`${index}-${movie.Title}`} movie={movie} />
      ))
    );

    return (
      <div className="App">
        <Header text="HOOKED" />
        <Search search={search} />
        <p className="App-intro">Sharing a few of our favourite movies</p>
        <div className="movies">
          {loading && !errorMessage ? (
            <span>loading... </span>
          ) : errorMessage ? (
            <div className="errorMessage">{errorMessage}</div>
          ) : (
            movies.map((movie, index) => (
              <Movie key={`${index}-${movie.Title}`} movie={movie} />
          
            ))
          )}
          <div className='movies'>{retrievedMovies}</div>
        </div>
      </div>
    );
}

export default App;