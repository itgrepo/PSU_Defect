<template lang="html">
    <v-container>
        <b class="tab-title"></b>
        <div class="tableFixHead">
            <table>
                <thead class="tb-header-home"  >
                    <tr round>
                        <th class="font-titles" align="left" width="60%">History</th>
                        <th class="font-title" width="10%"></th>
                        <th class="font-title" width="10%"></th>
                        <th width="20%" class="font-title"></th>
                    </tr>

                    
                </thead>
                
                
                <tr valign="middle" class="tb-row-orange colortr"  v-for="itemTopDow in data">
                    <td><v-icon>history</v-icon>&nbsp;&nbsp;{{ itemTopDow.export_excel_name }}</td>
                    <td align="center" class="hover-img" @click="toPathSource(itemTopDow.Link_name)">
                        <!-- <div v-if="itemTopDow.Link_name == null || itemTopDow.Link_name == '' "
                            @click="nolinkdashboard()">
                            <img class="imageSize" src="/opendataIcon/icon/dashboardbb&w.png" alt="fireSpot" />
                        </div> -->
                        <!-- <div v-else> -->
                        <img  class="imageSize"
                            src="/opendataIcon/icon/dashboard.png" alt="fireSpot" />
                        <!-- </div> -->
                    </td>
                    <td align="center" class="hover-img" @click="downloadFileMongo(itemTopDow.meta)">
                        <!-- <div v-if="
                itemTopDow.mongo_file_id_metadata == null ||
                  itemTopDow.mongo_file_id_metadata == ''
              " @click="nofile()">
                            <img class="imageSize" src="/opendataIcon/icon/metaDatab&w.png" alt="fireSpot" />
                        </div> -->
                        <!-- <div v-else > -->
                        <img class="imageSize"
                            src="/opendataIcon/icon/pdf.png" alt="fireSpot" />
                        <!-- </div> -->
                    </td>
                    <td align="center" class="hover-img" @click="downloadFileMongo(itemTopDow.source_id)" >
                        <!-- <div v-if="
                itemTopDow.mongo_file_id_excel == null ||
                  itemTopDow.mongo_file_id_excel == ''
              " @click="nofile()">
                            <img class="imageSize" src="/opendataIcon/icon/excelb&w.png" alt="fireSpot" />
                        </div> -->
                        <!-- <div v-else "> -->
                        <!-- <img class="imageSize" src="/opendataIcon/icon/excel.png" alt="fireSpot" /> -->
                         <v-btn round outline color="primary" dark>Admin</v-btn>
                        <!-- </div> -->
                    </td>
                    <!-- <td align="center" class="hover-img" @click="downloadFileMongocsv(itemTopDow.csv)"> -->
                        <!-- <div v-if="
                itemTopDow.mongo_file_id_csv == null ||
                  itemTopDow.mongo_file_id_csv == ''
              " @click="nofile()">
                            <img class="imageSize" src="/opendataIcon/icon/csvb&w.png" alt="fireSpot" />
                        </div> -->
                        <!-- <div v-else > -->
                        <!-- <img class="imageSize" src="/opendataIcon/icon/csv.png"
                             alt="fireSpot" /> -->
                        <!-- </div> -->
                    </td>
                </tr>
            </table>
        </div>
    </v-container>
</template>

<script>
    import {
        Encode,
        Decode
    } from "@/services";
    export default {
        data() {
            return {
                data: [
                // {
                //         "category_id": 5,
                //         "create_at": "Thu, 01 Jul 2021 05:15:06 GMT",
                //         "data_source": "BOT",
                //         "export_excel_id": 180,
                //         "export_excel_name": "กลุ่มตัวชี้วัดยุทศาสตร์การประปา",
                //         "file_name": "PP_001_PROPERTY",
                //         "frequency": "Monthly",
                //         "status": "Active",
                //         "trans_date": "2021-07-01",
                //         "Link_name": "https://public.tableau.com/views/WorldRubberProductionGraph/Dashboard1?%3Adisplay_static_image=y&%3AbootstrapWhenNotified=true&%3Aembed=true&%3Alanguage=en-US&:embed=y&:showVizHome=n&:apiID=host0#navType=1&navSrc=Parse",
                //         "csv": 'http://server.vichaantestdomain.gq/api/file/downloadFileMongo/Demand_Analytics.zip?file_id=60ebc3d5e42a790bc9e461c5&user_id===3MTM7Mf8S&firstname=worapod&lastname=Hongkham&file_type=csv',
                //         "source_id": "http://server.vichaantestdomain.gq/api/file/downloadFileMongo/Demand_Analytics.xlsx?file_id=60ebc2686ff253b275e461c5&user_id===3MTMc2QK5&firstname=worapod&lastname=Hongkham&file_type=excel",
                //         "meta": "http://server.vichaantestdomain.gq/api/file/downloadFileMongo/Demand_Analytics.xlsx?file_id=60ebc2686ff253b275e461c5&user_id===3MTMc2QK5&firstname=worapod&lastname=Hongkham&file_type=excel",
                //         'favorite': true
                //     },
                //     {
                //         "category_id": 5,
                //         "create_at": "Thu, 01 Jul 2021 05:15:06 GMT",
                //         "data_source": "BOT",
                //         "export_excel_id": 170,
                //         "export_excel_name": "กลุ่มตัวชี้วัดผลการดำเนินงานระดับองค์กร",
                //         "file_name": "PP_002",
                //         "frequency": "Monthly",
                //         "trans_date": "2021-07-01",
                //         "Link_name": "https://public.tableau.com/views/ImportandExportofRubberinMalaysia/NaturalRubberinMalaysia?%3Adisplay_static_image=y&%3AbootstrapWhenNotified=true&%3Aembed=true&%3Alanguage=en-US&:embed=y&:showVizHome=n&:apiID=host0#navType=0&navSrc=Parse",
                //         "csv": 'http://server.vichaantestdomain.gq/api/file/downloadFileMongo/Supply_Analytics.zip?file_id=60f0f3ad4cbc3c1c61e461c5&user_id===3MTMzWhEv&firstname=worapod&lastname=Hongkham&file_type=csv ',
                //         "source_id": "http://server.vichaantestdomain.gq/api/file/downloadFileMongo/Supply_Analytics.xlsx?file_id=60f0f39a78eb1541f7e461c5&user_id===3MTMKIfyG&firstname=worapod&lastname=Hongkham&file_type=excel" ,
                //         "meta": "http://server.vichaantestdomain.gq/api/file/downloadFileMongo/Supply_Analytics.xlsx?file_id=60f0f39a78eb1541f7e461c5&user_id===3MTMKIfyG&firstname=worapod&lastname=Hongkham&file_type=excel"               },
                //     {
                //         "category_id": 5,
                //         "create_at": "Thu, 01 Jul 2021 05:15:07 GMT",
                //         "data_source": "BOT",
                //         "export_excel_id": 171,
                //         "export_excel_name": "กลุ่มตัวชี้วัดความเสี่ยงหลัก (Key Risk Indicator: KRI)",
                //         "file_name": "PP_003",
                //         "frequency": "Monthly",
                //         "trans_date": "2021-07-01",
                //         "Link_name": "https://public.tableau.com/views/04-SupplyChainVendorAnalysisDashboard/GlobalDashboardAfter?%3Adisplay_static_image=y&%3AbootstrapWhenNotified=true&%3Aembed=true&%3Alanguage=en-US&:embed=y&:showVizHome=n&:apiID=host0#navType=0&navSrc=Parse",
                //         "csv": 'http://server.vichaantestdomain.gq/api/file/downloadFileMongo/Global_Value_Chain_Analysis.zip?file_id=60ebc4078d8c536607e461c5&user_id===3MTMpxaVe&firstname=worapod&lastname=Hongkham&file_type=csv',
                //         "source_id": "http://server.vichaantestdomain.gq/api/file/downloadFileMongo/Global_Value_Chain_Analysis.xlsx?file_id=60ebc242de91b1abe3e461c5&user_id===3MTMgyGRe&firstname=worapod&lastname=Hongkham&file_type=excel",
                //         "meta": "http://server.vichaantestdomain.gq/api/file/downloadFileMongo/Global_Value_Chain_Analysis.xlsx?file_id=60ebc242de91b1abe3e461c5&user_id===3MTMgyGRe&firstname=worapod&lastname=Hongkham&file_type=excel",


                //     },
                    // {
                    //     "category_id": 5,
                    //     "create_at": "Thu, 01 Jul 2021 05:15:07 GMT",
                    //     "data_source": "BOT",
                    //     "export_excel_id": 172,
                    //     "export_excel_name": "รายงานวิเคราะห์ข้อความ Text Message ต่อความรู้สึก",
                    //     "file_name": "PP_004",
                    //     "frequency": "Monthly",
                    //     "trans_date": "2021-07-01",
                    //     "Link_name": "https://public.tableau.com/views/iPhoneTextMessageAnalysis/TextAnalysisDashboard?%3Adisplay_static_image=y&%3AbootstrapWhenNotified=true&%3Aembed=true&%3Alanguage=en-US&:embed=y&:showVizHome=n&:apiID=host0#navType=0&navSrc=Parse",
                    //     "csv": 'http://server.vichaantestdomain.gq/api/file/downloadFileMongo/Sentiment_Analysis.zip?file_id=60ebc42058b85276b8e461c5&user_id===3MTMI3u9h&firstname=worapod&lastname=Hongkham&file_type=csv',
                    //     "source_id": "http://server.vichaantestdomain.gq/api/file/downloadFileMongo/Sentiment_Analysis.xlsx?file_id=60ebc1d41acf1d7549e461c5&user_id===3MTMLFdhe&firstname=worapod&lastname=Hongkham&file_type=excel",
                    //     "meta": "http://server.vichaantestdomain.gq/api/file/downloadFileMongo/Sentiment_Analysis.xlsx?file_id=60ebc1d41acf1d7549e461c5&user_id===3MTMLFdhe&firstname=worapod&lastname=Hongkham&file_type=excel",


                    // },
                    // {
                    //     "category_id": 5,
                    //     "create_at": "Thu, 01 Jul 2021 05:15:07 GMT",
                    //     "data_source": "BOT",
                    //     "export_excel_id": 172,
                    //     "export_excel_name": "รายงานวิเคราะห์พื้นที่กรีดยางพาราในประเทศไทย",
                    //     "file_name": "PP_004",
                    //     "frequency": "Monthly",
                    //     "trans_date": "2021-07-01",
                    //     "meta":"http://server.vichaantestdomain.gq/api/file/downloadFileMetadataMongo/Factor_Rubber_Area.xlsx?file_id=6106cbac57dad18cd6a081f9",
                    //     "Link_name": "http://203.154.135.78/t/THP/views/1/Dashboard1?:showAppBanner=false&:display_count=n&:showVizHome=n&:origin=viz_share_link",
                    //     "csv": 'http://server.vichaantestdomain.gq/api/file/downloadFileMongo/Factor_Rubber_Area.zip?file_id=6106beed3a7bea5e6da081f9&user_id===3MTMYcKGG&firstname=worapod&lastname=Hongkham&file_type=csv',
                    //     "source_id": "http://server.vichaantestdomain.gq/api/file/downloadFileMongo/Factor_Rubber_Area.xlsx?file_id=6106ca567800dcc2fca081fb&user_id===3MTMS670T&firstname=worapod&lastname=Hongkham&file_type=excel",


                    // },
                    // {
                    //     "category_id": 5,
                    //     "create_at": "Thu, 01 Jul 2021 05:15:07 GMT",
                    //     "data_source": "BOT",
                    //     "export_excel_id": 172,
                    //     "export_excel_name": "รายงานวิเคราะห์ปัจจัยการกรีดยางพาราในประเทศไทย",
                    //     "file_name": "PP_004",
                    //     "frequency": "Monthly",
                    //     "trans_date": "2021-07-01",
                    //     "Link_name": "http://203.154.135.78/t/THP/views/2/Dashboard1?:showAppBanner=false&:display_count=n&:showVizHome=n&:origin=viz_share_link",
                    //     "csv": 'http://server.vichaantestdomain.gq/api/file/downloadFileMongo/rubber_tapping_area.zip?file_id=6106c11dfeae2b7350a081f9&user_id===3MTMV7psy&firstname=worapod&lastname=Hongkham&file_type=csv',
                    //     "source_id": "http://server.vichaantestdomain.gq/api/file/downloadFileMongo/rubber_tapping_area.xlsx?file_id=6106c10b6098e8d200a081f9&user_id===3MTMPmoQE&firstname=worapod&lastname=Hongkham&file_type=excel",
                    //     "meta":"http://server.vichaantestdomain.gq/api/file/downloadFileMetadataMongo/rubber_tapping_area.xlsx?file_id=6106c3f97800dcc2fca081f9"

                    // },
                ]
            };
        },
        mounted() {
            // this.getDataTopDownload();
        },
        computed: {
            userData() {
                if (this.$cookies.isKey("information")) {
                    return JSON.parse(Decode.decode(this.$cookies.get("information")));
                } else {
                    return "";
                }
            }
        },
        methods: {
            checkUserLoginDashbord(text) {
                if (this.$cookies.get("consentfpo") === 'no') {
                    this.$swal('<p class="font-text">กรุณากด "ยอมรับ" นโยบายการใช้คุกกี้ด้านล่าง และlog-in เข้าใช้งานก่อน</p>', '', 'warning')
                } else if (this.userData) {
                    this.toPathSource(text)
                } else {
                    this.$swal('Please login', '', 'warning')
                }
            },
            toPathSource(text) {
                window.open(text, '_blank');

                // //console.log(text);
                // var nametext = "";
                // var textname = text.split(" ");
                // for (let i = 0; i < textname.length; i++) {
                //     nametext = nametext + textname[i];
                // }

                // // //console.log(nametext);

                // let routeData = this.$router.resolve(`/view/dashboard/${nametext}`);
                // window.open(routeData.href);
            },
            loadFile(link) {
                window.location.assign(link);
            },
            getDataTopDownload() {
                // if (this.userData) {
                var user = Encode.encode(JSON.stringify(this.userData));
                this.axios
                    .post(process.env.VUE_APP_API_BACKEND + "/getDataTopDownload", {
                        // Level_Master_id: this.userData.Level_Master_id,
                        // previlage_id: this.userData.previlage_id
                        user: user
                    })
                    .then(response => {
                        //console.log(response.data.result);
                        this.data = response.data.result;
                    });
                // } else {
                //     this.axios
                //         .post(process.env.VUE_APP_API_BACKEND + "/getDataTopDownload", {
                //             Level_Master_id: 1,
                //             previlage_id: 0
                //         })
                //         .then(response => {
                //             this.data = response.data.result;
                //             //console.log(this.data);
                //         });
                // }
            },
            getDataExportMetadata(id) {
                this.axios
                    .post(process.env.VUE_APP_API_BACKEND + "/getDataExportMetadata", {
                        source_id: id
                    })
                    .then(response => {
                        this.$cookies.get("consentfpo");
                        // //console.log(this.$cookies.get("consentfpo") )
                        if (this.$cookies.get("consentfpo") === "no") {
                            this.$swal(
                                '<p class="font-text">กรุณากด "ยอมรับ" นโยบายการใช้คุกกี้ด้านล่างก่อน download</p>',
                                "",
                                "warning"
                            );
                        } else {
                            this.downloadFileMetadata(response.data[0]);
                        }
                    });
            },
            checkUserLoginCsv(item) {
                // if (this.$cookies.get("consentfpo") === "no") {
                //     this.$swal(
                //         '<p class="font-text">กรุณากด "ยอมรับ" นโยบายการใช้คุกกี้ด้านล่าง และlog-in เข้าใช้งานก่อน</p>',
                //         "",
                //         "warning"
                //     );
                // } else if (this.userData) {
                this.checkPermissionDownloadCsv(item);
                // } else {
                //     this.$swal("Please login", "", "warning");
                // }
            },
            checkUserLoginExcel(item) {
                if (this.$cookies.get("consentfpo") === "no") {
                    this.$swal(
                        '<p class="font-text">กรุณากด "ยอมรับ" นโยบายการใช้คุกกี้ด้านล่าง และlog-in เข้าใช้งานก่อน</p>',
                        "",
                        "warning"
                    );
                } else if (this.userData) {
                    this.checkPermissionDownloadExcel(item);
                } else {
                    this.$swal("Please login", "", "warning");
                }
            },
            checkPermissionDownloadExcel(item) {
                // this.axios
                //     .post(process.env.VUE_APP_API_BACKEND + "/checkPermitDownloadfile", {
                //         user_id: this.userData.user_id,
                //         file_name: item.file_name
                //     })
                //     .then(response => {
                //         if (response.data.status === "download") {
                this.downloadFileMongo(item);
                //     } else {
                //         this.$swal("Please contact Admin", "warning");
                //     }
                // });
            },
            downloadFileMongo(item) {
                // if (item.file_name !== '' && item.mongo_file_id_excel !== '') {
                //     var user_id = Encode.encode(this.userData.user_id)
                this.loadFile(item)
                // } else {
                //     this.$swal('No file', '', 'error')
                // }
            },
            downloadFileMongocsv(item) {
                this.loadFile(item)

            },
            // downloadFileMongo(item) {
            //     if (item.file_name !== "" && item.mongo_file_id_excel !== "") {
            //         var user_id = Encode.encode(this.userData.user_id);
            //         this.loadFile(
            //             process.env.VUE_APP_API_BACKEND +
            //             "/file/downloadFileMongo/" +
            //             item.file_name +
            //             ".xlsx?file_id=" +
            //             item.mongo_file_id_excel +
            //             "&user_id===" +
            //             user_id +
            //             "&firstname=" +
            //             this.userData.firstname +
            //             "&lastname=" +
            //             this.userData.lastname +
            //             "&file_type=excel"
            //         );
            //     } else {
            //         this.$swal("No file", "", "error");
            //     }
            // },
            downloadFileMetadata(item) {
                if (item.file_name !== "" && item.mongo_file_id_metadata !== "") {
                    this.loadFile(
                        process.env.VUE_APP_API_BACKEND +
                        "/file/downloadFileMetadataMongo/" +
                        item.file_name +
                        ".xlsx?file_id=" +
                        item.mongo_file_id_metadata
                    );
                } else {
                    this.$swal("No file", "", "error");
                }
            },
            downloadFileMongoCsv(item) {
                if (item.file_name !== "" && item.mongo_file_id_csv !== "") {
                    var user_id = Encode.encode(this.userData.user_id);
                    this.loadFile(
                        process.env.VUE_APP_API_BACKEND +
                        "/file/downloadFileMongo/" +
                        item.file_name +
                        ".zip?file_id=" +
                        item.mongo_file_id_csv +
                        "&user_id===" +
                        user_id +
                        "&firstname=" +
                        this.userData.firstname +
                        "&lastname=" +
                        this.userData.lastname +
                        "&file_type=csv"
                    );
                } else {
                    this.$swal("No file", "", "error");
                }
            },
            nolinkapi() {
                this.$swal("No Link Api");
            },
            nolinkdashboard() {
                this.$swal("No Link Dashboard");
            },
            nofile() {
                this.$swal("No File");
            }
        }
    };
</script>

<style lang="css" scoped>
    /* @import url("https://fonts.googleapis.com/css?family=Kanit&display=swap"); */
    .font-text {
        /* font-family: "Kanit", sans-serif; */
        font-size: 28px;
    }

    .tb-header-topdownload {
        height: 40px;
    }



    /* scrollbar */
    /* width */
    ::-webkit-scrollbar {
        width: 8px;
        height: 8px;
    }

    /* Track */
    ::-webkit-scrollbar-track {
        background: #f1f1f1;
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
        background: #ccc;
        border-radius: 10px;
    }

    /* ------------------ */
    /* table */
    .tableFixHead {
        overflow-y: auto;
        height: 450px;
    }

    .tableFixHead thead th {
        position: sticky;
        top: 0;
    }

    table {
        border-collapse: collapse;
        width: 100%;
        table-layout: auto !important;
    }

    th {
        padding: 8px 10px;
    }

    th {
        background-color: #FCF3FE;
    }

    .line-table {
        border-spacing: 0px;
    }

    TR.colortr:nth-child(odd) {
        background-color: #ffffff;
    }

    TR.colortr:nth-child(even) {
        background-color: #f5f5f5;
    }

    .imageSizetop {
        margin: 5px;
        max-width: 35px;
        max-height: 35px;
        width: 100%;
        height: 100%;
    }

    td.t {
        padding: 7px;
    }

    td {
        font-size: 13px;
        padding: 5px;
    }

    @media (min-width: 1240px) and (max-width: 2340px) {
        .td-nameFile {
            width: 400px;
            text-align: left;
        }

        .td-image {
            width: 200px;
        }

        .td-size {
            width: 100px;
        }

        .td-date {
            font-size: 13px;
            width: 95px;
        }

        .td-metadata {
            width: 80px;
            text-align: center;
        }

        .td-excel {
            width: 70px;
            text-align: center;
        }

        .td-csv {
            width: 70px;
            text-align: center;
        }

        .imageSize-excel {
            margin-bottom: -18px;
            height: 35px;
            width: 60%;
        }

        .imageSize-csv {
            margin-bottom: -16px;
            height: 27px;
            width: 50%;
        }

        .imageSize-metaData {
            margin-bottom: -12px;
            width: 25px;
        }
    }

    @media (min-width: 750px) and (max-width: 1440px) {
        .td-nameFile {
            font-size: 13px;
            width: 290px;
            text-align: left;
        }

        .td-file {
            width: 130px;
        }

        .td-size {
            width: 70px;
        }

        .td-metadata {
            width: 70px;
            margin-bottom: -12px;
            text-align: right;
        }

        .td-date {
            font-size: 10px;
            width: 70px;
        }

        .td-excel {
            width: 30px;
        }

        .td-csv {
            width: 30px;
        }

        .imageSize-excel {
            margin-bottom: -18px;
            height: 4vh;
            width: 100%;
        }

        .imageSize-csv {
            margin-bottom: -16px;
            height: 3vh;
            width: 40%;
        }

        .imageSize-metaData {
            width: 20px;
        }
    }

    @media only screen and (max-width: 550px) {
        .td-nameFile {
            font-size: 10px;
            width: 120px;
            text-align: left;
        }

        .td-file {
            width: 60px;
        }

        .td-size {
            width: 100px;
        }

        .td-metadata {
            margin-bottom: -12px;
            text-align: center;
            width: 60px;
        }

        .td-date {
            font-size: 10px;
            width: 70px;
            padding: 0 5px 0 15px;
        }

        .imageSize-excel {
            margin-bottom: -25px;
            height: 4vh;
            width: 60%;
        }

        .imageSize-csv {
            margin-bottom: -23px;
            height: 3vh;
            width: 100%;
        }

        .imageSize-metaData {
            margin-bottom: -16px;
            width: 20px;
        }
    }

    table {
        max-width: 100%;
        table-layout: fixed;
        height: auto;
        /* margin: auto; */
    }

    .tb-row-blue {
        height: 3vh;
        display: table;
        width: 100%;
        /* table-layout:fixed; */
        background-color: #f5f5f5
    }

    .tb-row-white {
        height: 3vh;
        display: table;
        width: 100%;
        /* table-layout:fixed; */
        background-color: #ffffff
    }

    .table-scroll-table {
        width: 100%;
        display: block;
        max-height: 60vh !important;
        overflow: auto;
        background-color: #F5F5F5;
    }

    .tb-header {
        width: calc(100% - 17px);
        display: table;
        width: 100%;
        /* width:calc(100% - 18px); */
    }

    .tb-header-top {
        width: calc(100% - 17px);
        background-color: #757575;
        color: #ffffff;
        display: table;
        width: 100%;
        /* width:calc(100% - 18px); */
    }

    .tb-header-row {
        display: table;
        width: 100%;
        height: 4vh;
        /* table-layout:fixed; */
        color: #0150b3;
    }

    .tb-header-row-top {
        display: table;
        width: 100%;
        /* table-layout:fixed; */
        color: #000000;
    }

    .font-title {
        font-size: 18px;
        color: #000000;
    }
     .font-titles {
        font-size: 24px;
        color: #000000;
    }


    td.hover-img:hover {
        background-color: #D6D9D0;
    }

    td.hover-img {
        outline: none;
        cursor: pointer;
    }

    @media(min-width: 1904px) {
        .tableFixHead {
            height: 100%;
        }

        .search-top[data-v-7c66a6a2] {
            /* margin-top: -110px; */
            margin-bottom: 34px;
            padding-top: 130px;
        }
    }
</style>