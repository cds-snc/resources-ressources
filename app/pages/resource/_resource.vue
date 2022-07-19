<!-- Page View =====================================================================================================-->

<template>
  <div>
    <breadcrumbs
      :breadcrumbs="breadcrumbs"
      :current-page-title="resource.title"
    >
    </breadcrumbs>

    <div class="flex mb-10">
      <div class="max-w-4xl">
        <h1 class="text-4xl font-bold my-20">
          {{ resource.title }}
        </h1>

        <div v-html="richText"></div>

        <!-- Related Resources --------------------------------------------------------------------------------------->

        <div>
          <div class="border-t border-gray-300 border-thin my-14"></div>

          <h2 class="p-5 font-thin text-4xl">
            {{ $t('related_resources') }}
          </h2>

          <ul class="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-2">
            <!-- Resource card --------------------------------------------------------------------------------------------->

            <li v-for="resource in relatedResources" :key="resource.title">
              <ResourceListItem :resource="resource"> </ResourceListItem>
            </li>
          </ul>
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

export default {
  layout: 'expandedSearch',
  // Hooks ------------------------------------------------------------------------------------------------------------

  async asyncData({ params, $contentfulApi, store, payload }) {
    /* Query resource by ID */
    /* const graphQLQuery = `query
      {
        testResource(urlSlug: "1OFEeF6m6iFrvYd9g07u2F")
        {
          title
          body
          {
            json
          }
        }
      }`; */

    // Get currentLocale from either payload or i18n
    let currentLocale
    if (payload && payload.locale) {
      currentLocale = payload.locale
    }
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

    const topicPathPrefix = currentLocale.includes('en')
      ? '/topic/'
      : '/themes/'

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

    /* DEPRECATED: richTextOptions */
    /* const richTextOptions = {
      renderNode: {
        [BLOCKS.HEADING_2]: (node) => {
          return `<h2 class="text-2xl font-medium mt-12 mb-2.5">${node.content[0].value}</h2>`
        },
        [BLOCKS.PARAGRAPH]: (node) => {
          return `<p class="leading-7">${node.content[0].value}</p>`
        },
        [BLOCKS.UL_LIST]: (node, next) => {
          return `<ul class="list-disc ml-4">
                        ${next(node.content)}
                    </ul>`
        },
      },
    } */

    const richTextOptions = {
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
        /* [INLINES.ENTRY_HYPERLINK]: (node) => {
          console.log(node.data.target.sys.id)

          const entryId = node.data.target.sys.id

          const pageQuery = legalEntryQuery(entryId)

          const entry = $contentfulApi
            .$post('', { query: pageQuery })
            .then((res) => {
              // console.log(res)
              return res.data.legalPage
            })

          const path = '/legal/' + entry.urlSlug
          console.log(path)
          return `<nuxt-link class="text-blue-900 underline" :to="localePath(${path})">${node.content[0].value}</nuxt-link>`
        }, */
        [BLOCKS.HEADING_1]: (node) => {
          return `<h1 class="text-3xl font-medium mt-12 mb-2.5" >${node.content[0].value}</h1>`
        },
        [BLOCKS.HEADING_2]: (node) => {
          return `<h2 class="text-2xl font-medium mt-12 mb-2.5">${node.content[0].value}</h2>`
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
          return `<p class="leading-7">${next(node.content)}</p>`
        },
        [BLOCKS.UL_LIST]: (node, next) => {
          // console.log(JSON.parse(JSON.stringify(node)))
          return `<ul class="list-disc ml-4">
                        ${next(node.content)}
                    </ul>`
        },
        [BLOCKS.HR]: () => {
          return `<div class="border-t border-gray-300 mt-10"></div>`
        },
      },
    }

    const richText = documentToHtmlString(resource.body.json, richTextOptions)

    return { resource, richText, breadcrumbs, relatedResources, headElement }
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
