# sample-posgis-app

A demo application to showcase postgis capabilities and a map application to simulate restaurants nearby.

This application is built using React and is powered by Hasura
GraphQL Engine over Postgres. It has an interface to query nearby location given lat, lng and radius in real-time.

# Running the app yourself

- Clone this repo:
  ```bash
  git clone https://github.com/karthikvt26/postgis-hasura-map
  cd postgis-hasura-map
  ```
- Run hasura graphql engine on your machine or on an external server as follows
  ```bash
  cd hasura
  docker-compose up -d
  ```
- [Install Hasura CLI](https://docs.hasura.io/1.0/graphql/manual/hasura-cli/install-hasura-cli.html)
- Goto `hasura/` and edit `config.yaml`:
  ```yaml
  endpoint: http://localhost:8080
  ```
- Apply the migrations:
  ```bash
  hasura migrate apply
  ```
- Run the app (go to the root of the repo):
  ```bash
  REACT_APP_HASURA_ENDPOINT=localhost:8080 npm start
  ```
