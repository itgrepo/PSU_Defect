<template lang="html">
  <v-dialog persistent v-model="register" max-width="500px">
    <v-card v-if="signUp === true">
        <v-toolbar card color="#0165ba">
           <!-- <img class="size-logo" src="/opendataIcon/Logo.png"/>
           <h1  class="text-company">Data Portal Service</h1> -->
        <!-- <v-toolbar-title class="white--text">SIGN UP</v-toolbar-title> -->
        <h2 class="text-company">SIGN UP</h2>
      <v-spacer></v-spacer>
      <v-btn color="#fff" fab small outline @click="closeDialogregister ()">
        <v-icon>close</v-icon>
      </v-btn>
    </v-toolbar>

      <v-container>

        <v-form ref="form" v-model="valid" lazy-validation>
          <v-flex><v-text-field label="Username" required :rules="usernameRules" v-model="username"></v-text-field></v-flex>
          <v-flex><v-text-field label="Firstname" required :rules="fnameRules"  v-model="name"></v-text-field></v-flex>
          <v-flex><v-text-field label="Lastname" required :rules="lnameRules"  v-model="lastname"></v-text-field></v-flex>
          <v-flex><v-text-field label="E-mail"  :rules="emailRules" required v-model="email"></v-text-field></v-flex>
          <v-flex><v-text-field :type="showpassword ? 'text' : 'password'" :rules="passwordRules" required v-model="password"  label="Password" :append-icon="showpassword ? 'visibility' : 'visibility_off'"   @click:append="showpassword  = !showpassword" oncopy="return false" onpaste="return false" oncut="return false"></v-text-field></v-flex>
          <v-flex><v-text-field :type="showrepassword ? 'text' : 'password'" :rules="repasswordRules" required v-model="repassword"  label="Confirm password" :append-icon="showrepassword ? 'visibility' : 'visibility_off'"   @click:append="showrepassword  = !showrepassword" oncopy="return false" onpaste="return false" oncut="return false"></v-text-field></v-flex><v-flex xs2></v-flex>
          <v-flex>
            <v-select chips :items="objectives"  item-value="id" v-model="selectedItem" item-text="name"  :rules="[v => !!v || 'Item is required']" label="Usage Objective" required>
            </v-select>
            <div v-show="selectedItem === 'other'">
              <v-text-field label="Others" v-model="objother" :rules="otherRules" required></v-text-field>
            </div>
          </v-flex>
          <v-btn color="#546C8C" class="btn-signup" :disabled="!valid" outline @click="signup()">Sign up</v-btn>
        </v-form>
      </v-container>
    </v-card>
    <v-card v-else-if="signUp === 'waitForVerify'" style="">
      <v-container style="background-color: #bdbdbd">
        <v-card-text class="textPadTop subheading colorCard">
          <center>  Welcome and thank you for signing up!</center>
        </v-card-text>
        <v-card-text class="colorCard">
          <div class="padLeftRight30">
            <center><p class="subheading textBlack">Please check your email to verify account.</p></center>
            <center><v-btn @click="goLogin()" outline color="blue darken-1" class="btnLogin" >login</v-btn></center>
          </div>
        </v-card-text>
      </v-container>
    </v-card>
    <!-- <v-card v-else-if="signUp === 'policy'" style=""> -->
      <policy ref="policy" @dataUser="saveRegister"/>
    <!-- </v-card> -->
    <opendataLogin ref="openLogin"/>
  </v-dialog>
</template>

<script>
import policy from '@/components/auth/policy'
import opendataLogin from '@/components/auth/login'
let cjs = require("crypto-js")
// let CryptoJS = require('crypto-js')
export default {
  components: { opendataLogin, policy },
  data () {
    return {

      checkbox: false,
      radioGroup: 1,
      selectedItem: '',
      register: false,
      signUp: true,
      valid: true,
      username: '',
      name: '',
      lastname: '',
      nationalId: '',
      passport: '',
      email: '',
      password: '',
      repassword: '',
      emailAddress: '',
      log: '',
      showpassword: false,
      showrepassword: false,
      objother: '-',
      objectives: [{
        name:'Investment Analyst',
        id:'investment'
      },
      {
        name:'Investor',
        id:'investor'
      },
      {
        name:'Researcher',
        id:'researcher'
      },
      {
        name:'Policy maker',
        id:'policy'
      },
      {
        name:'Student',
        id:'student'
      },
      {
        name:'Others … Please specify …',
        id:'other'
      }

    ],
    usernameRules: [
      v => !!v || 'Username is required',
      v =>  /^[A-Za-z0-9_.]+$/.test(v)  || 'Please fill in English only.'
    ],
    fnameRules: [
      v => !!v || 'Firstname is required',
      v =>  /^([A-zก-ฮะ-๋์])+$/.test(v)   || 'Please fill in English or Thai only.'
    ],
    lnameRules: [
      v => !!v || 'Lastname is required',
      v =>  /^([A-zก-ฮะ-๋์])+$/.test(v)   || 'Please fill in English or Thai only.'
    ],

    emailRules: [
      v => !!v || 'Email is required',
      v => !!v || 'Please fill in the email',
      v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'Invalid email format (xxxxxx@xxx.xx)'
    ],
    passwordRules: [
      v => !!v || 'Password is required',
      // v =>  /^[A-Za-z0-9_.]+$/.test(v)  || 'Please fill in English only.'
      v => /^((?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{8,})+$/.test(v) || 'Require at least 8 characters of capital letter, small letter and number'
    ],
    idRules: [
      v => !!v || 'National ID  is required',
      v =>  /^\d{5}[- .]?\d{7}[- .]?\d{1}$/.test(v)  || 'Please fill the ID card number'
    ],
    objectiveRules: [
      v => !!v || 'Please choose Usage Objective',
    ],
    otherRules: [
      v => !!v || 'Please choose Usage Objective',
    ],
    // passwordRules: [
    //   v => !!v || 'กรุณากรอกข้อมูล',
    //   v => !!v || 'Password is required',
    //   v => /^((?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{8,})+$/.test(v) || 'รหัสผ่านต้องมีตัวเลขหรือตัวอักษรภาษาอังกฤษตัวใหญ่หรือตัวอักษรภาษาอังกฤษตัวเล็ก อย่างน้อย 1 ตัว ความยาวอย่างน้อย 8'
    // ],
    repasswordRules: [
      v => !!v || 'Please fill in the information',
      v => !!v || 'Confirm Password is required',
      v => v === this.password || 'Those passwords didn\'t match. Try again.'
    ],
    passportRules: [
      v => !!v || 'Passpost is required',
      v =>  /^[A-Za-z0-9_.]+$/.test(v)  || 'Please fill in English only.'
    ]
  }
},
computed: {
  informData: {
    get () {
      return this.$store.getters.informUser
    }
  }
},
methods: {

  validate () {
    if (this.$refs.form.validate()) {
      this.snackbar = true
    }
  },
  checkFrom () {
    // //console.log(this.radioGroup)
    if (this.$refs.form.validate() && this.radioGroup === 1) {
      // //console.log(this.nationalId)
      if (this.nationalId.length != 13) {
        // //console.log('==========p1')
        this.$swal('ID card Invalid', '', 'error')
        this.nationalId =''
      } else {
        for (var i = 0, sum=0; i < 12; i++) {
          sum += parseFloat(this.nationalId.charAt(i))*(13-i)
        }
        if ((11-sum%11)%10!=parseFloat(this.nationalId.charAt(12))) {
          // //console.log('==========p2')

          this.$swal('ID card Invalid', '', 'error')
          this.nationalId =''
        } else {
          // //console.log('==========p3')
          this.signup()
        }
      }
    } else if (this.$refs.form.validate() && this.radioGroup === 2) {
      this.nationalId = ''
      this.signup()
    }
  },
  goLogin () {
    this.register = false
    this.signUp = true
    this.$refs.openLogin.open()
  },
  opendialog () {
    this.register = true
  },
  signup () {
    var msg = cjs.enc.Utf8.parse(this.password)
    var key = cjs.enc.Utf8.parse(process.env.VUE_APP_SECRETKEY)
    var passwordEncrypt = cjs.enc.Hex.stringify(cjs.HmacSHA256(msg, key))
    this.axios.post(process.env.VUE_APP_API_BACKEND + '/firstStepRegister',
    {
      "username": this.username,
      "password": passwordEncrypt,
      "firstname": this.name,
      "lastname": this.lastname,
      // "national_id": this.nationalId,
      "national_id": this.username,
      "national_id_book": "",
      "national_id_mode": 1,
      "usage_objective": this.selectedItem,
      "other_object": this.objother,
      "email": this.email.toLowerCase(),
      // "link":"http://localhost:8080"
      link: process.env.VUE_APP_LINK
    }).then((response) => {
      // //console.log('==============ppppp===========')
      if (response.data.status === 'success') {
        this.$refs.form.reset()
        this.$store.commit('informUser', response.data.data)
        this.$refs.policy.open('informUser', response.data.data)


        // this.$swal('ลงทะเบียนสำเร็จ', '', 'success')
        // this.$emit('success')
        // this.close()
      } else if (response.data === 'Username or National ID or Passport duplicated') {
        this.$swal('Username or National ID or Passport duplicated', '', 'warning')
      } else if (response.data === 'Please check in your email confirmation') {
        this.signUp = 'waitForVerify'
        this.$refs.form.reset()
      } else {
        this.$swal(response.data, '', 'warning')
      }
    })
  },
  saveRegister (dataUser) {
    this.axios.post(process.env.VUE_APP_API_BACKEND + '/afterPolicyRegister',
    {
      "username": this.informData.username,
      "password": this.informData.password,
      "firstname": this.informData.firstname,
      "lastname": this.informData.lastname,
      // "national_id": this.informData.national_id,
      "national_id": this.informData.username,
      "national_id_book": this.informData.national_id_book,
      "national_id_mode": this.informData.national_id_mode,
      "usage_objective": this.informData.usage_objective,
      "other_object": this.informData.other_object,
      "email": this.informData.email,
      "email_news": dataUser,
      // "link":"http://localhost:8080"

      'link': process.env.VUE_APP_LINK
    }).then((response) => {
    //  //console.log(response.data.status)
      // //console.log('==============ppppp===========')
      if (response.data.status === 'success') {
        event.target.disabled = true;
        this.signUp = false
        this.register = false
        this.$swal('Register successfully', 'Please check in your email confirmation', 'success').then((response) => {
        this.reloadPage()
        })
        // this.$emit('success')

        this.close()
      } else if (response.data === 'Username or National ID or Passport duplicated') {
        this.$swal('Username or National ID or Passport duplicated', '', 'warning')
      } else if (response.data === 'Please check in your email confirmation') {
        this.signUp = 'waitForVerify'
        this.$refs.form.reset()
      } else {
        this.$swal(response.data, '', 'warning')
      }
    })
  },
  reloadPage () {
    window.location.reload()
  },
   closeDialogregister () {
      this.register = false
      this.$refs.formAddUser.resetValidation()
    },
}
}

</script>

<style lang="css" scoped="">
>>>.v-btn--floating .v-icon {
    height: auto;
    width: inherit;
}
.text-company {
    display: block;
    margin: 0 auto;
    color: #fff;
    font-weight: 500;
}
.text-signup {
  text-align: center;
  color: #01579B;
}
.size-logo {
    width: 100%;
    max-width: 70px;
    height: auto;
    margin: 0px auto;
}
/*scrollbar  */
>>>::-webkit-scrollbar {
  width: 8px !important;
  height: 8px !important;
}
>>>::-webkit-scrollbar-track {
    background: #d8d8d8 !important;
    border-radius: 2px !important;
}
>>>::-webkit-scrollbar-thumb {
    background: #aaa !important;
    border-radius: 6px !important;
}
>>>::-webkit-scrollbar-corner {
    background: #d8d8d8 !important;
}
.text-haed-signup {
  display: block;
  margin: 0 auto;
  margin-bottom: 16px;
}
.btn-signup {
  margin: 0 auto;
  display: block;
}
.textPadTop {
  color: black;
  padding-top: 30px;
  padding-left: 15px;
}
.padLeftRight30 {
  padding-left: 30px;
  padding-right: 30px;
}
.colorCard {
  background-color: #f5f5f5;
}
@media(max-width: 768px) {
  .container {
    max-width: 455px !important;
  }
}
</style>
