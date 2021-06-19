const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const fetch = require('node-fetch');
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
  port: 8082,
  check: {
    http: `http://${address}:8082/health`,
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

app.get("/list/:userId", async (req, res) => {

  try {
    const response = {};

    const lookupUserService = await lookUpServiceWithConsul('user-service');
    const lookupUserOrderService = await lookUpServiceWithConsul('order-service');

    const userService = await fetch(`http://${lookupUserService}/user/info`);
    const orderService = await fetch(`http://${lookupUserOrderService}/order/info`);

    const getDataUser = await userService.json().then(data => data);
    const getDataOrder = await orderService.json().then(data => data);

    response.user = getDataUser;
    response.order = getDataOrder;

    res.send(response);
  } catch (err) {
    throw err;
  }
})

async function lookUpServiceWithConsul(serviceId) {
  // get all services
  const services = await consul.agent.services();

  const serviceById = services[serviceId];
  const portService = serviceById.Port;
  const addressService = serviceById.Address;

  // ip address service
  return `${addressService}:${portService}`
}

const server = http.createServer(app);

server.listen(8082, () => {
  console.log("Product service is run on port 8082")
})

