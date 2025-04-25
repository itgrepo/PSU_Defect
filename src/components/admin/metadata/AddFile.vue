<template>
  <v-card flat>
    <v-layout row justify-center>
      <v-dialog v-model="loading" persistent fullscreen content-class="loading-dialog">
        <v-container fill-height>
          <v-layout row justify-center align-center>
            <v-progress-circular
              indeterminate
              :size="80"
              :width="10"
              color="#a6bac5"
            ></v-progress-circular>
          </v-layout>
        </v-container>
      </v-dialog>
    </v-layout>
    <v-card sm12 md10 xs10 class="card-add-file" flat>
      <v-layout>
        <v-flex sm12 md12 xs12>
          <v-radio-group v-model="addfile" row class="pa-3">
            <v-radio :label="$t('adddatadic')"  :value="2"></v-radio>
            <v-radio :label="$t('addapi')" :value="3"></v-radio>
            <v-radio :label="$t('addzip')" :value="4"></v-radio>
          </v-radio-group>
        </v-flex>
      </v-layout>
      <v-layout>
        <v-flex sm3 md3 xs3>
          <v-subheader>{{ $t('reprotid') }} </v-subheader>
        </v-flex>
        <v-flex sm6 md6 xs6>
          <v-autocomplete
            :items="items"
            :filter="customFilter"
            item-text="file_name"
            :label="$t('reprotid')"
            item-value="file_name"
            v-model="filename"
          ></v-autocomplete>
        </v-flex>
      </v-layout>
      <div v-if="addfile === 2">
        <v-layout>
          <v-flex sm3 md3 xs3>
            <v-subheader>{{ $t('filedatadic') }}</v-subheader>
          </v-flex>
          <v-flex sm6 md6 xs6>
            <input
              type="file"
              id="files"
              ref="file1"
              accept=".xlsx,.xls"
              style="display: none"
              @change="filesUploadMetadata"
            />
            <v-text-field
              :label="$t('selectfiledatadic')"
              @click="$refs.file1.click()"
              v-model="nameFileMetadata"
              prepend-icon="attach_file"
            ></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout>
          <v-spacer></v-spacer>
          <v-btn color="success" outline @click="filesMeta">
            <v-icon left>cloud_upload</v-icon>{{ $t('uploaddatadic') }}
          </v-btn>
        </v-layout>
        <!-- <v-layout>
            <v-flex sm3 md3 xs3>
              <v-subheader>File Data Dictionary</v-subheader>
            </v-flex>
            <v-flex sm6 md6 xs6>
              <input type="file" id="files" ref="file1"  accept=".xlsx,.xls"  style="display: none;" @change="filesUploadMetadata()" />
              <v-text-field label="Select File (.xlsx, .xls)" @click='$refs.file1.click()' v-model='nameFileMetadata' prepend-icon="attach_file"></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout>
            <v-spacer></v-spacer>
            <v-btn color="success" outline @click="filesMeta()">
              <v-icon left>cloud_upload</v-icon>Upload File Data Dictionary
            </v-btn>
          </v-layout> -->
      </div>
      <div v-else-if="addfile === 3">
        <v-layout>
          <v-flex sm3 md3 xs3>
            <v-subheader>{{ $t('fileexcel') }}</v-subheader>
          </v-flex>
          <v-flex sm6 md6 xs6>
            <input
              type="file"
              id="filesExcel"
              ref="fileexcel"
              accept=".xlsx"
              style="display: none"
              @change="filesUploadExcel"
            />
            <v-text-field
            :label="$t('selectxlsx')" 
              @click="$refs.fileexcel.click()"
              v-model="nameFileExcel"
              prepend-icon="attach_file"
            ></v-text-field>
          </v-flex>

        <v-tooltip
          v-model="show"
          top
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              icon
              v-bind="attrs"
              v-on="on"
            >
              <v-icon color="grey lighten-1">
                mdi-information
              </v-icon>
            </v-btn>
          </template>
          <span>{{ $t('detailapi') }}</br>
1) {{ $t('api1') }} </br>
2) {{ $t('api2') }}</br>
3) {{ $t('api3') }}</br>
4) {{ $t('api4') }}</span>
        </v-tooltip>

        </v-layout>
        <v-layout>
          <v-spacer></v-spacer>
          <v-btn color="success" outline @click="filesExcel">
            <v-icon left>cloud_upload</v-icon> {{ $t('upxlsx') }}
          </v-btn>
        </v-layout>
        <!-- <v-layout>
            <v-flex sm3 md3 xs3>
              <v-subheader>File Excel</v-subheader>
            </v-flex>
            <v-flex sm6 md6 xs6>
              <input type="file" id="filesExcel" ref="fileexcel" accept=".xlsx" style="display: none;" @change="filesUploadExcel()" />
              <v-text-field label="Select File (.xlsx)" @click='$refs.fileexcel.click()' v-model='nameFileExcel' prepend-icon="attach_file"></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout>
            <v-spacer></v-spacer>
            <v-btn color="success" outline @click="filesExcel()">
              <v-icon left>cloud_upload</v-icon>Upload File Excel
            </v-btn>
          </v-layout> -->
      </div>
      <div v-else-if="addfile === 4">
        <v-layout>
          <v-flex sm3 md3 xs3>
            <v-subheader>{{ $t('filezip') }}</v-subheader>
          </v-flex>
          <v-flex sm6 md6 xs6>
            <input
              type="file"
              id="filesCSV"
              ref="fileCsv"
              accept=".zip"
              style="display: none"
              @change="filesUploadCSV()"
            />
            <v-text-field
              :label="$t('selectzip')" 
              @click="$refs.fileCsv.click()"
              v-model="nameFileCSV"
              prepend-icon="attach_file"
            ></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout>
          <v-spacer></v-spacer>
          <v-btn color="success" outline @click="filesCSV()">
            <v-icon left>cloud_upload</v-icon>{{ $t('upzip') }}
          </v-btn>
        </v-layout>
      </div>
    </v-card>
  </v-card>
</template>

<script>
import * as XLSX from "xlsx";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      show: false,
      loading: false,
      filename: "",
      valid: true,
      addfile: 2,
      nameFileMetadata: "",
      nameFileCSV: "",
      nameFileExcel: "",
      Rules: [(v) => !!v || "Information is required"],
      items: [],
    };
  },
  computed: {
    ...mapGetters(["fileName"]),
  },
  mounted() {
    this.getData();
    this.filename = this.fileName;
  },
  watch: {
    fileName(newFileName) {
      this.filename = newFileName;
    },
    loading(val) {
      if (!val) return;
      setTimeout(() => (this.loading = false), 3000);
    },
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
        });
    },
    filesUploadMetadata() {
      const uploadedFilesMetadata = this.$refs.file1.files;
      if (uploadedFilesMetadata.length > 0) {
        const file = uploadedFilesMetadata[0];

        // ตรวจสอบว่าไฟล์เปล่าหรือไม่
        if (file.size === 0) {
          this.$swal(
            "Empty file",
            "Please upload a non-empty Excel file (.xlsx, .xls)",
            "error"
          );
          this.$refs.file1.value = ""; // Clear the file input
          this.nameFileMetadata = "";
          return;
        }

        const validExtensions = ["xlsx", "xls"];
        const fileExtension = file.name.split(".").pop().toLowerCase();

        if (!validExtensions.includes(fileExtension)) {
          this.$swal(
            "Invalid file type",
            "Please upload an Excel file (.xlsx, .xls)",
            "error"
          );
          this.$refs.file1.value = ""; // Clear the file input
          this.nameFileMetadata = "";
          return;
        }

        this.nameFileMetadata = file.name;
        const reader = new FileReader();

        reader.onload = (e) => {
          const data = new Uint8Array(e.target.result);
          const workbook = XLSX.read(data, { type: "array" });

          // ตรวจสอบว่าไฟล์มีข้อมูลในชีตแรกหรือไม่
          const firstSheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[firstSheetName];

          if (!worksheet || !worksheet["!ref"]) {
            this.$swal("File does not contain data.", "", "warning");
            this.$refs.file1.value = ""; // Reset the input file
            this.nameFileMetadata = "";
            return;
          }

          const range = XLSX.utils.decode_range(worksheet["!ref"]); // ขอบเขตข้อมูลในชีต

          let containsData = false;
          for (let R = range.s.r; R <= range.e.r; ++R) {
            for (let C = range.s.c; C <= range.e.c; ++C) {
              const cellAddress = { c: C, r: R };
              const cellRef = XLSX.utils.encode_cell(cellAddress);
              const cell = worksheet[cellRef];

              if (
                cell &&
                cell.v !== undefined &&
                cell.v !== null &&
                cell.v.toString().trim().length > 0
              ) {
                containsData = true;
                break;
              }
            }
            if (containsData) break;
          }

          if (containsData) {
            // this.$swal('File contains data.', '', 'success');
            // this.filesMeta(); // ทำการอัปโหลดไฟล์
          } else {
            this.$swal("File does not contain data.", "", "warning");
            this.$refs.file1.value = ""; // Reset the input file
            this.nameFileMetadata = "";
          }
        };

        reader.readAsArrayBuffer(file);
      }
    },
    async filesUploadExcel() {
      const uploadedFilesExcel = this.$refs.fileexcel.files;
      if (uploadedFilesExcel.length > 0) {
        const file = uploadedFilesExcel[0];

        // ตรวจสอบว่าไฟล์เปล่าหรือไม่
        if (file.size === 0) {
          this.$swal(
            "Empty file",
            "Please upload a non-empty Excel file (.xlsx, .xls)",
            "error"
          );
          this.$refs.fileexcel.value = ""; // Clear the file input
          this.nameFileExcel = "";
          return;
        }

        const validExtensions = ["xlsx", "xls"];
        const fileExtension = file.name.split(".").pop().toLowerCase();

        if (!validExtensions.includes(fileExtension)) {
          this.$swal(
            "Invalid file type",
            "Please upload an Excel file (.xlsx, .xls)",
            "error"
          );
          this.$refs.fileexcel.value = ""; // Clear the file input
          this.nameFileExcel = "";
          return;
        }

        this.nameFileExcel = file.name;
        const reader = new FileReader();

        reader.onload = (e) => {
          const data = new Uint8Array(e.target.result);
          const workbook = XLSX.read(data, { type: "array" });

          // ตรวจสอบว่าไฟล์มีข้อมูลในชีตแรกหรือไม่
          const firstSheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[firstSheetName];

          if (!worksheet || !worksheet["!ref"]) {
            this.$swal("File does not contain data.", "", "warning");
            this.$refs.fileexcel.value = "";
            this.nameFileExcel = "";
            return;
          }

          const range = XLSX.utils.decode_range(worksheet["!ref"]); // ขอบเขตข้อมูลในชีต

          let containsData = false;
          for (let R = range.s.r; R <= range.e.r; ++R) {
            for (let C = range.s.c; C <= range.e.c; ++C) {
              const cellAddress = { c: C, r: R };
              const cellRef = XLSX.utils.encode_cell(cellAddress);
              const cell = worksheet[cellRef];

              if (
                cell &&
                cell.v !== undefined &&
                cell.v !== null &&
                cell.v.toString().trim().length > 0
              ) {
                containsData = true;
                break;
              }
            }
            if (containsData) break;
          }

          if (containsData) {
            // this.$swal('File contains data.', '', 'success');
            // ทำการอัปโหลดไฟล์
            // this.filesExcel();
          } else {
            this.$swal("File does not contain data.", "", "warning");
            // Reset the input file
            this.$refs.fileexcel.value = "";
            this.nameFileExcel = "";
          }
        };

        reader.readAsArrayBuffer(file);
      }
    },
    filesMeta() {
      let formDataMeta = new FormData();
      formDataMeta.append("files", this.$refs.file1.files[0]);
      formDataMeta.append("file_name", this.filename);
      this.axios
        .post(process.env.VUE_APP_API_BACKEND + "/uploadFileMetadata", formDataMeta, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          // //console.log(response);
          if (response.data.status == "Please check file again") {
            this.$swal("Please check file name again", "", "warning");
          } else if (response.data.status == "Please check records again") {
            this.$swal("Please check records again", "", "warning");
          } else if (response.data.status === "success") {
            this.$swal("Upload Datadictionary File Success", "", "success").then((response) => {
              this.reloadPage();
            });
          } else {
            this.$swal(response.data.status, "", "error");
          }
        });
    },
    filesUploadCSV() {
    const uploadedFilesCSV = this.$refs.fileCsv.files;
    if (uploadedFilesCSV.length > 0) {
      const file = uploadedFilesCSV[0];

      // ตรวจสอบว่าไฟล์เปล่าหรือไม่
      if (file.size === 0) {
        this.$swal('Empty file', 'Please upload a non-empty Zip file (.zip)', 'error');
        this.$refs.fileCsv.value = '';  // Clear the file input
        this.nameFileCSV = '';
        return;
      }

      const validExtensions = ['zip'];
      const fileExtension = file.name.split('.').pop().toLowerCase();

      if (!validExtensions.includes(fileExtension)) {
        this.$swal('Invalid file type', 'Please upload a Zip file (.zip)', 'error');
        this.$refs.fileCsv.value = '';  // Clear the file input
        this.nameFileCSV = '';
        return;
      }

      this.nameFileCSV = file.name;
      // this.filesCSV(); // Call the function to upload the file
    }
  },
    filesCSV() {
      this.loading = true;
      // //console.log(this.nameFileMetadata);
      let formDataCSV = new FormData();
      formDataCSV.append("files", this.$refs.fileCsv.files[0]);
      formDataCSV.append("file_name", this.filename);
      // console.log(formDataCSV);

      this.axios
        .post(
          process.env.VUE_APP_API_BACKEND + "/uploadFileDataCSV",
          formDataCSV,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          },

          {
            onDownloadProgress: (progressEvent) => {
              var percentCompleted = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
              );
              // console.log(percentCompleted);
              // alert(percentCompleted)
            },
          }
        )
        .then((response) => {
          // console.log(response);
          if (response.data.status == "Please check file again") {
            this.$swal("Please check file name again", "", "warning");
            this.loading = false;
          } else if (response.data.status == "Please check records again") {
            this.$swal("Please check records again", "", "warning");
            this.loading = false;
          } else if (response.data.status === "success") {
            this.$swal("Upload Zip File Success", "", "success").then((response) => {
              this.reloadPage();
            });
          } else {
            this.$swal(response.data.status, "", "error");
            this.loading = false;
          }
        });
    },
    filesExcel() {
      let formDataExcel = new FormData();
      formDataExcel.append("files", this.$refs.fileexcel.files[0]);
      formDataExcel.append("file_name", this.filename);

      this.axios
        .post(process.env.VUE_APP_API_BACKEND + "/uploadFileDataExcel", formDataExcel, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          if (response.data.status == "Please check file again") {
            this.$swal("Please check file name again", "", "warning");
          } else if (response.data.status == "Please check records again") {
            this.$swal("Please check records again", "", "warning");
          } else if (response.data.status === "success") {
            this.$swal("Upload Excel File Success", "", "success").then((response) => {
              this.reloadPage();
            });
          } else {
            this.$swal(response.data.status, "", "error");
          }
        });
    },
  },
};
</script>

<style>
.loading-dialog {
  background-color: rgba(255, 255, 255, 0.8);
}
</style>
