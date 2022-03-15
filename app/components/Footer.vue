<template>
  <footer class="bg-black">
    <div class="max-w-7xl mx-auto">
      <div class="relative flex items-center justify-between h-16">
        <div class="text-white">{{ $t('contact_us') }}</div>
        <img
          class="sm:block h-5 w-auto"
          src="~assets/goc--footer-logo.svg"
          alt="Government of Canada"
        />
      </div>
    </div>
  </footer>
</template>
<script>
export default {
  name: 'Footer',
}
</script>
