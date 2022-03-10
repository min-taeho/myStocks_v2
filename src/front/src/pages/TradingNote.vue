<template>
  <div>

    <b-container class="bv-example-row">
      <b-row>
        <b-col align="start">
          <h2>매매일지</h2>
        </b-col>
        <b-col align="end">
        </b-col>
      </b-row>

      <b-row>
        <b-form @submit="onSubmit" @reset="onReset">

          <b-table-simple hover small caption-top responsive>
            <caption>Register or Modify Trading note</caption>
            <b-thead head-variant="dark">
              <b-tr>
                <b-th>포트폴리오</b-th>
                <b-th>거래일</b-th>
                <b-th>티커</b-th>
                <b-th>체결단가</b-th>
                <b-th>수량</b-th>
                <b-th>매매구분</b-th>
                <b-th>거래금액</b-th>
                <b-th>수수료</b-th>
                <b-th>환율</b-th>
                <b-th>action</b-th>
              </b-tr>
            </b-thead>
            <b-tbody>
              <b-tr>
                <b-td>
                  <b-form-select class="mt-3 mb-3" size="sm" 
                                 v-model="form.portfolioId" :options="options"></b-form-select>
                </b-td>
                <b-td>
                  <b-form-input class="mt-3 mb-3" size="sm" 
                                required
                                type="date"
                                v-model="form.tradingDate" placeholder="YYYYMMDD"></b-form-input>
                </b-td>
                <b-td>
                  <b-form-input class="mt-3 mb-3" size="sm" 
                                required
                                v-model="form.ticker" placeholder="AAPL"></b-form-input>
                </b-td>
                <b-td>
                  <b-form-input class="mt-3 mb-3" size="sm" 
                                required
                                type="number"
                                v-model="form.unitPrice" placeholder=""></b-form-input>
                </b-td>
                <b-td>
                  <b-form-input class="mt-3 mb-3" size="sm" 
                                required
                                v-model="form.stockNum" placeholder=""></b-form-input>
                </b-td>
                <b-td>
                  <b-form-select class="mt-3 mb-3" size="sm" 
                                 required
                                 v-model="form.tradingType" :options="options2"></b-form-select>
                </b-td>
                <b-td>
                  <b-form-input class="mt-3 mb-3" size="sm" 
                                required
                                v-model="form.tradingAmount" placeholder=""></b-form-input>
                </b-td>
                <b-td>
                  <b-form-input class="mt-3 mb-3" size="sm" v-model="form.fee" placeholder=""></b-form-input>
                </b-td>
                <b-td>
                  <b-form-input class="mt-3 mb-3" size="sm" v-model="form.exchangeRate" placeholder=""></b-form-input>
                </b-td>
                <b-td style="width:100px">
                  <template v-if="input_mode">
                    <b-button type="submit" class="mt-3" size="sm" variant="secondary"><b-icon icon="file-earmark-plus-fill" class="h5 mb-0"></b-icon></b-button>
                    <!-- <b-button type="reset" variant="danger">Reset</b-button> -->
                  </template>
                  <template v-else>
                    <b-button type="submit" class="mt-3" size="sm" variant="secondary"><b-icon icon="file-earmark-check-fill" class="h5 mb-0"></b-icon></b-button>&nbsp;
                    <b-button type="reset" class="mt-3" size="sm" variant="secondary"><b-icon icon="file-earmark-minus-fill" class="h5 mb-0"></b-icon></b-button>
                  </template>
                </b-td>
              </b-tr>
            </b-tbody>
          </b-table-simple>
        </b-form>
        
      </b-row>

      <b-row>
        <b-col align="end">
            <b-button class="mt-3" size="sm" variant="outline-secondary" 
                      id="excel" block @click="makeExcelFile">Excel</b-button>&nbsp;
        </b-col>           
      </b-row>
    
      <b-row>
        <b-table striped hover 
                 id="tradingNote_list"
                 :items="items" 
                 :fields="fields"
                 :busy="isBusy"
                 sticky-header="700px"
                 @row-dblclicked="(item, index, event) => rowDblClickHandler(item, index, event)">

          <template #table-busy>
            <div class="text-center text-danger my-2">
              <b-spinner class="align-middle"></b-spinner>
              <strong>Loading...</strong>
            </div>
          </template>

          <template #cell(actions)="row">
            <b-icon style="cursor: pointer;" 
                    icon="trash-fill" 
                    variant="dark"
                    @click="del(row.item, row.index, $event.target)"></b-icon>
          </template>                 
        </b-table>
      </b-row>

      <!-- The modal -->
      <!--       
      <b-modal ref="add-ticker" hide-footer title="Add Ticker">
        <b-form-input v-model="ticker4Add" placeholder="Enter Ticker"></b-form-input>
        <b-button class="mt-3" variant="outline-warning" block @click="addTicker">Save</b-button>
      </b-modal> -->



    </b-container>

  </div>
</template>
<script>
  import TradingNoteService from "@/services/tradingNote.service.js";
  import Utils from "@/common/utils.js";

  export default {
    name: "tradingNote",
    components: {
      /**
       * components
       */
    },
    data () {
      return {
        fields: [
          { key: 'portfolioName', 
            label: '포트폴리오',
          },          
          { key: 'tradingDate', 
            label: '거래일'
          },
          { key: 'ticker', 
            label: '티커'
          },
          { key: 'unitPrice', 
            label: '체결단가',
            tdClass: 'text-end', thClass: 'text-center',
          },
          { key: 'stockNum', 
            label: '수량',
            tdClass: 'text-end', thClass: 'text-center',
          },
          { key: 'tradingType', 
            label: '매매구분'
          },
          { key: 'tradingAmount', 
            label: '거래금액',
            tdClass: 'text-end', thClass: 'text-center',
          },
          { key: 'fee', 
            label: '수수료',
            tdClass: 'text-end', thClass: 'text-center',
          },
          { key: 'exchangeRate', 
            label: '환율',
            tdClass: 'text-end', thClass: 'text-center',
          },
          {
            key: 'actions',
            label: 'Actions',
          },          
        ],
        items: [], 
        options: [], 
        options2: [ { value: '매수', text: '매수'},
                    { value: '매도', text: '매도'} ], 
        tradingNoteId: '',
        tradingDate: '',
        ticker: '',
        unitPrice: '',
        stockNum: '',
        tradingType: '매수',
        tradingAmount: '',
        fee: '',
        exchangeRate: '',
        portfolioList: [],
        selectedPortfolioId: '',  
        form: {
          portfolioId: '',
          tradingNoteId: '',
          tradingDate: '',
          ticker: '',
          unitPrice: '',
          stockNum: '',
          tradingType: '매수',
          tradingAmount: '',
          fee: '',
          exchangeRate: '',
        },
        input_mode: true,
        isBusy: true,
      }
    },
    created() {
      
    },
    mounted() {
      /**
       * mounted
       */
      this.getData()
      this.getPortfolioList()
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
        this.getData()
      },
      getPortfolioList() {
        let param = { email: this.$store.state.email } 
        console.log('param='+JSON.stringify(param))

        TradingNoteService.getPortfolioList(param)
        .then(res => {
          console.log(res);
          if (res.status === 200) {
            this.portfolioList = res.data
            //this.selectedPortfolioId = res.data[0].portfolioId
            this.form.portfolioId = res.data[0].portfolioId
            let tmp_items = []
            res.data.forEach((element, index) => {
              var obj = {
                value: element.portfolioId,
                text: element.name
              }
              tmp_items.push(obj)
            })
            this.options = tmp_items
          } else {

          }
        })    
      },      
      getData() {
        let param = { email: this.$store.state.email }

        console.log('this.options='+this.options) 

        // 포트폴리오 목록 맵으로 생성, 아래 매매일지 리스트에서 참조하기 위함(매매일지는 id만 가지고 있음)
        let _portfolios = new Map()
        TradingNoteService.getPortfolioList(param)
        .then(res => {
          res.data.forEach((element, index) => {
            _portfolios.set(element.portfolioId, element.name)
          })
        })    

        TradingNoteService.getList(param)
        .then(res => {

          //console.log('getData.res='+JSON.stringify(res));
          if (res.status === 200) {
            //this.items = res.data.list
            let tmp_items = []
            res.data.forEach((element, index) => {
              //console.log('index='+index+', element='+JSON.stringify(element))

              var obj = {
                tradingNoteId: element.tradingNoteId,
                portfolioId: element.portfolioId,
                portfolioName: _portfolios.get(element.portfolioId),
                tradingDate: Utils.stringToDateStrWithHyphen(element.tradingDate),
                ticker: element.stock.ticker,
                unitPrice: Utils.showDollarWith2Point(element.unitPrice),
                stockNum: Utils.numberWithCommas(element.stockNum),
                tradingType: element.tradingType,
                tradingAmount: Utils.showDollarWith2Point(element.tradingAmount),
                fee: Utils.showDollarWith2Point(element.fee),
                exchangeRate: Utils.numberWithCommas(element.exchangeRate),
              }
              tmp_items.push(obj)
            })
            this.items = tmp_items
            this.isBusy = false
          } else {
          }
        })    
      },  
      setFormToParam() {
        let param = {}
        let keys = Object.keys(this.form)
        keys.forEach(key => {
          console.log('key='+key+', value='+this.form[key])
          param[key] = this.form[key]
        })
        return param
      },
      add() {
        let param = this.setFormToParam()
        param['email'] = this.$store.state.email
        param['tradingDate'] = param.tradingDate.replace(/-/g,'')

        if(confirm("추가하시겠습니까?")) {

          TradingNoteService.register(param)
          .then(res => {
            console.log('add::res'+res);
            if (res.status === 200) {
              
              //this.$refs.listRefreshRequest.refresh(this.selectedPortfolioId)
              //this.ticker4Add = ''
              this.refresh()
              alert('매매일지가 등록 되었습니다.');
            } else {

            }
          })
        }

      },
      mod() {
        let param = this.setFormToParam()
        param['email'] = this.$store.state.email
        param['tradingDate'] = param.tradingDate.replace(/-/g,'')

        //console.log('param='+JSON.stringify(param))
        if(confirm("수정하시겠습니까?")) {
          TradingNoteService.modify(param)
          .then(res => {
            console.log('add::res'+res);
            if (res.status === 200) {
              
              //this.$refs.listRefreshRequest.refresh(this.selectedPortfolioId)
              //this.ticker4Add = ''
              this.clear()
              this.refresh()
              alert('매매일지가 수정 되었습니다.');
            } else {

            }
          })
        }
      },
      del(item, index, event) {

        console.log('del::index='+index+', item='+JSON.stringify(item))

        if(confirm("삭제하시겠습니까?")) {
          TradingNoteService.remove(item.tradingNoteId)
          .then(
            res => {
              if (res.status === 200) {
                this.clear()
                this.refresh(this.selectedPortfolioId)
                alert("삭제되었습니다.")
              } else {
                alert("실행중 실패했습니다.\n다시 이용해 주세요.")
              }
            })
        }
      },
      clear() {
        this.input_mode = true
        this.form.tradingNoteId = ''
        this.form.tradingDate = ''
        this.form.ticker = ''
        this.form.unitPrice = ''
        this.form.stockNum = ''
        this.form.tradingAmount = ''
        this.form.fee = ''
        this.form.exchangeRate = ''
      },
      rowDblClickHandler(obj, index, event) {
        //console.log('index='+index+', obj.ticker='+obj.ticker+', event='+event)
        this.input_mode = false
        this.form.tradingNoteId = obj.tradingNoteId
        this.form.portfolioId = obj.portfolioId
        this.form.tradingDate = obj.tradingDate
        this.form.ticker = obj.ticker
        this.form.unitPrice = obj.unitPrice.replace(/[^\d.-]/g, '')
        this.form.stockNum = obj.stockNum.replace(/[^\d.-]/g, '')
        this.form.tradingType = obj.tradingType
        this.form.tradingAmount = obj.tradingAmount.replace(/[^\d.-]/g, '')
        this.form.fee = obj.fee.replace(/[^\d.-]/g, '')
        this.form.exchangeRate = obj.exchangeRate.replace(/[^\d.-]/g, '')

      },
      onSubmit(event) {
        event.preventDefault()
        //alert(JSON.stringify(this.form))
        if (this.input_mode) this.add()
        else this.mod()
      },
      onReset(event) {
        event.preventDefault()
        // Reset our form values
        this.clear()
      },
      makeExcelFile() {
        Utils.makeExcelFileFromTable('tradingNote_list')
      }         

    }
  }
</script>
<style lang="scss">

</style>