import Vue from 'vue';
import VueI18n from 'vue-i18n';
import store from './stores/store'; // นำเข้า store
import en from './locales/en.json';
import th from './locales/th.json';

Vue.use(VueI18n);

const messages = {
  en: en,
  th: th
};


const savedLanguage = localStorage.getItem('language') || 'en'; // ใช้ค่าภาษาที่เก็บไว้ใน localStorage หรือค่าเริ่มต้นเป็น 'en'

const i18n = new VueI18n({
  locale: savedLanguage, // ใช้ค่าภาษาจาก localStorage
  fallbackLocale: 'en',
  messages
});

store.watch(
  (state) => state.language,
  (newLanguage) => {
    i18n.locale = newLanguage;
  }
);

export default i18n;
