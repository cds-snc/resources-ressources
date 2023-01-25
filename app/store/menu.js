import { LOCALES } from '~/utils/constants'
import { getTopLevelTopicsQuery } from '~/utils/queries'
import { getCurrentLocale } from '~/utils/getCurrentLocale'

const emptyObjWithLocales = () => {
  const localeTopics = {}
  LOCALES.forEach((locale) => {
    localeTopics[locale] = []
  })
  return localeTopics
}

export const state = () => ({
  topics: emptyObjWithLocales(),
  topicsLoaded: false,
})

export const getters = {
  getTopics(state, locale) {
    return state.topics[locale]
  },
}

export const mutations = {
  addTopic(state, { locale, topic }) {
    state.topics[locale].push(topic)
  },
  setTopicsLoaded(state) {
    state.topicsLoaded = true
  },
  reset(state) {
    state.topics = emptyObjWithLocales()
  },
}
export const actions = {
  clearTopics({ commit }) {
    commit('reset')
    commit('setTopicsLoaded', false)
  },
  async setTopics({ state, commit, dispatch }) {
    const preview = this.$preview && this.$preview.enabled
    let topicQuery = null

    const setMenuTopics = (result, locale) => {
      result.data.topicCollection.items.forEach((item) => {
        commit('addTopic', { locale, topic: item })
      })

      commit('setTopicsLoaded', true)
    }

    if (preview) {
      const currentLocale = getCurrentLocale(null, this.$i18n)
      dispatch('clearTopics')

      topicQuery = getTopLevelTopicsQuery(currentLocale, preview)

      await this.$contentfulPreviewApi
        .$post('', { query: topicQuery })
        .then((result) => {
          setMenuTopics(result, currentLocale)
        })
    } else if (!state.topicsLoaded) {
      const locales = Object.keys(state.topics)
      for (const locale of locales) {
        topicQuery = getTopLevelTopicsQuery(locale, preview)

        await this.$contentfulApi
          .$post('', { query: topicQuery })
          .then((result) => {
            setMenuTopics(result, locale)
          })
      }
    }
  },
}
