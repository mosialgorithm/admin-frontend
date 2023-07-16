<template>
    <div class="container">
        <form @submit.prevent="editPost">
            <div class="form-group">
                <label for="news_title">عنوان خبر</label>
                <input type="text" class="form-control" id="news_title" aria-describedby="emailHelp" v-model="title"
                    v-html="title">
            </div>
            <div class="form-group">
                <label for="news_body">متن خبر</label>
                <ckeditor :editor="editor" v-model="body" :config="editorConfig"></ckeditor>
            </div>
            <p class="alert" :class="{'alert-danger':status==false, 'alert-success':status==true}">{{ status ? 'published' :  'Draft' }}</p>
            <div class="form-group form-check">
                <input type="checkbox" class="form-check-input" id="news_publish" v-model="status">
                <label class="form-check-label"> وضعیت انتشار </label>
            </div>
            <button type="submit" class="btn btn-primary">ویرایش و ذخیره اطلاعات</button>
        </form>
    </div>
</template>

<script>
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import CKEditor from "@ckeditor/ckeditor5-vue"

export default {
    name: "PostView",
    props: ['id'],
    components: {
        ckeditor: CKEditor.component
    },
    data() {
        return {
            title: '',
            body: '',
            status: 'draft',
            uri: 'http://localhost:3000/posts/' + this.id,
            // ------------------- CKEditor -------------------------
            editor: ClassicEditor,
            editorData: this.body,
            editorConfig: {
                // The configuration of the editor.
                height: '300px',
                language: 'fa',
                fontFamily: {
                    options: [
                        'default',
                        'Ubuntu, Arial, sans-serif',
                        'Ubuntu Mono, Courier New, Courier, monospace'
                    ]
                },
                // toolbar: []
            }
            // ------------------- CKEditor -------------------------
        }
    },

    mounted() {
        fetch(this.uri)
            .then(res => res.json())
            .then(data => {
                this.title = data.title
                this.body = data.body
                this.staus = data.staus
            })
        // .catch(err => console.log(err.messages))
    },

    methods: {
        editPost() {
            let post = {
                title: this.title,
                body: this.body,
                status: this.status
            }
            console.log(JSON.stringify(post))
            fetch(this.uri, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title: post.title,
                    body: post.body,
                    status: post.status,
                })
            })
                .then(() => {
                    this.$swal.fire({
                        icon: 'success',
                        title: 'Post is Editted Successfully',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    this.$router.push(`/Post/${this.id}`)
                })
            // .catch(err => console.log(err.messages))
        }
    }

}
</script>

<style>
.ck-editor__editable:not(.ck-editor__nested-editable) {
    min-height: 400px;
}
</style>