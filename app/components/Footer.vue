<template>
  <!-- <footer class="bg-black"> -->
  <footer class="bg-gray-100">
    <div class="max-w-7xl mx-auto px-5 mt-10 mb-14">
      <!-- <div class="relative flex items-end justify-between"> -->
      <div>
        <div class="flex flex-col w-auto">
          <nuxt-link
            :to="localePath({ name: 'about' })"
            class="text-gray-800 text-2xl font-medium hover:underline hover:text-blue-700 mb-1 w-fit"
          >
            {{ $t('about') }}
          </nuxt-link>

          <nuxt-link
            :to="localePath({ name: 'contact' })"
            class="text-gray-800 text-2xl font-medium hover:underline hover:text-blue-700 mb-1 w-fit"
          >
            {{ $t('contact_us') }}
          </nuxt-link>

          <nuxt-link
            :to="
              localePath({
                name: 'legal-legal',
                params: { legal: $t('terms.urlSlug') },
              })
            "
            class="text-gray-800 text-2xl font-medium hover:underline hover:text-blue-700 mb-1 w-fit"
          >
            {{ $t('terms.title') }}
          </nuxt-link>

          <nuxt-link
            :to="
              localePath({
                name: 'legal-legal',
                params: { legal: $t('privacy.urlSlug') },
              })
            "
            class="text-gray-800 text-2xl font-medium hover:underline hover:text-blue-700 w-fit"
            >{{ $t('privacy.title') }}</nuxt-link
          >
        </div>

        <div class="border-t border-gray-300 mb-5 mt-5"></div>

        <div class="flex justify-end">
          <img
            v-show="locale === 'en'"
            class="lg:block h-8 w-auto"
            src="~assets/goc--footer-logo.svg"
            :alt="canadaWorkmarkAltText"
          />
          <img
            v-show="locale === 'fr'"
            class="lg:block h-8 w-auto"
            src="~assets/goc--footer-logo.svg"
            :alt="canadaWorkmarkAltText"
          />
        </div>
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
