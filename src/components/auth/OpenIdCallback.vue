<template>
  <div>
    <p>{{ message }}</p>
  </div>
</template>

<script>
import axios from 'axios';
import { Encode, Decode } from "@/services";

export default {
  data() {
    return {
      message: '',
      isLoading: true,
    };
  },
  mounted() {
    this.handleOpenIDCallback();
  },
  methods: {
    async handleOpenIDCallback() {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get('code');
      const state = urlParams.get('state');

      // Get the stored state
      const storedState = localStorage.getItem('state_code');
      
      // Check if state matches
      if (state !== storedState) {
        this.message = 'Invalid state parameter';
        console.error('Invalid state parameter');
        return;
      }

      // Clear the state from local storage
      localStorage.removeItem('state_code');

      // Send code and state to the backend for token exchange
      try {
        const response = await axios.post(`${process.env.VUE_APP_API_BACKEND}/loginwithAD`, {
          code: code,
          redirect_uri: process.env.VUE_APP_REDIRECT_URI
        });

        const result = response.data;

        if (result.status === "user not found") {
          this.$swal("Please contact Administrator", "", "warning");
        } else if (result.status === "username or password wrong") {
          this.$swal({
            icon: "warning",
            title: "Please try again",
            text: "Your username or password is wrong",
            allowEnterKey: true
          });
        } else if (result.status === "user already to use") {
          this.$swal(
            '<p style="font-size:20px">You may have forgotten to logout properly in the previous session, or your account is already in use from another device</p>',
            '<p style="font-size:15px">Please click "OK" button and re-login again</p>',
            "warning"
          ).then(() => {
            axios.post(`${process.env.VUE_APP_API_BACKEND}/updateStatus`, {
              user_id: Encode.encode(result.data.user_id),
              status: Encode.encode("2")
            }).then(() => {
              this.$cookies.remove('information', '/', process.env.DOMAIN);
              this.$cookies.remove('usertype', '/', process.env.DOMAIN);
              localStorage.setItem("user_id", '');
              this.$store.commit('setDataProfile', false);
              this.reloadPage();
            });
          });
        } else if (result.status === "please contact administrator") {
          console.log("5");
          this.$swal("Please contact Administrator", "", "warning");
        } else if (result.status === "success") {
          if (result.data.two_factor_authen === "on") {
            if (result.check_policy === "policy is update") {
              this.status = "policy";
              this.$store.commit("dataPolicy", response.data);
              this.$store.commit("statusPolicy", "updateAdmin");
              this.$refs.policy.open(this.$store.commit("statusPolicy", "updateAdmin"));
            } else {
              this.$refs.twoauthen.open(result.data);
            }
          } else {
            console.log("6");
            if (result.check_policy === "policy is update") {
              this.status = "policy";
              this.$store.commit("dataPolicy", response.data);
              this.$store.commit("statusPolicy", "update");
              this.$refs.policy.open(this.$store.commit("statusPolicy", "update"));
            } else {
              console.log("7");
              this.isLoading = false;
              this.$cookies.set("information", Encode.encode(JSON.stringify(result.data)), null, "/", process.env.DOMAIN);
              this.$store.commit("setDataProfile", true);
              localStorage.setItem("user_id", JSON.stringify(result.data.user_id));
              localStorage.setItem("status_login", "login");
              this.$swal("Login Success", "", "success").then(() => {
                this.$router.push("/");
                this.reloadPage();
              });
            }
          }
        } else {
          this.$swal("Please contact Administrator", "", "warning");
        }
      } catch (error) {
        console.error('Error exchanging code for tokens:', error);
        this.isLoading = false;
        this.$swal("", "Please try again ", "warrning");
        this.$router.push("/login");
        this.reloadPage();
      }
    },
    reloadPage() {
      window.location.reload();
    }
  }
};
</script>
