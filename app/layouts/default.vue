<template>
  <div class="flex flex-col min-h-screen">
    <Header />
    <main class="flex-grow">
      <!-- <Banner /> -->
      <!-- <BannerSearch :condensed="true" /> -->
      <div class="max-w-7xl mx-auto px-4">
        <Nuxt />
      </div>
    </main>
    <Footer />
  </div>
</template>
<script lang="ts">
export default {
  name: 'LayoutDefault',
}
</script>
