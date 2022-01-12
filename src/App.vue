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
          <li 
          v-for="(char, i) in list" 
          v-bind:key='i' 
          v-on:click="renderCharInfo(char)"
          >
          {{char.name}}
          </li>
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
            <ExtraInfoBtns 
             v-bind:renderExtraInfo="renderExtraInfo"
            />
            <Spinner v-if="showExtraInfoSpinner" />
            <div class="article" v-else>
              <PlanetTemplate  
                v-if="singlePlanet && extraInfoType ==='planet'"
                v-bind:planet="singlePlanet"
              />
              <SpeciesTemplate  
                v-if="speciesArray.length > 0 && extraInfoType ==='species'"
                v-bind:species="speciesArray"
              />
              <VehiclesTemplate  
                v-if="vehiclesArray.length > 0 && extraInfoType ==='vehicles'"
                v-bind:vehicles="vehiclesArray"
              />
              <StarshipsTemplate  
                v-if="starshipsArray.length > 0 && extraInfoType ==='starships'"
                v-bind:starships="starshipsArray"
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
import ExtraInfoBtns from '@/components/ExtraInfoBtns.vue'
import CharTemplate from '@/components/templates/Character.vue'
import PlanetTemplate from '@/components/templates/Planet.vue'
import SpeciesTemplate from '@/components/templates/Species.vue'
import StarshipsTemplate from '@/components/templates/Starships.vue'
import VehiclesTemplate from '@/components/templates/Vehicles.vue'
export default {
  components: {
    RobotSvg,
    Spinner,
    ExtraInfoBtns,
    CharTemplate,
    PlanetTemplate,
    SpeciesTemplate,
    StarshipsTemplate,
    VehiclesTemplate
  },
  data(){
    return {
      active: true,
      showListSpinner: true,
      showCharacterSpinner: false, 
      showExtraInfoSpinner: false,
      extraInfoType: 'planet',
      people: {},
      list : [],
      vehicles: {},
      vehiclesArray: [],
      species: {},
      speciesArray: [],
      starships: {},
      starshipsArray: [],
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
      this.renderExtraInfo('planet')
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
    renderExtraInfo(type){
      if(!this.singleChar){
        return
      }
      this.showExtraInfoSpinner = true

      const info = this.singleChar[type]
      switch (type) {
        case 'planet':
          this.fetchPlanet(this.singleChar.homeworld)
          break;
        case 'vehicles':
           this.getVehicles(info)
          break;
        case 'starships':
           this.getStarships(info)
          break;
        case 'species':
           this.getSpecies(info)
          break;
      }
      this.extraInfoType = type
      // this.showExtraInfoSpinner = false
    },
   async fetchPlanet(url){
   
      const planetNum = this.getNum(url)
      if(this.planets[planetNum]){
        this.singlePlanet = this.planets[planetNum]
      } else {     
      const fetchedData = await fetch(url)
      const data = await fetchedData.json()
      this.planets[planetNum] = data
      this.singlePlanet = data
      }
      this.showExtraInfoSpinner = false

    },
   async getVehicles(urls){
      let output = []
      for(let url of urls){
          let vehicle = {}
          let vehicleNum = this.getNum(url)
          if(this.vehicles[vehicleNum]){
            vehicle = this.vehicles[vehicleNum]
          } else {
            const fetchedData = await fetch(`https://swapi.dev/api/vehicles/${vehicleNum}/`)
            vehicle = await fetchedData.json()
          }
            output.push(vehicle)
            this.vehicles[vehicleNum] = vehicle
      }
       this.vehiclesArray = output
       this.showExtraInfoSpinner = false
    },
   async getSpecies(urls){
      let output = []
      for(let url of urls){
          let specie = {}
          const specieNum = this.getNum(url)
          if(this.species[specieNum]){
            specie = this.species[specieNum]
          } else {
            const fetchedData = await fetch(`https://swapi.dev/api/species/${specieNum}/`)
            specie = await fetchedData.json()
          }
            output.push(specie)
            

      }
      this.speciesArray = output
      this.showExtraInfoSpinner = false
    },
   async getStarships(urls){
      let output = []
      for(let url of urls){
          let starship = {}
          const starshipNum = this.getNum(url)
          if(this.starships[starshipNum]){
            starship = this.starships[starshipNum]
          } else {
            const fetchedData = await fetch(`https://swapi.dev/api/starships/${starshipNum}/`)
            starship = await fetchedData.json()
            this.starships[starshipNum] = starship
          }
            output.push(starship)
      }
       this.starshipsArray = output
       this.showExtraInfoSpinner = false
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

