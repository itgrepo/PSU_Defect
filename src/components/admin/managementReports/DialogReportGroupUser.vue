<template>
    <v-layout row justify-center>
        <v-dialog v-model="dialog" persistent max-width="750">
            <v-card class="pa-3">
                <v-card-title>
                    <b>{{ $t('reportname') }} :</b> <span>&nbsp; {{report.report_name}} </span>
   
                </v-card-title>
                <v-text-field v-model="search" append-icon="search" :label="$t('search')"  single-line hide-details>
                </v-text-field>
                <v-data-table :headers="localizedHeaders" :items="GroupinReport" :search="search" :loading="loading">
                    <template v-slot:items="props">
                        <td class="text-xs-center">{{ props.item.group_name }}</td>

                    </template>
                    <template v-slot:no-results>
                        <v-alert :value="true" color="error" icon="warning">
                            {{ $t('searchfor') }} "{{ search }}" {{ $t('foundno') }}
                        </v-alert>
                    </template>
                </v-data-table>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="teal"  outline @click="close()" class="btn-close">
                        <v-icon>close</v-icon> Close
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
                loading : true,
                dialog: false,
                search: '',
                activeMetaTab: "tab-1",
                dataReport: '',
                report: '',
                // headers: [
                //     {
                //         text: 'Group Name',
                //         align: 'center',
                //         sortable: false,
                //         value: 'group_name'
                //     },


                // ],
                ReportsRoles: []
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
        text: this.$t("groupname"), // ใช้คีย์สำหรับการแปล
        align: "center",
        sortable: false,
        value: "group_name",
      },
    ];
  },
        },
        methods: {
            open(data) {
               
                // console.log(data);
                this.report = data
                this.getGroupInReport()
                

            },
            close() {
                this.dialog = false;
                // this.GroupinReport =[]/
            },
            getGroupInReport() {
                // console.log('kkkkkkkkkkkkkkkkkkkkkk');
                // console.log(this.groupName.group_name);
                var user = Encode.encode(JSON.stringify(this.userData));
                this.axios.post(process.env.VUE_APP_API_BACKEND + '/getListGroupUserPermissionByReport', {
                    'r_id': Encode.encode(this.report.r_id),
                    'user': user,
                }).then((response) => {
                    this.GroupinReport = response.data.data
                    this.dialog = true;
                    // console.log(response);
                    this.loading = false
                })
            
            },

        },
    }
</script>
<style scoped="">
     .v-btn--floating .v-icon {
    height: auto;
    width: inherit;
}
</style>