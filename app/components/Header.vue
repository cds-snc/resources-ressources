<!-- Header view - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  -->
<template>
  <header data-app>
    <!-- Pilot banner -->
    <!-- <Banner /> -->

    <nav class="bg-white text-black pt-2 md:pt-0">
      <div class="max-w-7xl mx-auto px-4">
        <div
          class="relative flex flex-col md:flex-row items-center justify-between md:h-16"
        >
          <div>
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
          </div>

          <div
            class="inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0"
          >
            <v-menu
              v-model="menuOpened"
              bottom
              nudge-left="60"
              :offset-y="true"
              class="mr-6"
              attach="#menuButton"
            >
              <template #activator="{ on }">
                <button
                  id="menuButton"
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
              <v-list v-else class="w-max">
                <v-list-item
                  v-for="(topic, index) in topicsFR"
                  :key="index"
                  class="hover:bg-blue-100 cursor-pointer"
                >
                  <nuxt-link
                    :to="localePath(`/sujet/${topic.urlSlug}`, 'fr')"
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
              class="underline text-blue-900 hover:text-blue-700 text-xl ml-12"
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

<!-- Component logic - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  -->

<script>
import { mapState } from 'vuex'
import { EN_LOCALE, FR_LOCALE } from '@/utils/constants'

export default {
  name: 'Header',
  data() {
    return {
      menuOpened: false,
    }
  },
  computed: {
    locale() {
      return this.$i18n.locale
    },

    availableLocales() {
      return this.$i18n.locales.filter((i) => i.code !== this.$i18n.locale)
    },
    ...mapState({
      topicsEN: (state) => state.menu.topics[EN_LOCALE],
      topicsFR: (state) => state.menu.topics[FR_LOCALE],
    }),
  },

  methods: {
    switchLocale() {
      let alternateLocale = null

      if (this.$i18n.locale === 'en') alternateLocale = 'fr'
      else alternateLocale = 'en'

      this.$i18n.setLocale(alternateLocale)
      this.$i18n.setLocaleCookie(alternateLocale)
    },
  },
}
</script>
