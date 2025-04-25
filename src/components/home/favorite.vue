<template>
  <v-container style="height: 100%">
    <h1 class="font-contact font-weight-bold" style="color: #0165ba; margin-top: 45px">
      {{ $t("favorite") }}
    </h1>
    <v-divider></v-divider><br />
    <div class="tableFixHead">
      <table>
        <thead class="tb-header-home">
          <tr class="tb-header-favorite" valign="middle">
            <th class="font-title" width="50%">{{ $t("reportname") }}</th>
            <!-- <th class="font-title" width="5%">API</th> -->
            <th class="font-title" width="10%">{{ $t("dashboard") }}</th>
            <th class="font-title" width="10%">{{ $t("metadata") }}</th>
            <th class="font-title" width="10%">{{ $t("api") }}</th>
            <!-- <th colspan="2" class="font-title" width="20%">File</th> -->
            <!-- <th class="font-title" width="10%">Frequency</th> -->
            <!-- <th class="font-title" width="10%">Release Date</th> -->
            <th class="font-title" width="10%">{{ $t("delete") }}</th>
          </tr>
        </thead>
        <tr valign="middle" class="tb-row-orange colortr" v-for="itemfavorite in data">
          <td>{{ itemfavorite.export_excel_name }}</td>
          <!-- <td align="center" class="hover-img">
            <div v-if="itemfavorite.api_document_URL == null" @click="nolinkapi()">
              <img class="imageSize" src="/opendataIcon/icon/apib&w.png" alt="fireSpot" />
            </div>
            <div v-else @click="Getlink(itemfavorite)">
              <img class="imageSize" src="/opendataIcon/icon/api.png" alt="fireSpot" />
            </div>
          </td> -->
          <td align="center" class="hover-img">
            <div v-if="itemfavorite.Link_name == null" @click="nolinkdashboard()">
              <img
                class="imageSize"
                src="/opendataIcon/icon/dashboardbb&w.png"
                alt="fireSpot"
              />
            </div>
            <div v-else @click="checkUserLoginDashbord(itemfavorite.source_id)">
              <img
                class="imageSize"
                src="/opendataIcon/icon/dashboard.png"
                alt="fireSpot"
              />
            </div>
          </td>

          <td align="center" class="hover-img">
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
                  @click="getMetadataDetail(itemfavorite.source_id)"
                >
                  <img
                    class="imageSize"
                    src="/opendataIcon/icon/metaData.png"
                    alt="fireSpot"
                  />
                </v-btn>
              </template>
              <v-card>
                <v-toolbar dark color="#0494E9">
                  <v-toolbar-title>รายละเอียดข้อมูล</v-toolbar-title>
                  <v-spacer></v-spacer>
                  <v-toolbar-items></v-toolbar-items>
                </v-toolbar>

                <v-container
                  fluid
                  v-for="(metadata, index) in metadataDetail"
                  :key="index"
                >
                  <v-layout row wrap align-start justify-center>
                    <v-flex xs12 sm6 md6>
                      <v-card tile flat dark color="#0494E9">
                        <h2 class="text-center font-contact font-weight-bold color-white">
                          หัวข้อ
                        </h2>
                      </v-card>
                    </v-flex>
                    <v-flex xs12 sm6 md6>
                      <v-card tile flat dark color="#0494E9">
                        <h2 class="text-center font-contact font-weight-bold color-white">
                          ค่า
                        </h2>
                      </v-card>
                    </v-flex>
                  </v-layout>
                  <v-layout row wrap align-start justify-center>
                    <v-flex xs12 sm6 md6>
                      <v-card tile flat color="grey lighten-4">
                        <p class="company-name">* ประเภทชุดข้อมูล</p>
                      </v-card>
                    </v-flex>
                    <v-flex xs12 sm6 md6>
                      <v-card tile flat color="grey lighten-4">
                        <p class="company-name text-left">{{ metadata.data_type }}</p>
                      </v-card>
                    </v-flex>
                  </v-layout>
                  <v-layout row wrap align-start justify-center>
                    <v-flex xs12 sm6 md6 dense outlined>
                      <v-card tile flat color="white">
                        <p class="company-name">รหัสชุดข้อมูล</p>
                      </v-card>
                    </v-flex>
                    <v-flex xs12 sm6 md6 dense outlined>
                      <v-card tile flat color="white">
                        <p class="company-name text-left">{{ metadata.source_id }}</p>
                      </v-card>
                    </v-flex>
                  </v-layout>
                  <v-layout row wrap align-start justify-center>
                    <v-flex xs12 sm6 md6 dense outlined>
                      <v-card tile flat color="grey lighten-4">
                        <p class="company-name">ชื่อชุดข้อมูล</p>
                      </v-card>
                    </v-flex>
                    <v-flex xs12 sm6 md6 dense outlined>
                      <v-card tile flat color="grey lighten-4">
                        <p class="company-name text-left">
                          {{ metadata.export_excel_name }}
                        </p>
                      </v-card>
                    </v-flex>
                  </v-layout>
                  <v-layout row wrap align-start justify-center>
                    <v-flex xs12 sm6 md6>
                      <v-card tile flat color="white">
                        <p class="company-name">รายละเอียด</p>
                      </v-card>
                    </v-flex>
                    <v-flex xs12 sm6 md6>
                      <v-card tile flat color="white">
                        <p class="company-name text-left">{{ metadata.description }}</p>
                      </v-card>
                    </v-flex>
                  </v-layout>
                  <v-layout row wrap align-start justify-center>
                    <v-flex xs12 sm6 md6>
                      <v-card tile flat color="grey lighten-4">
                        <p class="company-name">* หน่วยงานเจ้าของข้อมูล</p>
                      </v-card>
                    </v-flex>
                    <v-flex xs12 sm6 md6>
                      <v-card tile flat color="grey lighten-4">
                        <p class="company-name text-left">
                          {{ metadata.organization.org_name }}
                        </p>
                      </v-card>
                    </v-flex>
                  </v-layout>
                  <v-layout row wrap align-start justify-center>
                    <v-flex xs12 sm6 md6>
                      <v-card tile flat color="white">
                        <p class="company-name">* ชื่อเจ้าของข้อมูล</p>
                      </v-card>
                    </v-flex>
                    <v-flex xs12 sm6 md6>
                      <v-card tile flat color="white">
                        <p class="company-name text-left">
                          {{ metadata.data_ower_name }}
                        </p>
                      </v-card>
                    </v-flex>
                  </v-layout>
                  <v-layout row wrap align-start justify-center>
                    <v-flex xs12 sm6 md6>
                      <v-card tile flat color="grey lighten-4">
                        <p class="company-name">* สาย/ฝ่ายงาน</p>
                      </v-card>
                    </v-flex>
                    <v-flex xs12 sm6 md6>
                      <v-card tile flat color="grey lighten-4">
                        <p class="company-name text-left">
                          {{ metadata.organization.org_name }}
                        </p>
                      </v-card>
                    </v-flex>
                  </v-layout>
                  <v-layout row wrap align-start justify-center>
                    <v-flex xs12 sm6 md6>
                      <v-card tile flat color="white">
                        <p class="company-name">* ด้าน</p>
                      </v-card>
                    </v-flex>
                    <v-flex xs12 sm6 md6>
                      <v-card tile flat color="white">
                        <p class="company-name text-left">{{ metadata.agency }}</p>
                      </v-card>
                    </v-flex>
                  </v-layout>
                  <v-layout row wrap align-start justify-center>
                    <v-flex xs12 sm6 md6>
                      <v-card tile flat color="grey lighten-4">
                        <p class="company-name">* บริกรข้อมูล</p>
                      </v-card>
                    </v-flex>
                    <v-flex xs12 sm6 md6>
                      <v-card tile flat color="grey lighten-4">
                        <p class="company-name text-left">
                          {{ metadata.information_waiter }}
                        </p>
                      </v-card>
                    </v-flex>
                  </v-layout>
                  <v-layout row wrap align-start justify-center>
                    <v-flex xs12 sm6 md6>
                      <v-card tile flat color="white">
                        <p class="company-name">* ชื่อผู้ติดต่อ</p>
                      </v-card>
                    </v-flex>
                    <v-flex xs12 sm6 md6>
                      <v-card tile flat color="white">
                        <p class="company-name text-left">
                          {{ metadata.contactor_name }}
                        </p>
                      </v-card>
                    </v-flex>
                  </v-layout>
                  <v-layout row wrap align-start justify-center>
                    <v-flex xs12 sm6 md6>
                      <v-card tile flat color="grey lighten-4">
                        <p class="company-name">* อีเมลผู้ติดต่อ</p>
                      </v-card>
                    </v-flex>
                    <v-flex xs12 sm6 md6>
                      <v-card tile flat color="grey lighten-4">
                        <p class="company-name text-left">
                          {{ metadata.contactor_email }}
                        </p>
                      </v-card>
                    </v-flex>
                  </v-layout>
                  <v-layout row wrap align-start justify-center>
                    <v-flex xs12 sm6 md6>
                      <v-card tile flat color="white">
                        <p class="company-name">* สถานะข้อมูลส่วนบุคคล</p>
                      </v-card>
                    </v-flex>
                    <v-flex xs12 sm6 md6>
                      <v-card tile flat color="white">
                        <p class="company-name text-left">
                          {{ metadata.sensitive_data }}
                        </p>
                      </v-card>
                    </v-flex>
                  </v-layout>
                  <v-layout row wrap align-start justify-center>
                    <v-flex xs12 sm6 md6>
                      <v-card tile flat color="grey lighten-4">
                        <p class="company-name">* ระดับชั้นความลับข้อมูล</p>
                      </v-card>
                    </v-flex>
                    <v-flex xs12 sm6 md6>
                      <v-card tile flat color="grey lighten-4">
                        <p class="company-name text-left">{{ metadata.data_privacy }}</p>
                      </v-card>
                    </v-flex>
                  </v-layout>
                  <v-layout row wrap align-start justify-center>
                    <v-flex xs12 sm6 md6>
                      <v-card tile flat color="white">
                        <p class="company-name">* หมวดหมู่ข้อมล</p>
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
                        <p class="company-name">* วัตถุประสงค์</p>
                      </v-card>
                    </v-flex>
                    <v-flex xs12 sm6 md6>
                      <v-card tile flat color="grey lighten-4">
                        <p class="company-name text-left">{{ metadata.objective }}</p>
                      </v-card>
                    </v-flex>
                  </v-layout>
                  <v-layout row wrap align-start justify-center>
                    <v-flex xs12 sm6 md6>
                      <v-card tile flat color="white">
                        <p class="company-name">* หน่วยความถี่ของการปรับปรุงข้อมูล</p>
                      </v-card>
                    </v-flex>
                    <v-flex xs12 sm6 md6>
                      <v-card tile flat color="white">
                        <p class="company-name text-left">{{ metadata.frequency }}</p>
                      </v-card>
                    </v-flex>
                  </v-layout>
                  <v-layout row wrap align-start justify-center>
                    <v-flex xs12 sm6 md6>
                      <v-card tile flat color="grey lighten-4">
                        <p class="company-name">
                          ค่าความถี่ของการปรับปรุงข้อมูล (ความถี่น้อยที่สุด)
                        </p>
                      </v-card>
                    </v-flex>
                    <v-flex xs12 sm6 md6>
                      <v-card tile flat color="grey lighten-4">
                        <p class="company-name text-left">
                          {{ metadata.frequency_unit }}
                        </p>
                      </v-card>
                    </v-flex>
                  </v-layout>
                  <v-layout row wrap align-start justify-center>
                    <v-flex xs12 sm6 md6>
                      <v-card tile flat color="white">
                        <p class="company-name">* ระยะเวลาการเก็บรักษา</p>
                      </v-card>
                    </v-flex>
                    <v-flex xs12 sm6 md6>
                      <v-card tile flat color="white">
                        <p class="company-name text-left">
                          {{ metadata.storage_period }}
                        </p>
                      </v-card>
                    </v-flex>
                  </v-layout>
                  <v-layout row wrap align-start justify-center>
                    <v-flex xs12 sm6 md6>
                      <v-card tile flat color="grey lighten-4">
                        <p class="company-name">* ขอบเขตเชิงภูมิศาสตร์</p>
                      </v-card>
                    </v-flex>
                    <v-flex xs12 sm6 md6>
                      <v-card tile flat color="grey lighten-4">
                        <p class="company-name text-left">{{ metadata.geo_coverage }}</p>
                      </v-card>
                    </v-flex>
                  </v-layout>
                  <v-layout row wrap align-start justify-center>
                    <v-flex xs12 sm6 md6>
                      <v-card tile flat color="white">
                        <p class="company-name">* แหล่งที่มา</p>
                      </v-card>
                    </v-flex>
                    <v-flex xs12 sm6 md6>
                      <v-card tile flat color="white">
                        <p class="company-name text-left">{{ metadata.data_source }}</p>
                      </v-card>
                    </v-flex>
                  </v-layout>
                  <v-layout row wrap align-start justify-center>
                    <v-flex xs12 sm6 md6>
                      <v-card tile flat color="grey lighten-4">
                        <p class="company-name">* ขอบเขตแหล่งที่มา</p>
                      </v-card>
                    </v-flex>
                    <v-flex xs12 sm6 md6>
                      <v-card tile flat color="grey lighten-4">
                        <p class="company-name text-left">{{ metadata.source_scope }}</p>
                      </v-card>
                    </v-flex>
                  </v-layout>
                  <v-layout row wrap align-start justify-center>
                    <v-flex xs12 sm6 md6>
                      <v-card tile flat color="white">
                        <p class="company-name">* รูปแบบการเก็บข้อมูล</p>
                      </v-card>
                    </v-flex>
                    <v-flex xs12 sm6 md6>
                      <v-card tile flat color="white">
                        <p class="company-name text-left">{{ metadata.data_storage }}</p>
                      </v-card>
                    </v-flex>
                  </v-layout>
                  <!-- <v-layout row wrap align-start justify-center>
                      <v-flex xs12 sm6 md6>
                        <v-card tile flat color="white">
                          <p class="company-name">หมวดหมู่ข้อมูลตามธรรมาภิบาลข้อมูลภาครัฐ</p>
                        </v-card>
                      </v-flex>
                      <v-flex xs12 sm6 md6>
                        <v-card tile flat color="white">
                          <p class="company-name text-left">{{ metadata.topic_gorvernance }}</p>
                        </v-card>
                      </v-flex>
                    </v-layout> -->
                  <v-layout row wrap align-start justify-center>
                    <v-flex xs12 sm6 md6>
                      <v-card tile flat color="grey lighten-4">
                        <p class="company-name">สัญญาอนุญาตให้ใช้ข้อมูล</p>
                      </v-card>
                    </v-flex>
                    <v-flex xs12 sm6 md6>
                      <v-card tile flat color="grey lighten-4">
                        <p class="company-name text-left">{{ metadata.data_license }}</p>
                      </v-card>
                    </v-flex>
                  </v-layout>
                  <v-layout row wrap align-start justify-center>
                    <v-flex xs12 sm6 md6>
                      <v-card tile flat color="white">
                        <p class="company-name">เงื่อนไขในการเข้าถึงข้อมูล</p>
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
                  <!-- <v-layout row wrap align-start justify-center>
                      <v-flex xs12 sm6 md6>
                        <v-card tile flat color="grey lighten-4">
                          <p class="company-name">ผู้สนับสนุนหรือผู้ร่วมดำเนินการ</p>
                        </v-card>
                      </v-flex>
                      <v-flex xs12 sm6 md6>
                        <v-card tile flat color="grey lighten-4">
                          <p class="company-name text-left"> {{ metadata.supporter }}</p>
                        </v-card>
                      </v-flex>
                    </v-layout> -->

                  <!-- <v-layout row wrap align-start justify-center>
                      <v-flex xs12 sm6 md6>
                        <v-card tile flat color="grey lighten-4">
                          <p class="company-name">หน่วยที่ย่อยที่สุดของการจัดเก็บข้อมูล</p>
                        </v-card>
                      </v-flex>
                      <v-flex xs12 sm6 md6>
                        <v-card tile flat color="grey lighten-4">
                          <p class="company-name text-left">{{ metadata.data_unit }}</p>
                        </v-card>
                      </v-flex>
                    </v-layout> -->
                  <!-- <v-layout row wrap align-start justify-center>
                      <v-flex xs12 sm6 md6>
                        <v-card tile flat color="white">
                          <p class="company-name">URL</p>
                        </v-card>
                      </v-flex>
                      <v-flex xs12 sm6 md6>
                        <v-card tile flat color="white">
                          <p class="company-name text-left"> {{ metadata.URL }}</p>
                        </v-card>
                      </v-flex>
                    </v-layout> -->
                  <!-- <v-layout row wrap align-start justify-center>
                      <v-flex xs12 sm6 md6>
                        <v-card tile flat color="grey lighten-4">
                          <p class="company-name">ภาษาที่ใช้</p>
                        </v-card>
                      </v-flex>
                      <v-flex xs12 sm6 md6>
                        <v-card tile flat color="grey lighten-4">
                          <p class="company-name text-left">{{ metadata.data_language }}</p>
                        </v-card>
                      </v-flex>
                    </v-layout> -->
                  <v-layout row wrap align-start justify-center>
                    <v-flex xs12 sm6 md6>
                      <v-card tile flat color="grey lighten-4">
                        <p class="company-name">วันที่เริ่มต้นสร้าง</p>
                      </v-card>
                    </v-flex>
                    <v-flex xs12 sm6 md6>
                      <v-card tile flat color="grey lighten-4">
                        <p class="company-name text-left">
                          {{ formatDate(metadata.create_at) }}
                        </p>
                      </v-card>
                    </v-flex>
                  </v-layout>
                  <v-layout row wrap align-start justify-center>
                    <v-flex xs12 sm6 md6>
                      <v-card tile flat color="white">
                        <p class="company-name">วันที่ปรับปรุงข้อมูลล่าสุด</p>
                      </v-card>
                    </v-flex>
                    <v-flex xs12 sm6 md6>
                      <v-card tile flat color="white">
                        <p class="company-name text-left">
                          {{ formatDate(metadata.modified_date) }}
                        </p>
                      </v-card>
                    </v-flex>
                  </v-layout>
                  <!-- <v-layout row wrap align-start justify-center>
                      <v-flex xs12 sm6 md6>
                        <v-card tile flat color="white">
                          <p class="company-name">ข้อมูลอ้างอิง</p>
                        </v-card>
                      </v-flex>
                      <v-flex xs12 sm6 md6>
                        <v-card tile flat color="white">
                          <p class="company-name text-left">{{ metadata.data_reference }}</p>
                        </v-card>
                      </v-flex>
                    </v-layout> -->
                </v-container>
              </v-card>
            </v-dialog>
          </td>
          <td>
            <div v-if="!itemfavorite.api_document_URL" @click="nolinkapi()">
              <img
                class="imageSize"
                src="/opendataIcon/icon/apib&w.png"
                alt="fireSpot1"
              />
            </div>
            <div v-else @click="Getlink(itemfavorite)">
              <img class="imageSize" src="/opendataIcon/icon/api.png" alt="fireSpot" />
            </div>
          </td>
          <!-- <td align="center" class="hover-img">
            <div v-if="
                itemfavorite.mongo_file_id_metadata == null ||
                  itemfavorite.mongo_file_id_metadata == ''
              " @click="nofile()">
              <img class="imageSize" src="/opendataIcon/icon/metaDatab&w.png" alt="fireSpot" />
            </div>
            <div v-else @click="getDataExportMetadata(itemfavorite.source_id)">
              <img class="imageSize" src="/opendataIcon/icon/metaData.png" alt="fireSpot" />
            </div>
          </td> -->

          <!-- <td align="center" class="hover-img">
            <div v-if="
                itemfavorite.mongo_file_id_excel == null ||
                  itemfavorite.mongo_file_id_excel == ''
              " @click="nofile()">
              <img class="imageSize" src="/opendataIcon/icon/excelb&w.png" alt="fireSpot" />
            </div>
            <div v-else @click="checkUserLoginExcel(itemfavorite)">
              <img class="imageSize" src="/opendataIcon/icon/excel.png" alt="fireSpot" />
            </div>
          </td>
          <td align="center" class="hover-img">
            <div v-if="
                itemfavorite.mongo_file_id_csv == null ||
                  itemfavorite.mongo_file_id_csv == ''
              " @click="nofile()">
              <img class="imageSize" src="/opendataIcon/icon/csvb&w.png" alt="fireSpot" />
            </div>
            <div v-else @click="checkUserLoginCsv(itemfavorite)">
              <img class="imageSize" src="/opendataIcon/icon/csv.png" alt="fireSpot" />
            </div>
          </td> -->
          <!-- <td align="center">{{ itemfavorite.frequency }}</td>
          <td align="center">{{ formatDate(itemfavorite.trans_date) }}</td> -->
          <td
            align="center"
            class="pointer"
            @click="addNewFavorite(itemfavorite.file_name)"
          >
            <v-icon color="red">delete</v-icon>
          </td>
        </tr>
      </table>
    </div>

    <div v-if="showApiPopup" class="custom-popup-overlay" @click="closeApiPopup">
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
                    <v-btn block color="primary" @click="downloadApiDocument">
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

  </v-container>
</template>

<script>
import { Encode, Decode } from "@/services";
export default {
  data() {
    return {
      showApiPopup: false, // ตัวแปรสำหรับแสดง/ซ่อน popup
      data: [],
      metadataDetail: [],
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
    Cookies() {
      if (this.$cookies.isKey("consent")) {
        return this.$cookies.get("consent");
      } else {
        //return this.$cookies.set('consent', 'no');
      }
    },
  },
  mounted() {
    this.checkuser();
    this.getData();
  },
  methods: {
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
    getMetadataDetail(data) {
      console.log("TestDetail");
      console.log(data);

      this.axios
        .post(process.env.VUE_APP_API_BACKEND + "/showMetadata", {
          source_id: data,
        })
        .then((response) => {
          this.metadataDetail = [response.data];
        })
        .catch((error) => {
          console.error("Error fetching metadata:", error);
        });
    },
    addNewFavorite(item) {
      const mySelf = this;
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
          .post(process.env.VUE_APP_API_BACKEND + "/addNewFavorite", {
            user_id: mySelf.userData.user_id,
            file_name: item,
          })
          .then((response) => {
            if (response.data.status2 === "DELETE Record in favorite_table Success") {
              mySelf.$swal("Deleted!", "Your file has been deleted.", "success");
            }
            // //console.log(response);
            // if (response.data.status2 === "DELETE Record in favorite_table Success") {
            //
            //       window.location.reload()
            //
            // }
          })
          .then((response) => {
            window.location.reload();
          });
      });
    },
    checkuser() {
      //console.log(this.userData);
      if (this.userData === "") {
        this.$swal("Please login", "", "warning").then((response) => {
          this.$router.push("/");
          this.reloadPage();
        });
      }
    },
    checkUserLoginDashbord(text) {
      if (this.$cookies.get("consent") === "no") {
        this.$swal(
          '<p class="font-text">กรุณากด "ยอมรับ" นโยบายการใช้คุกกี้ด้านล่าง และlog-in เข้าใช้งานก่อน</p>',
          "",
          "warning"
        );
      } else if (this.userData) {
        this.toPathSource(text);
      } else {
        this.$swal("Please login", "", "warning");
      }
    },
    toPathSource(text) {
      var nametext = "";
      var textname = text.split(" ");
      for (let i = 0; i < textname.length; i++) {
        nametext = nametext + textname[i];
      }
      let routeData = this.$router.resolve(`/view/dashboard/${nametext}`);
      window.open(routeData.href);
    },
    loadFile(link) {
      window.location.assign(link);
    },
    getData() {
      // //console.log(this.userData);
      var user = Encode.encode(JSON.stringify(this.userData));

      // if (this.userData) {
      this.axios
        .post(process.env.VUE_APP_API_BACKEND + "/favoriteList", {
          user: user,
        })
        .then((response) => {
          //console.log(response);
          this.data = response.data.result;
        });
      // }
    },
    getDataExportMetadata(id) {
      this.axios
        .post(process.env.VUE_APP_API_BACKEND + "/getDataExportMetadata", {
          source_id: id,
        })
        .then((response) => {
          this.$cookies.get("consent");
          // //console.log(this.$cookies.get("consent") )
          if (this.$cookies.get("consent") === "no") {
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
    checkUserLoginCsv(item) {
      if (this.$cookies.get("consent") === "no") {
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
      if (this.$cookies.get("consent") === "no") {
        this.$swal(
          '<p class="font-text">กรุณากด "ยอมรับ" นโยบายการใช้คุกกี้ด้านล่าง และlog-in เข้าใช้งานก่อน</p>',
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
      // this.axios
      //   .post(process.env.VUE_APP_API_BACKEND + "/checkPermitDownloadfile", {
      //     user_id: this.userData.user_id,
      //     file_name: item.file_name
      //   })
      //   .then(response => {
      //     if (response.data.status === "download") {
      this.downloadFileMongo(item);
      //   } else {
      //     this.$swal("Please contact Admin", "", "warning");
      //   }
      // });
    },
    checkPermissionDownloadCsv(item) {
      // this.axios
      //   .post(process.env.VUE_APP_API_BACKEND + "/checkPermitDownloadfile", {
      //     user_id: this.userData.user_id,
      //     file_name: item.file_name
      //   })
      //   .then(response => {
      //     if (response.data.status === "download") {
      this.downloadFileMongoCsv(item);
      //   } else {
      //     this.$swal("Please contact Admin", "", "warning");
      //   }
      // });
    },
    downloadFileMongo(item) {
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
    formatDate(datetime) {
      // //console.log(datetime);
      // var date = datetime.split('-')
      var dates = datetime.split(",");
      var date = datetime.split(" ");
      //console.log(date);
      if (date.length > 2) {
        // var datetimes = date[0].split('/')
        var days = date[1];
        var months = date[2];
        var years = date[3];
        return days + "/" + months + "/" + years;
      } else {
        var date = datetime.split(",");
        return date[0];
      }
    },
    reloadPage() {
      window.location.reload();
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
    // Getlink(link) {
    //   let linkapi = link.file_name
    //   let routeData = this.$router.resolve(`/view/api/${linkapi}`);
    //   window.open(routeData.href);

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
/* @import url("https://fonts.googleapis.com/css?family=Kanit&display=swap"); */
.font-text {
  /* font-family: "Kanit", sans-serif; */
  font-size: 28px;
}

.tb-header-favorite {
  height: 50px;
}

td.hover-img {
  outline: none;
  cursor: pointer;
}

.pointer {
  cursor: pointer;
}

.tab-title {
  text-align: center;
  display: block;
  color: #0d47a1;
  font-size: 18px;
  padding: 5px;
}

/* scrollbar */
/* width */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #ccc;
  border-radius: 10px;
}

/* ------------------ */
/* table */
.tableFixHead {
  overflow-y: auto;
  /* height: 450px; */
  width: 100%;
}

.tableFixHead thead th {
  position: sticky;
  top: 0;
}

table {
  border-collapse: collapse;
  width: 100%;
  table-layout: auto !important;
}

th {
  padding: 8px 10px;
}

th {
  background-color: #144372;
}

.line-table {
  border-spacing: 0px;
}

TR.colortr:nth-child(odd) {
  background-color: #ffffff;
}

TR.colortr:nth-child(even) {
  background-color: #f5f5f5;
}

/* .imageSize {
  margin: 5px;
  max-width: 35px;
  max-height: 35px;
  width: 100%;
  height: 100%;
} */
td.t {
  padding: 7px;
}

td {
  font-size: 14px;
  padding: 5px;
}

@media (max-width: 768px) {
  .font-title {
    font-size: 10px !important;
    color: #ffffff;
  }

  td {
    font-size: 10px;
    padding: 5px;
  }

  .imageSize {
    margin: 5px;
    max-width: 30px;
    max-height: 30px;
    width: 100%;
    height: 100%;
  }
}

@media (min-width: 1240px) and (max-width: 2340px) {
  .td-nameFile {
    width: 400px;
    text-align: left;
  }

  .td-image {
    width: 200px;
  }

  .td-size {
    width: 100px;
  }

  .td-date {
    font-size: 13px;
    width: 95px;
  }

  .td-metadata {
    width: 80px;
    text-align: center;
  }

  .td-excel {
    width: 70px;
    text-align: center;
  }

  .td-csv {
    width: 70px;
    text-align: center;
  }

  .imageSize-excel {
    margin-bottom: -18px;
    height: 35px;
    width: 60%;
  }

  .imageSize-csv {
    margin-bottom: -16px;
    height: 27px;
    width: 50%;
  }

  .imageSize-metaData {
    margin-bottom: -12px;
    width: 25px;
  }
}

@media (min-width: 750px) and (max-width: 1440px) {
  .td-nameFile {
    font-size: 13px;
    width: 290px;
    text-align: left;
  }

  .td-file {
    width: 130px;
  }

  .td-size {
    width: 70px;
  }

  .td-metadata {
    width: 70px;
    margin-bottom: -12px;
    text-align: right;
  }

  .td-date {
    font-size: 10px;
    width: 70px;
  }

  .td-excel {
    width: 30px;
  }

  .imageSize-excel {
    margin-bottom: -18px;
    height: 4vh;
    width: 100%;
  }

  .imageSize-csv {
    margin-bottom: -16px;
    height: 3vh;
    width: 40%;
  }

  .imageSize-metaData {
    width: 20px;
  }
}

@media only screen and (max-width: 550px) {
  .td-nameFile {
    font-size: 10px;
    width: 120px;
    text-align: left;
  }

  .td-file {
    width: 60px;
  }

  .td-size {
    width: 100px;
  }

  .td-metadata {
    margin-bottom: -12px;
    text-align: center;
    width: 60px;
  }

  .td-date {
    font-size: 10px;
    width: 70px;
    padding: 0 5px 0 15px;
  }

  .imageSize-excel {
    margin-bottom: -25px;
    height: 4vh;
    width: 60%;
  }

  .imageSize-csv {
    margin-bottom: -23px;
    height: 3vh;
    width: 100%;
  }

  .imageSize-metaData {
    margin-bottom: -16px;
    width: 20px;
  }
}

table {
  max-width: 100%;
  table-layout: fixed;
  height: auto;
  /* margin: auto; */
}

td {
  /* text-align: center; */
  /* outline: none;
  cursor: pointer; */
}

.tb-row-blue {
  height: 3vh;
  display: table;
  width: 100%;
  /* table-layout:fixed; */
  background-color: #f5f5f5;
}

.tb-row-white {
  height: 3vh;
  display: table;
  width: 100%;
  /* table-layout:fixed; */
  background-color: #ffffff;
}

.table-scroll-table {
  width: 100%;
  display: block;
  max-height: 60vh !important;
  overflow: auto;
  background-color: #f5f5f5;
}

.tb-header {
  width: calc(100% - 17px);
  display: table;
  width: 100%;
  /* width:calc(100% - 18px); */
}

.tb-header-top {
  /* width: calc(100% - 17px); */
  background-color: #757575;
  color: #ffffff;
  /* display:table; */
  /* width:100%; */
  /* width:calc(100% - 18px); */
}

.tb-header-row {
  display: table;
  width: 100%;
  height: 4vh;
  /* table-layout:fixed; */
  color: #0150b3;
}

.tb-header-row-top {
  /* display:table;  */
  width: 100%;
  table-layout: fixed;
  color: #ffffff;
}

.font-title {
  /* font-size: 14px; */
  color: #ffffff;
  word-break: break-word;
  font-size: 12px;
}

/* td:hover {
  background-color:#9ec7e4;
} */
td.hover-img:hover {
  background-color: #9ec7e4;
}
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
</style>
