<template>
  <div class="feed-page">
    <div v-if="this.$store.state.isAuthenticated">
    <div @click="this.posting=true" v-if="this.posting===false" class="postBtn">Post</div>
    <AddFeed v-else class="add-feed" @handleSubmit="handleSubmit" />
    <div v-if="this.posting===true" class="dummy" @click="this.posting=false"></div>
    <div class="feed-cont" >
    <div :key=element.id v-for="element in this.$store.state.feed" >
      <FeedCard :element="element" :delete="false" />
    </div>
    </div>
    </div>
    <div v-else>
      <Signin />
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import FeedCard from '../components/FeedCard.vue'
import AddFeed from '../components/AddFeed.vue'
import Signin from '../views/Signin.vue';

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
    Signin
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
  position: fixed;
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
  z-index: 3;
}
.postBtn:hover{
  background-color: #338ee2;
}
.add-feed{
  position: sticky;
  top: 30%;
  margin: 0 auto;
  width: 300px;
  margin-top: -180px;
  z-index: 3;
}
.dummy{
  z-index: 2;
  min-width: 100%;
  min-height: 100%;
  max-height: 90vh;
  position: absolute;
  background-color: white;
  opacity: 0.6
}
</style>