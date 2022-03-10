<template>
  <div>
    <b-container class="bv-example-row">
      <b-row>
        <b-col align="start">
          <h2>게시판</h2>
          주식 관련 이벤트, 투자 아이디어 등 기록
        </b-col>
        <b-col align="end">
          <b-button class="mt-3" size="sm" variant="outline-secondary" id="show-btn" @click.prevent="go">List</b-button>
        </b-col>
      </b-row>

      <b-form @submit.prevent="onSubmit" @reset="onReset">
        <b-row>
          <b-form-input class="mt-3" size="sm" 
                        id="title"
                        v-model="form.title"
                        placeholder="Enter title"
                        required>
          </b-form-input>
          <b-form-textarea id="contents"
                        v-model="form.contents"
                        placeholder="Enter contents"
                        rows="15"
                        required>
          </b-form-textarea>
        </b-row>
        <b-row>
          <div>
            <b-button class="mt-3" size="sm" variant="secondary" 
                      id="show-btn" 
                      v-if="id" 
                      @click.prevent.stop="remove" 
                      :disabled="formWait">삭제</b-button>&nbsp;

            <b-button type="submit" 
                      class="mt-3" size="sm" variant="secondary" 
                      :disabled="invalid || formWait">{{ id ? '수정' : '추가' }}</b-button>
          </div>
        </b-row>
      </b-form>      

    </b-container>
  </div>

<!-- 
  <div v-if="wait" class="content">
    <spinner label="Loading..."></spinner>
  </div>
  <div v-else class="content">
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
                  <button type="button" class="btn btn-info btn-fill btn-sm float-right" @click.prevent="go">List</button>
                </div>
              </div>
            </template>

            <form @submit.prevent="onSubmit" @reset="onReset">

              <div class="row">
                <div class="col-md-6">
                  <base-input type="text"
                              label="제목"
                              placeholder=""
                              ref="formTitle"
                              v-model="form.title">
                  </base-input>
                </div>
              </div>
              <div class="row">
                <div class="col-md-12">
                  <div class="form-group">
                    <label>내용</label>
                    <textarea rows="15" class="form-control h-25 border-input"
                              placeholder="Here can be Information"
                              ref="formContents"
                              v-model="form.contents">
                      </textarea>
                  </div>
                </div>
              </div>

              <div class="text-center">
                <button v-if="id" 
                        type="button" 
                        class="btn btn-info btn-fill float-right"
                        @click.prevent.stop="remove" 
                        :disabled="formWait">삭제</button>&nbsp;

                <button type="submit" 
                        class="btn btn-info btn-fill float-right" 
                        :disabled="invalid || formWait">{{ id ? '수정' : '추가' }}</button>

              </div>

              <div class="clearfix"></div>

            </form>

          </card>
        </div>
      </div>

    </div> 

  </div>-->

</template>

<script>
import { mapGetters } from "vuex";
import NoticeService from "@/services/notice.service.js";

export default {
    name: "NoticeEdit",
    components: {
        /**
         * components
         */
    },
    data() {
        return {
            /**
             * id : 단건 식별자
             * item : 응답 데이터
             * wait : 로딩
             * formWait : 폼 로딩
             * formAction : 폼 액션
             * form : 폼
             */
            id: 0,
            wait: false,
            formWait: false,
            formAction: "",
            form: {
                /**
                 * title: 제목
                 * cont: 내용
                 * tp: 분류
                 */
                title: "",
                contents: "",
                contentsType: ""
            },
            item: {}
        };
    },
    created() {
        /**
         * created
         */
        if ( Object.prototype.hasOwnProperty.call(this.$router.currentRoute.params, "id" ) ) {
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
            NoticeService.getId(this.id)
            .then(
                response => {
                    const { data } = response;
                    this.item = data;

                    // form
                    if (Object.prototype.hasOwnProperty.call(data, "title")) {
                        this.form.title = data.title;
                    }
                    if (Object.prototype.hasOwnProperty.call(data, "contents")) {
                        this.form.contents = data.contents;
                    }
                    if (Object.prototype.hasOwnProperty.call(data, "contentsType")) {
                        this.form.contentsType = data.contentsType;
                    }

                    this.wait = false;
                },
                error => {
                    console.log(error);
                }
            );
        },
        async onSubmit(evt) {
            evt.preventDefault();

            this.formWait = true;

            let params = {
                title: this.form.title,
                contents: this.form.contents,
                contentsType: this.form.contentsType
            };

            if (this.id) {
                // 수정
                NoticeService.modify(this.id, params)
                .then(
                    response => {
                        const { data } = response;
                        this.item = data;

                        alert('성공');
                        this.$router.go(-1);

                        this.formWait = false;
                    },
                    error => {
                        alert('실패');
                        console.log(error);
                    }
                );
            }
            else {
                // 등록
                NoticeService.add(params)
                .then(
                    response => {
                        const { data } = response;
                        this.item = data;

                        alert('성공');
                        this.$router.go(-1);

                        this.formWait = false;
                    },
                    error => {
                        console.log(error);
                    }
                );
            }
        },
        onReset(evt) {
            evt.preventDefault();
            this.$router.go(-1);
        },
        remove() {
            if (confirm("삭제 하시겠습니까?")) {
                this.formWait = true;
                this.formAction = 'remove';

                NoticeService.remove(this.id)
                .then(
                    response => {
                        const { data } = response;
                        this.item = data;

                        alert('성공');
                        //this.$router.go(-1);
                        this.$router.push( { path: 'notice' })
                        this.formWait = false;
                    },
                    error => {
                        alert('실패');
                        console.log(error);
                    }
                );
            }
        },
        go() {
          this.$router.push( { name: 'Notice' })
        }
    },

}
</script>

<style scoped></style>