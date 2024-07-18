import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import MovieList from "./components/movielist";
import MovieHeading from "./components/MovieHeading";
import SearchBox from "./components/searchBox";
import RemoveFavourite from "./components/removeFavourite";
import AddFavourite from "./components/addFavourite";

function App() {
  const [movies, setMovies] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [favourite, setFavourite] = useState([]);
  const [like, setLike] = useState(false);
  const getMoviesRequest = async (searchValue) => {
    const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=f342790e`;
    const response = await fetch(url);
    const responseJson = await response.json();
    if (responseJson.Search) {
      setMovies(responseJson.Search);
    }
  };
  useEffect(() => {
    getMoviesRequest(searchValue);
  }, [searchValue]);

  const addFavourite = (movie) => {
    const movieExists = favourite.some((fav) => fav.imdbID === movie.imdbID);

    if (!movieExists) {
      setLike(true);
      const newFavouriteList = [...favourite, movie];
      setFavourite(newFavouriteList);
    }
  };

  const removeFavouriteMovie = (movie) => {
    setLike(false);
    const newFavouriteList = favourite.filter((f) => f.imdbID !== movie.imdbID);
    setFavourite(newFavouriteList);
  };
  return (
    <div className="container-fluid movie-app">
      <div className="row d-flex align-items-center mt-4 mb-4">
        <MovieHeading heading={"Movies"} />
        <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
      </div>
      <div className="row">
        <MovieList
          movies={movies}
          handleMovieClick={addFavourite}
          FavouriteComponent={AddFavourite}
          like={like}
          setLike={setLike}
        />
      </div>
      <div className="row">
        <MovieHeading heading={"Favourites"} />
      </div>
      <div className="row">
        <MovieList
          movies={favourite}
          handleMovieClick={removeFavouriteMovie}
          FavouriteComponent={RemoveFavourite}
        />
      </div>
    </div>
  );
}

export default App;
