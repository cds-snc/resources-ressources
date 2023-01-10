<template>
  <div class="max-w-5xl mb-10">
    <h1 class="font-bold text-4xl my-14">{{ contactPage.title }}</h1>
    <div v-html="richText"></div>
  </div>
</template>

<!-- Page Logic ====================================================================================================-->

<script>
import { documentToHtmlString } from '@contentful/rich-text-html-renderer'
import { contactPageQuery } from '@/utils/queries'
import { getHeadElement } from '@/utils/headElementAssembler'
import { richTextRenderOptions } from '@/utils/richTextRenderOptions'
import { getCurrentLocale } from '@/utils/getCurrentLocale'

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

  async asyncData({
    $contentfulApi,
    payload,
    $contentfulPreviewApi,
    query,
    $preview,
    i18n,
  }) {
    /* Contentful locale */
    const currentLocale = getCurrentLocale(payload, i18n)

    let contactPage
    const preview = query.preview || ($preview && $preview.enabled)

    if (preview) {
      contactPage = await $contentfulPreviewApi
        .$post('', { query: contactPageQuery(currentLocale, preview) })
        .then((result) => {
          console.log(result, result.data)
          return result.data.contactPageCollection.items[0]
        })
    } else if (payload && payload.page) {
      contactPage = { ...payload.page }
    } else {
      contactPage = await $contentfulApi
        .$post('', { query: contactPageQuery(currentLocale) })
        .then((result) => {
          return result.data.contactPageCollection.items[0]
        })
    }

    const headElement = getHeadElement(contactPage.title, i18n.locale)

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
