<template>
      <div class="wrapper">
      <header>
        <p>Star wars catalog</p>
      </header>
      <div class="container">

        <section class="characters">
          <p>Characters</p>
          <Spinner v-if="showListSpinner"/>

          <ul v-else>
          <li v-for="(char, i) in list" v-bind:key='i' v-on:click="renderCharInfo(char)">{{char.name}}</li>
          </ul>
          <div class="page-controller">
            <button class="back-btn" v-bind:disabled="!previousPage" v-on:click="handlePreviousPage">◀</button>
            <span>{{page}}</span>
            <span>/</span>
            <span class="totalpages">{{totalOfPages}}</span>
            <button class="forward-btn" :disabled="!nextPage" @click="handleNextPage" >▶</button>
          </div>
        </section>
        <aside >
          <p>Details</p>
           <Spinner  v-if="showCharacterSpinner" />

          <div class="character-details" v-else>
          <CharTemplate 
            v-if="singleChar"
            v-bind:char='singleChar'
          />
          </div>
  
          <section class="extra-info">
            <div class="btns">
              <input
                type="radio"
                id="radio-1"
                name="tabs"
                data-type="planet"
                checked
              />
              <label for="radio-1" class="tab">Planet</label>
              <input
                type="radio"
                id="radio-2"
                name="tabs"
                data-type="species"
              />
              <label for="radio-2" class="tab">Species</label>
              <input
                type="radio"
                id="radio-3"
                name="tabs"
                data-type="vehicles"
              />
              <label for="radio-3" class="tab">Vehicles</label>
              <input
                type="radio"
                id="radio-4"
                name="tabs"
                data-type="starships"
              />
              <label for="radio-4" class="tab">Starships</label>
            </div>

            <Spinner v-if="showExtraInfoSpinner" />
            <div class="article" v-else>
            <PlanetTemplate  
              v-if="singlePlanet"
              v-bind:planet="singlePlanet"
            />
            </div>
          </section>
        </aside>
              <RobotSvg />
      </div>
    <!-- <router-link to="/" class="top-bar-link">
        <i class="icofont-spoon-and-fork"></i>
        <span>Home</span>
      </router-link> -->


       <!-- <router-view  /> -->
    </div>

</template>

<script>
import RobotSvg from '@/components/RobotSvg.vue'
import Spinner from '@/components/Spinner.vue'
import CharTemplate from '@/components/templates/Character.vue'
import PlanetTemplate from '@/components/templates/Planet.vue'
export default {
  components: {
    RobotSvg,
    Spinner,
    CharTemplate,
    PlanetTemplate
  },
  data(){
    return {
      showListSpinner: true,
      showCharacterSpinner: false, 
      showExtraInfoSpinner: false,
      people: {},
      list : [],
      vehicles: {},
      species: {},
      planets: {},
      totalOfPages: null ,
      singleChar: null,
      singlePlanet: null,
      page: 1,
      previousPage: false,
      nextPage: true,
      count: null,
      baseUrl: "https://swapi.dev/api/",
    }
  },
  // computed: {
  //   disableBtn(){
  //     if(this.page == 1){
  //       this.previousPage = false
  //       this.nextPage = true
  //     }
  //     if(this.page == totalOfPages){
  //       this.previousPage = true
  //       this.nextPage = false
  //     }
  //   }
  // },
  methods: {
    fetchPeople: async function(page){
        const fetchedData = await fetch(`${this.baseUrl}/people/?page=${page}`)
        const data = await fetchedData.json()
        if(page === 1){
        this.count = data.count
        this.totalOfPages = Math.ceil(data.count / data.results.length)
        }
        this.people[page] = data.results
        this.showListSpinner = false
        this.list = data.results
        console.log('data',data)
    },
    renderCharInfo(char){
      this.singleChar = char
      const planetNum = this.getNum(char.homeworld)
      if(this.planets[planetNum]){
        this.singlePlanet = this.planets[planetNum]
      } else {
      this.fetchPlanet(char.homeworld)
      }
    },

   async fetchPlanet(url){
      const fetchedData = await fetch(url)
      const data = await fetchedData.json()
      const planetNum = this.getNum(url)
      this.planets[planetNum] = data
      this.singlePlanet = data
    },

    handleNextPage: function(){
      this.page++
      console.log(this.people[this.page])
      if(this.people[this.page]){
        this.list = this.people[this.page]
      } else {
        this.fetchPeople(this.page)
      }
      this.checkBtns()
    },
    handlePreviousPage(){
       console.log(this.people[this.page])
      this.page--
      if(this.people[this.page]){
        this.list = this.people[this.page]
      } else {
        this.fetchPeople(this.page)
      }
      this.checkBtns()
    },
    checkBtns(){
      if(this.page == 1){
        this.previousPage = false
      } else {
        this.previousPage = true
      }
      if(this.page == this.totalOfPages){
        this.nextPage = false
      } else {
        this.nextPage = true
      }
    },
    getNum: function(url){
        const splittedUrl = url.split('/')
        const filteredUrl = splittedUrl.filter(el=> Number.isInteger(+el) && el !== '')
        return Number(filteredUrl[0])
    }
  },
  mounted(){
    this.showListSpinner = true
    this.fetchPeople(1)
  },
  computed: {}

}
</script>

