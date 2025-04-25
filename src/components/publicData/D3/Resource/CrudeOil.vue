<template lang="html">

  <div id="chartdiv"></div>


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
      //   if (this.$cookies.isKey("information")) {
      //     return JSON.parse(Decode.decode(this.$cookies.get("information")));
      //   } else {
      //     return "";
      //   }
      // }
    },
    mounted() {
      // this.getDataGraph()
      let chart = am4core.create("chartdiv", am4charts.XYChart);
      chart.dataSource.load();
      chart.responsive.enabled = true;
      chart.paddingBottom = 10;

      let title = chart.titles.create();
      title.text = "Crude Oil Spot Price (Dollar/Barrel)";
      title.align = "center";
      title.fontSize = 12;
      title.marginBottom = 8;
      title.fontWeight = 600;

      var label = chart.chartContainer.createChild(am4core.Label);
      label.text = "Source: EIA Short-Term Energy Outlook";
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
                var data = ["RP_009"];//DWF003501  UAT RP_009
                // var data = ["DWF003501"];//PRO
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
      // let title = chart.titles.create();
      // title.text = "Crude Oil Spot Price (Dollar/Barrel)";
      // title.align = "center";
      // title.fontSize = 12;
      // title.marginBottom = 8;
      // title.fontWeight = 600;

      // var label = chart.chartContainer.createChild(am4core.Label);
      // label.text = "Source: EIA Short-Term Energy Outlook";
      // label.align = "right";
      // label.fontSize = 8;

      let data_chart = [];
      // ดึกข้อมูลจาก backend
      this.axios
        .get(process.env.VUE_APP_API_BACKEND + "/datasourceDWF003501")
        .then(response => {
          // console.log(response);
          this.datas = response.data;

          // console.log("5555555555555555555");
          // console.log(response.data);

          let json = this.datas.data; //แปลง response.data ให้เป็น json
          //  console.log(json);
          let count = 0;
          //var jsonData = {};

          json.forEach(element => {
            //่แยกส่วน json
            var jsonData = {};
            if (element.Product == "WTI Crude Oil Spot Price") {
              //แพ็คข้อมูลที่ต้องการ
              jsonData["Period"] = element.Year + " " + element.Month;
              jsonData["WTI"] = +element.Value;
              jsonData["Brent"] = null;
            } else if (element.Product == "Brent Crude Oil Spot Price") {
              jsonData["Period"] = element.Year + " " + element.Month;
              jsonData["WTI"] = null;
              jsonData["Brent"] = +element.Value;
            }

            data_chart.push(jsonData);
          });
          // console.log(data_chart);

          data_chart.sort((a, b) => (a.Period < b.Period ? -1 : 1)); //เรียงข้อมูลปีจากน้อยไปมาก
        })
        .then(status => {
          // console.log(data_chart);

          chart.dataSource.load();

          // Add data
          chart.data = data_chart;

          // [
          //   {
          //     Period: "2018 05",
          //     WTI: 69.98,
          //     Brent: 76.97
          //   },
          //   {
          //     Period: "2018 06",
          //     WTI: 67.87,
          //     Brent: 74.41
          //   },
          //   {
          //     Period: "2018 07",
          //     WTI: 70.98,
          //     Brent: 74.25
          //   },
          //   {
          //     Period: "2018 08",
          //     WTI: 68.06,
          //     Brent: 72.53
          //   },
          //   {
          //     Period: "2018 09",
          //     WTI: 70.23,
          //     Brent: 78.89
          //   },
          //   {
          //     Period: "2018 10",
          //     WTI: 70.75,
          //     Brent: 81.03
          //   },
          //   {
          //     Period: "2018 11",
          //     WTI: 56.96,
          //     Brent: 64.75
          //   },
          //   {
          //     Period: "2018 12",
          //     WTI: 49.52,
          //     Brent: 57.36
          //   },
          //   {
          //     Period: "2019 01",
          //     WTI: 51.38,
          //     Brent: 59.41
          //   },
          //   {
          //     Period: "2019 02",
          //     WTI: 54.95,
          //     Brent: 63.96
          //   },
          //   {
          //     Period: "2019 03",
          //     WTI: 58.15,
          //     Brent: 66.14
          //   },
          //   {
          //     Period: "2019 04",
          //     WTI: 63.86,
          //     Brent: 71.23
          //   },
          //   {
          //     Period: "2019 05",
          //     WTI: 64,
          //     Brent: 73
          //   }
          // ];

          /* Create axes */
          var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
          categoryAxis.dataFields.category = "Period";
          categoryAxis.renderer.labels.template.fontSize = 10;

          // Create value axis
          var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
          valueAxis.renderer.labels.template.fontSize = 10;

          // Create series
          var series1 = chart.series.push(new am4charts.LineSeries());
          series1.dataFields.valueY = "WTI";
          series1.dataFields.categoryX = "Period";
          series1.name = "WTI";
          series1.strokeWidth = 2;
          series1.tensionX = 0.7;
          // series1.tooltipText = "Year :{Period}\nWTI:{WTI}";
          series1.stroke = am4core.color("#125488");
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
          series1.tooltip.background.cornerRadius = 20;
          series1.tooltip.background.strokeOpacity = 0;
          series1.tooltip.pointerOrientation = "vertical";
          series1.tooltip.label.minWidth = 40;
          series1.tooltip.label.minHeight = 40;
          series1.tooltip.label.textAlign = "middle";
          series1.tooltip.label.textValign = "middle";

          /// Brent
          var series2 = chart.series.push(new am4charts.LineSeries());
          series2.dataFields.valueY = "Brent";
          series2.dataFields.categoryX = "Period";
          series2.name = "Brent";
          series2.strokeWidth = 2;
          // series2.strokeDasharray = 4;
          series2.tensionX = 0.7;
          // series2.tooltipText = "Year :{Period}\nBrent:{Brent}";
          series2.stroke = am4core.color("#ADD9D8");
          //

          // // Make bullets grow on hover
          var bullet2 = series2.bullets.push(new am4charts.CircleBullet());
          bullet2.circle.strokeWidth = 1;
          bullet2.circle.radius = 2;
          bullet2.circle.fill = am4core.color("#fff");

          var bullethover2 = bullet2.states.create("hover");
          bullethover2.properties.scale = 1.3;

          // Drop-shaped tooltips
          series2.tooltip.background.cornerRadius = 20;
          series2.tooltip.background.strokeOpacity = 0;
          series2.tooltip.pointerOrientation = "vertical";
          series2.tooltip.label.minWidth = 40;
          series2.tooltip.label.minHeight = 40;
          series2.tooltip.label.textAlign = "middle";
          series2.tooltip.label.textValign = "middle";

          chart.legend = new am4charts.Legend();
          // chart.legend.parent = legendContainer;
          chart.legend.fontSize = 10;
          chart.legend.position = "top";
          chart.legend.itemContainers.template.paddingTop = 1;
          chart.legend.itemContainers.template.paddingBottom = 1;

          chart.cursor = new am4charts.XYCursor();
          chart.cursor.behavior = "panXY";
          chart.cursor.xAxis = dateAxis;
          chart.cursor.snapToSeries = series1;
        });
    }
  };
</script>

<style lang="css" scoped>
  #chartdiv {
    width: 100%;
    height: 100%;
  }
</style>