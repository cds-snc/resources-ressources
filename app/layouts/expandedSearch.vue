<template>
  <div class="flex flex-col min-h-screen">
    <Header />
    <main class="flex-grow">
    <Banner/>
    <BannerSearch />
    <Nuxt />
    </main>
    <Footer />
  </div>
</template>
<script>
export default {
  name: 'LayoutExpandedSearch'
}
</script>