<template lang="html">
  <v-dialog v-model="dialogDatareport" scrollable max-width="70%">
    <v-card>
      <v-card-title class="headline blueIntel white--text">Report</v-card-title>
      <v-spacer class="hidden-sm-and-down"></v-spacer>
      <v-divider></v-divider>
      <v-container class="bg-dialog">
        <v-layout class="mgt-20">
          <v-flex xs10 sm11 md4 offset-md8>
            <v-text-field class="hidden-sm-and-down searchBtn" color="green" :label="$t('search')"  v-model="searchData"
              append-icon="search" :append-icon-cb="() => getDatareport()" @keyup.enter="getDatareport()">
            </v-text-field>
            <v-text-field class="hidden-md-and-up" :label="$t('search')"  v-model="searchData">
            </v-text-field>
          </v-flex>
          <v-flex xs2 sm1 md5 class="hidden-md-and-up">
            <v-btn fab dark small outline color="primary" @click="dialog = true, getDatareport()">
              <v-icon>search</v-icon>
            </v-btn>
          </v-flex>
        </v-layout>

        <v-card-text>
          <!-- <pre>
        {{itemsDialog}}
      </pre> -->
          <v-data-table item-key="Report ID" show-selected v-model="selected" v-bind:headers="headersDialog"
            v-bind:items="itemsDialog" v-bind:search="searchData" v-bind:pagination.sync="pagination">

            <template slot="items" slot-scope="props">

              <td class="text-xs-center">{{ props.item.source_id }}</td>
              <td class="text-xs-center">{{ props.item.export_excel_name }}</td>
              <!-- <v-btn outline small color="indigo" @click="selectRow(props.item)">Select</v-btn> -->
              <!-- <v-checkbox   class="center-x" :value="props.item.source_id"  @change="selectRow(props.item)" ></v-checkbox> -->
              </td>
            </template>
          </v-data-table>
        </v-card-text>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    data() {
      return {
        singleSelect: false,
        selected: [],
        selectedAll: [],
        dialogDatareport: false,
        searchData: '',
        pagination: {},
        headersDialog: [
          { text: 'Dataset ID', sortable: true, align: 'center', value: 'source_id' },
          { text: 'Report Name', sortable: true, align: 'center', value: 'export_excel_name' },
          // { text: 'Select', sortable: true, align: 'center', value: 'select' },
        ],
        itemsDialog: [],
      }
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
      open() {
        this.dialogDatareport = true
        this.getDatareport()
      },
      selectRow(row) {
        this.selected = [];
        this.$emit('selectDataReport', row)
        // this.dialogDatareport = false
      },
      getDatareport() {
        // console.log(this.userData);
        this.axios
          .get(process.env.VUE_APP_API_BACKEND + "/getReportId",)

          .then(response => {
            // console.log(response.data.data)
            this.itemsDialog = response.data;

          });
      },

    }
  }
</script>

<style lang="css" scoped="">
  .blueIntel {
    background-color: #1DA6DF !important;
  }

  .bg-dialog {
    background-color: #ffffff;
  }
</style>