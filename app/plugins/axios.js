// Set Axios APIs
import { CONTENTFUL_CDA_BASE_URL } from '~/utils/constants'

export default function (
  {
    $axios,
    $config: {
      contentfulAccessToken,
      contentfulPreviewAccessToken,
      contentfulSpaceID,
      contentfulPreviewSpaceID,
      previewEnv,
    },
  },
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

  // Set Contentful preview API
  const contentfulPreviewApi = $axios.create({})
  contentfulPreviewApi.setBaseURL(
    CONTENTFUL_CDA_BASE_URL + contentfulPreviewSpaceID
  )
  if (previewEnv) {
    contentfulPreviewApi.setToken(contentfulPreviewAccessToken, 'Bearer')
  }
  inject('contentfulPreviewApi', contentfulPreviewApi)
}
