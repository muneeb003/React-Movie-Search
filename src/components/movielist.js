import React from "react";

const MovieList = (props) => {
  const FavouriteComponent = props.FavouriteComponent;
  return (
    <>
      {props.movies.map((movie, Index) => (
        <div className="image-container col-md-auto d-flex justify-content-start m-3">
          <img src={movie.Poster} alt="movie"></img>
          <div
            onClick={() => props.handleMovieClick(movie)}
            className="overlay d-flex align-items-center justify-content-start"
          >
            <FavouriteComponent like={props.like} setLike={props.setLike} />
          </div>
        </div>
      ))}
    </>
  );
};

export default MovieList;
