<template>
    <v-layout row justify-center>
        <v-dialog v-model="dialog" persistent max-width="750">
            <v-card class="pa-3">
                <v-card-title>
                    <h2>{{ $t('username') }} : {{dataUser.username}} </h2>
                    <v-spacer></v-spacer>

                </v-card-title>
                <v-text-field v-model="search" append-icon="search" :label="$t('search')"  single-line hide-details>
                </v-text-field>
                <v-data-table :headers="localizedHeaders" :items="desserts" :search="search" :loading="loading">
                    <template v-slot:items="props">

                        <td>
                            {{ props.item.export_excel_name }}
                        </td>
                        <td class="text-xs-center">
                            {{ props.item.category_name }}
                        </td>
                        <td class="text-xs-center">
                            {{ props.item.sub_category }}
                        </td>


                    </template>
                    <template v-slot:no-results>
                        <v-alert :value="true" color="error" icon="warning">
                            {{ $t('searchfor') }} "{{ search }}" {{ $t('foundno') }}
                        </v-alert>
                    </template>
                </v-data-table>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="teal" outline @click="close()" class="btn-close">
                        <v-icon>close</v-icon> {{ $t('close') }}
                    </v-btn>
                </v-card-actions>


            </v-card>
        </v-dialog>
    </v-layout>
</template>

<script>
    import { Encode, Decode } from "@/services";
    export default {
        data() {
            return {
                loading: true,
                dialog: false,
                search: '',
                activeMetaTab: "tab-1",
                dataReport: '',
                dataUser: '',
                // headers: [

                //     {
                //         text: 'Report Name', value: 'export_excel_name',
                //         sortable: false,
                //         align: '',
                //     },
                //     {
                //         text: 'Category Name', value: 'category_name',
                //         sortable: false,
                //         align: 'center'
                //     },
                //     {
                //         text: 'Sub Category Name', value: 'sub_category',
                //         sortable: false,
                //         align: 'center'
                //     },

                // ],
                desserts: [

                ]

            }
        },
        computed: {
            userData() {
                if (this.$cookies.isKey("information")) {
                    return JSON.parse(Decode.decode(this.$cookies.get("information")));
                } else {
                    return "";
                }
            },
            localizedHeaders() {
    return [
      {
        text: this.$t('reportname'), // ใช้คีย์สำหรับการแปล
        value: 'export_excel_name',
        sortable: false,
        align: '',
      },
      {
        text: this.$t('category'),
        value: 'category_name',
        sortable: false,
        align: 'center',
      },
      {
        text: this.$t('subcategory'),
        value: 'sub_category',
        sortable: false,
        align: 'center',
      },
    ];
  },
        },
        methods: {
            open(data) {
                // console.log(data);
                this.dataUser = data
                this.getListReportPermissionByUser()

            },
            close() {
                this.dialog = false;
            },
            getListReportPermissionByUser() {
                var user = Encode.encode(JSON.stringify(this.userData));
                this.axios.post(process.env.VUE_APP_API_BACKEND + '/getListReportPermissionByUser', {
                    user: user,
                    user_id: Encode.encode(this.dataUser.user_id)
                }).then((response) => {

                    this.desserts = response.data.data
                    this.dialog = true;

                    // console.log(response.data)
                    this.loading = false

                })
            }

        },
    }
</script>
<style scoped="">
    .v-btn--floating .v-icon {
        height: auto;
        width: inherit;
    }
</style>