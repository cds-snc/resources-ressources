<template>
  <!-- Proof of concept banner -->
  <div class="bg-white">
    <div class="max-w-7xl mx-auto px-4">
      <div class="flex items-center justify-start flex-wrap py-1">
        <!-- <div class="bg-cds-blue text-white p-2 pl-4 pr-4 uppercase">
          {{ $t('proof_of_concept.title') }}
        </div> -->
        <div
          class="px-2 uppercase border border-cds-blue text-cds-blue font-bold"
        >
          {{ $t('proof_of_concept.title') }}
        </div>
        <p class="p-2 text-gray-700">
          {{ $t('proof_of_concept.in_progress') }}
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
// import Link from '~/components/Link.vue'

export default {
  components: {},
}
</script>
