const {
  teamInfo,
  upcomingGamesTeam,
  getResultsTeam,
} = require('../models/api');

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

const teamGet = async (req, res) => {
  try {
    teamId = req.params.id;

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
