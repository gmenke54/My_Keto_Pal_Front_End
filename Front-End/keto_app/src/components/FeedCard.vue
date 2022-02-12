<template>
  <div class="feed-card">
    <div>
      <div class="text">{{element.text}}</div>
      <img v-if="element.img" :src="element.img" alt="">
      <div v-if="element.link">
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
  max-width: 150px;
}
</style>