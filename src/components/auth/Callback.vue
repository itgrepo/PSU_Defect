<template>
    <div>
      Redirecting...
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import { openidConfig } from './openidConfig';
  
  export default {
    async created() {
      const code = this.$route.query.code;
  
      try {
        const response = await axios.post(openidConfig.tokenEndpoint, {
          client_id: openidConfig.clientId,
          client_secret: openidConfig.clientSecret,
          code: code,
          grant_type: 'authorization_code',
          redirect_uri: openidConfig.redirectUri,
        });
  
        // Handle the response, store the token, etc.
        console.log('Token response:', response.data);
      } catch (error) {
        console.error('Error fetching token:', error);
      }
    },
  };
  </script>
  