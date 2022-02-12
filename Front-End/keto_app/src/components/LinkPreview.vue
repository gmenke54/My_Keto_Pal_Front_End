<template>
  <div v-if="this.details" class="link-preview">
    {{details.description}}
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
    details: null
  }),
  mounted(){
    this.getDetails()
  },
  methods: {
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
      }
      const res = await axios.get(`http://api.linkpreview.net/?key=${key}&q=${this.link}`)
      this.details = res.data
    }
  },
  components: {
  }
}
</script>