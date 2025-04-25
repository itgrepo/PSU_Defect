<template>
  <v-card class="contentPortal">
    <v-card-title class="color-title">
      <h1 class="text-uppercase">Work Bench</h1>
    </v-card-title>
    <v-container>

      <v-layout row wrap>
        <v-flex xs12 sm12 md12 lg5 xl5>
          <v-layout row wrap>
            <v-flex xs12 sm3 md3 lg3 xl3 class="center-workbench">
              <div class="font-weight-bold">Source </div>
            </v-flex>
            <v-flex xs12 sm9 md9 lg9 xl9>
              <v-radio-group v-model="radio_Source" @change="getDataWorkbench_Source ()" row>
                <v-radio label="All" :value="1"></v-radio>
                <v-radio label="Internal" :value="2"></v-radio>
                <v-radio label="External" :value="3"></v-radio>
              </v-radio-group>
            </v-flex>
            <v-flex xs12 sm3 md3 lg3 xl3 class="center-workbench">
              <div class="font-weight-bold">Status </div>
            </v-flex>
            <v-flex xs12 sm9 md9 lg9 xl9>
              <v-radio-group v-model="radio_status" @change="getDataWorkbench_Source ()" row>
                <v-radio label="All" :value="1"></v-radio>
                <v-radio label="Complete" :value="2"></v-radio>
                <v-radio label="In Complete" :value="3"></v-radio>
              </v-radio-group>
            </v-flex>
            <v-flex xs12 sm3 md3 lg3 xl3 class="center-workbench">
              <div class="font-weight-bold">Data Type </div>
            </v-flex>
            <v-flex xs12 sm9 md9 lg9 xl9>
              <v-radio-group v-model="radio_datatype" @change="getDataWorkbench_Source ()" row>
                <v-radio label="Source" :value="1"></v-radio>
                <v-radio label="Report" :value="2"></v-radio>

              </v-radio-group>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex xs12 sm12 md12 lg7 xl7>
          <v-layout row wrap>
            <v-flex xs12 sm3 md3 lg1 xl1 class="center-workbench">
              <div class="font-weight-bold">DATE RANGE </div>
            </v-flex>
            <v-flex xs12 sm1 md1 lg1 xl1 class="center-workbench">
              <v-checkbox v-model="checkbox" type="checkbox" @change="getDataWorkbench_Source ()"></v-checkbox>
            </v-flex>
            <v-flex xs12 sm8 md8 lg10 xl10 v-if="this.checkbox === true">
              <v-layout row wrap>
                <v-flex xs12 sm6 md6 lg6 xl6 class="pa-1">
                  <!-- <v-date-picker v-model="date" header-color="primary" :max="date_now"
                    width="250" @change="getDataWorkbench_Source ()"></v-date-picker> -->
                  <v-menu ref="menu1" v-model="menu1" :close-on-content-click="false" transition="scale-transition"
                    offset-y full-width max-width="290px" min-width="290px">
                    <template v-slot:activator="{ on }">
                      <v-text-field v-model="date" label="START" persistent-hint prepend-icon="event" v-on="on"
                        hint="YYYY-MM-DD format" style="padding-top: 0;"></v-text-field>
                    </template>
                    <v-date-picker v-model="date" @input="menu1 = false" @change="getDataWorkbench_Source()">
                    </v-date-picker>
                  </v-menu>
                </v-flex>
                <v-flex xs12 sm6 md6 lg6 xl6 class="pa-1">
                  <!-- <v-date-picker v-model="date2" header-color="primary" :max="date_now"
                    :min="date" width="250" @change="getDataWorkbench_Source ()"></v-date-picker> -->
                  <v-menu ref="menu2" v-model="menu2" :close-on-content-click="false" transition="scale-transition"
                    offset-y full-width max-width="290px" min-width="290px">
                    <template v-slot:activator="{ on }">
                      <v-text-field v-model="date2" label="END" persistent-hint prepend-icon="event" v-on="on"
                        hint="YYYY-MM-DD format" style="padding-top: 0;"></v-text-field>
                    </template>
                    <v-date-picker v-model="date2" :min="date" @input="menu2 = false"
                      @change="getDataWorkbench_Source()"></v-date-picker>
                  </v-menu>
                </v-flex>
              </v-layout>
            </v-flex>
            <v-flex xs12 sm8 md8 lg10 xl10 v-else>
              <v-layout row wrap>
                <v-flex xs12 sm6 md6 lg6 xl6 class="pa-1">
                  <!-- <v-date-picker v-model="date_now" header-color="primary" :max="date_now"
                    :min="date" width="250" disabled></v-date-picker> -->
                  <v-menu ref="menu1" v-model="menu1" :close-on-content-click="false" transition="scale-transition"
                    offset-y full-width max-width="250px" min-width="250px">
                    <template v-slot:activator="{ on }">
                      <v-text-field v-model="date_now" label="START" persistent-hint prepend-icon="event" v-on="on"
                        hint="YYYY-MM-DD format" disabled style="padding-top: 0;"></v-text-field>
                    </template>
                    <v-date-picker v-model="date_now" max="date_now" :min="date" @input="menu1 = false"
                      @change="getDataWorkbench_Source()">
                    </v-date-picker>
                  </v-menu>
                </v-flex>
                <v-flex xs12 sm6 md6 lg6 xl6 class="pa-1">
                  <!-- <v-date-picker v-model="date_now" header-color="primary" :max="date_now"
                    :min="date" width="250" disabled></v-date-picker> -->
                  <v-menu ref="menu2" v-model="menu2" :close-on-content-click="false" transition="scale-transition"
                    offset-y full-width max-width="290px" min-width="290px">
                    <template v-slot:activator="{ on }">
                      <v-text-field v-model="date_now" label="END" persistent-hint prepend-icon="event" v-on="on"
                        hint="YYYY-MM-DD format" disabled style="padding-top: 0;"></v-text-field>
                    </template>
                    <v-date-picker v-model="date_now" :max="date_now" :min="date" @input="menu2 = false"
                      @change="getDataWorkbench_Source()"></v-date-picker>
                  </v-menu>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
      <v-flex v-if="this.radio_datatype == '1'">
        <v-card-title class="pa-4">
          <v-text-field v-model="search" append-icon="search" :label="$t('search')"  single-line
            hint="Please enter Source Name , Workflow , Report Name as a keyword" persistent-hint>
          </v-text-field>
        </v-card-title>
        <v-data-table :headers="headers" :items="rowDataItem" :loading="loading" prev-icon="arrow_left"
          next-icon="arrow_right" sort-icon="arrow_drop_down" :search="search" class="elevation-1"
          :rows-per-page-items="[100, 250, 500, { text: 'All', value: -1 }]"
          :rows-per-page-text="$t('rowsPerPageLabel')">
          <template v-slot:items="props">

            <td class="text-xs-center">{{props.item.etl_data_date }}</td>
            <td class="text-xs-center">{{ props.item.data_source_table }}</td>
            <td class="text-xs-center">{{ props.item.etl_data_workflow }}</td>
            <td class="text-xs-center">
              <div v-if="props.item.etl_data_result === 'Done'">
                <v-chip class="ma-2" color="success" text-color="white">
                  <!-- <v-icon left>check_circle</v-icon> -->
                  {{ props.item.etl_data_result }}
                </v-chip>
              </div>
              <div v-else-if="props.item.etl_data_result === 'Error'">
                <v-chip class="ma-2" color="red" text-color="white">
                  <!-- <v-icon left>error</v-icon> -->
                  {{ props.item.etl_data_result }}
                </v-chip>
              </div>
              <div v-else>
                {{ props.item.etl_data_result }}
              </div>
            </td>
            <td>{{ props.item.etl_data_action }}</td>
            <td class="word-break-text">{{ props.item.report_id }}</td>
            <td>{{ props.item.frequency }}</td>
            <td>{{ props.item.source_type }}</td>
          </template>

          <template v-slot:no-results>
            <v-alert :value="true" color="error" icon="warning">
              {{ $t('searchfor') }} "{{ search }}" {{ $t('foundno') }}
            </v-alert>
          </template>
        </v-data-table>
      </v-flex>
      <v-flex v-else-if="this.radio_datatype == '2'">
        <v-card-title class="pa-4">
          <v-text-field v-model="search" append-icon="search" :label="$t('search')"  single-line
            hint="Please enter Source Name , Workflow , Report Name as a keyword" persistent-hint>
          </v-text-field>
        </v-card-title>
        <v-data-table :headers="headers_report" :items="rowDataItem" :loading="loading" prev-icon="arrow_left"
          next-icon="arrow_right" sort-icon="arrow_drop_down" :search="search" class="elevation-1">
          <template v-slot:items="props">
            <td class="text-xs-center">{{ props.item.report_id }}</td>
            <td class="text-xs-center">{{ props.item.data_source_table }}</td>
            <td class="text-xs-center">
              <div v-if="props.item.etl_data_result === 'Done'">
                <v-chip class="ma-2" color="success" text-color="white">
                  <!-- <v-icon left>check_circle</v-icon> -->
                  {{ props.item.etl_data_result }}
                </v-chip>
              </div>
              <div v-else-if="props.item.etl_data_result === 'Error'">
                <v-chip class="ma-2" color="red" text-color="white">
                  <!-- <v-icon left>error</v-icon> -->
                  {{ props.item.etl_data_result }}
                </v-chip>
              </div>
              <div v-else>
                {{ props.item.etl_data_result }}
              </div>
            </td>
            <td class="text-xs-center">{{ props.item.etl_data_workflow }}</td>
            <td>{{ props.item.etl_data_action }}</td>
            <td class="text-xs-center">{{props.item.etl_data_date}}</td>
            <td>{{ props.item.frequency }}</td>
            <td>{{ props.item.source_type }}</td>
          </template>
          <template v-slot:no-results>
            <v-alert :value="true" color="error" icon="warning">
              {{ $t('searchfor') }} "{{ search }}" {{ $t('foundno') }}
            </v-alert>
          </template>

        </v-data-table>
      </v-flex>
    </v-container>
  </v-card>
</template>

<script>
  import { Encode, Decode } from '@/services'
  export default {
    components: {
    },
    data() {
      return {
        search: '',
        menu1: false,
        menu2: false,
        date_now: new Date().toISOString().substr(0, 10),
        date: new Date().toISOString().substr(0, 10),
        date2: new Date().toISOString().substr(0, 10),
        checkbox: false,
        radio_status: 1,
        radio_datatype: 1,
        headers: [
          {
            text: 'ETL Date',
            align: 'center',
            value: 'etl_data_date',
            sortable: false
          },
          { text: 'Source Name', value: 'data_source_table', align: 'center' },
          { text: 'Workflow', value: 'etl_data_workflow', align: 'center' },
          { text: 'Status', value: 'etl_data_resul', align: 'center', sortable: false },
          { text: 'Action', value: 'etl_data_action', align: 'center' },
          { text: 'Report Name', value: 'report_id', align: 'center' },
          { text: 'Frequnecy', value: 'etl_data_date', align: 'center', sortable: false },
          { text: 'Type', value: 'etl_data_date', align: 'center', sortable: false },
        ],
        headers_report: [
          { text: 'Report Name', value: 'report_id', align: 'center' },
          { text: 'Source Name', value: 'data_source_table', align: 'center' },
          { text: 'Status', value: 'etl_data_resul', align: 'center', sortable: false },
          { text: 'Workflow', value: 'etl_data_workflow', align: 'center' },
          { text: 'Action', value: 'etl_data_action', align: 'center' },
          { text: 'ETL Date', value: 'etl_data_date', align: 'center', sortable: false },
          { text: 'Frequnecy', value: 'etl_data_date', align: 'center', sortable: false },
          { text: 'Type', value: 'etl_data_date', align: 'center', sortable: false },
        ],
        loading: true,
        rowDataItem: [],
        rowDataItem_report: [],
        rowdata: [],
        data: [],
        radio_Source: 1
      }
    },
    watch: {

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
    mounted() {
      this.checkuser()
      this.getDataWorkbench_Source()
    },
    methods: {
      checkuser() {
        if (this.userData === "") {
          this.$router.push('/')
          this.reloadPage()
        }
      },
      reloadPage() {
        window.location.reload();
      },
      getDataWorkbench_Source() {
        var user = Encode.encode(JSON.stringify(this.userData));

        this.loading = true
        if (this.checkbox === true) {
          this.axios
            .post(process.env.VUE_APP_API_BACKEND + "/allWorkbenchData ", {
              "source_type" : this.radio_Source,
              "status": this.radio_status,
              "data_type": this.radio_datatype,
              "checkbox": this.checkbox,
              "date_1": this.date,
              "date_2": this.date2,
              "user": user
            })
            .then(response => {
              // console.log(response);
              if (response.data.status === "SUCCESS") {
                this.rowDataItem = response.data.data;
                // console.log(this.rowDataItem.report_id)
                this.loading = false
              }
            });
        } else {
          this.axios
            .post(process.env.VUE_APP_API_BACKEND + "/allWorkbenchData ", {
              "source_type" : this.radio_Source,
              "status": this.radio_status,
              "data_type": this.radio_datatype,
              "checkbox": this.checkbox,
              "date_1": this.date_now,
              "date_2": this.date_now,
              "user": user
            })
            .then(response => {
              // console.log(response);
              if (response.data.status === "SUCCESS") {
                this.rowDataItem = response.data.data;
                // console.log(this.rowDataItem)
                this.loading = false
              }
            })
        }
      },
      formatDate(datetime) {
        var date = new Date(datetime)
        var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
        var month = (date.getMonth()) + 1 < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)
        var year = date.getFullYear()
        var hours = date.getHours();
        var minutes = date.getMinutes();
        minutes = minutes < 10 ? '0' + minutes : minutes;
        var strTime = hours + ':' + minutes + ' ';
        return day + '-' + month + '-' + year;
      },

    }
  }
</script>

<style lang="css" scoped>
  .mgt-10 {
    margin-top: -10px !important;
  }

  .tableWorkbench tr>th {
    padding: 0 20px !important;
  }

  .contentPortal {
    margin-top: 20px;
  }

  .center-workbench {
    display: block;
    margin: auto;
  }

  .color-title {
    font-size: 12px;
    background-color: a6bac5;
    color: #fff;
  }

  .word-break-text {
    word-break: break-word;
  }

  @media (max-width : 1024px) {
    .contentPortal {
      margin-top: 0px;
      padding-top: 55px;
      height: 100%;
    }

    footer.v-footer.theme--light {
      height: auto !important;
      display: none !important;
    }
  }

  @media (max-width: 1194px) {
    .contentPortal {
      margin-top: 0px;
      padding-top: 55px;
      height: 100%;
    }

    .footerbar {
      display: none;
    }

    >>>footer.v-footer.theme--light {
      display: none !important;
    }
  }
</style>
