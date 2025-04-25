<template>
    <v-navigation-drawer v-model="drawerEditUser" app temporary right stateless>
        <v-toolbar flat class="grey lighten-3">
            <v-list class="pa-0">
                <v-list-tile>
                    <v-list-tile-content>
                        <v-list-tile-title>{{ $t('edituserprofile') }}</v-list-tile-title>
                    </v-list-tile-content>
                    <v-spacer></v-spacer>
                    <v-list-tile-action>
                        <v-btn color="red" flat icon @click="cleardrawerEditUser()">
                            <v-icon color="red">clear</v-icon>
                        </v-btn>
                    </v-list-tile-action>
                </v-list-tile>
            </v-list>
        </v-toolbar>
        <v-divider></v-divider>
        <v-container grid-list-md>
            <v-form v-model="valid" ref="formAddUser" lazy-validation v-if="type_user == 'AD'">
                <v-layout wrap>
                    <v-flex xs12 sm12 md12 class="pdb0">
                        <v-text-field :label="$t('username')" v-model="username" disabled></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm12 md12 class="pdt0 pdb0">
                        <v-text-field :label="$t('firstname')" v-model="firstName" disabled>
                        </v-text-field>
                    </v-flex>
                    <v-flex xs12 sm12 md12 class="pdt0 pdb0">
                        <v-text-field :label="$t('lastname')" v-model="lastName" disabled></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm12 md12 class="pdt0 pdb0">
                        <v-text-field :label="$t('email')" v-model="email" disabled></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm12 md12 class="pdt0 pdb0" >
                        <v-select :items="objectives" item-value="id" v-model="usage_objective" item-text="name"
                        :label="$t('usageojt')" :rules="[v => !!v || 'Item is required']" required disabled>
                        </v-select>
                        <v-text-field v-if="usage_objective === 'other'" class="mt-3" :label="$t('others')"
                            color="light-blue darken-4" clearable v-model="other_object" :rules="otherRules"
                            maxLength="255" :counter="255" required disabled>
                        </v-text-field>
                    </v-flex>
                </v-layout>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue" outline flat @click="save()" :disabled="!valid" disabled>
                        <v-icon left>save</v-icon> {{ $t('save') }}
                    </v-btn>
                </v-card-actions>
            </v-form>
            <v-form v-model="valid" ref="formAddUser" lazy-validation v-else-if="type_user == 'DataX'">
                <v-layout wrap>
                    <v-flex xs12 sm12 md12 class="pdb0">
                        <v-text-field label="Username" v-model="username" disabled></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm12 md12 class="pdt0 pdb0">
                        <v-text-field label="First name" v-model="firstName" >
                        </v-text-field>
                    </v-flex>
                    <v-flex xs12 sm12 md12 class="pdt0 pdb0">
                        <v-text-field label="Last name" v-model="lastName" ></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm12 md12 class="pdt0 pdb0">
                        <v-text-field label="E-mail" v-model="email"></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm12 md12 class="pdt0 pdb0">
                        <v-select :items="objectives" item-value="id" v-model="usage_objective" item-text="name"
                            label="Usage Objective" :rules="[v => !!v || 'Item is required']" required>
                        </v-select>
                        <v-text-field v-if="usage_objective === 'other'" class="mt-3" label="Others"
                            color="light-blue darken-4" clearable v-model="other_object" :rules="otherRules"
                            maxLength="255" :counter="255" required>
                        </v-text-field>
                    </v-flex>
                </v-layout>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue" outline flat @click="save()" :disabled="!valid">
                        <v-icon left>save</v-icon> Save
                    </v-btn>
                </v-card-actions>
            </v-form>
        </v-container>
    </v-navigation-drawer>
</template>
<script>
    import { Encode, Decode } from "@/services";
    export default {
        data() {
            return {
                drawerResetPass: false,
                drawerEditUser: false,
                showpassword: false,
                usage_objective: [],
                valid: true,
                fnameRules: [
                    v => !!v || 'Firstname is required',
                    v => /^([A-z])+$/.test(v) || 'Please fill in English only.'
                ],
                lnameRules: [
                    v => !!v || 'Lastname is required',
                    v => /^([A-z])+$/.test(v) || 'Please fill in English only.'
                ],

                emailRules: [
                    // v => !!v || 'Email is required',
                    // v => !!v || 'Please fill in the email',
                    v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'Invalid email format'
                ],

                objectiveRules: [
                    v => !!v || 'Please choose Usage Objective',
                ],
                otherRules: [
                    v => !!v || 'Please choose Usage Objective',
                ],

                passwordRules: [
                    v => !!v || 'Password is required',
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
                username: '',
                firstName: '',
                lastName: '',
                email: null,
                other_object: '',
                type_user:''

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
            EditUser(data) {
                // console.log(data);
                this.drawerEditUser = true
                // $('html').css('overflow-y', 'hidden')
                this.username = data.username
                this.firstName = data.firstname
                this.email = data.email
                this.lastName = data.lastname
                this.usage_objective = data.usage_objective
                this.other_object = data.other_object
                this.type_user = data.type_user
                // this.lastName = data.lastname
                // this.lastName = data.lastname

            },
            cleardrawerEditUser() {
                this.drawerEditUser = false
                // $('html').css('overflow-y', 'auto')
            },
            save() {
                var user = Encode.encode(JSON.stringify(this.userData));
                if (this.email === '') {
                    // console.log('Email === "   "');
                    if (this.usage_objective === 'other') {
                        this.axios
                            .post(process.env.VUE_APP_API_BACKEND + "/EditUserProfileByAdmin", {
                                user: user,
                                username: this.username,
                                firstname: this.firstName,
                                lastname: this.lastName,
                                email: null,
                                usage_objective: this.usage_objective,
                                other_object: this.other_object,
                                link: process.env.VUE_APP_LINK
                            })
                            .then(response => {
                                // console.log(response);
                                if (response.data.status === 'success') {
                                    this.$swal("save success", "", "success").then(response => {

                                        this.$emit('EditUserByadmin', "response.data")
                                        this.drawerEditUser = false
                                    }
                                    );
                                } else if (response.data.status === 'email is duplicate') {
                                    this.$swal("Email is duplicate", "", "error").then(response => {
                                        this.email = ''
                                    })
                                } else if (response.data.status === 'email success') {
                                    this.$swal("save success", "", "success").then(response => {

                                        this.$emit('EditUserByadmin', "response.data")
                                        this.drawerEditUser = false
                                    }
                                    );
                                }
                                else {
                                    this.$swal("ERROR", "", "error")

                                }
                            });
                    } else {
                        this.axios
                            .post(process.env.VUE_APP_API_BACKEND + "/EditUserProfileByAdmin", {
                                user: user,
                                username: this.username,
                                firstname: this.firstName,
                                lastname: this.lastName,
                                email: null,
                                usage_objective: this.usage_objective,
                                other_object: null,
                                link: process.env.VUE_APP_LINK
                            })
                            .then(response => {
                                // console.log(response);
                                if (response.data.status === 'success') {
                                    this.$swal("save success", "", "success").then(response => {

                                        this.$emit('EditUserByadmin', "response.data")
                                        this.drawerEditUser = false
                                    }
                                    );
                                } else if (response.data.status === 'email is duplicate') {
                                    this.$swal("Email is duplicate", "", "error").then(response => {
                                        this.email = ''
                                    })
                                } else if (response.data.status === 'email success') {
                                    this.$swal("save success", "", "success").then(response => {

                                        this.$emit('EditUserByadmin', "response.data")
                                        this.drawerEditUser = false
                                    });
                                }
                                else {
                                    this.$swal("ERROR", "", "error")

                                }
                            });
                    }
                } else {
                    // console.log('555');
                    if (this.usage_objective === 'other') {
                        this.axios
                            .post(process.env.VUE_APP_API_BACKEND + "/EditUserProfileByAdmin", {
                                user: user,
                                username: this.username,
                                firstname: this.firstName,
                                lastname: this.lastName,
                                email: this.email.toLowerCase(),
                                usage_objective: this.usage_objective,
                                other_object: this.other_object,
                                link: process.env.VUE_APP_LINK
                            })
                            .then(response => {
                                // console.log(response);
                                if (response.data.status === 'success') {
                                    this.$swal("save success", "", "success").then(response => {

                                        this.$emit('EditUserByadmin', "response.data")
                                        this.drawerEditUser = false
                                    }
                                    );
                                } else if (response.data.status === 'email is duplicate') {
                                    this.$swal("Email is duplicate", "", "error").then(response => {
                                        this.email = ''
                                    })
                                } else if (response.data.status === 'email success') {
                                    this.$swal("save success", "", "success").then(response => {

                                        this.$emit('EditUserByadmin', "response.data")
                                        this.drawerEditUser = false
                                    });
                                }
                                else {
                                    this.$swal("ERROR", "", "error")

                                }
                            });
                    } else {
                        this.axios
                            .post(process.env.VUE_APP_API_BACKEND + "/EditUserProfileByAdmin", {
                                user: user,
                                username: this.username,
                                firstname: this.firstName,
                                lastname: this.lastName,
                                email: this.email,
                                usage_objective: this.usage_objective,
                                other_object: null,
                                link: process.env.VUE_APP_LINK
                            })
                            .then(response => {
                                // console.log(response);
                                if (response.data.status === 'success') {
                                    this.$swal("save success", "", "success").then(response => {

                                        this.$emit('EditUserByadmin', "response.data")
                                        this.drawerEditUser = false
                                    }
                                    );
                                }
                                else if (response.data.status === 'email is duplicate') {
                                    this.$swal("Email is duplicate", "", "error").then(response => {
                                        this.email = ''
                                    })
                                } else if (response.data.status === 'email success') {
                                    this.$swal("save success", "", "success").then(response => {

                                        this.$emit('EditUserByadmin', "response.data")
                                        this.drawerEditUser = false
                                    });
                                }
                                else {
                                    this.$swal("ERROR", "", "error")

                                }
                            });
                    }
                }


            },
            reloadPage() {
                window.location.reload();
            },


        }
    }
</script>