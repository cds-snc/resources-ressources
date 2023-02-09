<!-- Page View =====================================================================================================-->

<template>
  <div class="mb-10">
    <div class="max-w-5xl">
      <breadcrumbs
        :breadcrumbs="breadcrumbs"
        :current-page-title="legalPage.title"
      >
      </breadcrumbs>
      <r-h1 :heading-text="legalPage.title" class="my-10"></r-h1>
      <div v-html="richText"></div>
    </div>
  </div>
</template>

<!-- Page Logic - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -->

<script>
import { documentToHtmlString } from '@contentful/rich-text-html-renderer'
import { getHeadElement } from '@/utils/headElementAssembler'
import { EN_LOCALE, FR_LOCALE } from '@/utils/constants'
import { getCurrentLocale, getLocaleCode } from '@/utils/getCurrentLocale'
import { richTextRenderOptions } from '@/utils/richTextRenderOptions'
import { legalPageQuery } from '@/utils/queries'
import RH1 from '@/components/r-html-tags/rH1'

export default {
  components: { RH1 },

  layout: 'expandedSearch',

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

    const alternateLocale = currentLocale === EN_LOCALE ? FR_LOCALE : EN_LOCALE
    const isDefaultLocale = currentLocale === EN_LOCALE || false

    const preview = query.preview || ($preview && $preview.enabled)

    const urlSlug = params.legal

    const pageQuery = legalPageQuery(
      urlSlug,
      currentLocale,
      alternateLocale,
      preview
    )

    // Get en
    let legalPage = null
    if (preview) {
      legalPage = await $contentfulPreviewApi
        .$post('', { query: pageQuery })
        .then((res) => {
          return res.data.legalPageCollection.items[0]
        })
    } else if (payload && payload.legalPage) {
      legalPage = { ...payload.legalPage }
    } else {
      legalPage = await $contentfulApi
        .$post('', { query: pageQuery })
        .then((res) => {
          return res.data.legalPageCollection.items[0]
        })
    }

    const localeCode = getLocaleCode(currentLocale)
    const breadcrumbs = []
    breadcrumbs.locale = localeCode

    const headElement = getHeadElement(legalPage.title, localeCode)

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

    const richText = documentToHtmlString(
      legalPage.body.json,
      richTextRenderOptions(currentLocale, legalPage.body?.links)
    )

    return { legalPage, richText, headElement, breadcrumbs }
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
