<template>
  <v-container fluid class="contentPortal">
    <v-card-title class="color-title">
      <h1 class="text-uppercase">Data Source</h1>
    </v-card-title>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-layout row wrap class="pt-5">
        <v-flex xs12 sm12 md3 offset-md1>
          <h3>Data Source Table <span style="color: red">*</span></h3>
        </v-flex>
        <v-flex xs12 sm12 md5>
          <!-- <pre>{{sourceData}}</pre>
        <pre>{{day_on_month_1}}</pre> -->

          <v-text-field v-model="sourceData.data_source_table" ref="data_source_table"
            :value="sourceData.data_source_table" label="กรอกชื่อชุดข้อมูลใน Big data" required :rules="rules" readonly></v-text-field>
        </v-flex>
        <v-flex md1 pl-3>
          <v-btn text fab dark small color="primary" @click="(dialog = true), getDatasource()"><span
              class="material-icons"> search </span>
          </v-btn>
        </v-flex>

        <v-flex xs12 sm12 md3 offset-md1>
          <h3>Data Source Name <span style="color: red">*</span></h3>
        </v-flex>
        <v-flex xs12 sm12 md5>
          <v-text-field v-model="sourceData.data_source_name" required :rules="Rulesss"
            @keydown.space="preventLeadingSpace" label="กรอกชื่อชุดข้อมูลใน Big data"></v-text-field>
        </v-flex>

        <v-flex xs12 sm12 md3 offset-md1>
          <h3>ETL Workflow name <span style="color: red">*</span></h3>
        </v-flex>
        <v-flex xs12 sm12 md5>
          <v-text-field v-model="sourceData.data_source_workflow" required :rules="rules" label="กรอกชื่อ KNIME Workflow ที่ใช้สร้างชุดข้อมูล"></v-text-field>
        </v-flex>

        <v-flex xs12 sm12 md3 offset-md1>
          <h3>Workflow Type <span style="color: red">*</span></h3>
        </v-flex>
        <v-flex xs12 sm12 md5>
          <v-radio-group v-model="sourceData.workflow_type" required row>
            <v-radio color="indigo" value="Input">
              <template v-slot:label>
                <div>Input</div>
              </template>
            </v-radio>
            <v-radio color="indigo" value="ETL">
              <template v-slot:label>
                <div>ETL</div>
              </template>
            </v-radio>
          </v-radio-group>
        </v-flex>

        <v-flex xs12 sm12 md3 offset-md1>
          <h3>{{ $t('reprotid') }} <span style="color: red">*</span></h3>
        </v-flex>

        <v-flex xs12 sm12 md5>
          <v-autocomplete v-model="source_id_report" :items="report" item-text="source_id" item-value="source_id" attach
            chips multiple required :rules="rules" label="เลือกรหัสรายงานที่ใช้ชุดข้อมูล">
          </v-autocomplete>
        </v-flex>
        <!-- <v-flex md1 pl-3
                ><v-btn
                 text
                  fab
                  dark
                  small
                  color="primary"
                  @click="(dialog = true), getDatareport()"
                  ><span class="material-icons">
                    search
                    </span>
                  </v-btn
                ></v-flex> -->
        <v-flex xs12 sm12 md3 offset-md1>
          <h3>Status <span style="color: red">*</span></h3>
        </v-flex>
        <v-flex xs12 sm12 md5>
          <v-select v-model="sourceData.data_source_status" :items="itemstatus" required :rules="rules" label="เลือกสถานะการใช้งานชุดข้อมูล(Online = ยังใช้งานอยู่ / Offline = เลิกใช้งาน)"></v-select>

          <!-- <v-radio-group v-model="sourceData.data_source_status"
               :mandatory="false"
                  row
                ><h4>STATUS :</h4> 
                  <v-radio label="Online" color="primary" :value="Online"></v-radio>
                  <v-radio label="Offline" color="grey" :value="Offline"></v-radio>
                </v-radio-group> -->
        </v-flex>
      </v-layout>

      <v-list-item>
        <v-list-group :value="true" no-action sub-group>
          <template v-slot:activator>
            <v-list-item-title>Frequency </v-list-item-title>
          </template>

          <v-list-item>
            <v-list-item-content>
              <v-col class="pa-2">
                <v-flex xs12 sm12 md6 offset-md1>
                  <v-list-item>
                    <v-select v-model="sourceData.frequency_repeat" :items="itemsRepeats" required label="เลือกรอบการอัปเดตข้อมูล">
                    </v-select>
                  </v-list-item>
                </v-flex>
                <!-- v-if เพื่อ ให้แสดง สิ่งที่ต้องการเมื่อเลือกหรือมีค่านั้นๆเข้ามาแล้วให้แสดง บางอย่าง -->
                <v-flex xs12 sm12 md6 offset-md1>
                  <div v-if="sourceData.frequency_repeat === 'Monthly'">
                    <v-list-item>
                      <v-select v-model="sourceData.frequency_day_of_month" :items="day_on_month" required
                        :rules="rules" label="day_on_month" multiple>
                      </v-select>
                    </v-list-item>
                  </div>
                </v-flex>

                <v-flex xs12 sm12 md6 offset-md1>
                  <v-list-item>
                    <v-row>
                      <v-col cols="11" sm="5">
                        <v-menu ref="menu" v-model="menu2" :close-on-content-click="false" :nudge-right="40"
                          :return-value.sync="time" transition="scale-transition" offset-y max-width="290px"
                          min-width="290px">
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field v-model="sourceData.frequency_time" label="เลือกเวลาการอัปเดตชุดข้อมูล" prepend-icon="schedule"
                              readonly v-bind="attrs" v-on="on"></v-text-field>
                          </template>
                          <v-time-picker v-model="sourceData.frequency_time" ampm-in-title format="24hr" use-seconds
                            @click:second="$refs.menu.save(time)"></v-time-picker>
                        </v-menu>
                      </v-col>
                      <v-spacer></v-spacer>
                    </v-row>
                  </v-list-item>

                  <!-- <div v-if="sourceData.frequency_repeat === 'Daily'">
                    <v-list-item>
                      <v-select
                        v-model="sourceData.frequency_day"
                        :items="itemsDay"
                        required
                        label="On"
                      ></v-select>
                    </v-list-item>
                  </div> -->
                  <div v-if="sourceData.frequency_repeat === 'Weekly'">
                    <v-list-item>
                      <!-- เลือกหลายวันต่อ Weekly เพิ่ม multiple -->
                      <!-- <v-select
                        multiple
                        v-model="sourceData.frequency_day"
                        :items="itemsDay"
                        required
                        label="On"
                      ></v-select>
                       -->
                      <v-select v-model="sourceData.frequency_day" :items="itemsDay" label="On" multiple>
                      </v-select>
                    </v-list-item>
                  </div>
                </v-flex>
              </v-col>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
      </v-list-item>

      <v-flex offset-md9 pt-5>
        <v-btn :disabled="!valid" color="success" @click="save()">save</v-btn>
      </v-flex>
    </v-form>
    <dialogDataSource ref="dialogDataSource" @selectDataSource="dataSource"></dialogDataSource>
    <dialogDataReport ref="dialogDataReport" @selectDataReport="dataReport"></dialogDataReport>
  </v-container>
</template>

<script>
  import dialogDataSource from "@/components/admin/DataSource/dialogDataSource";
  import dialogDataReport from "@/components/admin/DataSource/dialogDataReport";
  import { Encode, Decode } from "@/services";

  export default {
    components: {
      dialogDataSource,
      dialogDataReport
    },
    data() {
      return {
        // etl: 'Input',
        // data_source_status: ["foo", "bar", "fizz", "buzz"],
        valid: true,
        sourceData: {},
        reportData: {},
        itemsDialog: [],
        itemsDialog2: [],
        itemstatus: ["Online", "Offline"],
        itemsDay: ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"],
        itemsRepeats: [
          { text: "Daily", value: "Daily" },
          { text: "Weekly", value: "Weekly" },
          { text: "Monthly", value: "Monthly" }
        ],
        day_on_month: [
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8",
          "9",
          "10",
          "11",
          "12",
          "13",
          "14",
          "15",
          "16",
          "17",
          "18",
          "19",
          "20",
          "21",
          "22",
          "23",
          "24",
          "25",
          "26",
          "27",
          "28",
          "29",
          "30",
          "31"
        ],
        date: null,
        // freguency_day: undefined,
        dialog: false,
        time: null,
        status: ["Online", "Offline"],
        value: null,

        report: [],
        source_id_report: [],
        day_on_month_1: [],
        Rulesss: [
          v => !!v || "Information is required",
          v => /^[\wก-ฮ](.*[\w_ก-ฮ])?$/.test(v) || "Information is required"
        ],
        specialKey:
          "[`~!#$^&*()=|{}':;',\\[\\].<>/?~！#￥……&*（）——|{}【】‘；：”“'。，、？]‘'",
        rules: [
          v => (v || "").indexOf("@") < 0 || "No special characters are allowed",

          v => (v || "").indexOf("-") < 0 || "No special characters are allowed",
          v => (v || "").indexOf("~") < 0 || "No special characters are allowed",
          v => (v || "").indexOf("!") < 0 || "No special characters are allowed",
          v => (v || "").indexOf("#") < 0 || "No special characters are allowed",
          v => (v || "").indexOf("$") < 0 || "No special characters are allowed",

          v => (v || "").indexOf("^") < 0 || "No special characters are allowed",
          v => (v || "").indexOf("&") < 0 || "No special characters are allowed",
          v => (v || "").indexOf("*") < 0 || "No special characters are allowed",
          v => (v || "").indexOf("(") < 0 || "No special characters are allowed",

          v => (v || "").indexOf(")") < 0 || "No special characters are allowed",
          v => (v || "").indexOf("=") < 0 || "No special characters are allowed",
          v => (v || "").indexOf("|") < 0 || "No special characters are allowed",
          v => (v || "").indexOf("(") < 0 || "No special characters are allowed",
          v => (v || "").indexOf("{") < 0 || "No special characters are allowed",
          v => (v || "").indexOf("}") < 0 || "No special characters are allowed",
          v => (v || "").indexOf(":") < 0 || "No special characters are allowed",
          v => (v || "").indexOf(";") < 0 || "No special characters are allowed",

          v => (v || "").indexOf(",") < 0 || "No special characters are allowed",
          v => (v || "").indexOf("/") < 0 || "No special characters are allowed",
          v => (v || "").indexOf("+") < 0 || "No special characters are allowed",
          v => (v || "").indexOf(">") < 0 || "No special characters are allowed",

          v => (v || "").indexOf("<") < 0 || "No special characters are allowed",
          v => (v || "").indexOf("?") < 0 || "No special characters are allowed",
          v => (v || "").indexOf("￥") < 0 || "No special characters are allowed",
          v => (v || "").indexOf(".") < 0 || "No special characters are allowed",

          v => (v || "").indexOf("【") < 0 || "No special characters are allowed",
          v => (v || "").indexOf("】") < 0 || "No special characters are allowed",
          v => (v || "").indexOf("‘") < 0 || "No special characters are allowed",
          v => (v || "").indexOf("”") < 0 || "No special characters are allowed",

          v => (v || "").indexOf("“") < 0 || "No special characters are allowed",
          v => (v || "").indexOf("。") < 0 || "No special characters are allowed",
          v => (v || "").indexOf("、") < 0 || "No special characters are allowed",
          v => (v || "").indexOf("？") < 0 || "No special characters are allowed",

          v => (v || "").indexOf("♥") < 0 || "No special characters are allowed",
          v => (v || "").indexOf("☺") < 0 || "No special characters are allowed",
          v => (v || "").indexOf("☻") < 0 || "No special characters are allowed",
          v => (v || "").indexOf("♦") < 0 || "No special characters are allowed",

          v => (v || "").indexOf("♣") < 0 || "No special characters are allowed",
          v => (v || "").indexOf("♠") < 0 || "No special characters are allowed",
          v => (v || "").indexOf("•") < 0 || "No special characters are allowed",
          v => (v || "").indexOf("◘") < 0 || "No special characters are allowed",

          v => (v || "").indexOf("○") < 0 || "No special characters are allowed",
          v => (v || "").indexOf("◙") < 0 || "No special characters are allowed",
          v => (v || "").indexOf("♀") < 0 || "No special characters are allowed",
          v => (v || "").indexOf("♪") < 0 || "No special characters are allowed",

          v => (v || "").indexOf(".") < 0 || "No special characters are allowed",
          v => (v || "").indexOf("♫") < 0 || "No special characters are allowed",
          v => (v || "").indexOf("☼") < 0 || "No special characters are allowed",
          v => (v || "").indexOf("►") < 0 || "No special characters are allowed",

          v => (v || "").indexOf("◄") < 0 || "No special characters are allowed",
          v => (v || "").indexOf("↕") < 0 || "No special characters are allowed",
          v => (v || "").indexOf("‼") < 0 || "No special characters are allowed",
          v => (v || "").indexOf("¶") < 0 || "No special characters are allowed",

          v => (v || "").indexOf("§") < 0 || "No special characters are allowed",
          v => (v || "").indexOf("▬") < 0 || "No special characters are allowed",
          v => (v || "").indexOf("↨") < 0 || "No special characters are allowed",
          v => (v || "").indexOf("↑") < 0 || "No special characters are allowed",

          v => (v || "").indexOf("↓") < 0 || "No special characters are allowed",
          v => (v || "").indexOf("→") < 0 || "No special characters are allowed",
          v => (v || "").indexOf("←") < 0 || "No special characters are allowed",
          v => (v || "").indexOf("∟") < 0 || "No special characters are allowed",

          v => (v || "").indexOf("↔") < 0 || "No special characters are allowed",
          v => (v || "").indexOf("▲") < 0 || "No special characters are allowed",
          v => (v || "").indexOf("▼") < 0 || "No special characters are allowed",
          v => (v || "").indexOf('"') < 0 || "No special characters are allowed",

          v => (v || "").indexOf("⌂") < 0 || "No special characters are allowed",
          v => (v || "").indexOf("Ç") < 0 || "No special characters are allowed",
          v => (v || "").indexOf("ü") < 0 || "No special characters are allowed",
          v => (v || "").indexOf("é") < 0 || "No special characters are allowed",

          v => (v || "").indexOf("â") < 0 || "No special characters are allowed",
          v => (v || "").indexOf("ä") < 0 || "No special characters are allowed",
          v => (v || "").indexOf("à") < 0 || "No special characters are allowed",
          v => (v || "").indexOf("å") < 0 || "No special characters are allowed",

          v => (v || "").indexOf("ê") < 0 || "No special characters are allowed",
          v => (v || "").indexOf("ë") < 0 || "No special characters are allowed",
          v => (v || "").indexOf("è") < 0 || "No special characters are allowed",
          v => (v || "").indexOf("ï") < 0 || "No special characters are allowed",

          v => (v || "").indexOf("î") < 0 || "No special characters are allowed",
          v => (v || "").indexOf("ì") < 0 || "No special characters are allowed",
          v => (v || "").indexOf("Ä") < 0 || "No special characters are allowed",
          v => (v || "").indexOf("Å") < 0 || "No special characters are allowed",

          v => (v || "").indexOf("É") < 0 || "No special characters are allowed",
          v => (v || "").indexOf("æ") < 0 || "No special characters are allowed",
          v => (v || "").indexOf("Æ") < 0 || "No special characters are allowed",
          v => (v || "").indexOf("ô") < 0 || "No special characters are allowed",

          v => (v || "").indexOf("ö") < 0 || "No special characters are allowed",
          v => (v || "").indexOf("ò") < 0 || "No special characters are allowed",
          v => (v || "").indexOf("û") < 0 || "No special characters are allowed",
          v => (v || "").indexOf("ù") < 0 || "No special characters are allowed",

          v => (v || "").indexOf("ÿ") < 0 || "No special characters are allowed",
          v => (v || "").indexOf("Ö") < 0 || "No special characters are allowed",
          v => (v || "").indexOf("Ü") < 0 || "No special characters are allowed",
          v => (v || "").indexOf("¢") < 0 || "No special characters are allowed",

          v => (v || "").indexOf("£") < 0 || "No special characters are allowed",
          v => (v || "").indexOf("¥") < 0 || "No special characters are allowed",
          v => (v || "").indexOf("₧") < 0 || "No special characters are allowed",
          v => (v || "").indexOf("ƒ") < 0 || "No special characters are allowed",

          v => (v || "").indexOf("á") < 0 || "No special characters are allowed",
          v => (v || "").indexOf("í") < 0 || "No special characters are allowed",
          v => (v || "").indexOf("ó") < 0 || "No special characters are allowed",
          v => (v || "").indexOf("ú") < 0 || "No special characters are allowed",

          v => (v || "").indexOf("ñ") < 0 || "No special characters are allowed",
          v => (v || "").indexOf("Ñ") < 0 || "No special characters are allowed",
          v => (v || "").indexOf("ª") < 0 || "No special characters are allowed",
          v => (v || "").indexOf("º") < 0 || "No special characters are allowed",

          v => (v || "").indexOf("¿") < 0 || "No special characters are allowed",
          v => (v || "").indexOf("⌐") < 0 || "No special characters are allowed",
          v => (v || "").indexOf("¬") < 0 || "No special characters are allowed",
          v => (v || "").indexOf("½") < 0 || "No special characters are allowed",

          v => (v || "").indexOf("¡") < 0 || "No special characters are allowed",
          v => (v || "").indexOf("«") < 0 || "No special characters are allowed",
          v => (v || "").indexOf("»") < 0 || "No special characters are allowed",
          v => (v || "").indexOf("░") < 0 || "No special characters are allowed",

          v => (v || "").indexOf("▒") < 0 || "No special characters are allowed",
          v => (v || "").indexOf("▓") < 0 || "No special characters are allowed",
          v => (v || "").indexOf("│") < 0 || "No special characters are allowed",
          v => (v || "").indexOf("┤") < 0 || "No special characters are allowed",

          v => (v || "").indexOf("╡") < 0 || "No special characters are allowed",
          v => (v || "").indexOf("╢") < 0 || "No special characters are allowed",
          v => (v || "").indexOf("╖") < 0 || "No special characters are allowed",
          v => (v || "").indexOf("╕") < 0 || "No special characters are allowed",

          v => (v || "").indexOf("╣") < 0 || "No special characters are allowed",
          v => (v || "").indexOf("║") < 0 || "No special characters are allowed",
          v => (v || "").indexOf("╗") < 0 || "No special characters are allowed",
          v => (v || "").indexOf("╝") < 0 || "No special characters are allowed",

          v => (v || "").indexOf("╜") < 0 || "No special characters are allowed",
          v => (v || "").indexOf("╛") < 0 || "No special characters are allowed",
          v => (v || "").indexOf("┐") < 0 || "No special characters are allowed",
          v => (v || "").indexOf("└") < 0 || "No special characters are allowed",

          v => (v || "").indexOf("┴") < 0 || "No special characters are allowed",
          v => (v || "").indexOf("┬") < 0 || "No special characters are allowed",
          v => (v || "").indexOf("├") < 0 || "No special characters are allowed",
          v => (v || "").indexOf("─") < 0 || "No special characters are allowed",

          v => (v || "").indexOf("┼") < 0 || "No special characters are allowed",
          v => (v || "").indexOf("‼") < 0 || "No special characters are allowed",
          v => (v || "").indexOf("╟") < 0 || "No special characters are allowed",
          v => (v || "").indexOf("╚") < 0 || "No special characters are allowed"
        ]
      };
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

    // data: () => ({
    //   return: {
    //     time: null,
    //     menu2: false,
    //     dialog: false,
    //     toggle_exclusive: undefined,
    //     sourceData:{},
    //     date: null,

    //   rules: [
    //     value => !!value || 'Required.',
    //     value => (value || '').length <= 20 || 'Max 20 characters',
    //     value => {
    //       const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    //       return pattern.test(value) || 'Invalid e-mail.'
    //     },
    //   ],
    // }
    // }),
    mounted() {
      this.getData();
      // this.datastatus();
      // this.getData();
      // this.save()
      //  this.dataSource()
    },
    methods: {
      preventLeadingSpace(e) {
        // only prevent the keypress if the value is blank
        if (!e.target.value) e.preventDefault();
        // otherwise, if the leading character is a space, remove all leading white-space
        else if (e.target.value[0] == " ")
          e.target.value = e.target.value.replace(/^\s*/, "");
      },
      getData() {
        // console.log(this.userData);
        this.axios
          // .get("http://203.154.59.102:3000" + "/getReportId",)
          // .get("http://172.16.112.19:5000" + "/getReportId",)
          // .get("http://172.16.112.30:5000" + "/getReportId")
          .get(process.env.VUE_APP_API_BACKEND + "/getReportId")
          .then(response => {
            // console.log(response.data.data)
            this.report = response.data;
            // console.log(response);
          });
      },
      save() {
        this.$refs.form.validate()
        //  console.log(this.sourceData.frequency_day);
        // console.log(this.sourceData);
        // console.log(this.sourceData.data_source_table)
        // console.log(this.sourceData.data_source_name);
        // console.log(this.sourceData.data_source_workflow);
        // console.log(this.source_id_report);
        // console.log(this.sourceData.data_source_status);
        // console.log(this.sourceData.frequency_repeat);
        // // console.log(this.sourceData.frequency_day);
        // console.log(this.sourceData.frequency_day_of_month.toString());
        // console.log(this.sourceData.day_on_month_1);
        // console.log(this.sourceData.workflow_type);
        // console.log(this.sourceData.frequency_repeat);
        var user = Encode.encode(JSON.stringify(this.userData));
        if (this.sourceData.frequency_repeat === "Monthly") {
          // console.log(123);
          this.axios
            // .post("http://172.16.112.62:5000" + "/insertDataSource", {
            // .post(process.env.VUE_APP_API_BACKEND + "/insertDataSource", {
            // .post("http://172.16.112.30:5000" + "/insertDataSource", {
            .post(process.env.VUE_APP_API_BACKEND + "/insertDataSource", {
              data_source_table: this.sourceData.data_source_table,
              data_source_name: this.sourceData.data_source_name,
              data_source_workflow: this.sourceData.data_source_workflow,
              workflow_type: this.sourceData.workflow_type,
              source_id: this.source_id_report,
              data_source_status: this.sourceData.data_source_status,
              frequency_repeat: this.sourceData.frequency_repeat,
              frequency_day: null,
              frequency_time: this.sourceData.frequency_time,
              frequency_day_of_month: this.sourceData.frequency_day_of_month.toString(),
              user: user
            })
            .then(response => {
              // console.log(response);
              // console.log("if month");

              if (response.data.status === "Complete !") {
                this.$swal("Save Success", "", "success").then(response => {
                  this.reloadPage();
                });
              } else if (response.data.status === "Data repeatedly") {
                this.$swal("Data repeatedly", "", "warning").then(response => {
                  this.sourceData.data_source_name = "";
                });
              } else {
                this.$swal("Information is required", "", "warning");
              }
            });
        }
        // if (
        //   this.sourceData.frequency_repeat === "Daily" ||
        //   this.sourceData.frequency_repeat === "Weekly"
        // ) {
        //   console.log(456);
        //   console.log(this.sourceData.frequency_day);
        //   this.axios
        //     //  .post("http://172.16.112.62:5000" + "/insertDataSource", {
        //     //  .post(process.env.VUE_APP_API_BACKEND + "/insertDataSource", {
        //     // .post("http://172.16.112.30:5000" + "/insertDataSource", {
        //       .post(process.env.VUE_APP_API_BACKEND + "/insertDataSource", {
        //       data_source_table: this.sourceData.data_source_table,
        //       data_source_name: this.sourceData.data_source_name,
        //       data_source_workflow: this.sourceData.data_source_workflow,
        //       workflow_type: this.sourceData.workflow_type,
        //       source_id: this.source_id_report,
        //       data_source_status: this.sourceData.data_source_status, 
        //       frequency_repeat: this.sourceData.frequency_repeat,
        //       frequency_day: this.sourceData.frequency_day.toString(),
        //       //  frequency_day_of_month: this.sourceData.frequency_day.toString(),
        //       frequency_time: this.sourceData.frequency_time,
        //       frequency_day_of_month: null,
        //       user: user
        //     })
        //     .then(response => {
        //       // console.log("day week");
        //       // console.log(response);

        //       if (response.data.status === "Complete !") {
        //         this.$swal("Save Success", "", "success").then(response => {
        //           this.reloadPage();
        //         });
        //       } else if (response.data.status === "Data repeatedly") {
        //         this.$swal("Data repeatedly", "", "warning").then(response => {
        //           this.sourceData.data_source_name = "";
        //         });
        //       } else {
        //         this.$swal("Information is required", "", "warning");
        //       }
        //     });
        // }
        else if (this.sourceData.frequency_repeat === "Daily") {
          // console.log(23);
          // console.log(this.frequency_day);
          this.axios
            // .post("http://172.16.112.62:5000" + "/insertDataSource", {
            // .post(process.env.VUE_APP_API_BACKEND + "/insertDataSource", {
            // .post("http://172.16.112.30:5000" + "/insertDataSource", {
            .post(process.env.VUE_APP_API_BACKEND + "/insertDataSource", {
              data_source_table: this.sourceData.data_source_table,
              data_source_name: this.sourceData.data_source_name,
              data_source_workflow: this.sourceData.data_source_workflow,
              workflow_type: this.sourceData.workflow_type,
              source_id: this.source_id_report,
              data_source_status: this.sourceData.data_source_status,
              frequency_repeat: this.sourceData.frequency_repeat,
              frequency_day: null,
              frequency_time: this.sourceData.frequency_time,
              frequency_day_of_month: null,
              user: user
            })
            .then(response => {
              // console.log(response);
              // console.log("if month");

              if (response.data.status === "Complete !") {
                this.$swal("Save Success", "", "success").then(response => {
                  this.reloadPage();
                });
              } else if (response.data.status === "Data repeatedly") {
                this.$swal("Data repeatedly", "", "warning").then(response => {
                  this.sourceData.data_source_name = "";
                });
              } else {
                this.$swal("Information is required", "", "warning");
              }
            });
        }
        else if (this.sourceData.frequency_repeat === "Weekly") {
          // console.log(3);
          this.axios
            // .post("http://172.16.112.62:5000" + "/insertDataSource", {
            // .post(process.env.VUE_APP_API_BACKEND + "/insertDataSource", {
            // .post("http://172.16.112.30:5000" + "/insertDataSource", {
            .post(process.env.VUE_APP_API_BACKEND + "/insertDataSource", {
              data_source_table: this.sourceData.data_source_table,
              data_source_name: this.sourceData.data_source_name,
              data_source_workflow: this.sourceData.data_source_workflow,
              workflow_type: this.sourceData.workflow_type,
              source_id: this.source_id_report,
              data_source_status: this.sourceData.data_source_status,
              frequency_repeat: this.sourceData.frequency_repeat,
              frequency_day: this.sourceData.frequency_day.toString(),
              frequency_time: this.sourceData.frequency_time,
              frequency_day_of_month: null,
              user: user
            })
            .then(response => {
              // console.log(response);
              // console.log("if month");

              if (response.data.status === "Complete !") {
                this.$swal("Save Success", "", "success").then(response => {
                  this.reloadPage();
                });
              } else if (response.data.status === "Data repeatedly") {
                this.$swal("Data repeatedly", "", "warning").then(response => {
                  this.sourceData.data_source_name = "";
                });
              } else {
                this.$swal("Information is required", "", "warning");
              }
            });
        }
        else
          if (
            this.sourceData.frequency_repeat === "-" ||
            this.sourceData.frequency_repeat === " " ||
            this.sourceData.frequency_repeat === "None" ||
            this.sourceData.frequency_repeat === null
          ) {
            // console.log(789);
            this.axios
              //  .post("http://172.16.112.62:5000" + "/insertDataSource", {
              // .post(process.env.VUE_APP_API_BACKEND + "/insertDataSource", {

              // .post("http://172.16.112.30:5000" + "/insertDataSource", {
              .post(process.env.VUE_APP_API_BACKEND + "/insertDataSource", {
                data_source_table: this.sourceData.data_source_table,
                data_source_name: this.sourceData.data_source_name,
                data_source_workflow: this.sourceData.data_source_workflow,
                workflow_type: this.sourceData.workflow_type,
                source_id: this.source_id_report,
                data_source_status: this.sourceData.data_source_status,
                frequency_repeat: this.sourceData.frequency_repeat,
                frequency_day: null,
                frequency_time: this.sourceData.frequency_time,
                frequency_day_of_month: null,
                user: user
              })
              .then(response => {
                // console.log("ขขขขข");
                // console.log(response);

                if (response.data.status === "Complete !") {
                  this.$swal("Save Success", "", "success").then(response => {
                    this.reloadPage();
                  });
                } else if (response.data.status === "Data repeatedly") {
                  this.$swal("Data repeatedly", "", "warning").then(response => {
                    this.sourceData.data_source_name = "";
                  });
                } else {
                  this.$swal("Information is required", "", "warning");
                }
              });

          } else {
            this.$swal("Information is required", "", "warning");
          }
      },
      reloadPage() {
        window.location.reload();
      },
      getDatasource() {
        this.$refs.dialogDataSource.open();

      },
      // getDatareport() {
      //   this.$refs.dialogDataReport.open();
      // },
      dataSource(data) {
        // console.log(data);
        this.sourceData = data;
        let str = data.source_id;

        let replace = str.replaceAll(/[\[\]']+/g, "");

        let y = replace.split(",");
        this.source_id_report = y;

        // let str_date = data.frequency_day_of_month
        // // console.log(str_date);

        // let replace1 = str_date.replaceAll(/[\[\]']+/g, "");
        // // console.log(replace1);
        // let yp = replace1.split(",");
        // this.day_on_month_1 = yp;
        // console.log(this.day_on_month_1);

        // let x = replace.split(",");
        // this.frequency_day_of_month = x;
      },
      dataReport(data) {
        // console.log(data);
        this.reportData = data;
      }
    }
  };
</script>

<style scoped>
  .color-title {
    font-size: 12px;
    background-color: #a6bac5;
    color: #fff;
  }

  .contentPortal {
    margin-top: 20px;
  }
</style>