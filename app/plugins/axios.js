// Set Axios APIs
import { CONTENTFUL_CDA_BASE_URL } from '~/utils/constants'

export default function (
  { $axios, $config: { contentfulAccessToken, contentfulSpaceID } },
  inject
) {
  const baseUrl = `${CONTENTFUL_CDA_BASE_URL}${contentfulSpaceID}`

  const contentfulApi = $axios.create({})
  contentfulApi.setBaseURL(baseUrl)

  contentfulApi.setToken(contentfulAccessToken, 'Bearer')

  contentfulApi.onResponse((response) => {
    if (response.status === 404) {
      console.log('Oh no it returned a 404')
    }
  })

  inject('contentfulApi', contentfulApi)
}
