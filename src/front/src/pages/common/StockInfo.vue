<template>
  <div>

    <b-container class="bv-example-row small">

      <b-row>
        <div class="text-end" >
          <b-button class="mt-3 mb-3" size="sm" variant="outline-warning" block @click="newWindow('yahoofinance')">Yahoo Finance</b-button>&nbsp;
          <b-button class="mt-3 mb-3" size="sm" variant="outline-warning" block @click="newWindow('seekingalpha')">Seekingalpha</b-button>
        </div>
      </b-row>

      <b-row v-if="mode === 'view'">
        <b-col>
          <b-row>
            <b-table-simple hover small caption-top responsive>
            <caption><h4>{{ ticker }} [{{ stockName }}]</h4></caption>
              <b-tbody>
                <b-tr>
                  <b-th>현재가</b-th>
                  <b-td class="text-end">{{ currentPrice | currencyDollar }}</b-td>
                  <b-td></b-td>
                  <b-th>매수희망가</b-th>
                  <b-td class="text-end">{{ desiredPurchasePrice | currencyDollar }}</b-td>
                </b-tr>                    
                <b-tr>
                  <b-th>52w 최고</b-th>
                  <b-td class="text-end">{{ highestPrice | currencyDollar }}</b-td>
                  <b-td></b-td>
                  <b-th>52w 최저</b-th>
                  <b-td class="text-end">{{ lowerPrice | currencyDollar }}</b-td>
                </b-tr>
                <b-tr>
                  <b-th>Div Yield (FWD)</b-th>
                  <b-td class="text-end">{{ dividendYield | rate }}</b-td>
                  <b-td></b-td>
                  <b-th>5Y Avg Dividend Yield</b-th>
                  <b-td class="text-end">{{ fiveyearAvgDividendYield | rate }}</b-td>
                </b-tr>
                <b-tr>
                  <b-th>Annual Payout (FWD)</b-th>
                  <b-td class="text-end">{{ annualPayout | currencyDollar }}</b-td>
                  <b-td></b-td>
                  <b-th>Payout Ratio</b-th>
                  <b-td class="text-end">{{ payoutRatio | rate }}</b-td>
                </b-tr>
                <b-tr>
                  <b-th>Dividend Growth</b-th>
                  <b-td class="text-end">{{ dividendGrowth }}</b-td>
                </b-tr>
                <b-tr>
                  <b-td colspan="6" class="text-end">
                    <b-button class="mt-1 mb-1" size="sm" variant="outline-info"
                              id="show-btn" @click="$refs['view-stockInfo'].show()">View Stock Info</b-button>
                  </b-td>
                </b-tr>
              </b-tbody>
            </b-table-simple>
          </b-row>
          <b-row>
            <div class="text-center" >
              <b-button class="mt-3" size="sm" variant="secondary" block @click="$emit('close')">Close</b-button>&nbsp;
              <b-button class="mt-3" size="sm" variant="secondary" block @click="fnModeChgToUpdate">Modify</b-button>
            </div>
          </b-row>
        </b-col>
        <b-col>
            <fair-price-figure v-bind:row_data="row"></fair-price-figure>
        </b-col>
        
      </b-row> <!-- end of view mode -->

      <b-row v-else>
        <b-row>
          <b-table-simple hover small caption-top responsive>
            <caption><h4>{{ ticker }} [{{ stockName }}]</h4></caption>
            <b-tbody>
              <b-tr>
                <b-th>현재가</b-th>
                <b-td>{{ currentPrice | currencyDollar }}</b-td>
                <b-th>최고가 ↔ 최저가</b-th>
                <b-td>{{ highestPrice | currencyDollar }} ↔ {{ lowerPrice | currencyDollar }}</b-td>
              </b-tr>                    
              <b-tr>
                <b-th>매수희망가</b-th>
                <b-td>
                  <b-col sm="5">
                    <b-form-input size="sm" v-model="desiredPurchasePrice" placeholder=""></b-form-input>
                  </b-col>
                </b-td>
                <b-th>경기순환/섹터</b-th>
                <b-td>
                  <b-form-select v-model="businessCycle" :options="options"></b-form-select>
                  <b-form-select v-model="sector" :options="options2"></b-form-select>
                </b-td>
              </b-tr>
              <b-tr>
                <b-th>Div Yield (FWD)</b-th>
                <b-td>
                  <b-col sm="5">
                    <b-form-input size="sm" v-model="dividendYield" placeholder=""></b-form-input>
                  </b-col>
                </b-td>
                <b-th>5Y Avg Dividend Yield</b-th>
                <b-td>
                  <b-col sm="5">
                    <b-form-input size="sm" v-model="fiveyearAvgDividendYield" placeholder=""></b-form-input>
                  </b-col>
                </b-td>
              </b-tr>

              <b-tr>
                <b-th>Annual Payout (FWD)</b-th>
                <b-td>
                  <b-col sm="5">
                    <b-form-input size="sm" v-model="annualPayout" placeholder=""></b-form-input>
                  </b-col>
                </b-td>
                <b-th>Payout Ratio</b-th>
                <b-td>
                  <b-col sm="5">
                    <b-form-input size="sm" v-model="payoutRatio" placeholder=""></b-form-input>
                  </b-col>
                </b-td>
              </b-tr>
              <b-tr>
                <b-th>5년 성장률</b-th>
                <b-td>
                  <b-col sm="5">
                    <b-form-input size="sm" v-model="fiveyearGrowthRate" placeholder=""></b-form-input>
                  </b-col>
                </b-td>
                <b-th>배당성장 년수</b-th>
                <b-td>
                  <b-col sm="5">
                    <b-form-input size="sm" v-model="dividendGrowth" placeholder=""></b-form-input>
                  </b-col>
                </b-td>
              </b-tr>  
              <b-tr>
                <b-td colspan="4">
                  <b-form-textarea size="sm" 
                        id="companyInfo"
                        v-model="companyInfo"
                        placeholder=""
                        rows="10">
                  </b-form-textarea>
                </b-td>
              </b-tr>          
            </b-tbody>
          </b-table-simple>
        </b-row>
        <b-row>
          <div class="text-center" >
            <b-button class="mt-3 mb-3" size="sm" variant="secondary" block @click="$emit('close')">Close</b-button>&nbsp;
            <b-button class="mt-3 mb-3" size="sm" variant="secondary" block @click="fnModeChgToUpdate">Back</b-button>&nbsp;
            <b-button class="mt-3 mb-3" size="sm" variant="secondary" block @click="fnModProc">저장</b-button>
          </div>
        </b-row>


      </b-row>

      <!-- The modal -->
      <b-modal ref="view-stockInfo" hide-footer title="Stock Info">
        <b-form-textarea id="companyInfo" class="small" plaintext rows="15" :value="companyInfo">
        </b-form-textarea>
      </b-modal>



    </b-container>

  </div>
</template>
<script>
  import FairPriceFigure from './FairPriceFigure.vue'

  import StockService from "@/services/stock.service.js"

  export default {
    name: "stockInfo",
    props: [
        'props_param',
    ],  
    components: {
      /**
       * components
       */
      FairPriceFigure
    },
    data () {
      return {
        mode: 'view', //화면모드(업체정보조회:view, 업체정보 수정:update)
        stockId: '',
        ticker: '',
        stockName: '',
        currentPrice: '',
        businessCycle: '',
        sector: '',
        highestPrice: '',
        lowerPrice: '',
        dividendYield: '',
        fiveYearAvgDividendYield: '',
        dividendGrowth: '',
        payoutRatio: '',
        annualPayout: '',
        fiveyearGrowthRate: '',
        desiredPurchasePrice: '',
        companyInfo: '',
        row: '',
        options: [ { value: '회복', text: '회복'},
                   { value: '호황', text: '호황'},
                   { value: '후퇴', text: '후퇴'},
                   { value: '불황', text: '불황'} ],         
        options2: [ { value: '금융', text: '금융'},
                    { value: '부동산', text: '부동산'},
                    { value: '자유소비재', text: '자유소비재'},
                    { value: '산업재', text: '산업재'},
                    { value: '정보기술', text: '정보기술'},
                    { value: '커뮤니케이션', text: '커뮤니케이션'},
                    { value: '소재', text: '소재'},
                    { value: '에너지', text: '에너지'},
                    { value: '필수소비재', text: '필수소비재'},
                    { value: '헬스케어', text: '헬스케어'},
                    { value: '유틸리티', text: '유틸리티'},
                    { value: 'ETF', text: 'ETF'} ],
      }
    },
    created() {
      console.log('>>> Stock Info created... hot_table='+JSON.stringify(this.props_param))
    },
    mounted() {
      /**
       * mounted
       */
      console.log('>>> Stock Info mount... hot_table='+JSON.stringify(this.props_param))
      this.getData()
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
      fnModeChgToUpdate() {
        this.mode = (this.mode === 'view' ? 'update' : 'view');

        if ( this.mode !== 'view' && this.desiredPurchasePrice == null) this.desiredPurchasePrice = Number(this.highestPrice * 0.8).toFixed(2)
        
      },
      getData() {
        let param = { ticker: this.props_param.ticker
                    } 
        StockService.getStock(param)
        .then(res => {

          //console.log('getData.res='+JSON.stringify(res));
          if (res.status === 200) {
            //this.items = res.data.list
            this.stockId = res.data.stockId
            this.ticker = res.data.ticker
            this.stockName = res.data.stockName

            this.businessCycle = res.data.businessCycle
            this.sector = res.data.sector

            this.currentPrice = res.data.currentPrice
            this.highestPrice = res.data.highestPrice
            this.lowerPrice = res.data.lowerPrice
            this.desiredPurchasePrice = res.data.desiredPurchasePrice

            this.dividendYield = res.data.dividendYield
            this.fiveyearAvgDividendYield = res.data.fiveyearAvgDividendYield
            this.payoutRatio = res.data.payoutRatio
            this.annualPayout = res.data.annualPayout
            this.dividendGrowth = res.data.dividendGrowth
            this.fiveyearGrowthRate = res.data.fiveyearGrowthRate
            this.companyInfo = res.data.companyInfo

            this.row = {stockNm: res.data.stockName, 
                        lowerPrice: res.data.lowerPrice, 
                        highestPrice: res.data.highestPrice,
                        currentPrice: res.data.currentPrice};

          } else {
          }
        }) 
      },
      fnModProc() {
        console.log('>>> fnModPorc...')
        let params = {stockId: this.stockId,
                    ticker: this.ticker,
                    businessCycle: this.businessCycle,
                    sector: this.sector,
                    desiredPurchasePrice: this.desiredPurchasePrice,
                    dividendYield: this.dividendYield,
                    fiveyearAvgDividendYield: this.fiveyearAvgDividendYield,
                    dividendGrowth: this.dividendGrowth,
                    payoutRatio: this.payoutRatio,
                    annualPayout: this.annualPayout,
                    fiveyearGrowthRate: this.fiveyearGrowthRate,
                    companyInfo: this.companyInfo
                  } 


        console.log('>>> fnModProc::params='+JSON.stringify(params))
        if(confirm("수정 하시겠습니까?")) {
          
          StockService.modify(params)
          .then(
            res => {
              if (res.status === 200) {
                //alert('수정 되었습니다.');
              } else {
                alert("실행중 실패했습니다.\n다시 이용해 주세요");
              }
          })
                  
          this.$emit('close');
        }

      },  
      newWindow(type) {
        let url = ""
        if ( type === 'seekingalpha' ) {
          //url = "https://seekingalpha.com/symbol/"+this.ticker+"/dividends/yield"
          url = "https://seekingalpha.com/symbol/"+this.ticker+"/dividends/scorecard"

        }
        else if ( type === 'yahoofinance' ) {
          //url = "https://finance.yahoo.com/quote/"+this.ticker+"?p="+this.ticker
          url = "https://finance.yahoo.com/quote/"+this.ticker+"/key-statistics?p="+this.ticker
        }
        window.open(url, type);
      }          
    },

  }
</script>
<style lang="scss">

</style>