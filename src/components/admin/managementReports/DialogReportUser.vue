<template>
    <v-layout row justify-center>
        <v-dialog v-model="dialog" persistent max-width="750">
            <v-card class="pa-3">
                <v-card-title>
                    <b>{{ $t('reportname') }} :</b> <span>&nbsp; {{report.report_name}} </span>                  
                </v-card-title>
                <v-text-field v-model="search" append-icon="search" :label="$t('search')"  single-line hide-details>
                </v-text-field>
                <v-data-table :headers="localizedHeaders" :items="UserInReports" :search="search" :loading="loadingReport">
                    <template v-slot:items="props">
                        <td class="text-xs-center">{{ props.item.username }}</td>
                       
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
                loadingReport: true,
                dialog: false,
                search: '',
                activeMetaTab: "tab-1",
                dataReport: '',
                report: '',
                // headers: [
                //     {
                //         text: 'Username',
                //         align: 'center',
                //         sortable: false,
                //         value: 'username'
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
        text: this.$t("username"),
        align: "center",
        sortable: false,
        value: "username",
      },
    ];
  },
        },
        methods: {
            open(data) {
               
                // console.log(data);
                this.report = data
                this.getUserInReport()

            },
            close() {
                this.dialog = false;
                // this.UserInReports =[]
            },
            getUserInReport() {
                var user = Encode.encode(JSON.stringify(this.userData));
                this.axios.post(process.env.VUE_APP_API_BACKEND + '/getListUserPermissionByReport', {
                    'r_id': Encode.encode(this.report.r_id),
                    'user': user,
                }).then((response) => {
                //    console.log(response);
                    this.UserInReports = response.data.data
                    this.dialog = true;
                    // console.log(response.data.data);
                    this.loadingReport = false

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