<!-- Component View ================================================================================================-->
<template>
  <div class="flex justify-center">
    <a
      id="skipToMain"
      class="-translate-y-full font-medium px-8 py-1 focus-visible:mt-2 rounded-full focus-visible:translate-y-0 focus-visible:bg-yellow-300 focus-visible:z-50 focus-visible:shadow-2xl absolute"
      :href="'#main-content'"
      tabindex="0"
    >
      Skip to content
      <span>
        <font-awesome-icon
          icon="fa-fast-forward"
          class="ml-2 text-blue-800"
        ></font-awesome-icon>
      </span>
    </a>
  </div>
</template>

<!-- Component Logic ===============================================================================================-->

<script lang="ts">
import Component from 'vue-class-component'
import Vue from 'vue'

@Component
export default class SkipToContentLink extends Vue.extend() {}
</script>
