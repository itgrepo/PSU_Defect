<template lang="html">
    <v-card flat class="record">
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-flex md10>

            <v-layout row wrap class="pt-5">
              <v-flex xs12 sm12 md3 offset-md1>
                <v-subheader>Dataset ID</v-subheader>
              </v-flex>
              <v-flex xs12 sm12 md7>
                <h4>
                  <v-text-field v-model="sourceData.source_id" required :rules="RuleEnglish"
                    :label="$t('dataSetCodeLabel')"></v-text-field>
                </h4>
              </v-flex>
              <v-flex md1 pl-3>
                <v-btn fab dark small color="primary" @click="(dialog = true), getData()">
                  <v-icon color="white">search</v-icon>
                </v-btn>
              </v-flex>
              <v-flex xs12 sm12 md3 offset-md1>
                <v-subheader>File Name</v-subheader>
              </v-flex>
              <v-flex xs12 sm12 md7>
                <h4>
                <v-text-field label="กรอกรหัสชุดข้อมูลตัวอย่าง A001 เป็นภาษาอังกฤษหรือภาษาไทยและห้ามเว้นวรรค" required :rules="Rule"
                  v-model="sourceData.file_name">
                </v-text-field>
                </h4>
              </v-flex>
              <v-flex xs12 sm12 md3 offset-md1>
                <v-subheader>Category<span style="color: red">*</span></v-subheader>
              </v-flex>
              <v-flex xs12 sm12 md7>
<h4>
                <v-select item-text="name" item-value="category_id" :items="itemCategory"
                  :label="$t('selectCategoryLabel')" v-model="sourceData.category_id"
                  @change="getSubCategory()" :rules="[rules.required]"></v-select>
                  </h4>
              </v-flex>
              <v-flex xs12 sm12 md3 offset-md1>
                <v-subheader>Sub Category<span style="color: red">*</span></v-subheader>
              </v-flex>
              <v-flex xs12 sm12 md7>
                <h4>
                 <v-select :items="itemSubCategory" item-text="sub_category_name" item-value="sub_category_id"
                  :label="$t('subCategoryLabel')" v-model="sourceData.sub_category_id"  :rules="[rules.required]"></v-select>
                  </h4>
              </v-flex>
              <v-flex md1 pl-3>
                <v-btn icon color="primary" @click="(dialog = true), addsub()">
                  <v-icon>add_circle</v-icon>
                </v-btn>
              </v-flex>
              <v-flex xs12 sm12 md3 offset-md1>
                <v-subheader>Status<span style="color: red">*</span></v-subheader>
              </v-flex>
              <v-flex xs12 sm12 md7>
                <h4>
                <v-select :items="status" v-model="sourceData.status" required :rules="Rules"
                  :label="$t('statusLabel')"></v-select>
                  </h4>
              </v-flex>
              <v-flex xs12 sm12 md3 offset-md1>
                <v-subheader>ประเภทชุดข้อมูล:<span style="color: red">*</span></v-subheader>
              </v-flex>
              <v-flex xs12 sm12 md7>
                <h4>
                  <v-select
                  :items="datatype"
                  v-model="sourceData.data_type"
                  dense
                  outlined
                 :rules="[rules.required]"></v-select>
                </h4>
              </v-flex>

              <v-flex xs12 sm12 md3 offset-md1>
                <v-subheader>ชื่อชุดข้อมูล:<span style="color: red">*</span></v-subheader>
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
                <v-subheader>องค์กร:<span style="color: red">*</span></v-subheader>
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
                <v-subheader>การเข้าถึง:<span style="color: red">*</span></v-subheader>
              </v-flex>
              <v-flex xs12 sm12 md7>
                <h4>
                 <v-select
                  item-text="title"
                  item-value="value"
                  :items="accessibility"
  <v-select
    v-model="sourceData.access"
    :items="['public', 'private', 'internal']"
    label="Accessibility"
    :rules="[rules.required]"
    required
  ></v-select>
                  dense
                  outlined
                 :rules="[rules.required]"></v-select>
                </h4>
              </v-flex>
              <v-flex xs12 sm12 md3 offset-md1>
                <v-subheader>ชื่อผู้ติดต่อ:<span style="color: red">*</span></v-subheader>
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
                <v-subheader>อีเมลผู้มาติดต่อ:<span style="color: red">*</span></v-subheader>
              </v-flex>
              <v-flex xs12 sm12 md7>
                <h4>
                   <v-text-field
                  v-model="sourceData.contactor_email"
                  :placeholder="$t('emailPlaceholder')"
                  outlined
                  dense
                  required
                 :rules="[rules.required]"></v-text-field>
                </h4>
              </v-flex>

              
                 <v-flex xs12 sm12 md3 offset-md1>
                <v-subheader>คำสำคัญ:<span style="color: red">*</span></v-subheader>
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
                  hide-selected
                  hint="Maximum of 10 tags"
                  :label="$t('categoryExamples')"
                  multiple
                  persistent-hint
                  small-chips
                  
                 :rules="[rules.required]">
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
                <v-subheader>รายละเอียด:<span style="color: red">*</span></v-subheader>
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
                <v-subheader>วัตถุประสงค์:<span style="color: red">*</span></v-subheader>
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
                   :rules="[rules.required]"></v-text-field>
                  <!-- {{objective}} -->
                </v-col>
                </h4>
              </v-flex>

                <v-flex xs12 sm12 md3 offset-md1>
                <v-subheader>หน่วยความถี่ที่เกี่ยวกับข้อมูล:<span style="color: red">*</span></v-subheader>
              </v-flex>
              <v-flex xs12 sm12 md7>
                <h4>
                   <v-select
                  :items="frequency"
                  v-model="sourceData.frequency"
                  dense
                  outlined
                 :rules="[rules.required]"></v-select>
                </h4>
              </v-flex>

                <v-flex xs12 sm12 md3 offset-md1>
                <v-subheader>{{ $t('dataupdate') }}:<span style="color: red">*</span></v-subheader>
              </v-flex>
              <v-flex xs12 sm12 md7>
                <h4>
                   <v-text-field
                  v-model="sourceData.frequency_unit"
                  :placeholder="$t('number_placeholder')"
                  outlined
                  dense
                 :rules="[rules.required]"></v-text-field>
                </h4>
              </v-flex>

                 <v-flex xs12 sm12 md3 offset-md1>
                <v-subheader>ขอบเขตเชิงภูมิศาตร์หรือพื้นที่:<span style="color: red">*</span></v-subheader>
              </v-flex>
              <v-flex xs12 sm12 md7>
                <h4>
                  <v-select
                  :items="Geo"
                  v-model="sourceData.geo_coverage"
                  dense
                  outlined
                 :rules="[rules.required]"></v-select>
                </h4>
              </v-flex>

        <v-flex xs12 sm12 md3 offset-md1>
                <v-subheader>แหล่งที่มา:<span style="color: red">*</span></v-subheader>
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
                <v-subheader>รูปแบบการเก็บข้อมูล:<span style="color: red">*</span></v-subheader>
              </v-flex>
              <v-flex xs12 sm12 md7>
                <h4>
                  <v-checkbox
                  v-for=" format in data_format"
                  :key="format.id"
                  v-model="sourceData.data_storage"
                  :label="format.title"
                  :value="format.value"
                  multiple
                  hide-details
                ></v-checkbox>


                <v-checkbox
                  v-model="enabled"
                  :label="$t('others')"
                  hide-details
                ></v-checkbox>
                <v-col cols="12">
                  <v-text-field
                    :disabled="!enabled"
                    :placeholder="$t('pleaseSpecify')"
                    v-model="data_storage_other"
                    outlined
                    dense
                    required
                   :rules="[rules.required]"></v-text-field>
                </v-col>
                </h4>
              </v-flex>

            <v-flex xs12 sm12 md3 offset-md1>
                <v-subheader>หมวดหมู่ข้อมูลตามธรรมาภิบาลข้อมูลภาครัฐ:<span style="color: red">*</span></v-subheader>
              </v-flex>
              <v-flex xs12 sm12 md7>
                <h4>
                 <v-select
                  :items="Category"
                  v-model="sourceData.topic_gorvernance"
                  label=""
                  dense
                  outlined
                 :rules="[rules.required]"></v-select>
                </h4>
              </v-flex>

              <v-flex xs12 sm12 md3 offset-md1>
                <v-subheader>สัญญาอนุญาตให้ใช้ข้อมูล:<span style="color: red">*</span></v-subheader>
              </v-flex>
              <v-flex xs12 sm12 md7>
                <h4>
                  <v-select
                  :items="License"
                  v-model="sourceData.data_license"
                  label=""
                  dense
                  outlined
                 :rules="[rules.required]"></v-select>
                </h4>
              </v-flex>

               <v-flex xs12 sm12 md3 offset-md1>
                <v-subheader>เงื่อนไขในการเข้าถึงข้อมูล:<span style="color: red">*</span></v-subheader>
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
                <v-subheader>ผู้สนับสนุนหรือผู้ร่วมดำเนินการ:<span style="color: red">*</span></v-subheader>
              </v-flex>
              <v-flex xs12 sm12 md7>
                <h4>
                <v-select v-model="sourceData.supporter" :items="subporter" dense outlined :rules="[rules.required]"></v-select>
                </h4>
              </v-flex>

        <v-flex xs12 sm12 md3 offset-md1>
                <v-subheader>หน่วยที่ย่อยที่สุดของการจัดเก็บข้อมูล:<span style="color: red">*</span></v-subheader>
              </v-flex>
              <v-flex xs12 sm12 md7>
                <h4>
                 <v-select v-model="sourceData.data_unit" :items="subunits" dense outlined :rules="[rules.required]"></v-select>
                </h4>
              </v-flex>

              <v-flex xs12 sm12 md3 offset-md1>
                <v-subheader>URL:<span style="color: red">*</span></v-subheader>
              </v-flex>
              <v-flex xs12 sm12 md7>
                <h4>
                 <v-text-field
                  v-model="sourceData.URL"
                  :placeholder="$t('urlDetails')"
                  outlined
                  dense
                 :rules="[rules.required]"></v-text-field>
                </h4>
              </v-flex>
              
               <v-flex xs12 sm12 md3 offset-md1>
                <v-subheader>ภาษาที่ใช้:<span style="color: red">*</span></v-subheader>
              </v-flex>
               <v-flex xs12 sm12 md7>
                <h4>
                  <v-checkbox
                  v-for=" format in language"
                  :key="format.id"
                  v-model="sourceData.data_language"
                  :label="format.title"
                  :value="format.value"
                  multiple
                  hide-details
                ></v-checkbox>


                <v-checkbox
                  v-model="enabled"
                  :label="$t('others')"
                  hide-details
                ></v-checkbox>
                <v-col cols="12">
                  <v-text-field
                    :disabled="!enabled"
                    :placeholder="$t('pleaseSpecify')"
                    v-model="data_language_other"
                    outlined
                    dense
                    required
                   :rules="[rules.required]"></v-text-field>
                </v-col>
                </h4>
              </v-flex>
                <v-flex xs12 sm12 md3 offset-md1>
                <v-subheader>วันที่เริ่มต้นสร้าง:<span style="color: red">*</span></v-subheader>
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
                      v-model="sourceData.created_date"
                      :label="$t('dateFormatLabel')"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                     :rules="[rules.required]"></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="sourceData.created_date"
                    @input="menu2 = false"
                  ></v-date-picker>
                </v-menu>
                </h4>
              </v-flex>

                <v-flex xs12 sm12 md3 offset-md1>
                <v-subheader>วันที่ปรับปรุงข้อมูลล่าสุด:<span style="color: red">*</span></v-subheader>
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
                      v-model="sourceData.modified_date"
                      :label="$t('dateFormatLabel')"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attr"
                      v-on="on"
                     :rules="[rules.required]"></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="sourceData.modified_date"
                    @input="menu3 = false"
                  ></v-date-picker>
                </v-menu>
                </h4>
              </v-flex>

               <v-flex xs12 sm12 md3 offset-md1>
                <v-subheader>ชุดข้อมูลที่มีคุณค่าสูง:<span style="color: red">*</span></v-subheader>
              </v-flex>
              <v-flex xs12 sm12 md7>
                <h4>
                 <v-select v-model="sourceData.high_value_dataset" :items="yesno" dense outlined :rules="[rules.required]"></v-select>
                </h4>
              </v-flex>

              <v-flex xs12 sm12 md3 offset-md1>
                <v-subheader>ข้อมูลอ้างอิง:<span style="color: red">*</span></v-subheader>
              </v-flex>
              <v-flex xs12 sm12 md7>
                <h4>
                 <v-select v-model="sourceData.data_reference" :items="yesno" dense outlined :rules="[rules.required]"></v-select>
                </h4>
              </v-flex>


            </v-layout>
          </v-flex>
          <v-flex offset-md9 pt-5>
            <v-btn :disabled="!valid" color="success" @click="save()">save</v-btn>
          </v-flex>
        </v-form>
    </v-card>
  </template>