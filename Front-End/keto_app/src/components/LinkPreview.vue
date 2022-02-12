<template>
  <div v-if="this.details" class="link-preview">
    <img :src="details.image" @mouseover="this.hover=true" @mouseleave="this.hover=false" @click="this.redirect()" alt="">
    <div v-if="hover">
      <div>{{details.title}}</div>
      <div>{{details.description}}</div>
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
      // need to move this to global store and call it on beforeCreate of app.vue and whenever a post is made 
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
        // add 2-3 more keys and increase randomizer
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
  max-width: 150px;
  cursor: pointer;
}
</style>