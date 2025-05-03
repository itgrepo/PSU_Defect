<template>
    <div>
        <v-container>
            <v-tabs v-model="activeMetaTab" :scrollable="false" color="blue lighten-4" dark slider-color="blue darken-4"
                grow>
                <v-tab dark grow class="subheading" href="#tab-1">
                    <h3>{{ $t('user') }}</h3>
                </v-tab>
                <v-tab dark grow class="subheading" href="#tab-2">
                    <h3>{{ $t('report') }}</h3>
                </v-tab>
                <v-tab-item value="tab-1" lazy>
                    <v-text-field v-model="search" append-icon="search" :label="$t('search')"  single-line hide-details
                        class="pa-3">
                    </v-text-field>
                    <v-data-table :headers="localizedHeaders" :items="userList" :search="search" :loading="loading"
                        :rows-per-page-items="[10, 25, 50, { text: 'All', value: -1 }]"
                        :rows-per-page-text="$t('rowsPerPageLabel')"
                        >
                        <template v-slot:items="props">
                            <td>{{ props.item.username }}</td>
                            <td class="text-xs-center">
                                <v-btn outline color="teal" @click="openview( props.item)">
                                    <v-icon left>pageview</v-icon>
                                    {{ $t('view') }}
                                </v-btn>
                            </td>
                            <td class="text-xs-center">
                                <v-btn outline color="cyan" @click="openDialogViewGroupReport( props.item)">
                                    <v-icon left>pageview</v-icon>
                                    {{ $t('view') }}
                                </v-btn>
                            </td>
                            <td class="text-xs-center">
                                <v-btn outline color="light-blue" @click="openDialogViewGroupUser( props.item)">
                                    <v-icon left>pageview</v-icon>
                                    {{ $t('view') }}
                                </v-btn>
                            </td>
                            <!-- <td class="text-xs-center">
                        <v-btn outline color="blue">
                            <v-icon left>pageview</v-icon>
                            view
                        </v-btn>
                    </td>
                    <td class="text-xs-center">
                        <v-btn outline color="indigo">
                            <v-icon left>pageview</v-icon>
                            view
                        </v-btn>
                    </td> -->
                        </template>
                        <template v-slot:no-results>
                            <v-alert :value="true" color="error" icon="warning">
                                {{ $t('searchfor') }} "{{ search }}" {{ $t('foundno') }}
                            </v-alert>
                        </template>
                    </v-data-table>
                </v-tab-item>
                <v-tab-item value="tab-2" lazy>
                    <v-text-field v-model="searchReport" append-icon="search" :label="$t('search')"  single-line hide-details
                        class="pa-3">
                    </v-text-field>
                    <v-data-table :headers="localizedHeadersReport" :items="sortedListReport" :search="searchReport"
                        :loading="loadingReport" :rows-per-page-items="[10, 25, 50, { text: 'All', value: -1 }]"
                        :rows-per-page-text="$t('rowsPerPageLabel')"
                        >
                        <template v-slot:items="props">
                            <td class="text-xs-center">{{ props.index + 1 }}</td>
                            <td>{{ props.item.report_name }}</td>
                            <td class="text-left">{{ props.item.category_name }}</td>

                            <td class="text-left">{{ props.item.sub_category_name }}</td>

                            <td class="text-xs-center">
                                <v-btn outline color="teal" @click="openDialogReportUser(props.item)">
                                    <v-icon left>pageview</v-icon>
                                    {{ $t('view') }}
                                </v-btn>
                            </td>
                            <td class="text-xs-center">
                                <v-btn outline color="cyan" @click="openDialogReportGroupUser( props.item)">
                                    <v-icon left>pageview</v-icon>
                                    {{ $t('view') }}
                                </v-btn>
                            </td>
                            <td class="text-xs-center">
                                <v-btn outline color="light-blue" @click="openDialogReportGroupReport( props.item)">
                                    <v-icon left>pageview</v-icon>
                                    {{ $t('view') }}
                                </v-btn>
                            </td>
                        </template>
                        <template v-slot:no-results>
                            <v-alert :value="true" color="error" icon="warning">
                                {{ $t('searchfor') }} "{{ search }}" {{ $t('foundno') }}
                            </v-alert>
                        </template>
                    </v-data-table>
                </v-tab-item>
            </v-tabs>
            <DialogView ref="DialogView"></DialogView>
            <DialogViewGroupReport ref="DialogViewGroupReport"></DialogViewGroupReport>
            <DialogViewGroupUser ref="DialogViewGroupUser"></DialogViewGroupUser>
            <DialogReportUser ref="DialogReportUser"></DialogReportUser>
            <DialogReportGroupUser ref="DialogReportGroupUser"></DialogReportGroupUser>
            <DialogReportGroupReport ref="DialogReportGroupReport"></DialogReportGroupReport>
        </v-container>
    </div>
</template>

<script>
    import DialogView from './DialogView'
    import DialogViewGroupReport from './DialogViewGroupReport'
    import DialogViewGroupUser from './DialogViewGroupUser'
    import DialogReportUser from './DialogReportUser'
    import DialogReportGroupUser from './DialogReportGroupUser'
    import DialogReportGroupReport from './DialogReportGroupReport'
    import { Encode, Decode } from "@/services";

    export default {
        components: { DialogView, DialogViewGroupReport, DialogViewGroupUser, DialogReportUser, DialogReportGroupUser, DialogReportGroupReport },
        data() {
            return {
                loadingReport: true,
                loading: true,
                searchReport: '',
                search: '',
                activeMetaTab: "tab-1",
                tab: null,
                // headers: [
                //     {
                //         text: 'Username',
                //         align: 'left',
                //         sortable: false,
                //         value: 'username'
                //     },
                //     {
                //         text: 'Report', value: 'calories',
                //         sortable: false,
                //         align: 'center',
                //     },
                //     {
                //         text: 'Group Report', value: 'fat',
                //         sortable: false,
                //         align: 'center'
                //     },
                //     {
                //         text: 'Group User', value: 'carbs',
                //         sortable: false,
                //         align: 'center'
                //     },
                //     // {
                //     //     text: 'Protein (g)', value: 'protein',
                //     //     sortable: false,
                //     //     align: 'center'
                //     // },
                //     // {
                //     //     text: 'Iron (%)', value: 'iron',
                //     //     sortable: false,
                //     //     align: 'center'
                //     // }
                // ],
                // headersReport: [
                //     {
                //         text: 'Report',
                //         align: 'left',
                //         sortable: false,
                //         value: 'report_name'
                //     },
                //     {
                //         text: 'Category Name',
                //         align: 'center',
                //         sortable: false,
                //         value: 'category_name'
                //     },
                //     {
                //         text: 'Sub Category Name',
                //         align: 'center',
                //         sortable: false,
                //         value: 'sub_category'
                //     },
                //     {
                //         text: 'User', value: 'calories',
                //         sortable: false,
                //         align: 'center',
                //     },

                //     {
                //         text: 'Group User', value: 'carbs',
                //         sortable: false,
                //         align: 'center'
                //     },
                //     {
                //         text: 'Group Report', value: 'fat',
                //         sortable: false,
                //         align: 'center'
                //     },
                //     // {
                //     //     text: 'Protein (g)', value: 'protein',
                //     //     sortable: false,
                //     //     align: 'center'
                //     // },
                //     // {
                //     //     text: 'Iron (%)', value: 'iron',
                //     //     sortable: false,
                //     //     align: 'center'
                //     // }
                // ],
                dataUser: [
                    {
                        name: 'Frozen Yogurt',
                        calories: 159,
                        fat: 6.0,
                        carbs: 24,
                        protein: 4.0,
                        iron: '1%'
                    },
                    {
                        name: 'Ice cream sandwich',
                        calories: 237,
                        fat: 9.0,
                        carbs: 37,
                        protein: 4.3,
                        iron: '1%'
                    },
                    {
                        name: 'Eclair',
                        calories: 262,
                        fat: 16.0,
                        carbs: 23,
                        protein: 6.0,
                        iron: '7%'
                    },
                    {
                        name: 'Cupcake',
                        calories: 305,
                        fat: 3.7,
                        carbs: 67,
                        protein: 4.3,
                        iron: '8%'
                    },
                    {
                        name: 'Gingerbread',
                        calories: 356,
                        fat: 16.0,
                        carbs: 49,
                        protein: 3.9,
                        iron: '16%'
                    },
                    {
                        name: 'Jelly bean',
                        calories: 375,
                        fat: 0.0,
                        carbs: 94,
                        protein: 0.0,
                        iron: '0%'
                    },
                    {
                        name: 'Lollipop',
                        calories: 392,
                        fat: 0.2,
                        carbs: 98,
                        protein: 0,
                        iron: '2%'
                    },
                    {
                        name: 'Honeycomb',
                        calories: 408,
                        fat: 3.2,
                        carbs: 87,
                        protein: 6.5,
                        iron: '45%'
                    },
                    {
                        name: 'Donut',
                        calories: 452,
                        fat: 25.0,
                        carbs: 51,
                        protein: 4.9,
                        iron: '22%'
                    },
                    {
                        name: 'KitKat',
                        calories: 518,
                        fat: 26.0,
                        carbs: 65,
                        protein: 7,
                        iron: '6%'
                    }
                ],
                listReport: [

                ]
            }
        },
        computed: {
            sortedListReport() {
                return this.listReport.slice().sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
            },
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
        text: this.$t('username'),
        align: 'left',
        sortable: false,
        value: 'username'
      },
      {
        text: this.$t('report'),
        value: 'calories',
        sortable: false,
        align: 'center',
      },
      {
        text: this.$t('groupreport'),
        value: 'fat',
        sortable: false,
        align: 'center'
      },
      {
        text: this.$t('groupuser'),
        value: 'carbs',
        sortable: false,
        align: 'center'
      },
    ];
  },
  localizedHeadersReport() {
    return [
      {
        text: this.$t('report'),
        align: 'left',
        sortable: false,
        value: 'report_name'
      },
      {
        text: this.$t('category'),
        align: 'center',
        sortable: false,
        value: 'category_name'
      },
      {
        text: this.$t('subcategory'),
        align: 'center',
        sortable: false,
        value: 'sub_category'
      },
      {
        text: this.$t('user'),
        value: 'calories',
        sortable: false,
        align: 'center',
      },
      {
        text: this.$t('groupuser'),
        value: 'carbs',
        sortable: false,
        align: 'center'
      },
      {
        text: this.$t('groupreport'),
        value: 'fat',
        sortable: false,
        align: 'center'
      },
    ];
  }
        },
        mounted() {
            this.getUser()
            this.getData()
        },
        methods: {
            openview(data) {
                this.$refs.DialogView.open(data)
            },
            openDialogViewGroupReport(data) {
                this.$refs.DialogViewGroupReport.open(data)
            },
            openDialogViewGroupUser(data) {
                this.$refs.DialogViewGroupUser.open(data)
            },
            openDialogReportUser(data) {

                this.$refs.DialogReportUser.open(data)
            },
            openDialogReportGroupUser(data) {
                this.$refs.DialogReportGroupUser.open(data)
            },
            openDialogReportGroupReport(data) {
                this.$refs.DialogReportGroupReport.open(data)
            },

            getUser() {
                this.axios.post(process.env.VUE_APP_API_BACKEND + '/mgmt/mgmtgetUser',).then((response) => {
                    this.userList = response.data
                    // console.log(response.data)
                    this.loading = false

                })
            },
            getData() {

                var user = Encode.encode(JSON.stringify(this.userData));
                this.axios.post(process.env.VUE_APP_API_BACKEND + '/getListReportDetail',
                    {
                        user : user
                    }
                ).then((response) => {
                    // console.log(response.data.status);
                    if (response.data.status === 'success') {
                        this.listReport = response.data.data
                        // console.log(response);
                        this.loadingReport = false
                    }

                    // console.log(this.listReport)
                })
            },
        },
    }
</script>
<style scoped="">
    >>>a.v-tabs__item.v-tabs__item--active {
        background: #42A5F5 !important;
    }
</style>
