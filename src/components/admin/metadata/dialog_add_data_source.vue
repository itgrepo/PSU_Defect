<template lang="html">
    <v-layout row justify-center>
        <v-dialog v-model="dialog_add_data_source" persistent max-width="700">
            <v-card>
                <v-toolbar dark color="primary">

                    <v-toolbar-title>Data Source</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <!-- <v-toolbar-items>
                        <v-btn dark flat @click="closeDialog()">Save</v-btn>
                    </v-toolbar-items> -->
                    <v-btn icon dark @click="closeDialog()">
                        <v-icon>close</v-icon>
                    </v-btn>
                </v-toolbar>
                <v-card-title class="pa-4">
                    <v-layout row wrap>
                        <v-flex xs12 sm4 md4 lg4 xl4>
                            <v-subheader>Data Source Table</v-subheader>
                        </v-flex>
                        <v-flex xs11 sm7 md7 lg7 xl7>
                            <h4>
                                <v-text-field disabled v-model="source_Datasource.data_source_table"></v-text-field>
                            </h4>
                        </v-flex>
                        <v-flex xs1 sm1 md1 lg1 xl1>
                            <v-btn fab dark small color="primary" @click="dialog_data_source()">
                                <v-icon color="white" center>search</v-icon>
                            </v-btn>
                        </v-flex>
                        <v-flex xs12 sm4 md4 lg4 xl4>
                            <v-subheader>Frequency repeat</v-subheader>
                        </v-flex>
                        <v-flex xs12 sm8 md8 lg8 xl8>
                            <!-- <v-select :items="Frequency_repeat" v-model="source_Datasource.freguency_repeat"></v-select> -->
                            <v-text-field disabled v-model="source_Datasource.frequency_repeat"></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm4 md4 lg4 xl4>
                            <v-subheader>Frequency day</v-subheader>
                        </v-flex>
                        <v-flex xs12 sm8 md8 lg8 xl8>
                            <!-- <v-select :items="Frequency_day" v-model="source_Datasource.freguency_day"></v-select> -->
                            <v-text-field disabled v-model="source_Datasource.frequency_day"></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm4 md4 lg4 xl4>
                            <v-subheader>Frequency time</v-subheader>
                        </v-flex>
                        <v-flex xs12 sm8 md8 lg8 xl8>
                            <v-text-field disabled v-model="source_Datasource.frequency_time"></v-text-field>
                            <!-- <v-dialog ref="dialog" v-model="modal2" :return-value.sync="time" persistent lazy full-width
                                width="290px">
                                <template v-slot:activator="{ on }">
                                    <v-text-field v-model="source_Datasource.freguency_time"
                                        readonly v-on="on"></v-text-field>
                                </template>
                                <v-time-picker v-if="modal2" v-model="source_Datasource.freguency_time" full-width format="24hr">
                                    <v-spacer></v-spacer>
                                    <v-btn flat color="primary" @click="modal2 = false">Cancel</v-btn>
                                    <v-btn flat color="primary" @click="$refs.dialog.save(source_Datasource.freguency_time)">OK</v-btn>
                                </v-time-picker>
                            </v-dialog> -->
                        </v-flex>
                        <v-flex xs12 sm4 md4 lg4 xl4>
                            <v-subheader>Status</v-subheader>
                        </v-flex>
                        <v-flex xs12 sm8 md8 lg8 xl8>
                            <!-- <v-select :items="Frequency_status" v-model="source_Datasource.data_source_status">
                            </v-select> -->
                            <v-text-field disabled v-model="source_Datasource.data_source_status"></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm4 md4 lg4 xl4>
                            <v-subheader>Data source workflow</v-subheader>
                        </v-flex>
                        <v-flex xs12 sm8 md8 lg8 xl8>
                            <v-text-field disabled v-model="source_Datasource.data_source_workflow"></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm4 md4 lg4 xl4>
                            <v-subheader>Dataset id</v-subheader>
                        </v-flex>
                        <v-flex xs12 sm8 md8 lg8 xl8>
                            <h4>
                                <v-text-field disabled v-model="datareport"></v-text-field>
                            </h4>
                        </v-flex>
                    </v-layout>
                    <v-spacer></v-spacer>
                    <v-btn color="success" outline @click="addDatasourcebyReport()">save</v-btn>
                </v-card-title>
            </v-card>
            <dialog_data_source ref="dialog_data_source" @selectDataSource="dataSource"></dialog_data_source>
        </v-dialog>
    </v-layout>
</template>

<script>
    import { Encode, Decode } from '@/services'
    import dialog_data_source from "@/components/admin/metadata/dialog_data_source";
    export default {
        components: {
            dialog_data_source,
        },
        data() {
            return {
                dialog_add_data_source: false,
                source_Datasource: {},
                Frequency_status: ["Inactive", "Active"],
                Frequency_repeat: ["Daily", "Weekly", "Monthly"],
                Frequency_day: ["SUN", "M", "T", "W", "TH", "F", "SAT"],
                time: null,
                menu2: false,
                modal2: false,
            }
        },
        watch: {

        },
        mounted() {

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
                this.dialog_add_data_source = true;
            },
            closeDialog() {
                this.dialog_add_data_source = false;
            },
            dialog_data_source() {
                // this.$store.commit("reportid", this.sourceData.source_id);
                this.$refs.dialog_data_source.open()
            },
            dataSource(data) {
                // console.log(data);
                this.source_Datasource = data;
            },
            addDatasourcebyReport() {
                // console.log(this.datareport);
                // console.log(this.source_Datasource);
                var user = Encode.encode(JSON.stringify(this.userData));

                this.axios
                    .post(process.env.VUE_APP_API_BACKEND + "/addDatasourcebyReport ", {
                        'user': user,
                        'data_source_id': Encode.encode(this.source_Datasource.data_source_id),
                        'source_id': Encode.encode(this.datareport),
                    })
                    .then(response => {
                        // console.log(response.status)
                        if (response.data.status === "success" || response.data.status === "Duplicate Data") {
                            this.$swal("Save Success", "", "success")
                            this.DatasourcebyReport = response.data;
                            this.$emit('DataSource', this.source_Datasource)
                            this.dialog_add_data_source = false;
                        }
                        else {
                            this.$emit('DataSource', this.source_Datasource)
                            this.dialog_add_data_source = false;
                        }

                    });

            }
        }
    }
</script>

<style lang="css" scoped>
    .v-btn--floating .v-icon {
        height: auto;
        width: inherit;
    }
</style>