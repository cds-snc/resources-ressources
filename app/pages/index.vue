<template>
  <div class="max-w-7xl mx-auto px-4">
    <ul class="flex flex-wrap gap-4 justify-start pt-4">
      <li v-for="category in categories" :key="category.id">
        <Box :item="category" content-type="category" />
      </li>
    </ul>
  </div>
</template>

<script>
import Box from '~/components/Box.vue'
import { createClient } from '~/plugins/contentful.js'

const client = createClient()

export default {
  name: 'Index',
  components: {
    Box,
  },
  layout: 'expandedSearch',
  // asyncData({env} : {env:any}) {
  asyncData({ app }) {
    // $i18n.locale n
    // axios.get()
    // return Promise.all([
    //   client.getEntries({
    //     'content_type': env.CTF_BLOG_POST_TYPE_ID,
    //     order: '-sys.createdAt'
    //   }),
    //   client.getContentTypes()
    // ]).then(([posts, contentTypes]) => {
    //   return {
    //     posts: posts.items,
    //     contentTypes: contentTypes.items
    //   }
    // }).catch((err) => {
    //   console.log(err)
    // })
    return Promise.all([
      client.getEntries({
        content_type: 'category',
        order: '-sys.createdAt',
        locale: app.i18n.localeProperties.iso,
      }),
    ])
      .then(([categories]) => {
        return {
          categories: categories.items,
        }
      })
      .catch((err) => {
        console.log(err)
      })
  },
}
</script>
