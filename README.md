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


### Run USER-SERVICE with NodeJs
```sh
  - cd user-service and npm install and run node server.js or docker-compose up -d
```

*Connect user service*
  - http://localhost:3001

### Run PRODUCT-SERVICE with NodeJs
```sh
  - cd product-service and npm install and run node server.js or docker-compose up -d
```

*Connect user service*
  - http://localhost:3002

### Call Services With Kong Admin

 - Your IP Adress:8000/user-service === http://localhost:3001 => user-service
 - Your IP Adress:8000/product-service === http://localhost:3002 => product-service

