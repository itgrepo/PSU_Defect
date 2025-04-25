<template>
    <v-dialog
        v-model="dialog"
        hide-overlay
        persistent
        width="300"
      >
        <v-card
        class="text-xs-center"
        style="padding: 20px;"
        >
        <v-card-text style="font-size: 20px;">
         Please stand by
        </v-card-text>
          <v-card-text>
                 <v-progress-circular
                    :size="70"
                    :width="7"
                    color="blue darken-2"
                    indeterminate
                ></v-progress-circular>
                
          </v-card-text>
        </v-card>
      </v-dialog>
</template>
<script>
export default {
    data () {
     return {
        dialog: false
    }
    
  },
watch: {
    dialog (val) {
      if (!val) return
        setTimeout(() => (this.dialog = false), 4000)
    }
  },
methods: {
     open () {
      this.dialog = true
    },
}
}
</script>
