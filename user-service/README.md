## User service with Consul Service Registry

```bash
  - npm install
  - node server.js
```

#### Run build docker-compose

```bash
  - docker-compose up -d --build
```
### Run docker file

```bash
  - docker run --network host -it user-service
```

##### Run example

```sh
  - curl -i http://localhost:8081
```