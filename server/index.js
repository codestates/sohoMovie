require('dotenv').config();
const fs = require('fs');
const https = require('https');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const express = require('express');
const app = express();
const indexRouter = require('./routes/index');
const AdminRouter = require('./routes/admins')
const BucketRouter = require('./routes/bucket.js')
const UserRouter = require('./routes/users.js')

const corsOption = {
  origin: ['http://localhost:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'OPTIONS','PATCH','DELETE']
  };


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors(corsOption)
);

app.use(cookieParser());
app.use('/', indexRouter);
app.use('/admin', AdminRouter);
app.use('/users', UserRouter)
app.use('/auth', UserRouter);
app.use('/mypage',UserRouter)
//app.use('/', BucketRouter);

const HTTPS_PORT = process.env.HTTPS_PORT || 4000;


let server;
// if (fs.existsSync('./key.pem') && fs.existsSync('./cert.pem')) {
//   const privateKey = fs.readFileSync(dirname + '/key.pem', 'utf8');
//   const certificate = fs.readFileSync(dirname + '/cert.pem', 'utf8');
//   const credentials = { key: privateKey, cert: certificate };

//   server = https.createServer(credentials, app);
//   server.listen(HTTPS_PORT, () => console.log('https server runnning'));
// } else {
  server = app.listen(HTTPS_PORT, () => console.log('http server runnning'));
// }



module.exports = server;