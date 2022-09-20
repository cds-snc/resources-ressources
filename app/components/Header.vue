<template>
  <!-- This example requires Tailwind CSS v2.0+ -->
  <header data-app>
    <!-- GoC Banner -->
    <!-- <div class="bg-black">
      <div class="max-w-7xl mx-auto px-4">
        <div class="relative flex items-center justify-between h-16">
          <img
            class="sm:block h-5 w-auto"
            :src="require(`../assets/goc--header-logo-${$i18n.locale}.svg`)"
            alt="Government of Canada"
          />
        </div>
      </div>
    </div> -->
    <!-- CDS Banner-->
    <Banner />

    <!-- <nav class="bg-white border-cds-yellow border-t-2 text-black"> -->
    <nav class="bg-white text-black pb-2.5">
      <div class="max-w-7xl mx-auto px-4">
        <div class="relative flex items-center justify-between h-16">
          <!-- <nuxt-link :to="localePath('/')">
            <img
              class="sm:block h-12 w-auto"
              :src="
                require(`../assets/cds-lockup-light-ko-${$i18n.locale}.svg`)
              "
              alt="CDS"
            />
          </nuxt-link> -->

          <nuxt-link
            v-show="locale === 'en'"
            :to="localePath({ name: 'index' })"
            class="flex items-center text-2xl font-medium font-logo"
            aria-label="Go to the homepage"
          >
            <img
              class="sm:block h-12 w-auto mr-1.5"
              :src="require(`../assets/cds-logo-en.svg`)"
              alt="Canadian Digital Service - Learning resources"
            />
            {{ $t('learning_resources') }}
          </nuxt-link>

          <nuxt-link
            v-show="locale === 'fr'"
            :to="localePath({ name: 'index' })"
            class="flex items-center text-2xl font-medium font-logo"
            aria-label="Accéder à la page d'accueil"
          >
            <img
              class="sm:block h-12 w-auto mr-1.5"
              :src="require(`../assets/cds-logo-fr.svg`)"
              alt="Service numérique canadien - Ressources d'apprentissage"
            />
            {{ $t('learning_resources') }}
          </nuxt-link>

          <div
            class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0"
          >
            <!-- <Link v-if="$i18n.locale == 'fr'" theme="dark" :to="switchLocalePath('en')">English</Link>
            <Link v-else-if="$i18n.locale == 'en'" theme="dark" :to="switchLocalePath('fr')">Français</Link> -->

            <!-- <a
              v-for="locale in availableLocales"
              :key="locale.code"
              theme="light"
              :to="switchLocalePath(locale.code)"
              @click="switchLocale"

            >{{ locale.name }} {{ locale.code }}</a> -->

            <v-menu v-model="menuOpened" bottom :offset-y="true" class="mr-4">
              <template #activator="{ on }">
                <button
                  class="p-3 text-xl rounded-lg hover:bg-gray-100"
                  v-on="on"
                >
                  {{ $t('landing_page.topics_heading') }}
                  <font-awesome-icon
                    v-if="menuOpened"
                    icon="chevron-up"
                    size="sm"
                    class="ml-1"
                  ></font-awesome-icon>
                  <font-awesome-icon
                    v-else
                    icon="chevron-down"
                    size="sm"
                    class="ml-1"
                  ></font-awesome-icon>
                </button>
              </template>
              <v-list v-if="locale === 'en'">
                <v-list-item
                  v-for="(topic, index) in topicsEN"
                  :key="index"
                  class="hover:bg-blue-100 cursor-pointer"
                >
                  <nuxt-link
                    :to="localePath(`/topic/${topic.urlSlug}`, 'en')"
                    class="text-lg"
                  >
                    {{ topic.name }}
                  </nuxt-link>
                </v-list-item>
              </v-list>
              <v-list v-else>
                <v-list-item v-for="(topic, index) in topicsFR" :key="index">
                  <nuxt-link
                    :to="localePath(`/themes/${topic.urlSlug}`, 'fr')"
                    class="text-lg"
                    >{{ topic.name }}</nuxt-link
                  >
                </v-list-item>
              </v-list>
            </v-menu>

            <a
              v-for="locale in availableLocales"
              :key="locale.code"
              :href="switchLocalePath(locale.code)"
              class="underline text-blue-900 hover:text-blue-700 text-xl ml-5"
              :lang="locale.code"
              @click="switchLocale"
              >{{ locale.name }}
            </a>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>
<script>
export default {
  name: 'Header',

  data() {
    return {
      topicsEN: this.$store.state.topics_English,

      topicsFR: this.$store.state.topics_French,
    }
  },

  computed: {
    locale() {
      return this.$i18n.locale
    },

    availableLocales() {
      return this.$i18n.locales.filter((i) => i.code !== this.$i18n.locale)
    },
  },

  methods: {
    switchLocale() {
      let alternateLocale = null

      if (this.$i18n.locale === 'en') alternateLocale = 'fr'
      else alternateLocale = 'en'

      // this.$root.context.app.switchLocalePath(alternateLocale);
      this.$i18n.setLocale(alternateLocale)
      this.$i18n.setLocaleCookie(alternateLocale)
      // this.$root.context.app.l
    },
  },
}
</script>
