<template>
  <v-app>
    <v-content>
      <v-container fluid fill-height > 
        

        <v-layout align-center justify-end>
          
          <v-flex xs12 md12 >
                  <v-card  style="display: block;margin: auto;" max-width="600px" > 
                    <v-form v-model="valid" ref="form" lazy-validation class="padLeftRight30 PadTop" >
                      <v-text-field prepend-inner-icon="person" label="username" solo v-model="username" type="text" ></v-text-field>
                      <v-text-field @keyup.enter="getLogin()" prepend-inner-icon="lock" label="password" solo id="password" v-model="password" type="password"></v-text-field>                       
                    </v-form>

                    <v-container class="pt-0 pb-1">
                      <v-btn block @click="getLogin()" :disabled="!valid" class="btnLogin blue darken-1" style="margin-top: -5px; margin-bottom: 12px!important;">LOGIN</v-btn>
                      <div class="body-2 text-xs-center blue--text"> OR </div>
                      <v-btn outline block @click="goLoginAD()" color="blue darken-1" style="margin-bottom: 12px!important;">Login with Active Directory</v-btn>
                    </v-container>
                    <div class="padLeftRightTop">

                    <v-layout row wrap class="">

                      <v-flex sm4>
                        <a @click="forgotPass()" class="pointer blue--text">Forget password?</a>
                      </v-flex>

                      <v-flex sm3>
                        <a @click="openRegister()" class="pointer success--text">Sign up</a>
                      </v-flex>

                    </v-layout>
                    <!-- <v-btn @click="openRegister()" dark class="btnLogin lime accent-4">SIGN UP</v-btn> -->

                  </div>
             
                  </v-card>
                  
          </v-flex>
        </v-layout>



      </v-container>
      <opendataRegister ref="openRegister" />
      <!-- <policy v-if="status === 'policy'" @accept="updatePolicy" /> -->
      <policy ref="policy" @accept="updatePolicy" />

      <forgotPass ref="forgotPass" />
      <resetPassword ref="resetPasswordUser" />
      <changepassword90day ref="changepassword90day" />
      <twoauthen ref="twoauthen" @opendialogReset="dialogReset" />

      <!-- <v-snackbar v-model="snackbar" :vertical="vertical" :multi-line="multiLine" :timeout="false" hide-overlay>
        <div class="cookie-notice-container">
          <div class="font-Acceptcookies ">
            สำนักงานเศรษฐกิจการคลัง มีการใช้งานคุกกี้ (Cookies)
            เพื่อจัดการข้อมูลส่วนบุคคลและช่วยเพิ่มประสิทธิภาพการใช้งานเว็บไซต์
            ท่านสามารถศึกษารายละเอียดและการตั้งค่าคุกกี้เพิ่มเติมได้ที่
            <u><a @click="goToCookies()"><b>นโยบายการใช้คุกกี้</b></a></u> -->


            <!-- ท่านสามารถศึกษารายละเอียดและการตั้งค่าคุกกี้เพิ่มเติมได้ที่ -->

            <!-- <b><a  @click="goToCookies()">นโยบายการใช้คุกกี้</a></b> -->
          <!-- </div> -->
          <!-- <v-btn color="grey darken-1" flat @click="close()" class="font-Acceptcookies">ไม่ยอมรับ</v-btn>sdfsdfds -->
          <!-- <v-btn depressed white="110px" color="primary" @click="save()" class="btn-cookie">ยอมรับ</v-btn>
        </div> -->
      <!-- </v-snackbar> -->
    </v-content>
  </v-app>
</template>

<script>
  import policy from "@/components/auth/policy";
  import opendataRegister from '@/components/auth/register'
  import resetPassword from "@/components/auth/resetPassword";
  import changepassword90day from "@/components/auth/changepassword90day";
  import twoauthen from "@/components/auth/twoauthen";
  import forgotPass from "@/components/auth/forgotpassword";
  import cardw from "../home/cardw.vue";
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
      opendataRegister,
      twoauthen,
      cardw
    },
    data() {
      return {
        isLoading: false,
        valid: false,
        dialogLogin: false,
        username: "",
        password: "",
        status: "login",
        snackbar: false,
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
      },
      // Cookies() {
      //   this.$cookies.config("365d");
      //   if (this.$cookies.isKey("consentfpo")) {
      //     return this.$cookies.get("consentfpo");
      //   } else {
      //     return this.$cookies.set("consentfpo", "no");
      //   }
      // }
    },

    mounted() {
      this.checkLink();
      // this.checkcookies();
      // this.getRolesPermission()
    },
    methods: {
      dialogReset(data) {
        if (this.statusLoginCheck === "unlock") {
          this.$refs.resetPasswordUser.open(data);
        } else if (this.statusLoginCheck === "resetpassword") {
          this.$refs.resetPasswordUser.open(data);
        } else if (this.statusLoginCheck === 'change password admin') {
          this.$refs.changepassword90day.open(data)
        }

      },
      close() {
        this.dialogLogin = false;
      },
      updateStatus() {
        this.status = "login";
      },
      forgotPass() {
        // this.status = "forgotPass";
        this.$refs.forgotPass.open();
      },
      goLoginAD() {
        // this.$swal("Please check in your email confirmation");
        this.$router.push(`/loginAD`);

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
            //  console.log(response.data)
            if (response.data === "success") {
              this.username = response.data.username;
            }
            else if (response.data === "Email not found.") {
              this.$swal(
                "Error",
                response.data + " Please contact administrator.",
                "error"
              );
              // this.$router.push('/')
            }
            // else if (response.data === "Your Username is duplicated.") {
            //   this.$swal(
            //     "Error",
            //     response.data + " Please contact administrator.",
            //     "error"
            //   );
            // } else {
            //   this.$swal("Error", response.data + "Try to login.", "error");
            //   // this.$router.push('/')
            // }
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

      },
      checkLink() {
        var param = window.location.pathname;
        // console.log(param);
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
            }
            // else if (response.data === "Your Username is duplicated.") {
            //   this.$swal(
            //     "Error",
            //     response.data + " Please contact administrator.",
            //     "error"
            //   );
            // } else {
            //   this.$swal("Error", response.data + "Try to login.", "error");
            //   // this.$router.push('/')
            // }
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
              console.log(response)

              var result = response.data;
              if (result.status !== "success") {
                if (result.status === "policy is update") {
                  this.isLoading = false;
                  this.status = "policy";
                  this.$store.commit("dataPolicy", response.data);
                  this.$store.commit("statusPolicy", "update");
                  this.$refs.policy.open(this.$store.commit("statusPolicy", "update"))

                  // }
                } else
                  if (result.status2 === "policy is update") {
                    this.isLoading = false;
                    this.status = "policy";
                    this.$store.commit("dataPolicy", response.data);
                    this.$store.commit("statusPolicy", "updateAdmin");
                    this.$refs.policy.open(this.$store.commit("statusPolicy", "updateAdmin"))
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
                          this.$cookies.remove('information', '/', process.env.DOMAIN)
                          this.$cookies.remove('usertype', '/', process.env.DOMAIN)
                          localStorage.setItem("user_id", '')
                          this.$store.commit('setDataProfile', false)
                          // this.$router.push('/')
                          this.reloadPage()

                        });
                    });
                  } else if (result.status === "change password") {
                    if (result.data.two_factor_authen === "on") {
                      this.$store.commit('statusLogin', 'change password')
                      this.$refs.twoauthen.open(result.data);

                    } else {
                      this.$refs.changepassword90day.open(result.data);
                    }
                    //  this.$cookies.set('information', Encode.encode(JSON.stringify(result.data)), null, '/', process.env.DOMAIN)
                    //  this.$cookies.set('usertype', Encode.encode(JSON.stringify(result.type_user)), null, '/', process.env.DOMAIN)
                  } else if (result.status === "version") {
                    this.$refs.policyt.open();
                  }
                  else if (result.status === "user is admin") {
                    if (result.data.two_factor_authen === "on") {
                      if (this.statusLoginCheck === "resetpassword") {
                        this.$store.commit("statusLogin", "resetpassword");
                        this.$refs.twoauthen.open(result.data);
                      } else if (this.statusLoginCheck === "unlock") {
                        this.$store.commit("statusLogin", "unlock");
                        this.$refs.twoauthen.open(result.data);
                      }
                      else {
                        this.$refs.twoauthen.open(result.data);
                      }

                    } else {
                      // console.log(this.statusLoginCheck);
                      if (this.statusLoginCheck === "resetpassword") {
                        this.$refs.resetPasswordUser.open(result.data);
                      } else if (this.statusLoginCheck === "unlock") {
                        this.$refs.resetPasswordUser.open(result.data);
                      }
                      else {
                        this.$cookies.set("information", Encode.encode(JSON.stringify(result.data)), null, "/", process.env.DOMAIN);
                        this.$store.commit("setDataProfile", true);
                        localStorage.setItem("user_id", JSON.stringify(result.data.user_id));
                        localStorage.setItem("status_login", "login");
                        this.$swal("Login Success", "", "success")    
                        this.$router.push("/");           
                        this.reloadPage()
                      }
                    }

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
                      this.$store.commit('statusLogin', 'change password admin')
                      //  this.$refs.changepassword90day.open(result.data)
                      this.$refs.twoauthen.open(result.data)
                    } else {
                      this.$store.commit('statusLogin', 'change password admin')
                      this.$refs.changepassword90day.open(result.data);
                    }

                  } else {
                    // //console.log('5555555555555555');
                    this.$swal(`${response.data.status}`, "", "error");
                    this.isLoading = false;
                  }
              } else {
                // alert(response)
                if (result.status2 === "policy is update") {
                  this.isLoading = false;
                  this.status = "policy";
                  this.$store.commit("dataPolicy", response.data);
                  this.$store.commit("statusPolicy", "update");
                  this.$refs.policy.open(this.$store.commit("statusPolicy", "update"))

                  // }
                }
                else
                  if (result.data.two_factor_authen === "on") {
                    this.$refs.twoauthen.open(result.data);
                  } else {
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
                    } else if (result.status === 'change password admin') {
                      this.$store.commit('statusLogin', 'change password admin')
                      this.$refs.twoauthen.open(result.data)
                    }
                    else {
                      this.$swal("Login Success", "", "success").then(response => {
                        this.$router.push("/");
                        this.reloadPage();
                      });
                    }
                  }

              }
            },
            response => {
              this.isLoading = false;
              this.$swal("Can't log in", "Please try again", "error");
            }
          )
      },
      reloadPage() {
        window.location.reload();
      },
      openRegister() {
        // this.$cookies.get("consentfpo")
        // // //console.log(this.$cookies.get("consentfpo") )
        // if (this.$cookies.get("consentfpo") === 'no') {
        //   this.$swal('กรุณากด "ยอมรับ" นโยบายการใช้คุกกี้ด้านล่างก่อน sign up', '', 'warning')
        // } else {
        this.$refs.openRegister.opendialog()
        // }
      },
      save() {
        var browser = this.get_browser(); // browser.name = 'Chrome'

        // //console.log(browser.name);
        // //console.log(browser.version);
        // this.$cookies.set("consent", "yes");
        // this.snackbar = false;
        this.axios.post(process.env.VUE_APP_API_BACKEND + '/AcceptCookie', {
          "browsers_Name": browser.name,
          "browsers_version": browser.version
        }).then((response) => {
          // //console.log(response);
          if (response.data.status === 'AcceptCookie Success') {
            this.$cookies.set("consentfpo", "yes");
            this.snackbar = false;
          }
        })
      },
      // checkcookies() {
      //   // //console.log(this.snackbar);

      //   // this.snackbar = false
      //   if (this.Cookies === "yes") {
      //     this.snackbar = false;
      //   } else {
      //     this.snackbar = true;
      //   }
      // },
      close() {
        this.snackbar = false;
      },
      get_browser() {
        var ua = navigator.userAgent,
          tem,
          M =
            ua.match(
              /(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i
            ) || [];
        if (/trident/i.test(M[1])) {
          tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
          return { name: "IE", version: tem[1] || "" };
        }
        if (M[1] === "Chrome") {
          tem = ua.match(/\bOPR|Edge\/(\d+)/);
          if (tem != null) {
            return { name: "Opera", version: tem[1] };
          }
        }
        M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, "-?"];
        if ((tem = ua.match(/version\/(\d+)/i)) != null) {
          M.splice(1, 1, tem[1]);
        }
        return {
          name: M[0],
          version: M[1]
        };
      },
      // checkcookiesreg() {
      //   if (this.$cookies.get("consentfpo") === "no") {
      //     this.$swal(
      //       '<p class="font-text">กรุณากด "ยอมรับ" นโยบายการใช้คุกกี้ด้านล่าง</p>',
      //       "",
      //       "warning"
      //     );
      //   } else {
      //     this.openRegister()
      //   }
      // },
      // checkcookieslogin() {
      //   if (this.$cookies.get("consentfpo") === "no") {
      //     this.$swal(
      //       '<p class="font-text">กรุณากด "ยอมรับ" นโยบายการใช้คุกกี้ด้านล่าง</p>',
      //       "",
      //       "warning"
      //     );
      //   } else {
      //     this.getLogin()
      //   }
      // },
      // checkcookiesfogot() {
      //   if (this.$cookies.get("consentfpo") === "no") {
      //     this.$swal(
      //       '<p class="font-text">กรุณากด "ยอมรับ" นโยบายการใช้คุกกี้ด้านล่าง</p>',
      //       "",
      //       "warning"
      //     );
      //   } else {
      //     this.forgotPass()
      //   }
      // },
    }
  };
</script>
<style lang="css" scoped="">
  >>>.v-snack__wrapper {
    /* width: auto; */
    width: -webkit-fill-available;
    max-width: 100%;
    /* min-width: 288px; */
    margin: 0 auto;
    border-radius: 2px;
  }

  >>>.v-snack__content {
    width: -webkit-fill-available;
    height: auto;
    padding: 14px 24px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    overflow: hidden;
    background-color: rgb(10, 0, 0);
  }

  .cookie-notice-container {
    display: inherit;
    text-align: left;
    /* padding: 20px; */
    width: 100%;
    max-width: 1170px;
    margin: 0 auto;
    justify-content: center;
    align-items: center;
  }

  .btn-cookie {
    width: 100px;
  }

  .pointer {
    cursor: pointer;
  }

  .pointer:hover {
    font-size: 15.3px;
  }

  .application {
    padding-left: -130px !important;
  }

  body {
    background-color: #f2f2f2;
  }

  a:link {
    text-decoration: none;
  }

  .mgb-0 {
    margin-bottom: 0px !important;
  }

  .textBlack {
    color: black !important;
  }

  .textTitle {
    margin-top: 9%;
  }

  .btnLogin {
    margin-left: 0px !important;
    color: rgb(255, 255, 255);
  }

    .namesystem {
    margin-left: 300px !important;
    color: #007CC3;
     font-size: 18px;
    font-weight: bold;
  }

  .logo {
    width: 160px;
  }

  .goCenter {
    display: flex;
    height: 100%;
    justify-content: center;
    align-items: center;
  }

  .vertical-line {
    width: 2px;
    background-color: #007CC3;
    height: 100%;
    float: left;
    margin: 18px;
  }

  .PadTop {
    padding-top: 30px;
  }

  .textPadTop {
    color: black;
    padding-top: 30px;
    padding-left: 30px;
  }

  .padLeftRight30 {
    padding-left: 30px;
    padding-right: 30px;
  }

  h1,
  h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }


  div.container .bg-login {
    background-color: #ffffff;
  }

  .logo {
    width: 700px;
    
  }

  .goCenter {
    padding-top: 5%;
    height: 15%;
  }
  .logoPadRight {

    padding-left: 200px;
 
  }

  .textPadTop {
    padding-top: 6px;
    padding-left: 0px;
    text-align: center;
  }

  .marLeftRight20 {
    margin-left: 20px;
    margin-right: 20px;
  }

  .padLeftRightTop {
    padding-top: 5px;
    padding-left: 30px;
    padding-right: 20px;
    padding-bottom: 5px;
  }
</style>