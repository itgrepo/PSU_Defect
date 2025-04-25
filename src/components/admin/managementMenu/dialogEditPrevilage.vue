<template lang="html">
  <v-layout row justify-center>
    <v-dialog  v-model="dialogEdit" fullscreen hide-overlay transition="dialog-bottom-transition"> 
      <v-card>
        <v-toolbar class="light-blue darken-4 white--text color-card-title" dense>
           <v-btn outline icon @click.native="closeDialog()" dark>
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>{{ $t('editrole') }}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn dark flat @click.native="closeDialog()">Exit</v-btn>
            
          </v-btn>
        </v-toolbar>
        <v-divider></v-divider>
        <v-container>
          <v-layout >
            <v-flex xs12 md2 pt-3><h3>{{ $t('rolename') }}:</h3></v-flex>
            <v-flex xs12 md6><v-text-field  :label="$t('rolename')" v-model="dataRole.previlage_name" required :rules="Rules"></v-text-field></v-flex>
          </v-layout>
        </v-container>
        <v-divider></v-divider>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-layout row wrap>
            <v-flex md6>
              <v-container style="padding-top: 0px">
                <v-card-title>
                  <p class="subheading">
                    <v-icon left class="mr-2" color="light-blue darken-4">label</v-icon>{{ $t('userrole') }}
                  </p>
                  <v-spacer></v-spacer>
                  <v-text-field v-model="searchUser" append-icon="search" :label="$t('search')"  single-line hide-details></v-text-field>
                </v-card-title>
                <div>
                  <v-data-table
                  :headers="localizedHeadersUser"
                  :items="getUser"
                  :search="searchUser"
                  >
                  <template v-slot:items="props">
                    <td class="text-xs-center">{{ props.item.username }}</td>
                    <!-- <td class="text-xs-center" v-if="props.item.national_id !== ''">{{ props.item.national_id }}</td> -->
                    <!-- <td class="text-xs-center" v-else>{{ props.item.national_id_book }}</td> -->
                    <td class="text-xs-center">{{ props.item.email }}</td>
                    <td class="text-xs-center">{{ props.item.previlage_name }}</td>
                    <td class="text-xs-center">
                      <v-btn small icon color="error" @click="removeUser(props.item,props.index)"><v-icon>remove</v-icon></v-btn>
                    </td>
                  </template>
                  <template v-slot:no-results>
                    <v-alert :value="true" color="error" icon="warning">
                      {{ $t('searchfor') }} "{{ search }}" {{ $t('foundno') }}
                    </v-alert>
                  </template>
                </v-data-table>
              </div>
            </v-container>
          </v-flex>
          <v-flex md6 >
            <v-container style="padding-top: 0px">
              <v-card-title>
                <p class="subheading">
                  <v-icon left class="mr-2" color="light-blue darken-4">label</v-icon>{{ $t('adduser') }}</p>
                <v-spacer></v-spacer>
                <v-text-field v-model="search" append-icon="search" :label="$t('search')"  single-line hide-details></v-text-field>
              </v-card-title>
              <v-data-table
              :headers="localizedHeadersUser"
              :items="addUsers"
              :search="search"
              >
              <template v-slot:items="props">
                <td class="text-xs-center">{{ props.item.username }}</td>
                <!-- <td class="text-xs-center" v-if="props.item.national_id !== ''">{{ props.item.national_id }}</td> -->
                <!-- <td class="text-xs-center" v-else>{{ props.item.national_id_book }}</td> -->
                <td class="text-xs-center">{{ props.item.email }}</td>
                <td class="text-xs-center">{{ props.item.previlage_name }}</td>
              
                <td class="text-xs-center">
                  <v-btn small icon color="success" style="font-size:10px" @click="addUser(props.item,props.index)"><v-icon>add</v-icon></v-btn>
                </td>
              </template>
              <template v-slot:no-results>
                <v-alert :value="true" color="error" icon="warning">
                  {{ $t('searchfor') }} "{{ search }}" {{ $t('foundno') }}
                </v-alert>
              </template>
            </v-data-table>
          </v-container>
        </v-flex>
      </v-layout>
      <v-flex offset-xs10 pb-4><v-btn color="success" :disabled="!valid" @click="save()">{{ $t('save') }}</v-btn></v-flex>
      
    </v-form>
  </v-card>
</v-dialog>
</v-layout>
</template>

<script>
import { Encode, Decode } from "@/services";
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
      // headersUser: [
      //   {
      //     text: 'Username',
      //     align: 'center',
      //     sortable: false,
      //     value: 'username'
      //   },
      //   // {
      //   //   text: 'National ID/Passport',
      //   //   align: 'center',
      //   //   sortable: false,
      //   //   value: 'national_id'
      //   // },
      //   {
      //     text: 'Email',
      //     align: 'center',
      //     sortable: false,
      //     value: 'email'
      //   },
      //   {
      //     text: 'Type',
      //     align: 'center',
      //     sortable: false,
      //     value: 'previlage_name'
      //   },
      //   {
      //     text: '',
      //     align: 'center',
      //     sortable: false
      //   }
      // ],
      // headers: [
      //     {
      //     text: 'Username',
      //     align: 'center',
      //     sortable: false,
      //     value: 'username'
      //   },
      //   {
      //     text: 'ID',
      //     align: 'center',
      //     sortable: false
      //   },
      //   {
      //     text: 'name',
      //     align: 'center',
      //     sortable: false
      //   },
      //   {
      //     text: 'Create Date',
      //     align: 'center',
      //     sortable: false
      //   },
      //   // {
      //   //   text: '',
      //   //   align: 'center',
      //   //   sortable: false
      //   // }
      // ]
    }
  },
  computed: {
            userData() {
                if (this.$cookies.isKey('information')) {
                    return JSON.parse(Decode.decode(this.$cookies.get('information')))
                } else {
                    return ''
                }
            },
            localizedHeadersUser() {
    return [
      {
        text: this.$t('username'),
        align: 'center',
        sortable: false,
        value: 'username'
      },
      // {
      //   text: this.$t('nationalIdOrPassport'),
      //   align: 'center',
      //   sortable: false
      // },
      {
        text: this.$t('email'),
        align: 'center',
        sortable: false,
        value: 'email'
      },
      {
        text: this.$t('type'),
        align: 'center',
        sortable: false,
        value: 'previlage_name'
      },
      {
        text: '',
        align: 'center',
        sortable: false
      }
    ];
  },
  localizedHeaders() {
    return [
      {
        text: this.$t('id'),
        align: 'center',
        sortable: false
      },
      {
        text: this.$t('name'),
        align: 'center',
        sortable: false
      },
      {
        text: this.$t('des'),
        align: 'center',
        sortable: false
      },
      {
        text: this.$t('createDate'),
        align: 'center',
        sortable: false
      },
      {
        text: '',
        align: 'center',
        sortable: false
      }
    ]
    }
        },
  methods: {
    open (data) {
      this.dialogEdit = true
      this.dataRole = data
      this.getUserById()
      this.getUserPermission()
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
      console.log("Adding user:", data);
      if (!this.getUser.some(user => user.username === data.username)) {
        this.getUser.push(data);
      }
      this.addUsers = this.addUsers.filter(user => user.username !== data.username);
      console.log("Updated getUser:", this.getUser);
      console.log("Updated addUsers:", this.addUsers);
    },
    removeUser(data) {
      console.log("Removing user:", data);
      if (!this.addUsers.some(user => user.username === data.username)) {
        this.addUsers.push(data);
      }
      this.getUser = this.getUser.filter(user => user.username !== data.username);
      console.log("Updated getUser:", this.getUser);
      console.log("Updated addUsers:", this.addUsers);
    },
    getUserById () {
      this.axios.post(process.env.VUE_APP_API_BACKEND + '/mgmt/getUserById', {
        'previlage_id': this.dataRole.previlage_id
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
      var user = Encode.encode(JSON.stringify(this.userData));
      this.axios.post(process.env.VUE_APP_API_BACKEND + '/mgmt/updateprevilage', {
        'previlage_name': this.dataRole.previlage_name,
        'user_data': user,
        'previlage_id': this.dataRole.previlage_id,
        'user': this.getUser
      }).then((response) => {
        if (response.data === 'success') {
          this.dialogEdit = false
          this.$swal('Edit Role is success', ' ', 'success')
        }
      })
    },
    // removeU () {
    //   this.axios.post(process.env.VUE_APP_API_BACKEND + '/mgmt/deleteUserByIdtest', {
    //     'user': this.getUser
    //   }).then((response) => {
    //     if (response.data === 'success') {
    //       this.dialogEdit = false
    //       this.$swal('Edit Role is success', ' ', 'success')
    //     }
    //   })
    // }
  }
}
</script>

<style lang="css">
</style>
