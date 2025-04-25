<template lang="html">
  <div>
    <v-card class="pt-3">
      <v-card-title>
        <v-row class="d-flex align-center">
          <v-col cols="12" sm="6" class="headline">
            {{ $t("groupusermgmt") }}
          </v-col>
          <v-col cols="12" sm="1" class="d-flex justify-center">
            <v-divider class="setLine" vertical></v-divider>
          </v-col>
        </v-row>
      </v-card-title>
      <v-card-text>
        <v-layout row wrap>
          <v-container>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-flex xs12 md12 class="pa-1">
                <h4>{{ $t("creategroup") }}</h4>
              </v-flex>
              <v-flex xs12 md12 class="pa-1">
                <v-text-field
                  v-model="group_name"
                  :label="$t('groupname')"
                  required
                  :rules="Rules"
                  maxLength="255"
                  :counter="255"
                >
                </v-text-field>
              </v-flex>
              <!-- <v-flex xs12 md12 class="pa-1">
                                <v-select item-text="org_name" item-value="org_name" :label="$t('selectorg')"
                                    :items="organization" v-model="organization" :rules="Rules" dense outlined
                                    persistent-hint return-object single-line></v-select>
                            </v-flex> -->
              <v-flex xs12 md12 class="pa-1">
                <v-select
                  item-text="org_name"
                  item-value="org_name"
                  :label="$t('selectorg')"
                  :items="organization"
                  v-model="selectedOrganization"
                  :rules="Rules"
                  dense
                  outlined
                  persistent-hint
                  return-object
                  single-line
                >
                </v-select>
              </v-flex>
              <v-spacer></v-spacer>
              <v-btn
                color="success"
                outline
                :disabled="!valid"
                @click="save()"
                >{{ $t("save") }}</v-btn
              >
            </v-form>
          </v-container>
        </v-layout>
      </v-card-text>
      <v-card-text>
        <v-data-table
          v-bind:headers="headers"
          v-bind:items="groupUser"
          :rows-per-page-items="[10, 25, 50, { text: 'All', value: -1 }]"
          :rows-per-page-text="$t('rowsPerPageLabel')"
        >
          <template slot="items" slot-scope="props">
            <td class="text-xs-center">
              <v-edit-dialog
                :return-value.sync="props.item.group_name"
                large
                @save="save_edit_group_name(props.item)"
                @cancel="cancel"
              >
                {{ props.item.group_name }}

                <template v-slot:input>
                  <v-text-field
                    v-model="props.item.group_name"
                    label="Edit"
                    single-line
                    autofocus
                    maxLength="255"
                    :counter="255"
                  >
                  </v-text-field>
                </template>
              </v-edit-dialog>
            </td>
            <td class="text-xs-center">{{ props.item.create_at }}</td>
            <td class="text-xs-center">{{ props.item.org_name }}</td>
            <td class="text-xs-center">
              <v-btn
                small
                color="warning"
                outline
                @click="editPrevilage(props.item)"
              >
                <v-icon left>person_add</v-icon>{{ $t("adduser") }}
              </v-btn>
              <!-- <v-btn small color="warning" outline  @click="openAddGroupUserInGroupReport(props.item)">
                                <v-icon  left>person_add</v-icon>Add Group User In Group Report
                            </v-btn> -->
              <v-btn small icon @click="deleteGroupUser(props.item)">
                <v-icon color="error">delete</v-icon>
              </v-btn>
            </td>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
    <DialogAddGroup ref="DialogAddGroup" />
  </div>
</template>

<script>
import { Encode, Decode } from "@/services";
import DialogAddGroup from "./DialogAddGroup";

export default {
  components: { DialogAddGroup },
  data() {
    return {
      selectedOrganization: null, // ใช้ตัวแปรใหม่สำหรับการเลือก
      organization: [],
      groupUser: [],
      addUsers: [],
      userRoles: [],
      rolesName: "",
      group_name: "",
      valid: true,
      search: "",
      dialogAddUsers: false,
      Rules: [(v) => !!v || "Group Name is required"],
      // headers: [
      //     {
      //         text: 'name',
      //         align: 'center',
      //         sortable: false
      //     },
      //     {
      //         text: 'Create Date',
      //         align: 'center',
      //         sortable: false
      //     },
      //     {
      //         text: 'Organization',
      //         align: 'center',
      //         sortable: false
      //     },
      //     {
      //         text: 'Delete',
      //         align: 'center',
      //         sortable: false
      //     }
      // ]
    };
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
          text: this.$t("groupname"),
          align: "center",
          sortable: false,
        },
        {
          text: this.$t("createdate"),
          align: "center",
          sortable: false,
        },
        {
          text: this.$t("org"),
          align: "center",
          sortable: false,
        },
        {
          text: this.$t("delete"),
          align: "center",
          sortable: false,
        },
      ];
    },
  },
  mounted() {
    this.get_GroupsUser(), this.oganize();
  },
  methods: {
    oganize() {
      this.axios
        .get(process.env.VUE_APP_API_BACKEND + "/showOrganize", {})
        .then((response) => {
          console.log("org", response.data);

          this.organization = response.data;
        });
    },
    editPrevilage(data) {
      this.$refs.DialogAddGroup.open(data);
    },

    deleteGroupUser(data) {
      const mySelf = this;
      var user = Encode.encode(JSON.stringify(this.userData));
      // var txt = 'You would to suspend user : ' + 'user.name'
      this.$swal({
        title: "Are you Confirm?",
        // text: ,
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes delete it!",
      }).then(function (result) {
        const axios = require("axios");
        axios
          .post(process.env.VUE_APP_API_BACKEND + "/deleteGroupUser", {
            user: user,
            group_name: data.group_name,
            org_id: data.org_id,
          })
          .then((response) => {
            if (response.data.status === "success") {
              mySelf.$swal(
                "Deleted!",
                "Your file has been deleted.",
                "success"
              );
            } else {
              mySelf.$swal(
                "Error!",
                response.data.status || "An unknown error occurred.",
                "error"
              );
            }
          })
          .then((response) => {
            mySelf.get_GroupsUser();
          });
      });
    },
    save() {
      if (this.group_name === "" || this.group_name.trim() === "") {
        this.$swal("Group Name is required", " ", "warning");
        this.group_name = " ";
      } else {
        var user = Encode.encode(JSON.stringify(this.userData));
        this.axios
          .post(process.env.VUE_APP_API_BACKEND + "/addGroupUser", {
            user: user,
            group_name: this.group_name,
            org_id: this.selectedOrganization.org_id,
          })
          .then((response) => {
            if (response.data.status === "success") {
              this.$swal("Save success", " ", "success");
              this.get_GroupsUser();
            } else if (response.data.status === "Group_name is duplicate") {
              this.$swal("Group Name is duplicate", " ", "warning");
            } else {
              this.$swal("An error occurred", " ", "error");
            }
          })
          .catch((error) => {
            this.$swal("An error occurred", error.message, "error");
          });
      }
    },
    save_edit_group_name(item) {
      var user = Encode.encode(JSON.stringify(this.userData));
      this.axios
        .post(process.env.VUE_APP_API_BACKEND + "/updateGroupUserName", {
          user: user,
          group_name: item.group_name,
          group_id: item.group_id,
        })
        .then((response) => {
          if (response.data.status === "success") {
            this.$swal("save success", " ", "success");
            this.get_GroupsUser();
          } else if (response.data.status === "Group User name is duplicate") {
            this.$swal("Group User name is duplicate", " ", "warning");
            this.get_GroupsUser();
          }
        });
    },
    reloadPage() {
      window.location.reload();
    },
    closeDialogAddusers() {
      this.dialogAddUsers = false;
      this.userRoles = [];
    },
    openAddRole() {
      this.dialogAddUsers = true;
      // this.getUserPermission()
    },
    get_GroupsUser() {
      var user = Encode.encode(JSON.stringify(this.userData));
      this.axios
        .post(process.env.VUE_APP_API_BACKEND + "/getGroupsUser", {
          user: user,
        })
        .then((response) => {
          this.groupUser = response.data.data;
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
    DialogAddGroup() {
      // this.$store.commit("reportid", this.sourceData.source_id);
      this.$refs.DialogAddGroup.open();
    },
  },
};
</script>

<style lang="css">
.setLine {
  border-right: 1px solid rgba(0, 0, 0, 0.12);
}

@media (max-width: 430px) {
  .headline {
    font-size: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .setLine {
    display: none; /* ซ่อนเส้นแบ่งแนวตั้งสำหรับหน้าจอขนาดเล็ก */
  }
}
</style>
