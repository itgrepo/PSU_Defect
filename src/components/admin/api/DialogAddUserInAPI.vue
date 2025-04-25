<template>
  <v-layout row justify-center>
    <v-dialog
      class="dialogadduser"
      v-model="DialogAddUserInAPI"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar
          class="light-blue darken-4 white--text color-card-title"
          dense
        >
          <v-btn icon dark @click="close()">
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>{{ $t("adduserinapi") }}</v-toolbar-title>
          <v-spacer></v-spacer>
          <!-- <v-toolbar-items>
                          <v-btn dark flat @click="dialog = false">Save</v-btn>
                      </v-toolbar-items> -->
        </v-toolbar>
        <v-container>
          <v-layout row wrap>
            <v-flex xs12 md2>
              <v-subheader>{{ $t("apiname") }} : </v-subheader>
            </v-flex>
            <v-flex xs12 md6>
              <v-subheader
                ><b>{{ report.api_name }}</b></v-subheader
              >
            </v-flex>
            <v-flex xs12 md12>
              <v-divider></v-divider>
            </v-flex>
            <v-flex xs12 sm12 md6 lg6 xl6 class="pa-2">
              <v-card-title>
                <p class="subheading">
                  <v-icon left class="mr-2" color="light-blue darken-4"
                    >label</v-icon
                  >{{ $t("user") }}
                </p>
                <v-spacer></v-spacer>
                <v-text-field
                  v-model="searchUserinAPIt"
                  append-icon="search"
                  :label="$t('search')"
                  single-line
                  hide-details
                ></v-text-field>
              </v-card-title>

              <v-data-table
                :headers="localizedHeadersUser"
                :items="UserInAPI"
                :search="searchUserinAPIt"
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
                    {{ $t("searchfor") }} "{{ search }}" {{ $t("foundno") }}
                  </v-alert>
                </template>
              </v-data-table>
            </v-flex>
            <v-flex xs12 sm12 md6 lg6 xl6 class="pa-2">
              <v-card-title>
                <p class="subheading">
                  <v-icon left color="light-blue darken-4">label</v-icon
                  >{{ $t("adduser") }}
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
                :items="UserNotInAPI"
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
                    {{ $t("searchfor") }} "{{ search }}" {{ $t("foundno") }}
                  </v-alert>
                </template>
              </v-data-table>
            </v-flex>
          </v-layout>
          <v-flex offset-xs10 pb-4
            ><v-btn color="success" :disabled="!valid" @click="Update()">{{
              $t("save")
            }}</v-btn></v-flex
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
      DialogAddUserInAPI: false,
      getRoles: [],
      UserInAPI: [],
      UserNotInAPI: [],
      rolesName: "",
      valid: true,
      search: "",
      searchUserinAPIt: "",
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
    this.getUserInAPI();
    this.getUserNotInAPI();
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
      this.DialogAddUserInAPI = true;
      this.getUserInAPI();
      this.getUserNotInAPI();
    },
    close() {
      this.DialogAddUserInAPI = false;
    },

    addUser(data) {
      console.log("Adding user:", data);
      if (!this.UserInAPI.some((user) => user.username === data.username)) {
        this.UserInAPI.push(data);
        this.UserNotInAPI = this.UserNotInAPI.filter(
          (user) => user.username !== data.username
        );
      }
      console.log("UserInAPI after adding:", this.UserInAPI);
      console.log("UserNotInAPI after removing:", this.UserNotInAPI);
    },
    removeUser(userToRemove) {
      console.log("Removing user:", userToRemove);

      // ใช้ filter เพื่อลบเฉพาะผู้ใช้ที่มี username ตรงกับที่คุณต้องการลบ
      this.UserInAPI = this.UserInAPI.filter(
        (user) => user.username !== userToRemove.username
      );

      // เพิ่มผู้ใช้ที่ถูกลบกลับไปยัง UserNotInAPI
      this.UserNotInAPI.push(userToRemove);

      console.log("UserInAPI after removing:", this.UserInAPI);
      console.log("UserNotInAPI after adding back:", this.UserNotInAPI);
    },

    Update() {
      var user = Encode.encode(JSON.stringify(this.userData));
      this.axios
        .post(process.env.VUE_APP_API_BACKEND2 + "/updateUserToGenareal", {
          user: this.UserInAPI,
          endpoints_id: this.report.endpoints_id,
          user_data: user,
        })
        .then((response) => {
          console.log("updated to general successfully:", response.data);
          if (response.data.status.startsWith("success")) {
            // ตรวจสอบว่าข้อความเริ่มต้นด้วย "success"
            this.$swal("Success", "", "success").then(() => {
              this.reloadPage();
            });
          } else {
            // แสดงข้อความข้อผิดพลาดจาก response
            this.$swal("ERROR", response.data.status, "error");
          }
        })
        .catch((error) => {
          console.error("Error adding data:", error);
        });
    },
    reloadPage() {
      window.location.reload();
    },
    closeDialogAddusers() {
      this.dialogAddUsers = false;
      this.UserNotInAPI = [];
    },

    getUserInAPI() {
      console.log("start get userinapi", this.report.endpoints_id);
      var user = Encode.encode(JSON.stringify(this.userData));
      this.axios
        .post(process.env.VUE_APP_API_BACKEND2 + "/getUserInGeneral", {
          endpoints_id: this.report.endpoints_id,
          user: user,
        })
        .then((response) => {
          this.UserInAPI = response.data.data;
        });
    },
    getUserNotInAPI() {
      console.log("start get usernotinapi", this.report.endpoints_id);
      var user = Encode.encode(JSON.stringify(this.userData));
      this.axios
        .post(process.env.VUE_APP_API_BACKEND2 + "/getUserNotInGeneral", {
          endpoints_id: this.report.endpoints_id,
          user: user,
        })
        .then((response) => {
          this.UserNotInAPI = response.data.data;
        });
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
      var minutes = date.getMinutes();
      minutes = minutes < 10 ? "0" + minutes : minutes;
      var strTime = hours + ":" + minutes + " ";
      return day + "-" + month + "-" + year + " " + strTime;
    },
  },
};
</script>

<style lang="css">
.dialogadduser {
  z-index: 1000;
}
</style>
