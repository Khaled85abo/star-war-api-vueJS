<template>
  <div class="btns">
    <input
      type="radio"
      id="radio-1"
      name="tabs"
      data-type="planet"
      checked
      @click="renderPlanet"
    />
    <label for="radio-1" class="tab">Planet</label>
    <input
      type="radio"
      id="radio-2"
      name="tabs"
      data-type="species"
      @click="renderSpecies"
    />
    <label for="radio-2" class="tab">Species</label>
    <input
      type="radio"
      id="radio-3"
      name="tabs"
      data-type="vehicles"
      @click="renderVehicles"
    />
    <label for="radio-3" class="tab">Vehicles</label>
    <input
      type="radio"
      id="radio-4"
      name="tabs"
      data-type="starships"
      @click="renderStarships"
    />
    <label for="radio-4" class="tab">Starships</label>
  </div>
</template>

<script>
import {
  PLANET,
  VEHICLES,
  STARSHIPS,
  SPECIES,
  RENDER_EXTRA_INFO,
} from "../Constants";
export default {
  methods: {
    renderPlanet() {
      this.$store.dispatch(RENDER_EXTRA_INFO, PLANET);
    },
    renderVehicles() {
      this.$store.dispatch(RENDER_EXTRA_INFO, VEHICLES);
    },
    renderSpecies() {
      this.$store.dispatch(RENDER_EXTRA_INFO, SPECIES);
    },
    renderStarships() {
      this.$store.dispatch(RENDER_EXTRA_INFO, STARSHIPS);
    },
  },
};
</script>
