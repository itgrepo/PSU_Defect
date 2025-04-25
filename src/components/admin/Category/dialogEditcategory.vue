<template lang="html">
  <v-layout row justify-center>
    <v-dialog persistent v-model="dialogEdit" max-width="1200px" >
      <v-card>
        <v-toolbar class="light-blue darken-4 white--text color-card-title" dense>
          <v-toolbar-title>{{ $t('editcategory') }}</v-toolbar-title>
            <v-spacer></v-spacer>
              <v-btn outline icon @click.native="closeDialog()" dark>
                <v-icon>close</v-icon>
              </v-btn>
          </v-toolbar>
            <v-divider></v-divider>
            <v-divider></v-divider>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-layout row wrap>
              <v-flex md12>
                <v-card elevation="10">
                  <v-card-title>
                    <v-container fluid>
                      <v-form ref="form" v-model="valid" lazy-validation>

                      <v-row>
              <v-col cols="4">
                <v-subheader>
                  <h2><span class="pr-1" style="color: red">*</span>{{ $t('imageicon') }} :</h2>
                </v-subheader>
              </v-col>
            </v-row>
            <v-col cols="12">
              <v-flex sm12 md12 xs12>
                    <input type="file" id="filesPNG" ref="filePng" accept=".png,.jpg" style="display: none;" @change="filesUploadPNG()" />
                    <v-text-field :label="$t('selectpng')"  @click='$refs.filePng.click()' v-model='nameFilePNG' prepend-icon="attach_file" :rules="Rules"></v-text-field>
                </v-flex>
            </v-col>

                        <v-row>
                          <v-col cols="4">
                            <v-subheader>
                              <h4>
                                <span class="pr-1" style="color: red" >
                                  *
                                </span>
                                {{ $t('categoryname') }} :
                              </h4>
                            </v-subheader>
                          </v-col>
                        </v-row>

                        <v-col cols="12">
                          <v-text-field v-model="category_name" :label="$t('mycategory')"  :rules="Rules" outlined solo></v-text-field>
                        </v-col>

                        <v-row>
                          <v-col cols="6">

                            <v-subheader>
                              {{ $t('categorydes') }} : 
                            </v-subheader>
                          </v-col>
                        </v-row>

                        <v-col cols="12">
                          <v-textarea v-model="category_description" :label="$t('categorydes')" auto-grow outlined solo rows="3" row-height="25" shaped></v-textarea>
                        </v-col>

                        <v-layout>
                          <v-spacer></v-spacer>
                            <v-btn :disabled="!valid" color="success" @click="filesPNG()">
                              {{ $t('save') }}
                            </v-btn>
                        </v-layout>
                      </v-form>
                    </v-container>
                  </v-card-title>
                </v-card>
              </v-flex>
            </v-layout>
          </v-form>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
  export default {
    data () {
      return {
        dialogEdit: false,
        nameFilePNG: '',
        searchUser: '',
        search: '',
        dataRole: '',
        getCategory: [],
        updateUser: [],
        headersUser: [],
        headers: [],
      }
    },
      watch: {
    loading(val) {
      if (!val) return;
      setTimeout(() => (this.loading = false), percentCompleted);
    }
  },
    methods: {
       filesUploadPNG() {
                    const uploadedFilesPNG = this.$refs.filePng.files
                    this.nameFilePNG = uploadedFilesPNG[0].name
                },
      open (data) {
        this.dialogEdit = true
        this.dataRole = data
        this.showCategory()
        this.category_id = data.category_id
        this.category_name = data.name
        this.category_description = data.description
      },
      closeDialog () {
        this.dialogEdit = false
      },
      showCategory () {
        this.axios.get(process.env.VUE_APP_API_BACKEND + '/showCategory', {
        }).then((response) => {
          this.getCategory = response.data
        })
      },
      filesPNG() {
        this.loading = true;
        let formDataICON = new FormData();
        formDataICON.append("file", this.$refs.filePng.files[0]);
        formDataICON.append("category_id", this.category_id);
        formDataICON.append("category_name", this.category_name);
        formDataICON.append("category_description", this.category_description);

        this.axios.post(process.env.VUE_APP_API_BACKEND + "/updateCategory",
          formDataICON, {
            headers: {"Content-Type": "multipart/form-data"},
          },
          {onDownloadProgress: progressEvent => {var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);}})
                .then(response => {;
                    if (response.data.status == "duplicate category name") {
                        this.$swal('Category Name is Duplicate ', '', 'warning')
                        this.loading = false;
                      } else if (response.data.status === 'success') {
                        this.$swal('Update Category is Success', '', 'success').then(response => {
                        this.reloadPage()
                        })
                    } else {
                        this.$swal(response.data.status, '', 'error')
                        this.loading = false;
                    }
                })
      },
      reloadPage() {
        window.location.reload()
      },

    // save () {
    //   this.axios.post(process.env.VUE_APP_API_BACKEND + '/updateCategory', {
    //     'category_id':this.category_id,
    //     'category_name': this.category_name,
    //     'category_description': this.category_description,
    //     }).then((response) => {
    //       if (response.data === 'update success') {
    //         this.dialogEdit = false
    //         this.$swal('Edit Category is success', ' ', 'success')
    //         window.location.reload();
    //     }
    //   })
    // }
  }
}
</script>

<style lang="css">
</style>
