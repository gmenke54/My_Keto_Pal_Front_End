<template>
<div>
    <div v-if="showLabel">
      <Label class="label" />
    </div>
    <div class="food-card" @mouseover="setLabel" @mouseleave="hideLabel">
      <div class="food-line" v-if="dispUpdate===false" @dblclick="updateFood" >{{food.name}} | Carbs: {{food.carbs.toFixed(1)}}</div>
      <div v-if="dispUpdate===false" @click="delFood" class="btn">-</div>
      <div v-if="dispLoading" class="lds-ring"><div></div><div></div><div></div><div></div></div>
      <div v-if="dispUpdate && dispLoading===false">
        <form @submit.prevent="postFood">
          <input type="text" name="newFood" v-model="newFood" :placeholder="placeholder">
          <button type="submit">Update</button>
        </form>
      </div>
      <button v-if="dispCancel" @click="cancel">Cancel</button>
  </div>
</div>

</template>

<script>
import axios from 'axios'
import Label from '../components/Label.vue'
export default {
  name: 'FoodCard',
  components: {
    Label
  },
  props: {
    food: Object
  },
  data: ()=> ({
    dispUpdate: false,
    newFood: null,
    showLabel: false,
    dispLoading: false,
    error: false,
    dispCancel: false,
  }),
  computed:{
    placeholder(){
      if (this.error===true){
        return "unknown food - try again"
      } else {
        return this.food.name
      }
    },
  },
  methods: {
    cancel(){
      this.dispCancel = false
      this.dispUpdate = false
    },
    setLabel(){
      this.showLabel = true
      this.$store.commit("setFood", this.food)
    },
    hideLabel(){
      this.showLabel = false
    },
    async delFood(){
      console.log(this.food.id)
      console.log(this.food.days)
      const curDay = this.$store.state.day
      console.log(curDay)
      let newArr = this.food.days.filter(dayId => dayId !== curDay.id)
      console.log(newArr)
      const obj = {
        days: newArr
      }
      await axios.put(`/foods/${this.food.id}`, obj)
      let resp = await axios.get('/days')
      console.log(resp.data)
      let id = this.$store.state.user.id
      console.log(curDay)
      const result = resp.data.filter(day => day.user_id===id && day.date===curDay.date)
      console.log(result[0])
      this.$store.commit('setDay', result[0])
    },
    updateFood(){
      this.dispUpdate=true
    },
    async postFood(){
      this.error=false
      this.dispLoading = true

      let curDay = this.$store.state.day
      let locRes = await axios.get('/foods')
      console.log(locRes.data)
      const initialSearch = locRes.data.filter(food => food.name === this.newFood)


      if(initialSearch.length!==0){
        const isCurDay = initialSearch[initialSearch.length-1].days.filter(dayId => dayId === curDay.id)
        if (isCurDay.length !== 0){
          this.newFood = this.newFood.padEnd(this.newFood.length+1, ' ')
        }
      }

      const found = locRes.data.filter(food => food.name === this.newFood)
        if (found.length!==0){
        console.log('found')
        let newArr = found[0].days
        newArr.push(curDay.id)
        await axios.put(`https://ketosis-backend.herokuapp.com/foods/${found[0].id}`, { days: newArr })
        this.delFood()
        let resp = await axios.get('/days')
        console.log(resp.data)
        let id = this.$store.state.user.id
        console.log(curDay)
        const result = resp.data.filter(day => day.user_id===id && day.date===curDay.date)
        console.log(result[0])
        this.$store.commit('setDay', result[0])
        this.newFood = null
        this.dispLoading=false
        this.dispUpdate=false
      }else {
        console.log('item not found')
        let res = await axios.get(`https://api.edamam.com/api/nutrition-data?app_id=${process.env.VUE_APP_ID}&app_key=${process.env.VUE_APP_KEY}&nutrition-type=cooking&ingr=${this.newFood}`)
        let nutrients = res.data
        let transf = 0.0
        try {
          transf = nutrients.totalNutrients.FATRN.quantity
        } catch {
          transf = 0.0
        }
        try {
          let foodObj = {
          days: [curDay.id],
          name: this.newFood,
          weight: nutrients.totalWeight,
          carbs: nutrients.totalNutrients.CHOCDF.quantity,
          calories: nutrients.calories,
          fat: nutrients.totalNutrients.FAT.quantity,
          protein: nutrients.totalNutrients.PROCNT.quantity,
          sugar: nutrients.totalNutrients.SUGAR.quantity,
          fiber: nutrients.totalNutrients.FIBTG.quantity,
          saturated: nutrients.totalNutrients.FASAT.quantity,
          trans: transf,
          chol: nutrients.totalNutrients.CHOLE.quantity,
          sodium: nutrients.totalNutrients.NA.quantity,
          added_sugar: 0.0,
          chol_dv: nutrients.totalDaily.CHOLE.quantity,
          sodium_dv: nutrients.totalDaily.NA.quantity
        }
        let response = await axios.post(`/foods/`, foodObj)
        this.delFood()
        let resp = await axios.get('/days')
        console.log(resp.data)
        let id = this.$store.state.user.id
        const result = resp.data.filter(day => day.user_id===id && day.date===this.date)
        console.log(result[0])
        this.$store.commit('setDay', result[0])
        this.newFood = null
        this.dispLoading=false
        this.dispUpdate=false
        } catch {
          this.dispCancel = true
          this.error = true
          this.dispLoading=false
          this.newFood= null
          console.log('caught error')
        }
      }
    }
  }
}
</script>

<style scoped>
.food-card{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 4px 5px;
  border-radius: 3px;
  cursor: pointer;
}
.food-card:hover{
  background-color:rgb(240, 240, 240)
}

.btn{
  cursor: pointer;
  background-color: #3181CE;
  color: white;
  border-radius: 30px;
  padding: 0 10px;
  font-weight: 900
}
.btn:hover{
  background-color: #338ee2;;
}
.label{
  position: absolute;
  left: -180px
}
.lds-ring {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}
.lds-ring div {
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 64px;
  height: 64px;
  margin: 8px;
  border: 8px solid #3181CE;
  border-radius: 50%;
  animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: #3181CE transparent transparent transparent;
}
.lds-ring div:nth-child(1) {
  animation-delay: -0.45s;
}
.lds-ring div:nth-child(2) {
  animation-delay: -0.3s;
}
.lds-ring div:nth-child(3) {
  animation-delay: -0.15s;
}
@keyframes lds-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>