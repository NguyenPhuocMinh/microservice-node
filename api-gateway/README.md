## CONNECT API-GATEWAY WITH KONG AND KONGA

### Run docker-compose

```sh
  - docker-compose up -d --build
```

*Connect Kong Admin Api Using Konga*

 - Check Connect Kong Success: curl -i http://localhost:8001 *or* [Kong Connect with http://localhost:8001](http://localhost:8001)
 - Config Konga [Konga with http://localhost:1337](http://localhost:1337)

### Call Services

 - Your IP Adress:8000/user-service === http://localhost:3001 => user-service
 - Your IP Adress:8000/product-service === http://localhost:3002 => product-service

