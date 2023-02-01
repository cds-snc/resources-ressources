<!-- Component View ================================================================================================-->

<template>
  <div
    v-if="hasHeadings"
    class="border-y border-solid border-gray-300 sticky top-16 bg-white -mx-5 px-4"
    :class="{ 'shadow-xl': isShowPageContents }"
  >
    <!-- Container for label and chevron icons -->
    <!-- <div role="button"
      class="flex justify-between items-center py-3 cursor-pointer"
      @click="togglePageContents"
    >
      <h2 class="text-xl font-medium">Page contents</h2>

      <font-awesome-icon
        v-if="!isShowPageContents"
        icon="chevron-down"
        size="md"
      >
      </font-awesome-icon>
      <font-awesome-icon v-if="isShowPageContents" icon="chevron-up" size="md">
      </font-awesome-icon>
    </div> -->

    <!-- Page contents button -->

    <button class="py-3 cursor-pointer w-full" @click="togglePageContents">
      <div class="flex justify-between items-center">
        <span class="text-xl font-medium">Page contents</span>
        <!-- Chevron icons -->
        <font-awesome-icon
          v-if="!isShowPageContents"
          icon="chevron-down"
          size="md"
        >
        </font-awesome-icon>
        <font-awesome-icon
          v-if="isShowPageContents"
          icon="chevron-up"
          size="md"
        >
        </font-awesome-icon>
      </div>
    </button>

    <!-- List of page contents -->
    <nav v-if="isShowPageContents" class="h-fit">
      <ol>
        <li v-for="heading in headings" :key="heading.linkId" class="py-2.5">
          <a
            :href="'#' + heading.linkId"
            class="text-lg"
            @click="closePageContents"
            >{{ heading.linkName }}</a
          >
        </li>
      </ol>
    </nav>
  </div>
</template>

<!-- Component Logic ===============================================================================================-->

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

// Props - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

const PageContentProps = Vue.extend({
  props: {
    headings: {
      type: Array,
    },
  },
})

@Component
export default class PageContents extends PageContentProps {
  // Data - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

  isShowPageContents: boolean = false

  // Computed properties - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

  get hasHeadings(): boolean {
    return this.headings != null && this.headings?.length > 0
  }

  // Methods - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

  togglePageContents() {
    this.isShowPageContents = !this.isShowPageContents
  }

  closePageContents() {
    this.isShowPageContents = false
  }
}
</script>
