<template>
    <div class="container">
        <h1 class="mb-5"> All Post </h1>
        <div class="row">
            <div v-for="post in posts" :key="post.id" class="col-6">
                <div class="card bg-light mb-3" style="max-width: 18rem;">
                    <div class="card-header">{{ post.status ? 'انتشاریافته' : 'در حال بررسی' }}</div>
                    <div class="card-body">
                        <h5 class="card-title">{{ post.title }}</h5>
                        <!-- <p class="card-text">{{ post.body.slice(0, 20) }}</p> -->
                        <p class="card-text" v-html="body"></p>
                    </div>
                    <div class="card-footer">
                        <router-link :to="{ name: 'Post', params: { id: post.id } }"> ادامه مطلب </router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: "AllPostView",
    // props: ['post',],

    data() {
        return {
            posts: [],
            uri: "http://localhost:3000/posts"
        }
    },

    mounted() {
        fetch(this.uri,)
            .then(res => res.json())
            .then((data) => {
                this.posts = data
                this.$router.push('/allPost')
            })
        // .catch(err => console.log(err.messages))
    }

}
</script>

<style></style>