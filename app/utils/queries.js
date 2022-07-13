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

export const resourcePageQuery = (
  urlSlug,
  currentLocale,
  alternateLocale
) => `query
    {
      testResourceCollection(where: {
      AND:
        [
          {
            urlSlug: "${urlSlug}"
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

export const legalPageQuery = (
  urlSlug,
  currentLocale,
  alternateLocale
) => `query
    {
      legalPageCollection(where: { urlSlug: "${urlSlug}" }, limit: 1, locale: "${currentLocale}")
      {
        items
        {
          title
          urlSlug(locale: "${alternateLocale}")
          body
          {
            json
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

export const resourceRoutesQuery = (locale) => `query
      {
        testResourceCollection(locale: "${locale}")
        {
          items
          {
            urlSlug
          }
        }
      }`

export const legalRoutesQuery = (locale) => `query
      {
        legalPageCollection(locale: "${locale}")
        {
          items
          {
            urlSlug
          }
        }
      }`

export const legalEntryQuery = (entryId) => `query
          {
            legalPage(id: "${entryId}")
            {
              urlSlug
            }
          }`
