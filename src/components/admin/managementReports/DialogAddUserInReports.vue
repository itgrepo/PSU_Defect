<template>
  <v-layout row justify-center>
    <v-dialog
      v-model="DialogAddUserInReports"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar class="light-blue darken-4 white--text color-card-title" dense>
          <v-btn icon dark @click="close()">
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>{{ $t('adduserinreport') }}</v-toolbar-title>
          <v-spacer></v-spacer>
          <!-- <v-toolbar-items>
                        <v-btn dark flat @click="dialog = false">Save</v-btn>
                    </v-toolbar-items> -->
        </v-toolbar>
        <v-container>
          <v-layout row wrap>
            <v-flex xs12 md2>
              <v-subheader>{{ $t('reportname') }} : </v-subheader>
            </v-flex>
            <v-flex xs12 md6>
              <v-subheader
                ><b>{{ report.export_excel_name }}</b></v-subheader
              >
            </v-flex>
            <v-flex xs12 md12>
              <v-divider></v-divider>
            </v-flex>
            <v-flex xs12 sm12 md6 lg6 xl6 class="pa-2">
              <v-card-title>
                <p class="subheading">
                  <v-icon left class="mr-2" color="light-blue darken-4">label</v-icon>{{ $t('user') }}
                </p>
                <v-spacer></v-spacer>
                <v-text-field
                  v-model="searchUserinReport"
                  append-icon="search"
                  :label="$t('search')" 
                  single-line
                  hide-details
                ></v-text-field>
              </v-card-title>

              <v-data-table
                :headers="localizedHeadersUser"
                :items="UserInReports"
                :search="searchUserinReport"
              >
                <template v-slot:items="props">
                  <td class="text-xs-center">{{ props.item.username }}</td>
                  <td class="text-xs-center">{{ props.item.org_name }}</td>
                  <!-- <td class="text-xs-center">{{ props.item.email }}</td> -->
                  <td class="text-xs-center">
                    <v-btn
                      small
                      icon
                      color="error"
                      @click="removeUser(props.item, props.index)"
                    >
                      <v-icon>remove</v-icon>
                    </v-btn>
                  </td>
                </template>
                <template v-slot:no-results>
                  <v-alert :value="true" color="error" icon="warning">
                    {{ $t('searchfor') }} "{{ search }}" {{ $t('foundno') }}
                  </v-alert>
                </template>
              </v-data-table>
            </v-flex>
            <v-flex xs12 sm12 md6 lg6 xl6 class="pa-2">
              <v-card-title>
                <p class="subheading">
                  <v-icon left color="light-blue darken-4">label</v-icon>{{ $t('adduser') }}
                </p>
                <v-spacer></v-spacer>
                <v-text-field
                  v-model="search"
                  append-icon="search"
                  :label="$t('search')" 
                  single-line
                  hide-details
                ></v-text-field>
              </v-card-title>
              <v-data-table
                :headers="localizedHeadersUser"
                :items="UserNotInReport"
                :search="search"
              >
                <template v-slot:items="props">
                  <td class="text-xs-center">{{ props.item.username }}</td>
                  <td class="text-xs-center">{{ props.item.org_name }}</td>
                  <!-- <td class="text-xs-center">{{ props.item.email }}</td> -->
                  <td class="text-xs-center">
                    <v-btn
                      small
                      icon
                      color="success"
                      @click="addUser(props.item, props.index)"
                    >
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
            </v-flex>
          </v-layout>
          <v-flex offset-xs10 pb-4
            ><v-btn color="success" :disabled="!valid" @click="Update()"
              >{{ $t('save') }}</v-btn
            ></v-flex
          >
        </v-container>
      </v-card>
    </v-dialog>
  </v-layout>
</template>
<script>
import { Encode, Decode } from "@/services";
export default {
  data() {
    return {
      DialogAddUserInReports: false,
      getRoles: [],
      UserInReports: [],
      UserNotInReport: [],
      rolesName: "",
      valid: true,
      search: "",
      searchUserinReport: "",
      report: "",
      // headersUser: [
      //   {
      //     text: "User Name",
      //     align: "center",
      //     sortable: false,
      //     value: "username",
      //   },
      //   {
      //     text: "Organization",
      //     align: "center",
      //     value: "org_name",
      //   },
      //   // {
      //   //     text: 'Email',
      //   //     align: 'center',
      //   //     sortable: false,
      //   //     value: 'previlage_name'
      //   // },
      //   {
      //     text: "",
      //     align: "center",
      //     sortable: false,
      //   },
      // ],
    };
  },
  created() {
    this.getRolesPermission();
  },
  mounted() {
    this.getRolesPermission();
  },
  computed: {
    userData() {
      if (this.$cookies.isKey("information")) {
        return JSON.parse(Decode.decode(this.$cookies.get("information")));
      } else {
        return "";
      }
    },
    localizedHeadersUser() {
    return [
      {
        text: this.$t("username"),
        align: "center",
        sortable: false,
        value: "username",
      },
      {
        text: this.$t("org"), 
        align: "center",
        sortable: false,
        value: "org_name",
      },
      {
        text: "",
        align: "center",
        sortable: false,
      },
    ];
  },
  },
  methods: {
    open(data) {
      this.report = data;
      this.DialogAddUserInReports = true;
      this.getUserInReport();
      this.getUserNotInReport();
    },
    close() {
      this.DialogAddUserInReports = false;
    },
    //  addUser (data, index) {
    //     this.UserInReports.push(data)
    //     this.UserNotInReport.splice(index, 1)
    //  },
    // removeUser (data, index) {
    //     this.UserNotInReport.push(data)
    //     this.UserInReports.splice(index, 1)
    //  },
    addUser(data) {
      console.log("Adding user:", data);
      if (!this.UserInReports.some((user) => user.username === data.username)) {
        this.UserInReports.push(data);
        this.UserNotInReport = this.UserNotInReport.filter(
          (user) => user.username !== data.username
        );
      }
      console.log("UserInReports after adding:", this.UserInReports);
      console.log("UserNotInReport after removing:", this.UserNotInReport);
    },
    removeUser(userToRemove) {
      console.log("Removing user:", userToRemove);

      // ใช้ filter เพื่อลบเฉพาะผู้ใช้ที่มี username ตรงกับที่คุณต้องการลบ
      this.UserInReports = this.UserInReports.filter(
        (user) => user.username !== userToRemove.username
      );

      // เพิ่มผู้ใช้ที่ถูกลบกลับไปยัง UserNotInReport
      this.UserNotInReport.push(userToRemove);

      console.log("UserInReports after removing:", this.UserInReports);
      console.log("UserNotInReport after adding back:", this.UserNotInReport);
    },

    //switch side
    // removeUser(data, index) {
    //     // console.log(data);
    //     this.UserNotInReport.push(data)
    //     this.UserInReports.splice(index, 1)
    //     var user = Encode.encode(JSON.stringify(this.userData));
    //     this.axios.post(process.env.VUE_APP_API_BACKEND + '/deleteUserToReport', {
    //         'username': data.username,
    //         'user': user,
    //         'source_id': this.report.source_id,
    //     //     // 'email': data.email
    //     }).then((response) => {
    //     //     // this.addUsers = response.data.data
    //     //     // console.log(response);
    //         this.getUserInReport()

    //     })

    // },

    // addUser(data, index) {
    //     this.UserInReports.push(data)
    //     this.UserNotInReport.splice(index, 1)
    //     var user = Encode.encode(JSON.stringify(this.userData));
    //     this.axios.post(process.env.VUE_APP_API_BACKEND + '/addUserToReport', {
    //         'username': data.username,
    //         'user': user,
    //         'source_id': this.report.source_id,
    //     //     // 'email': data.email
    //     }).then((response) => {
    //         this.getUserNotInReport()
    //     //     // console.log(response);

    //     })
    // },
    Update() {
      var user = Encode.encode(JSON.stringify(this.userData));
      this.axios
        .post(process.env.VUE_APP_API_BACKEND + "/updateUserToReport", {
          user: this.UserInReports,
          source_id: this.report.source_id,
          user_data: user,
        })
        .then((response) => {
          if (response.data.status === "success") {
            //  this.dialogEdit = false
            this.closeDialogAddusers();
            this.$swal("Edit Role is success", " ", "success");

            this.close();
          }
        });
    },
    reloadPage() {
      window.location.reload();
    },
    closeDialogAddusers() {
      this.dialogAddUsers = false;
      this.UserNotInReport = [];
    },

    getUserInReport() {
      var user = Encode.encode(JSON.stringify(this.userData));
      this.axios
        .post(process.env.VUE_APP_API_BACKEND + "/getUserInReport", {
          source_id: this.report.source_id,
          user: user,
        })
        .then((response) => {
          this.UserInReports = response.data.data;
          // this.UserInReports = [
          //     { "email": "RubberAuthority@mail.com", "email_news": 1, "firstname": "Rubber", "lastname": "Authority", "login_respond": "2021-07-07 09:38:14", "other_object": "", "previlage_id": 'Admin', "send_QR": "", "status_id": 2, "status_name": "Active", "two_factor_authen": "off", "type_user": "DataX", "usage_objective": "policy", "user_id": 105, "username": "Rubber" },
          //     { "email": "chet@gmail.com", "email_news": 1, "firstname": "Rubber", "lastname": "Authority", "login_respond": "2021-06-24 10:36:40", "other_object": "", "previlage_id": 'User', "send_QR": "", "status_id": 1, "status_name": "Offline", "two_factor_authen": "off", "type_user": "DataX", "usage_objective": "authority", "user_id": 104, "username": "Chet" },

          // ]
        });
    },
    getUserNotInReport() {
      var user = Encode.encode(JSON.stringify(this.userData));
      this.axios
        .post(process.env.VUE_APP_API_BACKEND + "/getUserNotInReport", {
          source_id: this.report.source_id,
          user: user,
        })
        .then((response) => {
          this.UserNotInReport = response.data.data;

          // this.UserNotInReport = [{ "email": "boone@gmail.com", "email_news": 1, "firstname": "Rubber", "lastname": "Authority", "login_respond": "2021-05-19 10:22:44", "other_object": "", "previlage_id": 'User', "send_QR": "", "status_id": 2, "status_name": "Active", "two_factor_authen": "on", "type_user": "AD", "usage_objective": "authority", "user_id": 103, "username": "Boone" },
          // { "email": "user4@gmail.com", "email_news": 1, "firstname": "Rubber", "lastname": "Authority", "login_respond": "2021-05-17 13:03:45", "other_object": "", "previlage_id": 'User', "send_QR": "", "status_id": 1, "status_name": "Offline", "two_factor_authen": "off", "type_user": "AD", "usage_objective": "authority", "user_id": 102, "username": "user4" },]
          // // console.log(response);
        });
    },
    formatDate(datetime) {
      var date = new Date(datetime);
      var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
      var month =
        date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
      var year = date.getFullYear();
      var hours = date.getHours();
      var minutes = date.getMinutes();
      minutes = minutes < 10 ? "0" + minutes : minutes;
      var strTime = hours + ":" + minutes + " ";
      return day + "-" + month + "-" + year + " " + strTime;
    },
  },
};
</script>

<style lang="css"></style>
