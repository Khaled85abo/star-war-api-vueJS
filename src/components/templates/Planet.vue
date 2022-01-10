<template>
     <article>
              <h5>{{planet.name}}</h5>
              <p>Rotation period: {{planet.rotation_period}} h</p>
              <p>Orbital period: {{planet.orbital_period}} days</p>
              <p>Diameter: {{planet.diameter}} km</p>
              <p>Climate: {{planet.climate}}</p>
              <p>Gravity: {{planet.gravity}}</p>
              <p>terrain: {{planet.terrain}}</p>
            </article>
</template>

<script >

export default {
    props: ['planet']
}
</script>

