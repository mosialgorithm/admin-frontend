<template>
    <div class="row">
        <div class="col-6 mx-auto">
            <div class="card bg-light mb-3">
                <div class="card-header text-danger">
                    <h5 class="card-title" 
                    :class="{'text-danger':status==false, 'text-success':status==true}">{{ title }}</h5>
                </div>
                <div class="card-body">
                    <p class="card-text" v-html="body"></p>
                </div>
                <div class="card-footer">
                    <p class="mb-3">
                        <span> status :‌</span>
                        <span v-if="status==true" class="text-success"> Published </span>
                        <span v-else class="text-danger"> Draft </span>
                    </p>
                    <router-link :to="{ name: 'PostEdit', params: { id: id } }" class="btn btn-primary">
                        <span class="fa fa-pencil"> Edit </span>
                    </router-link>
                    <button class="btn btn-danger mr-2" @click="deletePost">
                        <span class="fa fa-close"> Delete </span>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import PostEditView from './PostEditView.vue'

export default {
    name: "PostView",
    props: ['id'],
    components: { PostEditView },
    data() {
        return {
            title: '',
            body: '',
            status: '',
            uri: 'http://localhost:3000/posts/' + this.id
        }
    },
    mounted() {
        fetch(this.uri)
            .then(res => res.json())
            .then(data => {
                this.title = data.title
                this.body = data.body
                // this.$data.status = data.status
                this.status = data.status

            })
        // .catch(err => console.log(err.messages))
    },
    methods: {
        deletePost() {
            this.$swal.fire({
                title: 'Are You Sure ?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showConfirmButton: true,
                showCancelButton: true,
                confirmButtonText: 'Yes',
                cancelButtonText: 'No',
            }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    // this.$swal.fire('Deleted!', '', 'danger')
                    this.$swal.fire({
                        icon: 'success',
                        title: 'Post is Deleted Successfully',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    fetch(this.uri, { method : 'DELETE'})
                    .then(() => {
                        console.log('delete operation is ok')
                        this.$router.push('/allPost')
                    })
                    .catch(err => console.log(err.messages))
                } else if (result.isDenied) {
                    this.$swal.fire('Changes are not saved', '', 'info')
                }
            })
        }

    }

}
</script>

<style></style>