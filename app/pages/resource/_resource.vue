<!-- Page View =====================================================================================================-->

<template>
  <div>
    <breadcrumbs
      :breadcrumbs="breadcrumbs"
      :current-page-title="resource.testResourceCollection.items[0].title"
    >
    </breadcrumbs>

    <div class="flex justify-center mb-10">
      <div class="max-w-4xl">
        <h1 class="text-4xl font-bold text-center m-20">
          {{ resource.testResourceCollection.items[0].title }}
        </h1>

        <div v-html="richText"></div>

        <!-- Related Resources --------------------------------------------------------------------------------------->

        <div>
          <div class="border-t border-gray-300 border-thin my-14"></div>

          <h2 class="p-5 font-thin text-4xl">Explore related resources</h2>

          <ul class="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-2">
            <!-- Resource card --------------------------------------------------------------------------------------------->

            <li v-for="resource in relatedResources" :key="resource.title">
              <ResourceListItem :resource="resource"> </ResourceListItem>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<!-- Page Logic ====================================================================================================-->

<script>
import { documentToHtmlString } from '@contentful/rich-text-html-renderer'
import { BLOCKS } from '@contentful/rich-text-types'

export default {
  // Hooks ------------------------------------------------------------------------------------------------------------

  async asyncData({ app, params, $axios, store }) {
    /* Query resource by ID */
    /* const graphQLQuery = `query
      {
        testResource(urlSlug: "1OFEeF6m6iFrvYd9g07u2F")
        {
          title
          body
          {
            json
          }
        }
      }`; */

    /* Determine current locale, alternate locale and default locale */

    const currentLocale = app.i18n.locale + '-CA'
    const alternateLocale = currentLocale.includes('en') ? 'fr-CA' : 'en-CA'
    const isDefaultLocale = currentLocale.includes('en') || false

    console.log('Current locale: ' + currentLocale)

    /* Query resource by url slug */

    const resourceSlug = params.resource

    const graphQLQuery = `query
    {
      testResourceCollection(where: {
      AND:
        [
          {
            urlSlug: "${resourceSlug}"
          }
        ]
    }, locale: "${currentLocale}", limit: 1)
      {
        items
        {
          title
          description
          urlSlug(locale: "${alternateLocale}")
          breadcrumbsCollection
          {
            items
            {
              name
              urlSlug
            }
          }
          relatedResourcesCollection
          {
            items
            {
              title
              dateAdded
              urlSlug
            }
          }
          body
          {
            json
          }
        }
      }
    }`

    $axios.setToken(process.env.CTF_CDA_ACCESS_TOKEN, 'Bearer')

    const endpoint = `https://graphql.contentful.com/content/v1/spaces/${process.env.CTF_SPACE_ID}/environments/master/`

    const resource = await $axios
      .$post(endpoint, { query: graphQLQuery })
      .then((result) => {
        // const richText = documentToHtmlString(result.data.body);

        // console.log(richText);

        return result.data
      })

    const breadcrumbs =
      resource.testResourceCollection.items[0].breadcrumbsCollection.items
    const relatedResources =
      resource.testResourceCollection.items[0].relatedResourcesCollection.items

    console.log(relatedResources)

    const alternateLocaleResourceSlug =
      resource.testResourceCollection.items[0].urlSlug

    let enRouteParam = null
    let frRouteParam = null

    if (isDefaultLocale) {
      enRouteParam = resourceSlug
      frRouteParam = alternateLocaleResourceSlug
    } else {
      enRouteParam = alternateLocaleResourceSlug
      frRouteParam = resourceSlug
    }

    await store.dispatch('i18n/setRouteParams', {
      en: { resource: enRouteParam },
      fr: { resource: frRouteParam },
    })

    console.log(JSON.parse(JSON.stringify(resource)))

    // const content = resource.body.json;

    const richTextOptions = {
      renderNode: {
        [BLOCKS.HEADING_2]: (node) => {
          return `<h2 class="text-2xl font-medium mt-12 mb-2.5">${node.content[0].value}</h2>`
        },
        [BLOCKS.PARAGRAPH]: (node) => {
          return `<p class="leading-7">${node.content[0].value}</p>`
        },
        [BLOCKS.UL_LIST]: (node, next) => {
          console.log(JSON.parse(JSON.stringify(node)))
          return `<ul class="list-disc ml-4">
                        ${next(node.content)}
                    </ul>`
        },
      },
    }

    const richText = documentToHtmlString(
      resource.testResourceCollection.items[0].body.json,
      richTextOptions
    )

    console.log('Breadcrumbs:' + breadcrumbs)

    console.log(richText)

    return { resource, richText, breadcrumbs, relatedResources }
  },
}
</script>
