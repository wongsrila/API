const { getMoviesByCategory, getMovieGenres } = require('../models/movies');

// Home page
const indexGet = async (req, res) => {
  try {
    const popularMovies = await getMoviesByCategory('popular');
    const topRatedMovies = await getMoviesByCategory('top_rated');
    const upcomingMovies = await getMoviesByCategory('upcoming');
    const nowPlaying = await getMoviesByCategory('now_playing');
    const movieGenres = await getMovieGenres();

    res.render('index', {
      popularMovies,
      topRatedMovies,
      upcomingMovies,
      nowPlaying,
      movieGenres,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
};

// About page
const aboutGet = (req, res) => {
  res.render('about');
};

module.exports = {
  indexGet,
  aboutGet,
};
