<template>
  <div class="feed-page">
  <AddFeed />
  <div :key=element.id v-for="element in this.$store.state.feed" >
    <FeedCard :element="element" />
  </div>
  </div>
</template>

<script>
import axios from 'axios'
import FeedCard from '../components/FeedCard.vue'
import AddFeed from '../components/AddFeed.vue'
export default {
  name: 'Feed',
  data: ()=> ({
    news: null
  }),
  components: {
    FeedCard,
    AddFeed,
  },
  mounted(){
    this.getNews()
  },
  methods: {
    // DEBUG this cors issue:
    async getNews(){
      // const res = await axios.get(`https://serpapi.com/search.json?engine=google_scholar&q=ketogenic&scisbd=1&hl=en&num=20&as_vis=1&api_key=36137ef370bbb927779a6ca8963cb804fad42780d418c9d9449f791f511c2d86`)
      // console.log(res.data)
    }
  }

}
</script>