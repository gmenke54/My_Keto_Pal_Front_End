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
        <LineChart :chartData="weightData" :options="this.options"/>
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
        <div v-if="this.dispValue" class="flex-row">
          <div>Display Decimals</div>
          <Toggle v-model="value" class="toggle-blue" offLabel="0" onLabel="1" @change="this.toggle()"/>
        </div>
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
import { DoughnutChart, BarChart, LineChart } from 'vue-chart-3';
import Toggle from '@vueform/toggle'

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
      show: false,
      options: {
        // responsive: false,
        plugins: {
          legend: {
            display: false
          }
        }
      },
      value: null
  }),

  components: {
    AddProfile,
    FeedCard,
    DoughnutChart,
    LineChart,
    Toggle
    
  },
  // beforeMount(){
  //   dispValue()
  // }
  computed: {
    dispValue(){
      if (this.$store.state.profile.decimals === 0){
        this.value = false
        return true
      } else {
        this.value = true
        return true
      }
    },
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
      return {
        labels: ['Daily Carbs', 'Daily Fats', 'Daily Sugars'],
        datasets: [
          {
            data: [this.$store.state.profile.daily_carb.toFixed(this.$store.state.profile.decimals), this.$store.state.profile.daily_fat.toFixed(this.$store.state.profile.decimals), this.$store.state.profile.daily_sugar.toFixed(this.$store.state.profile.decimals)],
            backgroundColor: ['rgb(165, 70, 70)', '#3181CE', '#8ee696', ],
          },
        ],
      }
    },
    weightData(){
        console.log(this.$store.state.profile.keto_weeks)
        let months = Math.round(this.$store.state.profile.keto_weeks/4.5)
        console.log('Months:', months)
        let monthNum = parseInt(this.$store.state.profile.created_at.slice(5,7))
        let allMonths = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
        let monthsArr = []
        let weightArr = [this.$store.state.profile.goal_weight]
        let colorsArr = []
        for (let i=0; i<months; i++){
          if (i===months-1){
            colorsArr.push('#8ee696')
          } else {
            colorsArr.push('#3181CE')
          }
        }
        for (let i=monthNum-1; i<monthNum+months-1; i++){
          if (i>11){
            console.log(i-12)
            monthsArr.push(allMonths[i-12])
          } else {
            console.log(i)
            monthsArr.push(allMonths[i])
          }
        }
        // const a = Math.log(this.$store.state.profile.cur_weight);
        // const b = Math.log(this.$store.state.profile.goal_weight);
        console.log(months)
        let c = (this.$store.state.profile.cur_weight - this.$store.state.profile.goal_weight) / (months - 1);

        // for (let i = 1; i < months - 1; i++) {
        //   weightArr.push((2.718 ** (a - i * c)).toFixed(this.$store.state.profile.decimals));
        // }

        for (let i = 1; i < months - 1; i++) {
          let weightPoint = weightArr[i - 1] + (i * c) / 3
          console.log(weightPoint)
          weightArr.push(weightPoint);
          console.log(weightArr)
        }


        // let loss = (this.$store.state.profile.cur_weight - this.$store.state.profile.goal_weight) / this.$store.state.profile.keto_weeks * 5
        // for (let i=0; i<months; i++){
        //   weightArr.push((this.$store.state.profile.cur_weight - (i*loss)).toFixed(this.$store.state.profile.decimals))
        // }
        weightArr.push(this.$store.state.profile.cur_weight);
        weightArr = weightArr.reverse()

        // console.log(monthsArr)
        console.log(weightArr)

        let newArr = weightArr.map((point)=> point.toFixed(this.$store.state.profile.decimals))

        console.log(newArr)

        return {
        labels: monthsArr,
        datasets: [
          {
            data: newArr,
            backgroundColor: colorsArr,
          },
        ],
      }

    }
  },

  methods: {
    async toggle(){
      if(this.value === false){
        // this.$store.commit('setDecimals', 0)
        const res = await axios.put(`/profiles/${this.$store.state.user.id}`, {
          user: this.$store.state.user.id,
          user_id: this.$store.state.user.id,
          decimals: 0
        })
        console.log('set to 0')
        console.log(res.data)
        this.$store.dispatch('setUserId')
      } else {
        // this.$store.commit('setDecimals', 1)
          const res = await axios.put(`/profiles/${this.$store.state.user.id}`, {
          user: this.$store.state.user.id,
          user_id: this.$store.state.user.id,
          decimals: 1
        })
        console.log('set to 1')
        console.log(res.data)
        this.$store.dispatch('setUserId')
      }
      
    }, 
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
.flex-row{
  display: flex;
  flex-direction: row;
  justify-content: center;
}
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
.toggle-blue {
  --toggle-bg-on: #3181CE;
  
  --toggle-border-on:#3181CE;
}
</style>

<style src="@vueform/toggle/themes/default.css">

</style>