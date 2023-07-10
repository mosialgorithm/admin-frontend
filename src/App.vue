<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/login">Login</router-link> |
    <router-link to="/register">Register </router-link>
  </nav>
  <notifications position="top right" classes="my-notification">
    <template #body="props">
      <div class="my-notification">
        <p class="title">
          {{ props.item.title }}
        </p>
        <button class="close" @click="props.close">
          <i class="fa fa-fw fa-close"></i>
        </button>
        <div v-html="props.item.text" />
      </div>
    </template>
  </notifications>
  <router-view />
</template>

<script>
export default {
  data() {
    return {
      isAuthenticated: this.$store.state.isAuthenticated,
    }
  },
  mounted() {
    console.log('app is active')
  },
  computed: {
    animation() {
      return {
        /**
         * Animation function
         *
         * Runs before animating, so you can take the initial height, width, color, etc
         * @param  {HTMLElement}  element  The notification element
         */
        enter(element) {
          let height = element.clientHeight
          return {
            // animates from 0px to "height"
            height: [height, 0],

            // animates from 0 to random opacity (in range between 0.5 and 1)
            opacity: [Math.random() * 0.5 + 0.5, 0]
          }
        },
        leave: {
          height: 0,
          opacity: 0
        }
      }
    }
  }
}
</script>
<style lang="scss">
#app {
  /* font-family: Avenir, Helvetica, Arial, sans-serif; */
  /* -webkit-font-smoothing: antialiased;
  /* -moz-osx-font-smoothing: grayscale; */
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}

.vue-notification {
  margin: 0 5px 5px;
  padding: 10px;
  font-size: 17px;
  color: #ffffff;
  text-align: center;

  background: #44a4fc;
  border-left: 5px solid #187fe7;

  &.success {
    background: #68cd86;
    border-left-color: #42a85f;
  }

  &.warn {
    background: #ffb648;
    border-left-color: #f48a06;
  }

  &.error {
    background: #e54d42;
    border-left-color: #b82e24;
  }
}
</style>
