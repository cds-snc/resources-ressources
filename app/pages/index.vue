<template>
<div>
  <Tutorial/>
  <section class="body-container">
      <div class="items-bar wrapper">
        <h2>Recent articles</h2>
      </div>
      <ul class="items-list wrapper">
        <li v-for="post in posts" class="item" >
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
