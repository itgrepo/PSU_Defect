<template lang="html">
  <v-dialog v-model="dialogMetadata" scrollable max-width="70%">
    <v-card>
      <v-card-title class="headline blueIntel white--text">Search Result</v-card-title>
      <v-spacer class="hidden-sm-and-down"></v-spacer>
      <v-divider></v-divider>
      <v-container class="bg-dialog">
        <v-layout class="mgt-20">
          <v-flex xs10 sm11 md4 offset-md8>
            <v-text-field
            class="hidden-sm-and-down searchBtn"
            color="green"
            :label="$t('search')" 
            v-model="searchData"
            append-icon="search"
            :append-icon-cb="() => getData()"
            @keyup.enter="getData()">
          </v-text-field>
          <v-text-field class="hidden-md-and-up"
          :label="$t('search')" 
          v-model="searchData">
        </v-text-field>
      </v-flex>
      <v-flex xs2 sm1 md5 class="hidden-md-and-up">
        <v-btn fab dark small outline color="primary" @click="dialog = true, getData()">
          <v-icon>search</v-icon>
        </v-btn>
      </v-flex>
    </v-layout>
    <v-card-text>
      <v-data-table
      v-bind:headers="headersDialog"
      v-bind:items="itemsDialog"
      v-bind:search="searchData"
      v-bind:pagination.sync="pagination">
      <template slot="items" slot-scope="props">
        <td class="text-xs-center">{{ props.item.id }}</td>
        <td class="text-xs-center">{{ props.item.source_id }}</td>
        <td class="text-xs-center">{{ props.item.file_name }}</td>
        <td class="text-xs-center">{{ props.item.export_excel_name }}</td>
        <td class="text-xs-center">{{ props.item.name }}</td>
        <td class="text-xs-center">{{ props.item.sub_category_name }}</td>
        <td class="text-xs-center">{{ props.item.status }}</td>
        <td class="text-xs-center">{{ formatDate(props.item.create_at) }}</td>
        <td class="text-xs-center">
          <v-btn outline small color="indigo" @click="selectRow(props.item)">Edit</v-btn>
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
  data () {
    return {
      dialogMetadata: false,
      searchData: '',
      pagination: {},
      headersDialog: [
        { text: 'Number', sortable: true, align: 'center', value: 'id' },
        { text: 'Dataset ID', sortable: true, align: 'center', value: 'source_id' },
        { text: 'File Name', sortable: true, align: 'center', value: 'file_name' },
        { text: 'Report Name', sortable: true, align: 'center', value: 'export_excel_name' },
        { text: 'Category', sortable: true, align: 'center', value: 'name' },
        { text: 'Sub Category', sortable: true, align: 'center', value: 'sub_category_name' },
        { text: 'Status', sortable: true, align: 'center', value: 'status' },
        { text: 'Date Created', sortable: true, align: 'center', value: 'dateCreate' },
        { text: 'Select', sortable: true, align: 'center', value: 'select' }
      ],
      itemsDialog: [],
    }
  },
  methods: {
    open () {
      this.dialogMetadata = true
      this.getData()
    },
    selectRow (row) {
      this.$emit('selectSource', row)
      this.dialogMetadata = false
    },
    getData () {
      this.axios.post(process.env.VUE_APP_API_BACKEND + '/getDataExportExcel',).then((response) => {
        this.itemsDialog = response.data
        // //console.log(this.itemsDialog)
      })
    },
    formatDate (datetime) {
      var date = new Date(datetime)
      var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
      var month = (date.getMonth()) + 1 < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)
      var year = date.getFullYear()
      var hours = date.getHours();
      var minutes = date.getMinutes();
          minutes = minutes < 10 ? '0'+minutes : minutes;
      var strTime = hours + ':' + minutes + ' ';
      return day + '-' + month + '-' + year + " " + strTime;
      }
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
