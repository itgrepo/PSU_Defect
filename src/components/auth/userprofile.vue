<template lang="html">
  <v-container fluid class="" style="padding-top: 100px;">
    <v-row justify="center">
      <v-col cols="12" md="8" lg="3">
        <v-card v-if="userDataProfile.type_user == 'DataX'">
          <v-card-title primary-title class="title-user-profile">
        <span class="text-head text-uppercase">
          <v-icon color="rgb(1, 101, 186)" left class="icon-uesr">account_circle</v-icon>  {{ $t('personalinfo') }}
        </span>
        <v-spacer></v-spacer>
      </v-card-title>
          <v-form v-model="valid" class="form-user">
            <v-row class="mt-2">
              <v-col cols="12" sm="4">
                <p class="subheading mt-3 ml-4 fonts-user">{{ $t('username') }}</p>
              </v-col>
              <v-col cols="12" sm="8">
                <v-text-field v-model="userDataProfile.username" disabled></v-text-field>
              </v-col>
            </v-row>

            <!-- First Name -->
            <v-row class="mt-0">
              <v-col cols="12" sm="4">
                <p class="subheading mt-3 ml-4 fonts-user">{{ $t('firstname') }}</p>
              </v-col>
              <v-col cols="12" sm="8">
                <v-text-field v-model="userDataProfile.firstname" :rules="fnameRules" required></v-text-field>
              </v-col>
            </v-row>

            <!-- Last Name -->
            <v-row class="mt-0">
              <v-col cols="12" sm="4">
                <p class="subheading mt-3 ml-4 fonts-user">{{ $t('lastname') }}</p>
              </v-col>
              <v-col cols="12" sm="8">
                <v-text-field v-model="userDataProfile.lastname" :rules="lnameRules" required></v-text-field>
              </v-col>
            </v-row>

            <!-- Email -->
            <v-row class="mt-0">
              <v-col cols="12" sm="4">
                <p class="subheading mt-3 ml-4 fonts-user">{{ $t('email') }}</p>
              </v-col>
              <v-col cols="12" sm="8">
                <v-text-field v-model="userDataProfile.email"></v-text-field>
              </v-col>
            </v-row>

            <!-- Change Password Button -->
            <v-row class="mt-0">
              <v-col cols="12" sm="4">
                <p class="subheading mt-3 ml-4 fonts-user">{{ $t('password') }}</p>
              </v-col>
              <v-col cols="12" sm="8">
                <v-btn flat outline color="#002448" v-if="aduser === 'fpo.go.th'" disabled>
                  <v-icon>edit</v-icon>{{ $t('changepass') }}
                </v-btn>
                <v-btn v-else flat outline color="#002448" @click="openChangepassword()">
                  <v-icon>edit</v-icon>{{ $t('changepass') }}
                </v-btn>
              </v-col>
            </v-row>

            <!-- Usage Objective -->
            <v-row class="mt-0">
              <v-col cols="12" sm="4">
                <p class="subheading mt-3 ml-4 fonts-user">{{ $t('usageojt') }}</p>
              </v-col>
              <v-col cols="12" sm="8">
                <v-select :items="objectives" item-value="id" v-model="userDataProfile.usage_objective" item-text="name"
                  :rules="[v => !!v || 'Item is required']" required>
                </v-select>
                <div v-if="userDataProfile.usage_objective === 'other'">
                  <v-text-field label="Others" :counter="255" maxlength="255" v-model="userDataProfile.other_object"
                    :rules="otherRules" required></v-text-field>
                </div>
              </v-col>
            </v-row>

            <!-- API Key -->
            <v-row class="mt-0">
              <v-col cols="12" sm="4">
                <p class="subheading mt-3 ml-4 fonts-user">{{ $t('apikey') }}</p>
              </v-col>
              <v-col cols="12" sm="8">
                <v-text-field v-model="userDataProfile.APIKEY" disabled></v-text-field>
                <v-btn @click="copyToClipboard(userDataProfile.APIKEY)" outline>{{ $t('copy') }}</v-btn>
              </v-col>
            </v-row>
          </v-form>

          <v-card-actions class="btn-user-profile">
            <v-spacer></v-spacer>
            <v-btn color="success" flat :disabled="!valid" outline @click="save()">
              <v-icon left dark>save</v-icon>{{ $t('save') }}
            </v-btn>
          </v-card-actions>
        </v-card>

        <!-- If user is 'AD' -->
        <v-card v-else-if="userDataProfile.type_user == 'AD'">
          <v-card-title class="d-flex align-center justify-space-between">
            <span class="text-head text-uppercase">
              <v-icon color="rgb(1, 101, 186)" left class="icon-uesr">account_circle</v-icon>
              {{ $t('personalinfo') }}
            </span>
          </v-card-title>

          <!-- Form with Disabled Fields -->
          <v-form v-model="valid" class="form-user">
            <!-- Repeat form elements with 'disabled' attribute as needed -->

            <v-row class="mt-2">
              <v-col cols="12" sm="4">
                <p class="subheading mt-3 ml-4 fonts-user">{{ $t('username') }}</p>
              </v-col>
              <v-col cols="12" sm="8">
                <v-text-field v-model="userDataProfile.username" disabled></v-text-field>
              </v-col>
            </v-row>

            <!-- First Name -->
            <v-row class="mt-0">
              <v-col cols="12" sm="4">
                <p class="subheading mt-3 ml-4 fonts-user">{{ $t('firstname') }}</p>
              </v-col>
              <v-col cols="12" sm="8">
                <v-text-field v-model="userDataProfile.firstname" :rules="fnameRules" required disabled></v-text-field>
              </v-col>
            </v-row>

            <!-- Last Name -->
            <v-row class="mt-0">
              <v-col cols="12" sm="4">
                <p class="subheading mt-3 ml-4 fonts-user">{{ $t('lastname') }}</p>
              </v-col>
              <v-col cols="12" sm="8">
                <v-text-field v-model="userDataProfile.lastname" :rules="lnameRules" required disabled></v-text-field>
              </v-col>
            </v-row>

            <!-- Email -->
            <v-row class="mt-0">
              <v-col cols="12" sm="4">
                <p class="subheading mt-3 ml-4 fonts-user">{{ $t('email') }}</p>
              </v-col>
              <v-col cols="12" sm="8">
                <v-text-field v-model="userDataProfile.email" disabled></v-text-field>
              </v-col>
            </v-row>

            <!-- API Key -->
            <v-row class="mt-0">
              <v-col cols="12" sm="4">
                <p class="subheading mt-3 ml-4 fonts-user">{{ $t('apikey') }}</p>
              </v-col>
              <v-col cols="12" sm="8">
                <v-text-field v-model="userDataProfile.APIKEY" disabled></v-text-field>
                <v-btn @click="copyToClipboard(userDataProfile.APIKEY)" outline>{{ $t('copy') }}</v-btn>
              </v-col>
            </v-row>


          </v-form>

          <v-card-actions class="btn-user-profile">
            <v-spacer></v-spacer>
            <v-btn color="success" flat :disabled="!valid" outline @click="save()" disabled>
              <v-icon left dark>save</v-icon>{{ $t('save') }}
            </v-btn>
          </v-card-actions>
        </v-card>

        <!-- Change Password Component -->
        <Changepassword ref="Changepassword" />
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
  import { Encode, Decode } from "@/services";
  import Changepassword from "@/components/auth/Changepassword";
  export default {
    components: { Changepassword },
    data() {
      return {
         switch1:true,
        aduser: [],
        userDataProfile: [],
        other: [],
        signUp: "profile",
        hasSaved: false,
        valid: true,
        isEditing: null,
        userprofile: false,
        items: {
        },
        selectedItem: {
          name: "Student",
          id: "student"
        },
        objectives: [],

        usernameRules: [
          v => !!v || "Username is required",
          v => /^[A-Za-z0-9_.]+$/.test(v) || "Please fill in English only."
        ],
        fnameRules: [
          v => !!v || "Firstname is required",
          v => /^([A-z])+$/.test(v) || "Please fill in English only."
        ],
        lnameRules: [
          v => !!v || "Lastname is required",
          v => /^([A-z])+$/.test(v) || "Please fill in English only."
        ],
        emailRules: [
          v => !!v || "Email is required",
          v => !!v || "Please fill in the email",
          v =>
            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
            "Invalid email format"
        ],
        otherRules: [v => !!v || "Please choose Usage Objective"]
      };
    },
    watch: {
  '$i18n.locale'(newLocale) {
    this.updateObjectives();
  }
},
    computed: {
      userData() {
        if (this.$cookies.isKey("information")) {

          return JSON.parse(Decode.decode(this.$cookies.get("information")));
        } else {
          return "";
        }
      },
      apidata() {
        if (this.$cookies.isKey("APIKEY")) {

return (this.$cookies.get("APIKEY"));
} else {
return "";
}
      },
      combinedData() {
    let userData = this.userData;
    let apidata = this.apidata;
    
    if (userData && apidata) {
      userData.APIKEY = apidata;
      return userData;
    } else if (userData) {
      return userData;
    } else if (apidata) {
      return { APIKEY: apidata };
    } else {
      return {};
    }
  }
    },
    mounted() {
      
      this.check()
      this.getAD()
      this.twoauthen()
      this.updateObjectives();
    },
    methods: {
      updateObjectives() {
    this.objectives = [
      {
        name: this.$t('investment'),
        id: 'investment'
      },
      {
        name: this.$t('authority'),
        id: 'authority'
      },
      {
        name: this.$t('investor'),
        id: 'investor'
      },
      {
        name: this.$t('researcher'),
        id: 'researcher'
      },
      {
        name: this.$t('policy'),
        id: 'policy'
      },
      {
        name: this.$t('student'),
        id: 'student'
      },
      {
        name: this.$t('other'),
        id: 'other'
      }
    ];
  },
      copyToClipboard(value) {
    const textField = document.createElement('textarea');
    textField.innerText = value;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand('copy');
    textField.remove();
    this.$swal('Copied to clipboard', ' ', 'success');
  },
      close() {
        this.userprofile = false;
        this.reloadPage();
      },
      opendialog() {
        this.userprofile = true;
        this.check()
      },
      check() {
        console.log("combind",this.combinedData);
        // this.other = data;
        // this.userDataProfile = this.userData
        this.userDataProfile = this.combinedData
      },
      save() {
        // console.log(this.userDataProfile);

        if (this.userDataProfile.usage_objective === "other") {
          // console.log(user);
          // this.userDataProfile.other_object = null
          // console.log(this.userDataProfile);
          var user = Encode.encode(JSON.stringify(this.userDataProfile));
          // console.log(user);
          this.axios
            .post(process.env.VUE_APP_API_BACKEND + "/editProfileUser", {
              user: user,
              user_id: Encode.encode(this.userDataProfile.user_id),
              // link: 'http://localhost:8080'
              link: process.env.VUE_APP_LINK
            })
            .then(response => {
              // console.log(response.data)
              if (response.data.status === "success") {
                this.signUp = "waitForVerify";
                this.$cookies.set('information', Encode.encode(JSON.stringify(this.userDataProfile)), null, '/', process.env.DOMAIN)
                this.$swal("edit user profile success", "", "success").then(response => {
                  this.reloadPage();
                  // this.reloadPage()
                }
                );
              } else if (response.data.status === "email success") {
                this.$swal("edit user profile success", "", "success").then(
                  response => {
                    this.$swal(
                      "Please check your email to verify account.",
                      "",
                      "warning"
                    ).then(response => {
                      // this.reloadPage()
                      this.axios
                        .post(process.env.VUE_APP_API_BACKEND + "/logout", {
                          'user_id': Encode.encode(this.userDataProfile.user_id)
                        })
                        .then(response => {
                          // //console.log(response.data)
                          if (response.data.status === "success") {
                            this.$swal("logout", "", "success").then(response => {
                              this.$cookies.remove("information", "/", process.env.DOMAIN);
                              this.$cookies.remove("usertype", "/", process.env.DOMAIN);
                              this.$store.commit("setDataProfile", false);
                              localStorage.setItem("user_id", '')
                              this.$router.push(`/`)
                              this.reloadPage()

                            });
                          }
                        });
                    });
                    // this.reloadPage()
                  }
                );
              } else if (response.data === 'E-mail is required') {
                this.$swal(response.data, "", "error");
              } else {
                this.$swal(response.data.data, "", "error");
              }
            });
        } else {
          this.userDataProfile.other_object = null
          // console.log(this.userDataProfile);
          var user = Encode.encode(JSON.stringify(this.userDataProfile));
          this.axios
            .post(process.env.VUE_APP_API_BACKEND + "/editProfileUser", {
              user: user,
              user_id: Encode.encode(this.userDataProfile.user_id),
              // link: 'http://localhost:8080'
              link: process.env.VUE_APP_LINK
            })
            .then(response => {
              // console.log(response.data)
              if (response.data.status === "success") {
                this.signUp = "waitForVerify";
                this.$cookies.set('information', Encode.encode(JSON.stringify(this.userDataProfile)), null, '/', process.env.DOMAIN)
                this.$swal("edit user profile success", "", "success").then(response => {
                  this.reloadPage();
                  // this.reloadPage()
                }
                );
              } else if (response.data.status === "email success") {
                this.$swal("edit user profile success", "", "success").then(
                  response => {
                    this.$swal(
                      "Please check your email to verify account.",
                      "",
                      "warning"
                    ).then(response => {
                      // this.reloadPage()
                      this.axios
                        .post(process.env.VUE_APP_API_BACKEND + "/logout", {
                          'user_id': Encode.encode(this.userDataProfile.user_id)
                        })
                        .then(response => {
                          // //console.log(response.data)
                          if (response.data.status === "success") {
                            this.$swal("logout", "", "success").then(response => {
                              this.$cookies.remove("information", "/", process.env.DOMAIN);
                              this.$cookies.remove("usertype", "/", process.env.DOMAIN);
                              this.$store.commit("setDataProfile", false);
                              localStorage.setItem("user_id", '')
                              localStorage.setItem("user_id", '')
                              this.$router.push(`/`)
                              this.reloadPage()

                            });
                          }
                        });
                    });
                    // this.reloadPage()
                  }
                );
              } else if (response.data === 'E-mail is required') {
                this.$swal(response.data, "", "error");
              } else {
                this.$swal(response.data.data, "", "error");
              }
            });
        }
      },
      twoauthen(){
        console.log(this.userDataProfile.two_factor_authen)
        if (this.userDataProfile.two_factor_authen === "on"){
          this.switch1 = true
        }else{
          
          this.switch1 = false
        }
      },
      reloadPage() {
        window.location.reload();
      },
      openChangepassword() {
        this.$refs.Changepassword.open();
      },
      getAD() {
        var param = this.userData.username
        var name1 = param.split('@')

        this.aduser = name1[1]
        // console.log(this.aduser );

      },
      getQRstr() {
        this.axios
          .post(process.env.VUE_APP_API_BACKEND + "/getQRString", {
            username: this.userData.username,
          })
          .then(response => {
            // console.log(response.data);

            if (response.data.status === "Success") {
              this.$swal({
                title: 'This is your qr code',
                text: 'Please activate this QR Code with your mobile application : Google Authenticator',
                imageUrl: 'https://api.qrserver.com/v1/create-qr-code/?data=' + response.data.data + '&amp;size=200x200 ',
                imageWidth: 200,
                imageHeight: 200,

              }).then(response => {
              });
            } else if (response.data.status === "Error! This user not have QRCode.") {
              this.$swal("User does not have a QRCode  ", "", "warning").then(response => {

              });
            }
          });
      }
    }
  };
</script>

<style lang="css" scoped="">
  .container {
    height: 100% !important;
  }

  .form-user {
    padding: 10px;
  }

  .icon-uesr {
    font-size: 30px !important;
  }

  .title-user-profile {
    background-color: #b9d9eb !important;
  }

  .text-head {
    color: rgb(1, 101, 186);
    font-size: 20px;
    font-weight: 600;
  }

  .btn-user-profile {
    padding: 10px 40px 15px 0;
  }

  >>>.v-card__title.title.title-user-profile.font-weight-bold.v-card__title--primary {
    padding: 20px 10px 20px 20px;
  }

  @media (max-width: 768px) {
    .form-user {
      margin-right: 24px;
    }

    .btn-user-profile {
      padding: 24px;
    }
  }

  @media (max-width: 524px) {}

  .padLeftRight30 {
    padding-left: 30px;
    padding-right: 30px;
  }

  .colorCard {
    background-color: #f5f5f5;
  }
</style>