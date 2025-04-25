<template>
    <v-layout row justify-center>
        <v-dialog v-model="DialogAddGroupInReports" fullscreen hide-overlay transition="dialog-bottom-transition">
            <v-card>
                <v-toolbar class="light-blue darken-4 white--text color-card-title" dense>
                    <v-btn icon dark @click="close()">
                        <v-icon>close</v-icon>
                    </v-btn>
                    <v-toolbar-title>{{ $t('addgroupinreport') }}</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <!-- <v-toolbar-items>
                        <v-btn dark flat @click="dialog = false">Save</v-btn>
                    </v-toolbar-items> -->
                </v-toolbar>
                <v-container>
                    <v-layout row wrap>
                        <v-flex xs12 md2>
                            <v-subheader>{{ $t('rolename') }}: </v-subheader>
                        </v-flex>
                        <v-flex xs12 md6>
                            <v-subheader><b>{{report.export_excel_name}}</b></v-subheader>

                            <!-- <v-text-field v-model="report.export_excel_name" readonly></v-text-field> -->
                        </v-flex>
                        <v-flex xs12 md12>
                            <v-divider></v-divider>
                        </v-flex>
                        <v-flex xs12 sm12 md6 lg6 xl6 class="pa-2">
                            <v-card-title>
                                <p class="subheading">
                                    <v-icon left class="mr-2" color="light-blue darken-4">label</v-icon>{{ $t('group') }}
                                </p>
                                <v-spacer></v-spacer>
                                <v-text-field v-model="searchGroupinreport" append-icon="search" :label="$t('search')" 
                                    single-line hide-details></v-text-field>
                            </v-card-title>
                            <v-data-table :headers="headersUser" :items="GroupinReport" :search="searchGroupinreport">
                                <template v-slot:items="props">
                                    <td class="text-xs-left">{{ props.item.group_name }}</td>
                                    <td class="text-xs-left">{{ props.item.org_name }}</td>
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
                                    <v-icon left color="light-blue darken-4">label</v-icon>{{ $t('addgroup') }}
                                </p>
                                <v-spacer></v-spacer>
                                <v-text-field v-model="search" append-icon="search" :label="$t('search')"  single-line
                                    hide-details></v-text-field>
                            </v-card-title>
                            <v-data-table :headers="localizedHeadersUser" :items="addGroupinReport" :search="search">
                                <template v-slot:items="props">
                                    <td class="text-xs-left">{{ props.item.group_name }}</td>
                                    <td class="text-xs-left">{{ props.item.org_name }}</td>
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
                DialogAddGroupInReports: false,
                getRoles: [],
                addGroupinReport: [],
                GroupinReport: [],
                rolesName: '',
                valid: true,
                search: '',
                searchGroupinreport: '',
                report: '',
                // headersUser: [
                //     {
                //         text: 'Group Name',
                //         align: 'left',
                //         sortable: false,
                //         value: 'group_name'
                //     },
                //     {
                //         text: 'Organization',
                //         align: 'left',
                //         sortable: false,
                //         value: 'org_name'
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
        text: this.$t('groupname'),  // ใช้คีย์สำหรับการแปล
        align: 'left',
        sortable: false,
        value: 'group_name'
      },
      {
        text: this.$t('org'),  // ใช้คีย์สำหรับการแปล
        align: 'left',
        sortable: false,
        value: 'org_name'
      },
      {
        text: '',
        align: 'center',
        sortable: false
      }
    ];
  }
        },
        methods: {
            open(data) {
                // console.log(data);
                this.report = data
                this.DialogAddGroupInReports = true;
                this.getGroupNotInReport()
                this.getGroupInReport()

            },
            close() {
                this.DialogAddGroupInReports = false;
            },
            //  addUser (data, index) {
      
            //     this.addGroupinReport.splice(index, 1)
            //     this.GroupinReport.push(data)
            // },      removeUser (data, index) {
            //     this.addGroupinReport.push(data)
            //     this.GroupinReport.splice(index, 1)
            // },
            addUser (data) {
  // ใช้ filter เพื่อลบเฉพาะผู้ใช้ที่มี username ตรงกับที่คุณต้องการลบ
  this.addGroupinReport = this.addGroupinReport.filter(group_name => group_name.group_name !== data.group_name);
  
  // เพิ่มผู้ใช้ที่ถูกลบกลับไปยัง GroupinReport
  this.GroupinReport.push(data);

  console.log('GroupinReport after adding:', this.GroupinReport);
  console.log('addGroupinReport after removing:', this.addGroupinReport);
},

removeUser (data) {
  // ใช้ filter เพื่อลบเฉพาะผู้ใช้ที่มี username ตรงกับที่คุณต้องการลบ
  this.GroupinReport = this.GroupinReport.filter(group_name => group_name.group_name !== data.group_name);
  
  // เพิ่มผู้ใช้ที่ถูกลบกลับไปยัง addGroupinReport
  this.addGroupinReport.push(data);

  console.log('GroupinReport after removing:', this.GroupinReport);
  console.log('addGroupinReport after adding back:', this.addGroupinReport);
},

            //switch side
            // addUser(data, index) {
            //     // console.log(data);
            //     this.GroupinReport.push(data)
            //     this.addGroupinReport.splice(index, 1)
            //     var user = Encode.encode(JSON.stringify(this.userData));
            //     this.axios.post(process.env.VUE_APP_API_BACKEND + '/addGroupToReport', {
            //         'group_name': data.group_name,
            //         'user': user,
            //         'source_id': this.report.source_id,
            //     }).then((response) => {
            //         // this.addUsers = response.data.data
            //         // console.log(response);
            //         this.getGroupInReport()

            //     })

            // },
            // removeUser(data, index) {
            //     this.addGroupinReport.push(data)
            //     this.GroupinReport.splice(index, 1)
            //     var user = Encode.encode(JSON.stringify(this.userData));
            //     this.axios.post(process.env.VUE_APP_API_BACKEND + '/deleteGroupToReport', {
            //         'group_name': data.group_name,
            //         'user': user,
            //         'source_id': this.report.source_id,
            //     }).then((response) => {
            //         // this.addUsers = response.data.data
            //         // console.log(response);
            //         this.getGroupNotInReport()

            //     })
            // },
            Update() {
                    var user = Encode.encode(JSON.stringify(this.userData));
                    this.axios.post(process.env.VUE_APP_API_BACKEND + '/updateGroupToReport', {
                        'group': this.GroupinReport,
                        'user_data': user,
                        'source_id': this.report.source_id,
                         
                    
                 }).then((response) => {
            if (response.data.status === 'success') {
                this.closeDialogAddusers()
                    // this.dialogEdit = false
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
                this.GroupinReport = []
            },

            getGroupNotInReport() {
                // console.log('kkkkkkkkkkkkkkkkkkkkkk');
                // console.log(this.groupName.group_name);
                var user = Encode.encode(JSON.stringify(this.userData));
                this.axios.post(process.env.VUE_APP_API_BACKEND + '/getGroupNotInReport', {
                    'source_id': this.report.source_id,
                    'user': user,
                }).then((response) => {
                    this.addGroupinReport = response.data.data
                // this.addGroupinReport = [{ "group_user_id": 17, "group_name": "All Report" },
                // { "group_user_id": 20, "group_name": "RAOT group 1" },]
                // console.log(this.addGroupinReport);
                })
            },
            getGroupInReport() {
                // console.log('kkkkkkkkkkkkkkkkkkkkkk');
                // console.log(this.groupName.group_name);
                var user = Encode.encode(JSON.stringify(this.userData));
                this.axios.post(process.env.VUE_APP_API_BACKEND + '/getGroupInReport', {
                    'source_id': this.report.source_id,
                    'user': user,
                }).then((response) => {
                    this.GroupinReport = response.data.data
                    // this.GroupinReport = [
                    // { "group_user_id": 20, "group_name": "RAOT group 2" },]
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
