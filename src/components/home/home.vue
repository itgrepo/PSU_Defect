<template lang="html">
  <v-app class="bg">
    <img
      src="/opendataIcon/banner_bg.png"
      alt="PSU Banner"
      class="responsive-banner"
      style="position: absolute; right: 0; top: 0"
    />
    <img
      src="/opendataIcon/bg.png"
      alt="PSU Banner"
      class="responsive-banner-icon"
      style="position: absolute; right: 0; top: 0"
    />
    <!-- Main Content -->
    <v-container class="text-center" style="margin-top: 100px">
      <!-- Title -->
      <h1 style="color: #2c8c95" class="headpsu pa-5">PSU Open Data</h1>

      <!-- Search Bar -->
      <v-row align="center" justify="center">
        <v-col cols="12" xs="2" sm="3" md="4">
          <!-- Show search box only on desktop -->
          <v-text-field
            solo
            append-icon="search"
            color="grey"
            class="searchText"
            v-model="searchHome"
            @keyup.enter="searchDataTable"
            @click:append="searchDataTable"
            :label="$t('search')"
            v-show="!isMobile"
          ></v-text-field>
        </v-col>
      </v-row>

      <!-- Stats Section -->
      <v-row class="d-flex justify-center my-4">
        <v-col
          v-for="(item, index) in stats"
          :key="index"
          cols="12"
          sm="6"
          md="4"
          lg="2"
          class="text-center pa-1 d-flex align-center"
        >
          <v-card
            class="mx-0 pa-1"
            max-width="200"
            style="border: none; box-shadow: none; margin-right: 0"
          >
            <v-card-text class="justify-center">
              <v-row align="center" no-gutters class="d-flex justify-center">
                <v-col cols="auto">
                  <v-icon large>{{ item.icon }}</v-icon>
                </v-col>
                <v-col cols="auto" class="d-flex align-center">
                  <h2 class="mb-0 ml-2">{{ item.value }}</h2>
                </v-col>
              </v-row>
            </v-card-text>
            <v-card-subtitle class="text-center">
              <p>{{ item.label }}</p>
            </v-card-subtitle>
          </v-card>

          <!-- Divider หลังการ์ด -->
          <v-divider
            v-if="index < stats.length - 1"
            vertical
            style="height: auto; margin: 0 4px; border-left: 4px solid #61b6bc"
          ></v-divider>
        </v-col>
      </v-row>

      <!-- New Release Section -->
      <!-- <h2>New Release</h2>
  <v-progress-linear
    value="50"
    color="primary"
    style="max-width: 600px; margin: 0 auto;"
  ></v-progress-linear> -->
    </v-container>

    <v-content class="pt-0 padding-ipad">
      <div>
        <!-- Existing layout -->
        <!-- <v-parallax
    class="custom-parallax"
    dark
    src="/opendataIcon/banner04.png"
    alt="fireSpot"
  >
    <v-row align="center" justify="center">
      <v-col class="text-center" cols="12">
        <h1
          class="pt-12  grow-outer grow-inner parallax-title"
          dark
          align="center"
        >
          DATA LAKE
        </h1>
        <v-row align="center" justify="center">
          <v-col cols="12" xs="2" sm="3" md="4">
        
            <v-text-field
              solo
              append-icon="search"
              color="white"
              class="searchText"
              v-model="searchHome"
              @keyup.enter="searchDataTable"
              @click:append="searchDataTable"
              :label="$t('search')"
              v-show="!isMobile"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-parallax> -->

        <!-- Floating Button for Mobile -->
        <v-btn
          v-if="isMobile"
          fab
          small
          color="primary"
          class="fab-button"
          @click="toggleSearch"
        >
          <v-icon>{{ showSearchBox ? "mdi-close" : "mdi-magnify" }}</v-icon>
        </v-btn>

        <!-- Search Box for Mobile -->
        <v-slide-x-reverse-transition>
          <v-card
            v-if="showSearchBox && isMobile"
            class="search-box"
            flat
            color="white"
            dense
          >
            <v-text-field
              solo
              append-icon="search"
              color="white"
              v-model="searchHome"
              @keyup.enter="searchDataTable"
              @click:append="searchDataTable"
              :label="$t('search')"
            ></v-text-field>
          </v-card>
        </v-slide-x-reverse-transition>
      </div>

      <!-- <v-layout
        class="table-new-down"
        row
        wrap
      v-if="searchHome === null || searchHome === '' || isSearching"
      > -->
      <v-layout class="table-new-down" row wrap v-if="searchHome === null || searchHome === ''">
        <!-- <v-flex xs12 sm12 md12 lg12 class="table-new">
          <cardnew />
        </v-flex> -->
        <v-flex xs12 sm12 md12 lg12 class="table-new">
          <topNew />
        </v-flex>
        <!-- <v-flex xs12 sm12 md12 lg6 class="table-download">
          <topDownload />
        </v-flex> -->
      </v-layout>

      <v-layout row wrap class="table-new-down" v-else>
        <v-flex xs12 sm12 md12 lg12 class="table-new">
          <tableFile ref="searchDataHome" />
        </v-flex>
      </v-layout>
    </v-content>
    <v-container fluid class="card-container">
      <v-row no-gutters class="mb-4">
        <v-col cols="12" class="d-flex justify-center">
          <v-card-title
            class="d-flex justify-center textcat"
            style="text-transform: uppercase"
          >
            {{ $t("category") }}
          </v-card-title>
        </v-col>
      </v-row>

      <div class="underline"></div>

      <v-row
        v-if="!noData && !loading"
        v-for="(categoryGroup, index) in groupedCategories"
        :key="index"
        no-gutters
        class="card-row"
      >
        <v-col
          v-for="(itemCategory, i) in categoryGroup"
          :key="i"
          cols="12"
          sm="6"
          md="4"
          lg="3"
          class="card-item-container"
        >
          <v-skeleton-loader
            type="card"
            :loading="loading"
            width="200px"
            class="mr-1"
          >
            <v-card
              tile
              flat
              @click="toPathSource(itemCategory.name)"
              class="anime-inner-grow mx-auto card-item"
              width="200"
              max-height="200"
            >
              <v-img
                :src="`data:image/png;base64,${itemCategory.images}`"
                alt="Category Image"
                height="120px"
                class="align-center pa-5"
                contain
              ></v-img>
              <v-card-title
                class="textCategorycolortext text-center card-title"
              >
                {{ itemCategory.name }}
              </v-card-title>
            </v-card>
          </v-skeleton-loader>
        </v-col>
      </v-row>

      <v-row v-if="!loading && !noData" class="d-flex justify-center">
        <v-col class="text-center">
          <v-btn
            v-if="itemsToShow < category.length"
            @click="showMore"
            class="ma-2 custom-btn"
            round
            outline
          >
            {{ $t("showmore") }}
          </v-btn>
        </v-col>
      </v-row>

      <!-- ข้อความเมื่อไม่มีข้อมูล -->
      <v-row v-if="noData && !loading" class="d-flex justify-center">
        <v-col class="text-center">
          <v-alert type="error"> ไม่มีข้อมูล กรุณาติดต่อผู้ดูแลระบบ </v-alert>
        </v-col>
      </v-row>

      <!-- Loader ขณะกำลังโหลด -->
      <v-row v-if="loading" class="d-flex justify-center">
        <v-col class="text-center">
          <v-progress-circular
            indeterminate
            color="primary"
          ></v-progress-circular>
        </v-col>
      </v-row>
    </v-container>

    <div class="footer-container">
      <!-- แถวที่ 1: Logo และข้อความใต้ Logo -->
      <div class="footer-item">
        <div
          class="logo-footer-layout"
          style="max-width: 60px; height: auto; overflow: hidden"
        >
          <img
            src="/opendataIcon/Data Lake logo_M.png"
            class="logo-footer"
            alt="Logo"
          />
        </div>
        <p class="footer-text">
          DATA LAKE<br /><br />
          สำนักนวัตกรรมดิจิทัลและระบบอัจฉริยะ<br />
          มหาวิทยาลัยสงขลานครินทร์<br />
          เลขที่ 15 ถนนกาญจนวนิชย์ ตำบลหาดใหญ่ อำเภอหาดใหญ่ จังหวัดสงขลา 90110
        </p>
      </div>

      <!-- แถวที่ 2: ข่าวสาร -->
      <!-- <div class="footer-item">
        <h3>ข่าวสาร</h3>
        <ul>
          <li>ข่าวสารทั่วไป</li>
          <li>ข่าวกิจกรรม</li>
          <li>ประกาศ/คำสั่ง</li>
        </ul>
      </div> -->

      <!-- แถวที่ 3: คู่มือ -->
      <!-- <div class="footer-item">
        <h3>คู่มือ</h3>
        <ul>
          <li>คู่มือการใช้งานระบบ</li>
          <li>คู่มือการขอ API</li>
          <li>คู่มือ Datasets</li>
        </ul>
      </div> -->

      <!-- แถวที่ 4: ติดต่อเรา -->
      <div class="footer-item">
        <h3>ติดต่อเรา</h3>
        <p>
          Tel. 074-28 2074<br />
          Email: thereayuth.p@psu.ac.th
        </p>
        <div>
          <!-- <v-btn icon href="#">
        <v-icon>mdi-facebook</v-icon>
      </v-btn>
      <v-btn icon href="#">
        <v-icon>mdi-line</v-icon>
      </v-btn> -->
        </div>
      </div>
    </div>

    <resetPassword ref="resetPassword" />
    <login ref="login" />

    <!-- <v-footer >
        <footerWeb />
      </v-footer> -->
  </v-app>
</template>

<script>
import footerWeb from "@/components/home/footer/footer";
import { Encode, Decode } from "@/services";
import cardnew from "@/components/home/cardnew";
import topNew from "@/components/home/topNew";
import topDownload from "@/components/home/topDownload";
import resetPassword from "@/components/auth/resetPassword";
import tableFile from "@/components/publicData/tableFileSearch";
import login from "@/components/auth/login";
export default {
  components: {
    topNew,
    topDownload,
    resetPassword,
    login,
    tableFile,
    footerWeb,
    cardnew,
  },
  data() {
    return {
      isSearching: false,
      loading: true, // เริ่มต้นเป็น true ขณะโหลดข้อมูล
      noData: false, // กำหนดเป็น true เมื่อไม่มีข้อมูล
      newsList: ["ข่าวสารทั่วไป", "ข่าวกิจกรรม", "ประกาศ/คำสั่ง"],
      guideList: ["คู่มือการใช้งานระบบ", "คู่มือการขอ API", "คู่มือ Datasets"],
      stats: [
        { icon: "mdi-folder-open", value: 0, label: this.$t("dataset") },
        { icon: "mdi-api", value: 0, label: this.$t("api") },
        { icon: "mdi-chart-box", value: 0, label: this.$t("dashboard") },
      ],
      el: "#txtID1",
      message: "",
      showSearchBox: false, // Controls the visibility of the search box
      searchHome: "", // For search input
      isMobile: true,
      // searchHome: null,
      panel: false,
      drawer: true,
      mini: true,
      dataExcel: [],
      items: [],
      timeautologout: "",
      icon: [{ icon: "iconMetaD.png" }, { icon: "iconManage.png" }],
      loading: true,
      itemsToShow: 4, // Number of cards to show initially
      showAll: false, // State to show all cards
      incrementBy: 20, // Number of items to load on each click
      category: [
        // { id: 2, name: 'สำนักนโยบายเศรษฐกิจมหภาค', status: 'show', text: 'สำนักนโยบายเศรษฐกิจมหภาค', icon: 'สศม.png', link: '/' },
        // { id: 13, name: 'สำนักนโยบายภาษี', status: 'show', text: 'สำนักนโยบายภาษี', icon: 'สนภ.png', link: '/' },
        // { id: 14, name: 'สำนักนโยบายระบบการเงินและสถาบันการเงิน', status: 'show', text: 'สำนักนโยบายระบบการเงินและสถาบันการเงิน', icon: 'สกง.png', link: '/' },
        // { id: 12, name: 'สำนักนโยบายการคลัง', status: 'show', text: 'สำนักนโยบายการคลัง', icon: 'สนค.png', link: '/' },
        // { id: 15, name: 'สำนักนโยบายการออมและการลงทุน', status: 'show', text: 'สำนักนโยบายการออมและการลงทุน', icon: 'สอล.png', link: '/' },
        // { id: 7, name: 'สำนักนโยบายพัฒนาระบบการเงินภาคประชาชน', status: 'show', text: 'สำนักนโยบายพัฒนาระบบการเงินภาคประชาชน', icon: 'สพช.png', link: '/' },
        // { id: 10, name: 'ศูนย์เทคโนโลยีสารสนเทศ', status: 'show', text: 'ศูนย์เทคโนโลยีสารสนเทศ', icon: 'ศทส(ศูนย์เทคโนโลยีสารสนเทศ).png', link: '/' },
        // { id: 8, name: 'กลุ่มที่ปรึกษาเศรษฐกิจและการคลังในต่างประเทศ', status: 'show', text: 'กลุ่มที่ปรึกษาเศรษฐกิจและการคลังในต่างประเทศ', icon: 'กตป.png', link: '/' },
        // { id: 5, name: 'กลุ่มตรวจสอบภายใน', status: 'show', text: 'กลุ่มตรวจสอบภายใน', icon: 'กตส.png', link: '/' },
        // { id: 4, name: 'กลุ่มพัฒนาระบบบริหารงาน', status: 'show', text: 'กลุ่มพัฒนาระบบบริหารงาน', icon: 'กพบ.png', link: '/' },
        // { id: 16, name: 'สำนักนโยบายระบบการคุ้มครองผลประโยชน์ทางการเงิน', status: 'show', text: 'สำนักนโยบายระบบการคุ้มครองผลประโยชน์ทางการเงิน', icon: 'สคป.png', link: '/' },
        // { id: 6, name: 'ศูนย์บริหารงานวิจัยและบรรณสารสนเทศ', status: 'show', text: 'ศูนย์บริหารงานวิจัยและบรรณสารสนเทศ', icon: 'ศวบ.png', link: '/' },
        // { id: 11, name: 'สำนักกฎหมาย', status: 'show', text: 'สำนักกฎหมาย', icon: 'สกม.png', link: '/' },
        // { id: 17, name: 'สำนักงบประมาณและการเงิน', status: 'show', text: 'สำนักงบประมาณและการเงิน', icon: 'สปง.png', link: '/' },
        // { id: 9, name: 'สำนักเลขานุการกรม', status: 'show', text: 'สำนักเลขานุการกรม', icon: 'สลข.png', link: '/' },
        // { id: 3, name: 'สำนักนโยบายเศรษฐกิจระหว่างประเทศ', status: 'show', text: 'สำนักนโยบายเศรษฐกิจระหว่างประเทศ', icon: 'สศร.png', link: '/' },
        // { id: 1, name: 'Administrator Report', status: 'show', text: 'Administrator Report', icon: 'Administrator Report.png', link: '/' },
      ],
      allreport: [],
      active: null,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    };
  },
  created() {
    this.searchColumnDataTable();
  },
  mounted() {
    setTimeout(() => {
      this.loading = false;
    }, 2000),
      console.log("user");
    console.log(JSON.parse(Decode.decode(this.$cookies.get("information"))));
    // this.testsss()
    // this.checkie ()
    this.checkLink();
    this.getData();
    // this.idleTimer()
    // this.closeWindow()
    this.check_login();
    this.timelogout();
    this.getCategoryByUser();
    this.updateDeviceType();
    window.addEventListener("resize", this.updateDeviceType);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.updateDeviceType);
  },
  computed: {
    userData() {
      if (this.$cookies.isKey("information")) {
        return JSON.parse(Decode.decode(this.$cookies.get("information")));
      } else {
        return "";
      }
    },
    // visibleCategories() {
    //   return this.category.slice(0, this.itemsToShow);
    // },
    groupedCategories() {
      // Group categories into rows of 4
      let result = [];
      for (let i = 0; i < this.itemsToShow; i += 4) {
        result.push(this.category.slice(i, i + 4));
      }
      return result;
    },
  },
  dataProfile: {
    get() {
      return this.$store.getters.setDataProfile;
    },
  },
  methods: {
    getData() {
      this.axios
        .post(process.env.VUE_APP_API_BACKEND + "/sumTotal")
        .then((response) => {
          const data = response.data; // ข้อมูลจากหลังบ้าน

          // อัปเดตค่า stats ด้วยข้อมูลที่ได้จากหลังบ้าน
          this.stats[0].value = data.report_total; // ชุดข้อมูล
          this.stats[1].value = data.API_total; // API
          this.stats[2].value = data.dashboard_total; // Dashboard

          // ตรวจสอบค่าที่ได้
          console.log(this.stats);
        })
        .catch((error) => {
          console.error(error); // แสดงข้อผิดพลาดในกรณีที่เกิดปัญหา
        });
    },
    // getData() {
    //   this.axios
    //     .post(process.env.VUE_APP_API_BACKEND + "/sumTotal")
    //     .then((response) => {
    //       this.allreport = response.data; // เก็บข้อมูลทั้งหมดที่ได้มา

    //       // นับจำนวน object (ชุดข้อมูล)
    //       const dataCount = this.allreport.length;

    //       // นับ api_document_URL ที่ไม่เป็น null, '-', หรือ empty string (API)
    //       const apiCount = this.allreport.filter(
    //         (item) => item.api_document_URL && item.api_document_URL !== "-"
    //       ).length;

    //       // นับ Link_name ที่ไม่เป็น null, '-', หรือ empty string (Dashboard)
    //       const dashboardCount = this.allreport.filter(
    //         (item) => item.Link_name && item.Link_name !== "-"
    //       ).length;

    //       // อัปเดต stats ด้วยค่าที่นับได้
    //       this.stats[0].value = dataCount; // ชุดข้อมูล
    //       this.stats[1].value = apiCount; // API
    //       this.stats[2].value = dashboardCount; // Dashboard

    //       // console.log(this.stats); // ตรวจสอบค่าที่ได้
    //     })
    //     .catch((error) => {
    //       console.error(error); // แสดงข้อผิดพลาดในกรณีที่เกิดปัญหา
    //     });
    // },
    toggleSearch() {
      this.showSearchBox = !this.showSearchBox;
    },
    updateDeviceType() {
      this.isMobile = window.innerWidth <= 1023;
    },
    // showMore() {
    //   this.itemsToShow += this.incrementBy;
    //   if (this.itemsToShow >= this.category.length) {
    //     this.showAll = true; // Hide the button if all items are shown
    //   }
    // },
    showMore() {
      // Increment the number of items to show by the increment value
      this.itemsToShow += this.incrementBy;

      // Ensure we do not exceed the total number of categories
      if (this.itemsToShow > this.category.length) {
        this.itemsToShow = this.category.length;
      }
    },
    checkie() {
      var isIE = /*@cc_on!@*/ false || !!document.documentMode;
      var isOpera =
        (!!window.opr && !!opr.addons) ||
        !!window.opera ||
        navigator.userAgent.indexOf(" OPR/") >= 0;
      var isFirefox = typeof InstallTrigger !== "undefined";
      var isSafari =
        /constructor/i.test(window.HTMLElement) ||
        (function (p) {
          return p.toString() === "[object SafariRemoteNotification]";
        })(
          !window["safari"] ||
            (typeof safari !== "undefined" && safari.pushNotification)
        );
      var isEdge = !isIE && !!window.StyleMedia;
      var isChrome =
        !!window.chrome &&
        (!!window.chrome.webstore || !!window.chrome.runtime);
      // //console.log(isChrome);
      if (isChrome == true || isSafari == true) {
      } else {
        this.$swal(
          '<p style="font-size: 20px;">This website is best compatible with<br>Google Chrome for Windows computer<br>and Safari for Mac computer, please<br>switching your browser and device<br>for better viewing experience</p>',
          '<p style="font-size: 16px;">You may download the browsers at <a href="https://www.google.com/chrome/">Google Chrome</a> and <a href=" https://support.apple.com/downloads/safari">Safari</a></p>',
          "warning"
        );
      }
    },
    check_login() {
      // //console.log(this.userData.user_id)
      setInterval(function () {
        // //console.log(this.userData.user_id)
        var user_id = localStorage.getItem("user_id");

        const axios = require("axios");
        axios
          .post(process.env.VUE_APP_API_BACKEND + "/checkStatus", {
            user_id: Encode.encode(user_id),
          })
          .then((response) => {
            // //console.log(response.data.data.login_status);
            var status_login = localStorage.getItem("status_login");
            //  //console.log(status_login)
            if (
              response.data.data.login_status == "2" &&
              status_login == "login"
            ) {
              const axios = require("axios");
              axios.post(process.env.VUE_APP_API_BACKEND + "/updateStatus", {
                user_id: Encode.encode(user_id),
                status: Encode.encode("3"),
              });
              axios
                .post(process.env.VUE_APP_API_BACKEND + "/logout", {
                  user_id: Encode.encode(user_id),
                })
                .then((response) => {
                  // //console.log(response.data.status)
                  if (response.data.status === "success") {
                    // //console.log('33333333333333333333333');
                    this.$cookies.remove(
                      "information",
                      "/",
                      process.env.DOMAIN
                    );
                    this.$cookies.remove("usertype", "/", process.env.DOMAIN);
                    localStorage.setItem("user_id", "");
                    this.$store.commit("setDataProfile", false);
                    this.$router.push("/");
                    this.reloadPage();
                  }
                });
            }
          });
        //     axios.post(process.env.VUE_APP_API_BACKEND + '/checkLinkExpire', {

        // }).then(response =>{
        //   // //console.log(response);

        // })
      }, 10000);
    },
    closeWindow() {
      window.onbeforeunload = confirmExit;
      window.onunload = logout;
      const mySelf = this;
      function confirmExit() {
        // //console.log('============pppp')
        // For Safari
        return "Sure?";
      }
      function logout() {
        // e = e || window.event;
        const axios = require("axios");
        // For IE and Firefox prior to version 4
        // //console.log('=======pl')
        if (e.returnValue === "Sure?") {
          // //console.log('===========')
          axios
            .post(process.env.VUE_APP_API_BACKEND + "/logout", {
              user_id: Encode.encode(mySelf.userData.user_id),
            })
            .then((response) => {
              // //console.log(response.data.status)
              if (response.data.status === "success") {
                this.$cookies.remove("information", "/", process.env.DOMAIN);
                this.$cookies.remove("usertype", "/", process.env.DOMAIN);
                window.location.href = "/";
              }
            });
        }
      }
    },
    searchDataTable() {
  // ตั้งค่า isSearching เป็น true เพื่อแสดงว่ากำลังค้นหา
  this.isSearching = true;

  // ตรวจสอบว่ามีข้อมูลสำหรับการค้นหาหรือไม่
  if (!this.searchHome) {
    this.resetData();
    this.isSearching = false; // เปลี่ยนค่าเป็น false เมื่อไม่มีการค้นหา
    return;
  }

  console.log(this.searchHome);

  var user = Encode.encode(JSON.stringify(this.userData));
  this.axios
    .post(process.env.VUE_APP_API_BACKEND + "/searchCatagory2", {
      text_search: this.searchHome,
      user: user,
    })
    .then((response) => {
      this.dataExcel = response.data;
      this.$refs.searchDataHome.searchDataHomeTable(this.dataExcel);
      this.isSearching = false; // เปลี่ยนค่าเป็น false เมื่อค้นหาเสร็จ
    })
    .catch((error) => {
      console.error("Error during search:", error);
      this.isSearching = false; // เปลี่ยนค่าเป็น false เมื่อมีข้อผิดพลาด
    });
},

resetData() {
  // ฟังก์ชันเพื่อรีเซ็ตข้อมูลในตารางเมื่อไม่มีการค้นหา
  this.dataExcel = []; // รีเซ็ตข้อมูล
  this.$refs.searchDataHome.searchDataHomeTable(this.dataExcel); // อัปเดตตารางด้วยข้อมูลที่ว่าง
},
    // searchDataTable() {
    //   // console.log(this.searchHome)
    //   var user = Encode.encode(JSON.stringify(this.userData));
    //   this.axios
    //     .post(process.env.VUE_APP_API_BACKEND + "/searchCatagory2", {
    //       text_search: this.searchHome,
    //       user: user,
    //     })
    //     .then((response) => {
    //       this.dataExcel = response.data;
    //       // //console.log(this.dataExcel)
    //       this.$refs.searchDataHome.searchDataHomeTable(this.dataExcel);
    //     });
    // },
    checkLink() {
      // //console.log('v.23/8/62 17.53 pm.');
      // console.log(this.userData);
      var param = window.location.pathname;
      var name = param.split("/");
      if (name[1] === "resetpassword") {
        // //console.log('==========mmmm')
        this.$refs.login.checkLink();
        // this.$refs.resetPassword.open(name[2])
      } else if (name[1] === "verify") {
        this.$refs.login.checkLink();
      }
    },
    checkID(id) {
      if (id.length != 13) return false;
      for (i = 0, sum = 0; i < 12; i++)
        sum += parseFloat(id.charAt(i)) * (13 - i);
      if ((11 - (sum % 11)) % 10 != parseFloat(id.charAt(12))) return false;
      return true;
    },
    toPathSource(text) {
      this.$router.push(`/opendata/${text}`);
    },
    warnNotClick() {
      this.$swal("รายการนี้ยังไม่มีข้อมูล", "", "warning");
    },
    openLogin() {
      this.$refs.openLogin.open();
    },
    openRegister() {
      this.$refs.openRegister.opendialog();
    },
    pathIcon(icon) {
      return `/opendataIcon/icon-two/${icon}`;
    },

    idleTimer() {
      // //console.log(this.timeautologout);
      var t;
      //window.onload = resetTimer;
      document.onmousemove = resetTimer; // catches mouse movements
      document.onmousedown = resetTimer; // catches mouse movements
      document.onclick = resetTimer; // catches mouse clicks
      document.onscroll = resetTimer; // catches scrolling
      document.onkeypress = resetTimer; //catches keyboard actions
      const logout = () => {
        this.axios
          .post(process.env.VUE_APP_API_BACKEND + "/logout", {
            user_id: Encode.encode(this.userData.user_id),
          })
          .then((response) => {
            // //console.log(response.data.status)
            if (response.data.status === "success") {
              // this.$swal('Your session has timed out','','warning')
              this.$cookies.remove("information", "/", process.env.DOMAIN);

              this.$store.commit("setDataProfile", false);
              localStorage.setItem("user_id", "");
              // // this.$router.push('/')
              // window.location.href = '/';

              // this.reloadPage()
              this.$swal("Your session has timed out", "", "warning").then(
                (response) => {
                  // this.reloadPage()
                  // window.location.href = '/';
                  this.$router.push("/");
                  this.reloadPage();
                }
              );
            }
          });
      };
      function resetTimer() {
        clearTimeout(t);

        //  //console.log( localStorage.getItem("logouttime"));

        t = setTimeout(logout, localStorage.getItem("logouttime")); // time is in milliseconds (1000 is 1 second)
        // t= setTimeout(reload, 1500);  // time is in milliseconds (1000 is 1 second)
        // update timestam
      }
    },
    // logout () {
    //   this.$cookies.remove('information', '/', process.env.DOMAIN)
    //   this.$cookies.remove('usertype', '/', process.env.DOMAIN)
    //   this.$store.commit('setDataProfile', false)
    //   this.$router.push('/')
    // },
    logout() {},
    drawerMini(key) {
      this.mini = key;
    },
    reloadPage() {
      window.location.reload();
    },
    timelogout() {
      this.axios
        .post(process.env.VUE_APP_API_BACKEND + "/getTimeAutoLogout", {})
        .then((response) => {
          // //console.log(response.data);
          this.timeautologout = response.data;
          localStorage.setItem("logouttime", response.data);
        });
    },
    // getCategoryByUser() {
    //   var user = Encode.encode(JSON.stringify(this.userData));

    //   this.axios.post(process.env.VUE_APP_API_BACKEND + '/getCategoryByUser', {
    //     'user': user
    //   }, {
    //   }).then((response) => {
    //     // console.log(response.data.data);
    //     this.category = response.data.data

    //   })
    // }
    getCategoryByUser() {
      var user = Encode.encode(JSON.stringify(this.userData));

      this.axios
        .post(process.env.VUE_APP_API_BACKEND + "/getCategoryByUser", {
          user: user,
        })
        .then((response) => {
          this.category = response.data.data;
          this.loading = false; // การโหลดเสร็จสิ้น
          this.noData = this.category.length === 0; // เช็คว่ามีข้อมูลหรือไม่
        })
        .catch((error) => {
          console.error(error);
          this.loading = false; // การโหลดเสร็จสิ้นในกรณีเกิดข้อผิดพลาด
          this.noData = true; // หากมีข้อผิดพลาด ให้แสดงว่าไม่มีข้อมูล
        });
    },
  },
};
</script>

<style lang="css" scoped="">
/* .searchText {
  display: block; 
} */
.headpsu {
  z-index: 1000;
}
.fab-button {
  position: fixed;
  top: 10px;
  right: 10px;
  /* z-index: 1000; */
}

.search-box {
  background: transparent !important; /* Make background transparent */
  box-shadow: none; /* Remove any shadow */
  border: none; /* Remove border if needed */
  position: fixed; /* Fix position for mobile */
  top: 15px;
  right: 70px;
  width: 100%;
  max-width: 280px;
  z-index: 1000;
}

@media (min-width: 1024px) {
  .search-box {
    display: none; /* Hide the search box on desktop */
  }
}

.fab-button {
  /* position: fixed; */
  top: 10px;
  right: 10px;
  /* z-index: 1000; */
}

.textcat {
  text-align: center;
  display: block;
  color: #015779;
  font-size: 28px;
  padding: 5px;
  font-weight: bold; /* เพิ่มตัวหนา */
}
.underline {
  width: 100px; /* กำหนดความกว้างของเส้น */
  height: 15px; /* ความหนาของเส้น */
  background: linear-gradient(
    to right,
    #add8e6,
    #d8bfd8
  ); /* ไล่เฉดสีแบบในภาพ */
  border-radius: 10px; /* ทำให้เส้นกลมที่ขอบ */
  margin: 0 auto; /* จัดให้อยู่ตรงกลาง */
  margin-top: 10px; /* เว้นระยะห่างจากข้อความ */
}
.skeleton-loader {
  display: flex;
  align-items: center;
  justify-content: center;
}

.custom-btn {
  /* กำหนดความกว้างของปุ่มให้เหมาะสม */
  max-width: 200px; /* ปรับความกว้างตามที่ต้องการ */
  width: 100%; /* ให้ปุ่มไม่เกินความกว้างของ container */
  display: inline-block; /* ให้ปุ่มไม่ยืดเต็มความกว้าง */
}
.card-container {
  /* Ensures full-width container with padding and margin adjustments */
  padding: 0;
  padding-bottom: 300px;
  margin: 0;
}

.card-row {
  /* Adjusts the layout direction based on screen size */
  padding-top: 50px;
  display: flex;
  /* flex-wrap: wrap; */
  margin-left: -8px; /* Adjust to remove gutter space if needed */
  margin-right: -8px; /* Adjust to remove gutter space if needed */
}

/* Ensures proper alignment and spacing of items */
.card-item-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 16px;
}

.card-item {
  display: flex;
  flex-direction: column;
  justify-content: center; /* Center content vertically */
  align-items: center; /* Center content horizontally */
  text-align: center; /* Center text horizontally */
}

.card-title {
  margin-top: 8px;
}
/* Styles for mobile devices */
@media (max-width: 599px) {
  .card-row {
    /* Displays cards in a vertical stack on mobile */
    flex-direction: column;
    align-items: center;
  }

  .card-item-container {
    /* Ensures cards stack vertically and center-align */
    flex: 0 0 100%;
    max-width: 100%;
  }
}

/* Styles for desktop devices */
@media (min-width: 600px) {
  .card-row {
    /* Displays cards in a horizontal row on desktop */
    flex-direction: row;
    align-items: flex-start;
  }

  .card-item-container {
    /* Ensures cards align horizontally */
    flex: 0 0 25%; /* Adjust percentage based on number of columns */
    max-width: 25%; /* Adjust percentage based on number of columns */
  }
}

.custom-parallax {
  max-height: 300px !important;
}
.parallax-title {
  color: white;
}
.anime-inner-grow:hover {
  box-shadow: 0px 0px 9px 0px rgb(120, 133, 255);
  transform: scale(1.1);
  background-color: #82b1ff;
}

.anime-inner-grow {
  transition: all 0.2s ease-in-out;
}

.anime-inner-grow:hover .textCategorycolortext {
  color: blue lighten-2;
}

.list-title:hover {
  background-color: #82b1ff;
}

.grow-outer {
  transform: scale(1);
  transition: transform 0.3s ease-out;
}

.grow-outer:hover {
  transform: scale(1.05);
}

.grow-inner {
  display: inline-block;
  position: relative;
}

.grow-inner:before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
  background-color: rgba(41, 126, 255, 0.2);
  transform: scale(0.1);
  transition: transform 0.3s ease-out;
}

.grow-inner:hover:before {
  transform: scale(1);
}

.text-category {
  display: block;
  margin: auto;
}

.v-list__tile__title {
  /* margin: 5px 0px 5px 0px; */
  /* height: 30px; */
  /* height: 0px; */
  /* line-height: normal; */
  /* text-align: left; */
}

.imagebanner-mb {
  display: none;
}

/* .v-list__tile__title {
    height: 0px;
    line-height: normal;
    text-align: left;
  } */

>>> aside.drawer-menu.v-navigation-drawer.v-navigation-drawer--clipped.v-navigation-drawer--fixed.v-navigation-drawer--open.theme--light {
  height: 90% !important;
  margin-top: 0px;
  max-height: calc(100% - 0px);
  transform: translateX(0px);
  width: 300px;
}
.light-blue-background {
  background-color: #add8e6; /* สีฟ้าอ่อน */
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

.imagebanner {
  max-width: 1830px;
  /* padding-top: 60px; */
  width: 100%;
  height: auto;
}

.textCategorycolortext {
  font-size: 12px;
  /* position: fixed; */
  /* padding: 4px !important; */
  color: #000;
  white-space: normal;
  overflow: initial;
  word-break: break-word;
}

.colortextBlack {
  color: #000;
}

>>> .v-expansion-panel__header__icon {
  display: none;
}

.imageSize-tab-true {
  width: 100%;
  height: 100%;
  max-width: 40px;
  max-height: 40px;
  display: block;
  margin: 0 auto;
}

.imageSize-tab-false {
  width: 100%;
  height: 100%;
  max-width: 40px;
  max-height: 40px;
  display: block;
  margin: 0 auto;
}

.imageSize {
  width: 150px !important;
  height: 80px !important;
}

.searchText {
  max-width: 400px;
  margin: auto !important;
  display: block;
}

.search-top {
  /* margin-top: -110px; */
  /* margin-bottom: 34px; */
  padding-top: 130px;
}

.table-download {
  /* margin-left: 20px; */
  /* padding-right: 20px;
    padding-top: 20px */
}

.table-new {
  padding-bottom: 20px;
  /* margin-left: 20px; */
  /* padding-top: 20px */
}

.table-new-false {
  margin-left: 10%;
}

>>> .v-expansion-panel__header {
  padding: 10px 0px !important;
}

>>> .swal2-modal .swal2-title {
  font-size: 24px !important;
}

.pointer {
  cursor: pointer;
}

.drawer-menu {
  background-color: #fafafa;
  transform: translateY(64px) !important;
}

.headerErexpansion {
  padding-top: 0px;
  box-shadow: none;
}

.textCategory {
  font-size: 15px;
  position: fixed;
  padding-top: 4px !important;
}

>>> .theme--light.v-expansion-panel
  .v-expansion-panel__container
  .v-expansion-panel__header
  .v-expansion-panel__header__icon
  .v-icon {
  /* transform: translateX(100px)!important; */
}

>>> .logotext {
  height: 45px !important;
}

>>> .white--text {
  color: #212121 !important;
  caret-color: #212121 !important;
}

@media (max-width: 1024px) {
  .parallax-title {
    font-size: 24px; /* ลดขนาดตัวหนังสือเมื่อหน้าจอเล็กลง */
  }
  .tableserch {
    padding-left: 60px !important;
  }

  .table-new-down {
    padding-left: 20px;
  }

  .imagebanner {
    max-width: 1830px;
    padding-top: 25px;
    width: 100%;
    height: auto;
  }

  .searchText {
    max-width: 240px;
    margin: auto !important;
    display: block;
  }

  .search-top {
    /* margin-top: -80px; */
    /* margin-bottom: 5px; */
    padding-top: 100px;
  }
}

@media (max-width: 768px) {
  .custom-parallax {
    max-height: 200px !important; /* ลดความสูงของ parallax */
  }

  .parallax-title {
    font-size: 18px; /* ลดขนาดตัวหนังสือเมื่อหน้าจอเล็กลง */
    padding-top: 8px;
    padding-bottom: 8px;
  }

  .searchText {
    font-size: 14px; /* ลดขนาดตัวหนังสือในกล่องค้นหา */
  }
  .imagebanner-mb {
    display: block;
    max-width: 100%;
    height: auto;
    padding-left: 60px;
  }

  .imagebanner {
    display: none;
    max-width: 100%;
    height: auto;
  }

  .search-top {
    /* margin-top: -170px; */
    /* margin-bottom: 95px; */
  }

  .table-new {
    /* padding-left: 75px; */
  }

  .table-download {
    padding-top: 0px;
    /* padding-left: 75px; */
    padding-right: 0px;
  }

  .searchText {
    max-width: 360px;
    margin: auto !important;
    display: block;
    padding-left: 40px;
  }

  .tableserch {
    padding-left: 60px !important;
  }

  /*
    .textCategorycolortext {
      font-size: 15px;
      position: fixed;
      padding: 4px !important;
      color: #000;
      padding-left: 15px;
    } */

  .textCategory {
    font-size: 15px;
    position: fixed;
    padding-top: 4px !important;
    padding-left: 15px;
  }

  .drawer-menu {
    background-color: #fafafa;
    transform: translateY(63px) !important;
  }

  .company-name {
    /* font-family: "Kanit", sans-serif; */
    margin-bottom: 0px;
    font-size: 50px;
    font-weight: 500;
    color: #0165ba;
    /* font-size: 28px; */
  }

  .bg {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background: src("/opendataIcon/bg.jpg") no-repeat no-repeat center center
      fixed;
    background-size: cover;
    /* transform: scale(1.1); */
    /* height: 100vh; */
  }
}
@media (max-width: 430px) {
  .drawer-menu {
    background-color: #fafafa;
    transform: translateY(63px) !important;
  }
  .custom-parallax {
    max-height: 250px !important; /* ลดความสูงของ parallax */
  }

  .parallax-title {
    font-size: 24px; /* ลดขนาดตัวหนังสือเมื่อหน้าจอเล็กลง */
    padding-top: 6px;
    padding-bottom: 6px;
    text-align: center;
  }

  .searchText {
    font-size: 12px; /* ลดขนาดตัวหนังสือในกล่องค้นหา */
    max-width: 250px;
    margin: auto !important;
    display: block;
  }
}
@media (min-width: 768px) {
  .responsive-banner {
    max-width: 550px; /* ขนาดสูงสุดเมื่ออยู่บน Desktop */
    width: 100%; /* ขยายภาพตามขนาดของ container */
  }
  .responsive-banner-icon {
    position: absolute;
    max-width: 20%; /* ให้ภาพเต็มหน้าจอมือถือ */
    width: 100%; /* ขยายภาพตามความกว้างของหน้าจอ */
    height: auto; /* รักษาสัดส่วนของภาพ */
    margin: 180px;
    padding-left: 20px;
    animation: moveUpDown 2s ease-in-out infinite;
  }

  @keyframes moveUpDown {
    0% {
      transform: translateY(0); /* เริ่มต้นที่ตำแหน่งเดิม */
    }
    50% {
      transform: translateY(-10px); /* เลื่อนขึ้น 10px */
    }
    100% {
      transform: translateY(0); /* กลับไปที่ตำแหน่งเดิม */
    }
  }
  /* .responsive-banner-icon {
    max-width: 300px; 
    width: 100%; 

    position: absolute;
    left: 1300px;
    pad

    transform: matrix(1, 0, 0.01, 1, 0, 0);
    
  } */
}

/* สำหรับอุปกรณ์ที่มีหน้าจอเล็กกว่า 768px (Mobile) */
@media (max-width: 767px) {
  .responsive-banner {
    max-width: 100%; /* ให้ภาพเต็มหน้าจอมือถือ */
    width: 100%; /* ขยายภาพตามความกว้างของหน้าจอ */
    height: auto; /* รักษาสัดส่วนของภาพ */
  }
  .responsive-banner-icon {
    max-width: 80%; /* ให้ภาพเต็มหน้าจอมือถือ */
    width: 100%; /* ขยายภาพตามความกว้างของหน้าจอ */
    height: auto; /* รักษาสัดส่วนของภาพ */
    margin: 60px;
    animation: moveUpDown 2s ease-in-out infinite;
  }

  @keyframes moveUpDown {
    0% {
      transform: translateY(0); /* เริ่มต้นที่ตำแหน่งเดิม */
    }
    50% {
      transform: translateY(-10px); /* เลื่อนขึ้น 10px */
    }
    100% {
      transform: translateY(0); /* กลับไปที่ตำแหน่งเดิม */
    }
  }
}
.searchText ::v-deep .v-input__control {
  border-radius: 25px !important; /* ทำให้ขอบกลม */
  overflow: hidden; /* ป้องกันการล้นของขอบ */
  border: none !important; /* ลบเส้นขอบเดิมออก */
}

.searchText ::v-deep .v-input__slot {
  border-radius: 25px !important; /* ทำให้ขอบกลม */
  border: 1px solid #d3d3d3 !important; /* เพิ่มเส้นขอบสีเทาอ่อนบางๆ */
}

.searchText ::v-deep .v-input__append-inner {
  border-radius: 0 25px 25px 0 !important; /* ให้ขอบขวาของไอคอนกลม */
}

.logo-footer {
  max-width: 60px !important; /* ขนาดสูงสุดที่ต้องการ */
  max-height: 60px !important; /* กำหนดความสูงสูงสุด */
  height: auto !important; /* ป้องกันการบิดเบี้ยว */
  display: block !important; /* ให้แน่ใจว่ามันไม่เป็น inline */
  margin: 0 auto; /* จัดกลาง */
}
.background-container {
  background-image: url("/opendataIcon/footer.png"); /* ตั้งค่าภาพพื้นหลัง */
  background-size: cover; /* ให้ภาพเต็มพื้นที่ */
  max-width: 600px;
  background-position: center; /* จัดตำแหน่งภาพให้อยู่ตรงกลาง */
  height: 100px; /* ความสูงของ container */
  padding: 0;
  margin: 0;
}

.footer-container {
  background-image: url("/opendataIcon/footer.png"); /* ใช้รูปภาพเป็นพื้นหลัง */
  background-size: cover; /* ปรับขนาดให้เต็มพื้นที่ */
  background-position: top; /* จัดตำแหน่งรูปภาพให้อยู่กลาง */
  background-repeat: no-repeat; /* ไม่ให้รูปภาพซ้ำ */
  min-height: 580px; /* กำหนดความสูงขั้นต่ำ */
  padding: 20px; /* เพิ่มระยะห่างด้านใน */
  display: flex;
  justify-content: space-between; /* จัดเรียงคอลัมน์ในแนวนอน */
  flex-wrap: wrap; /* ให้คอลัมน์ไหลลงเมื่อพื้นที่ไม่พอ */
  position: relative; /* ทำให้ภาพพื้นหลังอยู่ในตำแหน่งที่ถูกต้อง */
  color: white; /* เปลี่ยนสีข้อความให้มองเห็นได้ชัดบนภาพพื้นหลัง */
}
.footer-item {
  flex: 1 1 24%; /* กำหนดให้แต่ละคอลัมน์มีความกว้างอย่างน้อย 24% ของคอนเทนเนอร์ */
  padding: 30px; /* ระยะห่างระหว่างคอลัมน์ */
  padding-top: 200px;
  box-sizing: border-box; /* ให้รวม padding ในการคำนวณความกว้าง */
  display: flex; /* ใช้ Flexbox */
  flex-direction: column; /* จัดเรียงในแนวตั้ง */
  align-items: center; /* จัดกลางแนวนอน */
  text-align: center; /* จัดข้อความให้อยู่กลาง */
}
.footer-text {
  color: rgb(255, 255, 255); /* ตั้งค่าสีของข้อความ */
  font-size: 16px;
  text-align: center; /* จัดข้อความให้กึ่งกลาง */
}

h3 {
  color: rgb(255, 255, 255); /* ตั้งค่าสีของหัวข้อ */
  font-size: 18px;
  margin-bottom: 10px;
}

.footer-column ul {
  padding: 0; /* ลบการ padding ของ ul */
  list-style-type: none; /* ลบ bullet ของ list */
  color: rgb(255, 255, 255); /* ตั้งค่าสีของข้อความใน list */
}
.v-row {
  display: flex; /* ให้แน่ใจว่า v-row ใช้ flexbox */
  flex-wrap: wrap; /* ให้แน่ใจว่า columns สามารถ wrap ได้ */
}
/* Media Query สำหรับ Mobile */
@media (max-width: 820px) {
  .logo-footer-layout {
    padding-top: 50px;
  }
  .footer-container {
    min-height: auto; /* ใช้ความสูงอัตโนมัติ */
    padding: 10px; /* ลดการ padding */
  }

  .footer-item {
    flex: 1 1 100%; /* ให้แต่ละคอลัมน์เต็มความกว้าง */
    padding: 10px; /* ลดการ padding */
    padding-top: 10px; /* ให้มีระยะห่างระหว่างเนื้อหา */
  }

  .footer-text {
    font-size: 12px; /* ขนาดข้อความเล็กลง */
  }

  h3 {
    font-size: 14px; /* ขนาดหัวข้อเล็กลง */
  }
}
</style>
