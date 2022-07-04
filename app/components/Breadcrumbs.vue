<!-- Component View ================================================================================================-->

<template>
  <ol class="flex mt-4">
    <li>
      <nuxt-link :to="localePath({name: 'index'})" class="font-medium hover:text-blue-800 hover:underline">
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
        class="font-medium hover:text-blue-800 hover:underline"
      >
        {{ breadcrumb.name }}
      </nuxt-link>
      <font-awesome-icon
        icon="chevron-right"
        size="sm"
        class="mr-1.5"
      ></font-awesome-icon>
    </li>
    <li class="text-gray-600">
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

    remainingBreadcrumbs() {
      return this.breadcrumbs.slice(1)
    },
  },

  mounted() {
    console.log(this.breadcrumbs);
  },
}
</script>
