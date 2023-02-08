<!-- Component View ================================================================================================-->

<template>
  <div
    v-if="hasHeadings"
    class="border-y border-solid border-gray-300 sticky top-16 -mx-5 bg-white text-gray-800"
    :class="{
      'shadow-xl': isShowPageContents,
      'rounded-b-2xl': isShowPageContents,
    }"
  >
    <!-- Page contents button -->

    <button
      aria-label="Expand page contents menu"
      class="py-3 px-5 cursor-pointer w-full hover:bg-gray-100 hover:text-black"
      @click="togglePageContents"
    >
      <div class="flex justify-between items-center">
        <!-- Button text -->
        <span class="text-xl font-medium">{{ $t('jump_to') }}</span>

        <!-- Button icons -->
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
    <nav v-if="isShowPageContents" class="h-fit px-5">
      <ol>
        <li v-for="heading in headings" :key="heading.linkId" class="py-3">
          <a
            :href="'#' + heading.linkId"
            class="text-lg text-blue-700 hover:text-blue-900 focus:bg-yellow-300 focus:text-black hover:underline hover:underline-offset-4"
            @click="closePageContents"
            >{{ heading.linkName }}</a
          >
        </li>
      </ol>
      <div class="flex justify-center mt-5 mb-3">
        <button
          class="border border-solid border-gray-200 rounded-full text-sm text-gray-700 hover:bg-gray-200 hover:text-black px-10"
          @click="closePageContents"
        >
          {{ $t('close') }}
        </button>
      </div>
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
      required: true,
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
