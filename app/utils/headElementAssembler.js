export const getHeadElement = (pageTitle, localeCode) => {
  const siteName = localeCode.includes('en')
    ? ' - Learning Resources'
    : " - Ressources d'apprentissage"

  return {
    title: pageTitle + siteName,
    langAttribute: localeCode,
  }
}
