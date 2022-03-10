<template>
  <div>
    <b-container class="bv-example-row">
      <b-row>
        <b-col align="start">
          <h2>게시판</h2>
          주식 관련 이벤트, 투자 아이디어 등 기록
        </b-col>
        <b-col align="end">
          <b-button class="mt-3" size="sm" variant="outline-secondary"
                    id="show-btn" @click.prevent="go">List</b-button>
        </b-col>
      </b-row>
        <b-table-simple hover small caption-top responsive>
          <caption></caption>
          <b-thead head-variant="dark">
            <b-tr>
              <b-th>{{ item.title }}</b-th>
            </b-tr>
          </b-thead>
          <b-tbody>
            <b-tr>
              <b-td>
                {{ item.contents }}
              </b-td>
            </b-tr>
          </b-tbody>
        </b-table-simple>
      <b-row>
        <div>
          <b-button class="mt-3" size="sm" variant="secondary"
                    id="show-btn" 
                    @click.prevent.stop="goUpdate">수정</b-button>
        </div>
      </b-row>
    </b-container>
  </div>

</template>



<script>
/**
 * vuex
 */
import { mapGetters } from "vuex";
/**
 * service
 */
import NoticeService from "@/services/notice.service.js";

export default {
  name: "NoticeView",
  components: {
    /**
     * components
     */
  },
  data() {
    /**
     * data
     */
    return {
      /**
       * id : 단건 식별자
       * item : 응답 데이터
       * wait : 로딩
       */
      id: 0,
      wait: false,
      item: {}
    };
  },
  created() {
    /**
     * created
     */
    if (
      Object.prototype.hasOwnProperty.call(
        this.$router.currentRoute.params,
        "id"
      )
    ) {
      this.id = this.$router.currentRoute.params.id;
      this.getId();
    }
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
    ...mapGetters(["isAuthenticated"])
  },
  destroyed() {
    /**
     * destroyed
     */
  },
  methods: {
    /**
     * methods
     */
    getId() {
      this.wait = true;
      NoticeService.getId(this.id).then(
        response => {
          const { data } = response;
          this.item = data;
          this.wait = false;
        },
        error => {
          console.log(error);
        }
      );
    },
    go() {
        //this.$router.go(-1);
        this.$router.push( { name: 'Notice' })
    },
    goUpdate() {
      this.$router.push( { name: 'NoticeEditId', params: { id: this.id } })
    }
  }
};
</script>

<style scoped></style>