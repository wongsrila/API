require('dotenv').config();

// const url = 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1';

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${process.env.API}`,
  },
};

async function getMoviesByCategory(category) {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1`,
      options
    );
    const data = await response.json();
    // console.log(data.results);
    return data.results;
  } catch (err) {
    console.error(err);
    return [];
  }
}

module.exports = {
  getMoviesByCategory,
};
