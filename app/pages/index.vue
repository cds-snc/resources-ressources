<!-- Template ======================================================================================================-->

<template>
  <div class="mb-10">
    <!-- Welcome message - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  -->

    <div class="mt-20 mb-20 sm:mb-40">
      <h1 class="text-4xl md:text-5xl font-bold pb-8">
        {{ $t('landing_page.title') }}
      </h1>
      <p class="text-lg md:text-2xl max-w-5xl font-medium">
        {{ $t('landing_page.description') }}
      </p>
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
        <p class="text-xl text-gray-900 tracking-wide leading-relaxed">
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

export default {
  nuxtI18n: {
    paths: {
      en: '/', // -> accessible at /about-us (no prefix since it's the default locale)
      fr: '/fr', // -> accessible at /fr/a-propos
    },
  },

  name: 'Index',
  components: {
    //  Box,
  },
  layout: 'expandedSearch',

  async asyncData({ $contentfulApi, payload, query }) {
    // Get currentLocale from either payload or ..?
    const currentLocale = payload && payload.locale ? payload.locale : 'en-CA'
    const contentfulPreview = query && query.preview === 'true'

    //
    // let locale = 'en-CA'
    //
    // if (payload != null || payload !== undefined) {
    //   console.log('-- en/index.vue | payload: ' + payload)
    //   locale = payload + '-CA'
    // } else {
    //   locale = 'en-CA'
    // }
    //
    // if (locale === 'null-CA' || locale === 'undefined-CA') {
    //   locale = 'en-CA'
    // }

    console.log('-- en/index.vue | locale: ' + currentLocale)

    // Query for English Topics - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

    // todo: refactor these into utils/queries.js
    // const englishTopLevelTopicsQuery = `query{
    //   topicCollection(where: { isTopLevelTopic: true }, locale: "en-CA")
    //   {
    //     items
    //     {
    //       name
    //       urlSlug
    //       flag
    //       {
    //         value
    //       }
    //     }
    //   }
    // }`

    // Query for French Topics - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

    // const frenchTopLevelTopicsQuery = `query{
    //   topicCollection(where: { isTopLevelTopic: true }, locale: "fr-CA")
    //   {
    //     items
    //     {
    //       name
    //       urlSlug
    //       flag
    //       {
    //         value
    //       }
    //     }
    //   }
    // }`

    // const [englishTopLevelTopics, frenchTopLevelTopics] = await Promise.all([
    //   $contentfulApi.$post('', { query: englishTopLevelTopicsQuery }),
    //   $contentfulApi.$post('', { query: frenchTopLevelTopicsQuery }),
    // ])
    //
    // console.log('index.vue | English topics: ' + englishTopLevelTopics)
    // console.log('index.vue | French topics: ' + frenchTopLevelTopics)

    let topics = null

    // if (locale === 'en-CA')
    //   topics = englishTopLevelTopics.data.topicCollection.items
    // else topics = frenchTopLevelTopics.data.topicCollection.items

    const pageQuery = topLevelTopicsQuery(currentLocale, contentfulPreview)
    if (payload && payload.topics && !contentfulPreview) {
      topics = [...payload.topics]
    } else {
      topics = await $contentfulApi
        .$post('', { query: pageQuery })
        .then((result) => {
          return result.data.topicCollection.items
        })
    }

    const topicPathPrefix = currentLocale === 'en-CA' ? '/topic/' : '/themes/'

    topics = topics.map((topic) => ({
      name: topic.name,
      urlSlug: topic.urlSlug,
      path: topicPathPrefix + topic.urlSlug,
    }))

    const locale = currentLocale.substring(0, 2)
    const pageName = currentLocale.includes('en') ? 'Home' : 'Accueil'
    const headElement = getHeadElement(pageName, locale)

    return { topics, headElement }
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
}
</script>
