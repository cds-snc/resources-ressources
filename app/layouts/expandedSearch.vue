<template>
  <div class="flex flex-col min-h-screen scroll-p-36">
    <SkipToContentLink></SkipToContentLink>
    <Banner />
    <Header
      class="border-b border-solid border-gray-200 sticky top-0 w-full z-50"
    />
    <main id="wb-cont" class="flex-grow">
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
