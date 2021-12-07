<template>
<div>
  <!-- <Tutorial/> -->
  <section class="body-container">
      <div class="items-bar wrapper">
        <h2 class="bg-yellow-100 flex flex-sm p-6">Recent articles</h2>
      </div>
      <ul class="items-list wrapper mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4">
        <li v-for="post in posts" :key="post.id" class="item p-4 bg-gray-100 rounded-lg mx-4">
          <ArticlePreview :post="post"></ArticlePreview>
        </li>
      </ul>
    </section>
</div>
</template>

<script lang="ts">
import ArticlePreview from '~/components/ArticlePreview.vue'
import { createClient } from '~/plugins/contentful.js';
const client = createClient();

export default {
  components: {
    ArticlePreview
  },
  asyncData({env} : {env:any}) {
    return Promise.all([
      client.getEntries({
        'content_type': env.CTF_BLOG_POST_TYPE_ID,
        order: '-sys.createdAt'
      })
    ]).then(([posts]) => {
      return {
        posts: posts.items
      }
    }).catch(console.error)
  }
}
</script>
