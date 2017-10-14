let http = require('http');
let config = require('../../config');

module.exports = function(req, res)
{
  let searchMoiveURL = config.ImdbURL + config.apiKey + '&query=' + req.params.title;
  http.get(searchMoiveURL, function(resp)
  {
    resp.setEncoding('utf8');
    let rawData = '';
    resp.on('data', function(chunk)
    {
      rawData = rawData + chunk;
    });
    resp.on('end', function()
    {
      try
      {
        const parsedData = JSON.parse(rawData);
        res.send({success: true, data: parsedData});
      }
      catch(e)
      {
        res.send({success: false, message: e.message});
      }
    });
  }).on('error', function(err)
  {
    res.send({success: false, message: err});
  });
};
