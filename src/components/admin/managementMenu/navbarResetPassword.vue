<template>
    <v-navigation-drawer app v-model="drawerResetPass" temporary right stateless>
        <v-toolbar flat class="grey lighten-3">
            <v-list class="pa-0">
                <v-list-tile>
                    <v-list-tile-content>
                        <v-list-tile-title>RESET PASSWORD</v-list-tile-title>
                    </v-list-tile-content>
                    <v-spacer></v-spacer>
                    <v-list-tile-action>
                        <v-btn color="red" flat icon @click="clearDrawerResetPass()">
                            <v-icon color="red">clear</v-icon>
                        </v-btn>
                    </v-list-tile-action>
                </v-list-tile>
            </v-list>
        </v-toolbar>
        <v-divider></v-divider>
        <v-container grid-list-md>
            <v-form v-model="valid" lazy-validation>
                <v-layout wrap>
                    <v-flex xs12 sm12 md12 class="pdb0">
                        <v-text-field label="Username" v-model="username" disabled></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm12 md12 class="pdt0 pdb0">
                        <v-text-field label="First name" v-model="firstName" disabled>
                        </v-text-field>
                    </v-flex>
                    <v-flex xs12 sm12 md12 class="pdt0 pdb0">
                        <v-text-field label="Last name" v-model="lastName" required disabled></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm12 md12 class="pdt0 pdb0"  v-if="aduser === 'fpo.go.th'" >
                        <v-text-field :type="showpassword ? 'text' : 'password'" :rules="passwordRules" required
                            v-model="password" label="Password"
                            :append-icon="showpassword ? 'visibility' : 'visibility_off'"
                            @click:append="showpassword  = !showpassword" oncopy="return false" onpaste="return false"
                            oncut="return false" disabled></v-text-field>

                    </v-flex>
                    <v-flex xs12 sm12 md12 class="pdt0 pdb0"  v-else>
                        <v-text-field :type="showpassword ? 'text' : 'password'" :rules="passwordRules" required
                            v-model="password" label="Password"
                            :append-icon="showpassword ? 'visibility' : 'visibility_off'"
                            @click:append="showpassword  = !showpassword" oncopy="return false" onpaste="return false"
                            oncut="return false"></v-text-field>

                    </v-flex>
                    <v-flex xs12 sm12 md12 class="pdt0 pdb0" v-if="aduser === 'fpo.go.th'" >
                        <v-text-field :type="showrepassword ? 'text' : 'password'" :rules="repasswordRules" required
                            v-model="repassword" label="Re password" :append-icon="showrepassword ? 'visibility' :
                        'visibility_off'" @click:append="showrepassword = !showrepassword" oncopy="return false"
                            onpaste="return false" oncut="return false" disabled>
                        </v-text-field>
                    </v-flex>
                    <v-flex xs12 sm12 md12 class="pdt0 pdb0" v-else>
                        <v-text-field :type="showrepassword ? 'text' : 'password'" :rules="repasswordRules" required
                            v-model="repassword" label="Re password" :append-icon="showrepassword ? 'visibility' :
                        'visibility_off'" @click:append="showrepassword = !showrepassword" oncopy="return false"
                            onpaste="return false" oncut="return false">
                        </v-text-field>
                    </v-flex>
                </v-layout>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue" v-if="aduser === 'fpo.go.th'"  outline flat  disabled>
                        <v-icon left>cached</v-icon> Reset
                    </v-btn>
                    <v-btn color="blue" v-else outline flat @click="submitRePass()" :disabled="!valid">
                        <v-icon left>cached</v-icon> Reset
                    </v-btn>
                </v-card-actions>
            </v-form>
        </v-container>
    </v-navigation-drawer>
</template>
<script>
    let cjs = require("crypto-js")
    import { Encode, Decode } from '@/services'
    export default {
        data() {
            return {
                valid: true,
                drawerResetPass: false,
                drawerEditUser: false,
                showpassword: false,
                showrepassword: false,
                passwordRules: [
                    // v => !!v || 'Password is required',
                    // v => /^[A-Za-z0-9_.]+$/.test(v) || 'Please fill in English only.'
                    v => /^((?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{8,})+$/.test(v) || 'Require at least 8 characters of capital letter, small letter and number'
                ],
                usernameRules: [
                    v => !!v || 'Username is required',
                    v => /^[A-Za-z0-9_.]+$/.test(v) || 'Please fill in English only.'
                ],
                objectives: [{
                    name: 'Investment Analyst',
                    id: 'investment'
                },
                {
                    name: 'Authority',
                    id: 'authority'
                },
                {
                    name: 'Investor',
                    id: 'investor'
                },
                {
                    name: 'Researcher',
                    id: 'researcher'
                },
                {
                    name: 'Policy maker',
                    id: 'policy'
                },
                {
                    name: 'Student',
                    id: 'student'
                },
                {
                    name: 'Others … Please specify …',
                    id: 'other'
                }

                ],
                selectedItem: [],
                objectiveRules: [
                    v => !!v || 'Please choose Usage Objective',
                ],
                otherRules: [
                    v => !!v || 'Please choose Usage Objective',
                ],
                repasswordRules: [
                    (v) => !!v || 'Password is required',
                    (v) => v === this.password || 'Password does not match',
                    // (v) => v.length >= 8 || 'Please enter more than 8 characters'
                ],
                password: '',
                repassword: '',
                aduser:[]
            }
        },
        computed: {
            userData() {
                if (this.$cookies.isKey("information")) {
                    return JSON.parse(Decode.decode(this.$cookies.get("information")));
                } else {
                    return "";
                }
            }
        },
        watch: {
            // drawerResetPass(val) {
            //   !val && this.clearDrawerResetPass()
            // },
        },
        mounted() {

        },
        methods: {

            resetPassword(data) {
                this.drawerResetPass = true
                // $('html').css('overflow-y', 'hidden')
                this.username = data.username
                this.firstName = data.firstname
                this.lastName = data.lastname
                this.getAD()
            },
            getAD() {
                var param = this.username
                var name1 = param.split('@')

                this.aduser = name1[1]
                // console.log(this.aduser );

            },
            clearDrawerResetPass() {
                this.drawerResetPass = false
                this.password = null
                this.repassword = null
                // $('html').css('overflow-y', 'auto')
            },
            submitRePass() {
                var msg = cjs.enc.Utf8.parse(this.repassword)
                var key = cjs.enc.Utf8.parse(process.env.VUE_APP_SECRETKEY)
                var passwordEncrypt = cjs.enc.Hex.stringify(cjs.HmacSHA256(msg, key))
                var user = Encode.encode(JSON.stringify(this.userData));
                var me = this
                this.$swal({
                    title: 'Are you sure?',
                    text: 'You want to reset password?',
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, I do!'
                }).then(function (result) {
                    me.axios.post(process.env.VUE_APP_API_BACKEND + '/ChangePasswordByAdmin',
                        {
                            user: user,
                            username: me.username,
                            new_password: passwordEncrypt
                        }).then((response) => {
                            // console.log(response);
                            if (response.data.status === 'Success') {

                                me.$swal(
                                    'Reset Password successfully', '', 'success'
                                ).then(response => {
                                    me.clearDrawerResetPass()
                                    me.$emit('ResetPasswordByadmin', "ResetPasswordByadmin")
                                })

                            } else {
                                me.$swal(response.data, '', 'error')
                            }
                            // window.location.reload()
                            me.getUser()
                        })
                })
            },
        }
    }
</script>