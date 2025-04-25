<template lang="html">
  <v-dialog persistent v-model="Forgetpassword" width="600">
    <v-flex xs12>
      <v-card tile flat color="white">
        <v-card-text class="textPadTop title">
          <v-btn flat icon color="error" @click="goBack()" :disabled="loadingBtn">
            <v-icon>arrow_back</v-icon>
          </v-btn>FORGET PASSWORD
        </v-card-text>
        <div class="padLeftRight30">
          <p class="subheading textBlack">Enter your Username</p>
          <p class="body-2 textBlack">You will reseive an email with the link to confirm your account</p>
          <v-form v-model="valid" ref="form" lazy-validation>
            <v-flex xs12 sm6 md3>
            </v-flex>
            <v-select box :items="forgotpassworditem" item-value="id" v-model="forgotpassword" item-text="name"
              label="Forgotpassword with" :rules="[v => !!v || 'Item is required']">
            </v-select>
            <div v-if="forgotpassword === 1">
              <v-text-field box label="Username" v-model="username" :rules="usernameRules" required
                @keydown.enter.prevent="submitRePass()"></v-text-field>
            </div>
            <div v-else-if="forgotpassword === 2">
              <v-text-field box label="National ID" v-model="national_id" :rules="idRules" mask="#-####-#####-##-#"
                required @keydown.enter.prevent="submitRePass()"></v-text-field>
            </div>
            <div v-else-if="forgotpassword === 3">
              <v-text-field box label="Passport ID" v-model="passport" :rules="passportRules" required
                @keydown.enter.prevent="submitRePass()"></v-text-field>
            </div>
            <!-- <v-text-field box label="Username" v-model="username" :rules="usernameRules" required @keydown.enter.prevent="submitRePass()"></v-text-field> -->
          </v-form>
          <v-btn @click="submitRePass()" :loading="loadingBtn" :disabled="!valid || loadingBtn"
            class="btnSubmit blue darken-1">submit</v-btn>
        </div>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-dialog>
</template>

<script>
  export default {
    data() {
      return {
        Forgetpassword: false,
        valid: true,
        loadingBtn: false,
        username: '',
        national_id: '',
        passport: '',
        forgotpassword: 1,
        forgotpassworditem: [
          { name: 'Username', id: 1 },
          // { name: 'National ID', id: 2 },
          // { name: 'Passport ID', id: 3 },
        ],
        usernameRules: [
          v => !!v || 'Username is required',
          v => /^[A-Za-z0-9_.]+$/.test(v) || 'Please fill in English only.'
        ],
        idRules: [
          v => !!v || 'National ID  is required',
          v => /^\d{5}[- .]?\d{7}[- .]?\d{1}$/.test(v) || 'Please fill the ID card number'
        ],
        passportRules: [
          v => !!v || 'Passpost is required'
        ]
      }
    },
    methods: {
      submitRePass() {
        // //console.log('ggg')
        this.loadingBtn = true
        this.axios.post(process.env.VUE_APP_API_BACKEND + '/forgotPassword', {
          'username': this.username,
          // 'national_id': this.national_id,
          // 'national_id_book': this.passport,
          // 'id_mode': this.forgotpassword,
          // 'link': "http://localhost:8080"
          'link': process.env.VUE_APP_LINK
        }).then((response) => {
          // console.log(response);
          // //console.log('ff')
          if (response.data === 'success') {
            this.$swal('Please check your email to reset password', '', 'success').then(response => {
              this.reloadPage()
              this.$emit('dialog')
            }) 
          } else if (response.data === 'not found') {
            this.$swal('Data is not found', '', 'warning')
            this.loadingBtn = false
          } else if (response.data === 'success (not have email)') {
            this.$swal('Please contact Admin', '', 'warning').then(response => {
              this.reloadPage()
              this.$emit('dialog')
            }) 
            // this.loadingBtn = false
          }
           else {
            this.$swal(response.data, '', 'error')
          }
        })
        // this.$router.push('/resetpassword')
      },
      reloadPage() {
        window.location.reload();
      },
      goBack() {
        this.Forgetpassword = false
      },
      open() {
        this.Forgetpassword = true
      },
    }
  }
</script>

<style lang="css" scoped="">
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

  >>>.v-text-field input {
    padding-top: 35px;
  }

  >>>.v-text-field>.v-input__control>.v-input__slot>.v-text-field__slot {
    padding-top: 20px !important;
  }

  >>>.theme--dark.v-select .v-select__selections {
    color: #000000;
  }
</style>