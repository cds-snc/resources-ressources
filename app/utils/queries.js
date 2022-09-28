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
      topicCollection(where: { isTopLevelTopic: true }, locale: "${locale}", order: name_ASC, preview: ${preview})
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
