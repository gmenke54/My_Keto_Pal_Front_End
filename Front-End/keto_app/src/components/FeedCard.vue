<template>
  <div class="feed-card">
    <div>
      <div v-if="element.text" class="text">{{element.text}}</div>
      <img v-if="element.img" :src="element.img" alt="">
      <div v-if="element.link" class="link">
        <LinkPreview :link="element.link"/>
      </div>
    </div>
    <div v-if="this.delete" @click="delPost()">delete</div>
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
img{
  max-height: 150px;
  border-radius: 10px;
  box-shadow: 0px 0px 12px -5px rgba(0,0,0,0.7);
  margin: 15px;
}
.text{
  max-width: 175px;
  padding: 10px;
  margin: 15px;
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
  margin: 15px;
}
.link:hover{
   box-shadow: 0px 0px 18px -7px rgba(0,0,0,0.7);
}
</style>