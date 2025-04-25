<template lang="html">
  <v-container class="contentPortal">
    
        <v-card>
          <v-card-title class="color-title">
            <h1 class="text-uppercase">{{ $t('category') }}</h1>
          </v-card-title>
          <Addcategory ref="Addcategory"/>
        </v-card>

  </v-container>

</template>

<script>
import Addcategory from './Addcategory.vue'

export default {
  components: {
    Addcategory,
   
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
