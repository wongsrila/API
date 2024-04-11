require('dotenv').config();

// Get movies by Category
async function getLeagueStandings(league_id) {
  try {
    const response = await fetch(
      `https://api-football-v1.p.rapidapi.com/v3/standings?season=2023&league=${league_id}`,
      {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': `${process.env.API}`,
          'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com',
        },
      }
    );
    const data = await response.json();
    return data.response[0].league;
  } catch (err) {
    console.error(err);
    return [];
  }
}

// Get upcoming games
async function upcomingGames(league_id) {
  try {
    const response = await fetch(
      `https://api-football-v1.p.rapidapi.com/v3/fixtures?league=${league_id}&season=2023&next=9`,
      {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': `${process.env.API}`,
          'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com',
        },
      }
    );
    const data = await response.json();
    return data.response;
  } catch (err) {
    console.error(err);
    return [];
  }
}

module.exports = { getLeagueStandings, upcomingGames };
