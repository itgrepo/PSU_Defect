<template lang="html">
  <div id="chart1"></div>
</template>

<script>
  import { Encode, Decode } from '@/services'
  import * as am4core from "@amcharts/amcharts4/core";
  import * as am4charts from "@amcharts/amcharts4/charts";
  import am4themes_animated from "@amcharts/amcharts4/themes/animated";
  import { log } from "util";
  am4core.useTheme(am4themes_animated);
  export default {
    data() {
      return {
        dataSourceGraph: []
      }
    },
    computed: {
      userData() {
        if (this.$cookies.isKey('information')) {
          return JSON.parse(Decode.decode(this.$cookies.get('information')))
        } else {
          return ''
        }
      }
    },
    mounted() {
      let chart = am4core.create("chart1", am4charts.XYChart);
      chart.dataSource.load();
      chart.responsive.enabled = true;
      chart.paddingBottom = 10;
      // title

      let title1 = chart.titles.create();
      title1.text = "Other Liquids Production & Consumption (M.BBL/Day)";
      title1.align = "center";
      title1.fontSize = 12;
      title1.marginBottom = 8;
      title1.fontWeight = 600;

      let title = chart.titles.create();
      title.text = "Actual and Forecast of World Petroleum and \n ";
      title.align = "center";
      title.fontSize = 12;
      title.marginBottom = 8;
      title.fontWeight = 600;

      var label = chart.chartContainer.createChild(am4core.Label);
      label.text = "Source: EIA Short-Term Energy Outlook";
      label.align = "right";
      label.fontSize = 8;

      chart.exporting.menu = new am4core.ExportMenu();
      const mySelf = this
      chart.exporting.menu.items = [
        {
          // "label": "...",
          // "type": "custom",
          // "options": {
          //   callback: function() {
          //     if (mySelf.userData) {
          //       const axios = require('axios')
          //       // var data = ['DWF002701', 'DWF003401']
          //       var data = ['DWF002701']
          //       axios.post(process.env.VUE_APP_API_BACKEND + "/getExportExcelGraph", {
          //         'source_id': data
          //       }).then(response => {
          //         if (response.data[0].file_name !== '' && response.data[0].mongo_file_id_excel !== '') {
          //           var user_id = Encode.encode(mySelf.userData.user_id)
          //           window.location.assign(process.env.VUE_APP_API_BACKEND + '/file/downloadFileMongoGraph/' + response.data[0].file_name + '.xlsx?file_id=' + response.data[0].mongo_file_id_excel + '&user_id===' + user_id + '&firstname=' + mySelf.userData.firstname + '&lastname=' + mySelf.userData.lastname + '&file_type=excel')
          //         } else {
          //           mySelf.$swal('No file', '', 'error')
          //         }
          //       })
          //     } else {
          //       mySelf.$swal('Please login', '', 'warning')
          //     }
          //   }
          // }
          "label": "...",
          "menu": [
            {
              "type": "custom",
              "label": "RS_019",
              "options": {
                callback: function () {

                  if (localStorage.getItem('Fname') != null) {
                    const axios = require("axios");
                    // var data = ["DWF000501"];//pro
                    var data = ["RS_019"];//UAT RS_019
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
            },
            {
              "type": "custom",
              "label": "RD_022",
              "options": {
                callback: function () {
                  if (localStorage.getItem('Fname') != null) {
                    const axios = require("axios");
                    var data = ["RD_022"];//UAT RD_022
                    // var data = ["DWF003201"];//PRO
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
            },

          ]
        }]

      let data_chartCon = [];
      this.axios.get(process.env.VUE_APP_API_BACKEND + "/datasourceDWF003401").then(response => {
        // console.log(response.data);
        // console.log("1111111111111");
        this.dataCon = response.data;
        let json = JSON.parse(JSON.stringify(this.dataCon));
        json.forEach(element => {
          var JsonDataCon = {};
          if (element.Type == "Historical") {
            JsonDataCon["Year"] = element.Year + " " + element.Month;
            JsonDataCon["Consumption Historical"] = +element.Value;
            JsonDataCon["Consumption Forecast"] = null;
            JsonDataCon["Production Historical"] = null;
            JsonDataCon["Production Forecast"] = null;
          } else if (element.Type == "Forecast") {
            JsonDataCon["Year"] = element.Year + " " + element.Month;
            JsonDataCon["Consumption Historical"] = null;
            JsonDataCon["Consumption Forecast"] = +element.Value;
            JsonDataCon["Production Historical"] = null;
            JsonDataCon["Production Forecast"] = null;
          }
          // else {
          //   JsonDataCon["Year"] = element.Year + " " + element.Month;
          //   JsonDataCon["Consumption Historical"] = null;
          //   JsonDataCon["Consumption Forecast"] = null;
          //   JsonDataCon["Production Historical"] =null;
          //   JsonDataCon["Production Forecast"] = null;
          // }
          data_chartCon.push(JsonDataCon);
        })
      })
      let data_chart = [];
      this.axios.get(process.env.VUE_APP_API_BACKEND + "/datasourceDWF002701").then(response => {
        // console.log(response.data);
        this.datas = response.data;
        let json = JSON.parse(JSON.stringify(this.datas));
        json.forEach(element => {
          var JsonData = {};
          if (element.Type == "Historical") {
            JsonData["Year"] = element.Year + " " + element.Month;
            JsonData["Production Historical"] = +element.Value;
            JsonData["Production Forecast"] = null;
            JsonData["Consumption Historical"] = null;
            JsonData["Consumption Forecast"] = null;
          } else if (element.Type == "Forecast") {
            JsonData["Year"] = element.Year + " " + element.Month;
            JsonData["Production Historical"] = null;
            JsonData["Production Forecast"] = +element.Value;
            JsonData["Consumption Historical"] = null;
            JsonData["Consumption Forecast"] = null;
          }

          data_chart.push(JsonData);
        });


      }).then(status => {
        // console.log(data_chartCon);
        // console.log(data_chart);


        var datagrap = data_chartCon.concat(data_chart)
        chart.data = datagrap;
        // console.log(datagrap);

        // [

        //   {
        //     "Year": "2018 05",
        //     "Production Historical": 99.5,
        //     "Production Forecast": null,
        //     "Consumption Historical": 99.2,
        //     "Consumption Forecast": null
        //   },
        //   {
        //     "Year": "2018 06",
        //     "Production Historical": 100.4,
        //     "Production Forecast": null,
        //     "Consumption Historical": 101,
        //     "Consumption Forecast": null
        //   },
        //   {
        //     "Year": "2018 07",
        //     "Production Historical": 101.2,
        //     "Production Forecast": null,
        //     "Consumption Historical": 100.9,
        //     "Consumption Forecast": null
        //   },
        //   {
        //     "Year": "2018 08",
        //     "Production Historical": 101.5,
        //     "Production Forecast": null,
        //     "Consumption Historical": 101.2,
        //     "Consumption Forecast": null
        //   },
        //   {
        //     "Year": "2018 09",
        //     "Production Historical": 101.6,
        //     "Production Forecast": null,
        //     "Consumption Historical": 99.7,
        //     "Consumption Forecast": null
        //   },
        //   {
        //     "Year": "2018 10",
        //     "Production Historical": 102.4,
        //     "Production Forecast": null,
        //     "Consumption Historical": 100.3,
        //     "Consumption Forecast": null
        //   },
        //   {
        //     "Year": "2018 11",
        //     "Production Historical": 102.3,
        //     "Production Forecast": null,
        //     "Consumption Historical": 100.6,
        //     "Consumption Forecast": null
        //   },
        //   {
        //     "Year": "2018 12",
        //     "Production Historical": 101.7,
        //     "Production Forecast": null,
        //     "Consumption Historical": 100.5,
        //     "Consumption Forecast": null
        //   },
        //   {
        //     "Year": "2019 01",
        //     "Production Historical": 100.1,
        //     "Production Forecast": null,
        //     "Consumption Historical": 99.6,
        //     "Consumption Forecast": null
        //   },
        //   {
        //     "Year": "2019 02",
        //     "Production Historical": 100,
        //     "Production Forecast": null,
        //     "Consumption Historical": 101.6,
        //     "Consumption Forecast": null
        //   },
        //   {
        //     "Year": "2019 03",
        //     "Production Historical": 100.1,
        //     "Production Forecast": null,
        //     "Consumption Historical": 100.3,
        //     "Consumption Forecast": null
        //   },
        //   {
        //     "Year": "2019 04",
        //     "Production Historical": 100.1,
        //     "Production Forecast": 100.1,
        //     "Consumption Historical": 100.1,
        //     "Consumption Forecast": 100.1
        //   },
        //   {
        //     "Year": "2019 05",
        //     "Production Historical": null,
        //     "Production Forecast": 100,
        //     "Consumption Historical": null,
        //     "Consumption Forecast": 100
        //   },
        //   {
        //     "Year": "2019 06",
        //     "Production Historical": null,
        //     "Production Forecast": 100.7,
        //     "Consumption Historical": null,
        //     "Consumption Forecast": 102
        //   },
        //   {
        //     "Year": "2019 07",
        //     "Production Historical": null,
        //     "Production Forecast": 102,
        //     "Consumption Historical": null,
        //     "Consumption Forecast": 102
        //   },
        //   {
        //     "Year": "2019 08",
        //     "Production Historical": null,
        //     "Production Forecast": 101.6,
        //     "Consumption Historical": null,
        //     "Consumption Forecast": 102
        //   },
        //   {
        //     "Year": "2019 09",
        //     "Production Historical": null,
        //     "Production Forecast": 101.9,
        //     "Consumption Historical": null,
        //     "Consumption Forecast": 102
        //   },
        //   {
        //     "Year": "2019 10",
        //     "Production Historical": null,
        //     "Production Forecast": 102.1,
        //     "Consumption Historical": null,
        //     "Consumption Forecast": 101
        //   },
        //   {
        //     "Year": "2019 11",
        //     "Production Historical": null,
        //     "Production Forecast": 102.6,
        //     "Consumption Historical": null,
        //     "Consumption Forecast": 102
        //   },
        //   {
        //     "Year": "2019 12",
        //     "Production Historical": null,
        //     "Production Forecast": 102.2,
        //     "Consumption Historical": null,
        //     "Consumption Forecast": 103
        //   },
        //   {
        //     "Year": "2020 01",
        //     "Production Historical": null,
        //     "Production Forecast": 101.7,
        //     "Consumption Historical": null,
        //     "Consumption Forecast": 100
        //   },
        //   {
        //     "Year": "2020 02",
        //     "Production Historical": null,
        //     "Production Forecast": 101.6,
        //     "Consumption Historical": null,
        //     "Consumption Forecast": 103
        //   },
        //   {
        //     "Year": "2020 03",
        //     "Production Historical": null,
        //     "Production Forecast": 102.1,
        //     "Consumption Historical": null,
        //     "Consumption Forecast": 102
        //   },
        //   {
        //     "Year": "2020 04",
        //     "Production Historical": null,
        //     "Production Forecast": 102.8,
        //     "Consumption Historical": null,
        //     "Consumption Forecast": 102
        //   }
        // ];



        /* Create axes */
        var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
        categoryAxis.dataFields.category = "Year";
        categoryAxis.renderer.labels.template.fontSize = 10;

        // Create value axis
        var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis.renderer.labels.template.fontSize = 10;

        // Create series
        var series1 = chart.series.push(new am4charts.LineSeries());
        series1.dataFields.valueY = "Production Historical";
        series1.dataFields.categoryX = "Year";
        series1.name = "Production Historical";
        series1.strokeWidth = 2;
        series1.tensionX = 0.7;
        // series1.tooltipText = "Year :{Year}\nProduction Historical:{Production Historical}\nConsumption Historical:{Consumption Historical}";
        series1.stroke = am4core.color("#F8956F");
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

        /// Production Forecast
        var series2 = chart.series.push(new am4charts.LineSeries());
        series2.dataFields.valueY = "Production Forecast";
        series2.dataFields.categoryX = "Year";
        series2.name = "Production Forecast";
        series2.strokeWidth = 2;
        series2.strokeDasharray = 4;
        series2.tensionX = 0.7;
        // series2.tooltipText ="Year :{Year}\nProduction Forecast:{Production Forecast}\nConsumption Forecast:{Consumption Forecast}";
        series2.stroke = am4core.color("#DF825F");
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

        /// Chart 3 Consumption Historical
        var series3 = chart.series.push(new am4charts.LineSeries());
        series3.dataFields.valueY = "Consumption Historical";
        series3.dataFields.categoryX = "Year";
        series3.name = "Consumption Historical";
        series3.strokeWidth = 2;
        series3.tensionX = 0.7;
        // series3.tooltipText = "Year :{Year}\n Consumption Historical: {Consumption Historical}";
        series3.stroke = am4core.color("#36363D");

        //

        // Make bullets grow on hover
        var bullet3 = series3.bullets.push(new am4charts.CircleBullet());
        bullet3.circle.strokeWidth = 1;
        bullet3.circle.radius = 2;
        bullet3.circle.fill = am4core.color("#fff");

        var bullethover3 = bullet3.states.create("hover");
        bullethover3.properties.scale = 1.3;

        // Drop-shaped tooltips
        series3.tooltip.background.cornerRadius = 20;
        series3.tooltip.background.strokeOpacity = 0;
        series3.tooltip.pointerOrientation = "vertical";
        series3.tooltip.label.minWidth = 40;
        series3.tooltip.label.minHeight = 40;
        series3.tooltip.label.textAlign = "middle";
        series3.tooltip.label.textValign = "middle";

        /// Chart 4
        var series4 = chart.series.push(new am4charts.LineSeries());
        series4.dataFields.valueY = "Consumption Forecast";
        series4.dataFields.categoryX = "Year";
        series4.name = "Consumption Forecast";
        series4.strokeWidth = 2;
        series4.strokeDasharray = 4;
        series4.tensionX = 0.7;
        // series4.tooltipText = "{Consumption Forecast}";
        series4.stroke = am4core.color("#36363D");
        //

        // Make bullets grow on hover
        var bullet4 = series4.bullets.push(new am4charts.CircleBullet());
        bullet4.circle.strokeWidth = 1;
        bullet4.circle.radius = 2;
        bullet4.circle.fill = am4core.color("#fff");

        var bullethover4 = bullet4.states.create("hover");
        bullethover4.properties.scale = 1.3;

        // Drop-shaped tooltips
        series4.tooltip.background.cornerRadius = 20;
        series4.tooltip.background.strokeOpacity = 0;
        series4.tooltip.pointerOrientation = "vertical";
        series4.tooltip.label.minWidth = 40;
        series4.tooltip.label.minHeight = 40;
        series4.tooltip.label.textAlign = "middle";
        series4.tooltip.label.textValign = "middle";

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



        // chart.legend = new am4charts.Legend();
        // chart.legend.fontSize = 10 ;
        // chart.legend.position = "top";


      });

    }
  };
</script>

<style lang='css' scoped>
  #chart1 {
    width: 100%;
    height: 100%;
  }
</style>