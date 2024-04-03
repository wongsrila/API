const { getMoviesByCategory } = require('../models/movies');

// Home page
const indexGet = async (req, res) => {
  try {
    const popularMovies = await getMoviesByCategory('popular');
    const topRatedMovies = await getMoviesByCategory('top_rated');
    const upcomingMovies = await getMoviesByCategory('upcoming');

    res.render('index', { popularMovies, topRatedMovies, upcomingMovies });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
  // get popular movies list URL
  // const url =
  //   'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1';

  // const options = {
  //   method: 'GET',
  //   headers: {
  //     accept: 'application/json',
  //     Authorization: `Bearer ${process.env.API}`,
  //   },
  // };

  // fetch(url, options)
  //   .then((res) => res.json())
  //   .then((json) => resultHandle(json))
  //   .catch((err) => console.error('error:' + err));

  // const resultHandle = (results) => {
  //   console.log(getMoviesByCategory);
  //   res.render('index', results);
  // };
};

// About page
const aboutGet = (req, res) => {
  res.render('about');
};

module.exports = {
  indexGet,
  aboutGet,
};
