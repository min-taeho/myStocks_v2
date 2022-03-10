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
               id="interestStock_list"
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

        <template #cell(currentPrice)="row">
          <template v-if="row.item.currentPrice < row.item.desiredPurchasePrice">
            <b class="text-danger">{{ row.item.currentPrice }}</b>
          </template>
          <template v-else>{{ row.item.currentPrice }}</template>
        </template>

        <template #cell(actions)="row">
          <b-icon style="cursor: pointer;" 
                  icon="trash-fill" 
                  variant="dark"
                  @click="del(row.item, row.index, $event.target)"></b-icon>

        </template>      

      </b-table>

    </b-row>
  </div>
</template>

<script>
  import InterestStockService from "@/services/interestStock.service.js"
  import StockInfo from '../common/StockInfo.vue'
  import Utils from "@/common/utils.js";

  export default {
    name: "interestStock-list",
    components: {
      /**
       * components
       */
    },
    data () {
      return {
        // Note 'isActive' is left out and will not appear in the rendered table
        fields: [
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
            key: 'desiredPurchasePrice',
            label: '매수희망가',
            tdClass: 'text-end', thClass: 'text-center',
          },
          {
            key: 'declineRate',
            label: '최고가Vs하락률',
            tdClass: 'text-end', thClass: 'text-center',
            variant: 'danger'
          },
          {
            key: 'under10Price',
            label: '10% / 20% / 30% 하락',
            tdClass: 'text-center', thClass: 'text-center', thStyle: 'width: 250px',
          },
          {
            key: 'w52',
            label: '최저-52주-최고',
            tdClass: 'text-center', thClass: 'text-center', thStyle: 'width: 200px',
          },
          {
            key: 'dividendYield',
            label: '배당수익률',
            tdClass: 'text-end', thClass: 'text-center',
            variant: 'danger'
          },
          {
            key: 'fiveyearAvgDividendYield',
            label: '5년평균배당률',
            tdClass: 'text-end', thClass: 'text-center',
          },
          {
            key: 'payoutRatio',
            label: '배당성향',
            tdClass: 'text-end', thClass: 'text-center',
          },
          {
            key: 'dividendGrowth',
            label: '배당성장년수',
            tdClass: 'text-end', thClass: 'text-center',
          },
          {
            key: 'annualPayout',
            label: '배당금',
            tdClass: 'text-end', thClass: 'text-center',
          },
          {
            key: 'dividendPayMonth',
            label: '배당주기',
          },
          {
            key: 'actions',
            label: 'Actions',
          },          
        ],
        items: [],
        isBusy: true,
        sortDirection: 'Desc',    // Desc or Asc
        sortBy: 'stock.declineRate',        
      }
    },
    created() {

    },
    mounted() {  
      this.getData()
    },
    methods: {
      refresh() {
        //this.getPortfolioList()
        this.getData()
      },
      getData() {
        let param = { email: this.$store.state.email
                    , sortDirection: this.sortDirection
                    , sortBy: this.sortBy        
                    } 
        InterestStockService.getList(param)
        .then(res => {

          //console.log(res);
          if (res.status === 200) {
            //this.items = res.data.list
            //console.log('res.data='+res.data)
            let tmp_items = []
            res.data.forEach((element, index) => {
              //console.log('index='+index+', element='+JSON.stringify(element))
              
              var obj = {
                interestStockId: element.interestStockId,
                sector: element.stock.businessCycle + '/' + element.stock.sector,
                ticker: element.stock.ticker,
                currentPrice: Utils.showDollarWith2Point(element.stock.currentPrice),
                desiredPurchasePrice: Utils.showDollarWith2Point(element.stock.desiredPurchasePrice),  //매수희망가
                declineRate: Utils.showRateWith2Point(element.stock.declineRate),
                under10Price: Utils.showDollarWith2Point(element.stock.highestPrice * 0.9) + " / " + Utils.showDollarWith2Point(element.stock.highestPrice * 0.8) + " / " + Utils.showDollarWith2Point(element.stock.highestPrice * 0.7),
                w52: Utils.showDollarWith2Point(element.stock.lowerPrice) + ' ↔ ' + Utils.showDollarWith2Point(element.stock.highestPrice),
                dividendYield: Utils.showRateWith2Point(element.stock.dividendYield),
                fiveyearAvgDividendYield: Utils.showRateWith2Point(element.stock.fiveyearAvgDividendYield),
                payoutRatio: Utils.showRateWith2Point(element.stock.payoutRatio),
                dividendGrowth: element.stock.dividendGrowth,
                annualPayout: Utils.showDollarWith2Point(element.stock.annualPayout),
                dividendPayMonth: element.stock.dividendPayMonth,
              }
              //console.log('obj='+obj)
              tmp_items.push(obj)
              
            })
            this.items = tmp_items

            this.isBusy = false
          } else {
          }
        })    
      },      
      del(item, index, event) {
        
        //console.log('del::index='+index+', item='+JSON.stringify(item))

        if(confirm("삭제하시겠습니까?")) {
          InterestStockService.remove(item.interestStockId)
          .then(
            res => {
              if (res.status === 200) {
                this.refresh()
                alert("삭제되었습니다.")
              } else {
                alert("실행중 실패했습니다.\n다시 이용해 주세요.")
              }
            })
        }

      },
      rowDblClickHandler(obj, index, event) {
        //console.log('rowDblClickHandler::obj='+JSON.stringify(obj))
        //this.fields.push({ key: 'actions', label: 'Actions' })
        let params = {
            ticker: obj.ticker,
            parents: 'interestStock',
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
      headClickHandler(key, field, event) {
        //console.log('>>> headClcikHandler key='+key+', field='+JSON.stringify(field))
        // this.sortDirection
        this.sortDirection = this.sortDirection === 'Desc' ? 'Asc' : 'Desc'

        this.sortBy = 'stock.'+key
        this.getData()
      },
      makeExcelFile() {
        Utils.makeExcelFileFromTable('interestStock_list')
      }   

    }
  }
</script>
<style lang="scss">

</style>    