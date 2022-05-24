import {app} from '@storybook/vue3';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library, config } from '@fortawesome/fontawesome-svg-core'

import { faArrowRotateRight, faArrowRight } from '@fortawesome/free-solid-svg-icons'
library.add(faArrowRotateRight, faArrowRight)
config.autoAddCss = false
app.component('font-awesome-icon', FontAwesomeIcon);

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}