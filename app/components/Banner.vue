<template>
  <!-- Proof of concept banner -->
  <div class="bg-white">
    <div class="max-w-7xl mx-auto px-4">
      <div class="flex items-center justify-start flex-wrap pt-4 pb-4">
          <div class="bg-cds-blue text-white p-2 pl-4 pr-4 uppercase">
            {{ $t('proof_of_concept.title') }}
          </div>
          <p class="p-2">{{ $t('proof_of_concept.in_progress') }} 
            <Link to="http://google.com" :external=true>{{ $t('proof_of_concept.help_improve') }}</Link></p>
      </div>
    </div>
  </div>
</template>

<script>
import Link from '~/components/Link.vue'

export default {
  components: { 
    Link
  },
}
</script>
