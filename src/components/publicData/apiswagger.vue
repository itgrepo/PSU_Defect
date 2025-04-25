<template>
  <v-container class="viewDashboard">
    <v-layout row justify-center>
      <!-- Loading Dialog -->
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
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      loading: true, // เปิดการแสดง loading ตอนเริ่มต้น
    };
  },
  mounted() {
    this.showLoadingAndRedirect();
  },
  methods: {
    showLoadingAndRedirect() {
      // แสดง loading เป็นเวลา 3 วินาที ก่อน redirect (ปรับเวลาได้ตามต้องการ)
      setTimeout(() => {
        this.loading = false; // ปิด loading dialog
        window.location.href = 'http://lake_backend.psu.ac.th:5001/'; // Redirect ไปยัง URL เป้าหมาย
      }, 3000); // หน่วงเวลา 3 วินาที (3000 milliseconds)
    },
  },
};
</script>

<style scoped>
.viewDashboard {
  height: 100% !important;
}

.loading-dialog {
  background: transparent !important; /* ทำให้หน้าต่าง loading โปร่งใส */
}
</style>
