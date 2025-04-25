<template>
  <v-dialog v-model="dialogMetadata" width="auto">
    <template v-slot:activator="{ on, attrs }">
      <v-btn dark v-bind="attrs" v-on="on" depressed icon>
        <img
          class="imageSize"
          src="/opendataIcon/icon/files.png"
          alt="fireSpot"
        />
      </v-btn>
    </template>

    <v-card>
      <v-card-title class="green lighten-2">
        <h3>
          <span class="font">
            ชุดข้อมูล
          </span>
        </h3>
      </v-card-title>

      <v-card-text>
        <v-data-table :headers="headersDialog" :items="desserts">
          <template slot="items" slot-scope="props">
            <td>{{ props.item.name }}</td>
            <td>{{ props.item.sample }}</td>
          </template>
        </v-data-table>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" text @click="dialogMetadata = false">
          I accept
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      dialogMetadata: false,
      //    loading: true,
      headersDialog: [
        { text: "ฟิลด์", sortable: false, align: "left", value: "field" },
        { text: "ค่า", sortable: false, align: "left", value: "sample" }
      ],
      desserts: [
        {
          name: "* ประเภทชุดข้อมูล",
          sample: "ข้อมูลระเบียน"
        },
        {
          name: "ยินยอมให้นำชื่อชุดข้อมูลไปใช้ที่ GD-Catalog",
          sample: ""
        },
        {
          name: "* ชื่อผู้ติดต่อ",
          sample: "หน่วยงานเจ้าของข้อมูล"
        },
        {
          name: "* อีเมลผู้ติดต่อ",
          sample: "maintainer@mail.go.th"
        },
        {
          name: "* วัตถุประสงค์",
          sample: "อื่นๆ"
        },
        {
          name: "* หน่วยความถี่ของการปรับปรุงข้อมูล",
          sample: "ตามเวลาจริง"
        },
        {
          name: "ค่าความถี่ของการปรับปรุงข้อมูล (ความถี่น้อยที่สุด)",
          sample: ""
        },
        {
          name: "* ขอบเขตเชิงภูมิศาสตร์หรือเชิงพื้นที่",
          sample: "อื่นๆ"
        },
        {
          name: "* แหล่งที่มา",
          sample: "จากการดำเนินงาน"
        },
        {
          name: "* รูปแบบการเก็บข้อมูล",
          sample: "JSON,XLS"
        }
      ]
    };
  }
};
</script>

<style>
.font {
  text-shadow: 0px 0px 15px rgba(17, 17, 17, 0.24) !important;
  color: #ffffff !important;
  font-size: 18px;
  /* font-family: 'THSarabun', Arial, 'Arial Unicode MS', Helvetica, Sans-Serif; */
  font-weight: bold;
  font-style: normal;
}
</style>
