const {
  getMovieDetails,
  getMovieImages,
  getMovieTrailer,
} = require('../models/movies');

const detailsGet = async (req, res) => {
  try {
    const movie_id = req.params.id;
    const movie = await getMovieDetails(movie_id);
    const movieImages = await getMovieImages(movie_id);
    const movieTrailer = await getMovieTrailer(movie_id);

    if (movie) {
      res.render('movie', { movie, movieTrailer });
    } else {
      res.status(404).send('Movie not found');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
};

module.exports = {
  detailsGet,
};
