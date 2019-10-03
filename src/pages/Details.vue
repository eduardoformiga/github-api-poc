<template>
  <div class="details">
    <h2>Details</h2>
    <section class="user-card">
      <h1>{{ user.name }}</h1>
      <img
        class="user-card--avatar"
        :src="user.avatar_url"
        alt="Avatar da conta do Github"
      />
      <div class="user-card--content">
        <div
          v-for="(value, name) in user"
          :key="name"
          class="row"
        >
          <span class="label">{{ name }}</span>
          <span class="value">{{ value }}</span>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Datails',
  computed: {
    ...mapGetters({
      user: 'user/user'
    })
  }
}
</script>

<style lang="scss" scoped>
h2 {
  font-size: 0.8em;
  font-weight: bold;
  margin: 1.2em 0.8em 0.8em;
  text-transform: uppercase;
}
.user-card {
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: $white;
  border-radius: 1em;
  padding: 0.8em;
  margin: 0.8em;
  box-shadow: $card-shadow;

  h1 {
    font-weight: bold;
    padding: 0.8em;
  }

  .user-card--avatar {
    width: 200px;
    border-radius: 50%;
    padding: 0.8em;
  }

  .user-card--content {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    padding-left: 0.5em;
    font-size: 0.6em;

    .row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1em;
      border-bottom: 1px solid $row-color;
      word-wrap: break-word;
      overflow-wrap: break-word;
      word-break: break-all;

      &:last-of-type {
        border-bottom: none;
      }

      .label {
        font-weight: bold;
        text-transform: uppercase;
        padding-right: 1em;
        min-width: 120px;
      }
      .value {
        color: $placeholder-color;
      }
    }
  }
}

@media only screen and (min-width: 768px) {
  .user-card {
    .user-card--content {
      font-size: 0.8em;
    }
  }
}
</style>
