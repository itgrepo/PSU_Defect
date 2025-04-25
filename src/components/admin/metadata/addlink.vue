<template lang="html">
  <v-card flat class="card-add-link">
    <v-layout>
      <v-flex sm12 md12 xs12>
        <v-radio-group v-model="addlink" row>
          <!-- <v-radio label="Add All Link" :value="1"></v-radio> -->
          <v-radio :label="$t('addlinkapi')" :value="2"></v-radio>
          <v-radio :label="$t('addlinkdash')" :value="3"></v-radio>
        </v-radio-group>
      </v-flex>
    </v-layout>
    <!-- <v-card-text><h3>ADD LINK API</h3></v-card-text> -->
    <!-- <div v-if="addlink === 1">
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-layout>
          <v-flex sm3 md3 xs3>
            <v-subheader>File Name</v-subheader>
          </v-flex>
          <v-flex sm6 md6 xs6>
            <v-autocomplete
              :items="items"
              :filter="customFilter"
              item-text="file_name"
              label="File name"
              item-value="file_name"
              v-model="filename"
              @change="getlink_all()"
            ></v-autocomplete>
          </v-flex>
        </v-layout>
        <v-layout>
          <v-flex sm3 md3 xs3>
            <v-subheader>Link API</v-subheader>
          </v-flex>
          <v-flex sm6 md6 xs6>
            <v-text-field label="Link API" v-model="link"></v-text-field>
          </v-flex>
        </v-layout> -->
    <!-- <v-layout>
          <v-spacer></v-spacer>
          <v-btn color="success" :disabled="!valid" outline @click="AddNewAPI()">
            <v-icon left>save</v-icon>SAVE</v-btn
          >
        </v-layout> -->
    <!-- </v-form> -->

    <!-- <v-card-text><h3>ADD Link DashBoard</h3></v-card-text> -->
    <!-- <v-form ref="form" v-model="valid" lazy-validation> -->
    <!-- <v-layout>
        <v-flex sm3 md3 xs3>
          <v-subheader>File Name</v-subheader>
        </v-flex> -->
    <!-- <v-flex sm6 md6 xs6>
          <v-autocomplete
            :items="items"
            :filter="customFilter"
            item-text="file_name"
            label="File name"
            item-value="source_id"
            v-model="source_id"
            @change="getlinkdashboard()"
          ></v-autocomplete>
        </v-flex> -->
    <!-- </v-layout>    -->
    <!-- <v-layout>
          <v-flex sm3 md3 xs3>
            <v-subheader>Link DashBoard</v-subheader>
          </v-flex>
          <v-flex sm6 md6 xs6>
            <v-text-field
              label="Link DashBoard"
              v-model="link_DashBoard"
            ></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout>
          <v-spacer></v-spacer>
          <v-btn
            color="success"
            :disabled="!valid"
            outline
            @click="savealllink()"
          >
            <v-icon left>save</v-icon>SAVE</v-btn
          >
        </v-layout>
      </v-form>
    </div> -->
    <div v-if="addlink === 2">
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-layout>
          <v-flex sm3 md3 xs3>
            <v-subheader>{{ $t("reprotid") }} </v-subheader>
          </v-flex>
          <v-flex sm6 md6 xs6>
            <v-autocomplete
              :items="items"
              :filter="customFilter"
              item-text="file_name"
              :label="$t('reprotid')"
              item-value="file_name"
              v-model="filename"
              @change="Getlink()"
            ></v-autocomplete>
          </v-flex>
        </v-layout>
        <v-layout>
          <v-flex sm3 md3 xs3>
            <v-subheader>{{ $t("linkadpi") }}</v-subheader>
          </v-flex>
          <v-flex sm6 md6 xs6>
            <v-text-field :label="$t('linkadpi')" v-model="link"></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout>
          <v-spacer></v-spacer>
          <v-btn
            color="success"
            :disabled="!valid"
            outline
            @click="AddNewAPI()"
          >
            <v-icon left>save</v-icon>{{ $t("save") }}
          </v-btn>
        </v-layout>
      </v-form>
    </div>
    <div v-else-if="addlink === 3">
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-layout>
          <v-flex sm3 md3 xs3>
            <v-subheader>{{ $t("reprotid") }} </v-subheader>
          </v-flex>
          <v-flex sm6 md6 xs6>
            <v-autocomplete
              :items="items"
              :filter="customFilter"
              item-text="file_name"
              :label="$t('reprotid')"
              item-value="source_id"
              v-model="source_id"
              @change="getlinkdashboard()"
            ></v-autocomplete>
          </v-flex>
        </v-layout>
        <v-layout>
          <v-flex sm3 md3 xs3>
            <v-subheader>{{ $t("linkdashboard") }}</v-subheader>
          </v-flex>
          <v-flex sm6 md6 xs6>
            <v-text-field
              :label="$t('linkdashboard')"
              v-model="link_DashBoard"
            ></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout>
          <v-spacer></v-spacer>
          <v-btn
            color="success"
            :disabled="!valid"
            outline
            @click="saveLinkDashboard()"
          >
            <v-icon left>save</v-icon>{{ $t("save") }}
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
      Rules: [(v) => !!v || "Information is required"],
      items: [],
      link: [],
      link_DashBoard: [],
      file_name: [],
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
        .then((response) => {
          this.items = response.data;
          // //console.log(this.items)
        });
    },
    savealllink() {
      this.axios
        .post(process.env.VUE_APP_API_BACKEND + "/addNewApiDocument", {
          api_doc_url: this.link,
          file_name: this.filename,
        })
        .then((response) => {
          //console.log(response);
          if (response.data.status === "Success") {
            this.saveLinkDashboard();
          } else {
            this.$swal("ERROR", "", "error");
          }
        });
    },
    // AddNewAPI() {
    //   // console.log(this.link);
    //   if (this.link === 'undefined' || this.link === '') {
    //     this.axios
    //       .post(process.env.VUE_APP_API_BACKEND + "/addNewApiDocument", {
    //         api_doc_url: null,
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
    //       });
    //   } else {
    //     this.axios
    //       .post(process.env.VUE_APP_API_BACKEND + "/addNewApiDocument", {
    //         api_doc_url: this.link,
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
    //       });
    //   }
    // },

    AddNewAPI() {
      const payload = {
        api_doc_url: this.link || null,
        file_name: this.filename,
      };

      this.axios
        .post(process.env.VUE_APP_API_BACKEND + "/addNewApiDocument", payload)
        .then((response) => {
          if (response.data.status === "success") {
            this.$swal("Save Success", "", "success").then(() => {
              this.reloadPage();
            });
          } else {
            // แสดงข้อความ error จาก backend หากมี
            const errorMessage =
              response.data.message || "An unexpected error occurred.";
            this.$swal("ERROR", errorMessage, "error");
          }
        })
        .catch((error) => {
          // ตรวจสอบข้อความ error จาก backend
          const errorMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            "An unexpected error occurred.";
          this.$swal("ERROR", errorMessage, "error");
        });
    },

    Getlink() {
      this.axios
        .post(process.env.VUE_APP_API_BACKEND + "/apiList", {
          file_name: this.filename,
        })
        .then((response) => {
          this.link = response.data.api_document_URL;
          // //console.log(response.data.api_document_URL);
        });
    },
    getlink_all() {
      //console.log(this.file_name);
      this.axios
        .post(process.env.VUE_APP_API_BACKEND + "/apiList", {
          file_name: this.filename,
        })
        .then((response) => {
          this.linkapi = response.data.api_document_URL;
          // //console.log(response.data.api_document_URL);
        })
        .then((response) => {
          // //console.log(this.source_id);
          // this.axios
          //   .post(process.env.VUE_APP_API_BACKEND + "/getLinkDashboard", {
          //     source_id: this.source_id
          //   })
          //   .then(response => {
          //     //console.log(response.data);
          //     this.link_DashBoard = response.data.Link_name;
          //     // //console.log(this.dataCatagory);
          //     // this.viewDashboard(this.dataCatagory
          //   });
          this.getlinkdashboard();
        });
    },
    saveLinkDashboard() {
      this.axios
        .post(process.env.VUE_APP_API_BACKEND + "/saveLinkDashboard", {
          source_id: this.source_id,
          link: this.link_DashBoard,
        })
        .then((response) => {
          // //console.log(response);

          if (response.data.status === "success") {
            this.$swal("Save Success", "", "success").then((response) => {
              this.reloadPage();
            });
          } else {
            this.$swal("ERROR", "", "error");
          }
        });
    },
    getlinkdashboard() {
      this.axios
        .post(process.env.VUE_APP_API_BACKEND + "/getLinkDashboard", {
          source_id: this.source_id,
        })
        .then((response) => {
          //console.log(response.data);
          this.link_DashBoard = response.data.Link_name;
          // //console.log(this.dataCatagory);
          // this.viewDashboard(this.dataCatagory
        });
    },
  },
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
