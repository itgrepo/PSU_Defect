<template lang="html">
  <v-container fluid>
    <div class="ipadpro">
      <table class="table">
        <thead class="tb-header">
          <v-layout row wrap class="headertable">
            <v-flex xs1 sm1 md1 lg2 xl1 class="text-center">
              <center></center>
            </v-flex>
            <v-flex xs6 sm3 md3 lg3 xl6 class="text-center">
              {{ $t("reportname") }}
            </v-flex>
            <v-flex xs4 sm2 md2 lg2 xl1 class="text-center">
              {{ $t("metadata") }}
            </v-flex>
            <v-flex xs3 sm2 md1 lg1 xl1 class="text-center">
              {{ $t("api") }}
            </v-flex>
            <v-flex xs3 sm1 md2 lg1 xl1 class="text-center">
              {{ $t("dashboard") }}
            </v-flex>
            <v-flex xs3 sm2 md2 lg2 xl1 class="text-center">
              {{ $t("datadictionary") }}
            </v-flex>
            <v-flex xs1 sm1 md1 lg1 xl1 class="text-center">
              <div style="padding-right: 20px">{{ $t("file") }}</div>
            </v-flex>
          </v-layout>
        </thead>
        <v-progress-linear
          v-if="isLoading"
          indeterminate
          color="deep-purple accent-4"
          rounded
          height="6"
        ></v-progress-linear>
        <v-flex class="tableFixHead">
          <!-- {{filterBySearch}} -->
          <table class="table">
            <tbody
              v-for="(itemSubCategory, index) in filterBySearch"
              :id="test(index)"
              :class="{ padd: index === 0 }"
            >
              <!-- <pre>{{itemSubCategory}}</pre> -->
              <v-layout row wrap class="text-subcategory">
                <v-flex xs12 sm12 md12 lg12 xl12>{{
                  itemSubCategory.key
                }}</v-flex>
              </v-layout>
              <v-layout
                row
                wrap
                v-for="detailSubCategory in itemSubCategory.values"
                class="colortr"
              >
                <v-flex xs1 sm1 md1 lg1 xl class="text-center table-center">
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                      <v-btn
                        v-on="on"
                        v-model="detailSubCategory.favorite"
                        :class="detailSubCategory.favorite ? 'red--text' : ''"
                        icon
                        class="star-center"
                        @click="
                          detailSubCategory.favorite =
                            !detailSubCategory.favorite
                        "
                        v-show="!isSmallScreen"
                      >
                        <v-icon
                          @click="addNewFavorite(detailSubCategory.file_name)"
                        >
                          <!-- <v-icon @click="checkUserLoginFavorite(detailSubCategory.file_name)"> -->
                          favorite
                        </v-icon>
                      </v-btn>
                    </template>
                    <span> {{ $t("favorite") }}</span>
                  </v-tooltip>
                </v-flex>
                <v-flex xs2 sm2 md3 lg4 xl6 class="table-center">
                  {{ detailSubCategory.export_excel_name }}
                </v-flex>
                <v-flex
                  xs2
                  sm2
                  md1
                  lg1
                  xl1
                  class="td-cursor text-center table-center"
                >
                  <v-dialog
                    max-width="1000px"
                    hide-overlay
                    transition="dialog-bottom-transition"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        icon
                        v-bind="attrs"
                        v-on="on"
                        @click="getMetadatadetail(detailSubCategory.source_id)"
                      >
                        <img
                          class="imageSize-metaData"
                          src="/opendataIcon/icon/files.png"
                          alt="fireSpot"
                        />
                      </v-btn>
                    </template>
                    <v-card>
                      <v-toolbar dark color="#10316B">
                        <v-toolbar-title>{{ $t("metadata") }}</v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-toolbar-items> </v-toolbar-items>
                      </v-toolbar>

                      <v-container fluid>
                        <v-layout align-start justify-center row wrap>
                          <v-flex xs12 sm6 md6>
                            <v-card tile flat color="#10316B">
                              <h2
                                class="text-center font-contact font-weight-bold color-black"
                              >
                                {{ $t("section") }}
                              </h2>
                            </v-card>
                          </v-flex>
                          <v-flex xs12 sm6 md6>
                            <v-card tile flat color="#10316B">
                              <h2
                                class="text-center font-contact font-weight-bold color-black"
                              >
                                {{ $t("value") }}
                              </h2>
                            </v-card>
                          </v-flex>
                        </v-layout>
                        <v-layout row wrap align-start justify-center>
                          <v-flex xs12 sm6 md6>
                            <v-card tile flat color="grey lighten-4">
                              <p class="company-name">
                                * {{ $t("datasettype") }}
                              </p>
                            </v-card>
                          </v-flex>
                          <v-flex xs12 sm6 md6>
                            <v-card tile flat color="grey lighten-4">
                              <p class="company-name text-left">
                                {{ metadata.data_type }}
                              </p>
                            </v-card>
                          </v-flex>
                        </v-layout>
                        <v-layout row wrap align-start justify-center>
                          <v-flex xs12 sm6 md6 dense outlined>
                            <v-card tile flat color="white">
                              <p class="company-name">
                                {{ $t("reprotid") }}
                              </p>
                            </v-card>
                          </v-flex>
                          <v-flex xs12 sm6 md6 dense outlined>
                            <v-card tile flat color="white">
                              <p class="company-name text-left">
                                {{ metadata.source_id }}
                              </p>
                            </v-card>
                          </v-flex>
                        </v-layout>
                        <v-layout row wrap align-start justify-center>
                          <v-flex xs12 sm6 md6>
                            <v-card tile flat color="grey lighten-4">
                              <p class="company-name">
                                * {{ $t("contactname") }}
                              </p>
                            </v-card>
                          </v-flex>
                          <v-flex xs12 sm6 md6>
                            <v-card tile flat color="grey lighten-4">
                              <p class="company-name text-left">
                                {{ metadata.contactor_name }}
                              </p>
                            </v-card>
                          </v-flex>
                        </v-layout>
                        <v-layout row wrap align-start justify-center>
                          <v-flex xs12 sm6 md6>
                            <v-card tile flat color="white">
                              <p class="company-name">
                                * {{ $t("contactmail") }}
                              </p>
                            </v-card>
                          </v-flex>
                          <v-flex xs12 sm6 md6>
                            <v-card tile flat color="white">
                              <p class="company-name text-left">
                                {{ metadata.contactor_email }}
                              </p>
                            </v-card>
                          </v-flex>
                        </v-layout>
                        <v-layout row wrap align-start justify-center>
                          <v-flex xs12 sm6 md6>
                            <v-card tile flat color="grey lighten-4">
                              <p class="company-name">* {{ $t("des") }}</p>
                            </v-card>
                          </v-flex>
                          <v-flex xs12 sm6 md6>
                            <v-card tile flat color="grey lighten-4">
                              <p class="company-name text-left">
                                {{ metadata.description }}
                              </p>
                            </v-card>
                          </v-flex>
                        </v-layout>
                        <v-layout row wrap align-start justify-center>
                          <v-flex xs12 sm6 md6>
                            <v-card tile flat color="white">
                              <p class="company-name">
                                * {{ $t("objective") }}
                              </p>
                            </v-card>
                          </v-flex>
                          <v-flex xs12 sm6 md6>
                            <v-card tile flat color="white">
                              <p class="company-name text-left">
                                {{ metadata.objective }}
                              </p>
                            </v-card>
                          </v-flex>
                        </v-layout>
                        <v-layout row wrap align-start justify-center>
                          <v-flex xs12 sm6 md6>
                            <v-card tile flat color="grey lighten-4">
                              <p class="company-name">
                                * {{ $t("data-relate-unit") }}
                              </p>
                            </v-card>
                          </v-flex>
                          <v-flex xs12 sm6 md6>
                            <v-card tile flat color="grey lighten-4">
                              <p class="company-name text-left">
                                {{ metadata.frequency }}
                              </p>
                            </v-card>
                          </v-flex>
                        </v-layout>
                        <v-layout row wrap align-start justify-center>
                          <v-flex xs12 sm6 md6>
                            <v-card tile flat color="white">
                              <p class="company-name">
                                {{ $t("dataupdate") }}
                              </p>
                            </v-card>
                          </v-flex>
                          <v-flex xs12 sm6 md6>
                            <v-card tile flat color="white">
                              <p class="company-name text-left">
                                {{ metadata.frequency_unit }}
                              </p>
                            </v-card>
                          </v-flex>
                        </v-layout>
                        <v-layout row wrap align-start justify-center>
                          <v-flex xs12 sm6 md6>
                            <v-card tile flat color="grey lighten-4">
                              <p class="company-name">* {{ $t("geo") }}</p>
                            </v-card>
                          </v-flex>
                          <v-flex xs12 sm6 md6>
                            <v-card tile flat color="grey lighten-4">
                              <p class="company-name text-left">
                                {{ metadata.geo_coverage }}
                              </p>
                            </v-card>
                          </v-flex>
                        </v-layout>
                        <v-layout row wrap align-start justify-center>
                          <v-flex xs12 sm6 md6>
                            <v-card tile flat color="white">
                              <p class="company-name">* {{ $t("source") }}</p>
                            </v-card>
                          </v-flex>
                          <v-flex xs12 sm6 md6>
                            <v-card tile flat color="white">
                              <p class="company-name text-left">
                                {{ metadata.data_source }}
                              </p>
                            </v-card>
                          </v-flex>
                        </v-layout>
                        <v-layout row wrap align-start justify-center>
                          <v-flex xs12 sm6 md6>
                            <v-card tile flat color="grey lighten-4">
                              <p class="company-name">
                                * {{ $t("datacollect") }}
                              </p>
                            </v-card>
                          </v-flex>
                          <v-flex xs12 sm6 md6>
                            <v-card tile flat color="grey lighten-4">
                              <p class="company-name text-left">
                                {{ metadata.data_storage }}
                              </p>
                            </v-card>
                          </v-flex>
                        </v-layout>
                        <v-layout row wrap align-start justify-center>
                          <v-flex xs12 sm6 md6>
                            <v-card tile flat color="white">
                              <p class="company-name">
                                {{ $t("govcate") }}
                              </p>
                            </v-card>
                          </v-flex>
                          <v-flex xs12 sm6 md6>
                            <v-card tile flat color="white">
                              <p class="company-name text-left">
                                {{ metadata.topic_gorvernance }}
                              </p>
                            </v-card>
                          </v-flex>
                        </v-layout>
                        <v-layout row wrap align-start justify-center>
                          <v-flex xs12 sm6 md6>
                            <v-card tile flat color="grey lighten-4">
                              <p class="company-name">
                                {{ $t("datalicese") }}
                              </p>
                            </v-card>
                          </v-flex>
                          <v-flex xs12 sm6 md6>
                            <v-card tile flat color="grey lighten-4">
                              <p class="company-name text-left">
                                {{ metadata.data_license }}
                              </p>
                            </v-card>
                          </v-flex>
                        </v-layout>
                        <v-layout row wrap align-start justify-center>
                          <v-flex xs12 sm6 md6>
                            <v-card tile flat color="white">
                              <p class="company-name">
                                {{ $t("conditions") }}
                              </p>
                            </v-card>
                          </v-flex>
                          <v-flex xs12 sm6 md6>
                            <v-card tile flat color="white">
                              <p class="company-name text-left">
                                {{ metadata.data_condition }}
                              </p>
                            </v-card>
                          </v-flex>
                        </v-layout>
                        <v-layout row wrap align-start justify-center>
                          <v-flex xs12 sm6 md6>
                            <v-card tile flat color="grey lighten-4">
                              <p class="company-name">
                                {{ $t("sponsor") }}
                              </p>
                            </v-card>
                          </v-flex>
                          <v-flex xs12 sm6 md6>
                            <v-card tile flat color="grey lighten-4">
                              <p class="company-name text-left">
                                {{ metadata.supporter }}
                              </p>
                            </v-card>
                          </v-flex>
                        </v-layout>
                        <!-- <v-layout row wrap align-start justify-center>
                          <v-flex xs12 sm6 md6>
                            <v-card tile flat color="white">
                              <p class="company-name">* รูปแบบการเก็บข้อมูล</p>
                            </v-card>
                          </v-flex>
                          <v-flex xs12 sm6 md6>
                            <v-card tile flat color="white">
                              <p class="company-name text-left">
                                {{ metadata.data_storage }}
                              </p>
                            </v-card>
                          </v-flex>
                        </v-layout>
                        <v-layout row wrap align-start justify-center>
                          <v-flex xs12 sm6 md6>
                            <v-card tile flat color="grey lighten-4">
                              <p class="company-name">
                                หน่วยที่ย่อยที่สุดของการจัดเก็บข้อมูล
                              </p>
                            </v-card>
                          </v-flex>
                          <v-flex xs12 sm6 md6>
                            <v-card tile flat color="grey lighten-4">
                              <p class="company-name text-left">
                                {{ metadata.data_unit }}
                              </p>
                            </v-card>
                          </v-flex>
                        </v-layout> -->
                        <v-layout row wrap align-start justify-center>
                          <v-flex xs12 sm6 md6>
                            <v-card tile flat color="white">
                              <p class="company-name">{{ $t("url") }}</p>
                            </v-card>
                          </v-flex>
                          <v-flex xs12 sm6 md6>
                            <v-card tile flat color="white">
                              <p class="company-name text-left">
                                {{ metadata.URL }}
                              </p>
                            </v-card>
                          </v-flex>
                        </v-layout>
                        <v-layout row wrap align-start justify-center>
                          <v-flex xs12 sm6 md6>
                            <v-card tile flat color="grey lighten-4">
                              <p class="company-name">{{ $t("languse") }}</p>
                            </v-card>
                          </v-flex>
                          <v-flex xs12 sm6 md6>
                            <v-card tile flat color="grey lighten-4">
                              <p class="company-name text-left">
                                {{ metadata.data_language }}
                              </p>
                            </v-card>
                          </v-flex>
                        </v-layout>
                        <v-layout row wrap align-start justify-center>
                          <v-flex xs12 sm6 md6>
                            <v-card tile flat color="white">
                              <p class="company-name">
                                {{ $t("datainitial") }}
                              </p>
                            </v-card>
                          </v-flex>
                          <v-flex xs12 sm6 md6>
                            <v-card tile flat color="white">
                              <p class="company-name text-left">
                                {{ formatDate(metadata.create_at) }}
                              </p>
                            </v-card>
                          </v-flex>
                        </v-layout>
                        <v-layout row wrap align-start justify-center>
                          <v-flex xs12 sm6 md6>
                            <v-card tile flat color="grey lighten-4">
                              <p class="company-name">
                                {{ $t("lastupdate") }}
                              </p>
                            </v-card>
                          </v-flex>
                          <v-flex xs12 sm6 md6>
                            <v-card tile flat color="grey lighten-4">
                              <p class="company-name text-left">
                                {{ formatDate(metadata.modified_date) }}
                              </p>
                            </v-card>
                          </v-flex>
                        </v-layout>
                        <v-layout row wrap align-start justify-center>
                          <v-flex xs12 sm6 md6>
                            <v-card tile flat color="white">
                              <p class="company-name">{{ $t("rd") }}</p>
                            </v-card>
                          </v-flex>
                          <v-flex xs12 sm6 md6>
                            <v-card tile flat color="white">
                              <p class="company-name text-left">
                                {{ metadata.data_reference }}
                              </p>
                            </v-card>
                          </v-flex>
                        </v-layout>
                      </v-container>
                    </v-card>
                  </v-dialog>
                </v-flex>

                <v-flex
                  xs1
                  sm1
                  md1
                  lg1
                  xl1
                  class="td-cursor text-center table-center"
                >
                  <div
                    v-if="!detailSubCategory.api_document_URL"
                    @click="nolinkapi()"
                  >
                    <img
                      class="imageSize"
                      src="/opendataIcon/icon/apib&w.png"
                      alt="fireSpot1"
                    />
                  </div>
                  <div v-else @click="Getlink(detailSubCategory)">
                    <img
                      class="imageSize"
                      src="/opendataIcon/icon/api.png"
                      alt="API"
                    />
                  </div>
                </v-flex>
                <!-- <div
                  v-if="showApiPopup"
                  class="custom-popup-overlay"
                  @click="closeApiPopup"
                >
                  <div class="custom-popup" @click.stop>
                    <v-card>
                      <v-card-title
                        class="titleapi font-weight-bold text-h3"
                        style="background-color: #3f51b5; color: white"
                      >
                        {{ $t("apiLink") }}
                      </v-card-title>
                      <v-card-text>
                        <p>
                          {{ $t("apiurl") }}: <strong>{{ apiLink }}</strong>
                        </p>
                        <p>
                          {{ $t("noteText") }}
                          <br />
                          {{ $t("noteDetails") }}
                        </p>
                        <v-btn color="primary" @click="downloadApiDocument">{{
                          $t("apidocument")
                        }}</v-btn>
                      </v-card-text>

                      <v-card-actions>
                        <v-btn
                          block
                          color="primary"
                          @click="downloadApiDocument"
                        >
                          {{ $t("apidocument") }}
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </div>
                </div> -->

                <div
                  v-if="showApiPopup"
                  class="custom-popup-overlay"
                  @click="closeApiPopup"
                >
                  <div class="custom-popup" @click.stop>
                    <v-responsive>
                      <v-card>
                        <v-card-title
                          class="titleapi font-weight-bold text-h3"
                          style="background-color: #3f51b5; color: white"
                        >
                          {{ $t("apiLink") }}
                        </v-card-title>

                        <v-card-text>
                          <p>
                            {{ $t("apiurl") }}:
                            <strong class="api-url-container">
                              <span>{{ apiLink }}</span>
                              <!-- ใช้ span โดยไม่มี class api-url -->
                            </strong>
                            <v-btn icon @click="copyToClipboard(apiLink)">
                              <v-icon>mdi-content-copy</v-icon>
                            </v-btn>
                          </p>
                          <p>
                            {{ $t("noteText") }}
                            <br />
                            {{ $t("noteDetails") }}
                          </p>

                          <!-- Full-width button -->
                          <v-btn
                            block
                            color="primary"
                            @click="downloadApiDocument"
                          >
                            {{ $t("apidocument") }}
                          </v-btn>
                        </v-card-text>

                        <v-card-actions>
                          <v-btn block color="primary" @click="closeApiPopup">
                            {{ $t("close") }}
                          </v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-responsive>
                  </div>
                </div>

                <v-flex
                  xs1
                  sm1
                  md2
                  lg1
                  xl1
                  class="td-cursor text-center table-center"
                  @click="toPathSource(detailSubCategory.Link_name)"
                >
                  <!-- <div
                    v-if="detailSubCategory.Link_name == null || detailSubCategory.Link_name == '' || detailSubCategory.Link_name == 'None'"> -->
                  <div
                    v-if="
                      detailSubCategory.Link_name == null ||
                      detailSubCategory.Link_name == '' ||
                      detailSubCategory.Link_name == 'None'
                    "
                    @click="nolinkdashboard()"
                  >
                    <img
                      class="imageSize"
                      src="/opendataIcon/icon/dashboardbb&w.png"
                      alt="fireSpot"
                    />
                  </div>
                  <div
                    v-else
                    @click="toPathSource(detailSubCategory.source_id)"
                  >
                    <img
                      class="imageSize"
                      src="/opendataIcon/icon/dashboard.png"
                      alt="fireSpot"
                    />
                  </div>
                </v-flex>

                <v-flex
                  xs1
                  sm1
                  md1
                  lg1
                  xl1
                  class="td-cursor text-center table-center"
                  @click="downloadFileMongo(detailSubCategory.meta)"
                >
                  <!-- <div
                    v-if="detailSubCategory.mongo_file_id_metadata == null || detailSubCategory.mongo_file_id_metadata == '' || detailSubCategory.mongo_file_id_metadata == 'None'"> -->
                  <div
                    v-if="
                      detailSubCategory.mongo_file_id_metadata == null ||
                      detailSubCategory.mongo_file_id_metadata == '' ||
                      detailSubCategory.mongo_file_id_metadata == 'None'
                    "
                    @click="nofile()"
                  >
                    <img
                      class="imageSize"
                      src="../../../public/opendataIcon/icon/metaDatab&w.png"
                      alt="fireSpot"
                    />
                  </div>
                  <div
                    v-else
                    @click="getDataExportMetadata(detailSubCategory.source_id)"
                  >
                    <img
                      class="imageSize"
                      src="../../../public/opendataIcon/icon/metaData.png"
                      alt="fireSpot"
                    />
                  </div>
                </v-flex>

                <v-flex
                  xs1
                  sm1
                  md1
                  lg1
                  xl1
                  class="td-cursor text-center table-center"
                >
                  <div
                    v-if="
                      detailSubCategory.mongo_file_id_csv == null ||
                      detailSubCategory.mongo_file_id_csv == '' ||
                      detailSubCategory.mongo_file_id_csv == 'None'
                    "
                    @click="nofile()"
                  >
                    <img
                      class="imageSize"
                      src="../../../public/opendataIcon/icon/zipb&w.png"
                      alt="fireSpot"
                    />
                  </div>
                  <div v-else @click="checkUserLoginCsv(detailSubCategory)">
                    <img
                      class="imageSize"
                      src="../../../public/opendataIcon/icon/zip.png"
                      alt="fireSpot"
                    />
                  </div>
                </v-flex>
              </v-layout>
            </tbody>
          </table>
        </v-flex>
      </table>
    </div>
  </v-container>
</template>

<script>
import _ from "lodash";
import { Encode, Decode } from "@/services";
import { log } from "util";
import dialogMetadata from "../publicData/dialogMetadata.vue";
export default {
  components: {
    dialogMetadata,
  },
  data() {
    return {
      showApiPopup: false, // ตัวแปรสำหรับแสดง/ซ่อน popup
      apiLink: "", // เก็บลิงก์ API ที่ได้มา
      loading: false,
      isSmallScreen: false,
      jsonData: [],
      dialog5: false,
      dialog: false,
      notifications: false,
      sound: true,
      widgets: false,
      // dialog: false,
      Widthipad: "",
      // detailSubCategory:True,
      isLoading: false, // Set to true when loading, false when data is ready
      id: "",
      mini: "",
      data: [],
      drawer: true,
      subCategory: [],
      searchTxt: "",
      metadata: [],
      filterBySearch: [],
      checkIdSubCate: "",
      category: [],
    };
  },
  created() {
    // this.getCategoryByUser()
    this.getDataExportExcel();
    this.getUrl();
  },
  mounted() {
    this.checkScreenSize();
    window.addEventListener("resize", this.checkScreenSize);

    this.check();
    // this.getCategoryByUser()
    this.Tableipad();
    // this.getKey();
    // this.getUrl();
    this.getDataExportExcel();
    // this.getMetadatadetail();
  },
  computed: {
    userData() {
      if (this.$cookies.isKey("information")) {
        return JSON.parse(Decode.decode(this.$cookies.get("information")));
      } else {
        return "";
      }
    },
    subCategoryName: {
      get() {
        return this.$store.getters.getDataSubCategory;
      },
    },
  },
  methods: {
     // ฟังก์ชันคัดลอกข้อความ
     copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
      this.$swal(
        this.$t("copiedTitle"), // ชื่อหัวข้อ (เช่น "คัดลอกแล้ว!" หรือ "Copied!")
        this.$t("copiedMessage"), // ข้อความ (เช่น "ลิงค์ API ได้ถูกคัดลอกแล้วไปยังคลิปบอร์ด" หรือ "The API link has been copied to the clipboard.")
        "success"
      );
    }).catch(err => {
      console.error('Failed to copy: ', err);
      this.$swal(
        this.$t("errorTitle"), // หัวข้อข้อผิดพลาด (เช่น "ข้อผิดพลาด!" หรือ "Error!")
        this.$t("errorMessage"), // ข้อความข้อผิดพลาด (เช่น "ไม่สามารถคัดลอกลิงค์ API ได้" หรือ "Failed to copy the API link.")
        "error"
      );
    });
  },

    downloadApiDocument() {
      const link = document.createElement("a");
      link.href = "/filedoc/API Service_V1.pdf"; // เส้นทางไปยังไฟล์ PDF
      link.download = "API Service_V1.pdf";
      link.click();
    },
    checkScreenSize() {
      this.isSmallScreen = window.innerWidth < 600;
    },
    // fetchData(link) {
    //   if (link) {
    //     this.axios.get(link)
    //       .then(response => {
    //         this.jsonData = response; // เก็บข้อมูล JSON ที่ได้จาก API ใน jsonData
    //       })
    //       .catch(error => {
    //         console.error('Error fetching API data:', error);
    //       });
    //   }
    // },
    navigateToOtherPage() {
      // ในที่นี้คือการ navigate ไปยังหน้าอื่น สามารถใช้ router ของ Vue Router ได้
      window.location.href = this.detailSubCategory.api_document_URL;
    },
    openDialog5() {
      this.dialog5 = true;
    },
    closeDialog5() {
      this.dialog5 = false;
    },
    formatDate(datetime) {
      var date = new Date(datetime);
      var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
      var month =
        date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1;
      var year = date.getFullYear();
      return day + "-" + month + "-" + year;
    },
    check() {
      // console.log(data);
      // this.other = data;
      this.userDataProfile = this.userData;
    },

    getMetadata(data) {
      this.$refs.dialogMetadata.open(data);
    },
    getMetadatadetail(data) {
      // console.log("TestDetail")
      // console.log(data);

      this.axios
        .post(process.env.VUE_APP_API_BACKEND + "/showMetadata", {
          source_id: data,
        })
        .then((response) => {
          // var data = response.data.data.organize;
          // var tmp_arr = [];
          // this.api_data = response.data.data;
          this.metadata = response.data;
          log;
        });
    },
    getCategoryByUser() {
      var user = Encode.encode(JSON.stringify(this.userData));
      this.axios
        .post(process.env.VUE_APP_API_BACKEND + "/getCategoryByUser", {
          user: user,
        })
        .then((response) => {
          // console.log(response.data.data);
          this.category = response.data.data;
        });
    },
    Tableipad() {
      this.Widthipad = window.screen.availWidth;
      // console.log(this.Widthipad);
    },
    toPathSource(text) {
      //  console.log("dash2");
      // console.log(text);
      var nametext = "";
      var textname = text.split(" ");
      for (let i = 0; i < textname.length; i++) {
        nametext = nametext + textname[i];
      }
      // //console.log(this.data);
      // //console.log(nametext);
      if (this.userData) {
        let routeData = this.$router.resolve(`/view/dashboard/${nametext}`);
        window.open(routeData.href);
      } else {
        this.$swal("Please login", "", "warning");
      }
    },

    pathUrl(param) {
      var name = param.split("#");
      return name[0];
    },
    searchDataHomeTable(searchTxt) {
      if (searchTxt !== "None") {
        this.setDataSearch(searchTxt.result);
      } else {
        this.getDataExportExcel();
      }
    },
    test(index) {
      this.checkIdSubCate = index;
      return index;
    },
    searchTable(searchTxt) {
      if (searchTxt !== "None") {
        this.setDataSearch(searchTxt.result);
      } else {
        this.getDataExportExcel();
      }
    },
    setDataSearch(data) {
      this.filterBySearch = d3
        .nest()
        .key((d) => d.sub_category_name)
        .entries(data);
    },

    getUrl() {
      if (this.userData) {
        var user = Encode.encode(JSON.stringify(this.userData));
        this.axios
          .post(process.env.VUE_APP_API_BACKEND + "/getCategoryByUser", {
            user: user,
          })
          .then((response) => {
            this.category = response.data.data;
            var param = window.location.href;
            param = decodeURIComponent((param + "").replace(/\+/g, "%20"));
            var name = param.split("/opendata/");
            // console.log(this.category.length);
            for (var i = 0; i < this.category.length; i++) {
              var check = this.pathUrl(name[1]);
              // console.log(check);
              if (this.category[i].name === check) {
                this.nameCategory = this.category[i].name;
                this.id = this.category[i].category_id;
                // console.log(this.id);
                // this.panel[i] = true
                // this.getDataExportExcel()
              }
            }
            this.getDataExportExcel();
            // this.checkPanel = this.panel
            // this.getDataCategory()
          });
      } else {
        var user_id = Encode.encode(JSON.stringify({ user_id: "nologin" }));
        this.axios
          .post(process.env.VUE_APP_API_BACKEND + "/getCategoryByUser", {
            // 'user': user
            user: user_id,
          })
          .then((response) => {
            this.category = response.data.data;
            var param = window.location.href;
            param = decodeURIComponent((param + "").replace(/\+/g, "%20"));
            var name = param.split("/opendata/");
            // console.log(this.category.length);
            for (var i = 0; i < this.category.length; i++) {
              var check = this.pathUrl(name[1]);
              // console.log(check);
              if (this.category[i].name === check) {
                this.nameCategory = this.category[i].name;
                this.id = this.category[i].category_id;
                // console.log(this.id);
                // this.panel[i] = true
                // this.getDataExportExcel()
              }
            }
            this.getDataExportExcel();
            // this.checkPanel = this.panel
            // this.getDataCategory()
          });
      }
    },

    sendText(key) {
      window.scrollTo(0, 400);
      if (this.id !== key.category_id) {
        for (var i = 0; i < this.category.length; i++) {
          if (this.category[i].id === key.category_id) {
            this.$router.push(`/opendata/${this.category[i].name}`);
            this.id = key.category_id;
            this.getDataExportExcel();
          }
        }
      } else {
        this.getDataExportExcel();
      }
    },
    loadFile(link) {
      window.location.assign(link);
    },

    downloadFileMongo(item) {
      // console.log("xlxs");
      if (item.file_name !== "" && item.mongo_file_id_excel !== "") {
        var user_id = Encode.encode(this.userData.user_id);
        this.loadFile(
          process.env.VUE_APP_API_BACKEND +
            "/file/downloadFileMongo/" +
            item.file_name +
            ".xlsx?file_id=" +
            item.mongo_file_id_excel +
            "&user_id===" +
            user_id +
            "&firstname=" +
            this.userData.firstname +
            "&lastname=" +
            this.userData.lastname +
            "&file_type=excel"
        );
      } else {
        this.$swal("No file", "", "error");
      }
    },
    downloadFileMetadata(item) {
      if (item.file_name !== "" && item.mongo_file_id_metadata !== "") {
        this.loadFile(
          process.env.VUE_APP_API_BACKEND +
            "/file/downloadFileMetadataMongo/" +
            item.file_name +
            ".xlsx?file_id=" +
            item.mongo_file_id_metadata
        );
      } else {
        this.$swal("No file", "", "error");
      }
    },
    downloadFileMongoCsv(item) {
      if (item.file_name !== "" && item.mongo_file_id_csv !== "") {
        var user_id = Encode.encode(this.userData.user_id);
        this.loadFile(
          process.env.VUE_APP_API_BACKEND +
            "/file/downloadFileMongo/" +
            item.file_name +
            ".zip?file_id=" +
            item.mongo_file_id_csv +
            "&user_id===" +
            user_id +
            "&firstname=" +
            this.userData.firstname +
            "&lastname=" +
            this.userData.lastname +
            "&file_type=csv"
        );
      } else {
        this.$swal("No file", "", "error");
      }
    },

    setData() {
      this.filterBySearch = d3
        .nest()
        .key((d) => d.sub_category_name)
        .entries(this.data);
    },
    checkUserLoginFavorite(item) {
      this.$cookies.get("consentraot");
      // //console.log(this.$cookies.get("consentraot") )
      if (this.$cookies.get("consentraot") === "no") {
        this.$swal(
          '<p class="font-text">กรุณากด "ยอมรับ" นโยบายการใช้คุกกี้ด้านล่าง และlog-in เข้าใช้งานก่อน</p>',
          "",
          "warning"
        );
      } else if (this.userData) {
        this.addNewFavorite(item);
      } else {
        this.$swal("Please login", "", "warning");
      }
    },
    addNewFavorite(item) {
      //   //console.log(this.userData.user_id);
      //   //console.log(item.file_name);
      this.axios
        .post(process.env.VUE_APP_API_BACKEND + "/addNewFavorite", {
          user_id: this.userData.user_id,
          file_name: item,
        })
        .then((response) => {
          // console.log(response);
        });
    },
    open(key) {
      this.mini = key;
    },
    checkUserLoginCsv(item) {
      this.$cookies.get("consentraot");
      // //console.log(this.$cookies.get("consentraot") )
      if (this.$cookies.get("consentraot") === "no") {
        this.$swal(
          '<p class="font-text">กรุณากด "ยอมรับ" นโยบายการใช้คุกกี้ด้านล่าง และlog-in เข้าใช้งานก่อน</p>',
          "",
          "warning"
        );
      } else if (this.userData) {
        this.checkPermissionDownloadCsv(item);
      } else {
        this.$swal("Please login", "", "warning");
      }
    },
    checkUserLoginExcel(item) {
      if (this.$cookies.get("consentraot") === "no") {
        this.$swal(
          '<p class="font-text">กรุณากด "ยอมรับ" นโยบายการใช้คุกกี้ด้านล่าง และlog-in เข้าใช้งานก่อน</>',
          "",
          "warning"
        );
      } else if (this.userData) {
        this.checkPermissionDownloadExcel(item);
      } else {
        this.$swal("Please login", "", "warning");
      }
    },
    checkPermissionDownloadExcel(item) {
      this.axios
        .post(process.env.VUE_APP_API_BACKEND + "/checkPermitDownloadfile", {
          user_id: this.userData.user_id,
          file_name: item.file_name,
        })
        .then((response) => {
          if (response.data.status === "download") {
            this.downloadFileMongo(item);
          } else {
            this.$swal("Please contact Admin", "warning");
          }
        });
    },
    checkPermissionDownloadCsv(item) {
      this.axios
        .post(process.env.VUE_APP_API_BACKEND + "/checkPermitDownloadfile", {
          user_id: this.userData.user_id,
          file_name: item.file_name,
        })
        .then((response) => {
          if (response.data.status === "download") {
            this.downloadFileMongoCsv(item);
          } else {
            this.$swal("Please contact Admin", "warning");
          }
        });
    },
    // getDataExportExcel() {
    //   this.isLoading = true;
    //   // Reset data array
    //   this.data = [];

    //   // Encode user data or default to "nologin" user_id if user data is not available
    //   const user = this.userData
    //     ? Encode.encode(JSON.stringify(this.userData))
    //     : Encode.encode(JSON.stringify({ user_id: "nologin" }));

    //   // Post request to fetch data
    //   this.axios
    //     .post(process.env.VUE_APP_API_BACKEND + "/getDataSubCategoryMenu", {
    //       category_id: this.id,
    //       Level_Master_id: this.userData ? this.userData.Level_Master_id : 1,
    //       previlage_id: this.userData ? this.userData.previlage_id : 0,
    //       user
    //     })
    //     .then(response => {
    //       // Concatenate response data to this.data
    //       this.data = response.data.reduce((acc, item) => acc.concat(item), []);
    //       console.log("reduce",this.data);

    //       // Set data after concatenation
    //       this.setData();

    //       this.isLoading = false;
    //     })
    //     .catch(error => {
    //       console.error("Error fetching data:", error);

    //       this.isLoading = false;
    //     });
    // },

    getDataExportExcel() {
      this.isLoading = true;
      this.error = null; // รีเซ็ต error
      // Reset data array
      this.data = [];

      // Encode user data or default to "nologin" user_id if user data is not available
      const user = this.userData
        ? Encode.encode(JSON.stringify(this.userData))
        : Encode.encode(JSON.stringify({ user_id: "nologin" }));

      // Post request to fetch data
      this.axios
        .post(process.env.VUE_APP_API_BACKEND + "/getDataSubCategoryMenu", {
          category_id: this.id,
          Level_Master_id: this.userData ? this.userData.Level_Master_id : 1,
          previlage_id: this.userData ? this.userData.previlage_id : 0,
          user,
        })
        .then((response) => {
          if (Array.isArray(response.data)) {
            // Concatenate response data to this.data if it's an array
            this.data = response.data.reduce(
              (acc, item) => acc.concat(item),
              []
            );
          } else {
            console.error(
              "Error: response.data is not an array",
              response.data
            );
            this.error = "Invalid response data"; // ตั้งค่า error
          }
          console.log("reduce", this.data);

          // Set data after concatenation
          this.setData();

          this.isLoading = false;
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          this.error = "Error fetching data"; // ตั้งค่า error
          this.isLoading = false;
        });
    },

    // getDataExportExcel() {
    //   // เรียกข้อมูลลงตาราง
    //   this.data = []
    //   if (this.userData) {
    //     var user = Encode.encode(JSON.stringify(this.userData))
    //     this.axios
    //       .post(process.env.VUE_APP_API_BACKEND + '/getDataSubCategoryMenu', {
    //         category_id: this.id,
    //         Level_Master_id: this.userData.Level_Master_id,
    //         previlage_id: this.userData.previlage_id,
    //         // user: this.userData.user_id
    //         user: user
    //       })
    //       .then(response => {
    //         // console.log(response.data);

    //         for (var i = 0; i < response.data.length; i++) {
    //           // console.log(response.data);
    //           // console.log(this.data);
    //           this.data = this.data.concat(response.data[i])
    //           // console.log(this.data[i].favorite);
    //         }
    //         this.setData()
    //       })
    //   } else {
    //     var user_id = Encode.encode(
    //       JSON.stringify({ 'user_id': 'nologin' }))
    //     this.axios
    //       .post(process.env.VUE_APP_API_BACKEND + '/getDataSubCategoryMenu', {
    //         category_id: this.id,
    //         Level_Master_id: 1,
    //         previlage_id: 0,
    //         user: user_id
    //       })
    //       .then(response => {
    //         // console.log(response);

    //         for (var i = 0; i < response.data.length; i++) {
    //           this.data = this.data.concat(response.data[i])
    //         }
    //         this.setData()
    //       })
    //   }
    // },

    getDataExportMetadata(id) {
      this.axios
        .post(process.env.VUE_APP_API_BACKEND + "/getDataExportMetadata", {
          source_id: id,
        })
        .then((response) => {
          console.log(response.data);
          this.$cookies.get("consentraot");
          console.log(this.$cookies.get("consentraot"));
          if (this.$cookies.get("consentraot") === "no") {
            this.$swal(
              '<p class="font-text">กรุณากด "ยอมรับ" นโยบายการใช้คุกกี้ด้านล่างก่อน download</p>',
              "",
              "warning"
            );
          } else {
            this.downloadFileMetadata(response.data[0]);
          }
        });
    },

    downloadFileMongocsv(item) {
      this.loadFile(item);
    },
    nolinkapi() {
      this.$swal("No Link Api");
    },
    nolinkdashboard() {
      this.$swal("No Link Dashboard");
    },
    nofile() {
      this.$swal("No File");
    },
    linkapi(x) {
      window.location.assign(x);
    },
    // getKey() {
    //   // console.log("5555555")
    //   // var user = Encode.encode(JSON.stringify(this.userDataProfile));
    //   this.axios
    //     .get(
    //       process.env.VUE_APP_API_BACKEND +
    //         "/generateConsumerJWT/" +
    //         this.userDataProfile.username,
    //       {
    //         // user_id: data.user_id
    //         user_id: Encode.encode(this.userDataProfile.user_id)
    //       }
    //     )
    //     .then(response => {
    //       this.Keyapi = response.data;
    //       // console.log(response.data)
    //     });
    // },

    // Getlink(link) {
    //   if (this.userData) {
    //     let linkapi = link.file_name;
    //     let routeData = this.$router.resolve(`/view/api/${linkapi}`);
    //     window.open(routeData.href);
    //   } else {
    //     this.$swal("Please login", "", "warning");
    //   }
    // },

    Getlink(link) {
      if (this.userData) {
        const linkapi = link.file_name;

        // เรียกใช้ฟังก์ชันเพื่อดึงลิงก์ API
        this.Getlinkapi(linkapi);
      } else {
        this.$swal("Please login", "", "warning");
      }
    },

    Getlinkapi(linkapi) {
      this.axios
        .post(process.env.VUE_APP_API_BACKEND + "/apiList", {
          file_name: linkapi,
        })
        .then((response) => {
          this.loading = true;

          // ดึงลิงก์ API จากการตอบกลับของ API
          this.apiLink = response.data.api_document_URL;

          // แสดง popup
          this.showApiPopup = true;
        })
        .catch((error) => {
          console.error(error);
          this.$swal("Failed to retrieve API link", "", "error");
        })
        .finally(() => {
          this.loading = false;
        });
    },

    closeApiPopup() {
      this.showApiPopup = false; // ซ่อน popup เมื่อกดปุ่ม Close
    },
  },
};
</script>
<style lang="css" scoped="">
.text-link {
  color: blue; /* สีของลิงก์ */
  text-decoration: underline; /* ให้มีเส้นใต้ข้อความ */
  cursor: pointer; /* เปลี่ยน cursor เมาส์เป็นลูกศร */
}
.api-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
}

.api-table th,
.api-table td {
  border: 1px solid #ddd;
  padding: 8px;
}

.api-table th {
  background-color: #f2f2f2;
  text-align: left;
}
/* @import url("https://fonts.googleapis.com/css?family=Kanit&display=swap"); */
.table-center {
  word-break: break-word;
  font-size: 13px;
  display: block;
  margin: auto;
}

.checkbox {
  margin-top: 0px;
  padding-top: 0px;
  /* display: block; */
  /* margin: 0 auto; */
  padding-left: 30px;
}

.font-text {
  /* font-family: "Kanit", sans-serif; */
  font-size: 28px;
}

/* ::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: #ccc;
  border-radius: 10px;
} */

.tableFixHead {
  overflow-y: auto;
  max-height: 620px;
}

.tableFixHead th {
  position: sticky;
  top: 0;
}

table {
  border-collapse: collapse;
  width: 100%;
  table-layout: auto !important;
}

.imageSize-metaData {
  max-width: 35px;
  max-height: 35px;
  width: 100%;
  height: auto;
}

.imageSize-excel {
  max-width: 35px;
  max-height: 35px;
  width: 100%;
  height: auto;
}

.imageSize-csv {
  max-width: 35px;
  max-height: 35px;
  width: 100%;
  height: auto;
}

::-webkit-scrollbar {
  min-height: 450px;
}

.headertable {
  margin: 10px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between; /* กระจายพื้นที่ให้เต็มแถว */
  overflow-x: auto; /* เพิ่มการเลื่อนแนวนอนถ้าจำเป็น */
}
.headertable > .v-flex {
  flex: 1; /* ให้แต่ละคอลัมน์มีความกว้างที่เท่ากัน */
  box-sizing: border-box; /* ทำให้การคำนวณขนาดรวมถึง padding และ border */
  padding: 8px; /* เพิ่มระยะห่างในแต่ละคอลัมน์ */
}

.colortr:nth-child(odd) {
  background-color: #ffffff !important;
}

.colortr:nth-child(even) {
  background-color: #f5f5f5 !important;
}

.colortr {
  padding: 5px;
}

.tb-header {
  background-color: #10316b;
  color: #ffffff;
  width: 100%;
  font-weight: 500;
  font-size: 15px;
}

.text-subcategory {
  font-size: 16px;
  font-weight: 700;
  width: 100%;
  text-align: left;
  padding: 8px 0 8px 10px !important;
  color: #015779;
  background-color: #ffffff;
}

.td-cursor {
  cursor: pointer;
}

.td-cursor:hover {
  background-color: #d6d9d0;
  /* width: 50px; */
}

.pp-5 {
  padding: 5px;
  font-size: 13px;
}

@media (max-width: 1024px) {
  .checkbox {
    margin-top: 0px;
    padding-top: 0px;
    /* display: block; */
    /* margin: 0 auto; */
    padding-left: 20px;
  }

  .pp-5 {
    padding: 5px;
    font-size: 12px;
  }

  .headertable {
    margin: 10px;
    font-size: 12px;
    font-weight: 500;
  }
}

@media (max-width: 768px) {
  .pp-5 {
    padding: 5px;
    font-size: 12px;
  }

  .checkbox {
    margin-top: 0px;
    padding-top: 0px;
    /* display: block; */
    /* margin: 0 auto; */
    padding-left: 20px;
  }

  .tb-header {
    background-color: #01162f;
    color: #ffffff;
    width: 100%;
    font-weight: 500;
    font-size: 12px;
  }

  .imageSize-metaData {
    max-width: 25px;
    max-height: 25px;
    width: 100%;
    height: auto;
  }

  .imageSize-excel {
    max-width: 25px;
    max-height: 25px;
    width: 100%;
    height: auto;
  }

  .imageSize-csv {
    max-width: 25px;
    max-height: 25px;
    width: 100%;
    height: auto;
  }

  .pp-5 {
    padding: 5px;
    font-size: 10px;
  }

  .text-subcategory {
    font-size: 14px;
    font-weight: 600;
    width: 100%;
    text-align: left;
    padding: 8px 0 8px 10px !important;
    color: #77933c;
    background-color: #ffffff;
  }

  .checkbox {
    margin-top: 0px;
    padding-top: 0px;
    /* display: block; */
    /* margin: 0 auto; */
    padding-left: 0px;
  }

  .headertable {
    margin: 10px;
    font-size: 10px;
  }
}

@media (width: 1194px) {
  .ipadpro {
    padding-left: 75px;
  }
}

.table-ipad {
  word-break: break-word;
  font-size: 12px;
  display: block;
  margin: auto;
}

.text-center {
  text-align: center;
}

.text-subcategory-ipad {
  font-size: 12px;
  font-weight: 700;
  width: 100%;
  text-align: left;
  padding: 8px 0 8px 10px !important;
  color: #77933c;
  background-color: #ffffff;
}

.font-meta {
  font-size: 30px !important;
}

.meta {
  background-color: #2e3092;
  color: #a35c1c;
  width: 100%;
  font-weight: 600;
  font-size: 12px;
}

.company-name {
  /* font-family: "Kanit", sans-serif; */
  margin-bottom: 0px;
  font-size: 16px;
  font-weight: 500;
  color: rgba(0, 0, 0, 1);
  padding-left: 15px;
  /* font-size: 28px; */
}

.dialog-content {
  padding: 20px;
}

@media (max-width: 600px) {
  .dialog-content {
    padding: 10px;
  }
  .headertable {
    flex-wrap: nowrap; /* ทำให้คอลัมน์ไม่แยกแถวกัน */
    overflow-x: auto; /* เพิ่มเลื่อนแนวนอนถ้าคอลัมน์เกินขนาดหน้าจอ */
  }

  .headertable > .v-flex {
    text-align: center; /* จัดข้อความให้อยู่ตรงกลาง */
  }
}

@media (max-width: 400px) {
  .dialog-content {
    padding: 5px;
  }
}

.v-dialog__content {
  max-width: 100%;
  margin: 0 auto;
  border-radius: 8px;
  /* box-shadow: 0 2px 10px rgba(0, 0, 0, 0.15); */
}

.v-toolbar {
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
}

.v-toolbar-title {
  font-size: 18px;
  font-weight: bold;
}

.v-card {
  margin-bottom: 20px;
}

.color-black {
  color: #000;
}

.font-contact {
  font-family: Arial, sans-serif;
  color: #fffefe;
}

.font-weight-bold {
  font-weight: bold;
}

.company-name {
  margin: 10px 0;
  font-size: 14px;
}

.text-left {
  text-align: left;
}

/* .custom-popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); 
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.custom-popup {
  background: white;
  border-radius: 8px;
  padding: 20px;
  max-width: 600px;
  width: 90%;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
} */

.custom-popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* ให้พื้นหลังโปร่งใส */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.custom-popup {
  background: white;
  border-radius: 8px;
  padding: 20px;
  max-width: 800px;
  width: 90%;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  overflow: hidden; /* ป้องกันการ์ดล้นออกมา */
}

/* ปรับขนาดข้อความและขนาดการ์ดให้เล็กลงบนหน้าจอขนาดเล็ก */
@media only screen and (max-width: 600px) {
  .custom-popup {
    padding: 15px;
  }

  .v-card-title {
    font-size: 1.25rem; /* ลดขนาด title */
  }

  .v-card-text p {
    font-size: 0.9rem; /* ลดขนาดข้อความในการ์ด */
  }
}
.api-url-container {
  overflow-wrap: break-word; /* ให้ข้อความตัดบรรทัดเมื่อถึงขอบเขต */
  max-width: 100%; /* จำกัดความกว้าง */
}
</style>
