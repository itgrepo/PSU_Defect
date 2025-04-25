<template lang="html">
  <v-dialog persistent v-model="factor" max-width="500px">
    <v-card>
      <v-card-title class="bg-factor">
        <h2>
          <v-icon color="#fff">vpn_key</v-icon> 2FACTOR
        </h2>
      </v-card-title>
      <v-card-text>
        <p>Enter your password</p>
        <v-text-field label="Password" maxLength="6" v-model="factorauthen" type="password" :counter="6"
          @keyup.enter="twoauthen()"></v-text-field>
      </v-card-text>
      <v-card-text>
        <v-btn outline color="blue darken-2" class="btn-factor" @click="twoauthen()">submit</v-btn>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
  import { Encode, Decode } from "@/services";
  export default {
    data() {
      return {
        factor: false,
        data: {}
      };
    },
    computed: {
      userData() {
        if (this.$cookies.isKey("information")) {
          return JSON.parse(Decode.decode(this.$cookies.get("information")));
        } else {
          return "";
        }
      },
      statusLoginCheck: {
        get() {
          return this.$store.getters.statusLogin;
        }
      }
    },
    methods: {
      open(data) {
        this.factor = true;
        this.data = data;
      },
      twoauthen() {
        // //console.log(this.data);
        // //console.log(this.factorauthen);
        this.axios.post(process.env.VUE_APP_API_BACKEND + "/auth", {
          usr: this.data.username,
          // 'usr' : this.userData.username,
          mfa: this.factorauthen
        })
          .then(response => {
            // console.log(response)
            if (response.data === "success") {
              this.$swal("Login Success", "", "success");
              this.$cookies.set("information", Encode.encode(JSON.stringify(this.data)), null, "/", process.env.DOMAIN);
              // this.$cookies.set('usertype', Encode.encode(JSON.stringify(result.type_user)), null, '/', process.env.DOMAIN)
              localStorage.setItem("user_id", JSON.stringify(this.data.user_id))
              localStorage.setItem("status_login", "login")
              this.$emit("opendialogReset", this.data);
              if (this.statusLoginCheck === "resetpassword") {
                this.$refs.resetPasswordUser.open(data);
              } else if (this.statusLoginCheck === "unlock") {
                this.$refs.resetPasswordUser.open(data);
              } else if (this.statusLoginCheck === "change password") {
                this.$refs.resetPasswordUser.open(data);
              } else if (this.statusLoginCheck === "change password admin") {
                this.$refs.resetPasswordUser.open(data);
              } else {
                this.reloadPage();
              }
            } 
            else {
              this.$swal("Password wrong", "", "warning");
            }
          });
      },
      reloadPage() {
        window.location.reload();
      }
    }
  };
</script>

<style lang="css" scoped>
  .btn-factor {
    display: block;
    margin: 0 auto;
  }

  .bg-factor {
    background-color: #65A2A9;
    color: #ffffff;
  }
</style>