import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './stores/store'
import './registerServiceWorker'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueSweetAlert from 'vue-sweetalert'
import VueCookies from 'vue-cookies'
import HighCharts from 'v-highcharts'
import VuetifyDaterangePicker from "vuetify-daterange-picker";
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import '@mdi/font/css/materialdesignicons.css';
import i18n from './i18n';
// import JsonExcel from 'vue-json-excel'
// import JsonCSV from 'vue-json-csv'
//
// Vue.component('downloadCsv', JsonCSV)

// Vue.component('downloadExcel', JsonExcel)
Vue.config.productionTip = false
Vue.use(VueAxios, axios)
Vue.use(VueSweetAlert)
window.$ = window.jQuery = require('jquery')
Vue.use(VueCookies)
Vue.use(HighCharts)
Vue.use(VuetifyDaterangePicker);

new Vue({
  i18n,
  router,
  store,
  created() {
    this.$store.dispatch('fetchUserData', { /* your userData object here */ });
    this.$store.dispatch('getMenuPermission');
  },
  render: h => h(App)
}).$mount('#app')


// Defining userData method
Vue.prototype.userData = function() {
  if (this.$cookies.isKey("information")) {
      return JSON.parse(Decode.decode(this.$cookies.get("information")));
  } else {
      return "No";
  }
};