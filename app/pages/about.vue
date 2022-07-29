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

export default {
  // Options ----------------------------------------------------------------------------------------------------------

  nuxtI18n: {
    paths: {
      en: '/about',
      fr: '/a-propos',
    },
  },

  name: 'About',

  async asyncData({ $contentfulApi, payload }) {
    const locale = payload && payload.locale ? payload.locale : 'en-CA'

    let aboutPage

    if (payload && payload.page) {
      aboutPage = { ...payload.page }
    } else {
      aboutPage = await $contentfulApi
        .$post('', { query: aboutPageQuery(locale) })
        .then((result) => {
          return result.data.aboutPageCollection.items[0]
        })
    }

    const i18nLocaleCode = locale.substring(0, 2)

    const headElement = getHeadElement(aboutPage.title, i18nLocaleCode)

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