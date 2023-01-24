<!-- Component View ================================================================================================-->

<template>
  <nuxt-link
    :to="localePath(resource.path, resource.locale)"
    class="text-2xl font-medium text-blue-800 underline hover:text-blue-700 inline-block py-5 hover:bg-gray-100 px-1.5 rounded-2xl cursor-pointer mb-4 w-fit -mx-2"
  >
    {{ resource.title }}
  </nuxt-link>
</template>

<!-- Component Logic ===============================================================================================-->

<script>
import dayjs from 'dayjs'

export default {
  name: 'ResourceListItem',

  // Filters ----------------------------------------------------------------------------------------------------------

  filters: {
    formatDate: function (dateString) {
      if (!dateString) return null

      return dayjs(dateString).format('DD-MM-YYYY')
    },
  },

  // Props ------------------------------------------------------------------------------------------------------------

  props: {
    resource: {
      title: String,
      urlSlug: String,
      dateAdded: String,
      path: String,
      locale: String,
    },
  },
}
</script>
