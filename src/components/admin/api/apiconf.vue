<template>
<v-container fluid class="d-flex justify-center align-center" style="min-height: 100vh;">
  <v-card max-width="1920" class="pa-5 pl-5">
      <!-- Toolbar -->
      <v-toolbar color="#336E8C" dark flat>
        <v-app-bar-nav-icon></v-app-bar-nav-icon>
        <v-toolbar-title color="titleapi">{{
          $t("apiservice")
        }}</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>

      <!-- Card Title -->
      <v-card-title class="headline">
        {{ $t("apilist") }}
        <v-divider class="mx-3 setLine" vertical></v-divider>
        <!-- <v-btn outline color="light-blue" @click="openDialogAddUsers()"><v-icon left dark>fa-user-plus fa-1x</v-icon>Add users</v-btn> -->
        <!-- Button to open dialog -->
        <v-btn outline color="light-blue darken-4" @click="openDialogAddAPI">
          <v-icon left dark>mdi-plus-circle</v-icon>{{ $t("addapilist") }}
        </v-btn>
        <!-- <v-btn outline color="light-blue darken-4" @click="openDialogAddUsersAD()">
                <v-icon left dark>person_add</v-icon>Add user AD
              </v-btn> -->
      </v-card-title>

      <!-- Custom Table -->
      <v-card-text class="d-flex justify-center">
  <div style="width: 100%; max-width: 1000px; margin: auto">
    <!-- ช่องค้นหา -->
    <v-row>
      <v-col cols="12">
        <v-text-field
          v-model="searchQuery"
          append-icon="mdi-magnify"
          :label="$t('search')"
          @input="filterServices"
          @click:clear="filterServices"
          clearable
        ></v-text-field>
      </v-col>
    </v-row>

    <!-- Container to center the table -->
    <v-simple-table>
      <thead>
        <tr>
          <th class="column-name">{{ $t("apiservicename") }}</th>
          <th class="column-endpoint">{{ $t("apiendpoint") }}</th>
          <th class="column-description">{{ $t("apides") }}</th>
          <th class="column-database">{{ $t("database") }}</th>
          <th class="column-request">{{ $t("request") }}</th>
          <th class="column-response">{{ $t("response") }}</th>
          <th class="column-status">{{ $t("status") }}</th>
          <th class="column-actions">{{ $t("edit/delete") }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="service in paginatedServices" :key="service.api_endpoint">
          <td class="column-name">{{ service.api_name }}</td>
          <td class="column-endpoint">{{ service.api_endpoint }}</td>
          <td class="column-description">{{ service.api_desc }}</td>
          <td class="column-database">{{ service.db_source }}</td>
          <td class="column-request">{{ service.request_fields ? Object.keys(service.request_fields).join(', ') : 'No fields available' }}</td>
          <td class="column-response">{{ service.response_fields ? service.response_fields.join(', ') : 'No fields available' }}</td>
          <td class="column-status">{{ service.status }}</td>
          <td class="column-actions">
            <v-row class="d-flex align-center">
              <v-col class="d-flex justify-center" cols="auto">
                <v-btn icon @click="openDialogEditAPI(service)">
                  <v-icon color="primary">mdi-pencil</v-icon>
                </v-btn>
              </v-col>
              <v-col class="d-flex justify-center" cols="auto">
                <v-btn icon @click="deleteService(service)">
                  <v-icon color="red">mdi-delete</v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </td>
        </tr>
        <tr v-if="paginatedServices.length === 0">
          <td colspan="8" class="text-center">ไม่พบข้อมูลที่ตรงกัน</td>
        </tr>
      </tbody>
    </v-simple-table>

    <!-- Pagination controls -->
    <v-row justify="center" class="mt-4">
      <v-btn icon :disabled="currentPage === 1" @click="prevPage">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
      <span>{{ currentPage }} / {{ totalPages }}</span>
      <v-btn icon :disabled="currentPage === totalPages" @click="nextPage">
        <v-icon>mdi-chevron-right</v-icon>
      </v-btn>
      <span>{{ filteredServices.length }} {{ $t("totalRecords") }}</span>
    </v-row>
  </div>
</v-card-text>

      <!-- Fullscreen Dialog -->
      <v-dialog
        v-model="isDialogOpen"
        fullscreen
        hide-overlay
        persistent
        class="dialogapi"
      >
        <v-card>
          <!-- Toolbar for Dialog -->
          <v-toolbar flat color="primary">
            <v-toolbar-title class="titleapi">{{
              isEditMode ? $t("editApi") : $t("addapilist")
            }}</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon @click="closeDialog" dark>
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar>

          <!-- Form in Dialog -->
          <v-card-text>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-flex md10>
                <v-layout row wrap class="pt-5">
                  <v-flex xs12 sm12 md3 offset-md1>
                    <v-subheader
                      >{{ $t("reportId") }}
                      <span style="color: red">*</span></v-subheader
                    >
                  </v-flex>

                  <v-flex xs12 sm12 md7>
                    <h4>
                      <v-autocomplete
                        :items="items"
                        :filter="customFilter"
                        item-text="file_name"
                        :label="$t('reprotid')"
                        item-value="source_id"
                        v-model="source_id"
                        :disabled="isEditMode"
                      ></v-autocomplete>
                    </h4>
                  </v-flex>

                  <v-flex xs12 sm12 md3 offset-md1>
                    <v-subheader
                      >{{ $t("apiname") }}
                      <span style="color: red">*</span></v-subheader
                    >
                  </v-flex>

                  <v-flex xs12 sm12 md7>
                    <h4>
                      <v-text-field
                        v-model="apiname"
                        required
                        :placeholder="$t('apiname')"
                      ></v-text-field>
                    </h4>
                  </v-flex>

                  <v-flex xs12 sm12 md3 offset-md1>
                    <v-subheader
                      >{{ $t("apiservice") }}
                      <span style="color: red">*</span></v-subheader
                    >
                  </v-flex>

                  <v-flex xs12 sm12 md7>
                    <h4>
                      <v-text-field
                        v-model="apiservicesname"
                        required
                        :rules="RuleEnglish2"
                        :placeholder="$t('apiservice')"
                        :disabled="isEditMode"
                      ></v-text-field>
                    </h4>
                  </v-flex>
                  <v-flex xs12 sm12 md3 offset-md1>
                    <v-subheader>{{ $t("apides") }}</v-subheader>
                  </v-flex>

                  <v-flex xs12 sm12 md7>
                    <h4>
                      <v-text-field
                        v-model="apides"
                        :placeholder="$t('apides')"
                      ></v-text-field>
                    </h4>
                  </v-flex>

                  <v-flex xs12 sm12 md3 offset-md1>
                    <v-subheader
                      >{{ $t("apitype") }}
                      <span style="color: red">*</span></v-subheader
                    >
                  </v-flex>

                  <v-flex xs12 sm12 md7>
                    <h4>
                      <v-select
                        :items="apitype"
                        v-model="selectedApiType"
                        required
                        :rules="Rules"
                        :label="$t('apitype')"
                        :disabled="isEditMode"
                      ></v-select>
                    </h4>
                  </v-flex>

                  <v-flex xs12 sm12 md3 offset-md1>
                    <v-subheader
                      >{{ $t("status") }}
                      <span style="color: red">*</span></v-subheader
                    >
                  </v-flex>
                  <v-flex xs12 sm12 md7>
                    <h4>
                      <v-select
                        :items="statusapi"
                        v-model="selectStatus"
                        required
                        :rules="Rules"
                        :label="$t('statusapi')"
                      ></v-select>
                    </h4>
                  </v-flex>

                  <v-flex xs12 sm12 md3 offset-md1>
                    <v-subheader
                      >{{ $t("database") }}
                      <span style="color: red">*</span></v-subheader
                    >
                  </v-flex>

                  <v-flex xs12 sm12 md7>
                    <h4>
                      <v-autocomplete
                        :items="databases"
                        :filter="customFilter"
                        item-text="database_name"
                        :label="$t('database')"
                        item-value="database_name"
                        v-model="database_name"
                        @change="fetchTables()"
                      ></v-autocomplete>
                    </h4>
                  </v-flex>

                  <v-flex xs12 sm12 md3 offset-md1>
                    <v-subheader
                      >{{ $t("table/view") }}
                      <span style="color: red">*</span></v-subheader
                    >
                  </v-flex>

                  <v-flex xs12 sm12 md7>
                    <h4>
                      <!-- v-select สำหรับเลือก Table -->
                      <v-autocomplete
                        :items="tables"
                        :filter="customFilter"
                        item-text="tab_name"
                        :label="$t('table/view')"
                        item-value="tab_name"
                        v-model="tab_name"
                        @change="fetchColumns()"
                      ></v-autocomplete>
                    </h4>
                  </v-flex>

                  <v-flex xs12 sm12 md3 offset-md1>
                    <v-subheader
                      >{{ $t("pleaserequire") }}
                      <span style="color: red">*</span></v-subheader
                    >
                  </v-flex>

                  <v-flex xs12 sm12 md7>
                    <h4>
                      <!-- Checkbox List for Columns -->
                      <div>
                        <div
                          v-if="columns.length > 0"
                          :class="`column-layout column-${columns.length}`"
                        >
                          <div
                            v-for="(columnData, colIndex) in columns"
                            :key="'col-' + colIndex"
                            class="column"
                          >
                            <v-checkbox
                              v-for="(item, index) in columnData"
                              :key="'request-' + index"
                              :value="request.includes(item)"
                              :label="item"
                              @change="toggleRequest(item)"
                              hide-details
                            ></v-checkbox>
                          </div>
                        </div>
                      </div>
                    </h4>
                  </v-flex>

                  <v-flex xs12 sm12 md3 offset-md1 class="pt-5">
                    <v-subheader
                      >{{ $t("pleaserespose") }}
                      <span style="color: red">*</span></v-subheader
                    >
                  </v-flex>

                  <v-flex xs12 sm12 md7 class="pt-5">
                    <h4>
                      <div>
                        <div
                          v-if="columns.length > 0"
                          :class="`column-layout column-${columns.length}`"
                        >
                          <div
                            v-for="(check, colIndex) in columns"
                            :key="'col-' + colIndex"
                            class="column"
                          >
                            <v-checkbox
                              v-for="(column, index) in check"
                              :key="'response-' + index"
                              :value="response.includes(column)"
                              :label="column"
                              @change="toggleResponse(column)"
                              hide-details
                            ></v-checkbox>
                          </div>
                        </div>
                      </div>
                    </h4>
                  </v-flex>
                </v-layout>
              </v-flex>
              <v-flex offset-md9 pt-5>
                <v-btn color="primary" @click="saveData()">{{
                  isEditMode ? $t("update") : $t("save")
                }}</v-btn>
              </v-flex>
            </v-form>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-card>
  </v-container>
</template>

<script>
import { Encode, Decode } from "@/services";
let cjs = require("crypto-js");

export default {
  name: "ApiConfiguration",
  data() {
    return {
      currentPage: 1,
      itemsPerPage: 5,
      response: [],
      request: [],
      apiname: "",
      apiservicesname: "",
      apides: [],
      selectedApiType: null,
      // databases: [],
      valid: false,
      isDialogOpen: false,
      isEditMode: false,
      formData: {},
      sourceData: {
        source_id: "",
      },
      Rules: [(v) => !!v || "This field is required."],
      RuleEnglish: [
  (v) => !!v || "This field is required.",
  (v) =>
    /^[a-zA-Z0-9ก-๙_-]+$/.test(v) ||
    "Only English or Thai letters, numbers, underscores, and hyphens are allowed.",
],
RuleEnglish2: [
        (v) => !!v || "This field is required.",
        (v) =>
          /^[a-z0-9_-]+$/.test(v) ||
          "Only lowercase English letters, numbers, underscores, and hyphens are allowed.",
      ],
      search: "",
      filteredServices: [],
      totalServices: 0,
      apiServices: [
        // {
        //   api_desc: "description",
        //   api_endpoint: "api_scopes",
        //   api_name: "api_scopes",
        //   api_type: "scopes",
        //   database_name: "eila_datalake",
        //   db_source: "datalake",
        //   endpoints_id: 32,
        //   org_id: 1,
        //   request_fields: {
        //     admit_year: "STRING",
        //     major_name_thai: "STRING",
        //   },
        //   response_fields: [
        //     "student_id",
        //     "admit_date",
        //     "admit_term",
        //     "admit_year",
        //     "major_name_thai",
        //     "sub_major_name_thai",
        //     "fac_name_thai",
        //     "campus_name_thai",
        //     "study_level_name",
        //     "course_degree",
        //     "course_type_name",
        //     "study_plan_name",
        //     "sex_name_thai",
        //     "study_status",
        //     "status_desc_thai",
        //     "still_student",
        //     "eng_score",
        //     "grad_term",
        //     "grad_year",
        //     "grad_date",
        //     "honour_id",
        //     "current_study",
        //     "report",
        //     "ungraduated",
        //     "retry",
        //     "ungraduated_term",
        //     "ungraduated_year",
        //   ],
        //   scope: "read_write",
        //   source_id: "apiScope",
        //   status: "active",
        //   table_name: "dl_student",
        // },
        // {
        //   api_desc: "test",
        //   api_endpoint: "stest",
        //   api_name: "test",
        //   api_type: "scopes",
        //   database_name: "test",
        //   db_source: "test",
        //   endpoints_id: 33,
        //   org_id: 1,
        //   request_fields: {
        //     admit_year: "STRING",
        //     major_name_thai: "STRING",
        //   },
        //   response_fields: [
        //     "student_id",
        //     "admit_date",
        //     "admit_term",
        //     "admit_year",
        //     "major_name_thai",
        //     "sub_major_name_thai",
        //     "fac_name_thai",
        //     "campus_name_thai",
        //     "study_level_name",
        //     "course_degree",
        //     "course_type_name",
        //     "study_plan_name",
        //     "sex_name_thai",
        //     "study_status",
        //     "status_desc_thai",
        //     "still_student",
        //     "eng_score",
        //     "grad_term",
        //     "grad_year",
        //     "grad_date",
        //     "honour_id",
        //     "current_study",
        //     "report",
        //     "ungraduated",
        //     "retry",
        //     "ungraduated_term",
        //     "ungraduated_year",
        //   ],
        //   scope: "read_write",
        //   source_id: "testapiScope",
        //   status: "active",
        //   table_name: "dl_student",
        // },
        // {
        //   api_desc: "description",
        //   api_endpoint: "scopes",
        //   api_name: "scopes",
        //   api_type: "scopes",
        //   database_name: "eila_datalake",
        //   db_source: "datalake",
        //   endpoints_id: 32,
        //   org_id: 1,
        //   request_fields: {
        //     admit_year: "STRING",
        //     major_name_thai: "STRING",
        //   },
        //   response_fields: [
        //     "student_id",
        //     "admit_date",
        //     "admit_term",
        //     "admit_year",
        //     "major_name_thai",
        //     "sub_major_name_thai",
        //     "fac_name_thai",
        //     "campus_name_thai",
        //     "study_level_name",
        //     "course_degree",
        //     "course_type_name",
        //     "study_plan_name",
        //     "sex_name_thai",
        //     "study_status",
        //     "status_desc_thai",
        //     "still_student",
        //     "eng_score",
        //     "grad_term",
        //     "grad_year",
        //     "grad_date",
        //     "honour_id",
        //     "current_study",
        //     "report",
        //     "ungraduated",
        //     "retry",
        //     "ungraduated_term",
        //     "ungraduated_year",
        //   ],
        //   scope: "read_write",
        //   source_id: "apiScope",
        //   status: "active",
        //   table_name: "dl_student",
        // },
        // {
        //   api_desc: "test",
        //   api_endpoint: "api_stest",
        //   api_name: "test",
        //   api_type: "scopes",
        //   database_name: "test",
        //   db_source: "test",
        //   endpoints_id: 33,
        //   org_id: 1,
        //   request_fields: {
        //     admit_year: "STRING",
        //     major_name_thai: "STRING",
        //   },
        //   response_fields: [
        //     "student_id",
        //     "admit_date",
        //     "admit_term",
        //     "admit_year",
        //     "major_name_thai",
        //     "sub_major_name_thai",
        //     "fac_name_thai",
        //     "campus_name_thai",
        //     "study_level_name",
        //     "course_degree",
        //     "course_type_name",
        //     "study_plan_name",
        //     "sex_name_thai",
        //     "study_status",
        //     "status_desc_thai",
        //     "still_student",
        //     "eng_score",
        //     "grad_term",
        //     "grad_year",
        //     "grad_date",
        //     "honour_id",
        //     "current_study",
        //     "report",
        //     "ungraduated",
        //     "retry",
        //     "ungraduated_term",
        //     "ungraduated_year",
        //   ],
        //   scope: "read_write",
        //   source_id: "testapiScope",
        //   status: "active",
        //   table_name: "dl_student",
        // },
        // {
        //   api_desc: "description",
        //   api_endpoint: "api",
        //   api_name: "api_d",
        //   api_type: "scopes",
        //   database_name: "eila_datalake",
        //   db_source: "datalake",
        //   endpoints_id: 32,
        //   org_id: 1,
        //   request_fields: {
        //     admit_year: "STRING",
        //     major_name_thai: "STRING",
        //   },
        //   response_fields: [
        //     "student_id",
        //     "admit_date",
        //     "admit_term",
        //     "admit_year",
        //     "major_name_thai",
        //     "sub_major_name_thai",
        //     "fac_name_thai",
        //     "campus_name_thai",
        //     "study_level_name",
        //     "course_degree",
        //     "course_type_name",
        //     "study_plan_name",
        //     "sex_name_thai",
        //     "study_status",
        //     "status_desc_thai",
        //     "still_student",
        //     "eng_score",
        //     "grad_term",
        //     "grad_year",
        //     "grad_date",
        //     "honour_id",
        //     "current_study",
        //     "report",
        //     "ungraduated",
        //     "retry",
        //     "ungraduated_term",
        //     "ungraduated_year",
        //   ],
        //   scope: "read_write",
        //   source_id: "apiScope",
        //   status: "active",
        //   table_name: "dl_student",
        // },
        // {
        //   api_desc: "test",
        //   api_endpoint: "page",
        //   api_name: "test",
        //   api_type: "scopes",
        //   database_name: "test",
        //   db_source: "test",
        //   endpoints_id: 33,
        //   org_id: 1,
        //   request_fields: {
        //     admit_year: "STRING",
        //     major_name_thai: "STRING",
        //   },
        //   response_fields: [
        //     "student_id",
        //     "admit_date",
        //     "admit_term",
        //     "admit_year",
        //     "major_name_thai",
        //     "sub_major_name_thai",
        //     "fac_name_thai",
        //     "campus_name_thai",
        //     "study_level_name",
        //     "course_degree",
        //     "course_type_name",
        //     "study_plan_name",
        //     "sex_name_thai",
        //     "study_status",
        //     "status_desc_thai",
        //     "still_student",
        //     "eng_score",
        //     "grad_term",
        //     "grad_year",
        //     "grad_date",
        //     "honour_id",
        //     "current_study",
        //     "report",
        //     "ungraduated",
        //     "retry",
        //     "ungraduated_term",
        //     "ungraduated_year",
        //   ],
        //   scope: "read_write",
        //   source_id: "testapiScope",
        //   status: "active",
        //   table_name: "dl_student",
        // },

      ],
      statusapi: ["inactive", "active"],
      check: [
        // { column_name: "column_1", comment: "", data_type: "string" },
        // { column_name: "column_2", comment: "", data_type: "string" },
        // { column_name: "column_3", comment: "", data_type: "string" },
      ],
      // selectedDatabase: "datalake",
      selectedSourceId: null,
      items: [
        // {
        //   source_id: "test001",
        //   file_name: "Test001",
        // },
        // {
        //   source_id: "test002",
        //   file_name: "Test002",
        // },
      ],
      databases: [
        // { database_name: "datalake"},
        // { database_name: "data_bank"},
        // { database_name: "data_exchange" },
        // { database_name: "default" },
        // { database_name: "eila_datalake" },
        // { database_name: "generateapi" },
        // { database_name: "hr_datalake" },
        // { database_name: "master_datalake" },
        // { database_name: "open_data" },
        // { database_name: "outreach_datalake" },
        // { database_name: "psp_datalake" },
        // { database_name: "rdo_datalake" },
        // { database_name: "system_data" },
        // { database_name: "test" },
      ],
      selectedTable: "",
      tables: [
        // { tab_name: "master001" },
        // { tab_name: "master001_02" },
        // { tab_name: "master003" },
        // { tab_name: "master004" },
        // { tab_name: "test001" },
        // { tab_name: "test002" },
        // { tab_name: "test003" },
        // { tab_name: "test006" },
        // { tab_name: "test007" },
        // { tab_name: "test008" },
        // { tab_name: "test009" },
        // { tab_name: "test010" },
        // { tab_name: "test015" },
        // { tab_name: "test016" },
        // { tab_name: "test017" },
        // { tab_name: "vw_test_007" },
      ],
      apitype: ["general", "scopes"],
      db_connect: [
        {
          host: "localhost",
          user: "root",
          password: "example",
        },
      ],
    };
  },
  // watch: {
  //   search(val) {
  //     this.filterServices();
  //   }
  // },
  computed: {
    userData() {
      if (this.$cookies.isKey("information")) {
        return JSON.parse(Decode.decode(this.$cookies.get("information")));
      } else {
        return "";
      }
    },
    paginatedServices() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.filteredServices.slice(start, end); // ใช้ filteredServices แทน apiServices
  },
  totalPages() {
    return Math.ceil(this.filteredServices.length / this.itemsPerPage); // คำนวณจาก filteredServices
  },

    columns() {
      const totalRows = this.check.length;

      // แสดงเป็น 1 คอลัมน์ถ้าน้อยกว่า 10 แถว
      if (totalRows < 10) {
        return [this.check];
      }
      // แสดงเป็น 2 คอลัมน์ถ้ามีแถวมากกว่า 10 แต่ไม่เกิน 20 แถว
      else if (totalRows > 10 && totalRows <= 20) {
        return this.splitColumns(2);
      }
      // แสดงเป็น 3 คอลัมน์ถ้ามีแถวมากกว่า 20 แถว
      else if (totalRows > 20) {
        return this.splitColumns(3);
      }
      // ค่าเริ่มต้นเป็น 1 คอลัมน์
      return [this.check];
    },
  },
  created() {
    this.filteredServices = this.apiServices;
  },
  mounted() {
    this.showapi();
    this.getdatabase();
    this.getreportid();
    this.filteredServices = this.apiServices;
  },
  methods: {
    
    filterServices() {
    if (this.searchQuery.trim() === "") {
      this.filteredServices = this.apiServices;
    } else {
      this.filteredServices = this.apiServices.filter(service =>
        service.api_name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        service.api_endpoint.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        service.api_desc.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
    this.currentPage = 1; // รีเซ็ตไปยังหน้าแรกเมื่อมีการกรอง
  },
  
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    toggleResponse(column) {
      const index = this.response.indexOf(column);
      if (index === -1) {
        // Add column to response array
        this.response.push(column);
      } else {
        // Remove column from response array
        this.response.splice(index, 1);
      }
    },

    toggleRequest(column) {
      const index = this.request.indexOf(column);
      if (index === -1) {
        // Add column to response array
        this.request.push(column);
      } else {
        // Remove column from response array
        this.request.splice(index, 1);
      }
    },
    splitColumns(numColumns) {
      const rowsPerColumn = Math.ceil(this.check.length / numColumns);
      const columns = [];
      for (let i = 0; i < numColumns; i++) {
        columns.push(
          this.check.slice(i * rowsPerColumn, (i + 1) * rowsPerColumn)
        );
      }
      return columns;
    },
    getreportid() {
      this.axios
        .post(process.env.VUE_APP_API_BACKEND + "/getDataExportExcel")
        .then((response) => {
          this.items = response.data;
          console.log("getuser",items);
          
        })
        .catch((error) => {
          console.error("Error fetching report ID:", error);
        });
    },
    fetchTables() {
      console.log("start gettable", this.database_name);

      // ล้างค่า table, request, และ response เมื่อมีการเปลี่ยนแปลง database
      this.tab_name = ""; // ล้างค่า table
      this.request = []; // ล้างค่า request fields
      this.response = []; // ล้างค่า response fields
      this.check = [];

      if (this.database_name) {
        this.axios
          .post(process.env.VUE_APP_API_BACKEND2 + "/listTables", {
            db_source: "datalake",
            database_name: this.database_name,
          })
          .then((response) => {
            this.tables = response.data;
          })
          .catch((error) => {
            console.error("Error fetching tables:", error);
          });
      }
    },
    fetchColumns() {
      console.log("start collumn", this.tab_name);
      // ล้างค่า request และ response เมื่อมีการเปลี่ยนแปลง table
      this.request = []; // ล้างค่า request fields
      this.response = []; // ล้างค่า response fields
      this.check = [];

      if (this.database_name && this.tab_name) {
        this.axios
          .post(process.env.VUE_APP_API_BACKEND2 + "/listColumns", {
            db_source: "datalake",
            database_name: this.database_name,
            table_name: this.tab_name,
          })
          .then((response) => {
            console.log("Columns:", response.data);
            this.check = response.data.map((check) => check.column_name);
          })
          .catch((error) => {
            console.error("Error fetching columns:", error);
          });
      } else {
        console.log("Cannot fetch columns: database_name or tab_name is null");
      }
    },
    getdatabase() {
      console.log("start database");

      this.axios
        .post(process.env.VUE_APP_API_BACKEND2 + "/listDatabases", {
          db_source: "datalake",
        })
        .then((response) => {
          console.log("response", response);

          this.databases = response.data;
        });
    },
   showapi() {
    console.log("start api");
    var user = Encode.encode(JSON.stringify(this.userData));
    this.axios
      .post(process.env.VUE_APP_API_BACKEND2 + "/showAPIService", {
        user: user,
      })
      .then((response) => {
        console.log("apiservice", response.data);
        this.apiServices = response.data;
        this.totalServices = this.apiServices.length; // อัปเดต totalServices
        this.filteredServices = this.apiServices; // กำหนด filteredServices เป็น apiServices เริ่มต้น
      })
      .catch((error) => {
        console.error("Error fetching API service:", error);
      });
  },
    openDialogAddAPI() {
      this.isEditMode = false;
      this.formData = {};

      this.source_id = null;
      this.apiname = "";
      this.apiservicesname = "";
      this.apides = "";
      this.selectedApiType = "";
      this.database_name = "";
      this.tab_name = "";
      this.selectStatus = "";
      this.request = [];
      this.response = [];
      this.check = [];

      this.isDialogOpen = true;
    },
    openDialogEditAPI(service) {
      console.log("start edit", service);
      this.isEditMode = true;
      this.formData = { ...service };
      this.isDialogOpen = true;

      // ตรวจสอบการตั้งค่าต่าง ๆ
      console.log("Source ID:", service.source_id);
      console.log("API Name:", service.api_name);
      console.log("API endpoint:", service.api_endpoint);
      console.log("Database Name:", service.database_name);
      console.log("Tab Name:", service.table_name);
      console.log("Request Fields:", service.request_fields);
      console.log("Response Fields:", service.response_fields);

      // กำหนดค่าให้ฟอร์ม
      this.source_id = service.source_id || null;
      this.apiname = service.api_name;
      this.apiservicesname = service.api_endpoint;
      this.apides = service.api_desc;
      this.selectedApiType = service.api_type;
      this.database_name = service.database_name;
      this.tab_name = service.table_name;
      this.selectStatus = service.status;

      // จัดการกับ request_fields
      this.request = service.request_fields
        ? Object.keys(service.request_fields)
        : [];

      // จัดการกับ response_fields
      this.response = service.response_fields || [];

      // เรียกใช้งาน fetchColumns หลังจากตั้งค่า tab_name เพื่อโหลด columns
      if (this.database_name && this.tab_name) {
        this.fetchColumns();
      } else {
        console.log("Cannot fetch columns: database_name or tab_name is null");
      }
    },
    closeDialog() {
      this.isDialogOpen = false;
    },
    saveData() {
      if (this.isEditMode) {
        console.log("editapi");

        this.editAPI();
      } else {
        console.log("addapi");
        this.addAPI();
      }
    },
    reloadPage() {
      window.location.reload();
    },
    addAPI() {
  console.log("Adding API:");
  this.$swal({
    title: "Please wait...",
    text: "Adding API...",
    icon: "info",
    allowOutsideClick: false,
    showConfirmButton: false,
    onOpen: () => {
      this.$swal.showLoading();
    },
  });

  // แปลง Array เป็น Object
  const requestFieldsObject = this.request.reduce((obj, key) => {
    obj[key] = "string"; // กำหนดค่าทุกคีย์ให้เป็น "string"
    return obj;
  }, {});

  this.axios
    .post(process.env.VUE_APP_API_BACKEND2 + "/api/addConfigure", {
      api_endpoint: this.apiservicesname,
      hive_database: this.database_name,
      hive_table: this.tab_name,
      request_fields: requestFieldsObject,
      response_fields: this.response,
      api_name: this.apiname,
      api_desc: this.apides,
      scope: "",
      status: this.selectStatus,
      db_source: "datalake",
      db_connect: '{"host":"localhost","user":"root","password":"example"}',
      org_id: 1,
      api_type: this.selectedApiType,
      api_result_format: this.source_id,
    })
    .then((response) => {
      console.log("Added successfully:", response.data);
      if (response.data.status.startsWith("success")) {
        // ตรวจสอบว่าข้อความเริ่มต้นด้วย "success"
        this.$swal("Success", "", "success").then(() => {
          window.location.reload();
        });
      } else {
        // แสดงข้อความข้อผิดพลาดจาก response
        this.$swal("ERROR", response.data.status, "error");
      }
    })
    .catch((error) => {
      // หยุดการแสดง loading และแสดง error
      this.$swal.close(); // ปิดการแสดง loading
      console.error("Error adding data:", error);
      
      // ตรวจสอบว่า error มี response จาก server หรือไม่
      const errorMessage = error.response && error.response.data && error.response.data.status
        ? error.response.data.status
        : "An unknown error occurred.";
      
      // แสดงข้อความ error
      this.$swal("ERROR", errorMessage, "error");
    });
},
    editAPI() {
      console.log("Adding API:");
      this.$swal({
        title: "Please wait...",
        text: "Editing API...",
        icon: "info",
        allowOutsideClick: false,
        showConfirmButton: false,
        onOpen: () => {
          this.$swal.showLoading();
        },
      });
      const requestFieldsObject = this.request.reduce((obj, key) => {
        obj[key] = "string"; // กำหนดค่าทุกคีย์ให้เป็น "string"
        return obj;
      }, {});

      console.log("Editing API:");
      this.axios
        .post(process.env.VUE_APP_API_BACKEND2 + "/api/editConfigure", {
          api_endpoint: this.apiservicesname,
          hive_database: this.database_name,
          hive_table: this.tab_name,
          request_fields: requestFieldsObject,
          response_fields: this.response,
          api_name: this.apiname,
          api_desc: this.apides,
          scope: "",
          status: this.selectStatus,
          db_source: "datalake",
          db_connect: '{"host":"localhost","user":"root","password":"example"}',
          org_id: 1,
          api_type: this.selectedApiType,
          api_result_format: this.source_id,
        })
        .then((response) => {
          console.log("Edited successfully:", response.data);
          if (response.data.status.startsWith("success")) {
            // ตรวจสอบว่าข้อความเริ่มต้นด้วย "success"
            this.$swal("Success", "", "success").then(() => {
              window.location.reload();
            });
          } else {
            // แสดงข้อความข้อผิดพลาดจาก response
            this.$swal("ERROR", response.data.status, "error");
          }
        })
        .catch((error) => {
      // หยุดการแสดง loading และแสดง error
      this.$swal.close(); // ปิดการแสดง loading
      console.error("Error adding data:", error);
      
      // ตรวจสอบว่า error มี response จาก server หรือไม่
      const errorMessage = error.response && error.response.data && error.response.data.status
        ? error.response.data.status
        : "An unknown error occurred.";
      
      // แสดงข้อความ error
      this.$swal("ERROR", errorMessage, "error");
    });
    },
    deleteService(data) {
      console.log("data", data);

      const mySelf = this;
      // var txt = 'You would to suspend user : ' + 'user.name'
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
                "/api/delete_configure",
              {
                data: {
                  api_endpoint: data.api_endpoint,
                },
              }
            )
            .then((response) => {
          console.log("Delete response:", response.data);
          
          // แก้ไขการตรวจสอบเงื่อนไขเพื่อให้ตรงกับ response ที่ได้จาก backend
          if (response.data.status && response.data.status.includes("success")) {
            this.$swal("Delete is success", "Data deleted successfully", "success").then(() => {
              window.location.reload();  // รีโหลดหน้าเมื่อการลบสำเร็จ
            });
          } else if (response.data.status && response.data.status.includes("Permission denied")) {
            this.$swal("Permission denied", response.data.status, "warning");
          } else {
            this.$swal("ERROR", response.data.status, "error");
          }
        })
        .catch((error) => {
          console.error("Error deleting scope:", error);
          this.$swal("ERROR", response.data.status, "error");
        });
        }
      });
    },

    reloadPage() {
    window.location.reload();
  },
    // deleteService(id) {
    //   this.apiServices = this.apiServices.filter(
    //     (service) => service.id !== id
    //   );
    //   // Perform deletion API call if needed
    //   this.axios
    //     .delete(process.env.VUE_APP_API_BACKEND2 + "/deleteAPIService", {
    //       data: { id: id },
    //     })
    //     .then((response) => {
    //       console.log("Deleted successfully:", response.data);
    //     })
    //     .catch((error) => {
    //       console.error("Error deleting data:", error);
    //     });
    // },
  },
};
</script>

<style scoped>
.column-layout {
  display: flex;
  justify-content: space-between;
  gap: 80px; /* เพิ่มช่องว่างระหว่างคอลัมน์ */
}
.column-checkbox {
  white-space: nowrap; /* ไม่ให้ข้อความยาวลงบรรทัดใหม่ */
  overflow: hidden; /* ซ่อนข้อความที่เกิน */
  text-overflow: ellipsis; /* แสดง ... เมื่อข้อความยาวเกิน */
  width: 100%; /* กำหนดความกว้างของ Checkbox ให้เต็มคอลัมน์ */
}
.column {
  flex: 1;
  margin-right: 10px;
}
.column-1 .column {
  width: 100%;
}
.column-2 .column {
  width: 48%;
}
.column-3 .column {
  width: 30%;
}

.v-col {
  max-width: 25% !important; /* แสดง 4 คอลัมน์ */
  flex: 0 0 25% !important; /* ขยายขนาดให้เหมาะสม */
}
.dialogapi {
  z-index: 1000;
}
.titleapi {
  color: white;
}
/* กำหนดความกว้างของคอลัมน์ */
.column-name {
  flex: 1 1 15%; /* Allow to grow and shrink with a base width of 15% */
}
.column-endpoint {
  flex: 1 1 15%; 
}
.column-description {
  flex: 2 1 20%; /* More space for description */
}
.column-database {
  flex: 1 1 10%;
}
.column-request {
  flex: 2 1 20%; 
}
.column-response {
  flex: 2 1 20%; 
}
.column-status {
  flex: 1 1 10%; 
  text-align: center;
}
.column-actions {
  flex: 1 1 10%; 
}
th,
td {
  border: 1px solid #ddd; /* เพิ่มเส้นขอบ */
  padding: 16px; /* เพิ่มระยะห่างระหว่างเซลล์ */
  text-align: left; /* จัดข้อความชิดซ้าย */
}

th {
  background-color: #f5f5f5; /* พื้นหลังหัวตาราง */
  font-weight: bold; /* ตัวหนาสำหรับหัวตาราง */
  text-align: center;
}

tr:hover {
  background-color: #f1f1f1; /* เปลี่ยนสีพื้นหลังเมื่อ hover */
}
</style>
