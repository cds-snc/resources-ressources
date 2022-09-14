<template>
  <h2 class="text-4xl font-thin py-5 col-span-1">{{ headingText }}</h2>
</template>

<script>
export default {
  name: 'PageSectionHeading',

  // Props ------------------------------------------------------------------------------------------------------------

  props: {
    headingText: {
      type: String,
      required: true,
    },
  },
}
</script>
