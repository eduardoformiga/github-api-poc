<template>
  <div class="home">
    <div container>
      <section class="search">
        <input
          id="search"
          type="text"
          name="search"
        />
        <button @click="loadRepos">repos</button>
        <button @click="loadStarreds">starred</button>
      </section>
      <section class="list">
        <div>
          <ul>
            <li
              v-for="(item, index) in itens"
              :key="index"
            >{{ item.name }}</li>
          </ul>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'Home',
  data() {
    return {
      itens: []
    }
  },
  computed: {
    ...mapGetters({
      repos: 'repos/repos',
      starreds: 'starreds/starreds'
    })
  },
  methods: {
    ...mapActions({
      searchRepos: 'repos/searchRepos',
      searchStarreds: 'starreds/searchStarreds'
    }),
    async loadRepos() {
      await this.searchRepos()
      this.itens = this.repos
    },
    async loadStarreds() {
      await this.searchStarreds()
      this.itens = this.starreds
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
