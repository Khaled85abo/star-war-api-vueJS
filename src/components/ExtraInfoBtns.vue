<template>
        <div class="btns">
        <input
            type="radio"
            id="radio-1"
            name="tabs"
            data-type="planet"
            checked
            @click="renderExtraInfo('planet')"
        />
        <label for="radio-1" class="tab">Planet</label>
        <input
            type="radio"
            id="radio-2"
            name="tabs"
            data-type="species"
            @click="renderExtraInfo('species')"
        />
        <label for="radio-2" class="tab">Species</label>
        <input
            type="radio"
            id="radio-3"
            name="tabs"
            data-type="vehicles"
            @click="renderExtraInfo('vehicles')"
        />
        <label for="radio-3" class="tab">Vehicles</label>
        <input
            type="radio"
            id="radio-4"
            name="tabs"
            data-type="starships"
            @click="renderExtraInfo('starships')"
        />
        <label for="radio-4" class="tab">Starships</label>
    </div>
</template>

<script>
export default {
    props: ['renderExtraInfo']
}
</script>

