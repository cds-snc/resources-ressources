export default function ({ query, enablePreview }) {
  // Enable preview mode if the query parameter is set
  if (query.preview) {
    enablePreview()
  }

  // Also enable preview mode if the subdomain is "preview"
  if (splitHostname().subdomain.includes('preview.')) {
    enablePreview({ enabled: true })
  }

  function splitHostname() {
    const result = {}
    const regexParse = /([a-z-0-9]{2,63}).([a-z.]{2,5})$/
    const urlParts = regexParse.exec(window.location.hostname)
    result.domain = urlParts[1]
    result.type = urlParts[2]
    result.subdomain = window.location.hostname
      .replace(result.domain + '.' + result.type, '')
      .slice(0, -1)
    return result
  }
}
