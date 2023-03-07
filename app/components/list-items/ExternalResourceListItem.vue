<!-- Component View ================================================================================================-->

<template>
  <li
    class="h-36 border-t border-thin border-gray-300 flex flex-col justify-between p-4 border border-solid border-gray-200 rounded-lg cursor-pointer"
    @click="openResourceInNewTab(externalResource.url)"
  >
    <!-- Resource type & resource source -->
    <div>
      <small class="flex items-center text-sm text-gray-700">
        {{ externalResource.resourceType }}
        ⋅
        {{ externalResource.source }}
      </small>

      <!-- Resource title -->
      <h3 class="text-xl font-medium mb-2">{{ externalResource.title }}</h3>
    </div>

    <!-- Visit link -->
    <div class="group w-fit text-blue-900">
      <a
        :href="externalResource.url"
        target="_blank"
        class="text-lg font-medium group-hover:text-blue-700 group-hover:underline group-hover:underline-offset-4"
        @click.stop
      >
        {{ $t('read')}} {{ externalResource.definiteArticle }} {{ externalResource.resourceType.toLowerCase()
        }}<font-awesome-icon
          icon="arrow-right"
          class="ml-1.5 group-hover:text-blue-700 -rotate-45 z-0 group-hover:translate-x-1.5 group-hover:-translate-y-1.5 duration-200"
        >
        </font-awesome-icon>
      </a>
    </div>
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
export default class ExternalResourceListItem extends ExternalResourceListItemProps {
  // Data - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

  openResourceInNewTab(url: string) {
    window.open(url, '_blank')
  }
}
</script>
