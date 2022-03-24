<template>
  <a v-if="external" :href="to" :class="linkClass">
    <slot></slot>
  </a>
  <nuxt-link v-else :to="to" :class="linkClass"><slot /></nuxt-link>
</template>
<script>
export default {
  name: 'Link',
  props: {
    theme: {
      type: String,
      required: false,
      default: 'regular',
    },
    to: {
      type: String,
      required: true,
    },
    external: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  computed: {
    linkClass() {
      let colours = 'underline '
      if (this.theme === 'dark') {
        colours += 'text-white hover:text-gray-300 visited:text-indigo-200'
      } else {
        colours += 'text-cds-blue hover:text-blue-800 visited:text-purple-600'
      }
      return colours
    },
  },
}
</script>
