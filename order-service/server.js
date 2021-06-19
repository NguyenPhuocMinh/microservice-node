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
  id: 'order-service',
  name: 'order-service',
  port: 8083,
  address: address,
  check: {
    http: `http://${address}:8083/health`,
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

app.get("/health", async (req, res) => {
  res.status(200).send({ status: 'Order service connect ok' });
})

app.get("/", (req, res) => {
  res.status(200).send({ message: 'Welcome to Order Service!' })
})

app.get("/order/info", (req, res) => {
  res.send({ order: 'Cá viên chiên' })
})

const server = http.createServer(app);

server.listen(8083, () => {
  console.log("Order service is run on port 8083")
})