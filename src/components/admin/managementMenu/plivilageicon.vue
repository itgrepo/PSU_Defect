<template>
  <v-container>
    <v-card>
      <v-card-title>{{ $t("rolepermiss") }}</v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="valid">
          <v-row v-for="(role, index) in roles" :key="role.role_id" class="mb-6">
            <v-col cols="12">
              <v-card outlined>
                <v-card-title>
                  <strong>{{ $t("role") }}: {{ role.previlage_name }}</strong>
                </v-card-title>
                <v-card-text>
                  <!-- แสดง Checkbox เป็นแนวนอน -->
                  <v-row class="d-flex align-center">
                    <v-col
                      cols="auto"
                      v-for="(service, key) in services"
                      :key="key"
                      class="d-flex align-center"
                    >
                      <v-checkbox
                        v-model="role[key]"
                        :label="$t(`services.${key}`)"
                        :value="1"
                        false-value="0"
                      ></v-checkbox>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" :disabled="!valid" @click="saveConfig">{{
          $t("save")
        }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import { Decode, Encode } from "@/services";

export default {
  data() {
    return {
      valid: false,
      services: {
        apiFlag: "API",
        dashboardFlag: "Dashboard",
        dataDicFlag: "Data Dictionary",
        filesFlag: "Files",
        metaDataFlag: "Metadata",
      },
      roles: [
        // {
        //   apiFlag: 1,
        //   dashboardFlag: 1,
        //   dataDicFlag: 1,
        //   filesFlag: 1,
        //   icon_show_id: 1,
        //   metaDataFlag: 1,
        //   previlage_name: "admin",
        //   role_id: 1,
        // },
        // {
        //   apiFlag: 1,
        //   dashboardFlag: 0,
        //   dataDicFlag: 1,
        //   filesFlag: 0,
        //   icon_show_id: 2,
        //   metaDataFlag: 1,
        //   previlage_name: "user",
        //   role_id: 3,
        // },
        // {
        //   apiFlag: 0,
        //   dashboardFlag: 0,
        //   dataDicFlag: 0,
        //   filesFlag: 0,
        //   icon_show_id: 3,
        //   metaDataFlag: 0,
        //   previlage_name: "Super User",
        //   role_id: 8,
        // },
      ],
    };
  },
  computed: {
    userData() {
      if (this.$cookies.isKey("information")) {
        return JSON.parse(Decode.decode(this.$cookies.get("information")));
      } else {
        return "";
      }
    },
  },
  mounted() {
    this.showicon();
  },
  methods: {
    showicon() {
      var user = Encode.encode(JSON.stringify(this.userData));
      this.axios
        .post(process.env.VUE_APP_API_BACKEND + "/showIconAll", {
          user: user,
        })
        .then((response) => {
          this.roles = response.data;
          console.log("roles:", this.roles);
        });
    },
    saveConfig() {
  // แสดงค่าที่จะส่งไปยัง backend
  console.log("Data to send:", JSON.stringify(this.roles, null, 2));

  // ส่งข้อมูลไปยัง backend
  this.axios
    .post(`${process.env.VUE_APP_API_BACKEND}/updatePrivilegeIcon`, this.roles)
    .then((response) => {
      // กำหนด title และ icon ตามสถานะที่ได้รับจาก backend
      const title = this.$t(
        response.data.status === "success" ? "successTitle" : "errorTitle"
      );
      const icon = response.data.status === "success" ? "success" : "error";

      // แสดง SweetAlert2 ด้วย title และ icon ที่กำหนด
      this.$swal(title, "", icon);
    })
    .catch((error) => {
      // ใช้การตรวจสอบค่าแบบปกติแทน optional chaining
      const message = (error.response && error.response.data && error.response.data.message) || this.$t("errorMessage");

      // แสดง error เมื่อเกิดข้อผิดพลาด
      this.$swal(this.$t("errorTitle"), message, "error");
    });
},
  },
};
</script>

<style scoped>
.mb-6 {
  margin-bottom: 24px;
}
.d-flex {
  display: flex;
}
.align-center {
  align-items: center;
}
</style>
