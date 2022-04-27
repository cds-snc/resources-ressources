<template>
  <button type="submit" :class="`flex align-middle bg-${bgColor} text-${color}`">
    <slot/> <font-awesome-icon icon="arrow-right"/> [<Arrow/>]
  </button>
</template>

<script>

export default {
  name: 'Button',
  props: {
    item: {
      type: Object,
      required: false,
      default: () => {},
    },
    bgColor: {
      type: String,
      required: true,
      default: 'black',
    },
    color: {
      type: String,
      required: true,
      default: 'white',
    },
  },
  data() {
      return {
          elClass: `bg-white flex align-middle bg-${this.color}`
      }
  }
}
</script>
