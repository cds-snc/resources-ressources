<!-- Component View ================================================================================================-->

<template>
  <nav aria-label="Breadcrumbs">
    <ol class="flex flex-col md:flex-row mt-4">
      <li>
        <nuxt-link
          :to="localePath(homePath, breadcrumbs.locale)"
          class="font-medium text-xl hover:text-blue-800 hover:underline"
        >
          {{ $t('home') }}
        </nuxt-link>
        <font-awesome-icon
          icon="chevron-right"
          size="sm"
          class="mr-1.5"
        ></font-awesome-icon>
      </li>
      <li
        v-for="breadcrumb in breadcrumbs"
        :key="breadcrumb.name"
        class="whitespace-nowrap"
      >
        <nuxt-link
          :to="breadcrumb.path"
          class="font-medium text-xl hover:text-blue-800 hover:underline"
        >
          {{ breadcrumb.name }}
        </nuxt-link>
        <font-awesome-icon
          icon="chevron-right"
          size="sm"
          class="mr-1.5"
        ></font-awesome-icon>
      </li>
      <li class="text-xl text-gray-700" aria-current="page">
        {{ currentPageTitle }}
      </li>
    </ol>
  </nav>
</template>

<!-- Component Logic ===============================================================================================-->

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Breadcrumbs',

  // Props ------------------------------------------------------------------------------------------------------------

  props: {
    breadcrumbs: [],
    currentPageTitle: String,
  },

  // Computed Properties aka "Getters" --------------------------------------------------------------------------------

  computed: {
    homeBreadcrumb() {
      return this.breadcrumbs[0]
    },

    homePath() {
      return this.breadcrumbs.locale === 'en' ? '/' : '/fr'
    },

    remainingBreadcrumbs() {
      return this.breadcrumbs.slice(1)
    },
  },

  mounted() {
    console.log(this.breadcrumbs)
  },
}
</script>
