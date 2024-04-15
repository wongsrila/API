const {
  teamInfo,
  upcomingGamesTeam,
  getResultsTeam,
} = require('../models/api');
const { formatDate, formatTimestampAsTime } = require('../utils/dateFormats');

const teamGet = async (req, res) => {
  try {
    const teamId = req.params.id;

    const teamData = await teamInfo(teamId);
    const getUpcomingGames = await upcomingGamesTeam(teamId);
    const resultsTeam = await getResultsTeam(teamId);

    res.render('team', {
      teamData,
      getUpcomingGames,
      resultsTeam,
      formatDate,
      formatTimestampAsTime,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
};

module.exports = {
  teamGet,
};
