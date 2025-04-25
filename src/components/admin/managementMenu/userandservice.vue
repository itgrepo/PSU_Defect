<template>
  <v-container>
    <!-- ส่วนเลือก Role -->
    <v-card class="mb-4">
      <v-row class="d-flex justify-center" align="center">
        <v-col cols="1">
          <v-subheader>{{ $t("select_role") }}</v-subheader>
        </v-col>
        <v-col cols="12" md="6">
          <v-select
            :items="getRoles"
            :item-text="'previlage_name'"
            :item-value="'previlage_id'"
            :label="$t('role')"
            dense
            style="max-width: 500px; display: inline-block"
            solo
            v-model="selectedRole"
            @change="fetchRoleData"
          ></v-select>
        </v-col>
      </v-row>
      <v-divider></v-divider>
      <!-- ตารางเลือกข้อมูล -->
      <v-row class="d-flex justify-center" align="start">
        <!-- ตารางทางซ้าย -->
        <v-col cols="12" md="6">
          <v-card class="p-4">
            <v-card-title>{{ $t("select_data") }}</v-card-title>

            <!-- ช่องค้นหาของตารางทางซ้าย -->
            <v-text-field
              v-model="searchAvailableReports"
              :label="$t('search_dataset')"
              dense
              solo
            ></v-text-field>

            <v-simple-table dense>
              <thead>
                <tr>
                  <th>{{ $t("dataset_name") }}</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="report in paginatedAvailableReports"
                  :key="report.source_id"
                  @click="selectReport(report)"
                  class="clickable-row"
                >
                  <td>{{ report.export_excel_name }}</td>
                </tr>
              </tbody>
            </v-simple-table>
          </v-card>
          <v-row justify="space-between" align="center">
            <v-col cols="auto">
              <v-pagination
                v-model="currentPage"
                :length="totalPages"
                :total-visible="5"
                circle
              ></v-pagination>
            </v-col>
            <v-col cols="auto" class="text-right">
              <span>{{ $t("total_data") }}: {{ filteredAvailableReports.length }}</span>
            </v-col>
          </v-row>
        </v-col>
        <!-- ปุ่มลูกศรซ้ายขวา -->
        <v-row justify="center" align="center">
          <v-btn @click="moveToLeft" icon>
            <v-icon>mdi-arrow-left</v-icon>
          </v-btn>
          <v-btn @click="moveToRight" icon>
            <v-icon>mdi-arrow-right</v-icon>
          </v-btn>
        </v-row>

        <!-- ตารางทางขวา -->
        <v-col cols="12" md="6">
          <v-card class="p-4">
            <v-card-title>{{ $t("selected_data") }}</v-card-title>

            <!-- ช่องค้นหาของตารางทางขวา -->
            <v-text-field
              v-model="searchSelectedReports"
              :label="$t('search_dataset')"
              dense
              solo
            ></v-text-field>

            <v-simple-table dense>
              <thead>
                <tr>
                  <th>{{ $t("dataset_name") }}</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="report in filteredSelectedReports"
                  :key="report.source_id"
                  @click="removeReport(report)"
                  class="clickable-row"
                >
                  <td>{{ report.export_excel_name }}</td>
                </tr>
              </tbody>
            </v-simple-table>
          </v-card>
        </v-col>
      </v-row>

      <v-divider align="start"></v-divider>

      <v-row
        class="d-flex justify-start"
        align="start"
        style="height: 50%; padding-top: 60px"
      >
        <!-- ตารางทางซ้าย -->
        <v-col cols="12" md="6">
          <v-card class="p-4">
            <v-card-title>{{ $t("select_user") }}</v-card-title>

            <!-- ช่องค้นหาของตารางทางซ้าย -->
            <v-text-field
              v-model="searchAvailableUsers"
              :label="$t('search_user')"
              dense
              solo
            ></v-text-field>

            <v-simple-table dense>
              <thead>
                <tr>
                  <th style="min-width: 150px">{{ $t("username") }}</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="user in paginatedAvailableUsers"
                  :key="user.user_id"
                  @click="selectUser(user)"
                  class="clickable-row"
                >
                  <td>{{ user.username }}</td>
                </tr>
              </tbody>
            </v-simple-table>
          </v-card>
          <v-row justify="space-between" align="center">
            <v-col cols="auto" class="text-right">
              <v-pagination
                v-model="currentUserPage"
                :length="totalPagesUsers"
                :total-visible="5"
                circle
              ></v-pagination>
            </v-col>
            <v-col class="text-right">
              <span>{{ $t("total_data") }}: {{ filteredAvailableUsers.length }}</span>
            </v-col>
          </v-row>
        </v-col>
        <v-row justify="center" align="center">
          <v-btn @click="moveuserToLeft" icon outlined large class="mr-4">
            <v-icon>mdi-arrow-left</v-icon>
          </v-btn>

          <v-btn @click="moveuserToRight" icon outlined large>
            <v-icon>mdi-arrow-right</v-icon>
          </v-btn>
        </v-row>
        <!-- ตารางทางขวา -->
        <v-col cols="12" md="6">
          <v-card class="p-4">
            <v-card-title>{{ $t("selected_user") }}</v-card-title>

            <!-- ช่องค้นหาของตารางทางขวา -->
            <v-text-field
              v-model="searchSelectedUsers"
              :label="$t('search_user')"
              dense
              solo
            ></v-text-field>

            <v-simple-table dense>
              <thead>
                <tr>
                  <th style="min-width: 150px; text-align: center">
                    {{ $t("username") }}
                  </th>
                  <th style="min-width: 200px; text-align: center">
                    {{ $t("service") }}
                  </th>
                  <th style="min-width: 100px; text-align: center">{{ $t("action") }}</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="user in filteredSelectedUsers"
                  :key="user.user_id"
                  class="clickable-row"
                >
                  <td style="text-align: center">{{ user.username }}</td>
                  <td style="text-align: center">
                    <!-- Select services -->
                    <v-select
                      :items="availableServices"
                      v-model="user.service"
                      multiple
                      dense
                      chips
                      style="max-width: 200px; display: inline-block; text-align: center"
                      label="Select services"
                    ></v-select>
                  </td>
                  <td style="text-align: center">
                    <v-btn @click="removeUser(user)" icon>
                      <v-icon>mdi-delete</v-icon>
                    </v-btn>
                  </td>
                </tr>
              </tbody>
            </v-simple-table>
          </v-card>
        </v-col>
      </v-row>

      <v-divider></v-divider>

      <!-- ปุ่มบันทึกข้อมูล -->
      <v-row class="d-flex justify-start" align="end">
        <v-col>
          <v-btn @click="saveUserData" color="primary" :disabled="!selectedUsers.length">
            {{ $t("save") }}
          </v-btn>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      getRoles: [
        // {
        //   create_at: "2019-08-13 08:24:45",
        //   previlage_id: 1,
        //   previlage_name: "admin",
        // },
        // {
        //   create_at: "2021-05-21 10:31:46",
        //   previlage_id: 3,
        //   previlage_name: "user",
        // },
        // {
        //   create_at: "2023-09-21 10:18:59",
        //   previlage_id: 8,
        //   previlage_name: "Super User",
        // },
      ],
      selectedRole: null,
      roleSearch: "",
      availableReports: [
        // { source_id: 1, export_excel_name: "รายงาน 1" },
        // { source_id: 2, name: "รายงาน 2" },
        // { source_id: 3, name: "รายงาน 3" },
        // { source_id: 4, name: "รายงาน 4" },
        // { source_id: 5, name: "รายงาน 5" },
        // { source_id: 6, name: "รายงาน 6" },
        // { source_id: 7, name: "รายงาน 7" },
        // { source_id: 8, name: "รายงาน 8" },
        // { source_id: 9, name: "รายงาน 9" },
        // { source_id: 10, name: "รายงาน 10" },
        // { source_id: 11, name: "รายงาน 11" },
      ],
      availableUsers: [
        // { user_id: 1, username: "ผู้ใช้ 1", service: [] },
        // { user_id: 2, name: "ผู้ใช้ 2", service: [] },
        // { user_id: 3, name: "ผู้ใช้ 3", service: [] },
        // { user_id: 4, name: "ผู้ใช้ 4", service: [] },
        // { user_id: 5, name: "ผู้ใช้ 5", service: [] },
      ],
      selectedReports: [],
      selectedUsers: [],
      availableServices: [],
      searchAvailableReports: "",
      searchAvailableUsers: "",
      searchSelectedReports: "",
      searchSelectedUsers: "",
      currentPage: 1,
      currentUserPage: 1,
      itemsPerPage: 10,
    };
  },
  computed: {
    filteredAvailableReports() {
      return this.availableReports
        .filter((report) =>
          report.export_excel_name
            .toLowerCase()
            .includes(this.searchAvailableReports.toLowerCase())
        )
        .sort((a, b) => a.export_excel_name.localeCompare(b.export_excel_name)); // เพิ่มการเรียงลำดับ
    },
    filteredAvailableUsers() {
      const filteredUsers = this.availableUsers
        .filter((user) =>
          user.username.toLowerCase().includes(this.searchAvailableUsers.toLowerCase())
        )
        .sort((a, b) => a.username.localeCompare(b.username));

      return filteredUsers;
    },
    filteredSelectedReports() {
      return this.selectedReports
        .filter((report) =>
          report.export_excel_name
            .toLowerCase()
            .includes(this.searchSelectedReports.toLowerCase())
        )
        .sort((a, b) => a.export_excel_name.localeCompare(b.export_excel_name)); // เพิ่มการเรียงลำดับ
    },
    filteredSelectedUsers() {
      const filteredUsers = this.selectedUsers
        .filter((user) =>
          user.username.toLowerCase().includes(this.searchSelectedUsers.toLowerCase())
        )
        .sort((a, b) => a.username.localeCompare(b.username));

      return filteredUsers;
    },
    paginatedAvailableReports() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.filteredAvailableReports.slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.filteredAvailableReports.length / this.itemsPerPage);
    },
    paginatedAvailableUsers() {
      const start = (this.currentUserPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.filteredAvailableUsers.slice(start, end);
    },
    totalPagesUsers() {
      return Math.ceil(this.filteredAvailableUsers.length / this.itemsPerPage);
    },
  },
  mounted() {
    this.getRolesPermission();
    this.getData();
  },
  methods: {
    getData() {
      this.axios
        .post(process.env.VUE_APP_API_BACKEND + "/getDataExportExcel")
        .then((response) => {
          this.availableReports = response.data;
          console.log("Report:", this.availableReports);
        });
    },
    fetchRoleData() {
      if (this.selectedRole) {
        this.axios
          .post(`${process.env.VUE_APP_API_BACKEND}/getUserInRole`, {
            previlage_id: this.selectedRole,
          })
          .then((response) => {
            const data = response.data;

            // ตรวจสอบข้อมูล icon ใน response
            console.log("Data icon:", data.icon);

            // ดึงรายการ icons ที่มีค่าเป็น 1
            const activeIcons = Object.keys(data.icon).filter(
              (key) => data.icon[key] === 1
            );

            // ตรวจสอบค่า activeIcons
            console.log("Active Icons:", activeIcons);

            // กำหนด availableServices ให้เป็น activeIcons
            this.availableServices = activeIcons;

            // แปลงข้อมูล users และเก็บข้อมูลในรูปแบบที่ต้องการ
            this.availableUsers = data.user.map((user) => {
              console.log("User before mapping:", user);

              return {
                user_id: user.user_id, // เก็บ user_id
                username: user.username, // เก็บ username
                service: activeIcons, // เก็บ selectedServices (icons ที่เป็น 1)
              };
            });

            // แสดงผล users ที่เก็บข้อมูลแล้ว
            console.log("Users with selected services:", this.availableUsers);
          })
          .catch((error) => {
            console.error("Error fetching role data:", error);
          });
      } else {
        console.warn("No role selected.");
      }
    },
    getRolesPermission() {
      this.axios
        .post(process.env.VUE_APP_API_BACKEND + "/mgmt/getRoles")
        .then((response) => {
          this.getRoles = response.data;
        });
    },
    // ฟังก์ชันสำหรับเลือกและย้ายรายงานจากซ้ายไปขวา
    moveToRight() {
      this.selectedReports = this.selectedReports.concat(this.availableReports);
      this.availableReports = [];
    },

    // ฟังก์ชันสำหรับเลือกและย้ายรายงานจากขวาไปซ้าย
    moveToLeft() {
      this.availableReports = this.availableReports.concat(this.selectedReports);
      this.selectedReports = [];
    },
    moveuserToRight() {
      // ตรวจสอบว่า selectedUsers มี user ที่เลือกหรือไม่
      if (this.selectedUsers.length > 0) {
        // เพิ่ม selectedUsers ไปที่ฝั่งขวา
        const selectedUserIds = this.selectedUsers.map((u) => u.user_id);
        this.availableUsers = this.availableUsers.filter(
          (user) => !selectedUserIds.includes(user.user_id)
        );
      }
    },
    moveuserToLeft() {
      // ตรวจสอบว่า selectedUsers มี user ที่ต้องย้ายกลับฝั่งซ้าย
      if (this.selectedUsers.length > 0) {
        // นำ user ที่อยู่ใน selectedUsers กลับไปฝั่งซ้าย
        this.availableUsers = [...this.availableUsers, ...this.selectedUsers];
        this.selectedUsers = [];
      }
    },
    selectReport(report) {
      if (!this.selectedReports.find((r) => r.source_id === report.source_id)) {
        this.selectedReports.push(report);
        this.availableReports = this.availableReports.filter(
          (r) => r.source_id !== report.source_id
        );
      }
    },
    removeReport(report) {
      this.selectedReports = this.selectedReports.filter(
        (r) => r.source_id !== report.source_id
      );
      this.availableReports.push(report);
    },
    selectUser(user) {
      if (!this.selectedUsers.find((u) => u.user_id === user.user_id)) {
        this.selectedUsers.push(user);
        this.availableUsers = this.availableUsers.filter(
          (u) => u.user_id !== user.user_id
        );
      }
      // ตรวจสอบว่า user ที่เลือกยังไม่อยู่ใน selectedUsers
      if (!this.selectedUsers.find((u) => u.user_id === user.user_id)) {
        this.selectedUsers.push(user);
      }
    },

    removeUser(user) {
      this.selectedUsers = this.selectedUsers.filter((u) => u.user_id !== user.user_id);
      this.availableUsers.push(user);
    },
    saveUserData() {
  const dataToSave = this.selectedUsers.map((user) => ({
    user_id: user.user_id,
    source_id: this.selectedReports.map((report) => report.source_id),
    icon: user.service.join(","),
  }));

  console.log("Data to save:", dataToSave);

  // ส่งข้อมูลไปที่ /savePrevilageIcon
  this.axios
    .post(`${process.env.VUE_APP_API_BACKEND}/savePrevilageIcon`, dataToSave)
    .then((response) => {
      console.log("Data saved successfully:", response.data);
      // คุณสามารถเพิ่มการจัดการผลลัพธ์หรือแสดงข้อความเมื่อบันทึกข้อมูลสำเร็จ
    })
    .catch((error) => {
      console.error("Error saving data:", error);
      // คุณสามารถเพิ่มการจัดการข้อผิดพลาดที่เกิดขึ้น
    });
}
  },
};
</script>

<style scoped>
.v-col {
  border: 1px solid red;
  background-color: #f0f0f0;
}
.v-card {
  height: 100%;
}
.mb-4 {
  margin-bottom: 1.5rem;
}
.clickable-row {
  cursor: pointer;
  transition: background-color 0.2s ease;
  padding: 16px 18px; /* เพิ่มระยะห่างในแต่ละเซลล์ */
}
.clickable-row:hover {
  background-color: #e0f7fa;
}
.p-4 {
  padding: 16px;
}
</style>
