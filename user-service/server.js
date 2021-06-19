const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const ip = require('ip');
const address = ip.address();

const consul = require('consul')({
  host: address,
  port: 8500,
  promisify: true
});

consul.agent.service.register({
  id: 'user-service',
  name: 'user-service',
  port: 8081,
  address: address,
  check: {
    http: `http://${address}:8081/health`,
    interval: '10s',
    timeout: '3s',
  }
}, (err) => {
  if (err) {
    throw err;
  } else {
    console.log("User service connect to consul successfully!")
  }
})

const app = express();

app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));
app.use(morgan('dev'));

app.get("/health", async (req, res) => {
  res.status(200).send({ status: 'User service connect ok' });
})

app.get("/", (req, res) => {
  res.status(200).send({ message: 'Welcome to User Service!' })
})

app.get("/user/info", (req, res) => {
  res.status(200).send({ name: 'Minh Nguyen', position: 'dev' })
})

const server = http.createServer(app);

server.listen(8081, () => {
  console.log("User service is run on port 8081")
})