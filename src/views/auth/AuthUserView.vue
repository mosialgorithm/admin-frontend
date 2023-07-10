<template>
    <div class="login-box">
        <div class="card">
            <div class="card-header">
                <div class="cared-title">رمز عبور ارسال شده</div>
            </div>
            <div class="card-body login-card-body">
                <form @submit.prevent="AuthUser">
                    <div class="input-group mb-3">
                        <input type="text" class="form-control" 
                        placeholder="کد ارسال شده" v-model="code">
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
    name : "AuthUserView",
    data() {
        return {
            user : "",
            user_code : "",
            code : "",
            uri : "http://localhost:3000/users",
        }
    },

    methods : {
        AuthUser() {
            // this.user_id = Number(localStorage.getItem("user_id_forgot"))
            this.user_code = Number(this.$store.state.code_forgot)
            if(this.code == this.user_code) {
                console.log("code is true")
                this.$store.state.code_forgot = ""
                this.$router.push('/changePass')
            } else {
                this.$store.state.code_forgot = ""
                this.$router.push('/forgotPassword')
            }
            
        }
    }

}
</script>
<style></style>