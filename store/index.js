const USER_COLLECTION = 'user'

export const state = () => {
  return {
    authUser: null,
    fcmToken: '',
  }
}

export const getters = {
  authUser(state) {
    return state.authUser
  },
  fcmToken(state) {
    return state.fcmToken
  },
}

export const mutations = {
  RESET_STORE(state) {
    state.authUser = null
  },
  SET_FCM_TOKEN(state, fcmToken) {
    state.fcmToken = fcmToken
  },
  SET_AUTH_USER(state, { authUser, claims }) {
    if(authUser) {
      const { uid, email } = authUser
      state.authUser = {
        uid: uid,
        email: email,
        customClaim: claims.custom_claim,
      }
    }
  },
}

export const actions = {
  onAuthStateChanged(context, { authUser, claims }) {
    if(authUser) {
      context.commit('SET_AUTH_USER', { authUser, claims })
    } else {
      context.commit('RESET_STORE')
    }
  },
  async saveFcmToken(context, fcmToken) {
    if(context.state.authUser) {
      const { uid, email } = context.state.authUser
      await this.$fireStore.
        collection(USER_COLLECTION).
        doc(uid).
        set({
          uid: uid,
          email: email,
          fcmToken: fcmToken,
          updatedAt: new Date(),
        })
      context.commit('SET_FCM_TOKEN', fcmToken)
    }
  },
}
