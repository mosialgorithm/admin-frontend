<template>
    <div class="login-box">
        <div class="card">
            <div class="card-header">
                <div class="cared-title">فراموشی رمز عبور</div>
            </div>
            <div class="card-body login-card-body">
                <form @submit.prevent="ForgotPass">
                    <div class="input-group mb-3">
                        <input type="email" class="form-control" 
                        placeholder="ایمیل" v-model="email">
                        <div class="input-group-append">
                            <span class="fa fa-envelope input-group-text"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-4 mx-auto">
                            <button type="submit" class="btn btn-success btn-block btn-flat">تغییر گذرواژه</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name : "ForgotPassView",
    data() {
        return {
            user : "",
            email : "",
            uri : "http://localhost:3000/users",
        }
    },
    methods : {
        ForgotPass() {
            // let user = {}
            fetch('http://localhost:3000/users')
            .then(res => res.json())
            .then(data => {
                this.user = data.filter(item => {
                    return item.email == this.email
                });
            })
            .then( () => {
                this.$store.state.user_id_forgot = this.user[0].id
                localStorage.setItem("user_id_forgot", this.user[0].id)
                localStorage.setItem("user_email_forgot", this.user[0].email)
                // ------------------ create code ----------------------
                let code = Math.floor(Math.random() * 100000)
                this.$store.state.code_forgot = code
                console.log(code)
                this.$router.push('/authUser')
            })
            .catch(err => console.log(err.message))
        }
    }

}
</script>
<style></style>


