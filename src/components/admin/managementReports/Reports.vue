<template lang="html">
    <div>
        <v-container>
            <v-tabs v-model="activeMetaTab" :scrollable="false" color="blue lighten-4" dark slider-color="blue darken-4"
                grow>
                <v-tab dark grow class="subheading" href="#tab-1">
                    <h3>{{ $t('report') }}</h3>
                </v-tab>
                <v-tab dark grow class="subheading" href="#tab-2">
                    <h3>{{ $t('groupreport') }}</h3>
                </v-tab>
                <v-tab-item value="tab-1" lazy>

                    <v-card-text>
                        <v-text-field class="hidden-sm-and-down searchBtn pa-3" color="green" :label="$t('search')"
                            v-model="searchData" append-icon="search" :append-icon-cb="() => getData()">
                        </v-text-field>
                        <v-data-table v-bind:headers="localizedHeadersDialog" v-bind:items="itemsDialog"
                            v-bind:search="searchData" v-bind:pagination.sync="pagination"
                            :rows-per-page-items="[ 5, 10, 20, 25,  {text:'All', value: -1}]"
                            :rows-per-page-text="$t('rowsPerPageLabel')"
                            >
                            <template slot="items" slot-scope="props">
                                <!-- <td class="text-xs-center">{{ props.item.id }}</td> -->
                                <td>{{ props.item.source_id }}</td>
                                <!-- <td class="text-xs-center">{{ props.item.file_name }}</td> -->
                                <td>{{ props.item.export_excel_name }}</td>
                                <td class="text-xs-center">{{ props.item.name }}</td>
                                <td class="text-xs-center">{{ props.item.sub_category_name }}</td>
                                <td class="text-xs-center">{{ props.item.status }}</td>
                                <!-- <td class="text-xs-center">{{ formatDate(props.item.create_at) }}</td> -->
                                <td class="text-xs-center">
                                    <v-btn outline small color="blue darken-4" @click="open(props.item)">
                                        <v-icon left>group_add</v-icon>By Group
                                    </v-btn>
                                    <v-btn outline small color="light-blue darken-1"
                                        @click="openUserInReport(props.item)">
                                        <v-icon left>person_add_alt_1</v-icon>by user
                                    </v-btn>
                                </td>

                            </template>
                        </v-data-table>
                    </v-card-text>
                </v-tab-item>
                <v-tab-item value="tab-2" lazy>
                    <v-text-field class="hidden-sm-and-down searchBtn pa-3" color="green" :label="$t('search')"
                        v-model="search" append-icon="search" :append-icon-cb="() => getData()">
                    </v-text-field>
                    <v-data-table v-bind:headers="localizedHeaders" v-bind:items="sortedGroupReports"  v-bind:search="search"
                        :rows-per-page-items="[10, 25, 50, {text:'All', value: -1}]"
                        :rows-per-page-text="$t('rowsPerPageLabel')"
                        >
                        <template slot="items" slot-scope="props">
                            <td class="text-xs-center">{{ props.index + 1 }}</td> <!-- Row Number -->
                            <td>
                                <!-- <v-edit-dialog :return-value.sync="props.item.group_name" large
                                    @save="save_edit_group_name(props.item)" @cancel="cancel"> -->
                                {{ props.item.group_report_name }}

                                <!-- <template v-slot:input>
                                        <v-text-field v-model="props.item.group_name" label="Edit" single-line autofocus
                                            maxLength="255" :counter="255">
                                        </v-text-field>
                                    </template>
                                </v-edit-dialog> -->
                            </td>
                            <td class="text-xs-center">{{ props.item.create_at }}</td>
                            <td class="text-xs-center">
                                <v-btn small color="primary" outline @click="openDialogAddByGroupUser(props.item)">
                                    <v-icon left>person_add_alt_1</v-icon>{{ $t('addbyuser') }}
                                </v-btn>
                                <v-btn small color="warning" outline @click="openAddGroupUserInGroupReport(props.item)">
                                    <v-icon left>group_add</v-icon>{{ $t('addbygroupuser') }}
                                </v-btn>
                            </td>
                        </template>
                    </v-data-table>
                </v-tab-item>
            </v-tabs>
            <DialogAddGroupInReports ref="DialogAddGroupInReports" />
            <DialogAddUserInReports ref="DialogAddUserInReports" />
            <DialogAddGroupUserInGruopReports ref="DialogAddGroupUserInGruopReports"></DialogAddGroupUserInGruopReports>
            <DialogAddByGroupUser ref="DialogAddByGroupUser"></DialogAddByGroupUser>

        </v-container>

    </div>
</template>

<script>
    import DialogAddGroupInReports from './DialogAddGroupInReports'
    import DialogAddUserInReports from './DialogAddUserInReports'
    import { Encode, Decode } from "@/services";
    import DialogAddGroupUserInGruopReports from './DialogAddGroupUserInGruopReports'
    import DialogAddByGroupUser from './DialogAddByGroupUser'
    export default {
        components: { DialogAddGroupInReports, DialogAddUserInReports, DialogAddGroupUserInGruopReports, DialogAddByGroupUser },
        data() {
            return {
                search:'',
                dialogMetadata: false,
                searchData: '',
                pagination: {},
                // headersDialog: [
                //     //   { text: 'Number', sortable: true, align: 'center', value: 'id' },
                //     { text: 'Report ID', sortable: false, align: 'center', value: 'source_id' },
                //     //   { text: 'File Name', sortable: true, align: 'center', value: 'file_name' },
                //     { text: 'Report Name', sortable: false, align: 'center', value: 'export_excel_name' },
                //     { text: 'Category', sortable: false, align: 'center', value: 'name' },
                //     { text: 'Sub Category', sortable: false, align: 'center', value: 'sub_category_name' },
                //     { text: 'Status', sortable: false, align: 'center', value: 'status' },
                //     //   { text: 'Date Created', sortable: false, align: 'center', value: 'dateCreate' },
                //     { text: 'Select', sortable: false, align: 'center', value: 'select' }
                // ],
                itemsDialog: [],
                // headers: [
                //     {
                //         text: 'Group Report Name',
                //         // align: 'center',
                //         value:'group_report_name',
                //         sortable: false
                //     },
                //     {
                //         text: 'Create Date',
                //         align: 'center',
                //         sortable: false
                //     },
                //     {
                //         text: '',
                //         align: 'center',
                //         sortable: false
                //     }
                // ],
                                groupReports: [
                    // { "create_at": "06/02/2021, 16:22:28", "group_report_id": "1", "group_report_name": "All Report" },
                    // { "create_at": "06/02/2021, 16:22:28", "group_report_id": "1", "group_report_name": "Admin" },

                ],
                groupUser: [],
            }
        },
        computed: {
            sortedGroupReports() {
                return this.groupReports.slice().sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
            }
            userData() {
                if (this.$cookies.isKey('information')) {
                    return JSON.parse(Decode.decode(this.$cookies.get('information')))
                } else {
                    return ''
                }
            },
            localizedHeadersDialog() {
    return [
      // { text: this.$t('number'), sortable: true, align: 'center', value: 'id' },
      { text: this.$t('reportId'), sortable: false, align: 'center', value: 'source_id' },
      // { text: this.$t('fileName'), sortable: true, align: 'center', value: 'file_name' },
      { text: this.$t('reportname'), sortable: false, align: 'center', value: 'export_excel_name' },
      { text: this.$t('category'), sortable: false, align: 'center', value: 'name' },
      { text: this.$t('subcategory'), sortable: false, align: 'center', value: 'sub_category_name' },
      { text: this.$t('status'), sortable: false, align: 'center', value: 'status' },
      // { text: this.$t('dateCreated'), sortable: false, align: 'center', value: 'dateCreate' },
      { text: this.$t('select'), sortable: false, align: 'center', value: 'select' }
    ];
  },
  localizedHeaders() {
    return [
      { text: '#', 
        align: 'center', 
        sortable: false, 
        value: 'index' 
      },
      {
        text: this.$t('groupReportName'),  // ใช้คีย์สำหรับการแปล
        // align: 'center',
        value: 'group_report_name',
        sortable: false
      },
      {
        text: this.$t('createdate'),  // ใช้คีย์สำหรับการแปล
        align: 'center',
        sortable: false
      },
      {
        text: '',
        align: 'center',
        sortable: false
      }
    ];
  }
        },
        mounted() {
            this.getData()
            this.get_GroupsReport()
        },
        methods: {
            openUserInReport(data) {
                this.$refs.DialogAddUserInReports.open(data)
            },
            open(data) {
                this.$refs.DialogAddGroupInReports.open(data)
                // this.getData()
            },
            getData() {
                this.axios.post(process.env.VUE_APP_API_BACKEND + '/getDataExportExcel',).then((response) => {
                    this.itemsDialog = response.data
                    // console.log(this.itemsDialog)
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
            },
            get_GroupsReport() {
                var user = Encode.encode(JSON.stringify(this.userData));
                this.axios.post(process.env.VUE_APP_API_BACKEND + '/getGroupsReport', {
                    'user': user,
                }).then((response) => {
                    // console.log(response);
                    this.groupReports = response.data.data
                    this.loading = false
                })
            },
            openAddGroupUserInGroupReport(data) {
                this.$refs.DialogAddGroupUserInGruopReports.open(data)

            },
            openDialogAddByGroupUser(data) {
                this.$refs.DialogAddByGroupUser.open(data)
            }
        }
    }
</script>

<style lang="css" scoped="">
    .blueIntel {
        background-color: #1DA6DF !important;
    }

    .bg-dialog {
        background-color: #ffffff;
    }

    .center-workbench {
        display: block;
        margin: auto;
    }

    >>>a.v-tabs__item.v-tabs__item--active {
        background: #42A5F5 !important;
    }
</style>
