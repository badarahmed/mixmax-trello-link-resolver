var sync = require('synchronize');
var request = require('request');
var _ = require('underscore');

// The API that returns the in-email representation.
module.exports = function(req, res) {
  var url = req.query.url.trim();

  var matches = url.match(/https:\/\/trello.com\/c\//);
  if (!matches) {
    res.status(400).send('Invalid URL format');
    return;
  }

  var response;
  try {
    console.log(url + '.json');

    response = sync.await(request({
      url: url + '.json?key=' + process.env.TRELLO_API_KEY,
      timeout: 15 * 1000,
      json: true
    }, sync.defer()));
  } catch (e) {
    res.status(500).send('Error');
    return;
  }

  var html = '<div style="background-color: #edeff0; font-family: Helvetica Neue, Arial, Helvetica, sans-serif;">'
  html += '<h2>' + response.body.name + '</h2>';
  html += '<h5>' + response.body.desc + '</h5>';
  html += '</div>';

  res.json({
    body: html
  });
};
