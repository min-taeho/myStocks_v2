<template>
  <div>
    <b-row>
      <b-col align="end">
          <b-button class="mt-3" size="sm" variant="outline-secondary" 
                    id="excel" block @click="makeExcelFile">Excel</b-button>&nbsp;
      </b-col>                    
    </b-row>
    <b-row>

      <b-table striped hover 
               id="portfolio_list"
              :items="items" 
              :fields="fields"
              :busy="isBusy"
              sticky-header="650px"
              @row-dblclicked="(item, index, event) => rowDblClickHandler(item, index, event)"
              @head-clicked="(key, field, event) => headClickHandler(key, field, event)"
              >

        <template #table-busy>
          <div class="text-center text-danger my-2">
            <b-spinner class="align-middle"></b-spinner>
            <strong>Loading...</strong>
          </div>
        </template>

        <template #cell(index)="row">
          {{ row.index + 1 }}
        </template>

        <template #cell(actions)="row">
          <b-icon style="cursor: pointer;" 
                  icon="receipt" 
                  variant="dark"
                  @click="show_modal(row.item)"></b-icon>

          <b-icon style="cursor: pointer;" 
                  icon="trash-fill" 
                  variant="dark"
                  @click="del(row.item, row.index, $event.target)"></b-icon>                
        </template>
      </b-table>

      <!-- The modal -->
      <b-modal ref="modify-stock" hide-footer v-bind:title="mod_stockName">
        <b-form-input v-model="mod_unitPrice" placeholder="매수단가"></b-form-input>
        <b-form-input v-model="mod_stockNum" placeholder="주식수"></b-form-input>
        <div>
          <b-button class="mt-3" variant="outline-danger" block @click="mod">Save</b-button>
        </div>
      </b-modal>
      
    </b-row>
  </div>
</template>

<script>
  import PortfolioService from "@/services/portfolio.service.js";
  import StockInfo from '../common/StockInfo.vue'
  import Utils from "@/common/utils.js";

  export default {
    name: "portfolio-list",
    components: {
      /**
       * components
       */
    },
    data () {
      return {
        // Note 'isActive' is left out and will not appear in the rendered table
        sortBy: 'earningRate',
        sortDesc: false,        
        fields: [
          // A virtual column that doesn't exist in items
          'index',
          {
            key: 'sector',
            label: '경기순환/섹터',
            thStyle: 'width: 70px',
          },
          {
            key: 'ticker',
            label: '티커',
            thStyle: 'width: 80px',
          },
          {
            key: 'currentPrice',
            label: '현재가',
            tdClass: 'text-end', thClass: 'text-center',
            variant: 'info'
          },
          {
            key: 'declineRate',
            label: '최고가Vs하락률',
            tdClass: 'text-end', thClass: 'text-center',
            variant: 'warning'
          },
          {
            key: 'w52',
            label: '최저-52주-최고',
            tdClass: 'text-center', thClass: 'text-center', thStyle: 'width: 200px',
          },                    
          {
            key: 'unitPrice',
            label: '매수단가',
            tdClass: 'text-end', thClass: 'text-center',
          },
          {
            key: 'stockNum',
            label: '주식수',
            tdClass: 'text-end', thClass: 'text-center',
          },
          {
            key: 'totalTradingAmount',
            label: '매수금액',
            tdClass: 'text-end', thClass: 'text-center',
            variant: 'danger'
          },
          {
            key: 'evalAmount',
            label: '평가금액',
            tdClass: 'text-end', thClass: 'text-center',
          },
          {
            key: 'earningAmount',
            label: '수익금액',
            tdClass: 'text-end', thClass: 'text-center',
          },
          {
            key: 'earningRate',
            label: '수익률',
            tdClass: 'text-end', thClass: 'text-center',
            variant: 'warning'
          },
          {
            key: 'annualPayout',
            label: '주당배당금',
            tdClass: 'text-end', thClass: 'text-center',
          },
          {
            key: 'totalPayout',
            label: '총배당금',
            tdClass: 'text-end', thClass: 'text-center',
          },
          {
            key: 'investmentDivYield',
            label: '투자배당률',
            tdClass: 'text-end', thClass: 'text-center',
          },
          {
            key: 'dividendPayMonth',
            label: '배당주기',
          },
          {
            key: 'portion',
            label: '비중',
          },
          {
            key: 'actions',
            label: 'Actions',
          },
        ],
        items: [],
        portfolioList: [],
        selectedPortfolioId: '',
        mod_stockName: '',
        mod_unitPrice: '',
        mod_stockNum: '',
        mod_portfolioStockId: '',
        isBusy: true,
        sortDirection: 'Desc',    // Desc or Asc
        sortBy: 'earningRate',
      }
    },
    created() {

    },
    mounted() {  
      this.getPortfolioList()
    },
    methods: {
      refresh(portfolioId) {
        //console.log('this.selectedPortfolioId='+this.selectedPortfolioId+', portfolioId='+portfolioId)
        // 모달창 close에서 refresh 호출하면 파라미터로 object가 전달된다. 왜인지?, 그래서 예외 처리 함
        if ( typeof portfolioId !== 'object') {
          if ( portfolioId ) this.selectedPortfolioId = portfolioId
          
        }
        this.getData(this.selectedPortfolioId)
      },
      getExcelData() {

      },
      getPortfolioList() {
        let param = { email: this.$store.state.email } 
        //console.log('param='+JSON.stringify(param))

        PortfolioService.getPortfolioList(param)
        .then(res => {
          //console.log(res);
          if (res.status === 200) {
            this.portfolioList = res.data
            this.selectedPortfolioId = res.data[0].portfolioId
            this.getData(this.selectedPortfolioId)

            this.$emit('emitPortfolioList', this.portfolioList)
          } else {

          }
        })    
      },
      getData(portfolioId) {
        console.log(">>>>> getData::portfolioList::getData::protfolioId="+portfolioId+", selectedPortfolioId="+this.selectedPortfolioId)
        let param = { email: this.$store.state.email
                    , portfolioId: portfolioId
                    , sortDirection: this.sortDirection
                    , sortBy: this.sortBy
                    } 

        //console.log(">>>>> getData::portfolioList::getData::param="+JSON.stringify(param))
        
        PortfolioService.getPortfolioStockList(param)
        .then(res => {
          //console.log(res);
          if (res.status === 200) {
            //this.items = res.data.list
            //console.log('res.data='+res.data)
            let tmp_items = []
            res.data.forEach((element, index) => {

              console.log('PortfolioList::getData::index='+index+', element='+JSON.stringify(element))
              
              var obj = {
                portfolioStockId: element.portfolioStockId,
                stockName: element.stockName,
                sector: element.stock.businessCycle + '/' + element.stock.sector,
                ticker: element.stock.ticker,
                currentPrice: Utils.showDollarWith2Point(element.stock.currentPrice),
                declineRate: Utils.showRateWith2Point(element.stock.declineRate),
                w52: Utils.showDollarWith2Point(element.stock.lowerPrice) + ' ↔ ' + Utils.showDollarWith2Point(element.stock.highestPrice),
                unitPrice: Utils.showDollarWith2Point(element.unitPrice),
                stockNum: Utils.numberWithCommas(element.stockNum),
                totalTradingAmount: Utils.showDollarWith2Point(element.totalTradingAmount),
                evalAmount: Utils.showDollarWith2Point(element.evalAmount),
                earningAmount : Utils.showDollarWith2Point(element.earningAmount),
                earningRate: Utils.showRateWith2Point(element.earningRate),
                annualPayout: Utils.showDollarWith2Point(element.stock.annualPayout),
                totalPayout :Utils.showDollarWith2Point(element.totalPayout),
                investmentDivYield: Utils.showRateWith2Point(element.investmentDivYield),
                dividendPayMonth: element.stock.dividendPayMonth,
                portion: 0
              }
              //.log('obj='+obj)
              tmp_items.push(obj)
            })
            this.items = tmp_items
            this.$emit('emitData', this.items)
            this.isBusy = false
          } else {
          }
        })    
      }, 
      rowDblClickHandler(obj, index, event) {
        //console.log('rowDblClickHandler::obj='+JSON.stringify(obj))
        //this.fields.push({ key: 'actions', label: 'Actions' })
        let params = {
            ticker: obj.ticker,
            parents: 'portfolio',
            actions: 'view'
        }
        this.$modal.show(StockInfo, 
            {
              props_param : params,
              modal : this.$modal,
              scrollable: "true"
            },
            {
              name: 'stock-info-popup',
              width : '1200px',
              height : 'auto',
              draggable: true,
              scrollable: true
            },
            {
              //'before-close': this.refresh
              'closed': this.refresh
            });
      },
      show_modal(obj) {
        //this.mod_stockName = obj.ticker + '[' + obj.stockName + ']'
        this.mod_stockName = obj.ticker
        this.mod_portfolioStockId = obj.portfolioStockId
        this.mod_unitPrice = obj.unitPrice.replace(/[^\d.-]/g, '')
        this.mod_stockNum = obj.stockNum.replace(/[^\d.-]/g, '')
        this.$refs['modify-stock'].show()
      },
      mod() {
        let param = { email: this.$store.state.email
                    , portfolioStockId: this.mod_portfolioStockId
                    , stockNum: this.mod_stockNum
                    , unitPrice: this.mod_unitPrice
                    } 


        if(confirm("수정하시겠습니까?")) {
          PortfolioService.modify(param)
          .then(
            res => {
              if (res.status === 200) {
                this.refresh(this.selectedPortfolioId)

                this.mod_portfolioStockId = ''
                this.mod_unitPrice = ''
                this.mod_stockNum = ''
                this.$refs['modify-stock'].hide()
                //alert("수정되었습니다.")
              } else {
                alert("실행중 실패했습니다.\n다시 이용해 주세요.")
              }
            })
        }                    
      },
      del(item, index, event) {
        
        //console.log('del::index='+index+', item='+JSON.stringify(item))
        //console.log('>>>>>>>>>>>>>>>>>>')
        //console.log('this.selectedPortfolioId='+this.selectedPortfolioId)

        let param = { email: this.$store.state.email
                    , portfolioStockId: item.portfolioStockId
                    } 

        if(confirm("삭제하시겠습니까?")) {
          PortfolioService.remove(param)
          .then(
            res => {
              if (res.status === 200) {
                this.refresh(this.selectedPortfolioId)
                alert("삭제되었습니다.")
              } else {
                alert("실행중 실패했습니다.\n다시 이용해 주세요.")
              }
            })
        }

      },
      headClickHandler(key, field, event) {
        //console.log('>>> headClcikHandler key='+key+', field='+JSON.stringify(field))
        // this.sortDirection
        this.sortDirection = this.sortDirection === 'Desc' ? 'Asc' : 'Desc'

        let _keys = new Map()
        _keys.set('sector', 'stock.sector')
        _keys.set('ticker', 'stock.ticker')
        _keys.set('currentPrice', 'stock.currentPrice')
        _keys.set('annualPayout', 'stock.annualPayout')
        _keys.set('dividendPayMonth', 'stock.dividendPayMonth')
        _keys.set('declineRate', 'stock.declineRate')

        this.sortBy = ( _keys.get(key) ) ? _keys.get(key) : key
        this.getData(this.selectedPortfolioId)
      },
      makeExcelFile() {
        /* json data to excel */
        /*
        console.log(">>> makeExcelFie... items="+this.items)
        const workBook = Xlsx.utils.book_new()
        const workSheet = Xlsx.utils.json_to_sheet(this.items)
        Xlsx.utils.book_append_sheet(workBook, workSheet, 'example')
        Xlsx.writeFile(workBook, 'example.xlsx')
        */
       /*
       var excelData = Xlsx.utils.table_to_sheet(document.getElementById('portfolio_list')); // table id를 넣어주면된다
       console.log('excelData='+excelData)
       var workBook = Xlsx.utils.book_new(); // 새 시트 생성 
       Xlsx.utils.book_append_sheet(workBook, excelData, 'portfolio_list');  // 시트 명명, 데이터 지정
       Xlsx.writeFile(workBook, 'portfolio_list.xlsx'); // 엑셀파일 만듬
       */
      Utils.makeExcelFileFromTable('portfolio_list')

      }        
      
    }
  }
</script>
<style lang="scss">

</style>    

