<template>
  <div class="max-w-5xl mb-10">
    <h1 class="font-bold text-4xl my-14">{{ aboutPage.title }}</h1>
    <div v-html="richText"></div>
  </div>
</template>

<!-- Script ========================================================================================================-->

<script>
import { documentToHtmlString } from '@contentful/rich-text-html-renderer'
import { aboutPageQuery } from '@/utils/queries'
import { getHeadElement } from '@/utils/headElementAssembler'
import { richTextRenderOptions } from '@/utils/richTextRenderOptions'
import { getCurrentLocale } from '@/utils/getCurrentLocale'

export default {
  // Options ----------------------------------------------------------------------------------------------------------

  nuxtI18n: {
    paths: {
      en: '/about',
      fr: '/a-propos',
    },
  },

  name: 'About',

  async asyncData({
    $contentfulApi,
    payload,
    $contentfulPreviewApi,
    query,
    $preview,
    i18n,
  }) {
    const currentLocale = getCurrentLocale(payload, i18n)
    const preview = query.preview || ($preview && $preview.enabled)

    const pageQuery = aboutPageQuery(currentLocale, preview)

    let aboutPage = null

    if (preview) {
      console.log(i18n)
      console.log('i18n locale', i18n.locale)
      console.log('index.vue preview mode', currentLocale, payload)
      console.log(pageQuery)
      aboutPage = await $contentfulPreviewApi
        .$post('', { query: pageQuery })
        .then((result) => {
          return result.data.aboutPageCollection.items[0]
        })
    } else if (payload && payload.page) {
      aboutPage = { ...payload.page }
    } else {
      aboutPage = await $contentfulApi
        .$post('', { query: pageQuery })
        .then((result) => {
          return result.data.aboutPageCollection.items[0]
        })
    }

    // const i18nLocaleCode = locale.substring(0, 2)

    const headElement = getHeadElement(aboutPage.title, i18n.locale)

    const richText = documentToHtmlString(
      aboutPage.body.json,
      richTextRenderOptions
    )

    return { aboutPage, richText, headElement }
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
