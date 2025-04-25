<template lang="html">

    <div id="TE_001"></div>


</template>
<script>
    import { Encode, Decode } from "@/services";
    import * as am4core from "@amcharts/amcharts4/core";
    import * as am4charts from "@amcharts/amcharts4/charts";
    import am4themes_animated from "@amcharts/amcharts4/themes/animated";
    import { log } from "util";

    am4core.useTheme(am4themes_animated);
    var chart2 = [];
    export default {
        data() {
            return {
                dataSourceGraph: []
            };
        },
        computed: {
            // userData() {
            //     if (this.$cookies.isKey("information")) {
            //         return JSON.parse(Decode.decode(this.$cookies.get("information")));
            //     } else {
            //         return "";
            //     }
            // }
        },
        mounted() {
            // this.getDataGraph()
            let chart = am4core.create("TE_001", am4charts.XYChart);
            chart.dataSource.load();
            chart.responsive.enabled = true;
            chart.paddingBottom = 10;


            let title = chart.titles.create();
            title.text = "(Unit: Million USD)";
            title.align = "center";
            title.fontSize = 12;
            title.marginBottom = 8;
            title.fontWeight = 600;

            let title2 = chart.titles.create();
            title2.text = "(3 month moving averages)";
            title2.align = "center";
            title2.fontSize = 12;
            title2.marginBottom = 8;
            title2.fontWeight = 600;

            let title1 = chart.titles.create();
            title1.text = "Billing Dataset of Global Semiconductor Manufacturers ";
            title1.align = "center";
            title1.fontSize = 12;
            title1.marginBottom = 8;
            title1.fontWeight = 600;

            var label = chart.chartContainer.createChild(am4core.Label);
            label.text = "Source: SIA";
            label.align = "right";
            label.fontSize = 8;

            // chart.exporting.menu = new am4core.ExportMenu();
            // chart.exporting.menu.align = "right";
            // chart.exporting.menu.verticalAlign = "top";

            chart.exporting.menu = new am4core.ExportMenu();
            const mySelf = this;
            chart.exporting.menu.items = [
                {
                    label: "...",
                    type: "custom",
                    options: {
                        callback: function () {
                            if (localStorage.getItem('Fname') != null) {
                                const axios = require("axios");
                                var data = ["TE_001"];
                                let token = localStorage.getItem('token');
                                axios
                                    .post(
                                        process.env.VUE_APP_API_BACKEND + "/getExportExcelGraph",
                                        {
                                            source_id: data,
                                            token: token
                                        }
                                    )
                                    .then(response => {
                                        if (response.data === "no file") {
                                            mySelf.$swal("No file", "", "error");
                                        } else if (response.data.status === "token has expired") {
                                           
                                                    mySelf.$cookies.remove('information', '/', process.env.DOMAIN)
                                                    mySelf.$cookies.remove('usertype', '/', process.env.DOMAIN)
                                                    mySelf.$store.commit('setDataProfile', false)
                                                    localStorage.removeItem('token')
                                                    localStorage.removeItem('isAdmin')
                                                    localStorage.removeItem('Fname')
                                                    localStorage.removeItem('Lname')
                                                    mySelf.$swal('Your session has timed out', '', 'warning').then(response => {
                                                        window.location.reload()
                                                    })
                                                


                                        }
                                        else {
                                            var dataAppend = [];
                                            for (var i = 0; i < response.data.length; i++) {
                                                if (
                                                    response.data[i].file_name !== "" &&
                                                    response.data[i].mongo_file_id_excel !== ""
                                                ) {
                                                    // var user_id = Encode.encode(mySelf.userData.user_id);
                                                    window.location.assign(
                                                        process.env.VUE_APP_API_BACKEND +
                                                        "/file/downloadFileMongo/" +
                                                        response.data[i].file_name +
                                                        ".xlsx?file_id=" +
                                                        response.data[i].mongo_file_id_excel +
                                                        "&file_type=excel" + '&token=' + token
                                                    );
                                                } else {
                                                    mySelf.$swal("No file", "", "error");
                                                }
                                            }
                                        }
                                    });
                            } else {
                                mySelf.$swal("Please login", "", "warning");
                            }
                        }
                    }
                }
            ];


            let data_chart = [];
            // ดึกข้อมูลจาก backend
            this.axios
                .get(process.env.VUE_APP_API_BACKEND + "/datasourceDWT000101")
                .then(response => {
                    // console.log(response);
                    this.datas = response.data;

                    // console.log("5555555555555555555");
                    // console.log(response.data);

                    let json = this.datas; //แปลง response.data ให้เป็น json
                    //  console.log(json);
                    let count = 0;
                    //var jsonData = {};

                    json.forEach(element => {
                        //่แยกส่วน json
                        var jsonData = {};

                        //แพ็คข้อมูลที่ต้องการ
                        jsonData["Period"] = element.Year + " " + element.Month;
                        jsonData["Value"] = +element.Value;




                        data_chart.push(jsonData);
                    });
                    // console.log(data_chart);

                    data_chart.sort((a, b) => (a.Period < b.Period ? -1 : 1)); //เรียงข้อมูลปีจากน้อยไปมาก
                })
                .then(status => {
                    // console.log(data_chart);

                    // chart.dataSource.load();

                    // Add data
                    chart.data =
                        data_chart;

                    var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
                    categoryAxis.dataFields.category = "Period";
                    categoryAxis.renderer.labels.template.fontSize = 10;

                    // Create value axis
                    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
                    valueAxis.renderer.labels.template.fontSize = 10;

                    // Create series
                    var series1 = chart.series.push(new am4charts.LineSeries());
                    series1.dataFields.valueY = "Value";
                    series1.dataFields.categoryX = "Period";
                    // series1.name = "WTI";
                    series1.strokeWidth = 2;
                    series1.tensionX = 0.7;
                    // series1.tooltipText = "Year :{Period}\nWTI:{WTI}";
                    // series1.tooltipHTML = `<center style="font-size: 10px;">Period : {categoryX}</center>
                    //                         <table>
                    //                         <tr>
                    //                           <td align="left" style="font-size: 10px;">L/D ratio : </td>
                    //                           <td style="font-size: 10px;">{Value} %</td>
                    //                         </tr>
                    //                         </table>`;
                    series1.stroke = am4core.color("#8D6E63");
                    //

                    // series1.bullets.push(new am4charts.CircleBullet());
                    // Make bullets grow on hover
                    var bullet1 = series1.bullets.push(new am4charts.CircleBullet());
                    bullet1.circle.strokeWidth = 1;
                    bullet1.circle.radius = 2;
                    bullet1.circle.fill = am4core.color("#fff");

                    var bullethover1 = bullet1.states.create("hover");
                    bullethover1.properties.scale = 1.3;

                    // Drop-shaped tooltips
                    series1.tooltip.background.cornerRadius = 0;
                    series1.tooltip.background.strokeOpacity = 0;
                    series1.tooltip.pointerOrientation = "vertical";
                    series1.tooltip.label.minWidth = 40;
                    series1.tooltip.label.minHeight = 40;
                    series1.tooltip.label.textAlign = "middle";
                    series1.tooltip.label.textValign = "middle";


                    chart.cursor = new am4charts.XYCursor();
                    chart.cursor.behavior = "panXY";
                    chart.cursor.xAxis = dateAxis;
                    chart.cursor.snapToSeries = series1;
                });
        }
    };
</script>

<style lang="css" scoped>
    #TE_001 {
        width: 100%;
        height: 100%;
    }
</style>