<template>
    <v-app>
      <!-- Your main content -->
      <v-speed-dial
        v-model="fab"
        bottom
        right
        :direction="'top'"
        :transition="'slide-y-reverse'"
      >
        <template v-slot:activator>
          <v-btn
            v-bind="attrs"
            color="primary"
            dark
            fab
            @click="fab = !fab"
          >
            <v-icon>mdi-translate</v-icon>
          </v-btn>
        </template>
  
        <!-- Language Switch Buttons -->
        <v-btn color="red" @click="changeLanguage('th')">
          เปลี่ยนเป็นภาษาไทย
        </v-btn>
        <v-btn color="blue" @click="changeLanguage('en')">
          Switch to English
        </v-btn>
      </v-speed-dial>
    </v-app>
  </template>
  
  <script>
  export default {
    data() {
      return {
        fab: false, // For controlling the Speed Dial state
      };
    },
    methods: {
      changeLanguage(lang) {
        // Function to change the language
        console.log(`Switching to language: ${lang}`);
        // Add your language switching logic here
      },
    },
  };
  </script>
  
  <style>
  /* Add any additional styling if necessary */
  </style>
  