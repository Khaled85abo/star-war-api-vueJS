<template>
    <article>
            <h5>{{name}}</h5>
            <p>Average height: {{average_height}}h</p>
            <p>Language: {{language}}</p>
            <p>Classification: {{classification}}</p>
            <p>Average lifespan: {{average_lifespan}}km</p>
            <p>Skin colors: {{skin_colors}}</p>
            <p>Hair colors: {{hair_colors}}</p>
            <p>Eye colors: {{eye_colors}}</p>
    </article>
</template>

<script>
export default {
    props: [''],
    computed:{},
    methods: {}
}
</script>

