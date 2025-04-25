<template>
    <v-container>
      <v-layout align-center justify-center>
        <v-card>
          <v-card-title class="headline">Secured Page</v-card-title>
          <v-card-text>
            <p>Welcome to the secured page.</p>
            <v-btn @click="logout">Logout</v-btn>
          </v-card-text>
        </v-card>
      </v-layout>
    </v-container>
  </template>
  
  <script>
  export default {
    methods: {
      logout() {
        // Redirect to your Flask logout route
        window.location.href = "/logout";
      },
    },
  };
  </script>
  