<template>
  <div>
    <div class="bg-cyan-200 text-black font-bold p-4">
      {{ $t('welcome') }}
    </div>
    <Button label="Let's go" class="px-5 my-10" />
    <!--    <font-awesome-icon :icon="['fas', 'arrow-right']" />-->
    <!--    <font-awesome-icon icon="fas arrow-right" />-->
    <!--    <font-awesome-icon icon="fa-solid fa-arrow-rotate-right" />-->
    <!--    <font-awesome-icon :icon="['fas', 'fa-arrow-rotate-right']" />-->
    <NuxtWelcome />
  </div>
</template>
