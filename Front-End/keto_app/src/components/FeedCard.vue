<template>
  <div class="feed-card">
    <div>
      <div v-if="element.text" class="text">{{element.text}}</div>
      <img v-if="element.img" :src="element.img" alt="">
      <div v-if="element.link" class="link">
        <LinkPreview :link="element.link"/>
      </div>
    </div>
    <div class="delBtn" v-if="this.delete" @click="delPost()">delete</div>
  </div>
</template>

<script>
import axios from 'axios'
import LinkPreview from '../components/LinkPreview.vue'
export default {
  name: 'FeedCard',
  methods: {
    async delPost(){
      await axios.delete(`/posts/${this.element.id}`)
      this.$store.dispatch('setUserId')
      this.$store.dispatch('getFeed')
    }
  },
  props: {
    element: Object,
    delete: Boolean
  },
  components: {
    LinkPreview,
  }
}
</script>

<style scoped>
.delBtn{
  cursor: pointer;
  background-color: #3181CE;
  color: white;
  border-radius: 0 0 5px 5px;
  padding: 0 10px;
  font-weight: 500;
  width: 60%
}
.delBtn:hover{
  background-color: #338ee2;;
}

.feed-card{
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 15px;
}

img{
  max-height: 150px;
  border-radius: 10px;
  box-shadow: 0px 0px 12px -5px rgba(0,0,0,0.7);
}
.text{
  max-width: 175px;
  padding: 10px;

  background-color: white;
  color: rgb(65, 65, 65);
  font-weight: 500;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  box-shadow: 0px 0px 12px -5px rgba(0,0,0,0.7);
  cursor: default
}
.link{
  max-height: 150px;
  border-radius: 10px;
  box-shadow: 0px 0px 12px -5px rgba(0,0,0,0.7);
  cursor: pointer;
  z-index: 4;
}
.link:hover{
   box-shadow: 0px 0px 18px -7px rgba(0,0,0,0.7);
}
</style>