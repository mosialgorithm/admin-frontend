<template>
    <div class="container">
        <form @submit.prevent="createPost">
            <div class="form-group">
                <label for="news_title">عنوان خبر</label>
                <input type="text" class="form-control" id="news_title" aria-describedby="emailHelp" v-model="title">
            </div>
            <div class="form-group">
                <label for="news_body">متن خبر</label>
                <ckeditor :editor="editor" v-model="body" :config="editorConfig"></ckeditor>
            </div>
            <div class="form-group form-check mt-5">
                <input type="checkbox" class="form-check-input" id="news_publish" v-model="status">
                <label class="form-check-label" for="news_publish"> وضعیت انتشار </label>
            </div>
            <button type="submit" class="btn btn-primary">ثبت و ذخیره اطلاعات</button>
        </form>
    </div>
</template>

<script>
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import CKEditor from "@ckeditor/ckeditor5-vue"

// import { Image, ImageCaption, ImageResize, ImageStyle, ImageToolbar } from '@ckeditor/ckeditor5-image';
// import { LinkImage } from '@ckeditor/ckeditor5-link';

export default {
    name: "NewPostView",
    components: {
        ckeditor: CKEditor.component
    },
    data() {
        return {
            title: "",
            body: "",
            status: false,
            uri: "http://localhost:3000/posts",
            editor: ClassicEditor,
            // editorData: "<p>Hello from CKEditor 5!</p>",
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
        }
    },
    methods: {
        createPost() {
            let post = {
                title: this.title,
                body: this.body,
                status: this.status
            }
            fetch(this.uri, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(post)
            })
                .then(() => {
                    this.$swal.fire({
                        icon: 'success',
                        title: 'Post is Created Successfully',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    this.$router.push('/allPost')
                })
                .catch(err => console.log(err.messages))
        }
    }

}
</script>

<style>
.ck-editor__editable:not(.ck-editor__nested-editable) {
    min-height: 400px;
}
</style>