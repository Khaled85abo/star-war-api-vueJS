<template>
     <article>
        <h5>{{char.name}}</h5>
        <p>Height: {{char.height}}cm</p>
        <p>Mass: {{char.mass}} kg</p>
        <p>Hair color: {{char.hair_color}}</p>
        <p>Skin color: {{char.skin_color}}</p>
        <p>Eye color: {{char.eye_color}}</p>
        <p>Birth year:{{char.birth_year}}</p>
        <p>Gender: {{char.gender}}</p>
    </article>
</template>

<script >

export default {
props: ['char']
}

</script>
