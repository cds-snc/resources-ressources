<!-- Page View =====================================================================================================-->

<template>
  <div class="mb-10">
    <div class="max-w-5xl">
      <h1 class="font-bold text-4xl my-14">{{ legalPage.title }}</h1>
      <div v-html="richText"></div>
    </div>
  </div>
</template>

<!-- Page Logic - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -->

<script>
import { BLOCKS, INLINES, MARKS } from '@contentful/rich-text-types'
import { documentToHtmlString } from '@contentful/rich-text-html-renderer'
import { legalEntryQuery, legalPageQuery } from '@/utils/queries'
import { getHeadElement } from '@/utils/headElementAssembler'
import { EN_LOCALE, FR_LOCALE } from '@/utils/constants'
import { getCurrentLocale } from '@/utils/getCurrentLocale'

export default {
  // Hooks ------------------------------------------------------------------------------------------------------------

  async asyncData({
    params,
    store,
    $contentfulApi,
    payload,
    $contentfulPreviewApi,
    query,
    $preview,
    i18n,
  }) {
    const currentLocale = getCurrentLocale(payload, i18n)

    // const currentLocale = currentLocale.includes('en') ? 'fr-CA' : 'en-CA'
    const alternateLocale = currentLocale === EN_LOCALE ? FR_LOCALE : EN_LOCALE
    const isDefaultLocale = currentLocale === EN_LOCALE || false

    console.log(
      'currentLocal, alternateLocale, isDefaultLocale',
      currentLocale,
      alternateLocale,
      isDefaultLocale
    )
    const preview = query.preview || ($preview && $preview.enabled)

    /* Get urlSlug */

    const urlSlug = params.legal

    const pageQuery = legalPageQuery(
      urlSlug,
      currentLocale,
      alternateLocale,
      preview
    )

    /* Fetch data */

    // $contentfulApi.setToken(process.env.CTF_CDA_ACCESS_TOKEN, 'Bearer')
    // const endpoint = `https://graphql.contentful.com/content/v1/spaces/${process.env.CTF_SPACE_ID}`

    // Get en
    let legalPage = null
    if (preview) {
      console.log(i18n)
      console.log('i18n locale', i18n.locale)
      console.log('_legal.vue preview mode', currentLocale, payload)
      legalPage = await $contentfulPreviewApi
        .$post('', { query: pageQuery })
        .then((res) => {
          // console.log('_legal.vue', pageQuery, res)
          return res.data.legalPageCollection.items[0]
        })
    } else if (payload && payload.legalPage) {
      legalPage = { ...payload.legalPage }
    } else {
      legalPage = await $contentfulApi
        .$post('', { query: pageQuery })
        .then((res) => {
          // console.log('_legal.vue', pageQuery, res)
          return res.data.legalPageCollection.items[0]
        })
    }

    const localeCode = currentLocale.substring(0, 2)

    const headElement = getHeadElement(legalPage.title, localeCode)

    /* Set alternate url slug */

    // TODO: Check if this is actually needed
    // if (legalPage == null) {
    //   app.i18n.setLocaleCookie('fr')
    //
    //   legalPage = await $contentfulApi
    //     .$post('', { query: contentfulQuery })
    //     .then((res) => {
    //       return res.data.legalPageCollection.items[0]
    //     })
    // }

    const alternateLocaleUrlSlug = legalPage.urlSlug

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
      en: { legal: enRouteParam },
      fr: { legal: frRouteParam },
    })

    /* Set rich text rendering options */

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
        [INLINES.ENTRY_HYPERLINK]: (node) => {
          const entryId = node.data.target.sys.id

          const pageQuery = legalEntryQuery(entryId)

          let entry = null
          if (preview) {
            entry = $contentfulPreviewApi
              .$post('', { query: pageQuery })
              .then((res) => {
                // console.log(res)
                return res.data.legalPage
              })
          } else {
            entry = $contentfulApi
              .$post('', { query: pageQuery })
              .then((res) => {
                // console.log(res)
                return res.data.legalPage
              })
          }

          const path = '/legal/' + entry.urlSlug
          console.log(path)
          return `<nuxt-link class="text-blue-900 underline" :to="localePath(${path})">${node.content[0].value}</nuxt-link>`
        },
        [BLOCKS.HEADING_1]: (node) => {
          return `<h1 class="text-3xl font-medium mt-12 mb-2.5" >${node.content[0].value}</h1>`
        },
        [BLOCKS.HEADING_2]: (node) => {
          return `<h2 class="text-2xl font-medium mt-12 mb-2.5">${node.content[0].value}</h2>`
        },
        [BLOCKS.HEADING_3]: (node) => {
          return `<h3 class="text-xl font-medium mt-12 mb-2.5">${node.content[0].value}</h3>`
        },
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        [BLOCKS.PARAGRAPH]: (node, next) => {
          // return `<p class="leading-7">${node.content[0].value}</p>`
          return `<p class="leading-relaxed text-xl tracking-wide text-gray-800">${next(
            node.content
          ).replace(/\n/g, '<br/>')}</p>`
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

    /* Apply rich text styling */

    console.log(legalPage.body.json)

    const richText = documentToHtmlString(legalPage.body.json, richTextOptions)

    return { legalPage, richText, headElement }
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
