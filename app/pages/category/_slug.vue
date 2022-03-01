<template>
<div>
  <Header/>
  <Banner/>
  <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
    <ul class="flex flex-wrap justify-start gap-10">
      <li v-for="subtopic in subtopics" :key="subtopic.id">
        <!-- <box :item=subtopic /> -->
      </li>
    </ul>
  </div>
</div>
</template>

<script lang="ts">
import Header from '~/components/Header.vue'
import Banner from '~/components/Banner.vue'
import Box from '~/components/Box.vue'
import { createClient } from '~/plugins/contentful.js';

const client = createClient();

export default {
  components: {
    Header,
    Banner,
    Box
  },
  // asyncData({ params }) {
  //   console.log(params.slug)
  //   return params.slug
  // },
  asyncData({params}) {
    console.log(params.slug)
    return Promise.all([
      client.getEntries({
        'content_type': 'topic',
        // 'topic': 'topic.id',
        fields: {
          'category': `id=${params.slug}`
        },
        order: '-sys.createdAt'
      }),
    ]).then(([subtopics]) => {
      console.log(subtopics.items)
      return {
        subtopics: subtopics.items,
      }
    }).catch((err) => {
      console.log(err)
    })
  },
  mounted() {
    // console.log(this.$route.query)
    // console.log(this.$route.fullPath)
  }
}
</script>