<template>
    <div>
        <v-card-title>
            <p class="subheading">
                <v-icon left color="light-blue darken-4">label</v-icon>Dataset
            </p>
            <v-spacer></v-spacer>
            <v-text-field v-model="search" append-icon="search" :label="$t('search')"  single-line hide-details></v-text-field>
        </v-card-title>


        <v-data-table v-model="selected" :headers="headers" :items="ReportsRoles" select-all :search="search"
            item-key="r_name" class="elevation-1" :loading="loading"
            :rows-per-page-items="[10, 25, 50, { text: 'All', value: -1 }]"
            :rows-per-page-text="$t('rowsPerPageLabel')"
            >
            <template v-slot:headers="props">
                <tr>
                    <th>
                        <v-checkbox :input-value="props.all" :indeterminate="props.indeterminate" primary hide-details
                            @click.stop="toggleAll"></v-checkbox>
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
                    <td class="text-xs-center">
                        <v-btn @click="deleteReportInGroupReport( props.item)"></v-btn>
                    </td>

                </tr>
            </template>
        </v-data-table>
        <!-- <v-spacer></v-spacer> -->
        <!-- <v-col sm="6" md="6"> -->
        <v-card class="mx-auto mt-2" v-if="selected != ''">
            <!-- <pre>{{}}</pre> -->
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn v-if="selected.length > 10" color="success" @click="SaveAddReports(selected)">
                    <v-icon left>save</v-icon> save
                </v-btn>
            </v-card-actions>
            <!-- <pre>{{props.selected.length}}</pre> -->
            <div v-for="items in selected">
                <!-- <pre></pre> -->
                <v-chip class="ma-2 pa-2" md="4" color="info" text-color="white" label outlined>
                    <v-icon left>description</v-icon>
                    <span class="text-test">{{items.r_name}}</span>
                </v-chip>
                <!-- <br> -->
            </div>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn v-if="selected.length <= 10" color="success" @click="SaveAddReports(selected)">
                    <v-icon left>save</v-icon> save
                </v-btn>
                </v-btn>
            </v-card-actions>
        </v-card>
        <!-- </v-col> -->
    </div>
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
                        text: 'Dataset Name',
                        align: 'lefe',
                        value: 'r_name',
                        sortable: false,
                    },
                    {
                        text: 'Category Name',
                        align: 'center',
                        sortable: false,
                        value: 'category_name'
                    },
                    {
                        text: 'Sub Category Name',
                        align: 'center',
                        sortable: false,
                        value: 'sub_category_name'
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
        mounted() {
           this.getReportInGroup()
        },
        methods: {
            deleteReportInGroupReport(DataDelete) {

                const mySelf = this;
                var user = Encode.encode(JSON.stringify(this.userData));
                // var txt = 'You would to suspend user : ' + 'user.name'
                this.$swal({
                    title: "Are you Confirm?",
                    // text: ,
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Yes delete it!"
                }).then(function (result) {
                    const axios = require("axios");
                    axios
                        .post(process.env.VUE_APP_API_BACKEND + '/deleteReportInGroupReport', {
                            'group_report_id': localStorage.getItem('data'),
                            'r_id': DataDelete.r_id,
                            'user': user
                        })
                        .then(response => {
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
                            // // mySelf.get_GroupsReport()
                            // mySelf.getReportNotInGroup()
                            // mySelf.getReportInGroup()
                            mySelf.selected = []
                        })
                });
            },
            toggleAll() {
                if (this.selected.length) this.selected = []
                else this.selected = this.ReportsRoles.slice()
            },
            reloadPage() {
                window.location.reload()
            },
            closeDialogAddReports() {
                this.dialogAddReports = false
                this.ReportsRoles = []
            },
            open() {
                // console.log('555555555555555555555555555555555555555555555555555555555555');
                var user = Encode.encode(JSON.stringify(this.userData));
                this.axios.post(process.env.VUE_APP_API_BACKEND + '/getReportInGroupReport', {
                    'group_report_id': localStorage.getItem('data'),
                    'user': user,
                }).then((response) => {
                    // console.log(response.data.data);
                    this.ReportsRoles = response.data.data
                    this.loading = false
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
