<template>
  <!-- Container for all resources -->
  <div>
    <breadcrumbs
      :breadcrumbs="breadcrumbs"
      :current-page-title="topic.name"
    ></breadcrumbs>

    <div class="flex my-24 sm:my-28">
      <div class="md:w-2/3">
        <h1 class="font-bold text-4xl sm:text-5xl">{{ topic.name }}</h1>
        <p
          v-if="topic.topicDescription"
          class="pt-10 text-lg sm:text-xl text-gray-900 tracking-wide leading-relaxed"
        >
          {{ topic.topicDescription }}
        </p>
      </div>
    </div>

    <!-- Subtopics - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  -->

    <div v-if="hasSubtopics" class="border-t border-gray-300 mb-5"></div>

    <div v-if="hasSubtopics" class="mb-32 grid xl:grid-cols-3">
      <h2 class="py-5 text-4xl font-thin pb-10 col-span-1">
        {{ topic.subtopicsHeading }}
      </h2>

      <ul class="grid grid-cols-1 md:grid-cols-2 gap-2 col-span-2 pt-2">
        <li v-for="subtopic in subtopics" :key="subtopic.name">
          <TopicLink :topic="subtopic"> </TopicLink>
        </li>
      </ul>
    </div>

    <!-- Resources - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  -->

    <div v-if="hasResources" class="border-t border-gray-300 mb-5"></div>

    <div v-if="hasResources" class="mb-32 grid xl:grid-cols-3">
      <h2 class="py-5 text-4xl font-thin col-span-1">
        <!-- {{ breadcrumbs.locale === 'en' ? 'Resources' : 'Ressources' }} -->
        {{ $t('resources') }}
      </h2>

      <ul class="mt-5 grid grid-cols-1 gap-2 col-span-2">
        <!-- Resource card - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  -->

        <li v-for="resource in resources" :key="resource.title">
          <ResourceListItem :resource="resource"> </ResourceListItem>
        </li>
      </ul>
    </div>

    <!-- Resource collections ======================================================================================-->

    <div v-if="hasCollections">
      <div class="border-t border-gray-300 mb-5"></div>

      <div class="mb-32 grid xl:grid-cols-3">
        <h2 class="py-5 text-4xl font-thin col-span-1">
          {{ $t('collections') }}
        </h2>

        <ul
          class="grid grid-cols-1 col-span-2 md:grid-cols-2 gap-8 mt-8 xl:mt-6"
        >
          <li v-for="collection in collections" :key="collection.name">
            <CollectionListItem :collection="collection"></CollectionListItem>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import { topicPageQuery } from '@/utils/queries'
import { getHeadElement } from '@/utils/headElementAssembler'
import { getCollectionPath } from '@/utils/pathUtility'
import CollectionListItem from '@/components/list-items/CollectionListItem'

export default {
  components: { CollectionListItem },
  // Filters ----------------------------------------------------------------------------------------------------------

  filters: {
    formatDate: function (dateString) {
      if (!dateString) return null

      return dayjs(dateString).format('DD-MM-YYYY')
    },
  },

  layout: 'expandedSearch',

  // Hooks ------------------------------------------------------------------------------------------------------------

  async asyncData({ params, $contentfulApi, store, payload }) {
    const currentLocale = payload && payload.locale ? payload.locale : 'en-CA'

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

    const topicPathPrefix = currentLocale.includes('en') ? '/topic/' : '/sujet/'
    const resourcePathPrefix = currentLocale.includes('en')
      ? '/resource/'
      : '/ressource/'

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

    const localeCode = currentLocale.substring(0, 2)

    if (resources) {
      resources = resources
        .filter((resource) => resource.title != null)
        .map((resource) => ({
          title: resource?.title,
          dateAdded: resource?.dateAdded,
          path: resourcePathPrefix + resource?.urlSlug,
          locale: localeCode,
        }))
    }

    let collections = topic.collectionsCollection.items
    collections = collections.map((collection) => ({
      name: collection.name,
      path: getCollectionPath(collection.urlSlug),
      locale: localeCode,
    }))

    const headElement = getHeadElement(topic.name, localeCode)

    return {
      breadcrumbs,
      resources,
      topic,
      subtopics,
      collections,
      headElement,
    }
  },

  // Data -------------------------------------------------------------------------------------------------------------

  data() {
    return {
      hello: 'hello',
      title: '',
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

  // Computed Properties aka "Getters" --------------------------------------------------------------------------------

  computed: {
    hasSubtopics() {
      return !!this.subtopics.length
    },

    hasResources() {
      return !!this.resources.length
    },

    hasCollections() {
      return !!this.collections.length
    },
  },
}
</script>
