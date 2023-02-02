<script>
export default {
  props: {
    pokemon: {
      type: Object,
      required: true
    }
  },
  mounted() {
    this.sprite = this.pokemon.number < 722 ? `https://serebii.net/pokedex-xy/icon/${('000' + this.pokemon.number).slice(-3)}.png` : ''
  },
  data: function () {
    return {
      number: '',
      sprite: ''
    }
  },
}
</script>

<template>
  <router-link :to="`${pokemon.number}`">
    <li class="poke-list-item">
      <img v-if="sprite" :src="sprite" />
      <span>{{ pokemon.number }} - {{ pokemon.name }}</span>
    </li>
  </router-link>
</template>

<style scoped>

</style>
