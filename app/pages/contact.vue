<template>
  <div class="max-w-5xl mb-10">
    <r-h1 :heading-text="contactPage.title" class="my-10"></r-h1>
    <div v-html="richText"></div>
  </div>
</template>

<!-- Page Logic ====================================================================================================-->

<script>
import { documentToHtmlString } from '@contentful/rich-text-html-renderer'
import { aboutPageQuery } from '@/utils/queries'
import { getHeadElement } from '@/utils/headElementAssembler'
import { richTextRenderOptions } from '@/utils/richTextRenderOptions'
import RH1 from '@/components/r-html-tags/rH1'

export default {
  name: 'Contact',
  components: { RH1 },
  // Options ----------------------------------------------------------------------------------------------------------

  nuxtI18n: {
    paths: {
      en: '/contact',
      fr: '/nous-joindre',
    },
  },

  // Hooks ------------------------------------------------------------------------------------------------------------

  async asyncData({ $contentfulApi, payload }) {
    /* Contentful locale */
    const locale = payload && payload.locale ? payload.locale : 'en-CA'

    let contactPage

    if (payload && payload.page) {
      contactPage = { ...payload.page }
    } else {
      contactPage = await $contentfulApi
        .$post('', { query: aboutPageQuery(locale) })
        .then((result) => {
          return result.data.contactPageCollection.items[0]
        })
    }

    const i18nLocaleCode = locale.substring(0, 2)

    const headElement = getHeadElement(contactPage.title, i18nLocaleCode)

    const richText = documentToHtmlString(
      contactPage.body.json,
      richTextRenderOptions()
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
