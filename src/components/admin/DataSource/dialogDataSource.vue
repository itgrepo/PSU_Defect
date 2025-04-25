<template lang="html">
  <v-dialog v-model="dialogDatasource" scrollable max-width="70%">
    <v-card>
      <v-card-title class="headline blueIntel white--text">Data Source</v-card-title>
      <v-spacer class="hidden-sm-and-down"></v-spacer>
      <v-divider></v-divider>
      <v-container class="bg-dialog">
        <v-layout class="mgt-20">
          <v-flex xs10 sm11 md4 offset-md8>
            <v-text-field class="hidden-sm-and-down searchBtn" color="green" :label="$t('search')"  v-model="searchData"
              append-icon="search" :append-icon-cb="() => getDatasource()" @keyup.enter="getDatasource()">
            </v-text-field>
            <v-text-field class="hidden-md-and-up" :label="$t('search')"  v-model="searchData">
            </v-text-field>
          </v-flex>
          <v-flex xs2 sm1 md5 class="hidden-md-and-up">
            <v-btn fab dark small outline color="primary" @click="dialog = true, getDatasource()">
              <v-icon>search</v-icon>
            </v-btn>
          </v-flex>
        </v-layout>
        <v-card-text>
          <v-data-table :headers="headersDialog" :items="itemsDialog" :search="searchData"
            v-bind:pagination.sync="pagination" :loading="loading"
            :rows-per-page-items="[100, 250, 500, { text: 'All', value: -1 }]"
            :rows-per-page-text="$t('rowsPerPageLabel')"
            >
            <template slot="items" slot-scope="props">
              <td class="text-xs-center">{{ props.item.data_source_id }}</td>
              <td>
                <v-btn small outline color="primary" @click="getDatadescription(props.item) ">
                  Sample
                </v-btn>
              </td>

              <td>
                <v-btn outline small color="indigo" @click="selectRow(props.item)">Select</v-btn>
              </td>
              <td class="text-xs-center">{{ props.item.data_source_table }}</td>
              <td class="text-xs-center">{{ props.item.data_source_schema }}</td>
              <td class="text-xs-center">{{ props.item.data_source_name }}</td>
              <td class="text-xs-center">{{ props.item.data_source_workflow }}</td>
              <td class="text-xs-center">{{ props.item.workflow_type}}</td>
              <td class="text-xs-center">{{ props.item.source_id }}</td>
              <td class="text-xs-center">{{ props.item.data_source_status }}</td>
              <td class="text-xs-center">{{ props.item.data_source_create_date}}</td>
              <td class="text-xs-center">{{ props.item.frequency_day }}</td>
              <td class="text-xs-center">{{ props.item.frequency_repeat }}</td>
              <td class="text-xs-center">{{ props.item.frequency_time }}</td>
              <td class="text-xs-center">{{ props.item.frequency_day_of_month }}</td>

            </template>
          </v-data-table>
        </v-card-text>
      </v-container>
    </v-card>

    <v-dialog v-model="dialogDatadescription" max-width="60%">
      <v-card>
        <v-card-title class="headline blueIntel white--text">Data Sample</v-card-title>
        <v-card-text>
          <!-- <pre>{{itemsDialog2}}</pre> -->
          <v-data-table v-model="description" :headers="headersDialog2" :items="itemsDialog2" :loading="loading2">
            <template slot="items" slot-scope="props">
              <td class="text-xs-center">{{ props.item.data_source_column }}</td>
              <td class="text-xs-center">{{ props.item.data_source_column_type }}</td>
              <td class="text-xs-center">


                <v-edit-dialog :return-value.sync="props.item.data_source_column_description" large
                  @save="saveDescription(props.item)" @cancel="cancel">
                  {{ props.item.data_source_column_description }}

                  <template v-slot:input>
                    <v-text-field v-model="props.item.data_source_column_description" label="Edit" single-line autofocus
                      maxLength="255" :counter="255">
                    </v-text-field>
                  </template>
                </v-edit-dialog>


                <!-- <input /> -->
              </td>
              <td class="text-xs-center">{{ props.item.sample1 }}</td>
              <td class="text-xs-center">{{ props.item.sample2 }}</td>
              <!-- <td class="text-xs-center">{{ props.item.sample2 }}</td> -->

            </template>
            <template v-slot:no-data>
              <v-alert :value="true" color="error" icon="warning">
                Sorry, nothing to display here :(
              </v-alert>
            </template>
            <template v-slot:no-results>
              <v-alert :value="true" color="error" icon="warning">{{ $t('searchfor') }} "{{ search }}" {{ $t('foundno') }}
              </v-alert>
            </template>
          </v-data-table>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="primary" outline text @click="dialogDatadescription = false">
            Close
          </v-btn>


        </v-card-actions>
      </v-card>
    </v-dialog>

  </v-dialog>



</template>
<script>
  import { Encode, Decode } from '@/services'

  export default {

    data() {
      return {

        dialogDatadescription: false,
        dialogDatasource: false,
        loading: true,
        loading2: true,
        searchData: '',
        sourceData: {},
        pagination: {},
        headersDialog: [
          { text: 'Data Source ID', sortable: true, align: 'center', value: 'data_source_id' },
          { text: 'Sample', sortable: false, align: 'center', value: 'sample' },
          { text: 'Select', sortable: false, align: 'center', value: 'select' },
          { text: 'Data Source Table', sortable: true, align: 'center', value: 'data_source_table' },
          { text: 'Data Source Schema', sortable: true, align: 'center', value: 'data_source_schema' },
          { text: 'Data Source Name', sortable: true, align: 'center', value: 'data_source_name' },
          { text: 'Data Source Worlflow', sortable: true, align: 'center', value: 'data_source_workflow' },
          { text: 'Type', sortable: true, align: 'center', value: 'workflow_type' },
          { text: 'Dataset ID', sortable: true, align: 'center', value: 'source_id' },
          { text: 'Status', sortable: true, align: 'center', value: 'data_source_status' },
          { text: 'Data_Source_Createdate', sortable: true, align: 'center', value: 'data_source_create_date' },
          { text: 'Freguency Day', sortable: true, align: 'center', value: 'frequency_day' },
          { text: 'Freguency Repeat', sortable: true, align: 'center', value: 'frequency_repeat' },
          { text: 'Freguency Time', sortable: true, align: 'center', value: 'frequency_time' },
          { text: 'Freguency Day on month', sortable: true, align: 'center', value: 'frequency_day_of_month' },

        ],
        itemsDialog: [],

        headersDialog2: [
          { text: 'Column', sortable: true, align: 'center', value: 'data_source_column' },
          { text: 'Type', sortable: true, align: 'center', value: 'data_source_column_type' },
          { text: 'Description', sortable: true, align: 'center', value: 'data_source_column_description' },
          { text: 'Sample1', sortable: true, align: 'center', value: 'sample1' },
          { text: 'Sample2', sortable: true, align: 'center', value: 'sample2' }

        ],
        itemsDialog2: [],
      }

    },
    computed: {

      userData() {
        if (this.$cookies.isKey("information")) {
          return JSON.parse(Decode.decode(this.$cookies.get("information")));
        } else {
          return "No";
        }
      },

    },
    mounted() {

      // this.getDatadescription()

    },
    methods: {
      open() {
        this.getDatasource()
        this.dialogDatasource = true

      },
      selectRow(row) {
        this.$emit('selectDataSource', row)
        this.dialogDatasource = false
      },

      getDatasource() {
        // console.log(5555)

        var user = Encode.encode(JSON.stringify(this.userData));
        this.loading = true
        this.axios

          // .post("http://172.16.112.37:5000" + "/getDatasource", {

          .post(process.env.VUE_APP_API_BACKEND + "/getDatasource", {
            "user": user,
            from_page: "DataSource"
          })
          .then(response => {
            this.itemsDialog = response.data.data;
            this.loading = false
            //  console.log(response.data.data)
            // console.log( sourceData.data_source_table);
          });
      },
      getDatadescription(row) {
        // console.log("row.data_source_table", row.data_source_table);
        //  console.log("row.data_source_schema", row.data_source_schema);
        // this.descriptionData= data;
        // this.$emit('selectdescriptionData', row)
        this.loading2 = true
        this.dialogDatadescription = true
        var user = Encode.encode(JSON.stringify(this.userData));

        this.axios
          // .post("http://172.16.112.37:5000" + "/getDataDescription", {
          .post(process.env.VUE_APP_API_BACKEND + "/getDataDescription", {
            "user": user,
            data_source_table: row.data_source_table,
            data_source_schema: row.data_source_schema
          }).then(response => {
            // console.log(response.data);

            if (response.data.status === "success") {
              // this.dialogDatadescription = true
              // console.log(response.data.metadata);
              this.itemsDialog2 = response.data.metadata;
              this.loading2 = false
            }

          });
      },
      saveDescription(data) {
        //  console.log(this.itemsDialog2);
        // console.log(data);
        var user = Encode.encode(JSON.stringify(this.userData));
        this.axios
          //  .post("http://172.16.112.37:5000"+ "/updateDataDescription", {
          .post(process.env.VUE_APP_API_BACKEND + "/updateDataDescription", {
            'data': data,
            user: user
          })
          .then(response => {
            // console.log(props.item);
            if (response.data.status === "Complete !") {
              this.$swal("Save Success", "", "success").then(response => {
                // this.reloadPage();
                // dialogDatadescription = false
              });
              // } else if (response.data.status === "Data repeatedly") {
              //   this.$swal("Data repeatedly", "", "warning").then(response => {
              //     this.sourceData.data_source_name = "";
              //   });
              // } else {
              //   this.$swal("Information is required", "", "warning");
            }
          });
      },

    },


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
