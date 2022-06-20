<template>
  <div class="flex flex-col min-h-screen">
    <Header />
    <div class="flex-grow">
      <Banner />
      <!-- <BannerSearch /> -->
      <div class="max-w-7xl mx-auto px-4">
        <Nuxt />
      </div>
    </div>
    <Footer />
  </div>
</template>
<script lang="ts">
export default {
  name: 'LayoutExpandedSearch',
}
</script>
