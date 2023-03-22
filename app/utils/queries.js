import { ContentTypes } from './contentTypes'

export const topicPageQuery = (
  urlSlug,
  currentLocale,
  alternateLocale,
  preview = false
) => `query
    {
      topicCollection(where: {urlSlug: "${urlSlug}"}, limit: 1, locale: "${currentLocale}", preview: ${preview})
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
  alternateLocale,
  preview = false
) => `query
{
  collectionCollection(where: {urlSlug: "${urlSlug}"}, limit: 1, locale: "${currentLocale}", preview: ${preview})
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
  alternateLocale,
  preview = false
) => `query
    {
      testResourceCollection(where: {
      AND:
        [
          {
            urlSlug: "${urlSlug}"
          }
        ]
    }, locale: "${currentLocale}", limit: 1, preview: ${preview})
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
          externalResourcesCollection
          {
            items
            {
              title
              url
              resourceType
              {
                name
              }
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
                  __typename ... on ${ContentTypes.RESOURCE}
                  {
                    sys
                    {
                      id
                    }
                    urlSlug
                  }
                }
                hyperlink
                {
                  __typename ... on ${ContentTypes.TOPIC}
                  {
                    sys
                    {
                      id
                    }
                    urlSlug
                  }
                }
                hyperlink
                {
                  __typename ... on ${ContentTypes.COLLECTION}
                  {
                    sys
                    {
                      id
                    }
                    urlSlug
                  }
                }
                hyperlink
                {
                  __typename ... on ${ContentTypes.ABOUT_PAGE}
                  {
                    sys
                    {
                      id
                    }
                  }
                }
                hyperlink
                {
                  __typename ... on ${ContentTypes.CONTACT_PAGE}
                  {
                    sys
                    {
                      id
                    }
                  }
                }
                hyperlink
                {
                  __typename ... on ${ContentTypes.LEGAL_PAGE}
                  {
                    sys
                    {
                      id
                    }
                    urlSlug
                  }
                }
              }
              assets {
                block {
                  sys {
                    id
                  }
                  url
                  title
                  width
                  height
                  description
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
  alternateLocale,
  preview = false
) => `query
    {
      legalPageCollection(where: { urlSlug: "${urlSlug}" }, limit: 1, locale: "${currentLocale}", preview: ${preview})
      {
        items
        {
          title
          urlSlug(locale: "${alternateLocale}")
          body
          {
            json
            links
            {
              entries
              {
                hyperlink
                {
                  __typename ... on ${ContentTypes.LEGAL_PAGE}
                  {
                    sys
                    {
                      id
                    }
                    urlSlug
                  }
                }
              }
            }
          }
        }
      }
    }`

export const topicRoutesQuery = (locale, preview = false) => `query
    {
      topicCollection(locale: "${locale}", preview: ${preview})
      {
        items
        {
          urlSlug
        }
      }
    }`

export const getTopLevelTopicsQuery = (locale, preview = false) => `query
{
  topicCollection(where: {isTopLevelTopic: true} locale: "${locale}", order: name_ASC, preview: ${preview})
  {
    items
    {
      name
      urlSlug
    }
  }
}`

export const getQueryForAllCollectionUrlSlugs = (
  locale,
  preview = false
) => `query
  {
    collectionCollection(locale: "${locale}", preview: ${preview})
    {
      items
      {
        urlSlug
      }
    }
  }`

export const resourceRoutesQuery = (locale, preview = false) => `query
    {
      testResourceCollection(locale: "${locale}", preview: ${preview})
      {
        items
        {
          urlSlug
        }
      }
    }`

export const legalRoutesQuery = (locale, preview = false) => `query
    {
      legalPageCollection(locale: "${locale}", preview: ${preview})
      {
        items
        {
          urlSlug
        }
      }
    }`

export const legalEntryQuery = (entryId, preview = false) => `query
    {
      legalPage(id: "${entryId}", preview: ${preview})
      {
        urlSlug
      }
    }`

export const topLevelTopicsQuery = (locale, preview = false) => `query
    {
      topicCollection(where: { isTopLevelTopic: true }, locale: "${locale}", preview: ${preview}, order: name_ASC)
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

export const aboutPageQuery = (locale, preview = false) => `query
{
  aboutPageCollection(locale: "${locale}", preview: ${preview})
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

export const contactPageQuery = (locale, preview = false) => `query
{
  contactPageCollection(locale: "${locale}", preview: ${preview})
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
