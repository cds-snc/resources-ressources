<template>
  <!-- Container for all resources -->
  <div>
    <breadcrumbs
      :breadcrumbs="breadcrumbs"
      :current-page-title="topic.name"
    ></breadcrumbs>

    <div class="flex my-32 border-l-4 border-cds-yellow pl-10">
      <div class="w-5/6 md:w-1/2">
        <h1 class="font-medium text-6xl">{{ topic.name }}</h1>
        <p v-if="topic.topicDescription" class="pt-10 text-lg font-light">
          {{ topic.topicDescription }}
        </p>
      </div>
    </div>

    <!-- Subtopics --------------------------------------------------------------------------------------------------->

    <!-- <div v-if="hasSubtopics" class="mb-32">

      <h2 class="text-2xl font-bold pb-10">Topics</h2>

      <ul class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
        <li v-for="subtopic in subtopics" :key="subtopic.name">
          <TopicLink :topic=subtopic>
          </TopicLink>
        </li>
      </ul>
    </div> -->

    <!-- Experimental UI Layout ************************************************************************************-->

    <div v-if="hasSubtopics" class="border-t border-gray-300 mb-5"></div>

    <div v-if="hasSubtopics" class="mb-32 grid xl:grid-cols-3">
      <h2 class="p-5 text-4xl font-thin pb-10 col-span-1">
        {{ topic.subtopicsHeading }}
      </h2>

      <ul class="grid grid-cols-1 md:grid-cols-2 gap-2 col-span-2 pt-2">
        <li v-for="subtopic in subtopics" :key="subtopic.name">
          <TopicLink :topic="subtopic"> </TopicLink>
        </li>
      </ul>
    </div>

    <!-- Divider ----------------------------------------------------------------------------------------------------->

    <!-- <div class="border my-10"></div>-->

    <!-- Resources --------------------------------------------------------------------------------------------------->

    <div v-if="hasResources" class="border-t border-gray-300 mb-5"></div>

    <div v-if="hasResources" class="mb-32 grid xl:grid-cols-3">
      <h2 class="p-5 text-4xl font-thin col-span-1">
        {{ breadcrumbs.locale === 'en' ? 'Resources' : 'Ressources' }}
      </h2>

      <ul class="mt-5 grid grid-cols-1 md:grid-cols-2 gap-2 col-span-2">
        <!-- Resource card --------------------------------------------------------------------------------------------->

        <li v-for="resource in resources" :key="resource.title">
          <ResourceListItem :resource="resource"> </ResourceListItem>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import { topicPageQuery } from '@/utils/queries'

export default {
  // Filters ----------------------------------------------------------------------------------------------------------

  filters: {
    formatDate: function (dateString) {
      if (!dateString) return null

      return dayjs(dateString).format('DD-MM-YYYY')
    },
  },

  layout: 'expandedSearch',

  // Hooks ------------------------------------------------------------------------------------------------------------

  async asyncData({ app, params, $contentfulApi, store, payload }) {
    console.log('_topic.vue params: ', params)
    console.log('_topic.vue payload: ', payload)

    /* PROBLEM:
     * When you retrieve data for a page based on the params from a navigation action
     * it only works when you navigate by clicking on the link. If you are using
     * the browser's back and forward buttons the params you are expecting will not
     * reach this page. Thus, any data retrieval action dependent on these params will
     * not work.
     *
     * JULY 12: PROBLEM should now be fixed by sending data through payload
     * todo: delete this comment once confirmed
     * */

    // Get currentLocale from either payload or i18n
    let currentLocale
    if (payload && payload.locale) {
      currentLocale = payload.locale
    }

    if (!currentLocale || typeof currentLocale === 'undefined') {
      currentLocale = app.i18n.locale + '-CA'
    } else {
      // default to english
      currentLocale = 'en-CA'
    }
    // const currentLocale = currentLocale.includes('en') ? 'fr-CA' : 'en-CA'
    const alternateLocale = currentLocale.includes('en') ? 'fr-CA' : 'en-CA'
    const isDefaultLocale = currentLocale.includes('en') || false

    // const topic = params.topic[0].toUpperCase() + params.topic.substring(1);

    const urlSlug = params.topic

    const pageQuery = topicPageQuery(urlSlug, currentLocale, alternateLocale)
    let topic
    if (payload && payload.topic) {
      topic = { ...payload.topic }
    } else {
      // get topic
      // topic = $contentfulClient.queryTopicPage(urlSlug, currentLocale, alternateLocale)

      const result = await $contentfulApi
        .$post('', { query: pageQuery })
        .then((res) => {
          return res
          // return result.data.topicCollection.items[0].linkedFrom.testResourceCollection.items
        })
      topic = result.data.topicCollection.items[0]
    }

    const alternateLocaleUrlSlug = topic.urlSlug

    let enRouteParam = null
    let frRouteParam = null

    if (isDefaultLocale) {
      enRouteParam = urlSlug
      frRouteParam = alternateLocaleUrlSlug
    } else {
      enRouteParam = alternateLocaleUrlSlug
      frRouteParam = urlSlug
    }

    await store.dispatch('i18n/setRouteParams', {
      en: { topic: enRouteParam },
      fr: { topic: frRouteParam },
    })

    const topicPathPrefix = currentLocale.includes('en')
      ? '/topic/'
      : '/themes/'
    const resourcePathPrefix = currentLocale.includes('en')
      ? '/resource/'
      : '/ressource/'

    console.log(
      '_topic.vue - topicPathPrefix: ' + topicPathPrefix + ' ' + topic.name
    )

    let breadcrumbs = topic.breadcrumbsCollection.items
    breadcrumbs = breadcrumbs.map((breadcrumb) => ({
      name: breadcrumb.name,
      path: topicPathPrefix + breadcrumb.urlSlug,
    }))
    breadcrumbs.locale = currentLocale.substring(0, 2)

    let subtopics = topic.subtopicsCollection.items
    subtopics = subtopics.map((subtopic) => ({
      name: subtopic.name,
      path: topicPathPrefix + subtopic.urlSlug,
      locale: currentLocale.substring(0, 2),
    }))

    let resources = topic.resourcesCollection.items

    resources = resources.map((resource) => ({
      title: resource.title,
      dateAdded: resource.dateAdded,
      path: resourcePathPrefix + resource.urlSlug,
      locale: currentLocale.substring(0, 2),
    }))

    return { breadcrumbs, resources, topic, subtopics }
  },

  // Data -------------------------------------------------------------------------------------------------------------

  data() {
    return {
      hello: 'hello',
      title: '',
    }
  },

  // Computed Properties aka "Getters" --------------------------------------------------------------------------------

  computed: {
    hasSubtopics() {
      return !!this.subtopics.length
    },

    hasResources() {
      return !!this.resources.length
    },
  },
}
</script>
