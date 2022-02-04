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
            v-for="(char, i) in list"
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
            v-bind:disabled="backBtn"
            v-on:click="handlePreviousPage"
          >
            ◀
          </button>
          <span>{{ page }}</span>
          <span>/</span>
          <span class="totalpages">{{ totalPages }}</span>
          <button
            class="forward-btn"
            :disabled="forwardBtn"
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
import { mapState, mapGetters } from "vuex";
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
  data() {
    return {
      activeChar: null,
    };
  },
  methods: {
    handleNextPage() {
      this.activeChar = null;
      this.$store.dispatch(HANDLE_NEXT_PAGE);
    },
    handlePreviousPage() {
      this.activeChar = null;
      this.$store.dispatch(HANDEL_PREV_PAGE);
    },
    // Local method
    renderCharInfo(char, index) {
      this.activeChar = index;
      this.$store.dispatch(SET_CHAR_INFO, { obj: char, index });
    },
  },
  computed: {
    ...mapState([
      "page",
      "list",
      "totalPages",
      "singleChar",
      "showListSpinner",
      "showExtraInfoSpinner",
      "extraInfoType",
      "singlePlanet",
      "speciesArray",
      "vehiclesArray",
      "starshipsArray",
    ]),
    ...mapGetters(["backBtn", "forwardBtn"]),
  },

  mounted() {
    this.$store.dispatch(FETCH_PEOPLE);
  },
};
</script>
