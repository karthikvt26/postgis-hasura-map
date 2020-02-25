FROM node:10.16.3 as build-deps
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN npm i
COPY . ./
RUN REACT_APP_HASURA_ENDPOINT=165.22.214.39:8080 npm run build

# Stage 2 - the production environment
FROM nginx:1.12-alpine
COPY --from=build-deps /usr/src/app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
