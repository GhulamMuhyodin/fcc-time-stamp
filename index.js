// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/api/:date?', (req, res) => {
  const dateParam = req.params.date;
  let date;

  if (!dateParam) {
      // If no date parameter is provided, use the current date
      date = new Date();
  } else if (!isNaN(dateParam)) {
      // If the date parameter is a number, treat it as a Unix timestamp
      date = new Date(parseInt(dateParam));
  } else {
      // Otherwise, try to parse the date string
      date = new Date(dateParam);
  }

  // Check if the date is valid
  if (isNaN(date.getTime())) {
      return res.json({ error: "Invalid Date" });
  }

  // Return the response with unix and utc keys
  res.json({
      unix: date.getTime(),
      utc: date.toUTCString(),
  });
});




// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
