<template>
  <v-app id="app" class="athiti">
    <v-progress-linear v-if="isLoading" indeterminate color="primary"></v-progress-linear>
    
    <router-view class="router-view"></router-view>

    <div id="navi">
      <!-- Speed Dial Component -->
      <v-speed-dial v-model="fab" :top="top" :bottom="bottom" :right="right" :left="left" :direction="direction" :open-on-hover="hover" :transition="transition">
        <template v-slot:activator>
          <v-btn color="blue darken-2" dark fab>
            <v-icon v-if="fab">mdi-close</v-icon>
            <v-icon v-else>mdi-google-translate</v-icon>
          </v-btn>
        </template>

        <div v-for="menu in menus" :key="menu.icon">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark fab small :color="menu.color" v-bind="attrs" v-on="on" @click="changeLanguage(menu.lang)">
                <v-icon>{{ menu.icon }}</v-icon>
              </v-btn>
            </template>
            <span>{{ menu.name }}</span>
          </v-tooltip>
        </div>
      </v-speed-dial>
    </div>
  </v-app>
</template>


<script>
import '@/components/css/style.css'
import { mapActions } from 'vuex';
import { Encode, Decode } from '@/services'

export default {
  name: 'app',
  data() {
    return {
      showFooter: false, // เริ่มต้นให้ซ่อน footer ไว้ก่อน
      isLoading: false,
      menus: [
        { icon: 'mdi-abugida-thai', name: 'TH', lang: 'th', color: 'green' },
        { icon: 'mdi-alphabetical-variant', name: 'EN', lang: 'en', color: 'indigo' },
      ],
      fab: false,
      direction: 'top',
      fling: false,
      hover: false,
      top: false,
      right: true,
      bottom: true,
      left: false,
      transition: 'slide-y-reverse-transition',
      show: true,
    };
  },
  computed: {
    userData() {
      if (this.$cookies.isKey('information')) {
        return JSON.parse(Decode.decode(this.$cookies.get('information')))   
      } else {
        return ''
      }
    }
  },
  watch: {
    '$route'(to, from) {
      this.checkLoadingStatus();
    }
  },
  mounted() {
    this.getMenuPermission();
    this.getMenuName();
    window.addEventListener("scroll", this.checkScrollPosition); // ตรวจสอบการเลื่อนของผู้ใช้
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.checkScrollPosition); // ลบ event listener เมื่อออกจาก component
  },
  methods: {
    ...mapActions(['getMenuPermission', 'getMenuName','changeLanguage']),
    async changeLanguage(lang) {
  this.$store.dispatch('changeLanguage', lang); // เปลี่ยนภาษาใน Vuex store
  this.$i18n.locale = lang; // เปลี่ยนภาษาใน i18n
  localStorage.setItem('language', lang); // เก็บภาษาที่เลือกใน localStorage
  console.log(`Language changed to: ${lang}`);
},

checkScrollPosition() {
      // ตรวจสอบตำแหน่งการ scroll ของผู้ใช้
      const scrollPosition = window.innerHeight + window.scrollY;
      const bottom = document.body.offsetHeight;

      // หากเลื่อนมาถึงใกล้ล่างสุดให้แสดง footer
      if (scrollPosition >= bottom - 10) {
        this.showFooter = true;
      } else {
        this.showFooter = false;
      }
    },

    fetchUserData() {
      if (this.$cookies.isKey("information")) {
        return JSON.parse(Decode.decode(this.$cookies.get("information")));
      } else {
        return null;
      }
    },
  //   async changeLanguage(lang) {
  //   await this.$store.dispatch('changeLanguage', lang); // เปลี่ยนภาษาใน Vuex store
  //   this.$i18n.locale = lang; // เปลี่ยนภาษาใน i18n
  //   console.log(`Language changed to: ${lang}`);
  // },
    async fetchPermissions() {
      this.userData = this.fetchUserData();
      if (this.userData) {
        const previlageId = this.userData.previlage_id;
        await this.getMenuPermission(previlageId);
        await this.getMenuName();
      } else {
        console.error("User data is not available.");
      }
    },
    checkLoadingStatus() {
      this.isLoading = this.$router.app.$isLoading;
    },
    gotoPage(path) {
      this.$router.push(path);
    }
  },
  created() {
    if (this.userData && this.userData.previlage_id) {
      const previlageId = this.userData.previlage_id;
      this.$store.dispatch('getMenuPermission', previlageId);
    } else {
      console.error('previlageId is undefined');
    }
    this.fetchPermissions();
    this.checkLoadingStatus();
  }
}
</script>

<style lang="css">
#navi .v-speed-dial {
  position: fixed; /* เปลี่ยนเป็น fixed เพื่อให้อยู่กับที่ขณะเลื่อน */
  bottom: 20px;    /* ระยะห่างจากด้านล่าง */
  right: 20px;     /* ระยะห่างจากด้านขวา */
  z-index: 10;     /* กำหนดลำดับการแสดง */
}

#navi .v-btn--floating {
  position: relative;
}

html, body {
  margin: 0;
  padding: 0;
  height: 100%;
}

.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* ให้แน่ใจว่า container มีความสูงอย่างน้อย 100vh */
}

.router-view {
  flex: 1; /* ทำให้ router-view ขยายเต็มพื้นที่ที่เหลือ */
}
</style>
