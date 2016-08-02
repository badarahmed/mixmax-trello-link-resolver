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

  var html = '<style>.card-label{color: white; font-size: 0.7em; border-radius:3px;-moz-box-sizing:border-box;box-sizing:border-box;display:block;float:left;height:30px;line-height:30px;margin:0 4px 4px 0;min-width:40px;padding:0 10px;width:auto;}  .card-label-green{background-color:#61bd4f}.card-label-yellow{background-color:#f2d600}.card-label-orange{background-color:#ffab4a}.card-label-red{background-color:#eb5a46} .card-label-purple{background-color:#c377e0} .card-label-blue{background-color:#0079bf} .card-label-pink{background-color:#ff80ce}.card-label-sky{background-color:#00c2e0}.card-label-lime{background-color:#51e898}.card-label-black{background-color:#4d4d4d}</style>';
  html += '<table id="" class="card-v3" cellpadding="0" cellspacing="0" style="border:1px solid #f5ffff; border-radius:4px; width:100%; max-width:578px; mso-border-alt: none;">';
  html += '<tbody><tr style="border:1px solid #d5ecff; mso-border-alt:none; display:block; border-radius: 3px;">';
  html += '<td style="display:block; padding:8px; border-radius:2px; border:1px solid #99b0e1; vertical-align:top; background-color:white; mso-border-alt:none;">';

  html += '<div style="font-family: Helvetica Neue, Arial, Helvetica, sans-serif;">'
  html += '<h2>' + response.body.name + '</h2>';

  for (label of response.body.labels) {
    html += '<div class="card-label card-label-' + label.color + '">&nbsp;' + label.name + '</div>';
  }

  html += '<br/><h5>' + response.body.desc + '</h5>';
  html += '<p style="text-align: right; font-size: 0.7em">trello.com</p>';
  html += '</div>';

  html += '</td> </tr> </tbody> </table>';

  res.json({
    body: html
  });
};
