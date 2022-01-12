<template>
    <div>
        <article>
            <h5>{{specie.name}}</h5>
            <p>Average height: {{specie.average_height}}h</p>
            <p>Language: {{specie.language}}</p>
            <p>Classification: {{specie.classification}}</p>
            <p>Average lifespan: {{specie.average_lifespan}}km</p>
            <p>Skin colors: {{specie.skin_colors}}</p>
            <p>Hair colors: {{specie.hair_colors}}</p>
            <p>Eye colors: {{specie.eye_colors}}</p>
        </article>
        <div class="multi-div" v-if="species.length > 1">
        <button 
            class="multi-back-btn" 
            :disabled="currentArticle == 1"
            @click="preArticle"
             >◀</button> 
             <span>{{currentArticle}}</span>
            <span>/</span>
            <span class="totalpages">{{species.length}}</span>
            <button 
                class="multi-forward-btn" 
                :disabled="currentArticle == species.length"
                @click='nextArticle'
            >▶</button>
        </div>
    </div>
</template>

<script>
export default {
    name: "species",
    props:['species'],
    data(){
        return {
            specie: {},
            currentArticle: 1
        }
    },

    methods: {
        nextArticle: function(){
            if(this.currentArticle < this.species.length ){
                this.currentArticle++
                this.updateObj()
            }
        },
        preArticle(){
            if( this.currentArticle > 1 ){
            this.currentArticle--
            this.updateObj()
            }
        },
        updateObj(){
            this.specie = this.species[this.currentArticle -1]
        }
    },
    mounted(){
        console.log('species: ',this.species)
         this.updateObj()
    }
}
</script>

