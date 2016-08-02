var sync = require('synchronize');
var request = require('request');

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

    // Hit Trello API
    response = sync.await(request({
      url: url + '.json?key=' + process.env.TRELLO_API_KEY,
      timeout: 15 * 1000,
      json: true
    }, sync.defer()));
  } catch (e) {
    res.status(500).send('Error');
    return;
  }

  // Format HTML output for link preview
  try {
    var labelStyle = 'color: white; font-size: 0.7em; border-radius:3px;-moz-box-sizing:border-box;box-sizing:border-box;display:block;float:left;height:30px;line-height:30px;margin:0 4px 4px 0;min-width:40px;padding:0 10px;width:auto; ';

    var html = '<table id="" class="card-v3" cellpadding="0" cellspacing="0" style="border:1px solid #f5ffff; border-radius:4px; width:100%; max-width:578px; mso-border-alt: none;">';
    html += '<tbody><tr style="border:1px solid #d5ecff; mso-border-alt:none; display:block; border-radius: 3px;">';
    html += '<td style="display:block; padding:8px; border-radius:2px; border:1px solid #99b0e1; vertical-align:top; background-color:white; mso-border-alt:none;">';

    html += '<div style="font-family: Helvetica Neue, Arial, Helvetica, sans-serif;">'
    html += '<h2>' + response.body.name + '</h2>';

    if (response.body.labels && response.body.labels.length > 0) {
      for (label of response.body.labels) {

        var color;

        // Use Trello color palette for labels
        switch (label.color) {
          case "green":
            color = "#61bd4f";
            break;
          case "yellow":
            color = "#f2d600";
            break;
          case "orange":
            color = "#ffab4a";
            break;
          case "red":
            color = "#eb5a46";
            break;
          case "purple":
            color = "#c377e0";
            break;
          case "blue":
            color = "#0079bf";
            break;
          case "pink":
            color = "#ff80ce";
            break;
          case "sky":
            color = "#00c2e0";
            break;
          case "lime":
            color = "#51e898";
            break;
          case "black":
            color = "#4d4d4d";
            break;
        }

        html += '<div style="' + labelStyle + 'background-color: ' + color + ';">&nbsp;' + label.name + '</div>';
      }
      html += '<br/>';
    }

    html += '<h5>' + response.body.desc + '</h5>';
    html += '<p style="text-align: right; font-size: 0.7em">trello.com</p>';
    html += '</div>';

    html += '</td> </tr> </tbody> </table>';
  } catch (e) {
    res.status(500).send('Error');
    return;
  }

  res.json({
    body: html
  });
};
