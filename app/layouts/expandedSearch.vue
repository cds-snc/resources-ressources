<template>
  <div class="flex flex-col min-h-screen">
    <!-- <Banner /> -->
    <Header class="border-b border-solid border-gray-100" />
    <!-- <main class="flex-grow"> -->
    <main>
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
