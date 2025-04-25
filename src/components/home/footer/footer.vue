<template>
  <v-footer padless color="white" class="footerbar" style="position: fixed; bottom: 0; width: 100%; padding: 0; z-index: 1;">
    <v-card flat class="footer-container" style="width: 100%; padding: 0; margin: 0;">
      <v-container fluid class="d-flex justify-center align-center" style="background-image: url('/opendataIcon/footer.png'); background-size: cover; background-position: center; height: 200px;">
        <v-row class="text-center" justify="center" align="center" no-gutters>
          <v-col cols="12" md="3">
            <img src="/opendataIcon/Data Lake logo_M.png" alt="Data Lake Logo" width="120">
            <p class="footer-text">
              DATA LAKE<br>
              สำนักนวัตกรรมดิจิทัลและระบบอัจฉริยะ<br>
              มหาวิทยาลัยสงขลานครินทร์<br>
              เลขที่ 15 ถนนกาญจนวนิชย์ ตำบลหาดใหญ่ อำเภอหาดใหญ่ จังหวัดสงขลา 90110
            </p>
          </v-col>
          <!-- <v-col cols="12" md="3">
            <h3>ข่าวสาร</h3>
            <p class="footer-text">
              - ข่าวสารทั่วไป<br>
              - ข่าวกิจกรรม<br>
              - ประกาศ/คำสั่ง
            </p>
          </v-col> -->
          <!-- <v-col cols="12" md="3">
            <h3>คู่มือ</h3>
            <p class="footer-text">
              - คู่มือการใช้งานระบบ<br>
              - คู่มือการขอ API<br>
              - คู่มือ Datasets
            </p>
          </v-col> -->
          <v-col cols="12" md="3">
            <h3>ติดต่อเรา</h3>
            <p class="footer-text">
              Tel. 074-28 2074<br>
              Email: thereayuth.p@psu.ac.th
            </p>
            <v-btn icon href="#">
              <v-icon>mdi-facebook</v-icon>
            </v-btn>
            <v-btn icon href="#">
              <v-icon>mdi-line</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-footer>
</template>


<script>
import { Encode, Decode } from "@/services";

export default {
  data() {
    return {
      snackbar: true, // หรือค่าที่เหมาะสมตั้งต้น
    vertical: true,
    multiLine: true,
      // vertical: true,
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
    Cookies() {
      this.$cookies.config("365d");
      if (this.$cookies.isKey("consentraot")) {
        return this.$cookies.get("consentraot");
      } else {
        return this.$cookies.set("consentraot", "no");
      }
    },
    checkcookies() {
      if (this.Cookies == "yes") {
        this.snackbar = false;
      } else {
        this.snackbar = true;
      }
    }
  },
  mounted() {
    // if
    // this.$cookies.set('consent', 'no')
    // //console.log(this.Cookies);
    // this.checkLink()
    this.checkcookies();
    this.navigator();
    this.check_login();
    this.timelogout();
    this.idleTimer();
  },
  watch: {
  snackbar(newValue) {
    console.log('Snackbar changed to: ', newValue);
  }
},
  methods: {
    idleTimer() {
      if (this.userData) {
        // console.log(this.timeautologout);
        var time;
        //window.onload = resetTimer;
        // alert('66666666666666666666666666666666666666')
        document.onmousemove = resetTimer; // catches mouse movements
        document.onmousedown = resetTimer; // catches mouse movements
        document.onclick = resetTimer; // catches mouse clicks
        document.onscroll = resetTimer; // catches scrolling
        document.onkeypress = resetTimer; //catches keyboard actions
        const logout = () => {
          this.axios
            .post(process.env.VUE_APP_API_BACKEND + "/logout", {
              user_id: Encode.encode(this.userData.user_id)
            })
            .then(response => {
              // console.log(response.data.status)
              if (response.data.status === "success") {
                this.$cookies.remove("information", "/", process.env.DOMAIN);
                this.$cookies.remove("usertype", "/", process.env.DOMAIN);
                localStorage.setItem("user_id", "");
                this.$store.commit("setDataProfile", false);
                this.$swal("Your session has timed out", "", "warning").then(
                  response => {
                    this.reloadPage();
                  }
                );
              }
            });
        };

        function resetTimer() {
          clearTimeout(time);
          time = setTimeout(logout, localStorage.getItem("logouttime"));
          // time = setTimeout(logout, 30000)
          // 1000 milliseconds = 1 second
        }
      }
    },
    timelogout() {
      this.axios
        .post(process.env.VUE_APP_API_BACKEND + "/getTimeAutoLogout", {})
        .then(response => {
          // console.log(response.data);
          this.timeautologout = response.data;
          localStorage.setItem("logouttime", response.data);
        });
    },
    check_login() {
      if (this.userData) {
        // console.log(this.userData.user_id)
        setInterval(function() {
          // console.log(this.userData.user_id)
          var user_id = localStorage.getItem("user_id");

          const axios = require("axios");
          axios
            .post(process.env.VUE_APP_API_BACKEND + "/checkStatus", {
              user_id: user_id
            })
            .then(response => {
              // console.log(response.data.data.login_status);
              var status_login = localStorage.getItem("status_login");
              //  console.log(status_login)
              if (
                response.data.data.login_status == "2" &&
                status_login == "login"
              ) {
                const axios = require("axios");
                axios.post(process.env.VUE_APP_API_BACKEND + "/updateStatus", {
                  user_id: user_id,
                  status: Encode.encode("3")
                });
                axios
                  .post(process.env.VUE_APP_API_BACKEND + "/logout", {
                    user_id: user_id
                  })
                  .then(response => {
                    // console.log(response.data.status)
                    if (response.data.status === "success") {
                      // console.log('33333333333333333333333');
                      this.$cookies.remove(
                        "information",
                        "/",
                        process.env.DOMAIN
                      );
                      this.$cookies.remove("usertype", "/", process.env.DOMAIN);
                      // this.$store.commit('setDataProfile', false)
                      // this.$router.push('/')
                      localStorage.setItem("status_login", "");
                      localStorage.setItem("user_id", "");
                      localStorage.setItem("status_logout", "1");
                      window.location.href = "/";
                    }
                  });
              }
            });
          //     axios.post(process.env.VUE_APP_API_BACKEND + '/checkLinkExpire', {

          // }).then(response =>{
          //   // console.log(response);

          // })
        }, 10000);
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
    goToCookies() {
      // this.$router.push(`/home/CookiesPolicy`);
      const pdfUrl = "https://gdpr.psu.ac.th/pdf/GDPR4TH.pdf";
      window.open(pdfUrl, "_blank");

      // let routeData = this.$router.resolve("/home/CookiesPolicy");
      // window.open(routeData.href);
    },

    // bypass cookie
    //   save() {
    //   // ตั้งค่าคุกกี้
    //   this.$cookies.set("consentraot", "yes");

    //   // ปิด Snackbar
    //   this.snackbar = false;
    // },

    // send to back
    save() {
  const browser = this.get_browser();

  console.log(browser.name);
  console.log(browser.version);

  this.axios
    .post(process.env.VUE_APP_API_BACKEND + "/AcceptCookie", {
      browsers_Name: browser.name,
      browsers_version: browser.version
    })
    .then((response) => {
      console.log("Response status:", response.data.status);

      // เพิ่มการดีบักเพิ่มเติม
      console.log("Type of response status:", typeof response.data.status);

      // ใช้ trim() เพื่อลบช่องว่างที่ไม่จำเป็น
      const status = response.data.status.trim().toLowerCase();
      console.log("Trimmed response status:", status);

      if (status === "acceptcookie success") {
        this.$cookies.set("consentraot", "yes");
        console.log("Setting snackbar to false before change: ", this.snackbar);
        this.snackbar = false; // ตั้งค่าให้ Snackbar ปิดลงหลังจากที่ทำการยอมรับเสร็จสิ้น
        console.log("Setting snackbar to false after change: ", this.snackbar);
      } else {
        console.log("Response status did not match 'AcceptCookie Success'");
      }
    })
    .catch((error) => {
      console.error("Error accepting cookie:", error);
    });
},




    // save() {
    //   var browser = this.get_browser(); // browser.name = 'Chrome'

    //   // console.log(browser.name);
    //   // console.log(browser.version);
    //   // this.$cookies.set("consent", "yes");
    //   // this.snackbar = false;
    //   this.axios.post(process.env.VUE_APP_API_BACKEND + '/AcceptCookie', {
    //     "browsers_Name": browser.name,
    //     "browsers_version": browser.version
    //   }).then((response) => {
    //     // //console.log(response);
    //     if (response.data.status === 'AcceptCookie Success') {
    //       this.$cookies.set("consentraot", "yes");
    //       this.snackbar = false;
    //     }
    //   })
    // },
    // checkcookies() {
    //   // //console.log(this.snackbar);

    //   // this.snackbar = false
    //   if (this.Cookies === "yes") {
    //     this.snackbar = false;
    //   } else {
    //     this.snackbar = true;
    //   }
    // },
    checkcookies() {
      // console.log(this.snackbar);
      // this.snackbar = false
    },
    reloadPage() {
      window.location.reload();
    },

    close() {
      this.snackbar = false;
    },
    get_browser() {
      const ua = navigator.userAgent;
      let tem,
        M =
          ua.match(
            /(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i
          ) || [];
      if (/trident/i.test(M[1])) {
        tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
        return { name: "IE", version: tem[1] || "" };
      }
      if (M[1] === "Chrome") {
        tem = ua.match(/\b(OPR|Edg)\/(\d+)/);
        if (tem != null) {
          return {
            name: tem[1].replace("OPR", "Opera").replace("Edg", "Edge"),
            version: tem[2]
          };
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

    // get_browser() {
    //   var ua = navigator.userAgent,
    //     tem,
    //     M =
    //       ua.match(
    //         /(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i
    //       ) || [];
    //   if (/trident/i.test(M[1])) {
    //     tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
    //     return { name: "IE", version: tem[1] || "" };
    //   }
    //   if (M[1] === "Chrome") {
    //     tem = ua.match(/\bOPR|Edge\/(\d+)/);
    //     if (tem != null) {
    //       return { name: "Opera", version: tem[1] };
    //     }
    //   }
    //   M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, "-?"];
    //   if ((tem = ua.match(/version\/(\d+)/i)) != null) {
    //     M.splice(1, 1, tem[1]);
    //   }
    //   return {
    //     name: M[0],
    //     version: M[1]
    //   };
    // },
    checkLink() {
      var param = window.location.href;
      var name = param.split("/");
      var Widthipad = window.screen.availWidth;
      if (name[3] === "workbench" && (Widthipad <= 1024 || Widthipad == 1194)) {
        $("#test").css("display", "none");
      }
    }
  }
};
</script>

<style scoped>
.footerbar {
  background-color: #1a759f;
  color: transparent;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 1;
  top: 300px;
}

.footer-container {
  padding: 0;
  margin: 0;
  width: 100%;
}

.footer-text {
  font-size: 14px;
  margin-top: 10px;
}

h3 {
  font-size: 16px;
  margin-bottom: 10px;
}
</style>