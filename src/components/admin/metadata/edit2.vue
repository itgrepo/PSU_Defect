<template lang="html">
  <div>
    <v-container>
      <v-tabs
        v-model="activeMetaTab"
        :scrollable="false"
        color="#336E8C"
        dark
        slider-color="#336E8C"
        grow
      >
        <v-tab dark grow class="subheading" color="#336E8C" href="#tab-1">
          <h3>{{ $t("editreport") }}</h3>
        </v-tab>
        <v-tab-item value="tab-1" lazy>
          <v-card-text>
            <v-text-field
              class="hidden-sm-and-down searchBtn pa-3"
              color="green"
              :label="$t('search')"
              v-model="searchData"
              append-icon="search"
              :append-icon-cb="() => getData()"
            >
            </v-text-field>
            <v-data-table
              v-bind:headers="headersDialog"
              v-bind:items="itemsDialog"
              v-bind:search="searchData"
              v-bind:pagination.sync="pagination"
            >
              <template slot="items" slot-scope="props">
                <!-- <td class="text-xs-center">{{ props.item.id }}</td> -->
                <td class="text-xs-center">{{ props.item.source_id }}</td>
                <!-- <td class="text-xs-center">{{ props.item.file_name }}</td> -->
                <td class="text-xs-center">
                  {{ props.item.export_excel_name }}
                </td>
                <td class="text-xs-center">{{ props.item.name }}</td>
                <td class="text-xs-center">
                  {{ props.item.sub_category_name }}
                </td>
                <td class="text-xs-center">{{ props.item.status }}</td>
                <!-- <td class="text-xs-center">{{ formatDate(props.item.create_at) }}</td> -->
                <td align="center" class="hover-img">
                  <v-btn
                    @click="openSelectDialog(props.item)"
                    outline
                    small
                    color="primary"
                    >{{ $t("edit") }}</v-btn
                  >
                </td>
              </template>
            </v-data-table>
          </v-card-text>
        </v-tab-item>
      </v-tabs>

      <!-- Dialog สำหรับเลือกข้อมูลชุด -->
      <v-dialog v-model="dialogVisible" max-width="1080px">
        <v-card>
          <v-toolbar dark color="#336E8C">
            <v-toolbar-title>{{ $t("editreport") }}</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
              <v-btn icon dark @click="dialogVisible = false">
                <v-icon>close</v-icon>
              </v-btn>
            </v-toolbar-items>
          </v-toolbar>

          <v-card-text>
            <v-flex md10>
              <v-layout row wrap class="pt-5">
                <v-flex xs12 sm12 md3 offset-md1>
                  <v-subheader
                    >{{ $t("datasettype") }}:
                    <span style="color: red">*</span>
                  </v-subheader>
                </v-flex>
                <v-flex xs12 sm12 md8>
                  <h4>
                    <v-select
                      v-model="selectedItem.data_type"
                      :items="dataTypes"
                      dense
                      outlined
                    ></v-select>
                  </h4>
                </v-flex>
              </v-layout>
            </v-flex>
            <template v-if="selectedItem.data_type === 'ข้อมูลระเบียน'">
              <v-form ref="form" v-model="valid" lazy-validation>
                <v-flex md10>
                  <v-layout row wrap class="pt-5">
                    <v-flex xs12 sm12 md3 offset-md1>
                      <v-subheader
                        >{{ $t("reprotid") }}
                        <span style="color: red">*</span></v-subheader
                      >
                    </v-flex>

                    <v-flex xs12 sm12 md8>
                      <h4>
                        <v-text-field
                          v-model="selectedItem.source_id"
                          disabled
                          required
                          :rules="RuleEnglish"
                          :placeholder="$t('placeholderText')"
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
                          v-model="selectedItem.category_id"
                          required
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
                          v-model="selectedItem.sub_category_id"
                          required
                        ></v-select>
                      </h4>
                    </v-flex>
                    <v-flex md1 pl-3>
                      <v-btn icon color="primary" @click="(dialog = true), addsub()">
                        <v-icon>add_circle</v-icon>
                      </v-btn>
                    </v-flex>

                    <v-flex xs12 sm12 md3 offset-md1>
                      <v-subheader
                        >{{ $t("status") }}<span style="color: red">*</span></v-subheader
                      >
                    </v-flex>
                    <v-flex xs12 sm12 md7>
                      <h4>
                        <v-select
                          :items="status"
                          v-model="selectedItem.status"
                          required
                          :rules="Rules"
                          :label="$t('statusLabel')"
                        ></v-select>
                      </h4>
                    </v-flex>
                    <v-flex xs12 sm12 md3 offset-md1>
                      <v-subheader
                        >{{ $t("datasetname") }}:<span style="color: red"
                          >*</span
                        ></v-subheader
                      >
                    </v-flex>
                    <v-flex xs12 sm12 md7>
                      <h4>
                        <v-text-field
                          v-model="selectedItem.export_excel_name"
                          :rules="Rule"
                          :placeholder="$t('examplePlaceholder')"
                          outlined
                          required
                        ></v-text-field>
                      </h4>
                    </v-flex>

                    <v-flex xs12 sm12 md3 offset-md1>
                      <v-subheader
                        >{{ $t("org") }}:<span style="color: red">*</span></v-subheader
                      >
                    </v-flex>
                    <v-flex xs12 sm12 md7>
                      <h4>
                        <v-select
                          item-text="org_name"
                          item-value="org_id"
                          :items="organization"
                          v-model="selectedItem.organization"
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
                          v-model="selectedItem.access"
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
                          v-model="selectedItem.contactor_name"
                          :rules="Rules"
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
                          :rules="Rules"
                          v-model="selectedItem.contactor_email"
                          :placeholder="$t('emailPlaceholder')"
                          outlined
                          dense
                          required
                        ></v-text-field>
                      </h4>
                    </v-flex>

                    <v-flex xs12 sm12 md3 offset-md1>
                      <v-subheader
                        >{{ $t("tag") }}:<span style="color: red">*</span></v-subheader
                      >
                    </v-flex>
                    <v-flex xs12 sm12 md7>
                      <h4>
                        <!-- {{tag_string}} -->
                        <v-combobox
                          v-model="selectedItem.tag"
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
                                  No results matching "<strong>{{ search }}</strong
                                  >". Press <kbd>enter</kbd> to create a new one
                                </v-list-item-title>
                              </v-list-item-content>
                            </v-list-item>
                          </template>
                        </v-combobox>
                      </h4>
                    </v-flex>

                    <v-flex xs12 sm12 md3 offset-md1>
                      <v-subheader
                        >{{ $t("des") }}:<span style="color: red">*</span></v-subheader
                      >
                    </v-flex>
                    <v-flex xs12 sm12 md7>
                      <h4>
                        <v-textarea
                          v-model="selectedItem.description"
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
                          v-model="selectedItem.objective"
                          :value="checkbox.value"
                          :label="checkbox.title"
                          :disabled="enabled1"
                          hide-details
                        ></v-checkbox>

                        <v-checkbox
                          v-model="enabled1"
                          :label="$t('others')"
                          hide-details
                          @change="clearObjectives"
                        ></v-checkbox>

                        <v-col cols="12">
                          <v-text-field
                            :disabled="!enabled1"
                            :placeholder="$t('pleaseSpecify')"
                            v-model="selectedItem.objective_other"
                            outlined
                            dense
                            required
                          ></v-text-field>
                        </v-col>
                      </h4>
                    </v-flex>

                    <v-flex xs12 sm12 md3 offset-md1>
                      <v-subheader
                        >{{ $t("data-relate-unit") }}:<span style="color: red"
                          >*</span
                        ></v-subheader
                      >
                    </v-flex>
                    <v-flex xs12 sm12 md7>
                      <h4>
                        <v-select
                          :items="frequency"
                          v-model="selectedItem.frequency"
                          dense
                          outlined
                          required
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
                          v-model="selectedItem.frequency_unit"
                          :placeholder="$t('number_placeholder')"
                          outlined
                          required
                          dense
                        ></v-text-field>
                      </h4>
                    </v-flex>

                    <v-flex xs12 sm12 md3 offset-md1>
                      <v-subheader
                        >{{ $t("geo") }}:<span style="color: red">*</span></v-subheader
                      >
                    </v-flex>
                    <v-flex xs12 sm12 md7>
                      <h4>
                        <v-select
                          :items="Geo"
                          v-model="selectedItem.geo_coverage"
                          dense
                          outlined
                        ></v-select>
                      </h4>
                    </v-flex>

                    <v-flex xs12 sm12 md3 offset-md1>
                      <v-subheader
                        >{{ $t("source") }}:<span style="color: red">*</span></v-subheader
                      >
                    </v-flex>
                    <v-flex xs12 sm12 md7>
                      <h4>
                        <v-text-field
                          v-model="selectedItem.data_source"
                          :rules="Rules"
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
                          v-model="selectedItem.data_storage"
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
                            v-model="selectedItem.data_storage_other"
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
                          v-model="selectedItem.topic_gorvernance"
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
                          v-model="selectedItem.data_license"
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
                          {{ $t("creativeCommonsAttributionShareAlike") }}<br />
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
                          v-model="selectedItem.data_condition"
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
                          v-model="selectedItem.supporter"
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
                          v-model="selectedItem.data_unit"
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
                          v-model="selectedItem.URL"
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
                          v-model="selectedItem.data_language"
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
                            v-model="selectedItem.data_language_other"
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
                              v-model="selectedItem.created_date"
                              :label="$t('dateFormatLabel')"
                              prepend-icon="mdi-calendar"
                              readonly
                              v-bind="attrs"
                              v-on="on"
                            ></v-text-field>
                          </template>
                          <v-date-picker
                            v-model="selectedItem.created_date"
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
                              v-model="selectedItem.modified_date"
                              :label="$t('dateFormatLabel')"
                              prepend-icon="mdi-calendar"
                              readonly
                              v-bind="attr"
                              v-on="on"
                            ></v-text-field>
                          </template>
                          <v-date-picker
                            v-model="selectedItem.modified_date"
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
                          v-model="selectedItem.high_value_dataset"
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
                          v-model="selectedItem.data_reference"
                          :items="yesno"
                          dense
                          outlined
                        ></v-select>
                      </h4>
                    </v-flex>
                    <v-flex offset-md9 pt-5>
                      <v-btn :disabled="!valid" color="success" @click="save()">{{
                        $t("save")
                      }}</v-btn>
                    </v-flex>
                  </v-layout>
                </v-flex>
              </v-form>
            </template>

            <!-- Additional fields for "ข้อมูลสถิติ" -->
            <template v-else-if="selectedItem.data_type === 'ข้อมูลสถิติ'">
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
                          v-model="selectedItem.source_id"
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
                          v-model="selectedItem.category_id"
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
                          v-model="selectedItem.sub_category_id"
                        ></v-select>
                      </h4>
                    </v-flex>
                    <v-flex md1 pl-3>
                      <v-btn icon color="primary" @click="(dialog = true), addsub()">
                        <v-icon>add_circle</v-icon>
                      </v-btn>
                    </v-flex>

                    <v-flex xs12 sm12 md3 offset-md1>
                      <v-subheader
                        >{{ $t("status") }}<span style="color: red">*</span></v-subheader
                      >
                    </v-flex>
                    <v-flex xs12 sm12 md7>
                      <h4>
                        <v-select
                          :items="status"
                          v-model="selectedItem.status"
                          required
                          :rules="Rules"
                          :label="$t('statusLabel')"
                        ></v-select>
                      </h4>
                    </v-flex>

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
                          v-model="selectedItem.export_excel_name"
                          :rules="Rule"
                          :placeholder="$t('examplePlaceholder')"
                          outlined
                          required
                        ></v-text-field>
                      </h4>
                    </v-flex>

                    <v-flex xs12 sm12 md3 offset-md1>
                      <v-subheader
                        >{{ $t("org") }}:<span style="color: red">*</span></v-subheader
                      >
                    </v-flex>
                    <v-flex xs12 sm12 md7>
                      <h4>
                        <v-select
                          item-text="org_name"
                          item-value="org_name"
                          :items="organization"
                          v-model="selectedItem.organization"
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
                          v-model="selectedItem.access"
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
                          v-model="selectedItem.contactor_name"
                          :rules="Rules"
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
                          v-model="selectedItem.contactor_email"
                          :placeholder="$t('emailPlaceholder')"
                          outlined
                          dense
                          required
                        ></v-text-field>
                      </h4>
                    </v-flex>

                    <v-flex xs12 sm12 md3 offset-md1>
                      <v-subheader
                        >{{ $t("tag") }}:<span style="color: red">*</span></v-subheader
                      >
                    </v-flex>
                    <v-flex xs12 sm12 md7>
                      <h4>
                        <!-- {{tag_string}} -->
                        <v-combobox
                          v-model="selectedItem.tag"
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
                                  No results matching "<strong>{{ search }}</strong
                                  >". Press <kbd>enter</kbd> to create a new one
                                </v-list-item-title>
                              </v-list-item-content>
                            </v-list-item>
                          </template>
                        </v-combobox>
                      </h4>
                    </v-flex>

                    <v-flex xs12 sm12 md3 offset-md1>
                      <v-subheader
                        >{{ $t("des") }}:<span style="color: red">*</span></v-subheader
                      >
                    </v-flex>
                    <v-flex xs12 sm12 md7>
                      <h4>
                        <v-textarea
                          v-model="selectedItem.description"
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
                          v-model="selectedItem.objective"
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
                            v-model="selectedItem.objective_other"
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
                        >{{ $t("data-relate-unit") }}:<span style="color: red"
                          >*</span
                        ></v-subheader
                      >
                    </v-flex>
                    <v-flex xs12 sm12 md7>
                      <h4>
                        <v-select
                          :items="frequency"
                          v-model="selectedItem.frequency"
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
                          v-model="selectedItem.frequency_unit"
                          :placeholder="$t('number_placeholder')"
                          outlined
                          dense
                        ></v-text-field>
                      </h4>
                    </v-flex>

                    <v-flex xs12 sm12 md3 offset-md1>
                      <v-subheader
                        >{{ $t("geo") }}:<span style="color: red">*</span></v-subheader
                      >
                    </v-flex>
                    <v-flex xs12 sm12 md7>
                      <h4>
                        <v-select
                          :items="Geo"
                          v-model="selectedItem.geo_coverage"
                          dense
                          outlined
                        ></v-select>
                      </h4>
                    </v-flex>

                    <v-flex xs12 sm12 md3 offset-md1>
                      <v-subheader
                        >{{ $t("source") }}:<span style="color: red">*</span></v-subheader
                      >
                    </v-flex>
                    <v-flex xs12 sm12 md7>
                      <h4>
                        <v-text-field
                          v-model="selectedItem.data_source"
                          :rules="Rules"
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
                          v-model="selectedItem.data_storage"
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
                            v-model="selectedItem.data_storage_other"
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
                          v-model="selectedItem.topic_gorvernance"
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
                          v-model="selectedItem.data_license"
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
                          {{ $t("creativeCommonsAttributionShareAlike") }}<br />
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
                          v-model="selectedItem.data_condition"
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
                          v-model="selectedItem.supporter"
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
                          v-model="selectedItem.data_unit"
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
                          v-model="selectedItem.URL"
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
                          v-model="selectedItem.data_language"
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
                            v-model="selectedItem.data_language_other"
                            outlined
                            dense
                            required
                          ></v-text-field>
                        </v-col>
                      </h4>
                    </v-flex>

                    <v-flex xs12 sm12 md3 offset-md1>
                      <v-subheader
                        >{{ $t("lastupdate") }}:
                        <span style="color: red">*</span></v-subheader
                      >
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
                              v-model="selectedItem.created_date"
                              :label="$t('dateFormatLabel')"
                              prepend-icon="mdi-calendar"
                              readonly
                              v-bind="attrs"
                              v-on="on"
                            ></v-text-field>
                          </template>
                          <v-date-picker
                            v-model="selectedItem.created_date"
                            @input="menu2 = false"
                          ></v-date-picker>
                        </v-menu>
                      </h4>
                    </v-flex>

                    <v-flex xs12 sm12 md3 offset-md1>
                      <v-subheader
                        >{{ $t("publicdue") }}:<span style="color: red"
                          >*</span
                        ></v-subheader
                      >
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
                              v-model="selectedItem.modified_date"
                              :label="$t('dateFormatLabel')"
                              prepend-icon="mdi-calendar"
                              readonly
                              v-bind="attr"
                              v-on="on"
                            ></v-text-field>
                          </template>
                          <v-date-picker
                            v-model="selectedItem.modified_date"
                            @input="menu3 = false"
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
                          v-model="selectedItem.startyear"
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
                          v-model="selectedItem.currentyear"
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
                          v-model="selectedItem.data_classify"
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
                    <v-flex xs12 sm12 md3 offset-md1>
                      <v-subheader
                        >{{ $t("unitofmesurement") }}:
                        <span style="color: red">*</span></v-subheader
                      >
                    </v-flex>
                    <v-flex xs12 sm12 md7>
                      <h4>
                        <v-text-field
                          v-model="selectedItem.measure"
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
                          v-model="selectedItem.data_multiplier_unit"
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
                          v-model="selectedItem.calculation"
                          outlined
                          dense
                          required
                        ></v-textarea>
                      </h4>
                    </v-flex>

                    <v-flex xs12 sm12 md3 offset-md1>
                      <v-subheader
                        >{{ $t("datapreparation") }}:<span style="color: red"
                          >*</span
                        ></v-subheader
                      >
                    </v-flex>
                    <v-flex xs12 sm12 md7>
                      <h4>
                        <v-text-field
                          v-model="selectedItem.data_standards"
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
                          v-model="selectedItem.official"
                          :items="yesno"
                          dense
                          outlined
                        ></v-select>
                      </h4>
                    </v-flex>
                  </v-layout>
                </v-flex>
                <v-flex offset-md9 pt-5>
                  <v-btn :disabled="!valid" color="success" @click="save2()">{{
                    $t("save")
                  }}</v-btn>
                </v-flex>
              </v-form>
            </template>

            <!-- Additional fields for "ข้อมูลภูมิสารสนเทศเชิงพื้นที่" -->
            <template
              v-else-if="selectedItem.data_type === 'ข้อมูลภูมิสารสนเทศเชิงพื้นที่'"
            >
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
                          v-model="selectedItem.source_id"
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
                          v-model="selectedItem.category_id"
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
                          v-model="selectedItem.sub_category_id"
                        ></v-select>
                      </h4>
                    </v-flex>
                    <v-flex md1 pl-3>
                      <v-btn icon color="primary" @click="(dialog = true), addsub()">
                        <v-icon>add_circle</v-icon>
                      </v-btn>
                    </v-flex>

                    <v-flex xs12 sm12 md3 offset-md1>
                      <v-subheader
                        >{{ $t("status") }}<span style="color: red">*</span></v-subheader
                      >
                    </v-flex>
                    <v-flex xs12 sm12 md7>
                      <h4>
                        <v-select
                          :items="status"
                          v-model="selectedItem.status"
                          required
                          :rules="Rules"
                          :label="$t('statusLabel')"
                        ></v-select>
                      </h4>
                    </v-flex>
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
                          v-model="selectedItem.export_excel_name"
                          :rules="Rule"
                          :placeholder="$t('examplePlaceholder')"
                          outlined
                          required
                        ></v-text-field>
                      </h4>
                    </v-flex>

                    <v-flex xs12 sm12 md3 offset-md1>
                      <v-subheader
                        >{{ $t("org") }}:<span style="color: red">*</span></v-subheader
                      >
                    </v-flex>
                    <v-flex xs12 sm12 md7>
                      <h4>
                        <v-select
                          item-text="org_name"
                          item-value="org_name"
                          :items="organization"
                          v-model="selectedItem.organization"
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
                          v-model="selectedItem.access"
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
                          v-model="selectedItem.contactor_name"
                          :rules="Rules"
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
                          v-model="selectedItem.contactor_email"
                          :placeholder="$t('emailPlaceholder')"
                          outlined
                          dense
                          required
                        ></v-text-field>
                      </h4>
                    </v-flex>

                    <v-flex xs12 sm12 md3 offset-md1>
                      <v-subheader
                        >{{ $t("tag") }}:<span style="color: red">*</span></v-subheader
                      >
                    </v-flex>
                    <v-flex xs12 sm12 md7>
                      <h4>
                        <!-- {{tag_string}} -->
                        <v-combobox
                          v-model="selectedItem.tag"
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
                                  No results matching "<strong>{{ search }}</strong
                                  >". Press <kbd>enter</kbd> to create a new one
                                </v-list-item-title>
                              </v-list-item-content>
                            </v-list-item>
                          </template>
                        </v-combobox>
                      </h4>
                    </v-flex>

                    <v-flex xs12 sm12 md3 offset-md1>
                      <v-subheader
                        >{{ $t("des") }}:<span style="color: red">*</span></v-subheader
                      >
                    </v-flex>
                    <v-flex xs12 sm12 md7>
                      <h4>
                        <v-textarea
                          v-model="selectedItem.description"
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
                          v-model="selectedItem.objective"
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
                            v-model="selectedItem.objective_other"
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
                        >{{ $t("data-relate-unit") }}:<span style="color: red"
                          >*</span
                        ></v-subheader
                      >
                    </v-flex>
                    <v-flex xs12 sm12 md7>
                      <h4>
                        <v-select
                          :items="frequency"
                          v-model="selectedItem.frequency"
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
                          v-model="selectedItem.frequency_unit"
                          :placeholder="$t('number_placeholder')"
                          outlined
                          dense
                        ></v-text-field>
                      </h4>
                    </v-flex>

                    <v-flex xs12 sm12 md3 offset-md1>
                      <v-subheader
                        >{{ $t("geo") }}:<span style="color: red">*</span></v-subheader
                      >
                    </v-flex>
                    <v-flex xs12 sm12 md7>
                      <h4>
                        <v-select
                          :items="Geo"
                          v-model="selectedItem.geo_coverage"
                          dense
                          outlined
                        ></v-select>
                      </h4>
                    </v-flex>

                    <v-flex xs12 sm12 md3 offset-md1>
                      <v-subheader
                        >{{ $t("source") }}:<span style="color: red">*</span></v-subheader
                      >
                    </v-flex>
                    <v-flex xs12 sm12 md7>
                      <h4>
                        <v-text-field
                          v-model="selectedItem.data_source"
                          :rules="Rules"
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
                          v-model="selectedItem.data_storage"
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
                            v-model="selectedItem.data_storage_other"
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
                          v-model="selectedItem.topic_gorvernance"
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
                          v-model="selectedItem.data_license"
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
                          {{ $t("creativeCommonsAttributionShareAlike") }}<br />
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
                          v-model="selectedItem.data_condition"
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
                          v-model="selectedItem.supporter"
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
                          v-model="selectedItem.data_unit"
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
                          v-model="selectedItem.URL"
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
                          v-model="selectedItem.data_language"
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
                            v-model="selectedItem.data_language_other"
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
                        <span style="color: red">*</span></v-subheader
                      >
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
                              v-model="selectedItem.created_date"
                              :label="$t('dateFormatLabel')"
                              prepend-icon="mdi-calendar"
                              readonly
                              v-bind="attrs"
                              v-on="on"
                            ></v-text-field>
                          </template>
                          <v-date-picker
                            v-model="selectedItem.created_date"
                            @input="menu4 = false"
                          ></v-date-picker>
                        </v-menu>
                      </h4>
                    </v-flex>

                    <v-flex xs12 sm12 md3 offset-md1>
                      <v-subheader
                        >{{ $t("publicdue") }}:<span style="color: red"
                          >*</span
                        ></v-subheader
                      >
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
                              v-model="selectedItem.modified_date"
                              :label="$t('dateFormatLabel')"
                              prepend-icon="mdi-calendar"
                              readonly
                              v-bind="attr"
                              v-on="on"
                            ></v-text-field>
                          </template>
                          <v-date-picker
                            v-model="selectedItem.modified_date"
                            @input="menu5 = false"
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
                          v-model="selectedItem.geo"
                          :items="geo"
                          dense
                          outlined
                        ></v-select>
                      </h4>
                    </v-flex>

                    <v-flex xs12 sm12 md4 offset-md1>
                      <v-subheader
                        >{{ $t("scale") }}:<span style="color: red">*</span></v-subheader
                      >
                    </v-flex>
                    <v-flex xs12 sm12 md6>
                      <h4>
                        <v-select
                          v-model="selectedItem.scale"
                          :items="scale"
                          dense
                          outlined
                        ></v-select>
                      </h4>
                    </v-flex>

                    <v-flex xs12 sm12 md4 offset-md1>
                      <v-subheader
                        >{{ $t("west") }}:<span style="color: red">*</span></v-subheader
                      >
                    </v-flex>
                    <v-flex xs12 sm12 md6>
                      <h4>
                        <v-text-field
                          v-model="selectedItem.west"
                          placeholder=""
                          outlined
                          dense
                        ></v-text-field>
                      </h4>
                    </v-flex>
                    <v-flex xs12 sm12 md4 offset-md1>
                      <v-subheader
                        >{{ $t("east") }}:<span style="color: red">*</span></v-subheader
                      >
                    </v-flex>
                    <v-flex xs12 sm12 md6>
                      <h4>
                        <v-text-field
                          v-model="selectedItem.east"
                          placeholder=""
                          outlined
                          dense
                          required
                        ></v-text-field>
                      </h4>
                    </v-flex>
                    <v-flex xs12 sm12 md4 offset-md1>
                      <v-subheader
                        >{{ $t("north") }}:<span style="color: red">*</span></v-subheader
                      >
                    </v-flex>
                    <v-flex xs12 sm12 md6>
                      <h4>
                        <v-text-field
                          v-model="selectedItem.north"
                          placeholder=""
                          outlined
                          dense
                          required
                        ></v-text-field>
                      </h4>
                    </v-flex>
                    <v-flex xs12 sm12 md4 offset-md1>
                      <v-subheader
                        >{{ $t("south") }}:<span style="color: red">*</span></v-subheader
                      >
                    </v-flex>
                    <v-flex xs12 sm12 md6>
                      <h4>
                        <v-text-field
                          v-model="selectedItem.south"
                          placeholder=""
                          outlined
                          dense
                          required
                        ></v-text-field>
                      </h4>
                    </v-flex>
                    <v-flex xs12 sm12 md4 offset-md1>
                      <v-subheader
                        >{{ $t("locationaccuract") }}:<span style="color: red"
                          >*</span
                        ></v-subheader
                      >
                    </v-flex>
                    <v-flex xs12 sm12 md6>
                      <h4>
                        <v-text-field
                          v-model="selectedItem.positioning"
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
                          v-model="selectedItem.reference_time"
                          placeholder=""
                          outlined
                          dense
                          required
                        ></v-text-field>
                      </h4>
                    </v-flex>
                    <v-flex xs12 sm12 md4 offset-md1>
                      <v-subheader
                        >{{ $t("dateofdatarelease") }}:<span style="color: red"
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
                              v-model="selectedItem.release_date"
                              :label="$t('dateFormatLabel')"
                              prepend-icon="mdi-calendar"
                              readonly
                              v-bind="attr"
                              v-on="on"
                            ></v-text-field>
                          </template>
                          <v-date-picker
                            v-model="selectedItem.release_date"
                            @input="menu6 = false"
                          ></v-date-picker>
                        </v-menu>
                      </h4>
                    </v-flex>
                  </v-layout>
                </v-flex>
                <v-flex offset-md9 pt-5>
                  <v-btn :disabled="!valid" color="success" @click="save3()">{{
                    $t("save")
                  }}</v-btn>
                </v-flex>
              </v-form>
            </template>

            <!-- Additional fields for "ข้อมูลหลากหลายประเภท" -->
            <template v-else-if="selectedItem.data_type === 'ข้อมูลหลากหลายประเภท'">
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
                          v-model="selectedItem.source_id"
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
                          v-model="selectedItem.category_id"
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
                          v-model="selectedItem.sub_category_id"
                        ></v-select>
                      </h4>
                    </v-flex>
                    <v-flex md1 pl-3>
                      <v-btn icon color="primary" @click="(dialog = true), addsub()">
                        <v-icon>add_circle</v-icon>
                      </v-btn>
                    </v-flex>

                    <v-flex xs12 sm12 md3 offset-md1>
                      <v-subheader
                        >{{ $t("status") }}<span style="color: red">*</span></v-subheader
                      >
                    </v-flex>
                    <v-flex xs12 sm12 md7>
                      <h4>
                        <v-select
                          :items="status"
                          v-model="selectedItem.status"
                          required
                          :rules="Rules"
                          :label="$t('statusLabel')"
                        ></v-select>
                      </h4>
                    </v-flex>
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
                          v-model="selectedItem.export_excel_name"
                          :rules="Rule"
                          :placeholder="$t('examplePlaceholder')"
                          outlined
                          required
                        ></v-text-field>
                      </h4>
                    </v-flex>

                    <v-flex xs12 sm12 md3 offset-md1>
                      <v-subheader
                        >{{ $t("org") }}:<span style="color: red">*</span></v-subheader
                      >
                    </v-flex>
                    <v-flex xs12 sm12 md7>
                      <h4>
                        <v-select
                          item-text="org_name"
                          item-value="org_name"
                          :items="organization"
                          v-model="selectedItem.organization"
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
                          v-model="selectedItem.access"
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
                          v-model="selectedItem.contactor_name"
                          :rules="Rules"
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
                          v-model="selectedItem.contactor_email"
                          :placeholder="$t('emailPlaceholder')"
                          outlined
                          dense
                          required
                        ></v-text-field>
                      </h4>
                    </v-flex>

                    <v-flex xs12 sm12 md3 offset-md1>
                      <v-subheader
                        >{{ $t("tag") }}:<span style="color: red">*</span></v-subheader
                      >
                    </v-flex>
                    <v-flex xs12 sm12 md7>
                      <h4>
                        <!-- {{tag_string}} -->
                        <v-combobox
                          v-model="selectedItem.tag"
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
                                  No results matching "<strong>{{ search }}</strong
                                  >". Press <kbd>enter</kbd> to create a new one
                                </v-list-item-title>
                              </v-list-item-content>
                            </v-list-item>
                          </template>
                        </v-combobox>
                      </h4>
                    </v-flex>

                    <v-flex xs12 sm12 md3 offset-md1>
                      <v-subheader
                        >{{ $t("des") }}:<span style="color: red">*</span></v-subheader
                      >
                    </v-flex>
                    <v-flex xs12 sm12 md7>
                      <h4>
                        <v-textarea
                          v-model="selectedItem.description"
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
                          v-model="selectedItem.objective"
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
                            v-model="selectedItem.objective_other"
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
                        >{{ $t("data-relate-unit") }}:<span style="color: red"
                          >*</span
                        ></v-subheader
                      >
                    </v-flex>
                    <v-flex xs12 sm12 md7>
                      <h4>
                        <v-select
                          :items="frequency"
                          v-model="selectedItem.frequency"
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
                          v-model="selectedItem.frequency_unit"
                          :placeholder="$t('number_placeholder')"
                          outlined
                          dense
                          required
                        ></v-text-field>
                      </h4>
                    </v-flex>

                    <v-flex xs12 sm12 md3 offset-md1>
                      <v-subheader
                        >{{ $t("geo") }}:<span style="color: red">*</span></v-subheader
                      >
                    </v-flex>
                    <v-flex xs12 sm12 md7>
                      <h4>
                        <v-select
                          :items="Geo"
                          v-model="selectedItem.geo_coverage"
                          dense
                          outlined
                        ></v-select>
                      </h4>
                    </v-flex>

                    <v-flex xs12 sm12 md3 offset-md1>
                      <v-subheader
                        >{{ $t("source") }}:<span style="color: red">*</span></v-subheader
                      >
                    </v-flex>
                    <v-flex xs12 sm12 md7>
                      <h4>
                        <v-text-field
                          v-model="selectedItem.data_source"
                          :rules="Rules"
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
                          v-model="selectedItem.data_storage"
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
                            v-model="selectedItem.data_storage_other"
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
                          v-model="selectedItem.topic_gorvernance"
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
                          v-model="selectedItem.data_license"
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
                          {{ $t("creativeCommonsAttributionShareAlike") }}<br />
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
                          v-model="selectedItem.data_condition"
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
                          v-model="selectedItem.supporter"
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
                          v-model="selectedItem.data_unit"
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
                          v-model="selectedItem.URL"
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
                          v-model="selectedItem.data_language"
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
                            v-model="selectedItem.data_language_other"
                            outlined
                            dense
                            required
                          ></v-text-field>
                        </v-col>
                      </h4>
                    </v-flex>

                    <v-flex xs12 sm12 md3 offset-md1>
                      <v-subheader
                        >{{ $t("datainitial") }}:<span style="color: red"
                          >*</span
                        ></v-subheader
                      >
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
                              v-model="selectedItem.created_date"
                              :label="$t('dateFormatLabel')"
                              prepend-icon="mdi-calendar"
                              readonly
                              v-bind="attrs"
                              v-on="on"
                            ></v-text-field>
                          </template>
                          <v-date-picker
                            v-model="selectedItem.created_date"
                            @input="menu7 = false"
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
                              v-model="selectedItem.modified_date"
                              :label="$t('dateFormatLabel')"
                              prepend-icon="mdi-calendar"
                              readonly
                              v-bind="attr"
                              v-on="on"
                            ></v-text-field>
                          </template>
                          <v-date-picker
                            v-model="selectedItem.modified_date"
                            @input="menu8 = false"
                          ></v-date-picker>
                        </v-menu>
                      </h4>
                    </v-flex>

                    <v-flex xs12 sm12 md3 offset-md1>
                      <v-subheader
                        >{{ $t("hvd") }}:<span style="color: red">*</span></v-subheader
                      >
                    </v-flex>
                    <v-flex xs12 sm12 md7>
                      <h4>
                        <v-select
                          v-model="selectedItem.high_value_dataset"
                          :items="yesno"
                          dense
                          outlined
                          required
                        ></v-select>
                      </h4>
                    </v-flex>

                    <v-flex xs12 sm12 md3 offset-md1>
                      <v-subheader
                        >{{ $t("rd") }}:<span style="color: red">*</span></v-subheader
                      >
                    </v-flex>
                    <v-flex xs12 sm12 md7>
                      <h4>
                        <v-select
                          v-model="selectedItem.data_reference"
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
                  <v-btn :disabled="!valid" color="success" @click="save4(false)">{{
                    $t("save")
                  }}</v-btn>
                </v-flex>
              </v-form>
            </template>

            <!-- Additional fields for "ข้อมูลประเภทอื่นๆ" -->
            <template v-else-if="selectedItem.data_type === 'ข้อมูลประเภทอื่นๆ'">
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
                          v-model="selectedItem.source_id"
                          required
                          :rules="RuleEnglish"
                          :label="$t('dataSetCodeLabel')"
                        ></v-text-field>
                      </h4>
                    </v-flex>

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
                          v-model="selectedItem.category_id"
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
                          v-model="selectedItem.sub_category_id"
                        ></v-select>
                      </h4>
                    </v-flex>
                    <v-flex md1 pl-3>
                      <v-btn icon color="primary" @click="(dialog = true), addsub()">
                        <v-icon>add_circle</v-icon>
                      </v-btn>
                    </v-flex>

                    <v-flex xs12 sm12 md3 offset-md1>
                      <v-subheader
                        >{{ $t("status") }}<span style="color: red">*</span></v-subheader
                      >
                    </v-flex>
                    <v-flex xs12 sm12 md7>
                      <h4>
                        <v-select
                          :items="status"
                          v-model="selectedItem.status"
                          required
                          :rules="Rules"
                          :label="$t('statusLabel')"
                        ></v-select>
                      </h4>
                    </v-flex>

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
                          v-model="selectedItem.export_excel_name"
                          :rules="Rule"
                          :placeholder="$t('examplePlaceholder')"
                          outlined
                          required
                        ></v-text-field>
                      </h4>
                    </v-flex>

                    <v-flex xs12 sm12 md3 offset-md1>
                      <v-subheader
                        >{{ $t("org") }}:<span style="color: red">*</span></v-subheader
                      >
                    </v-flex>
                    <v-flex xs12 sm12 md7>
                      <h4>
                        <v-select
                          item-text="org_name"
                          item-value="org_name"
                          :items="organization"
                          v-model="selectedItem.organization"
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
                          v-model="selectedItem.access"
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
                          v-model="selectedItem.contactor_name"
                          :rules="Rules"
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
                          v-model="selectedItem.contactor_email"
                          :placeholder="$t('emailPlaceholder')"
                          outlined
                          dense
                          required
                        ></v-text-field>
                      </h4>
                    </v-flex>

                    <v-flex xs12 sm12 md3 offset-md1>
                      <v-subheader
                        >{{ $t("tag") }}:<span style="color: red">*</span></v-subheader
                      >
                    </v-flex>
                    <v-flex xs12 sm12 md7>
                      <h4>
                        <!-- {{tag_string}} -->
                        <v-combobox
                          v-model="selectedItem.tag"
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
                                  No results matching "<strong>{{ search }}</strong
                                  >". Press <kbd>enter</kbd> to create a new one
                                </v-list-item-title>
                              </v-list-item-content>
                            </v-list-item>
                          </template>
                        </v-combobox>
                      </h4>
                    </v-flex>

                    <v-flex xs12 sm12 md3 offset-md1>
                      <v-subheader
                        >{{ $t("des") }}:<span style="color: red">*</span></v-subheader
                      >
                    </v-flex>
                    <v-flex xs12 sm12 md7>
                      <h4>
                        <v-textarea
                          v-model="selectedItem.description"
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
                          v-model="selectedItem.objective"
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
                            v-model="selectedItem.objective_other"
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
                        >{{ $t("data-relate-unit") }}:<span style="color: red"
                          >*</span
                        ></v-subheader
                      >
                    </v-flex>
                    <v-flex xs12 sm12 md7>
                      <h4>
                        <v-select
                          :items="frequency"
                          v-model="selectedItem.frequency"
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
                          v-model="selectedItem.frequency_unit"
                          :placeholder="$t('number_placeholder')"
                          outlined
                          dense
                        ></v-text-field>
                      </h4>
                    </v-flex>

                    <v-flex xs12 sm12 md3 offset-md1>
                      <v-subheader
                        >{{ $t("geo") }}:<span style="color: red">*</span></v-subheader
                      >
                    </v-flex>
                    <v-flex xs12 sm12 md7>
                      <h4>
                        <v-select
                          :items="Geo"
                          v-model="selectedItem.geo_coverage"
                          dense
                          outlined
                        ></v-select>
                      </h4>
                    </v-flex>

                    <v-flex xs12 sm12 md3 offset-md1>
                      <v-subheader
                        >{{ $t("source") }}:<span style="color: red">*</span></v-subheader
                      >
                    </v-flex>
                    <v-flex xs12 sm12 md7>
                      <h4>
                        <v-text-field
                          v-model="selectedItem.data_source"
                          :rules="Rules"
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
                          v-model="selectedItem.data_storage"
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
                            v-model="selectedItem.data_storage_other"
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
                          v-model="selectedItem.topic_gorvernance"
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
                          v-model="selectedItem.data_license"
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
                          {{ $t("creativeCommonsAttributionShareAlike") }}<br />
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
                          v-model="selectedItem.data_condition"
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
                          v-model="selectedItem.supporter"
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
                          v-model="selectedItem.data_unit"
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
                          v-model="selectedItem.URL"
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
                          v-model="selectedItem.data_language"
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
                            v-model="selectedItem.data_language_other"
                            outlined
                            dense
                            required
                          ></v-text-field>
                        </v-col>
                      </h4>
                    </v-flex>

                    <v-flex xs12 sm12 md3 offset-md1>
                      <v-subheader
                        >{{ $t("datainitial") }}:<span style="color: red"
                          >*</span
                        ></v-subheader
                      >
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
                              v-model="selectedItem.created_date"
                              :label="$t('dateFormatLabel')"
                              prepend-icon="mdi-calendar"
                              readonly
                              v-bind="attrs"
                              v-on="on"
                            ></v-text-field>
                          </template>
                          <v-date-picker
                            v-model="selectedItem.created_date"
                            @input="menu9 = false"
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
                              v-model="selectedItem.modified_date"
                              :label="$t('dateFormatLabel')"
                              prepend-icon="mdi-calendar"
                              readonly
                              v-bind="attr"
                              v-on="on"
                            ></v-text-field>
                          </template>
                          <v-date-picker
                            v-model="selectedItem.modified_date"
                            @input="menu10 = false"
                          ></v-date-picker>
                        </v-menu>
                      </h4>
                    </v-flex>

                    <v-flex xs12 sm12 md3 offset-md1>
                      <v-subheader
                        >{{ $t("hvd") }}:<span style="color: red">*</span></v-subheader
                      >
                    </v-flex>
                    <v-flex xs12 sm12 md7>
                      <h4>
                        <v-select
                          v-model="selectedItem.high_value_dataset"
                          :items="yesno"
                          dense
                          outlined
                        ></v-select>
                      </h4>
                    </v-flex>

                    <v-flex xs12 sm12 md3 offset-md1>
                      <v-subheader
                        >{{ $t("rd") }}:<span style="color: red">*</span></v-subheader
                      >
                    </v-flex>
                    <v-flex xs12 sm12 md7>
                      <h4>
                        <v-select
                          v-model="selectedItem.data_reference"
                          :items="yesno"
                          dense
                          outlined
                        ></v-select>
                      </h4>
                    </v-flex>
                  </v-layout>
                </v-flex>
                <v-flex offset-md9 pt-5>
                  <v-btn :disabled="!valid" color="success" @click="save5()">{{
                    $t("save")
                  }}</v-btn>
                </v-flex>
              </v-form>
            </template>

            <!-- เพิ่มเนื้อหาที่ต้องการใน dialog ที่นี่ -->
          </v-card-text>
        </v-card>
      </v-dialog>

      <addsub ref="addsub"></addsub>
    </v-container>
  </div>
</template>

<script>
import addsub from "@/components/admin/metadata/addsub";
import { Encode, Decode } from "@/services";
export default {
  components: {
    addsub,
  },
  // components: { DialogAddGroupInReports, DialogAddUserInReports, DialogAddGroupUserInGruopReports, DialogAddByGroupUser },
  data() {
    return {
      dialogVisible: false,
      search: "",
      dialogMetadata: false,
      searchData: "",
      pagination: {},
      headersDialog: [
        //   { text: 'Number', sortable: true, align: 'center', value: 'id' },
        {
          text: "Dataset ID",
          sortable: false,
          align: "center",
          value: "source_id",
        },
        //   { text: 'File Name', sortable: true, align: 'center', value: 'file_name' },
        {
          text: "Dataset Name",
          sortable: false,
          align: "center",
          value: "export_excel_name",
        },
        { text: "Category", sortable: false, align: "center", value: "name" },
        {
          text: "Sub Category",
          sortable: false,
          align: "center",
          value: "sub_category_name",
        },
        { text: "Status", sortable: false, align: "center", value: "status" },
        //   { text: 'Date Created', sortable: false, align: 'center', value: 'dateCreate' },
        { text: "Edit", sortable: false, align: "center", value: "edit" },
      ],
      itemsDialog: [],
      headers: [
        {
          text: "Group Report Name",
          // align: 'center',
          value: "group_report_name",
          sortable: false,
        },
        {
          text: "Create Date",
          align: "center",
          sortable: false,
        },
        {
          text: "",
          align: "center",
          sortable: false,
        },
      ],
      groupReports: [
        // { "create_at": "06/02/2021, 16:22:28", "group_report_id": "1", "group_report_name": "All Report" },
        // { "create_at": "06/02/2021, 16:22:28", "group_report_id": "1", "group_report_name": "Admin" },
      ],
      groupUser: [],
      metadataDetail: [],
      data: [],
      selectedItem: {}, // เก็บข้อมูลที่เลือก
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
      created_date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      modified_date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      tag: [],
      tag_string: [],
      //     "dataTypes": [
      //   "Record Data",
      //   "Statistical Data",
      //   "Geospatial Data",
      //   "Miscellaneous Data",
      //   "Other Data Types"
      // ],
      // "dataTypes": [
      //   "ข้อมูลระเบียน",
      //   "ข้อมูลสถิติ",
      //   "ข้อมูลภูมิสารสนเทศเชิงพื้นที่",
      //   "ข้อมูลหลากหลายประเภท",
      //   "ข้อมูลประเภทอื่นๆ"
      // ],
      dataTypes: [
        "ข้อมูลระเบียน",
        "ข้อมูลสถิติ",
        "ข้อมูลภูมิสารสนเทศเชิงพื้นที่",
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
      check: [
        // { id: 1, title: "ยุทธศาสตร์ชาติ", value: "ยุทธศาสตร์ชาติ" },
        // { id: 2, title: "แผนพัฒนาเศรษฐกิจและสังคมแห่งชาติ", value: "แผนพัฒนาเศรษฐกิจและสังคมแห่งชาติ", },
        // { id: 3, title: "แผนความมั่นคงแห่งชาติ", value: "แผนความมั่นคงแห่งชาติ" },
        // { id: 4, title: "แผนแม่บทภายใต้ยุทธศาตร์ชาติ", value: "แผนแม่บทภายใต้ยุทธศาตร์ชาติ", },
        // { id: 5, title: "แผนปฏิรูปประเทศ", value: "แผนปฏิรูปประเทศ" },
        // { id: 6, title: "แผนระดับที่ 3 (มติครม. 4 ธ.ค. 2560)", value: "แผนระดับที่ 3 (มติครม. 4 ธ.ค. 2560)", },
        // { id: 7, title: "นโยบายรัฐบาล/ข้อสั่งการนายกรัฐมนตรี", value: "นโยบายรัฐบาล/ข้อสั่งการนายกรัฐมนตรี", },
        // { id: 8, title: "มติคณะรัฐมนตรี", value: "มติคณะรัฐมนตรี" },
        // { id: 9, title: "เพื่อการให้บริการประชาชน", value: "เพื่อการให้บริการประชาชน", },
        // { id: 10, title: "กฏหมายที่เกี่ยวข้อง", value: "กฏหมายที่เกี่ยวข้อง" },
        // { id: 11, title: "พันธกิจหน่วยงาน", value: "พันธกิจหน่วยงาน" },
        // { id: 12, title: "ดัชนี/ตัวชี้วัดระดับนานาชาติ", value: "ดัชนี/ตัวชี้วัดระดับนานาชาติ", },
        // { id: 13, title: "ไม่ทราบ", value: "ไม่ทราบ" },
        // { id: 14, title: "อื่นๆ", value: "other" },
      ],
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
      scale: ["", "1:4,000", "1:10,000", "1:25,000", "1:50,000", "1:250,000", "อื่นๆ"],
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
        { id: 1, title: "ไทย", value: "ไทย" },
        { id: 2, title: "อังกฤษ", value: "อังกฤษ" },
        { id: 3, title: "จีน", value: "จีน" },
        { id: 4, title: "มลายู", value: "มลายู" },
        { id: 5, title: "พม่า", value: "พม่า" },
        { id: 6, title: "ลาว", value: "ลาว" },
        { id: 7, title: "เขมร", value: "เขมร" },
        { id: 8, title: "ญี่ปุ่น", value: "ญี่ปุ่น" },
        { id: 9, title: "เกาหลี", value: "เกาหลี" },
        { id: 10, title: "ฝรั่งเศส", value: "ฝรั่งเศส" },
        { id: 11, title: "เยอรมัน", value: "เยอรมัน" },
        { id: 12, title: "อารบิก", value: "อารบิก" },
        { id: 13, title: "ไม่ทราบ", value: "ไม่ทราบ" },
      ],
      classify: [
        { id: 1, title: "ไม่มี", value: "ไม่มี" },
        { id: 2, title: "เพศ", value: "เพศ" },
        { id: 3, title: "อายุ/กลุ่มอายุ", value: "อายุ/กลุ่มอายุ" },
        { id: 4, title: "สถานภาพสมรส", value: "สถานภาพสมรส" },
        { id: 5, title: "ระดับการศึกษา", value: "ระดับการศึกษา" },
        { id: 6, title: "อาชีพ", value: "อาชีพ" },
        { id: 7, title: "สถานภาพการทำงาน", value: "สถานภาพการทำงาน" },
        {
          id: 8,
          title: "อุตสาหกรรม/ประเภทกิจการ",
          value: "อุตสาหกรรม/ประเภทกิจการ",
        },
        { id: 9, title: "รายได้", value: "รายได้" },
        {
          id: 10,
          title: "ขอบเขตเชิงภูมิศาสตร์หรือเชิงพื้นที่",
          value: "ขอบเขตเชิงภูมิศาสตร์หรือเชิงพื้นที่",
        },
        { id: 11, title: "ผลิตภัณฑ์", value: "ผลิตภัณฑ์" },
        { id: 12, title: "ไม่ทราบ", value: "ไม่ทราบ" },
      ],
      data_format: [
        { id: 1, title: "CSV", value: "CSV" },
        { id: 2, title: "XLSX", value: "XLSX" },
        { id: 3, title: "Database", value: "Database" },
        { id: 4, title: "Image", value: "Image" },
        { id: 5, title: "Video", value: "Video" },
        { id: 6, title: "Audio", value: "Audio" },
        { id: 7, title: "Text", value: "Text" },
        { id: 8, title: "JSON", value: "JSON" },
        { id: 9, title: "HTML", value: "HTML" },
        { id: 10, title: "XLS", value: "XLS" },
        { id: 11, title: "PDF", value: "PDF" },
        { id: 12, title: "RDF", value: "RDF" },
        { id: 13, title: "NoSQL", value: "NoSQL" },
        { id: 14, title: "Arc/Info Converage", value: "Arc/Info Converage" },
        { id: 15, title: "Shapefile", value: "Shapefile" },
        { id: 16, title: "GeoTiff", value: "GeoTiff" },
        { id: 17, title: "GML", value: "GML" },
        { id: 18, title: "ไม่ทราบ", value: "ไม่ทราบ" },
      ],
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
    "selectedItem.category_id"(newVal) {
      if (newVal) {
        this.getSubCategory();
      }
    },
    sourceData(val) {
      this.datasub();
    },
    "selectedItem.source_id": function (newVal) {
      this.selectedItem.file_name = newVal;
    },
    "selectedItem.modified_date"(newDate) {
      if (
        newDate &&
        this.selectedItem.created_date &&
        newDate < this.selectedItem.created_date
      ) {
        this.selectedItem.modified_date = this.selectedItem.created_date;
        alert("วันที่ปรับปรุงข้อมูลล่าสุดไม่สามารถน้อยกว่าวันที่เริ่มต้นสร้างได้");
      }
    },
    "selectedItem.created_date"(newDate) {
      if (
        newDate &&
        this.selectedItem.modified_date &&
        newDate > this.selectedItem.modified_date
      ) {
        this.selectedItem.created_date = this.selectedItem.modified_date;
        alert("วันที่สร้างข้อมูลไม่สามารถมากกว่าวันที่ปรับปรุงได้");
      }
    },
    "$i18n.locale": function () {
      this.updateCheck();
    },
  },
  mounted() {
    this.dataCatagory();
    this.getData();
    this.get_GroupsReport();
    this.oganize();
    this.updateCheck();
  },
  methods: {
    clearObjectives() {
    if (this.enabled1) {
      this.selectedItem.objective = []; // ล้างค่าที่เลือกใน checkbox
    }
  },
    dataSource(data) {
      // console.log(data);
      this.selectedItem = data;
      this.selectedItem.word_id = "key1";
      this.getSubCategory();
      this.add_data_source_byReport = "1";
      this.getDatasourebyReport();
      this.getExternalDatasourcebyReport();
    },
    getSubCategory() {
      this.axios
        .post(process.env.VUE_APP_API_BACKEND + "/getSubCategoryName", {
          category_id: this.selectedItem.category_id,
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
    updateCheck() {
      this.check = [
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
        { id: 13, title: this.$t("unknown"), value: "ไม่ทราบ" },
        // { id: 14, title: this.$t('others'), value: "other" }, <!-- Uncomment if needed -->
      ];
    },
    openSelectDialog(item) {
      this.selectedItem = item; // ตั้งค่าข้อมูลที่เลือก
      this.dialogVisible = true; // เปิด dialog
    },
    addsub() {
      this.$refs.addsub.open();
    },
    dataCatagory() {
      this.axios
        .get(process.env.VUE_APP_API_BACKEND + "/getCategoryMetadata")
        .then((response) => {
          this.itemCategory = response.data;
        });
    },
    oganize() {
      this.axios
        .get(process.env.VUE_APP_API_BACKEND + "/showOrganize", {})
        .then((response) => {
          this.organization = response.data;
          console.log("org_name", this.organization);
        })
        .catch((error) => {
          console.error("Error fetching organizations:", error);
        });
    },
    openUserInReport(data) {
      this.$refs.DialogAddUserInReports.open(data);
    },
    open(data) {
      this.$refs.DialogAddGroupInReports.open(data);
      // this.getData()
    },
    getData() {
      this.axios
        .post(process.env.VUE_APP_API_BACKEND + "/getDataExportExcel")
        .then((response) => {
          this.itemsDialog = response.data;
          // console.log(this.itemsDialog)
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
    openAddGroupUserInGroupReport(data) {
      this.$refs.DialogAddGroupUserInGruopReports.open(data);
    },
    openDialogAddByGroupUser(data) {
      this.$refs.DialogAddByGroupUser.open(data);
    },
    save() {
      // ตรวจสอบข้อมูลเบื้องต้น
      if (!this.selectedItem.category_id || !this.selectedItem.source_id) {
        this.$swal("Information is required", "", "warning");
        return;
      }

      // เตรียมข้อมูลสำหรับการบันทึก
      this.selectedItem.user_id = this.userData.user_id;
      this.selectedItem.name = "-";
      this.selectedItem.sub_category_name = "-";
      this.selectedItem.data_source = "-";
      this.selectedItem.Level_Master_id = "1";
      this.selectedItem.sublevel_desc = "General";
      this.selectedItem.level_desc = "Public data for free";

      if (!this.enabled1) {
        this.selectedItem.objective_other = ""; // Set objective_other to an empty string if "Other" checkbox is unchecked
      }
      if (!this.enabled2) {
        this.selectedItem.data_storage_other = ""; // Set data_storage_other to an empty string if "Other" checkbox is unchecked
      }
      if (!this.enabled3) {
        this.selectedItem.data_language_other = ""; // Set data_language_other to an empty string if "Other" checkbox is unchecked
      }

      // ส่งคำขอ POST เพื่อบันทึกข้อมูล
      this.axios
        .post(process.env.VUE_APP_API_BACKEND + "/editMetadatarecord", {
          user_id: this.userData.user_id,
          sublevel_key: "1",
          source_id: this.selectedItem.source_id,
          file_name: this.selectedItem.source_id,
          category_id: this.selectedItem.category_id,
          sub_category_id: this.selectedItem.sub_category_id,
          status: this.selectedItem.status,
          data_type: "ข้อมูลระเบียน",
          export_excel_name: this.selectedItem.export_excel_name,
          organization: this.selectedItem.organization,
          access: this.selectedItem.access,
          data_harvest: false,
          contactor_name: this.selectedItem.contactor_name,
          contactor_email: this.selectedItem.contactor_email,
          tag: this.selectedItem.tag,
          description: this.selectedItem.description,
          objective: this.selectedItem.objective,
          objective_other: this.selectedItem.objective_other,
          frequency: this.selectedItem.frequency,
          frequency_unit: this.selectedItem.frequency_unit,
          geo_coverage: this.selectedItem.geo_coverage,
          data_source: this.selectedItem.data_source,
          topic_gorvernance: this.selectedItem.topic_gorvernance,
          data_license: this.selectedItem.data_license,
          data_condition: this.selectedItem.data_condition,
          supporter: this.selectedItem.supporter,
          data_unit: this.selectedItem.data_unit,
          URL: this.selectedItem.URL,
          data_language: this.selectedItem.data_language,
          data_language_other: this.selectedItem.data_language_other,
          data_storage: this.selectedItem.data_storage,
          data_storage_other: this.selectedItem.data_storage_other,
          created_date: this.selectedItem.created_date,
          modified_date: this.selectedItem.modified_date,
          high_value_dataset: this.selectedItem.high_value_dataset,
          data_reference: this.selectedItem.data_reference,
        })
        .then((response) => {
          if (response.data.status === "success") {
            this.$swal("Save Success", "", "success").then(() => {
              this.reloadPage();
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
    save2() {
      // ตรวจสอบข้อมูลเบื้องต้น
      if (!this.selectedItem.category_id || !this.selectedItem.source_id) {
        this.$swal("Information is required", "", "warning");
        return;
      }

      // เตรียมข้อมูลสำหรับการบันทึก
      this.selectedItem.user_id = this.userData.user_id;
      this.selectedItem.name = "-";
      this.selectedItem.sub_category_name = "-";
      this.selectedItem.data_source = "-";
      this.selectedItem.Level_Master_id = "1";
      this.selectedItem.sublevel_desc = "General";
      this.selectedItem.level_desc = "Public data for free";

      if (!this.enabled1) {
        this.selectedItem.objective_other = ""; // Set objective_other to an empty string if "Other" checkbox is unchecked
      }
      if (!this.enabled2) {
        this.selectedItem.data_storage_other = ""; // Set data_storage_other to an empty string if "Other" checkbox is unchecked
      }
      if (!this.enabled3) {
        this.selectedItem.data_language_other = ""; // Set data_language_other to an empty string if "Other" checkbox is unchecked
      }

      // ส่งคำขอ POST เพื่อบันทึกข้อมูล
      this.axios
        .post(process.env.VUE_APP_API_BACKEND + "/editMetadatastatistics", {
          user_id: this.userData.user_id,
          sublevel_key: "1",
          source_id: this.selectedItem.source_id,
          file_name: this.selectedItem.source_id,
          category_id: this.selectedItem.category_id,
          sub_category_id: this.selectedItem.sub_category_id,
          status: this.selectedItem.status,
          data_type: "ข้อมูลสถิติ",
          export_excel_name: this.selectedItem.export_excel_name,
          organization: this.selectedItem.organization,
          access: this.selectedItem.access,
          data_harvest: false,
          contactor_name: this.selectedItem.contactor_name,
          contactor_email: this.selectedItem.contactor_email,
          tag: this.selectedItem.tag,
          description: this.selectedItem.description,
          objective: this.selectedItem.objective,
          objective_other: this.selectedItem.objective_other,
          frequency: this.selectedItem.frequency,
          frequency_unit: this.selectedItem.frequency_unit,
          geo_coverage: this.selectedItem.geo_coverage,
          data_source: this.selectedItem.data_source,
          topic_gorvernance: this.selectedItem.topic_gorvernance,
          data_license: this.selectedItem.data_license,
          data_condition: this.selectedItem.data_condition,
          supporter: this.selectedItem.supporter,
          data_unit: this.selectedItem.data_unit,
          URL: this.selectedItem.URL,
          data_language: this.selectedItem.data_language,
          data_language_other: this.selectedItem.data_language_other,
          data_storage: this.selectedItem.data_storage,
          data_storage_other: this.selectedItem.data_storage_other,
          created_date: this.selectedItem.created_date,
          modified_date: this.selectedItem.modified_date,
          startyear: this.selectedItem.startyear,
          currentyear: this.selectedItem.currentyear,
          data_classify: this.selectedItem.data_classify,
          data_classify_other: this.data_classify_other,
          measure: this.selectedItem.measure,
          data_multiplier_unit: this.selectedItem.data_multiplier_unit,
          calculation: this.selectedItem.calculation,
          data_standards: this.selectedItem.data_standards,
          official: this.selectedItem.official,
        })
        .then((response) => {
          if (response.data.status === "success") {
            this.$swal("Save Success", "", "success").then(() => {
              this.reloadPage();
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
    save3() {
      // ตรวจสอบข้อมูลเบื้องต้น
      if (!this.selectedItem.category_id || !this.selectedItem.source_id) {
        this.$swal("Information is required", "", "warning");
        return;
      }

      // เตรียมข้อมูลสำหรับการบันทึก
      this.selectedItem.user_id = this.userData.user_id;
      this.selectedItem.name = "-";
      this.selectedItem.sub_category_name = "-";
      this.selectedItem.data_source = "-";
      this.selectedItem.Level_Master_id = "1";
      this.selectedItem.sublevel_desc = "General";
      this.selectedItem.level_desc = "Public data for free";

      if (!this.enabled1) {
        this.selectedItem.objective_other = ""; // Set objective_other to an empty string if "Other" checkbox is unchecked
      }
      if (!this.enabled2) {
        this.selectedItem.data_storage_other = ""; // Set data_storage_other to an empty string if "Other" checkbox is unchecked
      }
      if (!this.enabled3) {
        this.selectedItem.data_language_other = ""; // Set data_language_other to an empty string if "Other" checkbox is unchecked
      }

      // ส่งคำขอ POST เพื่อบันทึกข้อมูล
      this.axios
        .post(process.env.VUE_APP_API_BACKEND + "/editMetadatageospatial", {
          user_id: this.userData.user_id,
          sublevel_key: "1",
          source_id: this.selectedItem.source_id,
          file_name: this.selectedItem.source_id,
          category_id: this.selectedItem.category_id,
          sub_category_id: this.selectedItem.sub_category_id,
          status: this.selectedItem.status,
          data_type: "ข้อมูลภูมิสารสนเทศเชิงพื้นที่",
          export_excel_name: this.selectedItem.export_excel_name,
          organization: this.selectedItem.organization,
          access: this.selectedItem.access,
          data_harvest: false,
          contactor_name: this.selectedItem.contactor_name,
          contactor_email: this.selectedItem.contactor_email,
          tag: this.selectedItem.tag,
          description: this.selectedItem.description,
          objective: this.selectedItem.objective,
          objective_other: this.selectedItem.objective_other,
          frequency: this.selectedItem.frequency,
          frequency_unit: this.selectedItem.frequency_unit,
          geo_coverage: this.selectedItem.geo_coverage,
          data_source: this.selectedItem.data_source,
          topic_gorvernance: this.selectedItem.topic_gorvernance,
          data_license: this.selectedItem.data_license,
          data_condition: this.selectedItem.data_condition,
          supporter: this.selectedItem.supporter,
          data_unit: this.selectedItem.data_unit,
          URL: this.selectedItem.URL,
          data_language: this.selectedItem.data_language,
          data_language_other: this.selectedItem.data_language_other,
          data_storage: this.selectedItem.data_storage,
          data_storage_other: this.selectedItem.data_storage_other,
          created_date: this.selectedItem.created_date,
          modified_date: this.selectedItem.modified_date,
          geo: this.selectedItem.geo,
          scale: this.selectedItem.scale,
          west: this.selectedItem.west,
          east: this.selectedItem.east,
          north: this.selectedItem.north,
          south: this.selectedItem.south,
          positioning: this.selectedItem.positioning,
          reference_time: this.selectedItem.reference_time,
          release_data: this.selectedItem.release_date,
        })
        .then((response) => {
          if (response.data.status === "success") {
            this.$swal("Save Success", "", "success").then(() => {
              this.reloadPage();
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
    save4() {
      // ตรวจสอบข้อมูลเบื้องต้น
      if (!this.selectedItem.category_id || !this.selectedItem.source_id) {
        this.$swal("Information is required", "", "warning");
        return;
      }

      // เตรียมข้อมูลสำหรับการบันทึก
      this.selectedItem.user_id = this.userData.user_id;
      this.selectedItem.name = "-";
      this.selectedItem.sub_category_name = "-";
      this.selectedItem.data_source = "-";
      this.selectedItem.Level_Master_id = "1";
      this.selectedItem.sublevel_desc = "General";
      this.selectedItem.level_desc = "Public data for free";

      if (!this.enabled1) {
        this.selectedItem.objective_other = ""; // Set objective_other to an empty string if "Other" checkbox is unchecked
      }
      if (!this.enabled2) {
        this.selectedItem.data_storage_other = ""; // Set data_storage_other to an empty string if "Other" checkbox is unchecked
      }
      if (!this.enabled3) {
        this.selectedItem.data_language_other = ""; // Set data_language_other to an empty string if "Other" checkbox is unchecked
      }

      // ส่งคำขอ POST เพื่อบันทึกข้อมูล
      this.axios
        .post(process.env.VUE_APP_API_BACKEND + "/editMetadatavarioustypes", {
          user_id: this.userData.user_id,
          sublevel_key: "1",
          source_id: this.selectedItem.source_id,
          file_name: this.selectedItem.source_id,
          category_id: this.selectedItem.category_id,
          sub_category_id: this.selectedItem.sub_category_id,
          status: this.selectedItem.status,
          data_type: "ข้อมูลหลากหลายประเภท",
          export_excel_name: this.selectedItem.export_excel_name,
          organization: this.selectedItem.organization,
          access: this.selectedItem.access,
          data_harvest: false,
          contactor_name: this.selectedItem.contactor_name,
          contactor_email: this.selectedItem.contactor_email,
          tag: this.selectedItem.tag,
          description: this.selectedItem.description,
          objective: this.selectedItem.objective,
          objective_other: this.selectedItem.objective_other,
          frequency: this.selectedItem.frequency,
          frequency_unit: this.selectedItem.frequency_unit,
          geo_coverage: this.selectedItem.geo_coverage,
          data_source: this.selectedItem.data_source,
          topic_gorvernance: this.selectedItem.topic_gorvernance,
          data_license: this.selectedItem.data_license,
          data_condition: this.selectedItem.data_condition,
          supporter: this.selectedItem.supporter,
          data_unit: this.selectedItem.data_unit,
          URL: this.selectedItem.URL,
          data_language: this.selectedItem.data_language,
          data_language_other: this.selectedItem.data_language_other,
          data_storage: this.selectedItem.data_storage,
          data_storage_other: this.selectedItem.data_storage_other,
          created_date: this.selectedItem.created_date,
          modified_date: this.selectedItem.modified_date,
          high_value_dataset: this.selectedItem.high_value_dataset,
          data_reference: this.selectedItem.data_reference,
        })
        .then((response) => {
          if (response.data.status === "success") {
            this.$swal("Save Success", "", "success").then(() => {
              this.reloadPage();
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
    save5() {
      // ตรวจสอบข้อมูลเบื้องต้น
      if (!this.selectedItem.category_id || !this.selectedItem.source_id) {
        this.$swal("Information is required", "", "warning");
        return;
      }

      // เตรียมข้อมูลสำหรับการบันทึก
      this.selectedItem.user_id = this.userData.user_id;
      this.selectedItem.name = "-";
      this.selectedItem.sub_category_name = "-";
      this.selectedItem.data_source = "-";
      this.selectedItem.Level_Master_id = "1";
      this.selectedItem.sublevel_desc = "General";
      this.selectedItem.level_desc = "Public data for free";

      if (!this.enabled1) {
        this.selectedItem.objective_other = ""; // Set objective_other to an empty string if "Other" checkbox is unchecked
      }
      if (!this.enabled2) {
        this.selectedItem.data_storage_other = ""; // Set data_storage_other to an empty string if "Other" checkbox is unchecked
      }
      if (!this.enabled3) {
        this.selectedItem.data_language_other = ""; // Set data_language_other to an empty string if "Other" checkbox is unchecked
      }

      // ส่งคำขอ POST เพื่อบันทึกข้อมูล
      this.axios
        .post(process.env.VUE_APP_API_BACKEND + "/editMetadataOthertypes", {
          user_id: this.userData.user_id,
          sublevel_key: "1",
          source_id: this.selectedItem.source_id,
          file_name: this.selectedItem.source_id,
          category_id: this.selectedItem.category_id,
          sub_category_id: this.selectedItem.sub_category_id,
          status: this.selectedItem.status,
          data_type: "ข้อมูลประเภทอื่นๆ",
          export_excel_name: this.selectedItem.export_excel_name,
          organization: this.selectedItem.organization,
          access: this.selectedItem.access,
          data_harvest: false,
          contactor_name: this.selectedItem.contactor_name,
          contactor_email: this.selectedItem.contactor_email,
          tag: this.selectedItem.tag,
          description: this.selectedItem.description,
          objective: this.selectedItem.objective,
          objective_other: this.selectedItem.objective_other,
          frequency: this.selectedItem.frequency,
          frequency_unit: this.selectedItem.frequency_unit,
          geo_coverage: this.selectedItem.geo_coverage,
          data_source: this.selectedItem.data_source,
          topic_gorvernance: this.selectedItem.topic_gorvernance,
          data_license: this.selectedItem.data_license,
          data_condition: this.selectedItem.data_condition,
          supporter: this.selectedItem.supporter,
          data_unit: this.selectedItem.data_unit,
          URL: this.selectedItem.URL,
          data_language: this.selectedItem.data_language,
          data_language_other: this.selectedItem.data_language_other,
          data_storage: this.selectedItem.data_storage,
          data_storage_other: this.selectedItem.data_storage_other,
          created_date: this.selectedItem.created_date,
          modified_date: this.selectedItem.modified_date,
          high_value_dataset: this.selectedItem.high_value_dataset,
          data_reference: this.selectedItem.data_reference,
        })
        .then((response) => {
          if (response.data.status === "success") {
            this.$swal("Save Success", "", "success").then(() => {
              this.reloadPage();
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
  },
};
</script>

<style lang="css" scoped="">
.blueIntel {
  background-color: #1da6df !important;
}

.bg-dialog {
  background-color: #ffffff;
}

.center-workbench {
  display: block;
  margin: auto;
}

>>> a.v-tabs__item.v-tabs__item--active {
  background: #42a5f5 !important;
}
</style>
