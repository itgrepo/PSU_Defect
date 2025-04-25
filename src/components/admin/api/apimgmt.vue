<template lang="html">
  <div>
    <v-container class="pt-5">
      <v-tabs
        v-model="activeMetaTab"
        :scrollable="false"
        color="blue lighten-4"
        dark
        slider-color="blue darken-4"
        grow
      >
        <v-tab dark grow class="subheading" href="#tab-1">
          <h3>{{ $t("apigeneral") }}</h3>
        </v-tab>
        <v-tab dark grow class="subheading" href="#tab-2">
          <h3>{{ $t("apiscope") }}</h3>
        </v-tab>
        <v-tab-item value="tab-1" lazy>
          <v-card-text>
            <v-text-field
              class="hidden-sm-and-down searchBtn pa-3"
              color="green"
              :label="$t('search')"
              v-model="searchData"
              append-icon="search"
              :append-icon-cb="() => getData()"
            >
            </v-text-field>
            <v-data-table
              v-bind:headers="localizedHeadersDialog"
              v-bind:items="itemsDialog"
              v-bind:search="searchData"
              v-bind:pagination.sync="pagination"
            >
              <template slot="items" slot-scope="props">
                <td class="text-xs-center">{{ props.item.api_name }}</td>
                <td class="text-xs-center">{{ props.item.api_endpoint }}</td>
                <td class="text-xs-center">{{ props.item.api_desc }}</td>
                <td class="text-xs-center">{{ props.item.status }}</td>
                <td class="text-xs-center">
                  <v-btn
                    outline
                    small
                    color="light-blue darken-1"
                    @click="openUserInAPI(props.item)"
                  >
                    <v-icon left>person_add_alt_1</v-icon>{{ $t("byuser") }}
                  </v-btn>
                </td>
              </template>
            </v-data-table>
          </v-card-text>
        </v-tab-item>
        <v-tab-item value="tab-2" lazy>
          <v-text-field
            class="hidden-sm-and-down searchBtn pa-3"
            color="green"
            :label="$t('search')"
            v-model="search"
            append-icon="search"
            :append-icon-cb="() => getDataScope()"
          >
          </v-text-field>
          <v-data-table
            v-bind:headers="localizedHeaders"
            v-bind:items="itemsDialogscope"
            v-bind:search="search"
            :rows-per-page-items="[10, 25, 50, { text: 'All', value: -1 }]"
            :rows-per-page-text="$t('rowsPerPageLabel')"
          >
            <template slot="items" slot-scope="props">
              <td class="text-xs-center">{{ props.item.api_name }}</td>
              <td class="text-xs-center">{{ props.item.api_endpoint }}</td>
              <td class="text-xs-center">{{ props.item.api_desc }}</td>
              <td class="text-xs-center">{{ props.item.status }}</td>
              <td class="text-xs-center">
                <v-btn
                  outline
                  small
                  color="light-blue darken-1"
                  @click="openDialogAddByScope(props.item)"
                >
                  <v-icon left>person_add_alt_1</v-icon>{{ $t("scope") }}
                </v-btn>
              </td>
            </template>
          </v-data-table>
        </v-tab-item>
      </v-tabs>
      <DialogAddUserInAPI ref="DialogAddUserInAPI" />
      <DialogAddByScope ref="DialogAddByScope"></DialogAddByScope>

    </v-container>
  </div>
</template>

<script>
 import DialogAddUserInAPI from './DialogAddUserInAPI'
 import DialogAddByScope from './DialogAddByScope'
 import { Encode, Decode } from "@/services";
import { data } from 'jquery';

export default {
  components: {DialogAddUserInAPI, DialogAddByScope},
  data() {
    return {
      search: "",
      dialogMetadata: false,
      searchData: "",
      pagination: {},

      itemsDialog: [
    //     {
    //     api_endpoint: "api_endpoint13",
    //     api_name: "example_name",
    //     api_type: "general",
    //     api_desc: "-",
    //     endpoints_id: 13,
    //     org_id: 1,
    //     scope: "read_write",
    //     status: "active"
    // },
      ],
      itemsDialogscope: [
    //     {
    //     api_endpoint: "api_endpoint12",
    //     api_name: "example_name",
    //     api_type: "scopes",
    //     api_desc: "-",
    //     endpoints_id: 16,
    //     org_id: 1,
    //     scope: "read_write",
    //     status: "active"
    // },
      ],
      // headers: [
      //     {
      //         text: 'Group Report Name',
      //         // align: 'center',
      //         value:'group_report_name',
      //         sortable: false
      //     },
      //     {
      //         text: 'Create Date',
      //         align: 'center',
      //         sortable: false
      //     },
      //     {
      //         text: '',
      //         align: 'center',
      //         sortable: false
      //     }
      // ],
      groupReports: [
        { name: "test", des: "1", status: "All Dataset" },
        // { "create_at": "06/02/2021, 16:22:28", "group_report_id": "1", "group_report_name": "Admin" },
      ],
      groupUser: [],
    };
  },
  computed: {
    userData() {
      if (this.$cookies.isKey("information")) {
        return JSON.parse(Decode.decode(this.$cookies.get("information")));
      } else {
        return "";
      }
    },
    localizedHeadersDialog() {
      return [
        // { text: this.$t('number'), sortable: true, align: 'center', value: 'id' },
        {
          text: this.$t("apiservicename"),
          sortable: false,
          align: "center",
          value: "api_name",
        },
        {
          text: this.$t("apiendpoint"),
          sortable: false,
          align: "center",
          value: "api_endpoint",
        },
        {
          text: this.$t("apides"),
          sortable: false,
          align: "center",
          value: "api_desc",
        },
        {
          text: this.$t("status"),
          sortable: false,
          align: "center",
          value: "status",
        },

        {
          text: this.$t("select"),
          sortable: false,
          align: "center",
          value: "select",
        },
      ];
    },
    localizedHeaders() {
      return [
        {
          text: this.$t("apiservicename"),
          sortable: false,
          align: "center",
          value: "source_id",
        },
        {
          text: this.$t("apiendpoint"),
          sortable: false,
          align: "center",
          value: "api_endpoint",
        },

        {
          text: this.$t("apides"),
          sortable: false,
          align: "center",
          value: "export_excel_name",
        },
        {
          text: this.$t("status"),
          sortable: false,
          align: "center",
          value: "status",
        },

        {
          text: this.$t("select"),
          sortable: false,
          align: "center",
          value: "select",
        },
      ];
    },
  },
  mounted() {
    this.getData();
    this.getDataScope();
  },
  methods: {
    openUserInAPI(data) {
      this.$refs.DialogAddUserInAPI.open(data);
    },
    open(data) {
      this.$refs.DialogAddGroupInReports.open(data);
      // this.getData()
    },
    getData() {
      console.log("start api general");

      var user = Encode.encode(JSON.stringify(this.userData));
      this.axios
        .post(process.env.VUE_APP_API_BACKEND2 + "/showAPIGeneral", {
          user: user,
        })

        .then((response) => {
          console.log("response general", response,data);

          this.itemsDialog = response.data;
          console.log(this.itemsDialog)
        });
    },
    formatDate(datetime) {
      var date = new Date(datetime);
      var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
      var month =
        date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1;
      var year = date.getFullYear();
      var hours = date.getHours();
      var minutes = date.getMinutes();
      minutes = minutes < 10 ? "0" + minutes : minutes;
      var strTime = hours + ":" + minutes + " ";
      return day + "-" + month + "-" + year + " " + strTime;
    },
    getDataScope() {
      console.log("start show api scop");

      var user = Encode.encode(JSON.stringify(this.userData));
      this.axios
        .post(process.env.VUE_APP_API_BACKEND2 + "/showAPIScopes", {
          user: user,
        })
        .then((response) => {
          console.log("scopes",response.data);
          this.itemsDialogscope = response.data;
          this.loading = false;
        });
    },
    openDialogAddByScope(data) {
      this.$refs.DialogAddByScope.open(data);
    },
  },
};
</script>

<style lang="css" scoped="">
.blueIntel {
  background-color: #1da6df !important;
}

.bg-dialog {
  background-color: #ffffff;
}

.center-workbench {
  display: block;
  margin: auto;
}

>>> a.v-tabs__item.v-tabs__item--active {
  background: #42a5f5 !important;
}
</style>
