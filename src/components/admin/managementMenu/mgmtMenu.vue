<template lang="html">
  <div>
    <v-card>
      <v-container>
        <v-data-table
        v-bind:headers="header"
        v-bind:items="menuFuncton"
        :rows-per-page-items="[10, 25, 50, {text:'All', value: -1}]"
        :rows-per-page-text="$t('rowsPerPageLabel')"
        >
        <template slot="items" slot-scope="props">
          <td class="text-xs-center">{{ props.item.key }}</td>
          <td class="text-xs-center" v-for="itemValue in props.item.values">
            <v-edit-dialog
            :return-value.sync="itemValue.value"
            large
            persistent
            @save="save(itemValue)"
            >
            <v-btn v-if="itemValue.value === 'Yes'" icon><v-icon color="success">done</v-icon></v-btn>
            <v-btn v-else icon><v-icon  color="error">remove</v-icon></v-btn>
            <template v-slot:input>
              <div class="mt-4 title">Update Iron</div>
            </template>
            <template v-slot:input>
              <v-select :items="statusItem" item-text="text" v-model="itemValue.value"></v-select>
            </template>
          </v-edit-dialog>
        </td>
      </template>
    </v-data-table>
  </v-container>
</v-card>
</div>
</template>

<script>
export default {
  data () {
    return {
      header: [],
      menuFuncton: [],
      menu: [],
      statusItem: [
        { 'text': 'Yes' },
        { 'text': 'No' }
      ]
    }
  },
  created () {
    this.getMenu()
  },
  mounted () {
    this.getMenu()
    this.getPermission()
  },
  methods: {
    save (data) {
      // //console.log(data)
      this.axios.post(process.env.VUE_APP_API_BACKEND + '/mgmt/savePermission', {'data': data}).then(response=>{
        if (response.data === 'success') {
          this.getMenu()
        }
      })
    },
    getMenu () {
      this.axios.post(process.env.VUE_APP_API_BACKEND + '/mgmt/getMenu', ).then(response=>{
        // console.log(response);
        this.menu = response.data.data
        this.setData()
      })
    },
    getPermission () {
      this.axios.post(process.env.VUE_APP_API_BACKEND + '/mgmt/getPermission', ).then(response=>{
        this.header = response.data.result
      })
    },
    setData () {
      this.menuFuncton = d3.nest()
      .key(d => d.menu_name)
      .entries(this.menu)
      // //console.log(this.menuFuncton)
    }
  }
}
</script>

<style lang="css">
</style>
