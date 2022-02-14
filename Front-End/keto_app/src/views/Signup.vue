<template>
  <div class="cont">
    <form class="card" @submit.prevent="handleSubmit">
      <img src="../assets/myketopal.png" alt="App Logo">
      <div class="title">Create an Account</div>
      <input type="email" name="username" placeholder="enter email" v-model="username" />
      <input type="password" name="password" placeholder="enter password" v-model="password"/>
      <button class="btn" type="submit">Sign Up</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios'


export default {
  name: 'Signup',
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    handleSubmit(e){
      console.log('submitted')
      const formData = {
        email: this.username,
        username: this.username,
        password: this.password
      }
      console.log(formData)
      axios
          .post('/api/v1/users/', formData)
          .then(response => {
            this.$router.push('/signin')
            console.log(response)
          })
          .catch(error => {
            console.log(error)
          })
    }
  }
}
</script>

<style scoped>
.cont{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh
}
.card{
  width: 372px;
  height: 400px;
  padding: 48px 64px;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  border-radius: 10px;
  box-shadow: 0px 0px 12px -5px rgba(0,0,0,0.7)
}
form{
  display: flex;
  flex-direction: column;
}
.btn{
    cursor: pointer;
  background-color: #3181CE;
  color: white;
  font-size: 20px;
  font-weight: 500;
  padding: 10px 60px;
  border-radius: 5px;
  border: none;
}
.btn:hover{
  background-color: #358bdb;
}
.title{
  font-weight: 800;
  font-size: 20px
}
img{
  height: 250px
}
</style>