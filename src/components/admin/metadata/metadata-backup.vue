<template lang="html">
  <v-container class="contentPortal" fluid>
    <v-card elevation="10">
      <v-tabs
        v-model="activeMetaTab"
        :scrollable="false"
        color="#336E8C"
        dark
        slider-color="#61B6BC"
        grow
      >
        <v-tab
          dark
          grow
          class="subheading"
          href="#tab-1"
          @click="generateSrcID()"
        >
          <h3>{{ $t("createreport") }}</h3>
        </v-tab>
        <v-tab
          dark
          grow
          class="subheading"
          href="#tab-5"
          @click="generateSrcID()"
        >
          <h3>{{ $t("editreport") }}</h3>
        </v-tab>
        <v-tab
          dark
          grow
          class="subheading"
          href="#tab-2"
          @click="generateSrcID()"
        >
          <h3>{{ $t("addfile") }}</h3>
        </v-tab>
        <v-tab
          dark
          grow
          class="subheading"
          href="#tab-3"
          @click="generateSrcID()"
        >
          <h3>{{ $t("addlink") }}</h3>
        </v-tab>
        <v-tab
          dark
          grow
          class="subheading"
          href="#tab-4"
          @click="generateSrcID()"
        >
          <h3>{{ $t("genapi") }}</h3>
        </v-tab>

        <v-tab-item value="tab-1" lazy>
          <!-- page1 -->
          <v-toolbar flat color="#336E8C">
            <v-toolbar-title class="white-text subheading">{{
              $t("datasettype")
            }}</v-toolbar-title>
          </v-toolbar>
          <v-tabs color="#336E8C" slider-color="#61B6BC" grow>
            <v-tab dark grow class="subheading">
              <span class="white-text">{{ $t("recordinfo") }}</span>
            </v-tab>
            <v-tab>
              <span class="white-text"> {{ $t("statistics") }}</span>
            </v-tab>
            <v-tab>
              <span class="white-text">{{ $t("sginfo") }} </span>
            </v-tab>
            <v-tab>
              <span class="white-text">{{ $t("various") }}</span>
            </v-tab>
            <v-tab>
              <span class="white-text"> {{ $t("otherdata") }} </span>
            </v-tab>

            <v-tab-item>
              <v-card flat>
                <v-card-text>
                  <v-form ref="form" v-model="valid" lazy-validation>
                    <v-flex md10>
                      <v-layout row wrap class="pt-5">
                        <v-flex xs12 sm12 md3 offset-md1>
                          <v-subheader
                            >{{ $t("reprotid") }}
                            <span style="color: red">*</span></v-subheader
                          >
                        </v-flex>

                        <v-flex xs12 sm12 md7>
                          <h4>
                            <v-text-field
                              v-model="sourceData.source_id"
                              required
                              :rules="RuleEnglish"
                              :placeholder="$t('placeholderText')"
                            ></v-text-field>
                          </h4>
                        </v-flex>
                        <!-- <v-flex md1 pl-3>
                          <v-btn fab dark small color="primary" @click="(dialog = true), getData()">
                            <v-icon color="white">search</v-icon>
                          </v-btn>
                        </v-flex> -->
                        <!-- <v-flex xs12 sm12 md3 offset-md1>
                          <v-subheader>File Name <span style="color: red">*</span></v-subheader>
                        </v-flex>
                        <v-flex xs12 sm12 md7>
                          <h4>
                            <v-text-field label="รหัสชุดข้อมูลตัวอย่าง A001 เป็นภาษาอังกฤษหรือตัวเลขและห้ามเว้นวรรค"
                              required :rules="Rule" v-model="sourceData.file_name" disabled>
                            </v-text-field>
                          </h4>
                        </v-flex> -->

                        <v-flex xs12 sm12 md3 offset-md1>
                          <v-subheader
                            >{{ $t("category") }}
                            <span style="color: red">*</span></v-subheader
                          >
                        </v-flex>
                        <v-flex xs12 sm12 md7>
                          <h4>
                            <v-select
                              item-text="name"
                              item-value="category_id"
                              :items="itemCategory"
                              :label="$t('selectCategoryLabel')"
                              v-model="sourceData.category_id"
                              required
                              @change="getSubCategory()"
                            ></v-select>
                          </h4>
                        </v-flex>
                        <v-flex xs12 sm12 md3 offset-md1>
                          <v-subheader
                            >{{ $t("subcategory") }}
                            <span style="color: red">*</span></v-subheader
                          >
                        </v-flex>
                        <v-flex xs12 sm12 md7>
                          <h4>
                            <v-select
                              :items="itemSubCategory"
                              item-text="sub_category_name"
                              item-value="sub_category_id"
                              :label="$t('subCategoryLabel')"
                              v-model="sourceData.sub_category_id"
                              required
                            ></v-select>
                          </h4>
                        </v-flex>
                        <v-flex md1 pl-3>
                          <v-btn
                            icon
                            color="primary"
                            @click="(dialog = true), addsub()"
                          >
                            <v-icon>add_circle</v-icon>
                          </v-btn>
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
                              :items="status"
                              v-model="sourceData.status"
                              required
                              :rules="Rules"
                              :label="$t('statusLabel')"
                            ></v-select>
                          </h4>
                        </v-flex>

                        <!-- <v-flex xs12 sm12 md3 offset-md1>
                            <v-subheader>ประเภทชุดข้อมูล:<span style="color: red">*</span></v-subheader>
                          </v-flex>
                          <v-flex xs12 sm12 md7>
                            <h4>
                              <v-select :items="datatype" v-model="sourceData.data_type" dense outlined></v-select>
                            </h4>
                          </v-flex> -->

                        <v-flex xs12 sm12 md3 offset-md1>
                          <v-subheader
                            >{{ $t("datasetname") }} :<span style="color: red"
                              >*</span
                            ></v-subheader
                          >
                        </v-flex>
                        <v-flex xs12 sm12 md7>
                          <h4>
                            <v-text-field
                              v-model="sourceData.export_excel_name"
                              :rules="Rule"
                              :placeholder="$t('examplePlaceholder')"
                              outlined
                              required
                            ></v-text-field>
                          </h4>
                        </v-flex>

                        <v-flex xs12 sm12 md3 offset-md1>
                          <v-subheader
                            >{{ $t("org") }}:<span style="color: red"
                              >*</span
                            ></v-subheader
                          >
                        </v-flex>
                        <v-flex xs12 sm12 md7>
                          <h4>
                            <v-select
                              item-text="org_name"
                              item-value="org_name"
                              :items="organization"
                              v-model="sourceData.organization"
                              :rules="Rules"
                              dense
                              outlined
                              persistent-hint
                              return-object
                              single-line
                            ></v-select>
                          </h4>
                        </v-flex>

                        <v-flex xs12 sm12 md3 offset-md1>
                          <v-subheader
                            >{{ $t("accessibility") }}:<span style="color: red"
                              >*</span
                            ></v-subheader
                          >
                        </v-flex>
                        <v-flex xs12 sm12 md7>
                          <h4>
                            <v-select
                              item-text="title"
                              item-value="value"
                              :items="accessibility"
                              v-model="sourceData.access"
                              dense
                              outlined
                              required
                            ></v-select>
                          </h4>
                        </v-flex>

                        <v-flex xs12 sm12 md3 offset-md1>
                          <v-subheader
                            >{{ $t("contactname") }}:<span style="color: red"
                              >*</span
                            ></v-subheader
                          >
                        </v-flex>
                        <v-flex xs12 sm12 md7>
                          <h4>
                            <v-text-field
                              v-model="sourceData.contactor_name"
                              :rules="nameRules"
                              :placeholder="$t('agencyPlaceholder')"
                              outlined
                              dense
                              required
                            ></v-text-field>
                          </h4>
                        </v-flex>

                        <v-flex xs12 sm12 md3 offset-md1>
                          <v-subheader
                            >{{ $t("contactmail") }}:<span style="color: red"
                              >*</span
                            ></v-subheader
                          >
                        </v-flex>
                        <v-flex xs12 sm12 md7>
                          <h4>
                            <v-text-field
                              :rules="emailRules"
                              v-model="sourceData.contactor_email"
                              :placeholder="$t('emailPlaceholder')"
                              outlined
                              dense
                              required
                            ></v-text-field>
                          </h4>
                        </v-flex>

                        <v-flex xs12 sm12 md3 offset-md1>
                          <v-subheader
                            >{{ $t("tag") }}:<span style="color: red"
                              >*</span
                            ></v-subheader
                          >
                        </v-flex>
                        <v-flex xs12 sm12 md7>
                          <h4>
                            <!-- {{tag_string}} -->
                            <v-combobox
                              v-model="sourceData.tag"
                              :items="tag"
                              item-text="tags"
                              :value="tags"
                              :search-input.sync="search"
                              :hint="$t('maximumTags')"
                              :label="$t('categoryExamples')"
                              multiple
                              persistent-hint
                              small-chips
                              required
                            >
                              <template v-slot:no-data>
                                <v-list-item>
                                  <v-list-item-content>
                                    <v-list-item-title>
                                      No results matching "<strong>{{
                                        search
                                      }}</strong
                                      >". Press <kbd>enter</kbd> to create a new
                                      one
                                    </v-list-item-title>
                                  </v-list-item-content>
                                </v-list-item>
                              </template>
                            </v-combobox>
                          </h4>
                        </v-flex>

                        <v-flex xs12 sm12 md3 offset-md1>
                          <v-subheader
                            >{{ $t("des") }}:<span style="color: red"
                              >*</span
                            ></v-subheader
                          >
                        </v-flex>
                        <v-flex xs12 sm12 md7>
                          <h4>
                            <v-textarea
                              v-model="sourceData.description"
                              auto-grow
                              outlined
                              rows="3"
                              row-height="20"
                              shaped
                              required
                            ></v-textarea>
                          </h4>
                        </v-flex>

                        <v-flex xs12 sm12 md3 offset-md1>
                          <v-subheader
                            >{{ $t("objective") }}:<span style="color: red"
                              >*</span
                            ></v-subheader
                          >
                        </v-flex>
                        <v-flex xs12 sm12 md7>
                          <h4>
                            <v-checkbox
                              v-for="checkbox in check"
                              :key="checkbox.id"
                              v-model="sourceData.objective"
                              :value="checkbox.value"
                              :label="checkbox.title"
                              hide-details
                            ></v-checkbox>
                            <v-checkbox
                              v-model="enabled1"
                              :label="$t('others')"
                              hide-details
                            ></v-checkbox>
                            <v-col cols="12">
                              <v-text-field
                                :disabled="!enabled1"
                                :placeholder="$t('pleaseSpecify')"
                                v-model="objective_other"
                                outlined
                                dense
                                required
                              ></v-text-field>
                              <!-- {{objective}} -->
                            </v-col>
                          </h4>
                        </v-flex>

                        <v-flex xs12 sm12 md3 offset-md1>
                          <v-subheader
                            >{{ $t("data-relate-unit") }}:<span
                              style="color: red"
                              >*</span
                            ></v-subheader
                          >
                        </v-flex>
                        <v-flex xs12 sm12 md7>
                          <h4>
                            <v-select
                              :items="frequency"
                              v-model="sourceData.frequency"
                              dense
                              outlined
                              required
                            ></v-select>
                          </h4>
                        </v-flex>

                        <v-flex xs12 sm12 md3 offset-md1>
                          <v-subheader
                            >{{ $t("frequencyunit") }}:
                            <span style="color: red">*</span>
                          </v-subheader>
                        </v-flex>
                        <v-flex xs12 sm12 md7>
                          <h4>
                            <v-text-field
                              v-model="sourceData.frequency_unit"
                              :placeholder="$t('number_placeholder')"
                              outlined
                              required
                              dense
                            ></v-text-field>
                          </h4>
                        </v-flex>

                        <v-flex xs12 sm12 md3 offset-md1>
                          <v-subheader
                            >{{ $t("geo") }}:<span style="color: red"
                              >*</span
                            ></v-subheader
                          >
                        </v-flex>
                        <v-flex xs12 sm12 md7>
                          <h4>
                            <v-select
                              :items="Geo"
                              v-model="sourceData.geo_coverage"
                              dense
                              outlined
                            ></v-select>
                          </h4>
                        </v-flex>

                        <v-flex xs12 sm12 md3 offset-md1>
                          <v-subheader
                            >{{ $t("source") }}:<span style="color: red"
                              >*</span
                            ></v-subheader
                          >
                        </v-flex>
                        <v-flex xs12 sm12 md7>
                          <h4>
                            <v-text-field
                              v-model="sourceData.data_source"
                              :rules="nameRules"
                              :placeholder="$t('source_placeholder')"
                              outlined
                              dense
                              required
                            ></v-text-field>
                          </h4>
                        </v-flex>

                        <v-flex xs12 sm12 md3 offset-md1>
                          <v-subheader
                            >{{ $t("datacollect") }}:<span style="color: red"
                              >*</span
                            ></v-subheader
                          >
                        </v-flex>
                        <v-flex xs12 sm12 md7>
                          <h4>
                            <v-checkbox
                              v-for="format in data_format"
                              :key="format.id"
                              v-model="sourceData.data_storage"
                              :label="format.title"
                              :value="format.value"
                              multiple
                              hide-details
                            ></v-checkbox>

                            <v-checkbox
                              v-model="enabled2"
                              :label="$t('others')"
                              hide-details
                            ></v-checkbox>
                            <v-col cols="12">
                              <v-text-field
                                :disabled="!enabled2"
                                :placeholder="$t('pleaseSpecify')"
                                v-model="data_storage_other"
                                outlined
                                dense
                                required
                              ></v-text-field>
                            </v-col>
                          </h4>
                        </v-flex>

                        <v-flex xs12 sm12 md3 offset-md1>
                          <v-subheader
                            >{{ $t("govcate") }}:<span style="color: red"
                              >*</span
                            ></v-subheader
                          >
                        </v-flex>
                        <v-flex xs12 sm12 md7>
                          <h4>
                            <v-select
                              :items="Category"
                              v-model="sourceData.topic_gorvernance"
                              label=""
                              dense
                              outlined
                            ></v-select>
                          </h4>
                        </v-flex>

                        <v-flex xs12 sm12 md3 offset-md1>
                          <v-subheader
                            >{{ $t("datalicese") }}:<span style="color: red"
                              >*</span
                            ></v-subheader
                          >
                        </v-flex>
                        <v-flex xs8 sm7 md7>
                          <h4>
                            <v-select
                              :items="License"
                              v-model="sourceData.data_license"
                              label=""
                              dense
                              outlined
                            ></v-select>
                          </h4>
                        </v-flex>
                        <v-flex md1 pl-3>
                          <v-tooltip bottom>
                            <template v-slot:activator="{ on, attrs }">
                              <v-icon v-bind="attrs" v-on="on" class="ml-2"
                                >mdi_information</v-icon
                              >
                            </template>
                            <span>
                              {{ $t("creativeCommonsAttributions") }}<br />
                              {{ $t("creativeCommonsAttributionShareAlike")
                              }}<br />
                              {{ $t("creativeCommonsNonCommercial") }}<br />
                              {{ $t("openDataCommon") }}<br />
                              {{ $t("gnuFreeDocumentationLicense") }}<br />
                              {{ $t("licenseNotSpecified") }}<br />
                              {{ $t("othersLicense") }}
                            </span>
                          </v-tooltip>
                        </v-flex>
                        <v-flex xs12 sm12 md3 offset-md1>
                          <v-subheader
                            >{{ $t("conditions") }}:
                            <span style="color: red">*</span>
                          </v-subheader>
                        </v-flex>
                        <v-flex xs12 sm12 md7>
                          <h5>
                            <v-textarea
                              :label="$t('accessConditions')"
                              v-model="sourceData.data_condition"
                              auto-grow
                              outlined
                              rows="4"
                              row-height="20"
                              shaped
                            ></v-textarea>
                          </h5>
                        </v-flex>

                        <v-flex xs12 sm12 md3 offset-md1>
                          <v-subheader
                            >{{ $t("sponsor") }}:
                            <span style="color: red">*</span>
                          </v-subheader>
                        </v-flex>
                        <v-flex xs12 sm12 md7>
                          <h4>
                            <v-select
                              v-model="sourceData.supporter"
                              :items="subporter"
                              dense
                              outlined
                            ></v-select>
                          </h4>
                        </v-flex>

                        <v-flex xs12 sm12 md3 offset-md1>
                          <v-subheader
                            >{{ $t("smallestunit") }}:
                            <span style="color: red">*</span>
                          </v-subheader>
                        </v-flex>
                        <v-flex xs12 sm12 md7>
                          <h4>
                            <v-select
                              v-model="sourceData.data_unit"
                              :items="subunits"
                              dense
                              outlined
                            ></v-select>
                          </h4>
                        </v-flex>

                        <v-flex xs12 sm12 md3 offset-md1>
                          <v-subheader
                            >{{ $t("url") }}:
                            <span style="color: red">*</span>
                          </v-subheader>
                        </v-flex>
                        <v-flex xs12 sm12 md7>
                          <h4>
                            <v-text-field
                              v-model="sourceData.URL"
                              :placeholder="$t('urlDetails')"
                              outlined
                              dense
                            ></v-text-field>
                          </h4>
                        </v-flex>

                        <v-flex xs12 sm12 md3 offset-md1>
                          <v-subheader
                            >{{ $t("languse") }}:
                            <span style="color: red">*</span>
                          </v-subheader>
                        </v-flex>
                        <v-flex xs12 sm12 md7>
                          <h4>
                            <v-checkbox
                              v-for="format in language"
                              :key="format.id"
                              v-model="sourceData.data_language"
                              :label="format.title"
                              :value="format.value"
                              multiple
                              hide-details
                            ></v-checkbox>

                            <v-checkbox
                              v-model="enabled3"
                              :label="$t('others')"
                              hide-details
                            ></v-checkbox>
                            <v-col cols="12">
                              <v-text-field
                                :disabled="!enabled3"
                                :placeholder="$t('pleaseSpecify')"
                                v-model="data_language_other"
                                outlined
                                dense
                                required
                              ></v-text-field>
                            </v-col>
                          </h4>
                        </v-flex>

                        <v-flex xs12 sm12 md3 offset-md1>
                          <v-subheader
                            >{{ $t("datainitial") }}:
                            <span style="color: red">*</span>
                          </v-subheader>
                        </v-flex>
                        <v-flex xs12 sm12 md7>
                          <h4>
                            <v-menu
                              v-model="menu"
                              :close-on-content-click="false"
                              :nudge-right="40"
                              transition="scale-transition"
                              offset-y
                              min-width="auto"
                            >
                              <template v-slot:activator="{ on, attrs }">
                                <v-text-field
                                  :value="
                                    convertToThaiDate(sourceData.created_date)
                                  "
                                  :label="$t('dateFormatLabel')"
                                  prepend-icon="mdi-calendar"
                                  readonly
                                  v-bind="attrs"
                                  v-on="on"
                                ></v-text-field>
                              </template>
                              <v-date-picker
                                v-model="sourceData.created_date"
                                :locale="currentLocale"
                                @input="menu = false"
                              ></v-date-picker>
                            </v-menu>
                          </h4>
                        </v-flex>

                        <v-flex xs12 sm12 md3 offset-md1>
                          <v-subheader
                            >{{ $t("lastupdate") }}:
                            <span style="color: red">*</span>
                          </v-subheader>
                        </v-flex>
                        <v-flex xs12 sm12 md7>
                          <h4>
                            <v-menu
                              v-model="menu1"
                              :close-on-content-click="false"
                              :nudge-right="40"
                              transition="scale-transition"
                              offset-y
                              min-width="auto"
                            >
                              <template v-slot:activator="{ on, attr }">
                                <v-text-field
                                  :value="
                                    convertToThaiDate(sourceData.modified_date)
                                  "
                                  :label="$t('dateFormatLabel')"
                                  prepend-icon="mdi-calendar"
                                  readonly
                                  v-bind="attr"
                                  v-on="on"
                                ></v-text-field>
                              </template>
                              <v-date-picker
                                v-model="sourceData.modified_date"
                                :locale="currentLocale"
                                @input="menu1 = false"
                              ></v-date-picker>
                            </v-menu>
                          </h4>
                        </v-flex>

                        <v-flex xs12 sm12 md3 offset-md1>
                          <v-subheader
                            >{{ $t("hvd") }}:
                            <span style="color: red">*</span>
                          </v-subheader>
                        </v-flex>
                        <v-flex xs12 sm12 md7>
                          <h4>
                            <v-select
                              v-model="sourceData.high_value_dataset"
                              :items="yesno"
                              dense
                              outlined
                            ></v-select>
                          </h4>
                        </v-flex>

                        <v-flex xs12 sm12 md3 offset-md1>
                          <v-subheader
                            >{{ $t("rd") }}:
                            <span style="color: red">*</span>
                          </v-subheader>
                        </v-flex>
                        <v-flex xs12 sm12 md7>
                          <h4>
                            <v-select
                              v-model="sourceData.data_reference"
                              :items="yesno"
                              dense
                              outlined
                            ></v-select>
                          </h4>
                        </v-flex>
                      </v-layout>
                    </v-flex>
                    <v-flex offset-md9 pt-5>
                      <v-btn
                        :disabled="!valid"
                        color="success"
                        @click="save(false)"
                        >{{ $t("save") }}</v-btn
                      >
                      <v-btn
                        :disabled="!valid"
                        color="success"
                        @click="save(true)"
                        >{{ $t("saveandaddfile") }}</v-btn
                      >
                    </v-flex>
                  </v-form>

                  <!-- end tab1 -->
                </v-card-text>
              </v-card>
            </v-tab-item>
            <v-tab-item>
              <v-card flat>
                <v-card-text>
                  <v-form ref="form" v-model="valid" lazy-validation>
                    <v-flex md10>
                      <v-layout row wrap class="pt-5">
                        <v-flex xs12 sm12 md3 offset-md1>
                          <v-subheader
                            >{{ $t("reprotid") }}
                            <span style="color: red">*</span></v-subheader
                          >
                        </v-flex>
                        <v-flex xs12 sm12 md7>
                          <h4>
                            <v-text-field
                              v-model="sourceData.source_id"
                              required
                              :rules="RuleEnglish"
                              :label="$t('dataSetCodeLabel')"
                            ></v-text-field>
                          </h4>
                        </v-flex>
                        <!-- <v-flex md1 pl-3>
                          <v-btn fab dark small color="primary" @click="(dialog = true), getDataStat()">
                            <v-icon color="white">search</v-icon>
                          </v-btn>
                        </v-flex> -->
                        <!-- <v-flex xs12 sm12 md3 offset-md1>
                          <v-subheader>File Name <span style="color: red">*</span></v-subheader>
                        </v-flex>
                        <v-flex xs12 sm12 md7>
                          <h4>
                            <v-text-field label="กรอกรหัสชุดข้อมูลตัวอย่าง A001 เป็นภาษาอังกฤษหรือภาษาไทยและห้ามเว้นวรรค"
                              required :rules="Rule" v-model="sourceData.file_name">
                            </v-text-field>
                          </h4>
                        </v-flex> -->

                        <v-flex xs12 sm12 md3 offset-md1>
                          <v-subheader
                            >{{ $t("category")
                            }}<span style="color: red">*</span></v-subheader
                          >
                        </v-flex>
                        <v-flex xs12 sm12 md7>
                          <h4>
                            <v-select
                              item-text="name"
                              item-value="category_id"
                              :items="itemCategory"
                              :label="$t('selectCategoryLabel')"
                              v-model="sourceData.category_id"
                              @change="getSubCategory()"
                            ></v-select>
                          </h4>
                        </v-flex>
                        <v-flex xs12 sm12 md3 offset-md1>
                          <v-subheader
                            >{{ $t("subcategory")
                            }}<span style="color: red">*</span></v-subheader
                          >
                        </v-flex>
                        <v-flex xs12 sm12 md7>
                          <h4>
                            <v-select
                              :items="itemSubCategory"
                              item-text="sub_category_name"
                              item-value="sub_category_id"
                              :label="$t('subCategoryLabel')"
                              v-model="sourceData.sub_category_id"
                            ></v-select>
                          </h4>
                        </v-flex>
                        <v-flex md1 pl-3>
                          <v-btn
                            icon
                            color="primary"
                            @click="(dialog = true), addsub()"
                          >
                            <v-icon>add_circle</v-icon>
                          </v-btn>
                        </v-flex>

                        <v-flex xs12 sm12 md3 offset-md1>
                          <v-subheader
                            >{{ $t("status")
                            }}<span style="color: red">*</span></v-subheader
                          >
                        </v-flex>
                        <v-flex xs12 sm12 md7>
                          <h4>
                            <v-select
                              :items="status"
                              v-model="sourceData.status"
                              required
                              :rules="Rules"
                              :label="$t('statusLabel')"
                            ></v-select>
                          </h4>
                        </v-flex>

                        <!-- <v-flex xs12 sm12 md3 offset-md1>
                            <v-subheader>ประเภทชุดข้อมูล:<span style="color: red">*</span></v-subheader>
                          </v-flex>
                          <v-flex xs12 sm12 md7>
                            <h4>
                              <v-select :items="datatype" v-model="sourceData.data_type" dense outlined></v-select>
                            </h4>
                          </v-flex> -->

                        <v-flex xs12 sm12 md3 offset-md1>
                          <v-subheader
                            >{{ $t("datasetname") }} :<span style="color: red"
                              >*</span
                            ></v-subheader
                          >
                        </v-flex>
                        <v-flex xs12 sm12 md7>
                          <h4>
                            <v-text-field
                              v-model="sourceData.export_excel_name"
                              :rules="Rule"
                              :placeholder="$t('examplePlaceholder')"
                              outlined
                              required
                            ></v-text-field>
                          </h4>
                        </v-flex>

                        <v-flex xs12 sm12 md3 offset-md1>
                          <v-subheader
                            >{{ $t("org") }}:<span style="color: red"
                              >*</span
                            ></v-subheader
                          >
                        </v-flex>
                        <v-flex xs12 sm12 md7>
                          <h4>
                            <v-select
                              item-text="org_name"
                              item-value="org_name"
                              :items="organization"
                              v-model="sourceData.organization"
                              :rules="Rules"
                              dense
                              outlined
                              persistent-hint
                              return-object
                              single-line
                            ></v-select>
                          </h4>
                        </v-flex>

                        <v-flex xs12 sm12 md3 offset-md1>
                          <v-subheader
                            >{{ $t("accessibility") }}:
                            <span style="color: red">*</span>
                          </v-subheader>
                        </v-flex>
                        <v-flex xs12 sm12 md7>
                          <h4>
                            <v-select
                              item-text="title"
                              item-value="value"
                              :items="accessibility"
                              v-model="sourceData.access"
                              dense
                              outlined
                            ></v-select>
                          </h4>
                        </v-flex>

                        <v-flex xs12 sm12 md3 offset-md1>
                          <v-subheader
                            >{{ $t("contactname") }}:<span style="color: red"
                              >*</span
                            ></v-subheader
                          >
                        </v-flex>
                        <v-flex xs12 sm12 md7>
                          <h4>
                            <v-text-field
                              v-model="sourceData.contactor_name"
                              :rules="nameRules"
                              :placeholder="$t('agencyPlaceholder')"
                              outlined
                              dense
                              required
                            ></v-text-field>
                          </h4>
                        </v-flex>

                        <v-flex xs12 sm12 md3 offset-md1>
                          <v-subheader
                            >{{ $t("contactmail") }}:<span style="color: red"
                              >*</span
                            ></v-subheader
                          >
                        </v-flex>
                        <v-flex xs12 sm12 md7>
                          <h4>
                            <v-text-field
                              v-model="sourceData.contactor_email"
                              :placeholder="$t('emailPlaceholder')"
                              outlined
                              dense
                              required
                            ></v-text-field>
                          </h4>
                        </v-flex>

                        <v-flex xs12 sm12 md3 offset-md1>
                          <v-subheader
                            >{{ $t("tag") }}:<span style="color: red"
                              >*</span
                            ></v-subheader
                          >
                        </v-flex>
                        <v-flex xs12 sm12 md7>
                          <h4>
                            <!-- {{tag_string}} -->
                            <v-combobox
                              v-model="sourceData.tag"
                              :items="tag"
                              item-text="tags"
                              :value="tags"
                              :search-input.sync="search"
                              :hint="$t('maximumTags')"
                              :label="$t('categoryExamples')"
                              multiple
                              persistent-hint
                              small-chips
                            >
                              <template v-slot:no-data>
                                <v-list-item>
                                  <v-list-item-content>
                                    <v-list-item-title>
                                      No results matching "<strong>{{
                                        search
                                      }}</strong
                                      >". Press <kbd>enter</kbd> to create a new
                                      one
                                    </v-list-item-title>
                                  </v-list-item-content>
                                </v-list-item>
                              </template>
                            </v-combobox>
                          </h4>
                        </v-flex>

                        <v-flex xs12 sm12 md3 offset-md1>
                          <v-subheader
                            >{{ $t("des") }}:<span style="color: red"
                              >*</span
                            ></v-subheader
                          >
                        </v-flex>
                        <v-flex xs12 sm12 md7>
                          <h4>
                            <v-textarea
                              v-model="sourceData.description"
                              auto-grow
                              outlined
                              rows="3"
                              row-height="20"
                              shaped
                            ></v-textarea>
                          </h4>
                        </v-flex>

                        <v-flex xs12 sm12 md3 offset-md1>
                          <v-subheader
                            >{{ $t("objective") }}:<span style="color: red"
                              >*</span
                            ></v-subheader
                          >
                        </v-flex>
                        <v-flex xs12 sm12 md7>
                          <h4>
                            <v-checkbox
                              v-for="checkbox in check"
                              :key="checkbox.id"
                              v-model="sourceData.objective"
                              :value="checkbox.value"
                              :label="checkbox.title"
                              hide-details
                            ></v-checkbox>
                            <v-checkbox
                              v-model="enabled1"
                              :label="$t('others')"
                              hide-details
                            ></v-checkbox>
                            <v-col cols="12">
                              <v-text-field
                                :disabled="!enabled1"
                                :placeholder="$t('pleaseSpecify')"
                                v-model="objective_other"
                                outlined
                                dense
                                required
                              ></v-text-field>
                              <!-- {{objective}} -->
                            </v-col>
                          </h4>
                        </v-flex>

                        <v-flex xs12 sm12 md3 offset-md1>
                          <v-subheader
                            >{{ $t("data-relate-unit") }}:<span
                              style="color: red"
                              >*</span
                            ></v-subheader
                          >
                        </v-flex>
                        <v-flex xs12 sm12 md7>
                          <h4>
                            <v-select
                              :items="frequency"
                              v-model="sourceData.frequency"
                              dense
                              outlined
                            ></v-select>
                          </h4>
                        </v-flex>

                        <v-flex xs12 sm12 md3 offset-md1>
                          <v-subheader
                            >{{ $t("dataupdate") }}:
                            <span style="color: red">*</span>
                          </v-subheader>
                        </v-flex>
                        <v-flex xs12 sm12 md7>
                          <h4>
                            <v-text-field
                              v-model="sourceData.frequency_unit"
                              :placeholder="$t('number_placeholder')"
                              outlined
                              dense
                            ></v-text-field>
                          </h4>
                        </v-flex>

                        <v-flex xs12 sm12 md3 offset-md1>
                          <v-subheader
                            >{{ $t("geo") }}:<span style="color: red"
                              >*</span
                            ></v-subheader
                          >
                        </v-flex>
                        <v-flex xs12 sm12 md7>
                          <h4>
                            <v-select
                              :items="Geo"
                              v-model="sourceData.geo_coverage"
                              dense
                              outlined
                            ></v-select>
                          </h4>
                        </v-flex>

                        <v-flex xs12 sm12 md3 offset-md1>
                          <v-subheader
                            >{{ $t("source") }}:<span style="color: red"
                              >*</span
                            ></v-subheader
                          >
                        </v-flex>
                        <v-flex xs12 sm12 md7>
                          <h4>
                            <v-text-field
                              v-model="sourceData.data_source"
                              :rules="nameRules"
                              :placeholder="$t('source_placeholder')"
                              outlined
                              dense
                              required
                            ></v-text-field>
                          </h4>
                        </v-flex>

                        <v-flex xs12 sm12 md3 offset-md1>
                          <v-subheader
                            >{{ $t("datacollect") }}:<span style="color: red"
                              >*</span
                            ></v-subheader
                          >
                        </v-flex>
                        <v-flex xs12 sm12 md7>
                          <h4>
                            <v-checkbox
                              v-for="format in data_format"
                              :key="format.id"
                              v-model="sourceData.data_storage"
                              :label="format.title"
                              :value="format.value"
                              multiple
                              hide-details
                            ></v-checkbox>

                            <v-checkbox
                              v-model="enabled2"
                              :label="$t('others')"
                              hide-details
                            ></v-checkbox>
                            <v-col cols="12">
                              <v-text-field
                                :disabled="!enabled2"
                                :placeholder="$t('pleaseSpecify')"
                                v-model="data_storage_other"
                                outlined
                                dense
                                required
                              ></v-text-field>
                            </v-col>
                          </h4>
                        </v-flex>

                        <v-flex xs12 sm12 md3 offset-md1>
                          <v-subheader
                            >{{ $t("govcate") }}:<span style="color: red"
                              >*</span
                            ></v-subheader
                          >
                        </v-flex>
                        <v-flex xs12 sm12 md7>
                          <h4>
                            <v-select
                              :items="Category"
                              v-model="sourceData.topic_gorvernance"
                              label=""
                              dense
                              outlined
                            ></v-select>
                          </h4>
                        </v-flex>

                        <v-flex xs12 sm12 md3 offset-md1>
                          <v-subheader
                            >{{ $t("datalicese") }}:<span style="color: red"
                              >*</span
                            ></v-subheader
                          >
                        </v-flex>
                        <v-flex xs12 sm12 md7>
                          <h4>
                            <v-select
                              :items="License"
                              v-model="sourceData.data_license"
                              label=""
                              dense
                              outlined
                            ></v-select>
                          </h4>
                        </v-flex>
                        <v-flex md1 pl-3>
                          <v-tooltip bottom>
                            <template v-slot:activator="{ on, attrs }">
                              <v-icon v-bind="attrs" v-on="on" class="ml-2"
                                >mdi_information</v-icon
                              >
                            </template>
                            <span>
                              {{ $t("creativeCommonsAttributions") }}<br />
                              {{ $t("creativeCommonsAttributionShareAlike")
                              }}<br />
                              {{ $t("creativeCommonsNonCommercial") }}<br />
                              {{ $t("openDataCommon") }}<br />
                              {{ $t("gnuFreeDocumentationLicense") }}<br />
                              {{ $t("licenseNotSpecified") }}<br />
                              {{ $t("othersLicense") }}
                            </span>
                          </v-tooltip>
                        </v-flex>
                        <v-flex xs12 sm12 md3 offset-md1>
                          <v-subheader
                            >{{ $t("conditions") }}:
                            <span style="color: red">*</span>
                          </v-subheader>
                        </v-flex>
                        <v-flex xs12 sm12 md7>
                          <h5>
                            <v-textarea
                              :label="$t('accessConditions')"
                              v-model="sourceData.data_condition"
                              auto-grow
                              outlined
                              rows="4"
                              row-height="20"
                              shaped
                            ></v-textarea>
                          </h5>
                        </v-flex>

                        <v-flex xs12 sm12 md3 offset-md1>
                          <v-subheader
                            >{{ $t("sponsor") }}:<span style="color: red"
                              >*</span
                            ></v-subheader
                          >
                        </v-flex>
                        <v-flex xs12 sm12 md7>
                          <h4>
                            <v-select
                              v-model="sourceData.supporter"
                              :items="subporter"
                              dense
                              outlined
                            ></v-select>
                          </h4>
                        </v-flex>

                        <v-flex xs12 sm12 md3 offset-md1>
                          <v-subheader
                            >{{ $t("smallestunit") }}:<span style="color: red"
                              >*</span
                            ></v-subheader
                          >
                        </v-flex>
                        <v-flex xs12 sm12 md7>
                          <h4>
                            <v-select
                              v-model="sourceData.data_unit"
                              :items="subunits"
                              dense
                              outlined
                            ></v-select>
                          </h4>
                        </v-flex>

                        <v-flex xs12 sm12 md3 offset-md1>
                          <v-subheader
                            >{{ $t("url") }}:
                            <span style="color: red">*</span>
                          </v-subheader>
                        </v-flex>
                        <v-flex xs12 sm12 md7>
                          <h4>
                            <v-text-field
                              v-model="sourceData.URL"
                              :placeholder="$t('urlDetails')"
                              outlined
                              dense
                            ></v-text-field>
                          </h4>
                        </v-flex>

                        <v-flex xs12 sm12 md3 offset-md1>
                          <v-subheader
                            >{{ $t("languse") }}:<span style="color: red"
                              >*</span
                            ></v-subheader
                          >
                        </v-flex>
                        <v-flex xs12 sm12 md7>
                          <h4>
                            <v-checkbox
                              v-for="format in language"
                              :key="format.id"
                              v-model="sourceData.data_language"
                              :label="format.title"
                              :value="format.value"
                              multiple
                              hide-details
                            ></v-checkbox>

                            <v-checkbox
                              v-model="enabled3"
                              :label="$t('others')"
                              hide-details
                            ></v-checkbox>
                            <v-col cols="12">
                              <v-text-field
                                :disabled="!enabled3"
                                :placeholder="$t('pleaseSpecify')"
                                v-model="data_language_other"
                                outlined
                                dense
                                required
                              ></v-text-field>
                            </v-col>
                          </h4>
                        </v-flex>

                        <v-flex xs12 sm12 md3 offset-md1>
                          <v-subheader
                            >{{ $t("datainitial") }}:
                            <span style="color: red">*</span>
                          </v-subheader>
                        </v-flex>
                        <v-flex xs12 sm12 md7>
                          <h4>
                            <v-menu
                              v-model="menu2"
                              :close-on-content-click="false"
                              :nudge-right="40"
                              transition="scale-transition"
                              offset-y
                              min-width="auto"
                            >
                              <template v-slot:activator="{ on, attrs }">
                                <v-text-field
                                  :value="
                                    convertToThaiDate(sourceData.created_date)
                                  "
                                  :label="$t('dateFormatLabel')"
                                  prepend-icon="mdi-calendar"
                                  readonly
                                  v-bind="attrs"
                                  v-on="on"
                                ></v-text-field>
                              </template>
                              <v-date-picker
                                v-model="sourceData.created_date"
                                :locale="currentLocale"
                                @input="menu = false"
                              ></v-date-picker>
                            </v-menu>
                          </h4>
                        </v-flex>

                        <v-flex xs12 sm12 md3 offset-md1>
                          <v-subheader
                            >{{ $t("lastupdate") }}:
                            <span style="color: red">*</span>
                          </v-subheader>
                        </v-flex>
                        <v-flex xs12 sm12 md7>
                          <h4>
                            <v-menu
                              v-model="menu3"
                              :close-on-content-click="false"
                              :nudge-right="40"
                              transition="scale-transition"
                              offset-y
                              min-width="auto"
                            >
                              <template v-slot:activator="{ on, attr }">
                                <v-text-field
                                  :value="
                                    convertToThaiDate(sourceData.modified_date)
                                  "
                                  :label="$t('dateFormatLabel')"
                                  prepend-icon="mdi-calendar"
                                  readonly
                                  v-bind="attr"
                                  v-on="on"
                                ></v-text-field>
                              </template>
                              <v-date-picker
                                v-model="sourceData.modified_date"
                                :locale="currentLocale"
                                @input="menu1 = false"
                              ></v-date-picker>
                            </v-menu>
                          </h4>
                        </v-flex>

                        <v-flex xs12 sm12 md3 offset-md1>
                          <v-subheader
                            >{{ $t("yearinitial") }}:<span style="color: red"
                              >*</span
                            ></v-subheader
                          >
                        </v-flex>
                        <v-flex xs12 sm12 md7>
                          <h4>
                            <v-text-field
                              v-model="sourceData.startyear"
                              outlined
                              dense
                              required
                            ></v-text-field>
                          </h4>
                        </v-flex>
                        <v-flex xs12 sm12 md3 offset-md1>
                          <v-subheader
                            >{{ $t("yearrelease") }}:<span style="color: red"
                              >*</span
                            ></v-subheader
                          >
                        </v-flex>
                        <v-flex xs12 sm12 md7>
                          <h4>
                            <v-text-field
                              v-model="sourceData.currentyear"
                              outlined
                              dense
                              required
                            ></v-text-field>
                          </h4>
                        </v-flex>

                        <v-flex xs12 sm12 md3 offset-md1>
                          <v-subheader
                            >{{ $t("classification") }}:<span style="color: red"
                              >*</span
                            ></v-subheader
                          >
                        </v-flex>
                        <v-flex xs12 sm12 md7>
                          <h4>
                            <v-checkbox
                              v-for="format in classify"
                              :key="format.id"
                              v-model="sourceData.data_classify"
                              :label="format.title"
                              :value="format.value"
                              multiple
                              hide-details
                            ></v-checkbox>

                            <v-checkbox
                              v-model="enabled4"
                              :label="$t('others')"
                              hide-details
                            ></v-checkbox>
                            <v-col cols="12">
                              <v-text-field
                                :disabled="!enabled4"
                                :placeholder="$t('pleaseSpecify')"
                                v-model="data_classify_other"
                                outlined
                                dense
                                required
                              ></v-text-field>
                            </v-col>
                          </h4>
                        </v-flex>

                        <!-- <v-flex xs12 sm12 md3 offset-md1>
                            <v-subheader>ข้อมูลอ้างอิง:<span style="color: red">*</span></v-subheader>
                          </v-flex>
                          <v-flex xs12 sm12 md7>
                            <h4>
                              <v-select v-model="sourceData.data_reference" :items="yesno" dense outlined></v-select>
                            </h4>
                          </v-flex> -->

                        <v-flex xs12 sm12 md3 offset-md1>
                          <v-subheader
                            >{{ $t("unitofmesurement") }}:
                            <span style="color: red">*</span></v-subheader
                          >
                        </v-flex>
                        <v-flex xs12 sm12 md7>
                          <h4>
                            <v-text-field
                              v-model="sourceData.measure"
                              outlined
                              dense
                              required
                            ></v-text-field>
                          </h4>
                        </v-flex>

                        <v-flex xs12 sm12 md3 offset-md1>
                          <v-subheader
                            >{{ $t("multiunit") }}:<span style="color: red"
                              >*</span
                            ></v-subheader
                          >
                        </v-flex>
                        <v-flex xs12 sm12 md7>
                          <h4>
                            <v-select
                              v-model="sourceData.data_multiplier_unit"
                              :items="multiplier_unit"
                              dense
                              outlined
                            ></v-select>
                          </h4>
                        </v-flex>

                        <v-flex xs12 sm12 md3 offset-md1>
                          <v-subheader
                            >{{ $t("calculation-method") }}:
                            <span style="color: red">*</span></v-subheader
                          >
                        </v-flex>
                        <v-flex xs12 sm12 md7>
                          <h4>
                            <v-textarea
                              v-model="sourceData.calculation"
                              outlined
                              dense
                              required
                            ></v-textarea>
                          </h4>
                        </v-flex>

                        <v-flex xs12 sm12 md3 offset-md1>
                          <v-subheader
                            >{{ $t("datapreparation") }}:<span
                              style="color: red"
                              >*</span
                            ></v-subheader
                          >
                        </v-flex>
                        <v-flex xs12 sm12 md7>
                          <h4>
                            <v-text-field
                              v-model="sourceData.data_standards"
                              outlined
                              dense
                              required
                            ></v-text-field>
                          </h4>
                        </v-flex>

                        <v-flex xs12 sm12 md3 offset-md1>
                          <v-subheader
                            >{{ $t("offstatic") }}:<span style="color: red"
                              >*</span
                            ></v-subheader
                          >
                        </v-flex>
                        <v-flex xs12 sm12 md7>
                          <h4>
                            <v-select
                              v-model="sourceData.official"
                              :items="yesno"
                              dense
                              outlined
                            ></v-select>
                          </h4>
                        </v-flex>
                      </v-layout>
                    </v-flex>
                    <v-flex offset-md9 pt-5>
                      <v-btn
                        :disabled="!valid"
                        color="success"
                        @click="save2(false)"
                        >{{ $t("save") }}</v-btn
                      >
                      <v-btn
                        :disabled="!valid"
                        color="success"
                        @click="save2(true)"
                        >{{ $t("saveandaddfile") }}</v-btn
                      >
                    </v-flex>
                  </v-form>

                  <!-- endtab2 -->
                </v-card-text>
              </v-card>
            </v-tab-item>
            <v-tab-item>
              <v-card flat>
                <v-card-text>
                  <v-form ref="form" v-model="valid" lazy-validation>
                    <v-flex md10>
                      <v-layout row wrap class="pt-5">
                        <v-flex xs12 sm12 md3 offset-md1>
                          <v-subheader
                            >{{ $t("reprotid") }}
                            <span style="color: red">*</span></v-subheader
                          >
                        </v-flex>
                        <v-flex xs12 sm12 md7>
                          <h4>
                            <v-text-field
                              v-model="sourceData.source_id"
                              required
                              :rules="RuleEnglish"
                              :label="$t('dataSetCodeLabel')"
                            ></v-text-field>
                          </h4>
                        </v-flex>
                        <!-- <v-flex md1 pl-3>
                          <v-btn fab dark small color="primary" @click="(dialog = true), getData()">
                            <v-icon color="white">search</v-icon>
                          </v-btn>
                        </v-flex> -->
                        <!-- <v-flex xs12 sm12 md3 offset-md1>
                          <v-subheader>File Name <span style="color: red">*</span></v-subheader>
                        </v-flex>
                        <v-flex xs12 sm12 md7>
                          <h4>
                            <v-text-field label="กรอกรหัสชุดข้อมูลตัวอย่าง A001 เป็นภาษาอังกฤษหรือภาษาไทยและห้ามเว้นวรรค"
                              required :rules="Rule" v-model="sourceData.file_name">
                            </v-text-field>
                          </h4>
                        </v-flex> -->

                        <v-flex xs12 sm12 md3 offset-md1>
                          <v-subheader
                            >{{ $t("category")
                            }}<span style="color: red">*</span></v-subheader
                          >
                        </v-flex>
                        <v-flex xs12 sm12 md7>
                          <h4>
                            <v-select
                              item-text="name"
                              item-value="category_id"
                              :items="itemCategory"
                              :label="$t('selectCategoryLabel')"
                              v-model="sourceData.category_id"
                              @change="getSubCategory()"
                            ></v-select>
                          </h4>
                        </v-flex>
                        <v-flex xs12 sm12 md3 offset-md1>
                          <v-subheader
                            >{{ $t("subcategory")
                            }}<span style="color: red">*</span></v-subheader
                          >
                        </v-flex>
                        <v-flex xs12 sm12 md7>
                          <h4>
                            <v-select
                              :items="itemSubCategory"
                              item-text="sub_category_name"
                              item-value="sub_category_id"
                              :label="$t('subCategoryLabel')"
                              v-model="sourceData.sub_category_id"
                            ></v-select>
                          </h4>
                        </v-flex>
                        <v-flex md1 pl-3>
                          <v-btn
                            icon
                            color="primary"
                            @click="(dialog = true), addsub()"
                          >
                            <v-icon>add_circle</v-icon>
                          </v-btn>
                        </v-flex>

                        <v-flex xs12 sm12 md3 offset-md1>
                          <v-subheader
                            >{{ $t("status")
                            }}<span style="color: red">*</span></v-subheader
                          >
                        </v-flex>
                        <v-flex xs12 sm12 md7>
                          <h4>
                            <v-select
                              :items="status"
                              v-model="sourceData.status"
                              required
                              :rules="Rules"
                              :label="$t('statusLabel')"
                            ></v-select>
                          </h4>
                        </v-flex>

                        <!-- <v-flex xs12 sm12 md3 offset-md1>
                            <v-subheader>ประเภทชุดข้อมูล:<span style="color: red">*</span></v-subheader>
                          </v-flex>
                          <v-flex xs12 sm12 md7>
                            <h4>
                              <v-select :items="datatype" v-model="sourceData.data_type" dense outlined></v-select>
                            </h4>
                          </v-flex> -->

                        <v-flex xs12 sm12 md3 offset-md1>
                          <v-subheader
                            >{{ $t("datasetname") }} :<span style="color: red"
                              >*</span
                            ></v-subheader
                          >
                        </v-flex>
                        <v-flex xs12 sm12 md7>
                          <h4>
                            <v-text-field
                              v-model="sourceData.export_excel_name"
                              :rules="Rule"
                              :placeholder="$t('examplePlaceholder')"
                              outlined
                              required
                            ></v-text-field>
                          </h4>
                        </v-flex>

                        <v-flex xs12 sm12 md3 offset-md1>
                          <v-subheader
                            >{{ $t("org") }}:<span style="color: red"
                              >*</span
                            ></v-subheader
                          >
                        </v-flex>
                        <v-flex xs12 sm12 md7>
                          <h4>
                            <v-select
                              item-text="org_name"
                              item-value="org_name"
                              :items="organization"
                              v-model="sourceData.organization"
                              :rules="Rules"
                              dense
                              outlined
                              persistent-hint
                              return-object
                              single-line
                            ></v-select>
                          </h4>
                        </v-flex>

                        <v-flex xs12 sm12 md3 offset-md1>
                          <v-subheader
                            >{{ $t("accessibility") }}:<span style="color: red"
                              >*</span
                            ></v-subheader
                          >
                        </v-flex>
                        <v-flex xs12 sm12 md7>
                          <h4>
                            <v-select
                              item-text="title"
                              item-value="value"
                              :items="accessibility"
                              v-model="sourceData.access"
                              dense
                              outlined
                            ></v-select>
                          </h4>
                        </v-flex>

                        <v-flex xs12 sm12 md3 offset-md1>
                          <v-subheader
                            >{{ $t("contactname") }}:<span style="color: red"
                              >*</span
                            ></v-subheader
                          >
                        </v-flex>
                        <v-flex xs12 sm12 md7>
                          <h4>
                            <v-text-field
                              v-model="sourceData.contactor_name"
                              :rules="nameRules"
                              :placeholder="$t('agencyPlaceholder')"
                              outlined
                              dense
                              required
                            ></v-text-field>
                          </h4>
                        </v-flex>

                        <v-flex xs12 sm12 md3 offset-md1>
                          <v-subheader
                            >{{ $t("contactmail") }}:<span style="color: red"
                              >*</span
                            ></v-subheader
                          >
                        </v-flex>
                        <v-flex xs12 sm12 md7>
                          <h4>
                            <v-text-field
                              v-model="sourceData.contactor_email"
                              :placeholder="$t('emailPlaceholder')"
                              outlined
                              dense
                              required
                            ></v-text-field>
                          </h4>
                        </v-flex>

                        <v-flex xs12 sm12 md3 offset-md1>
                          <v-subheader
                            >{{ $t("tag") }}:<span style="color: red"
                              >*</span
                            ></v-subheader
                          >
                        </v-flex>
                        <v-flex xs12 sm12 md7>
                          <h4>
                            <!-- {{tag_string}} -->
                            <v-combobox
                              v-model="sourceData.tag"
                              :items="tag"
                              item-text="tags"
                              :value="tags"
                              :search-input.sync="search"
                              :hint="$t('maximumTags')"
                              :label="$t('categoryExamples')"
                              multiple
                              persistent-hint
                              small-chips
                            >
                              <template v-slot:no-data>
                                <v-list-item>
                                  <v-list-item-content>
                                    <v-list-item-title>
                                      No results matching "<strong>{{
                                        search
                                      }}</strong
                                      >". Press <kbd>enter</kbd> to create a new
                                      one
                                    </v-list-item-title>
                                  </v-list-item-content>
                                </v-list-item>
                              </template>
                            </v-combobox>
                          </h4>
                        </v-flex>

                        <v-flex xs12 sm12 md3 offset-md1>
                          <v-subheader
                            >{{ $t("des") }}:<span style="color: red"
                              >*</span
                            ></v-subheader
                          >
                        </v-flex>
                        <v-flex xs12 sm12 md7>
                          <h4>
                            <v-textarea
                              v-model="sourceData.description"
                              auto-grow
                              outlined
                              rows="3"
                              row-height="20"
                              shaped
                            ></v-textarea>
                          </h4>
                        </v-flex>

                        <v-flex xs12 sm12 md3 offset-md1>
                          <v-subheader
                            >{{ $t("objective") }}:<span style="color: red"
                              >*</span
                            ></v-subheader
                          >
                        </v-flex>
                        <v-flex xs12 sm12 md7>
                          <h4>
                            <v-checkbox
                              v-for="checkbox in check"
                              :key="checkbox.id"
                              v-model="sourceData.objective"
                              :value="checkbox.value"
                              :label="checkbox.title"
                              hide-details
                            ></v-checkbox>
                            <v-checkbox
                              v-model="enabled1"
                              :label="$t('others')"
                              hide-details
                            ></v-checkbox>
                            <v-col cols="12">
                              <v-text-field
                                :disabled="!enabled1"
                                :placeholder="$t('pleaseSpecify')"
                                v-model="objective_other"
                                outlined
                                dense
                                required
                              ></v-text-field>
                              <!-- {{objective}} -->
                            </v-col>
                          </h4>
                        </v-flex>

                        <v-flex xs12 sm12 md3 offset-md1>
                          <v-subheader
                            >{{ $t("data-relate-unit") }}:<span
                              style="color: red"
                              >*</span
                            ></v-subheader
                          >
                        </v-flex>
                        <v-flex xs12 sm12 md7>
                          <h4>
                            <v-select
                              :items="frequency"
                              v-model="sourceData.frequency"
                              dense
                              outlined
                            ></v-select>
                          </h4>
                        </v-flex>

                        <v-flex xs12 sm12 md3 offset-md1>
                          <v-subheader
                            >{{ $t("dataupdate") }}:
                            <span style="color: red">*</span>
                          </v-subheader>
                        </v-flex>
                        <v-flex xs12 sm12 md7>
                          <h4>
                            <v-text-field
                              v-model="sourceData.frequency_unit"
                              :placeholder="$t('number_placeholder')"
                              outlined
                              dense
                            ></v-text-field>
                          </h4>
                        </v-flex>

                        <v-flex xs12 sm12 md3 offset-md1>
                          <v-subheader
                            >{{ $t("geo") }}:<span style="color: red"
                              >*</span
                            ></v-subheader
                          >
                        </v-flex>
                        <v-flex xs12 sm12 md7>
                          <h4>
                            <v-select
                              :items="Geo"
                              v-model="sourceData.geo_coverage"
                              dense
                              outlined
                            ></v-select>
                          </h4>
                        </v-flex>

                        <v-flex xs12 sm12 md3 offset-md1>
                          <v-subheader
                            >{{ $t("source") }}:<span style="color: red"
                              >*</span
                            ></v-subheader
                          >
                        </v-flex>
                        <v-flex xs12 sm12 md7>
                          <h4>
                            <v-text-field
                              v-model="sourceData.data_source"
                              :rules="nameRules"
                              :placeholder="$t('source_placeholder')"
                              outlined
                              dense
                              required
                            ></v-text-field>
                          </h4>
                        </v-flex>

                        <v-flex xs12 sm12 md3 offset-md1>
                          <v-subheader
                            >{{ $t("datacollect") }}:<span style="color: red"
                              >*</span
                            ></v-subheader
                          >
                        </v-flex>
                        <v-flex xs12 sm12 md7>
                          <h4>
                            <v-checkbox
                              v-for="format in data_format"
                              :key="format.id"
                              v-model="sourceData.data_storage"
                              :label="format.title"
                              :value="format.value"
                              multiple
                              hide-details
                            ></v-checkbox>

                            <v-checkbox
                              v-model="enabled2"
                              :label="$t('others')"
                              hide-details
                            ></v-checkbox>
                            <v-col cols="12">
                              <v-text-field
                                :disabled="!enabled2"
                                :placeholder="$t('pleaseSpecify')"
                                v-model="data_storage_other"
                                outlined
                                dense
                                required
                              ></v-text-field>
                            </v-col>
                          </h4>
                        </v-flex>

                        <v-flex xs12 sm12 md3 offset-md1>
                          <v-subheader
                            >{{ $t("govcate") }}:<span style="color: red"
                              >*</span
                            ></v-subheader
                          >
                        </v-flex>
                        <v-flex xs12 sm12 md7>
                          <h4>
                            <v-select
                              :items="Category"
                              v-model="sourceData.topic_gorvernance"
                              label=""
                              dense
                              outlined
                            ></v-select>
                          </h4>
                        </v-flex>

                        <v-flex xs12 sm12 md3 offset-md1>
                          <v-subheader
                            >{{ $t("datalicese") }}:<span style="color: red"
                              >*</span
                            ></v-subheader
                          >
                        </v-flex>
                        <v-flex xs12 sm7 md7>
                          <h4>
                            <v-select
                              :items="License"
                              v-model="sourceData.data_license"
                              label=""
                              dense
                              outlined
                            ></v-select>
                          </h4>
                        </v-flex>
                        <v-flex md1 pl-3>
                          <v-tooltip bottom>
                            <template v-slot:activator="{ on, attrs }">
                              <v-icon v-bind="attrs" v-on="on" class="ml-2"
                                >mdi_information</v-icon
                              >
                            </template>
                            <span>
                              {{ $t("creativeCommonsAttributions") }}<br />
                              {{ $t("creativeCommonsAttributionShareAlike")
                              }}<br />
                              {{ $t("creativeCommonsNonCommercial") }}<br />
                              {{ $t("openDataCommon") }}<br />
                              {{ $t("gnuFreeDocumentationLicense") }}<br />
                              {{ $t("licenseNotSpecified") }}<br />
                              {{ $t("othersLicense") }}
                            </span>
                          </v-tooltip>
                        </v-flex>

                        <v-flex xs12 sm12 md3 offset-md1>
                          <v-subheader
                            >{{ $t("conditions") }}:
                            <span style="color: red">*</span>
                          </v-subheader>
                        </v-flex>
                        <v-flex xs12 sm12 md7>
                          <h5>
                            <v-textarea
                              :label="$t('accessConditions')"
                              v-model="sourceData.data_condition"
                              auto-grow
                              outlined
                              rows="4"
                              row-height="20"
                              shaped
                            ></v-textarea>
                          </h5>
                        </v-flex>

                        <v-flex xs12 sm12 md3 offset-md1>
                          <v-subheader
                            >{{ $t("sponsor") }}:<span style="color: red"
                              >*</span
                            ></v-subheader
                          >
                        </v-flex>
                        <v-flex xs12 sm12 md7>
                          <h4>
                            <v-select
                              v-model="sourceData.supporter"
                              :items="subporter"
                              dense
                              outlined
                            ></v-select>
                          </h4>
                        </v-flex>

                        <v-flex xs12 sm12 md3 offset-md1>
                          <v-subheader
                            >{{ $t("smallestunit") }}:<span style="color: red"
                              >*</span
                            ></v-subheader
                          >
                        </v-flex>
                        <v-flex xs12 sm12 md7>
                          <h4>
                            <v-select
                              v-model="sourceData.data_unit"
                              :items="subunits"
                              dense
                              outlined
                            ></v-select>
                          </h4>
                        </v-flex>

                        <v-flex xs12 sm12 md3 offset-md1>
                          <v-subheader
                            >{{ $t("url") }}:
                            <span style="color: red">*</span>
                          </v-subheader>
                        </v-flex>
                        <v-flex xs12 sm12 md7>
                          <h4>
                            <v-text-field
                              v-model="sourceData.URL"
                              :placeholder="$t('urlDetails')"
                              outlined
                              dense
                            ></v-text-field>
                          </h4>
                        </v-flex>

                        <v-flex xs12 sm12 md3 offset-md1>
                          <v-subheader
                            >{{ $t("languse") }}:<span style="color: red"
                              >*</span
                            ></v-subheader
                          >
                        </v-flex>
                        <v-flex xs12 sm12 md7>
                          <h4>
                            <v-checkbox
                              v-for="format in language"
                              :key="format.id"
                              v-model="sourceData.data_language"
                              :label="format.title"
                              :value="format.value"
                              multiple
                              hide-details
                            ></v-checkbox>

                            <v-checkbox
                              v-model="enabled3"
                              :label="$t('others')"
                              hide-details
                            ></v-checkbox>
                            <v-col cols="12">
                              <v-text-field
                                :disabled="!enabled3"
                                :placeholder="$t('pleaseSpecify')"
                                v-model="data_language_other"
                                outlined
                                dense
                                required
                              ></v-text-field>
                            </v-col>
                          </h4>
                        </v-flex>

                        <v-flex xs12 sm12 md3 offset-md1>
                          <v-subheader
                            >{{ $t("datainitial") }}:
                            <span style="color: red">*</span>
                          </v-subheader>
                        </v-flex>
                        <v-flex xs12 sm12 md7>
                          <h4>
                            <v-menu
                              v-model="menu4"
                              :close-on-content-click="false"
                              :nudge-right="40"
                              transition="scale-transition"
                              offset-y
                              min-width="auto"
                            >
                              <template v-slot:activator="{ on, attrs }">
                                <v-text-field
                                  :value="
                                    convertToThaiDate(sourceData.created_date)
                                  "
                                  :label="$t('dateFormatLabel')"
                                  prepend-icon="mdi-calendar"
                                  readonly
                                  v-bind="attrs"
                                  v-on="on"
                                ></v-text-field>
                              </template>
                              <v-date-picker
                                v-model="sourceData.created_date"
                                :locale="currentLocale"
                                @input="menu = false"
                              ></v-date-picker>
                            </v-menu>
                          </h4>
                        </v-flex>

                        <v-flex xs12 sm12 md3 offset-md1>
                          <v-subheader
                            >{{ $t("lastupdate") }}:
                            <span style="color: red">*</span>
                          </v-subheader>
                        </v-flex>
                        <v-flex xs12 sm12 md7>
                          <h4>
                            <v-menu
                              v-model="menu5"
                              :close-on-content-click="false"
                              :nudge-right="40"
                              transition="scale-transition"
                              offset-y
                              min-width="auto"
                            >
                              <template v-slot:activator="{ on, attr }">
                                <v-text-field
                                  :value="
                                    convertToThaiDate(sourceData.modified_date)
                                  "
                                  :label="$t('dateFormatLabel')"
                                  prepend-icon="mdi-calendar"
                                  readonly
                                  v-bind="attr"
                                  v-on="on"
                                ></v-text-field>
                              </template>
                              <v-date-picker
                                v-model="sourceData.modified_date"
                                :locale="currentLocale"
                                @input="menu1 = false"
                              ></v-date-picker>
                            </v-menu>
                          </h4>
                        </v-flex>

                        <v-flex xs12 sm12 md4 offset-md1>
                          <v-subheader
                            >{{ $t("geodata") }}:<span style="color: red"
                              >*</span
                            ></v-subheader
                          >
                        </v-flex>
                        <v-flex xs12 sm12 md6>
                          <h4>
                            <v-select
                              v-model="sourceData.geo"
                              :items="geo"
                              dense
                              outlined
                            ></v-select>
                          </h4>
                        </v-flex>

                        <v-flex xs12 sm12 md4 offset-md1>
                          <v-subheader
                            >{{ $t("scale") }}:<span style="color: red"
                              >*</span
                            ></v-subheader
                          >
                        </v-flex>
                        <v-flex xs12 sm12 md6>
                          <h4>
                            <v-select
                              v-model="sourceData.scale"
                              :items="scale"
                              dense
                              outlined
                            ></v-select>
                          </h4>
                        </v-flex>

                        <v-flex xs12 sm12 md4 offset-md1>
                          <v-subheader
                            >{{ $t("west") }}:<span style="color: red"
                              >*</span
                            ></v-subheader
                          >
                        </v-flex>
                        <v-flex xs12 sm12 md6>
                          <h4>
                            <v-text-field
                              v-model="sourceData.west"
                              placeholder=""
                              outlined
                              dense
                            ></v-text-field>
                          </h4>
                        </v-flex>
                        <v-flex xs12 sm12 md4 offset-md1>
                          <v-subheader
                            >{{ $t("east") }}:<span style="color: red"
                              >*</span
                            ></v-subheader
                          >
                        </v-flex>
                        <v-flex xs12 sm12 md6>
                          <h4>
                            <v-text-field
                              v-model="sourceData.east"
                              placeholder=""
                              outlined
                              dense
                              required
                            ></v-text-field>
                          </h4>
                        </v-flex>
                        <v-flex xs12 sm12 md4 offset-md1>
                          <v-subheader
                            >{{ $t("north") }}:<span style="color: red"
                              >*</span
                            ></v-subheader
                          >
                        </v-flex>
                        <v-flex xs12 sm12 md6>
                          <h4>
                            <v-text-field
                              v-model="sourceData.north"
                              placeholder=""
                              outlined
                              dense
                              required
                            ></v-text-field>
                          </h4>
                        </v-flex>
                        <v-flex xs12 sm12 md4 offset-md1>
                          <v-subheader
                            >{{ $t("south") }}:<span style="color: red"
                              >*</span
                            ></v-subheader
                          >
                        </v-flex>
                        <v-flex xs12 sm12 md6>
                          <h4>
                            <v-text-field
                              v-model="sourceData.south"
                              placeholder=""
                              outlined
                              dense
                              required
                            ></v-text-field>
                          </h4>
                        </v-flex>
                        <v-flex xs12 sm12 md4 offset-md1>
                          <v-subheader
                            >{{ $t("locationaccuract") }}:<span
                              style="color: red"
                              >*</span
                            ></v-subheader
                          >
                        </v-flex>
                        <v-flex xs12 sm12 md6>
                          <h4>
                            <v-text-field
                              v-model="sourceData.positioning"
                              placeholder=""
                              outlined
                              dense
                              required
                            ></v-text-field>
                          </h4>
                        </v-flex>
                        <v-flex xs12 sm12 md4 offset-md1>
                          <v-subheader
                            >{{ $t("referencetime") }}:<span style="color: red"
                              >*</span
                            ></v-subheader
                          >
                        </v-flex>
                        <v-flex xs12 sm12 md6>
                          <h4>
                            <v-text-field
                              v-model="sourceData.reference_time"
                              placeholder=""
                              outlined
                              dense
                              required
                            ></v-text-field>
                          </h4>
                        </v-flex>
                        <v-flex xs12 sm12 md4 offset-md1>
                          <v-subheader
                            >{{ $t("dateofdatarelease") }}:<span
                              style="color: red"
                              >*</span
                            ></v-subheader
                          >
                        </v-flex>
                        <v-flex xs12 sm12 md6>
                          <h4>
                            <v-menu
                              v-model="menu6"
                              :close-on-content-click="false"
                              :nudge-right="40"
                              transition="scale-transition"
                              offset-y
                              min-width="auto"
                            >
                              <template v-slot:activator="{ on, attr }">
                                <v-text-field
                                  v-model="sourceData.release_date"
                                  :label="$t('dateFormatLabel')"
                                  prepend-icon="mdi-calendar"
                                  readonly
                                  v-bind="attr"
                                  v-on="on"
                                ></v-text-field>
                              </template>
                              <v-date-picker
                                v-model="sourceData.release_date"
                                @input="menu6 = false"
                              ></v-date-picker>
                            </v-menu>
                          </h4>
                        </v-flex>
                      </v-layout>
                    </v-flex>
                    <v-flex offset-md9 pt-5>
                      <v-btn
                        :disabled="!valid"
                        color="success"
                        @click="save3(false)"
                        >{{ $t("save") }}</v-btn
                      >
                      <v-btn
                        :disabled="!valid"
                        color="success"
                        @click="save3(true)"
                        >{{ $t("saveandaddfile") }}
                      </v-btn>
                    </v-flex>
                  </v-form>

                  <!-- endtab3 -->
                </v-card-text>
              </v-card>
            </v-tab-item>
            <v-tab-item>
              <v-card flat>
                <v-card-text>
                  <v-form ref="form" v-model="valid" lazy-validation>
                    <v-flex md10>
                      <v-layout row wrap class="pt-5">
                        <v-flex xs12 sm12 md3 offset-md1>
                          <v-subheader
                            >{{ $t("reprotid") }}
                            <span style="color: red">*</span></v-subheader
                          >
                        </v-flex>
                        <v-flex xs12 sm12 md7>
                          <h4>
                            <v-text-field
                              v-model="sourceData.source_id"
                              required
                              :rules="RuleEnglish"
                              :label="$t('dataSetCodeLabel')"
                            ></v-text-field>
                          </h4>
                        </v-flex>
                        <v-flex xs12 sm12 md3 offset-md1>
                          <v-subheader
                            >{{ $t("category")
                            }}<span style="color: red">*</span></v-subheader
                          >
                        </v-flex>
                        <v-flex xs12 sm12 md7>
                          <h4>
                            <v-select
                              item-text="name"
                              item-value="category_id"
                              :items="itemCategory"
                              :label="$t('selectCategoryLabel')"
                              v-model="sourceData.category_id"
                              @change="getSubCategory()"
                            ></v-select>
                          </h4>
                        </v-flex>
                        <v-flex xs12 sm12 md3 offset-md1>
                          <v-subheader
                            >{{ $t("subcategory")
                            }}<span style="color: red">*</span></v-subheader
                          >
                        </v-flex>
                        <v-flex xs12 sm12 md7>
                          <h4>
                            <v-select
                              :items="itemSubCategory"
                              item-text="sub_category_name"
                              item-value="sub_category_id"
                              :label="$t('subCategoryLabel')"
                              v-model="sourceData.sub_category_id"
                            ></v-select>
                          </h4>
                        </v-flex>
                        <v-flex md1 pl-3>
                          <v-btn
                            icon
                            color="primary"
                            @click="(dialog = true), addsub()"
                          >
                            <v-icon>add_circle</v-icon>
                          </v-btn>
                        </v-flex>

                        <v-flex xs12 sm12 md3 offset-md1>
                          <v-subheader
                            >{{ $t("status")
                            }}<span style="color: red">*</span></v-subheader
                          >
                        </v-flex>
                        <v-flex xs12 sm12 md7>
                          <h4>
                            <v-select
                              :items="status"
                              v-model="sourceData.status"
                              required
                              :rules="Rules"
                              :label="$t('statusLabel')"
                            ></v-select>
                          </h4>
                        </v-flex>

                        <!-- <v-flex xs12 sm12 md3 offset-md1>
                            <v-subheader>ประเภทชุดข้อมูล:<span style="color: red">*</span></v-subheader>
                          </v-flex>
                          <v-flex xs12 sm12 md7>
                            <h4>
                              <v-select :items="datatype" v-model="sourceData.data_type" dense outlined></v-select>
                            </h4>
                          </v-flex> -->

                        <v-flex xs12 sm12 md3 offset-md1>
                          <v-subheader
                            >{{ $t("datasetname") }} :<span style="color: red"
                              >*</span
                            ></v-subheader
                          >
                        </v-flex>
                        <v-flex xs12 sm12 md7>
                          <h4>
                            <v-text-field
                              v-model="sourceData.export_excel_name"
                              :rules="Rule"
                              :placeholder="$t('examplePlaceholder')"
                              outlined
                              required
                            ></v-text-field>
                          </h4>
                        </v-flex>

                        <v-flex xs12 sm12 md3 offset-md1>
                          <v-subheader
                            >{{ $t("org") }}:<span style="color: red"
                              >*</span
                            ></v-subheader
                          >
                        </v-flex>
                        <v-flex xs12 sm12 md7>
                          <h4>
                            <v-select
                              item-text="org_name"
                              item-value="org_name"
                              :items="organization"
                              v-model="sourceData.organization"
                              :rules="Rules"
                              dense
                              outlined
                              persistent-hint
                              return-object
                              single-line
                            ></v-select>
                          </h4>
                        </v-flex>

                        <v-flex xs12 sm12 md3 offset-md1>
                          <v-subheader
                            >{{ $t("accessibility") }}:<span style="color: red"
                              >*</span
                            ></v-subheader
                          >
                        </v-flex>
                        <v-flex xs12 sm12 md7>
                          <h4>
                            <v-select
                              item-text="title"
                              item-value="value"
                              :items="accessibility"
                              v-model="sourceData.access"
                              dense
                              outlined
                            ></v-select>
                          </h4>
                        </v-flex>

                        <v-flex xs12 sm12 md3 offset-md1>
                          <v-subheader
                            >{{ $t("contactname") }}:<span style="color: red"
                              >*</span
                            ></v-subheader
                          >
                        </v-flex>
                        <v-flex xs12 sm12 md7>
                          <h4>
                            <v-text-field
                              v-model="sourceData.contactor_name"
                              :rules="nameRules"
                              :placeholder="$t('agencyPlaceholder')"
                              outlined
                              dense
                              required
                            ></v-text-field>
                          </h4>
                        </v-flex>

                        <v-flex xs12 sm12 md3 offset-md1>
                          <v-subheader
                            >{{ $t("contactmail") }}:<span style="color: red"
                              >*</span
                            ></v-subheader
                          >
                        </v-flex>
                        <v-flex xs12 sm12 md7>
                          <h4>
                            <v-text-field
                              v-model="sourceData.contactor_email"
                              :placeholder="$t('emailPlaceholder')"
                              outlined
                              dense
                              required
                            ></v-text-field>
                          </h4>
                        </v-flex>

                        <v-flex xs12 sm12 md3 offset-md1>
                          <v-subheader
                            >{{ $t("tag") }}:<span style="color: red"
                              >*</span
                            ></v-subheader
                          >
                        </v-flex>
                        <v-flex xs12 sm12 md7>
                          <h4>
                            <!-- {{tag_string}} -->
                            <v-combobox
                              v-model="sourceData.tag"
                              :items="tag"
                              item-text="tags"
                              :value="tags"
                              :search-input.sync="search"
                              :hint="$t('maximumTags')"
                              :label="$t('categoryExamples')"
                              multiple
                              persistent-hint
                              small-chips
                            >
                              <template v-slot:no-data>
                                <v-list-item>
                                  <v-list-item-content>
                                    <v-list-item-title>
                                      No results matching "<strong>{{
                                        search
                                      }}</strong
                                      >". Press <kbd>enter</kbd> to create a new
                                      one
                                    </v-list-item-title>
                                  </v-list-item-content>
                                </v-list-item>
                              </template>
                            </v-combobox>
                          </h4>
                        </v-flex>

                        <v-flex xs12 sm12 md3 offset-md1>
                          <v-subheader
                            >{{ $t("des") }}:<span style="color: red"
                              >*</span
                            ></v-subheader
                          >
                        </v-flex>
                        <v-flex xs12 sm12 md7>
                          <h4>
                            <v-textarea
                              v-model="sourceData.description"
                              auto-grow
                              outlined
                              rows="3"
                              row-height="20"
                              shaped
                              required
                            ></v-textarea>
                          </h4>
                        </v-flex>

                        <v-flex xs12 sm12 md3 offset-md1>
                          <v-subheader
                            >{{ $t("objective") }}:<span style="color: red"
                              >*</span
                            ></v-subheader
                          >
                        </v-flex>
                        <v-flex xs12 sm12 md7>
                          <h4>
                            <v-checkbox
                              v-for="checkbox in check"
                              :key="checkbox.id"
                              v-model="sourceData.objective"
                              :value="checkbox.value"
                              :label="checkbox.title"
                              hide-details
                            ></v-checkbox>
                            <v-checkbox
                              v-model="enabled1"
                              :label="$t('others')"
                              hide-details
                            ></v-checkbox>
                            <v-col cols="12">
                              <v-text-field
                                :disabled="!enabled1"
                                :placeholder="$t('pleaseSpecify')"
                                v-model="objective_other"
                                outlined
                                dense
                                required
                              ></v-text-field>
                              <!-- {{objective}} -->
                            </v-col>
                          </h4>
                        </v-flex>

                        <v-flex xs12 sm12 md3 offset-md1>
                          <v-subheader
                            >{{ $t("data-relate-unit") }}:<span
                              style="color: red"
                              >*</span
                            ></v-subheader
                          >
                        </v-flex>
                        <v-flex xs12 sm12 md7>
                          <h4>
                            <v-select
                              :items="frequency"
                              v-model="sourceData.frequency"
                              dense
                              outlined
                            ></v-select>
                          </h4>
                        </v-flex>

                        <v-flex xs12 sm12 md3 offset-md1>
                          <v-subheader
                            >{{ $t("dataupdate") }}:
                            <span style="color: red">*</span>
                          </v-subheader>
                        </v-flex>
                        <v-flex xs12 sm12 md7>
                          <h4>
                            <v-text-field
                              v-model="sourceData.frequency_unit"
                              :placeholder="$t('number_placeholder')"
                              outlined
                              dense
                              required
                            ></v-text-field>
                          </h4>
                        </v-flex>

                        <v-flex xs12 sm12 md3 offset-md1>
                          <v-subheader
                            >{{ $t("geo") }}:<span style="color: red"
                              >*</span
                            ></v-subheader
                          >
                        </v-flex>
                        <v-flex xs12 sm12 md7>
                          <h4>
                            <v-select
                              :items="Geo"
                              v-model="sourceData.geo_coverage"
                              dense
                              outlined
                            ></v-select>
                          </h4>
                        </v-flex>

                        <v-flex xs12 sm12 md3 offset-md1>
                          <v-subheader
                            >{{ $t("source") }}:<span style="color: red"
                              >*</span
                            ></v-subheader
                          >
                        </v-flex>
                        <v-flex xs12 sm12 md7>
                          <h4>
                            <v-text-field
                              v-model="sourceData.data_source"
                              :rules="nameRules"
                              :placeholder="$t('source_placeholder')"
                              outlined
                              dense
                              required
                            ></v-text-field>
                          </h4>
                        </v-flex>

                        <v-flex xs12 sm12 md3 offset-md1>
                          <v-subheader
                            >{{ $t("datacollect") }}:<span style="color: red"
                              >*</span
                            ></v-subheader
                          >
                        </v-flex>
                        <v-flex xs12 sm12 md7>
                          <h4>
                            <v-checkbox
                              v-for="format in data_format"
                              :key="format.id"
                              v-model="sourceData.data_storage"
                              :label="format.title"
                              :value="format.value"
                              multiple
                              hide-details
                            ></v-checkbox>

                            <v-checkbox
                              v-model="enabled2"
                              :label="$t('others')"
                              hide-details
                            ></v-checkbox>
                            <v-col cols="12">
                              <v-text-field
                                :disabled="!enabled2"
                                :placeholder="$t('pleaseSpecify')"
                                v-model="data_storage_other"
                                outlined
                                dense
                                required
                              ></v-text-field>
                            </v-col>
                          </h4>
                        </v-flex>

                        <v-flex xs12 sm12 md3 offset-md1>
                          <v-subheader
                            >{{ $t("govcate") }}:<span style="color: red"
                              >*</span
                            ></v-subheader
                          >
                        </v-flex>
                        <v-flex xs12 sm12 md7>
                          <h4>
                            <v-select
                              :items="Category"
                              v-model="sourceData.topic_gorvernance"
                              label=""
                              dense
                              outlined
                            ></v-select>
                          </h4>
                        </v-flex>

                        <v-flex xs12 sm12 md3 offset-md1>
                          <v-subheader
                            >{{ $t("datalicese") }}:<span style="color: red"
                              >*</span
                            ></v-subheader
                          >
                        </v-flex>
                        <v-flex xs12 sm7 md7>
                          <h4>
                            <v-select
                              :items="License"
                              v-model="sourceData.data_license"
                              label=""
                              dense
                              outlined
                            ></v-select>
                          </h4>
                        </v-flex>
                        <v-flex md1 pl-3>
                          <v-tooltip bottom>
                            <template v-slot:activator="{ on, attrs }">
                              <v-icon v-bind="attrs" v-on="on" class="ml-2"
                                >mdi_information</v-icon
                              >
                            </template>
                            <span>
                              {{ $t("creativeCommonsAttributions") }}<br />
                              {{ $t("creativeCommonsAttributionShareAlike")
                              }}<br />
                              {{ $t("creativeCommonsNonCommercial") }}<br />
                              {{ $t("openDataCommon") }}<br />
                              {{ $t("gnuFreeDocumentationLicense") }}<br />
                              {{ $t("licenseNotSpecified") }}<br />
                              {{ $t("othersLicense") }}
                            </span>
                          </v-tooltip>
                        </v-flex>

                        <v-flex xs12 sm12 md3 offset-md1>
                          <v-subheader
                            >{{ $t("conditions") }}:
                            <span style="color: red">*</span>
                          </v-subheader>
                        </v-flex>
                        <v-flex xs12 sm12 md7>
                          <h5>
                            <v-textarea
                              :label="$t('accessConditions')"
                              v-model="sourceData.data_condition"
                              auto-grow
                              outlined
                              rows="4"
                              row-height="20"
                              shaped
                            ></v-textarea>
                          </h5>
                        </v-flex>

                        <v-flex xs12 sm12 md3 offset-md1>
                          <v-subheader
                            >{{ $t("sponsor") }}:<span style="color: red"
                              >*</span
                            ></v-subheader
                          >
                        </v-flex>
                        <v-flex xs12 sm12 md7>
                          <h4>
                            <v-select
                              v-model="sourceData.supporter"
                              :items="subporter"
                              dense
                              outlined
                            ></v-select>
                          </h4>
                        </v-flex>

                        <v-flex xs12 sm12 md3 offset-md1>
                          <v-subheader
                            >{{ $t("smallestunit") }}:<span style="color: red"
                              >*</span
                            ></v-subheader
                          >
                        </v-flex>
                        <v-flex xs12 sm12 md7>
                          <h4>
                            <v-select
                              v-model="sourceData.data_unit"
                              :items="subunits"
                              dense
                              outlined
                            ></v-select>
                          </h4>
                        </v-flex>

                        <v-flex xs12 sm12 md3 offset-md1>
                          <v-subheader
                            >{{ $t("url") }}:
                            <span style="color: red">*</span>
                          </v-subheader>
                        </v-flex>
                        <v-flex xs12 sm12 md7>
                          <h4>
                            <v-text-field
                              v-model="sourceData.URL"
                              :placeholder="$t('urlDetails')"
                              outlined
                              dense
                              required
                            ></v-text-field>
                          </h4>
                        </v-flex>

                        <v-flex xs12 sm12 md3 offset-md1>
                          <v-subheader
                            >{{ $t("languse") }}:<span style="color: red"
                              >*</span
                            ></v-subheader
                          >
                        </v-flex>
                        <v-flex xs12 sm12 md7>
                          <h4>
                            <v-checkbox
                              v-for="format in language"
                              :key="format.id"
                              v-model="sourceData.data_language"
                              :label="format.title"
                              :value="format.value"
                              multiple
                              hide-details
                            ></v-checkbox>

                            <v-checkbox
                              v-model="enabled3"
                              :label="$t('others')"
                              hide-details
                            ></v-checkbox>
                            <v-col cols="12">
                              <v-text-field
                                :disabled="!enabled3"
                                :placeholder="$t('pleaseSpecify')"
                                v-model="data_language_other"
                                outlined
                                dense
                                required
                              ></v-text-field>
                            </v-col>
                          </h4>
                        </v-flex>

                        <v-flex xs12 sm12 md3 offset-md1>
                          <v-subheader
                            >{{ $t("datainitial") }}:
                            <span style="color: red">*</span>
                          </v-subheader>
                        </v-flex>
                        <v-flex xs12 sm12 md7>
                          <h4>
                            <v-menu
                              v-model="menu7"
                              :close-on-content-click="false"
                              :nudge-right="40"
                              transition="scale-transition"
                              offset-y
                              min-width="auto"
                            >
                              <template v-slot:activator="{ on, attrs }">
                                <v-text-field
                                  :value="
                                    convertToThaiDate(sourceData.created_date)
                                  "
                                  :label="$t('dateFormatLabel')"
                                  prepend-icon="mdi-calendar"
                                  readonly
                                  v-bind="attrs"
                                  v-on="on"
                                ></v-text-field>
                              </template>
                              <v-date-picker
                                v-model="sourceData.created_date"
                                :locale="currentLocale"
                                @input="menu = false"
                              ></v-date-picker>
                            </v-menu>
                          </h4>
                        </v-flex>

                        <v-flex xs12 sm12 md3 offset-md1>
                          <v-subheader
                            >{{ $t("lastupdate") }}:
                            <span style="color: red">*</span>
                          </v-subheader>
                        </v-flex>
                        <v-flex xs12 sm12 md7>
                          <h4>
                            <v-menu
                              v-model="menu8"
                              :close-on-content-click="false"
                              :nudge-right="40"
                              transition="scale-transition"
                              offset-y
                              min-width="auto"
                            >
                              <template v-slot:activator="{ on, attr }">
                                <v-text-field
                                  :value="
                                    convertToThaiDate(sourceData.modified_date)
                                  "
                                  :label="$t('dateFormatLabel')"
                                  prepend-icon="mdi-calendar"
                                  readonly
                                  v-bind="attr"
                                  v-on="on"
                                ></v-text-field>
                              </template>
                              <v-date-picker
                                v-model="sourceData.modified_date"
                                :locale="currentLocale"
                                @input="menu1 = false"
                              ></v-date-picker>
                            </v-menu>
                          </h4>
                        </v-flex>

                        <v-flex xs12 sm12 md3 offset-md1>
                          <v-subheader
                            >{{ $t("hvd") }}:<span style="color: red"
                              >*</span
                            ></v-subheader
                          >
                        </v-flex>
                        <v-flex xs12 sm12 md7>
                          <h4>
                            <v-select
                              v-model="sourceData.high_value_dataset"
                              :items="yesno"
                              dense
                              outlined
                              required
                            ></v-select>
                          </h4>
                        </v-flex>

                        <v-flex xs12 sm12 md3 offset-md1>
                          <v-subheader
                            >{{ $t("rd") }}:<span style="color: red"
                              >*</span
                            ></v-subheader
                          >
                        </v-flex>
                        <v-flex xs12 sm12 md7>
                          <h4>
                            <v-select
                              v-model="sourceData.data_reference"
                              :items="yesno"
                              dense
                              outlined
                              required
                            ></v-select>
                          </h4>
                        </v-flex>
                      </v-layout>
                    </v-flex>
                    <v-flex offset-md9 pt-5>
                      <v-btn
                        :disabled="!valid"
                        color="success"
                        @click="save4(false)"
                        >{{ $t("save") }}</v-btn
                      >
                      <v-btn
                        :disabled="!valid"
                        color="success"
                        @click="save4(true)"
                        >{{ $t("saveandaddfile") }}</v-btn
                      >
                    </v-flex>
                  </v-form>

                  <!-- endtab4 -->
                </v-card-text>
              </v-card>
            </v-tab-item>
            <v-tab-item>
              <v-card flat>
                <v-card-text>
                  <v-form ref="form" v-model="valid" lazy-validation>
                    <v-flex md10>
                      <v-layout row wrap class="pt-5">
                        <v-flex xs12 sm12 md3 offset-md1>
                          <v-subheader
                            >{{ $t("reprotid") }}
                            <span style="color: red">*</span></v-subheader
                          >
                        </v-flex>
                        <v-flex xs12 sm12 md7>
                          <h4>
                            <v-text-field
                              v-model="sourceData.source_id"
                              required
                              :rules="RuleEnglish"
                              :label="$t('dataSetCodeLabel')"
                            ></v-text-field>
                          </h4>
                        </v-flex>
                        <!-- <v-flex md1 pl-3>
                          <v-btn fab dark small color="primary" @click="(dialog = true), getData()">
                            <v-icon color="white">search</v-icon>
                          </v-btn>
                        </v-flex> -->
                        <!-- <v-flex xs12 sm12 md3 offset-md1>
                          <v-subheader>File Name <span style="color: red">*</span></v-subheader>
                        </v-flex>
                        <v-flex xs12 sm12 md7>
                          <h4>
                            <v-text-field label="กรอกรหัสชุดข้อมูลตัวอย่าง A001 เป็นภาษาอังกฤษหรือภาษาไทยและห้ามเว้นวรรค"
                              required :rules="Rule" v-model="sourceData.file_name">
                            </v-text-field>
                          </h4>
                        </v-flex> -->

                        <v-flex xs12 sm12 md3 offset-md1>
                          <v-subheader
                            >{{ $t("category")
                            }}<span style="color: red">*</span></v-subheader
                          >
                        </v-flex>
                        <v-flex xs12 sm12 md7>
                          <h4>
                            <v-select
                              item-text="name"
                              item-value="category_id"
                              :items="itemCategory"
                              :label="$t('selectCategoryLabel')"
                              v-model="sourceData.category_id"
                              @change="getSubCategory()"
                            ></v-select>
                          </h4>
                        </v-flex>
                        <v-flex xs12 sm12 md3 offset-md1>
                          <v-subheader
                            >{{ $t("subcategory")
                            }}<span style="color: red">*</span></v-subheader
                          >
                        </v-flex>
                        <v-flex xs12 sm12 md7>
                          <h4>
                            <v-select
                              :items="itemSubCategory"
                              item-text="sub_category_name"
                              item-value="sub_category_id"
                              :label="$t('subCategoryLabel')"
                              v-model="sourceData.sub_category_id"
                            ></v-select>
                          </h4>
                        </v-flex>
                        <v-flex md1 pl-3>
                          <v-btn
                            icon
                            color="primary"
                            @click="(dialog = true), addsub()"
                          >
                            <v-icon>add_circle</v-icon>
                          </v-btn>
                        </v-flex>

                        <v-flex xs12 sm12 md3 offset-md1>
                          <v-subheader
                            >{{ $t("status")
                            }}<span style="color: red">*</span></v-subheader
                          >
                        </v-flex>
                        <v-flex xs12 sm12 md7>
                          <h4>
                            <v-select
                              :items="status"
                              v-model="sourceData.status"
                              required
                              :rules="Rules"
                              :label="$t('statusLabel')"
                            ></v-select>
                          </h4>
                        </v-flex>

                        <!-- <v-flex xs12 sm12 md3 offset-md1>
                            <v-subheader>ประเภทชุดข้อมูล:<span style="color: red">*</span></v-subheader>
                          </v-flex>
                          <v-flex xs12 sm12 md7>
                            <h4>
                              <v-select :items="datatype" v-model="sourceData.data_type" dense outlined></v-select>
                            </h4>
                          </v-flex> -->

                        <v-flex xs12 sm12 md3 offset-md1>
                          <v-subheader
                            >{{ $t("datasetname") }} :<span style="color: red"
                              >*</span
                            ></v-subheader
                          >
                        </v-flex>
                        <v-flex xs12 sm12 md7>
                          <h4>
                            <v-text-field
                              v-model="sourceData.export_excel_name"
                              :rules="Rule"
                              :placeholder="$t('examplePlaceholder')"
                              outlined
                              required
                            ></v-text-field>
                          </h4>
                        </v-flex>

                        <v-flex xs12 sm12 md3 offset-md1>
                          <v-subheader
                            >{{ $t("org") }}:<span style="color: red"
                              >*</span
                            ></v-subheader
                          >
                        </v-flex>
                        <v-flex xs12 sm12 md7>
                          <h4>
                            <v-select
                              item-text="org_name"
                              item-value="org_name"
                              :items="organization"
                              v-model="sourceData.organization"
                              :rules="Rules"
                              dense
                              outlined
                              persistent-hint
                              return-object
                              single-line
                            ></v-select>
                          </h4>
                        </v-flex>

                        <v-flex xs12 sm12 md3 offset-md1>
                          <v-subheader
                            >{{ $t("accessibility") }}:<span style="color: red"
                              >*</span
                            ></v-subheader
                          >
                        </v-flex>
                        <v-flex xs12 sm12 md7>
                          <h4>
                            <v-select
                              item-text="title"
                              item-value="value"
                              :items="accessibility"
                              v-model="sourceData.access"
                              dense
                              outlined
                            ></v-select>
                          </h4>
                        </v-flex>

                        <v-flex xs12 sm12 md3 offset-md1>
                          <v-subheader
                            >{{ $t("contactname") }}:<span style="color: red"
                              >*</span
                            ></v-subheader
                          >
                        </v-flex>
                        <v-flex xs12 sm12 md7>
                          <h4>
                            <v-text-field
                              v-model="sourceData.contactor_name"
                              :rules="nameRules"
                              :placeholder="$t('agencyPlaceholder')"
                              outlined
                              dense
                              required
                            ></v-text-field>
                          </h4>
                        </v-flex>

                        <v-flex xs12 sm12 md3 offset-md1>
                          <v-subheader
                            >{{ $t("contactmail") }}:<span style="color: red"
                              >*</span
                            ></v-subheader
                          >
                        </v-flex>
                        <v-flex xs12 sm12 md7>
                          <h4>
                            <v-text-field
                              v-model="sourceData.contactor_email"
                              :placeholder="$t('emailPlaceholder')"
                              outlined
                              dense
                              required
                            ></v-text-field>
                          </h4>
                        </v-flex>

                        <v-flex xs12 sm12 md3 offset-md1>
                          <v-subheader
                            >{{ $t("tag") }}:<span style="color: red"
                              >*</span
                            ></v-subheader
                          >
                        </v-flex>
                        <v-flex xs12 sm12 md7>
                          <h4>
                            <!-- {{tag_string}} -->
                            <v-combobox
                              v-model="sourceData.tag"
                              :items="tag"
                              item-text="tags"
                              :value="tags"
                              :search-input.sync="search"
                              :hint="$t('maximumTags')"
                              :label="$t('categoryExamples')"
                              multiple
                              persistent-hint
                              small-chips
                            >
                              <template v-slot:no-data>
                                <v-list-item>
                                  <v-list-item-content>
                                    <v-list-item-title>
                                      No results matching "<strong>{{
                                        search
                                      }}</strong
                                      >". Press <kbd>enter</kbd> to create a new
                                      one
                                    </v-list-item-title>
                                  </v-list-item-content>
                                </v-list-item>
                              </template>
                            </v-combobox>
                          </h4>
                        </v-flex>

                        <v-flex xs12 sm12 md3 offset-md1>
                          <v-subheader
                            >{{ $t("des") }}:<span style="color: red"
                              >*</span
                            ></v-subheader
                          >
                        </v-flex>
                        <v-flex xs12 sm12 md7>
                          <h4>
                            <v-textarea
                              v-model="sourceData.description"
                              auto-grow
                              outlined
                              rows="3"
                              row-height="20"
                              shaped
                            ></v-textarea>
                          </h4>
                        </v-flex>

                        <v-flex xs12 sm12 md3 offset-md1>
                          <v-subheader
                            >{{ $t("objective") }}:<span style="color: red"
                              >*</span
                            ></v-subheader
                          >
                        </v-flex>
                        <v-flex xs12 sm12 md7>
                          <h4>
                            <v-checkbox
                              v-for="checkbox in check"
                              :key="checkbox.id"
                              v-model="sourceData.objective"
                              :value="checkbox.value"
                              :label="checkbox.title"
                              hide-details
                            ></v-checkbox>
                            <v-checkbox
                              v-model="enabled1"
                              :label="$t('others')"
                              hide-details
                            ></v-checkbox>
                            <v-col cols="12">
                              <v-text-field
                                :disabled="!enabled1"
                                :placeholder="$t('pleaseSpecify')"
                                v-model="objective_other"
                                outlined
                                dense
                                required
                              ></v-text-field>
                              <!-- {{objective}} -->
                            </v-col>
                          </h4>
                        </v-flex>

                        <v-flex xs12 sm12 md3 offset-md1>
                          <v-subheader
                            >{{ $t("data-relate-unit") }}:<span
                              style="color: red"
                              >*</span
                            ></v-subheader
                          >
                        </v-flex>
                        <v-flex xs12 sm12 md7>
                          <h4>
                            <v-select
                              :items="frequency"
                              v-model="sourceData.frequency"
                              dense
                              outlined
                            ></v-select>
                          </h4>
                        </v-flex>

                        <v-flex xs12 sm12 md3 offset-md1>
                          <v-subheader
                            >{{ $t("dataupdate") }}:
                            <span style="color: red">*</span>
                          </v-subheader>
                        </v-flex>
                        <v-flex xs12 sm12 md7>
                          <h4>
                            <v-text-field
                              v-model="sourceData.frequency_unit"
                              :placeholder="$t('number_placeholder')"
                              outlined
                              dense
                            ></v-text-field>
                          </h4>
                        </v-flex>

                        <v-flex xs12 sm12 md3 offset-md1>
                          <v-subheader
                            >{{ $t("geo") }}:<span style="color: red"
                              >*</span
                            ></v-subheader
                          >
                        </v-flex>
                        <v-flex xs12 sm12 md7>
                          <h4>
                            <v-select
                              :items="Geo"
                              v-model="sourceData.geo_coverage"
                              dense
                              outlined
                            ></v-select>
                          </h4>
                        </v-flex>

                        <v-flex xs12 sm12 md3 offset-md1>
                          <v-subheader
                            >{{ $t("source") }}:<span style="color: red"
                              >*</span
                            ></v-subheader
                          >
                        </v-flex>
                        <v-flex xs12 sm12 md7>
                          <h4>
                            <v-text-field
                              v-model="sourceData.data_source"
                              :rules="nameRules"
                              :placeholder="$t('source_placeholder')"
                              outlined
                              dense
                              required
                            ></v-text-field>
                          </h4>
                        </v-flex>

                        <v-flex xs12 sm12 md3 offset-md1>
                          <v-subheader
                            >{{ $t("datacollect") }}:<span style="color: red"
                              >*</span
                            ></v-subheader
                          >
                        </v-flex>
                        <v-flex xs12 sm12 md7>
                          <h4>
                            <v-checkbox
                              v-for="format in data_format"
                              :key="format.id"
                              v-model="sourceData.data_storage"
                              :label="format.title"
                              :value="format.value"
                              multiple
                              hide-details
                            ></v-checkbox>

                            <v-checkbox
                              v-model="enabled2"
                              :label="$t('others')"
                              hide-details
                            ></v-checkbox>
                            <v-col cols="12">
                              <v-text-field
                                :disabled="!enabled2"
                                :placeholder="$t('pleaseSpecify')"
                                v-model="data_storage_other"
                                outlined
                                dense
                                required
                              ></v-text-field>
                            </v-col>
                          </h4>
                        </v-flex>

                        <v-flex xs12 sm12 md3 offset-md1>
                          <v-subheader
                            >{{ $t("govcate") }}:<span style="color: red"
                              >*</span
                            ></v-subheader
                          >
                        </v-flex>
                        <v-flex xs12 sm12 md7>
                          <h4>
                            <v-select
                              :items="Category"
                              v-model="sourceData.topic_gorvernance"
                              label=""
                              dense
                              outlined
                            ></v-select>
                          </h4>
                        </v-flex>

                        <v-flex xs12 sm12 md3 offset-md1>
                          <v-subheader
                            >{{ $t("datalicese") }}:<span style="color: red"
                              >*</span
                            ></v-subheader
                          >
                        </v-flex>
                        <v-flex xs12 sm7 md7>
                          <h4>
                            <v-select
                              :items="License"
                              v-model="sourceData.data_license"
                              label=""
                              dense
                              outlined
                            ></v-select>
                          </h4>
                        </v-flex>
                        <v-flex md1 pl-3>
                          <v-tooltip bottom>
                            <template v-slot:activator="{ on, attrs }">
                              <v-icon v-bind="attrs" v-on="on" class="ml-2"
                                >mdi_information</v-icon
                              >
                            </template>
                            <span>
                              {{ $t("creativeCommonsAttributions") }}<br />
                              {{ $t("creativeCommonsAttributionShareAlike")
                              }}<br />
                              {{ $t("creativeCommonsNonCommercial") }}<br />
                              {{ $t("openDataCommon") }}<br />
                              {{ $t("gnuFreeDocumentationLicense") }}<br />
                              {{ $t("licenseNotSpecified") }}<br />
                              {{ $t("othersLicense") }}
                            </span>
                          </v-tooltip>
                        </v-flex>
                        <v-flex xs12 sm12 md3 offset-md1>
                          <v-subheader
                            >{{ $t("conditions") }}:
                            <span style="color: red">*</span>
                          </v-subheader>
                        </v-flex>
                        <v-flex xs12 sm12 md7>
                          <h5>
                            <v-textarea
                              :label="$t('accessConditions')"
                              v-model="sourceData.data_condition"
                              auto-grow
                              outlined
                              rows="4"
                              row-height="20"
                              shaped
                              required
                            ></v-textarea>
                          </h5>
                        </v-flex>

                        <v-flex xs12 sm12 md3 offset-md1>
                          <v-subheader
                            >{{ $t("sponsor") }}:<span style="color: red"
                              >*</span
                            ></v-subheader
                          >
                        </v-flex>
                        <v-flex xs12 sm12 md7>
                          <h4>
                            <v-select
                              v-model="sourceData.supporter"
                              :items="subporter"
                              dense
                              outlined
                            ></v-select>
                          </h4>
                        </v-flex>

                        <v-flex xs12 sm12 md3 offset-md1>
                          <v-subheader
                            >{{ $t("smallestunit") }}:<span style="color: red"
                              >*</span
                            ></v-subheader
                          >
                        </v-flex>
                        <v-flex xs12 sm12 md7>
                          <h4>
                            <v-select
                              v-model="sourceData.data_unit"
                              :items="subunits"
                              dense
                              outlined
                            ></v-select>
                          </h4>
                        </v-flex>

                        <v-flex xs12 sm12 md3 offset-md1>
                          <v-subheader
                            >{{ $t("url") }}:
                            <span style="color: red">*</span>
                          </v-subheader>
                        </v-flex>
                        <v-flex xs12 sm12 md7>
                          <h4>
                            <v-text-field
                              v-model="sourceData.URL"
                              :placeholder="$t('urlDetails')"
                              outlined
                              dense
                            ></v-text-field>
                          </h4>
                        </v-flex>

                        <v-flex xs12 sm12 md3 offset-md1>
                          <v-subheader
                            >{{ $t("languse") }}:<span style="color: red"
                              >*</span
                            ></v-subheader
                          >
                        </v-flex>
                        <v-flex xs12 sm12 md7>
                          <h4>
                            <v-checkbox
                              v-for="format in language"
                              :key="format.id"
                              v-model="sourceData.data_language"
                              :label="format.title"
                              :value="format.value"
                              multiple
                              hide-details
                            ></v-checkbox>

                            <v-checkbox
                              v-model="enabled3"
                              :label="$t('others')"
                              hide-details
                            ></v-checkbox>
                            <v-col cols="12">
                              <v-text-field
                                :disabled="!enabled3"
                                :placeholder="$t('pleaseSpecify')"
                                v-model="data_language_other"
                                outlined
                                dense
                                required
                              ></v-text-field>
                            </v-col>
                          </h4>
                        </v-flex>

                        <v-flex xs12 sm12 md3 offset-md1>
                          <v-subheader
                            >{{ $t("datainitial") }}:
                            <span style="color: red">*</span>
                          </v-subheader>
                        </v-flex>
                        <v-flex xs12 sm12 md7>
                          <h4>
                            <v-menu
                              v-model="menu9"
                              :close-on-content-click="false"
                              :nudge-right="40"
                              transition="scale-transition"
                              offset-y
                              min-width="auto"
                            >
                              <template v-slot:activator="{ on, attrs }">
                                <v-text-field
                                  :value="
                                    convertToThaiDate(sourceData.created_date)
                                  "
                                  :label="$t('dateFormatLabel')"
                                  prepend-icon="mdi-calendar"
                                  readonly
                                  v-bind="attrs"
                                  v-on="on"
                                ></v-text-field>
                              </template>
                              <v-date-picker
                                v-model="sourceData.created_date"
                                :locale="currentLocale"
                                @input="menu = false"
                              ></v-date-picker>
                            </v-menu>
                          </h4>
                        </v-flex>

                        <v-flex xs12 sm12 md3 offset-md1>
                          <v-subheader
                            >{{ $t("lastupdate") }}:
                            <span style="color: red">*</span>
                          </v-subheader>
                        </v-flex>
                        <v-flex xs12 sm12 md7>
                          <h4>
                            <v-menu
                              v-model="menu10"
                              :close-on-content-click="false"
                              :nudge-right="40"
                              transition="scale-transition"
                              offset-y
                              min-width="auto"
                            >
                              <template v-slot:activator="{ on, attr }">
                                <v-text-field
                                  :value="
                                    convertToThaiDate(sourceData.modified_date)
                                  "
                                  :label="$t('dateFormatLabel')"
                                  prepend-icon="mdi-calendar"
                                  readonly
                                  v-bind="attr"
                                  v-on="on"
                                ></v-text-field>
                              </template>
                              <v-date-picker
                                v-model="sourceData.modified_date"
                                :locale="currentLocale"
                                @input="menu1 = false"
                              ></v-date-picker>
                            </v-menu>
                          </h4>
                        </v-flex>

                        <v-flex xs12 sm12 md3 offset-md1>
                          <v-subheader
                            >{{ $t("hvd") }}:<span style="color: red"
                              >*</span
                            ></v-subheader
                          >
                        </v-flex>
                        <v-flex xs12 sm12 md7>
                          <h4>
                            <v-select
                              v-model="sourceData.high_value_dataset"
                              :items="yesno"
                              dense
                              outlined
                            ></v-select>
                          </h4>
                        </v-flex>

                        <v-flex xs12 sm12 md3 offset-md1>
                          <v-subheader
                            >{{ $t("rd") }}:<span style="color: red"
                              >*</span
                            ></v-subheader
                          >
                        </v-flex>
                        <v-flex xs12 sm12 md7>
                          <h4>
                            <v-select
                              v-model="sourceData.data_reference"
                              :items="yesno"
                              dense
                              outlined
                            ></v-select>
                          </h4>
                        </v-flex>
                      </v-layout>
                    </v-flex>
                    <v-flex offset-md9 pt-5>
                      <v-btn
                        :disabled="!valid"
                        color="success"
                        @click="save5(false)"
                        >{{ $t("save") }}</v-btn
                      >
                      <v-btn
                        :disabled="!valid"
                        color="success"
                        @click="save5(true)"
                        >{{ $t("saveandaddfile") }}</v-btn
                      >
                    </v-flex>
                  </v-form>

                  <!-- endtab5 -->
                </v-card-text>
              </v-card>
            </v-tab-item>
          </v-tabs>

          <!-- end  -->
        </v-tab-item>

        <v-tab-item value="tab-2" lazy>
          <AddFile></AddFile>
        </v-tab-item>
        <v-tab-item value="tab-3" lazy>
          <addlink></addlink>
        </v-tab-item>
        <v-tab-item value="tab-4" lazy>
          <api></api>
        </v-tab-item>
        <v-tab-item value="tab-5" lazy>
          <edit></edit>
        </v-tab-item>
      </v-tabs>
      <dialogData ref="dialogData" @selectSource="dataSource" />
      <dialogStat ref="dialogStat" @selectSource="dataSource" />
      <DataLevel ref="DataLevel"></DataLevel>
      <addsub ref="addsub"></addsub>
      <dialogWord ref="search" @word_file="dataWord" />
      <dialog_add_data_source
        ref="dialog_add_data_source"
        @DataSource="card_datasource_byrepory"
      >
      </dialog_add_data_source>
      <dialog_External
        ref="dialog_External"
        @selectDataSourceExternal="DataSourceExternal"
      ></dialog_External>
    </v-card>
  </v-container>
</template>

<script>
import edit from "@/components/admin/metadata/edit2";
import dialogData from "@/components/admin/metadata/dialogMetadata";
import dialogStat from "@/components/admin/metadata/dialog/dialogstat";
import dialogWord from "@/components/admin/metadata/dialogWord";
import workbench from "@/components/admin/metadata/workbench";
import AddFile from "@/components/admin/metadata/AddFile";
import DataLevel from "@/components/admin/DataLevel";
import addsub from "@/components/admin/metadata/addsub";
import addlink from "@/components/admin/metadata/addlink";
import api from "@/components/admin/metadata/api";
import dialog_add_data_source from "@/components/admin/metadata/dialog_add_data_source";
import dialog_External from "@/components/admin/metadata/dialog_External";
import { Encode, Decode } from "@/services";
import { log } from "util";
export default {
  components: {
    edit,
    dialogData,
    dialogStat,
    workbench,
    AddFile,
    DataLevel,
    dialogWord,
    addsub,
    addlink,
    api,
    dialog_add_data_source,
    dialog_External,
  },
  data() {
    return {
      //New from**
      activeMetaTab: "tab-1",
      enabled: false,
      enabled1: false,
      enabled2: false,
      enabled3: false,
      enabled4: false,
      menu: false,
      modal: false,
      menu2: false,
      menu3: false,
      menu4: false,
      menu5: false,
      menu6: false,
      menu7: false,
      moda8: false,
      menu9: false,
      menu10: false,

      activator: null,
      attach: null,
      created_date: new Date(
        Date.now() - new Date().getTimezoneOffset() * 60000
      )
        .toISOString()
        .substr(0, 10),
      modified_date: new Date(
        Date.now() - new Date().getTimezoneOffset() * 60000
      )
        .toISOString()
        .substr(0, 10),
      tag: [],
      tag_string: [],
      datatype: [
        "ข้อมูลระเบียน",
        "ข้อมูลสถิติ",
        "ข้อมุลภูมิสารสนเทศเชิงพื้นที่",
        "ข้อมูลหลากหลายประเภท",
        "ข้อมูลประเภทอื่นๆ",
      ],
      organization: [],
      accessibility: [
        { title: this.$t("private"), value: true },
        { title: this.$t("public"), value: false },
      ],
      GDCatalog: ["ไม่ยินยอม", "ยินยอม"],
      frequency: [
        "ปี",
        "ครึ่งปี",
        "ไตรมาส",
        "เดือน",
        "สัปดาห์",
        "วัน",
        "วันทำการ",
        "ชั่วโมง",
        "นาที",
        "ตามเวลาจริง",
        "ไม่มีการปรับปรุงหลังจากการจัดเก็บข้อมูล",
        "อื่นๆ",
      ],
      check: [],
      //       check: [
      //   { id: 1, title: this.$t('national'), value: "ยุทธศาสตร์ชาติ" },
      //   { id: 2, title: this.$t('nationaleco'), value: "แผนพัฒนาเศรษฐกิจและสังคมแห่งชาติ" },
      //   { id: 3, title: this.$t('nationalsecur'), value: "แผนความมั่นคงแห่งชาติ" },
      //   { id: 4, title: this.$t('masterplan'), value: "แผนแม่บทภายใต้ยุทธศาสตร์ชาติ" },
      //   { id: 5, title: this.$t('nationalreform'), value: "แผนปฏิรูปประเทศ" },
      //   { id: 6, title: this.$t('thirdlevel'), value: "แผนระดับที่ 3 (มติครม. 4 ธ.ค. 2560)" },
      //   { id: 7, title: this.$t('govermentpolicy'), value: "นโยบายรัฐบาล/ข้อสั่งการนายกรัฐมนตรี" },
      //   { id: 8, title: this.$t('cabinet'), value: "มติคณะรัฐมนตรี" },
      //   { id: 9, title: this.$t('publicservice'), value: "เพื่อการให้บริการประชาชน" },
      //   { id: 10, title: this.$t('relevant'), value: "กฎหมายที่เกี่ยวข้อง" },
      //   { id: 11, title: this.$t('agency'), value: "พันธกิจหน่วยงาน" },
      //   { id: 12, title: this.$t('international'), value: "ดัชนี/ตัวชี้วัดระดับนานาชาติ" },
      //   { id: 13, title: this.$t('unknown'), value: "ไม่ทราบ" },
      //   // { id: 14, title: this.$t('others'), value: "other" }, <!-- Uncomment if needed -->
      // ],
      frequency: [
        "ปี",
        "ครึ่งปี",
        "ไตรมาส",
        "เดือน",
        "สัปดาห์",
        "วัน",
        "วันทำการ",
        "ชั่วโมง",
        "นาที",
        "ตามเวลาจริง",
        "ไม่มีการปรับปรุงหลังจากการจัดเก็บข้อมูล",
        "อื่นๆ",
      ],
      yesno: ["ไม่ใช่", "ใช่"],
      multiplier_unit: [
        "หน่วย",
        "สิบ",
        "ร้อย",
        "พัน",
        "หมื่น",
        "แสน",
        "ล้าน",
        "สิบล้าน",
        "ร้อยล้าน",
        "พันล้าน",
        "หมื่นล้าน",
        "แสนล้าน",
        "ไม่ทราบ",
        "อื่นๆ",
      ],

      geo: [
        "",
        "ชั้นข้อมูลแปลงที่ดิน",
        "ชั้นข้อขอบเขตการปกครอง",
        "ชั้นข้อเส้นทางคมนาคม",
        "ชั้นข้อชุมนุม/อาคาร",
        "ชั้นข้อป่าไม้",
        "ชั้นข้อการใช้ประโยชน์ที่ดิน",
        "ชั้นข้อแหล่งน้ำ",
        "ชั้นข้ออุทกศาสตร์",
        "ชั้นข้อหลักฐานแผนที่",
        "ชั้นข้อความสูงภูมิประเทศเชิงตัวเลข",
        "ชั้นข้อสภาพแผนที่ภูมิประเทศ",
        "ชั้นข้อแผนที่ภาพถ่ายทางอากาศ",
        "ชั้นข้อภาพวาดดาวเทียมดัดแก้",
      ],
      scale: [
        "",
        "1:4,000",
        "1:10,000",
        "1:25,000",
        "1:50,000",
        "1:250,000",
        "อื่นๆ",
      ],
      subunits: [
        "ไม่มี",
        "บุคคล",
        "ครัวเรือน/ครอบครัว",
        "บ้าน/ที่อยู่อาศัย",
        "บริษัท/ห้างร้าน/สถานประกอบการ",
        "อาคาร/สิ่งปลูกสร้าง",
        "พื้นที่การเกษตร ประมง ป่าไม้",
        "สัตว์และพันธุ์พืช",
        "ขอบเขตเชิงภูมิศาตร์หรือเชิงพื้นที่",
        "แหล่งน้ำ เช่น แม่น้ำ อ่างเก็บน้ำ",
        "เส้นทางการเดินทาง เช่น ถนน ทางรถไฟ",
        "ไม่ทราบ",
        "อื่นๆ",
      ],
      subporter: [
        "ไม่มี",
        "หน่วยงานของรัฐ",
        "หน่วยงานเอกชน",
        "หน่วยงาน/องค์กรระหว่างประเทศ",
        "มูลนิธิ/สมาคม",
        "สถาบันการศึกษา",
        "อื่นๆ",
      ],
      License: [
        "License not specified",
        "Creative Commons Attributions",
        "Creative Commons Attributions Share-Alike",
        "Creative Commons Non-Commercial (Any)",
        "Open Data Commons",
        "GNU Free Documentation License",
        "อื่นๆ",
      ],
      Category: [
        "ข้อมูลสาธารณะ",
        "ข้อมูลส่วนบุคคล",
        "ข้อมูลความมั่นคง",
        "ข้อมูลความลับทางราชการ",
      ],
      Geo: [
        "ไม่มี",
        "โลก",
        "ทวีป/กลุ่มประเทศในทวีบ",
        "กลุ่มประเทศทางเศรษฐกิจ",
        "ประเทศ",
        "ภาค",
        "จังหวัด",
        "อำเภอ",
        "ตำบล",
        "หมู่บ้าน",
        "เทศบาล/อบต.",
        "พิกัด",
        "ไม่ทราบ",
        "อื่นๆ",
      ],
      language: [
        // { id: 1, title: "ไทย", value: "ไทย" },
        // { id: 2, title: "อังกฤษ", value: "อังกฤษ" },
        // { id: 3, title: "จีน", value: "จีน" },
        // { id: 4, title: "มลายู", value: "มลายู" },
        // { id: 5, title: "พม่า", value: "พม่า" },
        // { id: 6, title: "ลาว", value: "ลาว" },
        // { id: 7, title: "เขมร", value: "เขมร" },
        // { id: 8, title: "ญี่ปุ่น", value: "ญี่ปุ่น" },
        // { id: 9, title: "เกาหลี", value: "เกาหลี" },
        // { id: 10, title: "ฝรั่งเศส", value: "ฝรั่งเศส" },
        // { id: 11, title: "เยอรมัน", value: "เยอรมัน" },
        // { id: 12, title: "อารบิก", value: "อารบิก" },
        // { id: 13, title: "ไม่ทราบ", value: "ไม่ทราบ" },
      ],
      classify: [
        // { id: 1, title: "ไม่มี", value: "ไม่มี" },
        // { id: 2, title: "เพศ", value: "เพศ" },
        // { id: 3, title: "อายุ/กลุ่มอายุ", value: "อายุ/กลุ่มอายุ" },
        // { id: 4, title: "สถานภาพสมรส", value: "สถานภาพสมรส" },
        // { id: 5, title: "ระดับการศึกษา", value: "ระดับการศึกษา" },
        // { id: 6, title: "อาชีพ", value: "อาชีพ" },
        // { id: 7, title: "สถานภาพการทำงาน", value: "สถานภาพการทำงาน" },
        // { id: 8, title: "อุตสาหกรรม/ประเภทกิจการ", value: "อุตสาหกรรม/ประเภทกิจการ" },
        // { id: 9, title: "รายได้", value: "รายได้" },
        // { id: 10, title: "ขอบเขตเชิงภูมิศาสตร์หรือเชิงพื้นที่", value: "ขอบเขตเชิงภูมิศาสตร์หรือเชิงพื้นที่" },
        // { id: 11, title: "ผลิตภัณฑ์", value: "ผลิตภัณฑ์" },
        // { id: 12, title: "ไม่ทราบ", value: "ไม่ทราบ" },
      ],
      data_format: [
        // { id: 1, title: "CSV", value: "CSV" },
        // { id: 2, title: "XLSX", value: "XLSX" },
        // { id: 3, title: "Database", value: "Database" },
        // { id: 4, title: "Image", value: "Image" },
        // { id: 5, title: "Video", value: "Video" },
        // { id: 6, title: "Audio", value: "Audio" },
        // { id: 7, title: "Text", value: "Text" },
        // { id: 8, title: "JSON", value: "JSON" },
        // { id: 9, title: "HTML", value: "HTML" },
        // { id: 10, title: "XLS", value: "XLS" },
        // { id: 11, title: "PDF", value: "PDF" },
        // { id: 12, title: "RDF", value: "RDF" },
        // { id: 13, title: "NoSQL", value: "NoSQL" },
        // { id: 14, title: "Arc/Info Converage", value: "Arc/Info Converage" },
        // { id: 15, title: "Shapefile", value: "Shapefile" },
        // { id: 16, title: "GeoTiff", value: "GeoTiff" },
        // { id: 17, title: "GML", value: "GML" },
        // { id: 18, title: "ไม่ทราบ", value: "ไม่ทราบ" },
      ],

      //End
      Data_Source_type: "Internal",
      valid: true,
      radios: "key1",
      nameFile: "",
      nameFileMetadata: "",
      nameFileCSV: "",
      nameFileExcel: "",
      level: "",
      category: [],
      categorylevel: "",
      categorysublevel: [],
      categorysub: [],
      sourceData: {
        source_id: "",
        file_name: "",
      },
      itemFrequency: [
        { text: "Daily" },
        { text: "Weekly" },
        { text: "Monthly" },
        { text: "Quarterly" },
        { text: "Yearly" },
        { text: "Half Year" },
      ],
      RuleEnglish: [
        (v) => !!v || "Information is required",
        (v) => /^[A-Za-z0-9_.]+$/.test(v) || "Please fill in English only.",
      ],
      Rules: [(v) => !!v || "Information is required"],
      sourceType: null,
      uploadType: null,
      APITyps: null,
      files: [],
      fileNameMulti: [],
      showTooltips: false,
      loadingUpfileCSV: false,
      loadingUpfileExcel: false,
      loadingUpfilePdf: false,
      linkWeb: "",
      itemsDialog: [],
      activeMetaTab: "tab-1",
      activeMetaTab2: "tab-4",
      statusItem: "Active",
      status: ["Inactive", "Active"],
      items: ["Append", "Update"],
      mode: "Append",
      itemCategory: [],
      itemSubCategory: [],
      selectedSchedule: "",
      reference: "",
      ppp: "",
      test: "",
      Datasource: {},
      DatasourcebyReport: [],
      headers_Data_Source: [
        {
          text: "Data Source",
          align: "center",
          sortable: false,
          value: "data_source_table",
        },
        {
          text: "Frequency repeat",
          value: "freguency_repeat",
          align: "center",
          sortable: false,
        },
        {
          text: "Data source workflow",
          value: "data_source_workflow",
          align: "center",
          sortable: false,
        },
        {
          text: "Frequency day",
          value: "freguency_day",
          align: "center",
          sortable: false,
        },
        {
          text: "Frequency time",
          value: "freguency_time",
          align: "center",
          sortable: false,
        },
        {
          text: "Status",
          value: "data_source_status",
          align: "center",
          sortable: false,
        },
      ],
      External_Data_source_headers: [
        {
          text: "Data source name",
          align: "center",
          sortable: false,
          value: "data_source_name",
        },
        {
          text: "Data format",
          value: "data_source_external_format",
          align: "center",
          sortable: false,
        },
        {
          text: "Data other",
          value: "data_source_external_format_other",
          align: "center",
          sortable: false,
        },
        {
          text: "Frequnecy repeats",
          value: "frequency_repeat",
          align: "center",
          sortable: false,
        },
        {
          text: "Frequency time",
          value: "freguency_time",
          align: "center",
          sortable: false,
        },
        {
          text: "Frequency day",
          value: "freguency_day",
          align: "center",
          sortable: false,
        },
        {
          text: "Frequency day of month",
          value: "frequency_day_of_month",
          align: "center",
          sortable: false,
        },
      ],
      search_dataSource: "",
      Data_format: ["FILE", "API", "URL", "DATABASE", "OTHER"],
      Frequency_External: ["Daily", "Weekly", "Monthly"],
      Frequency_External_Repeats: "",
      time: null,
      menu2: false,
      Frequency_External_day: ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"],
      day_on_month: [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12",
        "13",
        "14",
        "15",
        "16",
        "17",
        "18",
        "19",
        "20",
        "21",
        "22",
        "23",
        "24",
        "25",
        "26",
        "27",
        "28",
        "29",
        "30",
        "31",
      ],
      valid_External: true,
      ExternalDatasourcebyReport: [],
      source_Datasource_External: {},
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
  },
  watch: {
    sourceData(val) {
      this.datasub();
    },
    "sourceData.source_id": function (newVal) {
      this.sourceData.file_name = newVal;
    },
    "sourceData.modified_date"(newDate) {
      if (
        newDate &&
        this.sourceData.created_date &&
        newDate < this.sourceData.created_date
      ) {
        this.sourceData.modified_date = this.sourceData.created_date;
        alert(
          "วันที่ปรับปรุงข้อมูลล่าสุดไม่สามารถน้อยกว่าวันที่เริ่มต้นสร้างได้"
        );
      }
    },
    "sourceData.created_date"(newDate) {
      if (
        newDate &&
        this.sourceData.modified_date &&
        newDate > this.sourceData.modified_date
      ) {
        this.sourceData.created_date = this.sourceData.modified_date;
        alert("วันที่สร้างข้อมูลไม่สามารถมากกว่าวันที่ปรับปรุงได้");
      }
    },
    "$i18n.locale"(newLocale, oldLocale) {
      // เรียก updateCheck เมื่อภาษามีการเปลี่ยนแปลง
      this.updateCheck();
    },
    // '$i18n.locale'(newLocale) {
    //   // ตรวจสอบ locale ปัจจุบันและปรับเปลี่ยน currentLocale ของ v-date-picker
    //   this.currentLocale = newLocale === 'th' ? 'th-th' : 'en-us';
    // }
  },
  created() {
    if (this.userData) {
      this.generateSrcID();
    }
    this.updateCheck();
  },
  mounted() {
    this.dataCatagory();
    // this.data_to_regis();
    this.oganize();
    this.updateCheck();
    // this.datalevel();
    // this.datasublevel();
    // this.datasub();
  },
  methods: {
    updateCheck() {
      (this.check = [
        { id: 1, title: this.$t("national"), value: "ยุทธศาสตร์ชาติ" },
        {
          id: 2,
          title: this.$t("nationaleco"),
          value: "แผนพัฒนาเศรษฐกิจและสังคมแห่งชาติ",
        },
        {
          id: 3,
          title: this.$t("nationalsecur"),
          value: "แผนความมั่นคงแห่งชาติ",
        },
        {
          id: 4,
          title: this.$t("masterplan"),
          value: "แผนแม่บทภายใต้ยุทธศาสตร์ชาติ",
        },
        { id: 5, title: this.$t("nationalreform"), value: "แผนปฏิรูปประเทศ" },
        {
          id: 6,
          title: this.$t("thirdlevel"),
          value: "แผนระดับที่ 3 (มติครม. 4 ธ.ค. 2560)",
        },
        {
          id: 7,
          title: this.$t("govermentpolicy"),
          value: "นโยบายรัฐบาล/ข้อสั่งการนายกรัฐมนตรี",
        },
        { id: 8, title: this.$t("cabinet"), value: "มติคณะรัฐมนตรี" },
        {
          id: 9,
          title: this.$t("publicservice"),
          value: "เพื่อการให้บริการประชาชน",
        },
        { id: 10, title: this.$t("relevant"), value: "กฎหมายที่เกี่ยวข้อง" },
        { id: 11, title: this.$t("agency"), value: "พันธกิจหน่วยงาน" },
        {
          id: 12,
          title: this.$t("international"),
          value: "ดัชนี/ตัวชี้วัดระดับนานาชาติ",
        },
        { id: 13, title: this.$t("Unknown"), value: "ไม่ทราบ" },
        // { id: 14, title: this.$t('others'), value: "other" }, <!-- Uncomment if needed -->
      ]),
        (this.data_format = [
          { id: 1, title: this.$t("csv"), value: "CSV" },
          { id: 2, title: this.$t("xlsx"), value: "XLSX" },
          { id: 3, title: this.$t("database"), value: "Database" },
          { id: 4, title: this.$t("image"), value: "Image" },
          { id: 5, title: this.$t("video"), value: "Video" },
          { id: 6, title: this.$t("audio"), value: "Audio" },
          { id: 7, title: this.$t("text"), value: "Text" },
          { id: 8, title: this.$t("json"), value: "JSON" },
          { id: 9, title: this.$t("html"), value: "HTML" },
          { id: 10, title: this.$t("xls"), value: "XLS" },
          { id: 11, title: this.$t("pdf"), value: "PDF" },
          { id: 12, title: this.$t("rdf"), value: "RDF" },
          { id: 13, title: this.$t("nosql"), value: "NoSQL" },
          {
            id: 14,
            title: this.$t("arcInfoCoverage"),
            value: "Arc/Info Converage",
          },
          { id: 15, title: this.$t("shapefile"), value: "Shapefile" },
          { id: 16, title: this.$t("geoTiff"), value: "GeoTiff" },
          { id: 17, title: this.$t("gml"), value: "GML" },
          { id: 18, title: this.$t("Unknown"), value: "ไม่ทราบ" },
        ]),
        (this.classify = [
          { id: 1, title: this.$t("none"), value: "ไม่มี" },
          { id: 2, title: this.$t("gender"), value: "เพศ" },
          { id: 3, title: this.$t("age_group"), value: "อายุ/กลุ่มอายุ" },
          { id: 4, title: this.$t("marital_status"), value: "สถานภาพสมรส" },
          { id: 5, title: this.$t("education_level"), value: "ระดับการศึกษา" },
          { id: 6, title: this.$t("occupation"), value: "อาชีพ" },
          {
            id: 7,
            title: this.$t("employment_status"),
            value: "สถานภาพการทำงาน",
          },
          {
            id: 8,
            title: this.$t("industry_type"),
            value: "อุตสาหกรรม/ประเภทกิจการ",
          },
          { id: 9, title: this.$t("income"), value: "รายได้" },
          {
            id: 10,
            title: this.$t("geographical_scope"),
            value: "ขอบเขตเชิงภูมิศาสตร์หรือเชิงพื้นที่",
          },
          { id: 11, title: this.$t("product"), value: "ผลิตภัณฑ์" },
          { id: 12, title: this.$t("Unknown"), value: "ไม่ทราบ" },
        ]),
        (this.language = [
          { id: 1, title: this.$t("thai"), value: "ไทย" },
          { id: 2, title: this.$t("english"), value: "อังกฤษ" },
          { id: 3, title: this.$t("chinese"), value: "จีน" },
          { id: 4, title: this.$t("malay"), value: "มลายู" },
          { id: 5, title: this.$t("burmese"), value: "พม่า" },
          { id: 6, title: this.$t("lao"), value: "ลาว" },
          { id: 7, title: this.$t("khmer"), value: "เขมร" },
          { id: 8, title: this.$t("japanese"), value: "ญี่ปุ่น" },
          { id: 9, title: this.$t("korean"), value: "เกาหลี" },
          { id: 10, title: this.$t("french"), value: "ฝรั่งเศส" },
          { id: 11, title: this.$t("german"), value: "เยอรมัน" },
          { id: 12, title: this.$t("arabic"), value: "อารบิก" },
          { id: 13, title: this.$t("Unknown"), value: "ไม่ทราบ" },
        ]);
    },
    convertToThaiDate(dateString) {
      let date = new Date(dateString);
      let thaiYear = date.getFullYear() + 543;
      let month = ("0" + (date.getMonth() + 1)).slice(-2);
      let day = ("0" + date.getDate()).slice(-2);
      return `${thaiYear}/${month}/${day}`;
    },
    formatDate(created_date) {
      var date = created_date.split("/");
      // var dates = datetime.split(',')
      if (date.length > 2) {
        var day = date[1];
        var month = date[0];
        var year = date[2];
        return day + "/" + month + "/" + year;
      } else {
        var date = created_date.split(",");
        return date[0];
      }
    },
    oganize() {
      this.axios
        .get(process.env.VUE_APP_API_BACKEND + "/showOrganize", {})
        .then((response) => {
          // var data = response.data.data.organize;
          // var tmp_arr = [];
          // this.api_data = response.data.data;
          this.organization = response.data;
          // this. = response.data.data.organize
          // console.log
          // console.log("test1");
          // console.log(response.data);
          // console.log(this.data[0]);
          // for (let i = 0; i < data.length; i++) {
          //   console.log(data[i].title)
          //   tmp_arr.push(data[i]);
          // }
          // console.log(tmp_arr);
          // console.log(response.data.data.organize);
        });
    },
    // data_to_regis() {
    //       this.axios
    //         .get(process.env.VUE_APP_API_BACKEND3 + "/data_to_register", {})
    //         .then((response) => {
    //           // var data = response.data.data.organize;
    //           // var tmp_arr = [];
    //           // this.api_data = response.data.data;
    //           this.tag = response.data.data.tags;
    //           this.organization = response.data.data.organize;
    //           // this. = response.data.data.organize
    //           // console.log
    //           console.log("test1");
    //           console.log(response.data.data.tags);
    //           // console.log(this.data[0]);
    //           // for (let i = 0; i < data.length; i++) {
    //           //   console.log(data[i].title)
    //           //   tmp_arr.push(data[i]);
    //           // }
    //           // console.log(tmp_arr);
    //           // console.log(response.data.data.organize);
    //         });
    //     },

    card_datasource_byrepory(data) {
      // console.log(data);

      this.getDatasourebyReport();
      this.getExternalDatasourcebyReport();
      // this.Datasource = data;
    },
    downloadFileExample() {
      if (this.userData) {
        var user_id = Encode.encode(this.userData.user_id);
        this.loadFile(
          process.env.VUE_APP_API_BACKEND + "/file/downloadReportExample"
        );
      } else {
        this.$swal("Please login", "", "error");
      }
    },
    dataWord(val) {
      if (val === "cancel") {
        this.nameFile = "";
      } else {
        this.sourceData.word_file = val;
      }
      // //console.log(this.sourceData)
    },
    clearWord(data) {
      if (data == "key1") {
        this.sourceData.word = "";
      } else if (data == "key2") {
        this.sourceData.word_file = [];
        this.nameFile = "";
      }
    },
    savefilesUpload() {
      let formData = new FormData();
      formData.append("file", this.$refs.file.files[0]);
      //console.log(file);
      this.axios
        .post(
          process.env.VUE_APP_API_BACKEND + "/file/savefilesUploadWord",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((response) => {
          if (response.data.status === "success")
            this.$refs.search.open(
              response.data.data,
              this.sourceData.file_name
            );
        });
    },
    loadFile(link) {
      window.location.assign(link);
    },
    downloadCsv() {
      // process.env.VUE_APP_API_BACKEND + '/file/downloadFileMongo/' + item.file_name + '.zip?file_id=' + item.mongo_file_id_csv + '&user_id===' + user_id + '&firstname=' + this.userData.firstname + '&lastname=' + this.userData.lastname + '&file_type=csv'
      this.loadFile(
        process.env.VUE_APP_API_BACKEND +
          "/file/downloadFileMetadataMongo/" +
          this.sourceData.file_name +
          ".zip?file_id=" +
          this.sourceData.mongo_id_csv
      );
    },
    downloadExcel() {
      this.loadFile(
        process.env.VUE_APP_API_BACKEND +
          "/file/downloadFileMetadataMongo/" +
          this.sourceData.file_name +
          ".xlsx?file_id=" +
          this.sourceData.mongo_id_excel
      );
    },
    downloadMetadata() {
      this.loadFile(
        process.env.VUE_APP_API_BACKEND +
          "/file/downloadFileMetadataMongo/" +
          this.sourceData.file_name +
          ".xlsx?file_id=" +
          this.sourceData.mongo_id_metadata
      );
    },
    dataCatagory() {
      this.axios
        .get(process.env.VUE_APP_API_BACKEND + "/getCategoryMetadata")
        .then((response) => {
          this.itemCategory = response.data;
        });
    },
    save(goToTab2 = false) {
  // ตรวจสอบข้อมูลเบื้องต้น
  if (!this.sourceData.category_id || !this.sourceData.source_id) {
    this.$swal("Information is required", "", "warning");
    return;
  }

  // ตั้งค่า objective ให้เป็นค่าว่างถ้าเลือก 'อื่นๆ' และให้ objective_other เป็นค่าว่างถ้าไม่ได้เลือก 'อื่นๆ'
  if (this.enabled1) {
    // ถ้าเลือก 'อื่นๆ' ให้ objective (หลัก) เป็นค่าว่าง และใช้ objective_other แทน
    this.sourceData.objective = [];
    if (this.objective_other) {
      this.sourceData.objective.push(this.objective_other);
    }
  } else {
    // ถ้าไม่ได้เลือก 'อื่นๆ' ให้ objective_other เป็นค่าว่าง
    this.objective_other = "";
  }

  // ตั้งค่า data_storage และ data_language ด้วย logic เดียวกัน
  if (this.enabled2) {
    this.sourceData.data_storage = [];
    if (this.data_storage_other) {
      this.sourceData.data_storage.push(this.data_storage_other);
    }
  } else {
    this.data_storage_other = "";
  }

  if (this.enabled3) {
    this.sourceData.data_language = [];
    if (this.data_language_other) {
      this.sourceData.data_language.push(this.data_language_other);
    }
  } else {
    this.data_language_other = "";
  }

  // เตรียมข้อมูลสำหรับการบันทึก
  this.sourceData.user_id = this.userData.user_id;
  this.sourceData.name = "-";
  this.sourceData.sub_category_name = "-";
  this.sourceData.data_source = "-";
  this.sourceData.Level_Master_id = "1";
  this.sourceData.sublevel_desc = "General";
  this.sourceData.level_desc = "Public data for free";

  // ส่งคำขอ POST เพื่อบันทึกข้อมูล
  this.axios
    .post(process.env.VUE_APP_API_BACKEND + "/saveMetadatarecord", {
      user_id: this.userData.user_id,
      sublevel_key: "1",
      source_id: this.sourceData.source_id,
      file_name: this.sourceData.source_id,
      category_id: this.sourceData.category_id,
      sub_category_id: this.sourceData.sub_category_id,
      status: this.sourceData.status,
      data_type: "ข้อมูลระเบียน",
      export_excel_name: this.sourceData.export_excel_name,
      organization: this.sourceData.organization,
      access: this.sourceData.access,
      data_harvest: false,
      contactor_name: this.sourceData.contactor_name,
      contactor_email: this.sourceData.contactor_email,
      tag: this.sourceData.tag,
      description: this.sourceData.description,
      objective: this.sourceData.objective,
      objective_other: this.objective_other,
      frequency: this.sourceData.frequency,
      frequency_unit: this.sourceData.frequency_unit,
      geo_coverage: this.sourceData.geo_coverage,
      data_source: this.sourceData.data_source,
      topic_gorvernance: this.sourceData.topic_gorvernance,
      data_license: this.sourceData.data_license,
      data_condition: this.sourceData.data_condition,
      supporter: this.sourceData.supporter,
      data_unit: this.sourceData.data_unit,
      URL: this.sourceData.URL,
      data_language: this.sourceData.data_language,
      data_language_other: this.data_language_other,
      data_storage: this.sourceData.data_storage,
      data_storage_other: this.data_storage_other,
      created_date: this.sourceData.created_date,
      modified_date: this.sourceData.modified_date,
      high_value_dataset: this.sourceData.high_value_dataset,
      data_reference: this.sourceData.data_reference,
    })
    .then((response) => {
      if (response.data.status === "success") {
        this.$store.dispatch("updateFileName", response.data.file_name);
        this.$swal("Save Success", "", "success").then(() => {
          if (goToTab2) {
            this.activeMetaTab = "tab-2";
          } else {
            this.reloadPage();
          }
        });
      } else {
        this.$swal("ERROR", response.data.status, "error");
      }
    })
    .catch((error) => {
      const errorMessage =
        error.response && error.response.data
          ? error.response.data.status
          : "An unexpected error occurred.";
      this.$swal("ERROR", errorMessage, "error");
    });
},

    save2(goToTab2 = false) {
      // ตรวจสอบข้อมูลเบื้องต้น
      if (!this.sourceData.category_id || !this.sourceData.source_id) {
        this.$swal("Information is required", "", "warning");
        return;
      }

// ตั้งค่า objective ให้เป็นค่าว่างถ้าเลือก 'อื่นๆ' และให้ objective_other เป็นค่าว่างถ้าไม่ได้เลือก 'อื่นๆ'
if (this.enabled1) {
    // ถ้าเลือก 'อื่นๆ' ให้ objective (หลัก) เป็นค่าว่าง และใช้ objective_other แทน
    this.sourceData.objective = [];
    if (this.objective_other) {
      this.sourceData.objective.push(this.objective_other);
    }
  } else {
    // ถ้าไม่ได้เลือก 'อื่นๆ' ให้ objective_other เป็นค่าว่าง
    this.objective_other = "";
  }

  // ตั้งค่า data_storage และ data_language ด้วย logic เดียวกัน
  if (this.enabled2) {
    this.sourceData.data_storage = [];
    if (this.data_storage_other) {
      this.sourceData.data_storage.push(this.data_storage_other);
    }
  } else {
    this.data_storage_other = "";
  }

  if (this.enabled3) {
    this.sourceData.data_language = [];
    if (this.data_language_other) {
      this.sourceData.data_language.push(this.data_language_other);
    }
  } else {
    this.data_language_other = "";
  }


      // เตรียมข้อมูลสำหรับการบันทึก
      this.sourceData.user_id = this.userData.user_id;
      this.sourceData.name = "-";
      this.sourceData.sub_category_name = "-";
      this.sourceData.data_source = "-";
      this.sourceData.Level_Master_id = "1";
      this.sourceData.sublevel_desc = "General";
      this.sourceData.level_desc = "Public data for free";


      // if (!this.enabled1) {
      //   this.objective_other = ""; // Set objective_other to an empty string if "Other" checkbox is unchecked
      // }
      // if (!this.enabled2) {
      //   this.data_storage_other = ""; // Set data_storage_other to an empty string if "Other" checkbox is unchecked
      // }
      // if (!this.enabled3) {
      //   this.data_language_other = ""; // Set data_language_other to an empty string if "Other" checkbox is unchecked
      // }


      // ส่งคำขอ POST เพื่อบันทึกข้อมูล
      this.axios
        .post(process.env.VUE_APP_API_BACKEND + "/saveMetadatastatistics", {
          user_id: this.userData.user_id,
          sublevel_key: "1",
          source_id: this.sourceData.source_id,
          file_name: this.sourceData.source_id,
          category_id: this.sourceData.category_id,
          sub_category_id: this.sourceData.sub_category_id,
          status: this.sourceData.status,
          data_type: "ข้อมูลสถิติ",
          export_excel_name: this.sourceData.export_excel_name,
          organization: this.sourceData.organization,
          access: this.sourceData.access,
          data_harvest: false,
          contactor_name: this.sourceData.contactor_name,
          contactor_email: this.sourceData.contactor_email,
          tag: this.sourceData.tag,
          description: this.sourceData.description,
          objective: this.sourceData.objective,
          objective_other: this.objective_other,
          frequency: this.sourceData.frequency,
          frequency_unit: this.sourceData.frequency_unit,
          geo_coverage: this.sourceData.geo_coverage,
          data_source: this.sourceData.data_source,
          topic_gorvernance: this.sourceData.topic_gorvernance,
          data_license: this.sourceData.data_license,
          data_condition: this.sourceData.data_condition,
          supporter: this.sourceData.supporter,
          data_unit: this.sourceData.data_unit,
          URL: this.sourceData.URL,
          data_language: this.sourceData.data_language,
          data_language_other: this.data_language_other,
          data_storage: this.sourceData.data_storage,
          data_storage_other: this.data_storage_other,
          created_date: this.sourceData.created_date,
          modified_date: this.sourceData.modified_date,
          startyear: this.sourceData.startyear,
          currentyear: this.sourceData.currentyear,
          data_classify: this.sourceData.data_classify,
          data_classify_other: this.data_classify_other,
          measure: this.sourceData.measure,
          data_multiplier_unit: this.sourceData.data_multiplier_unit,
          calculation: this.sourceData.calculation,
          data_standards: this.sourceData.data_standards,
          official: this.sourceData.official,
        })
        .then((response) => {
          if (response.data.status === "success") {
            this.$swal("Save Success", "", "success").then(() => {
              if (goToTab2) {
                this.activeMetaTab = "tab-2"; // เปลี่ยนแท็บเป็น tab-2
              } else {
                this.reloadPage();
              }
            });
          } else {
            this.$swal("ERROR", response.data.status, "error");
          }
        })
        .catch((error) => {
          // จัดการข้อผิดพลาดจากการเรียก API
          const errorMessage =
            error.response && error.response.data
              ? error.response.data.status
              : "An unexpected error occurred.";
          this.$swal("ERROR", errorMessage, "error");
        });
    },
    save3(goToTab2 = false) {
      // ตรวจสอบข้อมูลเบื้องต้น
      if (!this.sourceData.category_id || !this.sourceData.source_id) {
        this.$swal("Information is required", "", "warning");
        return;
      }

      // ตั้งค่า objective ให้เป็นค่าว่างถ้าเลือก 'อื่นๆ' และให้ objective_other เป็นค่าว่างถ้าไม่ได้เลือก 'อื่นๆ'
if (this.enabled1) {
    // ถ้าเลือก 'อื่นๆ' ให้ objective (หลัก) เป็นค่าว่าง และใช้ objective_other แทน
    this.sourceData.objective = [];
    if (this.objective_other) {
      this.sourceData.objective.push(this.objective_other);
    }
  } else {
    // ถ้าไม่ได้เลือก 'อื่นๆ' ให้ objective_other เป็นค่าว่าง
    this.objective_other = "";
  }

  // ตั้งค่า data_storage และ data_language ด้วย logic เดียวกัน
  if (this.enabled2) {
    this.sourceData.data_storage = [];
    if (this.data_storage_other) {
      this.sourceData.data_storage.push(this.data_storage_other);
    }
  } else {
    this.data_storage_other = "";
  }

  if (this.enabled3) {
    this.sourceData.data_language = [];
    if (this.data_language_other) {
      this.sourceData.data_language.push(this.data_language_other);
    }
  } else {
    this.data_language_other = "";
  }

      // เตรียมข้อมูลสำหรับการบันทึก
      this.sourceData.user_id = this.userData.user_id;
      this.sourceData.name = "-";
      this.sourceData.sub_category_name = "-";
      this.sourceData.data_source = "-";
      this.sourceData.Level_Master_id = "1";
      this.sourceData.sublevel_desc = "General";
      this.sourceData.level_desc = "Public data for free";

      // if (!this.enabled1) {
      //   this.objective_other = ""; // Set objective_other to an empty string if "Other" checkbox is unchecked
      // }
      // if (!this.enabled2) {
      //   this.data_storage_other = ""; // Set data_storage_other to an empty string if "Other" checkbox is unchecked
      // }
      // if (!this.enabled3) {
      //   this.data_language_other = ""; // Set data_language_other to an empty string if "Other" checkbox is unchecked
      // }

      // ส่งคำขอ POST เพื่อบันทึกข้อมูล
      this.axios
        .post(process.env.VUE_APP_API_BACKEND + "/saveMetadatageospatial", {
          user_id: this.userData.user_id,
          sublevel_key: "1",
          source_id: this.sourceData.source_id,
          file_name: this.sourceData.source_id,
          category_id: this.sourceData.category_id,
          sub_category_id: this.sourceData.sub_category_id,
          status: this.sourceData.status,
          data_type: "ข้อมูลภูมิสารสนเทศเชิงพื้นที่",
          export_excel_name: this.sourceData.export_excel_name,
          organization: this.sourceData.organization,
          access: this.sourceData.access,
          data_harvest: false,
          contactor_name: this.sourceData.contactor_name,
          contactor_email: this.sourceData.contactor_email,
          tag: this.sourceData.tag,
          description: this.sourceData.description,
          objective: this.sourceData.objective,
          objective_other: this.objective_other,
          frequency: this.sourceData.frequency,
          frequency_unit: this.sourceData.frequency_unit,
          geo_coverage: this.sourceData.geo_coverage,
          data_source: this.sourceData.data_source,
          topic_gorvernance: this.sourceData.topic_gorvernance,
          data_license: this.sourceData.data_license,
          data_condition: this.sourceData.data_condition,
          supporter: this.sourceData.supporter,
          data_unit: this.sourceData.data_unit,
          URL: this.sourceData.URL,
          data_language: this.sourceData.data_language,
          data_language_other: this.data_language_other,
          data_storage: this.sourceData.data_storage,
          data_storage_other: this.data_storage_other,
          created_date: this.sourceData.created_date,
          modified_date: this.sourceData.modified_date,
          geo: this.sourceData.geo,
          scale: this.sourceData.scale,
          west: this.sourceData.west,
          east: this.sourceData.east,
          north: this.sourceData.north,
          south: this.sourceData.south,
          positioning: this.sourceData.positioning,
          reference_time: this.sourceData.reference_time,
          release_data: this.sourceData.release_date,
        })
        .then((response) => {
          if (response.data.status === "success") {
            this.$swal("Save Success", "", "success").then(() => {
              if (goToTab2) {
                this.activeMetaTab = "tab-2"; // เปลี่ยนแท็บเป็น tab-2
              } else {
                this.reloadPage();
              }
            });
          } else {
            this.$swal("ERROR", response.data.status, "error");
          }
        })
        .catch((error) => {
          // จัดการข้อผิดพลาดจากการเรียก API
          const errorMessage =
            error.response && error.response.data
              ? error.response.data.status
              : "An unexpected error occurred.";
          this.$swal("ERROR", errorMessage, "error");
        });
    },
    save4(goToTab2 = false) {
      // ตรวจสอบข้อมูลเบื้องต้น
      if (!this.sourceData.category_id || !this.sourceData.source_id) {
        this.$swal("Information is required", "", "warning");
        return;
      }

// ตั้งค่า objective ให้เป็นค่าว่างถ้าเลือก 'อื่นๆ' และให้ objective_other เป็นค่าว่างถ้าไม่ได้เลือก 'อื่นๆ'
if (this.enabled1) {
    // ถ้าเลือก 'อื่นๆ' ให้ objective (หลัก) เป็นค่าว่าง และใช้ objective_other แทน
    this.sourceData.objective = [];
    if (this.objective_other) {
      this.sourceData.objective.push(this.objective_other);
    }
  } else {
    // ถ้าไม่ได้เลือก 'อื่นๆ' ให้ objective_other เป็นค่าว่าง
    this.objective_other = "";
  }

  // ตั้งค่า data_storage และ data_language ด้วย logic เดียวกัน
  if (this.enabled2) {
    this.sourceData.data_storage = [];
    if (this.data_storage_other) {
      this.sourceData.data_storage.push(this.data_storage_other);
    }
  } else {
    this.data_storage_other = "";
  }

  if (this.enabled3) {
    this.sourceData.data_language = [];
    if (this.data_language_other) {
      this.sourceData.data_language.push(this.data_language_other);
    }
  } else {
    this.data_language_other = "";
  }


      // เตรียมข้อมูลสำหรับการบันทึก
      this.sourceData.user_id = this.userData.user_id;
      this.sourceData.name = "-";
      this.sourceData.sub_category_name = "-";
      this.sourceData.data_source = "-";
      this.sourceData.Level_Master_id = "1";
      this.sourceData.sublevel_desc = "General";
      this.sourceData.level_desc = "Public data for free";

      // if (!this.enabled1) {
      //   this.objective_other = ""; // Set objective_other to an empty string if "Other" checkbox is unchecked
      // }
      // if (!this.enabled2) {
      //   this.data_storage_other = ""; // Set data_storage_other to an empty string if "Other" checkbox is unchecked
      // }
      // if (!this.enabled3) {
      //   this.data_language_other = ""; // Set data_language_other to an empty string if "Other" checkbox is unchecked
      // }

      // ส่งคำขอ POST เพื่อบันทึกข้อมูล
      this.axios
        .post(process.env.VUE_APP_API_BACKEND + "/saveMetadatavarioustypes", {
          user_id: this.userData.user_id,
          sublevel_key: "1",
          source_id: this.sourceData.source_id,
          file_name: this.sourceData.source_id,
          category_id: this.sourceData.category_id,
          sub_category_id: this.sourceData.sub_category_id,
          status: this.sourceData.status,
          data_type: "ข้อมูลหลากหลายประเภท",
          export_excel_name: this.sourceData.export_excel_name,
          organization: this.sourceData.organization,
          access: this.sourceData.access,
          data_harvest: false,
          contactor_name: this.sourceData.contactor_name,
          contactor_email: this.sourceData.contactor_email,
          tag: this.sourceData.tag,
          description: this.sourceData.description,
          objective: this.sourceData.objective,
          objective_other: this.objective_other,
          frequency: this.sourceData.frequency,
          frequency_unit: this.sourceData.frequency_unit,
          geo_coverage: this.sourceData.geo_coverage,
          data_source: this.sourceData.data_source,
          topic_gorvernance: this.sourceData.topic_gorvernance,
          data_license: this.sourceData.data_license,
          data_condition: this.sourceData.data_condition,
          supporter: this.sourceData.supporter,
          data_unit: this.sourceData.data_unit,
          URL: this.sourceData.URL,
          data_language: this.sourceData.data_language,
          data_language_other: this.data_language_other,
          data_storage: this.sourceData.data_storage,
          data_storage_other: this.data_storage_other,
          created_date: this.sourceData.created_date,
          modified_date: this.sourceData.modified_date,
          high_value_dataset: this.sourceData.high_value_dataset,
          data_reference: this.sourceData.data_reference,
        })
        .then((response) => {
          if (response.data.status === "success") {
            this.$swal("Save Success", "", "success").then(() => {
              if (goToTab2) {
                this.activeMetaTab = "tab-2"; // เปลี่ยนแท็บเป็น tab-2
              } else {
                this.reloadPage();
              }
            });
          } else {
            this.$swal("ERROR", response.data.status, "error");
          }
        })
        .catch((error) => {
          // จัดการข้อผิดพลาดจากการเรียก API
          const errorMessage =
            error.response && error.response.data
              ? error.response.data.status
              : "An unexpected error occurred.";
          this.$swal("ERROR", errorMessage, "error");
        });
    },
    save5(goToTab2 = false) {
      // ตรวจสอบข้อมูลเบื้องต้น
      if (!this.sourceData.category_id || !this.sourceData.source_id) {
        this.$swal("Information is required", "", "warning");
        return;
      }

      // ตั้งค่า objective ให้เป็นค่าว่างถ้าเลือก 'อื่นๆ' และให้ objective_other เป็นค่าว่างถ้าไม่ได้เลือก 'อื่นๆ'
if (this.enabled1) {
    // ถ้าเลือก 'อื่นๆ' ให้ objective (หลัก) เป็นค่าว่าง และใช้ objective_other แทน
    this.sourceData.objective = [];
    if (this.objective_other) {
      this.sourceData.objective.push(this.objective_other);
    }
  } else {
    // ถ้าไม่ได้เลือก 'อื่นๆ' ให้ objective_other เป็นค่าว่าง
    this.objective_other = "";
  }

  // ตั้งค่า data_storage และ data_language ด้วย logic เดียวกัน
  if (this.enabled2) {
    this.sourceData.data_storage = [];
    if (this.data_storage_other) {
      this.sourceData.data_storage.push(this.data_storage_other);
    }
  } else {
    this.data_storage_other = "";
  }

  if (this.enabled3) {
    this.sourceData.data_language = [];
    if (this.data_language_other) {
      this.sourceData.data_language.push(this.data_language_other);
    }
  } else {
    this.data_language_other = "";
  }

      // เตรียมข้อมูลสำหรับการบันทึก
      this.sourceData.user_id = this.userData.user_id;
      this.sourceData.name = "-";
      this.sourceData.sub_category_name = "-";
      this.sourceData.data_source = "-";
      this.sourceData.Level_Master_id = "1";
      this.sourceData.sublevel_desc = "General";
      this.sourceData.level_desc = "Public data for free";

      // if (!this.enabled1) {
      //   this.objective_other = ""; // Set objective_other to an empty string if "Other" checkbox is unchecked
      // }
      // if (!this.enabled2) {
      //   this.data_storage_other = ""; // Set data_storage_other to an empty string if "Other" checkbox is unchecked
      // }
      // if (!this.enabled3) {
      //   this.data_language_other = ""; // Set data_language_other to an empty string if "Other" checkbox is unchecked
      // }

      // ส่งคำขอ POST เพื่อบันทึกข้อมูล
      this.axios
        .post(process.env.VUE_APP_API_BACKEND + "/saveMetadataOthertypes", {
          user_id: this.userData.user_id,
          sublevel_key: "1",
          source_id: this.sourceData.source_id,
          file_name: this.sourceData.source_id,
          category_id: this.sourceData.category_id,
          sub_category_id: this.sourceData.sub_category_id,
          status: this.sourceData.status,
          data_type: "ข้อมูลประเภทอื่นๆ",
          export_excel_name: this.sourceData.export_excel_name,
          organization: this.sourceData.organization,
          access: this.sourceData.access,
          data_harvest: false,
          contactor_name: this.sourceData.contactor_name,
          contactor_email: this.sourceData.contactor_email,
          tag: this.sourceData.tag,
          description: this.sourceData.description,
          objective: this.sourceData.objective,
          objective_other: this.objective_other,
          frequency: this.sourceData.frequency,
          frequency_unit: this.sourceData.frequency_unit,
          geo_coverage: this.sourceData.geo_coverage,
          data_source: this.sourceData.data_source,
          topic_gorvernance: this.sourceData.topic_gorvernance,
          data_license: this.sourceData.data_license,
          data_condition: this.sourceData.data_condition,
          supporter: this.sourceData.supporter,
          data_unit: this.sourceData.data_unit,
          URL: this.sourceData.URL,
          data_language: this.sourceData.data_language,
          data_language_other: this.data_language_other,
          data_storage: this.sourceData.data_storage,
          data_storage_other: this.data_storage_other,
          created_date: this.sourceData.created_date,
          modified_date: this.sourceData.modified_date,
          high_value_dataset: this.sourceData.high_value_dataset,
          data_reference: this.sourceData.data_reference,
        })
        .then((response) => {
          if (response.data.status === "success") {
            this.$swal("Save Success", "", "success").then(() => {
              if (goToTab2) {
                this.activeMetaTab = "tab-2"; // เปลี่ยนแท็บเป็น tab-2
              } else {
                this.reloadPage();
              }
            });
          } else {
            this.$swal("ERROR", response.data.status, "error");
          }
        })
        .catch((error) => {
          // จัดการข้อผิดพลาดจากการเรียก API
          const errorMessage =
            error.response && error.response.data
              ? error.response.data.status
              : "An unexpected error occurred.";
          this.$swal("ERROR", errorMessage, "error");
        });
    },
    reloadPage() {
      window.location.reload();
    },
    dataSource(data) {
      // console.log(data);
      this.sourceData = data;
      this.sourceData.word_id = "key1";
      this.getSubCategory();
      this.add_data_source_byReport = "1";
      this.getDatasourebyReport();
      this.getExternalDatasourcebyReport();
    },
    getSubCategory() {
      this.axios
        .post(process.env.VUE_APP_API_BACKEND + "/getSubCategoryName", {
          category_id: this.sourceData.category_id,
        })
        .then((response) => {
          // console.log(response.data)
          this.itemSubCategory = response.data;
        });
    },
    getSub(id) {
      this.axios
        .post(process.env.VUE_APP_API_BACKEND + "/getSubCategoryName", {
          category_id: id,
          user: user,
        })
        .then((response) => {
          // console.log(response.data)
          this.itemSubCategory = response.data;
        });
    },
    clear() {
      this.files = [];
      this.fileNameMulti = [];
    },
    removeChipFile(key) {
      // //console.log('key', key);
      this.files.splice(key, 1);
      this.fileNameMulti.splice(key, 1);
    },
    filesUpload() {
      const uploadedFiles = this.$refs.file.files;
      this.nameFile = uploadedFiles[0].name;
      // for (var i = 0; i <  uploadedFiles.length; i++) {
      //   this.files.push(uploadedFiles[i]);
      //   this.fileNameMulti.push(uploadedFiles[i].name)
      // }
      // //console.log(this.$refs.files.files[0].name)
      // //console.log('========pppp')
    },
    getData() {
      this.$refs.dialogData.open();
    },
    getDataStat() {
      this.$refs.dialogStat.open();
    },
    Data_Level() {
      this.$refs.DataLevel.open();
    },
    addsub() {
      this.$refs.addsub.open();
    },
    datalevel() {
      this.axios
        .post(process.env.VUE_APP_API_BACKEND + "/getLevel", {})
        .then((response) => {
          // //console.log(response.data)
          this.category = response.data;
        });
    },
    datasub() {
      //  //console.log( this.sourceData.Level_Master_id);
      this.axios
        .post(process.env.VUE_APP_API_BACKEND + "/getSubDatalevel", {
          level_Master_id: this.sourceData.Level_Master_id,
        })
        .then((response) => {
          //  //console.log(response.data)
          this.categorysub = response.data.data;
        });
    },
    dialog_add_data_source() {
      this.$store.commit("reportid", this.sourceData.source_id);
      this.$refs.dialog_add_data_source.open();
    },
    dialog_External() {
      this.$refs.dialog_External.open();
    },
    getDatasourebyReport() {
      var user = Encode.encode(JSON.stringify(this.userData));
      this.axios
        .post(process.env.VUE_APP_API_BACKEND + "/getDatasourcebyReport ", {
          user: user,
          source_id: Encode.encode(this.sourceData.source_id),
        })
        .then((response) => {
          // console.log(response)
          this.DatasourcebyReport = response.data.data;
        });
    },
    deleteDatasourcebyReport(data) {
      // console.log(data);
      var user = Encode.encode(JSON.stringify(this.userData));
      var source_id = this.sourceData.source_id;
      const mySelf = this;
      // var txt = 'You would to suspend user : ' + 'user.name'
      this.$swal({
        title: "Are you Confirm?",
        // text: ,
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes",
      })
        .then(function (result) {
          const axios = require("axios");
          axios
            .post(
              process.env.VUE_APP_API_BACKEND + "/deleteDatasourcebyReport",
              {
                user: user,
                data_source_id: Encode.encode(data.data_source_id),
                source_id: Encode.encode(source_id),
              }
            )
            .then((response) => {
              // console.log("response:", response)
              if (response.data.status === "success") {
                mySelf.$swal("Delete Success", "", "success");
                mySelf.getDatasourebyReport();
              } else {
                mySelf.$swal("Not Success", "", "error");
              }
              // this.DatasourcebyReport = response.data.data;
            });
        })
        .then((response) => {
          // console.log(response);
          // this.getDatasourebyReport()
        });
    },
    save_External() {
      // console.log(this.Frequency_External_Repeats);
      // console.log(this.Data_Source_Name);
      // console.log(this.Data_format_type);
      // console.log(this.Frequency_External_Repeats);
      // console.log(this.time);
      // console.log(this.day_External);
      // console.log(this.day_on_month_External);
      var user = Encode.encode(JSON.stringify(this.userData));
      if (
        this.source_Datasource_External.data_source_external_format === "OTHER"
      ) {
        // console.log('OTHER');
        if (this.source_Datasource_External.frequency_repeat === "Monthly") {
          // console.log('Monthly');
          this.axios
            .post(
              process.env.VUE_APP_API_BACKEND +
                "/addExternalDatasourcebyReport",
              {
                user: user,
                data_source_name:
                  this.source_Datasource_External.data_source_name,
                data_source_external_format:
                  this.source_Datasource_External.data_source_external_format,
                data_source_external_format_other:
                  this.source_Datasource_External
                    .data_source_external_format_other,
                frequency_repeat:
                  this.source_Datasource_External.frequency_repeat,
                frequency_day: null,
                frequency_time: this.source_Datasource_External.frequency_time,
                frequency_day_of_month:
                  this.source_Datasource_External.frequency_day_of_month.toString(),
                source_id: Encode.encode(this.sourceData.source_id),
              }
            )
            .then((response) => {
              if (response.data.status === "success") {
                this.$swal("Save Success", "", "success").then((response) => {
                  this.getExternalDatasourcebyReport();
                  this.reloadPage();
                });
              } else {
                this.$swal("Information is required", "", "warning");
              }
            });
        } else if (
          this.source_Datasource_External.frequency_repeat === "Daily"
        ) {
          // console.log('Daily');
          this.axios
            .post(
              process.env.VUE_APP_API_BACKEND +
                "/addExternalDatasourcebyReport",
              {
                user: user,
                data_source_name:
                  this.source_Datasource_External.data_source_name,
                data_source_external_format:
                  this.source_Datasource_External.data_source_external_format,
                data_source_external_format_other:
                  this.source_Datasource_External
                    .data_source_external_format_other,
                frequency_repeat:
                  this.source_Datasource_External.frequency_repeat,
                frequency_day: null,
                frequency_time: this.source_Datasource_External.frequency_time,
                frequency_day_of_month: null,
                source_id: Encode.encode(this.sourceData.source_id),
              }
            )
            .then((response) => {
              if (response.data.status === "success") {
                this.$swal("Save Success", "", "success").then((response) => {
                  this.getExternalDatasourcebyReport();
                  this.reloadPage();
                });
              } else {
                this.$swal("Information is required", "", "warning");
              }
            });
        } else if (
          this.source_Datasource_External.frequency_repeat === "Weekly"
        ) {
          // console.log('Weekly');
          this.axios
            .post(
              process.env.VUE_APP_API_BACKEND +
                "/addExternalDatasourcebyReport",
              {
                user: user,
                data_source_name:
                  this.source_Datasource_External.data_source_name,
                data_source_external_format:
                  this.source_Datasource_External.data_source_external_format,
                data_source_external_format_other:
                  this.source_Datasource_External
                    .data_source_external_format_other,
                frequency_repeat:
                  this.source_Datasource_External.frequency_repeat,
                frequency_day:
                  this.source_Datasource_External.frequency_day.toString(),
                frequency_time: this.source_Datasource_External.frequency_time,
                frequency_day_of_month: null,
                source_id: Encode.encode(this.sourceData.source_id),
              }
            )
            .then((response) => {
              // console.log("week");
              // console.log(response);

              if (response.data.status === "success") {
                this.$swal("Save Success", "", "success").then((response) => {
                  this.reloadPage();
                  // this.getExternalDatasourcebyReport()
                  // this.valid_External = false
                  // this.Frequency_External_Repeats = null
                  // this.Data_Source_Name = null
                  // this.Data_format_type = null
                  // this.Frequency_External_Repeats =null
                  // this.time = null
                  // this.day_External = null
                  // this.day_on_month_External =null
                });
              } else {
                this.$swal("Information is required", "", "warning");
              }
            });
        }
      } else {
        if (this.source_Datasource_External.frequency_repeat === "Monthly") {
          this.axios
            .post(
              process.env.VUE_APP_API_BACKEND +
                "/addExternalDatasourcebyReport",
              {
                user: user,
                data_source_name:
                  this.source_Datasource_External.data_source_name,
                data_source_external_format:
                  this.source_Datasource_External.data_source_external_format,
                data_source_external_format_other: "-",
                frequency_repeat:
                  this.source_Datasource_External.frequency_repeat,
                frequency_day: null,
                frequency_time: this.source_Datasource_External.frequency_time,
                frequency_day_of_month:
                  this.source_Datasource_External.frequency_day_of_month.toString(),
                source_id: Encode.encode(this.sourceData.source_id),
              }
            )
            .then((response) => {
              if (response.data.status === "success") {
                this.$swal("Save Success", "", "success").then((response) => {
                  this.getExternalDatasourcebyReport();
                  this.reloadPage();
                });
              } else {
                this.$swal("Information is required", "", "warning");
              }
            });
        } else if (
          this.source_Datasource_External.frequency_repeat === "Daily"
        ) {
          this.axios
            .post(
              process.env.VUE_APP_API_BACKEND +
                "/addExternalDatasourcebyReport",
              {
                user: user,
                data_source_name:
                  this.source_Datasource_External.data_source_name,
                data_source_external_format:
                  this.source_Datasource_External.data_source_external_format,
                data_source_external_format_other: "-",
                frequency_repeat:
                  this.source_Datasource_External.frequency_repeat,
                frequency_day: null,
                frequency_time: this.source_Datasource_External.frequency_time,
                frequency_day_of_month: null,
                source_id: Encode.encode(this.sourceData.source_id),
              }
            )
            .then((response) => {
              if (response.data.status === "success") {
                this.$swal("Save Success", "", "success").then((response) => {
                  this.getExternalDatasourcebyReport();
                  this.reloadPage();
                });
              } else {
                this.$swal("Information is required", "", "warning");
              }
            });
        } else if (
          this.source_Datasource_External.frequency_repeat === "Weekly"
        ) {
          this.axios
            .post(
              process.env.VUE_APP_API_BACKEND +
                "/addExternalDatasourcebyReport",
              {
                user: user,
                data_source_name:
                  this.source_Datasource_External.data_source_name,
                data_source_external_format:
                  this.source_Datasource_External.data_source_external_format,
                frequency_repeat:
                  this.source_Datasource_External.frequency_repeat,
                data_source_external_format_other: "-",
                frequency_day:
                  this.source_Datasource_External.frequency_day.toString(),
                frequency_time: this.source_Datasource_External.frequency_time,
                frequency_day_of_month: null,
                source_id: Encode.encode(this.sourceData.source_id),
              }
            )
            .then((response) => {
              // console.log("week");
              // console.log(response);

              if (response.data.status === "success") {
                this.$swal("Save Success", "", "success").then((response) => {
                  this.reloadPage();
                  // this.getExternalDatasourcebyReport()
                  // this.valid_External = false
                  // this.Frequency_External_Repeats = null
                  // this.Data_Source_Name = null
                  // this.Data_format_type = null
                  // this.Frequency_External_Repeats =null
                  // this.time = null
                  // this.day_External = null
                  // this.day_on_month_External =null
                });
              } else {
                this.$swal("Information is required", "", "warning");
              }
            });
        }
      }
    },
    getExternalDatasourcebyReport() {
      var user = Encode.encode(JSON.stringify(this.userData));
      this.axios
        .post(
          process.env.VUE_APP_API_BACKEND + "/getExternalDatasourcebyReport ",
          {
            user: user,
            source_id: Encode.encode(this.sourceData.source_id),
          }
        )
        .then((response) => {
          // console.log(response)
          this.ExternalDatasourcebyReport = response.data.data;
        });
    },
    deleteExternalDatasourcebyReport(data) {
      // console.log(data);
      var user = Encode.encode(JSON.stringify(this.userData));
      var source_id = this.sourceData.source_id;
      const mySelf = this;
      // var txt = 'You would to suspend user : ' + 'user.name'
      this.$swal({
        title: "Are you Confirm?",
        // text: ,
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes",
      })
        .then(function (result) {
          const axios = require("axios");
          axios
            .post(
              process.env.VUE_APP_API_BACKEND +
                "/deleteExternalDatasourcebyReport",
              {
                user: user,
                data_source_external_id: Encode.encode(
                  data.data_source_external_id
                ),
                source_id: Encode.encode(source_id),
              }
            )
            .then((response) => {
              // console.log("response:", response)
              if (response.data.status === "success") {
                mySelf.$swal("Delete Success", "", "success");
                mySelf.getExternalDatasourcebyReport();
              } else {
                mySelf.$swal("Not Success", "", "error");
              }
              // this.DatasourcebyReport = response.data.data;
            });
        })
        .then((response) => {
          // console.log(response);
          // this.getDatasourebyReport()
        });
    },
    DataSourceExternal(item) {
      this.source_Datasource_External = item;
      // console.log(this.source_Datasource_External);
    },
  },
};
</script>

<style lang="css" scoped="">
.v-subheader {
  font-size: 1rem; /* เท่ากับ H4 ขนาดของ Vuetify */
  font-weight: 500; /* สามารถปรับค่าได้ตามต้องการ */
  line-height: 2rem;
  margin: 0.5rem 0;
}
>>> a.v-tabs__item.v-tabs__item--active {
  background: #2c8c95;
}

.white-text {
  color: white;
}

.v-btn--floating .v-icon {
  height: auto;
  width: inherit;
}

.color-title {
  font-size: 12px;
  background-color: a6bac5;
  color: #fff;
}

.v-text-field {
  padding-top: 0px !important;
  margin-top: 0px !important;
}

>>> .v-input input {
  max-height: 80px;
}

.flex.xs12.sm10 {
  padding: 1px !important;
}

button.bigBut.v-btn.v-btn--large.v-btn--outline.v-btn--depressed.theme--light.light-blue--text {
  padding-top: 25px;
  padding-bottom: 50px;
}

/* >>> .txtF.theme--light.v-text-field--outline > .v-input__control > .v-input__slot {
border: 2px solid #1da6df7a!important;
} */
>>> .v-input__slot {
  min-height: 40px !important;
}

>>> .v-text-field.v-text-field--enclosed > .v-input__control > .v-input__slot {
  max-height: 40px !important;
}

.v-input.txtF.v-text-field.v-text-field--single-line.theme--light {
  padding-top: 3px !important;
  margin-top: 0px !important;
}

button.setColor.setSWidth.v-btn.v-btn--flat.theme--light {
  height: 40px !important;
  width: 135px;
}

.setBackground {
  background: none;
}

.v-btn-toggle .v-btn {
  margin: 10px;
  border: 1px solid #03a9f4;
  opacity: 1;
  border-radius: 2%;
  /* border-right: 2px solid #1da6df; */
  height: 76px;
  width: 135px;
}

/* .v-btn--active:before, .v-btn:hover:before, .v-btn:focus:before {
background-color: #1da6df;
} */
.setW {
  margin: 5px !important;
}

.v-btn-toggle--selected {
  box-shadow: 0px 0px 0px 0px;
}

button.setColor.v-btn.v-btn--active.v-btn--flat.theme--light {
  background-color: #1da6df;
  border-radius: 3%;
  color: #fff !important;
  text-transform: none;
}

button.setColor {
  color: #03a9f4 !important;
  text-transform: none;
}

.contentPortal {
  margin-top: 20px;
  margin-bottom: 130px;
  padding: 16px; /* Adjust padding as needed */
}
</style>
