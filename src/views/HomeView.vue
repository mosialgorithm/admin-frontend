<template>
  <div class="home">
    <div class="container">
      <p class="alert alert-success">Welcome : <span class="text-bold">{{ name }}</span></p>
      <p class="alert alert-warning">Your Email : <span class="text-bold">{{ email }}</span></p>
    </div>
    <button class="btn btn-danger" @click="userLogout">خروج</button>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
  data() {
    return {
      name : localStorage.getItem("user_name"),
      email : localStorage.getItem("user_email"),
    }
  },
  methods : {
    userLogout() {
      localStorage.removeItem("user_name")
      localStorage.removeItem("user_email")
      this.$store.state.isAuthenticated = false
      this.$router.push('/login')
    }
  }
}
</script>
