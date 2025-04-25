<template lang="html">
  <div>
    <v-card>
      <v-card-title class="headline">
        {{ $t('orglist') }}
        <v-divider class="mx-3 setLine" vertical></v-divider>
        <v-btn outline color="light-blue darken-4" @click="openAddRole()">
          <v-icon left dark>add_circle</v-icon>{{ $t('addorg') }}
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-data-table v-bind:headers="localizedHeaders" v-bind:items="getRoles"
          :rows-per-page-items="[ 10, 15, 20, 25,  {text:'All', value: -1}]"
          :rows-per-page-text="$t('rowsPerPageLabel')">
          <template slot="items" slot-scope="props">
            <td class="org-name">{{ props.item.org_name }}</td>
            <td class="org-desc">{{ props.item.org_des }}</td>
            <td class="text-xs-center">
              <v-btn small icon @click="editorganizastion(props.item)">
                <v-icon color="warning">edit</v-icon>
              </v-btn>
              <v-btn small icon @click="deletePrevilage(props.item)">
                <v-icon color="error">delete</v-icon>
              </v-btn>
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
            <v-toolbar-title>{{ $t('addorg') }}</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn outline icon @click.native="closeDialogAddusers()" dark>
              <v-icon>close</v-icon>
            </v-btn>
          </v-toolbar>
          <v-divider></v-divider>

          <v-form ref="form" v-model="valid" lazy-validation>
            <v-layout align-start justify-center row wrap >
              <v-flex md12>

    <v-card elevation="10">
      <v-card-title>
        <h2>
          {{ $t('createorg') }}
        </h2>
        <v-container fluid>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-row>
              <v-col cols="4">
                <v-subheader>
                  <h4><span class="pr-1" style="color: red">*</span>{{ $t('orgname') }}:</h4>
                </v-subheader>
              </v-col>
            </v-row>
            <v-col cols="12">
              <v-text-field
              v-model="organize_name"
              required
              :label="$t('orgname')"
              :rules="Rules"
                outlined
                solo
              ></v-text-field>
            </v-col>

            <v-row>
              <v-col cols="6">
                <v-subheader>{{ $t('des') }}: </v-subheader>
              </v-col>
            </v-row>
            <v-col cols="12">
              <v-textarea
                v-model="organize_description"
                :label="$t('orgdes')"
                auto-grow
                outlined
                solo
                rows="3"
                row-height="25"
                shaped
              ></v-textarea>
            </v-col>

            <!-- <v-row>
              <v-col cols="6">
                <v-subheader>รูปภาพ: </v-subheader>
              </v-col>
            </v-row>
            <v-col cols="12">
                <div>
                   <v-btn
                color="success"
                class="text-none"
                round
                depressed
                :loading="isSelecting"
                @click="onButtonClick"
              >
                <v-icon left>
                  cloud_upload
                </v-icon>
                upload
              </v-btn>
              <input
                ref="uploader"
                class="d-none"
                type="file"
                accept="image/*"
                @change="onFileChanged"
              />
                </div> -->
              <!-- {{selectedFile.name}} -->


              <!-- <v-btn color="success" outline @click="upload()">
                <v-icon left>cloud_upload</v-icon>Upload File</v-btn
              > -->
              <!-- <v-btn round depressed color="success" outline @click="upload()">
                <v-icon left>public</v-icon>ลิงก์</v-btn
              > -->
            <!-- </v-col> -->

            <!-- <v-row>
              <v-col cols="4">
                <v-subheader>Parent: </v-subheader>
              </v-col>
            </v-row>
            <v-col cols="12">
              <v-select
                item-text="title"
                item-value="name"
                label="ฟิลด์ที่ต้องการ"
                :items="organization"
                v-model="organization.name"
                :rules="Rules"
                dense
                solo
              ></v-select>
            </v-col> -->
            <v-layout>
              <v-spacer></v-spacer>
              <v-btn
                :disabled="!valid"
                color="success"
                @click="save()"
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
    <dialogEditorganizastion ref="edit" />
  </div>
</template>

<script>
import dialogEditorganizastion from './dialogEditorganizastion.vue'
  export default {
    components: { dialogEditorganizastion },
    data() {
      return {
        getRoles: [],
      dialogAddUsers: false,
      organization: [],
      valid_External: true,
      valid: true,
      Rules: [v => !!v || "Information is required"],
      // headers: [
      //   {
      //       text: 'name',
      //       align: 'center',
      //       sortable: false
      //     },
      //     {
      //       text: 'details',
      //       align: 'center',
      //       sortable: false
      //     },

      //     {
      //       text: '',
      //       align: 'center',
      //       sortable: false
      //     }
      //   ]
    };
  },
   created() {
      this.showOrganize()
    },
  mounted() {
    this.data_to_regis();
    this.showOrganize()
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
        text: this.$t('orgname'),
        align: 'center',
        sortable: false
      },
      {
        text: this.$t('des'),
        align: 'center',
        sortable: false
      },
      {
        text: '',
        align: 'center',
        sortable: false
      }
    ];
  }
  },

  methods: {
     save() {
          this.axios
           .post(process.env.VUE_APP_API_BACKEND + "/addOrganize",{
            // .post(process.env.VUE_APP_API_BACKEND + "/saveMetadata", payload,{
              // user_id: this.userData.user_id,
              // data: this.sourceData,
              // sublevel_key: '1'
                organize_name: this.organize_name,
                organize_description: this.organize_description,

            })
            .then(response => {
              // console.log(response);
              // //console.log(this.sourceData.Link_name);
              if (response.data.status === "success") {
                this.$swal("Save Success", "", "success").then(response => {
                  this.reloadPage();
                  this.closeDialogAddusers()
                });
              }
               else {
                 this.$swal("Information is required", "", "warning");
               }
            });

      },

      editorganizastion(data) {
                this.$refs.edit.open(data)
      },



      reloadPage() {
        window.location.reload();
      },



// deletePrevilage(data) {

//         this.axios.post(process.env.VUE_APP_API_BACKEND + '/DeleteOrganize',
//         { 'organize_id': data.org_id, })
//         .then((response) => {
//           if (response.data === 'Delete success') {
//             this.$swal('Delete is success', ' ', 'success')
//             this.showOrganize()
//           } else if (response.data === 'Permission denied') {
//             this.$swal('Permission denied', ' ', 'warning')
//           } else {
//             this.$swal('error', ' ', 'error')

//           }
//         })
//       },
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
          this.axios.post(process.env.VUE_APP_API_BACKEND + '/DeleteOrganize',
              { 'organize_id': data.org_id, })
            .then((response) => {
          if (response.data === 'Delete success') {
            this.$swal('Delete is success', ' ', 'success')
            this.showOrganize()
          } else if (response.data === 'Permission denied') {
            this.$swal('Permission denied', ' ', 'warning')
          } else {
            this.$swal('error', ' ', 'error')

          }
            })
        });
      },

      reloadPage() {
        window.location.reload();
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
        this.dialogAddUsers = true
        this.getUserPermission()
      },
            closeDialogAddusers() {
        this.dialogAddUsers = false
        this.userRoles = []
      },
            reloadPage() {
        window.location.reload()
      },

showOrganize(){
        // console.log("test1234")
          this.axios.get(process.env.VUE_APP_API_BACKEND + '/showOrganize',{
          }).then((response)=>{
          // console.log(response.data)
          this.getRoles=response.data;
          })
      },

  }

};
</script>
<style scoped>
/* Existing styles */
.contentPortal {
  margin-top: 20px;
}

/* Default column style */
td {
  transition: all 0.2s ease-in-out;
  white-space: nowrap; 
  overflow: hidden;
  text-overflow: ellipsis; 
  max-width: 200px;
}

/* Expand column when hovered */
td:hover {
  max-width: none; 
  overflow: visible;
  white-space: normal; 
}

/* Ensure only Organization Name & Description are affected */
td.org-name, td.org-desc {
  text-align: left; 
}
</style>

