<template>
  <h1 class="text-4xl sm:text-5xl font-bold">{{ titleText }}</h1>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Heading1',

  props: {
    titleText: {
      type: String,
      required: true,
    },
  },
}
</script>
