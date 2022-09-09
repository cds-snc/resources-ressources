<!-- Page template =================================================================================================-->

<template>
  <div>
    <breadcrumbs
      :breadcrumbs="breadcrumbs"
      :current-page-title="collection.name"
    >
    </breadcrumbs>

    <!-- Collection name & description - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  -->

    <div class="my-24 sm:my-28">
      <PageTitle :title-text="collection.name"></PageTitle>
    </div>

    <!-- Resources - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  -->

    <div v-if="hasResources">
      <section-divider></section-divider>
      <section class="mb-32 grid xl:grid-cols-3">
        <PageSectionHeading :heading-text="$t('resources')"></PageSectionHeading>

        <ul class="mt-5 grid grid-cols-1 gap-2 col-span-2">
          <li v-for="resource in resources" :key="resource.title">
            <ResourceListItem :resource="resource"></ResourceListItem>
          </li>
        </ul>
      </section>
    </div>

    <!-- Related collections - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  -->

    <div v-if="hasRelatedCollections">
      <SectionDivider></SectionDivider>

      <section class="mb-32 grid xl:grid-cols-3">
        <PageSectionHeading
          :heading-text="$t('related_collections')"
        ></PageSectionHeading>

        <ul
          class="grid grid-cols-1 col-span-2 md:grid-cols-2 gap-8 mt-8 xl:mt-6"
        >
          <li
            v-for="relatedCollection in relatedCollections"
            :key="relatedCollection.name"
          >
            <CollectionListItem
              :collection="relatedCollection"
            ></CollectionListItem>
          </li>
        </ul>
      </section>
    </div>
  </div>
</template>

<!-- Page logic ====================================================================================================-->

<script>
import {
  generateBreadcrumbs,
  generateCollections,
  generateResources,
  getLocaleCode,
} from '@/utils/listItemsUtility'
import { getHeadElement } from '@/utils/headElementAssembler'
import { getCollectionPageQuery } from '@/utils/queries'
import CollectionListItem from '@/components/list-items/CollectionListItem'

export default {
  name: 'Collection',
  components: { CollectionListItem },
  layout: 'expandedSearch',

  // Hooks ------------------------------------------------------------------------------------------------------------

  async asyncData({ params, $contentfulApi, store, payload }) {
    const currentLocale = (payload && payload.locale) ?? payload.locale

    const alternateLocale = currentLocale.includes('en') ? 'fr-CA' : 'en-CA'
    const isDefaultLocale = currentLocale.includes('en') || false

    const urlSlug = params.collection

    const pageQuery = getCollectionPageQuery(
      urlSlug,
      currentLocale,
      alternateLocale
    )

    let collection

    if (payload && payload.collection) {
      collection = { ...payload.collection }
    } else {
      const result = await $contentfulApi
        .$post('', { query: pageQuery })
        .then((res) => {
          return res
        })
      collection = result.data.collectionCollection.items[0]
    }

    const alternateLocaleUrlSlug = collection.urlSlug

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
      en: { collection: enRouteParam },
      fr: { collection: frRouteParam },
    })

    const breadcrumbs = generateBreadcrumbs(
      collection.breadcrumbsCollection.items,
      currentLocale
    )
    const resources = generateResources(
      collection.resourcesCollection.items,
      currentLocale
    )
    const relatedCollections = generateCollections(
      collection.relatedCollectionsCollection.items,
      currentLocale
    )

    const headElement = getHeadElement(
      collection.name,
      getLocaleCode(currentLocale)
    )

    return {
      collection,
      breadcrumbs,
      resources,
      relatedCollections,
      headElement,
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

  // Computed properties ----------------------------------------------------------------------------------------------

  computed: {
    hasResources() {
      return !!this.resources.length
    },

    hasRelatedCollections() {
      return !!this.relatedCollections.length
    },
  },
}
</script>
