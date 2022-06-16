<!-- Component View ================================================================================================-->

<template>
  <!-- Line above the link -->
  <!-- <div class="border-solid border-t border-gray-200 pt-12"> -->
    <!-- Locale Path: Using path -->
    <!-- <nuxt-link :to="localePath(`/topic/${topic.urlSlug}`)" class="flex justify-between hover:text-blue-800 font-medium text-lg"> -->

    <!-- Locale Path: Using name of the route (i18n.nuxtjs.org/basic-usage) -->
  <div class="p-5">
    <nuxt-link
      :to="localePath({
          name: 'topic-topic',
          params: { topic: topic.urlSlug, name: topic.name },
        })"
      class="flex justify-between sm:justify-start hover:text-blue-800 font-medium text-lg">
      {{ topic.name }}
      <font-awesome-icon icon="arrow-right" size="lg" class="sm:ml-4 text-lgs text-yellow-500"></font-awesome-icon>
    </nuxt-link>
  </div>
</template>

<!-- Component Logic ===============================================================================================-->

<script lang="ts">

export default {
  name: "TopicLink",

  // Props ------------------------------------------------------------------------------------------------------------

  props: {
    topic: { name: String, urlSlug: String }
  },

  // Computed Properties ----------------------------------------------------------------------------------------------

  computed: {

  },

  mounted()
  {
    console.log("Props: " + this.topic);
  }
}

</script>
