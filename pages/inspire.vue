<template>
  <v-layout>
    <v-flex text-xs-center>
      <v-btn color="red" @click="googleLogin">Google</v-btn>
    </v-flex>
  </v-layout>
</template>

<script>
  import { mapActions } from 'vuex'

  const NOTIFICATION_GRANTED = 'granted'
  export default {
    methods: {
      ...mapActions(['saveFcmToken']),
      googleLogin() {
        const provider = new this.$fireAuthObj.GoogleAuthProvider()
        this.$fireAuth.signInWithPopup(provider)
      },
      async makeFcmToken() {
        const permission = await Notification.requestPermission()
        if(permission === NOTIFICATION_GRANTED) {
          const fcmToken = await this.$fireMess.getToken()
          if(fcmToken) {
            await this.saveFcmToken(fcmToken)
          }
        }
      },
    },
    async mounted() {
      if (this.$fireAuth.currentUser) {
        await this.makeFcmToken()
      }
      this.$fireMess.onMessage((a,b,c) => {
        console.log('a,b,c', a,b,c)
      })
    },
  }
</script>
