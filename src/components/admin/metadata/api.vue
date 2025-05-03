<template lang="html">
  <v-card flat class="card-add-link">
    <v-layout>
      <v-flex sm12 md12 xs12>
        <v-radio-group v-model="addlink" row>
          <v-radio :label="$t('genapi')"  :value="2"></v-radio>
          <!-- <v-radio label="Add Link DashBoard" :value="3"></v-radio> -->
        </v-radio-group>
      </v-flex>
    </v-layout>
    <div v-if="addlink === 2">
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-layout>
          <v-flex sm3 md3 xs3>
            <v-subheader>{{ $t('reprotid') }} </v-subheader>
          </v-flex>
          <v-flex sm6 md6 xs6>
            <v-autocomplete :items="items" :filter="customFilter" item-text="file_name" :label="$t('reprotid')"
              item-value="file_name" v-model="filename" @change="Getlink()"></v-autocomplete>
          </v-flex>
        </v-layout>
        <v-layout>
          <v-spacer></v-spacer>
          <v-btn color="success" :disabled="!valid" outline @click="GenAPI()">
            <v-icon left>save</v-icon>{{ $t('genapi') }} 
          </v-btn>
          <v-btn color="error" :disabled="!valid" outlined @click="DelAPI()">
         <!-- ใช้ไอคอนถังขยะจาก Material Icons หรือ MDI -->
            <v-icon left>mdi-delete</v-icon>{{ $t('delapi') }}
          </v-btn>
        </v-layout>
      </v-form>
    </div>
  </v-card>
</template>
<script>
  export default {
    data() {
      return {
        addlink: 2,
        valid: true,
        filename: "",
        Rules: [v => !!v || "Information is required"],
        items: [],
        link: [],
        link_DashBoard: [],
        file_name: []
      };
    },
    mounted() {
      this.getData();
      this.Getlink();
    },
    methods: {
      reloadPage() {
        window.location.reload();
      },
      getData() {
        this.axios
          .post(process.env.VUE_APP_API_BACKEND + "/getDataExportExcel")
          .then(response => {
            this.items = response.data;
            // //console.log(this.items)
          });
      },
      savealllink() {
  this.axios
    .post(process.env.VUE_APP_API_BACKEND + "/addNewApiDocument", {
      api_doc_url: this.link,
      file_name: this.filename
    })
    .then(response => {
      // ตรวจสอบสถานะการตอบกลับ
      if (response.data.status === "Success") {
        this.saveLinkDashboard();
      } else {
        // แสดงข้อความข้อผิดพลาดจาก response
        this.$swal("ERROR", response.data.status, "error");
      }
    })
    .catch(error => {
      // จัดการข้อผิดพลาดจากการเรียก API
      const errorMessage = error.response && error.response.data ? error.response.data.status : "An unexpected error occurred.";
      this.$swal("ERROR", errorMessage, "error");
    });
},

GenAPI() {
  // แสดง loading dialog
  this.$swal({
    title: this.$i18n.t('loading.title'),
    text: this.$i18n.t('loading.text'),
    icon: 'info',
    allowOutsideClick: false,
    showConfirmButton: false,
    onOpen: () => {
      this.$swal.showLoading();
    }
  });

  this.axios
    .post(process.env.VUE_APP_API_BACKEND2 + "/generateapi", {
      file_name: this.filename
    })
    .then(response => {
      this.$swal.close(); // ปิด loading dialog

      if (response.data.status === "success") {
        this.$swal(this.$i18n.t('generateSuccess.title'), this.$i18n.t('generateSuccess.text'), "success").then(() => {
          this.reloadPage();
        });
      } else {
        // แสดงข้อความข้อผิดพลาดจาก response
        this.$swal(this.$i18n.t('responseError.title'), this.$i18n.t('responseError.text') + response.data.status, "error");
      }
    })
    .catch(error => {
      this.$swal.close(); // ปิด loading dialog ในกรณีเกิดข้อผิดพลาด

      // ตรวจสอบข้อผิดพลาดและแสดงข้อความที่เหมาะสม
      const errorMessage = error.response && error.response.data ? error.response.data.status : this.$i18n.t('error.default');
      this.$swal(this.$i18n.t('error.title'), errorMessage, "error");
    });
},

DelAPI() {
  // แสดง loading dialog
  this.$swal({
    title: this.$i18n.t('loading.title'),
    text: this.$i18n.t('loading.text'),
    icon: 'info',
    allowOutsideClick: false,
    showConfirmButton: false,
    onOpen: () => {
      this.$swal.showLoading();
    }
  });

  this.axios
    .post(process.env.VUE_APP_API_BACKEND2 + "/delete_generateapi", {
      file_name: this.filename
    })
    .then(response => {
      this.$swal.close(); // ปิด loading dialog

      if (response.data.status === "success") {
        this.$swal(this.$i18n.t('deleteSuccess.title'), this.$i18n.t('deleteSuccess.text'), "success").then(() => {
          this.reloadPage();
        });
      } else {
        // แสดงข้อความข้อผิดพลาดจาก response
        this.$swal(this.$i18n.t('responseError.title'), this.$i18n.t('responseError.text') + response.data.status, "error");
      }
    })
    .catch(error => {
      this.$swal.close(); // ปิด loading dialog ในกรณีเกิดข้อผิดพลาด

      // ตรวจสอบข้อผิดพลาดและแสดงข้อความที่เหมาะสม
      const errorMessage = error.response && error.response.data ? error.response.data.status : this.$i18n.t('error.default');
      this.$swal(this.$i18n.t('error.title'), errorMessage, "error");
    });
},


      // GenAPI() {
      //     this.axios
      //       .post(process.env.VUE_APP_API_BACKEND + "/generateapi", {
      //         file_name: this.filename
      //       })
      //       .then(response => {
      //         //console.log(response);
      //         if (response.data.status === "success") {
      //           this.$swal("Save Success", "", "success").then(response => {
      //             this.reloadPage();
      //           });
      //         } else {
      //           this.$swal("ERROR", "", "error");
      //         }
      //     })
      // },
      Getlink() {
        this.axios
          .post(process.env.VUE_APP_API_BACKEND + "/apiList", {
            file_name: this.filename
          })
          .then(response => {
            this.link = response.data.api_document_URL;
            // //console.log(response.data.api_document_URL);
          });
      },

    }
  };
</script>
<style>
  .color-title {
    font-size: 12px;
    background-color: #c7a5c6;
    color: #fff;
  }

  .v-text-field {
    margin-top: 0px;
    padding-top: 0px;
  }

  .card-add-link {
    padding: 20px;
  }
</style>
