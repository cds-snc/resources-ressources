<!-- Component View ================================================================================================-->

<template>
  <div v-if="isEnabled">
    <slot></slot>
  </div>
</template>

<!-- Component Logic ===============================================================================================-->

<script>
import FeatureConfigUtil from '@/utils/featureConfigUtil.ts'

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Feature',

  props: {
    name: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      isEnabled: false,
    }
  },

  // Lifecycle Hooks - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

  created() {
    const envValue = this.$config.features[this.name]

    this.isEnabled = FeatureConfigUtil.getFeatureConfig(envValue)?.isEnabled
  },
}
</script>
