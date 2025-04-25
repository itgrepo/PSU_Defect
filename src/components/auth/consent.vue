<template>
         <div >
          <iframe :src="pdfsrc" style="width: 100%;height: 500px; border: none;"></iframe>
            <!-- <iframe id="update" name="ConsentFrame" :src="getConsent()" width="100%" height="50%"></iframe> -->
        </div>
</template>

<script>
  import { Encode, Decode } from "@/services";


  export default {
    components: {

    },
    data() {
      return {
        pdfsrc: null,
        dialog: false,
        dialogPolicy: false,
        loader: null,
        loading2: false,
        currentPage: 0,
        pageCount: 0,
        dialogm1: "",
        TermConditionofUse: false,
        Policy: false,
        accept: false,
        checkbox: true,
        file_name: "",
        mongo_id: "",
        buttonKey: 1,
         rules: {
        email: v => (v || '').match(/@/) || 'Please enter a valid email',
        length: len => v => (v || '').length >= len || `Invalid character length, required ${len}`,
        password: v => (v || '').match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(_|[^\w])).+$/) ||
          'Password must contain an upper case letter, a numeric character, and a special character',
        required: v => !!v || 'This field is required'
      }
      };
    },
    watch: {
    },
    //    created() {
    //   // this.getConsent()
    // },
  mounted() {
    this.getConsent()


  },
    computed: {
      userData() {
        if (this.$cookies.isKey("information")) {
          return JSON.parse(Decode.decode(this.$cookies.get("information")));
        } else {
          return "";
        }
      },
      dataSave: {
        get() {
          return this.$store.getters.dataPolicy;
        }
      },
      status: {
        get() {
          return this.$store.getters.statusPolicy;
        }
      }
    },
    methods: {

      dataUser(data) {
        // this.loading();
        this.dialog = false
        this.status = "login";
        // this.getPdf()
        // console.log(data);
        if (this.accept === true) {
          // alert('กด')
          if (this.checkbox === true) {
            this.$emit("dataUser", 1);
          } else {
            this.$emit("dataUser", 0);
          }
        } else {
          this.$swal("Please click accept", "", "warning");
        }
      },
      updatePolicy() {

        this.dialog = false
        if (this.accept === true) {
          // alert('กด2')
          this.axios.post(process.env.VUE_APP_API_BACKEND + '/acceptNewConsent',
            { 'user_id': Encode.encode(this.dataSave.data.user_id) }).then(response => {
              // alert(response.data.status)
              if (response.data.status === 'Accept Success') {
                if (this.dataSave.data.two_factor_authen === 'on') {
                  this.$refs.twoauthen.open(this.dataSave.data)
                } else {
                  this.$swal('Accept Success', '', 'success')
                  this.$cookies.set('information', Encode.encode(JSON.stringify(this.dataSave.data)), null, '/', process.env.DOMAIN)
                  // this.$cookies.set('usertype', Encode.encode(JSON.stringify(result.type_user)), null, '/', process.env.DOMAIN)
                  this.$router.push('/')
                  // this.forgotPass = false
                  this.reloadPage()
                }
              }
            })
        } else {
          this.$swal('Please click accept', '', 'warning')
        }
      },
      goToPrivacy() {
        // this.$router.push(`/home/PrivacyPolicy`)
        let routeData = this.$router.resolve("/home/PrivacyPolicy");
        window.open(routeData.href);
      },
      goToTerm() {
        // this.$router.push(`/home/TermConditionofUse`)
        let routeData = this.$router.resolve("/home/TermConditionofUse");
        window.open(routeData.href);
      },
      getConsent() {
          this.axios.get(process.env.VUE_APP_API_BACKEND + '/getConsent',{
          responseType: 'blob' //Force to receive data in a Blob Format
          })
          .then((response)=>{
            const blob = new Blob([response.data],{type: 'application/pdf'});
            const objectUrl = URL.createObjectURL(blob);
            const file = document.createElement("file")
                  file.href = objectUrl
                  file.taget = "pdfsrc"
                  file.click()
                  // return objectUrl;

            this.pdfsrc = objectUrl;

          })
          .catch(console.error);

      },
created() {
  this.getConsent();
},
      updatePolicyAdmin() {
        if (this.$store.getters.statusPolicy === 'updateAdmin') {
          this.dialog = false
          if (this.accept === true) {
            this.axios.post(process.env.VUE_APP_API_BACKEND + '/acceptNewConsent',
              { 'user_id': Encode.encode(this.dataSave.data.user_id) }).then(response => {
                // alert(response.data.status)

                if (response.data.status === 'Accept Success') {
                  this.$swal('Accept Success', '', 'success')
                  $('#update').css('display', 'none')
                  this.dialogPolicy = false
                  // console.log(this.dataSave.data);
                  if (this.dataSave.data.two_factor_authen === 'on') {
                    this.$refs.twoauthen.open(this.dataSave.data)
                  } else {
                    this.$cookies.set('information', Encode.encode(JSON.stringify(this.dataSave.data)), null, '/', process.env.DOMAIN)
                    // this.$cookies.set('usertype', Encode.encode(JSON.stringify(result.type_user)), null, '/', process.env.DOMAIN)
                    this.$router.push('/')
                    // this.forgotPass = false
                    this.reloadPage()
                  }
                  //
                }
              })
          } else {
            this.$swal('Please click accept', '', 'warning')
          }
        }
      },

      goToCookies() {
        // this.$router.push(`/home/CookiesPolicy`)
        let routeData = this.$router.resolve("/home/CookiesPolicy");
        window.open(routeData.href);
      },
      goToPrivacy() {
        // this.$router.push(`/home/PrivacyPolicy`)
        let routeData = this.$router.resolve("/home/PrivacyNotice");
        window.open(routeData.href);
      },
      reloadPage() {
        window.location.reload();
      },
      loading() {
        this.$refs.loading.open();
      },
      open() {
        this.dialogPolicy = true
      }
    }
  };
</script>

<style lang="css" scoped="">
  @import url('https://fonts.googleapis.com/css?family=Kanit&display=swap');

  .ppp {
    overflow-y: scroll;
  }

  .text-center {
    text-align: center;
  }

  .text-policy {
    /* font-family: 'Kanit' !important; */
    background-color: #ffffff;
  }

  .font-size,
 {
    font-size: 12px !important;
  }

  >>>label.v-label.theme--light {
    font-size: 14px;
  }

  .FixHead {
    overflow-y: auto;
    /* height: 600px; */
    position: sticky;
    top: 0;
    background-color: #ffffff;
    margin-top: 5px;

  }

  .footer {
    position: sticky;
    bottom: 0;
    /* margin-top: 5px; */
    background-color: #ffffff;
  }

  /* scrollbar */
  /* width */
  ::-webkit-scrollbar {
    width: 8px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #ccc;
    border-radius: 10px;
  }

  .container {
    background: #ffffff;
  }

  >>>table {
    border-collapse: collapse;
    font-size: 12px;
  }

  .pt-10 {
    padding: 10px;
  }

  .color-th {
    height: 35px;
    background-color: #ffc000
  }

  .table-center {
    display: block;
    margin: 0px auto;
  }

  dt {
    font-size: 12px;
  }

  .font-size {
    font-size: 12px;
  }

  .text-center {
  text-align: center;
}
</style>
