<template>
  <div class="small">

    <b-overlay :show="this.$store.state.overlayShow" rounded="sm">

      <b-navbar toggleable="lg" type="dark" variant="info">

        <b-navbar-brand href="#">MyStock</b-navbar-brand>

        <!-- <b-navbar-toggle target="nav-collapse"></b-navbar-toggle> -->

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <!--           
            <b-nav-item href="#">Link</b-nav-item>
            <b-nav-item href="#" disabled>Disabled</b-nav-item>
            -->

            <b-nav-item href="javascript:;" @click="goToLink('/main/portfolio')">포트폴리오</b-nav-item>
            <b-nav-item href="javascript:;" @click="goToLink('/main/interestStock')">관심종목</b-nav-item>
            <b-nav-item href="javascript:;" @click="goToLink('/main/tradingNote')">매매일지</b-nav-item>
            <b-nav-item href="javascript:;" @click="goToLink('/main/notice')">게시판</b-nav-item>
            <b-nav-item href="javascript:;" @click="applyCurrentInfo">정보현행화</b-nav-item>
          </b-navbar-nav>

          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
            <a href="javascript:;" class="nav-link" @click="logout">
              Logout
            </a>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>


      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>

      <template #overlay>
        <div class="text-center">
          <b-icon icon="stopwatch" font-scale="3" animation="cylon"></b-icon>
          <p id="cancel-label"><h4>정보 현행화 진행중입니다.</h4><br/><h5>Please wait for a while...</h5></p>
        </div>
      </template>

    </b-overlay>  
  </div>
</template>
<script>
import ScrapService from "@/services/scrap.service.js"

export default {
  data () {
    return {
    }
  },  
  computed: {
    routeName () {
      const { name } = this.$route
      return this.capitalizeFirstLetter(name)
    },
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    },
    pageTitle: function() {
      return this.$route.meta.title;
    },
  },  
  methods: {
    refresh() {
      for(var i=0 ; i<this.$route.matched.length ; i++) {
        try {
          this.$route.matched[i].instances.default.refresh()
        } catch (error) {
          console.log('Content.vue::refresh()', error)
        }
      }
    },
    capitalizeFirstLetter (string) {
      return string.charAt(0).toUpperCase() + string.slice(1)
    },   
    logout() {
        this.$store.dispatch("LOGOUT")
        .then(response => {
            console.log(response);
            if(response) {
                this.$router.push({ 
                    name: "Login" 
                });
            }
        })
        .catch(({ message }) => console.log(message));
    },
    applyCurrentInfo() {

      if(confirm("정보 현행화 진행하시겠습니까?")) {
      
        //this.$store.dispatch('applyCurrentInfo')
        this.$store.commit('startSpinner')
        let param = { email: this.$store.state.email } 
        //console.log('param='+JSON.stringify(param))
        ScrapService.add(param)
          .then (
            res => {
              if (res.status === 200) {
                alert('최신정보로 반영되었습니다.');   
                //this.$refs.refreshRequest.refresh()                       
                // 현재 라우터 페이지 갱신
                this.refresh()

              } else {
                alert("실행중 실패했습니다.\n다시 이용해 주세요");
              }
              this.$store.commit('endSpinner')
            }
            
          )
          .catch((err) => {
            console.log(err);
            alert("[오류발생]" + err);
            this.$store.commit('endSpinner')
          })
      }
     
    },    
    refresh() {
      try {
        this.$route.matched[1].instances.default.refresh()
      } catch (error) {
        console.log('Content.vue::refresh()', error)
      }      
    },   
    goToLink(targetPath) {
      this.$router.push({ path: targetPath })
    } 
  }
}

</script>
<style>
  .fade-enter-active,
  .fade-leave-active { 
    transition: opacity .1s
  }
  .fade-enter,
  .fade-leave-to
    /* .fade-leave-active in <2.1.8 */
  {
    opacity: 0
  }
</style>