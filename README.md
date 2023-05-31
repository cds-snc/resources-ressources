# Website is no longer maintained / Le Site web n'est plus accessible 

As of April 2023, work on the Learning Resources service has wrapped up. The website has been archived and is no longer available.
If you have questions please contact us at cds-snc@tbs-sct.gc.ca. 

Le service des ressources d’apprentissage a été mis hors service à compter d’avril 2023. Le site Web a été archivé et n’est plus accessible.
Pour toute question, veuillez écrire à cds-snc@tbs-sct.gc.ca.

## Connected repositories (including this one)
- https://github.com/cds-snc/resources-ressources
- https://github.com/cds-snc/resources-terraform
- https://github.com/cds-snc/resources-research_ressources-recherche
- https://github.com/cds-snc/resources-content-design

# Learning resources / Ressources d'apprentissage

Creating, curating, and maintaining a centralized space to share CDS learnings that can help build digital capacity in the Government of Canada and improve how we design and deliver services. 

Créer, conserver et maintenir un espace centralisé pour partager les apprentissages du SNC qui pourraient aider à renforcer notre capacité numérique au sein du gouvernement du Canada et améliorer la façon dont on conçoit et offre des services.

# [Francais](#fr)


# Quick links 🔗
- [Overview](#overview)
- [Infrastructure and Deployment](#infrastructure-and-deployment)
- [Local Development](#local-development)
- [Frequently Asked Questions](#frequently-asked-questions)

# Overview 
This app is built using [NuxtJS](https://nuxtjs.org/). Data is pulled in from [Contentful](https://www.contentful.com/).

## I18N / Bilingual support
This app is set up to support both of Canada's official languages, English (Canada) and French (Canada). It uses [nuxt/i18n](https://i18n.nuxtjs.org/) to manage app languages.
The text used in the website is pulled from the json files inside the `locales` directory. To add text, simply add a variable to both json files and access it using {{ $t('your_variable_name') }} within the app. Read more: [How to do translation within the app](#how-to-do-translation-within-the-app)

## Layouts
A few common, reusable components have been created, which can be found under the `app/components` folder. To easily create pages, we have a few different layouts depending on what page the user is looking at. These layouts uses the components and can be found under the `app/layouts` folder.

## CSS
This app uses [TailwindCSS](https://tailwindcss.com/) for its CSS framework. On dev mode, you can easily access colors and helpers by visiting [http://localhost:3000/_tailwind/](http://localhost:3000/_tailwind/)

## Storybook
_Note: We are not actively using storybook right now, so this feature and corresponding documentation needs to be revisited._

Storybook is integrated in this app to make UI components easier to manage and to be explored. 
To run storybook locally, simply type `npm run storybook` which makes it available at [http://localhost:3003/](http://localhost:3003/)

# Infrastructure and Deployment
Documentation on infrastructure and deployment can be found on [our ressources-terraform repository](https://github.com/cds-snc/resources-terraform/tree/main/infrastructure)

# Local Development

**Prerequisites**

- [Node 16 LTS](https://nodejs.org/en/)

**Installation**


1. Configure the environment variables for Contentful.
```bash
# Contentful access token can be found in the LastPass shared folder
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
- [Committing to the repo](#committing-to-the-repo)

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

### Committing to the repo
Committing to the repo from your local machine may require a few extra steps.

**Conventional Commits**

The initial setup of NuxtJS added the option to have conventional commits on the repo. Isn't that fun?
This requires committers to use [conventional commit syntax](https://www.conventionalcommits.org/en/v1.0.0/#summary) to ensure a cleaner commit history.

This step is set up in the root folder though, using commitlint. Which requires the extra step of installing it on the **_root_** folder.

`npm run install`

> **Conventional commit syntax:**
> 1.  fix: a commit of the *type* `fix` patches a bug in your codebase (this correlates with [`PATCH`](http://semver.org/#summary) in Semantic Versioning).
> 2.  feat: a commit of the *type* `feat` introduces a new feature to the codebase (this correlates with [`MINOR`](http://semver.org/#summary) in Semantic Versioning).
> 3.  BREAKING CHANGE: a commit that has a footer `BREAKING CHANGE:`, or appends a `!` after the type/scope, introduces a breaking API change (correlating with [`MAJOR`](http://semver.org/#summary) in Semantic Versioning). A BREAKING CHANGE can be part of commits of any *type*.
> 4.  *types* other than `fix:` and `feat:` are allowed, for example [@commitlint/config-conventional](https://github.com/conventional-changelog/commitlint/tree/master/%40commitlint/config-conventional) (based on the [the Angular convention](https://github.com/angular/angular/blob/22b96b9/CONTRIBUTING.md#-commit-message-guidelines)) recommends `build:`, `chore:`, `ci:`, `docs:`, `style:`, `refactor:`, `perf:`, `test:`, and others.
> 5.  *footers* other than `BREAKING CHANGE: <description>` may be provided and follow a convention similar to [git trailer format](https://git-scm.com/docs/git-interpret-trailers).
>
>Additional types are not mandated by the Conventional Commits specification, and have no implicit effect in Semantic Versioning (unless they include a BREAKING CHANGE). A scope may be provided to a commit's type, to provide additional contextual information and is contained within parenthesis, e.g., `feat(parser): add ability to parse arrays`.

**Linting**

There are lint checks, and it would be nice to have a git hook to ensure linting. 

To check your linting, run `npm run lint`. 

Most lint issues can be quickly fixed by the command `npm run lintfix`

**Terraform**

If making changes to the terraform files, we have a github workflow that detects these changes, shows the plan and applies them after the PR gets merged.

Format your terraform files by running `make fmt` and `make hclfmt` inside the `infrastructure/` folder.


**Pull Requests**

If you cloned the repo, you would have noticed that the default branch is `staging`. The deployment process can be found on our infrastructure documentation for further understanding.
To open a Pull Request, make sure you are merging your PR into `staging`.

Before merging:
- Make sure your PR is passing
- It is recommended to ask for a PR Review before merging.

AWS Amplify will create a PR Preview URL for your changes. Take note that it is **_not currently possible_** to test the language switcher on this preview URL.

# Frequently Asked Questions
- [What is the `frontend` folder?](#what-is-the-frontend-folder)
- [How to do translation within the app](#how-to-do-translation-within-the-app)

## What is the `frontend` folder?

The `frontend` folder contains the files needed to migrate to [Nuxt3](https://v3.nuxtjs.org/). Unfortunately, the release date for Nuxt3 is unknown, so we have decided to remain on Nuxt2 in the meantime. There is a [github issue](https://github.com/cds-snc/resources-ressources/issues/211) to delete the folder but keep it on a separate branch.

## How to do translation within the app

The [nuxt-i18n plugin](https://i18n.nuxtjs.org/) handles the translation files. Only apply changes under the `app/` folder to avoid duplication and unnecessary work (which means, ignore the `frontend/` folder for now 😅).

The translation files are located in the `app/locales` directory, namely:

- `en.json`

- `fr.json`

**How do I format translation variables?**

You would need to name the word/sentence with a variable, then define that variable in a translation file `*.json`
The translation file is in a JSON format.

Sample sentence:

`en.json`
```json
{
  "landing_page": {
    "title": "Welcome to CDS Learning Resources"
  }
}
```
`fr.json`
```json
{
  "landing_page": {
    "title": "Bienvenue aux ressources d'apprentissage du SNC"
  }
}
```
You may now use this variable in any of the components like this
```vue
<h1>{{ $t('landing_page.title') }}</h1>
```

There are many [more formatting options](https://kazupon.github.io/vue-i18n/guide/formatting.html) available to you on the `vue-i18n` documentation. These include [pluralization](https://kazupon.github.io/vue-i18n/guide/pluralization.html#accessing-the-number-via-the-pre-defined-argument), [date and time localization](https://kazupon.github.io/vue-i18n/guide/datetime.html), and [number and curency localization](https://kazupon.github.io/vue-i18n/guide/number.html#custom-formatting).


**What if I forget to translate something?**

Nuxt-i18n uses vue-i18n under the hood, so it will output a warning on the console.

If no translation can be found:
```
[vue-i18n] Value of key 'hello' is not a string!
```

For missing translations, the default behaviour is to fallback to English.

On `app/config/i18n.js`, `fallbackLocale` is set to `en`. This is mostly for the benefit of developers, so if this is not the desired setting, please feel free to open a ticket.

Here's what a missing translation warning looks like when it has fallen back to English:
```
[vue-i18n] Fall back to translate the keypath 'hello' with 'en' locale.
```

There is no current and automated way to detect missing translations. It would be nice to have the JSON files automatically generated in the future.


# FR

# Liens rapides 🔗
- [Survol](#survol)
- [Infrastructure et déploiement](#infrastructure-et-déploiement)
- [Développement local](#développement-local)
- [Questions fréquemment posées](#questions-fréquemment-posées)

# Survol 
Cette application a été créée a l’aide de [NuxtJS](https://nuxtjs.org/). Les données sont tirées de [Contentful](https://www.contentful.com/).

## I18N / fonctionnement dans les deux langues
Cette application a été configurée pour fonctionner avec les deux langues officielles du Canada, l’anglais (Canada) et le français (Canada). Elle utilise [nuxt/i18n](https://i18n.nuxtjs.org/) pour gérer les langues de l’application. Le texte utilisé sur ce site Web est tiré des fichiers json situés dans le référentiel `locales`. Pour ajouter du texte, il vous suffit d’ajouter une variable aux deux fichiers json et d’y accéder au sein de l’application via {{ $t('your\_variable\_name') }}. En savoir plus : [comment traduire dans l’application](#how-to-do-translation-within-the-app)

## Mises en page
Quelques composants communs et réutilisables ont été créés. Ils sont disponibles dans le dossier `app/components`. Pour créer facilement de nouvelles pages, nous disposons de mises en page variées en fonction de la page sur laquelle l’utilisateur·rice se trouve. Ces mises en page utilisent les composants et sont disponibles dans le dossier `app/layouts`.

## CSS
Cette application utilise [TailwindCSS](https://tailwindcss.com/) pour son cadre CSS. En mode développement, vous pouvez facilement accéder aux couleurs et aux assistants en visitant [http://localhost:3000/\_tailwind/](http://localhost:3000/_tailwind/)

## Storybook
_Remarque : Nous n’utilisons pas activement Storybook à l’heure actuelle. Cette fonctionnalité et la documentation correspondante doivent donc être revues.

Storybook est intégré à cette application pour rendre les composants d’interface utilisateur plus faciles à gérer et à explorer. Pour exécuter Storybook à l’échelle locale, il vous suffit de saisir `npm run storybook`, ce qui rend Storybook disponible à l’adresse [http://localhost:3003/](http://localhost:3003/)

# Infrastructure et déploiement
De la documentation sur l’infrastructure et le déploiement est disponible dans [notre référentiel ressources-terraform](https://github.com/cds-snc/resources-terraform/tree/main/infrastructure).

# Développement local

**Prérequis**

- [Node 16 LTS](https://nodejs.org/en/)

**Installation**


1. Configurez les variables de l’environnement pour Contentful. \`\`\`bash
# Le jeton d’accès à Contentful est disponible dans le dossier partagé LastPass.
$ export contentful\_access\_token=""

$ chmod +x scripts/set\_envs.sh

# Réglez les autres variables d’environnement
$ . scripts/set\_envs.sh \`\`\` 2. Changement dans le référentiel `/app`.

3. Sur un terminal, installez les packages de nœuds et les dépendances. Il se pourrait que vous deviez inclure `--legacy-peer-deps` ```bash $ npm install --legacy-peer-deps ```
4. Exécuter le serveur de développement \`\`\`bash
# Servir avec rechargement instantané sur localhost:3000
$ npm run dev \`\`\` 5. Rendez-vous dans un navigateur et visitez [http://localhost:3000](http://localhost:3000) 


**🎉 C’est terminé pour le moment, mais il y a aussi quelques autres options à explorer.** - [Générer un site Web statique et servir les fichiers statiques](#generate-a-static-website-and-serve-the-static-files) - [Construire avec SSR](#build-with-ssr) - [Exécuter le français et l’anglais](#run-both-french-and-english) - [Commiter dans le référentiel](#committing-to-the-repo)

### Générer un site Web statique et servir les fichiers statiques
\`\`\`bash
# Veillez à ce que la configuration dans nuxt.config.js soit réglée à
#   target: static
#   ssr: false
# Générer un projet statique
$ npm run generate $ npm run start \`\`\`

### Construire avec le rendu côté serveur (SSR)
Pour tester la version en vue de la production avec le rendu côté serveur, vous devez d’abordé créer la version avant d’exécuter le serveur.

_Remarque : notre application n’utilise pas cette configuration_ \`\`\`bash
# Créez la version en vue de la production et lancez le serveur
# Veillez à ce que la configuration dans nuxt.config.js soit réglée à
#   target: server
#   ssr: true
$ npm run build $ npm run start \`\`\`

### Exécuter le français et l’anglais
À l’heure actuelle, le site Web est configuré pour fonctionner sur différents domaines de production. Cela rend les tests légèrement compliqués au niveau local. La façon la plus rapide de tester à la fois les versions française et anglaise du site sur votre appareil peut nécessiter quelques étapes manuelles supplémentaires. 1\. Servir les fichiers statiques (voir étape 6) 2. Vérifiez que vos variables d’environnement sont configurées (le script `set_env_vars.sh` devrait les avoir configurées) ```bash $ echo $DOMAIN_EN $DOMAIN_FR en.learning-resources:8080 fr.learning-resources:8080 ``` 3. Modifiez votre fichier d’hôtes ```bash $ sudo vim /etc/hosts 127.0.0.1 en.learning-resources 127.0.0.1 fr.learning-resources ```

### Commit au sein du référentiel
Le commit au sein du référentiel depuis votre appareil peut demander quelques étapes supplémentaires.

**Commits conventionnels**

La configuration initiale de NuxtJS a ajouté la possibilité de réaliser des commits conventionnels sur le référentiel. Génial, non? Cela nécessite que les personnes effectuant le commit utilisent [la syntaxe COMMIT conventionnelle](https://www.conventionalcommits.org/en/v1.0.0/#summary) pour veiller à ce que l’historique soit mieux organisé.

Toutefois, cette étape est configurée dans le dossier de base à l’aide de commitlint. Ce qui nécessite une étape supplémentaire, celle de l’installation dans le dossier **_de base_**.

`npm run install`

> **Syntaxe pour les commits conventionnels :** 1\. fix: un commit de *type* `fix` corrige un bogue dans le code (cela est en corrélation avec [`PATCH`](http://semver.org/#summary) en versioning sémantique). 2. feat: un commit de *type* `feat` introduit une nouvelle fonctionnalité dans le code (cela est en corrélation avec [`MINOR`](http://semver.org/#summary) en versioning sémantique). 3\. BREAKING CHANGE: un commit qui a dans le pied de page le mot clef `BREAKING CHANGE:`, ou ajoute un `!` après le type/scope, introduit un changement cassant l’API (cela est en corrélation avec [`MAJOR`](http://semver.org/#summary) en versioning sémantique). Un BREAKING CHANGE peut faire partie des commits de n’importe quel *type*. 4. Les *types* autre que `fix:` et `feat:` sont autorisés, par exemple [@commitlint/config-conventional](https://github.com/conventional-changelog/commitlint/tree/master/%40commitlint/config-conventional) (basé sur [the Angular convention](https://github.com/angular/angular/blob/22b96b9/CONTRIBUTING.md#-commit-message-guidelines)) recommande `build:`, `chore:`, `ci:`, `docs:`, `style:`, `refactor:`, `perf:`, `test:`, etc. 5. Les *pieds de pages* autre que `BREAKING CHANGE: <description>` peuvent être fournis et suivre une convention similaire à [git trailer format](https://git-scm.com/docs/git-interpret-trailers).
>
>Les types supplémentaires ne sont pas prescrits par la spécification Conventional Commits et n’ont aucun effet implicite dans la gestion des versions sémantiques (à moins qu’ils ne comportent un BREAKING CHANGE). Un scope peut être fournie au type d’un commit pour fournir des informations contextuelles supplémentaires. Il est contenu entre parenthèses, par exemple, `feat(parser): add ability to parse arrays`.

**Linting**

Il y a des vérifications de lint, et il serait bon d’avoir un Git Hook pour veiller au linting. 

Pour vérifier votre linting, lancez `npm run lint`. 

La plupart des problèmes dans ce domaine peuvent être rapidement résolus par le biais de la commande `npm run lintfix`.

**Terraform**

En cas de modifications apportées aux fichiers terraform, nous avons un flux de travail GitHub qui détecte ces changements, affiche le plan et applique les changements une fois la demande de tirage fusionnée.

Formatez vos fichiers terraform en lançant `make fmt` et `make hclfmt` dans le dossier `infrastructure/`.


**Demandes de tirage**

Si vous avez cloné le référentiel, vous avez sûrement remarqué que la branche par défaut est `staging`. Pour plus de renseignements, le processus de déploiement est disponible dans notre documentation d’infrastructure. Pour ouvrir une demande de tirage, veillez à fusionner votre demande de tirage dans `staging`.

Avant la fusion : — Assurez-vous que votre demande de tirage fonctionne — Nous vous recommandons de demander une révision de demande de tirage avant la fusion.

AWS Amplify va créer une URL de prévisualisation de demande de tirage pour vos modifications. Veuillez noter qu’il est **_actuellement impossible_** de tester le changement de langue sur cette URL de prévisualisation.

# Questions fréquemment posées
- [Qu’est-ce que le dossier `frontend`?](#what-is-the-frontend-folder)
- [comment traduire dans l’application](#how-to-do-translation-within-the-app)

## Qu’est-ce que le dossier `frontend`?

Le dossier `frontend` contient les fichiers nécessaires à la migration vers [Nuxt3](https://v3.nuxtjs.org/). Malheureusement, la date de lancement de Nuxt3 est inconnue. Nous avons donc décidé de rester sur Nuxt2 pour le moment. Il existe un [problème GitHub](https://github.com/cds-snc/resources-ressources/issues/211) concernant la suppression d’un dossier tout en le conservant sur une branche séparée.

## comment traduire dans l’application

Le [plug-in nuxt-i18n](https://i18n.nuxtjs.org/) gère les fichiers de traduction. Ne modifiez que le dossier `app/` pour éviter tout doublon et tout travail superflu (en d’autres termes, ignorez le dossier `frontend/` pour le moment 😅).

Les fichiers de traduction se trouvent dans le référentiel `app/locales` :

- `en.json`

- `fr.json`

**Comment formater les variables de traduction?**

Il vous faut nommer le mot ou la phrase à l’aide d’une variable, puis définir cette variable dans un fichier de traduction `*.json` Le fichier de traduction est au format JSON.

Exemple de phrase :

`en.json` ```json { "landing_page": { "title": "Welcome to CDS Learning Resources" } } ``` `fr.json` ```json { "landing\_page": { "title": "Bienvenue aux ressources d'apprentissage du SNC" } } ``` Vous pouvez maintenant utiliser cette variable dans n’importe quel composant comme ceci ```vue
<h1>{{ $t('landing_page.title') }}</h1>
```

Vous trouverez de nombreuses [autres options de formatage](https://kazupon.github.io/vue-i18n/guide/formatting.html) dans la documentation `vue-i18n`. Cela inclut la [pluralisation](https://kazupon.github.io/vue-i18n/guide/pluralization.html#accessing-the-number-via-the-pre-defined-argument), [la localisation de la date et de l’heure](https://kazupon.github.io/vue-i18n/guide/datetime.html) et [la localisation des nombres et de la devise](https://kazupon.github.io/vue-i18n/guide/number.html#custom-formatting).


**Et si j’oublie de traduire quelque chose?**

Nuxt-i18n utilise vue-i18n. Il y aura donc un avertissement au niveau de la console.

Si la traduction est introuvable : ``` [vue-i18n] Value of key 'hello' is not a string! ```

Pour les traductions manquantes, le comportement par défaut consiste à afficher l’anglais.

Su r`app/config/i18n.js`, `fallbackLocale` est réglé sur `en`. Cela est principalement dans l’intérêt des développeur·euse·s. Aussi, s’il ne s’agit pas de la configuration souhaitée, n’hésitez pas à ouvrir un ticket.

Voici à quoi ressemble une alerte indiquant que la traduction est manquante et que l’anglais s’affiche : ``` [vue-i18n] Fall back to translate the keypath 'hello' with 'en' locale. ```

À l’heure actuelle, il n’existe aucune façon automatisée de détecter les traductions manquantes. À l’avenir, la génération automatique des fichiers JSON serait un plus.
