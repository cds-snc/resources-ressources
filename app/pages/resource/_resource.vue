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

            <div v-html="richText"></div>

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
import { BLOCKS, INLINES, MARKS } from '@contentful/rich-text-types'
import { resourcePageQuery } from '@/utils/queries'
import { getHeadElement } from '@/utils/headElementAssembler'
import { getCollectionPath, getTopicPathPrefix } from '@/utils/pathUtility'
import { ContentTypes } from '@/utils/contentTypes'

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
    // console.log('_resource.vue', resource)

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
    console.log('breadcrumbs locale: ' + breadcrumbs.locale)

    let relatedResources = resource.relatedResourcesCollection.items

    const localeCode = currentLocale.substring(0, 2)

    relatedResources = relatedResources.map((resource) => ({
      title: resource.title,
      dateAdded: resource.dateAdded,
      path: resourcePathPrefix + resource.urlSlug,
      locale: localeCode,
    }))

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

    const headings = []

    const resourceRichTextRenderOptionsx = (bodyLinks) => {
      const entryLinks = new Map()

      for (const entry of bodyLinks.entries.hyperlink) {
        entryLinks.set(entry.sys.id, entry)
      }

      return {
        renderMark: {
          [MARKS.BOLD]: (text) => {
            console.log(text)
            return `<strong class="font-bold">${text}</strong>`
          },
          [MARKS.ITALIC]: (text) => {
            return `<i class="italic">${text}</i>`
          },
        },
        renderNode: {
          [INLINES.HYPERLINK]: (node) => {
            return `<a class="text-blue-900 underline" href="${node.data.uri}">${node.content[0].value}</a>`
          },
          [INLINES.ENTRY_HYPERLINK]: (node) => {
            const entry = entryLinks.get(node.data.target.sys.id)

            if (entry.__typename === ContentTypes.RESOURCE) {
              const resourcePath = resourcePathPrefix + entry.urlSlug
              return `<a class="text-blue-900 underline" href="${resourcePath}">${node.content[0].value}</a>`
            }
            if (entry.__typename === ContentTypes.TOPIC) {
              const topicPath =
                getTopicPathPrefix(currentLocale) + entry.urlSlug
              return `<a class="text-blue-900 underline" href="${topicPath}">${node.content[0].value}</a>`
            }
            if (entry.__typename === ContentTypes.COLLECTION) {
              const collectionPath = getCollectionPath(entry.urlSlug)
              return `<a class="text-blue-900 underline" href="${collectionPath}">${node.content[0].value}</a>`
            }
          },
          [BLOCKS.HEADING_1]: (node) => {
            return `<h1 class="text-3xl font-medium mt-12 mb-2.5" >${node.content[0].value}</h1>`
          },
          [BLOCKS.HEADING_2]: (node) => {
            const heading = node.content[0].value
            const headingId = heading.replace(/\s+/g, '-').toLowerCase()
            headings.push({ linkName: heading, linkId: headingId })
            return `<h2 id="${headingId}" class="text-2xl font-medium mt-12 mb-2.5 scroll-mt-40">${node.content[0].value}</h2>`
          },
          [BLOCKS.HEADING_3]: (node) => {
            return `<h3 class="text-xl font-medium mt-12 mb-2.5">${node.content[0].value}</h3>`
          },
          [BLOCKS.HEADING_4]: (node) => {
            return `<h4 class="text-lg font-medium mt-12 mb-2.5">${node.content[0].value}</h4>`
          },
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          [BLOCKS.PARAGRAPH]: (node, next) => {
            // return `<p class="leading-7">${node.content[0].value}</p>`
            return `<p class="leading-relaxed text-xl tracking-wide text-gray-800">${next(
              node.content
            ).replace(/\n/g, '<br/>')}</p>`
          },
          [BLOCKS.UL_LIST]: (node, next) => {
            return `<ul class="list-disc ml-4">
                        ${next(node.content)}
                    </ul>`
          },
          [BLOCKS.OL_LIST]: (node, next) => {
            return `<ol class="list-decimal ml-4">
                    ${next(node.content)}
                    </ol>`
          },
          [BLOCKS.HR]: () => {
            return `<div class="border-t border-gray-300 mt-10"></div>`
          },
        },
      }
    }

    const richText = documentToHtmlString(
      resource.body.json,
      resourceRichTextRenderOptionsx(resource.body.links)
    )

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
