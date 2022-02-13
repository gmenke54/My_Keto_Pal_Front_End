<template>
  <div v-if="this.details" class="link-preview">
    <img :src="details.image" @mouseover="this.hover=true" @mouseleave="this.hover=false" @click="this.redirect()" alt="">
    <div v-if="hover" class="hover">
      <div class="title">{{details.title}}</div>
      <div class="description">{{details.description}}</div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'FeedCard',
  props: {
    link: String
  },
  data: ()=> ({
    details: null,
    hover: false
  }),
  mounted(){
    this.getDetails()
  },
  methods: {
    redirect(){
      window.open(this.details.url)
    },
    async getDetails(){
      let random = Math.floor(Math.random() * 3)
      let key = ''
      switch(random){
        case 0:
          key = process.env.VUE_APP_LINKONE
          break
        case 1:
          key = process.env.VUE_APP_LINKTWO
          break
        case 2:
          key = process.env.VUE_APP_LINKTHREE
          break
        case 3:
          key = process.env.VUE_APP_LINKFOUR
          break
        case 4:
          key = process.env.VUE_APP_LINKFIVE
          break
        case 5:
          key = process.env.VUE_APP_LINKSIX
          break
      }
      const res = await axios.get(`https://api.linkpreview.net/?key=${key}&q=${this.link}`)
      this.details = res.data
    }
  },
  components: {
  }
}
</script>

<style scoped>
img{
  max-height: 150px;
  border-radius: 10px;
}
.hover{
  position: absolute;
  z-index: 2;
  background-color: white;
  color: rgb(59, 59, 59);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  box-shadow: 0px 0px 12px -5px rgba(0,0,0,0.7);
  max-width: 250px;
  padding: 10px;
}
.description{
  font-size: 12px;
  color: rgb(97, 97, 97);
}
.title{
  font-weight: 500
}
</style>