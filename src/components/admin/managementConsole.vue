<template lang="html">
  <v-container class="contentPortal">
    <!-- <v-tabs v-model="currentTab" color="#59AFC6">
      <v-tab href="#tab-1"> -->
        <!-- <v-icon class="mr-2" color="light-blue darken-1">fa-user</v-icon>Users Management -->
      <!-- <h3><v-icon class="mr-2" color="white">person</v-icon>Users Profile</h3>
      </v-tab> -->
      <!-- <v-tab href="#tab-2">
        <v-icon class="mr-2" color="white">group</v-icon>Role -->
        <!-- <v-icon class="mr-2" color="light-blue darken-1">fa-users</v-icon>Groups Management -->
      <!-- </v-tab>
      <v-tab href="#tab-3">
      <v-icon class="mr-2" color="white">vpn_lock</v-icon>Permission -->
        <!-- <v-icon class="mr-2" color="light-blue darken-1">fa-unlock-alt</v-icon>Permission Management -->
      <!-- </v-tab> -->
    <!-- </v-tabs>
    <v-tabs-items v-model="currentTab">
      <v-tab-item value="tab-1" > -->
        <!-- <v-container> -->
        <v-card>
          <v-card-title class="color-title">
            <h1 class="text-uppercase">Users Profile</h1>
          </v-card-title>
          <mgmtUser ref="mgmtUser"/>
        </v-card>
        <!-- </v-container> -->
      <!-- </v-tab-item>
      <v-tab-item value="tab-2" >
        <mgmtGroup/>
      </v-tab-item> -->
      <!-- <v-tab-item value="tab-3" >
        <mgmtRole/>
      </v-tab-item> -->
    <!-- </v-tabs-items> -->

  </v-container>

</template>

<script>
import mgmtUser from '../admin/managementMenu/mgmtUser'
import mgmtGroup from '../admin/managementMenu/mgmtGroup'
import mgmtRole from '../admin/managementMenu/mgmtRole'
export default {
  components: {
    mgmtUser,
    mgmtGroup,
    mgmtRole
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
.color-title {
  font-size: 12px;
  background-color: a6bac5;
  color: #fff;
}

</style>
