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
