<template>
    <v-container class="viewDashboard">

        <v-layout row justify-center>
            <v-dialog v-model="loading" persistent fullscreen content-class="loading-dialog">
                <v-container fill-height>
                    <v-layout row justify-center align-center>
                        <v-progress-circular indeterminate :size="80" :width="10" color="#6ab9eB"></v-progress-circular>
                    </v-layout>
                </v-container>
            </v-dialog>
        </v-layout>
    </v-container>

</template>

<script>
    import { Decode, Encode } from '@/services'
    export default {
        data() {
            return {
                loading: false,
            }
        },
        mounted() {
            this.Getlinkapi()
            this.checkuser()
        },
        created() {

        },
        computed: {
            userData() {
                if (this.$cookies.isKey('information')) {
                    return JSON.parse(Decode.decode(this.$cookies.get('information')))
                } else {
                    return 'No'
                }
            },
            dataProfile: {
                get() {
                    return this.$store.getters.setDataProfile
                }
            }
        },
        watch: {
            loading(val) {
                if (!val) return
                setTimeout(() => (this.loading = false), percentCompleted)
            },

        },
        methods: {
            checkuser() {
                if (this.userData === "No") {
                    this.$router.push('/')
                    this.reloadPage()
                }
            },
            Getlinkapi() {
                var param = window.location.href
                var name = param.split('/view/api/')

                let namesource = name[1]
                this.axios
                    .post(process.env.VUE_APP_API_BACKEND + "/apiList", {
                        file_name: namesource
                    })
                    .then(response => {

                        this.loading = true
                        let link = response.data.api_document_URL
                        window.location.assign(link)
                        // console.log(response.data.api_document_URL);
                    });
            },
        }
    }
</script>
<style media="screen" scoped="">
    .viewDashboard {
        height: 100% !important;
    }
</style>