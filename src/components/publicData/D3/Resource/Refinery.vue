<template lang="html">
  <div id="chart3"></div>

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
      //   if (this.$cookies.isKey("information")) {
      //     return JSON.parse(Decode.decode(this.$cookies.get("information")));
      //   } else {
      //     return "";
      //   }
      // }
    },
    mounted() {
      // this.getDataGraph()
      let chart = am4core.create("chart3", am4charts.XYChart);
      // title
      let title = chart.titles.create();
      title.text = "Refinery Utilization (%)";
      title.align = "center";
      title.fontSize = 12;
      title.marginBottom = 8;
      title.fontWeight = 600;

      var label = chart.chartContainer.createChild(am4core.Label);
      label.text = "Source: EPPO";
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
                // var data = ["DWRS016"];//PRO
                var data = ["RS_016"];// UAT 
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
        .get(process.env.VUE_APP_API_BACKEND + "/datasourceDWF021401")
        .then(response => {
          this.dataCon = response.data;
          // console.log(this.dataCon);

          let json = this.dataCon;
          json.forEach(element => {
            var JsonDataCon = {};
            // var ulgdate = element.Period.split("/")
            if (element.SubType === "ESSO") {
              JsonDataCon["Period"] = element.Year + " " + element.Month;
              JsonDataCon["ESSO"] = +element.Value;
              JsonDataCon["BCP"] = null;
              JsonDataCon["THAI OIL (TOP)"] = null;
              JsonDataCon["TPI/IRPC"] = null;
              JsonDataCon["STAR REFINERY CO.,LTD. (SPRC)"] = null;
              JsonDataCon["PTTAR/PTTGC"] = null;
            } else if (element.SubType == "BCP") {
              JsonDataCon["Period"] = element.Year + " " + element.Month;
              JsonDataCon["BCP"] = +element.Value;
              JsonDataCon["THAI OIL (TOP)"] = null;
              JsonDataCon["ESSO"] = null;
              JsonDataCon["TPI/IRPC"] = null;
              JsonDataCon["STAR REFINERY CO.,LTD. (SPRC)"] = null;
              JsonDataCon["PTTAR/PTTGC"] = null;
            } else if (element.SubType == "THAI OIL (TOP)") {
              JsonDataCon["Period"] = element.Year + " " + element.Month;
              JsonDataCon["BCP"] = null;
              JsonDataCon["THAI OIL (TOP)"] = +element.Value;
              JsonDataCon["ESSO"] = null;
              JsonDataCon["TPI/IRPC"] = null;
              JsonDataCon["STAR REFINERY CO.,LTD. (SPRC)"] = null;
              JsonDataCon["PTTAR/PTTGC"] = null;
            } else if (element.SubType == "TPI/IRPC") {
              JsonDataCon["Period"] = element.Year + " " + element.Month;
              JsonDataCon["BCP"] = null;
              JsonDataCon["THAI OIL (TOP)"] = null;
              JsonDataCon["ESSO"] = null;
              JsonDataCon["TPI/IRPC"] = +element.Value;
              JsonDataCon["STAR REFINERY CO.,LTD. (SPRC)"] = null;
              JsonDataCon["PTTAR/PTTGC"] = null;
            } else if (element.SubType == "STAR REFINERY CO.,LTD. (SPRC)") {
              JsonDataCon["Period"] = element.Year + " " + element.Month;
              JsonDataCon["BCP"] = null;
              JsonDataCon["THAI OIL (TOP)"] = null;
              JsonDataCon["ESSO"] = null;
              JsonDataCon["TPI/IRPC"] = null;
              JsonDataCon["STAR REFINERY CO.,LTD. (SPRC)"] = +element.Value;
              JsonDataCon["PTTAR/PTTGC"] = null;
            } else if (element.SubType == "PTTAR/PTTGC") {
              JsonDataCon["Period"] = element.Year + " " + element.Month;
              JsonDataCon["BCP"] = null;
              JsonDataCon["THAI OIL (TOP)"] = null;
              JsonDataCon["ESSO"] = null;
              JsonDataCon["TPI/IRPC"] = null;
              JsonDataCon["STAR REFINERY CO.,LTD. (SPRC)"] = null;
              JsonDataCon["PTTAR/PTTGC"] = +element.Value;
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

          //     [
          //   {
          //     "Period": "16-May-19",
          //     "ULG": 32.7,
          //     "GASOHOL91": 25,
          //     "GASOHOL95 E85": 17,
          //     "H-DIESEL": 23.9,
          //     "Ethanol": 19.9,
          //     "Biodiesel (B100)": 20.9
          //   },
          //   {
          //     "Period": "17-May-19",
          //     "ULG": 32.9,
          //     "GASOHOL91": 25.2,
          //     "GASOHOL95 E85": 17.3,
          //     "H-DIESEL": 24.1,
          //     "Ethanol": 20.2,
          //     "Biodiesel (B100)": 2BCP
          //   },
          //   {
          //     "Period": "18-May-19",
          //     "ULG": 3PTTAR/PTTGC,
          //     "GASOHOL91": 25.5,
          //     "GASOHOL95 E85": 17.5,
          //     "H-DIESEL": 24.4,
          //     "Ethanol": 20.4,
          //     "Biodiesel (B100)": 21.4
          //   },
          //   {
          //     "Period": "19-May-19",
          //     "ULG": 33.4,
          //     "GASOHOL91": 25.7,
          //     "GASOHOL95 E85": 17.8,
          //     "H-DIESEL": 24.6,
          //     "Ethanol": 20.7,
          //     "Biodiesel (B100)": 21.6
          //   },
          //   {
          //     "Period": "20-May-19",
          //     "ULG": 33.7,
          //     "GASOHOL91": 26,
          //     "GASOHOL95 E85": 18,
          //     "H-DIESEL": 24.9,
          //     "Ethanol": 20.9,
          //     "Biodiesel (B100)": 21.9
          //   },
          //   {
          //     "Period": "21-May-19",
          //     "ULG": 33.9,
          //     "GASOHOL91": 26.2,
          //     "GASOHOL95 E85": 18.3,
          //     "H-DIESEL": 25.1,
          //     "Ethanol": 2THAI OIL (TOP),
          //     "Biodiesel (B100)": 2ESSO
          //   },
          //   {
          //     "Period": "22-May-19",
          //     "ULG": 34.2,
          //     "GASOHOL91": 26.5,
          //     "GASOHOL95 E85": 18.5,
          //     "H-DIESEL": 25.4,
          //     "Ethanol": 21.4,
          //     "Biodiesel (B100)": 22.4
          //   },
          //   {
          //     "Period": "23-May-19",
          //     "ULG": 34.4,
          //     "GASOHOL91": 26.7,
          //     "GASOHOL95 E85": 18.8,
          //     "H-DIESEL": 25.6,
          //     "Ethanol": 21.7,
          //     "Biodiesel (B100)": 22.6
          //   },
          //   {
          //     "Period": "24-May-19",
          //     "ULG": 34.7,
          //     "GASOHOL91": 27,
          //     "GASOHOL95 E85": 19,
          //     "H-DIESEL": 25.9,
          //     "Ethanol": 21.9,
          //     "Biodiesel (B100)": 22.9
          //   },
          //   {
          //     "Period": "25-May-19",
          //     "ULG": 34.9,
          //     "GASOHOL91": 27.2,
          //     "GASOHOL95 E85": 19.3,
          //     "H-DIESEL": 26.1,
          //     "Ethanol": 2TPI/IRPC,
          //     "Biodiesel (B100)": 2STAR REFINERY CO.,LTD. (SPRC)
          //   },
          //   {
          //     "Period": "26-May-19",
          //     "ULG": 35.2,
          //     "GASOHOL91": 27.5,
          //     "GASOHOL95 E85": 19.5,
          //     "H-DIESEL": 26.4,
          //     "Ethanol": 22.4,
          //     "Biodiesel (B100)": 23.4
          //   },
          //   {
          //     "Period": "27-May-19",
          //     "ULG": 35.4,
          //     "GASOHOL91": 27.7,
          //     "GASOHOL95 E85": 19.8,
          //     "H-DIESEL": 26.6,
          //     "Ethanol": 22.7,
          //     "Biodiesel (B100)": 23.6
          //   },
          //   {
          //     "Period": "28-May-19",
          //     "ULG": 35.7,
          //     "GASOHOL91": 28,
          //     "GASOHOL95 E85": 20,
          //     "H-DIESEL": 26.9,
          //     "Ethanol": 22.9,
          //     "Biodiesel (B100)": 23.9
          //   },
          //   {
          //     "Period": "29-May-19",
          //     "ULG": 35.9,
          //     "GASOHOL91": 28.2,
          //     "GASOHOL95 E85": 20.3,
          //     "H-DIESEL": 27.1,
          //     "Ethanol": 2PTTAR/PTTGC,
          //     "Biodiesel (B100)": 24.1
          //   },
          //   {
          //     "Period": "30-May-19",
          //     "ULG": 36.2,
          //     "GASOHOL91": 28.5,
          //     "GASOHOL95 E85": 20.5,
          //     "H-DIESEL": 27.4,
          //     "Ethanol": 23.4,
          //     "Biodiesel (B100)": 24.4
          //   }
          // ];

          // chart.dateFormatter.inputDateFormat = "dd-MM-yyyy";
          // // Create axes
          // var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
          //  dateAxis.renderer.labels.template.fontSize = 10;
          var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
          categoryAxis.dataFields.category = "Period";
          categoryAxis.renderer.labels.template.fontSize = 10;

          var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
          valueAxis.renderer.labels.template.fontSize = 10;

          // Create series ULG
          var series1 = chart.series.push(new am4charts.LineSeries());
          series1.dataFields.valueY = "BCP";
          series1.dataFields.categoryX = "Period";
          // series1.tooltipText = "Year: {Period}\nULG : {ULG} \nGASOHOL91:{GASOHOL91}\nGASOHOL95 E85:{GASOHOL95 E85}\nH-DIESEL:{H-DIESEL}\nEthanol:{Ethanol}\nBiodiesel (B100):{Biodiesel (B100)}"
          series1.name = "BCP";
          series1.strokeWidth = 2;
          // series1.minBulletDistance = 1;
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

          // Create series2 GASOHOL91
          var series2 = chart.series.push(new am4charts.LineSeries());
          series2.dataFields.valueY = "THAI OIL (TOP)";
          series2.dataFields.categoryX = "Period";
          // series2.tooltipText = "THAI OIL (TOP) : {THAI OIL (TOP)}";
          series2.name = "TOP";
          series2.strokeWidth = 2;
          series2.tensionX = 0.7;
          // series2.minBulletDistance = 1;
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

          // Create series3 GASOHOL95 E85
          var series3 = chart.series.push(new am4charts.LineSeries());
          series3.dataFields.valueY = "ESSO";
          series3.dataFields.categoryX = "Period";
          // series3.tooltipText = "ESSO : {ESSO}";
          series3.name = "ESSO";
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

          // Create series4 H-DIESEL
          var series4 = chart.series.push(new am4charts.LineSeries());
          series4.dataFields.valueY = "TPI/IRPC";
          series4.dataFields.categoryX = "Period";
          // series4.tooltipText = "H-DIESEL : {H-DIESEL}";
          series4.name = "IRPC";
          series4.strokeWidth = 2;
          series4.tensionX = 0.7;
          // series4.minBulletDistance = 1;
          series4.stroke = am4core.color("#EB8D50");

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
          bullet4.circle.fill = am4core.color("#fff");

          var bullethover4 = bullet4.states.create("hover");
          bullethover4.properties.scale = 1.3;

          // Create series5 Ethanol
          var series5 = chart.series.push(new am4charts.LineSeries());
          series5.dataFields.valueY = "STAR REFINERY CO.,LTD. (SPRC)";
          series5.dataFields.categoryX = "Period";
          // series5.tooltipText = "TPI/IRPC : {TPI/IRPC}";
          series5.name = "STAR";
          series5.strokeWidth = 2;
          // series5.minBulletDistance = 1;
          series5.tensionX = 0.7;
          series5.stroke = am4core.color("#F46D90");

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
          series6.dataFields.valueY = "PTTAR/PTTGC";
          series6.dataFields.categoryX = "Period";
          // series6.tooltipText = "Ethanol : {Ethanol}";
          series6.name = "PTTGC";
          series6.strokeWidth = 2;
          // series6.minBulletDistance = 1;
          series6.tensionX = 0.7;
          series6.stroke = am4core.color("#8895B1");

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

          var bullethover6 = bullet5.states.create("hover");
          bullethover6.properties.scale = 1.3;

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
  #chart3 {
    width: 100%;
    height: 100%;
  }
</style>