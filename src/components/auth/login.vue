<template lang="html">
  <v-dialog persistent v-model="dialogLogin" max-width="600">
    <v-card v-if="!isLoading && status === 'login'">
      <v-card-title primary-title class="pb-0">
        <img class="size-logo" src="/opendataIcon/PSU_CoC_ENG.png" />
      </v-card-title>
      <v-card-title>
        <h2 class="text-company">Data Portal Service </h2>
      </v-card-title>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field style="width: 70%; margin-left: 15%" outline @keyup.enter="getLogin()" color="blue"
          prepend-inner-icon="person" label="username" v-model="username" type="text"></v-text-field>
        <v-text-field style="width: 70%; margin-left: 15%" outline @keyup.enter="getLogin()" color="blue"
          prepend-inner-icon="lock" label="password" id="password" v-model="password" type="password">
          <v-icon>place</v-icon>
        </v-text-field>
      </v-form>
      <v-layout row wrap>
        <v-flex>
          <v-btn dark class="btn-login" @click="getLogin()">Login</v-btn>
        </v-flex>
      </v-layout>
      <v-card-actions pa-10>
        <v-btn flat color="#BDBDBD" class="btn-close" @click="close()">Close</v-btn>
        <v-spacer></v-spacer>
        <v-btn class="btn-forgotPass" @click="forgotPass()" flat>Forgot password</v-btn>
      </v-card-actions>
    </v-card>
    <policy v-if="status === 'policy'" @accept="updatePolicy" />
    <forgotPass v-if="status === 'forgotPass'" @login="updateStatus" @dialog="close" />
    <resetPassword ref="resetPasswordUser" />
    <changepassword90day ref="changepassword90day" />
    <twoauthen ref="twoauthen" @opendialogReset="dialogReset" />
    <register ref="register" />
  </v-dialog>
</template>

<script>
  import policy from "@/components/auth/policy";
  import register from "@/components/auth/register";
  import resetPassword from "@/components/auth/resetPassword";
  import changepassword90day from "@/components/auth/changepassword90day";
  import twoauthen from "@/components/auth/twoauthen";
  import forgotPass from "@/components/auth/forgotpassword";
  import { Encode, Decode } from "@/services";
  import { log } from "util";
  let cjs = require("crypto-js");
  // let CryptoJS = require('crypto-js')
  export default {
    components: {
      policy,
      forgotPass,
      resetPassword,
      changepassword90day,
      register,
      twoauthen
    },
    data() {
      return {
        isLoading: false,
        valid: false,
        dialogLogin: false,
        username: "",
        password: "",
        status: "login"
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
      dialogReset(data) {
        if (this.statusLoginCheck === "unlock") {
          this.$refs.resetPasswordUser.open(data);
        } else if (this.statusLoginCheck === "resetpassword") {
          this.$refs.resetPasswordUser.open(data);
        }
      },
      close() {
        this.dialogLogin = false;
      },
      updateStatus() {
        this.status = "login";
      },
      forgotPass() {
        this.status = "forgotPass";
      },
      updatePolicy() {
        var passwordEncrypt =
          CryptoJS.SHA256(this.password, process.env.SECRETKEY) + "";
        this.axios
          .post(process.env.VUE_APP_API_BACKEND + "/updatePolicy", {
            username: this.username,
            password: passwordEncrypt
          })
          .then(response => {
            // //console.log(response.data);

            if (response.data.status === "success") {
              this.getLogin();
            } else if (response.data.status === "User already to use") {
              this.$swal("User already to use");
            } else {
            }
          });
      },
      getEmailFromToken(token) {
        if (token) {
          this.axios
            .post(process.env.VUE_APP_API_BACKEND + "/getEmailFromToken", {
              token: token
            })
            .then(response => {
              // //console.log(response.data)
              if (response.data.status === "not found") {
                // alert(response.data.status);
                this.$swal("Please check in your email confirmation");
                // this.$swal('Please check in your email confirmation', 'If you are not received email, please click re-send "Email Confirmation" button.', 'warning')
              } else if (response.data.status === "found") {
                // alert(response.data.status);
                this.preLogin(response.data);
              } else if (response.data.status === "link expire") {
                this.$swal(
                  "Your confirmation link has expired after 72 hours",
                  "Please sign up again",
                  "error"
                ).then(response => {
                  this.$router.push(`/`);
                  this.reloadPage();
                  this.$refs.register.opendialog();
                });
              } else {
                // alert(response.data.status);
              }
            });
        }
      },
      getEmailFromTokenUnlockAccount(token) {
        if (token) {
          this.axios
            .post(
              process.env.VUE_APP_API_BACKEND + "/getEmailFromTokenUnlockAccount",
              { token: token }
            )
            .then(response => {
              // //console.log(response.data)
              if (response.data.status === "not found") {
                this.$swal("Please check in your email confirmation");
                // this.$swal('Please check in your email confirmation', 'If you are not received email, please click re-send "Email Confirmation" button.', 'warning')
              } else if (response.data.status === "found") {
                this.unlockAccount(response.data);
              }
            });
        }
      },
      unlockAccount(data) {
        ////console.log(data)
        // //console.log('=========pla=======')
        this.axios
          .post(process.env.VUE_APP_API_BACKEND + "/unlockAccount", {
            username: data.username,
            email: data.email
          })
          .then(response => {
            //  //console.log(response.data)
            if (response.data === "success") {
              this.username = response.data.username;
            } else if (response.data === "Email not found.") {
              this.$swal(
                "Error",
                response.data + " Please contact administrator.",
                "error"
              );
              // this.$router.push('/')
            } else if (response.data === "Your Username is duplicated.") {
              this.$swal(
                "Error",
                response.data + " Please contact administrator.",
                "error"
              );
            } else {
              this.$swal("Error", response.data + "Try to login.", "error");
              // this.$router.push('/')
            }
          });
      },
      preLogin(data) {
        this.axios
          .post(process.env.VUE_APP_API_BACKEND + "/secondStepRegister", {
            username: data.username,
            email: data.email
          })
          .then(response => {
            //  //console.log(response.data)
            if (response.data === "found") {
              this.username = response.data.username;
            } else if (response.data === "Email not found.") {
              // this.$swal('Error', response.data + ' Please contact administrator.', 'error')
              // this.$router.push('/')
            } else if (response.data === "Your Username is duplicated.") {
              // this.$swal('Error', response.data + ' Please contact administrator.', 'error')
            } else {
              // this.$swal('Error', response.data + 'Try to login.', 'error')
              // this.$router.push('/')
            }
          });
      },
      open() {
        this.dialogLogin = true;
        this.status = "login";
        this.checkLink();
      },
      checkLink() {
        var param = window.location.pathname;
        var name = param.split("/");
        if (name[1] === "verify") {
          this.getEmailFromToken(name[2]);
          this.dialogLogin = true;
        } else if (name[1] === "unlock") {
          this.getEmailFromTokenUnlockAccount(name[2]);
          this.$store.commit("statusLogin", "unlock");
        } else if (name[1] === "resetpassword") {
          this.$store.commit("statusLogin", "resetpassword");
        } else {
          this.dialogLogin = true;
          // this.resetPassword(name[2])
        }
      },
      resetPassword(token) {
        this.axios
          .post(process.env.VUE_APP_API_BACKEND + "/unlockAccount", {
            token: token,
            email: data.email
          })
          .then(response => {
            if (response.data === "found") {
              this.username = response.data.username;
            } else if (response.data === "Email not found.") {
              this.$swal(
                "Error",
                response.data + " Please contact administrator.",
                "error"
              );
              // this.$router.push('/')
            } else if (response.data === "Your Username is duplicated.") {
              this.$swal(
                "Error",
                response.data + " Please contact administrator.",
                "error"
              );
            } else {
              this.$swal("Error", response.data + "Try to login.", "error");
              // this.$router.push('/')
            }
          });
      },
      getLogin() {
        this.isLoading = true;
        if (this.username.trim() === "") {
          this.isLoading = false;
          this.$swal("Please fill in Username", "", "warning");
          return;
        } else if (this.password.trim() === "") {
          this.isLoading = false;
          this.$swal("Please fill in Password", "", "warning");
          return;
        }
        $("input").blur();
        var msg = cjs.enc.Utf8.parse(this.password);
        var key = cjs.enc.Utf8.parse(process.env.VUE_APP_SECRETKEY);
        var passwordEncrypt = cjs.enc.Hex.stringify(cjs.HmacSHA256(msg, key));
        var cur = cjs.enc.Utf8.parse(this.currentPassword);
        var currentPasswordEncrypt = cjs.enc.Hex.stringify(
          cjs.HmacSHA256(cur, key)
        );
        this.axios
          .post(process.env.VUE_APP_API_BACKEND + "/login", {
            username: this.username,
            password: passwordEncrypt,
            link: process.env.VUE_APP_LINK,
            currentPassword: currentPasswordEncrypt,
            user_id: Encode.encode(this.userData.user_id)
            // 'link': 'http://localhost:8080'
          })
          .then(
            response => {
              // console.log(response);

              var result = response.data;
              if (result.status !== "success") {
                if (result.status === "policy is update") {
                  if (result.data.two_factor_authen === "on") {
                    this.isLoading = false;
                    this.status = "policy";
                    this.$store.commit("dataPolicy", response.data);
                    this.$store.commit("statusPolicy", "update");
                  } else {
                    this.isLoading = false;
                    this.status = "policy";
                    this.$store.commit("dataPolicy", response.data);
                    this.$store.commit("statusPolicy", "update");
                  }
                } else if (result.status2 === "policy is update") {
                  this.isLoading = false;
                  this.status = "policy";
                  this.$store.commit("dataPolicy", response.data);
                  this.$store.commit("statusPolicy", "updateAdmin");
                } else if (result.status === "not found") {
                  this.$swal({
                    type: "warning",
                    title: "Please try again",
                    text: "Your username or password wrong",
                    allowEnterKey: true
                  });
                  this.isLoading = false;
                } else if (result.status === "Locking account") {
                  this.$swal(
                    "Your account will be locked if you insert wrong password again",
                    "",
                    "warning"
                  );
                  this.isLoading = false;
                } else if (result.status === "User already to use") {
                  this.$swal(
                    '<p style="font-size:20px" >You may forgot to logout properly in previous session, or your account is already in use from another device</p>',
                    '<p style="font-size:15px" >Please click "OK" button and re-login again</p>',
                    "warning"
                  ).then(response => {
                    this.axios
                      .post(process.env.VUE_APP_API_BACKEND + "/updateStatus", {
                        user_id: Encode.encode(result.data),
                        status: Encode.encode("2")
                      })
                      .then(response => {
                        this.reloadPage();
                      });
                  });
                } else if (result.status === "change password") {
                  //  this.$cookies.set('information', Encode.encode(JSON.stringify(result.data)), null, '/', process.env.DOMAIN)
                  //  this.$cookies.set('usertype', Encode.encode(JSON.stringify(result.type_user)), null, '/', process.env.DOMAIN)
                  this.$refs.changepassword90day.open(result.data);
                } else if (result.status === "version") {
                  this.$refs.policyt.open();
                }
                else if (result.status === "user is admin") {
                  // this.$refs.twoauthen.open(result.data);
                  this.$cookies.set(
                    "information",
                    Encode.encode(JSON.stringify(result.data)),
                    null,
                    "/",
                    process.env.DOMAIN
                  );
                  this.$cookies.set(
                    "usertype",
                    Encode.encode(JSON.stringify(result.type_user)),
                    null,
                    "/",
                    process.env.DOMAIN
                  );
                  this.$store.commit("setDataProfile", true);
                  localStorage.setItem(
                    "user_id",
                    JSON.stringify(result.data.user_id)
                  );
                  localStorage.setItem("status_login", "login");
                  this.$swal("Login Success", "", "success").then(response => {
                    this.$router.push("/");
                    this.reloadPage();
                  });
                }
                else if (
                  result.status === "Please contact Center"
                ) {
                  this.$swal("Your account was deleted.", "", "warning").then(
                    response => {
                      this.reloadPage();
                    }
                  );
                }
                else if (result.status === "change password admin") {
                  if (result.data.two_factor_authen === "on") {
                    this.$refs.twoauthen.open(result.data);

                  } else {
                    this.$cookies.set(
                      "information",
                      Encode.encode(JSON.stringify(result.data)),
                      null,
                      "/",
                      process.env.DOMAIN
                    );
                    this.$cookies.set(
                      "usertype",
                      Encode.encode(JSON.stringify(result.type_user)),
                      null,
                      "/",
                      process.env.DOMAIN
                    );
                    this.$store.commit("setDataProfile", true);
                    localStorage.setItem(
                      "user_id",
                      JSON.stringify(result.data.user_id)
                    );
                    localStorage.setItem("status_login", "login");
                    this.$swal("Login Success", "", "success").then(response => {
                      this.$router.push("/");
                      this.reloadPage();
                    });
                  }
                  // this.$store.commit('statusLogin', 'change password admin')
                  //  this.$refs.changepassword90day.open(result.data)
                  // this.$refs.twoauthen.open(result.data)

                  // this.$refs.twoauthen.open(result.data).then(response => {
                  //   //  alert(result.data);
                  //
                  //   if (result.status == "success") {
                  //     this.$refs.changepassword90day.open(result.data);
                  //   }
                  // });
                  // this.$cookies.set(
                  //   "information",
                  //   Encode.encode(JSON.stringify(result.data)),
                  //   null,
                  //   "/",
                  //   process.env.DOMAIN
                  // );
                  // this.$cookies.set(
                  //   "usertype",
                  //   Encode.encode(JSON.stringify(result.type_user)),
                  //   null,
                  //   "/",
                  //   process.env.DOMAIN
                  // );
                  // this.$store.commit("setDataProfile", true);
                  // localStorage.setItem(
                  //   "user_id",
                  //   JSON.stringify(result.data.user_id)
                  // );
                  // localStorage.setItem("status_login", "login");
                  // this.$swal("Login Success", "", "success").then(response => {
                  //   this.$router.push("/");
                  //   this.reloadPage();
                  // });
                } else {
                  // //console.log('5555555555555555');
                  this.$swal(`${response.data.status}`, "", "error");
                  this.isLoading = false;
                }
              } else {
                // alert(response)

                this.isLoading = false;
                this.$cookies.set(
                  "information",
                  Encode.encode(JSON.stringify(result.data)),
                  null,
                  "/",
                  process.env.DOMAIN
                );
                this.$cookies.set(
                  "usertype",
                  Encode.encode(JSON.stringify(result.type_user)),
                  null,
                  "/",
                  process.env.DOMAIN
                );
                this.$store.commit("setDataProfile", true);
                localStorage.setItem(
                  "user_id",
                  JSON.stringify(result.data.user_id)
                );
                localStorage.setItem("status_login", "login");
                this.dialogLogin = false;
                // this.$router.push(`/user/this.userData.firstname`)
                if (this.statusLoginCheck === "unlock") {
                  this.$refs.resetPasswordUser.open(result.data);
                } else if (this.statusLoginCheck === "resetpassword") {
                  this.$refs.resetPasswordUser.open(result.data);
                } else {
                  this.$swal("Login Success", "", "success").then(response => {
                    this.$router.push("/");
                    this.reloadPage();
                  });
                }
              }
            },
            response => {
              this.isLoading = false;
              this.$swal("Can't log in", "Please try again", "error");
            }
          );
      },
      reloadPage() {
        window.location.reload();
      }
    }
  };
</script>

<style lang="css" scoped="">
  .text-company {
    display: block;
    margin: 0 auto;
    color: #0165ba;
    font-weight: 500;
  }

  .size-logo {
    width: 100%;
    max-width: 100px;
    height: auto;
    margin: 0px auto;
  }

  >>>.v-text-field>.v-input__control>.v-input__slot>.v-text-field__slot {
    padding-top: 17px !important;
    padding-left: 10px !important;
  }

  >>>.v-text-field--outline .v-label {
    top: 10px !important;
    padding-left: 13px !important;
  }

  >>>.v-text-field--outline>.v-input__control>.v-input__slot {
    height: 45px;
    line-height: 1.8875em !important;
    border-radius: 23px;
    background-color: #fafafa;
  }

  >>>.theme--light.v-text-field--outline>.v-input__control>.v-input__slot {
    border: solid 1px #276aca;
  }

  .btn-login {
    background-color: #0277BD !important;
    max-width: 195px;
    width: 100%;
    margin: 10px auto;
    display: block;
  }

  .btn-close {
    max-width: 195px;
    width: 100%;
  }

  .btn-forgotPass {
    max-width: 195px;
    width: 100%;
  }
</style>