<template>
  <div class="feed-page">
  <div @click="this.posting=true" v-if="this.posting===false" class="postBtn">Post</div>
  <AddFeed v-else class="add-feed" @handleSubmit="handleSubmit" />
  <div class="feed-cont" >
  <div :key=element.id v-for="element in this.$store.state.feed" >
    <FeedCard :element="element" :delete="false" />
  </div>
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
    news: null,
    posting: false
  }),
  beforeCreate(){
    this.$store.dispatch('getFeed')
  },
  components: {
    FeedCard,
    AddFeed,
  },
  mounted(){
  },
  methods: {
    handleSubmit(){
      this.posting = false
    }
  }

}
</script>

<style scoped>
.feed-cont{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  width: 100vw
}
.postBtn{
  position: absolute;
  right: 12px;
}
.postBtn{
  cursor: pointer;
  background-color: #3181CE;
  color: white;
  font-size: 20px;
  font-weight: 500;
  padding: 10px;
  border-radius: 5px;
}
.postBtn:hover{
  background-color: #338ee2;
}
.add-feed{
  position: sticky;
  top: 30%;
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: -190px
}
</style>