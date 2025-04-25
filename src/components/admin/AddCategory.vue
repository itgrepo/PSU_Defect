<template>
  <v-container class="contentPortal">
    <v-card elevation="10">
      <v-card-title>
        <h2>
          
        </h2>
        <v-container fluid>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-row>
              <v-col cols="4">
                <v-subheader>
                  <h4><span class="pr-1" style="color: red">*</span>ชื่อ:</h4>
                </v-subheader>
              </v-col>
            </v-row>
            <v-col cols="12">
              <v-text-field
              v-model="category_name"
                label="กลุ่มของฉัน"
                :rules="Rules"
                outlined
                solo
              ></v-text-field>
            </v-col>

            <v-row>
              <v-col cols="6">
                <v-subheader>รายละเอียด: </v-subheader>
              </v-col>
            </v-row>
            <v-col cols="12">
              <v-textarea
                v-model="category_description"
                label="ข้อมูลเบื่องต้น เกี่ยวกับกลุ่มของฉัน"
                auto-grow
                outlined
                solo
                rows="3"
                row-height="25"
                shaped
              ></v-textarea>
            </v-col>
<!-- 
            <v-row>
              <v-col cols="6">
                <v-subheader>รูปภาพ: </v-subheader>
              </v-col>
            </v-row>
            <v-col cols="12">
                <div>
                   <v-btn
                color="success"
                class="text-none"
                round
                depressed
                :loading="isSelecting"
                @click="onButtonClick"
              >
                <v-icon left>
                  cloud_upload
                </v-icon>
                upload
              </v-btn>
              <input
                ref="uploader"
                class="d-none"
                type="file"
                accept="image/*"
                @change="onFileChanged"
              /> 
                </div> -->
              <!-- {{selectedFile.name}} -->


              <!-- <v-btn color="success" outline @click="upload()">
                <v-icon left>cloud_upload</v-icon>Upload File</v-btn
              > -->
              <!-- <v-btn round depressed color="success" outline @click="upload()">
                <v-icon left>public</v-icon>ลิงก์</v-btn
              > -->
            <!-- </v-col> -->
<!-- 
            <v-row>
              <v-col cols="4">
                <v-subheader>Parent: </v-subheader>
              </v-col>
            </v-row>
            <v-col cols="12">
              <v-select
                item-text="title"
                item-value="name"
                label="ฟิลด์ที่ต้องการ"
                :items="organization"
                v-model="organization.name"
                :rules="Rules"
                dense
                solo
              ></v-select>
            </v-col> -->
            <v-layout>
              <v-spacer></v-spacer>
              <v-btn
                :disabled="!valid"
                color="success"
                @click="save()"
                >save</v-btn
              >
            </v-layout>
          </v-form>
        </v-container>
      </v-card-title>
    </v-card>
  </v-container>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      organization: [],
      valid: true,
      Rules: [v => !!v || "Information is required"]
    };
  },
  mounted() {
    this.data_to_regis();
  },
  computed: {
    buttonText() {
      return this.selectedFile
        ? this.selectedFile.name
        : this.defaultButtonText;
    }
  },

  methods: {
     save() {
          this.axios
           .post("http://203.154.135.74:9000" + "/addCategory",{
            // .post(process.env.VUE_APP_API_BACKEND + "/saveMetadata", payload,{
              // user_id: this.userData.user_id,
              // data: this.sourceData,
              // sublevel_key: '1'
                category_name: this.category_name,
                category_description: this.category_description,

            })
            .then(response => {
              // console.log(response);
              // //console.log(this.sourceData.Link_name);
              if (response.data.status === "success") {
                this.$swal("Save Success", "", "success").then(response => {
                  this.reloadPage();
                });
              }
               else {
                 this.$swal("Information is required", "", "warning");
               }if (response.data.status === "duplicate information") {
                 this.$swal("duplicate information" , "", "warning")
               }

               
            });
            
      },
      reloadPage() {
        window.location.reload();
      },

    onButtonClick() {
      this.isSelecting = true;
      window.addEventListener(
        "focus",
        () => {
          this.isSelecting = false;
        },
        { once: true }
      );

      this.$refs.uploader.click();
    },
    onFileChanged(e) {
      this.selectedFile = e.target.files[0];
      // console.log(this.selectedFile)

      // do something
    },
    data_to_regis() {
      this.axios
        .get(process.env.VUE_APP_API_BACKEND + "/data_to_register", {})
        .then(response => {
          // var data = response.data.data.organize;
          // var tmp_arr = [];
          // this.api_data = response.data.data;
          this.tag = response.data.data.tags;
          this.organization = response.data.data.organize;
          // this. = response.data.data.organize
          // console.log
          // console.log("test1");
          // console.log(response.data.data.tags);
          // console.log(this.data[0]);
          // for (let i = 0; i < data.length; i++) {
          //   console.log(data[i].title)
          //   tmp_arr.push(data[i]);
          // }
          // console.log(tmp_arr);
          // console.log(response.data.data.organize);
        });
    }
  }
};
</script>
<style>
.contentPortal {
  margin-top: 20px;
}
</style>
