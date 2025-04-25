<template lang="html">
    <v-layout row justify-center>
        <v-dialog v-model="dialog_External" persistent max-width="750">
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
                <v-data-table class="pa-4" :headers="headers" :items="datasource_External" :search="search">
                    <template v-slot:items="props">
                        <td>{{ props.item.data_source_name }}</td>
                        <td>{{ props.item.data_source_external_format }}</td>
                        <td>{{ props.item.data_source_external_format_other }}</td>
                        <td>{{ props.item.frequency_repeat }}</td>
                        <td>{{ props.item.frequency_day }}</td>
                        <td>{{ props.item.frequency_day_of_month }}</td>
                        <td>{{ props.item.frequency_time }}</td>
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
                dialog_External: false,
                search: '',
                datasource_External: [],
                headers: [
                    {
                        text: 'Data Source Name',
                        align: 'center',
                        value: 'data_source_name'
                    },
                    { text: 'Data Format', value: 'data_source_external_format' },
                    { text: 'Data Format Other', value: 'data_source_external_format_other' },
                    { text: 'Frequnecy Repeat', value: 'frequency_repeat' },
                    { text: 'Frequency Day', value: 'frequency_day' },
                    { text: 'Frequency day of month', value: 'frequency_day_of_month' },
                    { text: 'Frequency Time', value: 'frequency_time' },
                    { text: 'Select', value: 'Select', align: 'center', },

                ],
            }
        },
        watch: {

        },
        mounted() {
            this.getExternalDatasource()
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
                this.dialog_External = true;
            },
            closeDialog() {
                this.dialog_External = false;
            },
            getExternalDatasource() {
                // console.log(this.userData);
                var user = Encode.encode(JSON.stringify(this.userData));
                this.axios
                    .post(process.env.VUE_APP_API_BACKEND + "/getExternalDatasource", {
                        'user': user,       
                    })
                    .then(response => {
                        // console.log(response)
                        this.datasource_External = response.data.data;
                    });
            },
            selectRow(row) {
                this.$emit('selectDataSourceExternal', row)
                this.dialog_External = false
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