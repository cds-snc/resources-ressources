import { BLOCKS, INLINES, MARKS } from '@contentful/rich-text-types'
import { ContentTypes } from '~/utils/contentTypes'
import {
  getAboutPagePath,
  getCollectionPath,
  getContactPagePath,
  getLegalPathPrefix,
  getResourcePathPrefix,
  getTopicPathPrefix,
} from '~/utils/pathUtility'

export const richTextRenderOptions = (
  currentLocale,
  links,
  addToResourceHeadings,
) => {
  const entryLinks = new Map()
  const assetMap = new Map()
  let isFirstNode = true

  if (links) {
    if(links.entries) {
      // Hyperlinks
      for (const entryHyperlink of links.entries.hyperlink) {
        entryLinks.set(entryHyperlink.sys.id, entryHyperlink)
      }
    }

    if(links.assets) {
      // Embedded assets (images, videos, etc)
      for (const asset of links.assets.block) {
        assetMap.set(asset.sys.id, asset)
      }
    }
  }

  return {
    renderMark: {
      [MARKS.BOLD]: (text) => {
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
        if (entry.__typename === ContentTypes.ABOUT_PAGE) {
          const aboutPagePath = getAboutPagePath(currentLocale)
          return `<a class="text-blue-900 underline" href="${aboutPagePath}">${node.content[0].value}</a>`
        }
        if (entry.__typename === ContentTypes.CONTACT_PAGE) {
          const contactPagePath = getContactPagePath(currentLocale)
          return `<a class="text-blue-900 underline" href="${contactPagePath}">${node.content[0].value}</a>`
        }
      },
      [BLOCKS.HEADING_1]: (node) => {
        return `<h1 class="text-4xl font-medium mt-12 mb-2.5" >${node.content[0].value}</h1>`
      },
      [BLOCKS.HEADING_2]: (node) => {
        const heading = node.content[0].value
        const headingId = heading.replace(/\s+/g, '-').toLowerCase()
        if (
          addToResourceHeadings &&
          typeof addToResourceHeadings === 'function'
        ) {
          addToResourceHeadings({ linkName: heading, linkId: headingId })
        }

        let marginTop = 'mt-12'

        if (isFirstNode) {
          marginTop = 'mt-5'
          isFirstNode = false
        }
        return `<h2 id="${headingId}" class="text-3xl font-medium ${marginTop} mb-2.5 scroll-mt-32 md:scroll-mt-20">${node.content[0].value}</h2>`
      },
      [BLOCKS.HEADING_3]: (node) => {
        return `<h3 class="text-2xl font-medium mt-12 mb-2.5">${node.content[0].value}</h3>`
      },
      [BLOCKS.HEADING_4]: (node) => {
        return `<h4 class="text-xl font-medium mt-12 mb-2.5">${node.content[0].value}</h4>`
      },
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      [BLOCKS.PARAGRAPH]: (node, next) => {
        if (isFirstNode) isFirstNode = false
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
      [BLOCKS.EMBEDDED_ASSET]: (node) => {
        // find the asset in the assetMap by ID
        const asset = assetMap.get(node.data.target.sys.id);
        console.log(asset)

        // More info on resizing images here: https://www.contentful.com/developers/docs/concepts/images/
        // i.e. we can resize the image to 300px wide by appending ?w=300 to the URL
        const url = `${asset.url}`
        return `<img src="${url}" alt="${asset.description}" height=${asset.height} width=${asset.width} class="my-10 max-w-full" />`
      }
    },
  }
}
