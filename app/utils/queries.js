export const topicPageQuery = (
  urlSlug,
  currentLocale,
  alternateLocale
) => `query
    {
      topicCollection(where: {urlSlug: "${urlSlug}"}, limit: 1, locale: "${currentLocale}")
      {
        items
        {
          name
          topicDescription
          subtopicsHeading
          urlSlug(locale: "${alternateLocale}")
          breadcrumbsCollection
          {
            items
            {
              name
              urlSlug
            }
          }
          subtopicsCollection
          {
            items
            {
              name
              urlSlug
              flag
              {
                value
              }
            }
          }
          resourcesCollection
          {
            items
            {
              title
              dateAdded
              urlSlug
            }
          }
        }

      }
    }`

export const topicRoutesQuery = (locale) => `query
      {
        topicCollection(locale: "${locale}")
        {
          items
          {
            urlSlug
          }
        }
      }`
