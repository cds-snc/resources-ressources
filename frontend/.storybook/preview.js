// import { app } from '@storybook/vue3'

// app.component('font-awesome-icon', FontAwesomeIcon)

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}
