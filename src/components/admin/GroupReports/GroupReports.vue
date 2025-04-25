<template lang="html">
  <v-container>
    <v-card class="pt-3">
      <v-card-title class="headline">
        {{ $t("groupreportmgmt") }}
        <v-divider class="mx-3 setLine" vertical></v-divider>
        <!-- <v-btn outline color="light-blue darken-4" @click="DialogAddGroupReports()">
                    <v-icon left dark>add_circle</v-icon>Create Group
                </v-btn> -->
      </v-card-title>
      <v-card-text>
        <v-layout row wrap>
          <v-container>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-layout row wrap>
                <!-- <v-flex xs6 md6 class="pa-1">
                                <h4></h4>
                            </v-flex> -->
                <v-flex xs8 md8 class="pa-1">
                  <v-text-field
                    v-model="group_report_name"
                    :label="$t('createreportnewgroup')"
                    required
                    :rules="Rules"
                    maxLength="255"
                    :counter="255"
                    placeholder="Group Name"
                  >
                  </v-text-field>
                </v-flex>
                <!-- <v-flex xs8 md8 class="pa-1">
                  <v-select
                    item-text="org_name"
                    item-value="org_name"
                    :label="$t('selectorg')"
                    :items="organization"
                    v-model="organization"
                    :rules="Rules"
                    dense
                    outlined
                    persistent-hint
                    return-object
                    single-line
                  ></v-select>
                </v-flex> -->
                <v-flex xs8 md8 class="pa-1">
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
                  ></v-select>
                </v-flex>
                <v-spacer></v-spacer>
                <v-flex xs6 md6 class="pa-1">
                  <v-btn
                    color="success"
                    outline
                    :disabled="!valid"
                    @click="save()"
                    >{{ $t("save") }}</v-btn
                  >
                </v-flex>
              </v-layout>
            </v-form>
          </v-container>
        </v-layout>
      </v-card-text>
      <v-card-text>
        <v-data-table
          v-bind:headers="localizedHeaders"
          v-bind:items="sortedGroupReports"
          :loading="loading"
          :rows-per-page-items="[10, 25, 50, { text: 'All', value: -1 }]"
          :rows-per-page-text="$t('rowsPerPageLabel')"
        >
          <template slot="items" slot-scope="props">
            <td class="text-xs-center">{{ props.index + 1 }}</td>
            <td class="text-xs-center">
              <v-edit-dialog
                :return-value.sync="props.item.group_report_name"
                large
                @save="save_edit_group_report_name(props.item)"
                @cancel="cancel"
              >
                {{ props.item.group_report_name }}
                <template v-slot:input>
                  <v-text-field
                    v-model="props.item.group_report_name"
                    :label="$t('edit')"
                    single-line
                    autofocus
                    maxLength="255"
                    :counter="255"
                  >
                  </v-text-field>
                </template>
              </v-edit-dialog>
            </td>
            <td class="text-left">{{ props.item.create_at }}</td>
            <td class="text-left">{{ props.item.org_name }}</td>
            <td class="text-xs-center">
              <v-btn
                small
                color="warning"
                outline
                @click="editPrevilage(props.item)"
              >
                <v-icon left>post_add</v-icon>{{ $t("addreport") }}
              </v-btn>
              <v-btn small icon @click="deleteGroupReports(props.item)">
                <v-icon color="error">delete</v-icon>
              </v-btn>
            </td>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
    <DialogAddGroupReports ref="DialogAddGroupReports" />
  </v-container>
</template>

<script>
import { Encode, Decode } from "@/services";
import DialogAddGroupReports from "./DialogAddGroupReports";
export default {
  components: { DialogAddGroupReports },
  data() {
    return {
      selectedOrganization: null, // ใช้ตัวแปรแยกสำหรับเก็บค่าที่เลือก
      loading: true,
      groupReports: [],
      addUsers: [],
      userRoles: [],
      rolesName: "",
      group_report_name: "",
      valid: true,
      search: "",
      dialogAddUsers: false,
      Rules: [(v) => !!v || "Information is required"],
      // headers: [
      //   {
      //     text: "Group Report Name",
      //     // align: 'center',
      //     value: "group_report_name",
      //     sortable: false,
      //   },
      //   {
      //     text: "Create Date",
      //     align: "center",
      //     sortable: false,
      //   },
      //   {
      //     text: "Oraganization",
      //     align: "center",
      //     sortable: false,
      //   },
      //   {
      //     text: "Delete",
      //     align: "center",
      //     sortable: false,
      //   },
      // ],
      organization: [],
    };
  },
  computed: {
  sortedGroupReports() {
    return this.groupReports
      .slice() // Create a copy to avoid modifying the original data
      .sort((a, b) => new Date(b.create_at) - new Date(a.create_at)) // Sort by latest date first
      .map((item, index) => ({ ...item, index: index + 1 })); // Add row numbers
  },
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
          text: 'No.', 
          align: 'center', 
          sortable: false, 
          value: 'index' },
        {
          text: this.$t("groupReportName"),
          value: "group_report_name",
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
    this.get_GroupsReport(), this.oganize();
  },
  methods: {
    oganize() {
      this.axios
        .get(process.env.VUE_APP_API_BACKEND + "/showOrganize", {})
        .then((response) => {
          this.organization = response.data;
        });
    },
    editPrevilage(data) {
      this.$refs.DialogAddGroupReports.open(data);
    },
    deleteGroupReports(data) {
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
          .post(process.env.VUE_APP_API_BACKEND + "/deleteGroupReport", {
            user: user,
            group_report_id: data.group_report_id,
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
            mySelf.get_GroupsReport();
          });
      });
    },
    save() {
      // console.log(this.group_report_name);
      if (this.group_report_name === "" || this.group_report_name === " ") {
        this.$swal("Group Name is required ", " ", "warning");
        this.group_report_name = " ";
      } else {
        var user = Encode.encode(JSON.stringify(this.userData));
        this.axios
          .post(process.env.VUE_APP_API_BACKEND + "/addGroupReport", {
            user: user,
            group_report_name: this.group_report_name,
            organization: this.selectedOrganization,
          })
          .then((response) => {
            // console.log(response.data.status);
            if (response.data.status === "success") {
              this.$swal("save success", " ", "success");
              // this.group_report_name = ''
              // this.get_GroupsReport()
              this.reloadPage();
            } else if (response.data.status === "Group_name is duplicate") {
              this.$swal("Group name is duplicate", " ", "warning");
            }
          });
      }
    },
    save_edit_group_report_name(item) {
      // console.log(item);
      var user = Encode.encode(JSON.stringify(this.userData));
      this.axios
        .post(process.env.VUE_APP_API_BACKEND + "/updateGroupReportName", {
          user: user,
          group_report_id: item.group_report_id,
          group_report_name: item.group_report_name,
        })
        .then((response) => {
          // console.log(response);
          if (response.data.status === "success") {
            this.$swal("save success", " ", "success");
            this.get_GroupsReport();
          } else if (
            response.data.status === "Group Report name is duplicate"
          ) {
            this.$swal("Group Report name is duplicate", " ", "warning");
            this.get_GroupsReport();
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
    get_GroupsReport() {
      var user = Encode.encode(JSON.stringify(this.userData));
      this.axios
        .post(process.env.VUE_APP_API_BACKEND + "/getGroupsReport", {
          user: user,
        })
        .then((response) => {
          // console.log(response);
          this.groupReports = response.data.data;
          this.loading = false;
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
    DialogAddGroupReports() {
      // this.$store.commit("reportid", this.sourceData.source_id);
      this.$refs.DialogAddGroupReports.open();
    },
  },
};
</script>

<style lang="css"></style>
