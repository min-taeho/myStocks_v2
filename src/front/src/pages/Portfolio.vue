<template>
  <div>

    <b-container>
      <b-row>
        <b-col cols="2" align="start">
          <h2>Portfolio</h2>
        </b-col>
        <b-col align="start">
          <b-form-select class="mt-3" 
                         v-model="selectedPortfolioId" 
                         :options="options"
                         @change="onChange()"></b-form-select>
        </b-col>
        <b-col align="end">
          <b-button class="mt-3" size="sm" variant="secondary" 
                    id="add-portfolio" @click="$refs['add-portfolio'].show()">Add Portfolio</b-button>&nbsp;
          <b-button class="mt-3" size="sm" variant="secondary" 
                    id="add-ticker" @click="$refs['add-ticker'].show()">Add Ticker</b-button>
        </b-col>
      </b-row>

      <b-row>
        <portfolio-list ref="listRefreshRequest"
                        v-on:emitPortfolioList="setPortfolioList"
                        ></portfolio-list>
      </b-row>

      <!-- The modal -->
      <b-modal ref="add-portfolio" hide-footer title="Add Portfolio">
        <b-form @submit="onSubmitPortfolio">
          <b-form-input class="mt-3" size="sm" 
                        required
                        v-model="portfolioName4Add" placeholder="Enter portfolio name"></b-form-input>
          <b-button type="submit" class="mt-3" size="sm" variant="secondary">Save</b-button>
        </b-form>
      </b-modal>
      

      <b-modal ref="add-ticker" hide-footer title="Add Ticker">
        <b-form @submit="onSubmitTicker">
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
  import PortfolioService from "@/services/portfolio.service.js";
  import PortfolioList from "./portfolio/PortfolioList.vue"

  export default {
    name: "portfolio",
    components: {
      /**
       * components
       */
      PortfolioList,
    },
    data () {
      return {
        portfolioList: [],        
        selectedPortfolioId: '',
        portfolioName4Add: '',
        ticker4Add: '',
        options: [],
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
      listRefreshRequest(selectedPortfolioId) {
        this.$refs.listRefreshRequest.refresh(selectedPortfolioId)
      },
      setPortfolioList(obj) {
        //console.log("setPortfolioList::obj="+JSON.stringify(obj))
        this.portfolioList = obj
        this.selectedPortfolioId = obj[0].portfolioId
        
        let _options = []
        obj.forEach((element, index) => {
          var _optionItem = { value: element.portfolioId, text: element.name }
          _options.push(_optionItem)
        })
        this.options = _options

      },
      changePortfolio(event) {
        //console.log('changePortfolio='+event.target.value)
        this.selectedPortfolioId = event.target.value;
        //console.log('this.selectedPortfolioId='+this.selectedPortfolioId)
        this.listRefreshRequest(this.selectedPortfolioId)
      },
      onSubmitPortfolio(event) {
        event.preventDefault()

        let param = { email: this.$store.state.email,
                      name: this.portfolioName4Add } 

        PortfolioService.addPortfolio(param)
        .then(res => {
          //console.log('addPortfolio::res'+res);
          if (res.status === 200) {
            
            this.$refs.listRefreshRequest.getPortfolioList()
            this.portfolioName4Add = ''
            this.$refs['add-portfolio'].hide()
            alert('포트폴리오가 등록되었습니다.');
          } else {

          }
        })      
      },
      onSubmitTicker(event) {
        let param = { email: this.$store.state.email,
                      portfolioId: this.selectedPortfolioId,
                      ticker: this.ticker4Add } 

        PortfolioService.register(param)
        .then(res => {
          //console.log('addTicker::res'+res);
          if (res.status === 200) {
            
            this.$refs.listRefreshRequest.refresh(this.selectedPortfolioId)
            this.ticker4Add = ''
            //this.$refs['add-ticker'].hide()
            //alert('Ticker가 등록되었습니다.');
          } else {

          }
        })

      },
      onChange() {
        this.listRefreshRequest(this.selectedPortfolioId);
      }
    
    },
  }
</script>
<style lang="scss">

</style>