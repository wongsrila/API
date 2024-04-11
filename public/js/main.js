const dataContainer = document.querySelectorAll('#data-container');

dataContainer.forEach((movie) => {
  movie.addEventListener('click', () => {
    const movieId = JSON.parse(movie.getAttribute('data-movieId'));
    openModal(movieId);
  });
});

// Modal functions
function openModal(movieId) {
  const modal = document.getElementById('movie-modal');
  modal.style.display = 'block';
  fetchMovieDetails(movieId);
}

function closeModal() {
  const modal = document.getElementById('movie-modal');
  const modalBody = document.getElementById('modal-body');
  modal.style.display = 'none';
  modalBody.innerHTML = `
  <h1></h1>
  <p></p>
  <!-- Add more movie details as needed -->
`;
}

// Add a click event listener to the close button
const closeButton = document.querySelector('.close-button');
closeButton.addEventListener('click', closeModal);

// Fetch movie details and populate the modal
async function fetchMovieDetails(movieId) {
  try {
    const movieDetails = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}`,
      {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0OGU2YTNkNjdmM2ZhYTE3NjQ4ZjRjM2E4OTc4ZWI1NCIsInN1YiI6IjYwOGZkMDAyMzYzOTA5MDA1OGE0YWJmMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.o-Y3KkWnXKCX8Fj6y0nsnGbsjTrDekx1JO2svf81OCc`,
        },
      }
    );
    const movieData = await movieDetails.json();

    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/videos`,
      {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0OGU2YTNkNjdmM2ZhYTE3NjQ4ZjRjM2E4OTc4ZWI1NCIsInN1YiI6IjYwOGZkMDAyMzYzOTA5MDA1OGE0YWJmMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.o-Y3KkWnXKCX8Fj6y0nsnGbsjTrDekx1JO2svf81OCc`,
        },
      }
    );
    const data = await response.json();
    const trailerKey = data.results.find(
      (video) => video.type === 'Trailer' && video.site === 'YouTube'
    )?.key;
    const trailerUrl = trailerKey
      ? `https://www.youtube.com/embed/${trailerKey}`
      : null;

    const modalBody = document.getElementById('modal-body');
    modalBody.innerHTML = `
        <h1>${movieData.title}</h1>
        <p>${movieData.overview}</p>
        <iframe
          width="560"
          height="315"
          src="${trailerUrl}"
          frameborder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      `;
  } catch (err) {
    console.error(err);
  }
}
