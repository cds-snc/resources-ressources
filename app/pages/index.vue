<template>
<div class="flex flex-col min-h-screen">
  <Header/>
  <main class="flex-grow">
  <Banner/>
  <BannerSearch/>
  <div class="max-w-7xl mx-auto px-4">
    <ul class="flex flex-wrap gap-4 justify-start pt-4">
      <li v-for="category in categories" :key="category.id">
        <Box :item="category" content-type='category'/>
      </li>
    </ul>
  </div>
  </main>
  <Footer/>
</div>
</template>

<script lang="ts">
import Header from '~/components/Header.vue'
import Banner from '~/components/Banner.vue'
import Box from '~/components/Box.vue'
import BannerSearch from '~/components/BannerSearch.vue'
import { createClient } from '~/plugins/contentful.js';
import Footer from '~/components/Footer.vue'

const client = createClient();

export default {
  components: {
    Header,
    Banner,
    Box,
    BannerSearch,
    Footer
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
