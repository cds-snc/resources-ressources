<template>
  <h1 class="text-4xl sm:text-5xl font-bold">{{ headingText }}</h1>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Heading1',

  props: {
    headingText: {
      type: String,
      required: true,
    },
  },
}
</script>
