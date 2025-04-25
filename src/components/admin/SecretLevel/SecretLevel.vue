<template lang="html">
<v-container class="contentPortal">
    <!-- <v-tabs v-model="activeMetaTab" :scrollable="false" color="#59AFC6"dark grow>
      <v-tab  dark grow class="subheading" href="#tab-1" >
       <h3>Secret Level</h3>
      </v-tab>
      <v-tab-item value="tab-1" lazy>
  <div> -->
  <v-card-title class="color-title">
    <h1 class="text-uppercase">Secret Level</h1>
  </v-card-title>
    <v-layout row wrap style="margin-top: 25px;">
      <v-flex style="max-width: 15vw">
        <input type="file" id="file" ref="file" accept=".xlsx" style="display: none;" @change="filesUpload()"/>
        <v-btn flat outline class="btn-uploadfile" color="blue darken-4" @click="$refs.file.click()">
          <v-icon>attachment</v-icon> Select File
        </v-btn>
        <p style="color: #9E9E9E" >* Upload excel file to append your new data.</p>
      </v-flex>
      <v-flex md2 v-if="nameFile"><v-chip>{{nameFile}}</v-chip></v-flex>
      <v-flex md5>
        <v-btn flat outline color="green" class="white--text btn-save" @click="filesTest()">
          PREVIEW
        </v-btn>
      </v-flex>
      <v-flex md2>
        <v-btn flat outline color="green" class="white--text btn-save" @click="downloadFile()">
          <v-icon left>cloud_download</v-icon>Download example file
        </v-btn>
      </v-flex>
    </v-layout>
    <v-layout>
       <v-flex md8>
      <v-radio-group v-model="radiocomplete" row  @change="getdata()">
          <v-radio label="All" :value="1"></v-radio>
          <v-radio label="Active" :value="2"></v-radio>
          <v-radio label="Expired" :value="3"></v-radio>
      </v-radio-group>
    </v-flex>
    <!-- <v-layout row wrap>
      <v-flex style="max-width: 10vw">
        <input type="file" id="file" ref="file" accept=".xlsx" style="display: none;" @change="filesUpload()"/>
        <v-btn flat outline class="btn-uploadfile" color="blue darken-4" @click="$refs.file.click()">
          <v-icon>attachment</v-icon> Select File
        </v-btn>
      </v-flex>
      <v-flex md2 v-if="nameFile"><v-chip>{{nameFile}}</v-chip></v-flex>
      <v-flex md6>
        <v-btn flat outline color="green" class="white--text btn-save " @click="savefilesUpload()">
          <v-icon dark class="green--text">save</v-icon> SAVE
        </v-btn>
      </v-flex>
    </v-layout> -->
    <!-- <pre>{{data}}</pre> -->
      <v-flex md4>
        <v-text-field
          class="mt-3 mr-3 mb-10"
          v-model="search"
          append-icon="search"
          :label="$t('search')"
          single-line
          hide-details
          color="light-blue darken-4"
        ></v-text-field>
      </v-flex>
    </v-layout>
    <v-data-table
        v-model="selected"
        :headers="headers"
        :items="getdatasave"
        :search="search"
        item-key="name"

        class="elevation-1"
        :rows-per-page-items="[10, 25, 50, {text:'All', value: -1}]"
        :rows-per-page-text="$t('rowsPerPageLabel')"
     >
        <template v-slot:items="props">
          <td class="text-xs-center">{{props.item.username}}</td>
          <td class="text-xs-center">{{props.item.previlage_name}}</td>

          <!-- <td class="text-xs-center">{{ props.item.national_id }}</td> -->
          <!-- <td class="text-xs-center">{{ props.item.national_id_book }}</td> -->
          <!-- <td class="text-xs-center">{{ props.item.sublevel_id }}</td> -->
          <td class="text-xs-center">{{ props.item.sublevel_id }}
          <!-- <v-edit-dialog
            :return-value.sync="props.item.status_name"
            large
            persistent
            @save="seveedit(props.item)"
            >{{props.item.sublevel_id}}
            <template v-slot:input>
            <v-select :items="categorysub" item-text="sublevel_id" item-value="sublevel_id"  label="Sub Level" v-model="props.item.sublevel_id" required></v-select>
            </template>
          </v-edit-dialog> -->
        </td>
          <td>
            <v-edit-dialog
                :return-value.sync="props.item.status_name"
                large
                persistent
                @save="seveedit(props.item)"
                >{{props.item.expiration}}
                <template v-slot:input>
                   <v-menu
                      v-model="menu2"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      transition="scale-transition"
                      offset-y
                      full-width
                      min-width="290px"
                    >
        <template v-slot:activator="{ on }">
                              <!-- <v-text-field v-model="props.item.expiration" label="Edit" single-line counter></v-text-field> -->
          <v-text-field
            v-model="props.item.expiration"
            label="Picker without buttons"
            prepend-icon="event"
            readonly
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker no-title v-model="props.item.expiration" @input="menu2 = false"></v-date-picker>
      </v-menu>

                </template>
            </v-edit-dialog>
            </td>
      </template>
      <template v-slot:no-data>
        <v-alert :value="true" color="error" icon="warning">Sorry, nothing to display here :(</v-alert>
      </template>
      <template v-slot:no-results>
        <v-alert
          :value="true"
          color="error"
          icon="warning"
        >{{ $t('searchfor') }} "{{ search }}" {{ $t('foundno') }}</v-alert>
      </template>
  </v-data-table>

<!-- dialog show data -->
     <v-dialog max-width="750px" v-model="dialogdata">
      <v-card>
           <v-data-table
              v-model="selected"
              :headers=" headerdata"
              :items="data"
              :search="search"
              item-key="name"
              class="elevation-1"
              :rows-per-page-items="[10, 25, 50, {text:'All', value: -1}]"
              :rows-per-page-text="$t('rowsPerPageLabel')"
              >
          <template v-slot:items="props">
              <td class="text-xs-center">
                <v-edit-dialog :return-value.sync="props.item.name" lazy>
                  {{ props.item.Expiration}}
                  <!-- <template v-slot:input>
                    <v-text-field v-model="props.item.Expiration" label="Edit" single-line counter></v-text-field>
                  </template> -->
                   <template v-slot:input>
                   <v-menu
                      v-model="menu2"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      transition="scale-transition"
                      offset-y
                      full-width
                      min-width="290px"
                    >
        <template v-slot:activator="{ on }">
                              <!-- <v-text-field v-model="props.item.expiration" label="Edit" single-line counter></v-text-field> -->
          <v-text-field
            v-model="props.item.Expiration"
            label="Picker without buttons"
            prepend-icon="event"
            readonly
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker no-title v-model="props.item.Expiration" @input="menu2 = false"></v-date-picker>
      </v-menu>

                </template>
                </v-edit-dialog>
                <!-- {{formatDate(props.item.Expiration)}} -->
              </td>
              <td class="text-xs-center">{{ props.item.National_ID }}</td>
              <td class="text-xs-center">{{ props.item.Passport_ID }}</td>
              <td class="text-xs-center">
                <v-edit-dialog :return-value.sync="props.item.name" lazy>
                  {{ props.item.Sublevel_ID}}
                  <template v-slot:input>
                    <v-select
                      :items="categorysub"
                      item-text="sublevel_id"
                      item-value="sublevel_id"
                      label="Sub Level"
                      v-model=" props.item.Sublevel_ID"
                    ></v-select>
                  </template>
                </v-edit-dialog>
              </td>
              <td class="text-xs-center">
                <v-btn flat icon @click="deleteVersion(props.item)">
                  <v-icon color="error">delete</v-icon>
                </v-btn>
              </td>
            </template>
            <template v-slot:no-data>
                <v-alert :value="true" color="error" icon="warning">Sorry, nothing to display here :(</v-alert>
            </template>
            <template v-slot:no-results>
                <v-alert
                  :value="true"
                  color="error"
                  icon="warning"
                >{{ $t('searchfor') }} "{{ search }}" {{ $t('foundno') }}</v-alert>
            </template>
      </v-data-table>
      <v-card-actions>
      <v-spacer></v-spacer>
              <v-btn flat outline color="green" class="white--text btn-save " @click="save()">
                <v-icon dark class="green--text">save</v-icon> SAVE
              </v-btn>
      </v-card-actions>
    </v-card>
 </v-dialog>
  </div>
  </v-tab-item>
</v-tabs>
</v-container>
</template>

<script>
import { Encode, Decode } from "@/services";
export default {
  data() {
    return {
      nameFile: "",
      dataUser: [],
      data: [],
      getdatasave: [],
      dialogdata: false,
      categorysub: [],
      search: '',
      radiocomplete: 1,
      headers: [
        {
          text: "User",
          sortable: true,
            align: "center",
          value: "username"
        },
        {
          text: "Type",
          sortable: true,
          align: "center",
          value: "previlage_name"

        },
        // {
        //   text: "National ID",
        //   align: "center",
        //   sortable: true,
        //   value: "national_id"
        // },
        // {
        //   text: "Passport ID",
        //   align: "center",
        //   sortable: true,
        //   value: "national_id_book"
        // },
        {
          text: "Sublevel id",
          align: "center",
          sortable: true,
          value: "sublevel_id"
        },
         {
          text: "Expiration",
          sortable: true,
          value: "expiration"
        },
      ],
      headerdata: [
        {
          text: "Expiration",
          align: "left",
          sortable: true,
          value: "expiration"
        },
        {
          text: "National ID",
          align: "center",
          sortable: true,
          value: "NationalID"
        },
        {
          text: "Passport ID",
          align: "center",
          sortable: true,
          value: "PassportID"
        },
        {
          text: "Sublevel id",
          align: "center",
          sortable: true,
          value: "sublevelid"
        },
        {
          text: "Action",
          align: "center",
          sortable: true,
          value: "action"
        }
      ]
    };
  },
  mounted() {
    // this.getdata();
    // this.datasublevel();
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
  methods: {
    // savefilesUpload() {
    //   let formData = new FormData();
    //   formData.append("file", this.$refs.file.files[0]);
    //   this.axios
    //     .post(
    //       process.env.VUE_APP_API_BACKEND + "/file/savefilesUploadWord",
    //       formData,
    //       {
    //         headers: {
    //           "Content-Type": "multipart/form-data"
    //         }
    //       }
    //     )
    //     .then(response => {
    //       // if (response.data.status === "success")
    //       // //console.log(response.data.data);
    //       // this.$refs.dialogWord.open(response.data.data)
    //       // //console.log(response.data);
    //     });
    // },
    // filesUpload() {
    //   const uploadedFiles = this.$refs.file.files;
    //   this.nameFile = uploadedFiles[0].name;
    // },
    // filesTest() {
    //   let formData = new FormData();
    //   formData.append("file", this.$refs.file.files[0]);
    //   this.axios
    //     .post(
    //       process.env.VUE_APP_API_BACKEND + "/file/uploadFileUser",
    //       formData,
    //       {
    //         headers: {
    //           "Content-Type": "multipart/form-data"
    //         }
    //       }
    //     )
    //     .then(response => {
    //       // //console.log(response);
    //       this.data = response.data;
    //       this.dialogdata = true;
    //     });
    // },
    save() {
      // //console.log(this.data);

      this.axios
        .post(process.env.VUE_APP_API_BACKEND + "/insertdate", this.data)
        .then(response => {
          // //console.log(response);
          this.$swal("Save successfully", "", "success").then(response => {
            this.dialogdata = false;
            this.nameFile = "";
            this.getdata();
          });
        });
    },
    getdata() {
      // //console.log(this.radiocomplete.toString());

      this.axios
        .post(process.env.VUE_APP_API_BACKEND + "/sertdate",{'action': this.radiocomplete.toString()})
        .then(response => {
          this.getdatasave = response.data;
          // //console.log(response.data);
        });
    },
    reloadPage() {
      window.location.reload();
    },
    formatDate(datetime) {
      var date = new Date(datetime);
      var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
      var month =
        date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1;
      var year = date.getFullYear();
      var hours = date.getHours();

      return day + "-" + month + "-" + year;
    },
    datasublevel() {
      this.axios
        .post(process.env.VUE_APP_API_BACKEND + "/getSublevel")
        .then(response => {
          // //console.log(response.data.data);
          this.categorysub = response.data.data;
        });
    },
    deleteVersion(item) {
      const index = this.data.indexOf(item);
      this.data.splice(index, 1);
    },
    seveedit(data) {
      // //console.log(JSON.stringify(data));

      this.axios
        .post(process.env.VUE_APP_API_BACKEND + "/insertSubLevel", data)
        .then(response => {
          // //console.log(response.data);

          if(response.data === 'success') {
          this.$swal("Save successfully", "", "success").then(response => {
            this.reloadPage()
          });
          }
        });
    },
     reloadPage() {
      window.location.reload();
    },
    downloadFile () {
      if (this.userData) {
        var user_id = Encode.encode(this.userData.user_id)
        this.loadFile(process.env.VUE_APP_API_BACKEND + '/file/downloadReport')
      } else {
        this.$swal('Please login', '', 'error')
      }
    },
    loadFile (link) {
      window.location.assign(link)
    },
  }
};
</script>

<style lang="css" scoped="">
th.column.sortable.text-xs-center {
  font-size: 15px;
  font-weight: 600;
}
td {
    border: 1px solid #e0e0e0 !important;
}
>>> tr:nth-child(even){
  background-color: #f3f3f3 !important;
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
.color-title {
  font-size: 12px;
  background-color: a6bac5;
  color: #fff;
}
.contentPortal {
    margin-top: 20px;
}
</style>
