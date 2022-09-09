<!-- Component View ================================================================================================-->

<template>
  <div
    class="h-36 border border-gray-300 rounded-lg hover:bg-blue-50 hover:border-blue-50 cursor-pointer pt-5 px-5"
  >
    <nuxt-link
      :to="localePath(collection.path, collection.locale)"
      class="text-2xl font-medium text-blue-800 hover:text-blue-700 hover:underline w-full h-full inline-block"
    >
      {{ collection.name }}
    </nuxt-link>
  </div>
</template>

<!-- Component Logic ===============================================================================================-->

<script>
export default {
  name: 'CollectionListItem',

  // Props ------------------------------------------------------------------------------------------------------------

  props: {
    collection: {
      name: String,
      urlSlug: String,
      path: String,
      locale: String,
    },
  },
}
</script>
