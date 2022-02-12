<template>
  <div class="profile">
    <div v-if="this.$store.state.isAuthenticated">
      <div v-if="this.$store.state.profile">
        <div class="pic-cont">
          <div class="activity" :class="color">{{this.activity}}</div>
          <!-- <img @mouseover="dispEdit=true" @mouseleave="dispEdit=false" :src="this.$store.state.profile.img" class="pic" alt="profile picture"> -->
          <div v-if="dispEdit" class="edit">click to edit</div>
          
        </div>
        <div class="name">{{ this.$store.state.profile.name}}, {{this.$store.state.profile.age}}</div>
        <div class="nut" @mouseover="this.show=true" @mouseleave="this.show=false" >
          <div v-if="show" class="hole goals">Goals</div>
          <img  :class="this.blur" :src="this.$store.state.profile.img" class="pic hole" alt="profile picture">
            <!-- make this image blurry on mouseover of doughnut -->
          <DoughnutChart :chartData="goalData" :options="this.options" />
        </div>
        <div>{{this.$store.state.user.email}}</div>
        <div @dblclick="togDisplay" class="click">
          <div v-if="displayForm">
            <form @submit.prevent="updateWeight">
              <input type="number" name="newWeight" :placeholder="this.$store.state.profile.cur_weight" v-model="newWeight"/>
              <button type="submit">Update</button>
            </form>
          </div>
          <div v-else>Current Weight: {{this.$store.state.profile.cur_weight}}</div>
          </div>
        <div>Goal Weight: {{this.$store.state.profile.goal_weight}}</div>
        <div>My Posts</div>
        <div :key=element.id v-for="element in this.$store.state.profile.my_posts" >
          <FeedCard :element="element" :delete="true" />
        </div>
        <div class="btn" @click="delProfile">Clear Profile</div>
      </div>
      <div v-else>
        <AddProfile/>
      </div>
    </div>
    <div v-else>
      Please Login!
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import AddProfile from '@/components/AddProfile.vue'
import FeedCard from '@/components/FeedCard.vue'
import { DoughnutChart, BarChart } from 'vue-chart-3';

export default {
  name: 'Profile',
  data: ()=>({
    newWeight: null,
    displayForm: false,
    dispEdit: false,
    color: 'blue',
    favFood: null,
    options: {
        // responsive: false,
        plugins: {
          legend: {
            display: false
          }
        }
      },
      blur: 'clear',
    show: false
  }),

  components: {
    AddProfile,
    FeedCard,
    DoughnutChart
  },
  computed: {
    activity(){
      if (this.$store.state.profile.activ === 'low'){
        this.color = "red"
        return "Not Very Active"
      } else if (this.$store.state.profile.activ === 'med'){
        this.color = "blue"
        return "Moderately Active"
      } else {
        this.color = "gold"
        return "Very Active"
      }
    },
    goalData(){
      // let color = '#3181CE'
      // let rem_carbs = this.$store.state.profile.daily_carb-this.$store.state.curCarbs
      // if (rem_carbs<= 0){
      //   rem_carbs = 0
      //   color = 'rgb(165, 70, 70)';
      // }
      return {
        labels: ['Daily Carbs', 'Daily Fats', 'Daily Sugars'],
        datasets: [
          {
            data: [this.$store.state.profile.daily_carb.toFixed(1), this.$store.state.profile.daily_fat.toFixed(1), this.$store.state.profile.daily_sugar.toFixed(1)],
            backgroundColor: ['rgb(165, 70, 70)', '#3181CE', '#8ee696', ],
          },
        ],
      }
    },
  },

  methods: {
    togDisplay(){
      console.log('displaying')
      this.displayForm=true
    },
    async updateWeight(){
      const id = this.$store.state.user.id
      const update = {
        user: id,
	      user_id: id,
	      cur_weight: this.newWeight
      }
      const res = await axios.put(`/profiles/${id}`, update)
      console.log(res)
      this.newWeight = null
      this.$store.dispatch('setUserId')
      this.displayForm=false
    },
    async delProfile(){
      const id = this.$store.state.user.id
      await axios.delete(`/profiles/${id}`)
      this.$router.go()
    }
  }
}
</script>

<style scoped>
.nut{
  position: relative;
  display: flex;
  justify-content: center;
  margin: 10px;
}
.hole{
  position: absolute;
  top: 25.65%;
  text-align: center;
  font-weight: 700;
  font-size: 33px
}
.goals{
  z-index: 1;
  top: 44.5%
}
.profile{
  display: flex;
  flex-direction: column;
  align-items: center;
}

.pic-cont{
  position: relative;
  text-align: center;
  color: white;
}

.edit{
  position: absolute;
  top: 90%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.pic{
  height: 195px;
  /* border: 2px solid #3181CE; */
  border-radius: 300px
}
.click{
  cursor: pointer;
}
.btn{
  cursor: pointer;
  background-color: #3181CE;
  color: white;
  font-size: 20px;
  font-weight: 500;
  padding: 10px 60px;
  border-radius: 5px;
  width: 30vw
}
.btn:hover{
  background-color: #338ee2;
}
.name{
  font-weight: 600
}
.activity{
  border-radius: 5px;
  color: white;
  width: 90px;
  padding: 5px 0;
  position: absolute;
  /* left: 60%;
  top: 70% */
}
.red{
  background-color: rgb(165, 70, 70);
}
.blue{
  background-color: #3181CE;
}
.gold{
  background-color: rgb(224, 198, 46)
}
.blur{
  opacity: .6;
}

</style>
