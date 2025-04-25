<template>
  <div>
    <v-card>
      <v-layout row wrap>
        <v-flex md8>
          <v-card-title class="headline">
            Roles lists
            <v-divider class="mx-3 setLine" vertical></v-divider>
            <v-btn outline color="light-blue darken-4" @click="openDialogAddGroup()">
              <v-icon left dark>group_add</v-icon>{{ $t('addrole') }}s
            </v-btn>
            <transition name="fade">
              <v-btn transition="scale-transition" outline color="red" dark v-show = "this.selected != 0" @click="suspendUserMore()">
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
        :items="sortedGroupList"
        :search="search"
        item-key="name"
        select-all
        class="elevation-1"
        :rows-per-page-items="[10, 25, 50, {text:'All', value: -1}]"
        :rows-per-page-text="$t('rowsPerPageLabel')"
      >
        <template v-slot:items="props">
  <!-- Row Number Column -->
  <td class="text-xs-center">{{ props.item.index }}</td>

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
          @click="openDialogEditGroup(props.item)"
        >
          <v-icon>edit</v-icon>
        </v-btn>
      </template>
      <span>Edit Roles</span>
    </v-tooltip>

    <v-tooltip top color="red lighten-1">
      <template v-slot:activator="{ on }">
        <v-btn flat icon small color="red lighten-1" class="ma-0" v-on="on">
          <v-icon>delete</v-icon>
        </v-btn>
      </template>
      <span>Delete Roles</span>
    </v-tooltip>
  </td>

  <td class="text-xs-center" width="4%">
    <v-chip outline small color="light-blue darken-4">
      <v-avatar>
        <v-icon>supervised_user_circle</v-icon>
      </v-avatar>
      {{ props.item.userInGroup.length }} User
    </v-chip>
  </td>
</template>

        <template v-slot:no-data>
          <v-alert :value="true" color="error" icon="warning">Sorry, nothing to display here :(</v-alert>
        </template>
        <template v-slot:no-results>
          <v-alert
            :value="true"
            color="error"
            icon="warning"
          >{{ $t('searchfor') }} "{{ search }}" {{ $t('foundno') }}</v-alert>
        </template>
      </v-data-table>
    </v-card>

    <!-- Dialog add group -->
    <v-layout row justify-center>
      <v-dialog v-model="dialogAddGroup" max-width="600px">
        <v-card>
          <v-form v-model="validAddgroup" ref="formAddGroup" lazy-validation>
            <v-toolbar class="light-blue darken-4 white--text" dense>
              <v-toolbar-title>{{ $t('addrole') }}s</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn outline icon @click.native="closeDialogAddGroup()" dark>
                <v-icon>close</v-icon>
              </v-btn>
            </v-toolbar>
            <v-divider></v-divider>
            <!-- <v-card-text> -->
            <v-container grid-list-md class="pl-4 pr-4">
              <v-layout wrap>
                <v-flex xs12 sm12 md12>
                  <p class="subheading">
                    <v-icon left class="mr-2" color="light-blue darken-4">label</v-icon>Roles name
                    <span style="color: red">*</span>
                  </p>
                  <v-divider></v-divider>
                  <v-layout>
                    <v-flex md5>
                      <p class="subheading mt-4 ml-4">Plese define roles name :</p>
                    </v-flex>
                    <v-flex md7>
                      <v-text-field
                        class="mt-2"
                        v-model="addGroupname"
                        :rules="addGroupnameRules"
                        label="roles name"
                        single-line
                        color="light-blue darken-4"
                        clearable
                      ></v-text-field>
                    </v-flex>
                  </v-layout>
                  <v-flex xs12 sm12 md12>
                    <p class="subheading">
                      <v-icon left class="mr-2" color="light-blue darken-4">label</v-icon>Add Sub Level
                    </p>
                    <v-divider></v-divider>
                  </v-flex>
                  <v-toolbar card color="white" dense>
                  </v-toolbar>
                </v-flex>
              </v-layout>
            </v-container>
            <!-- </v-card-text> -->
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn @click="submitAddGroup()" :disabled="!validAddgroup" color="green" outline flat>
                <v-icon left dark>save</v-icon>Save
              </v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-dialog>
    </v-layout>

    <!-- Dialog Edit Group -->
    <v-layout row justify-center>
      <v-dialog v-model="dialogEditGroup" max-width="600px">
        <v-card>
          <v-form v-model="validEditgroup" ref="formEditGroup" lazy-validation>
            <v-toolbar class="light-blue darken-4 white--text" dense>
              <v-toolbar-title>Edit group</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn outline icon @click.native="closeDialogEditGroup()" dark>
                <v-icon>close</v-icon>
              </v-btn>
            </v-toolbar>
            <v-divider></v-divider>
            <!-- <v-card-text> -->
            <v-container grid-list-md class="pl-4 pr-4">
              <v-layout wrap>
                <v-flex xs12 sm12 md12>
                  <p class="subheading">
                    <v-icon left class="mr-2" color="light-blue darken-4">label</v-icon>Group name
                    <span style="color: red">*</span>
                  </p>
                  <v-divider></v-divider>
                  <v-layout>
                    <v-flex md5>
                      <p class="subheading mt-4 ml-4">Plese define group name :</p>
                    </v-flex>
                    <v-flex md7>
                      <v-text-field
                        class="mt-2"
                        v-model="editGroupname"
                        :rules="editGroupnameRules"
                        label="group name"
                        single-line
                        color="light-blue darken-4"
                        clearable
                      ></v-text-field>
                    </v-flex>
                  </v-layout>
                  <v-flex xs12 sm12 md12>
                    <p class="subheading">
                      <v-icon left class="mr-2" color="light-blue darken-4">label</v-icon>Add members
                    </p>
                    <v-divider></v-divider>
                  </v-flex>
                  <v-toolbar card color="white" dense>
                    <v-toolbar-title class="body-2 red--text">{{ memberInGroup.length }}</v-toolbar-title>
                    <v-toolbar-title class="body-2">USERS ASSIGNED</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-tooltip left color="green">
                      <v-btn slot="activator" outline color="green" flat icon @click="mode = 'add'" v-show="mode === 'edit'">
                        <v-icon color="green">group_add</v-icon>
                      </v-btn>
                      <span>Add member</span>
                    </v-tooltip>
                    <v-tooltip left color="red">
                      <v-btn slot="activator" outline color="red" flat icon @click="mode = 'edit'" v-show="mode === 'add'">
                        <v-icon color="red">arrow_back</v-icon>
                      </v-btn>
                      <span>Back to remove</span>
                    </v-tooltip>
                  </v-toolbar>
                  <div v-show="mode === 'edit'" class="heightUserlist">
                    <!-- <transition name="fade"> -->
                      <div class="pl-3 pr-3">
                        <v-text-field append-icon="search" :label="$t('search')"  single-line v-model="searchUserRemove"></v-text-field>
                      </div>
                      <v-data-table
                        :items="memberInGroup"
                        :search="searchUserRemove"
                        hide-actions
                        hide-headers>
                        <template slot="items" slot-scope="props">
                          <td width="95%"> {{ props.item.name }} </td>
                          <td width="5%">
                            <v-btn slot="activator" color="grey" small flat icon @click="removeUserFromGroup(props.item)">
                              <v-icon color="red">remove</v-icon>
                            </v-btn>
                          </td>
                        </template>
                      </v-data-table>
                    <!-- </transition> -->
                  </div>
                  <div v-show="mode === 'add'" class="heightUserlist">
                    <!-- <transition name="fade"> -->
                      <div class="pl-3 pr-3">
                        <v-text-field append-icon="search" :label="$t('search')"  single-line v-model="searchUserAdd"></v-text-field>
                      </div>
                      <v-data-table
                        :items="users"
                        :search="searchUserAdd"
                        hide-actions
                        hide-headers>
                        <template slot="items" slot-scope="props">
                          <td width="95%"> {{ props.item.name }} </td>
                          <td width="5%">
                            <v-btn slot="activator" color="grey" small flat icon @click="addUsertoGroup(props.item)">
                              <v-icon color="green">add</v-icon>
                            </v-btn>
                          </td>
                        </template>
                      </v-data-table>
                    <!-- </transition> -->
                  </div>
                </v-flex>
              </v-layout>
            </v-container>
            <!-- </v-card-text> -->
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn @click="submitAddGroup()" :disabled="!validAddgroup" color="green" outline flat>
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
      groupList: [
        { name: 'ADMIN',
          userInGroup: [{
            name: 'Mallika Muhamad'
          }]
        },
        { name: 'Group1',
          userInGroup: [
            { id: 'n1', name: 'Mallika Muhamad' },
            { id: 'n2', name: 'Mallika2 Muhamad' }
          ]
        },
        { name: 'Group2',
          userInGroup: [
            { id: 'n1', name: 'Mallika Muhamad' },
            { id: 'n2', name: 'Mallika2 Muhamad' },
            { id: 'n3', name: 'Mallika2 Muhamad' },
            { id: 'n4', name: 'Mallika2 Muhamad' },
            { id: 'n5', name: 'Mallika2 Muhamad' }
          ]
        }
      ],
      headers: [
        {
        text: 'No.',
        align: 'center',
        sortable: false,
        value: 'index' 
        },
        {
          text: 'Group name',
          align: 'left',
          sortable: true,
          value: 'gname'
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
      users: [
        {id: '4', name: 'name 4 name'},
        {id: '5', name: 'name 5 name'},
        {id: '6', name: 'name 6 name'},
        {id: '7', name: 'name 7 name'},
        {id: '8', name: 'name 8 name'},
        {id: '9', name: 'name 9 name'},
        {id: '10', name: 'name 10 name'}
      ],
      memberInGroup: [
        {id: '1', name: 'name 1 name'},
        {id: '2', name: 'name 2 name'},
        {id: '3', name: 'name 3 name'}
      ],
      searchUserAdd: '',
      searchUserRemove: '',
      mode: 'edit',
      dialogAddGroup: false,
      validAddgroup: true,
      addGroupname: '',
      addGroupnameRules: [v => !!v || 'Roles name is required'],
      dialogEditGroup: false,
      validEditgroup: true,
      editGroupname: '',
      editGroupnameRules: [v => !!v || 'Group name is required']
    }
  },
  computed: {
    sortedGroupList() {
      return this.groupList
        .slice() // ✅ Create a copy to avoid modifying the original reference
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at)) // ✅ Sort by newest first
        .map((item, index) => ({ ...item, index: index + 1 }));
    }
  },
  methods: {
    openDialogAddGroup () {
      this.$refs.formAddGroup.reset()
      this.dialogAddGroup = true
      this.mode = 'edit'
    },
    closeDialogAddGroup () {
      this.dialogAddGroup = false
    },
    openDialogEditGroup (data) {
      this.dialogEditGroup = true
      this.editGroupname = data.name
    },
    closeDialogEditGroup () {
      this.dialogEditGroup = false
    }
  }
}
</script>

<style scoped>
.setLine {
  border-left: 2px solid #ff0000;
}
.heightUserlist {
  height: 290px;
  /* height: 290px; */
  overflow-x: hidden;
  overflow-y: auto;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
