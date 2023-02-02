<script>
export default {
  data() {
    return {
      pkm: { types: [] },
      sprite: '',
      formatedNumber: '',
      encounters: []
    }
  },
  async mounted() {
    this.sprite = this.$route.params.number < 722 ? `https://serebii.net/sunmoon/pokemon/${('000' + this.$route.params.number).slice(-3)}.png` : ''

    this.formatedNumber = ('000' + this.$route.params.number).slice(-3)
    this.pkm = await fetch(`https://pokeapi.co/api/v2/pokemon/${this.$route.params.number}`)
      .then(response => response.json())
      .then(data => data)
      .catch(error => console.log(error))

    this.encounters = await fetch(`https://pokeapi.co/api/v2/pokemon/${this.$route.params.number}/encounters`)
      .then(response => response.json())
      .then(data => data)
      .catch(error => console.log(error))
  }
}
</script>

<template>
  <div>
    <router-link to="/" class="back-button"> &lt; </router-link>
    <div class="poke-profile">
      <div>#{{ formatedNumber }} - {{ pkm.name }}</div>
      <img v-if="sprite" class="poke-sprite" :src="sprite" />
    </div>
    <ul class="poke-types">
      <li v-for="type in pkm.types">
        <img :src="`https://serebii.net/pokedex-bw/type/${type.type.name}.gif`" />
      </li>
    </ul>

    <table class="table col-md-6 offset-md-3">
      <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Base Stat</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="stat of pkm.stats">
          <td>{{ stat.stat.name }}</td>
          <td>{{ stat.base_stat }}</td>
        </tr>
      </tbody>
    </table>

    <table class="table col-md-6 offset-md-3">
      <thead>
        <tr>
          <th scope="col">ability</th>
          <th scope="col">is hidden?</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="ability of pkm.abilities">
          <td>{{ ability.ability.name }}</td>
          <td>{{ ability.is_hidden }}</td>
        </tr>
      </tbody>
    </table>

    <template v-if="encounters.length > 0">
      <table class="table col-md-6 offset-md-3">
        <thead>
          <tr>
            <th scope="col">Location Area</th>
            <th scope="col">Min level</th>
            <th scope="col">Max level</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="encounter of encounters">
            <td>{{ encounter.location_area.name }}</td>
            <td>{{ encounter.version_details[0].encounter_details[0].min_level || 'NO DATA' }}</td>
            <td>{{ encounter.version_details[0].encounter_details[0].max_level || 'NO DATA' }}</td>
          </tr>
        </tbody>
      </table>
    </template>

    <table class="table col-md-6 offset-md-3">
      <thead>
        <tr>
          <th scope="col">Game index</th>
          <th scope="col">Version</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="game_index of pkm.game_indices">
          <td>{{ game_index.game_index }}</td>
          <td>{{ game_index.version.name }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>

</style>
