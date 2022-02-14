<template>
  <div class="cont">
    <div class="add-post">
      <div class="btnBar">
        <div @click="selectStory()" :class="storyClass" class="btn">Story</div>
        <div @click="selectLink()" :class="linkClass" class="btn">Link</div>
        <div @click="selectImage()" :class="imageClass" class="btn">Image</div>
      </div>
      <form class="form-cont" @submit.prevent="submitPost">
        <input v-if="this.storyStatus" type="text" name="text" placeholder="share some encouraging words" v-model="text" />
        <input v-if="this.imageStatus" type="text" name="image" placeholder="share an image url" v-model="image"/>
        <input v-if="this.linkStatus" type="text" name="link" placeholder="share a helpful link" v-model="link"/>
        <button class="blueBtn" type="submit">Post</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'AddFeed',
  data:() => ({
    text: null,
    image: null,
    link: null,
    slide: 0,
    storyStatus: true,
    linkStatus: false,
    imageStatus: false,
    storyClass: 'blue',
    linkClass: 'black',
    imageClass: 'black',
  }),
  methods: {
    selectStory(){
      this.storyStatus = true
      this.linkStatus = false
      this.imageStatus = false
      this.image = null
      this.link = null
      this.imageClass = 'black'
      this.linkClass = 'black'
      this.storyClass = 'blue'
    },
    selectLink(){
      this.storyStatus = false
      this.linkStatus = true
      this.imageStatus = false
      this.image = null
      this.text = null
      this.imageClass = 'black'
      this.linkClass = 'blue'
      this.storyClass = 'black'
    },
    selectImage(){
      this.storyStatus = false
      this.linkStatus = false
      this.imageStatus = true
      this.text = null
      this.link = null
      this.imageClass = 'blue'
      this.linkClass = 'black'
      this.storyClass = 'black'
    },
    async submitPost(e){
      this.$emit('handleSubmit', e)
      const newPost = {
        type: "post",
        profile: this.$store.state.profile.user,
        text: this.text,
        img: this.image,
        link: this.link
      }
    this.text = null
    this.image = null
    this.link = null
    await axios.post(`/posts/`, newPost)
    this.$store.dispatch('getFeed')
    this.$store.dispatch('setUserId')

    }
  }

}
</script>

<style scoped>

.add-post{
  width: 300px;
  height: 170px;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  padding: 5px 0 5px 0;
  border-radius: 10px;
  box-shadow: 0px 0px 19px -5px rgba(0,0,0,0.7);
}
.btnBar{
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 275px;
  font-weight: 600;
  color: #2c3e50;
}
.btn{
  border-radius: 5px;
  padding: 8px 12px;
  background-color: white;
  cursor: pointer;
}
.btn:hover{
  background-color: rgb(233, 233, 233);
}
.form-cont{
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
input{
  width: 260px
}
.blueBtn{
  cursor: pointer;
  background-color: #3181CE;
  color: white;
  font-size: 20px;
  font-weight: 500;
  padding: 10px 60px;
  border-radius: 5px;
  border: none;
}
.blueBtn:hover{
  background-color: #358bdb;
}

.blue{
  color: #3181CE;
   background-color: rgb(233, 233, 233);
}

</style>