<template lang="html">
  <div class="grey lighten-4 fullPage">
    <v-container class="pa-6 container-dynamic">
      <v-card flat>
        <v-layout row wrap >
          <v-flex xs8 sm8 md8 >
            <v-card-title class="headline">
              {{ $t('userlist') }}
              <v-divider class="mx-3 setLine" vertical></v-divider>
              <!-- <v-btn outline color="light-blue" @click="openDialogAddUsers()"><v-icon left dark>fa-user-plus fa-1x</v-icon>Add users</v-btn> -->
              <v-btn outline color="light-blue darken-4" @click="openDialogAddUsers()">
                <v-icon left dark>person_add</v-icon>{{ $t('adduser') }}
              </v-btn>
              <!-- <v-btn outline color="light-blue darken-4" @click="openDialogAddUsersAD()">
                <v-icon left dark>person_add</v-icon>Add user AD
              </v-btn> -->
              <transition name="fade">
                <v-btn
                  transition="scale-transition"
                  outline
                  color="red"
                  dark
                  v-show="this.selected != 0"
                  @click="suspendUserMore()"
                >
                  <v-icon left>delete</v-icon>{{ $t('removeselect') }}
                </v-btn>
              </transition>
            </v-card-title>
          </v-flex>
          <v-flex xs4 sm4 md4>
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
          :headers="localizedHeaders"
          :items="userList"
          :search="search"
          item-key="name"
          class="elevation-1"
          :rows-per-page-items="[10, 25, 50, { text: 'All', value: -1 }]"
          :rows-per-page-text="$t('rowsPerPageLabel')"
        >
          <template v-slot:items="props">
            <td class="text-xs-center">{{ props.item.username }}</td>
            <td class="text-xs-center">
              <!-- <v-edit-dialog :return-value.sync="props.item.firstname" large @save="save_edit_group_name(props.item)"
              @cancel="cancel"> -->
              {{ props.item.firstname }}
              <!-- <template v-slot:input>
                <v-text-field v-model="props.item.firstname" label="Edit" single-line autofocus maxLength="255"
                  :counter="255">
                </v-text-field>
              </template>
            </v-edit-dialog> -->
            </td>
            <td class="text-xs-center">
              <!-- <v-edit-dialog :return-value.sync="props.item.lastname" large @save="save_edit_group_name(props.item)"
              @cancel="cancel"> -->
              {{ props.item.lastname }}
              <!-- <template v-slot:input>
                <v-text-field v-model="props.item.lastname" label="Edit" single-line autofocus maxLength="255"
                  :counter="255">
                </v-text-field>
              </template>
            </v-edit-dialog> -->
            </td>
            <td class="text-xs-center" v-if="item.previlage_name === 'admin'">
              <v-edit-dialog
                :return-value.sync="props.item.status_name"
                large
                persistent
                @save="saveStatus(props.item)"
              >
                <v-btn
                  v-if="props.item.status_name === 'Lock'"
                  round
                  outline
                  color="#E9B57C"
                  >{{ props.item.status_name }}
                </v-btn>
                <v-btn
                  v-else-if="props.item.status_name === 'New'"
                  round
                  outline
                  color="amber"
                  >{{ props.item.status_name }}</v-btn
                >
                <v-btn
                  v-else-if="props.item.status_name === 'Offline'"
                  round
                  outline
                  color="amber"
                  >{{ props.item.status_name }}</v-btn
                >
                <v-btn
                  v-else-if="props.item.status_name === 'Wait for Verify'"
                  round
                  outline
                  color="amber"
                  >{{ props.item.status_name }}</v-btn
                >
                <v-btn
                  v-else-if="props.item.status_name === 'Active'"
                  round
                  outline
                  color="success"
                  >{{ props.item.status_name }}</v-btn
                >
                <v-btn
                  v-else-if="props.item.status_name === 'Suspend'"
                  round
                  outline
                  color="blue-grey lighten-1"
                  >{{ props.item.status_name }}</v-btn
                >
                <v-btn
                  v-else="props.item.status_name === 'Delete'"
                  round
                  outline
                  color="#9599A3"
                  >{{ props.item.status_name }}</v-btn
                >
                <template v-slot:input>
                  <v-select
                    :items="statusItem"
                    item-text="status_name"
                    v-model="props.item.status_name"
                  ></v-select>
                </template>
              </v-edit-dialog>
            </td>
            <td
              class="text-xs-center"
              v-for="item in statusPermission"
              v-if="props.item.previlage_id === item.previlage_id"
            >
              <div>
                {{ item.previlage_name }}
              </div>
            </td>
            <td class="text-xs-center">{{ props.item.org_name }}</td>
            <td class="text-xs-center">{{ formatDate(props.item.login_respond) }}</td>
            <td class="text-xs-center">{{ props.item.email }}</td>
            <!-- <td class="text-xs-center">
              <div v-if="props.item.email_news == '1'">Receive news</div>
              <div v-else>Not receiving news</div>
            </td> -->
            <!-- <td class="text-xs-center">
              <v-btn v-if="props.item.status_id === 4" text icon @click="resendmail(props.item)">
                <v-icon>repeat</v-icon>
              </v-btn>
              <v-btn v-else-if="props.item.email === null" text icon disabled>
                <v-icon>inbox</v-icon>
              </v-btn>
              <v-btn v-else text icon @click="sentemail(props.item.email)">
                <v-icon>inbox</v-icon>
              </v-btn>
            </td> -->
            <td class="text-xs-center">
              <v-tooltip top color="primary" class="mgr-10">
                <v-btn
                  slot="activator"
                  color="primary"
                  small
                  flat
                  icon
                  @click="resetapi(props.item)"
                >
                  <v-icon color="primary">api</v-icon>
                </v-btn>
                <span>{{ $t('resetapi') }}</span>
              </v-tooltip>
            </td>
            <!-- <td class="text-xs-center">
              <v-btn text icon @click="sent_QR(props.item)">
                <v-icon>qr_code_2</v-icon>
              </v-btn>
            </td> -->
            <!-- <td>
              <v-edit-dialog :return-value.sync="props.item.two_factor_authen" large persistent
                @save="twoFaAuthen(props.item)">
                <v-btn v-if="props.item.two_factor_authen === 'off'" round outline color="#9599A3">{{
                  props.item.two_factor_authen }}</v-btn>
                <v-btn v-else-if="props.item.two_factor_authen === 'on'" round outline color="success">{{
                  props.item.two_factor_authen }}</v-btn>
                <template v-slot:input>
                  <v-select :items="twoFa" item-text="name" v-model="props.item.two_factor_authen"></v-select>
                </template>
              </v-edit-dialog>

            </td> -->
            <td class="text-xs-center">
              <v-tooltip
                top
                color="primary"
                class="mgr-10"
                v-if="props.item.status_id === 6"
              >
                <v-btn text icon @click="unlock(props.item)" slot="activator">
                  <v-icon color="error">lock</v-icon>
                </v-btn>
                <span>{{ $t('unlockacc') }}</span>
              </v-tooltip>

              <v-btn v-else text icon disabled>
                <v-icon color="blue darken-4"> lock_open</v-icon>
              </v-btn>
            </td>
            <td class="text-xs-center">
              <v-tooltip top color="primary" class="mgr-10">
                <v-btn
                  slot="activator"
                  color="primary"
                  small
                  flat
                  icon
                  @click="resetPassword(props.item)"
                >
                  <v-icon color="primary">cached</v-icon>
                </v-btn>
                <span>{{ $t('resetpass') }}</span>
              </v-tooltip>
            </td>

            <td class="text-xs-center">
              <v-tooltip top color="primary" class="mgr-10">
                <v-btn
                  slot="activator"
                  color="primary"
                  small
                  flat
                  icon
                  @click="EditUser(props.item)"
                >
                  <v-icon color="primary">mode_edit</v-icon>
                </v-btn>
                <span>{{ $t('edituser') }}</span>
              </v-tooltip>
            </td>

            <td class="text-xs-center">
              <v-tooltip top color="primary">
                <template v-slot:activator="{ on }">
                    <v-btn small icon color="blue-grey" @click="deactivateUser(props.item)">
                      <v-icon>inactive</v-icon> <!-- "Block" icon represents deactivation -->
                    </v-btn>
                  <v-btn color="red" small icon v-on="on" @click="deleteUser(props.item)">
                    <v-icon>delete</v-icon>
                  </v-btn>
                </template>
                <span>{{ $t('deleteuser') }}</span>
              </v-tooltip>
            </td>

          </template>
          <template v-slot:no-data>
            <v-alert :value="true" color="error" icon="warning"
              >{{ $t('sorrynot') }}:(</v-alert
            >
          </template>
          <template v-slot:no-results>
            <v-alert :value="true" color="error" icon="warning"
              >{{ $t('searchfor') }}"{{ search }}" {{ $t('foundno') }}
            </v-alert>
          </template>
        </v-data-table>
      </v-card>

      <!-- Dilog Add User -->
      <v-layout row justify-center>
        <v-dialog v-model="dialogAddUsers" persistent max-width="750px">
          <v-card>
            <v-form v-model="valid" ref="formAddUser" lazy-validation>
              <v-toolbar class="black--text color-card-title" dense>
                <v-toolbar-title>{{ $t('adduser') }}</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn outline icon @click.native="closeDialogAddusers()">
                  <v-icon>close</v-icon>
                </v-btn>
              </v-toolbar>
              <v-divider></v-divider>
              <!-- <v-card-text> -->
              <v-container grid-list-md class="pl-4 pr-4">
                <v-layout wrap>
                  <v-flex xs12 sm12 md12 class="mt-2">
                    <p class="subheading">
                      <v-icon left class="mr-2" color="light-blue darken-4">label</v-icon
                      >{{ $t('user') }}
                      <span style="color: red">*</span>
                    </p>
                    <v-divider></v-divider>
                    <v-layout>
                      <v-flex md3>
                        <p class="subheading mt-4 ml-4">{{ $t('username') }} :</p>
                      </v-flex>
                      <v-flex md7>
                        <v-text-field
                          class="mt-3"
                          v-model="username"
                          :rules="usernameRules"
                          :label="$t('username')"
                          single-line
                          color="light-blue darken-4"
                          clearable
                        >
                        </v-text-field>
                      </v-flex>
                    </v-layout>
                    <v-layout>
                      <v-flex md3>
                        <p class="subheading mt-4 ml-4">{{ $t('firstname') }} :</p>
                      </v-flex>
                      <v-flex md7>
                        <v-text-field
                          class="mt-3"
                          v-model="firstname"
                          :rules="firstnameRules"
                         :label="$t('firstname')"
                          single-line
                          color="light-blue darken-4"
                          clearable
                        >
                        </v-text-field>
                      </v-flex>
                    </v-layout>
                    <v-layout>
                      <v-flex md3>
                        <p class="subheading mt-4 ml-4">{{ $t('lastname') }} :</p>
                      </v-flex>
                      <v-flex md7>
                        <v-text-field
                          class="mt-3"
                          v-model="lastname"
                          :rules="lastnameRules"
                          :label="$t('lastname')"
                          single-line
                          color="light-blue darken-4"
                          clearable
                        >
                        </v-text-field>
                      </v-flex>
                    </v-layout>
                    <v-layout>
                      <v-flex md3>
                        <p class="subheading mt-4 ml-4">{{ $t('email') }} :</p>
                      </v-flex>
                      <v-flex md7>
                        <v-text-field
                          class="mt-3"
                          v-model="email"
                           :label="$t('email')"
                          single-line
                          color="light-blue darken-4"
                          clearable
                        >
                        </v-text-field>
                      </v-flex>
                    </v-layout>
                    <v-layout>
                      <v-flex md3>
                        <p class="subheading mt-4 ml-4">{{ $t('password') }}  :</p>
                      </v-flex>
                      <v-flex md7>
                        <v-text-field
                          class="mt-3"
                          :type="showpassword ? 'text' : 'password'"
                          :rules="passwordRules"
                          required
                          v-model="password"
                           :label="$t('password')"
                          :append-icon="showpassword ? 'visibility' : 'visibility_off'"
                          @click:append="showpassword = !showpassword"
                          oncopy="return false"
                          onpaste="return false"
                          oncut="return false"
                        ></v-text-field>
                      </v-flex>
                    </v-layout>
                    <v-layout>
                      <v-flex md3>
                        <p class="subheading mt-4 ml-4">{{ $t('repass') }} :</p>
                      </v-flex>
                      <v-flex md7>
                        <v-text-field
                          class="mt-3"
                          :type="showrepassword ? 'text' : 'password'"
                          :rules="repasswordRules"
                          required
                          v-model="repassword"
                          :label="$t('repass')"
                          :append-icon="showrepassword ? 'visibility' : 'visibility_off'"
                          @click:append="showrepassword = !showrepassword"
                          oncopy="return false"
                          onpaste="return false"
                          oncut="return false"
                        >
                        </v-text-field>
                      </v-flex>
                    </v-layout>
                    <v-layout>
                      <v-flex md3>
                        <p class="subheading mt-3 ml-4">{{ $t('usageojt') }} :</p>
                      </v-flex>
                      <v-flex md7>
                        <v-select
                          chips
                          :items="objectives"
                          item-value="id"
                          v-model="selectedItem"
                          item-text="name"
                          :rules="[(v) => !!v || 'Item is required']"
                          :label="$t('usageojt')"
                          required
                        >
                        </v-select>
                        <v-text-field
                          v-if="selectedItem === 'other'"
                          class="mt-3"
                          :label="$t('others')"
                          color="light-blue darken-4"
                          clearable
                          v-model="objother"
                          :rules="otherRules"
                          maxLength="255"
                          :counter="255"
                          required
                        >
                        </v-text-field>
                      </v-flex>
                    </v-layout>
                    <v-layout>
                      <v-flex md3>
                        <p class="subheading mt-2 ml-4">{{ $t('org') }}:</p>
                      </v-flex>
                      <v-flex md7>
                        <v-select
                          item-text="org_name"
                          item-value="org_name"
                          :label="$t('org')"
                          :items="organization"
                          v-model="organization"
                          :rules="Rules"
                          dense
                          outlined
                          persistent-hint
                          return-object
                          single-line
                        ></v-select>
                      </v-flex>
                    </v-layout>
                  </v-flex>
                </v-layout>
              </v-container>
              <!-- </v-card-text> -->
              <v-card-actions>
                <!-- <v-btn color="red" outline flat @click.native="closeDialogAddusers()">Cancel</v-btn> -->
                <v-spacer></v-spacer>
                <v-btn
                  @click="submitAdduser()"
                  :disabled="!valid"
                  color="green"
                  outline
                  flat
                >
                  <v-icon left dark>save</v-icon>{{ $t('save') }}
                </v-btn>
              </v-card-actions>
            </v-form>
          </v-card>
        </v-dialog>
      </v-layout>

      <!-- add uase ad -->
      <v-layout row justify-center>
        <v-dialog v-model="dialogAddUsersAD" persistent max-width="750px">
          <v-card>
            <v-form v-model="validad" ref="form" lazy-validation>
              <v-toolbar class="color-card-title white--text color-card-title" dense>
                <v-toolbar-title>Add Active Directory User</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn outline icon @click.native="closeDialogAddusersAD()" dark>
                  <v-icon>close</v-icon>
                </v-btn>
              </v-toolbar>
              <v-divider></v-divider>
              <!-- <v-card-text> -->
              <v-container grid-list-md class="pl-4 pr-4">
                <v-layout wrap>
                  <v-flex xs12 sm12 md12 class="mt-2">
                    <p class="subheading">
                      <v-icon left class="mr-2" color="light-blue darken-4">label</v-icon
                      >Active Directory User
                      <span style="color: red">*</span>
                    </p>
                    <v-divider></v-divider>
                    <v-flex class="pa-3">
                      <v-combobox
                        v-model="AD_User"
                        :items="items"
                        chips
                        clearable
                        hide-selected
                        hint="Maximum of 15 User"
                        persistent-hint
                        label="Text field for fill multiple Active Directory User"
                        multiple
                        :rules="[(v) => !!v || 'Item is required']"
                        required
                      >
                        <template v-slot:selection="data">
                          <v-chip
                            :selected="data.selected"
                            close
                            @input="remove(data.item)"
                            label
                            outline
                            color="blue"
                          >
                            <strong>{{ data.item }}</strong
                            >&nbsp;
                          </v-chip>
                        </template>
                        <template v-slot:no-data>
                          <v-list-tile>
                            <v-list-tile-content>
                              <v-list-tile-title>
                                Press <kbd>enter</kbd> to create a new one
                              </v-list-tile-title>
                            </v-list-tile-content>
                          </v-list-tile>
                        </template>
                      </v-combobox>
                    </v-flex>
                  </v-flex>
                  <v-flex xs12 sm12 md12 class="mt-2">
                    <p class="subheading">
                      <v-icon left class="mr-2" color="light-blue darken-4">label</v-icon
                      >User role
                      <span style="color: red">*</span>
                    </p>
                    <v-divider></v-divider>
                    <v-flex class="pa-3">
                      <v-select
                        :items="getRoles"
                        label="Role selector (Role from Permission Management Menu)"
                        item-value="previlage_name"
                        v-model="rols"
                        item-text="previlage_name"
                        :rules="[(v) => !!v || 'Item is required']"
                        required
                      ></v-select>
                    </v-flex>
                  </v-flex>
                </v-layout>
              </v-container>
              <!-- </v-card-text> -->
              <v-card-actions>
                <!-- <v-btn color="red" outline flat @click.native="closeDialogAddusers()">Cancel</v-btn> -->
                <v-spacer></v-spacer>
                <v-btn
                  @click="search_ADuser()"
                  :disabled="!validad"
                  color="green"
                  outline
                  flat
                >
                  <v-icon left dark>save </v-icon>Add users
                </v-btn>
              </v-card-actions>
            </v-form>
          </v-card>
        </v-dialog>
      </v-layout>
    </v-container>
    <navbarEditUser
      ref="navbarEditUser"
      @EditUserByadmin="EditUserByadmin"
    ></navbarEditUser>
    <navbarResetPassword
      ref="navbarResetPassword"
      @ResetPasswordByadmin="ResetPasswordByadmin"
    ></navbarResetPassword>
    <v-layout row justify-center>
      <v-dialog v-model="loading" persistent fullscreen content-class="loading-dialog">
        <v-container fill-height>
          <v-layout row justify-center align-center>
            <v-progress-circular
              indeterminate
              :size="80"
              :width="10"
              color="#6ab9eB"
            ></v-progress-circular>
          </v-layout>
        </v-container>
      </v-dialog>
    </v-layout>
    <!-- dialog show -->
    <v-layout row justify-center>
      <v-dialog v-model="dialogshow" persistent max-width="650px">
        <v-card>
          <v-card-title class="headline">Result</v-card-title>
          <v-card-text>
            <v-alert
              :value="true"
              color="success"
              icon="check_circle"
              outline
              v-if="Complete_register_length != 0"
            >
              <b>Complete Register :</b>
              <v-chip
                v-for="items_Complete_register in Complete_register"
                color="success"
                text-color="white"
              >
                {{ items_Complete_register }}</v-chip
              >
            </v-alert>

            <v-alert
              :value="true"
              color="warning"
              icon="priority_high"
              outline
              v-if="Users_already_register_length != 0"
            >
              <b>Users Already Register :</b>
              <v-chip
                v-for="itemsUsers_already_register in Users_already_register"
                color="warning"
                text-color="white"
              >
                {{ itemsUsers_already_register }}</v-chip
              >
            </v-alert>

            <v-alert
              :value="true"
              color="error"
              icon="warning"
              outline
              v-if="Users_not_found_length != 0"
            >
              <b>Users Not Found :</b>
              <v-chip
                v-for="items_Users_not_found in Users_not_found"
                color="error"
                text-color="white"
              >
                {{ items_Users_not_found }}</v-chip
              >
            </v-alert>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" flat @click="closeDialogShow()">OK</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
  </div>
</template>

<script>
import { Encode, Decode } from "@/services";
let cjs = require("crypto-js");
import navbarEditUser from "@/components/admin/managementMenu/navbarEditUser";
import navbarResetPassword from "@/components/admin/managementMenu/navbarResetPassword";
export default {
  components: {
    navbarEditUser,
    navbarResetPassword,
  },
  data() {
    return {
      organization: [],
      getRoles: [],
      AD_User: [],
      items: [],
      colors: ["green", "purple", "indigo", "cyan", "teal", "orange"],
      twoFa: [
        {
          name: "off",
        },
        { name: "on" },
      ],
      statusItem: [],
      dialogAddUsers: false,
      dialogAddUsersAD: false,
      valid: true,
      email: "",
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) =>
          /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
          "E-mail must be valid",
      ],
      dialogEditUsers: false,
      editUsername: "",
      editUsernamelRules: [(v) => !!v || "Username is required"],
      editName: "",
      editNamelRules: [(v) => !!v || "Name is required"],
      editEmail: "",
      selectedGroup: ["foo"],
      itemsGroup: [
        // 'foo',
        // 'bar',
        // 'fizz',
        // 'buzz',
        // 'foo1',
        // 'bar1',
        // 'fizz1',
        // 'buzz1'
      ],
      search: "",
      selected: [],
      statusPermission: [],
      selectedLevel: "",
      // headers: [
      //   {
      //     text: this.$t('username'),
      //     align: "center",
      //     sortable: false,
      //     value: "username",
      //   },
      //   {
      //     text: this.$t('firstname'),
      //     align: "left",
      //     sortable: false,
      //     value: "firstname",
      //   },
      //   {
      //     text: this.$t('lastname'),
      //     align: "left",
      //     sortable: false,
      //     value: "lastname",
      //   },

      //   // {
      //   //   text: 'Action',
      //   //   align: 'center',
      //   //   sortable: false
      //   // },
      //   {
      //     text: this.$t('status'),
      //     align: "center",
      //     sortable: false,
      //     value: "status_name",
      //   },
      //   {
      //     text: this.$t('type'),
      //     align: "center",
      //     sortable: false,
      //     value: "previlage_id",
      //   },
      //   {
      //     text: this.$t('orj'),
      //     align: "center",
      //     sortable: false,
      //     value: "org_name",
      //   },
      //   {
      //     text: this.$t('lastlogin'),
      //     align: "center",
      //     sortable: false,
      //     value: "title",
      //   },
      //   {
      //     text: this.$t('email'),
      //     align: "center",
      //     sortable: false,
      //     value: "email",
      //   },
      //   // {
      //   //   text: 'News',
      //   //   align: 'center',
      //   //   sortable: false,
      //   //   value: 'news'
      //   // },
      //   // {
      //   //   text: 'Sent Email',
      //   //   align: 'center',
      //   //   sortable: false,
      //   //   value: 'sent_email'
      //   // },
      //   {
      //     text: this.$t('resetapi'),
      //     align: "center",
      //     sortable: false,
      //     // value: 'api'
      //   },
      //   // {
      //   //   text: 'Sent QR',
      //   //   align: 'center',
      //   //   sortable: false,
      //   //   value: 'sent_QR'
      //   // },
      //   // {
      //   //   text: '2FACTOR',
      //   //   align: 'center',
      //   //   sortable: false,
      //   //   value: 'two_factor_authen'
      //   // },
      //   {
      //     text: this.$t('unlockacc'),
      //     align: "center",
      //     sortable: false,
      //     // value: 'two_factor_authen'
      //   },
      //   {
      //     text:  this.$t('resetpass'),
      //     align: "center",
      //     sortable: false,
      //     // value: 'two_factor_authen'
      //   },
      //   {
      //     text: this.$t('edituser'),
      //     align: "center",
      //     sortable: false,
      //     // value: 'two_factor_authen'
      //   },
      // ],
      userList: [
        // {"email":"RubberAuthority@mail.com","email_news":1,"firstname":"Rubber","lastname":"Authority","login_respond":"2021-07-07 09:38:14","other_object":"","previlage_id":'Admin',"send_QR":"","status_id":2,"status_name":"Active","two_factor_authen":"off","type_user":"DataX","usage_objective":"policy","user_id":105,"username":"Rubber"},
        // {"email":"chet@gmail.com","email_news":1,"firstname":"Rubber","lastname":"Authority","login_respond":"2021-06-24 10:36:40","other_object":"","previlage_id":'User',"send_QR":"","status_id":1,"status_name":"Offline","two_factor_authen":"off","type_user":"DataX","usage_objective":"authority","user_id":104,"username":"Chet"},
        // {"email":"boone@gmail.com","email_news":1,"firstname":"Rubber","lastname":"Authority","login_respond":"2021-05-19 10:22:44","other_object":"","previlage_id":'User',"send_QR":"","status_id":2,"status_name":"Active","two_factor_authen":"on","type_user":"AD","usage_objective":"authority","user_id":103,"username":"Boone"},
        // {"email":"user4@gmail.com","email_news":1,"firstname":"Rubber","lastname":"Authority","login_respond":"2021-05-17 13:03:45","other_object":"","previlage_id":'User',"send_QR":"","status_id":1,"status_name":"Offline","two_factor_authen":"off","type_user":"AD","usage_objective":"authority","user_id":102,"username":"user4"},
      ],

      passwordRules: [
        (v) => !!v || "กรุณากรอกรหัสผ่าน",
        // v => !!v || 'Password is required',
        // v => /^[A-Za-z0-9_.]+$/.test(v) || 'Please fill in English only.'
        (v) =>
          /^((?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{8,})+$/.test(v) ||
          "รหัสผ่านต้องมีตัวเลขหรือตัวอักษรภาษาอังกฤษตัวใหญ่หรือตัวอักษรภาษาอังกฤษตัวเล็ก อย่างน้อย 1 ตัว ความยาวอย่างน้อย 8",
        // v => /^((?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{8,})+$/.test(v) || 'Require at least 8 characters of capital letter, small letter and number'
      ],
      usernameRules: [
        (v) => !!v || "Username is required",
        (v) => /^[A-Za-z0-9_.]+$/.test(v) || "Please fill in English only.",
      ],
      objectives: [
        {
          name: "Investment Analyst",
          id: "investment",
        },
        {
          name: "Authority",
          id: "authority",
        },
        {
          name: "Investor",
          id: "investor",
        },
        {
          name: "Researcher",
          id: "researcher",
        },
        {
          name: "Policy maker",
          id: "policy",
        },
        {
          name: "Student",
          id: "student",
        },
        {
          name: "Others … Please specify …",
          id: "other",
        },
      ],
      selectedItem: [],
      objectiveRules: [(v) => !!v || "Please choose Usage Objective"],
      otherRules: [(v) => !!v || "Please choose Usage Objective"],
      pagination: {
        sortBy: "",
      },
      repasswordRules: [
        // (v) => !!v || 'Password is required',
        (v) => !!v || "กรุณายืนยันรหัสผ่าน",
        // (v) => v === this.password || 'Password does not match',
        (v) => v === this.password || "รหัสผ่านไม่ตรงกัน",
        // (v) => v.length >= 8 || 'Please enter more than 8 characters'
      ],
      showpassword: false,
      showrepassword: false,
      username: "",
      name: "",
      lastname: "",
      email: "",
      password: "",
      repassword: "",
      objother: "",
      aduser: [],
      loading: false,
      dialogshow: false,
      Users_not_found: [],
      Complete_register: [],
      Users_already_register: [],
      Users_not_found_length: "",
      Complete_register_length: "",
      Users_already_register_length: "",
      validad: true,
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


    localizedHeaders() {
    return [
      {
        text: this.$t('username'),
        align: "center",
        sortable: false,
        value: "username",
      },
      {
        text: this.$t('firstname'),
        align: "left",
        sortable: false,
        value: "firstname",
      },
      {
        text: this.$t('lastname'),
        align: "left",
        sortable: false,
        value: "lastname",
      },
      {
        text: this.$t('status'),
        align: "center",
        sortable: false,
        value: "status_name",
      },
      {
        text: this.$t('type'),
        align: "center",
        sortable: false,
        value: "previlage_id",
      },
      {
        text: this.$t('org'),
        align: "center",
        sortable: false,
        value: "org_name",
      },
      {
        text: this.$t('lastlogin'),
        align: "center",
        sortable: false,
        value: "title",
      },
      {
        text: this.$t('email'),
        align: "center",
        sortable: false,
        value: "email",
      },
      {
        text: this.$t('resetapi'),
        align: "center",
        sortable: false,
      },
      {
        text: this.$t('unlockacc'),
        align: "center",
        sortable: false,
      },
      {
        text: this.$t('resetpass'),
        align: "center",
        sortable: false,
      },
      {
        text: this.$t('edituser'),
        align: "center",
        sortable: false,
      },
      {
        text: this.$t('deleteuser'),
        align: "center",
        sortable: false,
      },
      { 
        text: this.$t('deactivate'), 
        align: 'center', 
        sortable: false },
    ];
  },
  },
  watch: {
    loading(val) {
      if (!val) return;
      setTimeout(() => (this.loading = false), percentCompleted);
    },
    AD_User(val) {
      if (val.length > 15) {
        this.$nextTick(() => this.AD_User.pop());
      }
    },
  },
  mounted() {
    this.oganize();
    this.getUser();
    this.getCodenameStatus();
    this.getStatusPermission();
    this.getRolesPermission();
    this.getAD();
  },
  methods: {
    resetapi(data) {
      this.$swal({
        title: "Are you sure?",
        text: "Reset APIKEY?",
        type: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes!",
        cancelButtonText: "No",
        showCloseButton: true,
        showLoaderOnConfirm: true,
      }).then((result) => {
        console.log("api", data);

        // console.log(result);
        if (result) {
          var user = Encode.encode(JSON.stringify(this.userData));
          this.axios
            .post(process.env.VUE_APP_API_BACKEND + "/resetapikey", {
              user: user,
              username: data.username,
            })
            .then((response) => {
              if (response.data.status === "success") {
                this.$swal("Send Success", "", "success").then((response) => {
                  this.$cookies.set("APIKEY", response.data.key_auth, "1d");

                  this.reloadPage();
                  // dialogDatadescription = false
                });
              } else {
                this.$swal(response.data.status, "", "error");
              }
            });
        } else {
          this.$swal("api has not been send ", "", "info");
        }
      });
    },
    oganize() {
      console.log("org");

      this.axios
        .get(process.env.VUE_APP_API_BACKEND + "/showOrganize", {})
        .then((response) => {
          this.organization = response.data;
        });
    },
    remove(item) {
      this.AD_User.splice(this.AD_User.indexOf(item), 1);
      this.AD_User = [...this.AD_User];
    },
    // save_ad_user() {
    //   console.log(this.AD_User.toString());
    // },
    getRolesPermission() {
      this.axios
        .post(process.env.VUE_APP_API_BACKEND + "/mgmt/getRoles")
        .then((response) => {
          this.getRoles = response.data;
        });
    },
    saveStatus(data) {
      // //console.log(data)
      // var user = Encode.encode(JSON.stringify(this.userData));
      for (var i = 0; i < this.statusItem.length; i++) {
        if (this.statusItem[i].status_name === data.status_name) {
          data.status_id = this.statusItem[i].status_id;
          this.axios
            .post(
              process.env.VUE_APP_API_BACKEND + "/mgmt/mgmtUpdateStatusUser",
              // this.axios.post("http://172.16.112.91:9000" + '/mgmt/mgmtUpdateStatusUser',
              {
                data: data,
                // 'user' : user,
                // 'user_id': Encode.encode(data.user_id),
              }
            )
            .then((response) => {
              if (response.data === "success") {
                this.getUser();
              }
            });
        }
      }
    },
    open() {
      this.getUser();
      this.getCodenameStatus();
      this.getStatusPermission();
    },
    getUser() {
      this.axios
        .post(process.env.VUE_APP_API_BACKEND + "/mgmt/mgmtgetUser")
        .then((response) => {
          this.userList = response.data;
          // console.log(response.data)
        });
    },
    getStatusPermission() {
      this.axios
        .post(process.env.VUE_APP_API_BACKEND + "/mgmt/getPrevilage")
        .then((response) => {
          this.statusPermission = response.data.result;
        });
    },
    getCodenameStatus() {
      this.axios
        .get(process.env.VUE_APP_API_BACKEND + "/mgmt/codenameStatus")
        .then((response) => {
          this.statusItem = response.data;
          // //console.log(this.statusItem);
        });
    },
    resendmail(data) {
      // //console.log(data);

      this.axios
        .post(process.env.VUE_APP_API_BACKEND + "/resendEmailConfirmation", {
          dataresend: data,
          //  'link': "http://localhost:8080"
          link: process.env.VUE_APP_LINK,
        })
        .then((response) => {
          // //console.log(response);
        });
    },
    openDialogAddUsers() {
      this.$refs.formAddUser.resetValidation();
      this.selectedLevel = "1";
      this.dialogAddUsers = true;
    },
    openDialogAddUsersAD() {
      this.dialogAddUsersAD = true;
    },
    openDialogShow() {
      this.dialogshow = true;
    },
    closeDialogShow() {
      this.dialogshow = false;
      window.location.reload();
    },
    closeDialogAddusers() {
      this.dialogAddUsers = false;
      this.$refs.formAddUser.resetValidation();
      // window.location.reload();
    },
    closeDialogAddusersAD() {
      this.dialogAddUsersAD = false;
      window.location.reload();
    },
    submitAdduser() {
      // console.log(this.objother);
      var msg = cjs.enc.Utf8.parse(this.repassword);
      var key = cjs.enc.Utf8.parse(process.env.VUE_APP_SECRETKEY);
      var passwordEncrypt = cjs.enc.Hex.stringify(cjs.HmacSHA256(msg, key));
      // console.log(data.two_factor_authen);
      var user = Encode.encode(JSON.stringify(this.userData));
      this.axios
        .post(process.env.VUE_APP_API_BACKEND + "/AddUserByAdmin", {
          user: user,
          username: this.username,
          firstname: this.firstname,
          lastname: this.lastname,
          usage_objective: this.selectedItem,
          other_object: this.objother,
          email: this.email,
          password: passwordEncrypt,
        })
        .then((response) => {
          // console.log(response);
          if (response.data.status === "Success") {
            this.$swal("Save Success", "", "success").then((response) => {
              this.dialogAddUsers = false;
              this.getUser();
              this.reloadPage();
            });
          } else if (response.data.status === "Error Username is duplicate") {
            this.$swal("Username is duplicate", "", "error").then((response) => {
              this.username = "";
            });
          } else if (response.data.status === "Error Email is duplicate") {
            this.$swal("Email is duplicate", "", "error").then((response) => {
              this.email = "";
            });
          } else {
            this.$swal("ERROR", "", "error");
          }
        });
    },
    openDialogEditUser(items) {
      // //console.log(items)
      this.editUsername = items.username;
      this.editName = items.firstname + " " + items.lastname;
      this.editEmail = items.email;
      if (items.previlage_id === 0) {
        this.selectedLevel = "0";
      } else if (items.previlage_id === 1) {
        this.selectedLevel = "1";
      } else if (items.previlage_id === 2) {
        this.selectedLevel = "2";
      } else if (items.previlage_id === 3) {
        this.selectedLevel = "3";
      }
      this.dialogEditUsers = true;
      this.$refs.formEditUser.resetValidation();
    },
    closeDialogEdituser() {
      this.dialogEditUsers = false;
      this.$refs.formEditUser.resetValidation();
    },
    suspendUser(user) {
      var txt = "You would to suspend user : " + user.name;
      this.$swal({
        title: "Are you sure?",
        text: txt,
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, do it!",
      }).then(function (result) {});
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
    sentemail(email) {
      parent.location = "mailto:" + email;
    },
    sent_QR(qr) {
      this.$swal({
        title: "Are you sure?",
        text: "Send New QRCode?",
        type: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes!",
        cancelButtonText: "No",
        showCloseButton: true,
        showLoaderOnConfirm: true,
      }).then((result) => {
        // console.log(result);
        if (result) {
          var user = Encode.encode(JSON.stringify(this.userData));
          this.axios
            .post(process.env.VUE_APP_API_BACKEND + "/mgmt/resendQRcode", {
              user: user,
              data: qr,
            })
            .then((response) => {
              if (response.data.status === "Success") {
                this.$swal("Send Success", "", "success").then((response) => {
                  // this.reloadPage();
                  // dialogDatadescription = false
                });
              }
            });
        } else {
          this.$swal("qr has not been send ", "", "info");
        }
      });
    },
    reloadPage() {
      window.location.reload();
    },
    twoFaAuthen(data) {
      // console.log(data);
      // console.log(data.two_factor_authen);
      var user = Encode.encode(JSON.stringify(this.userData));
      this.axios
        .post(process.env.VUE_APP_API_BACKEND + "/updateTwoFactorAuthen", {
          user: user,
          user_id: Encode.encode(data.user_id),
          two_factor_authen_status: data.two_factor_authen,
        })
        .then((response) => {
          // console.log(response);
        });
    },
    resetPassword(data) {
      this.$refs.navbarResetPassword.resetPassword(data);
    },
    EditUser(data) {
      this.$refs.navbarEditUser.EditUser(data);
    },
    EditUserByadmin(data) {
      this.getUser();
      // console.log(data);
    },
    ResetPasswordByadmin(data) {
      this.getUser();
      // console.log(data);
    },
    unlock(data) {
      var user = Encode.encode(JSON.stringify(this.userData));
      this.axios
        .post(process.env.VUE_APP_API_BACKEND + "/UnlockAccountByAdmin", {
          user: user,
          username: data.username,
        })
        .then((response) => {
          // console.log(response.data);
          if (response.data.status === "Success") {
            this.$swal("Unlock Account Success", "", "success").then((response) => {
              this.getUser();
            });
          } else {
            this.$swal("ERROR", "", "error");
          }
        });
    },
    search_ADuser() {
      // console.log(this.rols);
      if (this.AD_User[0] == undefined) {
        this.$swal("Please fill in AD user", "", "warning");
      } else if (this.rols === undefined) {
        this.$swal("Please fill in rols", "", "warning");
      } else {
        this.loading = true;
        // this.openDialogShow()
        this.closeDialogAddusersAD();
        var user = Encode.encode(JSON.stringify(this.userData));
        this.axios
          .post(process.env.VUE_APP_API_BACKEND + "/search_ADuser", {
            user: user,
            ad_user: this.AD_User,
            role: this.rols,
          })
          .then((response) => {
            // console.log(response.status);
            if (response.data.status == "Success") {
              this.Users_not_found = response.data.Users_not_found;
              this.Complete_register = response.data.Complete_register;
              this.Users_already_register = response.data.Users_already_register;

              this.Users_not_found_length = response.data.Users_not_found.length;
              this.Complete_register_length = response.data.Complete_register.length;
              this.Users_already_register_length =
                response.data.Users_already_register.length;
              this.loading = false;
              this.dialogshow = true;
              this.getUser();
            } else {
              this.$swal("error", "", "error");
              this.loading = false;
            }
          });
      }
    },
    deactivateUser(user) {
      this.$swal({
        title: "Are you sure?",
        text: `Do you want to deactivate ${user.name}?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, Deactivate",
        cancelButtonText: "Cancel",
      }).then((result) => {
        if (result.isConfirmed) {
          this.axios.post(process.env.VUE_APP_API_BACKEND + "/mgmt/deactivateUser", {
            userId: user.id
          }).then((response) => {
            if (response.data.status === "success") {
              this.$swal("User Deactivated!", "", "success");
              this.getRolesPermission(); // Refresh user list
            } else {
              this.$swal("Error", "Failed to deactivate user", "error");
            }
          });
        }
      });
    },                         
    deleteUser(user) {
      this.$swal({
        title: "Are you sure?",
        text: `Do you want to delete/deactivate the user: ${user.username}?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete",
        cancelButtonText: "Cancel",
        showCloseButton: true,
        showLoaderOnConfirm: true,
      }).then((result) => {
        if (result.isConfirmed) {
          this.axios
            .post(process.env.VUE_APP_API_BACKEND + "/deleteUser", {
              username: user.username,
            })
            .then((response) => {
              if (response.data.status === "Success") {
                this.$swal("Deleted!", "User has been deleted.", "success").then(() => {
                  this.getUser();
                });
              } else {
                this.$swal("Error", "Failed to delete user", "error");
              }
            });
        }
      });
    },

  },
};
</script>

<style scoped="">
p.text-userad {
  text-align: left !important;
}

b.color-complete {
  color: #2e7d32 !important;
}

b.color-Already {
  color: #2e5ee0 !important;
}

b.color-Already {
  color: #e44040 !important;
}

.mgt48 {
  margin-top: 48px !important;
  width: 30% !important;
}

aside.mgt48.elevation-6.navigation-drawer.navigation-drawer--clipped.navigation-drawer--is-booted.navigation-drawer--open.navigation-drawer--right.theme--light {
  padding-bottom: 35px;
}

/* >>>th.column.text-xs-center,
  >>>th.column.text-xs-left {
    font-size: 15px;
    font-weight: 600;
  } */

/* td {
    border: 1px solid #e0e0e0 !important;
  }

  >>>tr:nth-child(even) {
    background-color: #f3f3f3;
  } */

/*scrollbar  */
/* >>>::-webkit-scrollbar {
    width: 8px !important;
    height: 8px !important;
  }

  >>>::-webkit-scrollbar-track {
    background: #d8d8d8 !important;
    border-radius: 2px !important;
  }

  >>>::-webkit-scrollbar-thumb {
    background: #aaa !important;
    border-radius: 6px !important;
  }

  >>>::-webkit-scrollbar-corner {
    background: #d8d8d8 !important;
  } */

.setLine {
  border-left: 2px solid #ff0000;
}

.mt-20 {
  margin-top: -15px;
}

.v-btn-toggle .v-btn {
  margin: 10px;
  border: 1px solid #014c88;
  opacity: 1;
  border-radius: 2%;
  /* border-right: 2px solid #014C88; */
  height: 50px;
  width: 157px;
}

.v-btn-toggle--selected {
  box-shadow: 0px 0px 0px 0px;
}

button.setColor.v-btn.v-btn--active.v-btn--flat.theme--light {
  background-color: #014c88;
  border-radius: 3%;
  color: #fff !important;
  text-transform: none;
}

button.setColor {
  color: #014c88 !important;
  text-transform: none;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter,
  .fade-leave-to

  /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.color-card-title {
  background-color: #abedd3 !important;
  text-transform: none;
}
.container-dynamic {
  max-width: 100%;
  padding: 0 16px; /* Adjust padding as needed */
}

@media (min-width: 600px) {
  .container-dynamic {
    padding: 0 24px;
  }
}

@media (min-width: 1024px) {
  .container-dynamic {
    max-width: 1200px;
    padding: 0 32px;
  }
}
</style>
