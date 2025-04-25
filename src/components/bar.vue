<template lang="html">
  <div>
    <v-app footer fixed>
      <!-- Navigation Drawer -->
      <v-navigation-drawer
  v-model="drawer"
  app
  temporary
  :clipped="$vuetify.breakpoint.mdAndDown"
  :class="{ 'drawer-open': drawer }"
>
  <v-layout column fill-height>
    <v-flex>
      <v-list dense>
        <v-list-item class="logo-item">
          <v-list-item-content class="logo-content">
            <img
              src="/opendataIcon/Data Lake logo_M.png"
              alt="Logo"
              class="logo-image"
              @click="goHome()"
            />
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>

        <v-list-item>
          <v-btn
            block
            text
            @click="goHome()"
            class="text-button"
          >
            {{ $t("home") }}
          </v-btn>
        </v-list-item>
        <v-divider></v-divider>

        <!-- <v-list-item>
          <v-btn
            block
            text
            @click="favorite()"
            class="text-button"
          >
            {{ $t("favorite") }}
          </v-btn>
        </v-list-item> -->
        <v-divider></v-divider>

        <!-- <v-list-item>
          <v-btn
          block
            text
            @click="contact()"
            class="text-button"
          >
            {{ $t("contact") }}
          </v-btn>
        </v-list-item> -->
        <v-divider></v-divider>

        <v-list-item v-if="userData !== ''">
          <v-btn
          block
            text
            @click="userprofile()"
            class="text-button"
          >
            {{ $t("userinfo") }}
          </v-btn>
        </v-list-item>
      </v-list>
    </v-flex>

    <v-spacer></v-spacer>

    <v-card flat tile class="pa-3">
      <v-btn block color="#10316B" dark @click="logout()" class="mt-5">
        {{ $t('logout') }}
      </v-btn>
    </v-card>
  </v-layout>
</v-navigation-drawer>

      <v-toolbar
  v-if="!$vuetify.breakpoint.mdAndDown"
  fixed
  elevate-on-scroll
  :class="{ elevate: isScrolled }"
  class="blink toolbar-transition toolbar-no-border"

>
    <v-toolbar-title @click="goHome()" class="toolbar-title">
      <img
        class="logotext"
        src="/opendataIcon/Data Lake logo_M.png"
        alt="fireSpot"
      />
    </v-toolbar-title>
    <v-toolbar-title @click="goHome()" class="toolbar-title-text">
      <h3 style="color: #015779" class="pr-5">DATA LAKE</h3>
    </v-toolbar-title>

    <v-toolbar-items class="centered-menu">
      <!-- <v-btn
        flat
        @click="goHome()"
        :class="{
          highlight: homeStatus,
          'hover-highlight': homeHover,
        }"
        color="#015779"
        @mouseenter="homeHover = true"
        @mouseleave="homeHover = false"
        class="hover-slide hover-orange btn-admin"
      >
        {{ $t("home") }}
        <span class="hover-text">{{ $t("home") }}</span>
      </v-btn> -->
      <!-- <v-btn
        flat
        @click="favorite()"
        :class="{
          highlight: favoriteStatus,
          'hover-highlight': favoriteHover,
        }"
        color="#015779"
        @mouseenter="favoriteHover = true"
        @mouseleave="favoriteHover = false"
        class="hover-slide hover-orange btn-admin"
      >
        {{ $t("favorite") }}
        <span class="hover-text">{{ $t("favorite") }}</span>
      </v-btn> -->
      <!-- <v-btn
        flat
        @click="contact()"
        :class="{ highlight: contactStatus }"
        color="#015779"
        @mouseenter="contactHover = true"
        @mouseleave="contactHover = false"
        class="hover-slide btn-admin"
      >
        {{ $t("contact") }}
        <span class="hover-text">{{ $t("contact") }}</span>
      </v-btn> -->
      <!-- <v-menu offset-y v-if="userData !== ''">
        <template v-slot:activator="{ on }">
          <v-btn
            flat
            v-on="on"
            :class="{
              highlight: accountStatus,
              'hover-highlight': accountHover,
            }"
            color="#015779"
            @mouseenter="accountHover = true"
            @mouseleave="accountHover = false"
            class="hover-slide hover-orange"
          >
            <i class="material-icons" color="white">account_circle</i>
            <b>{{ userData.firstname }} {{ userData.lastname }}</b>
          </v-btn>
        </template>

        <v-list>
          <v-list-tile
            style="height: 100%"
            class="pointer"
            @click="userprofile()"
          >
            <v-list-tile-action>
              <img class="menu-icon" src="/user.png" alt="fireSpot" />
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>
                <p class="text-users">{{ $t("userinfo") }}</p>
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>

        <v-list>
          <v-list-tile
            style="height: 100%"
            class="pointer"
            @click="logout()"
          >
            <v-list-tile-action>
              <img class="menu-icon" src="/exit.png" alt="fireSpot" />
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>
                <p class="text-users">{{ $t("logout") }}</p>
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-menu> -->

      <v-menu
        offset-y
        v-if="this.userData.previlage_id !== 3 && this.userData"
      >
        <template v-slot:activator="{ on }">
          <v-btn
            flat
            icon
            class="btn-admin hover-slide hover-orange"
            v-on="on"
            :class="{
              highlight: favoriteStatus,
              'hover-highlight': favoriteHover,
            }"
            color="#015779"
            @mouseenter="favoriteHover = true"
            @mouseleave="favoriteHover = false"
          >
            <img class="menu-icon" src="/admin.png" alt="fireSpot" />
          </v-btn>
        </template>
        <div v-for="item in menu_admin">
          <v-list>
            <v-list-tile
              style="height: 100%"
              @click="goAdmin(item.menu_name)"
            >
              <v-list-tile-action style="width: 22%">
                <img
                  class="menu-icon"
                  :src="pathIcon(item.icon)"
                  alt="fireSpot"
                />
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title
                  v-text="item.menu_name"
                ></v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </div>
      </v-menu>
    </v-toolbar-items>
  </v-toolbar>

      <!-- FAB Button to Open Navigation Drawer -->
      <v-btn
      small
        fab
        fixed
        top
        color="primary"
        @click="toggleDrawer"
        v-if="$vuetify.breakpoint.mdAndDown"
        :class="['fab-button', { 'fab-button-open': drawer }]"
        :style="{
          left: drawer ? 'auto' : '16px',
          right: drawer ? '16px' : 'auto',
        }"
      >
        <v-icon>{{ drawer ? "mdi-close" : "mdi-menu" }}</v-icon>
      </v-btn>
      <!-- <v-content style="padding: 0px">
        <router-view />
        <footerWeb />
      </v-content> -->
      <v-main>
        <router-view />
      </v-main>
      <!-- <v-footer >
        <footerWeb />
      </v-footer> -->
    </v-app>
    <opendataLogin ref="openLogin" />
    <opendataRegister ref="openRegister" />
    <!-- <userprofile ref="userprofile"/> -->
  </div>
</template>

<script>
import { Decode, Encode } from "@/services";
import footerWeb from "@/components/home/footer/footer";
import opendataLogin from "@/components/auth/login";
import opendataRegister from "@/components/auth/register";
import userprofile from "@/components/auth/userprofile";
import metadata from "@/components/admin/metadata/metadata";
import mgmtConsole from "@/components/admin/managementConsole";
import ConsentAgreement from "@/components/admin/ConsentAgreement";
export default {
  components: {
    opendataLogin,
    opendataRegister,
    footerWeb,
    userprofile,
    metadata,
    mgmtConsole,
    ConsentAgreement,
  },
  data() {
    return {
      isScrolled: false, // สถานะของการเลื่อน
      drawer: false,
      favoriteStatus: false, // Assuming you have this data property
      favoriteHover: false, // State to track hover status
      contactStatus: false,
      contactHover: false,
      accountStatus: false,
      accountHover: false,
      // category: [
      //   { id: 0, name: 'Metadata', text: 'Report Configuration', icon: 'folder.png' },
      //   { id: 1, name: 'Monitoring', text: 'Task Monitoring', icon: 'monitoring.png'},
      //   { id: 2, name: 'ManagementConsole', text: 'User Management', icon: 'setting.png' },
      //   { id: 3, name: 'Permission Management', text: 'Permission Management', icon: 'Permission.png'},
      //   { id: 4, name: 'Consent Agreement', text: 'Consent Agreement', icon: 'contract.png'},
      //   { id: 5, name: 'Data fields', text: 'Data fields', icon: 'contract.png'},
      // ],
      category: [],
      menu: [],
      aboutStatus: false,
      favoriteStatus: false,
      contactStatus: false,
      Widthipad: "",
      menu_admin: [],
    };
  },
  computed: {
    userData() {
      if (this.$cookies.isKey("information")) {
        return JSON.parse(Decode.decode(this.$cookies.get("information")));
      } else {
        return "";
      }
    },
    dataProfile: {
      get() {
        return this.$store.getters.setDataProfile;
      },
    },
  },
  created() {
    this.getUrl();
  },
  mounted() {
    this.getUrl();
    this.getMenuName();
    this.getMenuPermission();
    this.navipad();
    this.menu_permission();
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    handleScroll() {
      this.isScrolled = window.scrollY > 0; // ตรวจสอบตำแหน่งการเลื่อน
    },
    toggleDrawer() {
      this.drawer = !this.drawer;
    },
    navipad() {
      this.Widthipad = window.screen.availWidth;
    },
    getMenuName() {
      this.axios
        .post(process.env.VUE_APP_API_BACKEND + "/mgmt/menuName")
        .then((response) => {
          // //console.log(response.data);

          this.category = response.data;
        });
    },
    getMenuPermission() {
      this.axios
        .post(process.env.VUE_APP_API_BACKEND + "/mgmt/permission", {
          previlage_id: this.userData.previlage_id,
        })
        .then((response) => {
          this.menu = response.data;
          // this.GetmenuAdmin()
        });
    },
    GetmenuAdmin() {
      let menu_admin = [];
      let category_admin = [];
      category_admin = this.category;
      menu_admin = this.menu;
      for (var i = 0; i < menu_admin.length; i++) {
        if (
          category_admin[i].menu_name_id == menu_admin[i].menu_name_id &&
          menu_admin[i].value === "Yes"
        ) {
          this.menu_admin.push(category_admin[i]);
        }
      }
    },
    getUrl() {
      var param = window.location.href;
      var name = param.split("/home/");
      for (var i = 0; i < name.length; i++) {
        if (name[1] === "about") {
          this.aboutStatus = true;
          this.contactStatus = false;
          this.favoriteStatus = false;
        } else if (name[1] === "contact") {
          this.aboutStatus = false;
          this.contactStatus = true;
          this.favoriteStatus = false;
        } else if (name[1] === "favorite") {
          this.aboutStatus = false;
          this.contactStatus = false;
          this.favoriteStatus = true;
        } else {
          this.aboutStatus = false;
          this.contactStatus = false;
          this.favoriteStatus = false;
        }
      }
    },
    goAdmin(data) {
      var data_name = data.split(" ");
      var url = data_name[0];
      // let url = data_name[0] + data_name[1]
      // console.log(data_name.length);
      for (var i = 0; i < data_name.length - 1; i++) {
        url = url + data_name[i + 1];
      }
      // console.log(url);
      this.$router.push("/admin/" + url);
      this.reloadPage();
    },
    openLogin() {
      if (this.$cookies.get("consentfpo") === "no") {
        this.$swal(
          'กรุณากด "ยอมรับ" นโยบายการใช้คุกกี้ด้านล่างก่อน log-in',
          "",
          "warning"
        );
      } else {
        this.$refs.openLogin.open();
      }
    },
    userprofile() {
      // //console.log('dddddd')
      // this.$refs.userprofile.opendialog()
      this.$router.push(
        "/userprofile/" + this.userData.firstname + this.userData.lastname
      );
    },
    goToworkbench() {
      // //console.log('dddddd')
      // this.$refs.userprofile.opendialog()
      window.location.assign(
        "/workbench/" + this.userData.firstname + this.userData.lastname
      );
      // this.$router.push('/workbench/' + this.userData.firstname + this.userData.lastname).then(response=>{
      //   this.reloadPage()
      // })
    },
    openRegister() {
      this.$cookies.get("consentfpo");
      // //console.log(this.$cookies.get("consentfpo") )
      if (this.$cookies.get("consentfpo") === "no") {
        this.$swal(
          'กรุณากด "ยอมรับ" นโยบายการใช้คุกกี้ด้านล่างก่อน sign up',
          "",
          "warning"
        );
      } else {
        this.$refs.openRegister.opendialog();
      }
    },

    logout() {
      this.axios
        .post(process.env.VUE_APP_API_BACKEND + "/logout", {
          user_id: Encode.encode(this.userData.user_id),
        })
        .then((response) => {
          console.log(this.userData);
          if (response.data.status === "success") {
            // Show logout success message
            this.$swal("Logout", "", "success").then(() => {
              // Check usertype and perform additional actions if needed
              if (this.userData && this.userData.type_user === "AD") {
                // Redirect to end-session endpoint for AD users
                this.$cookies.remove("information", "/", process.env.DOMAIN);
                this.$cookies.remove("usertype", "/", process.env.DOMAIN);
                localStorage.setItem("user_id", "");
                this.$store.commit("setDataProfile", false);
                window.location.href =
                  "https://psusso.psu.ac.th:8443/application/o/diis-datalake/end-session/";
              } else {
                // Remove cookies and local storage
                this.$cookies.remove("information", "/", process.env.DOMAIN);
                this.$cookies.remove("usertype", "/", process.env.DOMAIN);
                localStorage.setItem("user_id", "");
                this.$store.commit("setDataProfile", false);
                // Redirect to home page
                this.$router.push("/");
                this.reloadPage();
              }
            });
          } else {
            // Handle logout failure
            this.$swal(
              "Logout",
              "Failed to logout. Please try again.",
              "error"
            );
          }
        })
        .catch((error) => {
          console.error("Logout error:", error);
          this.$swal("Logout", "Failed to logout. Please try again.", "error");
        });
    },

    // logout() {
    //   this.axios.post(process.env.VUE_APP_API_BACKEND + '/logout', {
    //     "user_id": Encode.encode(this.userData.user_id)
    //   }).then((response) => {
    //     // //console.log(response.data.status)
    //     if (response.data.status === 'success') {
    //       this.$swal('logout', '', 'success').then((response) => {
    //         this.$cookies.remove('information', '/', process.env.DOMAIN)
    //         this.$cookies.remove('usertype', '/', process.env.DOMAIN)
    //         localStorage.setItem("user_id", '')
    //         this.$store.commit('setDataProfile', false)
    //         this.$router.push('/')
    //         this.reloadPage()
    //       })
    //     }
    //   })
    // },
    goHome() {
      window.location.href = "https://lake.psu.ac.th";
      // this.$router.push(`/`);
      // this.getUrl();
    },
    // about() {
    //   this.$router.push("/home/about");
    //   this.getUrl();
    // },
    // favorite() {
    //   this.$router.push("/home/favorite");
    //   this.getUrl();
    // },
    // contact() {
    //   this.$router.push("/home/contact");
    //   this.getUrl();
    // },
    reloadPage() {
      window.location.reload();
    },
    pathIcon(icon) {
      return `/admin/${icon}`;
    },
    menu_permission() {
      // var user = Encode.encode(JSON.stringify(this.userData));
      this.axios
        .post(process.env.VUE_APP_API_BACKEND + "/getMenuByPermission", {
          // user : user
        })
        .then((response) => {
          // console.log(response);
          this.menu_admin = response.data;
        });
    },
  },
};
</script>

<style lang="css" scoped="">
.v-toolbar--fixed {
  transition: background-color 0.3s ease; /* เพิ่มการเปลี่ยนสีที่นุ่มนวล */
}

.v-toolbar--fixed.elevate {
  background-color: white; /* กำหนดสีพื้นหลังเป็นสีขาวเมื่อเลื่อน */
}

.v-toolbar--fixed:not(.elevate) {
  /* background-color: transparent; กำหนดสีพื้นหลังเป็นโปร่งใสเมื่อไม่เลื่อน */
  background-color: white;
}

.text-button {
  border: none !important; /* ลบกรอบปุ่ม */
  background: none !important; /* ลบพื้นหลัง */
  box-shadow: none !important; /* ลบเงา */
  color: #000 !important; /* สีข้อความ */
  text-transform: none !important; /* ไม่มีการเปลี่ยนข้อความเป็นตัวพิมพ์ใหญ่ */
  padding: 20px 20px !important; /* ปรับช่องว่างภายใน */
  border-radius: 20px 0 0 20px !important; /* มุมมนที่ด้านขวา */
}

.text-button:hover {
  background: #4093ff !important; /* สีพื้นหลังเมื่อ hover */
  color: #f1fbff !important; /* เปลี่ยนสีข้อความเมื่อ hover */
  border-radius: 20px 0 0 20px !important; /* ทำให้มุมมนที่ด้านขวาเหมือนเดิม */
  padding: 20px 20px !important; /* ปรับช่องว่างภายในให้เหมาะสม */
}

.logo-item {
  display: flex;
  justify-content: center; /* Centers horizontally */
  align-items: center; /* Centers vertically */
  padding: 16px; /* Adjust padding as needed */
}

.logo-content {
  text-align: center;

}

.logo-image {
  max-width: 30%;
  height: auto;
}

.v-list-item {
  margin: 0;
  padding: 0;
}

.v-list-item:not(:last-child) {
  margin-bottom: 8px; /* Adjust spacing between items as needed */
}

.v-divider {
  margin: 0;
  padding: 0;
}
.fab-button {
  position: fixed;
  top: 16px; /* Adjust as needed */
  left: 16px; /* Adjust as needed */
  z-index: 1000; /* Ensure it's above other elements */
}

.navigation-drawer {
  transition: transform 0.3s ease;
}
.highlight {
  background-color: #015779;
  color: white;
}

/* Custom animation for slide effect */
.hover-slide {
  transition: transform 0.3s ease; /* Add transition property for smooth animation */
  position: relative; /* Set position to relative for absolute positioning of hover text */
}

.hover-slide:hover {
  transform: translateY(-5px); /* Move the button 5px up when hovered */
}

/* Styling for the hover text */
.hover-text {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  opacity: 0;
  transition: opacity 0.3s ease; /* Add transition property for smooth opacity change */
}

.hover-slide:hover .hover-text {
  opacity: 0.7; /* Set opacity to reveal text when hovered */
}

/* Custom animation for background color */
.hover-slide::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: transparent;
  z-index: -1;
  transition: background-color 0.3s ease; /* Add transition for background color */
}

.hover-slide:hover::before {
  background-color: rgb(0, 110, 255); /* Change background color on hover */
}

.blink {
  background-color: rgba(255, 255, 255, 0.4);
  color: #333;
  height: 64px;
  font-size: 18px;
  padding: 0 24px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.26);
}

.text-users {
  font-size: 14px;
  font-weight: bold;
}

.company-name {
  margin-bottom: 0px;
  font-size: 30px;
  font-weight: 500;
  color: #0165ba;
}

.pointer {
  cursor: pointer;
}

.logotext {
  cursor: pointer;
  max-width: 50px;
  width: 100%;
  height: auto;
}

.logoname {
  cursor: pointer;
  max-width: 140px;
  width: 100%;
  height: auto;
}

.footerbar {
  margin-top: 2px !important;
  height: 100%;
}

.menu-icon {
  max-width: 30px;
  width: 100%;
  height: auto;
}

.highlight {
  background: #b9d9eb !important;
}

.btn-admin {
  display: block;
}

@media (max-width: 1024px) {
  /* .btn-admin {
    display: none;
  } */

  .toolbar-title,
  .toolbar-btn {
    font-size: 14px; /* Adjust font size for smaller screens */
  }
}

@media (max-width: 768px) {
  /* .btn-admin {
    display: none;
  } */

  .company-name {
    font-size: 12px;
  }

  .logotext {
    max-width: 50px;
  }

  .logoname {
    max-width: 50px;
  }

  .toolbar-title,
  .toolbar-btn {
    font-size: 12px; /* Adjust font size for smaller screens */
  }

  .toolbar-title-text {
    font-size: 14px; /* Adjust font size for smaller screens */
  }
}

@media (max-width: 430px) {
  .toolbar-title-text {
    display: none; /* Hide the text when screen width is less than 430px */
  }

  .toolbar-title img {
    max-width: 50px; /* Adjust logo size for smaller screens */
  }
}

@media (max-width: 1194px) {
  .btn-admin {
    /* display: none; */
    width: 30px;
  }

  .toolbar-title,
  .toolbar-btn {
    font-size: 16px; /* Adjust font size for smaller screens */
  }
}
.toolbar-no-border {
    border: none;
    box-shadow: none;
  }

  /* จัดตำแหน่งเมนูให้อยู่ตรงกลาง */
  .centered-toolbar {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
  }

  /* จัดเมนูภายใน toolbar ให้อยู่ตรงกลาง */
  .centered-menu {
    display: flex;
    justify-content: end;
    width: 100%;
  }
</style>
