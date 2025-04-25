<template lang="html">
  <div>
    <v-card>
      <v-card-title class="headline">
        {{ $t('categorylist') }}
        <v-divider class="mx-3 setLine" vertical></v-divider>
        <v-btn outline color="light-blue darken-4" @click="openAddRole()">
          <v-icon left dark>add_circle</v-icon> {{ $t('addcategory') }}
        </v-btn>
        <v-divider class="mx-3 setLine" vertical></v-divider>
        <v-btn outline color="light-blue darken-4" @click="(dialog = true), addsub()">
          <v-icon left dark>add_circle</v-icon> {{ $t('adddsubcategory') }}
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-data-table
          v-bind:headers="localizedHeaders"
          v-bind:items="getRoles"
          :rows-per-page-items="[10, 15, 20, 25, { text: 'All', value: -1 }]"
          :rows-per-page-text="$t('rowsPerPageLabel')"
        >

          <template slot="items" slot-scope="props">
            <td>
            <img
              class="imageSize justify-center align-center"
              :src="`data:data:service_image/png;base64,${props.item.images}`"
            />
            </td>
            <!-- <img class="imageSize text-xs-center" :src="pathIcon(props.item.icon)"/> -->
            <td class="text-left">
              <h3>{{ props.item.name }}</h3>
            </td>

            <!-- <td class="text-xs-center">
              <v-btn small icon @click="editcategory(props.item)">
                <v-icon color="warning">edit</v-icon>
              </v-btn>
              <v-btn small icon @click="deletePrevilage(props.item)">
                <v-icon color="error">delete</v-icon>
              </v-btn>
            </td> -->
<td>
            <template>
              <div class="text-xs-center justify-center align-center">
                <!-- <v-tooltip top>
                  <template v-slot:activator="{ on }">
                    <v-btn v-on="on" small icon
                      ><v-icon
                        color="success"
                        @click="(dialog = true), addsub()"
                        >add_circle</v-icon
                      ></v-btn
                    >
                  </template>
                  <span>{{ $t('adddsubcategory') }}</span>
                </v-tooltip> -->

                <v-tooltip top>
                  <template v-slot:activator="{ on }">
                    <v-btn v-on="on" small icon
                      ><v-icon color="warning" @click="editcategory(props.item)"
                        >edit</v-icon
                      ></v-btn
                    >
                  </template>
                  <span>{{ $t('editcategory') }}</span>
                </v-tooltip>

                <v-tooltip top>
                  <template v-slot:activator="{ on }">
                    <v-btn
                      v-on="on"
                      small
                      icon
                      @click="deletePrevilage(props.item)"
                      ><v-icon color="error">delete</v-icon></v-btn
                    >
                  </template>
                  <span>{{ $t('deletecategory') }}</span>
                </v-tooltip>

              </div>
            </template>
            </td>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>

    <!-- {{ $t('addrole') }}s -->
    <v-layout row justify-center>
      <v-dialog persistent v-model="dialogAddUsers" max-width="1200px">
        <v-card>
          <v-toolbar class="light-blue darken-4 white--text" dense>
            <v-toolbar-title>{{ $t('addcategory') }}</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn outline icon @click.native="closeDialogAddusers()" dark>
              <v-icon>close</v-icon>
            </v-btn>
          </v-toolbar>
          <v-divider></v-divider>

          <v-form ref="form" v-model="valid" lazy-validation>
            <v-layout align-start justify-center row wrap>
              <v-flex md12>
                <v-card elevation="10">
                  <v-card-title>
                    <h2></h2>
                    <v-container fluid>
                      <v-form ref="form" v-model="valid" lazy-validation>
                        <v-row>
                          <v-col cols="4">
                            <v-subheader>
                              <h2>
                                <span class="pr-1" style="color: red">*</span
                                >{{ $t('imageicon') }} :
                              </h2>
                            </v-subheader>
                          </v-col>
                        </v-row>
                        <v-col cols="12">
                          <v-flex sm12 md12 xs12>
                            <input
                              type="file"
                              id="filesPNG"
                              ref="filePng"
                              accept=".png,.jpg"
                              style="display: none;"
                              @change="filesUploadPNG()"
                            />
                            <v-text-field
                            :label="$t('selectpng')"
                              @click="$refs.filePng.click()"
                              v-model="nameFileICON"
                              prepend-icon="attach_file"
                              :rules="Rules"
                              clearable
                            ></v-text-field>
                          </v-flex>
                        </v-col>

                        <v-row>
                          <v-col cols="4">
                            <v-subheader>
                              <h2>
                                <span class="pr-1" style="color: red">*</span
                                >{{ $t('categoryname') }} :
                              </h2>
                            </v-subheader>
                          </v-col>
                        </v-row>
                        <v-col cols="12">
                          <v-text-field
                            v-model="category_name"
                            :rules="Rules"
                            outlined
                            clearable
                          ></v-text-field>
                        </v-col>

                        <v-row>
                          <v-col cols="6">
                            <v-subheader>
                              <h2>
                                <span class="pr-1" style="color: red">*</span
                                >{{ $t('categorydes') }} :
                              </h2>
                            </v-subheader>
                          </v-col>
                        </v-row>
                        <v-col cols="12">
                          <v-textarea
                            v-model="category_description"
                            value=" "
                            auto-grow
                            outlined
                            clearable
                            rows="3"
                            row-height="25"
                            shaped
                            :rules="Rules"
                          ></v-textarea>
                        </v-col>

                        <v-layout>
                          <v-spacer></v-spacer>
                          <v-btn
                            :disabled="!valid"
                            color="success"
                            @click="filesPNG()"
                            >{{ $t('save') }}</v-btn
                          >
                        </v-layout>
                      </v-form>
                    </v-container>
                  </v-card-title>
                </v-card>
              </v-flex>
            </v-layout>
          </v-form>
        </v-card>
      </v-dialog>
    </v-layout>
    <dialogEditcategory ref="edit" />
    <addsub ref="addsub"></addsub>
  </div>
</template>

<script>
import dialogEditcategory from "./dialogEditcategory.vue";
import addsub from "../metadata/addsub.vue";
export default {
  components: {
    dialogEditcategory,
    addsub
  },
  data() {
    return {
      getRoles: [],
      nameFileICON: "",
      dialogAddUsers: false,
      organization: [],
      valid_External: true,
      nameFileMetadata: "",
      valid: true,
      Rules: [v => !!v || "Information is required"],
      // headers: [
      //   {
      //     text: "",
      //     align: "center",
      //     sortable: false
      //   },
      //   {
      //     text: "name",
      //     align: "center",
      //     sortable: false
      //   },
      //   {
      //     text: "",
      //     align: "center",
      //     sortable: false
      //   }
      // ]
    };
  },
  created() {
    this.showCategory();
  },
  mounted() {
    this.data_to_regis();
    this.showCategory();
  },
  watch: {
    loading(val) {
      if (!val) return;
      setTimeout(() => (this.loading = false), percentCompleted);
    },
    closeDialogAddusers: function(val) {
      if (val) {
        this.firstName = "";
        this.lastName = "";
        this.email = "";
        this.profession = "";
      }
    }
  },
  computed: {
    buttonText() {
      return this.selectedFile
        ? this.selectedFile.name
        : this.defaultButtonText;
    },
    localizedHeaders() {
    return [
      {
        text: "",  // ใช้คีย์สำหรับการแปล
        align: 'center',
        sortable: false
      },
      {
        text: this.$t('categoryname'),  // ใช้คีย์สำหรับการแปล
        align: 'center',
        sortable: false
      },
      {
        text: "",  // ใช้คีย์สำหรับการแปล
        align: 'center',
        sortable: false
      }
    ];
  }
  },

  methods: {
    filesUploadPNG() {
      const uploadedFilesPNG = this.$refs.filePng.files;
      this.nameFileICON = uploadedFilesPNG[0].name;
    },
    save() {
      this.axios
        .post(process.env.VUE_APP_API_BACKEND + "/addCategory", {
          category_name: this.category_name,
          category_description: this.category_description
        })
        .then(response => {
          // console.log(response);
          // //console.log(this.sourceData.Link_name);
          if (response.data.status === "success") {
            this.$swal("Save Success", "", "success").then(response => {
              this.reloadPage();
            });
          } else {
            this.$swal("Information is required", "", "warning");
          }
          if (response.data.status === "duplicate information") {
            this.$swal("duplicate information", "", "warning");
          }
        });
    },

    addsub(data) {
      this.$refs.addsub.open(data);
    },

    editcategory(data) {
      this.$refs.edit.open(data);
    },

    deletePrevilage(data) {
      const mySelf = this;
      // var txt = 'You would to suspend user : ' + 'user.name'
      this.$swal({
        title: "Are you Confirm?",
        text: "",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes delete it!"
      }).then(response => {
        const axios = require("axios");
        this.axios
          .post(process.env.VUE_APP_API_BACKEND + "/DeleteCategory", {
            category_id: data.category_id
          })
          .then(response => {
            if (response.data === "Delete success") {
              mySelf.$swal(
                "Deleted!",
                "Your file has been deleted.",
                "success"
              );
              this.showCategory();
            } else if (response.data === "Permission denied") {
              this.$swal("Permission denied", " ", "warning");
            } else {
              this.$swal(
                "Your can't delete a category",
                "Becasue you already have file ",
                "error"
              );
            }
          });
      });
    },

    reloadPage() {
      window.location.reload();
    },
    pathIcon(icon) {
      return `/opendataIcon/icon-two/${icon}`;
    },

    onButtonClick() {
      this.isSelecting = true;
      window.addEventListener(
        "focus",
        () => {
          this.isSelecting = false;
        },
        { once: true }
      );

      this.$refs.uploader.click();
    },
    onFileChanged(e) {
      this.selectedFile = e.target.files[0];
      // console.log(this.selectedFile)

      // do something
    },
    openAddRole() {
      this.dialogAddUsers = true;
      this.getUserPermission();
    },
    closeDialogAddusers() {
      this.dialogAddUsers = false;
      this.userRoles = [];
      // this.category_name.reset
      // this.category_description = ''
      this.reloadPage();
    },
    reloadPage() {
      window.location.reload();
    },

    showCategory() {
      this.axios
        .get(process.env.VUE_APP_API_BACKEND + "/showCategory", {})
        .then(response => {
          this.getRoles = response.data;
        });
    },


    filesPNG() {
      this.loading = true;
      let formDataICON = new FormData();
      formDataICON.append("file", this.$refs.filePng.files[0]);
      formDataICON.append("category_name", this.category_name);
      formDataICON.append("category_description", this.category_description);
      if (this.$refs.filePng.files[0] === undefined) {
        this.$swal("Please Upload Icon", "", "warning");
      } else {
        this.axios
          .post(
            process.env.VUE_APP_API_BACKEND + "/addCategory",
            formDataICON,
            {
              headers: {
                "Content-Type": "multipart/form-data"
              }
            },

            {
              onDownloadProgress: progressEvent => {
                var percentCompleted = Math.round(
                  (progressEvent.loaded * 100) / progressEvent.total
                );
                // console.log(percentCompleted);
                // alert(percentCompleted)
              }
            }
          )
          .then(response => {
            // console.log(response);
            if (response.data.status == "Please check file again") {
              this.$swal("Please check file name again", "", "warning");
              this.loading = false;
            } else if (response.data.status == "Please check records again") {
              this.$swal("Please check records again", "", "warning");
              this.loading = false;
            } else if (response.data.status === "success") {
              this.$swal("Add Category Success", "", "success").then(
                response => {
                  this.reloadPage();
                }
              );
            } else {
              this.$swal(response.data.status, "", "error");
              this.loading = false;
            }
          });
      }
    }
  }
};
</script>
<style>
.contentPortal {
  margin-top: 20px;
}

.contentPortal1 {
  margin-buttom: 20px;
}
.color-title {
  font-size: 12px;
  background-color: a6bac5;
  color: #fff;
}

.imageSize {
  width: 100%;
  height: 100%;
  max-width: 40px;
  max-height: 40px;
  display: block;
  margin: 0 auto;
  margin-top: 10px;
}
</style>
