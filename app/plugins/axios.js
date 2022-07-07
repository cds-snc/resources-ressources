

  // Set Contentful baseURL
  const baseUrl = `https://graphql.contentful.com/content/v1/spaces/${process.env.CTF_SPACE_ID}`
  export default function ({ $axios }, inject) {
    const contentfulApi = $axios.create({})
    contentfulApi.setBaseURL(baseUrl)
  // contentfulApi.setBaseUrl(baseUrl)

  contentfulApi.setToken(process.env.CTF_CDA_ACCESS_TOKEN, 'Bearer')

  contentfulApi.onResponse((response) => {
    if (response.status === 404) {
      console.log('Oh no it returned a 404')
    }
  })

  inject('contentfulApi', contentfulApi)
}
