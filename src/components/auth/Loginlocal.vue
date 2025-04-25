<template>
  <v-app class="loginpage" color="">
    <v-content color="white">
      <v-container fluid fill-height>
        <v-layout align-center justify-center wrap>
          <!-- ฝั่งทางซ้าย: ฟอร์ม Login -->
          <v-flex xs12 sm7 lg7 class="pr-12">
            <v-card color="transparent" class="toolbar-no-elevation">
              <v-toolbar color="transparent" class="toolbar-no-elevation">
                <v-toolbar-title class="font-size-title">
                  DATA LAKE MONITOR
                </v-toolbar-title>
              </v-toolbar>
              <v-row dense class="d-flex flex-row spacer">
                <v-col cols="12" sm="4" md="5" class="d-flex justify-center">
                  <v-card
                    class="font-size mx-auto toolbar-no-elevation"
                    max-width="280"
                    color="transparent"
                  >
                    <v-card-text class="text-center">
                      {{ formattedDate }}
                    </v-card-text>
                    <v-card-actions class="d-flex justify-center">
                      {{ formattedTime }}
                    </v-card-actions>
                  </v-card>
                </v-col>

                <v-col cols="12" sm="4" md="4" class="d-flex justify-center">
                  <v-card
                    class="font-size mx-auto toolbar-no-elevation"
                    color="transparent"
                    max-width="220"
                  >
                    <v-card-text class="text-center">
                      {{ $t("user_member") }}
                    </v-card-text>
                    <v-card-actions class="d-flex justify-center">
                      {{ userCount }}
                    </v-card-actions>
                  </v-card>
                </v-col>

                <v-col cols="12" sm="4" md="4" class="d-flex justify-center">
                  <v-card
                    class="font-size mx-auto toolbar-no-elevation"
                    color="transparent"
                    max-width="100"
                  >
                    <v-card-text class="text-center">
                      {{ $t("dataset") }}
                    </v-card-text>
                    <v-card-actions class="d-flex justify-center">
                      {{ tableCount }}
                    </v-card-actions>
                  </v-card>
                </v-col>
              </v-row>
            </v-card>

            <v-card
              class="cardlogin text--center pa-3 align-center justify-center elevation-24"
              no-border
            >
              <v-img
                class="logologin justify-center align-center mb-3"
                src="/opendataIcon/Data Lake logo_LARGE.png"
                alt="PSU"
              />
              <v-card-subtitle class="text--center justify-center"></v-card-subtitle>

              <v-form @submit.prevent="login">
                <template v-if="showAdminLogin">
                  <v-row justify="center" class="mb-4">
                    <v-col cols="12" md="6">
                      <v-text-field
                        v-model="username"
                        :label="$t('username')"
                        solo
                        required
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row justify="center" class="mb-4">
                    <v-col cols="12" md="6">
                      <v-text-field
                        v-model="password"
                        :label="$t('password')"
                        @keyup.enter="getLogin()"
                        solo
                        :append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'"
                        :type="show3 ? 'text' : 'password'"
                        required
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row justify="center" class="mb-6">
                    <v-btn color="primary" type="submit" @click="getLogin()" large block>
                      {{ $t("login") }}
                    </v-btn>
                  </v-row>
                </template>

                <!-- <v-row justify="center" class="mb-4">
                  <v-btn
                    color="primary"
                    @click="redirectToOpenIDProvider"
                    solo
                    large
                  >
                    LOGIN WITH PSUPASSPORT
                  </v-btn>
                </v-row> -->

                <v-row justify="center" class="mb-4" v-if="!showAdminLogin">
                  <v-btn color="primary" @click="toggleAdminLogin" large>
                    {{ $t("loginWithAdmin") }}
                  </v-btn>
                </v-row>
              </v-form>
            </v-card>
          </v-flex>

          <!-- ฝั่งทางขวา: รูปภาพ -->
          <v-flex xs12 sm8 lg5>
            <!-- <v-card class="text-xs-center" no-border elevation="0"> -->
            <v-toolbar color="transparent" class="toolbar-no-elevation">
              <v-spacer></v-spacer>
              <!-- Spacer เพื่อชิดข้อความไปทางขวา -->
              <v-toolbar-title class="text-right font-size-title crops">
                OPEN DATA DASHBOARD
              </v-toolbar-title>
            </v-toolbar>

            <div class="iframe-container">
              <iframe
                id="ifrm"
                src="https://app.powerbi.com/view?r=eyJrIjoiNDEwNWViZjUtNmMwZC00ZGQ1LTliY2UtZmZhNTQyZjk5MzJjIiwidCI6IjhlNjM0ZTY3LTlkNjYtNDZkMi1hNTI5LWUxYjcwOGM1ZDhiYyIsImMiOjEwfQ%3D%3D"
              ></iframe>
            </div>
            <!-- </v-card-text> -->
            <!-- </v-card> -->
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
    <v-footer padless color="white">
      <v-card flat class="footerbar">
        <v-layout>
          <v-card-text sm5 md6 class="text-footer text-footerWeb">
            © 2024 สำนักนวัตกรรมดิจิทัลและระบบอัจฉริยะ มหาวิทยาลัยสงขลานครินทร์ 15
            ถ.กาญจนวณิชย์ ต.หาดใหญ่ อ.หาดใหญ่ จ.สงขลา 90110 ติดต่อ Tel.074-28 2074 Office
            of Digital Innovation and Intelligent Systems, Prince of Songkla University.
            15 Karnchanavanich Road, Hat Yai, Songkhla 90110 Thailand E-mail :
            support@psu.ac.th
          </v-card-text>
        </v-layout>
      </v-card>
    </v-footer>
  </v-app>
</template>

<script>
import policy from "@/components/auth/policy";
import opendataRegister from "@/components/auth/register";
import resetPassword from "@/components/auth/resetPassword";
import changepassword90day from "@/components/auth/changepassword90day";
import twoauthen from "@/components/auth/twoauthen";
import forgotPass from "@/components/auth/forgotpassword";
import { openidConfig } from "@/components/auth/openidConfig.js";
import { Encode, Decode } from "@/services";
import axios from "axios";
import { log } from "util";
let cjs = require("crypto-js");
// import loginimg from "../../../assets/login.jpg"
export default {
  components: {
    policy,
    forgotPass,
    resetPassword,
    changepassword90day,
    opendataRegister,
    twoauthen,
  },

  data() {
    return {
      tableCount: 0,
      userCount: 0,
      formattedTime: "",
      formattedDate: "",
      currentDate: new Date().toLocaleDateString(),
      isLoading: false,
      valid: false,
      dialogLogin: false,
      showAdminLogin: false,
      username: "",
      password: "",
      status: "login",
      snackbar: false,
      show3: false,
      // loginimg
    };
  },
  computed: {
    // providerName() {
    //   return this.$route.params.providerName;
    // },
    currentLocale() {
      return this.$i18n.locale; // รับภาษาปัจจุบันจาก i18n
    },
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
      },
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
    this.fetchTableCount(); // เรียก method เมื่อ component โหลด
    this.fetchUserData(); // เรียก method เมื่อ component โหลดและมาตรงนี้
    this.checkLink();
    // this.checkcookies();
    // this.getRolesPermission()

    this.updateDateTime(); // เรียกใช้ method เมื่อ component โหลดเสร็จ
    setInterval(this.updateDateTime, 600); // อัปเดตวันและเวลาทุก 1 นาที
  },
  methods: {
    toggleAdminLogin() {
      this.showAdminLogin = true;
    },
    generateStateToken() {
      const state = crypto.randomUUID();
      localStorage.setItem("state_code", state);
      return state;
    },
    redirectToOpenIDProvider() {
      const state = this.generateStateToken();
      const clientId = process.env.VUE_APP_CLIENT_ID;
      const redirectUri = process.env.VUE_APP_REDIRECT_URI;

      const queryStrings = {
        response_type: "code",
        client_id: clientId,
        scope: "openid profile email",
        redirect_uri: redirectUri,
        state: state,
        nonce: "",
      };

      const qs = new URLSearchParams(queryStrings).toString();
      const authorizationEndpoint =
        "https://psusso.psu.ac.th:8443/application/o/authorize/";
      const url = `${authorizationEndpoint}?${qs}`;
      window.location.href = url;
    },
    // redirectToOpenIDProvider() {
    //   const clientId = 'NYBUgwT6jF0KUatOUYvTmdOM5bbULxLr6DfaakZ2';
    //   const redirectUri = 'https://lake.psu.ac.th/loginOpenID'; // เปลี่ยน URL ให้ตรงกับการตั้งค่าของคุณ
    //   const authorizationEndpoint = 'https://psusso.psu.ac.th:8443/application/o/authorize/';
    //   const scope = 'openid profile email';
    //   const responseType = 'code';
    //   const state = Math.random().toString(36).substring(7);
    //   const url = `${authorizationEndpoint}?response_type=${responseType}&client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&state=${state}`;
    //   window.location.href = url;
    // },
    async fetchTableCount() { 
      this.axios
        .post(process.env.VUE_APP_API_BACKEND + "/sumTotal")
        .then((response) => {
          const data = response.data; // ข้อมูลจากหลังบ้าน
          this.tableCount = data.report_total
        })
        .catch((error) => {
          console.error(error); // แสดงข้อผิดพลาดในกรณีที่เกิดปัญหา
        });
    },
    async fetchUserData() {
      try {
        const response = await axios.post(
          `${process.env.VUE_APP_API_BACKEND}mgmt/mgmtgetUser`
        );
        const userData = response.data;
        this.userCount = userData.length; // กำหนดค่าจำนวนผู้ใช้ตามจำนวนข้อมูลที่ได้รับ
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    },
    updateDateTime() {
      const currentDate = new Date();

      // กำหนด options เพื่อรับรู้ค่าละเอียดในสิ่งแสดงผล
      const dateOptions = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      };
      const timeOptions = {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      };

      // ใช้ Intl.DateTimeFormat เพื่อแปลงวันและเวลา ตามภาษาปัจจุบัน
      this.formattedDate = new Intl.DateTimeFormat(this.$i18n.locale, dateOptions).format(
        currentDate
      );
      this.formattedTime = new Intl.DateTimeFormat(this.$i18n.locale, timeOptions).format(
        currentDate
      );
    },
    async redirectToOpenID() {
      try {
        const response = await axios.get(openidConfig.authEndpoint);
        const { authorization_endpoint } = response.data;

        const params = new URLSearchParams({
          client_id: openidConfig.clientId,
          redirect_uri: openidConfig.redirectUri,
          response_type: "code",
          scope: "openid profile email",
        });

        window.location.href = `${authorization_endpoint}?${params.toString()}`;
      } catch (error) {
        console.error("Error fetching OpenID configuration:", error);
      }
    },
    dialogReset(data) {
      if (this.statusLoginCheck === "unlock") {
        this.$refs.resetPasswordUser.open(data);
      } else if (this.statusLoginCheck === "resetpassword") {
        this.$refs.resetPasswordUser.open(data);
      } else if (this.statusLoginCheck === "change password admin") {
        this.$refs.changepassword90day.open(data);
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
      var passwordEncrypt = CryptoJS.SHA256(this.password, process.env.SECRETKEY) + "";
      this.axios
        .post(process.env.VUE_APP_API_BACKEND + "/updatePolicy", {
          username: this.username,
          password: passwordEncrypt,
        })
        .then((response) => {
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
            token: token,
          })
          .then((response) => {
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
              ).then((response) => {
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
          .post(process.env.VUE_APP_API_BACKEND + "/getEmailFromTokenUnlockAccount", {
            token: token,
          })
          .then((response) => {
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
      /// /console.log(data)
      // //console.log('=========pla=======')
      this.axios
        .post(process.env.VUE_APP_API_BACKEND + "/unlockAccount", {
          username: data.username,
          email: data.email,
        })
        .then((response) => {
          //  console.log(response.data)
          if (response.data === "success") {
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
    preLogin(data) {
      this.axios
        .post(process.env.VUE_APP_API_BACKEND + "/secondStepRegister", {
          username: data.username,
          email: data.email,
        })
        .then((response) => {
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
          email: data.email,
        })
        .then((response) => {
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
    getLoginOpenID() {
      console.log("loginopenid");

      this.isLoading = true;
      if (this.username.trim() === "") {
        this.isLoading = false;
        swal("Please fill in Username", "", "warning");
        return;
      } else if (this.password.trim() === "") {
        this.isLoading = false;
        swal("Please fill in Password", "", "warning");
        return;
      }
      document.querySelectorAll("input").forEach((input) => input.blur());
      const msg = cjs.enc.Utf8.parse(this.password);
      const key = cjs.enc.Utf8.parse(process.env.VUE_APP_SECRETKEY);
      const passwordEncrypt = cjs.enc.Hex.stringify(cjs.HmacSHA256(msg, key));

      axios
        .post(`${process.env.VUE_APP_API_BACKEND}/loginwithAD`, {
          username: this.username,
          password: passwordEncrypt,
          link: process.env.VUE_APP_LINK,
        })
        .then((response) => {
          console.log("result login");

          console.log(response);

          const result = response.data;
          if (result.status !== "success") {
            if (result.status === "policy is update") {
              this.isLoading = false;
              this.$store.commit("dataPolicy", response.data);
              this.$store.commit("statusPolicy", "update");
              this.$refs.policy.open();
            } else if (result.status === "not found") {
              swal("Please try again", "Your username or password is wrong", "warning");
              this.isLoading = false;
            } else if (result.status === "Locking account") {
              swal(
                "Your account will be locked if you insert wrong password again",
                "",
                "warning"
              );
              this.isLoading = false;
            } else if (result.status === "User already to use") {
              swal(
                '<p style="font-size:20px">You may have forgotten to logout properly in the previous session, or your account is already in use from another device</p>',
                '<p style="font-size:15px">Please click "OK" button and re-login again</p>',
                "warning"
              ).then(() => {
                axios
                  .post(`${process.env.VUE_APP_API_BACKEND}/updateStatus`, {
                    user_id: Encode.encode(result.data),
                    status: Encode.encode("2"),
                  })
                  .then(() => {
                    this.$cookies.remove("information", "/", process.env.DOMAIN);
                    this.$cookies.remove("usertype", "/", process.env.DOMAIN);
                    localStorage.setItem("user_id", "");
                    this.$store.commit("setDataProfile", false);
                  });
              });
              this.isLoading = false;
            } else if (result.status === "change password") {
              this.$refs.changepassword90day.open(result.data);
              this.isLoading = false;
            } else {
              swal(result.status, "", "error");
              this.isLoading = false;
            }
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
            localStorage.setItem("user_id", JSON.stringify(result.data.user_id));
            localStorage.setItem("status_login", "login");
            swal("Login Success", "", "success");
            this.$router.push("/");
            setTimeout(() => this.reloadPage(), 100);
            this.isLoading = false;
          }
        })
        .catch(() => {
          this.isLoading = false;
          swal("Portal is under maintenance", "Please try again at 8:00 am", "error");
        });
    },
    reloadPage() {
      window.location.reload();
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
      var currentPasswordEncrypt = cjs.enc.Hex.stringify(cjs.HmacSHA256(cur, key));
      this.axios
        .post(process.env.VUE_APP_API_BACKEND + "/login", {
          username: this.username,
          password: passwordEncrypt,
          link: process.env.VUE_APP_LINK,
          currentPassword: currentPasswordEncrypt,
          user_id: Encode.encode(this.userData.user_id),
          // 'link': 'http://localhost:8080'
        })
        .then(
          (response) => {
            console.log(response);

            var result = response.data;
            if (result.status !== "success") {
              if (result.status === "policy is update") {
                this.isLoading = false;
                this.status = "policy";
                this.$store.commit("dataPolicy", response.data);
                this.$store.commit("statusPolicy", "update");
                this.$refs.policy.open(this.$store.commit("statusPolicy", "update"));

                // }
              } else if (result.status2 === "policy is update") {
                this.isLoading = false;
                this.status = "policy";
                this.$store.commit("dataPolicy", response.data);
                this.$store.commit("statusPolicy", "updateAdmin");
                this.$refs.policy.open(this.$store.commit("statusPolicy", "updateAdmin"));
              } else if (result.status === "not found") {
                this.$swal({
                  type: "warning",
                  title: "Please try again",
                  text: "Your username or password wrong",
                  allowEnterKey: true,
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
                ).then((response) => {
                  this.axios
                    .post(process.env.VUE_APP_API_BACKEND + "/updateStatus", {
                      user_id: Encode.encode(result.data),
                      status: Encode.encode("2"),
                    })
                    .then((response) => {
                      this.$cookies.remove("information", "/", process.env.DOMAIN);
                      this.$cookies.remove("usertype", "/", process.env.DOMAIN);
                      localStorage.setItem("user_id", "");
                      this.$store.commit("setDataProfile", false);
                      // this.$router.push('/')
                      // this.reloadPage()
                    });
                });
              } else if (result.status === "change password") {
                if (result.data.two_factor_authen === "on") {
                  this.$store.commit("statusLogin", "change password");
                  this.$refs.twoauthen.open(result.data);
                } else {
                  this.$refs.changepassword90day.open(result.data);
                }
                //  this.$cookies.set('information', Encode.encode(JSON.stringify(result.data)), null, '/', process.env.DOMAIN)
                //  this.$cookies.set('usertype', Encode.encode(JSON.stringify(result.type_user)), null, '/', process.env.DOMAIN)
              } else if (result.status === "version") {
                this.$refs.policyt.open();
              } else if (result.status === "user is admin") {
                if (result.data.two_factor_authen === "on") {
                  if (this.statusLoginCheck === "resetpassword") {
                    this.$store.commit("statusLogin", "resetpassword");
                    this.$refs.twoauthen.open(result.data);
                  } else if (this.statusLoginCheck === "unlock") {
                    this.$store.commit("statusLogin", "unlock");
                    this.$refs.twoauthen.open(result.data);
                  } else {
                    this.$refs.twoauthen.open(result.data);
                  }
                } else {
                  // console.log(this.statusLoginCheck);
                  if (this.statusLoginCheck === "resetpassword") {
                    this.$refs.resetPasswordUser.open(result.data);
                  } else if (this.statusLoginCheck === "unlock") {
                    this.$refs.resetPasswordUser.open(result.data);
                  } else {
                    this.$cookies.set(
                      "information",
                      Encode.encode(JSON.stringify(result.data)),
                      null,
                      "/",
                      process.env.DOMAIN
                    );
                    this.$store.commit("setDataProfile", true);
                    localStorage.setItem("user_id", JSON.stringify(result.data.user_id));
                    localStorage.setItem("status_login", "login");
                    this.$swal("Login Success", "", "success");
                    this.$router.push("/");
                    this.reloadPage();
                  }
                }
              } else if (result.status === "Please contact Center") {
                this.$swal("Your account was deleted.", "", "warning").then(
                  (response) => {
                    this.reloadPage();
                  }
                );
              } else if (result.status === "change password admin") {
                if (result.data.two_factor_authen === "on") {
                  this.$store.commit("statusLogin", "change password admin");
                  //  this.$refs.changepassword90day.open(result.data)
                  this.$refs.twoauthen.open(result.data);
                } else {
                  this.$store.commit("statusLogin", "change password admin");
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
                this.$refs.policy.open(this.$store.commit("statusPolicy", "update"));

                // }
              } else if (result.data.two_factor_authen === "on") {
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
                localStorage.setItem("user_id", JSON.stringify(result.data.user_id));
                localStorage.setItem("status_login", "login");
                this.dialogLogin = false;
                // this.$router.push(`/user/this.userData.firstname`)
                if (this.statusLoginCheck === "unlock") {
                  this.$refs.resetPasswordUser.open(result.data);
                } else if (this.statusLoginCheck === "resetpassword") {
                  this.$refs.resetPasswordUser.open(result.data);
                } else if (result.status === "change password admin") {
                  this.$store.commit("statusLogin", "change password admin");
                  this.$refs.twoauthen.open(result.data);
                } else {
                  this.$swal("Login Success", "", "success").then((response) => {
                    this.$router.push("/");
                    this.reloadPage();
                  });
                }
              }
            }
          },
          (response) => {
            this.isLoading = false;
            this.$swal("Can't log in", "Please try again", "error");
          }
        );
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
      this.$refs.openRegister.opendialog();
      // }
    },
    save() {
      var browser = this.get_browser(); // browser.name = 'Chrome'

      // //console.log(browser.name);
      // //console.log(browser.version);
      // this.$cookies.set("consent", "yes");
      // this.snackbar = false;
      this.axios
        .post(process.env.VUE_APP_API_BACKEND + "/AcceptCookie", {
          browsers_Name: browser.name,
          browsers_version: browser.version,
        })
        .then((response) => {
          // //console.log(response);
          if (response.data.status === "AcceptCookie Success") {
            this.$cookies.set("consentfpo", "yes");
            this.snackbar = false;
          }
        });
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
      var ua = navigator.userAgent;
      var tem;
      var M =
        ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
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
        version: M[1],
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
  },
};
</script>

<style scoped>
.crops {
  margin-top: 100px;
}
footer.v-footer.theme--light {
  height: auto !important;
  color: #ffffff !important;
}

.text-footer {
  font-size: 10px;
  text-align: center;
}

.font-Acceptcookies {
  font-size: 12px;
  color: #ffffff;
}

.footerbar {
  width: 100%;
  color: #000;
}
.text-footerWeb {
  font-size: 12px;
}

.spacer {
  padding-bottom: 30px;
}
.toolbar-no-elevation {
  elevation: 0 !important; /* ลบ elevation โดยใช้ !important เพื่อบังคับให้เป็นเจ้าของค่า */
  box-shadow: none !important; /* ลบเงา โดยใช้ !important เพื่อบังคับให้เป็นเจ้าของค่า */
  border-bottom: none !important; /* ลบเส้นขอบด้านล่าง โดยใช้ !important เพื่อบังคับให้เป็นเจ้าของค่า */
}
.text-right {
  margin-left: auto; /* จัดตำแหน่งข้อความไปทางขวา */
}
.font-size-title {
  font-size: 35px; /* ปรับขนาด font-size ตามที่คุณต้องการ */
  color: #add8e6;
}
.font-size {
  font-size: 28px; /* ปรับขนาด font-size ตามที่คุณต้องการ */
  color: #077296;
}
.highlight {
  background-color: #015779;
  color: white;
}

/* Custom animation for slide effect */
.hover-slide {
  transition: transform 0.3s ease; /* Add transition property for smooth animation */
  position: relative; /* Set position to relative for absolute positioning of hover text */
}

.hover-slide:hover {
  transform: translateY(-5px); /* Move the button 5px up when hovered */
}

/* Styling for the hover text */
.hover-text {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  opacity: 0;
  transition: opacity 0.3s ease; /* Add transition property for smooth opacity change */
}

.hover-slide:hover .hover-text {
  opacity: 0.7; /* Set opacity to reveal text when hovered */
}

/* Custom animation for background color */
.hover-slide::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: transparent;
  z-index: -1;
  transition: background-color 0.3s ease; /* Add transition for background color */
}

.hover-slide:hover::before {
  background-color: rgb(0, 110, 255); /* Change background color on hover */
}
.tool {
  overflow: hidden;
  border: none;
}
.loginpage {
  position: relative; /* ตั้งค่า relative เพื่อให้มีการวางตำแหน่ง overlay ภายใน */
  height: 100%; /* ตั้งค่าความสูงเต็มหน้าจอ */
  display: flex; /* ให้เนื้อหาภายในตรงกลาง */
  justify-content: center; /* จัดให้เนื้อหาภายในตรงกลางแนวนอน */
  align-items: center; /* จัดให้เนื้อหาภายในตรงกลางแนวตั้ง */
  color: white; /* ตั้งค่าสีของข้อความ */
  z-index: 0; /* ตั้งค่า z-index เพื่อให้เนื้อหาด้านในอยู่ด้านหน้าของ overlay */
}

.loginpage::before {
  content: "";
  position: absolute; /* ตั้งค่า absolute เพื่อให้ overlay ครอบคลุมพื้นที่ของ parent */
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url("/opendataIcon/bglogin.jpg"); /* ตั้งค่า URL ของรูปภาพ */
  background-size: cover; /* ปรับขนาดรูปภาพให้ครอบคลุมพื้นที่ */
  background-position: center; /* ตำแหน่งรูปภาพในพื้นที่ */
  opacity: 0.2; /* ตั้งค่าความโปร่งแสง */
  z-index: -1; /* ตั้งค่า z-index เพื่อให้ overlay อยู่ด้านหลังของเนื้อหาภายใน */
}
.lined {
  padding-top: 20px;
  margin-top: 45px;
}
#ifrm {
  width: 100%;
  height: 60vh; /* 100% of the viewport height */
  border: none; /* Remove the border if any */
  border-radius: 20px 20px 10px 10px; /* เพิ่มขอบโค้งที่ด้านล่าง */
  /* clip-path: inset(0px 0px 106px 0px);  ตัดส่วนล่างของ iframe */
}
.iframe-container {
  border: none;
  margin-top: 100px;
  /* margin: auto;
  padding: 10px; */
  overflow: hidden;
  border-radius: 20px 20px 20px 20px;
  /* clip-path: inset(0px 0px 106px 0px); */
  /* box-shadow: 0 10px 24px rgba(0, 188, 212, 0.5); เงาสีฟ้าอ่อน */
}

.v-card {
  margin: 20px;
}

.white--text {
  background-color: white;
  /* กำหนดพื้นหลังทั้งหน้าให้เป็นสีขาว */
  color: black;
  /* กำหนดสีข้อความให้เป็นสีดำ */
}

.v-application {
  background-color: white;
}

.no-border {
  border: none !important;
  /* ลบเส้นขอบ */
}

.logotext {
  padding-top: 15px;
  cursor: pointer;
  max-width: 90px;
  width: 100%;
  height: auto;
}
.logologin {
  margin: auto;
  cursor: pointer;
  max-width: 550px;
  width: 100%;
  height: auto;
  margin-bottom: 80px;
}
/* .cardlogin {
  max-width: 800px;
  padding-left: 200px;
  margin-left: 250px;
 
} */
.cardlogin {
  max-width: 600px;
  margin: 10 auto;
  padding: 20px;
  border-radius: 30px; /* เพิ่ม border-radius เพื่อตั้งค่าขอบโค้ง */
  background: white; /* สีขาว */
  /* box-shadow: 0 10px 20px rgba(0, 188, 212, 0.5) !important; เงาสีฟ้าอ่อน */
}

.v-card.elevation-24 {
  /* box-shadow: 0 10px 20px rgba(0, 188, 212, 0.5) !important; เงาสีฟ้าอ่อน */
  background: white !important; /* สีขาว */
}

@media (max-width: 600px) {
  .cardlogin {
    padding-left: 10px;
    margin-left: 10px;
    margin-right: 25px;
  }
}

@media (min-width: 601px) and (max-width: 960px) {
  .cardlogin {
    padding-left: 20px;
    margin-left: 25px;
    margin-right: 25px;
  }
}

@media (min-width: 961px) {
  .cardlogin {
    padding-left: 20px;
    margin-left: 25px;
    padding-right: 200px;
  }
}

.login-title {
  text-align: center !important;
  font-size: 80px !important;
  width: 100%;
  margin: auto;

  margin-bottom: 50px;
  /* padding-left: 170px; */
}
</style>
