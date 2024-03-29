<!-- Template ======================================================================================================-->

<template>
  <div class="mb-10">
    <!-- Welcome message - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  -->

    <div class="mt-20 mb-20 sm:mb-24">
      <feature :name="featureNames.F_HEADLINE">
        <h1 class="text-4xl md:text-5xl font-bold pb-8">
          {{ $t('landing_page.title') }}
        </h1>
        <p class="text-lg md:text-2xl max-w-5xl font-medium">
          {{ $t('landing_page.description') }}
        </p>
      </feature>

      <feature :name="featureNames.F_HEADLINE_ALT">
        <h1
          class="text-4xl md:text-5xl md:leading-normal leading-tight font-medium pb-8 max-w-3xl"
        >
          {{ $t('landing_page.description') }}
        </h1>
      </feature>
    </div>

    <div class="border-t border-gray-300 mb-5"></div>

    <!-- Topics - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -->

    <div class="grid lg:grid-cols-3 mb-16 sm:mb-36">
      <h2 class="text-4xl font-thin py-5 col-span-1">
        {{ $t('landing_page.topics_heading') }}
      </h2>

      <ul class="grid grid-cols-1 sm:grid-cols-2 gap-2 col-span-2 pt-2">
        <li v-for="topic in topics" :key="topic.name">
          <TopicLink :topic="topic"></TopicLink>
        </li>
      </ul>
    </div>

    <div class="border-t border-gray-300 mb-5"></div>

    <!-- Contact Us - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  -->

    <div class="grid lg:grid-cols-3">
      <!-- Heading (left side) -->
      <div class="col-span-1">
        <h2 class="text-4xl font-thin py-5">{{ $t('contact.heading') }}</h2>
      </div>

      <!-- Contact info (right side) -->

      <div class="col-span-2 py-5">
        <p class="text-lg text-gray-800 tracking-wide leading-relaxed">
          {{ $t('contact.info-1') }} <br />
          {{ $t('contact.info-2') }}
          <br /><strong>partnerships-partenariats@cds-snc.ca</strong>
        </p>
      </div>
    </div>
  </div>
</template>

<!-- Script ========================================================================================================-->

<script>
import { topLevelTopicsQuery } from '@/utils/queries'
import { getHeadElement } from '@/utils/headElementAssembler'
import { getCurrentLocale, getLocaleCode } from '@/utils/getCurrentLocale'
import Feature from '@/components/feature-flags/Feature'
import { langPaths } from '@/utils/paths'

export default {
  nuxtI18n: {
    paths: {
      en: '/', // -> accessible at /about-us (no prefix since it's the default locale)
      fr: '/fr', // -> accessible at /fr/a-propos
    },
  },

  name: 'Index',
  components: {
    Feature,
    //  Box,
  },
  layout: 'expandedSearch',

  async asyncData({
    $contentfulApi,
    payload,
    $contentfulPreviewApi,
    query,
    $preview,
    i18n,
  }) {
    // const currentLocale = payload && payload.locale ? payload.locale : (i18n && i18n.locale) ? i18n.locale : EN_LOCALE
    const currentLocale = getCurrentLocale(payload, i18n)

    const preview = query.preview || ($preview && $preview.enabled)

    const pageQuery = topLevelTopicsQuery(currentLocale, preview)

    let topics = null

    if (preview) {
      topics = await $contentfulPreviewApi
        .$post('', { query: pageQuery })
        .then((result) => {
          return result.data.topicCollection.items
        })
    } else if (payload && payload.topics) {
      topics = [...payload.topics]
    } else {
      topics = await $contentfulApi
        .$post('', { query: pageQuery })
        .then((result) => {
          return result.data.topicCollection.items
        })
    }
    const localeCode = getLocaleCode(currentLocale)

    const topicPathPrefix = `/${langPaths[localeCode].topic}/`

    topics = topics.map((topic) => ({
      name: topic.name,
      urlSlug: topic.urlSlug,
      path: topicPathPrefix + topic.urlSlug,
    }))

    const pageName = currentLocale.includes('en') ? 'Home' : 'Accueil'
    const headElement = getHeadElement(pageName, localeCode)

    const consts = require('@/utils/constants')
    const featureNames = consts.featureNames

    return { topics, headElement, featureNames }
  },
  data() {
    return {
      topics: {},
    }
  },

  head() {
    return {
      title: this.headElement.title,
      htmlAttrs: {
        lang: this.headElement.langAttribute,
      },
    }
  },
  mounted() {
    // Hack - the index page for french needs to be redirected to /fr
    if (this.$i18n.locale === 'fr') {
      this.$router.push('/fr')
    }
  },
}
</script>
