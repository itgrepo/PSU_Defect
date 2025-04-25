<template>
  <v-app class="scroll-y">
    <v-toolbar dark dense card fixed class="color-toolbar toolbar-nav">
      <div class="" pt-2 v-if="mini === false">
        <v-btn style="margin-left: 255px" icon @click.stop="drawerMini(true)">
          <v-icon class="pointer-color" style="color: #fff" @click.stop="drawerMini(true)">chevron_left</v-icon>
        </v-btn>
      </div>
      <div class="chevron-left-true" pt-2 v-else>
        <v-btn style="margin-right: 30px" icon flat @click.stop="drawerMini(false)">
          <v-icon class="pointer-color" style="color: #fff" @click.stop="drawerMini(false)">chevron_right</v-icon>
        </v-btn>
      </div>
      <div class="toolbar-title">
        <h3 class="font mb-0 ml-2">{{ nameCategory }}</h3>
      </div>
      <v-spacer></v-spacer>
      <div>
        <v-text-field class="search-within pt-2" append-icon="search" v-model="search" @keyup="searchDataTable()"
          :label="labelSearch()" solo></v-text-field>
      </div>

    </v-toolbar>
    <v-navigation-drawer v-model="drawer":width="$vuetify.breakpoint.smAndDown ? 345 : 345" app :mini-variant.sync="mini" clipped class="drawer-menu" permanent
      @click.stop="drawer = !drawer">

      <v-list dense>
        <v-expansion-panel expand v-model="panel" class="headerErexpansion">
          <v-expansion-panel-content v-for="(itemCategory, i) in category" :key="i" :class="{ highlight: panel[i] == true }"
            @click="toPathSource(itemCategory.name)">
            <template v-slot:header>
              <v-list-tile @click="toPathSource(itemCategory.name)">
                <v-layout v-if="mini === true">
                  <v-list-tile-action @click="toPathSource(itemCategory.name)">
                    <!-- <img class="imageSize-tab-true" :src="pathIcon(itemCategory.icon)" alt="fireSpot" -->
                    <img class="imageSize-tab-true" :src="`data:data:service_image/png;base64,${itemCategory.images}`"
                      alt="fireSpot" slot="activator" />
                  </v-list-tile-action>
                </v-layout>
                <v-layout v-else>
                  <v-flex xs3 sm3 md3>
                    <v-list-tile-action @click="toPathSource(itemCategory.name)">
                      <!-- <img class="imageSize-tab-false" :src="pathIcon(itemCategory.icon)" alt="fireSpot" /> -->
                      <img class="imageSize-tab-false"
                        :src="`data:data:service_image/png;base64,${itemCategory.images}`" alt="fireSpot" />
                    </v-list-tile-action>
                  </v-flex>
                  <v-flex sm9 md9 class="text-category">
                    <v-list-tile-title slot="activator" class="textCategorycolortext"
                      @click="toPathSource(itemCategory.name)">
                      {{ itemCategory.name }}
                    </v-list-tile-title>
                  </v-flex>
                </v-layout>
              </v-list-tile>
            </template>

            <v-list  v-if="!mini" :style="{ 'background': hoverBackground }" @click="toPathSource(itemCategory.name)">
  <v-layout row wrap v-for="(itemSubCategory, index) in dataCatagory" :key="itemSubCategory.category_id">
    <div v-if="itemSubCategory.category_id === itemCategory.category_id" style="width: 100%">
      <v-btn flat :href="test(index)" class="hover-background">
        <v-list-tile-content>
          <v-list-tile-title class="sub-style" @click="sendSubCategory(itemSubCategory)">
            <v-layout align-center>
              <v-list-tile-action>
                <img class="imageSize-tab-false"
                  :src="`data:data:service_image/png;base64,${itemSubCategory.images}`" alt="fireSpot" />
              </v-list-tile-action>
              <v-flex class="textsubCategory">
                <v-list-tile-title slot="activator">
                  {{ itemSubCategory.sub_category_name }}
                </v-list-tile-title>
              </v-flex>
            </v-layout>
          </v-list-tile-title>
        </v-list-tile-content>
      </v-btn>
    </div>
  </v-layout>
</v-list>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-list>

      <!-- แสดง Loading Spinner เมื่อกำลังโหลดข้อมูล -->
      <div>
    <div class="text-center" v-if="isLoading">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </div>

    <div v-else>
      <div v-if="error" class="error-message">{{ error }}</div>
      <!-- เนื้อหาอื่นๆ ของคุณ -->
    </div>
  </div>
    </v-navigation-drawer>


    <v-content fluid fill-height style="width: 100%">
      <v-flex class="tablefile" v-if="!mini">
        <tableFile ref="drawerMini" />
        <!-- <v-progress-linear :value="progress" height="24" color="blue" v-if="loading" class="custom-progress">
              <template v-slot:default="{ value }">
                <div class="progress-text">{{ Math.round(value) }}%</div>
              </template>
            </v-progress-linear> -->
      </v-flex>
      <v-flex class="tablefile-else" v-else>
        <tableFile ref="drawerMini" />
      </v-flex>
    </v-content>
    <!-- <v-content fluid fill-height style="width: 100%">
      <v-flex class="tablefile" v-if="mini === false">
        <tableFile ref="drawerMini" />
      </v-flex>
      <v-flex class="tablefile-else" v-else>
        <tableFile ref="drawerMini" />
      </v-flex>
    </v-content> -->
  </v-app>
</template>


<script>
import { Encode, Decode } from '@/services'
import tableFile from '@/components/publicData/tableFile'
export default {
  components: { tableFile },
  data() {
    return {
      hoverBackground: '#fff',
      progress: 0,
      loading: false,
      fab: false,
      items: [],
      // panel:[],
      panel: [false, false, false, false, false, false, false, false, false, false],
      searchField: [false, false, false, false, false, false, false, false, false, false],
      id: '',
      search: null,
      dataCatagory: [ 
      //   {
      //   category_id: 1,
      //   sub_category_name: 'Subcategory 1.1',
      //   images: 'https://via.placeholder.com/50'
      // },
      // {
      //   category_id: 1,
      //   sub_category_name: 'Subcategory 1.2',
      //   images: 'https://via.placeholder.com/50'
      // },
      // {
      //   category_id: 2,
      //   sub_category_name: 'Subcategory 2.1',
      //   images: 'https://via.placeholder.com/50'
      // }
    ],
      hide: false,
      drawer: false,
      mini: true,
      checkPanel: [],
      page: 1,
      pageSize: 10, // จำนวนข้อมูลที่แสดงในแต่ละหน้า
      category: [ 
      //   {
      //   category_id: 1,
      //   name: 'Category 1',
      //   images: 'https://via.placeholder.com/50'
      // },
      // {
      //   category_id: 2,
      //   name: 'Category 2',
      //   images: 'https://via.placeholder.com/50'
      // }
    ],
      nameCategory: null,
      dataSubCategory: null,
      refresh: 0
    }
  },
  mounted() {
    this.startLoading()
    this.getCategoryByUser()
    // this.searchColumnDataTable()
    // this.navipad()
    this.setData()
    this.pathCategory()
    this.getDataCategory()
    this.$store.dispatch('getDataSubCategory', this.id)
  },
  created() {
    // var param = window.location.href
    // param = decodeURIComponent((param + '').replace(/\+/g, '%20'));
    // var name = param.split('/opendata/')
    // for (var i = 0; i < this.category.length; i++) {
    //   var check = this.pathUrl(name[1])
    //   if (this.category[i].name === check) {
    //     this.nameCategory = this.category[i].text
    //     this.id = this.category[i].id
    //     this.panel[i] = true
    //   }
    // }
    // this.checkPanel = this.panel
    // this.getDataCategory()
  },
  computed: {
    paginatedCategory() {
      const startIndex = (this.page - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      return this.category.slice(startIndex, endIndex);
    },
    userData() {
      if (this.$cookies.isKey('information')) {
        return JSON.parse(Decode.decode(this.$cookies.get('information')))
      } else {
        return 'No'
      }
    },
    dataProfile: {
      get() {
        return this.$store.getters.setDataProfile
      }
    }
  },
  watch: {
    panel(key) {
      if (this.panel !== [false, false, false, false, false, false, false, false, false, false]) {
        // this.getDataCategoryChange()
      } else {
        this.pathCategory()
      }
    }
  },
  methods: {
    startLoading() {
      let progressInterval = setInterval(() => {
        if (this.progress < 99) {
          this.progress += 1;
        } else {
          clearInterval(progressInterval);
          setTimeout(() => {
            this.loading = false;
          }, 3000);
        }
      }, 20);
    },
    togglePanel(index) {
      this.$set(this.panel, index, !this.panel[index]);
    },
    async getCategoryByUser() {
  this.isLoading = true;
  try {
    const user = Encode.encode(JSON.stringify(this.userData));
    const response = await this.axios.post(process.env.VUE_APP_API_BACKEND + '/getCategoryByUser', { 'user': user });
    
    this.category = response.data.data;
    this.panel = Array(this.category.length).fill(false);
    
    let param = window.location.href;
    param = decodeURIComponent((param + '').replace(/\+/g, '%20'));
    const name = param.split('/opendata/');
    
    for (let i = 0; i < this.category.length; i++) {
      const check = this.pathUrl(name[1]);
      if (this.category[i].name === check) {
        this.nameCategory = this.category[i].name;
        this.id = this.category[i].category_id;
        this.$set(this.panel, i, true);
      }
    }
    
    this.checkPanel = this.panel;
    this.getDataCategory();
  } catch (error) {
    console.error("Error fetching category:", error);
  } finally {
    this.isLoading = false;
  }
},
    onScroll(e) {
      if (typeof window === 'undefined') return
      const top = window.pageYOffset || e.target.scrollTop || 0
      this.fab = top > 20
    },
    toTop() {

      this.$vuetify.goTo(0)
    },
    pathUrl(param) {
      // //console.log(param);
      var name = param.split('#')
      return name[0]
    },
    test(index) {
      // //console.log(index);
      return '#' + index
    },
    searchDataTable() {

      if (this.search) {
        var user = Encode.encode(JSON.stringify(this.userData));
        this.axios.post(process.env.VUE_APP_API_BACKEND + '/searchCatagoryID', {
          'text_search': this.search,
          'catagory_id': this.id,
          'user': user
        }).then((response) => {
          this.dataExcel = response.data
          console.log("search",this.dataExcel)
          this.$refs.drawerMini.searchTable(this.dataExcel)
        })



      } else {
        this.$refs.drawerMini.searchTable('None')
      }
    },
    pathCategory() {
      var param = window.location.href
      param = decodeURIComponent((param + '').replace(/\+/g, '%20'));
      var name = param.split('/opendata/')
      // console.log(name);
      for (var i = 0; i < this.category.length; i++) {
        if (this.category[i].name === name[1]) {
          this.nameCategory = this.category[i].name
          this.id = this.category[i].category_id
          // console.log(this.id);
        }
      }
    },
    labelSearch() {
      return `${this.$t('searchWithin')} ${this.nameCategory}`
    },
    sendSubCategory(key) {
      // //console.log(key);
      this.$refs.drawerMini.sendText(key)
      this.pathCategory()
      this.toToptable()
    },
    toToptable() {
      this.$vuetify.goTo(0)
    },
    getDataCategory() {
      // console.log(this.id);
      var user = Encode.encode(JSON.stringify(this.userData));

      this.checkPanel = this.panel
      for (var i = 0; i < this.panel.length; i++) {
        if (this.panel[i] === true) {
          this.axios.post(process.env.VUE_APP_API_BACKEND + '/getSubcategoryByID', {
            "category_id": this.id,
            'user': user
          }).then((response) => {
            // console.log(response);
            // if (response.data.status !== 'not found data') {
            this.dataCatagory = response.data
            // console.log(this.dataCatagory);
            // }
          })
        }
      }
    },
    // getDataCategoryChange() {
    //   this.dataCatagory = []
    //   var user = Encode.encode(JSON.stringify(this.userData));

    //   for (var i = 0; i < this.panel.length; i++) {
    //     if (this.checkPanel[i] !== this.panel[i]) {
    //       if (this.panel[i] === true) {
    //         this.checkPanel[i] = true
    //         this.axios.post(process.env.VUE_APP_API_BACKEND + '/getDataSubCategory', {
    //           "category_id": this.category[i].id,
    //           "user": user
    //         }).then((response) => {
    //           if (response.data.status !== 'not found data') {
    //             this.dataCatagory = response.data
    //             // //console.log(  this.dataCatagory);
    //           }
    //         })
    //       } else {
    //         this.checkPanel[i] = false
    //       }
    //     } else {
    //       this.panel[i] = false
    //     }
    //   }
    // },
    setData() {
      this.refresh++
      var category = d3.nest()
        .key(d => d.category)
        .entries(this.data)
      for (var i = 0; i < category.length; i++) {
        var nest = d3.nest()
          .key(d => d.title)
          .entries(this.data)
        this.dataSubCategory = nest
      }
    },
    toPathSource(text) {
      this.$router.push(`/opendata/${text}`)
      this.reloadPage()
    },
    openLogin() {
      this.$refs.openLogin.open()
    },
    openRegister() {
      this.$refs.openRegister.opendialog()
    },
    logout() {
      this.axios.post(process.env.VUE_APP_API_BACKEND + '/logout', {
        "user_id": Encode.encode(this.userData.user_id)
      }).then((response) => {
        // //console.log(response.data.status)

        if (response.data.status === 'success') {
          this.$swal('logout', '', 'success').then((response) => {
            this.$cookies.remove('information', '/', process.env.DOMAIN)
            this.$cookies.remove('usertype', '/', process.env.DOMAIN)
            this.$store.commit('setDataProfile', false)
            localStorage.setItem("user_id", '')
            this.$router.push('/')
            this.reloadPage()
          })
        }

      })
    },
    pathIcon(icon) {
      return `/opendataIcon/icon-two/${icon}`
    },
    backToHome() {
      this.$router.push('/')
    },
    drawerMini(key) {
      // console.log(key);
      this.mini = key
      if (this.mini === true) {
        this.panel = false
      } else {
        // this.pathCategory()
        // this.getDataCategoryChange()
        // this.getDataCategory()
        // this.reloadPage()
      }
      this.$refs.drawerMini.open(key)
    },
    reloadPage() {
      window.location.reload()
    },
  }
}
</script>
<style media="screen" scoped="">
.toolbar-title {
  flex-grow: 1;
  text-align: left;
  font-size: 18px;
}
.hover-background:hover {
  background: linear-gradient(to right, #ADE2FF, #EEF9FF);
  display: block;
}
.v-progress-linear__content {
  display: flex;
  justify-content: center;
  align-items: center;
  /* color: white; */
}
.custom-progress {
  width: 900px;
  margin: 0 auto; /* จัดกึ่งกลางถ้าต้องการ */
}

.progress-text {
  color: white;
  font-weight: bold;
  position: absolute;
}

>>>.v-expansion-panel__header__icon {
  display: none;
}

.text-category {
  display: block;
  margin: auto;
  white-space: nowrap; /* ป้องกันการขึ้นบรรทัดใหม่ */
  overflow: hidden; /* ซ่อนข้อความที่เกินขอบเขต */
  text-overflow: ellipsis; /* แสดงจุดสามจุดที่ท้ายข้อความที่เกินขอบเขต */
  justify-content: flex-start; /* ทำให้ข้อความชิดซ้าย */
}

aside.drawer-menu.v-navigation-drawer.v-navigation-drawer--clipped.v-navigation-drawer--fixed.v-navigation-drawer--open.theme--light {
  height: 84% !important;
  margin-top: 0px;
  transform: translateX(0px);
  width: 330px;
  max-height: calc(100% - 0px);
}

::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: #ccc;
  border-radius: 10px;
}

.card-center {
  margin: 0 auto;
}

.height-chart {
  height: 300px !important;
}
.textCategorycolortext {
  font-size: 12px;
  color: #000;
  white-space: normal;
  overflow: hidden;
  word-break: break-word;
  text-align: left; /* ทำให้ข้อความชิดซ้าย */
}
.imageSize-tab-false {
  max-width: 40px; /* Adjust as needed */
  max-height: 40px; /* Adjust as needed */
  /* width: auto; */
  height: auto;
}


.sub-style {
  display: flex;
  align-items: center;
  justify-content: flex-start; /* Align text to the left */
}

.hover-background {
  width: 100%; /* Ensure button takes full width */
}


.textsubCategory {
  font-size: 12px;
  /* position: fixed; */
  /* padding: 4px !important; */
  /* display: block; */
  display: inline-block; 
  vertical-align: middle;
  /* margin: auto; */
  margin-left: 1px;
  overflow: hidden; /* Prevent text overflow */
  text-overflow: ellipsis; /* Add ellipsis for overflow text */
  white-space: nowrap; /* Prevent text wrapping */
}

>>>.theme--dark.v-input:not(.v-input--is-disabled) input {
  color: #000 !important;
}

.drawer-menu {
  background-color: #fafafa;
  transform: translateY(114px) !important;
}

.toolbar-nav {
  margin-top: 64px !important;
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
  transition: opacity .2s;
}

.fade-enter,
.fade-leave-to

/* .fade-leave-active below version 2.1.8 */
  {
  opacity: 0;
}

aside.navigation-drawer.navigation-drawer--clipped.navigation-drawer--is-booted.navigation-drawer--open {
  padding-bottom: 40px !important;
}

.theme--light.v-expansion-panel .v-expansion-panel__container .v-expansion-panel__header .v-expansion-panel__header__icon .v-icon {
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
  font-size: 18px;
  /* font-family: 'THSarabun', Arial, 'Arial Unicode MS', Helvetica, Sans-Serif; */
  font-weight: bold;
  font-style: normal;
}

.theme--light.v-expansion-panel .v-expansion-panel__container {
  border-top: none;
  background-color: #fafafa;
}

.theme--light.v-expansion-panel .v-expansion-panel__container .v-expansion-panel__header .v-expansion-panel__header__icon .v-icon {
  margin-right: 10px;
}

>>>.v-navigation-drawer__border {
  filter: blur(4px) !important;
}

.container {
  padding: 7px !important;
  max-width: 95%;
}

.color-toolbar {
  background-color: #2E3092;
  height: 50px;
}

.v-list {
  padding: 0px !important;
}

>>>.v-content__wrap {
  padding-top: 120px !important;
}

.pointer-color {
  cursor: pointer;
}

>>>.theme--dark.v-input:not(.v-input--is-disabled) input {
  color: #000000 !important;
}

>>>.theme--dark.v-label {
  color: #000000;
}

>>>.theme--dark.v-text-field--solo>.v-input__control>.v-input__slot {
  background: #ffffff;
}

>>>.v-text-field.v-text-field--solo .v-input__control {
  min-height: 43px;
}

>>>.theme--dark.v-icon {
  color: rgba(0, 0, 0, 0.54);
}

.sub-style {
  /* padding: 5px; */
  font-size: 20px;
  /* padding-top: 40px; */
  padding-left: 10px;
  /* white-space: break-spaces; */
  white-space: normal;
  /* overflow: initial; */
  word-break: break-word;
}

div-span:hover {
  background-color: #e4e4e4;
  cursor: pointer;
}

.v-list__tile__title {
  /* margin: 5px 0px 5px 0px; */
  height: auto;
  /* height: 0px; */
  /* line-height: normal; */
  /* text-align: left; */
}

.v-btn {
  text-transform: none;
}

>>>.theme--dark.v-label {
  color: #000000 !important;
}

.imageSize-tab-true {
  width: 100%;
  height: 100%;
  max-width: 40px;
  max-height: 40px;
  display: block;
  margin: 0 auto;
  /* margin-right: 50px; */
  
}


.imageSize-tab-false {
  max-width: 40px; /* Adjust as needed */
  max-height: 40px; /* Adjust as needed */
  /* width: auto; */
  height: auto;
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

>>>.v-expansion-panel__header {
  padding: 5px 5px !important;
}

@media (max-width: 1024px) {
  .flex.tablefile-else {
    /* padding-left: 65px; */
  }

  .font {
    /* margin-top: 7px; */
    padding: 10px 20px;
    text-shadow: 0px 0px 15px rgba(17, 17, 17, 0.24) !important;
    /* color: #ffffff !important; */
    font-size: 15px;
    /* font-family: 'THSarabun', Arial, 'Arial Unicode MS', Helvetica, Sans-Serif; */
    font-weight: bold;
    font-style: normal;
    padding-left: 10px;
  }

  .search-within {
    width: 320px;
    color: rgba(0, 0, 0, 0.54);
  }

  >>>aside.drawer-menu.v-navigation-drawer.v-navigation-drawer--clipped.v-navigation-drawer--close.v-navigation-drawer--fixed.v-navigation-drawer--is-mobile.theme--light {
    height: 85%;
    margin-top: 0px;
    transform: translateX(-300px);
    width: 300px;
  }

  .imageSize-tab-true {
    width: 100%;
    height: 100%;
    max-width: 40px;
    max-height: 40px;
    display: block;
    margin: 0 auto;
    /* margin-right: 50px; */
  }
}

@media (max-width: 992px) {

  .imageSize-tab-true {
    width: 100%;
    height: 100%;
    max-width: 40px;
    max-height: 40px;
    display: block;
    margin: 0 auto;
    /* margin-right: 50px; */
  }

  .imageSize-tab-false {
  max-width: 40px; /* Adjust as needed */
  max-height: 40px; /* Adjust as needed */
  /* width: auto; */
  height: auto;
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
    width: 220px;
    color: rgba(0, 0, 0, 0.54);
  }

  >>>.v-expansion-panel__header {
    /* padding: 5px 24px!important; */
    padding: 5px 5px !important;

  }
}

@media (max-width: 768px) {
  .drawer-menu {
  background-color: #fafafa;
  transform: translateY(106px) !important;
}
  

  >>>label.v-label.theme--dark {
    font-size: 12px;

  }
  .tablefile-else {
    /* margin-left: 65px; */
  }

  .toolbar-nav {
    margin-top: 56px !important;
  }

  .imageSize-tab-true {
    width: 100%;
    height: 100%;
    max-width: 40px;
    max-height: 40px;
    display: block;
    margin: 0 auto;
    /* margin-right: 50px; */
  }

  .imageSize-tab-false {
  max-width: 40px; /* Adjust as needed */
  max-height: 40px; /* Adjust as needed */
  width: auto;
  height: auto;
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
    max-width: 220px;
    color: rgba(0, 0, 0, 0.54);
  }

  .font {
    /* margin-top: 7px; */
    padding: 10px 20px;
    text-shadow: 0px 0px 15px rgba(17, 17, 17, 0.24) !important;
    /* color: #ffffff !important; */
    font-size: 12px;
    /* font-family: 'THSarabun', Arial, 'Arial Unicode MS', Helvetica, Sans-Serif; */
    font-weight: bold;
    font-style: normal;
  }



}

@media (max-width: 576px) {
  .imageSize-tab-true {
    width: 100%;
    height: 100%;
    max-width: 40px;
    max-height: 40px;
    margin-right: 50px;
    display: block;
    margin: 0 auto;
  }

  .imageSize-tab-true {
    width: 100%;
    height: 100%;
    max-width: 40px;
    max-height: 40px;

  }

  .imageSize-tab-false {
    width: 100%;
    height: 100%;
    max-width: 40px;
    max-height: 40px;
    /* margin-right: 20px; */
    display: block;
    /* margin: 0 auto; */
  }

  .imageSize-subcategory {
    width: 100%;
    height: 100%;
    max-width: 30px;
    max-height: 30px;
    /* margin-right: 20px; */
    display: block;
    margin: 0 auto;
  }

  .headerErexpansion {
    /* padding-top: 40px; */
    box-shadow: none;
  }
}


@media (max-width: 430px) {
  .textsubCategory {
  font-size: 12px;
  display: block; /* ใช้ inline-flex เพื่อจัดการการจัดตำแหน่งภายใน */
  align-items: center; /* จัดแนวเนื้อหาตรงกลางในแนวตั้ง */
  margin-left: 0px;
  overflow: hidden; /* ป้องกันการล้นของข้อความ */
  text-overflow: ellipsis; /* เพิ่ม ... สำหรับข้อความที่ยาวเกินไป */
  white-space: nowrap; /* ป้องกันการตัดบรรทัด */
}

.imageSize-tab-true {
  width: 100%;
  height: 100%;
  max-width: 40px;
  max-height: 40px;
  display: block;
  margin: 0 auto;
  /* margin-right: 50px; */
}

.imageSize-tab-false {
  /* width: 100%; */
  /* height: 100%; */
  max-width: 40px;
  max-height: 40px;
  /* margin-right: 18px; */
  display: block;
  /* margin: 0 auto; */
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
  width: 220px;
  color: rgba(0, 0, 0, 0.54);
}

>>>.v-expansion-panel__header {
  /* padding: 5px 24px!important; */
  padding: 5px 5px !important;

}
}
</style>
