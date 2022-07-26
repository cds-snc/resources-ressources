<!-- Component View ================================================================================================-->

<template>
  <!-- Line above the link -->
  <!-- <div class="border-solid border-t border-gray-200 pt-12"> -->
  <!-- Locale Path: Using path -->
  <!-- <nuxt-link :to="localePath(`/topic/${topic.urlSlug}`)" class="flex justify-between hover:text-blue-800 font-medium text-lg"> -->

  <!-- Locale Path: Using name of the route (i18n.nuxtjs.org/basic-usage) -->
  <div class="pb-2" :class="topic.flag ? 'pt-0' : 'pt-5'">
    <div v-if="topic.flag" class="text-gray-700 text-sm">
      {{ topic.flag.value }}
    </div>

    <!-- <nuxt-link
      :to="
        localePath({
          name: 'topic-topic',
          params: { topic: topic.urlSlug, name: topic.name },
        })
      "
      class="group hover:text-blue-800 font-medium text-lg inline-block"
    >-->
    <nuxt-link
      :to="localePath(topic.path, topic.locale)"
      class="group text-blue-800 hover:text-blue-700 hover:underline hover:underline-offset-8 font-medium text-2xl inline-block h-11"
    >
      {{ topic.name }}
      <font-awesome-icon
        icon="arrow-right"
        size="lg"
        class="ml-4 text-lgs text-yellow-500 transform group-hover:translate-x-3 duration-200"
      ></font-awesome-icon>
    </nuxt-link>
  </div>
</template>

<!-- Component Logic ===============================================================================================-->

<script lang="ts">
export default {
  name: 'TopicLink',

  // Data -------------------------------------------------------------------------------------------------------------

  // Props ------------------------------------------------------------------------------------------------------------

  props: {
    topic: {
      name: String,
      urlSlug: String,
      flag: { value: String },
      path: String,
      locale: String,
    },
  },

  // Computed Properties ----------------------------------------------------------------------------------------------

  computed: {},
}
</script>
