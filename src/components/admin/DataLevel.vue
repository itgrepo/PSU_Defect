<template>
  <v-layout class="contentPortal">
    <v-dialog max-width="700px" v-model="dialogdatalevel">
      <v-card>
        <form ref="form" v-model="valid" lazy-validation>
          <v-card-title class="title-level"><h2>ADD LEVEL</h2></v-card-title>
          <v-card-text>
            <v-layout row wrap>
              <v-flex md2 class="pt-0">
                <p class="mt-3 ml-2">Level :</p>
              </v-flex>
              <v-flex md10>
                <v-select
                  :items="category"
                  item-text="level_desc"
                  item-value="Level_Master_id"
                  label="Level"
                  v-model="categorylevel"
                  required
                  :rules="Rules"
                ></v-select>
              </v-flex>
            </v-layout>
            <v-layout row wrap>
              <v-flex md2>
                <p class="mt-3 ml-2">Sub Level id :</p>
              </v-flex>
              <v-flex md3>
                <v-text-field
                  v-model="sublevelid"
                  label="Sub Level Name"
                  required
                  :rules="Rules"
                ></v-text-field>
              </v-flex>
              <v-flex md3>
                <p class="mt-3 ml-2">Sub Level Name :</p>
              </v-flex>
              <v-flex md4>
                <v-text-field
                  v-model="sublevelname"
                  label="Sub Level Name"
                  required
                  :rules="Rules"
                ></v-text-field>
              </v-flex>
            </v-layout>
          </v-card-text>
          <v-card-actions>
            <v-btn
              color="success"
              class="btn-save-level"
              outline
              @click="save()"
              :disabled="!valid"
              >SAVE</v-btn
            >
          </v-card-actions>
        </form>
        <v-divider></v-divider>
        <v-card-text>
          <!-- <v-data-table
                :headers="headers"
                :items="items"
              >
                <template
                  slot="items"
                  slot-scope="{ item }"
                >
                  <td class="text-xs-center">{{ item.level_desc }}</td>
                  <td class="text-xs-center">{{ item.sublevel_id }}</td>
                  <td class="text-xs-center">{{ item.sublevel_desc }}</td>
                  <td class="text-xs-center"><v-btn text icon @click="selectRow(item)"><v-icon color="light-blue ">edit</v-icon></v-btn></td>
               </template>
              </v-data-table> -->

          <v-data-table
            v-model="selected"
            :headers="headers"
            :items="items"
            :search="search"
            item-key="name"
            class="elevation-1"
            :rows-per-page-items="[10, 25, 50, { text: 'All', value: -1 }]"
            :rows-per-page-text="$t('rowsPerPageLabel')"
          >
            <template v-slot:items="props">
              <td class="text-xs-center">{{ props.item.level_desc }}</td>
              <td class="text-xs-center">{{ props.item.sublevel_id }}</td>
              <td class="text-xs-center">{{ props.item.sublevel_desc }}</td>
              <td class="text-xs-center">
                <v-btn text icon @click="selectRow(props.item)"
                  ><v-icon color="light-blue ">edit</v-icon></v-btn
                >
              </td>
            </template>
            <template v-slot:no-data>
              <v-alert :value="true" color="error" icon="warning"
                >Sorry, nothing to display here :(</v-alert
              >
            </template>
            <template v-slot:no-results>
              <v-alert :value="true" color="error" icon="warning"
                >{{ $t('searchfor') }} "{{ search }}" {{ $t('foundno') }}</v-alert
              >
            </template>
          </v-data-table>
        </v-card-text>
      </v-card>
    </v-dialog>
    <!-- dialog edit -->
    <v-dialog max-width="600px" v-model="dialogdata">
      <v-card>
        <form ref="form" lazy-validation>
          <v-card-title class="title-level"><h2>Edit</h2></v-card-title>
          <v-card-text>
            <v-layout row wrap>
              <v-flex md2 class="pt-0">
                <p class="mt-3 ml-2">Level :</p>
              </v-flex>
              <v-flex md10>
                <v-text-field
                  v-model="dataleveldesc"
                  label="Sub Level Name"
                  required
                  :rules="Ruleid"
                  disabled
                ></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout row wrap>
              <v-flex md2>
                <p class="mt-3 ml-2">Sub Level id :</p>
              </v-flex>
              <v-flex md3>
                <v-text-field
                  v-model="subdatalevel_id"
                  label="Sub Level Name"
                  required
                  :rules="Ruleid"
                ></v-text-field>
              </v-flex>
              <v-flex md3>
                <p class="mt-3 ml-2">Sub Level Name :</p>
              </v-flex>
              <v-flex md4>
                <v-text-field
                  v-model="subdatalevel_desc"
                  label="Sub Level Name"
                  required
                  :rules="Rules"
                ></v-text-field>
              </v-flex>
            </v-layout>
          </v-card-text>
          <v-card-actions>
            <v-btn
              color="success"
              class="btn-save-level"
              outline
              @click="saveedit()"
              :disabled="!valid"
              >SAVE</v-btn
            >
          </v-card-actions>
        </form>
      </v-card>
    </v-dialog>
  </v-layout>
</template>
<script>
export default {
  data() {
    return {
      category: [],
      items: [],
      categorylevel: "",
      dialogdatalevel: false,
      dialogdata: false,
      valid: true,
      sublevelid: "",
      sublevelname: "",
      dataleveldesc: "",
      subdatalevel_id: "",
      subdatalevel_desc: "",
      sublevelkey: "",
      headers: [
        {
          sortable: false,
          text: "Level Name",
          value: "levelname",
          align: "center"
        },
        {
          sortable: false,
          text: "Sub Level id",
          value: "sublevelid",
          align: "center"
        },
        {
          sortable: false,
          text: "Sub Level Name",
          value: "sublevelname",
          align: "center"
        },
        {
          sortable: false,
          text: "Edit",
          value: "edit",
          align: "center"
        }
      ],
      Rules: [v => !!v || "Not available required"],
      Ruleid: [
        v => !!v || "Not available required",
        V => /^[0-9]+(\.[0-9]+)/.test(v) || "Please fill the number"
      ]
    };
  },
  created() {
    this.datasublevel();
  },
  mounted() {
    this.datalevel();
    this.datasublevel();
  },
  methods: {
    open() {
      this.dialogdatalevel = true;
    },
    datalevel() {
      this.axios
        .post(process.env.VUE_APP_API_BACKEND + "/getLevel")
        .then(response => {
          // //console.log(response.data)
          this.category = response.data;
        });
    },
    datasublevel() {
      this.axios
        .post(process.env.VUE_APP_API_BACKEND + "/getSublevel")
        .then(response => {
          // //console.log(response.data.data)
          this.items = response.data.data;
        });
    },
    save() {
      if (
        this.categorylevel !== "" &&
        this.sublevelid !== "" &&
        this.sublevelname !== ""
      ) {
        // //console.log( this.categorylevel);
        this.axios
          .post(process.env.VUE_APP_API_BACKEND + "/updateSublevel", {
            sublevel_id: this.sublevelid,
            sublevel_desc: this.sublevelname,
            level_master_id: this.categorylevel
          })
          .then(response => {
            // //console.log(response.data.status);

            if (response.data.status === "success") {
              this.$swal("Save success", "", "success");
              this.sublevelid = "-";
              this.sublevelname = "-";
              this.categorylevel = "-";
            }
          });
      } else {
        this.$swal("Not available", "", "warning");
      }
    },
    selectRow(row) {
      this.$emit("selectSource", row);
      // //console.log(row);
      // //console.log(row.sublevel_id);
      // //console.log(row.sublevel_desc);
      this.dataleveldesc = row.level_desc;
      this.subdatalevel_id = row.sublevel_id;
      this.subdatalevel_desc = row.sublevel_desc;
      this.sublevelkey = row.sublevel_key;
      // //console.log(datalevel);
      this.dialogdata = true;
    },
    dialogedit() {
      // this.dialogdata = true
    },
    saveedit() {
      // //console.log(this.subdatalevel_id);
      // //console.log(this.subdatalevel_desc);
      // //console.log(this.sublevelkey);
      this.axios
        .post(process.env.VUE_APP_API_BACKEND + "/editSublevel", {
          sublevel_id: this.subdatalevel_id,
          sublevel_desc: this.subdatalevel_desc,
          sublevel_key: this.sublevelkey
        })
        .then(response => {
          if (response.data.status === "success") {
            this.dialogdata = false;

            this.$swal("Edit success", "", "success");
            this.datasublevel();
          }
        });
    }
  }
};
</script>
<style scoped>
.contentPortal {
  margin-top: 20px;
}
.btn-save-level {
  display: block;
  margin: 0 auto;
}
.title-level {
  background-color: #708da6;
  color: #ffffff;
}
</style>
