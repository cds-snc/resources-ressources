<!-- Template ======================================================================================================-->

<template>
    <div>
      <!-- Old code:
      <ul class="flex flex-wrap gap-4 justify-start pt-4">
        <li v-for="category in categories" :key="category.id">
          <Box :item="category" content-type="category" />
        </li>
      </ul> -->

      <!-- Welcome message ------------------------------------------------------------------------------------------->

      <div class="py-16 flex flex-col items-center">
        <h1 class="text-3xl md:text-5xl font-bold pb-10 text-center ">Welcome to Learning Resources</h1>
        <p class="text-l md:text-xl pb-2 text-center">Sharing service delivery resources grounded in our work to help fellow public servants.</p>
        <p class="text-l md:text-xl font-bold pb-5 text-center">Service delivery is hard. We can help.
        <div class="border-2 w-20 border-cds-yellow"></div>
      </div>

      <!-- Topics ---------------------------------------------------------------------------------------------------->

      <div class="mx-4 mb-10">

        <h2 class="text-2xl font-bold pb-7">Topics</h2>

        <ul class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10" >
          <li v-for="topic in topics" :key="topic.name">

            <!-- 2-DO: Create component: Topic card ------------------------------------------------------------------>

            <div class="border-solid border-t border-gray-200 pt-10">
              <nuxt-link :to="localePath(`/topic/${topic.urlSlug}`)" class="flex justify-between hover:text-blue-800 font-medium text-lg">
                {{topic.name}}
                <font-awesome-icon icon="arrow-right"></font-awesome-icon>
              </nuxt-link>
            </div>

          </li>
        </ul>
      </div>
    </div>

</template>

<!-- Script ========================================================================================================-->

<script>
// import Box from '~/components/Box.vue'
// import { createClient } from '~/plugins/contentful.js'

// const client = createClient()

export default {
  name: 'Index',
  components: {
   //  Box,
  },
  layout: 'expandedSearch',
  data()
  {
    return{
      topics: {}
    }
  },

  // asyncData({env} : {env:any}) {
  async asyncData({ app, $axios })
  {

    // Contentful --
    const spaceID = "zy72kv0qwyyq";
    const accessToken = "GUc49ra1DWc4wiEZ8vk-6o9oYzDPhg-uc-ZOxh3v2P0";
    const contentfulEndpoint = "https://graphql.contentful.com/content/v1/spaces/" + spaceID;

    const graphQLQuery = `query{
      topicCollection
      {
        items
        {
          name
          urlSlug
        }
      }
    }`;


    $axios.setToken(accessToken, "Bearer");
    $axios.$request({})
    const response = await $axios.$post(contentfulEndpoint, {query: graphQLQuery})

     console.log(response);
    // const responseObj = JSON.parse(JSON.stringify(response));
     const topics = response.data.topicCollection.items;

    console.log(topics);

    return { topics };
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
    /* DAINE'S CODE: *******************/
    /* return Promise.all([
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
      }) */

  },
}
</script>
