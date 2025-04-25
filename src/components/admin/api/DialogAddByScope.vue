<template>
  <v-layout row justify-center>
    <v-dialog
      class="dialogadduser"
      v-model="DialogAddByScope"
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
          <v-toolbar-title>
            {{ $t("scopes") }} : {{ report.api_endpoint }}
          </v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-container>
          <v-layout row wrap>
            <v-flex xs8 sm8 md8>
              <v-card-title class="headline">
                {{ $t("scopes") }}
                <v-divider class="mx-3 setLine" vertical></v-divider>
                <v-btn
                  outline
                  color="light-blue darken-4"
                  @click="openDialogAddScopes()"
                >
                  <v-icon left dark>person_add</v-icon>{{ $t("addscopes") }}
                </v-btn>
              </v-card-title>
            </v-flex>
            <v-flex xs4 sm4 md4>
              <!-- <v-text-field
                class="mt-3 mr-3"
                v-model="search"
                append-icon="search"
                :label="$t('search')"
                single-line
                hide-details
                color="light-blue darken-4"
              ></v-text-field> -->
              <v-text-field
                class="mt-3 mr-3"
                v-model="search"
                append-icon="search"
                :label="$t('search')"
                single-line
                hide-details
                color="light-blue darken-4"
                @input="filterData"
              ></v-text-field>
            </v-flex>

            <!-- Add Scopes Dialog -->
            <v-dialog v-model="dialog" max-width="800">
              <v-card>
                <v-card-title>
                  <span class="headline"
                    >{{ $t("addScopesTitle") }} :
                    {{ report.api_endpoint }}</span
                  >
                </v-card-title>
                <v-card-text>
                  <!-- Dialog Content -->
                  <v-flex xs12 sm12 md3 offset-md1>
                    <v-subheader>
                      {{ $t("user") }} <span style="color: red">*</span>
                    </v-subheader>
                  </v-flex>

                  <v-flex xs12 sm12 md7>
                    <h4>
                      <v-autocomplete
                        :items="userList"
                        :filter="customFilter"
                        item-text="username"
                        :label="$t('username')"
                        item-value="user_id"
                        v-model="user_id"
                      ></v-autocomplete>
                    </h4>
                  </v-flex>

                  <v-flex xs12 sm12 md3 offset-md1>
                    <v-subheader>
                      {{ $t("specscope") }} <span style="color: red">*</span>
                    </v-subheader>
                  </v-flex>

                  <!-- Display Fields Dynamically -->
                  <v-row>
                    <v-col cols="12" sm="12" md="3">
                      <v-subheader> Request Fields </v-subheader>
                    </v-col>
                    <v-col cols="12" sm="12" md="7">
                      <!-- Loop through request_fields in report to display each field -->
                      <v-row
                        v-for="(value, key) in report.request_fields"
                        :key="key"
                        align="center"
                      >
                        <!-- Display the key on the left -->
                        <v-col cols="8" class="text-left">
                          <span>{{ key }}</span>
                        </v-col>
                        <!-- Display the text field for value on the right -->
                        <v-col cols="8">
                          <v-combobox
                            v-model="report.request_fields[key]"
                            :items="
                              typeof report.request_fields[key] === 'object'
                                ? report.request_fields[key]
                                : []
                            "
                            multiple
                            outlined
                            chips
                            small-chips
                            class="ml-2"
                            clearable
                            placeholder="Add items"
                          ></v-combobox>
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-row>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="saveScopeadd()" dark
                    >Save</v-btn
                  >
                </v-card-actions>
              </v-card>
            </v-dialog>

            <v-flex xs12 md12>
              <v-divider></v-divider>
            </v-flex>

            <!-- Table -->
            <div>
              <!-- ตรวจสอบว่ามีข้อมูลใน apiscope หรือไม่ -->
              <template v-if="apiscope.length > 0">
                <table class="table">
                  <thead>
                    <tr>
                      <th>{{ $t("username") }}</th>
                      <th>{{ $t("secretkey") }}</th>
                      <th>{{ $t("apiname") }}</th>
                      <th> {{ $t("scopes") }}</th>
                      <!-- <th>{{ $t("request") }}</th>
                      <th>{{ $t("response") }}</th> -->
                      <th>{{ $t("actions") }}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, index) in filteredData" :key="index">
                      <td>{{ item.username }}</td>
                      <td>{{ item.secret_key }}</td>
                      <!-- <td class="column-request">{{ service.request_fields ? Object.keys(service.request_fields).join(', ') : 'No fields available' }}</td>
                      <td class="column-response">{{ service.response_fields ? service.response_fields.join(', ') : 'No fields available' }}</td> -->
                      <td>{{ item.api_endpoint }}</td>
                      <td>{{ item.allowed_fields }}</td>
                      <td>
                        <v-tooltip top color="primary" class="mgr-10">
                          <v-btn
                            slot="activator"
                            color="primary"
                            small
                            flat
                            icon
                            @click="EditUser(item)"
                          >
                            <v-icon color="primary">mode_edit</v-icon>
                          </v-btn>
                          <span>{{ $t("edituser") }}</span>
                        </v-tooltip>

                        <v-tooltip top color="error">
                          <v-btn
                            slot="activator"
                            color="error"
                            small
                            flat
                            icon
                            @click="deleteUser(item)"
                          >
                            <v-icon color="error">delete</v-icon>
                          </v-btn>
                          <span>{{ $t("deleteuser") }}</span>
                        </v-tooltip>
                      </td>
                    </tr>
                    <tr v-if="filteredData.length === 0">
                      <td colspan="4">
                        <v-alert :value="true" color="error" icon="warning">
                          {{ $t("sorrynot") }} :(
                        </v-alert>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </template>
              <template v-else>
                <!-- แสดงข้อความเมื่อไม่มีข้อมูล -->
                <v-alert :value="true" color="error" icon="warning">
                  {{ $t("sorrynot") }} :(
                </v-alert>
              </template>
            </div>
          </v-layout>
        </v-container>

        <!-- Edit Scopes Dialog -->
        <v-dialog v-model="dialogedit" max-width="800">
          <v-card>
            <v-card-title>
              <span class="headline">{{ $t("editScopesTitle") }}</span>
            </v-card-title>
            <v-card-text>
              <!-- Dialog Content -->

              <v-flex xs12 sm12 md3 offset-md1>
                <v-subheader>
                  {{ $t("user") }} <span style="color: red">*</span>
                </v-subheader>
              </v-flex>

              <v-flex xs12 sm12 md7>
                <h4>
                  <v-autocomplete
                    :items="apiscope"
                    :filter="customFilter"
                    item-text="username"
                    :label="$t('username')"
                    item-value="username"
                    v-model="selectedUser.username"
                    disabled
                  ></v-autocomplete>
                </h4>
              </v-flex>

              <v-flex xs12 sm12 md3 offset-md1>
                <v-subheader>
                  {{ $t("specscope") }} <span style="color: red">*</span>
                </v-subheader>
              </v-flex>

              <!-- Display Fields Dynamically -->
              <v-row>
                <v-col cols="12" sm="12" md="3">
                  <v-subheader> Request Fields </v-subheader>
                </v-col>
                <v-col cols="12" sm="12" md="7">
                  <!-- Loop through request_fields in report to display each field -->
                  <v-row
                    v-for="(value, key) in report.request_fields"
                    :key="key"
                    align="center"
                  >
                    <!-- Display the key on the left -->
                    <v-col cols="8" class="text-left">
                      <span>{{ key }}</span>
                    </v-col>
                    <!-- Display the text field for value on the right -->
                    <v-col cols="8">
                      <v-combobox
                        v-model="report.request_fields[key]"
                        :items="
                          typeof report.request_fields[key] === 'object'
                            ? report.request_fields[key]
                            : []
                        "
                        multiple
                        outlined
                        chips
                        small-chips
                        class="ml-2"
                        clearable
                        placeholder="Add items"
                        :label="$t('plsenter')"
                      ></v-combobox>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="saveScope" dark
                >Save</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import { Encode, Decode } from "@/services";
export default {
  data() {
    return {
      search: "",
      filteredData: [], // ข้อมูลที่กรองแล้ว
      selectedUser: {},
      user_id: null,
      userList: [], // รายการผู้ใช้
      fields: [
        // { fieldName: "Field 1", fieldValue: "Value 1" },
        // { fieldName: "Field 2", fieldValue: "Value 2" },
        // { fieldName: "Field 3", fieldValue: "Value 3" },
        // เพิ่มรายการอื่นๆ ตามต้องการ
      ],
      userList: [
        //         {
        //     email: "testuser001@testuser001",
        //     email_news: 1,
        //     firstname: "testuser001",
        //     lastname: "testuser001",
        //     login_respond: "2024-09-08 20:19:51",
        //     org_name: null,
        //     other_object: "",
        //     previlage_id: 3,
        //     send_QR: "",
        //     status_id: 1,
        //     status_name: "Offline",
        //     two_factor_authen: "off",
        //     type_user: "DataX",
        //     usage_objective: "other",
        //     user_id: 155,
        //     username: "testuser001"
        // },
        // {
        //     email: "testuser001@testuser001",
        //     email_news: 1,
        //     firstname: "testuser001",
        //     lastname: "testuser001",
        //     login_respond: "2024-09-08 20:19:51",
        //     org_name: null,
        //     other_object: "",
        //     previlage_id: 3,
        //     send_QR: "",
        //     status_id: 1,
        //     status_name: "Offline",
        //     two_factor_authen: "off",
        //     type_user: "DataX",
        //     usage_objective: "other",
        //     user_id: 155,
        //     username: "testuser002"
        // },
      ],
      dialog: false,
      dialogedit: false,
      DialogAddByScope: false,
      getRoles: [],
      api: [],
      apiscope: [
        // {
        //   api_endpoint: "api_endpoint16",
        //   api_name: "example_name",
        //   api_type: "scopes",
        //   endpoints_id: 16,
        //   org_id: 1,
        //   request_fields: {
        //     admit_year: "STRING",
        //     major_name_thai: "STRING",
        //   },
        //   scope: "read_write",
        //   status: "active",
        // },
      ],
      selected: [],
      UserInAPI: [],
      UserNotInAPI: [],
      rolesName: "",
      valid: true,
      search: "",
      searchUserinAPIt: "",
      report: "",
    };
  },
  // created() {
  //   this.getRolesPermission();
  // },
  mounted() {
    console.log("Component Mounted");
    this.getapibyservices();
    this.getUser();
    // this.getRolesPermission();
    // Initialize fields from request_fields
    this.apiscope.forEach((item) => {
      item.fields = {};
      for (const key in item.request_fields) {
        item.fields[key] = ""; // Initialize as empty or default value
      }
    });
  },

  computed: {
    userData() {
      if (this.$cookies.isKey("information")) {
        return JSON.parse(Decode.decode(this.$cookies.get("information")));
      } else {
        return "";
      }
    },
    localizedHeaders() {
      return [
        {
          text: this.$t("username"),
          align: "center",
          sortable: false,
          value: "username",
        },
        {
          text: this.$t("apikey"),
          align: "center",
          sortable: false,
          value: "api_key",
        },
        {
          text: this.$t("secretkey"),
          align: "center",
          sortable: false,
          value: "secret_key",
        },
        {
          text: this.$t("apiname"),
          align: "center",
          sortable: false,
          value: "api_endpoint",
        },
        {
          text: this.$t("actions"), // เพิ่มการแปลสำหรับ actions
          align: "center",
          sortable: false,
          value: "actions", // เพิ่ม value สำหรับ actions
        },
      ];
    },
  },
  methods: {
    filterData() {
      this.filteredData = this.apiscope.filter((item) => {
        return (
          item.username.toLowerCase().includes(this.search.toLowerCase()) ||
          item.secret_key.toLowerCase().includes(this.search.toLowerCase()) ||
          item.api_endpoint.toLowerCase().includes(this.search.toLowerCase())
        );
      });
    },
    getUser() {
      this.axios
        .post(process.env.VUE_APP_API_BACKEND + "/mgmt/mgmtgetUser")
        .then((response) => {
          this.userList = response.data;
          // console.log(response.data)
        });
    },
    customFilter(item, queryText, itemText) {
      const text = itemText.toLowerCase();
      const searchText = queryText.toLowerCase();
      return text.includes(searchText);
    },
    openDialogAddScopes() {
      this.dialog = true;
      // this.user_id = null; // or appropriate default value
      // this.report = { request_fields: {} }; // Reset fields for new entry
    },
    // EditUser(selectedItem) {
    //   this.selectedUser = { ...selectedItem }; // คัดลอกข้อมูลของผู้ใช้ที่เลือกมา
    //   console.log("selectedUser",this.selectedUser);
    //   console.log("selectedUser",this.selectedUser.username);

    //   this.report = { ...selectedItem.request_fields }; // ใช้ข้อมูล request_fields ของผู้ใช้ที่เลือก
    //   this.dialogedit = true; // เปิด dialog แก้ไข
    // },

    open(data) {
      this.api = data;
      console.log("data", data);
      this.report = data;
      this.getapibyservices();
      this.DialogAddByScope = true;
      // this.getUserInAPI();
      // this.getUserNotInAPI();
    },
    close() {
      this.DialogAddByScope = false;
    },
    // getapibyservices() {
    //   var user = Encode.encode(JSON.stringify(this.userData));
    //   this.axios
    //     .post(process.env.VUE_APP_API_BACKEND2 + "/showAPIScopesByService", {
    //       api_endpoint: this.report.api_endpoint,
    //       user: user,
    //     })
    //     .then((response) => {
    //       console.log("response api", response.data);
    //       this.apiscope = response.data;
    //     });
    // },
    getapibyservices() {
      var user = Encode.encode(JSON.stringify(this.userData));
      this.axios
        .post(process.env.VUE_APP_API_BACKEND2 + "/showAPIScopesByService", {
          api_endpoint: this.report.api_endpoint,
          user: user,
        })
        .then((response) => {
          console.log("response api", response.data);
          this.apiscope = response.data;
          this.filteredData = this.apiscope; // กำหนดค่า filteredData ให้เท่ากับ apiscope
        })
        .catch((error) => {
          console.error("Error fetching API scopes:", error);
        });
    },
    deleteUser(item) {
      console.log("data", item);

      this.$swal({
        title: "Are you Confirm?",
        text: "",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes delete it!",
      }).then((result) => {
        if (result) {
          // ตรวจสอบว่าเป็นการยืนยันจากผู้ใช้
          // ส่งคำขอ DELETE พร้อมข้อมูลไปยัง backend
          this.axios
            .delete(
              process.env.VUE_APP_API_BACKEND2 +
                "/api/delete_permission_scopes",
              {
                data: {
                  user_id: item.user_id,
                  api_endpoint: item.api_endpoint,
                },
              }
            )
            .then((response) => {
              console.log("Delete response:", response.data);

              // แก้ไขการตรวจสอบเงื่อนไขเพื่อให้ตรงกับ response ที่ได้จาก backend
              if (
                response.data.status &&
                response.data.status.includes("success")
              ) {
                this.$swal(
                  "Delete is success",
                  "Data deleted successfully",
                  "success"
                ).then(() => {
                  window.location.reload(); // รีโหลดหน้าเมื่อการลบสำเร็จ
                });
              } else if (
                response.data.status &&
                response.data.status.includes("Permission denied")
              ) {
                this.$swal("Permission denied", " ", "warning");
              } else {
                this.$swal("Error", "Failed to delete scope", "error");
              }
            })
            .catch((error) => {
              console.error("Error deleting scope:", error);
              this.$swal("Error", "Failed to delete scope", "error");
            });
        }
      });
    },

    EditUser(item) {
      this.selectedUser = { ...item }; // Using destructuring to ensure reactive changes
      console.log("selectedUser2", this.selectedUser);
      console.log("selectedUser2", this.selectedUser.username);
      this.dialogedit = true;
    },
    initializeFields() {
      this.apiscope.forEach((item) => {
        item.fields = {}; // Initialize fields object
        for (const key in item.request_fields) {
          item.fields[key] = ""; // Initialize as empty or default value
        }
      });
    },
    saveScopeadd() {
      // ตรวจสอบค่า user_id และ request_fields
      if (!this.user_id) {
        this.$swal("ERROR", "Please select a user", "error");
        return;
      }

      // กำหนดข้อมูลที่ต้องการส่ง
      const payload = {
        user_id: this.user_id,
        api_endpoint: this.report.api_endpoint,
        allowed_fields: this.report.request_fields,
      };

      // ส่งข้อมูลไปยัง backend
      this.axios
        .post(
          process.env.VUE_APP_API_BACKEND2 + "/api/add_permission_scopes",
          payload
        )
        .then((response) => {
          console.log("Save success:", response.data);

          // ตรวจสอบว่า status มีคำว่า "success" อยู่หรือไม่
          if (
            response.data.status &&
            response.data.status.includes("success")
          ) {
            this.$swal("Success", "Scope added successfully", "success").then(
              () => {
                this.dialog = false; // ปิด dialog
                this.$emit("refreshData"); // รีเฟรชข้อมูล
                window.location.reload();
              }
            );
          } else if (
            response.data.status &&
            response.data.status.includes("error")
          ) {
            // แสดงข้อความ error ที่ได้รับมา
            this.$swal("ERROR", response.data.status, "error");
          } else {
            this.$swal(
              "ERROR",
              response.data.message || "Failed to save scope",
              "error"
            );
          }
        })
        .catch((error) => {
          console.error("Error saving scope:", error);
          this.$swal("ERROR", "Failed to save scope", "error");
        });
    },
    saveScope() {
      // กำหนดข้อมูลที่ต้องการส่ง

      this.axios
        .post(
          process.env.VUE_APP_API_BACKEND2 + "/api/edit_permission_scopes",
          {
            user_id: this.selectedUser.user_id,
            api_endpoint: this.report.api_endpoint,
            allowed_fields: this.report.request_fields,
          }
        )
        .then((response) => {
          console.log("Save success:", response.data);
          // ตรวจสอบว่า status มีคำว่า "success" หรือไม่
          if (
            response.data.status &&
            response.data.status.includes("success")
          ) {
            this.$swal("Success", "Scope added successfully", "success").then(
              () => {
                this.dialog = false; // ปิด dialog
                this.$emit("refreshData"); // รีเฟรชข้อมูล
                window.location.reload();
              }
            );
          } else {
            this.$swal(
              "ERROR",
              response.data.message || "Failed to save scope",
              "error"
            );
          }
        })
        .catch((error) => {
          console.error("Error saving scope:", error);
          this.$swal("ERROR", "Failed to save scope", "error");
        });
    },
    close() {
      this.DialogAddByScope = false;
    },
  },
  // Update() {
  //   var user = Encode.encode(JSON.stringify(this.userData));
  //   this.axios
  //     .post(process.env.VUE_APP_API_BACKEND2 + "/updateUserToGenareal", {
  //       user: this.UserInAPI,
  //       endpoints_id: this.report.endpoints_id,
  //       user_data: user,
  //     })
  //     .then((response) => {
  //       if (response.data.status === "success") {
  //         //  this.dialogEdit = false
  //         this.closeDialogAddusers();
  //         this.$swal("Edit Role is success", " ", "success");

  //         this.close();
  //       }
  //     });
  // },
  reloadPage() {
    window.location.reload();
  },
  closeDialogAddusers() {
    this.dialogAddUsers = false;
    this.UserNotInAPI = [];
  },
};
</script>

<style lang="css">
.dialogadduser {
  z-index: 1000;
}
.table {
  width: 100%;
  border-collapse: collapse;
}

.table th,
.table td {
  border: 1px solid #ddd;
  padding: 20px;
  text-align: center;
}

.table th {
  background-color: #f2f2f2;
}
</style>
