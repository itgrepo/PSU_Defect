<template>
    <v-layout row justify-center>
        <v-dialog v-model="DialogAddGroupUserInGruopReports" fullscreen hide-overlay transition="dialog-bottom-transition">
            <v-card>
                <v-toolbar dark color="primary">
                    <v-btn icon dark @click="close()">
                        <v-icon>close</v-icon>
                    </v-btn>
                    <v-toolbar-title>{{ $t('addbygroupuser') }}</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-toolbar-items>
                        <!-- <v-btn dark flat @click="close()">Exit</v-btn> -->
                    </v-toolbar-items>
                </v-toolbar>
                <v-container>
                    <v-layout row wrap>
                        <v-flex xs12 md12>
                            <h3>{{ $t('groupReportName') }} : &nbsp;{{groupUserName.group_report_name}}</h3>
                        </v-flex>
                        <v-flex xs12 md6>
                            <v-subheader><b></b></v-subheader>
                            <!-- <v-text-field v-model="groupUserName.group_name" readonly></v-text-field> -->
                        </v-flex>
                        <v-flex xs12 md12>
                            <v-divider></v-divider>
                        </v-flex>
                        <v-flex xs12 sm12 md6 lg6 xl6 class="pa-2">
                            <v-card-title>
                                <p class="subheading">
                                    <v-icon left class="mr-2" color="light-blue darken-4">label</v-icon> {{ $t('groupuser') }}
                                </p>
                                <v-spacer></v-spacer>
                                <v-text-field v-model="searchReportsRoles" append-icon="search" :label="$t('search')"
                                    single-line hide-details></v-text-field>
                            </v-card-title>
                            <v-data-table v-model="selectedReport" :headers="localizedHeaders" :items="ReportsRoles" select-all
                                :search="searchReportsRoles" item-key="group_user_name" class="elevation-1"
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
                                        <td>{{ props.item.group_user_name }}</td>
                                        <td>{{ props.item.org_name }}</td>
                                    </tr>
                                </template>
                            </v-data-table>
                            <!-- <v-card class="mx-auto mt-2" v-if="selectedReport != ''"> -->
                                <!-- <pre>{{}}</pre> -->
                                <!-- <v-card-actions> -->
                                    <!-- <v-spacer></v-spacer>
                                    <v-btn v-if="selectedReport.length > 10" color="warning"
                                        @click="deleteReportInGroupReport(selectedReport)">
                                        <v-icon left>delete</v-icon> delete
                                    </v-btn>
                                </v-card-actions> -->
                                <!-- <pre>{{props.selected.length}}</pre> -->
                                <!-- <div v-for="items in selectedReport"> -->
                                    <!-- <pre></pre> -->
                                    <!-- <v-chip class="ma-2 pa-2" md="4" color="error" text-color="white" label outlined>
                                        <v-icon left>group</v-icon>
                                        <span class="text-test">{{items.group_user_name}}</span>
                                    </v-chip> -->
                                    <!-- <br> -->
                                <!-- </div> -->
                                <!-- <v-card-actions> -->
                                    <!-- <v-spacer></v-spacer> -->
                                    <!-- <v-btn v-if="selectedReport.length <= 10" color="warning"
                                        @click="deleteReportInGroupReport(selectedReport)">
                                        <v-icon left>delete</v-icon> delete
                                    </v-btn> -->
                                    <!-- </v-btn> -->
                                <!-- </v-card-actions> -->
                            <!-- </v-card> -->
                        </v-flex>
                        <v-flex xs12 sm12 md6 lg6 xl6 class="pa-2">
                            <v-card-title>
                                <p class="subheading">
                                    <v-icon left color="light-blue darken-4">label</v-icon>{{ $t('addgroupuser') }}
                                </p>
                                <v-spacer></v-spacer>
                                <v-text-field v-model="search" append-icon="search" :label="$t('search')"  single-line
                                    hide-details></v-text-field>
                            </v-card-title>


                            <v-data-table v-model="selected" :headers="localizedHeaders" :items="addReports" select-all
                                :search="search" item-key="group_user_name" class="elevation-1" :loading="loading"
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
                                        <td>{{ props.item.group_user_name }}</td>
                                        <td>{{ props.item.org_name }}</td>
                                    </tr>
                                </template>
                            </v-data-table>
                            <!-- <v-spacer></v-spacer> -->
                            <!-- <v-col sm="6" md="6"> -->
                            <!-- <v-card class="mx-auto mt-2" v-if="selected != ''"> -->

                                <!-- <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn color="success" v-if="selected.length > 10"
                                        @click="SaveAddGroupReports(selected)">
                                        <v-icon left>save</v-icon> save
                                    </v-btn>
                                </v-card-actions> -->
                                <!-- <pre>{{props.selected}}</pre> -->
                                <!-- <div v-for="items in selected"> -->

                                    <!-- <v-chip class="ma-2 pa-2" md="4" color="info" text-color="white" label outlined>
                                        <v-icon left>group</v-icon>
                                        <span class="text-test">{{items.group_user_name}}</span>
                                    </v-chip> -->
                                    <!-- <br> -->
                                <!-- </div> -->
                                <!-- <v-card-actions> -->
                                    <!-- <v-spacer></v-spacer> -->
                                    <!-- <v-btn color="success" v-if="selected.length <= 10"
                                        @click="SaveAddGroupReports(selected)">
                                        <v-icon left>save</v-icon> save
                                    </v-btn> -->
                                <!-- </v-card-actions> -->
                            <!-- </v-card> -->
                            <!-- </v-col> -->
                        </v-flex>
                    </v-layout>
                    <v-flex offset-xs10 pb-4><v-btn color="success" :disabled="!valid" @click="deleteReportInGroupReport(selectedReport),SaveAddGroupReports(selected)">{{ $t('save') }}</v-btn></v-flex>

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
                DialogAddGroupUserInGruopReports: false,
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
                //         text: 'Group Report Name',
                //         align: 'center',
                //         value: 'group_report_name'
                //     },
                //     {
                //         text: 'Organization',
                //         align: 'center',
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
            },
            localizedHeaders() {
    return [
      {
        text: this.$t('groupReportName'),
        align: 'left',
        sortable: false,
        value: 'group_report_name'
      },
      {
        text: this.$t('org'),
        align: 'left',
        sortable: false,
        value: 'org_name'
      },
    ];
  }
        },
        methods: {
            // deleteReportInGroupReport(DataDelete) {
            //     this.dialogloading = true
            //     var user = Encode.encode(JSON.stringify(this.userData));
            //     this.axios.post(process.env.VUE_APP_API_BACKEND + '/deleteReportInGroupReport', {
            //         'group_report_id': this.groupUserName.group_report_id,
            //         'r_id': DataDelete.r_id,
            //         'user': user
            //     }).then((response) => {
            //         // this.addReports = response.data.data
            //         // console.log(response);
            //         if (response.data.status === "success") {
            //             this.$swal('save success', ' ', 'success')
            //             this.getGroupReportNotInGroupUser()
            //             this.getGroupReportInGroupUser()
            //             this.selected = []
            //             this.dialogloading = false

            //         }
            //     })
            // },
            deleteReportInGroupReport(DataDelete) {
                // console.log(DataDelete);
                const mySelf = this;
                var user = Encode.encode(JSON.stringify(this.userData));
                // var txt = 'You would to suspend user : ' + 'user.name'
                this.axios.post(process.env.VUE_APP_API_BACKEND + '/deleteGroupReportInGroupUser', {
                            'list_group_user': DataDelete,
                            'group_report_id': Encode.encode(mySelf.groupUserName.group_report_id),
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
                            mySelf.getGroupReportNotInGroupUser()
                            mySelf.getGroupReportInGroupUser()
                            mySelf.selected = []
                            mySelf.selectedReport = []
                            mySelf.dialogloading = false
                            this.close()

                        })

            },
            SaveAddGroupReports(data) {
                // console.log(data);
                this.dialogloading = true
                var user = Encode.encode(JSON.stringify(this.userData));
                this.axios.post(process.env.VUE_APP_API_BACKEND + '/addGroupReportToGroupUser', {
                    'group_report_id': Encode.encode(this.groupUserName.group_report_id),
                    'list_group_user': data,
                    'user': user
                }).then((response) => {
                    // this.addReports = response.data.data
                    // console.log(response);
                    if (response.data.status === "success") {
                        this.$swal('save success', ' ', 'success')
                        this.getGroupReportNotInGroupUser()
                        this.getGroupReportInGroupUser()
                        this.selected = []
                        this.selectedReport = []
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
                this.DialogAddGroupUserInGruopReports = true;
                this.getGroupReportInGroupUser()
                this.getGroupReportNotInGroupUser()
            },
            close() {
                this.DialogAddGroupUserInGruopReports = false;
            },
            reloadPage() {
                window.location.reload()
            },
            closeDialogAddReports() {
                this.dialogAddReports = false
                this.ReportsRoles = []
            },
            getGroupReportNotInGroupUser() {
                var user = Encode.encode(JSON.stringify(this.userData));
                this.axios.post(process.env.VUE_APP_API_BACKEND + '/getGroupReportNotInGroupUser', {
                    'group_report_id': Encode.encode(this.groupUserName.group_report_id),
                    'user': user
                }).then((response) => {
                    this.addReports = response.data.data
                    this.loading = false
                    // console.log(response);
                })
            },
            getGroupReportInGroupUser() {
                var user = Encode.encode(JSON.stringify(this.userData));
                this.axios.post(process.env.VUE_APP_API_BACKEND + '/getGroupReportInGroupUser', {
                    'group_report_id': Encode.encode(this.groupUserName.group_report_id),
                    'user': user,
                }).then((response) => {
                    // console.log(response);/
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
