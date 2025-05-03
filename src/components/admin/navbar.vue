<template>
  <v-app class="scroll-y">
    <v-toolbar
      dark
      dense
      card
      fixed
      class="color-toolbar toolbar-nav"
      :class="{ 'collapse-toolbar': isCollapsed }"
      style="margin-top: 64px"
    >
      <div class="toolbar-button-container" pt-2 v-if="mini === false">
        <v-btn icon style="margin-left: 225px" @click.stop="drawerMini(true)">
          <v-icon class="pointer-color" style="color: #fff" @click.stop="drawerMini(true)"
            >chevron_left</v-icon
          >
        </v-btn>
      </div>
      <div class="toolbar-button-container" pt-2 v-else>
        <v-btn style="margin-left: 0px" icon flat @click.stop="drawerMini(false)">
          <v-icon
            class="pointer-color"
            style="color: #fff"
            @click.stop="drawerMini(false)"
            >chevron_right</v-icon
          >
        </v-btn>
      </div>
      <div class="toolbar-title">
        <h3 class="font mb-0">{{ nameCategory }}</h3>
      </div>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-navigation-drawer
      permanent
      v-model="drawer"
      app
      :mini-variant.sync="mini"
      clipped
      class="drawer-menu"
    >
      <div v-for="(itemMenu, k) in menu" :key="k">
        <v-list
          v-for="(itemCategory, i) in category"
          :key="i"
          v-if="
            itemCategory.menu_name_id === itemMenu.menu_name_id &&
            itemMenu.value === 'Yes'
          "
        >
          <v-expansion-panel class="headerErexpansion">
            <v-expansion-panel-content>
              <template v-slot:header>
                <v-list-tile>
                  <v-flex v-if="mini === true">
                    <v-list-tile-action @click="showmeta(itemCategory.menu_name)">
                      <img
                        class="imageSize-tab-true"
                        :src="pathIcon(itemCategory.icon)"
                        alt="fireSpot"
                      />
                    </v-list-tile-action>
                  </v-flex>
                  <v-layout v-else>
                    <v-flex xs3 md4>
                      <v-list-tile-action @click="showmeta(itemCategory.menu_name)">
                        <img
                          class="imageSize-tab-false"
                          :src="pathIcon(itemCategory.icon)"
                          alt="fireSpot"
                        />
                      </v-list-tile-action>
                    </v-flex>
                    <v-flex md7>
                      <v-list-tile-title @click="showmeta(itemCategory.menu_name)">
                        <span class="textCategory">{{ itemCategory.menu_name }}</span>
                      </v-list-tile-title>
                    </v-flex>
                  </v-layout>
                </v-list-tile>
              </template>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-list>
      </div>
    </v-navigation-drawer>

    <v-navigation-drawer
      permanent
      v-model="drawer"
      app
      :mini-variant.sync="mini"
      clipped
      class="drawer-menu"
    >
      <v-list
        dense
        class="pt-0 padd-10 pointer"
        v-for="(itemCategory, i) in menu_admin"
        :key="i"
      >
        <v-list-tile>
          <v-list-tile-action @click="showmeta(itemCategory.menu_name)">
            <img
              class="imageSize-tab-false"
              :src="pathIcon(itemCategory.icon)"
              alt="fireSpot"
            />
          </v-list-tile-action>

          <v-list-tile-content @click="showmeta(itemCategory.menu_name)">
            <v-list-tile-title class="textCategory">{{
              itemCategory.menu_name
            }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <v-content fluid fill-height class="pt-0" style="width: 100%">
      <div v-if="checkUrl('DatasetConfiguration')">
        <metadata />
      </div>
      <!-- <div v-if="checkUrl('TaskMonitoring')">
        <monitoring />
      </div> -->
      <div v-if="checkUrl('UserManagement')">
        <mgmtConsole />
      </div>
      <div v-if="checkUrl('PermissionManagement')">
        <permission />
      </div>
      <!-- <div v-if="checkUrl('SecretLevel')" id="refresh">
        <SecretLevel />
      </div> -->
      <div v-if="checkUrl('ConsentAgreement')">
        <ConsentAgreement />
      </div>
      <div v-if="checkUrl('GroupDatasetManagement')">
        <GroupReportsManagement />
      </div>
      <div v-if="checkUrl('APIConfiguration')">
        <APIConfiguration />
      </div>
      <div v-if="checkUrl('APIManagement')">
        <APIManagement />
      </div>

      <!-- <div v-if="checkUrl('addfile')">
        <AddFile />
      </div> -->
      <!-- <div v-if="checkUrl('WorkBench')">
        <workbench />
      </div> -->
      <!-- <div v-if="checkUrl('DataSource')">
        <DataSource />
      </div> -->
      <div v-if="checkUrl('GroupUserManagement')">
        <GroupUserManagement />
      </div>
      <div v-if="checkUrl('DatasetManagement')">
        <ReportsManagement />
      </div>
      <div v-if="checkUrl('DatasetPermissionMonitor')">
        <ReportPermissionMonitor />
      </div>
      <div v-if="checkUrl('Organization')">
        <Organization />
      </div>
      <div v-if="checkUrl('Category')">
        <Category />
      </div>
    </v-content>
  </v-app>
</template>

<script>
import { Decode } from "@/services";
import metadata from "@/components/admin/metadata/metadata";
import mgmtConsole from "@/components/admin/managementConsole";
import ConsentAgreement from "@/components/admin/ConsentAgreement";
// import monitoring from "@/components/admin/monitoring";
import mgmtPermission from "../admin/managementMenu/mgmtPermission";
import permission from "@/components/admin/permission";
// import SecretLevel from "@/components/admin/SecretLevel/SecretLevel";
import GroupReportsManagement from "@/components/admin/GroupReports/GroupReports";
import AddFile from "@/components/admin/metadata/AddFile";
import workbench from "@/components/admin/metadata/workbench";
import DataSource from "@/components/admin/DataSource/DataSource";
import GroupUserManagement from "@/components/admin/managementGroup/GroupUser";
import ReportsManagement from "@/components/admin/managementReports/Reports";
import ReportPermissionMonitor from "@/components/admin/managementReports/viewUserReport";
import Organization from "@/components/admin/Organization/Organization";
import Category from "@/components/admin/Category/Category";
import APIConfiguration from "@/components/admin/api/apiconf";
import APIManagement from "@/components/admin/api/apimgmt";
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

export default {
  components: {
    metadata,
    mgmtConsole,
    ConsentAgreement,
    // monitoring,
    mgmtPermission,
    permission,
    // SecretLevel,
    GroupReportsManagement,
    AddFile,
    workbench,
    DataSource,
    GroupUserManagement,
    ReportsManagement,
    ReportPermissionMonitor,
    Organization,
    Category,
    APIConfiguration,
    APIManagement,
  },
  data() {
    return {
      isCollapsed: false, // สถานะของ toolbar เมื่อเลื่อน
      lastScrollPosition: 0, // ตำแหน่งการเลื่อนครั้งสุดท้าย
      ticking: false, // ใช้เพื่อป้องกันการเรียก handleScroll หลายครั้ง
      searchField: [false, false],
      id: "",
      dataCatagory: [
        {},
        {
          id: 1,
          name: "APIConfiguration",
          text: "API Configurationt",
          icon: "apic.png",
        },
        // { id: 2, name: 'Consent Agreement', text: 'Consent Agreement', icon: 'setting.png'}
      ],
      hide: false,
      drawer: true,
      mini: true,
      checkPanel: [],
      category: [],
      nameCategory: null,
      dataSubCategory: null,
      refresh: 0,
      menu: [],
      menu_admin: [],
    };
  },
  mounted() {
    this.menu_permission();
    this.pathCategory();
    this.checkuser();
    this.getMenuName();
    this.getMenuPermission();
    this.setData();
    this.$store.dispatch("getDataSubCategory", this.id);
    window.addEventListener("scroll", this.onScroll);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.onScroll);
  },
  computed: {
    async fetchUserData({ commit }) {
      const userData = this._vm.userData();
      if (userData !== "No") {
        commit("SET_USER_DATA", userData);
      } else {
        console.error("Error: No user data found in cookies");
      }
    },
    dataProfile: {
      get() {
        return this.$store.getters.setDataProfile;
      },
    },
    idMenu: {
      get() {
        return this.$store.getters.navbarId;
      },
    },
  },
  watch: {
    idMenu(val) {
      this.refresh++;
    },
    panel(key) {
      if (
        this.panel !==
        [false, false, false, false, false, false, false, false, false, false]
      ) {
        this.getDataCategoryChange();
      } else {
        this.pathCategory();
      }
    },
  },
  methods: {
    handleScroll() {
      const currentScrollPosition = window.scrollY;

      // กำหนดเงื่อนไขการ collapsing
      if (
        currentScrollPosition > this.lastScrollPosition &&
        currentScrollPosition > 100
      ) {
        this.isCollapsed = true;
      } else if (currentScrollPosition < this.lastScrollPosition) {
        this.isCollapsed = false;
      }

      this.lastScrollPosition = currentScrollPosition;
      this.ticking = false;
    },
    onScroll() {
      if (!this.ticking) {
        window.requestAnimationFrame(() => this.handleScroll());
        this.ticking = true;
      }
    },
    checkuser() {
      if (this.userData === "No") {
        this.$router.push("/");
        this.reloadPage();
      }
    },
    getMenuName() {
      this.axios
        .post(process.env.VUE_APP_API_BACKEND + "/mgmt/menuName")
        .then((response) => {
          this.category = response.data;
          // console.log(response.data)
        });
    },
    // getMenuPermission() {
    //   this.axios
    //     .post(process.env.VUE_APP_API_BACKEND + "/mgmt/permission", {
    //       previlage_id: this.userData.previlage_id
    //     })
    //     .then(response => {
    //       this.menu = response.data;
    //       // this.GetmenuAdmin()

    //     });
    // },
    // Assume you have a method to get menu permissions

    getMenuPermission() {
      this.axios
        .post(process.env.VUE_APP_API_BACKEND + "/mgmt/permission", {
          previlage_id: this.userData.previlage_id,
          // previlage_id: "8"
        })
        .then((response) => {
          this.menu = response.data;
          // Store the menu in Vuex store or local state
          this.$store.commit("setMenu", this.menu);
        })
        .catch((error) => {
          console.error("Error fetching menu permissions:", error);
        });
    },
    GetmenuAdmin() {
      let menu_admin = [];
      let category_admin = [];

      category_admin = this.category;
      menu_admin = this.menu;
      for (var i = 0; i < menu_admin.length; i++) {
        if (category_admin[i].menu_name_id && menu_admin[i].value === "Yes") {
          this.menu_admin_yes.push(category_admin[i]);
        }
      }
    },
    showmeta(data) {
      // console.log(data);
      var data_name = data.split(" ");
      // let url = data_name[0] + data_name[1];
      // this.$router.push("/admin/" + url);
      // this.reloadPage();

      var url = data_name[0];
      for (var i = 0; i < data_name.length - 1; i++) {
        url = url + data_name[i + 1];
      }
      // console.log(url);
      this.$router.push("/admin/" + url);
      this.reloadPage();
    },
    checkUrl(url) {
      var param = window.location.href;
      var name = param.split("/admin/");
      if (url === name[1]) {
        return true;
      } else {
        return false;
      }
    },
    pathCategory() {
      var param = window.location.href;
      var name = param.split("/admin/");
      // console.log(name);
      var name1 = name[1].split(/(?=[A-Z])/);
      // console.log(name1);
      this.nameCategory = name1[0];
      for (var i = 0; i < name1.length - 1; i++) {
        this.nameCategory = this.nameCategory + " " + name1[i + 1];
      }

      // console.log(nameCategory);
    },
    labelSearch() {
      return `Search Within ${this.nameCategory}`;
    },
    sendSubCategory(key) {
      this.$refs.drawerMini.sendText(key);
      this.pathCategory();
    },
    setData() {
      this.refresh++;
      var category = d3
        .nest()
        .key((d) => d.category)
        .entries(this.data);
      for (var i = 0; i < category.length; i++) {
        var nest = d3
          .nest()
          .key((d) => d.title)
          .entries(this.data);
        this.dataSubCategory = nest;
      }
    },
    openLogin() {
      this.$refs.openLogin.open();
    },
    openRegister() {
      this.$refs.openRegister.opendialog();
    },
    // logout () {
    //   this.$cookies.remove('information', '/', process.env.DOMAIN)
    //   this.$cookies.remove('usertype', '/', process.env.DOMAIN)
    //   this.$store.commit('setDataProfile', false)
    //   this.$router.push('/')
    // },
    logout() {
      this.axios
        .post(process.env.VUE_APP_API_BACKEND + "/logout", {
          user_id: Encode.encode(this.userData.user_id),
        })
        .then((response) => {
          // //console.log(response.data.status)

          if (response.data.status === "success") {
            this.$swal("logout", "", "success").then((response) => {
              this.$cookies.remove("information", "/", process.env.DOMAIN);
              this.$cookies.remove("usertype", "/", process.env.DOMAIN);
              this.$store.commit("setDataProfile", false);
              localStorage.setItem("user_id", "");
              this.$router.push("/");
              this.reloadPage();
            });
          }
        });
    },

    pathIcon(icon) {
      return `/admin/${icon}`;
    },
    backToHome() {
      this.$router.push("/");
    },
    drawerMini(key) {
      this.mini = key;
      this.$refs.drawerMini.open(key);
    },
    show() {
      this.$router.show();
    },
    reloadPage() {
      window.location.reload();
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
<style media="screen" scoped="">
.color-toolbar.toolbar-nav {
  transition: transform 0.3s ease; /* เพิ่มการเปลี่ยนแปลงแบบ smooth ให้กับ toolbar */
  transform: translateY(0); /* เริ่มต้นที่ตำแหน่งปกติ */
}

.collapse-toolbar {
  transform: translateY(-100%); /* ซ่อน toolbar ขึ้นไปด้านบน */
}

>>> .v-expansion-panel__header:hover {
  background-color: #e0e0e0;
}

>>> .theme--dark.v-input:not(.v-input--is-disabled) input {
  color: #000 !important;
}

a {
  color: #000000 !important;
}

@media (min-width: 1445px) and (max-width: 6880px) {
  .imageSize-tab-true {
    width: 100%;
    height: auto;
    max-width: 40px;
    max-height: 40px;
    /* display: block; */
    margin: 0 auto;
  }

  .imageSize-tab-false {
    /* width: 100%; */
    /* height: auto; */
    max-width: 30px;
    max-height: 30px;
    /* display: block; */
    margin: 0 auto;
  }

  .headerErexpansion {
    padding-top: 0px;
    box-shadow: none;
  }

  .search-flex-false {
    width: 55%;
  }

  .search-flex-true {
    width: 64%;
  }

  .table-padd-true {
    padding: 5px 20px 50px 180px;
  }

  .table-padd-false {
    padding: 5px 80px 50px 80px;
  }

  .chevron-left-false {
    width: 13%;
  }

  .chevron-left-true {
    width: 3%;
  }

  .search-within {
    width: 420px;
    color: rgba(0, 0, 0, 0.54);
  }

  >>> .v-expansion-panel__header {
    padding: 0px 0px !important;
  }
}

@media (min-width: 750px) and (max-width: 2160px) {
  .imageSize-tab-true {
    width: 100%;
    height: 100%;
    max-width: 40px;
    max-height: 40px;
    /* display: block; */
    margin: 0 auto;
  }

  .imageSize-tab-false {
    width: 100%;
    height: 100%;
    max-width: 30px;
    max-height: 30px;
    /* display: block; */
    margin: 0 auto;
  }

  .headerErexpansion {
    padding-top: 0px;
    box-shadow: none;
  }

  .search-flex-false {
    width: 40%;
  }

  .search-flex-true {
    width: 56%;
  }

  .table-padd-true {
    padding: 5px 80px 50px 80px;
  }

  .table-padd-false {
    padding: 5px 50px 50px 50px;
  }

  .search-within {
    width: 420px;
    color: rgba(0, 0, 0, 0.54);
  }
}

@media (min-width: 550px) and (max-width: 790px) {
  .imageSize-tab-true {
    width: 100%;
    height: 100%;
    max-width: 30px;
    /* display: block; */
    margin: 0 auto;
  }

  .imageSize-tab-false {
    width: 100%;
    height: 100%;
    max-width: 30px;
    max-height: 30px;
  }

  .headerErexpansion {
    padding-top: 0px;
    box-shadow: none;
  }

  .search-flex-false {
    width: 25%;
  }

  .search-flex-true {
    width: 56%;
  }

  .table-padd-true {
    padding: 5px 80px 0 80px;
  }

  .table-padd-false {
    padding: 5px 50px 0 50px;
  }

  .search-within {
    width: 250px;
    color: rgba(0, 0, 0, 0.54);
  }
}

@media only screen and (max-width: 550px) {
  .imageSize-tab-true {
    width: 100%;
    height: 100%;
    max-width: 30px;
  }

  .imageSize-tab-false {
    width: 100%;
    height: 100%;
    max-width: 30px;
    max-height: 30px;
  }

  .headerErexpansion {
    /* padding-top: 40px; */
    box-shadow: none;
  }
}
.toolbar-nav {
  display: flex;
  align-items: left;
}

/* .toolbar-button-container {
  display: flex;
  align-items: center;
  margin-left: 16px;
} */

.toolbar-title {
  flex-grow: 1;
  text-align: left;
  font-size: 18px;
}
@media (max-width: 768px) {
  .toolbar-title h3 {
    font-size: 20px;
  }

  .toolbar-button-container {
    margin-left: 8px;
    margin-right: 8px;
  }

  .toolbar-nav {
    flex-direction: column;
  }

  .color-toolbar {
    height: auto;
    /* padding: 8px; */
  }
}
.drawer-menu {
  background-color: #fafafa;
  transform: translateY(114px) !important;
}

.highlight {
  /* background: #E0E0E0; */
  background: #b9d9eb !important;
}

.text-home {
  font-size: 14px;
  padding-left: 100px;
}

.pointer {
  cursor: pointer;
}

.zIndex99 {
  z-index: 99;
}

.imgDrawer {
  width: 29px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}

.fade-enter,
.fade-leave-to

/* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

aside.navigation-drawer.navigation-drawer--clipped.navigation-drawer--is-booted.navigation-drawer--open {
  padding-bottom: 40px !important;
}

.theme--light.v-expansion-panel
  .v-expansion-panel__container
  .v-expansion-panel__header
  .v-expansion-panel__header__icon
  .v-icon {
  margin-right: -10px;
}

.textCategory {
  font-size: 13px;
  /* padding: 5px; */
  /* position: fixed; */
  /* padding-top: 8px !important; */
}

.font {
  text-shadow: 0px 0px 15px rgba(17, 17, 17, 0.24) !important;
  /* color: #ffffff !important; */
  font-size: 30px;
  /* font-family: "THSarabun", Arial, "Arial Unicode MS", Helvetica, Sans-Serif; */
  font-weight: bold;
  font-style: normal;
}

.theme--light.v-expansion-panel .v-expansion-panel__container {
  border-top: none;
  background-color: #fafafa;
}

.theme--light.v-expansion-panel
  .v-expansion-panel__container
  .v-expansion-panel__header
  .v-expansion-panel__header__icon
  .v-icon {
  margin-right: 10px;
}

>>> .v-navigation-drawer__border {
  filter: blur(4px) !important;
}

/* >>>.v-expansion-panel__header {
      padding: 16px 8px!important;
    } */
.container {
  padding: 7px !important;
}

.color-toolbar {
  background-color: #1d6a96;
  height: 50px;
}

.v-list {
  padding: 0px !important;
}

>>> .v-content__wrap {
  padding-top: 90px !important;
}

.pointer-color {
  cursor: pointer;
}

>>> .theme--dark.v-label {
  color: #000000;
}

>>> .theme--dark.v-text-field--solo > .v-input__control > .v-input__slot {
  background: #ffffff;
}

>>> .v-text-field.v-text-field--solo .v-input__control {
  min-height: 43px;
}

>>> .theme--dark.v-icon {
  color: rgba(0, 0, 0, 0.54);
}

>>> .theme--dark.v-label {
  color: rgba(0, 0, 0, 0.54) !important;
}

.sub-style {
  padding: 10px 0 10px 100px;
}

div-span:hover {
  background-color: #e4e4e4;
  cursor: pointer;
}

>>> .theme--light.v-expansion-panel
  .v-expansion-panel__container
  .v-expansion-panel__header
  .v-expansion-panel__header__icon
  .v-icon {
  display: none;
}

.padd-10 {
  padding: 5px !important;
}

.padd-10:hover {
  background-color: #c0c0c0;
}
</style>
