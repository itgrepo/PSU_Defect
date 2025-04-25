<template lang="html">
  <v-container>
    <v-app style="margin-top: 45px">
      <v-card flat>
        <v-container>
          <h1 class="font-contact font-weight-bold" style="color: #144372;">
            {{ $t('contact') }}
          </h1>
          <v-divider></v-divider><br />
          <v-layout row wrap>
            <v-flex sm12 md6>
              <h2> {{ $t('psu') }}</h2> 
              <br />
              <h3>
                <v-icon>apartment</v-icon> {{ $t('psu') }}
              </h3>
              <br />
              <ul>
                <p><v-icon>location_on</v-icon> {{ $t('addr') }}</p>
                <p><v-icon>local_phone</v-icon> 0-7428-2000</p>
                <!-- <p><v-icon>local_phone</v-icon> NOC 0 2257 7111</p> -->
                <p><v-icon>email</v-icon> saraban@psu.ac.th</p>
                <!-- <p><v-icon>phonelink_ring</v-icon> INETclub</p> -->
                <br />
              </ul>
            </v-flex>
            <!-- <v-flex sm12 md6> -->
              <!-- <h2>New Data Suggestion</h2> -->
              <!-- <v-card flat> -->
                <!-- <v-form ref="form" v-model="valid" lazy-validation>
                  <v-textarea
                    outline
                    name="input-7-4"
                    label="New Data Suggestion"
                    v-model="dataSuggestion"
                    :rules="dataSuggestionRules"
                    required
                  ></v-textarea>
                  <div style="padding: 15px">
                    <span><h3>Data Category</h3></span>
                    <span>
                      <v-select
                        :items="category"
                        item-text="name"
                        item-value="category_id"
                        v-model="categorySuggestion"
                        label="Data Category"
                      ></v-select>
                    </span>
                  </div>
                  <v-flex offset-xs10>
                    <v-btn outline :disabled="!valid" @click="send()"
                      >send</v-btn
                    ></v-flex
                  >
                </v-form> -->
              <!-- </v-card> -->
            <!-- </v-flex> -->
          </v-layout>
        </v-container>
      </v-card>
    </v-app>
  </v-container>
</template>

<script>
import { Decode } from "@/services";
export default {
  data() {
    return {
      category: [],
      valid: true,
      dataSuggestion: "",
      categorySuggestion: "",
      dataSuggestionRules: [
        // v =>  /^[A-Za-z0-9_.\s]+$/.test(v)  || 'Please fill in English only.'
      ],
      categorySuggestionRules: []
    };
  },
  computed: {
    userData() {
      if (this.$cookies.isKey("information")) {
        return JSON.parse(Decode.decode(this.$cookies.get("information")));
      } else {
        return "";
      }
    }
  },
  mounted() {
    this.getCategory();
  },
  methods: {
    getCategory() {
      this.axios
        .get(process.env.VUE_APP_API_BACKEND + "/getCategoryName")
        .then(response => {
          this.category = response.data;
        });
    },
    send() {
      // //console.log(this.userData)
      if (this.userData) {
        // //console.log(this.categorySuggestion);
        if (this.categorySuggestion !== "" && this.dataSuggestion !== "") {
          this.axios
            .post(process.env.VUE_APP_API_BACKEND + "/sendDataSuggestion", {
              category_id: this.categorySuggestion,
              "data_ suggestion": this.dataSuggestion
            })
            .then(response => {
              // alert(response.data)
              if (response.data === "success") {
                this.$swal("success", "", "success");
                this.dataSuggestion = "-";
                this.categorySuggestion = "";
                this.dataSuggestionRules = "";
              }
            });
        } else {
          this.$swal("Incomplete information", "", "warning");
        }
      } else {
        this.$swal("Please login", "", "warning");
      }
    }
  }
};
</script>

<style lang="css" scoped="">
>>>.v-text-field.v-text-field--enclosed .v-text-field__details {
  margin-bottom: -19px;
}
.font-contact {
  font-size: 30px !important;
}
.container {
  max-width: 1400px !important;
}
p {
  font-size: 14px;
}
@media(max-width: 768px) {
  p {
    font-size: 14px;
  }
  .container {
    max-width: 738px !important;
  }
}
</style>
