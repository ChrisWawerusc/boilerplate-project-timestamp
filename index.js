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


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});


app.get("/api/:date",(req,res,next)=>{
  const date=req.params.date;
//   const dateFormatRegex = /^\d{4}-\d{2}-\d{2}$/;
//   const unixFormatRegex = /^\d+$/;
//   const dateStringFormatRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/;

//   let dateObject;
 
//   if(dateFormatRegex.test(date) || dateStringFormatRegex.test(date)){
//      dateObject= new Date(date);
//   }else if(unixFormatRegex.test(date)){
//      dateObject= new Date(parseInt(date));
//   }else{
//     return res.status(400).json({ error: 'Invalid date' });
//  }
let dateObject = new Date(isNaN(Date.parse(date)) && !isNaN(date) ? parseInt(date) : date);

// Check if the dateObject is an invalid date
if (isNaN(dateObject.getTime())) {
  return res.status(400).json({ error: "Invalid date" });
}

    req.utcValue= dateObject.toUTCString();
    req.unixValue = dateObject.getTime();
    next();
  },(req,res)=>{
      const unixPost=req.unixValue
      const utcPost=req.utcValue
      res.json({unix:unixPost, utc:utcPost})
  });
  

app.get("/api", (req,res,next)=>{
      req.utcValue= new Date().toUTCString();
      req.unixValue = new Date().getTime();
      next();
  }, (req,res)=>{
      const unixPost=req.unixValue
      const utcPost=req.utcValue
      res.json({unix:unixPost, utc:utcPost})
  });



// Listen on port set in environment variable or default to 4000
var listener = app.listen(process.env.PORT || 4000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
