<template>
  <!-- <footer class="bg-black"> -->
  <footer class="bg-gray-100">
    <div class="max-w-7xl mx-auto px-5">
      <div class="relative flex items-center justify-between h-16">
        <div>{{ $t('contact_us') }}</div>
        <img
          class="sm:block h-5 w-auto"
          src="~assets/goc--footer-logo.svg"
          alt="Government of Canada"
        />
      </div>
    </div>
  </footer>
</template>
<script lang="ts">
export default {
  name: 'Footer',
}
</script>
