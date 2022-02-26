<template>
  <!-- Proof of concept banner -->
  <div class="bg-white">
    <div class="max-w-7xl mx-auto sm lg">
      <div class="flex items-center justify-start flex-wrap pt-4 pb-4">
          <div class="bg-cds-blue text-white p-2 pl-4 pr-4 uppercase">
            {{ $t('proofOfConcept.title') }}
          </div>
          <p class="p-2">{{ $t('proofOfConcept.in-progress') }} 
            <Link to="http://google.com" :external=true>{{ $t('proofOfConcept.help-improve') }}</Link></p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Link from '~/components/Link.vue'

export default {
  components: { 
    Link
  },
}
</script>
