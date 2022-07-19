<template>
  <!-- <footer class="bg-black"> -->
  <footer class="bg-gray-100">
    <div class="max-w-7xl mx-auto px-5">
      <div class="relative flex items-center justify-between h-16">
        <div class="flex">
          <!-- <div class="mr-5">{{ $t('contact_us') }}</div>-->
          <nuxt-link
            :to="
              localePath({
                name: 'legal-legal',
                params: { legal: $t('terms.urlSlug') },
              })
            "
            >{{ $t('terms.title') }}</nuxt-link
          >

          <nuxt-link
            :to="
              localePath({
                name: 'legal-legal',
                params: { legal: $t('privacy.urlSlug') },
              })
            "
            class="ml-5"
            >{{ $t('privacy.title') }}</nuxt-link
          >
        </div>

        <img
          v-show="locale === 'en'"
          class="sm:block h-5 w-auto"
          src="~assets/goc--footer-logo.svg"
          :alt="canadaWorkmarkAltText"
        />
        <img
          v-show="locale === 'fr'"
          class="sm:block h-5 w-auto"
          src="~assets/goc--footer-logo.svg"
          :alt="canadaWorkmarkAltText"
        />
      </div>
    </div>
  </footer>
</template>
<script>
// import {Context} from "@nuxt/types";

export default {
  name: 'Footer',

  computed: {
    canadaWorkmarkAltText() {
      return this.$i18n.t('canada_wordmark_alt')
    },

    locale() {
      return this.$i18n.locale
    },
  },
}
</script>
