const express = require('express');
const path = require('path');
const routes = require('./routes/routes');
require('dotenv').config();
const { fixtureDetails } = require('./models/api');
const { formatTimestampAsTime } = require('./utils/dateFormats');

const app = express();
const port = process.env.PORT || 3333;

// Setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

// Middleware
app.use(express.static(path.join(__dirname, '/public')));

// Routes
app.use('/', routes);

// app.get('/events', (req, res) => {
//   res.setHeader('Content-Type', 'text/event-stream');
//   res.setHeader('Cache-Control', 'no-cache');
//   res.setHeader('Connection', 'keep-alive');

//   // Function to send data
//   const sendEvents = async () => {
//     // Simulate fetching events from an API
//     // const events = await fixtureDetails(1055339);

//     const eventList = events.events;

//     // Filter for goal events or any other types
//     // const goalEvents = eventList.filter((event) => event.type === 'Goal');

//     // Send each event as a separate SSE message
//     eventList.forEach((event) => {
//       res.write(`data: ${JSON.stringify(event)}\n\n`);
//     });
//   };

//   // Send data every minute
//   // const intervalId = setInterval(sendEvents, 15000);

//   // Clear interval on client disconnect
//   req.on('close', () => {
//     clearInterval(intervalId);
//     res.end();
//   });
// });

app.get('/events', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  // Function to send data
  const sendStats = async () => {
    // Fetch stats from the API-Football
    // const fixtureData = await fixtureDetails(1055339);

    const fixtureData = {
      fixture: {
        id: 1055339,
        referee: 'S. Gözübüyük',
        timezone: 'UTC',
        date: '2024-04-14T14:45:00+00:00',
        timestamp: 1713105900,
        periods: { first: 1713105900, second: 1713109500 },
        venue: { id: 1117, name: 'Johan Cruijff Arena', city: 'Amsterdam' },
        status: { long: 'Match Finished', short: '1H', elapsed: 57 },
      },
      league: {
        id: 88,
        name: 'Eredivisie',
        country: 'Netherlands',
        logo: 'https://media.api-sports.io/football/leagues/88.png',
        flag: 'https://media.api-sports.io/flags/nl.svg',
        season: 2023,
        round: 'Regular Season - 30',
      },
      teams: {
        home: {
          id: 194,
          name: 'Ajax',
          logo: 'https://media.api-sports.io/football/teams/194.png',
          winner: true,
        },
        away: {
          id: 415,
          name: 'Twente',
          logo: 'https://media.api-sports.io/football/teams/415.png',
          winner: false,
        },
      },
      goals: { home: 4, away: 1 },
      score: {
        halftime: { home: 0, away: 1 },
        fulltime: { home: 2, away: 1 },
        extratime: { home: null, away: null },
        penalty: { home: null, away: null },
      },
      events: [
        {
          time: { elapsed: 5, extra: null },
          team: {
            id: 194,
            name: 'Ajax',
            logo: 'https://media.api-sports.io/football/teams/194.png',
          },
          player: { id: 14701, name: 'Josip Šutalo' },
          assist: { id: null, name: null },
          type: 'Card',
          detail: 'Yellow Card',
          comments: 'Foul',
        },
        {
          time: { elapsed: 31, extra: null },
          team: {
            id: 415,
            name: 'Twente',
            logo: 'https://media.api-sports.io/football/teams/415.png',
          },
          player: { id: 48390, name: 'R. van Wolfswinkel' },
          assist: { id: 272726, name: 'D. Rots' },
          type: 'Goal',
          detail: 'Normal Goal',
          comments: null,
        },
        {
          time: { elapsed: 32, extra: null },
          team: {
            id: 415,
            name: 'Twente',
            logo: 'https://media.api-sports.io/football/teams/415.png',
          },
          player: { id: 137209, name: 'Mathias Kjølø' },
          assist: { id: null, name: null },
          type: 'Card',
          detail: 'Yellow Card',
          comments: 'Foul',
        },
        {
          time: { elapsed: 35, extra: null },
          team: {
            id: 194,
            name: 'Ajax',
            logo: 'https://media.api-sports.io/football/teams/194.png',
          },
          player: { id: 57443, name: 'Sivert Mannsverk' },
          assist: { id: null, name: null },
          type: 'Card',
          detail: 'Yellow Card',
          comments: 'Foul',
        },
        {
          time: { elapsed: 46, extra: null },
          team: {
            id: 194,
            name: 'Ajax',
            logo: 'https://media.api-sports.io/football/teams/194.png',
          },
          player: { id: 37652, name: 'B. van den Boomen' },
          assist: { id: 264094, name: 'B. Tahirović' },
          type: 'subst',
          detail: 'Substitution 1',
          comments: null,
        },
        {
          time: { elapsed: 54, extra: null },
          team: {
            id: 415,
            name: 'Twente',
            logo: 'https://media.api-sports.io/football/teams/415.png',
          },
          player: { id: 37742, name: 'G. Smal' },
          assist: { id: 162451, name: 'A. Salah-Eddine' },
          type: 'subst',
          detail: 'Substitution 1',
          comments: null,
        },
        {
          time: { elapsed: 58, extra: null },
          team: {
            id: 194,
            name: 'Ajax',
            logo: 'https://media.api-sports.io/football/teams/194.png',
          },
          player: { id: 38750, name: 'Brian Brobbey' },
          assist: { id: null, name: null },
          type: 'Var',
          detail: 'Penalty cancelled',
          comments: null,
        },
        {
          time: { elapsed: 59, extra: null },
          team: {
            id: 194,
            name: 'Ajax',
            logo: 'https://media.api-sports.io/football/teams/194.png',
          },
          player: { id: 38750, name: 'B. Brobbey' },
          assist: { id: 38749, name: 'K. Taylor' },
          type: 'Goal',
          detail: 'Normal Goal',
          comments: null,
        },
        {
          time: { elapsed: 66, extra: null },
          team: {
            id: 415,
            name: 'Twente',
            logo: 'https://media.api-sports.io/football/teams/415.png',
          },
          player: { id: 37784, name: 'S. Steijn' },
          assist: { id: 48190, name: 'A. Sampsted' },
          type: 'subst',
          detail: 'Substitution 2',
          comments: null,
        },
        {
          time: { elapsed: 66, extra: null },
          team: {
            id: 415,
            name: 'Twente',
            logo: 'https://media.api-sports.io/football/teams/415.png',
          },
          player: { id: 540, name: 'C. Eiting' },
          assist: { id: 36989, name: 'M. van Bergen' },
          type: 'subst',
          detail: 'Substitution 3',
          comments: null,
        },
        {
          time: { elapsed: 68, extra: null },
          team: {
            id: 194,
            name: 'Ajax',
            logo: 'https://media.api-sports.io/football/teams/194.png',
          },
          player: { id: 38750, name: 'B. Brobbey' },
          assist: { id: 2380, name: 'C. Akpom' },
          type: 'subst',
          detail: 'Substitution 2',
          comments: null,
        },
        {
          time: { elapsed: 77, extra: null },
          team: {
            id: 415,
            name: 'Twente',
            logo: 'https://media.api-sports.io/football/teams/415.png',
          },
          player: { id: 272723, name: 'M. Hilgers' },
          assist: { id: 291994, name: 'M. Bruns' },
          type: 'subst',
          detail: 'Substitution 4',
          comments: null,
        },
        {
          time: { elapsed: 77, extra: null },
          team: {
            id: 415,
            name: 'Twente',
            logo: 'https://media.api-sports.io/football/teams/415.png',
          },
          player: { id: 36982, name: 'M. Vlap' },
          assist: { id: 161894, name: 'N. Ünüvar' },
          type: 'subst',
          detail: 'Substitution 5',
          comments: null,
        },
        {
          time: { elapsed: 79, extra: null },
          team: {
            id: 194,
            name: 'Ajax',
            logo: 'https://media.api-sports.io/football/teams/194.png',
          },
          player: { id: 162452, name: 'Devyne Rensch' },
          assist: { id: null, name: null },
          type: 'Var',
          detail: 'Penalty confirmed',
          comments: null,
        },
        {
          time: { elapsed: 81, extra: null },
          team: {
            id: 194,
            name: 'Ajax',
            logo: 'https://media.api-sports.io/football/teams/194.png',
          },
          player: { id: 244, name: 'S. Bergwijn' },
          assist: { id: null, name: null },
          type: 'Goal',
          detail: 'Penalty',
          comments: null,
        },
        {
          time: { elapsed: 82, extra: null },
          team: {
            id: 194,
            name: 'Ajax',
            logo: 'https://media.api-sports.io/football/teams/194.png',
          },
          player: { id: 341642, name: 'J. Hato' },
          assist: { id: 26303, name: 'B. Sosa' },
          type: 'subst',
          detail: 'Substitution 3',
          comments: null,
        },
        {
          time: { elapsed: 90, extra: 5 },
          team: {
            id: 194,
            name: 'Ajax',
            logo: 'https://media.api-sports.io/football/teams/194.png',
          },
          player: { id: 38749, name: 'K. Taylor' },
          assist: { id: 336580, name: 'S. Vos' },
          type: 'subst',
          detail: 'Substitution 4',
          comments: null,
        },
        {
          time: { elapsed: 90, extra: 6 },
          team: {
            id: 194,
            name: 'Ajax',
            logo: 'https://media.api-sports.io/football/teams/194.png',
          },
          player: { id: 340153, name: 'M. Godts' },
          assist: { id: 313941, name: 'A. Gaaei' },
          type: 'subst',
          detail: 'Substitution 5',
          comments: null,
        },
      ],
      lineups: [
        {
          team: {
            id: 194,
            name: 'Ajax',
            logo: 'https://media.api-sports.io/football/teams/194.png',
            colors: {
              player: {
                primary: 'eb2b3b',
                number: 'ffffff',
                border: 'eb2b3b',
              },
              goalkeeper: {
                primary: '8ccb4d',
                number: 'ffffff',
                border: '8ccb4d',
              },
            },
          },
          coach: {
            id: 209,
            name: "J. van 't Schip",
            photo: 'https://media.api-sports.io/football/coachs/209.png',
          },
          formation: '3-4-2-1',
          startXI: [
            {
              player: {
                id: 47296,
                name: 'G. Rulli',
                number: 1,
                pos: 'G',
                grid: '1:1',
              },
            },
            {
              player: {
                id: 14701,
                name: 'J. Šutalo',
                number: 37,
                pos: 'D',
                grid: '2:3',
              },
            },
            {
              player: {
                id: 278159,
                name: 'A. Kaplan',
                number: 13,
                pos: 'D',
                grid: '2:2',
              },
            },
            {
              player: {
                id: 341642,
                name: 'J. Hato',
                number: 4,
                pos: 'D',
                grid: '2:1',
              },
            },
            {
              player: {
                id: 162452,
                name: 'D. Rensch',
                number: 2,
                pos: 'M',
                grid: '3:4',
              },
            },
            {
              player: {
                id: 57443,
                name: 'S. Mannsverk',
                number: 16,
                pos: 'M',
                grid: '3:3',
              },
            },
            {
              player: {
                id: 37652,
                name: 'B. van den Boomen',
                number: 21,
                pos: 'M',
                grid: '3:2',
              },
            },
            {
              player: {
                id: 38749,
                name: 'K. Taylor',
                number: 8,
                pos: 'M',
                grid: '3:1',
              },
            },
            {
              player: {
                id: 340153,
                name: 'M. Godts',
                number: 39,
                pos: 'F',
                grid: '4:2',
              },
            },
            {
              player: {
                id: 244,
                name: 'S. Bergwijn',
                number: 7,
                pos: 'F',
                grid: '4:1',
              },
            },
            {
              player: {
                id: 38750,
                name: 'B. Brobbey',
                number: 9,
                pos: 'F',
                grid: '5:1',
              },
            },
          ],
          substitutes: [
            {
              player: {
                id: 264094,
                name: 'B. Tahirović',
                number: 33,
                pos: 'M',
                grid: null,
              },
            },
            {
              player: {
                id: 2380,
                name: 'C. Akpom',
                number: 10,
                pos: 'F',
                grid: null,
              },
            },
            {
              player: {
                id: 26303,
                name: 'B. Sosa',
                number: 25,
                pos: 'D',
                grid: null,
              },
            },
            {
              player: {
                id: 313941,
                name: 'A. Gaaei',
                number: 3,
                pos: 'D',
                grid: null,
              },
            },
            {
              player: {
                id: 336580,
                name: 'S. Vos',
                number: 24,
                pos: 'M',
                grid: null,
              },
            },
            {
              player: {
                id: 80219,
                name: 'J. Medić',
                number: 18,
                pos: 'D',
                grid: null,
              },
            },
            {
              player: {
                id: 338499,
                name: 'T. de Graaff',
                number: 53,
                pos: 'G',
                grid: null,
              },
            },
            {
              player: {
                id: 335335,
                name: 'J. Rijkhoff',
                number: 19,
                pos: 'F',
                grid: null,
              },
            },
            {
              player: {
                id: 37113,
                name: 'R. Pasveer',
                number: 22,
                pos: 'G',
                grid: null,
              },
            },
            {
              player: {
                id: 36895,
                name: 'K. Fitz-Jim',
                number: 28,
                pos: 'M',
                grid: null,
              },
            },
            {
              player: {
                id: 282126,
                name: 'Carlos Forbs',
                number: 11,
                pos: 'F',
                grid: null,
              },
            },
          ],
        },
        {
          team: {
            id: 415,
            name: 'Twente',
            logo: 'https://media.api-sports.io/football/teams/415.png',
            colors: {
              player: {
                primary: 'ffffff',
                number: 'f00c0c',
                border: 'ffffff',
              },
              goalkeeper: {
                primary: '4aff3c',
                number: 'ffffff',
                border: '4aff3c',
              },
            },
          },
          coach: {
            id: 6671,
            name: 'J. Oosting',
            photo: 'https://media.api-sports.io/football/coachs/6671.png',
          },
          formation: '4-2-3-1',
          startXI: [
            {
              player: {
                id: 37765,
                name: 'L. Unnerstall',
                number: 1,
                pos: 'G',
                grid: '1:1',
              },
            },
            {
              player: {
                id: 161883,
                name: 'Y. Regeer',
                number: 8,
                pos: 'D',
                grid: '2:4',
              },
            },
            {
              player: {
                id: 272723,
                name: 'M. Hilgers',
                number: 2,
                pos: 'D',
                grid: '2:3',
              },
            },
            {
              player: {
                id: 37254,
                name: 'R. Pröpper',
                number: 3,
                pos: 'D',
                grid: '2:2',
              },
            },
            {
              player: {
                id: 37742,
                name: 'G. Smal',
                number: 5,
                pos: 'D',
                grid: '2:1',
              },
            },
            {
              player: {
                id: 137209,
                name: 'M. Kjølø',
                number: 4,
                pos: 'M',
                grid: '3:2',
              },
            },
            {
              player: {
                id: 540,
                name: 'C. Eiting',
                number: 6,
                pos: 'M',
                grid: '3:1',
              },
            },
            {
              player: {
                id: 272726,
                name: 'D. Rots',
                number: 11,
                pos: 'M',
                grid: '4:3',
              },
            },
            {
              player: {
                id: 37784,
                name: 'S. Steijn',
                number: 14,
                pos: 'M',
                grid: '4:2',
              },
            },
            {
              player: {
                id: 36982,
                name: 'M. Vlap',
                number: 18,
                pos: 'M',
                grid: '4:1',
              },
            },
            {
              player: {
                id: 48390,
                name: 'R. van Wolfswinkel',
                number: 9,
                pos: 'F',
                grid: '5:1',
              },
            },
          ],
          substitutes: [
            {
              player: {
                id: 162451,
                name: 'A. Salah-Eddine',
                number: 34,
                pos: 'D',
                grid: null,
              },
            },
            {
              player: {
                id: 48190,
                name: 'A. Sampsted',
                number: 12,
                pos: 'D',
                grid: null,
              },
            },
            {
              player: {
                id: 36989,
                name: 'M. van Bergen',
                number: 7,
                pos: 'F',
                grid: null,
              },
            },
            {
              player: {
                id: 291994,
                name: 'M. Bruns',
                number: 38,
                pos: 'M',
                grid: null,
              },
            },
            {
              player: {
                id: 161894,
                name: 'N. Ünüvar',
                number: 10,
                pos: 'F',
                grid: null,
              },
            },
            {
              player: {
                id: 328670,
                name: 'Y. Taha',
                number: 19,
                pos: 'F',
                grid: null,
              },
            },
            {
              player: {
                id: 50974,
                name: 'P. Tytoń',
                number: 22,
                pos: 'G',
                grid: null,
              },
            },
            {
              player: {
                id: 408854,
                name: 'G. Besselink',
                number: 41,
                pos: 'M',
                grid: null,
              },
            },
            {
              player: {
                id: 523,
                name: 'I. El Maach',
                number: 16,
                pos: 'G',
                grid: null,
              },
            },
            {
              player: {
                id: 8935,
                name: 'A. Van Hoorenbeeck',
                number: 17,
                pos: 'D',
                grid: null,
              },
            },
          ],
        },
      ],
      statistics: [
        {
          team: {
            id: 194,
            name: 'Ajax',
            logo: 'https://media.api-sports.io/football/teams/194.png',
          },
          statistics: [
            { type: 'Shots on Goal', value: 4 },
            { type: 'Shots off Goal', value: 3 },
            { type: 'Total Shots', value: 8 },
            { type: 'Blocked Shots', value: 1 },
            { type: 'Shots insidebox', value: 5 },
            { type: 'Shots outsidebox', value: 3 },
            { type: 'Fouls', value: 4 },
            { type: 'Corner Kicks', value: 2 },
            { type: 'Offsides', value: 4 },
            { type: 'Ball Possession', value: '56%' },
            { type: 'Yellow Cards', value: 2 },
            { type: 'Red Cards', value: null },
            { type: 'Goalkeeper Saves', value: 2 },
            { type: 'Total passes', value: 561 },
            { type: 'Passes accurate', value: 472 },
            { type: 'Passes %', value: '84%' },
            { type: 'expected_goals', value: '2.25' },
          ],
        },
        {
          team: {
            id: 415,
            name: 'Twente',
            logo: 'https://media.api-sports.io/football/teams/415.png',
          },
          statistics: [
            { type: 'Shots on Goal', value: 3 },
            { type: 'Shots off Goal', value: 3 },
            { type: 'Total Shots', value: 7 },
            { type: 'Blocked Shots', value: 1 },
            { type: 'Shots insidebox', value: 6 },
            { type: 'Shots outsidebox', value: 1 },
            { type: 'Fouls', value: 14 },
            { type: 'Corner Kicks', value: 6 },
            { type: 'Offsides', value: 2 },
            { type: 'Ball Possession', value: '44%' },
            { type: 'Yellow Cards', value: 1 },
            { type: 'Red Cards', value: null },
            { type: 'Goalkeeper Saves', value: 2 },
            { type: 'Total passes', value: 424 },
            { type: 'Passes accurate', value: 338 },
            { type: 'Passes %', value: '80%' },
            { type: 'expected_goals', value: '0.38' },
          ],
        },
      ],
      players: [
        {
          team: {
            id: 194,
            name: 'Ajax',
            logo: 'https://media.api-sports.io/football/teams/194.png',
            update: '2024-04-16T06:08:09+02:00',
          },
          players: [
            {
              player: {
                id: 47296,
                name: 'Gerónimo Rulli',
                photo: 'https://media.api-sports.io/football/players/47296.png',
              },
              statistics: [
                {
                  games: {
                    minutes: 90,
                    number: 1,
                    position: 'G',
                    rating: '6.9',
                    captain: false,
                    substitute: false,
                  },
                  offsides: null,
                  shots: { total: null, on: null },
                  goals: {
                    total: null,
                    conceded: 1,
                    assists: null,
                    saves: 2,
                  },
                  passes: { total: 54, key: null, accuracy: '38' },
                  tackles: {
                    total: null,
                    blocks: null,
                    interceptions: null,
                  },
                  duels: { total: 1, won: 1 },
                  dribbles: { attempts: null, success: null, past: null },
                  fouls: { drawn: null, committed: null },
                  cards: { yellow: 0, red: 0 },
                  penalty: {
                    won: null,
                    commited: null,
                    scored: 0,
                    missed: 0,
                    saved: 0,
                  },
                },
              ],
            },
            {
              player: {
                id: 14701,
                name: 'Josip Šutalo',
                photo: 'https://media.api-sports.io/football/players/14701.png',
              },
              statistics: [
                {
                  games: {
                    minutes: 90,
                    number: 37,
                    position: 'D',
                    rating: '7.3',
                    captain: false,
                    substitute: false,
                  },
                  offsides: null,
                  shots: { total: 1, on: null },
                  goals: {
                    total: null,
                    conceded: 0,
                    assists: null,
                    saves: null,
                  },
                  passes: { total: 79, key: null, accuracy: '77' },
                  tackles: { total: 4, blocks: 1, interceptions: 3 },
                  duels: { total: 12, won: 9 },
                  dribbles: { attempts: 1, success: 1, past: null },
                  fouls: { drawn: 2, committed: 1 },
                  cards: { yellow: 1, red: 0 },
                  penalty: {
                    won: null,
                    commited: null,
                    scored: 0,
                    missed: 0,
                    saved: null,
                  },
                },
              ],
            },
            {
              player: {
                id: 278159,
                name: 'Ahmetcan Kaplan',
                photo:
                  'https://media.api-sports.io/football/players/278159.png',
              },
              statistics: [
                {
                  games: {
                    minutes: 90,
                    number: 13,
                    position: 'D',
                    rating: '6.9',
                    captain: false,
                    substitute: false,
                  },
                  offsides: null,
                  shots: { total: null, on: null },
                  goals: {
                    total: null,
                    conceded: 0,
                    assists: null,
                    saves: null,
                  },
                  passes: { total: 65, key: 1, accuracy: '57' },
                  tackles: { total: 1, blocks: null, interceptions: 1 },
                  duels: { total: 6, won: 3 },
                  dribbles: { attempts: null, success: null, past: null },
                  fouls: { drawn: 1, committed: 1 },
                  cards: { yellow: 0, red: 0 },
                  penalty: {
                    won: null,
                    commited: null,
                    scored: 0,
                    missed: 0,
                    saved: null,
                  },
                },
              ],
            },
            {
              player: {
                id: 341642,
                name: 'Jorrel Hato',
                photo:
                  'https://media.api-sports.io/football/players/341642.png',
              },
              statistics: [
                {
                  games: {
                    minutes: 82,
                    number: 4,
                    position: 'D',
                    rating: '6.9',
                    captain: false,
                    substitute: false,
                  },
                  offsides: null,
                  shots: { total: null, on: null },
                  goals: {
                    total: null,
                    conceded: 0,
                    assists: null,
                    saves: null,
                  },
                  passes: { total: 71, key: 1, accuracy: '66' },
                  tackles: { total: null, blocks: null, interceptions: 3 },
                  duels: { total: 3, won: 1 },
                  dribbles: { attempts: null, success: null, past: null },
                  fouls: { drawn: null, committed: null },
                  cards: { yellow: 0, red: 0 },
                  penalty: {
                    won: null,
                    commited: null,
                    scored: 0,
                    missed: 0,
                    saved: null,
                  },
                },
              ],
            },
            {
              player: {
                id: 162452,
                name: 'Devyne Rensch',
                photo:
                  'https://media.api-sports.io/football/players/162452.png',
              },
              statistics: [
                {
                  games: {
                    minutes: 90,
                    number: 2,
                    position: 'M',
                    rating: '7.9',
                    captain: false,
                    substitute: false,
                  },
                  offsides: null,
                  shots: { total: null, on: null },
                  goals: {
                    total: null,
                    conceded: 0,
                    assists: null,
                    saves: null,
                  },
                  passes: { total: 32, key: 1, accuracy: '26' },
                  tackles: { total: 4, blocks: null, interceptions: 1 },
                  duels: { total: 11, won: 9 },
                  dribbles: { attempts: 2, success: 2, past: null },
                  fouls: { drawn: 2, committed: null },
                  cards: { yellow: 0, red: 0 },
                  penalty: {
                    won: 1,
                    commited: null,
                    scored: 0,
                    missed: 0,
                    saved: null,
                  },
                },
              ],
            },
            {
              player: {
                id: 57443,
                name: 'Sivert Mannsverk',
                photo: 'https://media.api-sports.io/football/players/57443.png',
              },
              statistics: [
                {
                  games: {
                    minutes: 90,
                    number: 16,
                    position: 'M',
                    rating: '6.9',
                    captain: false,
                    substitute: false,
                  },
                  offsides: null,
                  shots: { total: 1, on: null },
                  goals: {
                    total: null,
                    conceded: 0,
                    assists: null,
                    saves: null,
                  },
                  passes: { total: 51, key: null, accuracy: '45' },
                  tackles: { total: null, blocks: null, interceptions: 1 },
                  duels: { total: 5, won: 3 },
                  dribbles: { attempts: 1, success: 1, past: null },
                  fouls: { drawn: 1, committed: 1 },
                  cards: { yellow: 1, red: 0 },
                  penalty: {
                    won: null,
                    commited: null,
                    scored: 0,
                    missed: 0,
                    saved: null,
                  },
                },
              ],
            },
            {
              player: {
                id: 37652,
                name: 'Branco van den Boomen',
                photo: 'https://media.api-sports.io/football/players/37652.png',
              },
              statistics: [
                {
                  games: {
                    minutes: 45,
                    number: 21,
                    position: 'M',
                    rating: '7',
                    captain: false,
                    substitute: false,
                  },
                  offsides: null,
                  shots: { total: null, on: null },
                  goals: {
                    total: null,
                    conceded: 0,
                    assists: null,
                    saves: null,
                  },
                  passes: { total: 36, key: 1, accuracy: '27' },
                  tackles: { total: 1, blocks: null, interceptions: 1 },
                  duels: { total: 2, won: 2 },
                  dribbles: { attempts: null, success: null, past: null },
                  fouls: { drawn: 1, committed: null },
                  cards: { yellow: 0, red: 0 },
                  penalty: {
                    won: null,
                    commited: null,
                    scored: 0,
                    missed: 0,
                    saved: null,
                  },
                },
              ],
            },
            {
              player: {
                id: 38749,
                name: 'Kenneth Taylor',
                photo: 'https://media.api-sports.io/football/players/38749.png',
              },
              statistics: [
                {
                  games: {
                    minutes: 89,
                    number: 8,
                    position: 'M',
                    rating: '7.7',
                    captain: false,
                    substitute: false,
                  },
                  offsides: null,
                  shots: { total: null, on: null },
                  goals: {
                    total: null,
                    conceded: 0,
                    assists: 1,
                    saves: null,
                  },
                  passes: { total: 45, key: 1, accuracy: '34' },
                  tackles: { total: 1, blocks: null, interceptions: 1 },
                  duels: { total: 9, won: 7 },
                  dribbles: { attempts: 4, success: 3, past: null },
                  fouls: { drawn: 3, committed: null },
                  cards: { yellow: 0, red: 0 },
                  penalty: {
                    won: null,
                    commited: null,
                    scored: 0,
                    missed: 0,
                    saved: null,
                  },
                },
              ],
            },
            {
              player: {
                id: 340153,
                name: 'Mika Godts',
                photo:
                  'https://media.api-sports.io/football/players/340153.png',
              },
              statistics: [
                {
                  games: {
                    minutes: 89,
                    number: 39,
                    position: 'F',
                    rating: '6.9',
                    captain: false,
                    substitute: false,
                  },
                  offsides: null,
                  shots: { total: null, on: null },
                  goals: {
                    total: null,
                    conceded: 0,
                    assists: null,
                    saves: null,
                  },
                  passes: { total: 37, key: null, accuracy: '27' },
                  tackles: { total: 1, blocks: null, interceptions: null },
                  duels: { total: 6, won: 3 },
                  dribbles: { attempts: 3, success: 2, past: 1 },
                  fouls: { drawn: null, committed: null },
                  cards: { yellow: 0, red: 0 },
                  penalty: {
                    won: null,
                    commited: null,
                    scored: 0,
                    missed: 0,
                    saved: null,
                  },
                },
              ],
            },
            {
              player: {
                id: 244,
                name: 'Steven Bergwijn',
                photo: 'https://media.api-sports.io/football/players/244.png',
              },
              statistics: [
                {
                  games: {
                    minutes: 90,
                    number: 7,
                    position: 'F',
                    rating: '7',
                    captain: true,
                    substitute: false,
                  },
                  offsides: 2,
                  shots: { total: 3, on: 3 },
                  goals: {
                    total: 1,
                    conceded: 0,
                    assists: null,
                    saves: null,
                  },
                  passes: { total: 36, key: 1, accuracy: '29' },
                  tackles: { total: 1, blocks: null, interceptions: null },
                  duels: { total: 6, won: 2 },
                  dribbles: { attempts: 3, success: 1, past: null },
                  fouls: { drawn: null, committed: 1 },
                  cards: { yellow: 0, red: 0 },
                  penalty: {
                    won: null,
                    commited: null,
                    scored: 1,
                    missed: 0,
                    saved: null,
                  },
                },
              ],
            },
            {
              player: {
                id: 38750,
                name: 'Brian Brobbey',
                photo: 'https://media.api-sports.io/football/players/38750.png',
              },
              statistics: [
                {
                  games: {
                    minutes: 69,
                    number: 9,
                    position: 'F',
                    rating: '7.3',
                    captain: false,
                    substitute: false,
                  },
                  offsides: 2,
                  shots: { total: 1, on: 1 },
                  goals: {
                    total: 1,
                    conceded: 0,
                    assists: null,
                    saves: null,
                  },
                  passes: { total: 15, key: 1, accuracy: '10' },
                  tackles: {
                    total: null,
                    blocks: null,
                    interceptions: null,
                  },
                  duels: { total: 6, won: 4 },
                  dribbles: { attempts: 1, success: null, past: null },
                  fouls: { drawn: 3, committed: null },
                  cards: { yellow: 0, red: 0 },
                  penalty: {
                    won: null,
                    commited: null,
                    scored: 0,
                    missed: 0,
                    saved: null,
                  },
                },
              ],
            },
            {
              player: {
                id: 264094,
                name: 'Benjamin Tahirović',
                photo:
                  'https://media.api-sports.io/football/players/264094.png',
              },
              statistics: [
                {
                  games: {
                    minutes: 45,
                    number: 33,
                    position: 'M',
                    rating: '6.7',
                    captain: false,
                    substitute: true,
                  },
                  offsides: null,
                  shots: { total: 1, on: null },
                  goals: {
                    total: null,
                    conceded: 0,
                    assists: null,
                    saves: null,
                  },
                  passes: { total: 33, key: null, accuracy: '30' },
                  tackles: {
                    total: null,
                    blocks: null,
                    interceptions: null,
                  },
                  duels: { total: 4, won: 1 },
                  dribbles: { attempts: null, success: null, past: 1 },
                  fouls: { drawn: 1, committed: null },
                  cards: { yellow: 0, red: 0 },
                  penalty: {
                    won: null,
                    commited: null,
                    scored: 0,
                    missed: 0,
                    saved: null,
                  },
                },
              ],
            },
            {
              player: {
                id: 2380,
                name: 'Chuba Akpom',
                photo: 'https://media.api-sports.io/football/players/2380.png',
              },
              statistics: [
                {
                  games: {
                    minutes: 21,
                    number: 10,
                    position: 'F',
                    rating: '6.2',
                    captain: false,
                    substitute: true,
                  },
                  offsides: null,
                  shots: { total: null, on: null },
                  goals: {
                    total: null,
                    conceded: 0,
                    assists: null,
                    saves: null,
                  },
                  passes: { total: 2, key: null, accuracy: '1' },
                  tackles: {
                    total: null,
                    blocks: null,
                    interceptions: null,
                  },
                  duels: { total: 6, won: 1 },
                  dribbles: { attempts: 1, success: null, past: 1 },
                  fouls: { drawn: null, committed: null },
                  cards: { yellow: 0, red: 0 },
                  penalty: {
                    won: null,
                    commited: null,
                    scored: 0,
                    missed: 0,
                    saved: null,
                  },
                },
              ],
            },
            {
              player: {
                id: 26303,
                name: 'Borna Sosa',
                photo: 'https://media.api-sports.io/football/players/26303.png',
              },
              statistics: [
                {
                  games: {
                    minutes: 8,
                    number: 25,
                    position: 'D',
                    rating: '6.9',
                    captain: false,
                    substitute: true,
                  },
                  offsides: null,
                  shots: { total: null, on: null },
                  goals: {
                    total: null,
                    conceded: 0,
                    assists: null,
                    saves: null,
                  },
                  passes: { total: 5, key: null, accuracy: '5' },
                  tackles: {
                    total: null,
                    blocks: null,
                    interceptions: null,
                  },
                  duels: { total: 2, won: 1 },
                  dribbles: { attempts: null, success: null, past: null },
                  fouls: { drawn: null, committed: null },
                  cards: { yellow: 0, red: 0 },
                  penalty: {
                    won: null,
                    commited: null,
                    scored: 0,
                    missed: 0,
                    saved: null,
                  },
                },
              ],
            },
            {
              player: {
                id: 313941,
                name: 'Anton Gaaei',
                photo:
                  'https://media.api-sports.io/football/players/313941.png',
              },
              statistics: [
                {
                  games: {
                    minutes: 1,
                    number: 3,
                    position: 'D',
                    rating: null,
                    captain: false,
                    substitute: true,
                  },
                  offsides: null,
                  shots: { total: null, on: null },
                  goals: {
                    total: null,
                    conceded: 0,
                    assists: null,
                    saves: null,
                  },
                  passes: { total: null, key: null, accuracy: null },
                  tackles: {
                    total: null,
                    blocks: null,
                    interceptions: null,
                  },
                  duels: { total: 2, won: null },
                  dribbles: { attempts: 2, success: null, past: null },
                  fouls: { drawn: null, committed: null },
                  cards: { yellow: 0, red: 0 },
                  penalty: {
                    won: null,
                    commited: null,
                    scored: 0,
                    missed: 0,
                    saved: null,
                  },
                },
              ],
            },
            {
              player: {
                id: 336580,
                name: 'Silvano Vos',
                photo:
                  'https://media.api-sports.io/football/players/336580.png',
              },
              statistics: [
                {
                  games: {
                    minutes: 1,
                    number: 24,
                    position: 'M',
                    rating: null,
                    captain: false,
                    substitute: true,
                  },
                  offsides: null,
                  shots: { total: null, on: null },
                  goals: {
                    total: null,
                    conceded: 0,
                    assists: null,
                    saves: null,
                  },
                  passes: { total: null, key: null, accuracy: null },
                  tackles: {
                    total: null,
                    blocks: null,
                    interceptions: null,
                  },
                  duels: { total: null, won: null },
                  dribbles: { attempts: null, success: null, past: null },
                  fouls: { drawn: null, committed: null },
                  cards: { yellow: 0, red: 0 },
                  penalty: {
                    won: null,
                    commited: null,
                    scored: 0,
                    missed: 0,
                    saved: null,
                  },
                },
              ],
            },
            {
              player: {
                id: 37113,
                name: 'Remko Pasveer',
                photo: 'https://media.api-sports.io/football/players/37113.png',
              },
              statistics: [
                {
                  games: {
                    minutes: null,
                    number: 22,
                    position: 'G',
                    rating: null,
                    captain: false,
                    substitute: true,
                  },
                  offsides: null,
                  shots: { total: null, on: null },
                  goals: {
                    total: null,
                    conceded: 0,
                    assists: null,
                    saves: null,
                  },
                  passes: { total: null, key: null, accuracy: null },
                  tackles: {
                    total: null,
                    blocks: null,
                    interceptions: null,
                  },
                  duels: { total: null, won: null },
                  dribbles: { attempts: null, success: null, past: null },
                  fouls: { drawn: null, committed: null },
                  cards: { yellow: 0, red: 0 },
                  penalty: {
                    won: null,
                    commited: null,
                    scored: 0,
                    missed: 0,
                    saved: null,
                  },
                },
              ],
            },
            {
              player: {
                id: 338499,
                name: 'Tom de Graaff',
                photo:
                  'https://media.api-sports.io/football/players/338499.png',
              },
              statistics: [
                {
                  games: {
                    minutes: null,
                    number: 53,
                    position: 'G',
                    rating: null,
                    captain: false,
                    substitute: true,
                  },
                  offsides: null,
                  shots: { total: null, on: null },
                  goals: {
                    total: null,
                    conceded: 0,
                    assists: null,
                    saves: null,
                  },
                  passes: { total: null, key: null, accuracy: null },
                  tackles: {
                    total: null,
                    blocks: null,
                    interceptions: null,
                  },
                  duels: { total: null, won: null },
                  dribbles: { attempts: null, success: null, past: null },
                  fouls: { drawn: null, committed: null },
                  cards: { yellow: 0, red: 0 },
                  penalty: {
                    won: null,
                    commited: null,
                    scored: 0,
                    missed: 0,
                    saved: null,
                  },
                },
              ],
            },
            {
              player: {
                id: 80219,
                name: 'Jakov Medić',
                photo: 'https://media.api-sports.io/football/players/80219.png',
              },
              statistics: [
                {
                  games: {
                    minutes: null,
                    number: 18,
                    position: 'D',
                    rating: null,
                    captain: false,
                    substitute: true,
                  },
                  offsides: null,
                  shots: { total: null, on: null },
                  goals: {
                    total: null,
                    conceded: 0,
                    assists: null,
                    saves: null,
                  },
                  passes: { total: null, key: null, accuracy: null },
                  tackles: {
                    total: null,
                    blocks: null,
                    interceptions: null,
                  },
                  duels: { total: null, won: null },
                  dribbles: { attempts: null, success: null, past: null },
                  fouls: { drawn: null, committed: null },
                  cards: { yellow: 0, red: 0 },
                  penalty: {
                    won: null,
                    commited: null,
                    scored: 0,
                    missed: 0,
                    saved: null,
                  },
                },
              ],
            },
            {
              player: {
                id: 36895,
                name: 'Kian Fitz-Jim',
                photo: 'https://media.api-sports.io/football/players/36895.png',
              },
              statistics: [
                {
                  games: {
                    minutes: null,
                    number: 28,
                    position: 'M',
                    rating: null,
                    captain: false,
                    substitute: true,
                  },
                  offsides: null,
                  shots: { total: null, on: null },
                  goals: {
                    total: null,
                    conceded: 0,
                    assists: null,
                    saves: null,
                  },
                  passes: { total: null, key: null, accuracy: null },
                  tackles: {
                    total: null,
                    blocks: null,
                    interceptions: null,
                  },
                  duels: { total: null, won: null },
                  dribbles: { attempts: null, success: null, past: null },
                  fouls: { drawn: null, committed: null },
                  cards: { yellow: 0, red: 0 },
                  penalty: {
                    won: null,
                    commited: null,
                    scored: 0,
                    missed: 0,
                    saved: null,
                  },
                },
              ],
            },
            {
              player: {
                id: 282126,
                name: 'Carlos Borges',
                photo:
                  'https://media.api-sports.io/football/players/282126.png',
              },
              statistics: [
                {
                  games: {
                    minutes: null,
                    number: 11,
                    position: 'F',
                    rating: null,
                    captain: false,
                    substitute: true,
                  },
                  offsides: null,
                  shots: { total: null, on: null },
                  goals: {
                    total: null,
                    conceded: 0,
                    assists: null,
                    saves: null,
                  },
                  passes: { total: null, key: null, accuracy: null },
                  tackles: {
                    total: null,
                    blocks: null,
                    interceptions: null,
                  },
                  duels: { total: null, won: null },
                  dribbles: { attempts: null, success: null, past: null },
                  fouls: { drawn: null, committed: null },
                  cards: { yellow: 0, red: 0 },
                  penalty: {
                    won: null,
                    commited: null,
                    scored: 0,
                    missed: 0,
                    saved: null,
                  },
                },
              ],
            },
            {
              player: {
                id: 335335,
                name: 'Julian Rijkhoff',
                photo:
                  'https://media.api-sports.io/football/players/335335.png',
              },
              statistics: [
                {
                  games: {
                    minutes: null,
                    number: 19,
                    position: 'F',
                    rating: null,
                    captain: false,
                    substitute: true,
                  },
                  offsides: null,
                  shots: { total: null, on: null },
                  goals: {
                    total: null,
                    conceded: 0,
                    assists: null,
                    saves: null,
                  },
                  passes: { total: null, key: null, accuracy: null },
                  tackles: {
                    total: null,
                    blocks: null,
                    interceptions: null,
                  },
                  duels: { total: null, won: null },
                  dribbles: { attempts: null, success: null, past: null },
                  fouls: { drawn: null, committed: null },
                  cards: { yellow: 0, red: 0 },
                  penalty: {
                    won: null,
                    commited: null,
                    scored: 0,
                    missed: 0,
                    saved: null,
                  },
                },
              ],
            },
          ],
        },
        {
          team: {
            id: 415,
            name: 'Twente',
            logo: 'https://media.api-sports.io/football/teams/415.png',
            update: '2024-04-16T06:08:09+02:00',
          },
          players: [
            {
              player: {
                id: 37765,
                name: 'Lars Unnerstall',
                photo: 'https://media.api-sports.io/football/players/37765.png',
              },
              statistics: [
                {
                  games: {
                    minutes: 90,
                    number: 1,
                    position: 'G',
                    rating: '6.3',
                    captain: false,
                    substitute: false,
                  },
                  offsides: null,
                  shots: { total: null, on: null },
                  goals: {
                    total: null,
                    conceded: 2,
                    assists: null,
                    saves: 2,
                  },
                  passes: { total: 30, key: null, accuracy: '17' },
                  tackles: {
                    total: null,
                    blocks: null,
                    interceptions: null,
                  },
                  duels: { total: 1, won: 1 },
                  dribbles: { attempts: 1, success: 1, past: null },
                  fouls: { drawn: null, committed: null },
                  cards: { yellow: 0, red: 0 },
                  penalty: {
                    won: null,
                    commited: null,
                    scored: 0,
                    missed: 0,
                    saved: 0,
                  },
                },
              ],
            },
            {
              player: {
                id: 161883,
                name: 'Youri Regeer',
                photo:
                  'https://media.api-sports.io/football/players/161883.png',
              },
              statistics: [
                {
                  games: {
                    minutes: 90,
                    number: 8,
                    position: 'D',
                    rating: '6.9',
                    captain: false,
                    substitute: false,
                  },
                  offsides: null,
                  shots: { total: null, on: null },
                  goals: {
                    total: null,
                    conceded: 0,
                    assists: null,
                    saves: null,
                  },
                  passes: { total: 42, key: 2, accuracy: '34' },
                  tackles: { total: 3, blocks: 1, interceptions: null },
                  duels: { total: 8, won: 5 },
                  dribbles: { attempts: null, success: null, past: null },
                  fouls: { drawn: 1, committed: 1 },
                  cards: { yellow: 0, red: 0 },
                  penalty: {
                    won: null,
                    commited: null,
                    scored: 0,
                    missed: 0,
                    saved: null,
                  },
                },
              ],
            },
            {
              player: {
                id: 272723,
                name: 'Mees Hilgers',
                photo:
                  'https://media.api-sports.io/football/players/272723.png',
              },
              statistics: [
                {
                  games: {
                    minutes: 77,
                    number: 2,
                    position: 'D',
                    rating: '6.7',
                    captain: false,
                    substitute: false,
                  },
                  offsides: null,
                  shots: { total: null, on: null },
                  goals: {
                    total: null,
                    conceded: 0,
                    assists: null,
                    saves: null,
                  },
                  passes: { total: 40, key: null, accuracy: '35' },
                  tackles: { total: null, blocks: null, interceptions: 4 },
                  duels: { total: 2, won: null },
                  dribbles: { attempts: null, success: null, past: 1 },
                  fouls: { drawn: null, committed: 1 },
                  cards: { yellow: 0, red: 0 },
                  penalty: {
                    won: null,
                    commited: null,
                    scored: 0,
                    missed: 0,
                    saved: null,
                  },
                },
              ],
            },
            {
              player: {
                id: 37254,
                name: 'Robin Pröpper',
                photo: 'https://media.api-sports.io/football/players/37254.png',
              },
              statistics: [
                {
                  games: {
                    minutes: 90,
                    number: 3,
                    position: 'D',
                    rating: '6.2',
                    captain: true,
                    substitute: false,
                  },
                  offsides: null,
                  shots: { total: null, on: null },
                  goals: {
                    total: null,
                    conceded: 0,
                    assists: null,
                    saves: null,
                  },
                  passes: { total: 54, key: null, accuracy: '38' },
                  tackles: { total: 2, blocks: null, interceptions: null },
                  duels: { total: 10, won: 7 },
                  dribbles: { attempts: 1, success: null, past: null },
                  fouls: { drawn: 1, committed: null },
                  cards: { yellow: 0, red: 0 },
                  penalty: {
                    won: null,
                    commited: null,
                    scored: 0,
                    missed: 0,
                    saved: null,
                  },
                },
              ],
            },
            {
              player: {
                id: 37742,
                name: 'Gijs Smal',
                photo: 'https://media.api-sports.io/football/players/37742.png',
              },
              statistics: [
                {
                  games: {
                    minutes: 54,
                    number: 5,
                    position: 'D',
                    rating: '6.9',
                    captain: false,
                    substitute: false,
                  },
                  offsides: null,
                  shots: { total: null, on: null },
                  goals: {
                    total: null,
                    conceded: 0,
                    assists: null,
                    saves: null,
                  },
                  passes: { total: 34, key: 1, accuracy: '30' },
                  tackles: {
                    total: null,
                    blocks: null,
                    interceptions: null,
                  },
                  duels: { total: 3, won: 1 },
                  dribbles: { attempts: null, success: null, past: 2 },
                  fouls: { drawn: null, committed: null },
                  cards: { yellow: 0, red: 0 },
                  penalty: {
                    won: null,
                    commited: null,
                    scored: 0,
                    missed: 0,
                    saved: null,
                  },
                },
              ],
            },
            {
              player: {
                id: 137209,
                name: 'Mathias Kjølø',
                photo:
                  'https://media.api-sports.io/football/players/137209.png',
              },
              statistics: [
                {
                  games: {
                    minutes: 90,
                    number: 4,
                    position: 'M',
                    rating: '6.6',
                    captain: false,
                    substitute: false,
                  },
                  offsides: null,
                  shots: { total: null, on: null },
                  goals: {
                    total: null,
                    conceded: 0,
                    assists: null,
                    saves: null,
                  },
                  passes: { total: 53, key: null, accuracy: '47' },
                  tackles: { total: null, blocks: null, interceptions: 1 },
                  duels: { total: 4, won: 1 },
                  dribbles: { attempts: null, success: null, past: 1 },
                  fouls: { drawn: null, committed: 1 },
                  cards: { yellow: 1, red: 0 },
                  penalty: {
                    won: null,
                    commited: null,
                    scored: 0,
                    missed: 0,
                    saved: null,
                  },
                },
              ],
            },
            {
              player: {
                id: 540,
                name: 'Carel Eiting',
                photo: 'https://media.api-sports.io/football/players/540.png',
              },
              statistics: [
                {
                  games: {
                    minutes: 66,
                    number: 6,
                    position: 'M',
                    rating: '6.6',
                    captain: false,
                    substitute: false,
                  },
                  offsides: null,
                  shots: { total: null, on: null },
                  goals: {
                    total: null,
                    conceded: 0,
                    assists: null,
                    saves: null,
                  },
                  passes: { total: 36, key: null, accuracy: '29' },
                  tackles: { total: 2, blocks: null, interceptions: null },
                  duels: { total: 3, won: 2 },
                  dribbles: { attempts: null, success: null, past: 1 },
                  fouls: { drawn: null, committed: null },
                  cards: { yellow: 0, red: 0 },
                  penalty: {
                    won: null,
                    commited: null,
                    scored: 0,
                    missed: 0,
                    saved: null,
                  },
                },
              ],
            },
            {
              player: {
                id: 272726,
                name: 'Daan Rots',
                photo:
                  'https://media.api-sports.io/football/players/272726.png',
              },
              statistics: [
                {
                  games: {
                    minutes: 90,
                    number: 11,
                    position: 'M',
                    rating: '6.9',
                    captain: false,
                    substitute: false,
                  },
                  offsides: null,
                  shots: { total: 2, on: null },
                  goals: {
                    total: null,
                    conceded: 0,
                    assists: 1,
                    saves: null,
                  },
                  passes: { total: 29, key: 2, accuracy: '24' },
                  tackles: { total: 1, blocks: null, interceptions: null },
                  duels: { total: 12, won: 2 },
                  dribbles: { attempts: 2, success: null, past: 3 },
                  fouls: { drawn: null, committed: 2 },
                  cards: { yellow: 0, red: 0 },
                  penalty: {
                    won: null,
                    commited: null,
                    scored: 0,
                    missed: 0,
                    saved: null,
                  },
                },
              ],
            },
            {
              player: {
                id: 37784,
                name: 'Sem Steijn',
                photo: 'https://media.api-sports.io/football/players/37784.png',
              },
              statistics: [
                {
                  games: {
                    minutes: 66,
                    number: 14,
                    position: 'M',
                    rating: '6.7',
                    captain: false,
                    substitute: false,
                  },
                  offsides: null,
                  shots: { total: 1, on: 1 },
                  goals: {
                    total: null,
                    conceded: 0,
                    assists: null,
                    saves: null,
                  },
                  passes: { total: 15, key: null, accuracy: '12' },
                  tackles: {
                    total: null,
                    blocks: null,
                    interceptions: null,
                  },
                  duels: { total: 2, won: null },
                  dribbles: { attempts: null, success: null, past: 1 },
                  fouls: { drawn: null, committed: null },
                  cards: { yellow: 0, red: 0 },
                  penalty: {
                    won: null,
                    commited: null,
                    scored: 0,
                    missed: 0,
                    saved: null,
                  },
                },
              ],
            },
            {
              player: {
                id: 36982,
                name: 'Michel Vlap',
                photo: 'https://media.api-sports.io/football/players/36982.png',
              },
              statistics: [
                {
                  games: {
                    minutes: 77,
                    number: 18,
                    position: 'M',
                    rating: '6.6',
                    captain: false,
                    substitute: false,
                  },
                  offsides: null,
                  shots: { total: 1, on: 1 },
                  goals: {
                    total: null,
                    conceded: 0,
                    assists: null,
                    saves: null,
                  },
                  passes: { total: 26, key: 1, accuracy: '22' },
                  tackles: { total: null, blocks: null, interceptions: 1 },
                  duels: { total: 5, won: 1 },
                  dribbles: { attempts: null, success: null, past: 1 },
                  fouls: { drawn: null, committed: null },
                  cards: { yellow: 0, red: 0 },
                  penalty: {
                    won: null,
                    commited: null,
                    scored: 0,
                    missed: 0,
                    saved: null,
                  },
                },
              ],
            },
            {
              player: {
                id: 48390,
                name: 'Ricky van Wolfswinkel',
                photo: 'https://media.api-sports.io/football/players/48390.png',
              },
              statistics: [
                {
                  games: {
                    minutes: 90,
                    number: 9,
                    position: 'F',
                    rating: '7.5',
                    captain: false,
                    substitute: false,
                  },
                  offsides: 2,
                  shots: { total: 1, on: 1 },
                  goals: {
                    total: 1,
                    conceded: 0,
                    assists: null,
                    saves: null,
                  },
                  passes: { total: 18, key: null, accuracy: '15' },
                  tackles: { total: 1, blocks: null, interceptions: 1 },
                  duels: { total: 16, won: 7 },
                  dribbles: { attempts: null, success: null, past: null },
                  fouls: { drawn: 1, committed: 5 },
                  cards: { yellow: 0, red: 0 },
                  penalty: {
                    won: null,
                    commited: null,
                    scored: 0,
                    missed: 0,
                    saved: null,
                  },
                },
              ],
            },
            {
              player: {
                id: 162451,
                name: 'Anass Salah-Eddine',
                photo:
                  'https://media.api-sports.io/football/players/162451.png',
              },
              statistics: [
                {
                  games: {
                    minutes: 36,
                    number: 34,
                    position: 'D',
                    rating: '6.3',
                    captain: false,
                    substitute: true,
                  },
                  offsides: null,
                  shots: { total: null, on: null },
                  goals: {
                    total: null,
                    conceded: 0,
                    assists: null,
                    saves: null,
                  },
                  passes: { total: 11, key: null, accuracy: '9' },
                  tackles: { total: 2, blocks: null, interceptions: null },
                  duels: { total: 7, won: 4 },
                  dribbles: { attempts: 1, success: 1, past: null },
                  fouls: { drawn: 1, committed: 2 },
                  cards: { yellow: 0, red: 0 },
                  penalty: {
                    won: null,
                    commited: 1,
                    scored: 0,
                    missed: 0,
                    saved: null,
                  },
                },
              ],
            },
            {
              player: {
                id: 48190,
                name: 'Alfons Sampsted',
                photo: 'https://media.api-sports.io/football/players/48190.png',
              },
              statistics: [
                {
                  games: {
                    minutes: 24,
                    number: 12,
                    position: 'D',
                    rating: '6.3',
                    captain: false,
                    substitute: true,
                  },
                  offsides: null,
                  shots: { total: 1, on: null },
                  goals: {
                    total: null,
                    conceded: 0,
                    assists: null,
                    saves: null,
                  },
                  passes: { total: 11, key: null, accuracy: '7' },
                  tackles: { total: null, blocks: null, interceptions: 1 },
                  duels: { total: 2, won: 1 },
                  dribbles: { attempts: 1, success: 1, past: null },
                  fouls: { drawn: null, committed: 1 },
                  cards: { yellow: 0, red: 0 },
                  penalty: {
                    won: null,
                    commited: null,
                    scored: 0,
                    missed: 0,
                    saved: null,
                  },
                },
              ],
            },
            {
              player: {
                id: 36989,
                name: 'Mitchell Van Bergen',
                photo: 'https://media.api-sports.io/football/players/36989.png',
              },
              statistics: [
                {
                  games: {
                    minutes: 24,
                    number: 7,
                    position: 'F',
                    rating: '6.7',
                    captain: false,
                    substitute: true,
                  },
                  offsides: null,
                  shots: { total: null, on: null },
                  goals: {
                    total: null,
                    conceded: 0,
                    assists: null,
                    saves: null,
                  },
                  passes: { total: 10, key: null, accuracy: '7' },
                  tackles: {
                    total: null,
                    blocks: null,
                    interceptions: null,
                  },
                  duels: { total: 2, won: null },
                  dribbles: { attempts: null, success: null, past: null },
                  fouls: { drawn: null, committed: null },
                  cards: { yellow: 0, red: 0 },
                  penalty: {
                    won: null,
                    commited: null,
                    scored: 0,
                    missed: 0,
                    saved: null,
                  },
                },
              ],
            },
            {
              player: {
                id: 291994,
                name: 'Max Bruns',
                photo:
                  'https://media.api-sports.io/football/players/291994.png',
              },
              statistics: [
                {
                  games: {
                    minutes: 13,
                    number: 38,
                    position: 'M',
                    rating: '6.7',
                    captain: false,
                    substitute: true,
                  },
                  offsides: null,
                  shots: { total: null, on: null },
                  goals: {
                    total: null,
                    conceded: 0,
                    assists: null,
                    saves: null,
                  },
                  passes: { total: 10, key: null, accuracy: '9' },
                  tackles: {
                    total: null,
                    blocks: null,
                    interceptions: null,
                  },
                  duels: { total: 1, won: 1 },
                  dribbles: { attempts: null, success: null, past: null },
                  fouls: { drawn: null, committed: null },
                  cards: { yellow: 0, red: 0 },
                  penalty: {
                    won: null,
                    commited: null,
                    scored: 0,
                    missed: 0,
                    saved: null,
                  },
                },
              ],
            },
            {
              player: {
                id: 161894,
                name: 'Naci Ünüvar',
                photo:
                  'https://media.api-sports.io/football/players/161894.png',
              },
              statistics: [
                {
                  games: {
                    minutes: 13,
                    number: 10,
                    position: 'F',
                    rating: '6.5',
                    captain: false,
                    substitute: true,
                  },
                  offsides: null,
                  shots: { total: null, on: null },
                  goals: {
                    total: null,
                    conceded: 0,
                    assists: null,
                    saves: null,
                  },
                  passes: { total: 5, key: null, accuracy: '3' },
                  tackles: {
                    total: null,
                    blocks: null,
                    interceptions: null,
                  },
                  duels: { total: 3, won: 1 },
                  dribbles: { attempts: null, success: null, past: null },
                  fouls: { drawn: null, committed: 1 },
                  cards: { yellow: 0, red: 0 },
                  penalty: {
                    won: null,
                    commited: null,
                    scored: 0,
                    missed: 0,
                    saved: null,
                  },
                },
              ],
            },
            {
              player: {
                id: 523,
                name: 'Issam El Maach',
                photo: 'https://media.api-sports.io/football/players/523.png',
              },
              statistics: [
                {
                  games: {
                    minutes: null,
                    number: 16,
                    position: 'G',
                    rating: null,
                    captain: false,
                    substitute: true,
                  },
                  offsides: null,
                  shots: { total: null, on: null },
                  goals: {
                    total: null,
                    conceded: 0,
                    assists: null,
                    saves: null,
                  },
                  passes: { total: null, key: null, accuracy: null },
                  tackles: {
                    total: null,
                    blocks: null,
                    interceptions: null,
                  },
                  duels: { total: null, won: null },
                  dribbles: { attempts: null, success: null, past: null },
                  fouls: { drawn: null, committed: null },
                  cards: { yellow: 0, red: 0 },
                  penalty: {
                    won: null,
                    commited: null,
                    scored: 0,
                    missed: 0,
                    saved: null,
                  },
                },
              ],
            },
            {
              player: {
                id: 50974,
                name: 'Przemysław Tytoń',
                photo: 'https://media.api-sports.io/football/players/50974.png',
              },
              statistics: [
                {
                  games: {
                    minutes: null,
                    number: 22,
                    position: 'G',
                    rating: null,
                    captain: false,
                    substitute: true,
                  },
                  offsides: null,
                  shots: { total: null, on: null },
                  goals: {
                    total: null,
                    conceded: 0,
                    assists: null,
                    saves: null,
                  },
                  passes: { total: null, key: null, accuracy: null },
                  tackles: {
                    total: null,
                    blocks: null,
                    interceptions: null,
                  },
                  duels: { total: null, won: null },
                  dribbles: { attempts: null, success: null, past: null },
                  fouls: { drawn: null, committed: null },
                  cards: { yellow: 0, red: 0 },
                  penalty: {
                    won: null,
                    commited: null,
                    scored: 0,
                    missed: 0,
                    saved: null,
                  },
                },
              ],
            },
            {
              player: {
                id: 8935,
                name: 'Alec Van Hoorenbeeck',
                photo: 'https://media.api-sports.io/football/players/8935.png',
              },
              statistics: [
                {
                  games: {
                    minutes: null,
                    number: 17,
                    position: 'D',
                    rating: null,
                    captain: false,
                    substitute: true,
                  },
                  offsides: null,
                  shots: { total: null, on: null },
                  goals: {
                    total: null,
                    conceded: 0,
                    assists: null,
                    saves: null,
                  },
                  passes: { total: null, key: null, accuracy: null },
                  tackles: {
                    total: null,
                    blocks: null,
                    interceptions: null,
                  },
                  duels: { total: null, won: null },
                  dribbles: { attempts: null, success: null, past: null },
                  fouls: { drawn: null, committed: null },
                  cards: { yellow: 0, red: 0 },
                  penalty: {
                    won: null,
                    commited: null,
                    scored: 0,
                    missed: 0,
                    saved: null,
                  },
                },
              ],
            },
            {
              player: {
                id: 408854,
                name: 'Gijs Besselink',
                photo:
                  'https://media.api-sports.io/football/players/408854.png',
              },
              statistics: [
                {
                  games: {
                    minutes: null,
                    number: 41,
                    position: 'M',
                    rating: null,
                    captain: false,
                    substitute: true,
                  },
                  offsides: null,
                  shots: { total: null, on: null },
                  goals: {
                    total: null,
                    conceded: 0,
                    assists: null,
                    saves: null,
                  },
                  passes: { total: null, key: null, accuracy: null },
                  tackles: {
                    total: null,
                    blocks: null,
                    interceptions: null,
                  },
                  duels: { total: null, won: null },
                  dribbles: { attempts: null, success: null, past: null },
                  fouls: { drawn: null, committed: null },
                  cards: { yellow: 0, red: 0 },
                  penalty: {
                    won: null,
                    commited: null,
                    scored: 0,
                    missed: 0,
                    saved: null,
                  },
                },
              ],
            },
            {
              player: {
                id: 328670,
                name: 'Younes Taha',
                photo:
                  'https://media.api-sports.io/football/players/328670.png',
              },
              statistics: [
                {
                  games: {
                    minutes: null,
                    number: 19,
                    position: 'F',
                    rating: null,
                    captain: false,
                    substitute: true,
                  },
                  offsides: null,
                  shots: { total: null, on: null },
                  goals: {
                    total: null,
                    conceded: 0,
                    assists: null,
                    saves: null,
                  },
                  passes: { total: null, key: null, accuracy: null },
                  tackles: {
                    total: null,
                    blocks: null,
                    interceptions: null,
                  },
                  duels: { total: null, won: null },
                  dribbles: { attempts: null, success: null, past: null },
                  fouls: { drawn: null, committed: null },
                  cards: { yellow: 0, red: 0 },
                  penalty: {
                    won: null,
                    commited: null,
                    scored: 0,
                    missed: 0,
                    saved: null,
                  },
                },
              ],
            },
          ],
        },
      ],
    };

    const fixtureStatus = fixtureData.fixture.status.short;

    if (
      fixtureStatus == '1H' ||
      fixtureStatus == 'HT' ||
      fixtureStatus == '2H' ||
      fixtureStatus == 'ET' ||
      fixtureStatus == 'BT' ||
      fixtureStatus == 'P' ||
      fixtureStatus == 'SUSP' ||
      fixtureStatus == 'INT'
    ) {
      // Send data as a stringified JSON
      res.write(`data: ${JSON.stringify(fixtureData)}\n\n`);
    }
  };

  sendStats();

  // Send data every minute
  const intervalId = setInterval(sendStats, 5000);

  // Clear interval on client disconnect
  req.on('close', () => {
    clearInterval(intervalId);
    res.end();
  });
});

app.listen(port, () =>
  console.log(`Listening on port http://localhost:${port}/`)
);
