import React from 'react';
import NowPlayingMovies from '../../Components/MovieList/NowPlayingMovies';
import ComingSoonMovies from '../../Components/MovieList/ComingSoonMovies';

const Movie = () => {
  return (
    <div>
     <NowPlayingMovies />
     <ComingSoonMovies />
    </div>
  );
}
export default Movie;