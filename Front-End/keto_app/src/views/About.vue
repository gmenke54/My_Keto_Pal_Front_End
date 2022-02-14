<template>
    <div>
      <div class="about">
        <div class="header">This is a carbohydrate-centric nutrient logging application written in Python, Django, and Vue.js</div>
        <div class="our-about">
          <div class="linkedin">
            This full CRUD borwser-based application was built by:
          </div>
          <div class="flex-col">
                        <a class="linked-in-link" href="https://github.com/gmenke54">GitHub</a>
            <div class="nut">
            <img  @mouseover="this.show=true" @mouseleave="this.show=false" src="https://media-exp1.licdn.com/dms/image/C5603AQGmr5tzUwS9Kg/profile-displayphoto-shrink_800_800/0/1638995274513?e=1650499200&v=beta&t=DMG-0GKAop8i0H9rWH7e6fhIeDw1G2sZ2GT2XFbwUeo" @click="golinkedin" alt="profile image">
              <div v-if="show" class="name">Grant Menke</div>
            </div>
            <!-- <a class="linked-in-link" href="https://www.linkedin.com/in/grantmenke/">Grant Menke</a> -->
            <a class="linked-in-link" href="http://grantmenke.com/">Portfolio</a>
          </div>
        </div>
      </div>
      <div class="credits">
        <div class="resources">Resources</div>
        <div class="links">
          <a
            class="linked-in"
            href="https://vcalendar.io/"
          >
            V-Calendar Date Plugin
          </a>
          <a class="linked-in" href="https://www.canva.com/">
            Canva
          </a>
          <a
            class="linked-in"
            href="https://developer.edamam.com/food-database-api?gclid=CjwKCAiA9aKQBhBREiwAyGP5lakqJnQWwFcILhq97B-LzDVsCwZHrNsD3qaaJzE3jVqGn6UbFuZ7YBoCfiYQAvD_BwE"
          >
           Nutrient Data API
          </a>
          <a
            class="linked-in"
            href="https://www.linkpreview.net/"
          >
            URL Link Preview API
          </a>
          <a
            class="linked-in"
            href="https://loading.io/css/"
          >
            Loading Wheel CSS
          </a>
          <a
            class="linked-in"
            href="https://vue-chart-3.netlify.app/"
          >
            Chart.js Data Mapping Plugin
          </a>
          <a
            class="linked-in"
            href="https://github.com/vueform/toggle"
          >
            Toggle Button Plugin
          </a>
          <a
            class="linked-in"
            href="https://www.youtube.com/watch?v=LXV4wn8scvM&t=2884s"
          >
            Token Based Authentication
          </a>
        </div>
      </div>
    </div>
</template>

<script>

export default {
  name: 'About',
  data: ()=>({
    show: false
  }),
  methods: {
    golinkedin(){
      window.open('https://www.linkedin.com/in/grantmenke/')
    }
  }

}
</script>


<style scoped>
.nut{
    position: relative;
  display: flex;
  justify-content: center;
}
.name{
  color: white;
  position: absolute;
  top: 43.5%;
  text-align: center;
  font-weight: 700;
  font-size: 2.4vw
}
a{
  font-weight: 600
}
.header{
  font-size: 20px;
  font-weight: 900;
}
.linkedin{
  margin-top: 4vh;
}
.flex-col{
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 1.5vh;
}
.linked-in-link {
  text-decoration: none;
  color: rgba(68, 68, 68, 0.87);
  /* height: 48px; */
  /* margin-top: 1vh; */
  margin: 0.5vw;
  /* margin: 10px; */
  /* background-color: rgb(39, 39, 39); */
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 20vw;
  font-weight: 800;
}

.linked-in {
  text-decoration: none;
  color: rgba(68, 68, 68, 0.87);
  margin-top: 2vh;
  /* background-color: rgb(39, 39, 39); */
  padding: 2vw 4vw 2vw 4vw;
  margin: 0.5vw;
  border-radius: 10px;
}

.linked-in:hover,
.linked-in-link:hover {
  color: #3181CE;
  background-color: rgb(255, 255, 255);
  box-shadow: 0px 0px 7px -5px rgba(0,0,0,0.7);
}


.about{
  display: flex;
  flex-direction: column;
  align-items: space-around;
  min-height: 20vh
}

.about,
.credits {
  /* background-color: rgb(29, 29, 29); */
  border-radius: 10px;
  padding: 1.5vw;
  margin: 0 auto;
  width: 70vw;
}

.resources {
  font-size: 20px;
  font-weight: 900;
  cursor: default;
}

.links {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 1vh;
}

img{
  border-radius: 50%;
  height: 18vw;
  cursor: pointer;
  border: 3px solid #3181CE;
}
img:hover{
  border: 3px solid #5fa4e4;
  opacity: 0.75;
}
</style>
