<template lang="html">
  <v-dialog persistent v-model="Changepass" width="600">
    <div>
      <v-flex xs12>
        <v-card dark tile flat color="white">
          <v-toolbar card class="font-weight-bold" style="background-color: #77A7DF;">
            <v-toolbar-title class="white--text">
              <v-btn flat icon color="#ffffff" @click="goBack()" :disabled="loadingBtn">
                <v-icon color="#fff">arrow_back</v-icon>
              </v-btn>CHANGE PASSWORD
            </v-toolbar-title>
          </v-toolbar>

          <!-- <v-card-text class="textPadTop title">RESET PASSWORD</v-card-text> -->

          <div class="padLeftRight30 padTop">
            <p class="subheading textBlack">Enter your password</p>
            <v-<v-text-field box label="Current Password" v-model="currentPassword"
              :append-icon="e3 ? 'visibility' : 'visibility_off'" :append-icon-cb="() => (e3 = !e3)"
              :type="e3 ? 'password' : 'text'" required>
              </v-text-field>
              <v-text-field box label="New Password" v-model="newpassword" :rules="newpasswordRules" min="8"
                hint="At least 8 characters" :append-icon="e1 ? 'visibility' : 'visibility_off'"
                :append-icon-cb="() => (e1 = !e1)" :type="e1 ? 'password' : 'text'" required oncopy="return false"
                onpaste="return false" oncut="return false">
              </v-text-field>
              <v-text-field box label="Re Password" v-model="repassword" :rules="repasswordRules" min="8"
                hint="At least 8 characters" :append-icon="e2 ? 'visibility' : 'visibility_off'"
                :append-icon-cb="() => (e2 = !e2)" :type="e2 ? 'password' : 'text'" required oncopy="return false"
                onpaste="return false" oncut="return false">
                ></v-text-field>
              </v-form>
              <v-btn :disabled="!valid" class="btnSubmit blue darken-1" @click="beforeResetPassword()">submit</v-btn>
          </div>
        </v-card>
      </v-flex>
    </div>


    <!-- Mobile -->
    <!-- <div class="hidden-md-and-up">
        <v-layout row wrap>
          <v-flex xs12>
            <v-card dark tile flat color="white">
              <v-card-text class="textPadTop title">RESET PASSWORD</v-card-text>
              <div class="padLeftRight30">
                <p class="subheading textBlack">Enter your new password</p>
                <v-form v-model="valid" ref="form" lazy-validation>
                  <v-text-field
                  label="New Password"
                  v-model="newpassword"
                  :rules="newpasswordRules"
                  hint="At least 8 characters"
                  min="8"
                  :append-icon="e1 ? 'visibility' : 'visibility_off'"
                  :append-icon-cb="() => (e1 = !e1)"
                  :type="e1 ? 'password' : 'text'"
                  required
                  ></v-text-field>
                  <v-text-field
                  label="Re Password"
                  v-model="repassword"
                  :rules="repasswordRules"
                  hint="At least 8 characters"
                  min="8"
                  :append-icon="e2 ? 'visibility' : 'visibility_off'"
                  :append-icon-cb="() => (e2 = !e2)"
                  :type="e2 ? 'password' : 'text'"
                  required
                  oncopy="return false"
                  onpaste="return false"
                  oncut="return false">
                  ></v-text-field>
                <v-btn @click="" :disabled="!valid" class="btnSubmit blue darken-1" @click="beforeResetPassword()">submit</v-btn>

                </v-form>
              </div> -->
    </v-card>
    </v-flex>
    </v-layout>

    </div>
  </v-dialog>
  </div>

</template>

<script>
  let cjs = require("crypto-js")
  import { Encode, Decode } from '@/services'
  export default {
    data() {
      return {
        valid: true,
        currentPassword: '',
        e1: true,
        e2: true,
        e3: true,
        Changepass: false,
        newpassword: '',
        newpasswordRules: [
          (v) => !!v || 'Password is required',
          // (v) => v.length >= 8 || 'Please enter more than 8 characters'
          v => /^((?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{8,})+$/.test(v) || 'Require at least 8 characters of capital letter, small letter and number (EXP:Xxxxxxxxx1)'
          // v => /^[A-Za-z0-9_.]+$/.test(v) || 'Please fill in English only.'
        ],
        repassword: '',
        repasswordRules: [
          (v) => !!v || 'Password is required',
          (v) => v === this.newpassword || 'Password does not match',
          // (v) => v.length >= 8 || 'Please enter more than 8 characters'
        ]
      }
    },
    computed: {
      userData() {
        if (this.$cookies.isKey('information')) {
          return JSON.parse(Decode.decode(this.$cookies.get('information')))
        } else {
          return ''
        }
      }
    },
    methods: {
      open() {
        this.Changepass = true
      },
      beforeResetPassword() {
        if (this.newpassword.trim().length === 0 || this.repassword.trim().length === 0) {
          this.$swal('Please complete all required fields', '', 'warning')
        } else if (this.newpassword !== this.repassword) {
          this.$swal('Password not match', 'Please check password field again', 'warning')
        } else {
          this.resetPassword()
        }
      },
      resetPassword() {
        var msg = cjs.enc.Utf8.parse(this.newpassword)
        var key = cjs.enc.Utf8.parse(process.env.VUE_APP_SECRETKEY)
        var passwordEncrypt = cjs.enc.Hex.stringify(cjs.HmacSHA256(msg, key))
        var cur = cjs.enc.Utf8.parse(this.currentPassword)
        var currentPasswordEncrypt = cjs.enc.Hex.stringify(cjs.HmacSHA256(cur, key))
        // var passwordEncrypt = CryptoJS.SHA256(this.newpassword, process.env.SECRETKEY) + ''
        this.axios.post(process.env.VUE_APP_API_BACKEND + '/changePassword', {
          'password': passwordEncrypt,
          'currentPassword': currentPasswordEncrypt,
          'user_id': Encode.encode(this.userData.user_id),
          // 'cpassword':this.newpassword
        }).then((response) => {
          // console.log(response.data);

          if (response.data.status === 'success') {
            this.$swal('Password has been changed', '', 'success').then((response) => {
              this.axios.post(process.env.VUE_APP_API_BACKEND + '/logout', {
                "user_id": Encode.encode(this.userData.user_id)
              }).then((response) => {
                // //console.log(response.data.status)
                if (response.data.status === 'success') {
                  this.$swal('Please login again', '', 'warning').then((response) => {
                    this.$cookies.remove('information', '/', process.env.DOMAIN)
                    this.$cookies.remove('usertype', '/', process.env.DOMAIN)
                    localStorage.setItem("user_id", '')
                    this.$store.commit('setDataProfile', false)
                    this.$router.push('/')
                    this.reloadPage()
                  })
                }
              })
            })
            // this.$refs.form.reset()
            // this.$router.push('/')
            // this.forgotPass = false
            // this.reloadPage()
          } else if (response.data.status === 'same password') {
            this.$swal('New password must not be the same as current and previous 2 passwords.', '', 'warning')
          }
          else {
            // alert(response.data.status)
            this.$swal('Your current password was incorrect.', '', 'warning')
          }

        })
      },
      reloadPage() {
        window.location.reload()
      },
      goBack() {
        this.Changepass = false
      }

    }
  }
</script>

<style lang="css" scoped>
  .textBlack {
    color: black !important;
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

  .textPadTop {
    color: black;
    padding-top: 30px;
    padding-left: 30px;
  }

  .padLeftRight30 {
    padding-left: 30px;
    padding-right: 30px;
  }

  .padTop {
    padding-top: 10px;
  }

  .btnSubmit {
    color: white !important;
    margin-left: 0px !important;
    margin-bottom: 40px !important;
  }

  .logoIntel {
    width: 160px;
  }

  >>>.theme--dark.v-label {
    color: #212121 !important;
  }

  >>>.theme--dark.v-input:not(.v-input--is-disabled) input,
  .theme--dark.v-input:not(.v-input--is-disabled) textarea {
    color: #212121;
  }

  >>>.theme--dark.v-icon {
    color: #616161;
  }

  >>>.v-text-field input {
    padding: 43px 0px 13px !important;
  }
</style>