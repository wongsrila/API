const { getLeagueStandings, upcomingGames } = require('../models/api');

// Format date
function formatDate(dateString) {
  const options = { weekday: 'long', day: 'numeric', month: 'long' };
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    return 'Invalid date';
  }
  let formattedDate = date.toLocaleDateString('nl-NL', options);
  return formattedDate;
}

// Format timestamp
function formatTimestampAsTime(timestamp) {
  // Convert the Unix timestamp from seconds to milliseconds
  const date = new Date(timestamp * 1000);
  const timeOptions = {
    hour: '2-digit',
    minute: '2-digit',
  };
  return date.toLocaleTimeString('nl-NL', timeOptions);
}

// Index view / Home page
const indexGet = async (req, res) => {
  try {
    res.render('index');
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
};

// Get league stanings info
const leagueGet = async (req, res) => {
  try {
    const leagueId = req.params.id;
    const getLeague = await getLeagueStandings(leagueId);
    const leagueStandings = getLeague.standings[0];

    const getUpcomingGames = await upcomingGames(leagueId);

    res.render('league', {
      leagueStandings,
      getUpcomingGames,
      formatDate,
      formatTimestampAsTime,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
};

module.exports = {
  indexGet,
  leagueGet,
};
