[![Website learning-resources.cdssandbox.xyz](https://img.shields.io/website-up-down-green-red/http/learning-resources.cdssandbox.xyz.svg)](http://learning-resources.cdssandbox.xyz/)

[![accessibility (axe)](https://github.com/cds-snc/resources-ressources/actions/workflows/axe.yml/badge.svg)](https://github.com/cds-snc/resources-ressources/actions/workflows/axe.yml)
[![ci](https://github.com/cds-snc/resources-ressources/actions/workflows/ci.yml/badge.svg)](https://github.com/cds-snc/resources-ressources/actions/workflows/ci.yml)
# Learning resources / Ressources d'apprentissage

Creating, curating, and maintaining a centralized space to share CDS learnings that can help build digital capacity in the Government of Canada and improve how we design and deliver services. 

Créer, conserver et maintenir un espace centralisé pour partager les apprentissages du SNC qui pourraient aider à renforcer notre capacité numérique au sein du gouvernement du Canada et améliorer la façon dont on conçoit et offre des services.

# Overview
This app is built using [NuxtJS](https://nuxtjs.org/). Data is pulled in from [Contentful](https://www.contentful.com/).

## I18N / Bilingual support.
This app is set up to support both of Canada's official languages, English (Canada) and French (Canada). It uses [nuxt/i18n](https://i18n.nuxtjs.org/) to manage app languages.
The text used in the website is pulled from the json files inside the `locales` directory. To add text, simply add a variable to both json files and access it using {{ $t('your_variable_name') }} within the app.

## Layouts
A few common, reusable components have been created, which can be found under the `app/components` folder. To easily create pages, we have a few different layouts depending on what page the user is looking at. These layouts uses the components and can be found under the `app/layouts` folder.

## CSS
This app uses [TailwindCSS](https://tailwindcss.com/) for its CSS framework. On dev mode, you can easily access colors and helpers by visiting [http://localhost:3000/_tailwind/](http://localhost:3000/_tailwind/)

## Storybook
_Note: We are not actively using storybook right now, so this feature and corresponding documentation needs to be revisited._

Storybook is integrated in this app to make UI components easier to manage and to be explored. 
To run storybook locally, simply type `npm run storybook` which makes it available at [http://localhost:3003/](http://localhost:3003/)

# Local Development

**Prerequisites**

- [Node 16 LTS](https://nodejs.org/en/)

**Installation**


1. Configure the environment variables for Contentful.
```bash
$ export contentful_access_token=""

$ chmod +x scripts/set_envs.sh

# Set other env vars
$ . scripts/set_envs.sh
```
2. Change into the `/app` directory.

3. On a terminal, install the  node packages and dependencies. You may need to include `--legacy-peer-deps`
```bash
$ npm install --legacy-peer-deps
```
4. Run the development server
```bash
# serve with hot reload at localhost:3000
$ npm run dev
```
5. Go to a browser and visit [http://localhost:3000](http://localhost:3000) 


**🎉 You're done for now, but there are a few more optional things you may want to explore.**
- [Generate a static website and serve the static files](#generate-a-static-website-and-serve-the-static-files)
- [Build with SSR](#build-with-ssr)
- [Run both french and english](#run-both-french-and-english)

### Generate a static website and serve the static files
```bash
# make sure config in nuxt.config.js is set to
#   target: static
#   ssr: false
# generate static project
$ npm run generate
$ npm run start
```

### Build with SSR
To test the build for production with server-side rendering you need to build first and then run the server.

_Note: This setup is not used by our application_
```bash
# build for production and launch server
# make sure config in nuxt.config.js is set to
#   target: server
#   ssr: true
$ npm run build
$ npm run start
```

### Run both french and english
The website is currently set to run on different domains on production. This makes it slightly tricky to test locally. The quickest way 
to test both the french and english version of the site on your local machine, you may need to do a few extra manual steps.
   1. Serve the static files (see step 6)
   2. Verify that your domain envs are set (the `set_env_vars.sh` script should have set these)
```bash
$ echo $DOMAIN_EN $DOMAIN_FR
en.learning-resources:8080 fr.learning-resources:8080
```
   3. Modify your hosts file
```bash
$ sudo vim /etc/hosts
127.0.0.1       en.learning-resources
127.0.0.1       fr.learning-resources
```

# Frequently Asked Questions
- [What is the `frontend` folder?](#what-is-the-frontend-folder)

## What is the `frontend` folder?

The `frontend` folder contains the files needed to migrate to [Nuxt3](https://v3.nuxtjs.org/). Unfortunately, the release date for Nuxt3 is unknown, so we have decided to remain on Nuxt2 in the meantime. There is a [github issue](https://github.com/cds-snc/resources-ressources/issues/211) to delete the folder but keep it on a separate branch.