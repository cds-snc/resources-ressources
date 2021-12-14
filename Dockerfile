# # Build
# FROM node:lts-alpine as build

# WORKDIR /src
# COPY app /src
# RUN npm install

# RUN npm run generate

# # Nginx
# FROM nginx:stable-alpine
# COPY --from=build /src/dist /usr/share/nginx/html
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]

FROM public.ecr.aws/lambda/nodejs:14
# COPY app.js package*.json ./
COPY app .

COPY app/.contentful.json.sample ./.contentful.json

RUN npm install

RUN npm run build

# COPY lambda ./lambda

CMD [ "lambda/handler.handler" ]