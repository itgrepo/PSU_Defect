<template lang="html">
  <v-container>
    <table class="table">
      <thead class="tb-header">
        <v-layout row wrap class="headertable">
          <v-flex xs6 sm6 md6 lg6 xl6 class="text-center">{{ $t("reportname") }}</v-flex>
          <v-flex xs3 sm3 md3 lg3 xl2 class="text-center">{{ $t("dashboard") }}</v-flex>
          <v-flex xs3 sm3 md3 lg3 xl2 class="text-center">{{ $t("metadata") }}</v-flex>
        </v-layout>
      </thead>
      <v-flex class="tableFixHead">
        <table class="table">
          <tbody
            v-for="(itemSubCategory, index) in filterBySearch"
            :id="test(index)"
            :class="{ padd: index === 0 }"
          >
            <v-layout row wrap class="text-subcategory">
              <v-flex xs12 sm12 md12 lg12 xl12>{{
                itemSubCategory.key
              }}</v-flex>
            </v-layout>
            <v-layout
              row
              wrap
              v-for="detailSubCategory in itemSubCategory.values"
              class="colortr"
            >
              <v-flex xs3 sm3 md3 lg5 xl6 class="table-center">
                {{ detailSubCategory.export_excel_name }}
              </v-flex>

              <v-flex xs3 sm3 md3 lg3 xl2   class="td-cursor text-center">
                <div
                  v-if="
                    detailSubCategory.Link_name == null ||
                    detailSubCategory.Link_name == '' ||
                    detailSubCategory.Link_name == 'None'
                  "
                  @click="nolinkdashboard()"
                >
                  <img
                    class="imageSize"
                    src="/opendataIcon/icon/dashboardbb&w.png"
                    alt="fireSpot"
                  />
                </div>
                <div v-else @click="toPathSource(detailSubCategory.source_id)">
                  <img
                    class="imageSize"
                    src="/opendataIcon/icon/dashboard.png"
                    alt="fireSpot"
                  />
                </div>
              </v-flex>
              <v-flex xs3 sm3 md3 lg3 xl2  class="td-cursor text-center">
                <v-dialog
              max-width="1000px"
              hide-overlay
              transition="dialog-bottom-transition"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  icon
                  v-bind="attrs"
                  v-on="on"
                  @click="getMetadataDetail(detailSubCategory.source_id)"
                >
                  <img
                    class="imageSize"
                    src="/opendataIcon/icon/files.png"
                    alt="fireSpot"
                  />
                </v-btn>
              </template>
              <v-card>
                <v-toolbar dark color="#10316B">
                  <v-toolbar-title>{{ $t("metadata") }}</v-toolbar-title>
                  <v-spacer></v-spacer>
                  <v-toolbar-items></v-toolbar-items>
                </v-toolbar>

                <v-container
                  fluid
                  v-for="(metadata, index) in metadataDetail"
                  :key="index"
                >
                  <v-layout row wrap align-start justify-center>
                    <v-flex xs12 sm6 md6>
                      <v-card tile flat dark color="#10316B">
                        <h2
                          class="text-center font-contact font-weight-bold color-white"
                        >
                        {{ $t("section") }}
                        </h2>
                      </v-card>
                    </v-flex>
                    <v-flex xs12 sm6 md6>
                      <v-card tile flat dark color="#10316B">
                        <h2
                          class="text-center font-contact font-weight-bold color-white"
                        >
                        {{ $t("value") }}
                        </h2>
                      </v-card>
                    </v-flex>
                  </v-layout>
                  <v-layout row wrap align-start justify-center>
                    <v-flex xs12 sm6 md6>
                      <v-card tile flat color="grey lighten-4">
                        <p class="company-name">* {{ $t('datasettype') }} </p>
                      </v-card>
                    </v-flex>
                    <v-flex xs12 sm6 md6>
                      <v-card tile flat color="grey lighten-4">
                        <p class="company-name text-left">
                          {{ metadata.data_type }}
                        </p>
                      </v-card>
                    </v-flex>
                  </v-layout>
                  <v-layout row wrap align-start justify-center>
                    <v-flex xs12 sm6 md6 dense outlined>
                      <v-card tile flat color="white">
                        <p class="company-name">{{ $t('reprotid') }} </p>
                      </v-card>
                    </v-flex>
                    <v-flex xs12 sm6 md6 dense outlined>
                      <v-card tile flat color="white">
                        <p class="company-name text-left">
                          {{ metadata.source_id }}
                        </p>
                      </v-card>
                    </v-flex>
                  </v-layout>
                  <v-layout row wrap align-start justify-center>
                    <v-flex xs12 sm6 md6 dense outlined>
                      <v-card tile flat color="grey lighten-4">
                        <p class="company-name">{{ $t('datasetname') }} </p>
                      </v-card>
                    </v-flex>
                    <v-flex xs12 sm6 md6 dense outlined>
                      <v-card tile flat color="grey lighten-4">
                        <p class="company-name text-left">
                          {{ metadata.export_excel_name }}
                        </p>
                      </v-card>
                    </v-flex>
                  </v-layout>
                  <v-layout row wrap align-start justify-center>
                    <v-flex xs12 sm6 md6>
                      <v-card tile flat color="white">
                        <p class="company-name">{{ $t('des') }}</p>
                      </v-card>
                    </v-flex>
                    <v-flex xs12 sm6 md6>
                      <v-card tile flat color="white">
                        <p class="company-name text-left">
                          {{ metadata.description }}
                        </p>
                      </v-card>
                    </v-flex>
                  </v-layout>
                  <v-layout row wrap align-start justify-center>
                    <v-flex xs12 sm6 md6>
                      <v-card tile flat color="grey lighten-4">
                        <p class="company-name">* {{ $t('org') }}</p>
                      </v-card>
                    </v-flex>
                    <v-flex xs12 sm6 md6>
                      <v-card tile flat color="grey lighten-4">
                        <p class="company-name text-left">
                          {{ metadata.organization.org_name }}
                        </p>
                      </v-card>
                    </v-flex>
                  </v-layout>
                  <v-layout row wrap align-start justify-center>
                    <v-flex xs12 sm6 md6>
                      <v-card tile flat color="white">
                        <p class="company-name">* {{ $t('contactname') }}</p>
                      </v-card>
                    </v-flex>
                    <v-flex xs12 sm6 md6>
                      <v-card tile flat color="white">
                        <p class="company-name text-left">
                          {{ metadata.contactor_name}}
                        </p>
                      </v-card>
                    </v-flex>
                  </v-layout>
                  <v-layout row wrap align-start justify-center>
                    <v-flex xs12 sm6 md6>
                      <v-card tile flat color="grey lighten-4">
                        <p class="company-name">* {{ $t('infoservices') }}</p>
                      </v-card>
                    </v-flex>
                    <v-flex xs12 sm6 md6>
                      <v-card tile flat color="grey lighten-4">
                        <p class="company-name text-left">
                          {{ metadata.information_waiter }}
                        </p>
                      </v-card>
                    </v-flex>
                  </v-layout>
                  <v-layout row wrap align-start justify-center>
                    <v-flex xs12 sm6 md6>
                      <v-card tile flat color="white">
                        <p class="company-name">* {{ $t('contactname') }}</p>
                      </v-card>
                    </v-flex>
                    <v-flex xs12 sm6 md6>
                      <v-card tile flat color="white">
                        <p class="company-name text-left">
                          {{ metadata.contactor_name }}
                        </p>
                      </v-card>
                    </v-flex>
                  </v-layout>
                  <v-layout row wrap align-start justify-center>
                    <v-flex xs12 sm6 md6>
                      <v-card tile flat color="grey lighten-4">
                        <p class="company-name">* {{ $t('contactmail') }}</p>
                      </v-card>
                    </v-flex>
                    <v-flex xs12 sm6 md6>
                      <v-card tile flat color="grey lighten-4">
                        <p class="company-name text-left">
                          {{ metadata.contactor_email }}
                        </p>
                      </v-card>
                    </v-flex>
                  </v-layout>
                
                  <v-layout row wrap align-start justify-center>
                    <v-flex xs12 sm6 md6>
                      <v-card tile flat color="white">
                        <p class="company-name">* {{ $t('govcate') }}</p>
                      </v-card>
                    </v-flex>
                    <v-flex xs12 sm6 md6>
                      <v-card tile flat color="white">
                        <p class="company-name text-left">
                          {{ metadata.topic_gorvernance }}
                        </p>
                      </v-card>
                    </v-flex>
                  </v-layout>
                  <v-layout row wrap align-start justify-center>
                    <v-flex xs12 sm6 md6>
                      <v-card tile flat color="grey lighten-4">
                        <p class="company-name">* {{ $t('objective') }}</p>
                      </v-card>
                    </v-flex>
                    <v-flex xs12 sm6 md6>
                      <v-card tile flat color="grey lighten-4">
                        <p class="company-name text-left">
                          {{ metadata.objective }}
                        </p>
                      </v-card>
                    </v-flex>
                  </v-layout>
                  <v-layout row wrap align-start justify-center>
                    <v-flex xs12 sm6 md6>
                      <v-card tile flat color="white">
                        <p class="company-name">
                          * {{ $t('data-relate-unit') }}
                        </p>
                      </v-card>
                    </v-flex>
                    <v-flex xs12 sm6 md6>
                      <v-card tile flat color="white">
                        <p class="company-name text-left">
                          {{ metadata.frequency }}
                        </p>
                      </v-card>
                    </v-flex>
                  </v-layout>
                  <v-layout row wrap align-start justify-center>
                    <v-flex xs12 sm6 md6>
                      <v-card tile flat color="grey lighten-4">
                        <p class="company-name">
                          {{ $t('dataupdate') }}
                        </p>
                      </v-card>
                    </v-flex>
                    <v-flex xs12 sm6 md6>
                      <v-card tile flat color="grey lighten-4">
                        <p class="company-name text-left">
                          {{ metadata.frequency_unit }}
                        </p>
                      </v-card>
                    </v-flex>
                  </v-layout>
                  <v-layout row wrap align-start justify-center>
                    <v-flex xs12 sm6 md6>
                      <v-card tile flat color="white">
                        <p class="company-name">* {{ $t('sponsor') }}</p>
                      </v-card>
                    </v-flex>
                    <v-flex xs12 sm6 md6>
                      <v-card tile flat color="white">
                        <p class="company-name text-left">
                          {{ metadata.supporter }}
                        </p>
                      </v-card>
                    </v-flex>
                  </v-layout>
                  <v-layout row wrap align-start justify-center>
                    <v-flex xs12 sm6 md6>
                      <v-card tile flat color="grey lighten-4">
                        <p class="company-name">* {{ $t('geo') }}</p>
                      </v-card>
                    </v-flex>
                    <v-flex xs12 sm6 md6>
                      <v-card tile flat color="grey lighten-4">
                        <p class="company-name text-left">
                          {{ metadata.geo_coverage }}
                        </p>
                      </v-card>
                    </v-flex>
                  </v-layout>
                  <v-layout row wrap align-start justify-center>
                    <v-flex xs12 sm6 md6>
                      <v-card tile flat color="white">
                        <p class="company-name">* {{ $t('source') }}</p>
                      </v-card>
                    </v-flex>
                    <v-flex xs12 sm6 md6>
                      <v-card tile flat color="white">
                        <p class="company-name text-left">
                          {{ metadata.data_source }}
                        </p>
                      </v-card>
                    </v-flex>
                  </v-layout>
                  <v-layout row wrap align-start justify-center>
                    <v-flex xs12 sm6 md6>
                      <v-card tile flat color="grey lighten-4">
                        <p class="company-name">* {{ $t('hvd') }}</p>
                      </v-card>
                    </v-flex>
                    <v-flex xs12 sm6 md6>
                      <v-card tile flat color="grey lighten-4">
                        <p class="company-name text-left">
                          {{ metadata.high_value_dataset }}
                        </p>
                      </v-card>
                    </v-flex>
                  </v-layout>
                  <v-layout row wrap align-start justify-center>
                    <v-flex xs12 sm6 md6>
                      <v-card tile flat color="white">
                        <p class="company-name">* {{ $t('datacollect') }}</p>
                      </v-card>
                    </v-flex>
                    <v-flex xs12 sm6 md6>
                      <v-card tile flat color="white">
                        <p class="company-name text-left">
                          {{ metadata.data_storage }}
                        </p>
                      </v-card>
                    </v-flex>
                  </v-layout>

                  <v-layout row wrap align-start justify-center>
                    <v-flex xs12 sm6 md6>
                      <v-card tile flat color="grey lighten-4">
                        <p class="company-name">datalicese</p>
                      </v-card>
                    </v-flex>
                    <v-flex xs12 sm6 md6>
                      <v-card tile flat color="grey lighten-4">
                        <p class="company-name text-left">
                          {{ metadata.data_license }}
                        </p>
                      </v-card>
                    </v-flex>
                  </v-layout>
                  <v-layout row wrap align-start justify-center>
                    <v-flex xs12 sm6 md6>
                      <v-card tile flat color="white">
                        <p class="company-name">{{ $t('conditions') }}</p>
                      </v-card>
                    </v-flex>
                    <v-flex xs12 sm6 md6>
                      <v-card tile flat color="white">
                        <p class="company-name text-left">
                          {{ metadata.data_condition }}
                        </p>
                      </v-card>
                    </v-flex>
                  </v-layout>
                  <v-layout row wrap align-start justify-center>
                    <v-flex xs12 sm6 md6>
                      <v-card tile flat color="grey lighten-4">
                        <p class="company-name">{{ $t('datainitial') }}</p>
                      </v-card>
                    </v-flex>
                    <v-flex xs12 sm6 md6>
                      <v-card tile flat color="grey lighten-4">
                        <p class="company-name text-left">
                          {{ formatDate(metadata.create_at) }}
                        </p>
                      </v-card>
                    </v-flex>
                  </v-layout>
                  <v-layout row wrap align-start justify-center>
                    <v-flex xs12 sm6 md6>
                      <v-card tile flat color="white">
                        <p class="company-name">{{ $t('lastupdate') }}</p>
                      </v-card>
                    </v-flex>
                    <v-flex xs12 sm6 md6>
                      <v-card tile flat color="white">
                        <p class="company-name text-left">
                          {{ formatDate(metadata.modified_date) }}
                        </p>
                      </v-card>
                    </v-flex>
                  </v-layout>

                </v-container>
              </v-card>
            </v-dialog>
              </v-flex>
            
            </v-layout>
          </tbody>
        </table>
      </v-flex>
    </table>
  </v-container>
</template>

<script>
import _ from "lodash";
import { Encode, Decode } from "@/services";
import { log } from "util";
export default {
  data() {
    return {
      Widthipad: "",
      // detailSubCategory:True,
      id: "",
      mini: "",
      data: [],
      drawer: true,
      subCategory: [],
      searchTxt: "",
      filterBySearch: [],
      checkIdSubCate: "",
      category: [],
      metadataDetail: [],
    };
  },
  created() {
    // this.getCategoryByUser()
    this.getDataExportExcel();
    this.getUrl();
  },
  mounted() {
    // this.getCategoryByUser()
    this.Tableipad();
    // this.getUrl();
    this.getDataExportExcel();
  },
  computed: {
    userData() {
      if (this.$cookies.isKey("information")) {
        return JSON.parse(Decode.decode(this.$cookies.get("information")));
      } else {
        return "";
      }
    },
    subCategoryName: {
      get() {
        return this.$store.getters.getDataSubCategory;
      },
    },
  },
  methods: {
    getMetadataDetail(data) {
      console.log("TestDetail");
      console.log(data);

      this.axios
        .post(process.env.VUE_APP_API_BACKEND + "/showMetadata", {
          source_id: data,
        })
        .then((response) => {
          this.metadataDetail = [response.data];
        })
        .catch((error) => {
          console.error("Error fetching metadata:", error);
        });
    },
    getCategoryByUser() {
      // console.log('444444444444444444444444444');
      var user = Encode.encode(JSON.stringify(this.userData));
      this.axios
        .post(process.env.VUE_APP_API_BACKEND + "/getCategoryByUser", {
          user: user,
        })
        .then((response) => {
          // console.log(response.data.data);
          this.category = response.data.data;
        });
    },
    Tableipad() {
      this.Widthipad = window.screen.availWidth;
      // console.log(this.Widthipad);
    },
    toPathSource(text) {
      // //console.log(text);
      var nametext = "";
      var textname = text.split(" ");
      for (let i = 0; i < textname.length; i++) {
        nametext = nametext + textname[i];
      }
      // //console.log(this.data);
      // //console.log(nametext);
      if (this.userData) {
        let routeData = this.$router.resolve(`/view/dashboard/${nametext}`);
        window.open(routeData.href);
      } else {
        this.$swal("Please login", "", "warning");
      }
    },
    pathUrl(param) {
      var name = param.split("#");
      return name[0];
    },
    searchDataHomeTable(searchTxt) {
      if (searchTxt !== "None") {
        this.setDataSearch(searchTxt.result);
      } else {
        this.getDataExportExcel();
      }
    },
    test(index) {
      this.checkIdSubCate = index;
      return index;
    },
    searchTable(searchTxt) {
      if (searchTxt !== "None") {
        this.setDataSearch(searchTxt.result);
      } else {
        this.getDataExportExcel();
      }
    },
    setDataSearch(data) {
      this.filterBySearch = d3
        .nest()
        .key((d) => d.sub_category_name)
        .entries(data);
    },
    getUrl() {
      var user = Encode.encode(JSON.stringify(this.userData));
      this.axios
        .post(process.env.VUE_APP_API_BACKEND + "/getCategoryByUser", {
          user: user,
        })
        .then((response) => {
          this.category = response.data.data;
          var param = window.location.href;
          param = decodeURIComponent((param + "").replace(/\+/g, "%20"));
          var name = param.split("/opendata/");
          // console.log(this.category.length);
          for (var i = 0; i < this.category.length; i++) {
            var check = this.pathUrl(name[1]);
            // console.log(check);
            if (this.category[i].name === check) {
              this.nameCategory = this.category[i].name;
              this.id = this.category[i].category_id;
              // console.log(this.id);
              // this.panel[i] = true
              // this.getDataExportExcel()
            }
          }
          this.getDataExportExcel();
          // this.checkPanel = this.panel
          // this.getDataCategory()
        });
      // var param = window.location.href;
      // param = decodeURIComponent((param + '').replace(/\+/g, '%20'));
      // var name = param.split("/opendata/");

      // for (var i = 0; i < this.category.length; i++) {
      //   var check = this.pathUrl(name[1]);
      //   if (this.category[i].name === check) {
      //     this.id = this.category[i].category_id;
      //   }
      // }
    },
    sendText(key) {
      window.scrollTo(0, 400);
      if (this.id !== key.category_id) {
        for (var i = 0; i < this.category.length; i++) {
          if (this.category[i].id === key.category_id) {
            this.$router.push(`/opendata/${this.category[i].name}`);
            this.id = key.category_id;
            this.getDataExportExcel();
          }
        }
      } else {
        this.getDataExportExcel();
      }
    },
    loadFile(link) {
      window.location.assign(link);
    },
    downloadFileMongo(item) {
      if (item.file_name !== "" && item.mongo_file_id_excel !== "") {
        var user_id = Encode.encode(this.userData.user_id);
        this.loadFile(
          process.env.VUE_APP_API_BACKEND +
            "/file/downloadFileMongo/" +
            item.file_name +
            ".xlsx?file_id=" +
            item.mongo_file_id_excel +
            "&user_id===" +
            user_id +
            "&firstname=" +
            this.userData.firstname +
            "&lastname=" +
            this.userData.lastname +
            "&file_type=excel"
        );
      } else {
        this.$swal("No file", "", "error");
      }
    },
    downloadFileMetadata(item) {
      if (item.file_name !== "" && item.mongo_file_id_metadata !== "") {
        this.loadFile(
          process.env.VUE_APP_API_BACKEND +
            "/file/downloadFileMetadataMongo/" +
            item.file_name +
            ".xlsx?file_id=" +
            item.mongo_file_id_metadata
        );
      } else {
        this.$swal("No file", "", "error");
      }
    },
    downloadFileMongoCsv(item) {
      if (item.file_name !== "" && item.mongo_file_id_csv !== "") {
        var user_id = Encode.encode(this.userData.user_id);
        this.loadFile(
          process.env.VUE_APP_API_BACKEND +
            "/file/downloadFileMongo/" +
            item.file_name +
            ".zip?file_id=" +
            item.mongo_file_id_csv +
            "&user_id===" +
            user_id +
            "&firstname=" +
            this.userData.firstname +
            "&lastname=" +
            this.userData.lastname +
            "&file_type=csv"
        );
      } else {
        this.$swal("No file", "", "error");
      }
    },
    formatDate(datetime) {
      var date = datetime.split("-");
      // var dates = datetime.split(",");
      if (date.length > 2) {
        var day = date[0];
        var month = date[1];
        var year = date[2];
        return day + "/" + month + "/" + year;
      } else if (date.length > 1) {
        var datetimes = date[0].split("/");
        var days = datetimes[1];
        var months = datetimes[0];
        var years = datetimes[2];
        return days + "/" + months + "/" + years;
      } else {
        var date = datetime.split(",");
        return date[0];
      }
    },
    setData() {
      this.filterBySearch = d3
        .nest()
        .key((d) => d.sub_category_name)
        .entries(this.data);
    },
    addNewFavorite(item) {
      //   //console.log(this.userData.user_id);
      //   //console.log(item.file_name);
      this.axios
        .post(process.env.VUE_APP_API_BACKEND + "/addNewFavorite", {
          user_id: this.userData.user_id,
          file_name: item,
        })
        .then((response) => {
          //console.log(response);
        });
    },
    open(key) {
      this.mini = key;
    },
    checkUserLoginCsv(item) {
      this.$cookies.get("consenticlaim");
      // //console.log(this.$cookies.get("consenticlaim") )
      if (this.$cookies.get("consenticlaim") === "no") {
        this.$swal(
          '<p class="font-text">กรุณากด "ยอมรับ" นโยบายการใช้คุกกี้ด้านล่าง และlog-in เข้าใช้งานก่อน</p>',
          "",
          "warning"
        );
      } else if (this.userData) {
        this.checkPermissionDownloadCsv(item);
      } else {
        this.$swal("Please login", "", "warning");
      }
    },
    checkUserLoginExcel(item) {
      if (this.$cookies.get("consenticlaim") === "no") {
        this.$swal(
          '<p class="font-text">กรุณากด "ยอมรับ" นโยบายการใช้คุกกี้ด้านล่าง และlog-in เข้าใช้งานก่อน</>',
          "",
          "warning"
        );
      } else if (this.userData) {
        this.checkPermissionDownloadExcel(item);
      } else {
        this.$swal("Please login", "", "warning");
      }
    },
    checkPermissionDownloadExcel(item) {
      // this.axios
      //   .post(process.env.VUE_APP_API_BACKEND + "/checkPermitDownloadfile", {
      //     user_id: this.userData.user_id,
      //     file_name: item.file_name
      //   })
      //   .then(response => {
      //     if (response.data.status === "download") {
      this.downloadFileMongo(item);
      //   } else {
      //     this.$swal("Please contact Admin", "warning");
      //   }
      // });
    },
    checkPermissionDownloadCsv(item) {
      // this.axios
      //   .post(process.env.VUE_APP_API_BACKEND + "/checkPermitDownloadfile", {
      //     user_id: this.userData.user_id,
      //     file_name: item.file_name
      //   })
      //   .then(response => {
      //     if (response.data.status === "download") {
      this.downloadFileMongoCsv(item);
      //   } else {
      //     this.$swal("Please contact Admin", "warning");
      //   }
      // });
    },
    getDataExportExcel() {
      // เรียกข้อมูลลงตาราง

      this.data = [];
      var user = Encode.encode(JSON.stringify(this.userData));

      // // if (this.userData) {
      // console.log(this.id);
      this.axios
        .post(process.env.VUE_APP_API_BACKEND + "/getDataSubCategoryMenu", {
          category_id: this.id,
          // Level_Master_id: this.userData.Level_Master_id,
          // previlage_id: this.userData.previlage_id,
          // user_id: this.userData.user_id
          user: user,
        })
        .then((response) => {
          // console.log(response);

          for (var i = 0; i < response.data.length; i++) {
            // //console.log(response.data);
            // //console.log(this.data);
            this.data = this.data.concat(response.data[i]);
            // console.log(this.data);
            // //console.log(this.data[i].favorite);
          }
          this.setData();
        });
      // } else {
      //   this.axios
      //     .post(process.env.VUE_APP_API_BACKEND + "/getDataSubCategoryMenu", {
      //       category_id: this.id,
      //       Level_Master_id: 1,
      //       previlage_id: 0,
      //       user_id: "nologin"
      //     })
      //     .then(response => {
      //       //console.log(response);

      //       for (var i = 0; i < response.data.length; i++) {
      //         this.data = this.data.concat(response.data[i]);
      //       }
      //       this.setData();
      //     });
      // }
    },
    getDataExportMetadata(id) {
      this.axios
        .post(process.env.VUE_APP_API_BACKEND + "/getDataExportMetadata", {
          source_id: id,
        })
        .then((response) => {
          //console.log(response);
          this.$cookies.get("consenticlaim");
          // //console.log(this.$cookies.get("consenticlaim") )
          if (this.$cookies.get("consenticlaim") === "no") {
            this.$swal(
              '<p class="font-text">กรุณากด "ยอมรับ" นโยบายการใช้คุกกี้ด้านล่างก่อน download</p>',
              "",
              "warning"
            );
          } else {
            this.downloadFileMetadata(response.data[0]);
          }
        });
    },
    nolinkapi() {
      this.$swal("No Link Api");
    },
    nolinkdashboard() {
      this.$swal("No Link Dashboard");
    },
    nofile() {
      this.$swal("No File");
    },
  },
};
</script>
<style lang="css" scoped="">
/* @import url("https://fonts.googleapis.com/css?family=Kanit&display=swap"); */
.table-center {
  word-break: break-word;
  font-size: 13px;
  display: block;
  margin: auto;
}

.checkbox {
  margin-top: 0px;
  padding-top: 0px;
  /* display: block; */
  /* margin: 0 auto; */
  padding-left: 30px;
}

.font-text {
  /* font-family: "Kanit", sans-serif; */
  font-size: 28px;
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

.tableFixHead {
  overflow-y: auto;
  max-height: 700px;
}

.tableFixHead th {
  position: sticky;
  top: 0;
}

table {
  border-collapse: collapse;
  width: 100%;
  table-layout: auto !important;
}

.imageSize-metaData {
  max-width: 35px;
  max-height: 35px;
  width: 100%;
  height: auto;
}

.imageSize-excel {
  max-width: 35px;
  max-height: 35px;
  width: 100%;
  height: auto;
}

.imageSize-csv {
  max-width: 35px;
  max-height: 35px;
  width: 100%;
  height: auto;
}

::-webkit-scrollbar {
  min-height: 450px;
}

.headertable {
  margin: 10px;
}

.colortr:nth-child(odd) {
  background-color: #ffffff !important;
}

.colortr:nth-child(even) {
  background-color: #f5f5f5 !important;
}

.colortr {
  padding: 5px;
}

.tb-header {
  background-color: #10316B;
  color: #fff;
  width: 100%;
  font-weight: 500;
  font-size: 15px;
}

.text-subcategory {
  font-size: 16px;
  font-weight: 700;
  width: 100%;
  text-align: left;
  padding: 8px 0 8px 10px !important;
  color: #00247c;
  background-color: #f5f5f5;
}

.td-cursor {
  cursor: pointer;
}

.td-cursor:hover {
  background-color: #144372;
}

.pp-5 {
  padding: 5px;
  font-size: 13px;
}

@media (max-width: 1024px) {
  .checkbox {
    margin-top: 0px;
    padding-top: 0px;
    /* display: block; */
    /* margin: 0 auto; */
    padding-left: 20px;
  }

  .pp-5 {
    padding: 5px;
    font-size: 12px;
  }

  .headertable {
    margin: 10px;
    font-size: 12px;
    font-weight: 500;
  }
}

@media (max-width: 768px) {
  .pp-5 {
    padding: 5px;
    font-size: 12px;
  }

  .checkbox {
    margin-top: 0px;
    padding-top: 0px;
    /* display: block; */
    /* margin: 0 auto; */
    padding-left: 20px;
  }

  .tb-header {
    background-color: #144372;
    color: #fff;
    width: 100%;
    font-weight: 600;
    font-size: 12px;
  }

  .imageSize-metaData {
    max-width: 25px;
    max-height: 25px;
    width: 100%;
    height: auto;
  }

  .imageSize-excel {
    max-width: 25px;
    max-height: 25px;
    width: 100%;
    height: auto;
  }

  .imageSize-csv {
    max-width: 25px;
    max-height: 25px;
    width: 100%;
    height: auto;
  }

  .pp-5 {
    padding: 5px;
    font-size: 10px;
  }

  .text-subcategory {
    font-size: 14px;
    font-weight: 600;
    width: 100%;
    text-align: left;
    padding: 8px 0 8px 10px !important;
    color: #5e7ac2;
    background-color: #f5f5f5;
  }

  .checkbox {
    margin-top: 0px;
    padding-top: 0px;
    /* display: block; */
    /* margin: 0 auto; */
    padding-left: 0px;
  }

  .headertable {
    margin: 10px;
    font-size: 10px;
  }
}

@media (width: 1194px) {
  .ipadpro {
    padding-left: 75px;
  }
}

.table-ipad {
  word-break: break-word;
  font-size: 12px;
  display: block;
  margin: auto;
}

.text-center {
  text-align: center;
}

.text-subcategory-ipad {
  font-size: 12px;
  font-weight: 700;
  width: 100%;
  text-align: left;
  padding: 8px 0 8px 10px !important;
  color: #5e7ac2;
  background-color: #f5f5f5;
}
</style>
