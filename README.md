# Learning resources / Ressources d'apprentissage

Creating, curating, and maintaining a centralized space to share CDS learnings that can help build digital capacity in the Government of Canada and improve how we design and deliver services. 

Créer, conserver et maintenir un espace centralisé pour partager les apprentissages du SNC qui pourraient aider à renforcer notre capacité numérique au sein du gouvernement du Canada et améliorer la façon dont on conçoit et offre des services.

# Overview
This app is built using [NuxtJS](https://nuxtjs.org/). Data is pulled in from [Contentful](https://www.contentful.com/).

# Local Development

**Prerequisites**

- [Node 16 LTS](https://nodejs.org/en/)

**Installation**

1. On a terminal, change into the `/app` directory and install the  node packages and dependencies
```bash
# install dependencies
$ npm install
```
2. Run the development server
```bash
# serve with hot reload at localhost:3000
$ npm run dev
```
3. Go to a browser and visit [http://localhost:3000](http://localhost:3000)

4. (Optional) To test the build for production with server-side rendering you need to build first and then run the server
```bash
# build for production and launch server
$ npm run build
$ npm run start
```

5. (Optional) To have a static website that can be hosted on S3 or github pages, you need to generate them
```bash
# generate static project
$ npm run generate
```