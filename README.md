# MICROSERVICES ARCHITECTURE

## Mircoservices with API GATE WAY
![Microservices](https://www.xenonstack.com/images/insights/xenonstack-what-are-microservices.png)

## Service Discovery
![Service Discovery](https://cdn.wp.nginx.com/wp-content/uploads/2016/04/Richardson-microservices-part4-3_server-side-pattern.png)

### Run API-GATEWAY with Kong and Konga build on docker-compose

```sh
  - cd api-gateway and docker-compose up -d --build
```

*Connect Kong Admin Api Using Konga*

 - Check Connect Kong Success: curl -i http://localhost:8001 *or* [Kong Connect with http://localhost:8001](http://localhost:8001)
 - Config Konga [Konga with http://localhost:1337](http://localhost:1337)

### Run SERVICE-REGISTRY with Consul build on docker-compose
```sh
  - cd service-registry and docker-compose up -d --build
```

*Connect Consul*

 - Check Connect Consul [Consul Connect localhost:8500](http://localhost:8500)


### Run USER-SERVICE with NodeJs Using Express
```sh
  - cd user-service and npm install and run node server.js or docker-compose up -d
```

*Connect user service*
  - http://localhost:3001

### Run PRODUCT-SERVICE with NodeJs Using Express
```sh
  - cd product-service and npm install and run node server.js or docker-compose up -d
```
### Run ORDER-SERVICE with NodeJs Using Express
```sh
  - cd order-service and npm install and run node server.js or docker-compose up -d
```

*Connect user service*
  - http://localhost:3002

### Call Services With Kong Admin

 - Your IP Address:8000/user-service === http://localhost:8081 => user-service
 - Your IP Address:8000/product-service === http://localhost:8082 => product-service
 - Your IP Address:8000/order-service === http://localhost:8083 => order-service

#### How to ProductService call UserService and OrderService

```javascript

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
```

### Try example ProductService call UserService And OrderService

- Your IP Address:8000/product-service/list/123

