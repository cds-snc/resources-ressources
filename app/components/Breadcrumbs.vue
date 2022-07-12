<!-- Component View ================================================================================================-->

<template>
  <ol class="flex mt-4">
    <li>
      <nuxt-link
        :to="localePath(homePath, breadcrumbs.locale)"
        class="font-medium text-xl hover:text-blue-800 hover:underline"
      >
        {{ breadcrumbs.locale === 'en' ? 'Home' : 'Accueil' }}
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
      <!-- For dynamic path -->
      <!-- <nuxt-link
        :to="
          localePath({
            name: 'topic-topic',
            params: { topic: breadcrumb.urlSlug, name: breadcrumb.name },
          })
        "
        class="font-medium hover:text-blue-800 hover:underline"
      >-->

      <!-- For full static site -->
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
    <li class="text-xl text-gray-700">
      {{ currentPageTitle }}
    </li>
  </ol>
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
