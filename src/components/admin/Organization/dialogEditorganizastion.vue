<template lang="html">
  <v-layout row justify-center>
    <v-dialog persistent v-model="dialogEdit" max-width="1200px" >
      <v-card>
        <v-toolbar class="light-blue darken-4 white--text color-card-title" dense>
          <v-toolbar-title> {{ $t('editorg') }}</v-toolbar-title>
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
        <h2>
          
        </h2>
        <v-container fluid>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-row>
              <v-col cols="4">
                <v-subheader>
                  <h4><span class="pr-1" style="color: red" >*</span>{{ $t('orgname') }}:</h4>
                </v-subheader>
              </v-col>
            </v-row>
            <v-col cols="12">
              <v-text-field
              v-model="organize_name"
              :label="$t('orgname')" 
                :rules="Rules"
                outlined
                solo
              ></v-text-field>
            </v-col>

            <v-row>
              <v-col cols="6">
                <v-subheader>{{ $t('des') }}: </v-subheader>
              </v-col>
            </v-row>
            <v-col cols="12">
              <v-textarea
                v-model="organize_description"
                :label="$t('orgdes')" 
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
              <!-- <v-btn :disabled="!valid" color="success" @click="save()">save</v-btn> -->
              <v-btn color="success" outline :disabled="!valid" @click="save()">{{ $t('save') }}</v-btn>
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
      searchUser: '',
      search: '',
      dataRole: '',
      getUser: [],
      addUsers: [],
      updateUser: [],
      headersUser: [],
      headers: [],
    }
  },
  methods: {
    open (data) {
      this.dialogEdit = true
      this.dataRole = data
      this.getUserById()
      this.getUserPermission()


      this.organize_id = data.org_id
      this.organize_name = data.org_name
      this.organize_description = data.org_des

    },
    closeDialog () {
      this.dialogEdit = false
    },
    // addUser (data, index) {
      
    //   this.addUsers.splice(index, 1)
    //   this.getUser.push(data)
    //   // console.log(data);
    //   // console.log(index, 1);
    //   // this.getUserPermission()
    // },
    // removeUser (data, index) {
    //   this.addUsers.push(data)
    //   this.getUser.splice(index, 1)
    // },

    addUser(data) {
  console.log('Adding user:', data);

  // ใช้ filter เพื่อลบผู้ใช้จาก addUsers ที่ตรงกับ username ที่ถูกเพิ่ม
  this.addUsers = this.addUsers.filter(user => user.username !== data.username);
  
  // เพิ่มผู้ใช้ไปยัง getUser
  this.getUser.push(data);

  console.log('addUsers after removing:', this.addUsers);
  console.log('getUser after adding:', this.getUser);
},

removeUser(data) {
  console.log('Removing user:', data);

  // ใช้ filter เพื่อลบผู้ใช้จาก getUser ที่ตรงกับ username ที่ถูกลบ
  this.getUser = this.getUser.filter(user => user.username !== data.username);
  
  // เพิ่มผู้ใช้ไปยัง addUsers
  this.addUsers.push(data);

  console.log('getUser after removing:', this.getUser);
  console.log('addUsers after adding back:', this.addUsers);
},
    
    getUserById () {
      this.axios.get(process.env.VUE_APP_API_BACKEND + '/showOrganize', {
      }).then((response) => {
        this.getUser = response.data
        
      })
    },
    getUserPermission () {
      this.axios.post(process.env.VUE_APP_API_BACKEND + '/mgmt/addUserById', {
        'previlage_id': this.dataRole.previlage_id
      }).then((response) => {
        this.addUsers = response.data
      })
    },
    save () {
      this.axios.post(process.env.VUE_APP_API_BACKEND + '/updateOrganize', 
      {
        'organize_id': this.organize_id,
        'organize_name': this.organize_name,
        'organize_description': this.organize_description
      }
      ).then((response) => {
        if (response.data === 'update success') {
          this.dialogEdit = false
          this.$swal('Edit Organization is success', ' ', 'success')
          window.location.reload();
        }
      })
    }
  }
}
</script>

<style lang="css">
</style>
