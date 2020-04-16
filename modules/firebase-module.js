import env from '../env/firebase'

export default {
  config: {
    apiKey: env.apiKey,
    authDomain: env.authDomain,
    databaseURL: env.databaseURL,
    projectId: env.projectId,
    storageBucket: env.storageBucket,
    messagingSenderId: env.messagingSenderId,
    appId: env.appId,
    measurementId: env.measurementId,
    fcmPublicVapidKey: env.fcmPublicVapidKey,
  },
  services: {
    auth: {
      initialize: {
        onAuthStateChangedAction: 'onAuthStateChanged', // vuex.actions
      },
    },
    firestore: true,
    // functions: true,
    // storage: true,
    // realtimeDb: true,
    messaging: {
      createServiceWorker: true,
    },
    performance: true,
    // analytics: true,
    // remoteConfig: true
  },
}
