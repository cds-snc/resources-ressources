# Build
FROM node:lts-alpine as build

WORKDIR /src
COPY app /src
RUN npm install

RUN npm run generate

# Nginx
FROM nginx:stable-alpine
COPY --from=build /src/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
