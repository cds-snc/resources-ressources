<!-- Template ======================================================================================================-->

<template>
  <div class="mx-4 mb-10">
    <!-- Old code:
      <ul class="flex flex-wrap gap-4 justify-start pt-4">
        <li v-for="category in categories" :key="category.id">
          <Box :item="category" content-type="category" />
        </li>
      </ul> -->

    <!-- Welcome message ------------------------------------------------------------------------------------------->

    <!-- <div class="py-32 flex flex-col items-center">
      <h1 class="text-3xl md:text-5xl font-bold pb-10 text-center">
        {{ $t('landing_page.title') }}
      </h1>
      <p class="text-l md:text-xl pb-8 text-center max-w-2xl font-light">
        {{ $t('landing_page.description') }}
      </p>
      <p class="text-l md:text-xl font-bold pb-5 text-center">
        {{ $t('landing_page.slogan') }}
      </p>
      <div class="border-2 w-20 border-cds-yellow"></div>
    </div>-->

    <div class="mt-20 mb-40 border-l-4 border-cds-yellow pl-10">
      <h1 class="text-3xl md:text-6xl font-bold pb-8">
        {{ $t('landing_page.title') }}
      </h1>
      <p class="text-l md:text-xl max-w-2xl font-light">
        {{ $t('landing_page.description') }}
      </p>
      <!-- <div class="border-2 w-20 border-cds-yellow"></div> -->
    </div>

    <div class="border-t border-gray-300 mb-5"></div>

    <!-- Topics ---------------------------------------------------------------------------------------------------->

    <div class="grid lg:grid-cols-3 mb-36">
      <h2 class="text-4xl font-thin p-5 col-span-1">
        {{ $t('landing_page.topics_heading') }}
      </h2>

      <ul class="grid grid-cols-1 sm:grid-cols-2 gap-2 col-span-2 pt-2">
        <li v-for="topic in topics" :key="topic.name">
          <TopicLink :topic="topic"></TopicLink>
        </li>
      </ul>
    </div>

    <div class="border-t border-gray-300 mb-5"></div>

    <!-- Featured ---------------------------------------------------------------------------------------------------->

    <div class="grid lg:grid-cols-3 mb-5">
      Heading (left side)
      <div class="col-span-1">
        <h2 class="text-4xl font-thin p-5">{{ $t('New') }}</h2>
      </div>

      <!-- New Resource (right side) -->

      <div
        class="col-span-2 p-5 bg-gray-100 h-48 flex flex-col justify-between"
      >
        <div>
          <div class="text-gray-700 text-sm">SAMPLE</div>
          <h2 class="text-lg font-medium">{{ newResource.title }}</h2>
        </div>

        <nuxt-link :to="localePath(`/resource/${newResource.urlSlug}`)">
          Learn more
          <font-awesome-icon
            icon="arrow-right"
            class="ml-2 text-yellow-500"
          ></font-awesome-icon>
        </nuxt-link>
      </div>
    </div>

    <div class="border-t border-gray-300 mb-5"></div>

    <!-- Contact Us -------------------------------------------------------------------------------------------------->

    <div class="grid lg:grid-cols-3">
      <!-- Heading (left side) -->
      <div class="col-span-1">
        <h2 class="text-4xl font-thin p-5">{{ $t('contact.heading') }}</h2>
      </div>

      <!-- Contact info (right side) -->

      <div class="col-span-2 p-5">
        <p>
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
// import Box from '~/components/Box.vue'
// import { createClient } from '~/plugins/contentful.js'

// const client = createClient()

export default {
  /* nuxtI18n: {
    paths: {
      en: '/', // -> accessible at /about-us (no prefix since it's the default locale)
      fr: '/fr', // -> accessible at /fr/a-propos
    }
  }, */

  name: 'Index',
  components: {
    //  Box,
  },
  layout: 'expandedSearch',

  async asyncData({ $axios, payload }) {

    const contentfulEndpoint = `https://graphql.contentful.com/content/v1/spaces/${process.env.CTF_SPACE_ID}`;

    // const locale = app.i18n.locale + '-CA'

    let locale = 'en-CA'

    if (payload != null || payload !== undefined) {
      console.log('--index.vue | payload: ' + payload)
      locale = payload + '-CA'
    } else {
      locale = 'en-CA'
    }

    if (locale === 'null-CA' || locale === 'undefined-CA') {
      locale = 'en-CA'
    }

    console.log('-- index.vue | locale: ' + locale)

    // Query for English Topics - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

    const englishTopLevelTopicsQuery = `query{
      topicCollection(where: { isTopLevelTopic: true }, locale: "en-CA")
      {
        items
        {
          name
          urlSlug
          flag
          {
            value
          }
        }
      }
    }`

    // Query for French Topics - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

    const frenchTopLevelTopicsQuery = `query{
      topicCollection(where: { isTopLevelTopic: true }, locale: "fr-CA")
      {
        items
        {
          name
          urlSlug
          flag
          {
            value
          }
        }
      }
    }`

    const newResourceQuery = `query{
      testResourceCollection(order: [dateAdded_DESC], limit: 1)
        {
          items
          {
            title
            urlSlug
            dateAdded
          }
        }
      }`

    $axios.setToken(process.env.CTF_CDA_ACCESS_TOKEN, 'Bearer')
    $axios.$request({})

    const [englishTopLevelTopics, frenchTopLevelTopics, newResourceRes] =
      await Promise.all([
        $axios.$post(contentfulEndpoint, { query: englishTopLevelTopicsQuery }),
        $axios.$post(contentfulEndpoint, { query: frenchTopLevelTopicsQuery }),
        $axios.$post(contentfulEndpoint, { query: newResourceQuery }),
      ])

    const response = await $axios.$post(contentfulEndpoint, {
      query: englishTopLevelTopicsQuery,
    })

    console.log('index.vue | English topics: ' + englishTopLevelTopics)
    console.log('index.vue | French topics: ' + frenchTopLevelTopics)
    console.log(newResourceRes)

    console.log(response)
    // const responseObj = JSON.parse(JSON.stringify(response));

    const newResource = newResourceRes.data.testResourceCollection.items[0]
    console.log(newResource.title)

    let topics = null

    if (locale === 'en-CA')
      topics = englishTopLevelTopics.data.topicCollection.items
    else topics = frenchTopLevelTopics.data.topicCollection.items

    // let topicPathPrefix =

    console.log('index.vue | topics: ' + JSON.stringify(topics))

    const topicPathPrefix = locale === 'en-CA' ? '/topic/' : '/themes/'

    topics = topics.map((topic) => ({
      name: topic.name,
      urlSlug: topic.urlSlug,
      path: topicPathPrefix + topic.urlSlug,
    }))

    console.log('index.vue | topics: ' + topics)

    return { topics, newResource }
    // $i18n.locale n
    // axios.get()
    // return Promise.all([
    //   client.getEntries({
    //     'content_type': env.CTF_BLOG_POST_TYPE_ID,
    //     order: '-sys.createdAt'
    //   }),
    //   client.getContentTypes()
    // ]).then(([posts, contentTypes]) => {
    //   return {
    //     posts: posts.items,
    //     contentTypes: contentTypes.items
    //   }
    // }).catch((err) => {
    //   console.log(err)
    // })
    /* DAINE'S CODE: *******************/
    /* return Promise.all([
      client.getEntries({
        content_type: 'category',
        order: '-sys.createdAt',
        locale: app.i18n.localeProperties.iso,
      }),
    ])
      .then(([categories]) => {
        return {
          categories: categories.items,
        }
      })
      .catch((err) => {
        console.log(err)
      }) */
  },
  data() {
    return {
      topics: {},
    }
  },
}
</script>
