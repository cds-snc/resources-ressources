<!-- Component View ================================================================================================-->

<template>
  <div
    class="py-5 px-1.5 rounded-2xl mb-4 hover:bg-gray-100 cursor-pointer drop-shadow-2xl -mx-2"
    style="width: fit-content"
    @click="navigateToResource()">
    <nuxt-link
      :to="localePath(resource.path, resource.locale)"
      class="text-2xl font-medium text-blue-800 underline hover:text-blue-700">
      {{ resource.title }}
    </nuxt-link>
  </div>
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

  // Methods ----------------------------------------------------------------------------------------------------------

  methods: {
    navigateToResource() {
      this.$router.push(
        this.localePath(this.resource.path, this.resource.locale)
      )
    },
  },
}
</script>
