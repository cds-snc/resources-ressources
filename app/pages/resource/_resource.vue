<!-- Page View =====================================================================================================-->

<template>
  <div>
    <breadcrumbs
      :breadcrumbs="breadcrumbs"
      :current-page-title="resource.title"
    >
    </breadcrumbs>

    <div class="flex mb-10">
      <div class="max-w-full">
        <div class="flex flex-col lg:flex-row items-start gap-8">
          <!-- MVP Feature 3: Content jump links - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  -->

          <div
            v-if="headings.length > 0"
            class="lg:sticky lg:top-40 self-start min-w-1/4 mt-10"
          >
            <h2 class="font-bold text-2xl mb-2.5">{{ $t('jump_to') }}</h2>
            <nav class="jumpLinks">
              <ol>
                <li
                  v-for="heading in headings"
                  :key="heading.linkId"
                  class="border-l-4 border-solid rounded-r-lg border-gray-200 mx-0 hover:border-blue-700 p-3 hover:bg-blue-50 active:bg-blue-700"
                >
                  <a
                    :href="'#' + heading.linkId"
                    class="text-lg text-blue-900 block hover:text-blue-700 hover:underline active:text-white"
                    @click="setActiveJumpLink(heading.linkId)"
                  >
                    {{ heading.linkName }}
                  </a>
                </li>
              </ol>
            </nav>
          </div>

          <!-- FEATURE: end - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -->

          <div class="grow-[2]">
            <h1 class="text-3xl sm:text-5xl font-bold my-10 sm:my-10">
              {{ resource.title }}
            </h1>

            <div v-if="richText != null" v-html="richText"></div>

            <!-- Related Resources - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  -->

            <div>
              <div class="border-t border-gray-300 border-thin my-14"></div>

              <h2 class="py-5 font-thin text-4xl">
                {{ $t('related_resources') }}
              </h2>

              <ul class="mt-5 grid grid-cols-1 gap-2">
                <!-- Resource card - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  -->

                <li v-for="resource in relatedResources" :key="resource.title">
                  <ResourceListItem :resource="resource"> </ResourceListItem>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<!-- Page Logic ====================================================================================================-->

<script>
import { documentToHtmlString } from '@contentful/rich-text-html-renderer'
import { resourcePageQuery } from '@/utils/queries'
import { getHeadElement } from '@/utils/headElementAssembler'
import { richTextRenderOptions } from '@/utils/richTextRenderOptions'

let headings = []

export const addHeading = (heading) => {
  headings.push(heading)
}

export default {
  layout: 'expandedSearch',

  async asyncData({ params, $contentfulApi, store, payload }) {
    const currentLocale = payload && payload.locale ? payload.locale : 'en-CA'

    const alternateLocale = currentLocale.includes('en') ? 'fr-CA' : 'en-CA'
    const isDefaultLocale = currentLocale.includes('en') || false

    /* Query resource by url slug */

    const urlSlug = params.resource

    const pageQuery = resourcePageQuery(urlSlug, currentLocale, alternateLocale)
    let resource
    if (payload && payload.resource) {
      resource = { ...payload.resource }
    } else {
      resource = await $contentfulApi
        .$post('', { query: pageQuery })
        .then((result) => {
          return result.data
        })
    }

    let breadcrumbs = resource.breadcrumbsCollection.items

    const topicPathPrefix = currentLocale.includes('en') ? '/topic/' : '/sujet/'

    const resourcePathPrefix = currentLocale.includes('en')
      ? '/resource/'
      : '/ressource/'

    breadcrumbs = breadcrumbs.map((breadcrumb) => ({
      name: breadcrumb.name,
      path: topicPathPrefix + breadcrumb.urlSlug,
    }))
    breadcrumbs.locale = currentLocale.substring(0, 2)

    let relatedResources = resource.relatedResourcesCollection.items

    const localeCode = currentLocale.substring(0, 2)

    if (relatedResources) {
      relatedResources = relatedResources
        .filter((resource) => resource?.title != null)
        .map((resource) => ({
          title: resource.title,
          dateAdded: resource?.dateAdded,
          path: resourcePathPrefix + resource?.urlSlug,
          locale: localeCode,
        }))
    }

    const headElement = getHeadElement(resource.title, localeCode)

    const alternateLocaleResourceSlug = resource.urlSlug

    let enRouteParam = null
    let frRouteParam = null

    if (isDefaultLocale) {
      enRouteParam = urlSlug
      frRouteParam = alternateLocaleResourceSlug
    } else {
      enRouteParam = alternateLocaleResourceSlug
      frRouteParam = urlSlug
    }

    await store.dispatch('i18n/setRouteParams', {
      en: { resource: enRouteParam },
      fr: { resource: frRouteParam },
    })

    headings = []

    let richText = null

    if (resource.body) {
      richText = documentToHtmlString(
        resource.body.json,
        richTextRenderOptions(currentLocale, resource.body.links, addHeading)
      )
    }

    return {
      resource,
      richText,
      breadcrumbs,
      relatedResources,
      headElement,
      headings,
    }
  },

  data() {
    return {
      activeHeadingId: '',
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
  // Hooks ------------------------------------------------------------------------------------------------------------

  mounted() {
    window.addEventListener('scroll', this.handleScroll)
  },

  methods: {
    setActiveJumpLink(headingId) {
      this.activeHeadingId = headingId
    },

    handleScroll() {
      const jumpLinks = document.querySelectorAll('.jumpLinks li')
      const headings = document.querySelectorAll('h2')
      let isPassedFirstHeading = false

      let numberOfHeadings = headings.length

      // eslint-disable-next-line no-empty
      while (
        --numberOfHeadings &&
        window.scrollY < headings[numberOfHeadings].offsetTop
      )
        jumpLinks.forEach((jumpLink) =>
          jumpLink.classList.remove('activeJumpLink')
        )

      if (
        isPassedFirstHeading ||
        scrollY - headings[0].offsetHeight >= headings[0].offsetTop
      ) {
        jumpLinks[numberOfHeadings].className += ' activeJumpLink'
        isPassedFirstHeading = true
      }
    },
  },
}
</script>

<style>
.activeJumpLink {
  background-color: #eff6ff;
  border-left-color: #1d4fd8;
}
</style>
