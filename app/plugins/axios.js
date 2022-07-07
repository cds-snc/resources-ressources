// Set Contentful baseURL

export default function (
  { $axios, $config: { contentfulAccessToken, contentfulSpaceID } },
  inject
) {
  const baseUrl = `https://graphql.contentful.com/content/v1/spaces/${contentfulSpaceID}`
  const contentfulApi = $axios.create({})
  contentfulApi.setBaseURL(baseUrl)
  // contentfulApi.setBaseUrl(baseUrl)

  contentfulApi.setToken(contentfulAccessToken, 'Bearer')

  contentfulApi.onResponse((response) => {
    if (response.status === 404) {
      console.log('Oh no it returned a 404')
    }
  })

  inject('contentfulApi', contentfulApi)
}
