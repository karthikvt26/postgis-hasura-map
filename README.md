# sample-posgis-app

A demo application to showcase postgis capabilities and a map application to simulate restaurants nearby.

[![Edit realtime-location-tracking](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/hasura/graphql-engine/tree/master/community/sample-apps/realtime-location-tracking?fontsize=14)

This application is built using React and is powered by Hasura
GraphQL Engine over Postgres. It has an interface to query nearby location given lat, lng and radius in real-time.

# Running the app yourself

- Deploy Postgres and GraphQL Engine on Heroku:
  
  [![Deploy to
  heroku](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/hasura/graphql-engine-heroku)
- Get the Heroku app URL (say `realtime-backend2.herokuapp.com`)
- Clone this repo:
  ```bash
  git clone https://github.com/hasura/sample-postgis-app
  cd sample-postgis-app
  ```
- [Install Hasura CLI](https://docs.hasura.io/1.0/graphql/manual/hasura-cli/install-hasura-cli.html)
- Goto `hasura/` and edit `config.yaml`:
  ```yaml
  endpoint: https://map-backend2.herokuapp.com
  ```
- Apply the migrations:
  ```bash
  hasura migrate apply
  ```
- Run the app (go to the root of the repo):
  ```bash
  REACT_APP_HASURA_ENDPOINT=map-backend2.herokuapp.com npm start
  ```
