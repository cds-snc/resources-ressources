<script setup>
import '@/assets/css/tailwind.css'

const version = 2 + 1
</script>
<template>
  <div class="bg-black">
    <NuxtLayout name="default">
    {{ $t('welcome') }}
    Hello Nuxt {{ version }}!

    <NuxtPage />
    </NuxtLayout>
  </div>
</template>
