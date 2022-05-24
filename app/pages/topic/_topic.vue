<template>



  <!-- Container for all resources -->
  <div>

    <div class="flex justify-center py-16">
      <div class="w-5/6 md:w-1/2">
        <h1 class="font-medium text-5xl text-center">{{topic}}</h1>
        <p class="mt-5 pb-5 text-gray-600">{{ description }}</p>
        <div class="flex justify-center">
          <div class="border-2 w-20 border-cds-yellow"></div>
        </div>
      </div>
    </div>

    <!-- Popular resources for topic --------------------------------------------------------------------------------->

    <div>
      <label class="text-2xl font-bold">Popular for {{topic}}</label>

      <ul class="flex flex-col sm:flex-row mt-5 ">
        <!-- TODO: Make into component: Filter chip ------------------------------------------------------------------>

        <li v-for="keyword in keywords" :key="keyword" >

          <div type="radio" class="border border-gray-600 rounded-full px-3 py-1.5 mr-3 cursor-pointer">{{ keyword }}</div>
        </li>

        <!-- TODO-end ------------------------------------------------------------------------------------------------>
      </ul>
    </div>

    <!-- Divider ----------------------------------------------------------------------------------------------------->

    <div class="border my-10"></div>

    <!-- Resources --------------------------------------------------------------------------------------------------->

    <h2 class="text-2xl font-bold">Resources on {{topic}}</h2>

    <ul class="mt-5">

      <!-- Resource card --------------------------------------------------------------------------------------------->
      <!-- TODO: Create component: Resource item -------------------------------------- -->

      <li v-for="resource in resources" :key="resource.title">
        <div class="py-6">

          <!-- Section: Resource type & resource title --------------------------------------------------------------->

          <p class="pb-1 font-medium text-gray-600"><small class="text-sm">SAMPLE</small></p>

          <nuxt-link :to="localePath(`/resource/${resource.urlSlug}`)" class="text-lg font-medium hover:text-gray-600">
            {{resource.title}}
          </nuxt-link>

          <div class="font-light mt-1.5 text-gray-800">Last updated {{ resource.dateAdded | formatDate }}</div>

        </div>
      </li>
    </ul>

  </div>
</template>

<script>
import dayjs from "dayjs";

export default
{
  // Filters ----------------------------------------------------------------------------------------------------------

  filters: {
    formatDate: function (dateString)
    {
      if (!dateString) return null;

      return dayjs(dateString).format("MMM DD, YYYY");
    }
  },

  // Hooks ------------------------------------------------------------------------------------------------------------

  async asyncData({ params, $axios })
  {
    console.log(params);

    /* PROBLEM:
    * When you retrieve data for a page based on the params from a navigation action
    * it only works when you navigate by clicking on the link. If you are using
    * the browser's back and forward buttons the params you are expecting will not
    * reach this page. Thus, any data retrieval action dependent on these params will
    * not work.
    * */

    const topic = params.topic[0].toUpperCase() + params.topic.substring(1);

    console.log(topic);

    const graphQLQuery = `query{
      topicCollection(where: {name: "${topic}"}, limit: 1) {
        items {
          name
          topicDescription
          topicKeywords
          linkedFrom {
            testResourceCollection {
              items {
                sys
                {
                  id
                }
                title
                urlSlug
                dateAdded
                resourceType
                {
                  name
                }
              }
            }
          }
        }
      }
    }`;

    $axios.setToken(process.env.CTF_CDA_ACCESS_TOKEN, 'Bearer')

    const endpoint = `https://graphql.contentful.com/content/v1/spaces/${process.env.CTF_SPACE_ID}/environments/master/`;

    const result = await $axios.$post(endpoint, { query: graphQLQuery })
      .then((res) =>
      {
        return res
        // return result.data.topicCollection.items[0].linkedFrom.testResourceCollection.items
      });

    const resources = result.data.topicCollection.items[0].linkedFrom.testResourceCollection.items;
    const description = result.data.topicCollection.items[0].topicDescription;
    const keywords = result.data.topicCollection.items[0].topicKeywords;

    console.log(resources);
    console.log(keywords);




    return { resources, topic, keywords, description }
  },



  // Data -------------------------------------------------------------------------------------------------------------

  data() {
    return {
      hello: "hello",
      title: ""
    }
  }


}
</script>
