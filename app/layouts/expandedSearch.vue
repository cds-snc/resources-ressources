<template>
  <div class="flex flex-col min-h-screen">
    <!-- <Banner /> -->
    <Header />
    <main class="flex-grow">
      <div class="max-w-7xl mx-auto px-5">
        <Nuxt />
      </div>
    </main>
    <Footer />
  </div>
</template>
<script lang="ts">
export default {
  name: 'LayoutExpandedSearch',
}
</script>
