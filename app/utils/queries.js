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
          collectionsCollection
          {
            items
            {
              name
              urlSlug
            }
          }
        }

      }
    }`

export const getCollectionPageQuery = (
  urlSlug,
  currentLocale,
  alternateLocale
) => `query
{
  collectionCollection(where: {urlSlug: "${urlSlug}"}, limit: 1, locale: "${currentLocale}")
  {
    items
    {
      name
      urlSlug(locale: "${alternateLocale}")
      description
      {
        json
      }
      breadcrumbsCollection
      {
        items
        {
          name
          urlSlug
        }
      }
      resourcesCollection
      {
        items
        {
          title
          urlSlug
        }
      }
      relatedCollectionsCollection
      {
        items
        {
          name
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
            links
            {
              entries
              {
                hyperlink
                {
                  __typename ... on TestResource
                  {
                    sys
                    {
                      id
                    }
                    title
                    urlSlug
                  }
                }
              }
            }
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

export const getTopLevelTopicsQuery = (locale) => `query
{
  topicCollection(where: {isTopLevelTopic: true} locale: "${locale}", order: name_ASC)
  {
    items
    {
      name
      urlSlug
    }
  }
}`

export const getQueryForAllCollectionUrlSlugs = (locale) => `query
  {
    collectionCollection(locale: "${locale}")
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

export const topLevelTopicsQuery = (locale) => `query
    {
      topicCollection(where: { isTopLevelTopic: true }, locale: "${locale}", order: name_ASC)
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
    }`

export const aboutPageQuery = (locale) => `query
{
  aboutPageCollection(locale: "${locale}")
  {
    items
    {
      title
      body
      {
        json
      }
    }
  }
}`

export const contactPageQuery = (locale) => `query
{
  contactPageCollection(locale: "${locale}")
  {
    items
    {
      title
      body
      {
        json
      }
    }
  }
}`
