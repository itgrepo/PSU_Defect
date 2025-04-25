<template>
    <v-layout row wrap>
        <v-flex xs12 sm12 md12>
            <v-card-text class="subheading">
                <v-btn flat icon color="error" @click="goBack()">
                    <v-icon>arrow_back</v-icon>
                </v-btn>Login with Active Directory (AD)
            </v-card-text>
            <v-layout>
                <v-flex xs12 sm8 offset-sm2>
                    <v-card color="" class="black--text pb-5 center-card" max-width="650px">
                        <v-card-title primary-title>
                            <div class="goCenter">
                                <div class="">
                                    <img src="/opendataIcon/Logo.png" class="logo" alt="">
                                </div>
                                <div class="vertical-line" style="height: 45px;"></div>
                                <div class="">
                                    <p class="mgb-0 body-2">Fiscal<br>Policy<br>Office </p>
                                </div>
                            </div>
                        </v-card-title>
                        <p class="title textPadTop" style="padding-top: 25px;">LOGIN</p>
                        <div>
                            <v-form v-model="valid" ref="form" lazy-validation class="padLeftRight30">
                                <v-text-field label="Username" v-model="username" color="blue lighten-1"
                                    :rules="usernameRules" required @keydown.enter.prevent="login()">
                                </v-text-field>
                                <v-text-field label="Password" v-model="password" color="blue lighten-1"
                                    :rules="passwordRules" required
                                    :append-icon="checkPass ? 'visibility' : 'visibility_off'"
                                    :append-icon-cb="() => (checkPass = !checkPass)"
                                    :type="checkPass ? 'password' : 'text'" @keydown.enter.prevent="login()">
                                </v-text-field>
                            </v-form>
                            <v-container class="pt-0 pb-1">
                                <v-btn block @click="login()" :disabled="!valid" :loading="loading"
                                    class="btnLogin blue darken-1"
                                    style="margin-top: -5px; margin-bottom: 12px!important;">LOGIN</v-btn>
                            </v-container>
                        </div>

                    </v-card>
                </v-flex>
            </v-layout>
        </v-flex>
        <policy ref="policy" @accept="updatePolicy" />
        <twoauthen ref="twoauthen" @opendialogReset="dialogReset" />

    </v-layout>

</template>

<script>
    import { Encode, Decode } from "@/services";
    import policy from "@/components/auth/policy";
    import twoauthen from "@/components/auth/twoauthen";


    export default {
        components: {
            policy, twoauthen
        },
        data() {
            return {
                valid: true,
                validName: true,
                checkPass: true,
                loading: false,
                loadingSave: false,
                password: '',
                passwordRules: [
                    (v) => !!v || 'Password is required'
                ],
                username: '',
                usernameRules: [
                    (v) => !!v || 'Username is required'
                ],
                // FLNameMode: false,
                firstname: '',
                lastname: '',
                FnameRules: [
                    v => !!v || 'First name is required'
                ],
                LnameRules: [
                    v => !!v || 'Last name is required'
                ]
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
            statusLoginCheck: {
                get() {
                    return this.$store.getters.statusLogin;
                }
            }
        },
        methods: {
            goBack() {
                this.$router.go(-1)
            },
            login() {
                if (this.username.trim() === "") {
                    this.$swal("Please fill in Username", "", "warning");
                } else if (this.password.trim() === "") {
                    this.$swal("Please fill in Password", "", "warning");
                } else {
                    this.axios
                        .post(process.env.VUE_APP_API_BACKEND + "/loginWithAD", {
                            username: this.username,
                            password: Encode.encode(this.password),
                        })
                        .then(
                            response => {
                                // console.log(response);
                                var result = response.data;

                                if (result.status === "user not found") {
                                    this.$swal("Please contact Administrator", "", "warning")
                                } else if (result.status === "username or password wrong") {
                                    this.$swal({
                                        type: "warning",
                                        title: "Please try again",
                                        text: "Your username or password wrong",
                                        allowEnterKey: true
                                    });
                                } else if (result.status === "user already to use") {
                                    this.$swal(
                                        '<p style="font-size:20px" >You may forgot to logout properly in previous session, or your account is already in use from another device</p>',
                                        '<p style="font-size:15px" >Please click "OK" button and re-login again</p>',
                                        "warning"
                                    ).then(response => {
                                        this.axios
                                            .post(process.env.VUE_APP_API_BACKEND + "/updateStatus", {
                                                user_id: Encode.encode(result.data.user_id),
                                                status: Encode.encode("2")
                                            })
                                            .then(response => {
                                                // console.log(response);
                                                this.$cookies.remove('information', '/', process.env.DOMAIN)
                                                this.$cookies.remove('usertype', '/', process.env.DOMAIN)
                                                localStorage.setItem("user_id", '')
                                                this.$store.commit('setDataProfile', false)
                                                // this.$router.push('/')
                                                this.reloadPage()

                                            });
                                    });
                                } else if (result.status === "please contact administrator") {
                                    this.$swal("Please contact Administrator", "", "warning")
                                } else if (result.status === "success") {
                                    // console.log(result.data.two_factor_authen);
                                    if (result.data.two_factor_authen === "on") {
                                        if (result.check_policy === "policy is update") {
                                            this.status = "policy";
                                            this.$store.commit("dataPolicy", response.data);
                                            this.$store.commit("statusPolicy", "updateAdmin");
                                            this.$refs.policy.open(this.$store.commit("statusPolicy", "updateAdmin"))
                                        } else {
                                            this.$refs.twoauthen.open(result.data);
                                        }
                                    } else {
                                        if (result.check_policy === "policy is update") {
                                            this.status = "policy";
                                            this.$store.commit("dataPolicy", response.data);
                                            this.$store.commit("statusPolicy", "update");
                                            this.$refs.policy.open(this.$store.commit("statusPolicy", "update"))
                                        } else {
                                            this.isLoading = false;
                                            this.$cookies.set("information", Encode.encode(JSON.stringify(result.data)), null, "/", process.env.DOMAIN);
                                            this.$store.commit("setDataProfile", true); localStorage.setItem("user_id", JSON.stringify(result.data.user_id));
                                            localStorage.setItem("status_login", "login");
                                            this.$swal("Login Success", "", "success").then(response => {
                                                this.$router.push("/");
                                                this.reloadPage();
                                            });
                                        }
                                    }
                                } else {
                                    this.$swal("Please contact Administrator", "", "warning")
                                }
                            })
                }

            },
            reloadPage() {
                window.location.reload();
            },
        }
    }





</script>

<style lang="css" scoped>
    .picCenter {
        display: block;
        margin-left: auto;
        margin-right: auto;
        width: 45%;
    }

    .pointer {
        cursor: pointer;
    }

    .pointer:hover {
        font-size: 14.3px;
    }

    .application {
        padding-left: -130px !important;
    }

    body {
        background-color: #fff;
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
        color: white;
        background-color: #68BB7E !important;
    }

    .logoIntel {
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

    div.container {
        background-color: #fff;
    }

    .picCenter {
        display: block;
        margin-left: auto;
        margin-right: auto;
        width: 40%;
    }

    .logoFpo {
        max-width: 180px;
        width: 100%;
        height: 100%;
        display: block;
        margin: auto;
    }

    .goCenter {
        padding-top: 5%;
        height: 15%;
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
        padding-top: 20px;
        padding-left: 30px;
        padding-right: 30px;
        padding-bottom: 0px;
    }

    .goCenter {
        display: flex;
        margin: 0px auto;

    }

    .center-card {
        display: block;
        margin: auto;
    }
</style>