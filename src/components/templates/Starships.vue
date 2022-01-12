<template>
    <div>
        <article>
              <h5>{{starship.name}}</h5>
              <p>Starship class: {{starship.starship_class}}</p>
              <p>Langth: {{starship.length}}</p>
              <p>Manufacturer: {{starship.manufacturer}}</p>
              <p>Model: {{starship.model}}</p>
              <p>Passengers: {{starship.passengers}}</p>
              <p>Crew: {{starship.crew}}</p>
              <p>Consumable: {{starship.consumables}}</p>
        </article>
        <div class="multi-div" v-if="starships.length > 1">
             <button 
            class="multi-back-btn" 
            :disabled="currentArticle == 1"
            @click="preArticle"
             >◀</button>
            <span>{{currentArticle}}</span>
            <span>/</span>
            <span class="totalpages">{{starships.length}}</span>
               <button 
            class="multi-forward-btn" 
            :disabled="currentArticle == starships.length"
            @click='nextArticle'
            >▶</button>
        </div>
    </div>
</template>

<script>
export default {
    name: "Starships",
    props:['starships'],
    data(){
        return {
            starship: {},
            currentArticle: 1
        }
    },

    methods: {
        nextArticle: function(){
            if(this.currentArticle < this.starships.length ){
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
            this.starship = this.starships[this.currentArticle -1]
        }
    },
    mounted(){
        console.log(this.starships)
         this.updateObj()
    }
}
</script>

