<template>
  <div class="border-2 border-black w-96 hover:bg-sky-700">
    <nuxt-link :to="localePath(`/${contentType}/${itemInfo.id}`)">
    <div class="p-4">
      <p class="font-bold uppercase pt-2 pb-2">
        {{itemInfo.name}}
      </p>
      <p v-if="itemInfo.description" class="italic text-xs pt-2 pb-2">
        {{itemInfo.description}}
      </p>
    </div>
    <div v-if="itemInfo.colour" :style="`background-color: ${itemInfo.colour}`" class="min-h-2 h-1"></div>
    </nuxt-link>
  </div>
</template>
<script>
export default ({
  name: 'Box',
  props: {
    item: {
      type: Object,
      required: false,
      default: () => {}
    },
    contentType: {
      type: String,
      required: true,
      default: ''
    }
  },
  computed: {
    itemInfo() {
      console.log(this.item, this.item.fields)

      let itemInfo = {}
      if(this.item.fields !== undefined) {
        itemInfo = {...this.item.fields}
      } else {
        itemInfo = {...this.item}
      }

      return itemInfo
    }
  }
})
</script>
