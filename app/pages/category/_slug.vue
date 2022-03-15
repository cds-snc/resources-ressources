<template>
  <div class="max-w-7xl mx-auto px-4">
    <ul class="flex flex-wrap gap-4 justify-start pt-4">
      <li v-for="topic in topics" :key="topic.id">
        <box :item="topic" content-type="topic" />
      </li>
    </ul>
  </div>
</template>

<script>
// import Box from '~/components/Box.vue'
// import { createClient } from '~/plugins/contentful.js';

// const client = createClient();

export default {
  name: 'CategorySlug',
  components: {
    // Box
  },
  // asyncData({ params }) {
  //   console.log(params.slug)
  //   return params.slug
  // },
  async asyncData({ $axios, params }) {
    console.log(params.slug)
    const categoryId = params.slug
    const query = `{
      categoryCollection(where: { id: "${categoryId}"}){
          items{
              linkedFrom {
                  topicCollection{
                      total
                      items {
                          name
                          id
                      }
                  }
              }
          }
      }
    }`

    $axios.setToken(process.env.CTF_CDA_ACCESS_TOKEN, 'Bearer')

    const endpoint = `https://graphql.contentful.com/content/v1/spaces/${process.env.CTF_SPACE_ID}/environments/master/`
    const options = {
      data: JSON.stringify({
        query,
      }),
    }

    console.log('options', options)
    console.log('url', endpoint)

    const topics = await $axios
      .$post(endpoint, { query })
      .catch((error) => {
        console.log('error', error)
      })
      .then((result) => {
        // todo make sure this exists
        return result.data.categoryCollection.items[0].linkedFrom
          .topicCollection.items
      })

    console.log(topics)

    return { topics }

    // return data
  },
  mounted() {
    // console.log(this.$route.query)
    // console.log(this.$route.fullPath)
  },
}
</script>
