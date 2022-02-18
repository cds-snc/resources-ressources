<template>
<div>
  <Header/>
  <Banner/>
  <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
    <ul class="flex flex-wrap gap-4 justify-start">
      <li v-for="category in categories" :key="category.id">
        <Box :item="category" content-type='category'/>
      </li>
    </ul>
  </div>
</div>
</template>

<script lang="ts">
import ArticlePreview from '~/components/ArticlePreview.vue'
import Header from '~/components/Header.vue'
import Banner from '~/components/Banner.vue'
import Box from '~/components/Box.vue'
import { createClient } from '~/plugins/contentful.js';

const client = createClient();

export default {
  components: {
    ArticlePreview,
    Header,
    Banner,
    Box
  },
  asyncData({env} : {env:any}) {

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
        'content_type': 'category',
        order: '-sys.createdAt'
      }),
    ]).then(([categories]) => {
      return {
        categories: categories.items,
      }
    }).catch((err) => {
      console.log(err)
    })
  }
}
</script>
