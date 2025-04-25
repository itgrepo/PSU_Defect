<template lang="html">
    <div id="Mobile"></div>

</template>

<script>
    import { Encode, Decode } from "@/services";
    import * as am4core from "@amcharts/amcharts4/core";
    import * as am4charts from "@amcharts/amcharts4/charts";
    import am4themes_animated from "@amcharts/amcharts4/themes/animated";
    import { log } from "util";
    am4core.useTheme(am4themes_animated);
    export default {
        data() {
            return {};
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
            let chart = am4core.create("Mobile", am4charts.XYChart);
            // title
            let title1 = chart.titles.create();
            title1.text = "(Unit: Baht/Minute)";
            title1.align = "center";
            title1.fontSize = 12;
            title1.marginBottom = 8;
            title1.fontWeight = 600;

            let title = chart.titles.create();
            title.text = "Mobile Revenue per Minute (RPM)";
            title.align = "center";
            title.fontSize = 12;
            title.marginBottom = 8;
            title.fontWeight = 600;

            var label = chart.chartContainer.createChild(am4core.Label);
            label.text = "Source: NBTC";
            label.align = "right";
            label.fontSize = 8;

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
                                var data = ["TM_003"];
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
                                               


                                        } else {
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
            let data_chartCon = [];

            this.axios
                .get(process.env.VUE_APP_API_BACKEND + "/datasourceDWT001401")
                .then(response => {
                    this.dataCon = response.data;
                    // console.log(this.dataCon);

                    let json = this.dataCon;
                    json.forEach(element => {
                        var JsonDataCon = {};
                        if (element.Type === "TRUE Mobile Group") {
                            JsonDataCon["Period"] = element.Year + " " + element.Quarter;
                            JsonDataCon["TRUE"] = +element.Value;
                        } else if (element.Type == "AIS Group") {
                            JsonDataCon["Period"] = element.Year + " " + element.Quarter;
                            JsonDataCon["AIS"] = +element.Value;
                        } else if (element.Type == "DTAC Group") {
                            JsonDataCon["Period"] = element.Year + " " + element.Quarter;
                            JsonDataCon["DTAC"] = +element.Value;
                        } else if (element.Type == "Blended") {
                            JsonDataCon["Period"] = element.Year + " " + element.Quarter;
                            JsonDataCon["Blended"] = +element.Value;

                        }

                        data_chartCon.push(JsonDataCon);

                    });

                })
                .then(status => {
                    var datagrap = data_chartCon;
                    datagrap.sort((a, b) => (a.Period < b.Period ? -1 : 1));
                    // console.log(datagrap);

                    chart.data = datagrap;

                    var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
                    categoryAxis.dataFields.category = "Period";
                    categoryAxis.renderer.labels.template.fontSize = 10;

                    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
                    valueAxis.renderer.labels.template.fontSize = 10;

                    var series1 = chart.series.push(new am4charts.LineSeries());
                    series1.dataFields.valueY = "AIS";
                    series1.dataFields.categoryX = "Period";
                    // series1.tooltipText = "Year: {Period}\nULG : {ULG} \nGASOHOL91:{GASOHOL91}\nGASOHOL95 E85:{GASOHOL95 E85}\nH-DIESEL:{H-DIESEL}\nEthanol:{Ethanol}\nBiodiesel (B100):{Biodiesel (B100)}"
                    series1.name = "AIS";
                    series1.strokeWidth = 2;
                    // series1.minBulletDistance = 1;
                    series1.tensionX = 0.7;
                    series1.stroke = am4core.color("#70ad47");

                    series1.tooltip.background.cornerRadius = 20;
                    series1.tooltip.background.strokeOpacity = 0;
                    series1.tooltip.pointerOrientation = "vertical";
                    series1.tooltip.label.minWidth = 40;
                    series1.tooltip.label.minHeight = 40;
                    series1.tooltip.label.textAlign = "middle";
                    series1.tooltip.label.textValign = "middle";

                    var bullet1 = series1.bullets.push(new am4charts.CircleBullet());
                    bullet1.circle.strokeWidth = 1;
                    bullet1.circle.radius = 2;
                    bullet1.circle.fill = am4core.color("#fff");

                    var bullethover1 = bullet1.states.create("hover");
                    bullethover1.properties.scale = 1.3;

                    var series2 = chart.series.push(new am4charts.LineSeries());
                    series2.dataFields.valueY = "DTAC";
                    series2.dataFields.categoryX = "Period";
                    // series2.tooltipText = "DTAC : {DTAC}";
                    series2.name = "DTAC";
                    series2.strokeWidth = 2;
                    series2.tensionX = 0.7;
                    // series2.minBulletDistance = 1;
                    series2.stroke = am4core.color("#5b9bd5");


                    series2.tooltip.background.cornerRadius = 20;
                    series2.tooltip.background.strokeOpacity = 0;
                    series2.tooltip.pointerOrientation = "vertical";
                    series2.tooltip.label.minWidth = 40;
                    series2.tooltip.label.minHeight = 40;
                    series2.tooltip.label.textAlign = "middle";
                    series2.tooltip.label.textValign = "middle";


                    var bullet2 = series2.bullets.push(new am4charts.CircleBullet());
                    bullet2.circle.strokeWidth = 1;
                    bullet2.circle.radius = 2;
                    bullet2.circle.fill = am4core.color("#fff");

                    var bullethover2 = bullet2.states.create("hover");
                    bullethover2.properties.scale = 1.3;


                    var series3 = chart.series.push(new am4charts.LineSeries());
                    series3.dataFields.valueY = "TRUE";
                    series3.dataFields.categoryX = "Period";
                    // series3.tooltipText = "TRUE : {TRUE}";
                    series3.name = "TRUE";
                    series3.strokeWidth = 2;
                    series3.tensionX = 0.7;
                    // series3.minBulletDistance = 1;


                    series3.tooltip.background.cornerRadius = 20;
                    series3.tooltip.background.strokeOpacity = 0;
                    series3.tooltip.pointerOrientation = "vertical";
                    series3.tooltip.label.minWidth = 40;
                    series3.tooltip.label.minHeight = 40;
                    series3.tooltip.label.textAlign = "middle";
                    series3.tooltip.label.textValign = "middle";
                    series3.stroke = am4core.color("#ff5757");

                    var bullet3 = series3.bullets.push(new am4charts.CircleBullet());
                    bullet3.circle.strokeWidth = 1;
                    bullet3.circle.radius = 2;
                    bullet3.circle.fill = am4core.color("#fff");

                    var bullethover3 = bullet3.states.create("hover");
                    bullethover3.properties.scale = 1.3;

                    var series4 = chart.series.push(new am4charts.LineSeries());
                    series4.dataFields.valueY = "Blended";
                    series4.dataFields.categoryX = "Period";

                    series4.name = "Blended";
                    series4.strokeWidth = 2;
                    series4.tensionX = 0.7;
                    // series4.minBulletDistance = 1;
                    series4.strokeDasharray = 4;
                    series4.stroke = am4core.color("#0d0d0d");

                    series4.tooltip.background.cornerRadius = 20;
                    series4.tooltip.background.strokeOpacity = 0;
                    series4.tooltip.pointerOrientation = "vertical";
                    series4.tooltip.label.minWidth = 40;
                    series4.tooltip.label.minHeight = 40;
                    series4.tooltip.label.textAlign = "middle";
                    series4.tooltip.label.textValign = "middle";


                    var bullet4 = series4.bullets.push(new am4charts.CircleBullet());
                    bullet4.circle.strokeWidth = 1;
                    bullet4.circle.radius = 2;
                    bullet4.circle.fill = am4core.color("#fff");

                    var bullethover4 = bullet4.states.create("hover");
                    bullethover4.properties.scale = 1.3;

                    chart.legend = new am4charts.Legend();
                    // chart.legend.parent = legendContainer;
                    chart.legend.fontSize = 10;
                    chart.legend.position = "top";
                    chart.legend.itemContainers.template.paddingTop = 0.5;
                    chart.legend.itemContainers.template.paddingBottom = 0.5;

                    chart.cursor = new am4charts.XYCursor();
                    chart.cursor.behavior = "panXY";
                    chart.cursor.xAxis = dateAxis;
                    chart.cursor.snapToSeries = series1;
                });
        }
    };
</script>

<style lang='css' scoped>
    #Mobile {
        width: 100%;
        height: 100%;
    }
</style>