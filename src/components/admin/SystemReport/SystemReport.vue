<template>
  <v-container class="contentPortal">
    <!-- <v-tabs
      v-model="activeMetaTab"
      :scrollable="false"
      color="#59AFC6"
      dark
      grow
    >
      <v-tab dark grow class="subheading" href="#tab-1">
        <h3>System Report</h3>
      </v-tab>
      <v-tab-item value="tab-1" lazy> -->
      <v-card-title class="color-title">
        <h1 class="text-uppercase">System Report</h1>
      </v-card-title>
        <v-card flat>
        <v-layout row wrap style="padding: 30px;">
          <v-flex md5>
            <v-select
              outline
              :items="menusystem"
              item-value="id"
              v-model="selectedItem"
              item-text="name"
              label="System Report"
              required
            >
            </v-select>
          </v-flex>
          <!-- <v-divider class="mx-3 setLine" vertical></v-divider> -->
          <!-- <v-flex md1>
            <h4 style="padding-top: 10px;padding: 5px">DATE RANGE :</h4>
          </v-flex> -->
          <!-- <v-flex md1>
            <v-switch
              v-model="switch2"
              color="red darken-3"
              class="switch-input"
            ></v-switch>
          </v-flex> -->
          <!-- <v-flex md8>
            <v-layout row> -->
          <v-flex md3 style="padding: 10px;">
            <v-menu
              ref="menu1"
              v-model="menu1"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
              full-width
              max-width="290px"
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="date"
                  label="START"
                  persistent-hint
                  prepend-icon="event"
                  v-on="on"
                  hint="YYYY-MM-DD format"
                  style="padding-top: 0;"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="date"
                :max="date_now"
                @input="menu1 = false"
                @change=""
              ></v-date-picker>
            </v-menu>
          </v-flex>
          <v-flex md3 style="padding: 10px;">
            <v-menu
              ref="menu2"
              v-model="menu2"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
              full-width
              max-width="290px"
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="date2"
                  label="END"
                  persistent-hint
                  prepend-icon="event"
                  v-on="on"
                  hint="YYYY-MM-DD format"
                  style="padding-top: 0;"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="date2"
                :max="date_now"
                :min="date"
                @input="menu2 = false"
                @change=""
              ></v-date-picker>
            </v-menu>
          </v-flex>
          <v-flex md1
            ><v-btn @click="systemReport()" outline color="success"
              >LOAD</v-btn
            ></v-flex
          >
        </v-layout>
        <!-- </v-flex>
        </v-layout> -->

        <v-flex
          style="margin-top: 10px;"
          v-if="selectedItem == '41UserProfileAndWebusage'"
        >
          <download-csv :data="items" name="UserProfileAndWebusage.csv">
            <v-btn outline color="success"
              ><v-icon left>cloud_download</v-icon>Download CSV</v-btn
            >
          </download-csv>
          <v-data-table
            v-model="selected"
            :headers="headers"
            :items="item"
            :search="search"
            item-key="name"
            class="elevation-1"
            :rows-per-page-items="[10, 25, 50, { text: 'All', value: -1 }]"
            :rows-per-page-text="$t('rowsPerPageLabel')"
          >
            <template v-slot:items="props">
              <td class="text-xs-center">{{ props.item.username }}</td>
              <td class="text-xs-center">{{ props.item.firstname }}</td>
              <td class="text-xs-center">{{ props.item.lastname }}</td>
              <td class="text-xs-center">{{ props.item.usage_objective }} ({{props.item.other_object}})</td>
              <td class="text-xs-center">{{ props.item.Status_name }}</td>
              <td class="text-xs-center">{{ props.item.email }}</td>
              <td class="text-xs-center">{{ props.item.VerifyEmail }}</td>
              <td class="text-xs-center">{{ props.item.FisrtLogin }}</td>
              <td class="text-xs-center">{{ props.item.LastLogin }}</td>
              <td class="text-xs-center">{{ props.item.downloadReport }}</td>
              <td class="text-xs-center">{{ props.item.numberOfdownload }}</td>
            </template>
            <template v-slot:no-data>
              <v-alert :value="true" color="error" icon="warning"
                >Sorry, nothing to display here :(</v-alert
              >
            </template>
            <template v-slot:no-results>
              <v-alert :value="true" color="error" icon="warning"
                >{{ $t('searchfor') }} "{{ search }}" {{ $t('foundno') }}</v-alert
              >
            </template>
          </v-data-table>
        </v-flex>

        <v-flex
          style="margin-top: 10px;"
          v-else-if="selectedItem == '42DailyWebsiteUsageByUserAndReport'"
        >
          <download-csv
            :data="items"
            name="DailyWebsiteUsageByUserAndReport.csv"
          >
            <v-btn outline color="success"
              ><v-icon left>cloud_download</v-icon>Download CSV</v-btn
            >
          </download-csv>
          <v-data-table
            v-model="selected"
            :headers="headDailyWebsite"
            :items="item1"
            :search="search"
            item-key="name"
            class="elevation-1"
            :rows-per-page-items="[10, 25, 50, { text: 'All', value: -1 }]"
            :rows-per-page-text="$t('rowsPerPageLabel')"
          >
            <template v-slot:items="props">
              <td class="text-xs-center">{{ props.item.username }}</td>
              <td class="text-xs-center">{{ props.item.filename }}</td>
              <td class="text-xs-center">{{ props.item.last_update }}</td>
              <td class="text-xs-center">{{ props.item.download }}</td>
            </template>
            <template v-slot:no-data>
              <v-alert :value="true" color="error" icon="warning"
                >Sorry, nothing to display here :(</v-alert
              >
            </template>
            <template v-slot:no-results>
              <v-alert :value="true" color="error" icon="warning"
                >{{ $t('searchfor') }} "{{ search }}" {{ $t('foundno') }}</v-alert
              >
            </template>
          </v-data-table>
        </v-flex>
        <v-flex
          style="margin-top: 10px;"
          v-else-if="selectedItem == '43ConsentAgreementDateByUser'"
        >
          <download-csv :data="items" name="ConsentAgreementDateByUser.csv">
            <v-btn outline color="success"
              ><v-icon left>cloud_download</v-icon>Download CSV</v-btn
            >
          </download-csv>
          <v-data-table
            v-model="selected2"
            :headers="headConsentAgreement"
            :items="item2"
            :search="search"
            item-key="name"
            class="elevation-1"
            :rows-per-page-items="[10, 25, 50, { text: 'All', value: -1 }]"
            :rows-per-page-text="$t('rowsPerPageLabel')"
          >
            <template v-slot:items="props">
              <td class="text-xs-center">{{ props.item.username }}</td>
              <td class="text-xs-center">{{ props.item.Consent_Version }}</td>
              <td class="text-xs-center">{{ props.item.Acceptance_Date }}</td>
            </template>
            <template v-slot:no-data>
              <v-alert :value="true" color="error" icon="warning"
                >Sorry, nothing to display here :(</v-alert
              >
            </template>
            <template v-slot:no-results>
              <v-alert :value="true" color="error" icon="warning"
                >{{ $t('searchfor') }} "{{ search }}" {{ $t('foundno') }}</v-alert
              >
            </template>
          </v-data-table>
        </v-flex>
        </v-card>
      </v-tab-item>
    </v-tabs>
  </v-container>
</template>
<script>
export default {
  data () {
    return {
      items: [],
      switch2: false,
      selectedItem: [],
      menusystem: [
        {
          name: '4.1) User profile and website usage',
          id: '41UserProfileAndWebusage'
        },
        {
          name: '4.2) Daily website usage by user and report',
          id: '42DailyWebsiteUsageByUserAndReport'
        },
        {
          name: "4.4) Consent agreement date by user",
          id: "43ConsentAgreementDateByUser"
        }
      ],
      date_now: new Date().toISOString().substr(0, 10),
      date: new Date().toISOString().substr(0, 10),
      date2: new Date().toISOString().substr(0, 10),
      menu1: false,
      menu2: false,
      item: [],
      // datauser:[],
      itemUsers: [],
      headers: [
        {
          text: "Username",
          align: "center",
          value: "username",
          sortable: false
        },
        {
          text: "First name",
          align: "center",
          value: "firstname",
          sortable: false
        },
        {
          text: "Last name",
          align: "center",
          value: "lastname",
          sortable: false
        },
        {
          text: "Usage objective",
          value: "other_object",
          align: "center",
          sortable: false
        },
        {
          sortable: false,
          text: "Last Status",
          align: "center",
          value: "File_name"
        },
        {
          sortable: false,
          text: "Email",
          align: "center",
          value: "email"
        },
        {
          sortable: false,
          text: "Verify email",
          align: "center",
          value: "VerifyEmail"
        },
        {
          sortable: false,
          text: "First login",
          align: "center",
          value: "FisrtLogin"
        },
        {
          sortable: false,
          text: "Last login",
          align: "center",
          value: "LastLogin"
        },
        {
          sortable: false,
          text: "Number of downloaded reports",
          align: "center",
          value: "downloadReport"
        },
        {
          sortable: false,
          text: "Number of downloads",
          align: "center",
          value: "numberOfdownload"
        }
      ],
      headDailyWebsite: [
        {
          text: "Username",
          align: "center",
          value: "start",
          sortable: false
        },
        {
          text: "Report",
          align: "center",
          value: "filename",
          sortable: false
        },
        {
          text: "Downloaded date",
          align: "center",
          value: "last_update",
          sortable: false
        },
        {
          sortable: false,
          text: "Number of downloads",
          align: "center",
          value: "download"
        }
      ],
      headConsentAgreement: [
        {
          text: "Username",
          align: "center",
          value: "start",
          sortable: false
        },
        {
          text: "Consent version",
          align: "center",
          value: "Consent_Version",
          sortable: false
        },
        {
          text: "Acceptance date",
          align: "center",
          value: "Acceptance_Date",
          sortable: false
        }
      ]
    };
  },
  mounted() {},
  methods: {
    systemReport () {
      var dateTime = this.date;
      var dateTime2 = this.date2;
      let datauser = [];
      //  let items =[];
      if (this.selectedItem =="41UserProfileAndWebusage") {
        this.axios
          .post(process.env.VUE_APP_API_BACKEND + "/systemReport", {
            table: "41UserProfileAndWebusage",
            date_column: "LastLogin",
            start: dateTime,
            end: dateTime2
          })
          .then(response => {
            this.item = response.data;
            // //console.log(this.item);
            if (this.item ==='no file') {
                 this.$swal('No Data', '', 'warning').then(Response =>(
                   this.reloadPage()
                 ))
            }
            let json = this.item;
            let count = 0;

            json.forEach(element => {
              var jsonData = {};

              jsonData["Username"] = element.username;
              jsonData["First name"] = element.firstname;
              jsonData["Last name"] = element.lastname;
              jsonData["Usage objective"] = element.usage_objective + '('+ element.other_object + ')';
              jsonData["Last Status"] = element.Status_name;
              jsonData["Email"] = element.email;
              jsonData["Verify email"] = element.VerifyEmail;
              jsonData["First login"] = element.FisrtLogin;
              jsonData["Last login"] = element.LastLogin;
              jsonData["Number of downloaded reports"] = element.downloadReport;
              jsonData["Number of downloads"] = element.numberOfdownload;

              datauser.push(jsonData);
            });
            // //console.log(datauser);
            this.items = datauser;
            });
      } else if (this.selectedItem == "42DailyWebsiteUsageByUserAndReport") {
        this.axios
          .post(process.env.VUE_APP_API_BACKEND + "/systemReport", {
            table: "42DailyWebsiteUsageByUserAndReport",
            date_column: "last_update",
            start: dateTime,
            end: dateTime2
          })
          .then(response => {
            this.item1 = response.data;
            // //console.log(response.data);
            if (this.item1 ==='no file') {
                 this.$swal('No Data', '', 'warning').then(Response =>(
                   this.reloadPage()
                 ))
            }
            let json = this.item1;
            let count = 0;
            json.forEach(element => {
              var jsonData = {};

              jsonData["Username"] = element.username;
              jsonData["Report"] = element.filename;
              jsonData["Downloaded date"] = element.last_update;
              jsonData["Number of downloads"] = element.download;

              datauser.push(jsonData);
            });
            // //console.log(datauser);
            this.items = datauser;
            // //console.log( this.item);
          });
      } else if (this.selectedItem == "43ConsentAgreementDateByUser") {
        this.axios
          .post(process.env.VUE_APP_API_BACKEND + "/systemReport", {
            table: "43ConsentAgreementDateByUser",
            date_column: "Acceptance_Date",
            start: dateTime,
            end: dateTime2
          })
          .then(response => {
            this.item2 = response.data;
            // //console.log(response.data);
            if (this.item2 ==='no file') {
                 this.$swal('No Data', '', 'warning').then(Response =>(
                   this.reloadPage()
                 ))
            }
            let json = this.item2;
            let count = 0;
            json.forEach(element => {
              var jsonData = {};

              jsonData["Username"] = element.username;
              jsonData["Consent version"] = element.Consent_Version;
              jsonData["Acceptance date"] = element.Acceptance_Date;

              datauser.push(jsonData);
            });
            // //console.log(datauser);
            this.items = datauser;
            //  this.$swal("user", '', 'success')
            // //console.log( this.item);
          });
      }
    },

    formatDate(datetime) {
      var date = datetime.split('/')
      // var dates = datetime.split(',')
      if (date.length > 2) {
        var day = date[1]
        var month = date[0]
        var year = date[2]
        return day + '/' + month + '/' + year
      } else {
         var date = datetime.split(',')
         return date[0]
      }
    },
    reloadPage () {
    window.location.reload()
  },
  }
};
</script>

<style scoped>
.color-title {
  font-size: 12px;
  background-color: a6bac5;
  color: #fff;
}
.contentPortal {
    margin-top: 20px;
}
/* Table */
>>> th.column.text-xs-center {
  font-size: 15px;
  font-weight: bold;
}
td.text-xs-center {
    border: 1px solid #e0e0e0 !important;
}
>>> tr:nth-child(even){
  background-color: #f3f3f3;
}
/*scrollbar  */
>>>::-webkit-scrollbar {
  width: 8px !important;
  height: 8px !important;
}
>>>::-webkit-scrollbar-track {
    background: #d8d8d8 !important;
    border-radius: 2px !important;
}
>>>::-webkit-scrollbar-thumb {
    background: #aaa !important;
    border-radius: 6px !important;
}
>>>::-webkit-scrollbar-corner {
    background: #d8d8d8 !important;
}
</style>
