<template>
  <div class="max-w-5xl mb-10">
    <breadcrumbs
      :breadcrumbs="breadcrumbs"
      :current-page-title="contactPage.title"
    >
    </breadcrumbs>
    <r-h1 :heading-text="contactPage.title" class="my-10"></r-h1>
    <div v-html="richText"></div>
  </div>
</template>

<!-- Page Logic ====================================================================================================-->

<script>
import { documentToHtmlString } from '@contentful/rich-text-html-renderer'
import { contactPageQuery } from '@/utils/queries'
import { getHeadElement } from '@/utils/headElementAssembler'
import { richTextRenderOptions } from '@/utils/richTextRenderOptions'
import { getCurrentLocale, getLocaleCode } from '@/utils/getCurrentLocale'
import RH1 from '@/components/r-html-tags/rH1'
import { contactPathEN, contactPathFR } from '@/utils/pathUtility'

export default {
  name: 'Contact',
  components: { RH1 },
  // Options ----------------------------------------------------------------------------------------------------------

  nuxtI18n: {
    paths: {
      en: contactPathEN,
      fr: contactPathFR,
    },
  },

  layout: 'expandedSearch',

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

    const localeCode = getLocaleCode(currentLocale)

    const breadcrumbs = []
    breadcrumbs.locale = localeCode

    const headElement = getHeadElement(contactPage.title, localeCode)

    const richText = documentToHtmlString(
      contactPage.body.json,
      richTextRenderOptions()
    )

    return { contactPage, richText, headElement, breadcrumbs }
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
