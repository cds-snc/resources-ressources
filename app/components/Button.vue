<template>
  <button type="submit" :class="`flex align-middle bg-${bgColor} text-${color}`">
    <slot/> <font-awesome-icon :class="`text-${arrowColor}`" icon="arrow-right"/>
  </button>
</template>

<script>

export default {
  name: 'Button',
  props: {
    bgColor: {
      type: String,
      required: false,
      default: 'black',
    },
    color: {
      type: String,
      required: false,
      default: 'white',
    },
    arrowColor: {
      type: String,
      required: false,
      default: 'yellow-400',
    }
  },
  data() {
      return {
      }
  }
}
</script>
