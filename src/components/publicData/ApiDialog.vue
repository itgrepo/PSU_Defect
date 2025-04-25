<!-- CustomDialog.vue -->
<template>
    <v-overlay :value="dialog">
      <v-card v-if="dialog">
        <v-toolbar color="primary" dark>
          <v-toolbar-title>Custom Dialog</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon @click="closeDialog">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-text>
          <!-- Display specific information based on exportExcelID -->
          {{ exportExcelID }}
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" @click="closeDialog">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-overlay>
  </template>
  
  <script>
  export default {
    props: {
      showDialog: Boolean,
      exportExcelID: String
    },
    data() {
      return {
        dialog: false
      };
    },
    watch: {
      showDialog(newValue) {
        this.dialog = newValue;
      }
    },
    methods: {
      closeDialog() {
        this.dialog = false;
        this.$emit('update:showDialog', false);
      }
    }
  };
  </script>
  