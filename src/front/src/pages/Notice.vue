<template>
  <div>

    <b-container class="bv-example-row">
      <b-row>
        <b-col align="start">
          <h2>게시판</h2>
        </b-col>
        <b-col align="end">
          <b-button class="mt-3" size="sm" variant="secondary" 
                    id="show-btn" @click="goToAdd">등록</b-button>
        </b-col>
      </b-row>

      <b-row>
        <b-table striped hover 
                :items="items" 
                :fields="fields"
                @row-dblclicked="(item, index, event) => rowDblClickHandler(item, index, event)">
        </b-table>

      </b-row>
    </b-container>
  </div>


<!-- 
  <div class="content">
    <div class="container-fluid">

      <div class="row">
        <div class="col-12">
          <card class="strpied-tabled-with-hover"
                body-classes="table-full-width table-responsive">
            <template slot="header">
              <div class="row justify-content-between">
                <div class="col-11 mr-auto">
                  <h4 class="card-title">게시판</h4>
                  <p class="card-category">주식 관련 이벤트, 투자 아이디어 등 기록</p>
                </div>
                <div class="col-auto ml-auto">
                  <router-link :to="{ name: 'NoticeEdit' }" class="btn btn-info btn-fill btn-sm float-right">Add</router-link>
                </div>
              </div>
            </template>

            <l-table class="table-hover table-striped"
                    style="font-size: 14px"
                      :columns="table.columns"
                      :data="items">

              <template slot-scope="{row}">
                <td v-if="row.title.length < 20">{{ row.title }}</td>
                <td v-else>{{ row.title.substring(0,20)+"..." }}</td>
                <td v-if="row.contents.length < 40">
                  <router-link :to="{ name: 'NoticeId', params: { id: row.id } }">{{ row.contents }}</router-link>
                </td>
                <td v-else>
                  <router-link :to="{ name: 'NoticeId', params: { id: row.id } }">{{ row.contents.substring(0,40)+"..." }}</router-link>
                </td>                

                <td>{{ row.createdDate }}</td>

                <td>
                  <router-link :to="{ name: 'NoticeId', params: { id: row.id } }">
                    <i class="nc-icon nc-zoom-split"></i>
                  </router-link>&nbsp;
                  <router-link :to="{ name: 'NoticeEditId', params: { id: row.id } }">
                    <i class="nc-icon nc-ruler-pencil"></i>
                  </router-link>
                </td>
              </template>      
            </l-table>

          </card>
        </div>
      </div>

    </div>
  </div> -->


</template>
<script>
  import { mapGetters } from "vuex";
  import NoticeService from "@/services/notice.service.js";

  export default {
    name: "notice-list",
    components: {
    },  

    data() {
      return {
        fields: [
          {
            key: 'title',
            label: '제목',
          },
          {
            key: 'contents',
            label: '내용',
          },
          {
            key: 'createdDate',
            label: '등록일',
          },
        ],
        items: [
          { isActive: true, age: 40, first_name: 'Dickerson', last_name: 'Macdonald' },
          { isActive: false, age: 21, first_name: 'Larsen', last_name: 'Shaw' },
          { isActive: false, age: 89, first_name: 'Geneva', last_name: 'Wilson' },
          { isActive: true, age: 38, first_name: 'Jami', last_name: 'Carney' }
        ],
        wait: false, //로딩 플래그
        searchForm: {
            type: '', // 검색항목
            q: '', //검색어
        },
        totalElements: 0,
        totalPages: 1,
        currentPage: 1,
        pageSize: 10,
      }
    },
    created() {

      if ( Object.prototype.hasOwnProperty.call(this.$router.currentRoute.query, "page") ) {
          this.currentPage = this.$router.currentRoute.query.page;
      }

      if ( Object.prototype.hasOwnProperty.call(this.$router.currentRoute.query, "type") &&
            Object.prototype.hasOwnProperty.call(this.$router.currentRoute.query, "q") 
      ) {
          this.search.type = this.$router.currentRoute.query.type;
          this.search.q = this.$router.currentRoute.query.q;
      }

      this.search();
    },
    computed: {
      pagingHtml() {
          return "<b>" + this.totalElements + "</b>개 항목 중 <b>" + this.currentPage + "</b>~<b>" + this.pageSize + "</b>개 표시";
      },
      ...mapGetters(["isAuthenticated"])
    },
    methods: {
      search() {
        this.wait = true;

        const params = {
            page: this.currentPage,
            size: this.pageSize
        };

        if ( this.search.q && this.search.type ) {
            params[this.search.type] = this.search.q;
        }

        console.log('params', params);

        NoticeService.search(params)
        .then(res => {

          console.log(res);
          if (res.status === 200) {
            //this.items = res.data.list
            console.log('res.data='+res.data)
            const { data } = res
            let tmp_items = []
            data.content.forEach((element, index) => {
              console.log('index='+index+', element='+element)
              
              var obj = {
                id: element.id,
                title: element.title,
                contents: element.contents,
                createdDate: element.createdDate
              }
              console.log('obj='+obj)
              tmp_items.push(obj)
              
            })
            this.items = tmp_items
            this.totalElements = data.totalElements
            this.totalPages = data.totalPages
            this.wait = false
          } else {
          }
        })    
      },
      pageLink(button, page) {
        this.currentPage = page;
        this.search();
      },
      linkGen(pageNum) {
        const query = {};
        if (this.search.q && this.search.type) {
            query.type = this.search.type;
            query.q = this.search.q;
        }

        query.page = pageNum;

        return {
            path: "/notice/",
            query: query
        }
      },
      rowDblClickHandler(obj, index, event) {
        console.log('rowDblClickHandler::obj='+JSON.stringify(obj))
        this.$router.push( { name: 'NoticeId', params: { id: obj.id } })
      },     
      goToAdd() {
        this.$router.push({ name: 'NoticeEdit' })
      } 

    }
  }
</script>
<style>

</style>
