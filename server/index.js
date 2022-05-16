require("dotenv").config();
const fs = require("fs");
const https = require("https");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();
<<<<<<< HEAD
const indexRouter = require("./routes/index");
const AdminRouter = require("./routes/admins");
const BucketRouter = require("./routes/bucket.js");

const corsOption = {
  Headers: { "content-type": "application/json" },
  origin: ["*"],
  credentials: true,
  method: ["post", "get", "patch", "delete"],
};
=======
const indexRouter = require('./routes/index');
const AdminRouter = require('./routes/admins')
const BucketRouter = require('./routes/bucket.js')
const UserRouter = require('./routes/users.js')

const corsOption = {
  origin: ['http://localhost:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'OPTIONS','PATCH','DELETE']
  };

>>>>>>> 512dc62d0fbb5d2fdac02a0fee195d58bbb4ae1b

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors(corsOption));

app.use(cookieParser());
<<<<<<< HEAD
// app.use("/", indexRouter);
app.use("/", AdminRouter);
// app.use("/", BucketRouter);
=======
app.use('/', indexRouter);
app.use('/admin', AdminRouter);
app.use('/users', UserRouter)
app.use('/auth', UserRouter);
app.use('/mypage',UserRouter)
//app.use('/', BucketRouter);
>>>>>>> 512dc62d0fbb5d2fdac02a0fee195d58bbb4ae1b

const HTTPS_PORT = process.env.HTTPS_PORT || 4000;
console.log(HTTPS_PORT);
let server;
<<<<<<< HEAD
if (fs.existsSync("./key.pem") && fs.existsSync("./cert.pem")) {
  const privateKey = fs.readFileSync(__dirname + "/key.pem", "utf8");
  const certificate = fs.readFileSync(__dirname + "/cert.pem", "utf8");
  const credentials = { key: privateKey, cert: certificate };

  server = https.createServer(credentials, app);
  server.listen(HTTPS_PORT, () => console.log("https server runnning"));
} else {
  server = app.listen(HTTPS_PORT, () => console.log("http server runnning"));
}
=======
// if (fs.existsSync('./key.pem') && fs.existsSync('./cert.pem')) {
//   const privateKey = fs.readFileSync(dirname + '/key.pem', 'utf8');
//   const certificate = fs.readFileSync(dirname + '/cert.pem', 'utf8');
//   const credentials = { key: privateKey, cert: certificate };

//   server = https.createServer(credentials, app);
//   server.listen(HTTPS_PORT, () => console.log('https server runnning'));
// } else {
  server = app.listen(HTTPS_PORT, () => console.log('http server runnning'));
// }
>>>>>>> 512dc62d0fbb5d2fdac02a0fee195d58bbb4ae1b

module.exports = server;
