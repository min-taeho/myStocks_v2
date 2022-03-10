<template>
  <div>
    
    <div class="row justify-content-center" style="height: 500px">


      <div class="col-auto align-self-center">

        <b-card title="Login"
                tag="article"
                class="mb-2">

          <b-form @submit.prevent="onSubmit" @reset="onReset">
            <b-row>
              <div>
                <label>Email</label>
                <b-form-input id="email" v-model="form.email" :type="email" placeholder="Enter your email" required></b-form-input>
                <label>Password</label>
                <b-form-input id="password" v-model="form.password" :type="password" placeholder="Enter your password" required></b-form-input>
              </div>
              <p></p>
              <div class="text-center">
                <button type="submit" class="btn btn-info btn-fill float-right"
                        :disabled="formWait">
                  로그인
                </button>
                <div class="clearfix"></div>
              </div>
              <div class="text-end">
                <router-link to="/signup">회원가입</router-link>
              </div>

            </b-row>

          </b-form>

        </b-card>

      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "OauthLogin",
  components: {
  },
  data () {
    return {
      formWait: false, // 폼 전송 플래그
      form: {
        email: 'mintaeho75@gmail.com',
        password: 'test123',
      }
    }
  },
  computed: {
    ...mapGetters(["isAuthenticated"])
  },
  methods: {
    async onSubmit(evt) {

      evt.preventDefault();

      this.formWait = true;
      this.$store
          .dispatch("LOGIN", this.form)
          .then(response => {
              this.formWait = false;

              if (response === undefined) {
                alert('Server connection failure. Please contact administrator')
              }
              else if (response.status == 200) {

                  if (this.isAuthenticated) {
                      this.$router.push({ 
                          name: "Portfolio" 
                      });
                  }
              }
              else {
                if ( Object.prototype.hasOwnProperty.call(response.data, "message") ) {
                  alert(response.data.message);
                } else {
                  alert('Login failed.');
                }
              }
          })
          .catch(({ message }) => console.log(message));
    },
    onReset(evt) {
        evt.preventDefault();
    }      
  }
}

</script>

<style lang="scss">

</style>


