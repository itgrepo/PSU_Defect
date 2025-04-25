<template lang="html">
    <v-container class="ftext">
      <b class="tab-title">TOP DOWNLOADS</b>
      <div class="tableFixHead">
        <table>
          <thead class="tb-header-home">
            <tr class="tb-header-topdownload" valign="middle">
              <th class="font-title" width="70%">รายการชุดข้อมูล</th>
              <th class="font-title" width="10%">Dashboard</th>
              <th class="font-title" width="20%">Metadata</th>
              <!-- <th colspan="2" width="20%" class="font-title">File</th> -->
            </tr>
          </thead>
          <tr valign="middle" class="tb-row-orange colortr" v-for="itemTopDow in data">
            <td>{{ itemTopDow.export_excel_name }}</td>
            <td align="center" class="hover-img">
              <div v-if="itemTopDow.Link_name == null || itemTopDow.Link_name == ''">
                <!-- <div v-if="itemTopDow.Link_name == null || itemTopDow.Link_name == '' "
                              @click="nolinkdashboard()"> -->
                <!-- <img class="imageSize" src="/opendataIcon/icon/dashboardbb&w.png" alt="fireSpot" /> -->
              </div>
              <div v-else @click="checkUserLoginDashbord(itemTopDow.source_id)">
                <img class="imageSize" src="/opendataIcon/icon/dashboard.png" alt="fireSpot" />
              </div>
            </td>
            <td align="center" class="hover-img">
              <!-- <div v-if=" itemTopDow.mongo_file_id_metadata == null || itemTopDow.mongo_file_id_metadata == ''"> -->
              <!-- <div v-if="
                  itemTopDow.mongo_file_id_metadata == null ||
                    itemTopDow.mongo_file_id_metadata == ''
                " @click="nofile()"> -->
              <!-- <img class="imageSize" src="/opendataIcon/icon/metaDatab&w.png" alt="fireSpot" /> -->
              <!-- </div>
                          <div v-else @click="getDataExportMetadata(itemTopDow.source_id)">
                              <img class="imageSize" src="/opendataIcon/icon/metaData.png" alt="fireSpot" />
                          </div> -->
  
                          <v-dialog max-width="1000px" hide-overlay transition="dialog-bottom-transition">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn icon v-bind="attrs" v-on="on" @click="getMetadataDetail(itemTopDow.source_id)">
                    <img class="imageSize" src="/opendataIcon/icon/metaData.png" alt="fireSpot" />
                  </v-btn>
                </template>
                <v-card>
                  <v-toolbar dark color="#0494E9">
                    <v-toolbar-title>รายละเอียดข้อมูล</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-toolbar-items></v-toolbar-items>
                  </v-toolbar>
  
                  <v-container fluid v-for="(metadata, index) in metadataDetail" :key="index">
                    <v-layout row wrap align-start justify-center>
                      <v-flex xs12 sm6 md6>
                        <v-card tile flat dark color="#0494E9">
                          <h2 class="text-center font-contact font-weight-bold color-white">หัวข้อ</h2>
                        </v-card>
                      </v-flex>
                      <v-flex xs12 sm6 md6>
                        <v-card tile flat dark color="#0494E9">
                          <h2 class="text-center font-contact font-weight-bold color-white">ค่า</h2>
                        </v-card>
                      </v-flex>
                    </v-layout>
                    <v-layout row wrap align-start justify-center>
                      <v-flex xs12 sm6 md6>
                        <v-card tile flat color="grey lighten-4">
                          <p class="company-name">* ประเภทชุดข้อมูล</p>
                        </v-card>
                      </v-flex>
                      <v-flex xs12 sm6 md6>
                        <v-card tile flat color="grey lighten-4">
                          <p class="company-name text-left"> {{ metadata.data_type }}</p>
                        </v-card>
                      </v-flex>
                    </v-layout>
                    <v-layout row wrap align-start justify-center>
                      <v-flex xs12 sm6 md6 dense outlined>
                        <v-card tile flat color="white">
                          <p class="company-name">รหัสชุดข้อมูล</p>
                        </v-card>
                      </v-flex>
                      <v-flex xs12 sm6 md6 dense outlined>
                        <v-card tile flat color="white">
                          <p class="company-name text-left">{{ metadata.source_id }}</p>
                        </v-card>
                      </v-flex>
                    </v-layout>
                    <v-layout row wrap align-start justify-center>
                      <v-flex xs12 sm6 md6 dense outlined>
                        <v-card tile flat color="grey lighten-4">
                          <p class="company-name">ชื่อชุดข้อมูล</p>
                        </v-card>
                      </v-flex>
                      <v-flex xs12 sm6 md6 dense outlined>
                        <v-card tile flat color="grey lighten-4">
                          <p class="company-name text-left">{{ metadata.export_excel_name }}</p>
                        </v-card>
                      </v-flex>
                    </v-layout>
                    <v-layout row wrap align-start justify-center>
                      <v-flex xs12 sm6 md6>
                        <v-card tile flat color="white">
                          <p class="company-name">รายละเอียด</p>
                        </v-card>
                      </v-flex>
                      <v-flex xs12 sm6 md6>
                        <v-card tile flat color="white">
                          <p class="company-name text-left">{{ metadata.description }}</p>
                        </v-card>
                      </v-flex>
                    </v-layout>
                    <v-layout row wrap align-start justify-center>
                      <v-flex xs12 sm6 md6>
                        <v-card tile flat color="grey lighten-4">
                          <p class="company-name">* หน่วยงานเจ้าของข้อมูล </p>
                        </v-card>
                      </v-flex>
                      <v-flex xs12 sm6 md6>
                        <v-card tile flat color="grey lighten-4">
                          <p class="company-name text-left">{{ metadata.organization }}</p>
                        </v-card>
                      </v-flex>
                    </v-layout>
                    <v-layout row wrap align-start justify-center>
                      <v-flex xs12 sm6 md6>
                        <v-card tile flat color="white">
                          <p class="company-name">* ชื่อเจ้าของข้อมูล </p>
                        </v-card>
                      </v-flex>
                      <v-flex xs12 sm6 md6>
                        <v-card tile flat color="white">
                          <p class="company-name text-left">{{ metadata.data_ower_name }}</p>
                        </v-card>
                      </v-flex>
                    </v-layout>
                    <v-layout row wrap align-start justify-center>
                      <v-flex xs12 sm6 md6>
                        <v-card tile flat color="grey lighten-4">
                          <p class="company-name">* สาย/ฝ่ายงาน </p>
                        </v-card>
                      </v-flex>
                      <v-flex xs12 sm6 md6>
                        <v-card tile flat color="grey lighten-4">
                          <p class="company-name text-left">{{ metadata.category_id }}</p>
                        </v-card>
                      </v-flex>
                    </v-layout>
                    <v-layout row wrap align-start justify-center>
                      <v-flex xs12 sm6 md6>
                        <v-card tile flat color="white">
                          <p class="company-name">* ด้าน </p>
                        </v-card>
                      </v-flex>
                      <v-flex xs12 sm6 md6>
                        <v-card tile flat color="white">
                          <p class="company-name text-left">{{ metadata.agency }}</p>
                        </v-card>
                      </v-flex>
                    </v-layout>
                    <v-layout row wrap align-start justify-center>
                      <v-flex xs12 sm6 md6>
                        <v-card tile flat color="grey lighten-4">
                          <p class="company-name">* บริกรข้อมูล </p>
                        </v-card>
                      </v-flex>
                      <v-flex xs12 sm6 md6>
                        <v-card tile flat color="grey lighten-4">
                          <p class="company-name text-left">{{ metadata.information_waiter }}</p>
                        </v-card>
                      </v-flex>
                    </v-layout>
                    <v-layout row wrap align-start justify-center>
                      <v-flex xs12 sm6 md6>
                        <v-card tile flat color="white">
                          <p class="company-name">* ชื่อผู้ติดต่อ</p>
                        </v-card>
                      </v-flex>
                      <v-flex xs12 sm6 md6>
                        <v-card tile flat color="white">
                          <p class="company-name text-left">{{ metadata.contactor_name }}</p>
                        </v-card>
                      </v-flex>
                    </v-layout>
                    <v-layout row wrap align-start justify-center>
                      <v-flex xs12 sm6 md6>
                        <v-card tile flat color="grey lighten-4">
                          <p class="company-name ">* อีเมลผู้ติดต่อ</p>
                        </v-card>
                      </v-flex>
                      <v-flex xs12 sm6 md6>
                        <v-card tile flat color="grey lighten-4">
                          <p class="company-name text-left">{{ metadata.contactor_email }}</p>
                        </v-card>
                      </v-flex>
                    </v-layout>
                    <v-layout row wrap align-start justify-center>
                      <v-flex xs12 sm6 md6>
                        <v-card tile flat color="white">
                          <p class="company-name ">* สถานะข้อมูลส่วนบุคคล</p>
                        </v-card>
                      </v-flex>
                      <v-flex xs12 sm6 md6>
                        <v-card tile flat color="white">
                          <p class="company-name text-left">{{ metadata.sensitive_data }}</p>
                        </v-card>
                      </v-flex>
                    </v-layout>
                    <v-layout row wrap align-start justify-center>
                      <v-flex xs12 sm6 md6>
                        <v-card tile flat color="grey lighten-4">
                          <p class="company-name ">* ระดับชั้นความลับข้อมูล</p>
                        </v-card>
                      </v-flex>
                      <v-flex xs12 sm6 md6>
                        <v-card tile flat color="grey lighten-4">
                          <p class="company-name text-left">{{ metadata.data_privacy }}</p>
                        </v-card>
                      </v-flex>
                    </v-layout>
                    <v-layout row wrap align-start justify-center>
                      <v-flex xs12 sm6 md6>
                        <v-card tile flat color="white">
                          <p class="company-name ">* หมวดหมู่ข้อมล</p>
                        </v-card>
                      </v-flex>
                      <v-flex xs12 sm6 md6>
                        <v-card tile flat color="white">
                          <p class="company-name text-left">{{ metadata.sub_category_name }}</p>
                        </v-card>
                      </v-flex>
                    </v-layout>
                      <v-layout row wrap align-start justify-center>
                        <v-flex xs12 sm6 md6>
                          <v-card tile flat color="grey lighten-4">
                            <p class="company-name">* วัตถุประสงค์</p>
                          </v-card>
                        </v-flex>
                        <v-flex xs12 sm6 md6>
                          <v-card tile flat color="grey lighten-4">
                            <p class="company-name text-left"> {{ metadata.objective }}</p>
                          </v-card>
                        </v-flex>
                      </v-layout>
                      <v-layout row wrap align-start justify-center>
                        <v-flex xs12 sm6 md6>
                          <v-card tile flat color="white">
                            <p class="company-name">* หน่วยความถี่ของการปรับปรุงข้อมูล</p>
                          </v-card>
                        </v-flex>
                        <v-flex xs12 sm6 md6>
                          <v-card tile flat color="white">
                            <p class="company-name text-left">{{ metadata.frequency }}</p>
                          </v-card>
                        </v-flex>
                      </v-layout>
                      <v-layout row wrap align-start justify-center>
                        <v-flex xs12 sm6 md6>
                          <v-card tile flat color="grey lighten-4">
                            <p class="company-name">ค่าความถี่ของการปรับปรุงข้อมูล
                              (ความถี่น้อยที่สุด)</p>
                          </v-card>
                        </v-flex>
                        <v-flex xs12 sm6 md6>
                          <v-card tile flat color="grey lighten-4">
                            <p class="company-name text-left">{{ metadata.frequency_unit }}</p>
                          </v-card>
                        </v-flex>
                      </v-layout>
                      <v-layout row wrap align-start justify-center>
                        <v-flex xs12 sm6 md6>
                          <v-card tile flat color="white">
                            <p class="company-name">* ระยะเวลาการเก็บรักษา</p>
                          </v-card>
                        </v-flex>
                        <v-flex xs12 sm6 md6>
                          <v-card tile flat color="white">
                            <p class="company-name text-left">{{ metadata.storage_period}}</p>
                          </v-card>
                        </v-flex>
                      </v-layout>
                      <v-layout row wrap align-start justify-center>
                        <v-flex xs12 sm6 md6>
                          <v-card tile flat color="grey lighten-4">
                            <p class="company-name">* ขอบเขตเชิงภูมิศาสตร์</p>
                          </v-card>
                        </v-flex>
                        <v-flex xs12 sm6 md6>
                          <v-card tile flat color="grey lighten-4">
                            <p class="company-name text-left">{{ metadata.geo_coverage }}</p>
                          </v-card>
                        </v-flex>
                      </v-layout>
                      <v-layout row wrap align-start justify-center>
                        <v-flex xs12 sm6 md6>
                          <v-card tile flat color="white">
                            <p class="company-name ">* แหล่งที่มา</p>
                          </v-card>
                        </v-flex>
                        <v-flex xs12 sm6 md6>
                          <v-card tile flat color="white">
                            <p class="company-name text-left">{{ metadata.data_source }}</p>
                          </v-card>
                        </v-flex>
                      </v-layout>
                      <v-layout row wrap align-start justify-center>
                        <v-flex xs12 sm6 md6>
                          <v-card tile flat color="grey lighten-4">
                            <p class="company-name ">* ขอบเขตแหล่งที่มา</p>
                          </v-card>
                        </v-flex>
                        <v-flex xs12 sm6 md6>
                          <v-card tile flat color="grey lighten-4">
                            <p class="company-name text-left">{{ metadata.source_scope }}</p>
                          </v-card>
                        </v-flex>
                      </v-layout>
                      <v-layout row wrap align-start justify-center>
                        <v-flex xs12 sm6 md6>
                          <v-card tile flat color="white">
                            <p class="company-name">* รูปแบบการเก็บข้อมูล</p>
                          </v-card>
                        </v-flex>
                        <v-flex xs12 sm6 md6>
                          <v-card tile flat color="white">
                            <p class="company-name text-left">{{ metadata.data_storage }}</p>
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
                            <p class="company-name ">สัญญาอนุญาตให้ใช้ข้อมูล</p>
                          </v-card>
                        </v-flex>
                        <v-flex xs12 sm6 md6>
                          <v-card tile flat color="grey lighten-4">
                            <p class="company-name text-left">{{ metadata.data_license }}</p>
                          </v-card>
                        </v-flex>
                      </v-layout>
                      <v-layout row wrap align-start justify-center>
                        <v-flex xs12 sm6 md6>
                          <v-card tile flat color="white">
                            <p class="company-name">เงื่อนไขในการเข้าถึงข้อมูล</p>
                          </v-card>
                        </v-flex>
                        <v-flex xs12 sm6 md6>
                          <v-card tile flat color="white">
                            <p class="company-name text-left">{{ metadata.data_condition }}</p>
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
                            <p class="company-name">วันที่เริ่มต้นสร้าง</p>
                          </v-card>
                        </v-flex>
                        <v-flex xs12 sm6 md6>
                          <v-card tile flat color="grey lighten-4">
                            <p class="company-name text-left">{{ formatDate(metadata.create_at) }}</p>
                          </v-card>
                        </v-flex>
                      </v-layout>
                      <v-layout row wrap align-start justify-center>
                        <v-flex xs12 sm6 md6>
                          <v-card tile flat color="white">
                            <p class="company-name">วันที่ปรับปรุงข้อมูลล่าสุด</p>
                          </v-card>
                        </v-flex>
                        <v-flex xs12 sm6 md6>
                          <v-card tile flat color="white">
                            <p class="company-name text-left">{{ formatDate(metadata.modified_date) }}</p>
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
          </tr>
        </table>
      </div>
    </v-container>
  </template>
  
  <script>
  import {
    Encode,
    Decode
  } from "@/services";
  export default {
    data() {
      return {
        data: [],
        metadataDetail: [
  
        ],
      };
    },
    mounted() {
      this.getDataTopDownload();
    },
    computed: {
      userData() {
        if (this.$cookies.isKey("information")) {
          return JSON.parse(Decode.decode(this.$cookies.get("information")));
        } else {
          return "";
        }
      }
    },
    methods: {
      formatDate(datetime) {
        var date = new Date(datetime)
        var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
        var month =
          date.getMonth() + 1 < 10
            ? '0' + (date.getMonth() + 1)
            : date.getMonth() + 1
        var year = date.getFullYear()
        return day + '-' + month + '-' + year
      },
      getMetadataDetail(data) {
        console.log("TestDetail");
        console.log(data);
  
        this.axios
          .post(process.env.VUE_APP_API_BACKEND + '/showMetadata', {
            'source_id': data
          })
          .then(response => {
            // this.metadataDetail = response.data;
            this.metadataDetail = [response.data];
            // console.log("test2");
            // console.log(this.metadataDetail);
            // console.log(this.metadataDetail.data_type); // Corrected property name
          })
          .catch(error => {
            console.error("Error fetching metadata:", error);
          });
      },
      checkUserLoginDashbord(text) {
        if (this.$cookies.get("consentfpo") === 'no') {
          this.$swal('<p class="font-text">กรุณากด "ยอมรับ" นโยบายการใช้คุกกี้ด้านล่าง และlog-in เข้าใช้งานก่อน</p>', '', 'warning')
        } else if (this.userData) {
          this.toPathSource(text)
        } else {
          this.$swal('Please login', '', 'warning')
        }
      },
      toPathSource(text) {
        // //console.log(text);
        var nametext = "";
        var textname = text.split(" ");
        for (let i = 0; i < textname.length; i++) {
          nametext = nametext + textname[i];
        }
  
        // //console.log(nametext);
  
        let routeData = this.$router.resolve(`/view/dashboard/${nametext}`);
        window.open(routeData.href);
      },
      loadFile(link) {
        window.location.assign(link);
      },
      getDataTopDownload() {
        // if (this.userData) {
        var user = Encode.encode(JSON.stringify(this.userData));
        this.axios
          .post(process.env.VUE_APP_API_BACKEND + "/getDataTopDownload", {
            // Level_Master_id: this.userData.Level_Master_id,
            // previlage_id: this.userData.previlage_id
            user: user
          })
          .then(response => {
            //console.log(response.data.result);
            this.data = response.data.data;
          });
        // } else {
        //     this.axios
        //         .post(process.env.VUE_APP_API_BACKEND + "/getDataTopDownload", {
        //             Level_Master_id: 1,
        //             previlage_id: 0
        //         })
        //         .then(response => {
        //             this.data = response.data.result;
        //             //console.log(this.data);
        //         });
        // }
      },
      getDataExportMetadata(id) {
        this.axios
          .post(process.env.VUE_APP_API_BACKEND + "/getDataExportMetadata", {
            source_id: id
          })
          .then(response => {
            this.$cookies.get("consentfpo");
            // //console.log(this.$cookies.get("consentfpo") )
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
        // if (this.$cookies.get("consentfpo") === "no") {
        //     this.$swal(
        //         '<p class="font-text">กรุณากด "ยอมรับ" นโยบายการใช้คุกกี้ด้านล่าง และlog-in เข้าใช้งานก่อน</p>',
        //         "",
        //         "warning"
        //     );
        // } else if (this.userData) {
        this.checkPermissionDownloadCsv(item);
        // } else {
        //     this.$swal("Please login", "", "warning");
        // }
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
        // this.axios
        //     .post(process.env.VUE_APP_API_BACKEND + "/checkPermitDownloadfile", {
        //         user_id: this.userData.user_id,
        //         file_name: item.file_name
        //     })
        //     .then(response => {
        //         if (response.data.status === "download") {
        this.downloadFileMongo(item);
        //     } else {
        //         this.$swal("Please contact Admin", "warning");
        //     }
        // });
      },
      checkPermissionDownloadCsv(item) {
        // this.axios
        //     .post(process.env.VUE_APP_API_BACKEND + "/checkPermitDownloadfile", {
        //         user_id: this.userData.user_id,
        //         file_name: item.file_name
        //     })
        //     .then(response => {
        //         if (response.data.status === "download") {
        this.downloadFileMongoCsv(item);
        //     } else {
        //         this.$swal("Please contact Admin", "warning");
        //     }
        // });
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
      }
    }
  };
  </script>
  
  <style lang="css" scoped>
  .ftext{
    font-family: 'NotoSansThai', sans-serif !important;
  }
  /* @import url("https://fonts.googleapis.com/css?family=Kanit&display=swap"); */
  .font-text {
    /* font-family: "Kanit", sans-serif; */
    font-size: 28px;
  }
  
  .tb-header-topdownload {
    height: 40px;
  }
  
  .tab-title {
    text-align: center;
    display: block;
    color: #015779;
    font-size: 18px;
    padding: 5px;
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
    height: 450px;
  }
  
  .tableFixHead thead th {
    position: sticky;
    top: 0;
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
    background: linear-gradient(to bottom,#1E5992, #0D9CF4);
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
  
  .imageSizetop {
    margin: 5px;
    max-width: 35px;
    max-height: 35px;
    width: 100%;
    height: 100%;
  }
  
  td.t {
    padding: 7px;
  }
  
  td {
    font-size: 13px;
    padding: 5px;
  }
  
  @media (min-width: 1240px) and (max-width: 2340px) {
    .td-nameFile {
      width: 400px;
      text-align: left;
    }
  
    .td-image {
      width: 200px;
    }
  
    .td-size {
      width: 100px;
    }
  
    .td-date {
      font-size: 13px;
      width: 95px;
    }
  
    .td-metadata {
      width: 80px;
      text-align: center;
    }
  
    .td-excel {
      width: 70px;
      text-align: center;
    }
  
    .td-csv {
      width: 70px;
      text-align: center;
    }
  
    .imageSize-excel {
      margin-bottom: -18px;
      height: 35px;
      width: 60%;
    }
  
    .imageSize-csv {
      margin-bottom: -16px;
      height: 27px;
      width: 50%;
    }
  
    .imageSize-metaData {
      margin-bottom: -12px;
      width: 25px;
    }
  }
  
  @media (min-width: 750px) and (max-width: 1440px) {
    .td-nameFile {
      font-size: 13px;
      width: 290px;
      text-align: left;
    }
  
    .td-file {
      width: 130px;
    }
  
    .td-size {
      width: 70px;
    }
  
    .td-metadata {
      width: 70px;
      margin-bottom: -12px;
      text-align: right;
    }
  
    .td-date {
      font-size: 10px;
      width: 70px;
    }
  
    .td-excel {
      width: 30px;
    }
  
    .td-csv {
      width: 30px;
    }
  
    .imageSize-excel {
      margin-bottom: -18px;
      height: 4vh;
      width: 100%;
    }
  
    .imageSize-csv {
      margin-bottom: -16px;
      height: 3vh;
      width: 40%;
    }
  
    .imageSize-metaData {
      width: 20px;
    }
  }
  
  @media only screen and (max-width: 550px) {
    .td-nameFile {
      font-size: 10px;
      width: 120px;
      text-align: left;
    }
  
    .td-file {
      width: 60px;
    }
  
    .td-size {
      width: 100px;
    }
  
    .td-metadata {
      margin-bottom: -12px;
      text-align: center;
      width: 60px;
    }
  
    .td-date {
      font-size: 10px;
      width: 70px;
      padding: 0 5px 0 15px;
    }
  
    .imageSize-excel {
      margin-bottom: -25px;
      height: 4vh;
      width: 60%;
    }
  
    .imageSize-csv {
      margin-bottom: -23px;
      height: 3vh;
      width: 100%;
    }
  
    .imageSize-metaData {
      margin-bottom: -16px;
      width: 20px;
    }
  }
  
  table {
    max-width: 100%;
    table-layout: fixed;
    height: auto;
    /* margin: auto; */
  }
  
  .tb-row-blue {
    height: 3vh;
    display: table;
    width: 100%;
    /* table-layout:fixed; */
    background-color: #f5f5f5
  }
  
  .tb-row-white {
    height: 3vh;
    display: table;
    width: 100%;
    /* table-layout:fixed; */
    background-color: #ffffff
  }
  
  .table-scroll-table {
    width: 100%;
    display: block;
    max-height: 60vh !important;
    overflow: auto;
    background-color: #F5F5F5;
  }
  
  .tb-header {
    width: calc(100% - 17px);
    display: table;
    width: 100%;
    /* width:calc(100% - 18px); */
  }
  
  .tb-header-top {
    width: calc(100% - 17px);
    background-color: #757575;
    color: #ffffff;
    display: table;
    width: 100%;
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
    display: table;
    width: 100%;
    /* table-layout:fixed; */
    color: #000000;
  }
  
  .font-title {
    font-size: 12px;
    color: #ffffff;
  }
  
  td.hover-img:hover {
    background-color: #9ec7e4;
  }
  
  td.hover-img {
    outline: none;
    cursor: pointer;
  }
  
  @media(min-width: 1904px) {
    .tableFixHead {
      height: 100%;
    }
  
    .search-top[data-v-7c66a6a2] {
      /* margin-top: -110px; */
      margin-bottom: 34px;
      padding-top: 130px;
    }
  }
  </style>