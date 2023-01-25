<template>
  <div class="max-w-5xl mb-10">
    <breadcrumbs
      :breadcrumbs="breadcrumbs"
      :current-page-title="aboutPage.title"
    >
    </breadcrumbs>
    <r-h1 :heading-text="aboutPage.title" class="my-10"></r-h1>
    <div v-html="richText"></div>
  </div>
</template>

<!-- Script ========================================================================================================-->

<script>
import { documentToHtmlString } from '@contentful/rich-text-html-renderer'
import { aboutPageQuery } from '@/utils/queries'
import { getHeadElement } from '@/utils/headElementAssembler'
import { richTextRenderOptions } from '@/utils/richTextRenderOptions'
import { getCurrentLocale, getLocaleCode } from '@/utils/getCurrentLocale'
import RH1 from '@/components/r-html-tags/rH1'

export default {
  name: 'About',
  components: { RH1 },
  // Options ----------------------------------------------------------------------------------------------------------

  nuxtI18n: {
    paths: {
      en: '/about',
      fr: '/a-propos',
    },
  },

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

    const localeCode = getLocaleCode(currentLocale)

    const breadcrumbs = []
    breadcrumbs.locale = localeCode

    const headElement = getHeadElement(aboutPage.title, localeCode)

    const richText = documentToHtmlString(
      aboutPage.body.json,
      richTextRenderOptions()
    )

    return { aboutPage, richText, headElement, breadcrumbs }
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
