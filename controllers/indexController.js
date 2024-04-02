// Home page
const indexGet = (req, res) => {
  const url =
    'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1';
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${process.env.API}`,
    },
  };

  fetch(url, options)
    .then((res) => res.json())
    .then((json) => resultHandle(json))
    .catch((err) => console.error('error:' + err));

  const resultHandle = (results) => {
    // console.log(results);
    res.render('index', results);
  };
};

module.exports = {
  indexGet,
};
