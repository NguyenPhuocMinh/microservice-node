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
  id: 'product-service',
  name: 'product-service',
  address: address,
  port: 3002,
  check: {
    http: `http://${address}:3002/health`,
    interval: '10s',
    timeout: '3s',
  }
}, (err) => {
  if (err) {
    throw err;
  }
})

const app = express();

app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));
app.use(morgan('dev'));

app.get("/health", (req, res) => {
  res.status(200).send({ message: 'Product service connect ok' })
})

app.get("/", (req, res) => {
  res.status(200).send({ message: 'Welcome to Product Service!' })
})

const server = http.createServer(app);

server.listen(3002, () => {
  console.log("Product service is run on port 3002")
})

