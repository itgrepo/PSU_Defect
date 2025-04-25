<template>
  <div>
    <v-card>
      <v-layout row wrap>
        <v-flex md8>
          <v-card-title class="headline">
            {{ $t('rolelist') }}
            <v-divider class="mx-3 setLine" vertical></v-divider>
            <v-btn outline color="light-blue darken-4" @click="openDialogAddRole()">
              <v-icon left dark>add_circle</v-icon>{{ $t('addrole') }}
            </v-btn>
            <transition name="fade">
              <v-btn transition="scale-transition" outline color="red" dark v-show = "this.selected != 0">
								<v-icon left>delete</v-icon>Remove Selected
							</v-btn>
            </transition>
          </v-card-title>
        </v-flex>
        <v-flex md4>
          <v-text-field
            class="mt-3 mr-3"
            v-model="search"
            append-icon="search"
            :label="$t('search')"
            single-line
            hide-details
            color="light-blue darken-4"
          ></v-text-field>
        </v-flex>
      </v-layout>
      <v-data-table
        v-model="selected"
        :headers="headers"
        :items="roleList"
        :search="search"
        select-all
        class="elevation-1"
        :rows-per-page-items="[10, 25, 50, {text:'All', value: -1}]"
        :rows-per-page-text="$t('rowsPerPageLabel')"
        item-key="name">
        <template v-slot:items="props">
             <td width="2%">
              <v-checkbox primary hide-details v-model="props.selected" color="light-blue darken-4"></v-checkbox>
            </td>
            <td>{{ props.item.name }}</td>
            <td class="justify-center text-xs-center px-0">
              <v-tooltip top color="orange lighten-2">
                <template v-slot:activator="{ on }">
                  <v-btn
                    flat
                    icon
                    small
                    color="orange lighten-2"
                    class="ma-0"
                    v-on="on"
                    @click="openDialogEditRole(props.item)"
                  >
                    <v-icon>edit</v-icon>
                  </v-btn>
                </template>
                <span>Edit group</span>
              </v-tooltip>
              <v-tooltip top color="red lighten-1">
                <template v-slot:activator="{ on }">
                  <v-btn
                    flat
                    icon
                    small
                    color="red lighten-1"
                    class="ma-0"
                    v-on="on"
                  >
                    <v-icon>delete</v-icon>
                  </v-btn>
                </template>
                <span>Delete group</span>
              </v-tooltip>
            </td>
            <td class="text-xs-center" width="10%">
              <v-chip outline small color="light-blue darken-4">
                <v-avatar>
                  <v-icon>supervised_user_circle</v-icon>
                </v-avatar>
                {{ props.item.userInRole.length }} User
              </v-chip>
            </td>
        </template>
      </v-data-table>
    </v-card>

    <!-- Dialog {{ $t('addrole') }} -->
    <v-layout row justify-center>
      <v-dialog v-model="dialogAddRole" max-width="600px">
        <v-card>
          <v-form v-model="validAddRole" ref="formAddRole" lazy-validation>
            <v-toolbar class="light-blue darken-4 white--text" dense>
              <v-toolbar-title>{{ $t('addrole') }}</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn outline icon @click.native="closeDialogAddRole()" dark>
                <v-icon>close</v-icon>
              </v-btn>
            </v-toolbar>
            <v-divider></v-divider>
            <v-container grid-list-md class="pl-4 pr-4">
              <v-layout wrap>
                <v-flex xs12 sm12 md12>
                  <p class="subheading">
                    <v-icon left class="mr-2" color="light-blue darken-4">label</v-icon>Role name
                    <span style="color: red">*</span>
                  </p>
                  <v-divider></v-divider>
                  <v-layout>
                    <v-flex md5>
                      <p class="subheading mt-4 ml-4">Plese define role name :</p>
                    </v-flex>
                    <v-flex md7>
                      <v-text-field
                        class="mt-2"
                        v-model="addRolename"
                        label="Role name"
                        single-line
                        color="light-blue darken-4"
                        clearable
                        :rules="addRolenameRules"
                        required
                      ></v-text-field>
                    </v-flex>
                  </v-layout>
                  <v-layout wrap>
                    <v-flex xs12 sm12 md12>
                      <p class="subheading">
                        <v-icon left class="mr-2" color="light-blue darken-4">label</v-icon>Permission
                        <span style="color: red">*</span>
                      </p>
                      <v-divider></v-divider>
                    </v-flex>
                    <v-flex xs12 sm12 md12>
                      <v-list>
                        <v-list-tile
                          v-for="(item, key) in category"
                          :key="key"
                          @click=""
                        >
                          <v-list-tile-action>
                            <img class="imgList" :src="pathIcon(item.icon)" alt="">
                          </v-list-tile-action>
                          <v-list-tile-content>
                            <v-list-tile-title v-text="item.name"></v-list-tile-title>
                          </v-list-tile-content>
                          <v-list-tile-action>
                            <v-switch v-model="switchMenu[key]" color="light-blue darken-4"></v-switch>
                          </v-list-tile-action>
                        </v-list-tile>
                      </v-list>
                    </v-flex>
                  </v-layout>
                </v-flex>
              </v-layout>
            </v-container>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn :disabled="!validAddRole" color="green" outline flat @click="submitAddrole()">
                <v-icon left dark>save</v-icon>Save
              </v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-dialog>
    </v-layout>

    <!-- Dialog edit role -->
    <v-layout row justify-center>
      <v-dialog v-model="dialogEditRole" max-width="600px">
        <v-card>
          <v-form v-model="validEditRole" ref="formEditRole" lazy-validation>
            <v-toolbar class="light-blue darken-4 white--text" dense>
              <v-toolbar-title>Edit role</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn outline icon @click.native="closeDialogEditRole()" dark>
                <v-icon>close</v-icon>
              </v-btn>
            </v-toolbar>
            <v-divider></v-divider>
            <v-container grid-list-md class="pl-4 pr-4">
              <v-layout wrap>
                <v-flex xs12 sm12 md12>
                  <p class="subheading">
                    <v-icon left class="mr-2" color="light-blue darken-4">label</v-icon>Role name
                    <span style="color: red">*</span>
                  </p>
                  <v-divider></v-divider>
                  <v-layout>
                    <v-flex md5>
                      <p class="subheading mt-4 ml-4">Plese define role name :</p>
                    </v-flex>
                    <v-flex md7>
                      <v-text-field
                        class="mt-2"
                        v-model="editRolename"
                        label="Role name"
                        single-line
                        color="light-blue darken-4"
                        clearable
                        :rules="editRolenameRules"
                        required
                      ></v-text-field>
                    </v-flex>
                  </v-layout>
                  <v-layout wrap>
                    <v-flex xs12 sm12 md12>
                      <p class="subheading">
                        <v-icon left class="mr-2" color="light-blue darken-4">label</v-icon>Permission
                        <span style="color: red">*</span>
                      </p>
                      <v-divider></v-divider>
                    </v-flex>
                    <v-flex xs12 sm12 md12>
                      <v-list>
                        <v-list-tile
                          v-for="(item, key) in category"
                          :key="key"
                          @click=""
                        >
                          <v-list-tile-action>
                            <img class="imgList" :src="pathIcon(item.icon)" alt="">
                          </v-list-tile-action>
                          <v-list-tile-content>
                            <v-list-tile-title v-text="item.name"></v-list-tile-title>
                          </v-list-tile-content>
                          <v-list-tile-action>
                            <v-switch v-model="switchMenu[key]" color="light-blue darken-4"></v-switch>
                          </v-list-tile-action>
                        </v-list-tile>
                      </v-list>
                    </v-flex>
                  </v-layout>
                </v-flex>
              </v-layout>
            </v-container>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn :disabled="!validEditRole" color="green" outline flat>
                <v-icon left dark>save</v-icon>Save
              </v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-dialog>
    </v-layout>
  </div>
</template>

<script>
export default {
  data () {
    return {
      selected: [],
      search: '',
      validAddRole: true,
      dialogAddRole: false,
      addRolename: '',
      addRolenameRules: [ v => !!v || 'Role name is required' ],
      validEditRole: true,
      dialogEditRole: false,
      editRolename: '',
      editRolenameRules: [ v => !!v || 'Role name is required' ],
      switchMenu: {
        0: false,
        1: false,
        2: false,
        3: true,
        4: false,
        5: false,
        6: false,
        7: false,
        8: false,
        9: true
      },
      headers: [
        {
          text: 'Role name',
          align: 'left',
          sortable: true,
          value: 'role_name'
        },
        {
          text: 'Actions',
          align: 'center',
          sortable: false,
          value: 'action'
        },
        {
          text: 'Number of users',
          align: 'center',
          sortable: true,
          value: 'numOfUser'
        }
      ],
      roleList: [
        { name: '2Menu',
          userInRole: [
            { id: 'n1', name: 'Mallika Muhamad' },
            { id: 'n2', name: 'Mallika2 Muhamad' },
            { id: 'n3', name: 'Mallika2 Muhamad' },
            { id: 'n4', name: 'Mallika2 Muhamad' },
            { id: 'n5', name: 'Mallika2 Muhamad' }
          ]
        },
        { name: '3Menu',
          userInRole: [
            { id: 'n1', name: 'Mallika Muhamad' },
            { id: 'n2', name: 'Mallika2 Muhamad' }
          ]
        },
        { name: '4Menu',
          userInRole: [
            { id: 'n1', name: 'Mallika Muhamad' },
            { id: 'n2', name: 'Mallika2 Muhamad' },
            { id: 'n3', name: 'Mallika2 Muhamad' },
            { id: 'n4', name: 'Mallika2 Muhamad' }
          ]
        }
      ],
      category: [
        { id: 0, name: 'Economy', text: 'Economy', icon: 'economic.png', link: '/Home/DashboardEconomic' },
        { id: 1, name: 'BusinessPerformance', text: 'Performance', icon: 'business.png', link: '/Home/DashboardEducation' },
        { id: 2, name: 'Resource', text: 'Resource', icon: 'resources.png', link: '/Home/DashboardTechnology' },
        { id: 3, name: 'Financial', text: 'Financial', icon: 'finance.png', link: '/DashboardTechnology' },
        { id: 4, name: 'Property&Construction', text: 'Construction', icon: 'construction.png', link: '/DashboardTechnology' },
        { id: 5, name: 'Service', text: 'Service', icon: 'service.png', link: '/DashboardTechnology' },
        { id: 6, name: 'Technology', text: 'Tech', icon: 'tech.png', link: '/DashboardTechnology' },
        { id: 7, name: 'Industrial', text: 'Industrial', icon: 'Industry.png', link: '/DashboardTechnology' },
        { id: 8, name: 'Agro', text: 'Agro', icon: 'agro.png', link: '/DashboardTechnology' },
        { id: 9, name: 'Consumption', text: 'Consumer Product', icon: 'consumption.png', link: '/DashboardTechnology' }
      ],
      items: []
    }
  },
  watch: {
  },
  methods: {
    openDialogAddRole () {
      this.$refs.formAddRole.reset()
      this.dialogAddRole = true
    },
    closeDialogAddRole () {
      this.dialogAddRole = false
    },
    submitAddrole () {
      // //console.log(this.switchMenu)
    },
    openDialogEditRole (items) {
      // //console.log(items)
      this.$refs.formEditRole.reset()
      this.dialogEditRole = true
      this.editRolename = items.name
    },
    closeDialogEditRole () {
      this.dialogEditRole = false
    },
    pathIcon (icon) {
      return `/opendataIcon/icon-two/${icon}`
    }
  }
}
</script>

<style scoped>
.setLine {
  border-left: 2px solid #ff0000;
}
.imgList {
    width: 30px;
    margin-right: 25px;
  }
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
