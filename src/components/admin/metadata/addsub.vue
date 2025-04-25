<template>
  <div>
    <v-layout>
      <v-dialog max-width="1000px" v-model="dialogaddsub">
        <v-card>
          <v-card-title class="title-level">
            <h2>{{ $t("addsubcategory") }}</h2>
          </v-card-title>
          <form ref="form" v-model="valid" lazy-validation>
            <v-card-text>
              <v-layout row wrap>
                <v-flex md3 class="pt-0">
                  <p class="mt-3 ml-2">{{ $t("category") }} :</p>
                </v-flex>
                <v-flex md9>
                  <v-select
                    :items="category"
                    item-text="name"
                    item-value="category_id"
                    :label="$t('category')"
                    v-model="categorys"
                  ></v-select>
                </v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex md3>
                  <p class="mt-3 ml-2">{{ $t("subcategory") }} :</p>
                </v-flex>
                <v-flex md9>
                  <v-text-field
                    v-model="subCategory"
                    :label="$t('subcategory')"
                    required
                    :rules="Rules"
                  ></v-text-field>
                </v-flex>
              </v-layout>

              <v-layout row wrap>
                <v-flex md3>
                  <p class="mt-3 ml-2">
                    <span class="pr-1" style="color: red">*</span
                    >{{ $t("imageicon") }} :
                  </p>
                </v-flex>

                <v-flex md9>
                  <input
                    type="file"
                    id="filesPNG"
                    ref="filePng"
                    accept=".png,.jpg"
                    style="display: none"
                    @change="filesUploadPNG()"
                  />
                  <v-text-field
                    :label="$t('selectpng')"
                    @click="$refs.filePng.click()"
                    v-model="nameFilePNG"
                    prepend-icon="attach_file"
                    :rules="Rules"
                  ></v-text-field>
                </v-flex>
              </v-layout>
            </v-card-text>
            <v-card-actions>
              <v-btn
                color="success"
                class="btn-save-level"
                outline
                @click="filesPNG()"
                >{{ $t("save") }}</v-btn
              >
            </v-card-actions>
          </form>

          <v-data-table
            :headers="localizedHeaders"
            :items="sub_category"
            class="elevation-1"
          >
            <template v-slot:items="props">
              <td class="text-xs-center">
                <img
                  class="imageSize"
                  :src="`data:data:service_image/png;base64,${props.item.images}`"
                />
              </td>
              <td class="text-left">{{ props.item.name }}</td>
              <td class="text-left">{{ props.item.sub_category_name }}</td>
              <td class="text-xs-center">
                <v-tooltip top>
                  <template v-slot:activator="{ on }">
                    <v-btn v-on="on" small icon
                      ><v-icon color="warning" @click="editcategory(props.item)"
                        >edit</v-icon
                      ></v-btn
                    >
                  </template>
                  <span>{{ $t("editsubcategory") }}</span>
                </v-tooltip>
                <v-btn text icon @click="deleteSub_category(props.item)">
                  <v-icon color="red">delete</v-icon>
                </v-btn>
              </td>
            </template>
          </v-data-table>
        </v-card>
      </v-dialog>
    </v-layout>

    <dialogEditcategory ref="edit" />
  </div>
</template>

<script>
import dialogEditcategory from "./dialogEditSubcategory.vue";
export default {
  components: {
    dialogEditcategory,
  },
  data() {
    return {
      sub_category: [],
      nameFilePNG: "",
      category: [],
      items: [],
      categorys: "",
      dialogaddsub: false,
      valid: true,
      subCategory: "",
      // headers: [
      //   {
      //     sortable: false,
      //     text: "",
      //     value: "",
      //     align: "center"
      //   },
      //   {
      //     sortable: false,
      //     text: "Category",
      //     value: "Category",
      //     align: "center"
      //   },
      //   {
      //     sortable: false,
      //     text: "Sub Categoryd",
      //     value: "Sub Category",
      //     align: "center"
      //   },
      //   // {
      //   //   sortable: false,
      //   //   text: "Edit",
      //   //   value: "Edit",
      //   //   align: "center"
      //   // },
      //   {
      //     sortable: false,
      //     text: "Delete",
      //     value: "Delete",
      //     align: "center"
      //   }
      // ]
    };
  },
  watch: {
    loading(val) {
      if (!val) return;
      setTimeout(() => (this.loading = false), percentCompleted);
    },
  },
  computed: {
    localizedHeaders() {
      return [
        {
          sortable: false,
          text: "",
          value: "",
          align: "center",
        },
        {
          sortable: false,
          text: this.$t("category"),
          value: "Category",
          align: "center",
        },
        {
          sortable: false,
          text: this.$t("subcategory"),
          value: "Sub Category",
          align: "center",
        },
        {
          sortable: false,
          text: this.$t("edit/delete"),
          value: "Delete",
          align: "center",
        },
      ];
    },
  },
  created() {
    this.datasublevel();
  },
  mounted() {
    this.datasubcategory();
    this.dataCategoryName();
    this.SubCategoryName();
  },
  methods: {
    editcategory(data) {
      this.$refs.edit.open(data);
    },

    AddDataSubCategory() {
      // console.log(this.id);
      var user = Encode.encode(JSON.stringify(this.userData));

      this.checkPanel = this.panel;
      for (var i = 0; i < this.panel.length; i++) {
        if (this.panel[i] === true) {
          this.axios
            .post(process.env.VUE_APP_API_BACKEND + "/getSubcategoryByID", {
              category_id: this.id,
              user: user,
            })
            .then((response) => {
              // console.log(response);
              // if (response.data.status !== 'not found data') {
              this.dataCatagory = response.data;
              // console.log(this.dataCatagory);
              // }
            });
        }
      }
    },

    // filesUploadPNG() {
    //   const uploadedFilesPNG = this.$refs.filePng.files;
    //   this.nameFilePNG = uploadedFilesPNG[0].name;
    // },

    filesUploadPNG() {
  const uploadedFilesPNG = this.$refs.filePng.files;
  const file = uploadedFilesPNG[0];
  
  // ตรวจสอบประเภทไฟล์
  if (file.type !== "image/png") {
    this.$swal(this.$t("imgsize"), "", "error");
    this.nameFilePNG = "";  // รีเซ็ตชื่อไฟล์
    return;
  }

  // ตรวจสอบขนาดไฟล์ (ต้องไม่เกิน 512*512)
  const img = new Image();
  const objectUrl = URL.createObjectURL(file);
  img.onload = () => {
    if (img.width <= 512 && img.height <= 512) {
      this.nameFilePNG = file.name;  // อัปเดตชื่อไฟล์เมื่อผ่านเงื่อนไข
    } else {
      this.$swal(this.$t("imgsize"), "", "error");
      this.nameFilePNG = "";  // รีเซ็ตชื่อไฟล์
    }
    URL.revokeObjectURL(objectUrl);  // ทำลาย object URL
  };
  img.src = objectUrl;
},
    filesPNG() {
      this.loading = true;
      let formDataICON = new FormData();
      formDataICON.append("file", this.$refs.filePng.files[0]);
      formDataICON.append("category_id", this.categorys);
      formDataICON.append("sub_category_name", this.subCategory);

      this.axios
        .post(
          process.env.VUE_APP_API_BACKEND + "/addSubCategory",
          formDataICON,
          {
            headers: { "Content-Type": "multipart/form-data" },
          },
          {
            onDownloadProgress: (progressEvent) => {
              var percentCompleted = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
              );
            },
          }
        )
        .then((response) => {
          if (response.data.status == "duplicate category name") {
            this.$swal("Category Name is Duplicate ", "", "warning");
            this.loading = false;
          } else if (response.data.status === "success") {
            this.$swal("Update Category is Success", "", "success").then(
              (response) => {
                this.reloadPage();
              }
            );
          } else {
            this.$swal(response.data.status, "", "error");
            this.loading = false;
          }
        });
    },

    open() {
      this.dialogaddsub = true;
    },
    closeDialog() {
      this.dialogaddsub = false;
    },
    dataCategoryName() {
      this.axios
        .get(process.env.VUE_APP_API_BACKEND + "/getCategoryName")
        .then((response) => {
          // //console.log(response)
          this.category = response.data;
        });
    },
    datasubcategory() {
      this.axios
        .get(process.env.VUE_APP_API_BACKEND + "/getSubcategory")
        .then((response) => {
          //console.log(response)
          this.sub_category = response.data;
        });
    },
    saveeditsub(data) {
      // //console.log(data.sub_category_id);
      let datasubid = data.sub_category_id;
      let datasubname = data.sub_category_name;
      this.axios
        .post(process.env.VUE_APP_API_BACKEND + "/editSub_category", {
          sub_category_id: datasubid,
          sub_category_name: datasubname,
        })
        .then((response) => {
          // console.log(response);
          if (response.data.status === "success") {
            this.$swal("Edit Sub Category Success", "", "success").then(
              (response) => {
                this.reloadPage();
              }
            );
          } else {
            this.$swal("error", "", "error");
          }
          // //console.log(datasubid);
          // //console.log(datasubname);
          // //console.log(response)
          // this.sub_category = response.data;
        });
    },
    deleteSub_category(data) {
      const mySelf = this;
      // var txt = 'You would to suspend user : ' + 'user.name'
      this.$swal({
        title: "Are you Confirm?",
        // text: ,
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes",
      }).then(function (result) {
        const axios = require("axios");
        axios
          .post(process.env.VUE_APP_API_BACKEND + "/deleteSubcategory", {
            sub_category_id: data.sub_category_id,
          })
          .then((response) => {
            // console.log(response);
            // if (response.data.status2 === "Delete sub_category success") {
            //       this.$swal("Delete Sub Category Success", "", "success").then(response =>{
            // this.reloadPage()
            // })
            // window.location.reload()

            // } else {
            //   this.$swal("error",'',"error")
            // }
            window.location.reload();
          });
      });
    },
    save() {
      this.axios
        .post(process.env.VUE_APP_API_BACKEND + "/saveSubCategoryName", {
          category_id: this.categorys,
          sub_category_name: this.subCategory,
        })
        .then((response) => {
          // console.log(response);
          if (response.data.status === "success") {
            this.dialogaddsub = false;
            this.$swal("Save Success", "", "success").then((response) => {
              this.reloadPage();
            });
            // this.category = response.data
          } else if (response.data.status === "Permission denied") {
            this.$swal("Permission denied", " ", "warning");
          } else {
            this.$swal("error", " ", "error");
          }
        });
    },
    reloadPage() {
      window.location.reload();
    },
  },
};
</script>
<style scoped="">
.btn-save-level {
  display: block;
  margin: 0 auto;
}

.title-level {
  background-color: #1d6a96;
  color: #ffffff;
}

.v-btn--floating .v-icon {
  height: auto;
  width: inherit;
}

.pd-30 {
  padding: 30px;
}
</style>
