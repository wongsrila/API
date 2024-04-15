const { getLeagueStandings, upcomingGames } = require('../models/api');
const { formatDate, formatTimestampAsTime } = require('../utils/dateFormats');

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
