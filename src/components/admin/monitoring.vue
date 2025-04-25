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
        <h3>MONITORING</h3>
      </v-tab>
      <v-tab-item value="tab-1" lazy> -->
      <v-card-title class="color-title">
        <h1 class="text-uppercase">MONITORING</h1>
      </v-card-title>
        <v-layout row wrap style="padding: 15px 10px 10px 10px;">
          <!-- <v-flex md6>
        <v-card-title class="headline">
          <b>MONITORING</b>
          <v-divider class="mx-3 setLine" vertical></v-divider>
        </v-card-title>
      </v-flex> -->
          <v-flex md5>
            <v-layout row>
              <v-flex md3>
                <h4>STATUS :</h4>
              </v-flex>
              <v-flex md9>
                <v-radio-group
                  v-model="radiocomplete"
                  @change="datamonitoring()"
                  row
                  style="margin-top: 0px;"
                >
                  <v-radio label="All" :value="1"></v-radio>
                  <v-radio label="Complete" :value="2"></v-radio>
                  <v-radio label="In Complete" :value="3"></v-radio>
                </v-radio-group>
              </v-flex>
            </v-layout>
          </v-flex>
          <v-divider class="mx-3 setLine" vertical></v-divider>
          <v-layout row>
            <v-flex md2>
              <h4>DATE RANGE :</h4>
            </v-flex>
            <v-checkbox
              v-model="checkbox"
              type="checkbox"
              @change="datamonitoring()"
              style="margin-top: 0px;"
            ></v-checkbox>
            <v-flex v-if="this.checkbox == '1'">
              <!-- <p>TO</p> -->
              <v-layout row>
                <v-flex md5>
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
                      @change="datamonitoring()"
                    ></v-date-picker>
                  </v-menu>
                </v-flex>
                <v-flex md5 style="padding-left: 10px;">
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
                      @change="datamonitoring()"
                    ></v-date-picker>
                  </v-menu>
                </v-flex>
              </v-layout>
            </v-flex>

            <v-layout row v-else>
              <v-flex md5>
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
                      disabled
                      style="padding-top: 0;"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="date"
                    :max="date_now"
                    @input="menu1 = false"
                    @change="datamonitoring()"
                  ></v-date-picker>
                </v-menu>
              </v-flex>
              <v-flex md5 style="padding-left: 10px;">
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
                      disabled
                      style="padding-top: 0;"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="date2"
                    :max="date_now"
                    :min="date"
                    @input="menu2 = false"
                    @change="datamonitoring()"
                  ></v-date-picker>
                </v-menu>
              </v-flex>
            </v-layout>
          </v-layout>
        </v-layout>
        <v-flex style="margin-top: 10px;">
          <v-data-table
            v-model="selected"
            :headers="headers"
            :items="items"
            :search="search"
            item-key="name"
            class="elevation-1"
            :rows-per-page-items="[10, 25, 50, { text: 'All', value: -1 }]"
            :rows-per-page-text="$t('rowsPerPageLabel')"
          >
            <template v-slot:items="props">
              <td class="text-xs-center">{{ formatDate(props.item.start) }}</td>
              <td class="text-xs-center">{{ formatDate(props.item.end) }}</td>
              <td class="text-xs-center">{{ props.item.source_id }}</td>
              <td class="text-xs-center">
                <div v-if="props.item.Action === 'DONE'">
                  <v-chip class="ma-2" color="success" text-color="white">
                    <v-icon left>check_circle</v-icon>
                    <b>{{ props.item.Action }}</b>
                  </v-chip>
                </div>
                <div v-else-if="props.item.Action === 'ERROR'">
                  <v-chip class="ma-2" color="red" text-color="white">
                    <v-icon left>error</v-icon>
                    <b>{{ props.item.Action }}</b>
                  </v-chip>
                </div>
                <div v-else>
                  {{ props.item.Action }}
                </div>
              </td>
              <td class="text-xs-center">{{ props.item.FILE_NAME }}</td>
              <td class="text-xs-center">{{ props.item.Description }}</td>
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
      </v-tab-item>
    </v-tabs>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      date_now: new Date().toISOString().substr(0, 10),
      date: new Date().toISOString().substr(0, 10),
      date2: new Date().toISOString().substr(0, 10),
      menu1: false,
      menu2: false,
      radiocomplete: 3,
      checkbox: false,
      headers: [
        {
          text: "DateTime Start",
          align: "center",
          value: "start",
          sortable: false
        },
        {
          text: "DateTime End",
          align: "center",
          value: "End",
          sortable: false
        },
        {
          text: "Dataset ID",
          align: "center",
          value: "source_id",
          sortable: false
        },
        {
          text: "Status Process",
          value: "Action",
          align: "center",
          sortable: false
        },
        {
          sortable: false,
          text: "Note",
          align: "center",
          value: "File_name"
        },
        {
          sortable: false,
          text: "Action",
          align: "center",
          value: "action"
        }
      ],
      items: []
    };
  },
  mounted() {
    this.datamonitoring();
  },
  methods: {
    datamonitoring() {
      var dateTime = new Date(this.date);
      var dateTime2 = new Date(this.date2);
      //  //console.log(this.date2)
      //  //console.log(this.checkbox)
      //  //console.log(this.date)
      //  //console.log(this.action);

      if (this.checkbox == "1") {
        this.axios
          .post(process.env.VUE_APP_API_BACKEND + "/monitoring", {
            action: this.radiocomplete.toString(),
            date_1: this.date,
            date_2: this.date2,
            checkbox: this.checkbox
            // 'year_1':dateTime.getFullYear(),
            // 'day_2':dateTime2.getDate(),
            // 'month_2':dateTime2.getMonth()+1,
            // 'year_2':dateTime2.getFullYear(),
          })
          .then(response => {
            this.items = response.data.data;
            // //console.log(response);
          });
      } else {
        // //console.log(this.radiocomplete.toString());
        // //console.log(this.checkbox);

        this.axios
          .post(process.env.VUE_APP_API_BACKEND + "/monitoring", {
            action: this.radiocomplete.toString(),
            checkbox: this.checkbox
          })
          .then(response => {
            this.items = response.data.data;
            // //console.log(response.data);
            // //console.log(response.data.data);
          });
      }
    },
    // formatDate (datetime) {
    //   var date = new Date(datetime)
    //   var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
    //   var month = (date.getMonth()) + 1 < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)
    //   var year = date.getFullYear()
    //   var hours = date.getHours();
    //   var minutes = date.getMinutes();
    //   minutes = minutes < 10 ? '0'+minutes : minutes;
    //   var strTime = hours + ':' + minutes + ' ';
    //   return day + '-' + month + '-' + year + " " + strTime;
    // }
    formatDate (datetime) {
      var date1 = datetime.split(" ");
      if (date1.length > 2) {
        var day = date1[1];
        var month = date1[2];
        var year = date1[3];
        var time = date1[4];
        return day + "-" + month + "-" + year + " " + time;
      } else {
        var date1 = datetime.split(",");
        return date1[0];
      }
    }
  }
};
</script>

<style scoped="">
>>> th.column.text-xs-center ,>>>th.column.text-xs-left {
  font-size: 15px;
  font-weight: 600;
}
td {
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
.color-title {
  font-size: 12px;
  background-color: a6bac5;
  color: #fff;
}
.contentPortal {
  margin-top: 20px;
}
.setLine {
  border-left: 2px solid #ff0000;
}
>>> .v-input.v-input--selection-controls.v-input--checkbox.theme--light {
  flex: 0;
}
.chip-width {
  padding: 0px 20px;
}
/* >>>.v-text-field {
  padding-top: 20px;
  margin-top: 4px;
} */
</style>
