const { fixtureDetails } = require('../models/api');
const { formatDate, formatTimestampAsTime } = require('../utils/dateFormats');

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
};
