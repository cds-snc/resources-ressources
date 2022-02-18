<template>
  <div class="border-2 border-black w-96 hover:bg-sky-700">
    <nuxt-link :to="localePath(`/${contentType}/${item.fields.id}`)">
    <div class="p-4">
      <p class="font-bold uppercase pt-2 pb-2">
        {{item.fields.name}}
      </p>
      <p v-if="item.fields.description" class="italic text-xs pt-2 pb-2">
        {{item.fields.description}}
      </p>
    </div>
    <div v-if="item.fields.colour" :style="`background-color: ${item.fields.colour}`" class="min-h-2 h-1"></div>
    </nuxt-link>
  </div>
</template>
<script lang="ts">
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
  }
})
</script>
