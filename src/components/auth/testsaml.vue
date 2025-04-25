<template>
    <v-app>
      <v-main>
        <SamlLogin />
      </v-main>
    </v-app>
  </template>
  
  <script>
  import SamlLogin from "@/components/auth/Loginhome.vue";
  
  export default {
    components: {
      SamlLogin,
    },
  };
  </script>
  