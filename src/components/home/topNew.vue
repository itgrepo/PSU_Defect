<template>
  <v-container class="">
    <b class="tab-title"> {{ $t("topnew") }}</b>
    <div class="underline"></div>

    <div class="tableFixHead">
      <table>
        <thead class="tb-header-home">
          <tr class="tb-header-topnew" valign="middle">
            <th class="font-title" width="70%">{{ $t("reportname") }}</th>
            <th class="font-title" width="10%">{{ $t("dashboard") }}</th>
            <th class="font-title" width="20%">{{ $t("metadata") }}</th>
            <!-- <th colspan="2" width="20%" class="font-title">File</th> -->
          </tr>
        </thead>
        <tr
          valign="middle"
          class="tb-row-orange colortr"
          v-for="itemTopNew in data"
        >
          <td>{{ itemTopNew.export_excel_name }}</td>
          <td align="center" class="hover-img">
            <div
              v-if="itemTopNew.Link_name == null || itemTopNew.Link_name == ''"
            ></div>
            <div
              v-if="itemTopNew.Link_name == null || itemTopNew.Link_name == ''"
              @click="nolinkdashboard()"
            >
              <img
                class="imageSize"
                src="/opendataIcon/icon/dashboardbb&w.png"
                alt="fireSpot"
              />
            </div>
            <div v-else @click="checkUserLoginDashbord(itemTopNew.source_id)">
              <img
                class="imageSize"
                src="/opendataIcon/icon/dashboard.png"
                alt="fireSpot"
              />
            </div>
          </td>
          <td align="center" class="hover-img">
            <!-- <div v-if="itemTopNew.mongo_file_id_metadata == null ||
                            itemTopNew.mongo_file_id_metadata == ''
                            " @click="nofile()">
                            <img class="imageSize" src="/opendataIcon/icon/metaDatab&w.png" alt="fireSpot" />
                        </div>
                        <div v-else @click="getDataExportMetadata(itemTopNew.source_id)">
                            <img class="imageSize" src="/opendataIcon/icon/metaData.png" alt="fireSpot" />
                            
                        </div> -->
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
                  @click="getMetadataDetail(itemTopNew.source_id)"
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
                  <!-- <v-btn
            icon
            @click="dialog = false"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn> -->
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
                        <p class="company-name">* {{ $t("datasettype") }}</p>
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
                        <p class="company-name">{{ $t("reprotid") }}</p>
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
                        <p class="company-name">{{ $t("datasetname") }}</p>
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
                        <p class="company-name">{{ $t("des") }}</p>
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
                        <p class="company-name">* {{ $t("org") }}</p>
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
                        <p class="company-name">* {{ $t("contactname") }}</p>
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
                  <!-- <v-layout row wrap align-start justify-center>
                    <v-flex xs12 sm6 md6>
                      <v-card tile flat color="grey lighten-4">
                        <p class="company-name">* สาย/ฝ่ายงาน</p>
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
                        <p class="company-name">* ด้าน</p>
                      </v-card>
                    </v-flex>
                    <v-flex xs12 sm6 md6>
                      <v-card tile flat color="white">
                        <p class="company-name text-left">
                          {{ metadata.agency }}
                        </p>
                      </v-card>
                    </v-flex>
                  </v-layout> -->
                  <v-layout row wrap align-start justify-center>
                    <v-flex xs12 sm6 md6>
                      <v-card tile flat color="grey lighten-4">
                        <p class="company-name">* {{ $t("infoservices") }}</p>
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
                        <p class="company-name">* {{ $t("contactname") }}</p>
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
                        <p class="company-name">* {{ $t("contactmail") }}</p>
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
                  <!-- <v-layout row wrap align-start justify-center>
                    <v-flex xs12 sm6 md6>
                      <v-card tile flat color="white">
                        <p class="company-name">* สถานะข้อมูลส่วนบุคคล</p>
                      </v-card>
                    </v-flex>
                    <v-flex xs12 sm6 md6>
                      <v-card tile flat color="white">
                        <p class="company-name text-left">
                          {{ metadata.sensitive_data }}
                        </p>
                      </v-card>
                    </v-flex>
                  </v-layout>
                  <v-layout row wrap align-start justify-center>
                    <v-flex xs12 sm6 md6>
                      <v-card tile flat color="grey lighten-4">
                        <p class="company-name">* ระดับชั้นความลับข้อมูล</p>
                      </v-card>
                    </v-flex>
                    <v-flex xs12 sm6 md6>
                      <v-card tile flat color="grey lighten-4">
                        <p class="company-name text-left">
                          {{ metadata.data_privacy }}
                        </p>
                      </v-card>
                    </v-flex>
                  </v-layout> -->
                  <v-layout row wrap align-start justify-center>
                    <v-flex xs12 sm6 md6>
                      <v-card tile flat color="white">
                        <p class="company-name">* {{ $t("govcate") }}</p>
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
                        <p class="company-name">* {{ $t("objective") }}</p>
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
                          * {{ $t("data-relate-unit") }}
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
                          {{ $t("dataupdate") }}
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
                        <p class="company-name">* {{ $t("sponsor") }}</p>
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
                        <p class="company-name">* {{ $t("geo") }}</p>
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
                        <p class="company-name">* {{ $t("source") }}</p>
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
                        <p class="company-name">* {{ $t("hvd") }}</p>
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
                        <p class="company-name">* {{ $t("datacollect") }}</p>
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
                  <!-- <v-layout row wrap align-start justify-center>
                      <v-flex xs12 sm6 md6>
                        <v-card tile flat color="white">
                          <p class="company-name">หมวดหมู่ข้อมูลตามธรรมาภิบาลข้อมูลภาครัฐ</p>
                        </v-card>
                      </v-flex>
                      <v-flex xs12 sm6 md6>
                        <v-card tile flat color="white">
                          <p class="company-name text-left">{{ metadata.topic_gorvernance }}</p>
                        </v-card>
                      </v-flex>
                    </v-layout> -->
                  <v-layout row wrap align-start justify-center>
                    <v-flex xs12 sm6 md6>
                      <v-card tile flat color="grey lighten-4">
                        <p class="company-name">{{ $t('datalicese') }}</p>
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
                        <p class="company-name">{{ $t("conditions") }}</p>
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
                  <!-- <v-layout row wrap align-start justify-center>
                      <v-flex xs12 sm6 md6>
                        <v-card tile flat color="grey lighten-4">
                          <p class="company-name">ผู้สนับสนุนหรือผู้ร่วมดำเนินการ</p>
                        </v-card>
                      </v-flex>
                      <v-flex xs12 sm6 md6>
                        <v-card tile flat color="grey lighten-4">
                          <p class="company-name text-left"> {{ metadata.supporter }}</p>
                        </v-card>
                      </v-flex>
                    </v-layout> -->

                  <!-- <v-layout row wrap align-start justify-center>
                      <v-flex xs12 sm6 md6>
                        <v-card tile flat color="grey lighten-4">
                          <p class="company-name">หน่วยที่ย่อยที่สุดของการจัดเก็บข้อมูล</p>
                        </v-card>
                      </v-flex>
                      <v-flex xs12 sm6 md6>
                        <v-card tile flat color="grey lighten-4">
                          <p class="company-name text-left">{{ metadata.data_unit }}</p>
                        </v-card>
                      </v-flex>
                    </v-layout> -->
                  <!-- <v-layout row wrap align-start justify-center>
                      <v-flex xs12 sm6 md6>
                        <v-card tile flat color="white">
                          <p class="company-name">URL</p>
                        </v-card>
                      </v-flex>
                      <v-flex xs12 sm6 md6>
                        <v-card tile flat color="white">
                          <p class="company-name text-left"> {{ metadata.URL }}</p>
                        </v-card>
                      </v-flex>
                    </v-layout> -->
                  <!-- <v-layout row wrap align-start justify-center>
                      <v-flex xs12 sm6 md6>
                        <v-card tile flat color="grey lighten-4">
                          <p class="company-name">ภาษาที่ใช้</p>
                        </v-card>
                      </v-flex>
                      <v-flex xs12 sm6 md6>
                        <v-card tile flat color="grey lighten-4">
                          <p class="company-name text-left">{{ metadata.data_language }}</p>
                        </v-card>
                      </v-flex>
                    </v-layout> -->
                  <v-layout row wrap align-start justify-center>
                    <v-flex xs12 sm6 md6>
                      <v-card tile flat color="grey lighten-4">
                        <p class="company-name">{{ $t("datainitial") }}</p>
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
                        <p class="company-name">{{ $t("lastupdate") }}</p>
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
                  <!-- <v-layout row wrap align-start justify-center>
                      <v-flex xs12 sm6 md6>
                        <v-card tile flat color="white">
                          <p class="company-name">ข้อมูลอ้างอิง</p>
                        </v-card>
                      </v-flex>
                      <v-flex xs12 sm6 md6>
                        <v-card tile flat color="white">
                          <p class="company-name text-left">{{ metadata.data_reference }}</p>
                        </v-card>
                      </v-flex>
                    </v-layout> -->
                </v-container>
              </v-card>
            </v-dialog>
          </td>

          <!-- <td align="center" class="hover-img">
                      <div v-if="
                  itemTopNew.mongo_file_id_excel == null ||
                    itemTopNew.mongo_file_id_excel == ''
                " @click="nofile()">
                          <img class="imageSize" src="/opendataIcon/icon/excelb&w.png" alt="fireSpot" />
                      </div>
                      <div v-else @click="checkUserLoginExcel(itemTopNew)">
                          <img class="imageSize" src="/opendataIcon/icon/excel.png" alt="fireSpot" />
                      </div>
                  </td>
                  <td align="center" class="hover-img">
                      <div v-if="
                  itemTopNew.mongo_file_id_csv == null ||
                    itemTopNew.mongo_file_id_csv == ''
                " @click="nofile()">
                          <img class="imageSize" src="/opendataIcon/icon/csvb&w.png" alt="fireSpot" />
                      </div>
                      <div v-else @click="checkUserLoginCsv(itemTopNew)">
                          <img class="imageSize" src="/opendataIcon/icon/csv.png" alt="fireSpot" />
                      </div>
                  </td> -->
        </tr>
      </table>
    </div>
  </v-container>
</template>

<script>
import { Encode, Decode } from "@/services";
export default {
  data() {
    return {
      isLoading: false, // Set to true when loading, false when data is ready
      dialog: false,
      metadataDetail: [],
      data: [],
    };
  },
  mounted() {
    this.getDataNewSource();
  },
  computed: {
    userData() {
      if (this.$cookies.isKey("information")) {
        return JSON.parse(Decode.decode(this.$cookies.get("information")));
      } else {
        return "";
      }
    },
    Cookies() {
      if (this.$cookies.isKey("consentfpo")) {
        return this.$cookies.get("consentfpo");
      } else {
        //return this.$cookies.set('consentfpo', 'no');
      }
    },
  },
  methods: {
    formatDate(datetime) {
      var date = new Date(datetime);
      var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
      var month =
        date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1;
      var year = date.getFullYear();
      return day + "-" + month + "-" + year;
    },
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
    checkUserLoginDashbord(text) {
      if (this.$cookies.get("consentfpo") === "no") {
        this.$swal(
          '<p class="font-text">กรุณากด "ยอมรับ" นโยบายการใช้คุกกี้ด้านล่าง และlog-in เข้าใช้งานก่อน</p>',
          "",
          "warning"
        );
      } else if (this.userData) {
        this.toPathSource(text);
      } else {
        this.$swal("Please login", "", "warning");
      }
    },
    toPathSource(text) {
      var nametext = "";
      var textname = text.split(" ");
      for (let i = 0; i < textname.length; i++) {
        nametext = nametext + textname[i];
      }
      let routeData = this.$router.resolve(`/view/dashboard/${nametext}`);
      window.open(routeData.href);
    },
    loadFile(link) {
      window.location.assign(link);
    },
    // getDataNewSource() {
      
    //   // console.log(this.userData);
    //   var user = Encode.encode(JSON.stringify(this.userData));
    //   // if (this.userData) {
    //   this.axios
    //     .post(process.env.VUE_APP_API_BACKEND + "/getDataNewSource", {
    //       // "Level_Master_id": this.userData.Level_Master_id,
    //       // "previlage_id": this.userData.previlage_id,
    //       user: user,
    //     })
    //     .then((response) => {
    //       this.data = response.data.data;
    //     });
    // },
    getDataNewSource() {
  var user = Encode.encode(JSON.stringify(this.userData));

  this.axios
    .post(process.env.VUE_APP_API_BACKEND + "/getDataNewSource", {
      user: user,
    })
    .then((response) => {
      this.data = response.data.data; // จัดเก็บข้อมูลที่ได้รับ
    })
    .catch((error) => {
      console.error("Error fetching data:", error); // แสดงข้อผิดพลาดในคอนโซล
      this.$swal("เกิดข้อผิดพลาดในการดึงข้อมูล", "", "error"); // แสดงข้อความแจ้งเตือน
    })
    .finally(() => {
      // ปิดการโหลดในที่นี้ให้เป็น false ได้ แต่ต้องมีเงื่อนไขตามต้องการ
      if (this.data.length > 0) { // ถ้ามีข้อมูลแสดง
        this.isLoading = false; // ปิดการโหลด
      }
    });
},
    getDataExportMetadata(id) {
      this.axios
        .post(process.env.VUE_APP_API_BACKEND + "/getDataExportMetadata", {
          source_id: id,
        })
        .then((response) => {
          this.$cookies.get("consentfpo");
          // console.log(this.$cookies.get("consentfpo") )
          if (this.$cookies.get("consentfpo") === "no") {
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
    checkUserLoginCsv(item) {
      if (this.$cookies.get("consentfpo") === "no") {
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
      if (this.$cookies.get("consentfpo") === "no") {
        this.$swal(
          '<p class="font-text">กรุณากด "ยอมรับ" นโยบายการใช้คุกกี้ด้านล่าง และlog-in เข้าใช้งานก่อน</p>',
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
      this.downloadFileMongo(item);
    },
    checkPermissionDownloadCsv(item) {
      this.downloadFileMongoCsv(item);
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

<style lang="css" scoped>
.ftext {
  font-family: "NotoSansThai", sans-serif !important;
}
/* @import url("https://fonts.googleapis.com/css?family=Kanit&display=swap"); */
.font-text {
  /* font-family: "Kanit", sans-serif; */
  font-size: 32px;
}

.tb-header-topnew {
  height: 40px;
}

td.hover-img {
  outline: none;
  cursor: pointer;
}

.tab-title {
  text-align: center;
  display: block;
  color: #015779;
  font-size: 28px;
  padding: 5px;
}
.underline {
  width: 100px; /* กำหนดความกว้างของเส้น */
  height: 15px; /* ความหนาของเส้น */
  background: linear-gradient(to right, #add8e6, #d8bfd8); /* ไล่เฉดสีแบบในภาพ */
  border-radius: 10px; /* ทำให้เส้นกลมที่ขอบ */
  margin: 0 auto; /* จัดให้อยู่ตรงกลาง */
  margin-top: 10px; /* เว้นระยะห่างจากข้อความ */
}

/* scrollbar */
/* width */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #ccc;
  border-radius: 10px;
}

/* ------------------ */
/* table */
.tableFixHead {
  overflow-y: auto;
  /* height: 400px; */
  width: 100%;
  padding-top: 50px;
}
.tableFixHead table {
  width: 100%;
  border-collapse: collapse;
}

.tableFixHead thead th {
  position: sticky;
  top: 0;
  z-index: 1;
}
.tableFixHead tbody td {
  vertical-align: middle;
}
table {
  border-collapse: collapse;
  width: 100%;
  table-layout: auto !important;
}

th {
  padding: 8px 10px;
}

th {
  /* background-color: #02112c; */
  /* background-color: #176AAB; */
  /* background: linear-gradient(to bottom, #1e5992, #0d9cf4); */
  background-color: #10316b;
  color: #fff;
  /* width: 100%; */
  font-weight: 500;
  font-size: 15px;
}

.line-table {
  border-spacing: 0px;
}

TR.colortr:nth-child(odd) {
  background-color: #ffffff;
}

TR.colortr:nth-child(even) {
  background-color: #f5f5f5;
}

td.t {
  padding: 7px;
}

td {
  font-size: 16px;
  padding: 5px;
}

.tb-row-blue {
  height: 3vh;
  display: table;
  width: 100%;
  /* table-layout:fixed; */
  background-color: #f5f5f5;
}

.tb-row-white {
  height: 3vh;
  display: table;
  width: 100%;
  /* table-layout:fixed; */
  background-color: #ffffff;
}

.table-scroll-table {
  width: 100%;
  display: block;
  max-height: 60vh !important;
  overflow: auto;
  background-color: #f5f5f5;
}

.tb-header {
  width: calc(100% - 17px);
  display: table;
  width: 100%;
  /* width:calc(100% - 18px); */
}

.tb-header-top {
  /* width: calc(100% - 17px); */
  background-color: #757575;
  color: #ffffff;
  /* display:table; */
  /* width:100%; */
  /* width:calc(100% - 18px); */
}

.tb-header-row {
  display: table;
  width: 100%;
  height: 4vh;
  /* table-layout:fixed; */
  color: #0150b3;
}

.tb-header-row-top {
  /* display:table;  */
  width: 100%;
  table-layout: fixed;
  color: #ffffff;
}

.font-title {
  font-size: 14px;
  color: #ffffff;
}

/* td:hover {
    background-color:#9ec7e4;
  } */
td.hover-img:hover {
  background-color: #9ec7e4;
}

@media (min-width: 1904px) {
  .tableFixHead {
    height: 100%;
  }
}
</style>
