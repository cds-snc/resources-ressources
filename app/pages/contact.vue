<template>
  <div class="max-w-5xl mb-10">
    <h1 class="font-bold text-4xl my-14">{{ contactPage.title }}</h1>
    <div v-html="richText"></div>
  </div>
</template>

<!-- Page Logic ====================================================================================================-->

<script>
import { documentToHtmlString } from '@contentful/rich-text-html-renderer'
import { aboutPageQuery } from '@/utils/queries'
import { getHeadElement } from '@/utils/headElementAssembler'
import { richTextRenderOptions } from '@/utils/richTextRenderOptions'

export default {
  // Options ----------------------------------------------------------------------------------------------------------

  nuxtI18n: {
    paths: {
      en: '/contact',
      fr: '/nous-joindre',
    },
  },

  name: 'Contact',

  // Hooks ------------------------------------------------------------------------------------------------------------

  async asyncData({ $contentfulApi, payload, query }) {
    /* Contentful locale */
    const locale = payload && payload.locale ? payload.locale : 'en-CA'
    const contentfulPreview = (query && query.preview === "true")

    let contactPage

    if (payload && payload.page && !contentfulPreview) {
      contactPage = { ...payload.page }
    } else {
      contactPage = await $contentfulApi
        .$post('', { query: aboutPageQuery(locale, contentfulPreview) })
        .then((result) => {
          return result.data.contactPageCollection.items[0]
        })
    }

    const i18nLocaleCode = locale.substring(0, 2)

    const headElement = getHeadElement(contactPage.title, i18nLocaleCode)

    const richText = documentToHtmlString(
      contactPage.body.json,
      richTextRenderOptions
    )

    return { contactPage, richText, headElement }
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
