<template lang="html">
  <div>
    <v-card>
      <v-card-title class="headline">
        {{ $t('rolelist') }}
        <v-divider class="mx-3 setLine" vertical></v-divider>
        <v-btn outline color="light-blue darken-4" @click="openAddRole()">
          <v-icon left dark>add_circle</v-icon>{{ $t('addrole') }}
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-data-table v-bind:headers="localizedHeaders" v-bind:items="getRoles"
          :rows-per-page-items="[10, 25, 50, {text:'All', value: -1}]"
          :rows-per-page-text="$t('rowsPerPageLabel')"
          >
          <template slot="items" slot-scope="props">
            <!-- <td class="text-xs-center">{{ props.item.previlage_id }}</td> -->
            <td class="text-xs-center">{{ props.item.previlage_name }}</td>
            <!-- <td class="text-xs-center">{{ props.item.previlage_description }}</td> -->
            <td class="text-xs-center">{{ props.item.create_at }}</td>
            <td class="text-xs-center">{{ props.item.deleted_at }}</td>
            <!--<td class="text-xs-center">
              <v-btn small icon @click="editPrevilage(props.item)">
                <v-icon color="warning">edit</v-icon>
              </v-btn>
              <v-btn small icon @click="deletePrevilage(props.item)">
                <v-icon color="error">delete</v-icon>
              </v-btn> 
            </td>-->
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
    <!-- {{ $t('addrole') }}s -->
    <v-layout row justify-center>
      <v-dialog persistent v-model="dialogAddUsers" max-width="1200px">
        <v-card>
          <v-toolbar class="light-blue darken-4 white--text" dense>
            <v-toolbar-title>{{ $t('addrole') }}s</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn outline icon @click.native="closeDialogAddusers()" dark>
              <v-icon>close</v-icon>
            </v-btn>
          </v-toolbar>
          <v-divider></v-divider>
          <v-container>
            <v-layout>
              <v-flex xs12 md2 pt-3><h3>{{ $t('rolename') }}:</h3></v-flex>
              <v-flex xs12 md6>
                <v-text-field  :label="$t('rolename')" v-model="rolesName" required ></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
          <v-divider></v-divider>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-layout row wrap>
              <v-flex md6>
                <v-container style="padding-top: 15px">
                  <p class="subheading">
                    <v-icon left class="mr-2" color="light-blue darken-4">label</v-icon>{{ $t('userrole') }}
                  </p>
                  <div style="padding-top: 18px">
                    <v-data-table :headers="localizedHeadersUser" :items="userRoles" :search="searchUserinRoles">
                      <template v-slot:items="props">
                        <td class="text-xs-center">{{ props.item.username }}</td>
                        <!-- <td class="text-xs-center" v-if="props.item.national_id !== ''">{{ props.item.national_id }}
                        </td> -->
                        <!-- <td class="text-xs-center" v-else>{{ props.item.national_id_book }}</td> -->
                        <td class="text-xs-center">{{ props.item.email }}</td>
                        <td class="text-xs-center">{{ props.item.previlage_name }}</td>
                        <td class="text-xs-center">
                          <v-btn small icon color="error" @click="removeUser(props.item,props.index)">
                            <v-icon>remove</v-icon>
                          </v-btn>
                        </td>
                      </template>
                      <template v-slot:no-results>
                        <v-alert :value="true" color="error" icon="warning">
                          {{ $t('searchfor') }} "{{ search }}"  {{ $t('foundno') }}
                        </v-alert>
                      </template>
                    </v-data-table>
                  </div>
                </v-container>
              </v-flex>
              <v-flex md6>
                <v-container style="padding-top: 0px">
                  <v-card-title>
                    <p class="subheading">
                      <v-icon left class="mr-2" color="light-blue darken-4">label</v-icon>{{ $t('adduser') }}
                    </p>
                    <v-spacer></v-spacer>
                    <v-text-field v-model="search" append-icon="search" :label="$t('search')"  single-line hide-details>
                    </v-text-field>
                  </v-card-title>
                  <v-data-table :headers="localizedHeadersUser" :items="addUsers" :search="search">
                    <template v-slot:items="props">
                      <td class="text-xs-center">{{ props.item.username }}</td>
                      <!-- <td class="text-xs-center" v-if="props.item.national_id !== ''">{{ props.item.national_id }}</td>
                      <td class="text-xs-center" v-else>{{ props.item.national_id_book }}</td> -->
                      <td class="text-xs-center">{{ props.item.email }}</td>
                      <td class="text-xs-center">{{ props.item.previlage_name }}</td>
                      <td class="text-xs-center">
                        <v-btn small icon color="success" @click="addUser(props.item,props.index)">
                          <v-icon>add</v-icon>
                        </v-btn>
                      </td>
                    </template>
                    <template v-slot:no-results>
                      <v-alert :value="true" color="error" icon="warning">
                        {{ $t('searchfor') }} "{{ search }}" {{ $t('foundno') }}
                      </v-alert>
                    </template>
                  </v-data-table>
                </v-container>
              </v-flex>
            </v-layout>
            <v-flex offset-xs10 pb-4>
              <v-btn color="success" :disabled="!valid" @click="save()">{{ $t('save') }}</v-btn>
            </v-flex>
          </v-form>
        </v-card>
      </v-dialog>
    </v-layout>
    <dialogEditPrevilage ref="edit" />
  </div>
</template>

<script>
  import dialogEditPrevilage from './dialogEditPrevilage'
  export default {
    components: { dialogEditPrevilage },
    data() {
      return {
        getRoles: [],
    addUsers: [], // รายชื่อผู้ใช้ที่สามารถเพิ่มได้
    userRoles: [], // รายชื่อผู้ใช้ที่มีบทบาท
    UserInReports: [], // รายชื่อผู้ใช้ในรายงาน
    UserNotInReport: [], // รายชื่อผู้ใช้ที่ไม่อยู่ในรายงาน
    rolesName: '',
    valid: true,
    search: '',
    searchUserinRoles: '',
    dialogAddUsers: false,
        // getRoles: [],
        // addUsers: [],
        // userRoles: [],
        // rolesName: '',
        // valid: true,
        // search: '',
        // searchUserinRoles: '',
        // dialogAddUsers: false,
        // Rules: [
        //   v => !!v || 'Rule Name is required',
        // ],
        // headersUser: [
        //   {
        //     text: 'Username',
        //     align: 'center',
        //     sortable: false,
        //     value: 'username'
        //   },
        //   // {
        //   //   text: 'National ID/Passport',
        //   //   align: 'center',
        //   //   sortable: false
        //   // },
        //   {
        //     text: 'Email',
        //     align: 'center',
        //     sortable: false,
        //     value: 'email'
        //   },
        //   {
        //     text: 'Type',
        //     align: 'center',
        //     sortable: false,
        //     value: 'previlage_name'
        //   },
        //   {
        //     text: '',
        //     align: 'center',
        //     sortable: false
        //   }
        // ],
        // headers: [
        //   {
        //     text: 'ID',
        //     align: 'center',
        //     sortable: false
        //   },
        //   {
        //     text: 'name',
        //     align: 'center',
        //     sortable: false
        //   },
        //   {
        //     text: 'Description',
        //     align: 'center',
        //     sortable: false
        //   },

        //   {
        //     text: 'Create Date',
        //     align: 'center',
        //     sortable: false
        //   },
        //   {
        //     text: '',
        //     align: 'center',
        //     sortable: false
        //   }
        // ]
      }
    },
    computed: {
  localizedHeadersUser() {
    return [
      {
        text: this.$t('username'),
        align: 'center',
        sortable: false,
        value: 'username'
      },
      // {
      //   text: this.$t('nationalIdOrPassport'),
      //   align: 'center',
      //   sortable: false
      // },
      {
        text: this.$t('email'),
        align: 'center',
        sortable: false,
        value: 'email'
      },
      {
        text: this.$t('type'),
        align: 'center',
        sortable: false,
        value: 'previlage_name'
      },
      {
        text: '',
        align: 'center',
        sortable: false
      }
    ];
  },
  localizedHeaders() {
    return [
      // {
      //   text: this.$t('id'),
      //   align: 'center',
      //   sortable: false
      // },
      {
        text: this.$t('name'),
        align: 'center',
        sortable: false
      },
      // {
      //   text: this.$t('des'),
      //   align: 'center',
      //   sortable: false
      // },
      {
        text: this.$t('createDate'),
        align: 'center',
        sortable: false
      },
      { 
        text: this.$t('deletedDate'), 
        align: 'center', 
        sortable: false 
      }/*,
      {
        text: this.$t('edit'),
        align: 'center',
        sortable: false
      }*/
    ];
  }
},
    created() {
      this.getRolesPermission()
    },
    mounted() {
      this.getRolesPermission()
    },
    methods: {
      editPrevilage(data) {
        this.$refs.edit.open(data)
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
        this.axios.post(process.env.VUE_APP_API_BACKEND + '/mgmt/deleteRoles',
          { 'data': data })
        .then((response) => {
          if (response.data.status === 'success') {
            this.$swal('Delete is success', ' ', 'success')
            this.getRolesPermission()
          } else if (response.data.status === 'Permission denied') {
            this.$swal('Permission denied', ' ', 'warning')
          } else {
            this.$swal('error', ' ', 'error')
              }
            })
        });
      },
      // addUser(data, index) {
      //   this.userRoles.push(data)
      //   this.addUsers.splice(index, 1)
      // },
      // removeUser(data, index) {
      //   this.addUsers.push(data)
      //   this.userRoles.splice(index, 1)
      // },
      addUser(user) {
  console.log("Adding user:", user);
  this.userRoles.push(user);
  this.addUsers = this.addUsers.filter(
    (u) => u.username !== user.username
  );
  console.log("userRoles after adding:", this.userRoles);
  console.log("addUsers after removing:", this.addUsers);
},

removeUser(userToRemove) {
  console.log("Removing user:", userToRemove);
  this.userRoles = this.userRoles.filter(
    (user) => user.username !== userToRemove.username
  );
  this.addUsers.push(userToRemove);
  console.log("userRoles after removing:", this.userRoles);
  console.log("addUsers after adding back:", this.addUsers);
},
  //     addUser(data) {
  //   console.log("Adding user:", data);
  //   // ตรวจสอบว่าผู้ใช้มีอยู่ใน UserInReports หรือไม่
  //   if (!this.UserInReports.some((user) => user.username === data.username)) {
  //     this.UserInReports.push(data); // เพิ่มผู้ใช้ลงใน UserInReports
  //     // ลบผู้ใช้จาก UserNotInReport
  //     this.UserNotInReport = this.UserNotInReport.filter(
  //       (user) => user.username !== data.username
  //     );
  //   }
  //   console.log("UserInReports after adding:", this.UserInReports);
  //   console.log("UserNotInReport after removing:", this.UserNotInReport);
  // },

  removeUser(userToRemove) {
  console.log("Removing user:", userToRemove);

  // ลบผู้ใช้จาก userRoles
  this.userRoles = this.userRoles.filter(
    (user) => user.username !== userToRemove.username
  );

  // เพิ่มผู้ใช้กลับไปที่ addUsers
  this.addUsers.push(userToRemove);

  console.log("Updated userRoles after removing:", this.userRoles);
  console.log("Updated addUsers after adding back:", this.addUsers);
},

  // removeUser(userToRemove) {
  //   console.log("Removing user:", userToRemove);
  //   // ลบผู้ใช้จาก UserInReports
  //   this.UserInReports = this.UserInReports.filter(
  //     (user) => user.username !== userToRemove.username
  //   );
  //   // เพิ่มผู้ใช้กลับไปที่ UserNotInReport
  //   this.UserNotInReport.push(userToRemove);
  //   console.log("UserInReports after removing:", this.UserInReports);
  //   console.log("UserNotInReport after adding back:", this.UserNotInReport);
  // },
      save() {
        // console.log(this.userRoles);
        if (this.rolesName !== '') {
          this.axios.post(process.env.VUE_APP_API_BACKEND + '/upadteStatusPrevilage',
            {
              'data': this.userRoles,
              'rolesName': this.rolesName
            }
          ).then((response) => {
            if (response.data.status === 'success') {
              this.$swal('save success', ' ', 'success')
              this.getRolesPermission()
              this.closeDialogAddusers()
              this.reloadPage()
            } else if (response.data.status === 'Permission denied') {
              this.$swal('Permission denied', ' ', 'warning')
            } else {
              this.$swal('error', response.data.status, 'error')
            }
          })
        } else {
          this.$swal('Rule Name is required', ' ', 'warning')
        }
      },
      reloadPage() {
        window.location.reload()
      },
      closeDialogAddusers() {
        this.dialogAddUsers = false
        this.userRoles = []
      },
      openAddRole() {
        this.dialogAddUsers = true
        this.getUserPermission()
      },
      getRolesPermission() {
        this.axios.post(process.env.VUE_APP_API_BACKEND + '/mgmt/getRoles',).then((response) => {
          this.getRoles = response.data
        })
      },
      getUserPermission() {
        this.axios.post(process.env.VUE_APP_API_BACKEND + '/mgmt/addUser',).then((response) => {
          this.addUsers = response.data
        })
      },
      formatDate(datetime) {
        var date = new Date(datetime)
        var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
        var month = (date.getMonth()) + 1 < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)
        var year = date.getFullYear()
        var hours = date.getHours();
        var minutes = date.getMinutes();
        minutes = minutes < 10 ? '0' + minutes : minutes;
        var strTime = hours + ':' + minutes + ' ';
        return day + '-' + month + '-' + year + " " + strTime;
      }
    }
  }
</script>

<style lang="css">
</style>
