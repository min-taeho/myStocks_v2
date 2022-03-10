<template>
  <div>

    <b-container class="bv-example-row">
      <b-row>
        <b-col align="start">
          <h2>관심종목</h2>
        </b-col>
        <b-col align="end">
          <b-button class="mt-3" size="sm" variant="secondary" 
                    id="show-btn" @click="$refs['add-ticker'].show()">Add Ticker</b-button>
        </b-col>
      </b-row>

      <b-row>
        <interestStock-list ref="listRefreshRequest"
                        ></interestStock-list>
      </b-row>

      <!-- The modal -->
      <b-modal ref="add-ticker" hide-footer title="Add Ticker">
        <b-form @submit="onSubmit">
          <b-form-input class="mt-3" size="sm" 
                        required
                        v-model="ticker4Add" placeholder="Enter Ticker"></b-form-input>
          <b-button type="submit" class="mt-3" size="sm" variant="secondary">Save</b-button>
        </b-form>
      </b-modal>



    </b-container>

  </div>
</template>
<script>
  import InterestStockService from "@/services/interestStock.service.js";
  import InterestStockList from "./interestStock/InterestStockList.vue"

  export default {
    name: "interestStock",
    components: {
      /**
       * components
       */
      InterestStockList,
    },
    data () {
      return {
        ticker4Add: '',
      }
    },
    created() {
      
    },
    mounted() {
      /**
       * mounted
       */
    },
    computed: {
      /**
       * computed
       */
    },
    methods: {
      /**
       * methods
       */
      refresh() {
        this.listRefreshRequest()
      },
      listRefreshRequest() {
        this.$refs.listRefreshRequest.refresh()
      },
      addTicker() {
        let param = { email: this.$store.state.email,
                      ticker: this.ticker4Add } 

        console.log('interestStock.vue::addTicker::param='+JSON.stringify(param))

        InterestStockService.register(param)
        .then(res => {
          console.log('addTicker::res'+res);
          if (res.status === 200) {
            
            //this.$refs.listRefreshRequest.refresh(this.selectedPortfolioId)
            //this.ticker4Add = ''
            //this.$refs['add-ticker'].hide()
            this.listRefreshRequest()
            //alert('Ticker가 등록되었습니다.');
          } else {

          }
        })

      },
      onSubmit(event) {
        event.preventDefault()
        //alert(JSON.stringify(this.form))
        this.addTicker()
      },      
    }
  }
</script>
<style lang="scss">

</style>