import Vue from "vue";
import Vuex from "vuex";
import {
  FETCH_PEOPLE,
  FETCH_PLANET,
  FETCH_SPECIES,
  FETCH_STARSHIPS,
  FETCH_VEHICLES,
  SHOW_EXTRA_INFO_SPINNER,
  HIDE_EXTRA_INFO_SPINNER,
  SHOW_LIST_SPINNER,
  HIDE_LIST_SPINNER,
  SET_COUNT_AND_TOTAL_PAGES,
  SET_PEOPLE,
  SET_PLANET,
  SET_PLANETS,
  SET_SPECIES,
  SET_SPECIES_ARRAY,
  SET_STARSHIP_ARRAY,
  SET_STARSHIPS,
  SET_VEHICLE_ARRAY,
  SET_VEHICLES,
  INCREMENT_PAGE,
  DECREMENT_PAGE,
  SET_LIST,
  SET_EXTRA_INFO_TYPE,
  SET_CHAR,
  RENDER_EXTRA_INFO,
  PLANET,
  VEHICLES,
  STARSHIPS,
  SPECIES,
} from "../Constants";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    showListSpinner: true,
    showExtraInfoSpinner: false,
    extraInfoType: "planet",
    people: {},
    list: [],
    vehicles: {},
    vehiclesArray: [],
    species: {},
    speciesArray: [],
    starships: {},
    starshipsArray: [],
    planets: {},
    totalPages: null,
    singleChar: null,
    singlePlanet: null,
    page: 1,
    previousPage: false,
    nextPage: true,
    count: null,
    baseUrl: "https://swapi.dev/api/",
  },
  actions: {
    getNum(context, url) {
      const splittedUrl = url.split("/");
      const filteredUrl = splittedUrl.filter(
        (el) => Number.isInteger(+el) && el !== ""
      );
      return Number(filteredUrl[0]);
    },
    async fetchPeople(context) {
      context.commit(SHOW_LIST_SPINNER);
      const fetchedData = await fetch(
        `${context.state.baseUrl}/people/?page=${context.state.page}`
      );
      const data = await fetchedData.json();
      if (context.state.page === 1) {
        const totalPages = Math.ceil(data.count / data.results.length);
        context.commit(SET_COUNT_AND_TOTAL_PAGES, {
          count: data.count,
          totalPages,
        });
      }
      context.commit(SET_PEOPLE, data.results);
      context.commit(SET_LIST);
      context.commit(HIDE_LIST_SPINNER);
    },

    setCharInfo(context, payload) {
      context.commit(SET_CHAR, payload.obj);
      context.dispatch(RENDER_EXTRA_INFO, PLANET);
    },

    async fetchPlanet(context, url) {
      // const planetNum = this.getNum(url);
      const splittedUrl = url.split("/");
      const filteredUrl = splittedUrl.filter(
        (el) => Number.isInteger(+el) && el !== ""
      );
      const planetNum = Number(filteredUrl[0]);

      if (context.state.planets[planetNum]) {
        context.commit(SET_PLANET, planetNum);
      } else {
        const fetchedData = await fetch(url);
        const data = await fetchedData.json();
        // commit assign a new object value with key of planet number
        context.commit(SET_PLANETS, { obj: data, num: planetNum });
      }
    },

    async fetchVehicles(context, urls) {
      let output = [];
      for (let url of urls) {
        let vehicle = {};
        // let vehicleNum = context.dispatch(GET_NUM, url); // this.getNum(url);
        const splittedUrl = url.split("/");
        const filteredUrl = splittedUrl.filter(
          (el) => Number.isInteger(+el) && el !== ""
        );
        const vehicleNum = Number(filteredUrl[0]);
        if (context.state.vehicles[vehicleNum]) {
          vehicle = context.state.vehicles[vehicleNum];
        } else {
          const fetchedData = await fetch(
            `https://swapi.dev/api/vehicles/${vehicleNum}/`
          );
          vehicle = await fetchedData.json();
          context.commit(SET_VEHICLES, { obj: vehicle, num: vehicleNum });
        }
        output.push(vehicle);
      }
      // commit assign vehicles array to output
      context.commit(SET_VEHICLE_ARRAY, output);
    },

    async fetchSpecies(context, urls) {
      let output = [];
      for (let url of urls) {
        let specie = {};
        // const specieNum = this.getNum(url);
        const splittedUrl = url.split("/");
        const filteredUrl = splittedUrl.filter(
          (el) => Number.isInteger(+el) && el !== ""
        );
        const specieNum = Number(filteredUrl[0]);
        if (context.state.species[specieNum]) {
          specie = context.state.species[specieNum];
        } else {
          const fetchedData = await fetch(
            `https://swapi.dev/api/species/${specieNum}/`
          );
          specie = await fetchedData.json();
          context.commit(SET_SPECIES, { obj: specie, num: specieNum });
        }
        output.push(specie);
      }
      context.commit(SET_SPECIES_ARRAY, output);
    },

    async fetchStarships(context, urls) {
      let output = [];
      for (let url of urls) {
        let starship = {};
        // const starshipNum = this.getNum(url);
        const splittedUrl = url.split("/");
        const filteredUrl = splittedUrl.filter(
          (el) => Number.isInteger(+el) && el !== ""
        );
        const starshipNum = Number(filteredUrl[0]);
        if (context.state.starships[starshipNum]) {
          starship = context.state.starships[starshipNum];
        } else {
          const fetchedData = await fetch(
            `https://swapi.dev/api/starships/${starshipNum}/`
          );
          starship = await fetchedData.json();

          context.commit(SET_STARSHIPS, { obj: starship, num: starshipNum });
        }
        output.push(starship);
      }
      context.commit(SET_STARSHIP_ARRAY, output);
    },
    async handleNextPage(context) {
      context.commit(INCREMENT_PAGE);
      if (context.state.people[context.state.page]) {
        context.commit(SET_LIST);
      } else {
        await context.dispatch(FETCH_PEOPLE);
      }
    },
    async handlePrevPage(context) {
      context.commit(DECREMENT_PAGE);
      if (context.state.people[context.state.page]) {
        context.commit(SET_LIST);
      } else {
        await context.dispatch(FETCH_PEOPLE);
      }
    },

    async renderExtraInfo(context, type) {
      context.commit(SHOW_EXTRA_INFO_SPINNER);
      if (!context.state.singleChar) {
        return;
      }
      context.commit(SET_EXTRA_INFO_TYPE, type);
      const urlArray = context.state.singleChar[type];
      switch (type) {
        case PLANET:
          await context.dispatch(
            FETCH_PLANET,
            context.state.singleChar.homeworld
          );
          break;
        case VEHICLES:
          await context.dispatch(FETCH_VEHICLES, urlArray);
          break;
        case STARSHIPS:
          await context.dispatch(FETCH_STARSHIPS, urlArray);
          break;
        case SPECIES:
          await context.dispatch(FETCH_SPECIES, urlArray);
          break;
      }
      context.commit(HIDE_EXTRA_INFO_SPINNER);
    },
  },
  mutations: {
    setExtraInfoType(state, type) {
      console.log("from mutation :", type);
      state.extraInfoType = type;
    },
    setCountAndTotalPages(state, data) {
      state.count = data.count;
      state.totalPages = data.totalPages;
    },
    incrementPage(state) {
      state.activeChar = null;
      if (state.page < state.totalPages) state.page++;
    },
    decrementPage(state) {
      state.activeChar = null;
      if (state.page > 1) state.page--;
    },
    setPeople(state, data) {
      state.people[state.page] = data;
    },
    setList(state) {
      state.list = state.people[state.page];
    },
    showListSpinner(state) {
      state.showListSpinner = true;
    },
    hideListSpinner(state) {
      state.showListSpinner = false;
    },
    showExtraInfoSpinner(state) {
      state.showExtraInfoSpinner = true;
    },
    hideExtraInfoSpinner(state) {
      state.showExtraInfoSpinner = false;
    },
    setChar(state, char) {
      state.singleChar = char;
    },

    setPlanet(state, urlNum) {
      state.singlePlanet = state.planets[urlNum];
    },
    setPlanets(state, data) {
      state.planets[data.num] = data.obj;
      state.singlePlanet = data.obj;
    },
    setVehicles(state, data) {
      state.vehicles[data.num] = data.obj;
    },
    setVehicleArray(state, arr) {
      state.vehiclesArray = arr;
    },
    setStarshipArray(state, arr) {
      state.starshipsArray = arr;
    },
    setSpeciesArray(state, arr) {
      state.speciesArray = arr;
    },
    setSpecies(state, data) {
      state.species[data.num] = data.obj;
    },
    setStarships(state, data) {
      state.starships[data.num] = data.obj;
    },
  },
  getters: {
    backBtn(state) {
      if (state.page === 1) {
        return true;
      } else {
        return false;
      }
    },
    forwardBtn(state) {
      if (state.page === state.totalPages) {
        return true;
      } else {
        return false;
      }
    },
  },
  modules: {},
});
