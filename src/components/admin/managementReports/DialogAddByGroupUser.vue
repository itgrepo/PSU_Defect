<template>
    <v-layout row justify-center>
        <v-dialog v-model="DialogAddByGroupUser" fullscreen hide-overlay transition="dialog-bottom-transition">
            <v-card>
                <v-toolbar dark color="primary">
                    <v-btn icon dark @click="close()">
                        <v-icon>close</v-icon>
                    </v-btn>
                    <v-toolbar-title>{{ $t('addbyuser') }}</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-toolbar-items>
                        <v-btn dark flat @click="close()">{{ $t('exit') }}</v-btn>
                    </v-toolbar-items>
                </v-toolbar>
                <v-container>
                    <v-layout row wrap>
                        <v-flex xs12 md12>
                            <h3>{{ $t('groupReportName') }} : &nbsp;{{groupUserName.group_report_name}}</h3>
                        </v-flex>
                        <v-flex xs12 md6>
                            <v-subheader><b></b></v-subheader>
                            <!-- <v-text-field v-model="groupUserName.group_report_name" readonly></v-text-field> -->
                        </v-flex>
                        <v-flex xs12 md12>
                            <v-divider></v-divider>
                        </v-flex>
                        <v-flex xs12 sm12 md6 lg6 xl6 class="pa-2">
                            <v-card-title>
                                <p class="subheading">
                                    <v-icon left class="mr-2" color="light-blue darken-4">label</v-icon>{{ $t('user') }}
                                </p>
                                <v-spacer></v-spacer>
                                <v-text-field v-model="searchReportsRoles" append-icon="search" :label="$t('search')"
                                    single-line hide-details></v-text-field>
                            </v-card-title>

                            <v-data-table v-model="selectedReport" :headers="headers" :items="ReportsRoles" select-all
                                :search="searchReportsRoles" item-key="username" class="elevation-1"
                                :loading="loadingReportsRoles"
                                :rows-per-page-items="[10, 25, 50, { text: 'All', value: -1 }]"
                                :rows-per-page-text="$t('rowsPerPageLabel')"
                                >
                                <template v-slot:headers="props">
                                    <tr>
                                        <th>
                                            <v-checkbox :input-value="props.all" :indeterminate="props.indeterminate"
                                                primary hide-details @click.stop="toggleAllReport"></v-checkbox>
                                        </th>
                                        <th v-for="header in props.headers" :key="header.text">

                                            {{ header.text }}
                                        </th>
                                    </tr>
                                </template>
                                <template v-slot:items="props">
                                    <tr :active="props.selected" @click="props.selected = !props.selected">
                                        <td>
                                            <v-checkbox :input-value="props.selected" primary hide-details></v-checkbox>
                                        </td>

                                        <td  class="text-xs-center">{{ props.item.username }}</td>
                                        <td  class="text-xs-left">{{ props.item.org_name }}</td>
                                    </tr>
                                </template>
                            </v-data-table>
                            <!-- <v-card class="mx-auto mt-2" v-if="selectedReport != ''"> -->
                                <!-- <pre>{{}}</pre> -->
                                <!-- <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn v-if="selectedReport.length > 10" color="warning"
                                        @click="deleteGroupReportInUser(selectedReport)">
                                        <v-icon left>delete</v-icon> delete
                                    </v-btn>
                                </v-card-actions> -->
                                <!-- <pre>{{props.selected.length}}</pre> -->
                                <!-- <div > -->
                                    <!-- <pre></pre> -->
                                    <!-- <v-chip v-for="items in selectedReport" class="ma-2 pa-2" md="4" color="error" text-color="white" label outlined>
                                        <v-icon left>person</v-icon>
                                        <span class="text-test">{{items.username}}</span>
                                    </v-chip> -->
                                    <!-- <br> -->
                                <!-- </div> -->
                                <!-- <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn v-if="selectedReport.length <= 10" color="warning"
                                        @click="deleteGroupReportInUser(selectedReport)">
                                        <v-icon left>delete</v-icon> delete
                                    </v-btn>
                                    </v-btn>
                                </v-card-actions> -->
                            <!-- </v-card> -->

                        </v-flex>
                        <v-flex xs12 sm12 md6 lg6 xl6 class="pa-2">
                            <v-card-title>
                                <p class="subheading">
                                    <v-icon left color="light-blue darken-4">label</v-icon>{{ $t('adduser') }}
                                </p>
                                <v-spacer></v-spacer>
                                <v-text-field v-model="search" append-icon="search" :label="$t('search')"  single-line
                                    hide-details></v-text-field>
                            </v-card-title>


                            <v-data-table v-model="selected" :headers="headers" :items="addReports" select-all
                                :search="search" item-key="username" class="elevation-1" :loading="loading"
                                :rows-per-page-items="[10, 25, 50, { text: 'All', value: -1 }]"
                                :rows-per-page-text="$t('rowsPerPageLabel')"
                                >
                                <template v-slot:headers="props">
                                    <tr>
                                        <th>
                                            <v-checkbox :input-value="props.all" :indeterminate="props.indeterminate"
                                                primary hide-details @click.stop="toggleAll"></v-checkbox>
                                        </th>
                                        <th v-for="header in props.headers" :key="header.text">

                                            {{ header.text }}
                                        </th>
                                    </tr>
                                </template>
                                <template v-slot:items="props">
                                    <tr :active="props.selected" @click="props.selected = !props.selected">
                                        <td>
                                            <v-checkbox :input-value="props.selected" primary hide-details></v-checkbox>
                                        </td>
                                        <td  class="text-xs-center">{{ props.item.username }}</td>
                                        <td  class="text-xs-left">{{ props.item.org_name }}</td>
                                    </tr>
                                </template>
                            </v-data-table>
                            <!-- <v-spacer></v-spacer> -->
                            <!-- <v-col sm="6" md="6"> -->
                            <!-- <v-card class="mx-auto mt-2" v-if="selected != ''"> -->

                                <!-- <v-card-actions> -->
                                    <!-- <v-spacer></v-spacer> -->
                                    <!-- <v-btn color="success" v-if="selected.length > 10"
                                        @click="addGroupReportToUser(selected)">
                                        <v-icon left>save</v-icon> save
                                    </v-btn> -->
                                <!-- </v-card-actions> -->
                                <!-- <pre>{{props.selected}}</pre> -->
                                <!-- <div> -->

                                    <!-- <v-chip  v-for="items in selected" class="ma-2 pa-2" color="info" text-color="white" label outlined>
                                        <v-icon left>person</v-icon>
                                        <span class="text-test">
                                            {{items.username}}
                                        </span>
                                    </v-chip> -->
                                    <!-- <br> -->
                                <!-- </div> -->
                                <!-- <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn color="success" v-if="selected.length <= 10"
                                        @click="addGroupReportToUser(selected)">
                                        <v-icon left>save</v-icon> save
                                    </v-btn>
                                </v-card-actions> -->
                            <!-- </v-card> -->
                            <!-- </v-col> -->
                        </v-flex>
                    </v-layout>
                    <v-flex offset-xs10 pb-4><v-btn color="success" :disabled="!valid" @click="deleteGroupReportInUser(selectedReport),addGroupReportToUser(selected)">Save</v-btn></v-flex>
                </v-container>
            </v-card>
        </v-dialog>
        <v-dialog v-model="dialogloading" overlay persistent width="300">
            <v-card color="primary">

                <v-progress-linear indeterminate color="#fff" class="mb-0 mt-0"></v-progress-linear>

            </v-card>
        </v-dialog>
    </v-layout>
</template>
<script>
    import { Encode, Decode } from "@/services";
    export default {
        data() {
            return {
                dialogloading: false,
                loadingReportsRoles: true,
                loading: true,
                selected: [],
                selectedReport: [],
                DialogAddByGroupUser: false,
                getRoles: [],
                addReports: [],
                ReportsRoles: [],
                rolesName: '',
                valid: true,
                search: '',
                searchReportsRoles: '',
                groupUserName: '',
                // headers: [
                //     {
                //         text: 'Username',
                //         align: 'center',
                //         value: 'username'
                //     },
                //     {
                //         text: 'Organization',
                //         align: 'left',
                //         value: 'org_name'
                //     },
                // ],

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
            // deleteGroupReportInUser(DataDelete) {
            //     this.dialogloading = true
            //     var user = Encode.encode(JSON.stringify(this.userData));
            //     this.axios.post(process.env.VUE_APP_API_BACKEND + '/deleteGroupReportInUser', {
            //         'group_report_id': this.groupUserName.group_report_id,
            //         'r_id': DataDelete.r_id,
            //         'user': user
            //     }).then((response) => {
            //         // this.addReports = response.data.data
            //         // console.log(response);
            //         if (response.data.status === "success") {
            //             this.$swal('save success', ' ', 'success')
            //             this.getGroupReportNotInUser()
            //             this.getGroupReportInUser()
            //             this.selected = []
            //             this.dialogloading = false

            //         }
            //     })
            // },
            deleteGroupReportInUser(DataDelete) {

                const mySelf = this;
                var user = Encode.encode(JSON.stringify(this.userData));
                // var txt = 'You would to suspend user : ' + 'user.name'
                this.axios.post(process.env.VUE_APP_API_BACKEND + '/deleteGroupReportInUser', {
                            'list_user_name' : DataDelete,
                            'group_report_id': mySelf.groupUserName.group_report_id,
                            'user': user
                        })
                        .then(response => {
                            // console.log(response);
                            if (
                                response.data.status ===
                                "success"
                            ) {
                                mySelf.$swal(
                                    "Deleted!",
                                    "Your file has been deleted.",
                                    "success"
                                );
                            }
                        }).then(response => {
                            // mySelf.get_GroupsReport()
                            mySelf.getGroupReportNotInUser()
                            mySelf.getGroupReportInUser()
                            mySelf.selected = []
                            mySelf.selectedReport = []
                            mySelf.dialogloading = false
                        })

            },
            addGroupReportToUser(data) {
                // console.log(data);
                this.dialogloading = true
                var user = Encode.encode(JSON.stringify(this.userData));
                this.axios.post(process.env.VUE_APP_API_BACKEND + '/addGroupReportToUser', {
                    'group_report_id': this.groupUserName.group_report_id,
                    'list_user_name': data,
                    'user': user
                }).then((response) => {
                    // this.addReports = response.data.data
                    // console.log(response);
                    if (response.data.status === "success") {
                        this.$swal('save success', ' ', 'success')
                        this.getGroupReportNotInUser()
                        this.getGroupReportInUser()
                        this.selected = []
                        this.dialogloading = false
                        this.close()


                    }
                })
            },
            toggleAll() {
                if (this.selected.length) this.selected = []
                else this.selected = this.addReports.slice()
            },
            toggleAllReport() {
                if (this.selectedReport.length) this.selectedReport = []
                else this.selectedReport = this.ReportsRoles.slice()
            },
            open(data) {
                // console.log(data);
                this.groupUserName = data
                this.DialogAddByGroupUser = true;
                this.getGroupReportInUser()
                this.getGroupReportNotInUser()
            },
            close() {
                this.DialogAddByGroupUser = false;
            },
            reloadPage() {
                window.location.reload()
            },
            closeDialogAddReports() {
                this.dialogAddReports = false
                this.ReportsRoles = []
            },
            getGroupReportNotInUser() {
                var user = Encode.encode(JSON.stringify(this.userData));
                this.axios.post(process.env.VUE_APP_API_BACKEND + '/getGroupReportNotInUser', {
                    'group_report_name': this.groupUserName.group_report_name,
                    'user': user
                }).then((response) => {
                    this.addReports = response.data.data
                    this.loading = false
                    // console.log(response);
                })
            },
            getGroupReportInUser() {
                var user = Encode.encode(JSON.stringify(this.userData));
                this.axios.post(process.env.VUE_APP_API_BACKEND + '/getGroupReportInUser', {
                    'group_report_name': this.groupUserName.group_report_name,
                    'user': user,
                }).then((response) => {
                    // console.log(response);
                    this.ReportsRoles = response.data.data
                    this.loadingReportsRoles = false
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
    .text-test {
        white-space: normal;
    }
</style>
