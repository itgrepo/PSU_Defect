<template lang="html">
  <div id="ThaiAgricultural"></div>

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
      let chart = am4core.create("ThaiAgricultural", am4charts.XYChart);
      // title
      let title = chart.titles.create();
      title.text = "Export of Thai Agricultural Products (M.Baht)";
      title.align = "center";
      title.fontSize = 12;
      title.marginBottom = 8;
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
                var data = ["AFM_011"];
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

      // chart.dataSource.load();
      // let data1 = []
      // this.axios.get(process.env.VUE_APP_API_BACKEND + "/datasourceDWF021401").then(response => {
      //   console.log(response.data);
      //   this.data = response.data;
      //   let json1 = this.data;
      //   json1.forEach(element => {
      //     var ulgdate1 = element.Period.split("/")
      //     var JsonDataCon1 = {};
      //     JsonDataCon1["Period"] = ulgdate1[1]+"/"+ulgdate1[0]+"/"+element.Year;
      //     JsonDataCon1["Biodiesel (B100)"] = +element["Biodiesel (B100) Reference Price"];
      //     JsonDataCon1["Ethanol"] = +element["Ethanol Reference Price"];
      //     // console.log(JsonDataCon1);

      //     data1.push(JsonDataCon1)
      //   })

      // })

      let data_chartCon = [];

      this.axios
        .get(process.env.VUE_APP_API_BACKEND + "/datasourceDWG000501")
        .then(response => {
          this.dataCon = response.data;
          // console.log(this.dataCon);

          let json = this.dataCon;
          json.forEach(element => {
            var JsonDataCon = {};
            // var ulgdate = element.Period.split("/")
            if (element.SubType === "Agriculture Total") {
              JsonDataCon["Period"] = element.Year + " " + element.Month;
              JsonDataCon["Agriculture Product"] = +element.Value;
            } else if (element.SubType === "Fishery") {
              JsonDataCon["Period"] = element.Year + " " + element.Month;
              JsonDataCon["Fishery"] = element.Value;
            }
            else if (element.SubType === "Agro-manufacturing Products") {
              JsonDataCon["Period"] = element.Year + " " + element.Month;
              JsonDataCon["Agro-manufacturing Products"] = element.Value;
            }
            // data_chartCon.push(JSON.stringify(JsonDataCon));
            // console.log(JsonDataCon);

            data_chartCon.push(JsonDataCon);
            // localStorage.setItem("JSON",JSON.stringify(JsonDataCon))
          });
          //var JsonDataCon1 = JSON.parse(localStorage.getItem("JSON"))
          //  console.log("JsonDataCon1")
          //   console.log(data_chartCon)
        })
        .then(status => {
          var datagrap = data_chartCon;
          datagrap.sort((a, b) => (a.Period < b.Period ? -1 : 1));
          // console.log(datagrap);

          chart.data = datagrap;


          // chart.dateFormatter.inputDateFormat = "dd-MM-yyyy";
          // // Create axes
          // var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
          //  dateAxis.renderer.labels.template.fontSize = 10;
          var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
          categoryAxis.dataFields.category = "Period";
          categoryAxis.renderer.labels.template.fontSize = 10;

          var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
          valueAxis.renderer.labels.template.fontSize = 10;


          var series1 = chart.series.push(new am4charts.LineSeries());
          series1.dataFields.valueY = "Agriculture Product";
          series1.dataFields.categoryX = "Period";
          series1.name = "Agriculture Product";
          series1.strokeWidth = 2;
          series1.tensionX = 0.7;
          series1.stroke = am4core.color("#326199");

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


          var series2 = chart.series.push(new am4charts.LineSeries());
          series2.dataFields.valueY = "Fishery";
          series2.dataFields.categoryX = "Period";
          series2.name = "Fishery";
          series2.strokeWidth = 2;
          series2.tensionX = 0.7;
          series2.stroke = am4core.color("#4FB1A1");

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


          var series3 = chart.series.push(new am4charts.LineSeries());
          series3.dataFields.valueY = "Agro-manufacturing Products";
          series3.dataFields.categoryX = "Period";
          series3.name = "Agro-manufacturing Products";
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
          series3.stroke = am4core.color("#FCC055");

          // Make bullets grow on hover
          var bullet3 = series3.bullets.push(new am4charts.CircleBullet());
          bullet3.circle.strokeWidth = 1;
          bullet3.circle.radius = 2;
          bullet3.circle.fill = am4core.color("#fff");

          var bullethover3 = bullet3.states.create("hover");
          bullethover3.properties.scale = 1.3;


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
  #ThaiAgricultural {
    width: 100%;
    height: 100%;
  }
</style>