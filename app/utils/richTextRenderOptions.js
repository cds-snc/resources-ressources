import { BLOCKS, INLINES, MARKS } from '@contentful/rich-text-types'
import { ContentTypes } from '~/utils/contentTypes'
import {
  getCollectionPath,
  getLegalPathPrefix,
  getResourcePathPrefix,
  getTopicPathPrefix,
} from '~/utils/pathUtility'

export const richTextRenderOptions = (currentLocale, links, callbackMethod) => {
  const headings = []

  const entryLinks = new Map()

  if (links) {
    for (const entryHyperlink of links.entries.hyperlink) {
      entryLinks.set(entryHyperlink.sys.id, entryHyperlink)
    }
  }

  return {
    renderMark: {
      [MARKS.BOLD]: (text) => {
        console.log(text)
        return `<strong class="font-bold">${text}</strong>`
      },
      [MARKS.ITALIC]: (text) => {
        return `<i class="italic">${text}</i>`
      },
    },
    renderNode: {
      [INLINES.HYPERLINK]: (node) => {
        return `<a class="text-blue-900 underline" href="${node.data.uri}">${node.content[0].value}</a>`
      },
      [INLINES.ENTRY_HYPERLINK]: (node) => {
        const entry = entryLinks.get(node.data.target.sys.id)

        if (entry.__typename === ContentTypes.RESOURCE) {
          const resourcePath =
            getResourcePathPrefix(currentLocale) + entry.urlSlug
          return `<a class="text-blue-900 underline" href="${resourcePath}">${node.content[0].value}</a>`
        }
        if (entry.__typename === ContentTypes.TOPIC) {
          const topicPath = getTopicPathPrefix(currentLocale) + entry.urlSlug
          return `<a class="text-blue-900 underline" href="${topicPath}">${node.content[0].value}</a>`
        }
        if (entry.__typename === ContentTypes.COLLECTION) {
          const collectionPath = getCollectionPath(entry.urlSlug)
          return `<a class="text-blue-900 underline" href="${collectionPath}">${node.content[0].value}</a>`
        }
        if (entry.__typename === ContentTypes.LEGAL_PAGE) {
          const legalPath = getLegalPathPrefix(currentLocale) + entry.urlSlug
          return `<a class="text-blue-900 underline" href="${legalPath}">${node.content[0].value}</a>`
        }
      },
      [BLOCKS.HEADING_1]: (node) => {
        return `<h1 class="text-4xl font-medium mt-12 mb-2.5" >${node.content[0].value}</h1>`
      },
      [BLOCKS.HEADING_2]: (node) => {
        const heading = node.content[0].value
        const headingId = heading.replace(/\s+/g, '-').toLowerCase()
        if (callbackMethod && typeof callbackMethod === "function") {
          // headings.push({linkName: heading, linkId: headingId})
          callbackMethod({linkName: heading, linkId: headingId})
        }
        return `<h2 id="${headingId}" class="text-3xl font-medium mt-12 mb-2.5 scroll-mt-40">${node.content[0].value}</h2>`
      },
      [BLOCKS.HEADING_3]: (node) => {
        return `<h3 class="text-2xl font-medium mt-12 mb-2.5">${node.content[0].value}</h3>`
      },
      [BLOCKS.HEADING_4]: (node) => {
        return `<h4 class="text-xl font-medium mt-12 mb-2.5">${node.content[0].value}</h4>`
      },
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      [BLOCKS.PARAGRAPH]: (node, next) => {
        // return `<p class="leading-7">${node.content[0].value}</p>`
        return `<p class="leading-relaxed text-lg tracking-wide text-gray-800 mt-5">${next(
          node.content
        ).replace(/\n/g, '<br/>')}</p>`
      },
      [BLOCKS.UL_LIST]: (node, next) => {
        return `<ul class="list-disc ml-4">
                        ${next(node.content)}
                    </ul>`
      },
      [BLOCKS.OL_LIST]: (node, next) => {
        return `<ol class="list-decimal ml-4">
                    ${next(node.content)}
                    </ol>`
      },
      /* [BLOCKS.LIST_ITEM]: (node) => {
        node.content = node.content
          .map((listItemNode) =>
            listItemNode.nodeType === BLOCKS.PARAGRAPH
              ? listItemNode.content
              : listItemNode
          )
          .flat()

        return `<li class="text-lg leading-relaxed tracking-wide text-gray-800 mt-3">${node.content[0].value}</li>`
      }, */
      [BLOCKS.HR]: () => {
        return `<div class="border-t border-gray-300 mt-10"></div>`
      },
    },
  }

  /* return {
    renderMark: {
      [MARKS.BOLD]: (text) => {
        console.log(text)
        return `<strong class="font-bold">${text}</strong>`
      },
      [MARKS.ITALIC]: (text) => {
        return `<i class="italic">${text}</i>`
      },
    },
    renderNode: {
      [INLINES.HYPERLINK]: (node) => {
        console.log('----- _legal: ' + node.content)
        return `<a class="text-blue-900 underline" href="${node.data.uri}">${node.content[0].value}</a>`
      },
      [INLINES.ENTRY_HYPERLINK]: (node) => {
        console.log(node.data.target.sys.id)

        const entryId = node.data.target.sys.id

        const pageQuery = legalEntryQuery(entryId)

        const entry = $contentfulApi
          .$post('', {query: pageQuery})
          .then((res) => {
            // console.log(res)
            return res.data.legalPage
          })

        const path = '/legal/' + entry.urlSlug
        console.log(path)
        return `<nuxt-link class="text-blue-900 underline" :to="localePath(${path})">${node.content[0].value}</nuxt-link>`
      },
      [BLOCKS.HEADING_1]: (node) => {
        return `<h1 class="text-3xl font-medium mt-12 mb-2.5" >${node.content[0].value}</h1>`
      },
      [BLOCKS.HEADING_2]: (node) => {
        return `<h2 class="text-2xl font-medium mt-12 mb-2.5">${node.content[0].value}</h2>`
      },
      [BLOCKS.HEADING_3]: (node) => {
        return `<h3 class="text-xl font-medium mt-12 mb-2.5">${node.content[0].value}</h3>`
      },
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      [BLOCKS.PARAGRAPH]: (node, next) => {
        // return `<p class="leading-7">${node.content[0].value}</p>`
        return `<p class="leading-relaxed text-xl tracking-wide text-gray-800">${next(
          node.content
        )}</p>`
      },
      [BLOCKS.UL_LIST]: (node, next) => {
        // console.log(JSON.parse(JSON.stringify(node)))
        return `<ul class="list-disc ml-4">
                        ${next(node.content)}
                    </ul>`
      },
      [BLOCKS.HR]: () => {
        return `<div class="border-t border-gray-300 mt-10"></div>`
      },
    },
  } */
}

// Resource Render Options --------------------------------------------------------------------------------------------

export const resourceRichTextRenderOptions = {
  renderMark: {
    [MARKS.BOLD]: (text) => {
      console.log(text)
      return `<strong class="font-bold">${text}</strong>`
    },
    [MARKS.ITALIC]: (text) => {
      return `<i class="italic">${text}</i>`
    },
  },
  renderNode: {
    [INLINES.HYPERLINK]: (node) => {
      return `<a class="text-blue-900 underline" href="${node.data.uri}">${node.content[0].value}</a>`
    },
    [BLOCKS.HEADING_1]: (node) => {
      return `<h1 class="text-3xl font-medium mt-12 mb-2.5" >${node.content[0].value}</h1>`
    },
    [BLOCKS.HEADING_2]: (node) => {
      return `<h2 class="text-2xl font-medium mt-12 mb-2.5">${node.content[0].value}</h2>`
    },
    [BLOCKS.HEADING_3]: (node) => {
      return `<h3 class="text-xl font-medium mt-12 mb-2.5">${node.content[0].value}</h3>`
    },
    [BLOCKS.HEADING_4]: (node) => {
      return `<h4 class="text-lg font-medium mt-12 mb-2.5">${node.content[0].value}</h4>`
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    [BLOCKS.PARAGRAPH]: (node, next) => {
      // return `<p class="leading-7">${node.content[0].value}</p>`
      return `<p class="leading-relaxed text-xl tracking-wide text-gray-800">${next(
        node.content
      ).replace(/\n/g, '<br/>')}</p>`
    },
    [BLOCKS.UL_LIST]: (node, next) => {
      return `<ul class="list-disc ml-4">
                        ${next(node.content)}
                    </ul>`
    },
    [BLOCKS.OL_LIST]: (node, next) => {
      return `<ol class="list-decimal ml-4">
                    ${next(node.content)}
                    </ol>`
    },
    [BLOCKS.HR]: () => {
      return `<div class="border-t border-gray-300 mt-10"></div>`
    },
  },
}
