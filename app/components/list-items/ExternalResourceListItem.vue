<!-- Component View ================================================================================================-->

<template>
  <li>
    <a
      class="group h-36 flex p-5 rounded-3xl bg-gray-100 group cursor-pointer active:bg-indigo-600"
      :href="externalResource.url"
      target="_blank"
    >
      <div class="flex flex-col justify-between grow">
        <h3 class="text-xl font-medium mb-2 group-active:text-indigo-50">
          {{ externalResource.title }}
        </h3>

        <p>
          <small
            class="flex items-center text-sm text-gray-700 group-active:text-indigo-100"
          >
            {{ externalResource.resourceType }}
            ⋅
            {{ externalResource.source }}
          </small>
        </p>
      </div>

      <div class="flex-none w-14 text-end">
        <font-awesome-icon
          icon="arrow-right"
          size="3x"
          class="ml-1.5 text-gray-200 group-hover:text-cds-yellow -rotate-45 z-0 group-hover:translate-x-1 group-hover:-translate-y-1 duration-200"
          role="img"
          :aria-label="$t('external_link')"
        >
        </font-awesome-icon>
      </div>
    </a>
  </li>
</template>

<!-- Component Logic ===============================================================================================-->

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

/* Props */
const ExternalResourceListItemProps = Vue.extend({
  props: {
    externalResource: {
      required: true,
    },
  },
})

@Component
export default class ExternalResourceListItem extends ExternalResourceListItemProps {}
</script>
