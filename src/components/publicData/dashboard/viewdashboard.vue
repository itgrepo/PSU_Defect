<template>
  <v-container class="viewDashboard">
    <v-layout row justify-center>
      <v-dialog v-model="loading" persistent fullscreen content-class="loading-dialog">
        <v-container fill-height>
          <v-layout row justify-center align-center>
            <v-progress-circular
              indeterminate
              :size="80"
              :width="10"
              color="#6ab9eB"
            ></v-progress-circular>
          </v-layout>
        </v-container>
      </v-dialog>
    </v-layout>
  </v-container>
</template>

<script>
var viz;
var optionsTableau;
import { Decode, Encode } from "@/services";
export default {
  data() {
    return {
      loading: false,
    };
  },
  mounted() {
    this.getDataCategory();
    this.checkuser();
  },
  created() {},
  computed: {
    userData() {
      if (this.$cookies.isKey("information")) {
        return JSON.parse(Decode.decode(this.$cookies.get("information")));
      } else {
        return "No";
      }
    },
    dataProfile: {
      get() {
        return this.$store.getters.setDataProfile;
      },
    },
  },
  watch: {
    loading(val) {
      if (!val) return;
      setTimeout(() => (this.loading = false), percentCompleted);
    },
  },
  methods: {
    checkuser() {
      if (this.userData === "No") {
        this.$router.push("/");
        this.reloadPage();
      }
    },
     getDataCategory() {
          var param = window.location.href;
          var name = param.split("/view/dashboard/");
          this.namesource = name[1];

          this.axios.post(process.env.VUE_APP_API_BACKEND + "/getLinkDashboard",{
                source_id: this.namesource,
              }).then((response) => {

              this.loading = true;
              let getDataCategory = response.data.Link_name;

              // console.log(response.data.Link_name);
              window.location.assign(getDataCategory);
              var checklinkdas = this.getDataCategory.split("://"); //เช็คว่ามี link Dashboard มั่ย
              if (checklinkdas[0] === "https") {
                this.autologinTableau(this.dataCatagory)
                this.loading = false
                this.viewDashboard(this.dataCatagory)
                window.location.assign(this.getDataCategory)
                window.location.assign(this.dataCatagory)
                this.link_dash = this.dataCatagory,
                console.log(this.dataCatagory)
              } else {
                this.$swal("No Dashbord", "", "warning").then((response) => {
                  this.$router.push("/");
                  this.reloadPage();
                });
              }
            });
        },
    // getDataCategory() {
    //   var param = window.location.href;
    //   var name = param.split("/view/dashboard/");
    //   this.namesource = name[1];

    //   this.axios
    //     .post(process.env.VUE_APP_API_BACKEND + "/getLinkDashboard", {
    //       source_id: this.namesource,
    //     })
    //     .then((response) => {
    //       this.loading = true;
    //       let getDataCategory = response.data.Link_name;
    //       console.log(getDataCategory);
    //       console.log(response.data.Link_name);

    //       if (getDataCategory.search("/views") != -1) {
    //         this.axios
    //           .post(process.env.VUE_APP_API_BACKEND + "/getLinkDashboardAutologin", {
    //             source_id: this.namesource,
    //           })
    //           .then((response) => {
    //             console.log(response);
    //             this.loading = true;
    //             this.dataCatagory = response.data.Link_name;
    //             console.log(response.data.Link_name);
    //             var checklinkdas = this.dataCatagory.split("://"); //เช็คว่ามี link Dashboard มั่ย

    //             if (checklinkdas[0] === "http" || checklinkdas[0] === "https") {
    //               // this.autologinTableau(this.dataCatagory)
    //               // this.viewDashboard(this.dataCatagory)
    //               // window.location.assign(this.dataCatagory)
    //               window.location.href(this.dataCatagory);
    //             } else {
    //               this.$swal("No Dashbord", "", "warning").then((response) => {
    //                 this.$router.push("/");
    //                 this.reloadPage();
    //               });
    //             }
    //           });
    //       } else if (getDataCategory.search("/view") != -1) {
    //         window.location.assign(getDataCategory);
    //       } else {
    //         this.$swal("No Dashbord", "", "warning").then((response) => {
    //           this.$router.push("/");
    //           this.reloadPage();
    //         });
    //       }
    //     });
    // },
  },
};
</script>
<style media="screen" scoped="">
.viewDashboard {
  height: 100% !important;
}

aside.drawer-menu.v-navigation-drawer.v-navigation-drawer--clipped.v-navigation-drawer--fixed.v-navigation-drawer--open.theme--light {
  height: 90% !important;
}

aside.drawer-menu.v-navigation-drawer.v-navigation-drawer--clipped.v-navigation-drawer--fixed.v-navigation-drawer--mini-variant.v-navigation-drawer--open.theme--light {
  width: 0px !important;
}

.expansion-width {
  width: 0 !important;
}

>>> .iframe-tableau {
  padding-left: 300px !important;
  padding-top: 40px !important;
}

>>> .iframe-tableau-else {
  padding-left: 100px !important;
  padding-top: 40px !important;
}

.nameCategory {
  margin-left: 10px;
  font-size: 15px;
}

div#resulter iframe {
  width: 100% !important;
  height: 89% !important;
  padding: 10px !important;
}

.textCategorycolortext {
  font-size: 15px;
  position: fixed;
  padding-top: 4px !important;
  color: #ccc;
}

>>> .theme--dark.v-input:not(.v-input--is-disabled) input {
  color: #000 !important;
}

@media (min-width: 1445px) and (max-width: 2340px) {
  .imageSize-tab-true {
    width: 100%;
    height: 100%;
    max-width: 30px;
    max-height: 30px;
    margin-right: 50px;
  }

  .imageSize-tab-false {
    width: 100%;
    height: 100%;
    max-width: 30px;
    max-height: 30px;
    margin-right: 18px;
  }

  .headerErexpansion {
    padding-top: 0px;
    box-shadow: none;
  }

  .search-flex-false {
    width: 50%;
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
    width: 20%;
  }

  .chevron-left-true {
    width: 3%;
  }

  .search-within {
    width: 420px;
    color: rgba(0, 0, 0, 0.54);
  }

  >>> .v-expansion-panel__header {
    padding: 8px 8px !important;
  }
}

@media (min-width: 750px) and (max-width: 1440px) {
  .imageSize-tab-true {
    width: 100%;
    height: 100%;
    max-width: 30px;
    max-height: 30px;
    margin-right: 50px;
  }

  .imageSize-tab-false {
    width: 100%;
    height: 100%;
    max-width: 30px;
    max-height: 30px;
    margin-right: 18px;
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

  >>> .v-expansion-panel__header {
    /* padding: 5px 24px!important; */
    padding: 5px 5px !important;
  }
}

@media (min-width: 550px) and (max-width: 790px) {
  .imageSize-tab-true {
    width: 100%;
    height: 100%;
    max-width: 30px;
    max-height: 30px;
    margin-right: 50px;
  }

  .imageSize-tab-false {
    width: 100%;
    height: 100%;
    max-width: 30px;
    max-height: 30px;
    margin-right: 18px;
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
    max-height: 30px;
    margin-right: 50px;
  }

  .imageSize-tab-false {
    width: 100%;
    height: 100%;
    max-width: 30px;
    max-height: 30px;
    margin-right: 20px;
  }

  .headerErexpansion {
    padding-top: 40px;
    box-shadow: none;
  }
}

.drawer-menu {
  background-color: #fafafa;
  transform: translateY(100px) !important;
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
  font-size: 15px;
  position: fixed;
  /* padding-top: 8px !important; */
}

.font {
  text-shadow: 0px 0px 15px rgba(17, 17, 17, 0.24) !important;
  /* color: #ffffff !important; */
  font-size: 24px;
  font-family: "THSarabun", Arial, "Arial Unicode MS", Helvetica, Sans-Serif;
  font-weight: bold;
  font-style: normal;
  margin-top: 5px;
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

.container {
  padding: 7px !important;
  max-width: 95%;
}

.color-toolbar {
  background-color: #00247d;
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

>>> .theme--dark.v-input:not(.v-input--is-disabled) input {
  color: #000000 !important;
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

.sub-style {
  padding: 10px 0 10px 10px;
}

div-span:hover {
  background-color: #e4e4e4;
  cursor: pointer;
}

.v-list__tile__title {
  margin: 5px 0px 5px 0px;
  height: 30px;
}

.v-btn {
  text-transform: none;
}

>>> .theme--dark.v-label {
  color: #000000 !important;
}
</style>
