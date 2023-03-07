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
        <div class="py-8">
          <r-h1 :heading-text="resource.title" class="my-10"></r-h1>
        </div>

        <div class="flex flex-col md:flex-row items-start gap-8">
          <!-- MVP Feature 3: Content jump links - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  -->

          <div
            v-if="headings.length > 0 && isMdAndBigger"
            class="md:sticky md:top-20 self-start lg:min-w-1/4 md:min-w-1/3 mt-5"
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
            <!-- <r-h1 :heading-text="resource.title" class="my-10"></r-h1> -->

            <PageContents
              v-if="!isMdAndBigger && headings.length > 0"
              :headings="headings"
            ></PageContents>

            <div v-if="richText != null" v-html="richText"></div>

            <!-- External Resources - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -->

            <div v-if="externalResources && externalResources.length > 0">
              <h2
                :id="examplesLinkId"
                class="text-3xl font-medium mt-12 mb-2.5 scroll-mt-32 md:scroll-mt-20"
              >
                {{ $t('examples_from_our_work') }}
              </h2>

              <ul
                class="grid grid-cols-1 col-span-2 xl:grid-cols-2 gap-10 mt-8"
              >
                <ExternalResourceListItem
                  v-for="eResource in externalResources"
                  :key="eResource.title"
                  :external-resource="eResource"
                ></ExternalResourceListItem>
              </ul>
            </div>

            <!-- Related Resources - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  -->

            <div v-if="relatedResources && relatedResources.length > 0">
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
import { EN_LOCALE, EXAMPLES_LINK_ID, FR_LOCALE } from '@/utils/constants'
import { getCurrentLocale, getLocaleCode } from '@/utils/getCurrentLocale'
import { richTextRenderOptions } from '@/utils/richTextRenderOptions'
import RH1 from '@/components/r-html-tags/rH1'
import {
  generateExternalResources,
  generateResources,
  getExamplesLinkName,
} from '@/utils/listItemsUtility'
import { langPaths } from '@/utils/paths'
import Viewport from '@/utils/viewport.ts'
import ExternalResourceListItem from '@/components/list-items/ExternalResourceListItem'

let headings = []

export const addHeading = (heading) => {
  headings.push(heading)
}

export default {
  components: { ExternalResourceListItem, RH1 },
  layout: 'expandedSearch',

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
    const alternateLocale = currentLocale === EN_LOCALE ? FR_LOCALE : EN_LOCALE
    const isDefaultLocale = currentLocale === EN_LOCALE || false

    const preview = query.preview || ($preview && $preview.enabled)

    /* Query resource by url slug */

    const urlSlug = params.resource

    const pageQuery = resourcePageQuery(
      urlSlug,
      currentLocale,
      alternateLocale,
      preview
    )
    let resource = null
    if (preview) {
      resource = await $contentfulPreviewApi
        .$post('', { query: pageQuery })
        .then((result) => {
          return result.data.testResourceCollection.items[0]
        })
    } else if (payload && payload.resource) {
      resource = { ...payload.resource }
    } else {
      resource = await $contentfulApi
        .$post('', { query: pageQuery })
        .then((result) => {
          return result.data.testResourceCollection.items[0]
        })
    }

    let breadcrumbs = resource.breadcrumbsCollection.items

    const localeCode = getLocaleCode(currentLocale)
    const topicPathPrefix = `/${langPaths[localeCode].topic}/`

    breadcrumbs = breadcrumbs.map((breadcrumb) => ({
      name: breadcrumb.name,
      path: topicPathPrefix + breadcrumb.urlSlug,
    }))
    breadcrumbs.locale = localeCode

    let relatedResources = resource.relatedResourcesCollection.items

    if (relatedResources) {
      relatedResources = generateResources(relatedResources, currentLocale)
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

    let externalResources = resource.externalResourcesCollection.items

    if (externalResources.length > 0) {
      externalResources = generateExternalResources(externalResources)
      headings.push({
        linkName: getExamplesLinkName(currentLocale),
        linkId: EXAMPLES_LINK_ID,
      })
    }

    return {
      resource,
      richText,
      breadcrumbs,
      relatedResources,
      externalResources,
      headElement,
      headings,
    }
  },

  // Data - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

  data() {
    return {
      activeHeadingId: '',

      isMdAndBigger: false,

      hasScrollEventListener: false,

      examplesLinkId: EXAMPLES_LINK_ID,
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

  // Lifecycle Hooks - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

  mounted() {
    this.onWindowResize()

    window.addEventListener('resize', this.onWindowResize, { passive: true })
  },

  // Methods - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

  methods: {
    setActiveJumpLink(headingId) {
      this.activeHeadingId = headingId
    },

    handleScroll() {
      if (!this.isMdAndBigger) return

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
        (scrollY - headings[0].offsetHeight >= headings[0].offsetTop &&
          jumpLinks.length > numberOfHeadings)
      ) {
        jumpLinks[numberOfHeadings].className += ' activeJumpLink'
        isPassedFirstHeading = true
      }
    },

    onWindowResize() {
      this.isMdAndBigger = Viewport.isMdAndBigger(window.innerWidth)

      if (this.isMdAndBigger && !this.hasScrollEventListener)
        this.addScrollEventListener()

      if (!this.isMdAndBigger && this.hasScrollEventListener)
        this.removeScrollEventListener()
    },

    addScrollEventListener() {
      window.addEventListener('scroll', this.handleScroll)
      this.hasScrollEventListener = true
    },

    removeScrollEventListener() {
      window.removeEventListener('scroll', this.handleScroll)
      this.hasScrollEventListener = false
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
