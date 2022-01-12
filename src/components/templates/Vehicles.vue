<template>
    <div>
        <article>
            <h5>{{vehicle.name}}</h5>
            <p>Length: {{vehicle.length}}h</p>
            <p>Manufacturer: {{vehicle.manufacturer}}days</p>
            <p>model: {{vehicle.model}}</p>
            <p>Max atmospheric speed: {{vehicle.max_atmosphering_speed}}km</p>
            <p>Crew: {{vehicle.crew}}</p>
            <p>Passengers: {{vehicle.passengers}}</p>
        </article>
        <div class="multi-div" v-if="vehicles.length > 1">
            <button 
            class="multi-back-btn" 
            :disabled="currentArticle == 1"
            @click="preArticle"
             >◀</button>
            <span>{{currentArticle}}</span>
            <span>/</span>
            <span class="totalpages" >{{vehicles.length}}</span>
            <button 
            class="multi-forward-btn" 
            :disabled="currentArticle == vehicles.length"
            @click='nextArticle'
            >▶</button>
        </div>
    </div>
</template>

<script>
export default {
    name: "Vehicles",
    props:['vehicles'],
    data(){
        return {
            vehicle: {},
            currentArticle: 1
        }
    },

    methods: {
        nextArticle: function(){
            if(this.currentArticle < this.vehicles.length ){
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
            this.vehicle = this.vehicles[this.currentArticle -1]
        }
    },
    mounted(){
         this.updateObj()
        // console.log(this.vehicles)
    }
}
</script>

