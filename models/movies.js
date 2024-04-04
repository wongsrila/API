require('dotenv').config();

// Get movies by Category
async function getMoviesByCategory(category) {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${category}`,
      {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${process.env.API}`,
        },
      }
    );
    const data = await response.json();
    return data.results;
  } catch (err) {
    console.error(err);
    return [];
  }
}

// Get movie genres
async function getMovieGenres() {
  try {
    const response = await fetch(
      'https://api.themoviedb.org/3/genre/movie/list',
      {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${process.env.API}`,
        },
      }
    );
    const data = await response.json();
    return data.genres;
  } catch (err) {
    console.error(err);
    return [];
  }
}

// Get movie details
async function getMovieDetails(movie_id) {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movie_id}`,
      {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${process.env.API}`,
        },
      }
    );
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
    return [];
  }
}

module.exports = {
  getMoviesByCategory,
  getMovieGenres,
  getMovieDetails,
};
