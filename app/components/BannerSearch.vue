<template>
  <div class=" bg-cds-yellow">
    <div class="max-w-7xl mx-auto px-4 py-2">
      <div class="flex justify-between">
        <h3 class="font-bold align-middle">{{ $t('learning_resources') }}</h3>
        <search v-if="condensed"/> 
      </div>
      <search v-if="!condensed"/>
      <div v-if="!condensed" class="whitespace-pre">{{$t('search_description')}}</div>
    </div>
  </div>
</template>
<script lang="ts">
import Search from '~/components/Search.vue'

export default {
  components: { 
    Search
  },
  props: {
    condensed: {
      type: Boolean,
      required: false,
      default: false
    },
  },
}
</script>
