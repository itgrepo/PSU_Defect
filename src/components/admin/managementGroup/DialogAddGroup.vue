<template>
    <v-layout row justify-center>
        <v-dialog v-model="dialogAddUsersGroup" fullscreen hide-overlay transition="dialog-bottom-transition">
            <v-card>
                <v-toolbar class="light-blue darken-4 white--text color-card-title" dense>
                    <v-btn icon dark @click="close()">
                        <v-icon>close</v-icon>
                    </v-btn>
                    <v-toolbar-title>{{ $t('adduseringroup') }}</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <!-- <v-toolbar-items>
                        <v-btn dark flat @click="dialog = false">Save</v-btn>
                    </v-toolbar-items> -->
                </v-toolbar>
                <v-container>
                    <v-layout row wrap>
                        <v-flex xs12 md3>
                            <v-subheader>{{ $t('groupname') }}: </v-subheader>
                        </v-flex>
                        <v-flex xs12 md6>
                            <v-subheader><b>{{groupName.group_name}}</b></v-subheader>
                            <!-- <v-text-field v-model="groupName.group_name" readonly></v-text-field> -->
                        </v-flex>
                        <v-flex xs12 md12>
                            <v-divider></v-divider>
                        </v-flex>
                        <v-flex xs12 sm12 md6 lg6 xl6 class="pa-2">
                            <v-card-title>
                                <p class="subheading">
                                    <v-icon left class="mr-2" color="light-blue darken-4">label</v-icon>Users
                                </p>
                                
                            </v-card-title>

                            <v-data-table :headers="localizedHeadersUser" :items="userRoles">
                                <template v-slot:items="props">
                                    <td class="text-xs-center">{{ props.item.username }}</td>
                                    <!-- <td class="text-xs-center">{{ props.item.email }}</td> -->
                                    <td class="text-xs-center">
                                        <v-btn small icon color="error" @click="removeUser(props.item,props.index)">
                                            <v-icon>remove</v-icon>
                                        </v-btn>
                                    </td>
                                </template>
                                <template v-slot:no-results>
                                    <v-alert :value="true" color="error" icon="warning">
                                        {{ $t('searchfor') }} "{{ search }}" {{ $t('foundno') }}
                                    </v-alert>
                                </template>
                            </v-data-table>

                        </v-flex>
                        <v-flex xs12 sm12 md6 lg6 xl6 class="pa-2">
                            <v-card-title>
                                <p class="subheading">
                                    <v-icon left color="light-blue darken-4">label</v-icon>{{ $t('adduser') }} </p>
                                <v-spacer></v-spacer>
                                <v-text-field v-model="search" append-icon="search" :label="$t('search')"  single-line
                                    hide-details></v-text-field>
                            </v-card-title>
                            <v-data-table :headers="localizedHeadersUser" :items="addUsers" :search="search">
                                <template v-slot:items="props">
                                    <td class="text-xs-center">{{ props.item.username }}</td>
                                    <!-- <td class="text-xs-center">{{ props.item.email }}</td> -->
                                    <td class="text-xs-center">
                                        <v-btn small icon color="success" @click="addUser(props.item,props.index)">
                                            <v-icon>add</v-icon>
                                        </v-btn>
                                    </td>
                                </template>
                                <template v-slot:no-results>
                                    <v-alert :value="true" color="error" icon="warning">
                                        {{ $t('searchfor') }} "{{ search }}" {{ $t('foundno') }}
                                    </v-alert>
                                </template>
                            </v-data-table>
                        </v-flex>
                    </v-layout>
                    <v-flex offset-xs10 pb-4><v-btn color="success" :disabled="!valid" @click="Update()">{{ $t('save') }}</v-btn></v-flex>
                </v-container>
            </v-card>
        </v-dialog>
    </v-layout>
</template>
<script>
    import { Encode, Decode } from "@/services";
    export default {
        data() {
            return {
                dialogAddUsersGroup: false,
                getRoles: [],
                addUsers: [],
                userRoles: [],
                rolesName: '',
                valid: true,
                search: '',
                groupName: '',
                // headersUser: [
                //     {
                //         text: 'Username',
                //         align: 'center',
                //         sortable: false,
                //         value: 'username'
                //     },
                //     // {
                //     //     text: 'Email',
                //     //     align: 'center',
                //     //     sortable: false,
                //     //     value: 'previlage_name'
                //     // },
                //     {
                //         text: '',
                //         align: 'center',
                //         sortable: false
                //     }
                // ],
            }
        },
        created() {
            this.getRolesPermission()
        },
        mounted() {

            this.getRolesPermission()
        },
        computed: {
            userData() {
                if (this.$cookies.isKey('information')) {
                    return JSON.parse(Decode.decode(this.$cookies.get('information')))
                } else {
                    return ''
                }
            },
            localizedHeadersUser() {
    return [
      {
        text: this.$t('username'), // คำแปลจาก i18n
        align: 'center',
        sortable: false,
        value: 'username'
      },
      {
        text: '', // คงไว้แบบนี้หากไม่ต้องการแสดงข้อความ
        align: 'center',
        sortable: false
      }
    ];
  }
        },
        methods: {
            open(data) {
                // console.log(data);
                this.groupName = data
                this.dialogAddUsersGroup = true;
                this.getUserInGroup()
                this.getUserNotInGroup()
            },
            close() {
                this.dialogAddUsersGroup = false;
            },
    //         addUser (data, index) {
      
    //             this.addUsers.splice(index, 1)
    //             this.userRoles.push(data)
    // },
    //         removeUser (data, index) {
    //             this.addUsers.push(data)
    //             this.userRoles.splice(index, 1)
    // },
    addUser(data) {
  // ลบผู้ใช้จาก addUsers โดยใช้ filter เพื่อค้นหาผู้ใช้ที่ตรงกับ data
  this.addUsers = this.addUsers.filter(user => user.username !== data.username);

  // เพิ่มผู้ใช้ลงใน userRoles
  this.userRoles.push(data);
},

removeUser(data) {
  // ลบผู้ใช้จาก userRoles โดยใช้ filter เพื่อค้นหาผู้ใช้ที่ตรงกับ data
  this.userRoles = this.userRoles.filter(user => user.username !== data.username);

  // เพิ่มผู้ใช้ลงใน addUsers
  this.addUsers.push(data);
},
           
            // addUser(data, index) {
            //     // console.log(data);
            //     this.userRoles.push(data)
            //     this.addUsers.splice(index, 1)
            //     var user = Encode.encode(JSON.stringify(this.userData));
            //     this.axios.post(process.env.VUE_APP_API_BACKEND + '/addUserToGroup', {
            //         'group_name': this.groupName.group_name,
            //         'user': user,
            //         username: data.username,
            //         email: data.email
            //         // group_name
            //     }).then((response) => {
            //         // this.addUsers = response.data.data
            //         // console.log(response);
            //         this.getUserInGroup()

            //     })

            // },
            // removeUser(data, index) {
            //     this.addUsers.push(data)
            //     this.userRoles.splice(index, 1)
            //     var user = Encode.encode(JSON.stringify(this.userData));
            //     this.axios.post(process.env.VUE_APP_API_BACKEND + '/deleteUserInGroup', {
            //         'group_name': this.groupName.group_name,
            //         'user': user,
            //         username: data.username,
            //         email: data.email
            //         // group_name
            //     }).then((response) => {
            //         // this.addUsers = response.data.data
            //         // console.log(response);
            //         this.getUserNotInGroup()

            //     })
            // },
            // save() {
            //     if (this.rolesName !== '') {
            //         this.axios.post(process.env.VUE_APP_API_BACKEND + '/upadteStatusPrevilage',
            //             {
            //                 'data': this.userRoles,
            //                 'rolesName': this.rolesName
            //             }
            //         ).then((response) => {
            //             if (response.status === 'success') {
            //                 this.closeDialogAddusers()
            //                 this.reloadPage()
            //             } else if (response.status === 'Permission denied') {
            //                 this.$swal('Permission denied', ' ', 'warning')
            //             } else {
            //                 this.$swal('error', ' ', 'error')
            //             }
            //         })
            //     } else {
            //         this.$swal('Rule Name is required', ' ', 'warning')
            //     }
            // },
                 Update() {
                    var user = Encode.encode(JSON.stringify(this.userData));
                    this.axios.post(process.env.VUE_APP_API_BACKEND + '/updateUserInGroup', {
                    'group_name': this.groupName.group_name,
                    'group_id':this.groupName.group_id,
                    'user': this.userRoles,
                    'user_data': user,
                   
                   
                         }).then((response) => {
               if (response.data.status === 'success') {
                 this.closeDialogAddusers()
            
                    this.$swal('Edit Role is success', ' ', 'success')

                    this.close()
                 }
            })
            },
            reloadPage() {
                window.location.reload()
            },
            closeDialogAddusers() {
                this.dialogAddUsers = false
                this.userRoles = []
            },
            // getRolesPermission() {
            //     this.axios.post(process.env.VUE_APP_API_BACKEND + '/mgmt/getRoles',).then((response) => {
            //         console.log(response.data);
            //         this.getRoles = response.data
            //     })
            // },
            getUserNotInGroup() {
                // console.log('kkkkkkkkkkkkkkkkkkkkkk');
                // console.log(this.groupName.group_name);
                var user = Encode.encode(JSON.stringify(this.userData));
                this.axios.post(process.env.VUE_APP_API_BACKEND + '/getUserNotInGroup', {
                    'group_name': this.groupName.group_name,
                    'user': user,
                }).then((response) => {
                    this.addUsers = response.data.data
                    // this.addUsers = [{ "email": "boone@gmail.com", "email_news": 1, "firstname": "Rubber", "lastname": "Authority", "login_respond": "2021-05-19 10:22:44", "other_object": "", "previlage_id": 'User', "send_QR": "", "status_id": 2, "status_name": "Active", "two_factor_authen": "on", "type_user": "AD", "usage_objective": "authority", "user_id": 103, "username": "Boone" },
                    // { "email": "user4@gmail.com", "email_news": 1, "firstname": "Rubber", "lastname": "Authority", "login_respond": "2021-05-17 13:03:45", "other_object": "", "previlage_id": 'User', "send_QR": "", "status_id": 1, "status_name": "Offline", "two_factor_authen": "off", "type_user": "AD", "usage_objective": "authority", "user_id": 102, "username": "user4" },]
                   
                    // console.log(response);
                })
            },
            getUserInGroup() {
                // console.log('kkkkkkkkkkkkkkkkkkkkkk');
                // console.log(this.groupName.group_name);
                var user = Encode.encode(JSON.stringify(this.userData));
                this.axios.post(process.env.VUE_APP_API_BACKEND + '/getUserInGroup', {
                    'group_name': this.groupName.group_name,
                    'user': user,
                }).then((response) => {
                    this.userRoles = response.data.data
                    // this.userRoles = [
                    // { "email": "RubberAuthority@mail.com", "email_news": 1, "firstname": "Rubber", "lastname": "Authority", "login_respond": "2021-07-07 09:38:14", "other_object": "", "previlage_id": 'Admin', "send_QR": "", "status_id": 2, "status_name": "Active", "two_factor_authen": "off", "type_user": "DataX", "usage_objective": "policy", "user_id": 105, "username": "Rubber" },
                    // { "email": "chet@gmail.com", "email_news": 1, "firstname": "Rubber", "lastname": "Authority", "login_respond": "2021-06-24 10:36:40", "other_object": "", "previlage_id": 'User', "send_QR": "", "status_id": 1, "status_name": "Offline", "two_factor_authen": "off", "type_user": "DataX", "usage_objective": "authority", "user_id": 104, "username": "Chet" },
                    
                // ]
                    // console.log(response);
                })
            },
            formatDate(datetime) {
                var date = new Date(datetime)
                var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
                var month = (date.getMonth()) + 1 < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)
                var year = date.getFullYear()
                var hours = date.getHours();
                var minutes = date.getMinutes();
                minutes = minutes < 10 ? '0' + minutes : minutes;
                var strTime = hours + ':' + minutes + ' ';
                return day + '-' + month + '-' + year + " " + strTime;
            }
        
    }
    }
</script>

<style lang="css">
</style>
