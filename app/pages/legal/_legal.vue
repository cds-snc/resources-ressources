<!-- Page View =====================================================================================================-->

<template>
  <div class="flex justify-center">
    <div class="max-w-4xl">
      <h1 class="font-bold text-4xl my-14">{{legalPage.title}}</h1>
      <div v-html="richText"></div>
    </div>
  </div>
</template>

<!-- Page Logic ------------------------------------------------------------------------------------------------------>

<script>
import { BLOCKS } from '@contentful/rich-text-types'
import { documentToHtmlString } from '@contentful/rich-text-html-renderer'

export default {
  // Hooks ------------------------------------------------------------------------------------------------------------

  async asyncData({ app, params, store, $axios }) {
    /* Get current locale */

    const currentLocale = app.i18n.locale + '-CA'
    const alternateLocale = currentLocale.includes('en') ? 'fr-CA' : 'en-CA'
    const isDefaultLocale = currentLocale.includes('en') || false

    /* Get urlSlug */

    const urlSlug = params.legal

    /* Query */

    const contentfulQuery = `query
    {
      legalPageCollection(where: { urlSlug: "${urlSlug}" }, limit: 1, locale: "${currentLocale}")
      {
        items
        {
          title
          urlSlug(locale: "${alternateLocale}")
          body
          {
            json
          }
        }
      }
    }`

    /* Fetch data */

    $axios.setToken(process.env.CTF_CDA_ACCESS_TOKEN, 'Bearer')
    const endpoint = `https://graphql.contentful.com/content/v1/spaces/${process.env.CTF_SPACE_ID}`

    const legalPage = await $axios
      .$post(endpoint, { query: contentfulQuery })
      .then((res) => {
        return res.data.legalPageCollection.items[0]
      })

    /* Set alternate url slug */

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
      renderNode: {
        [BLOCKS.HEADING_2]: (node) => {
          return `<h2 class="text-2xl font-medium mt-12 mb-2.5">${node.content[0].value}</h2>`
        },
        [BLOCKS.PARAGRAPH]: (node) => {
          return `<p class="leading-7">${node.content[0].value}</p>`
        },
        [BLOCKS.UL_LIST]: (node, next) => {
          console.log(JSON.parse(JSON.stringify(node)))
          return `<ul class="list-disc ml-4">
                        ${next(node.content)}
                    </ul>`
        },
      },
    }

    /* Apply rich text styling */

    const richText = documentToHtmlString(legalPage.body.json, richTextOptions)

    return { legalPage, richText }
  },
}
</script>
