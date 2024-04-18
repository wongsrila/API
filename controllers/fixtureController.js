const { fixtureDetails } = require('../models/api');
const { formatDate, formatTimestampAsTime } = require('../utils/dateFormats');
const fixtureDataJson = require('../models/fixtureData.json');
const fs = require('fs');
const path = require('path');

const fixtureStream = (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  const fixtureId = req.params.id;

  // Function to send data
  const sendLiveStats = async () => {
    // const fixtureData = fixtureDataJson;
    const fixtureData = await fixtureDetails(fixtureId);

    const fixtureStatus = fixtureData.fixture.status.short;

    if (
      ['1H', 'HT', '2H', 'ET', 'BT', 'P', 'SUSP', 'INT'].includes(fixtureStatus)
    ) {
      res.write(`data: ${JSON.stringify(fixtureData)}\n\n`);
    }
  };

  sendLiveStats();

  // Send data every minute
  const intervalId = setInterval(sendLiveStats, 30000);

  // Clear interval on client disconnect
  req.on('close', () => {
    clearInterval(intervalId);
    res.end();
  });
};

const fixtureGet = async (req, res) => {
  try {
    const fixtureId = req.params.id;
    const fixtureInfo = await fixtureDetails(fixtureId);

    res.render('fixtureDetail', {
      fixtureInfo,
      formatDate,
      formatTimestampAsTime,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
};

module.exports = {
  fixtureGet,
  fixtureStream,
};
