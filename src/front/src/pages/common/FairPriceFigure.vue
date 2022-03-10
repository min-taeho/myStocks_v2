<template>
  <div >
      <b-table-simple class="table table-sm small">
        <b-tbody> 
          <b-tr>
              <b-th class="bg-success text-center " colspan="2">{{ this.row_data.stockNm.substring(0,20)+"..." }}</b-th> 
              <b-th class="bg-danger bold text-center ">상승률</b-th> 
              <b-th class="bg-primary bold text-center ">하락률</b-th> 
              <b-td class="align-center" colspan="2">
                  <button type="button" class="btn btn-info btn-fill btn-sm" @click.prevent="showCurrentPoint">show position</button>
              </b-td> 
          </b-tr>
          <!-- 100% 구간 -->
          <b-tr>
              <b-td class="text-end" v-bind:class="{ 'bg-info': showPoint[0] }">{{ this.row_data.highestPrice | currency('US') }}</b-td> 
              <b-th class="bg-dark text-white text-center">최고</b-th> 
              <b-td class="text-end text-danger">{{ show_rise_rate(this.row_data.highestPrice, this.row_data.lowerPrice) | rate }}</b-td>  <!--상승률 -->
              <b-td class="text-end bg-primary text-white ">0%</b-td>  <!--하락률 -->
              <b-td> &nbsp;</b-td> 
              <b-td> &nbsp;</b-td> 
          </b-tr>
          <b-tr>
              <b-td> </b-td> 
              <b-td> &nbsp;</b-td> 
              <b-td class="text-end text-danger">{{ show_rise_rate(seg100_down75, this.row_data.lowerPrice) | rate }}</b-td>  <!--상승률 -->
              <b-td class="text-end text-primary">{{ show_drop_rate(seg100_down75, this.row_data.highestPrice) | rate }}</b-td>  <!--하락률 -->
              <b-td class="text-end text-primary" v-bind:class="{ 'bg-info': showPoint[1] }">{{ seg100_down75 | currency('US') }}</b-td> 
              <b-td class="bg-primary text-white text-center">75%</b-td> 
          </b-tr>
          <b-tr>
              <b-td> </b-td> 
              <b-td> &nbsp;</b-td> 
              <b-td class="text-end text-danger">{{ show_rise_rate(seg100_down50, this.row_data.lowerPrice) | rate }}</b-td>  <!--상승률 -->
              <b-td class="text-end text-primary">{{ show_drop_rate(seg100_down50, this.row_data.highestPrice) | rate }}</b-td>  <!--하락률 -->
              <b-td class="text-end text-primary" v-bind:class="{ 'bg-info': showPoint[2] }">{{ seg100_down50 | currency('US') }}</b-td> 
              <b-td class="bg-primary text-white text-center">50%</b-td> 
          </b-tr>
          <b-tr>
              <b-td> </b-td> 
              <b-td> &nbsp;</b-td> 
              <b-td class="text-end text-danger">{{ show_rise_rate(seg100_down25, this.row_data.lowerPrice) | rate }}</b-td>  <!--상승률 -->
              <b-td class="text-end text-primary">{{ show_drop_rate(seg100_down25, this.row_data.highestPrice) | rate }}</b-td>  <!--하락률 -->
              <b-td class="text-end text-primary" v-bind:class="{ 'bg-info': showPoint[3] }">{{ seg100_down25 | currency('US') }}</b-td> 
              <b-td class="bg-primary text-white text-center">25%</b-td> 
          </b-tr>
<!-- 75% 구간 -->
          <b-tr>
              <b-td class="text-end" v-bind:class="{ 'bg-info': showPoint[4] }">{{ segment75 | currency('US') }}</b-td> 
              <b-td class="bg-dark text-white text-center">75%</b-td> 
              <b-td class="text-end text-danger">{{ show_rise_rate(segment75, this.row_data.lowerPrice) | rate }}</b-td>  <!--상승률 -->
              <b-td class="text-end text-primary">{{ show_drop_rate(segment75, this.row_data.highestPrice) | rate }}</b-td>  <!--하락률 -->
              <b-td> &nbsp;</b-td> 
              <b-td> &nbsp;</b-td> 
          </b-tr>
          <b-tr>
              <b-td> </b-td> 
              <b-td> &nbsp;</b-td> 
              <b-td class="text-end text-danger">{{ show_rise_rate(seg75_down75, this.row_data.lowerPrice) | rate }}</b-td>  <!--상승률 -->
              <b-td class="text-end text-primary">{{ show_drop_rate(seg75_down75, this.row_data.highestPrice) | rate }}</b-td>  <!--하락률 -->
              <b-td class="text-end text-primary" v-bind:class="{ 'bg-info': showPoint[5] }">{{ seg75_down75 | currency('US') }}</b-td> 
              <b-td class="bg-primary text-white text-center">75%</b-td> 
          </b-tr>
          <b-tr>
              <b-td> </b-td> 
              <b-td> &nbsp;</b-td> 
              <b-td class="text-end text-danger">{{ show_rise_rate(seg75_down50, this.row_data.lowerPrice) | rate }}</b-td>  <!--상승률 -->
              <b-td class="text-end text-primary">{{ show_drop_rate(seg75_down50, this.row_data.highestPrice) | rate }}</b-td>  <!--하락률 -->
              <b-td class="text-end text-primary" v-bind:class="{ 'bg-info': showPoint[6] }">{{ seg75_down50 | currency('US') }}</b-td> 
              <b-td class="bg-primary text-white text-center">50%</b-td> 
          </b-tr>
          <b-tr>
              <b-td> </b-td> 
              <b-td> &nbsp;</b-td> 
              <b-td class="text-end text-danger">{{ show_rise_rate(seg75_down25, this.row_data.lowerPrice) | rate }}</b-td>  <!--상승률 -->
              <b-td class="text-end text-primary">{{ show_drop_rate(seg75_down25, this.row_data.highestPrice) | rate }}</b-td>  <!--하락률 -->
              <b-td class="text-end text-primary" v-bind:class="{ 'bg-info': showPoint[7] }">{{ seg75_down25 | currency('US') }}</b-td> 
              <b-td class="bg-primary text-white text-center">25%</b-td> 
          </b-tr>


          <!-- 50% 구간 -->
          <b-tr>
              <b-td class="text-end" v-bind:class="{ 'bg-info': showPoint[8] }">{{ segment50 | currency('US') }}</b-td> 
              <b-td class="bg-dark text-white text-center">50%</b-td> 
              <b-td class="text-end text-danger">{{ show_rise_rate(segment50, this.row_data.lowerPrice) | rate }}</b-td>  <!--상승률 -->
              <b-td class="text-end text-primary">{{ show_drop_rate(segment50, this.row_data.highestPrice) | rate }}</b-td>  <!--하락률 -->
              <b-td> &nbsp;</b-td> 
              <b-td> &nbsp;</b-td> 
          </b-tr>
          <b-tr>
              <b-td> </b-td> 
              <b-td> &nbsp;</b-td> 
              <b-td class="text-end text-danger">{{ show_rise_rate(seg50_down75, this.row_data.lowerPrice) | rate }}</b-td>  <!--상승률 -->
              <b-td class="text-end text-primary">{{ show_drop_rate(seg50_down75, this.row_data.highestPrice) | rate }}</b-td>  <!--하락률 -->
              <b-td class="text-end text-primary" v-bind:class="{ 'bg-info': showPoint[9] }">{{ seg50_down75 | currency('US') }}</b-td> 
              <b-td class="bg-primary text-white text-center">75%</b-td> 
          </b-tr>
          <b-tr>
              <b-td> </b-td> 
              <b-td> &nbsp;</b-td> 
              <b-td class="text-end text-danger">{{ show_rise_rate(seg50_down50, this.row_data.lowerPrice) | rate }}</b-td>  <!--상승률 -->
              <b-td class="text-end text-primary">{{ show_drop_rate(seg50_down50, this.row_data.highestPrice) | rate }}</b-td>  <!--하락률 -->
              <b-td class="text-end text-primary" v-bind:class="{ 'bg-info': showPoint[10] }">{{ seg50_down50 | currency('US') }}</b-td> 
              <b-td class="bg-primary text-white text-center">50%</b-td> 
          </b-tr>
          <b-tr>
              <b-td> </b-td> 
              <b-td> &nbsp;</b-td> 
              <b-td class="text-end text-danger">{{ show_rise_rate(seg50_down25, this.row_data.lowerPrice) | rate }}</b-td>  <!--상승률 -->
              <b-td class="text-end text-primary">{{ show_drop_rate(seg50_down25, this.row_data.highestPrice) | rate }}</b-td>  <!--하락률 -->
              <b-td class="text-end text-primary" v-bind:class="{ 'bg-info': showPoint[11] }">{{ seg50_down25 | currency('US') }}</b-td> 
              <b-td class="bg-primary text-white text-center">25%</b-td> 
          </b-tr>


          <!-- 25% 구간 -->
          <b-tr>
              <b-td class="text-end">{{ segment25 | currency('US') }}</b-td> 
              <b-td class="bg-dark text-white text-center">25%</b-td> 
              <b-td class="text-end text-danger">{{ show_rise_rate(segment25, this.row_data.lowerPrice) | rate }}</b-td>  <!--상승률 -->
              <b-td class="text-end text-primary" v-bind:class="{ 'bg-info': showPoint[12] }">{{ show_drop_rate(segment25, this.row_data.highestPrice) | rate }}</b-td>  <!--하락률 -->
              <b-td> &nbsp;</b-td> 
              <b-td> &nbsp;</b-td> 
          </b-tr>
          <b-tr>
              <b-td> </b-td> 
              <b-td> &nbsp;</b-td> 
              <b-td class="text-end text-danger">{{ show_rise_rate(seg25_down75, this.row_data.lowerPrice) | rate }}</b-td>  <!--상승률 -->
              <b-td class="text-end text-primary">{{ show_drop_rate(seg25_down75, this.row_data.highestPrice) | rate }}</b-td>  <!--하락률 -->
              <b-td class="text-end text-primary" v-bind:class="{ 'bg-info': showPoint[13] }">{{ seg25_down75 | currency('US') }}</b-td> 
              <b-td class="bg-primary text-white text-center">75%</b-td> 
          </b-tr>
          <b-tr>
              <b-td> </b-td> 
              <b-td> &nbsp;</b-td> 
              <b-td class="text-end text-danger">{{ show_rise_rate(seg25_down50, this.row_data.lowerPrice) | rate }}</b-td>  <!--상승률 -->
              <b-td class="text-end text-primary">{{ show_drop_rate(seg25_down50, this.row_data.highestPrice) | rate }}</b-td>  <!--하락률 -->
              <b-td class="text-end text-primary" v-bind:class="{ 'bg-info': showPoint[14] }">{{ seg25_down50 | currency('US') }}</b-td> 
              <b-td class="bg-primary text-white text-center">50%</b-td> 
          </b-tr>
          <b-tr>
              <b-td> </b-td> 
              <b-td> &nbsp;</b-td> 
              <b-td class="text-end text-danger">{{ show_rise_rate(seg25_down25, this.row_data.lowerPrice) | rate }}</b-td>  <!--상승률 -->
              <b-td class="text-end text-primary">{{ show_drop_rate(seg25_down25, this.row_data.highestPrice) | rate }}</b-td>  <!--하락률 -->
              <b-td class="text-end text-primary" v-bind:class="{ 'bg-info': showPoint[15] }">{{ seg25_down25 | currency('US') }}</b-td> 
              <b-td class="bg-primary text-white text-center">25%</b-td> 
          </b-tr>

          <b-tr>
              <b-td class="text-end" v-bind:class="{ 'bg-info': showPoint[16] }">{{ this.row_data.lowerPrice | currency('US') }}</b-td> 
              <b-th class="bg-dark text-white text-center">최저</b-th> 
              <b-td class="text-end text-danger">{{ show_rise_rate(this.row_data.lowerPrice, this.row_data.lowerPrice) | rate }}</b-td>  <!--상승률 -->
              <b-td class="text-end text-primary">{{ show_drop_rate(this.row_data.lowerPrice, this.row_data.highestPrice) | rate }}</b-td>  <!--하락률 -->
              <b-td> &nbsp;</b-td> 
              <b-td> &nbsp;</b-td> 
          </b-tr>
        </b-tbody>
      </b-table-simple>

  </div>
</template>

<script>
export default {
    name: "fair_price_figure",
    props: ['row_data'],
    components: {
        /**
         * components
         */
    },
    data() {
        return {
            showPoint: [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]
        }
    },
    created() {
        /**
         * created
         */
    },
    mounted() {
        /**
         * mounted
         */
        //this.showCurrentPoint();

    },
    computed: {
        
        segment75: function () {
            return ((this.row_data.highestPrice - this.row_data.lowerPrice) / 100 * 75) + this.row_data.lowerPrice ;
        },
        segment50: function () {
            return ((this.row_data.highestPrice - this.row_data.lowerPrice) / 100 * 50) + this.row_data.lowerPrice;
        },
        segment25: function () {
            return ((this.row_data.highestPrice - this.row_data.lowerPrice) / 100 * 25) + this.row_data.lowerPrice;
        },

        seg100_down75: function() {
            return ( this.row_data.highestPrice - this.segment75 ) / 100 * 75 + this.segment75;
        },
        seg100_down50: function() {
            return ( this.row_data.highestPrice - this.segment75 ) / 100 * 50 + this.segment75;
        },
        seg100_down25: function() {
            return ( this.row_data.highestPrice - this.segment75 ) / 100 * 25 + this.segment75;
        },


        seg75_down75: function() {
            return ( this.segment75 - this.segment50 ) / 100 * 75 + this.segment50;
        },
        seg75_down50: function() {
            return ( this.segment75 - this.segment50 ) / 100 * 50 + this.segment50;
        },
        seg75_down25: function() {
            return ( this.segment75 - this.segment50 ) / 100 * 25 + this.segment50;
        },

        seg50_down75: function() {
            return ( this.segment50 - this.segment25 ) / 100 * 75 + this.segment25;
        },
        seg50_down50: function() {
            return ( this.segment50 - this.segment25 ) / 100 * 50 + this.segment25;
        },
        seg50_down25: function() {
            return ( this.segment50 - this.segment25 ) / 100 * 25 + this.segment25;
        },

        seg25_down75: function() {
            return ( this.segment25 - this.row_data.lowerPrice ) / 100 * 75 + this.row_data.lowerPrice;
        },
        seg25_down50: function() {
            return ( this.segment25 - this.row_data.lowerPrice ) / 100 * 50 + this.row_data.lowerPrice;
        },
        seg25_down25: function() {
            return ( this.segment25 - this.row_data.lowerPrice ) / 100 * 25 + this.row_data.lowerPrice;
        },
        
    },
    destroyed() {
        /**
         * destroyed
         */
    },
    methods:{
        show_drop_rate(value, hight_price) {
            return (value/hight_price - 1) * 100;
        },
        show_rise_rate(value, lower_price) {
            return (value/lower_price - 1) * 100;
        },
        numberBetween(value, a, b, inclusive) {
            let min = Math.min.apply(Math, [a, b]), max = Math.max.apply(Math, [a, b]);
            return inclusive ? value >= min && value <= max : value > min && value < max;
        },
        showCurrentPoint() {
            
            let index = 0;
            
            if ( this.numberBetween(this.row_data.currentPrice, this.row_data.highestPrice, this.seg100_down75, true) ) index = 0;
            else if ( this.numberBetween(this.row_data.currentPrice, this.seg100_down75, this.seg100_down50, true) ) index = 1;
            else if ( this.numberBetween(this.row_data.currentPrice, this.seg100_down50, this.seg100_down25, true) ) index = 2;
            else if ( this.numberBetween(this.row_data.currentPrice, this.seg100_down25, this.segment75, true) ) index = 3;
            else if ( this.numberBetween(this.row_data.currentPrice, this.segment75, this.seg75_down75, true) ) index = 4;
            else if ( this.numberBetween(this.row_data.currentPrice, this.seg75_down75, this.seg75_down50, true) ) index = 5;
            else if ( this.numberBetween(this.row_data.currentPrice, this.seg75_down50, this.seg75_down25, true) ) index = 6;
            else if ( this.numberBetween(this.row_data.currentPrice, this.seg75_down25, this.segment50, true) ) index = 7;
            else if ( this.numberBetween(this.row_data.currentPrice, this.segment50, this.seg50_down75, true) ) index = 8;
            else if ( this.numberBetween(this.row_data.currentPrice, this.seg50_down75, this.seg50_down50, true) ) index = 9;
            else if ( this.numberBetween(this.row_data.currentPrice, this.seg50_down50, this.seg50_down25, true) ) index = 10;
            else if ( this.numberBetween(this.row_data.currentPrice, this.seg50_down25, this.segment25, true) ) index = 11;
            else if ( this.numberBetween(this.row_data.currentPrice, this.segment25, this.seg25_down75, true) ) index = 12;
            else if ( this.numberBetween(this.row_data.currentPrice, this.seg25_down75, this.seg25_down50, true) ) index = 13;
            else if ( this.numberBetween(this.row_data.currentPrice, this.seg25_down50, this.seg25_down25, true) ) index = 14;
            else if ( this.numberBetween(this.row_data.currentPrice, this.seg25_down25, this.row_data.lowerPrice, true) ) index = 15;

            let tmpShowPoint = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false];
            tmpShowPoint[index] = true;
            tmpShowPoint[index+1] = true;
            this.showPoint = tmpShowPoint;

        }
        

        
    }
}
</script>


<style scoped>
	

</style>
