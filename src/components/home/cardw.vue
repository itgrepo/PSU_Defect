<template>
  <v-app>
      <v-container class="logo logoPadRight" alt="" style="dispaly:block; margin: auto;">
                 <div><img src="/opendataIcon/FPO.png" class="logo logoPadRight" alt="" style="dispaly:block; margin: auto;"> </div>
        </v-container>
        
                 <!-- <div><p  class="namesystem">ระบบการเชื่อมโยงข้อมูลอิเล็กทรอนิกส์ <br/>
                        โครงการพัฒนาระบบสารสนเทศสถาบันการเงินประชาชนของสำนักงานเศรษฐกิจการคลัง<br/>
                        สำนักงานเศรษฐกิจการคลัง  มหาวิทยาลัยสงขลานครินทร์
                        </p></div>
          -->
         


    
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      loading: true,
      cards: [
      { title: 'Upload Complete', Value: 60, Unit: "Dataset" },
      { title: 'Key Form', Value: 80, Unit: "Data"},
      
    ],
    
    }
  },
  mounted() {
    this.getWeatherData(),
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
  methods:{

      getWeatherData(){
        // console.log("category")
          this.axios.get("https://data.tmd.go.th/api/Weather3Hours/V1/?type=json",{
          }).then((response)=>{
          console.log("response data is : ",response.data)
          this.Weather=response.data;
          // console.log(this.Weather);
          })
      },
  }
}
</script>
<style lang="css" scoped="">

  .rounded-card{
    border-radius:35px;
  }
  /* @import url("https://fonts.googleapis.com/css?family=Kanit&display=swap"); */
  .text-users {
    font-size: 14px;
    font-weight: bold;
  }

  .company-name {
    /* font-family: "Kanit", sans-serif; */
    margin-bottom: 0px;
    padding-top: 15px;
    font-size: 30px;
    font-weight: 500;
    color: #000000;
    /* font-size: 28px; */
  }
    .Big-number {
    /* font-family: "Kanit", sans-serif; */
    margin-bottom: 0px;
    font-size: 90px;
    font-weight: 500;
    
    
    /* font-size: 28px; */
  }
  .value-color{
    color:#8933EC;
  }

   .new-name {
    /* font-family: "Kanit", sans-serif; */
    margin-bottom: 0px;
    font-size: 18px;
    font-weight: 500;
    color: #ffffff;
    /* font-size: 28px; */
  }

  .pointer {
    cursor: pointer;
  }

  .logotext {
    cursor: pointer;
    width: 100;
    height: 100;
  }
  .pedding {
  
    padding-left: 12;
    padding-top: 12;
    
  }
  .pedding-top {

    padding-top: 12;
  }

  .footerbar {
    margin-top: 2px !important;
    height: 100%;
  }

  .menu-icon {
    max-width: 30px;
    width: 100%;
    height: auto;
  }

  .highlight {
    /* background: #E0E0E0; */
    background: #ECE5D1 !important;
  }

  .btn-admin {
    display: block;
  }

  @media (max-width: 1024px) {
    .btn-admin {
      display: none;
    }

  }

  @media (max-width: 768px) {
    .btn-admin {
      display: none;
    }

  

   
  }

  @media (max-width: 1194px) {
    .btn-admin {
      display: none;
    }    
    .imagebanner{
      max-width: 1830px;
      padding-top: 500px;
      width: 100%;
      height: auto;
    }
  
  }
</style>
