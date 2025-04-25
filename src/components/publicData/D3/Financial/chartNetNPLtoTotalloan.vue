<template lang="html">

  <div id="chartNetNPLtoTotalloan"></div>


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
      let chart = am4core.create("chartNetNPLtoTotalloan", am4charts.XYChart);
      chart.dataSource.load();
      chart.responsive.enabled = true;
      chart.paddingBottom = 10;

      let title = chart.titles.create();
      title.text = "Gross NPL to Total Loan (%)";
      title.align = "center";
      title.fontSize = 12;
      title.marginBottom = 8;
      title.fontWeight = 600;

      var label = chart.chartContainer.createChild(am4core.Label);
      label.text = "Source: BOT";
      label.align = "right";
      label.fontSize = 8;

      // chart.exporting.menu = new am4core.ExportMenu();
      // chart.exporting.menu.align = "right";
      // chart.exporting.menu.verticalAlign = "top";

      chart.exporting.menu = new am4core.ExportMenu();
      const mySelf = this;
      chart.exporting.menu.items = [
        {
          "label": "...",
          "menu": [
            {
              "type": "custom",
              "label": "FBP_006",
              "options": {
                callback: function () {

                  if (localStorage.getItem('Fname') != null) {
                    const axios = require("axios");
                    var data = ["FBP_006"];
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
            {
              "type": "custom",
              "label": "FBP_006_V2",
              "options": {
                callback: function () {
                  if (localStorage.getItem('Fname') != null) {
                    const axios = require("axios");
                    var data = ["FBP_006_V2"];
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


      let data_chart = [];
      // ดึกข้อมูลจาก backend
      this.axios
        .get(process.env.VUE_APP_API_BACKEND + "/datasourceDWB012501")
        .then(response => {
          // console.log(response.data);
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
            if (element.Company == "SIAM COMMERCIAL BANK PUBLIC COMPANY LTD.") {
              //แพ็คข้อมูลที่ต้องการ
              jsonData["Period"] = element.Year + " " + element.Quarter;
              jsonData["SCB"] = +element.Value;

            } else if (element.Company == "KASIKORNBANK PUBLIC COMPANY LTD.") {
              //แพ็คข้อมูลที่ต้องการ
              jsonData["Period"] = element.Year + " " + element.Quarter;
              jsonData["KBANK"] = +element.Value;
            } else if (element.Company == "BANGKOK BANK PUBLIC COMPANY LTD.") {
              //แพ็คข้อมูลที่ต้องการ
              jsonData["Period"] = element.Year + " " + element.Quarter;
              jsonData["BBL"] = +element.Value;
            } else if (element.Company == "KRUNG THAI BANK PUBLIC COMPANY LTD.") {
              //แพ็คข้อมูลที่ต้องการ
              jsonData["Period"] = element.Year + " " + element.Quarter;
              jsonData["KTB"] = +element.Value;
            } else if (element.Company == "BANK OF AYUDHYA PUBLIC COMPANY LTD.") {
              //แพ็คข้อมูลที่ต้องการ
              jsonData["Period"] = element.Year + " " + element.Quarter;
              jsonData["BAY"] = +element.Value;
            }

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

          // [
          //   {
          //     Period: "2016 Q1",
          //     WTI:  80.60,

          //   },
          //   {
          //     Period: "2016 Q2",
          //     WTI: 80.20,

          //   },
          //   {
          //     Period: "2016 Q3",
          //     WTI: 79.80,

          //   },
          //   {
          //     Period: "2016 Q4",
          //     WTI: 79.20,

          //   },
          //   {
          //     Period: "2017 Q1",
          //     WTI: 78.50,

          //   },
          //   {
          //     Period: "2017 Q2",
          //     WTI: 78.20,

          //   },
          //   {
          //     Period: "2017 Q3",
          //     WTI: 78.10,

          //   },
          //   {
          //     Period: "2017 Q4",
          //     WTI: 77.90,

          //   },
          //   {
          //     Period: "2018 Q1",
          //     WTI: 77.90,

          //   },
          //   {
          //     Period: "2018 Q2",
          //     WTI: 77.90,

          //   },
          //   {
          //     Period: "2018 Q3",
          //     WTI: 78.00,

          //   },
          //   {
          //     Period: "2018 Q4",
          //     WTI: 78.20,

          //   },
          //   {
          //     Period: "2019 Q1",
          //     WTI: 78.80,
          //   }
          // ];

          /* Create axes */
          var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
          categoryAxis.dataFields.category = "Period";
          categoryAxis.renderer.labels.template.fontSize = 10;

          // Create value axis
          var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
          valueAxis.renderer.labels.template.fontSize = 10;
          valueAxis.min = 1;
          valueAxis.max = 5;
          valueAxis.strictMinMax = true;
          valueAxis.renderer.minGridDistance = 19;

          // Create series
          var series1 = chart.series.push(new am4charts.LineSeries());
          series1.dataFields.valueY = "SCB";
          series1.dataFields.categoryX = "Period";
          series1.name = "SCB";
          series1.strokeWidth = 2;
          series1.tensionX = 0.7;
          // series1.tooltipText = "Year :{Period}\nKBANK:{SCB}";

          series1.stroke = am4core.color("#7A58BF");

          var bullet1 = series1.bullets.push(new am4charts.CircleBullet());
          bullet1.circle.strokeWidth = 1;
          bullet1.circle.radius = 2;
          bullet1.circle.fill = am4core.color("#fff");

          var bullethover1 = bullet1.states.create("hover");
          bullethover1.properties.scale = 1.3;
          // ------------------------------------------------------------------------------------------------
          var series2 = chart.series.push(new am4charts.LineSeries());
          series2.dataFields.valueY = "KBANK";
          series2.dataFields.categoryX = "Period";
          series2.name = "KBANK";
          series2.strokeWidth = 2;
          series2.tensionX = 0.7;
          // series2.tooltipText = "Year :{Period}\nWTI:{WTI}";
          // series2.tooltipHTML = `<center style="font-size: 10px;">YEAR : {categoryX}</center>
          //                       <table>
          //                         <tr>
          //                           <td align="left" style="font-size: 10px;">Cars :</td>
          //                           <td>{cars}</td>
          //                         </tr>
          //                         </table>`;
          series2.stroke = am4core.color("#00A950");

          var bullet2 = series2.bullets.push(new am4charts.CircleBullet());
          bullet2.circle.strokeWidth = 1;
          bullet2.circle.radius = 2;
          bullet2.circle.fill = am4core.color("#fff");

          var bullethover2 = bullet2.states.create("hover");
          bullethover2.properties.scale = 1.3;
          // ==========================================================================================================
          var series3 = chart.series.push(new am4charts.LineSeries());
          series3.dataFields.valueY = "BBL";
          series3.dataFields.categoryX = "Period";
          series3.name = "BBL";
          series3.strokeWidth = 2;
          series3.tensionX = 0.7;
          // series3.tooltipText = "Year :{Period}\nWTI:{WTI}";
          // series3.tooltipHTML = `<center style="font-size: 10px;">YEAR : {categoryX}</center>
          //                       <table>
          //                         <tr>
          //                           <td align="left" style="font-size: 10px;">Cars :</td>
          //                           <td>{cars}</td>
          //                         </tr>
          //                         </table>`;
          series3.stroke = am4core.color("#233A58");

          var bullet3 = series3.bullets.push(new am4charts.CircleBullet());
          bullet3.circle.strokeWidth = 1;
          bullet3.circle.radius = 2;
          bullet3.circle.fill = am4core.color("#fff");

          var bullethover3 = bullet3.states.create("hover");
          bullethover3.properties.scale = 1.3;
          // ==============================================================================================
          var series4 = chart.series.push(new am4charts.LineSeries());
          series4.dataFields.valueY = "KTB";
          series4.dataFields.categoryX = "Period";
          series4.name = "KTB";
          series4.strokeWidth = 2;
          series4.tensionX = 0.7;
          // series4.tooltipText = "Year :{Period}\nWTI:{WTI}";
          // series4.tooltipHTML = `<center style="font-size: 10px;">YEAR : {categoryX}</center>
          //                   <table>
          //                     <tr>
          //                       <td align="left" style="font-size: 10px;">Cars :</td>
          //                       <td>{cars}</td>
          //                     </tr>
          //                     </table>`;
          series4.stroke = am4core.color("#23B3E8");

          var bullet4 = series4.bullets.push(new am4charts.CircleBullet());
          bullet4.circle.strokeWidth = 1;
          bullet4.circle.radius = 2;
          bullet4.circle.fill = am4core.color("#fff");

          var bullethover4 = bullet4.states.create("hover");
          bullethover4.properties.scale = 1.3;
          // ===============================================================================================
          var series5 = chart.series.push(new am4charts.LineSeries());
          series5.dataFields.valueY = "BAY";
          series5.dataFields.categoryX = "Period";
          series5.name = "BAY";
          series5.strokeWidth = 2;
          series5.tensionX = 0.7;
          // series5.tooltipHTML = `<center style="font-size: 10px;">YEAR : {Period}</center>
          //                     <table>
          //                       <tr>
          //                         <td align="left" style="font-size: 10px;">SCB :</td>
          //                         <td style="font-size: 10px;">{SCB}</td>
          //                       </tr>
          //                       <tr>
          //                         <td align="left" style="font-size: 10px;">KBANK :</td>
          //                         <td style="font-size: 10px;">{KBANK}</td>
          //                       </tr>
          //                       <tr>
          //                         <td align="left" style="font-size: 10px;">BBL :</td>
          //                         <td style="font-size: 10px;">{BBL}</td>
          //                       </tr>
          //                       <tr>
          //                         <td align="left" style="font-size: 10px;">KTB :</td>
          //                         <td style="font-size: 10px;">{KTB}</td>
          //                       </tr>
          //                       <tr>
          //                         <td align="left" style="font-size: 10px;">BAY :</td>
          //                         <td style="font-size: 10px;">{BAY}</td>
          //                       </tr>
          //                     </table>`;
          series5.stroke = am4core.color("#F2C800");



          // series1.bullets.push(new am4charts.CircleBullet());
          // Make bullets grow on hover
          var bullet5 = series5.bullets.push(new am4charts.CircleBullet());
          bullet5.circle.strokeWidth = 1;
          bullet5.circle.radius = 2;
          bullet5.circle.fill = am4core.color("#fff");

          var bullethover5 = bullet5.states.create("hover");
          bullethover5.properties.scale = 1.3;

          // Drop-shaped tooltips
          // series1.tooltip.background.cornerRadius = 0;
          // series1.tooltip.background.strokeOpacity = 0;
          // series1.tooltip.pointerOrientation = "vertical";
          // series1.tooltip.label.minWidth = 40;
          // series1.tooltip.label.minHeight = 40;
          // series1.tooltip.label.textAlign = "middle";
          // series1.tooltip.label.textValign = "middle";

          // series2.tooltip.background.cornerRadius = 0;
          // series2.tooltip.background.strokeOpacity = 0;
          // series2.tooltip.pointerOrientation = "vertical";
          // series2.tooltip.label.minWidth = 40;
          // series2.tooltip.label.minHeight = 40;
          // series2.tooltip.label.textAlign = "middle";
          // series2.tooltip.label.textValign = "middle";

          // series3.tooltip.background.cornerRadius = 0;
          // series3.tooltip.background.strokeOpacity = 0;
          // series3.tooltip.pointerOrientation = "vertical";
          // series3.tooltip.label.minWidth = 40;
          // series3.tooltip.label.minHeight = 40;
          // series3.tooltip.label.textAlign = "middle";
          // series3.tooltip.label.textValign = "middle";

          // series4.tooltip.background.cornerRadius = 0;
          // series4.tooltip.background.strokeOpacity = 0;
          // series4.tooltip.pointerOrientation = "vertical";
          // series4.tooltip.label.minWidth = 40;
          // series4.tooltip.label.minHeight = 40;
          // series4.tooltip.label.textAlign = "middle";
          // series4.tooltip.label.textValign = "middle";

          // series5.tooltip.background.cornerRadius = 0;
          // series5.tooltip.background.strokeOpacity = 0;
          // series5.tooltip.pointerOrientation = "vertical";
          // series5.tooltip.label.minWidth = 40;
          // series5.tooltip.label.minHeight = 40;
          // series5.tooltip.label.textAlign = "middle";
          // series5.tooltip.label.textValign = "middle";

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
  #chartNetNPLtoTotalloan {
    width: 100%;
    height: 100%;
  }
</style>