<!-- Component View ================================================================================================-->

<template>
  <div
    class="p-5 rounded-2xl h-40 mb-4 hover:bg-gray-100 cursor-pointer drop-shadow-2xl"
    @click="navigateToResource()"
  >
    <!-- Resource type -->

    <p class="pb-1 font-medium text-gray-600">
      <small class="text-sm">SAMPLE</small>
    </p>

    <!-- Resource name / resource link -->

    <nuxt-link
      :to="localePath(`/resource/${resource.urlSlug}`)"
      class="text-lg font-medium hover:text-blue-700"
    >
      {{ resource.title }}
    </nuxt-link>

    <!-- Resource date -->

    <div class="font-light mt-1.5 text-gray-800">
      {{ $t('last_updated') }} {{ resource.dateAdded | formatDate }}
    </div>
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
    resource: { title: String, urlSlug: String, dateAdded: String },
  },

  // Methods ----------------------------------------------------------------------------------------------------------

  methods: {
    navigateToResource() {
      this.$router.push(this.localePath(`/resource/${this.resource.urlSlug}`))
    },
  },
}
</script>
