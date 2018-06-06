<template>
  <div class="container">
    <Card class="login" style="width:500px">
      <h3 class="m-b-10">Welcome</h3>
      <div class="inputWrap m-b-20">
        <Input class="m-b-10" placeholder="account" v-model="account" clearable></Input>
        <Input type="password" placeholder="password" v-model="password" clearable></Input>
      </div>
      <div class="btnWrap">
        <Button type="primary" class="m-b-10" long @click="signIn">sign in</Button>
        <Button type="ghost" long @click="signup">sign up</Button>
      </div>
    </Card>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      account: '',
      password: ''
    }
  },
  methods: {
    signIn() {
      let params = {
        url: '/api/user/login',
        type: 'post'
      }
      params.data = {
        account: this.account,
        password: this.password
      }
      this.axios(params).then(res => {
        if(res.code == 200){
          this.getUserInfo()
          this.$router.push('home')
        }
      }, err => {
        // console.log(err)
      })
    },
    signup() {
      this.$router.push('signUp')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.inputWrap{
  text-align: center;
}
</style>
