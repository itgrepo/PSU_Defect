import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import { Encode, Decode } from '@/services'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    data: false,
    subCategory: [],
    informUser: {},
    statusLogin: '',
    dataCheck: {},
    status: '',
    idMenu: 1,
    reportid: '',
    category: [], // สำหรับเก็บชื่อเมนู
    menuPermissions: [], // สำหรับเก็บสิทธิ์การเข้าถึงเมนู
    menuNames: [], // สำหรับเก็บชื่อเมนู
    language: 'en',
  },
  getters: {
    setDataProfile(state) {
      return state.data
    },
    getDataSubCategory(state) {
      return state.subCategory
    },
    informUser(state) {
      return state.informUser
    },
    reportid(state) {
      return state.reportid
    },
    statusLogin(state) {
      return state.statusLogin
    },
    dataPolicy(state) {
      return state.dataCheck
    },
    statusPolicy(state) {
      return state.status
    },
    navbarId(state) {
      return state.idMenu
    },
    hasAccessToMenu: (state) => (menuName) => {
      const menu = state.menuPermissions.find(permission => permission.menu_name_id === menuName);
      return menu ? menu.value === 'Yes' : false;
    },
    menuPermissions: state => state.menuPermissions,
    getMenuCategory: state => state.menuNames,
    currentLanguage: (state) => state.language,
  },
  mutations: {
    setDataProfile(state, data) {
      state.data = data
    },
    getDataSubCategory(state, data) {
      state.subCategory = data
    },
    informUser(state, data) {
      state.informUser = data
    },
    reportid(state, data) {
      state.reportid = data
    },
    statusLogin(state, data) {
      state.statusLogin = data
    },
    statusPolicy(state, data) {
      state.status = data
    },
    dataPolicy(state, data) {
      state.dataCheck = data
    },
    navbarId(state, data) {
      state.idMenu = data
    },
    setMenuCategory(state, category) { // สำหรับชื่อเมนู
      state.category = category;
    },
    setMenuPermissions(state, permissions) {
      console.log("Setting menu permissions:", permissions);
      state.menuPermissions = permissions;
    },
    setMenuNames(state, menuNames) {
      console.log('Setting menu names:', menuNames);
      state.menuNames = menuNames;
    },
    setLanguage(state, lang) {
      state.language = lang;
    },
  },
  actions: {
    changeLanguage({ commit }, lang) {
      commit('setLanguage', lang);
    },
    getDataSubCategory({ commit }, id) {
      axios.post(`${process.env.VUE_APP_API_BACKEND}/getDataSubCategory`, {
        "category_id": id
      }).then((response) => {
        commit('getDataSubCategory', response.data)
      })
    },
    async getMenuPermission({ commit }) {
      console.log('Calling getMenuPermission');
      const user = JSON.parse(Decode.decode(Vue.prototype.$cookies.get('information')));
      console.log("user in", user.previlage_id);
      
      try {
        const response = await axios.post(`${process.env.VUE_APP_API_BACKEND}/mgmt/permission`, {
          previlage_id: user.previlage_id
        });
        console.log('Menu Permissions API Response:', response.data);
        commit('setMenuPermissions', response.data);
      } catch (error) {
        console.error("Error fetching menu permissions:", error);
      }
    },
    async getMenuName({ commit }) {
      console.log('Calling getMenuName');
      try {
        const response = await axios.post(`${process.env.VUE_APP_API_BACKEND}/mgmt/menuName`);
        console.log('Menu Names API Response:', response.data);
        commit('setMenuNames', response.data);
      } catch (error) {
        console.error("Error fetching menu names:", error);
      }
    }
  }
})
