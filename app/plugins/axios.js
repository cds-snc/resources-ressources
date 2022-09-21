// Set Axios APIs
import { CONTENTFUL_CDA_BASE_URL } from '~/utils/constants'
const config = require('../.contentful.json')

export default function (
  {
    $axios,
    $config: {
      contentfulAccessToken,
      contentfulSpaceID,
      contentfulPreviewToken,
    },
    params,
    route,
    query,
  },
  inject
) {
  console.log('inside axios plugin')
  console.log(`env: ${process.env.contentful_cda_access_token}`)
  console.log('route')
  console.log(params)
  console.log(route)
  console.log(query)
  console.log(
    'space id',
    contentfulSpaceID,
    process.env.contentful_space_id,
    config.CTF_SPACE_ID
  )
  contentfulSpaceID = contentfulSpaceID || config.CTF_SPACE_ID
  const baseUrl = `${CONTENTFUL_CDA_BASE_URL}${contentfulSpaceID}`

  const contentfulApi = $axios.create({})
  contentfulApi.setBaseURL(baseUrl)

  if (query && query.preview) {
    console.log('preview!')
    console.log(contentfulPreviewToken)
    contentfulApi.setToken(contentfulPreviewToken, 'Bearer')
  } else {
    console.log('non preview')
    console.log(contentfulAccessToken)
    contentfulApi.setToken(contentfulAccessToken, 'Bearer')
  }

  contentfulApi.onResponse((response) => {
    // console.log('response?')
    // console.log(response)
    if (response.status === 404) {
      console.log('Oh no it returned a 404')
    }
  })

  inject('contentfulApi', contentfulApi)
}
