<!-- Page View =====================================================================================================-->

<template>
  <div class="mb-10">
    <div class="max-w-5xl">
      <heading1 :heading-text="legalPage.title" class="my-10"></heading1>
      <div v-html="richText"></div>
    </div>
  </div>
</template>

<!-- Page Logic - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -->

<script>
import { documentToHtmlString } from '@contentful/rich-text-html-renderer'
import { getHeadElement } from '@/utils/headElementAssembler'
import { richTextRenderOptions } from '@/utils/richTextRenderOptions'
import { legalPageQuery } from '@/utils/queries'
import Heading1 from '@/components/headings/Heading1'

export default {
  components: { Heading1 },
  // Hooks ------------------------------------------------------------------------------------------------------------

  async asyncData({ params, store, $contentfulApi, payload }) {
    const currentLocale = payload && payload.locale ? payload.locale : 'en-CA'

    const alternateLocale = currentLocale.includes('en') ? 'fr-CA' : 'en-CA'
    const isDefaultLocale = currentLocale.includes('en') || false

    const urlSlug = params.legal

    const pageQuery = legalPageQuery(urlSlug, currentLocale, alternateLocale)

    let legalPage
    if (payload && payload.legalPage) {
      legalPage = { ...payload.legalPage }
    } else {
      legalPage = await $contentfulApi
        .$post('', { query: pageQuery })
        .then((res) => {
          return res.data.legalPageCollection.items[0]
        })
    }

    const localeCode = currentLocale.substring(0, 2)

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

    return { legalPage, richText, headElement }
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
