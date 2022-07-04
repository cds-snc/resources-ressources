<template>
  <!-- This example requires Tailwind CSS v2.0+ -->
  <header>
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

    <!-- <nav class="bg-white border-cds-yellow border-t-2 text-black"> -->
    <nav class="bg-white text-black">
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

          <nuxt-link :to="localePath({name: 'index'})">
            <img
              class="sm:block h-12 w-auto"
              :src="
                require(`../assets/cds-lockup-light-ko-${$i18n.locale}.svg`)
              "
              alt="CDS"
            />
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
            <a
              v-for="locale in availableLocales"
              :key="locale.code"
              :href="switchLocalePath(locale.code)"
              @click="switchLocale"
              >{{ locale.name }} {{ locale.code }}</a
            >

            <!-- <button
              v-for="locale in availableLocales"
              :key="locale.code"
              @click="switchLocale">
              {{locale.name}} {{locale.code}}
            </button> -->
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>
<script lang="ts">
export default {
  name: 'Header',
  computed: {
    availableLocales() {
      return this.$i18n.locales.filter((i) => i.code !== this.$i18n.locale)
    },
  },
  methods: {
    switchLocale(): void {
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
