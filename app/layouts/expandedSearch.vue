<template>
  <div class="flex flex-col min-h-screen scroll-p-36">
    <!-- <Banner /> -->
    <Header
      class="border-b border-solid border-gray-200 fixed top-0 w-full z-50"
    />
    <!-- <main class="flex-grow"> -->
    <main class="mt-56 md:mt-36">
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
