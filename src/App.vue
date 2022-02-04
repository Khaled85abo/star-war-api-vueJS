<template>
  <div class="wrapper">
    <header>
      <p>Star wars catalog</p>
    </header>
    <div class="container">
      <section class="characters">
        <p>Characters</p>
        <Spinner v-if="showListSpinner" />

        <ul v-else>
          <li
            v-for="(char, i) in characters"
            v-bind:key="i"
            v-on:click="renderCharInfo(char, i)"
            v-bind:class="{ active: activeChar == i }"
          >
            {{ char.name }}
          </li>
        </ul>
        <div class="page-controller">
          <button
            class="back-btn"
            v-bind:disabled="$store.getters.backBtn"
            v-on:click="handlePreviousPage"
          >
            ◀
          </button>
          <span>{{ page }}</span>
          <span>/</span>
          <span class="totalpages">{{ totalPages }}</span>
          <button
            class="forward-btn"
            :disabled="$store.getters.forwardBtn"
            @click="handleNextPage"
          >
            ▶
          </button>
        </div>
      </section>
      <aside>
        <p>Details</p>

        <div class="character-details">
          <CharTemplate v-if="singleChar" v-bind:char="singleChar" />
        </div>
        <section class="extra-info">
          <ExtraInfoBtns />
          <Spinner v-if="showExtraInfoSpinner" />
          <div class="article" v-else>
            <!-- https://vuejs.org/v2/guide/components.html#Dynamic-Components -->
            <PlanetTemplate
              v-if="singlePlanet && extraInfoType === 'planet'"
              v-bind:planet="singlePlanet"
            />
            <SpeciesTemplate
              v-if="speciesArray.length > 0 && extraInfoType === 'species'"
              v-bind:species="speciesArray"
            />
            <VehiclesTemplate
              v-if="vehiclesArray.length > 0 && extraInfoType === 'vehicles'"
              v-bind:vehicles="vehiclesArray"
            />
            <StarshipsTemplate
              v-if="starshipsArray.length > 0 && extraInfoType === 'starships'"
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
import RobotSvg from "@/components/RobotSvg.vue";
import Spinner from "@/components/Spinner.vue";
import ExtraInfoBtns from "@/components/ExtraInfoBtns.vue";
import {
  CharTemplate,
  PlanetTemplate,
  VehiclesTemplate,
  SpeciesTemplate,
  StarshipsTemplate,
} from "./components/templates";
import {
  FETCH_PEOPLE,
  HANDEL_PREV_PAGE,
  HANDLE_NEXT_PAGE,
  SET_CHAR_INFO,
} from "./Constants";
export default {
  components: {
    RobotSvg,
    Spinner,
    ExtraInfoBtns,
    CharTemplate,
    PlanetTemplate,
    SpeciesTemplate,
    StarshipsTemplate,
    VehiclesTemplate,
  },
  methods: {
    handleNextPage() {
      this.$store.dispatch(HANDLE_NEXT_PAGE);
    },
    handlePreviousPage() {
      this.$store.dispatch(HANDEL_PREV_PAGE);
    },
    // Local method
    renderCharInfo(char, index) {
      this.$store.dispatch(SET_CHAR_INFO, { obj: char, index });
    },
  },
  computed: {
    page() {
      return this.$store.state.page;
    },
    totalPages() {
      return this.$store.state.totalPages;
    },
    characters() {
      return this.$store.state.list;
    },
    singleChar() {
      return this.$store.state.singleChar;
    },
    showListSpinner() {
      return this.$store.state.showListSpinner;
    },
    showExtraInfoSpinner() {
      return this.$store.state.showExtraInfoSpinner;
    },
    extraInfoType() {
      return this.$store.state.extraInfoType;
    },
    singlePlanet() {
      return this.$store.state.singlePlanet;
    },
    speciesArray() {
      return this.$store.state.speciesArray;
    },
    vehiclesArray() {
      return this.$store.state.vehiclesArray;
    },
    starshipsArray() {
      return this.$store.state.starshipsArray;
    },
    activeChar() {
      return this.$store.state.activeChar;
    },
  },

  mounted() {
    this.$store.dispatch(FETCH_PEOPLE);
  },
};
</script>
