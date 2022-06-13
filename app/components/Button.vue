<template>
  <button
    type="submit"
    :class="`${buttonClasses}flex items-center justify-center py-2 pl-4 pr-2 bg-${backgroundColor} text-${textColor}`"
  >
    <slot />
    <font-awesome-icon :class="`px-2 ${arrowStyle}`" :icon="`${arrowIcon}`" />
  </button>
</template>

<script lang="ts">
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
      default: '',
    },
    arrowColor: {
      type: String,
      required: false,
      default: '',
    },
  },
  data() {
    return {
      arrowIcon: 'arrow-right',
    }
  },
  computed: {
    buttonClasses() {
      if (this.bgColor === 'white') {
        return 'border border-black '
      }
      return ''
    },
    backgroundColor(): String {
      if (this.bgColor === '') {
        return 'black'
      }
      return this.bgColor
    },
    textColor(): String {
      if (this.color && this.color !== '') {
        return this.color
      } else if (
        this.bgColor === 'white' ||
        this.bgColor.startsWith('yellow')
      ) {
        return 'black'
      }
      return 'white'
    },

    arrowStyle(): String {
      if (this.arrowColor && this.arrowColor !== '') {
        return `text-${this.arrowColor}`
      } else if (
        this.backgroundColor === 'white' ||
        this.bgColor.startsWith('yellow')
      ) {
        return 'text-black'
      }
      return 'text-yellow-400'
    },
  },
}
</script>
