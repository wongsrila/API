require('dotenv').config();

// Get League stanings
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

// Get live games
async function liveGames() {
  try {
    const response = await fetch(
      `https://api-football-v1.p.rapidapi.com/v3/fixtures?live=all`,
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

// Get upcoming games per team
async function upcomingGamesTeam(team_id) {
  try {
    const response = await fetch(
      `https://api-football-v1.p.rapidapi.com/v3/fixtures?team=${team_id}&next=1`,
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

// Get last games per team
async function getResultsTeam(team_id) {
  try {
    const response = await fetch(
      `https://api-football-v1.p.rapidapi.com/v3/fixtures?team=${team_id}&last=5`,
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

// Get team info
async function teamInfo(team_id) {
  try {
    const response = await fetch(
      `https://api-football-v1.p.rapidapi.com/v3/standings?season=2023&team=${team_id}`,
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

// Get fixture details
async function fixtureDetails(fixture_id) {
  try {
    const response = await fetch(
      `https://api-football-v1.p.rapidapi.com/v3/fixtures?id=${fixture_id}`,
      {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': `${process.env.API}`,
          'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com',
        },
      }
    );
    const data = await response.json();
    return data.response[0];
  } catch (err) {
    console.error(err);
    return [];
  }
}

module.exports = {
  getLeagueStandings,
  upcomingGames,
  liveGames,
  upcomingGamesTeam,
  getResultsTeam,
  teamInfo,
  fixtureDetails,
};
