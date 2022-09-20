import { CONTENTFUL_CDA_BASE_URL } from '~/utils/constants'
import { getTopLevelTopicsQuery } from '~/utils/queries'
const axios = require('axios')
const config = require('../.contentful.json')

export const state = () => ({
  topics_English: [],
  topics_French: [],
})

export const getters = {
  getTopics_French(state) {
    return state.topics_French
  },

  getTopics_English(state) {
    return state.topics_English
  },
}

export const mutations = {
  ADD_TOPIC_ENGLISH(state, topic) {
    state.topics_English.push(topic)
  },

  ADD_TOPIC_FRENCH(state, topic) {
    state.topics_French.push(topic)
  },
}

export const actions = {
  async nuxtServerInit({ state, commit }) {
    // Locales
    const localeEN = 'en-CA'
    const localeFR = 'fr-CA'
    const locales = [localeEN, localeFR]

    const spaceId = config.CTF_SPACE_ID || process.env.contentful_space_id
    const accessToken =
      config.CTF_CDA_ACCESS_TOKEN || process.env.contentful_cda_access_token

    const apiURL = `${CONTENTFUL_CDA_BASE_URL}${spaceId}`

    const axiosConfig = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }

    if (state.topics_English.length < 1) {
      for (const locale of locales) {
        const topicQuery =
          locale === localeEN
            ? getTopLevelTopicsQuery(localeEN)
            : getTopLevelTopicsQuery(localeFR)

        await axios
          .post(apiURL, { query: topicQuery }, axiosConfig)
          .then((res) => {
            res.data.data.topicCollection.items.forEach((item) => {
              if (locale === localeEN) commit('ADD_TOPIC_ENGLISH', item)
              else commit('ADD_TOPIC_FRENCH', item)
            })
          })
      }
    }
  },
}
