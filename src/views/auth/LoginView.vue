<template>
    <div class="login-box">
        <div class="card">
            <div class="card-header">
                <div class="cared-title">ثبت نام در سایت</div>
            </div>
            <div class="card-body login-card-body">
                <form @submit.prevent="userLogin">
                    <div class="input-group mb-3">
                        <input type="email" class="form-control" 
                        placeholder="ایمیل" v-model="email">
                        <div class="input-group-append">
                            <span class="fa fa-envelope input-group-text"></span>
                        </div>
                    </div>
                    <div class="input-group mb-3">
                        <input type="password" class="form-control" 
                        placeholder="رمز عبور" v-model="password">
                        <div class="input-group-append">
                            <span class="fa fa-lock input-group-text"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-4 mx-auto">
                            <button type="submit" class="btn btn-success btn-block btn-flat">ورود</button>
                        </div>
                    </div>
                </form>

                <div class="social-auth-links text-center mb-3">
                    <hr class="mb-5">
                    <a href="#" class="btn btn-block btn-primary btn-sm">
                        <i class="fa fa-facebook mr-2"></i> ورود با اکانت فیسوبک
                    </a>
                    <a href="#" class="btn btn-block btn-danger btn-sm">
                        <i class="fa fa-google-plus mr-2"></i> ورود با اکانت گوگل
                    </a>
                </div>
                <p class="mb-1 text-sm">
                    <router-link to="/forgotPassword"> <span class="text-sm">رمز عبورم را فراموش کرده ام.</span></router-link>
                </p>
                <p class="mb-0 text-sm">
                    <router-link to="/register"> <span class="text-sm">ثبت نام</span></router-link>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name : "LoginView",
    data() {
        return {
            user : "",
            email : "",
            password : "",
            uri : 'http://localhost:3000/users',
        }
    },
    methods : {
        userLogin() {
            fetch(this.uri)
            .then(res => res.json())
            .then(data => {
                this.user = data.filter(item => {
                    return item.email == this.email
                });
                if(!this.user[0]){
                    this.$notify({type: "warn", text: "Email Address is Incorrect !" });
                    this.$router.push('/login')
                }
                console.log(this.user[0].password)
                console.log(this.password)
                if(this.user[0].password == this.password){
                    localStorage.setItem("user_name", this.user[0].name)
                    localStorage.setItem("user_email", this.user[0].email)
                    this.$store.state.isAuthenticated = true
                    this.$notify({ type: "success", text: "Login Success" });
                    this.$router.push('/')
                } else {
                    // alert("your password is incorrect")
                    this.$notify({type: "error", text: "Password is Incorrect" });
                    this.$router.push('/login')
                }
            })
            .catch(err => console.log(err.messages));
        }
    }

}
</script>
<style></style>