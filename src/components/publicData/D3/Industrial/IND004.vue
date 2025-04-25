<template lang="html">
  <div id="ind004"></div>
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
      userData() {
        if (this.$cookies.isKey("information")) {
          return JSON.parse(Decode.decode(this.$cookies.get("information")));
        } else {
          return "";
        }
      }
    },
    mounted() {
      // this.getDataGraph()
      let chart = am4core.create("ind004", am4charts.XYChart);
      // title
      let title = chart.titles.create();
      title.text = "Foreign Direct Investment, Classified by Country (Million Baht)";
      title.align = "center";
      title.fontSize = 11;
      title.marginBottom = 4;
      title.fontWeight = 600;

      var label = chart.chartContainer.createChild(am4core.Label);
      label.text = "Source: BOT";
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
                var data = ["IND_004"];
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
                          var user_id = Encode.encode(mySelf.userData.user_id);
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
        .get(process.env.VUE_APP_API_BACKEND + "/datasourceDWI002501")
        .then(response => {
          this.dataCon = response.data;
          // console.log(this.dataCon);

          let json = this.dataCon;
          json.forEach(element => {
            var JsonDataCon = {};
            // var ulgdate = element.Period.split("/")
            if (element.Type === "ASEAN") {
              JsonDataCon["Period"] = element.Year + " " + element.Quarter;
              JsonDataCon["ASEAN"] = element.Value;
            } else if (element.Type == "JAPAN") {
              JsonDataCon["Period"] = element.Year + " " + element.Quarter;
              JsonDataCon["JAPAN"] = element.Value;
            } else if (element.Type == "CHINA") {
              JsonDataCon["Period"] = element.Year + " " + element.Quarter;
              JsonDataCon["CHINA"] = element.Value;
            } else if (element.Type == "HONGKONG") {
              JsonDataCon["Period"] = element.Year + " " + element.Quarter;
              JsonDataCon["HONGKONG"] = element.Value;
            } else if (element.Type == "SOUTHKOREA") {
              JsonDataCon["Period"] = element.Year + " " + element.Quarter;
              JsonDataCon["SOUTHKOREA"] = element.Value;
            } else if (element.Type == "TAIWAN") {
              JsonDataCon["Period"] = element.Year + " " + element.Quarter;
              JsonDataCon["TAIWAN"] = element.Value;
            } else if (element.Type == "UNITEDSTATES") {
              JsonDataCon["Period"] = element.Year + " " + element.Quarter;
              JsonDataCon["UNITEDSTATES"] = element.Value;
            } else if (element.Type == "UNITEDKINGDOM") {
              JsonDataCon["Period"] = element.Year + " " + element.Quarter;
              JsonDataCon["UNITEDKINGDOM"] = element.Value;
            } else if (element.Type == "EU") {
              JsonDataCon["Period"] = element.Year + " " + element.Quarter;
              JsonDataCon["EU"] = element.Value;
            } else if (element.Type == "OTHERS") {
              JsonDataCon["Period"] = element.Year + " " + element.Quarter;
              JsonDataCon["OTHERS"] = element.Value;
            }
            // data_chartCon.push(JSON.stringify(JsonDataCon));
            // console.log(JsonDataCon);

            data_chartCon.push(JsonDataCon);
            // localStorage.setItem("JSON",JSON.stringify(JsonDataCon))
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

          // Create series ULG
          var series1 = chart.series.push(new am4charts.LineSeries());
          series1.dataFields.valueY = "ASEAN";
          series1.dataFields.categoryX = "Period";
          // series1.tooltipText = "Year: {Period}\nULG : {ULG} \nGASOHOL91:{GASOHOL91}\nGASOHOL95 E85:{GASOHOL95 E85}\nH-DIESEL:{H-DIESEL}\nEthanol:{Ethanol}\nBiodiesel (B100):{Biodiesel (B100)}"
          series1.name = "ASEAN";
          series1.strokeWidth = 2;
          // series1.minBulletDistance = 1;
          series1.tensionX = 0.7;
          series1.stroke = am4core.color("#D50000");

          // Drop-shaped tooltips
          series1.tooltip.background.cornerRadius = 20;
          series1.tooltip.background.strokeOpacity = 0;
          series1.tooltip.pointerOrientation = "vertical";
          series1.tooltip.label.minWidth = 40;
          series1.tooltip.label.minHeight = 40;
          series1.tooltip.label.textAlign = "middle";
          series1.tooltip.label.textValign = "middle";

          // Make bullets grow on hover
          var bullet1 = series1.bullets.push(new am4charts.CircleBullet());
          bullet1.circle.strokeWidth = 1;
          bullet1.circle.radius = 2;
          bullet1.circle.fill = am4core.color("#fff");

          var bullethover1 = bullet1.states.create("hover");
          bullethover1.properties.scale = 1.3;

          // Create series2 GASOHOL91
          var series2 = chart.series.push(new am4charts.LineSeries());
          series2.dataFields.valueY = "JAPAN";
          series2.dataFields.categoryX = "Period";
          // series2.tooltipText = "THAI OIL (TOP) : {THAI OIL (TOP)}";
          series2.name = "JAPAN";
          series2.strokeWidth = 2;
          series2.tensionX = 0.7;
          // series2.minBulletDistance = 1;
          series2.stroke = am4core.color("#311B92");

          // Drop-shaped tooltips
          series2.tooltip.background.cornerRadius = 20;
          series2.tooltip.background.strokeOpacity = 0;
          series2.tooltip.pointerOrientation = "vertical";
          series2.tooltip.label.minWidth = 40;
          series2.tooltip.label.minHeight = 40;
          series2.tooltip.label.textAlign = "middle";
          series2.tooltip.label.textValign = "middle";

          // Make bullets grow on hover
          var bullet2 = series2.bullets.push(new am4charts.CircleBullet());
          bullet2.circle.strokeWidth = 1;
          bullet2.circle.radius = 2;
          bullet2.circle.fill = am4core.color("#fff");

          var bullethover2 = bullet2.states.create("hover");
          bullethover2.properties.scale = 1.3;

          // Create series3 GASOHOL95 E85
          var series3 = chart.series.push(new am4charts.LineSeries());
          series3.dataFields.valueY = "CHINA";
          series3.dataFields.categoryX = "Period";
          // series3.tooltipText = "CHINA : {CHINA}";
          series3.name = "CHINA";
          series3.strokeWidth = 2;
          series3.tensionX = 0.7;
          // series3.minBulletDistance = 1;

          // Drop-shaped tooltips
          series3.tooltip.background.cornerRadius = 20;
          series3.tooltip.background.strokeOpacity = 0;
          series3.tooltip.pointerOrientation = "vertical";
          series3.tooltip.label.minWidth = 40;
          series3.tooltip.label.minHeight = 40;
          series3.tooltip.label.textAlign = "middle";
          series3.tooltip.label.textValign = "middle";
          series3.stroke = am4core.color("#1976D2");

          // Make bullets grow on hover
          var bullet3 = series3.bullets.push(new am4charts.CircleBullet());
          bullet3.circle.strokeWidth = 1;
          bullet3.circle.radius = 2;
          bullet3.circle.fill = am4core.color("#fff");

          var bullethover3 = bullet3.states.create("hover");
          bullethover3.properties.scale = 1.3;

          // Create series4 H-DIESEL
          var series4 = chart.series.push(new am4charts.LineSeries());
          series4.dataFields.valueY = "HONGKONG";
          series4.dataFields.categoryX = "Period";
          series4.name = "HONGKONG";
          series4.strokeWidth = 2;
          series4.tensionX = 0.7;
          // series4.minBulletDistance = 1;
          series4.stroke = am4core.color("#FF4081");

          // Drop-shaped tooltips
          series4.tooltip.background.cornerRadius = 20;
          series4.tooltip.background.strokeOpacity = 0;
          series4.tooltip.pointerOrientation = "vertical";
          series4.tooltip.label.minWidth = 40;
          series4.tooltip.label.minHeight = 40;
          series4.tooltip.label.textAlign = "middle";
          series4.tooltip.label.textValign = "middle";

          // Make bullets grow on hover
          var bullet4 = series4.bullets.push(new am4charts.CircleBullet());
          bullet4.circle.strokeWidth = 1;
          bullet4.circle.radius = 2;
          bullet4.circle.fill = am4core.color("#ffffff");

          var bullethover4 = bullet4.states.create("hover");
          bullethover4.properties.scale = 1.3;

          // Create series5 Ethanol
          var series5 = chart.series.push(new am4charts.LineSeries());
          series5.dataFields.valueY = "SOUTHKOREA";
          series5.dataFields.categoryX = "Period";
          // series5.tooltipText = "TPI/IRPC : {TPI/IRPC}";
          series5.name = "SOUTHKOREA";
          series5.strokeWidth = 2;
          // series5.minBulletDistance = 1;
          series5.tensionX = 0.7;
          series5.stroke = am4core.color("#FFEB3B");

          // Drop-shaped tooltips
          series5.tooltip.background.cornerRadius = 20;
          series5.tooltip.background.strokeOpacity = 0;
          series5.tooltip.pointerOrientation = "vertical";
          series5.tooltip.label.minWidth = 40;
          series5.tooltip.label.minHeight = 40;
          series5.tooltip.label.textAlign = "middle";
          series5.tooltip.label.textValign = "middle";

          // Make bullets grow on hover
          var bullet5 = series5.bullets.push(new am4charts.CircleBullet());
          bullet5.circle.strokeWidth = 1;
          bullet5.circle.radius = 2;
          bullet5.circle.fill = am4core.color("#fff");

          var bullethover5 = bullet5.states.create("hover");
          bullethover5.properties.scale = 1.3;

          // Create series6 Biodiesel (B100)

          var series6 = chart.series.push(new am4charts.LineSeries());
          series6.dataFields.valueY = "TAIWAN";
          series6.dataFields.categoryX = "Period";
          series6.name = "TAIWAN";
          series6.strokeWidth = 2;
          // series6.minBulletDistance = 1;
          series6.tensionX = 0.7;
          series6.stroke = am4core.color("#00E676");

          // Drop-shaped tooltips
          series6.tooltip.background.cornerRadius = 20;
          series6.tooltip.background.strokeOpacity = 0;
          series6.tooltip.pointerOrientation = "vertical";
          series6.tooltip.label.minWidth = 40;
          series6.tooltip.label.minHeight = 40;
          series6.tooltip.label.textAlign = "middle";
          series6.tooltip.label.textValign = "middle";

          // Make bullets grow on hover
          var bullet6 = series6.bullets.push(new am4charts.CircleBullet());
          bullet6.circle.strokeWidth = 1;
          bullet6.circle.radius = 2;
          bullet6.circle.fill = am4core.color("#fff");

          var bullethover6 = bullet6.states.create("hover");
          bullethover6.properties.scale = 1.3;

          // ========================================
          var series7 = chart.series.push(new am4charts.LineSeries());
          series7.dataFields.valueY = "UNITEDSTATES";
          series7.dataFields.categoryX = "Period";

          // series7.name = "UNITED STATES";
          series7.name = "US";
          series7.strokeWidth = 2;
          // series7.minBulletDistance = 1;
          series7.tensionX = 0.7;
          series7.stroke = am4core.color("#F9A825");

          // Drop-shaped tooltips
          series7.tooltip.background.cornerRadius = 20;
          series7.tooltip.background.strokeOpacity = 0;
          series7.tooltip.pointerOrientation = "vertical";
          series7.tooltip.label.minWidth = 40;
          series7.tooltip.label.minHeight = 40;
          series7.tooltip.label.textAlign = "middle";
          series7.tooltip.label.textValign = "middle";

          // Make bullets grow on hover
          var bullet7 = series7.bullets.push(new am4charts.CircleBullet());
          bullet7.circle.strokeWidth = 1;
          bullet7.circle.radius = 2;
          bullet7.circle.fill = am4core.color("#fff");

          var bullethover7 = bullet7.states.create("hover");
          bullethover7.properties.scale = 1.3;
          // ========================================

          // ========================================
          var series8 = chart.series.push(new am4charts.LineSeries());
          series8.dataFields.valueY = "UNITEDKINGDOM";
          series8.dataFields.categoryX = "Period";

          series8.name = "UK";
          // series8.name = "UNITED KINGDOM";
          series8.strokeWidth = 2;
          // series8.minBulletDistance = 1;
          series8.tensionX = 0.7;
          series8.stroke = am4core.color("#F4511E");

          // Drop-shaped tooltips
          series8.tooltip.background.cornerRadius = 20;
          series8.tooltip.background.strokeOpacity = 0;
          series8.tooltip.pointerOrientation = "vertical";
          series8.tooltip.label.minWidth = 40;
          series8.tooltip.label.minHeight = 40;
          series8.tooltip.label.textAlign = "middle";
          series8.tooltip.label.textValign = "middle";

          // Make bullets grow on hover
          var bullet8 = series8.bullets.push(new am4charts.CircleBullet());
          bullet8.circle.strokeWidth = 1;
          bullet8.circle.radius = 2;
          bullet8.circle.fill = am4core.color("#fff");

          var bullethover8 = bullet8.states.create("hover");
          bullethover8.properties.scale = 1.3;
          // ========================================

          // ========================================
          var series9 = chart.series.push(new am4charts.LineSeries());
          series9.dataFields.valueY = "EU";
          series9.dataFields.categoryX = "Period";
          // series9.tooltipText = "Ethanol : {Ethanol}";
          series9.name = "EU";
          series9.strokeWidth = 2;
          // series9.minBulletDistance = 1;
          series9.tensionX = 0.7;
          series9.stroke = am4core.color("#00ACC1");

          // Drop-shaped tooltips
          series9.tooltip.background.cornerRadius = 20;
          series9.tooltip.background.strokeOpacity = 0;
          series9.tooltip.pointerOrientation = "vertical";
          series9.tooltip.label.minWidth = 40;
          series9.tooltip.label.minHeight = 40;
          series9.tooltip.label.textAlign = "middle";
          series9.tooltip.label.textValign = "middle";

          // Make bullets grow on hover
          var bullet9 = series9.bullets.push(new am4charts.CircleBullet());
          bullet9.circle.strokeWidth = 1;
          bullet9.circle.radius = 2;
          bullet9.circle.fill = am4core.color("#fff");

          var bullethover9 = bullet9.states.create("hover");
          bullethover9.properties.scale = 1.3;
          // ========================================
          // ========================================
          var series10 = chart.series.push(new am4charts.LineSeries());
          series10.dataFields.valueY = "OTHERS";
          series10.dataFields.categoryX = "Period";
          // series10.tooltipText = "Ethanol : {Ethanol}";
          series10.name = "OTHERS";
          series10.strokeWidth = 2;
          // series10.minBulletDistance = 1;
          series10.tensionX = 0.7;
          series10.stroke = am4core.color("#B388FF");

          // Drop-shaped tooltips
          series10.tooltip.background.cornerRadius = 20;
          series10.tooltip.background.strokeOpacity = 0;
          series10.tooltip.pointerOrientation = "vertical";
          series10.tooltip.label.minWidth = 40;
          series10.tooltip.label.minHeight = 40;
          series10.tooltip.label.textAlign = "middle";
          series10.tooltip.label.textValign = "middle";

          // Make bullets grow on hover
          var bullet10 = series10.bullets.push(new am4charts.CircleBullet());
          bullet10.circle.strokeWidth = 1;
          bullet10.circle.radius = 2;
          bullet10.circle.fill = am4core.color("#fff");

          var bullethover10 = bullet10.states.create("hover");
          bullethover10.properties.scale = 1.3;
          // ========================================

          chart.legend = new am4charts.Legend();
          // chart.legend.parent = legendContainer;
          // chart.legend.maxWidth = 100;
          chart.legend.fontSize = 7;
          chart.legend.position = "top";
          chart.legend.itemContainers.template.paddingTop = 0.1;
          chart.legend.itemContainers.template.paddingBottom = 0.1;

          chart.cursor = new am4charts.XYCursor();
          chart.cursor.behavior = "panXY";
          chart.cursor.xAxis = dateAxis;
          chart.cursor.snapToSeries = series1;
        });
    }
  };
</script>

<style lang="css" scoped>
  #ind004 {
    width: 100%;
    height: 100%;
  }
</style>