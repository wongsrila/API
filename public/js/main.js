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

// Your URL path
const path = window.location.pathname;
const parts = path.split('/');
const id = parts[parts.length - 1];

const evtSource = new EventSource(`/fixtures/${id}/events`);
evtSource.onmessage = function (event) {
  const data = JSON.parse(event.data);

  const homeScore = data.goals.home;
  const awayScore = data.goals.away;
  const timeElapsed = data.fixture.status.elapsed;

  const eventsData = data.events;

  const container = document.getElementById('eventsContainer');
  container.innerHTML = ''; // Clear existing content

  eventsData.forEach((event) => {
    // Goal event card
    if (event.type === 'Goal') {
      const card = document.createElement('div');
      card.className = 'card goal';

      const header = document.createElement('h1');
      header.className = 'card-header';
      header.textContent = `${event.time.elapsed}'`;

      const body = document.createElement('p');
      body.className = 'card-body';
      if (event.assist.name) {
        body.textContent = `GOAALLLLL!!! - ${event.player.name}, assist van ${event.assist.name}`;
      } else {
        body.textContent = `GOAALLLLL!!! - ${event.player.name}`;
      }

      const img = document.createElement('img');
      img.className = 'card-team-logo';
      img.src = event.team.logo;

      card.appendChild(header);
      card.appendChild(body);
      card.appendChild(img);
      container.appendChild(card);
    }

    // Card event card
    if (event.type === 'Card' && event.detail === 'Yellow Card') {
      const card = document.createElement('div');
      card.className = 'card yellow-card';

      const header = document.createElement('h1');
      header.className = 'card-header';
      header.textContent = `${event.time.elapsed}'`;

      const body = document.createElement('p');
      body.className = 'card-body';
      body.textContent = `${event.detail} - ${event.player.name}`;

      const img = document.createElement('img');
      img.className = 'card-team-logo';
      img.src = event.team.logo;

      card.appendChild(header);
      card.appendChild(body);
      card.appendChild(img);
      container.appendChild(card);
    } else if (event.type === 'Card' && event.detail === 'Red Card') {
      const card = document.createElement('div');
      card.className = 'card red-card';

      const header = document.createElement('h1');
      header.className = 'card-header';
      header.textContent = `${event.time.elapsed}'`;

      const body = document.createElement('p');
      body.className = 'card-body';
      body.textContent = `${event.detail} - ${event.player.name}`;

      const img = document.createElement('img');
      img.className = 'card-team-logo';
      img.src = event.team.logo;

      card.appendChild(header);
      card.appendChild(body);
      card.appendChild(img);
      container.appendChild(card);
    }

    // Subst. event card
    if (event.type === 'subst') {
      const card = document.createElement('div');
      card.className = 'card';

      const header = document.createElement('h1');
      header.className = 'card-header';
      header.textContent = `${event.time.elapsed}'`;

      const body = document.createElement('p');
      body.className = 'card-body';
      body.textContent = `Wissel - IN ${event.assist.name} OUT ${event.player.name}`;

      const img = document.createElement('img');
      img.className = 'card-team-logo';
      img.src = event.team.logo;

      card.appendChild(header);
      card.appendChild(body);
      card.appendChild(img);
      container.appendChild(card);
    }

    // Var event card
    if (event.type === 'Var') {
      const card = document.createElement('div');
      card.className = 'card';

      const header = document.createElement('h1');
      header.className = 'card-header';
      header.textContent = `${event.time.elapsed}'`;

      const body = document.createElement('p');
      body.className = 'card-body';
      body.textContent = `${event.detail} - ${event.player.name} ${event.assist.name}`;

      const img = document.createElement('img');
      img.className = 'card-team-logo';
      img.src = event.team.logo;

      card.appendChild(header);
      card.appendChild(body);
      card.appendChild(img);
      container.appendChild(card);
    }
  });

  document.getElementById('home-score').innerHTML = homeScore;
  document.getElementById('away-score').innerHTML = awayScore;
  document.getElementById('timeElapsed').innerHTML = `${timeElapsed}'`;
};
