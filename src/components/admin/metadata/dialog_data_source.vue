<template lang="html">
    <v-layout row justify-center>
        <v-dialog v-model="dialog_data_source" persistent max-width="750">
            <v-card>
                <v-toolbar dark color="primary">                    
                    <v-toolbar-title>Data Source</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-toolbar-items>
                        <v-btn icon dark @click="closeDialog()">
                            <v-icon>close</v-icon>
                        </v-btn>
                    </v-toolbar-items>
                </v-toolbar>
                <v-card-title class="pa-4">
                    <v-text-field v-model="search" append-icon="search" :label="$t('search')"  single-line hide-details>
                    </v-text-field>
                </v-card-title>
                <v-data-table class="pa-4" :headers="headers" :items="datasource" :search="search">
                    <template v-slot:items="props">
                        <td>{{ props.item.data_source_name }}</td>
                        <td>{{ props.item.data_source_table }}</td>
                        <td>
                            <v-btn outline small color="blue darken-1" @click="selectRow(props.item)">Select</v-btn>
                        </td>
                    </template>
                    <template v-slot:no-results>
                        <v-alert :value="true" color="error" icon="warning">
                            {{ $t('searchfor') }} "{{ search }}" {{ $t('foundno') }}
                        </v-alert>
                    </template>
                </v-data-table>
            </v-card>
        </v-dialog>
    </v-layout>
</template>

<script>
    import { Encode, Decode } from '@/services'
    export default {
        components: {
        },
        data() {
            return {
                dialog_data_source: false,
                search: '',
                datasource: [],
                headers: [
                    {
                        text: 'Data Source',
                        align: 'center',
                        value: 'data_source_name'
                    },
                    { text: 'Data Source Table', value: 'data_source_table' },
                    { text: 'Select', value: 'Select', align: 'center', },
                ],
            }
        },
        watch: {

        },
        mounted() {
            this.getDatasource()
        },
        computed: {
            datareport: {
                get() {
                    return this.$store.getters.reportid;
                }
            },
            userData() {
                if (this.$cookies.isKey("information")) {
                    return JSON.parse(Decode.decode(this.$cookies.get("information")));
                } else {
                    return "No";
                }
            },

        },
        methods: {
            open() {
                this.dialog_data_source = true;
            },
            closeDialog() {
                this.dialog_data_source = false;
            },
            getDatasource() {
                // console.log(this.userData);
                var user = Encode.encode(JSON.stringify(this.userData));
                this.axios
                    .post(process.env.VUE_APP_API_BACKEND + "/getDatasource", {
                        'user': user,
                        "from_page" : "ReportConfig"
                    })
                    .then(response => {
                        // console.log(response.data.data)
                        this.datasource = response.data.data;
                    });
            },
            selectRow(row) {
                this.$emit('selectDataSource', row)
                this.dialog_data_source = false
            },

        }
    }
</script>

<style lang="css" scoped>
    .v-btn--floating .v-icon {
        height: auto;
        width: inherit;
    }
</style>