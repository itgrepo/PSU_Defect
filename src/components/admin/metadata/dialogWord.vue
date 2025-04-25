<template lang="html">
  <v-layout>
    <v-dialog max-width="700px" v-model="dialog">
      <v-card>
        <v-container>
          <v-data-table
          v-bind:headers="header"
          v-bind:items="dataWord"
          :rows-per-page-items="[10, 25, 50, {text:'All', value: -1}]"
          :rows-per-page-text="$t('rowsPerPageLabel')"
          >
          <template slot="items" slot-scope="props">
            <td class="text-xs-center">{{ props.item.Report }}</td>
            <td class="text-xs-center">
              <v-edit-dialog
              :return-value.sync="props.item.Word"
              large
              lazy
              persistent
              @save="save"
              @cancel="cancel"
              >
              <div>{{ props.item.Word }}</div>
              <template v-slot:input>
                <v-text-field
                v-model="props.item.Word"
                label="Edit"
                single-line
                autofocus
                ></v-text-field>
              </template>
            </v-edit-dialog>
          </td>
        </template>
      </v-data-table>
      <v-flex offset-xs10><v-btn color="success" @click="saveWord()">save</v-btn></v-flex>
    </v-container>
  </v-card>
</v-dialog>
</v-layout>
</template>

<script>
export default {
  data () {
    return {
      dataWord: [],
      dialog: false,
      header: [
        { text: 'Report', sortable: false, align: 'center', value: 'No' },
        { text: 'Word', sortable: false, align: 'left', value: 'Word' }
      ]
    }
  },
  methods: {
    saveWord () {
      this.$emit('word_file', this.dataWord)
      this.dialog = false
      this.$swal('Confirm word is success', '', 'success')
    },
    open (data, filename) {
      this.dataWord = data
      this.dialog = true
    }
  }
}
</script>

<style lang="css">
</style>
