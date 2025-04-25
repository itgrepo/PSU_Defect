<template>
    <v-layout row justify-center>
        <v-dialog v-model="dialogAddReportsGroup" fullscreen hide-overlay transition="dialog-bottom-transition">
            <v-card>
                <v-toolbar class="light-blue darken-4 white--text color-card-title" dense>
                    <v-btn icon dark @click="close()">
                        <v-icon>close</v-icon>
                    </v-btn>
                    <v-toolbar-title>Add Dataset In Group</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-toolbar-items>
                        <v-btn dark flat @click="close()">Exit</v-btn>
                    </v-toolbar-items>
                </v-toolbar>
                <v-container>
                    <v-layout row wrap>
                        <v-flex xs12 md12>
                            <h3>Group Dataset Name : &nbsp;{{group_report_name.group_report_name}}</h3>
                        </v-flex>
                        <v-flex xs12 md6>
                            <v-subheader><b></b></v-subheader>
                            <!-- <v-text-field v-model="group_report_name.group_name" readonly></v-text-field> -->
                        </v-flex>
                        <v-flex xs12 md12>
                            <v-divider></v-divider>
                        </v-flex>
                        <v-flex xs12 sm12 md6 lg6 xl6 class="pa-2">
                            <v-card-title>
                                <p class="subheading">
                                    <v-icon left class="mr-2" color="light-blue darken-4">label</v-icon>Dataset
                                </p>
                                <v-spacer></v-spacer>
                                <v-text-field v-model="searchReportsRoles" append-icon="search" :label="$t('search')"
                                    single-line hide-details></v-text-field>
                            </v-card-title>

                            <v-data-table v-model="selectedReport" :headers="headers" :items="ReportsRoles" select-all
                                :search="searchReportsRoles" item-key="r_name" class="elevation-1"
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
                                        <td>{{ props.item.r_name }}</td>
                                        <td class="text-xs-center">{{ props.item.category_name }}</td>
                                        <td class="text-xs-center">{{ props.item.sub_category_name }}</td>
                                    </tr>
                                </template>
                            </v-data-table>
                            <v-card class="mx-auto mt-2" v-if="selectedReport != ''">
                                <!-- <pre>{{}}</pre> -->
                                <!-- <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn v-if="selectedReport.length > 10" color="warning"
                                        @click="deleteReportInGroupReport(selectedReport)">
                                        <v-icon left>delete</v-icon> delete
                                    </v-btn>
                                </v-card-actions> -->
                                <!-- <pre>{{props.selected.length}}</pre> -->
                                <!-- <div v-for="items in selectedReport"> -->
                                    <!-- <pre></pre> -->
                                    <!-- <v-chip class="ma-2 pa-2" md="4" color="error" text-color="white" label outlined>
                                        <v-icon left>description</v-icon>
                                        <span class="text-test">{{items.r_name}}</span>
                                    </v-chip> -->
                                    <!-- <br> -->
                                <!-- </div>
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn v-if="selectedReport.length >=0" color="warning"
                                        @click="deleteReportInGroupReport(selectedReport)">
                                        <v-icon left>delete</v-icon> delete
                                    </v-btn> -->

                                <!-- </v-card-actions> -->
                            </v-card>
                        </v-flex>
                        <v-flex xs12 sm12 md6 lg6 xl6 class="pa-2">
                            <v-card-title>
                                <p class="subheading">
                                    <v-icon left color="light-blue darken-4">label</v-icon>Add Dataset
                                </p>
                                <v-spacer></v-spacer>
                                <v-text-field v-model="search" append-icon="search" :label="$t('search')"  single-line
                                    hide-details></v-text-field>
                            </v-card-title>


                            <v-data-table v-model="selected" :headers="headers" :items="addReports" select-all
                                :search="search" item-key="r_name" class="elevation-1" :loading="loading"
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
                                        <td>{{ props.item.r_name }}</td>
                                        <td class="text-xs-center">{{ props.item.category_name }}</td>
                                        <td class="text-xs-center">{{ props.item.sub_category_name }}</td>
                                    </tr>
                                </template>
                            </v-data-table>
                            <!-- <v-spacer></v-spacer> -->
                            <!-- <v-col sm="6" md="6"> -->
                            <v-card class="mx-auto mt-2" v-if="selected != ''">
                                <!-- <pre>{{}}</pre> -->
                                <!-- <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn v-if="selected.length > 0" color="success"
                                        @click="SaveAddReports(selected)">
                                        <v-icon left>save</v-icon> save
                                    </v-btn>
                                </v-card-actions> -->
                                <!-- <pre>{{props.selected.length}}</pre> -->
                                <!-- <div v-for="items in selected"> -->
                                    <!-- <pre></pre> -->
                                    <!-- <v-chip class="ma-2 pa-2" md="4" color="info" text-color="white" label outlined>
                                        <v-icon left>description</v-icon>
                                        <span class="text-test">{{items.r_name}}</span>
                                    </v-chip> -->
                                    <!-- <br> -->
                                <!-- </div>
                                <v-card-actions>
                                    <v-spacer></v-spacer> -->
                                     <!-- <v-btn v-if="selected.length > 0" color="success"
                                        @click="SaveAddReports(selected)">
                                        <v-icon left>save</v-icon> save
                                    </v-btn> -->

                                <!-- </v-card-actions> -->





                            </v-card>
                            <!-- </v-col> -->
                        </v-flex>
                    </v-layout>
                    <v-flex offset-xs10 pb-4><v-btn color="success" :disabled="!valid" @click="deleteReportInGroupReport(selectedReport),SaveAddReports(selected)">Save</v-btn></v-flex>
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
                dialogAddReportsGroup: false,
                getRoles: [],
                addReports: [],
                ReportsRoles: [],
                rolesName: '',
                valid: true,
                search: '',
                searchReportsRoles: '',
                group_report_name: '',
                headers: [
                    {
                        text: 'Report Name',
                        align: 'center',
                        value: 'r_name'
                    },
                    {
                        text: 'Category Name',
                        align: 'center',
                        value: 'category_name'
                    },
                    {
                        text: 'Sub Category Name',
                        align: 'center',
                        value: 'sub_category_name'
                    },
                ],
                headersReport: [
                    {
                        text: 'Report Name',
                        align: 'center',
                        sortable: false,
                        value: 'r_name'
                    },
                    // {
                    //     text: 'Email',
                    //     align: 'center',
                    //     sortable: false,
                    //     value: 'previlage_name'
                    // },
                    {
                        text: '',
                        align: 'center',
                        sortable: false
                    }
                ],
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
            // deleteReportInGroupReport(DataDelete) {
            //     this.dialogloading = true
            //     var user = Encode.encode(JSON.stringify(this.userData));
            //     this.axios.post(process.env.VUE_APP_API_BACKEND + '/deleteReportInGroupReport', {
            //         'group_report_id': this.group_report_name.group_report_id,
            //         'r_id': DataDelete.r_id,
            //         'user': user
            //     }).then((response) => {
            //         // this.addReports = response.data.data
            //         // console.log(response);
            //         if (response.data.status === "success") {
            //             this.$swal('save success', ' ', 'success')
            //             this.getReportNotInGroup()
            //             this.getReportInGroup()
            //             this.selected = []
            //             this.dialogloading = false

            //         }
            //     })
            // },
            // Update(DataDelete) {
            //         var user = Encode.encode(JSON.stringify(this.userData));
            //         this.axios.post(process.env.VUE_APP_API_BACKEND + '/updateReportToGroupReport', {
            //         'group_report_id': this.group_report_name.group_report_id,
            //                 'list_report': DataDelete,
            //                 'user_data': user


            //              }).then((response) => {
            //    if (response.data === 'success') {
            //      this.dialogEdit = false
            //         this.$swal('Edit Role is success', ' ', 'success')
            //      }
            // })
            // },

            deleteReportInGroupReport(DataDelete) {
                 this.dialogloading = true
                var user = Encode.encode(JSON.stringify(this.userData));
                this.axios.post(process.env.VUE_APP_API_BACKEND + '/deleteReportInGroupReport', {
                    'group_report_id':  this.group_report_name.group_report_id,
                    'list_report': DataDelete,
                    'user': user
                }).then((response) => {
                    // this.addReports = response.data.data
                    // console.log(response);
                    if (response.data.status === "success") {
                        this.$swal('save success', ' ', 'success')
                        this.getReportNotInGroup()
                        this.getReportInGroup()
                        this.selected = []
                        this.dialogloading = false
                        this.close()


                    }
                })
            },

                // const mySelf = this;
                // var user = Encode.encode(JSON.stringify(this.userData));
                // var txt = 'You would to suspend user : ' + 'user.name'
                // // // this.$swal({
                // // //     title: "Are you Confirm?",
                // // //     // text: ,
                // // //     type: "warning",
                // // //     showCancelButton: true,
                // // //     confirmButtonColor: "#3085d6",
                // // //     cancelButtonColor: "#d33",
                // // //     confirmButtonText: "Yes delete it!"
                // // // })
                // //     .then(function (result) {
                //     mySelf.dialogloading = true

                //     const axios = require("axios");
                //     axios
                //         .post(process.env.VUE_APP_API_BACKEND + '/deleteReportInGroupReport', {
                //             'group_report_id': mySelf.group_report_name.group_report_id,
                //             'list_report': DataDelete,
                //             'user': user
                //         })
                //         .then(response => {
                //             if (
                //                 response.data.status ===
                //                 "success"
                //             ) {
                //                 mySelf.$swal(
                //                     "Deleted!",
                //                     "Your file has been deleted.",
                //                     "success"
                //                 );
                //             }
                //         }).then(response => {
                //             // mySelf.get_GroupsReport()
                //             mySelf.getReportNotInGroup()
                //             mySelf.getReportInGroup()
                //             mySelf.selected = []
                //             mySelf.selectedReport = []
                //             mySelf.dialogloading = false


                //         })
                // });

            SaveAddReports(data) {
                this.dialogloading = true
                var user = Encode.encode(JSON.stringify(this.userData));
                this.axios.post(process.env.VUE_APP_API_BACKEND + '/addReportToGroupReport', {
                    'group_report_id': this.group_report_name.group_report_id,
                    'list_report': data,
                    'user': user
                }).then((response) => {
                    // this.addReports = response.data.data
                    // console.log(response);
                    if (response.data.status === "success") {
                        this.$swal('save success', ' ', 'success')
                        this.getReportNotInGroup()
                        this.getReportInGroup()
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
                this.group_report_name = data
                this.dialogAddReportsGroup = true;
                this.getReportInGroup()
                this.getReportNotInGroup()
            },
            close() {
                this.dialogAddReportsGroup = false;
            },
            save() {
                if (this.rolesName !== '') {
                    this.axios.post(process.env.VUE_APP_API_BACKEND + '/upadteStatusPrevilage',
                        {
                            'data': this.ReportsRoles,
                            'rolesName': this.rolesName
                        }
                    ).then((response) => {
                        if (response.status === 'success') {
                            this.closeDialogAddReports()
                            this.reloadPage()
                        } else if (response.status === 'Permission denied') {
                            this.$swal('Permission denied', ' ', 'warning')
                        } else {
                            this.$swal('error', ' ', 'error')
                        }
                    })
                } else {
                    this.$swal('Rule Name is required', ' ', 'warning')
                }
            },
            reloadPage() {
                window.location.reload()
            },
            closeDialogAddReports() {
                this.dialogAddReports = false
                this.ReportsRoles = []
            },
            getReportNotInGroup() {
                var user = Encode.encode(JSON.stringify(this.userData));
                this.axios.post(process.env.VUE_APP_API_BACKEND + '/getReportNotInGroupReport', {
                    'group_report_id': this.group_report_name.group_report_id,
                    'user': user
                }).then((response) => {
                    this.loading = false
                    this.addReports = response.data.data
                    // this.addReports = [        {
                    //     "category_name": 'วิเคราะห์ห่วงโซ่มูลค่าโลก',
                    //     "create_at": "Thu, 01 Jul 2021 05:15:07 GMT",
                    //     "data_source": "BOT",
                    //     "export_excel_id": 171,
                    //     "r_name": "รายงานการวิเคราะห์ห่วงโซ่อุปทานของผู้ค้า",
                    //     "file_name": "PP_003",
                    //     "frequency": "Monthly",
                    //     "trans_date": "2021-07-01",
                    //     'sub_category_name': 'RAOT',
                    //     "status": "Active",

                    //     "Link_name": "https://public.tableau.com/views/04-SupplyChainVendorAnalysisDashboard/GlobalDashboardAfter?%3Adisplay_static_image=y&%3AbootstrapWhenNotified=true&%3Aembed=true&%3Alanguage=en-US&:embed=y&:showVizHome=n&:apiID=host0#navType=0&navSrc=Parse",
                    //     "csv": 'http://server.vichaantestdomain.gq/api/file/downloadFileMongo/Global_Value_Chain_Analysis.zip?file_id=60ebc4078d8c536607e461c5&user_id===3MTMpxaVe&firstname=worapod&lastname=Hongkham&file_type=csv',
                    //     "source_id": "http://server.vichaantestdomain.gq/api/file/downloadFileMongo/Global_Value_Chain_Analysis.xlsx?file_id=60ebc242de91b1abe3e461c5&user_id===3MTMgyGRe&firstname=worapod&lastname=Hongkham&file_type=excel",


                    // },
                    // {
                    //     "category_name": 'วิเคราะห์ข้อความ Social Media',
                    //     "create_at": "Thu, 01 Jul 2021 05:15:07 GMT",
                    //     "data_source": "BOT",
                    //     "export_excel_id": 172,
                    //     "r_name": "รายงานวิเคราะห์ข้อความ Text Message ต่อความรู้สึก",
                    //     "file_name": "PP_004",
                    //     "frequency": "Monthly",
                    //     "trans_date": "2021-07-01",
                    //     'sub_category_name': 'RAOT',
                    //     "status": "Active",

                    //     "Link_name": "https://public.tableau.com/views/iPhoneTextMessageAnalysis/TextAnalysisDashboard?%3Adisplay_static_image=y&%3AbootstrapWhenNotified=true&%3Aembed=true&%3Alanguage=en-US&:embed=y&:showVizHome=n&:apiID=host0#navType=0&navSrc=Parse",
                    //     "csv": 'http://server.vichaantestdomain.gq/api/file/downloadFileMongo/Sentiment_Analysis.zip?file_id=60ebc42058b85276b8e461c5&user_id===3MTMI3u9h&firstname=worapod&lastname=Hongkham&file_type=csv',
                    //     "source_id": "http://server.vichaantestdomain.gq/api/file/downloadFileMongo/Sentiment_Analysis.xlsx?file_id=60ebc1d41acf1d7549e461c5&user_id===3MTMLFdhe&firstname=worapod&lastname=Hongkham&file_type=excel",


                    // },]

                    // console.log(response);
                })
            },
            getReportInGroup() {
                var user = Encode.encode(JSON.stringify(this.userData));
                this.axios.post(process.env.VUE_APP_API_BACKEND + '/getReportInGroupReport', {
                    'group_report_id': this.group_report_name.group_report_id,
                    'user': user,
                }).then((response) => {
                    this.loadingReportsRoles = false
                    this.ReportsRoles = response.data.data

                //     this.ReportsRoles = [
                //     {
                //         "category_name": "วิเคราะห์ความต้องการยาง",
                //         "create_at": "Thu, 01 Jul 2021 05:15:06 GMT",
                //         "data_source": "BOT",
                //         "export_excel_id": 180,
                //         "r_name": "รายงานการวิเคราะห์ยอดขายผลิตภัณฑ์ทั่วโลก",
                //         "file_name": "PP_001_PROPERTY",
                //         "frequency": "Monthly",
                //         "status": "Active",
                //         "trans_date": "2021-07-01",
                //         "Link_name": "https://public.tableau.com/views/WorldRubberProductionGraph/Dashboard1?%3Adisplay_static_image=y&%3AbootstrapWhenNotified=true&%3Aembed=true&%3Alanguage=en-US&:embed=y&:showVizHome=n&:apiID=host0#navType=1&navSrc=Parse",
                //         "csv": 'http://server.vichaantestdomain.gq/api/file/downloadFileMongo/Demand_Analytics.zip?file_id=60ebc3d5e42a790bc9e461c5&user_id===3MTM7Mf8S&firstname=worapod&lastname=Hongkham&file_type=csv',
                //         "source_id": "http://server.vichaantestdomain.gq/api/file/downloadFileMongo/Demand_Analytics.xlsx?file_id=60ebc2686ff253b275e461c5&user_id===3MTMc2QK5&firstname=worapod&lastname=Hongkham&file_type=excel",
                //         'favorite': true,
                //         'sub_category_name': 'RAOT'
                //     },
                //     {
                //         "category_name": 'วิเคราะห์ข้อมูลการผลิตยาง',
                //         "create_at": "Thu, 01 Jul 2021 05:15:06 GMT",
                //         "data_source": "BOT",
                //         "export_excel_id": 170,
                //         "r_name": "รายงานการนำเข้าและส่งออกของยางพารา",
                //         "file_name": "PP_002",
                //         "frequency": "Monthly",
                //         "trans_date": "2021-07-01",
                //         "status": "Active",
                //         'sub_category_name': 'RAOT',
                //         "Link_name": "https://public.tableau.com/views/ImportandExportofRubberinMalaysia/NaturalRubberinMalaysia?%3Adisplay_static_image=y&%3AbootstrapWhenNotified=true&%3Aembed=true&%3Alanguage=en-US&:embed=y&:showVizHome=n&:apiID=host0#navType=0&navSrc=Parse",
                //         "csv": 'http://server.vichaantestdomain.gq/api/file/downloadFileMongo/Supply_Analytics.zip?file_id=60f0f3ad4cbc3c1c61e461c5&user_id===3MTMzWhEv&firstname=worapod&lastname=Hongkham&file_type=csv ',
                //         "source_id": "http://server.vichaantestdomain.gq/api/file/downloadFileMongo/Supply_Analytics.xlsx?file_id=60f0f39a78eb1541f7e461c5&user_id===3MTMKIfyG&firstname=worapod&lastname=Hongkham&file_type=excel"
                //     },
                //     {
                //         "category_name": 'รายงานวิเคราะห์พื้นที่กรีดยางพาราในประเทศไทย',
                //         "category_id": 5,
                //         "create_at": "Thu, 01 Jul 2021 05:15:07 GMT",
                //         "data_source": "BOT",
                //         "export_excel_id": 172,
                //         "r_name": "รายงานวิเคราะห์พื้นที่กรีดยางพาราในประเทศไทย",
                //         "file_name": "PP_004",
                //         "frequency": "Monthly",
                //         "trans_date": "2021-07-01",
                //         "meta":"http://server.vichaantestdomain.gq/api/file/downloadFileMetadataMongo/Factor_Rubber_Area.xlsx?file_id=6106bf0bf1d9c63230a081f9",
                //         "Link_name": "http://203.154.135.78/t/THP/views/1/Dashboard1?:showAppBanner=false&:display_count=n&:showVizHome=n&:origin=viz_share_link",
                //         "csv": 'http://server.vichaantestdomain.gq/api/file/downloadFileMongo/Factor_Rubber_Area.zip?file_id=6106beed3a7bea5e6da081f9&user_id===3MTMYcKGG&firstname=worapod&lastname=Hongkham&file_type=csv',
                //         "source_id": "http://server.vichaantestdomain.gq/api/file/downloadFileMongo/Factor_Rubber_Area.xlsx?file_id=6106ca567800dcc2fca081fb&user_id===3MTMS670T&firstname=worapod&lastname=Hongkham&file_type=excel",
                //         'sub_category_name': 'RAOT',
                //         "status": "Active",

                //     },
                //     {
                //         "category_name": 'รายงานวิเคราะห์ปัจจัยการกรีดยางพาราในประเทศไทย',
                //         "category_id": 5,
                //         "create_at": "Thu, 01 Jul 2021 05:15:07 GMT",
                //         "data_source": "BOT",
                //         "export_excel_id": 172,
                //         "r_name": "รายงานวิเคราะห์ปัจจัยการกรีดยางพาราในประเทศไทย",
                //         "file_name": "PP_004",
                //         "frequency": "Monthly",
                //         "trans_date": "2021-07-01",
                //         "Link_name": "http://203.154.135.78/t/THP/views/2/Dashboard1?:showAppBanner=false&:display_count=n&:showVizHome=n&:origin=viz_share_link",
                //         "csv": 'http://server.vichaantestdomain.gq/api/file/downloadFileMongo/rubber_tapping_area.zip?file_id=6106c11dfeae2b7350a081f9&user_id===3MTMV7psy&firstname=worapod&lastname=Hongkham&file_type=csv',
                //         "source_id": "http://server.vichaantestdomain.gq/api/file/downloadFileMongo/rubber_tapping_area.xlsx?file_id=6106c10b6098e8d200a081f9&user_id===3MTMPmoQE&firstname=worapod&lastname=Hongkham&file_type=excel",
                //         "meta":"http://server.vichaantestdomain.gq/api/file/downloadFileMetadataMongo/rubber_tapping_area.xlsx?file_id=6106c3f97800dcc2fca081f9",
                //         'sub_category_name': 'RAOT',
                //         "status": "Active",
                //     },

                // ]

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
