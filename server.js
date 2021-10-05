const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require('cors');
const passport = require("passport");
const Mongoose = require("./config/mongoose");
const MongoDB = require("./config/mongodb");
const app = express();

const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const Config = require("./config/config");
const schedule = require('node-schedule');

const newsfeedSource = require("./controllers/NewsfeedSource.controller");
const project = require("./controllers/Project.controller");

//Bodyparser middleware
app.use(
    bodyParser.urlencoded({
        extended: false
    })
);
app.use(bodyParser.json());

if(process.env.NODE_ENV === 'production') {
    app.use(express.static("client/build"));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
    });
}
app.use(cors());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("x-forwarded-proto", "https");
    next();
});

//Connect to mongodb
MongoDB();
Mongoose();

//Passport middleware
app.use(passport.initialize());

//Passport config
require("./config/passport")(passport);

//Routes
require("./routes/User.routes")(app);
require("./routes/Category.routes")(app);
require("./routes/Chain.routes")(app);
require("./routes/NewsfeedSource.routes")(app);
require("./routes/Media.routes")(app);
require("./routes/Guide.routes")(app);
require("./routes/Project.routes")(app);
require("./routes/Livefeed.routes")(app);
require("./routes/Member.routes")(app);
require("./routes/GetData.routes")(app);

//File upload to Digital Ocean Spaces
aws.config.update({
  accessKeyId: Config.accessKeyId,
  secretAccessKey: Config.secretAccessKey,
});

const spacesEndpoint = new aws.Endpoint(Config.endpoint);
const s3 = new aws.S3({
  endpoint: spacesEndpoint,
});

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: Config.S3_BUCKET,
    acl: 'public-read',
    key: function (request, file, cb) {
      cb(null, file.originalname);
    }
  }),
  limits: { fileSize: null }
}).single('file_upload');

app.put('/upload', upload, (req, res, next) => {
  if (!req.file) {
    return res.json({ success: false, errMessage: 'Please upload a file' });
  } else {
    upload(req, res, (err) => {
      if (err) {
        console.log("~~~err", err);
        let error;
        if (err.name === 'MulterError') {
          error = err.code;
        } else {
          error = err;
        }
        return res.json({ success: false, errMessage: error });
      }

      const url = req.file.location;

    //   console.log(
    //     `${url.split('digitaloceanspaces.com')[0]}cdn.digitaloceanspaces.com${
    //       url.split('digitaloceanspaces.com')[1]
    //     }`
    //   );

      return res.json({ success: true, data: req.file });
    });
  }
});

const job = schedule.scheduleJob('0 * * * *', async function(){
  
  await project.updateUpcomingProjects();

  //it takes a few minutes to execute the following method; usually 5 ~ 7 minutes or more than that.
  await newsfeedSource.updateLivefeeds();
});

const port = process.env.PORT || 8000;  //process.env.port is Heroku's port if you choose to deplay the app there
app.listen(port, () => console.log("Server up and running on port " + port));