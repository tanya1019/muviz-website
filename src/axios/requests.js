export const API_KEY = "10806b882f19bf7a2bc225c9cec7f8bf";

// export const discoverMovie = `/discover/movie?api_key=${API_KEY}&language=en-US&page=1`;

export const requests = {
  discoverMovie: `/discover/movie?api_key=${API_KEY}&language=en-US&page=1`,
  upcomingMovies: `/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`,
  horrorMovies: `/discover/movie?api_key=${API_KEY}&with_genres=27`,
  genereMovieList: `/genre/movie/list?api_key=${API_KEY}&language=en-US`,
};
