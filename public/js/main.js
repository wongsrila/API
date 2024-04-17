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

const evtSource = new EventSource('/events');
evtSource.onmessage = function (event) {
  const data = JSON.parse(event.data);

  const homeScore = data.goals.home;
  const awayScore = data.goals.away;
  const time = formatTimestampAsTime(data.fixture.timestamp);

  console.log(time);

  document.getElementById('home-score').innerHTML = homeScore;
  document.getElementById('away-score').innerHTML = awayScore;
  document.getElementById('timestamp').innerHTML = time;
};
