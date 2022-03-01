<template>
  <div class="max-w-7xl mx-auto bg-cds-yellow my-2 sm:my-2 lg:my-2 p-2 sm:p-2 lg:p-2">
    <div class="flex justify-between">
      <h3 class="font-bold align-middle">{{ $t('learningResources') }}</h3>
      <search v-if="condensed"/> 
    </div>
    <search v-if="!condensed"/>
    <div v-if="!condensed" class="whitespace-pre">{{$t('searchDescription')}}</div>
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
