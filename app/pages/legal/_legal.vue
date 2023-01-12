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
