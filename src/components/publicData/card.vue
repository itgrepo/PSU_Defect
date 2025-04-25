<template>
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap>
      <v-flex v-for="i in cards" :key="i.title" xs3>
        <v-skeleton-loader type="card" :loading="loading"
        width="250px"
        class="mr-1">
        <v-card dark color="secondary" tile flat :href="i.url" target="_blank">
          <v-card-text class="px-0">{{i.title}}</v-card-text>
        </v-card>
        </v-skeleton-loader>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      loading: true,
     
    }
  },
  mounted() {
    setTimeout(() => {
      this.loading = false;
    }, 2000),

    
this.axios

      .get(process.env.VUE_APP_API_BACKEND + "/retrieveService", {
      //  service_id: 2,
      //  responseType: 'arraybuffer'
      })

      .then((response) => {
        // console.log(response);
        // let image = btoa(
        //   new Uint8Array(response.data)
        //   .reduce((data, byte) => data + string.fromCharCode(byte),'')
        // );
        // return `data:${response.headers['content-type'].toLowerCase()};base64,${image}`;
        // this.servicepic = response.data.data;
        // this.servicepic = response.data.data;
        // this.servicepic = response.data.data.service_image;
        // console.log("555")
        //  console.log(JSON.stringify(response.data.data));
        // console.log(response.data)
        // console.log(response.data.data)

      })
      .catch((error) => {
          console.log("Error occured: ", error)
        });


    this.axios
      .get(process.env.VUE_APP_API_BACKEND + "/retrieveService", {
        // "user": user,
        from_page: "ServiceM",
      })
      .then((response) => {
        // console.log(JSON.stringify(response.data));
        this.services = response.data.data;

      });
        // console.log(services)


      //  this.axios
      
      // .post(process.env.VUE_APP_API_BACKEND + "/getService_picture", {
      //   // "user": user,
      //   from_page: "ServiceM",
      
      // })
      // .then((response) => {
      //   // console.log(response)
      //   this.services = response.data.data;
      // });
  },
}
</script>
