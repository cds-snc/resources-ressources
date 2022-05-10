<template>
  <div class="bg-cds-yellow">
    <div class="max-w-7xl mx-auto px-4 py-2">
      <div class="flex justify-between">
        <h3 class="font-bold my-auto text-2xl">
          {{ $t('learning_resources') }}
        </h3>
        <search v-if="condensed" />
      </div>
      <search v-if="!condensed" class="my-4" />
      <div v-if="!condensed" class="clear-both whitespace-pre">
        {{ $t('search_description') }}
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Search from '~/components/Search.vue'

export default {
  name: 'BannerSearch',
  components: {
    Search,
  },
  props: {
    condensed: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
}
</script>
