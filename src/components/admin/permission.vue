<template lang="html">
  <v-container class="contentPortal">
    <v-tabs v-model="currentTab" color="blue lighten-4"  dark slider-color="light-blue lighten-4" grow >
      <v-tab href="#tab-1" background-color="#000">
        <!-- <v-icon class="mr-2" color="light-blue darken-1">fa-user</v-icon>Users Management -->
        <h3><v-icon class="mr-2" color="white">person</v-icon>{{ $t('role') }}</h3>
      </v-tab>
      <v-tab href="#tab-2" @click="refreshData()">
        <!-- <v-icon class="mr-2" color="white">group</v-icon>Role -->
        <h3><v-icon class="mr-2" color="light-blue darken-1">fa-users</v-icon>{{ $t('menuadmin') }}</h3>  </v-tab>
      <v-tab href="#tab-3">
      <v-icon class="mr-2" color="white">vpn_lock</v-icon>
        <v-icon class="mr-2" color="light-blue darken-1">fa-unlock-alt</v-icon>{{ $t('RoleAndService') }}
      </v-tab>
      <v-tab href="#tab-4">
      <v-icon class="mr-2" color="white">person</v-icon>
        <v-icon class="mr-2" color="light-blue darken-1">fa-unlock-alt</v-icon>{{ $t('UserAndService') }}
      </v-tab>
    </v-tabs>
    <v-tabs-items v-model="currentTab">
      <v-tab-item value="tab-1" color="white">
        <!-- <v-container> -->
        <mgmtPermission ref="mgmtPermission"/>
        <!-- </v-container> -->
      </v-tab-item>
      <v-tab-item value="tab-2">
        <mgmtMenu :key="refresh"/>
      </v-tab-item>
      <v-tab-item value="tab-3">
        <plivilageicon :key="refresh"/>
      </v-tab-item>
      <v-tab-item value="tab-4">
        <userandservice :key="refresh"/>
      </v-tab-item>
      <!-- <v-tab-item value="tab-3" >
        <GroupUser/>
      </v-tab-item> -->
    </v-tabs-items>

  </v-container>

</template>

<script>
import mgmtPermission from '../admin/managementMenu/mgmtPermission'
import mgmtMenu from '../admin/managementMenu/mgmtMenu'
import plivilageicon from '../admin/managementMenu/plivilageicon'
import userandservice from '../admin/managementMenu/userandservice'
// import GroupUser from '../admin/managementGroup/GroupUser'
export default {
  components: {
   mgmtPermission,
   mgmtMenu,
   plivilageicon,
   userandservice
  //  GroupUser
  },
  data: () => ({
    currentTab: 'tab-1',
    refresh: 0
  }),
  mounted () {
    this.mgmtUser()
  },
  watch: {
    currentTab (val) {
      if (val === 'tab-1') {
        this.mgmtUser()
      }
    }
  },
  methods:{
     refreshData (val) {
      this.refresh++
    },
    mgmtUser () {
      this.$refs.mgmtUser.open()
    }
  }
}
</script>

<style lang="css" scoped>
.contentPortal {
  margin-top: 20px;
}
>>>a.v-tabs__item.v-tabs__item--active {
    background: #0D47A1;
}

</style>
