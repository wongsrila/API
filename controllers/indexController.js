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

// Eredividie
const indexGet = async (req, res) => {
  try {
    const getLeague = await getLeagueStandings(88);
    const leagueStandings = getLeague.standings[0];

    const getUpcomingGames = await upcomingGames(88);

    res.render('index', {
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

// Premier League
const plGet = async (req, res) => {
  try {
    const getLeague = await getLeagueStandings(39);
    const leagueStandings = getLeague.standings[0];

    const getUpcomingGames = await upcomingGames(39);

    res.render('index', {
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

// Bundesliga
const blGet = async (req, res) => {
  try {
    const getLeague = await getLeagueStandings(78);
    const leagueStandings = getLeague.standings[0];

    const getUpcomingGames = await upcomingGames(78);

    res.render('index', {
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

// La Liga
const llGet = async (req, res) => {
  try {
    const getLeague = await getLeagueStandings(140);
    const leagueStandings = getLeague.standings[0];

    const getUpcomingGames = await upcomingGames(140);

    res.render('index', {
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

// Serie A
const saGet = async (req, res) => {
  try {
    const getLeague = await getLeagueStandings(135);
    const leagueStandings = getLeague.standings[0];

    const getUpcomingGames = await upcomingGames(135);

    res.render('index', {
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

// Ligue 1
const l1Get = async (req, res) => {
  try {
    const getLeague = await getLeagueStandings(61);
    const leagueStandings = getLeague.standings[0];

    const getUpcomingGames = await upcomingGames(61);

    res.render('index', {
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
  plGet,
  blGet,
  llGet,
  saGet,
  l1Get,
};
