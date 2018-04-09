import Vuex from 'vuex'

import defaultState from './state/state'
import mutations from './mutation/mutation'
import getters from './getters/getters'
import actions from './actions/actions'

const isDev = process.env.NODE_ENV === 'development'

export default () => {
  const store = new Vuex.Store({
    strict: isDev, // 为true时会警告外部直接对$store上面的state进行操作， 只在开发环境可以设置
    state: defaultState,
    mutations,
    getters,
    actions,
    modules: {
      a: {
        namespaced: true,
        state: {
          text: 1
        },
        getters: {
          fiveText (state, getters, rootState) {
            console.log(rootState)
            return (new Array(5)).fill(state.text).join('') + rootState.b.text + rootState.count
          }
        },
        mutations: {
          updateText (state, text) {
            console.log(state)
            state.text = text
          }
        },
        actions: {
          addText ({state, commit, rootState}) {
            commit('updateText', rootState.count)
          },
          addCount ({state, commit, rootState}) {
            commit('updateCount', {num: 567}, {root: true}) // root使得可以调用到全局mutation， 但前提必须是在namespaced为true得情况
          }
        }
      },
      b: {
        state: {
          text: 123
        }
      }
    }
  })

  // 注册module
  store.registerModule('c', {
    state: {
      namespaced: true,
      textc: 520
    }
  })

  store.watch((state) => state.count, (newCount) => {
    console.log('This is state new count', newCount)
  })

  store.subscribe((mutations) => {
    console.log(mutations.type)
    console.log(mutations.payload)
  })

  store.subscribeAction((actions) => {
    console.log(actions.type)
    console.log(actions.payload)
  })

  if (module.hot) {
    module.hot.accept([
      './state/state',
      './mutation/mutation',
      './getters/getters',
      './actions/actions'
    ], () => {
      const newState = require('./state/state').default
      const newMutations = require('./mutation/mutation').default
      const newGetters = require('./getters/getters').default
      const newActions = require('./actions/actions').default

      store.hotUpdate({
        state: newState,
        mutations: newMutations,
        getters: newGetters,
        actions: newActions
      })
    })
  }

  return store
}
