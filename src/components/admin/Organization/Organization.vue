<template lang="html">
  <v-container class="contentPortal">
    
        <v-card>
          <v-card-title class="color-title">
            <h1 class="text-uppercase">{{ $t('org') }}</h1>
          </v-card-title>
          <Addorganizstion ref="Addorganizstion"/>
        </v-card>

  </v-container>

</template>

<script>
import Addorganizstion from './Addorganization.vue'

export default {
  components: {
    Addorganizstion,
   
  },
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
     get_Organize() {

                var user = Encode.encode(JSON.stringify(this.userData));
                this.axios.get(process.env.VUE_APP_API_BACKEND + '/showOrganize', {
                    'organize_id': organize_id,
                }).then((response) => {
                //     // console.log(response);
                this.loading = false
                this.Organize = response.data

                })
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
.color-title {
  font-size: 12px;
  background-color: a6bac5;
  color: #fff;
}

</style>
