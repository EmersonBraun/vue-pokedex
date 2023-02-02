<script>
import PokeList from './PokeList.vue'

export default {
  components: {
    'poke-list': PokeList
  },
  data: function () {
    return {
      pokeList: [],
      nameFilter: ''
    }
  },
  async mounted() {
    const getNumberFromURL = (url) => {
      return parseInt(url.replace(/.*\/(\d+)\/$/, '$1'));
    }
    const pokemon = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1279')
      .then(response => response.json())
      .then(data => data.results)
      .catch(error => console.log(error))

    console.log(pokemon)
    this.pokeList = pokemon.map(pokemon => {
      pokemon.number = getNumberFromURL(pokemon.url);
      return pokemon
    })
      .filter(pokemon => pokemon.number < 1000)
      .sort((a, b) => (a.number > b.number ? 1 : -1))
  },
  computed: {
    filteredPokeList: function () {
      return this.pokeList.filter(pokemon => {
        return pokemon.name.toLowerCase().includes(this.nameFilter.toLowerCase())
      })
    }
  }
}
</script>

<template>
  <div>
    <input v-model="nameFilter" type="text" id="pokeFilter" placeholder="Search" maxlength="20" />
    <ul class="poke-list">
      <template v-for="item in filteredPokeList" :key="item.number">
        <poke-list :pokemon="item"></poke-list>
      </template>
    </ul>
  </div>
</template>

<style scoped>

</style>
