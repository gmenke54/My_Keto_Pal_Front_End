<template>
  <div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'DayCard',
  props: {
    date: String
  },
  mounted() {
    this.getCurrentDay()
  },
  updated(){
    this.getCurrentDay()
  },
  methods: {
    async getCurrentDay(){
      let id = this.$store.state.user.id
      let res = await axios.get('/days')
      const result = res.data.filter(day => day.user_id===id && day.date===this.date)
      if (result.length>0){
        this.$store.commit('setDay', result[0])
      } else {
        this.$store.commit('setDay', null)
      }
    }
  }
}
</script>