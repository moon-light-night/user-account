import Vue from 'vue'
import App from './App.vue'
import router from './router'
import dateFilter from '@/filters/date.filter.js'
import messagePlugin from '@/utils/message.plugin.js'
import store from './store'
import Vuelidate from 'vuelidate'
import firebase from 'firebase/app'
import './registerServiceWorker'
import 'materialize-css/dist/js/materialize.min'
import 'firebase/auth'
import 'firebase/database'

Vue.config.productionTip = false

firebase.initializeApp({
  apiKey: 'AIzaSyCvwTc-Bkx6VAVVpJnrFVWxmsoa9kYRS-g',
  authDomain: 'personal-user-account.firebaseapp.com',
  projectId: 'personal-user-account',
  storageBucket: 'personal-user-account.appspot.com',
  messagingSenderId: '763158020244',
  appId: '1:763158020244:web:f754b90b4aba1d420bb481',
  measurementId: 'G-W84KDPFYLE',
})

Vue.use(Vuelidate)
Vue.use(messagePlugin)

Vue.filter('date', dateFilter)

let app

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: (h) => h(App),
    }).$mount('#app')
  }
})
