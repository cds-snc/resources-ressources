<template>
<div>
  <section class="body-container">
      <div class="items-bar wrapper">
        <h2 class="bg-blue-100 flex flex-sm p-6">Title of Article</h2>
      </div>
      <ul class="items-list wrapper">
        <Article></Article>
      </ul>
    </section>
</div>
</template>

<script lang="ts">
import Article from '~/components/Article.vue'
export default {
  components: {
    Article,
  }
}
</script>

