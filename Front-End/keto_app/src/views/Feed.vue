<template>
  <div class="feed-page">
  <AddFeed />
  <div :key=element.id v-for="element in this.$store.state.feed" >
    <FeedCard :element="element" :delete="false" />
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
  },
  methods: {
  }

}
</script>