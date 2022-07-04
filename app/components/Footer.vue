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
          class="sm:block h-5 w-auto"
          src="~assets/goc--footer-logo.svg"
          alt="Government of Canada"
        />
      </div>
    </div>
  </footer>
</template>
<script>
// import {Context} from "@nuxt/types";

export default {
  name: 'Footer',

  asyncData({ app }) {
    console.log('-- Footer.vue')
    console.log('-- Footer.vue | locale: ' + app.i18n.locale)
  },

  mounted() {
    console.log(this.$i18n.locale)
  },
}
</script>
