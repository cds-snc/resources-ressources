<template>
  <!-- Container for all resources -->
  <div>
    <breadcrumbs
      :breadcrumbs="breadcrumbs"
      :current-page-title="topic.name"
    ></breadcrumbs>

    <div class="flex my-24 sm:my-28">
      <div class="md:w-2/3">
        <r-h1 :heading-text="topic.name"></r-h1>
        <r-p v-if="topic.topicDescription">
          {{ topic.topicDescription }}
        </r-p>
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
import { EN_LOCALE, FR_LOCALE } from '@/utils/constants'
import { getCurrentLocale, getLocaleCode } from '@/utils/getCurrentLocale'
import RP from '@/components/r-html-tags/rP'
import RH1 from '@/components/r-html-tags/rH1'
import { generateResources } from '@/utils/listItemsUtility'
import { langPaths } from '@/utils/paths'

export default {
  components: {
    RH1,
    RP,
    CollectionListItem,
  },
  // Filters ----------------------------------------------------------------------------------------------------------

  filters: {
    formatDate: function (dateString) {
      if (!dateString) return null

      return dayjs(dateString).format('DD-MM-YYYY')
    },
  },

  layout: 'expandedSearch',

  // Hooks ------------------------------------------------------------------------------------------------------------

  async asyncData({
    params,
    $contentfulApi,
    store,
    payload,
    $contentfulPreviewApi,
    query,
    $preview,
    i18n,
  }) {
    const currentLocale = getCurrentLocale(payload, i18n)
    const preview = query.preview || ($preview && $preview.enabled)
    // const currentLocale = currentLocale.includes('en') ? 'fr-CA' : 'en-CA'
    const alternateLocale = currentLocale.includes('en') ? FR_LOCALE : EN_LOCALE

    const isDefaultLocale = currentLocale.includes('en') || false

    const urlSlug = params.topic

    const pageQuery = topicPageQuery(
      urlSlug,
      currentLocale,
      alternateLocale,
      preview
    )
    let topic = null

    if (preview) {
      const result = await $contentfulPreviewApi
        .$post('', { query: pageQuery })
        .then((res) => {
          return res
        })
      topic = result.data.topicCollection.items[0]
    } else if (payload && payload.topic) {
      topic = { ...payload.topic }
    } else {
      // get topic

      const result = await $contentfulApi
        .$post('', { query: pageQuery })
        .then((res) => {
          return res
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

    const localeCode = getLocaleCode(currentLocale)
    const topicPathPrefix = '/' + langPaths[localeCode].topic

    let breadcrumbs = topic.breadcrumbsCollection.items
    breadcrumbs = breadcrumbs.map((breadcrumb) => ({
      name: breadcrumb.name,
      path: topicPathPrefix + breadcrumb.urlSlug,
    }))
    breadcrumbs.locale = localeCode

    let subtopics = topic.subtopicsCollection.items
    subtopics = subtopics.map((subtopic) => ({
      name: subtopic.name,
      path: topicPathPrefix + subtopic.urlSlug,
      locale: localeCode,
    }))

    let resources = topic.resourcesCollection.items

    if (resources) {
      resources = generateResources(resources, currentLocale)
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
