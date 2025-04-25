<template>
  <v-container class="contentPortal">
    <!-- <v-tabs
      v-model="activeMetaTab"
      :scrollable="false"
      color="#59AFC6"
      dark
      grow
    >
      <v-tab dark grow class="subheading" href="#tab-1">
        <h3>Consent Agreement</h3>
      </v-tab>
      <v-tab-item value="tab-1" lazy> -->
      <v-card-title class="color-title">
        <h1 class="text-uppercase">{{ $t('consent') }}</h1>
      </v-card-title>
        <v-card>
          <v-card-text>
            <!-- <v-spacer></v-spacer> -->
            <!-- <v-subheader>File name (.PDF) : </v-subheader>
            <v-flex md3>
            <v-text-field
            class="mgt-10 cancelLocalPath"
            v-model="localPath"
            :rules="localPathRules"
            readonly
            append-icon="cancel"
            :append-icon-cb="() => clearLocalPath()"
            required
            ></v-text-field>
          </v-flex> -->
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-layout row wrap>
                <v-flex md5 pl-5 pr-5 class="text-xs-center">
                  <v-text-field
                    outlined
                    :label="$t('filename')" 
                    v-model="filename"
                    :rules="file"
                    required
                  ></v-text-field>
                  <v-text-field
                    outlined
                    :label="$t('version')" 
                    v-model="version"
                    :rules="versionFile"
                    required
                  ></v-text-field>
                </v-flex>
                <v-flex style="max-width: 10vw">
                  <input
                    type="file"
                    id="file"
                    ref="file"
                    accept=".PDF"
                    style="display: none;"
                    @change="filesUpload()"
                  />
                  <v-btn
                    flat
                    outline
                    class="btn-uploadfile"
                    color="blue darken-4"
                    @click="$refs.file.click()"
                  >
                    <v-icon>attachment</v-icon> {{ $t('select') }}
                  </v-btn>
                </v-flex>
                <p style="color: #9E9E9E" class="text-upload pl-5">
                  * {{ $t('uploadpdf') }}
                </p>
                <v-flex md2 v-if="nameFile"
                  ><v-chip>{{ nameFile }}</v-chip></v-flex
                >
                <v-flex md5>
                  <v-btn
                    flat
                    outline
                    color="green"
                    :disabled="!valid"
                    class="white--text btn-save "
                    @click="filesTest()"
                  >
                    <v-icon dark class="green--text">save</v-icon> {{ $t('save') }}
                  </v-btn>
                </v-flex>
              </v-layout>
            </v-form>
            <!-- <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
          >
          Upload
          <v-icon right dark class="white--text">cloud_upload</v-icon>
        </v-btn>
        <v-btn flat outline  color="#B4BABE">
        <v-icon left>cancel</v-icon>Cancle
      </v-btn>
    </v-card-actions> -->
          </v-card-text>
          <v-data-table
            :headers="localizedHeaders"
            :items="itemsData"
            class="elevation-1 text-xs-center"
          >
            <template v-slot:items="props">
              <td class="text-xs-center">{{ props.item.consent_agreement_id }}</td>
              <td class="text-xs-left"> {{ props.item.file_name }}</td>
              <td class="text-xs-center">{{ props.item.version }}</td>
              <td class="text-xs-center">
                <template v-if="userData.isAdmin">
                  <v-edit-dialog
                    :return-value.sync="props.item.status"
                    large
                    persistent
                    @save="save(props.item)"
                  >
                    <v-btn
                      v-if="props.item.status === 'active'"
                      round
                      outline
                      color="success"
                    >{{ props.item.status }}</v-btn>
                    <v-btn v-else round outline color="error">
                      {{ props.item.status }}
                    </v-btn>
                    <template v-slot:input>
                      <v-select :items="statusItem" v-model="props.item.status"></v-select>
                    </template>
                  </v-edit-dialog>
                </template>

                <template v-else>
                  <span :class="props.item.status === 'active' ? 'text-success' : 'text-error'">
                    {{ props.item.status }}
                  </span>
                </template>
              </td>
              <td class="text-xs-center">{{ props.item.create_at }}</td>
              <td class="text-xs-center">
                <v-btn
                  small
                  icon
                  color="blue"
                  @click="downloadFile(props.item)"
                >
                  <v-icon>cloud_download</v-icon>
                </v-btn>
              </td>
              <!-- <td class="text-xs-center"><v-btn flat icon @click="deleteVersion(props.item)"><v-icon color="error">delete</v-icon></v-btn></td> -->
            </template>
          </v-data-table>
        </v-card>
      </v-tab-item>
    </v-tabs>
  </v-container>
</template>
<script>
import { log } from "util";
export default {
  data() {
    return {
      statusItem: ["active", "Inactive"],
      nameFile: null,
      valid: true,
      localPath: "",
      filename: "",
      version: "",
      loader: null,
      loading3: false,
      switch1: false,
      file: [v => !!v || "File name is required"],
      versionFile: [v => !!v || "Version is required"],
      // headers: [
      //   {
      //     text: "ID",
      //     align: "center",
      //     sortable: false,
      //     value: "id"
      //   },
      //   { text: "File Name", value: "filename", sortable: false },
      //   { text: "Version", value: "version", sortable: false, align: "center" },
      //   { text: "Status", value: "status", sortable: false, align: "center" },
      //   { text: "Date", value: "date", sortable: false, align: "center" }
      //   // { text: '', value: '' ,sortable: false, align: 'center' }
      // ],
      itemsData: []
    };
  },
  watch: {},
  mounted() {
    this.getData();
  },
  computed: {
  localizedHeaders() {
    return [
      {
        text: this.$t('id'),
        align: "center",
        sortable: false,
        value: "id"
      },
      {
        text: this.$t('filename'),
        value: "filename",
        sortable: false
      },
      {
        text: this.$t('version'),
        value: "version",
        sortable: false,
        align: "center"
      },
      {
        text: this.$t('status'),
        value: "status",
        sortable: false,
        align: "center"
      },
      {
        text: this.$t('date'),
        value: "date",
        sortable: false,
        align: "center"
      },
      { 
        text: this.$t('download'), 
        align: "center", 
        sortable: false }
    ];
  }
},
  methods: {
    deleteVersion(data) {
      this.$swal("Want to delete?", "", "warning").then(response => {
        this.axios
          .post(process.env.VUE_APP_API_BACKEND + "/deleteConsentAgreement", {
            data: data
          })
          .then(response => {
            if (response.data.status === "success") {
              this.$swal("Delete success", "", "success");
              this.getData();
            } else if (response.data.status === "active") {
              this.$swal("Status Active", "", "error");
            }
          });
      });
    },
    save(data) {
      this.axios
        .post(process.env.VUE_APP_API_BACKEND + "/saveSatusConsentAgreement", {
          data: data
        })
        .then(response => {
          if (response.data.status === "success") {
            this.getData();
            this.reloadPage();
          }
        });
    },
    filesUpload() {
      const uploadedFiles = this.$refs.file.files;
      this.nameFile = uploadedFiles[0].name;
    },
    getData() {
      this.axios
        .post(process.env.VUE_APP_API_BACKEND + "/getConsentAgreement")
        .then(response => {
          this.itemsData = response.data.data;
          // alert(response.data.data)
        });
    },
    filesTest() {
      if (this.filename !== "" && this.version !== "") {
        let formData = new FormData();
        formData.append("file", this.$refs.file.files[0]);
        this.axios
          .post(
            process.env.VUE_APP_API_BACKEND + "/file/uploadFileMongoPdf",
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data"
              }
            }
          )
          .then(response => {
            this.items = response.data;
            if (response.data.status == "success") {
              this.axios
                .post(
                  process.env.VUE_APP_API_BACKEND + "/addVersionAgreement",
                  {
                    filename: this.filename,
                    version: this.version,
                    id_agreement: response.data.agreement_id,
                    file_name: this.nameFile
                  }
                )
                .then(response => {
                  if (response.data.status === "succes1") {
                    this.getData();
                    this.reloadPage();
                  }
                });
            } else {
              //    this.$swal
            }

            // //console.log(response.data)
          });
      } else {
        this.$swal("Information is required", "", "warning");
      }
    },
    setFileName() {
      this.getDownloadType();
      this.localPath = this.$refs.fileUpload.files[0].name;
      if (
        this.fileAllowed.includes(this.getFileExtension(this.localPath)) &&
        this.downloadFileType.includes(this.getFileExtension(this.localPath))
      ) {
        if (this.$refs.fileUpload.files[0]) {
          this.isFile = true;
          // //console.log('dddddddddddddddddd');
        }
      } else {
        this.clearLocalPath();
        this.$swal("File is not allowed", "", "warning");
      }
    },
    clearLocalPath() {
      this.isFile = false;
      this.localPath = "";
      this.$refs.fileUpload.value = "";
    },
    reloadPage() {
      window.location.reload();
    }
    // savefile () {
    //     this.axios.post(process.env.VUE_APP_API_BACKEND + '/addVersionAgreement',
    //       {'filename': this.filename, 'version': this.version }).then((response) => {
    //     if (response.data === 'success') {
    //       // this.$swal('Password has been changed', '', 'success')

    //       // this.reloadPage()
    //     } else {
    //         // this.$swal('Your password was incorrect.', '', 'error')
    //     }

    //   })

    // }
  }
};
</script>
<style scoped>
>>> th.column.text-xs-center ,>>>th.column.text-xs-left {
  font-size: 15px;
  font-weight: 600;
}
td {
    border: 1px solid #e0e0e0 !important;
}
>>> tr:nth-child(even){
  background-color: #f3f3f3;
}
/*scrollbar  */
>>>::-webkit-scrollbar {
  width: 8px !important;
  height: 8px !important;
}
>>>::-webkit-scrollbar-track {
    background: #d8d8d8 !important;
    border-radius: 2px !important;
}
>>>::-webkit-scrollbar-thumb {
    background: #aaa !important;
    border-radius: 6px !important;
}
>>>::-webkit-scrollbar-corner {
    background: #d8d8d8 !important;
}
.contentPortal {
    margin-top: 20px;
}
.color-title {
  font-size: 12px;
  background-color: a6bac5;
  color: #fff;
}
@media (max-width: 1440px) {
  .text-upload {
    padding: 12px !important ;
  }
  .btn-save {
    float: right;
    /* margin-top: -90px !important;
    margin-left: 464px !important; */
    width: 140px !important;
  }
}
.text-upload {
  padding: 12px !important ;
}
.imageSize {
  max-width: 30px;
  max-height: 30px;
  width: 100%;
  height: 100%;
}
.btn-uploadfile {
  float: left;
  color: #ffffff;
}
.btn-save {
  float: right;
  color: #ffffff;
  /* margin-top: -90px;
  margin-left: 481px; */
  width: 140px;
}
.custom-loader {
  animation: loader 1s infinite;
  display: flex;
}
</style>
