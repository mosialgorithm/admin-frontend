<template>
  <div class="register-box">
    <div class="card">
      <div class="card-body register-card-body">
        <p class="login-box-msg">گذرواژه جدید</p>

        <form @submit.prevent="changePassword()">
          <div class="input-group mb-3">
            <input type="password" class="form-control" placeholder="رمز عبور" v-model="password" :class="{
              'is-invalid': passwordError == true,
              'is-valid': passwordError == false,
            }">
            <div class="input-group-append">
              <span class="fa fa-lock input-group-text"></span>
            </div>
            <div class="invalid-feedback" v-if="passwordError">{{ passwordErrorMessage }}</div>
          </div>
          <!-- ------------------------------------------------------------------- -->
          <div class="input-group mb-3">
            <input type="password" class="form-control" placeholder="تکرار رمز عبور" v-model="confirmPassword" :class="{
              'is-invalid': confirmPasswordError == true,
              'is-valid': confirmPasswordError == false,
            }">
            <div class="input-group-append">
              <span class="fa fa-lock input-group-text"></span>
            </div>
            <div class="invalid-feedback" v-if="confirmPasswordError">{{ confirmPasswordErrorMessage }}</div>
          </div>
          <!-- ----------------------------------------------------------------------- -->
          <div class="row">
            <div class="col-4 mx-auto">
              <button type="submit" class="btn btn-primary btn-block btn-flat">ثبت نام</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "ChangePassView",
  data() {
    return {
      // -----------------------------
      password: "",
      confirmPassword: "",
      // ------------------------------
      passwordError: null,
      confirmPasswordError: null,
      // ------------------------------
      passwordErrorMessage: null,
      confirmPasswordErrorMessage: null,
      // ------------------------------
      uri: "http://localhost:3000/users",
      user: '',
      user_id: '',
      isSuccess : false

    }
  },
  methods: {
    changePassword() {
      let access = true
      // ====================== Error Handeling ===================================
      // ------------------------- Password Condition --------------------------------
      if (this.password.length < 8) {
        this.passwordError = true,
          this.passwordErrorMessage = "password must be at least 8 character"
        access = false
        if (this.password.length == 0) {
          this.passwordErrorMessage = "Password is Required"
        }
      } else {
        this.passwordError = false,
          this.passwordErrorMessage = ""
      }
      // ------------------------- Confirm Password Condition -----------------------
      if (this.confirmPassword.length < 8) {
        this.confirmPasswordError = true,
          this.confirmPasswordErrorMessage = "Confirm Password must be at least 8 character"
        access = false
        if (this.confirmPassword.length == 0) {
          this.confirmPasswordErrorMessage = "Confirm Password is Required"
        }
      } else {
        this.confirmPasswordError = false,
          this.confirmPasswordErrorMessage = ""
      }
      if (this.password != this.confirmPassword) {
        access = false
        this.passwordError = true
        this.confirmPasswordError = true
        this.passwordErrorMessage = "Password and Confirm Password is not Equal !"
      } else if (!this.passwordErrorMessage && !this.confirmPasswordErrorMessage) {
        this.passwordErrorMessage = ""
      }
      // ====================== End Of Error Handeling ============================
      if (access) {
        this.user_id = this.$store.state.user_id_forgot,
        fetch(this.uri)
        .then(res => res.json())
        .then(data => {
          this.user = data.filter(item => { return item.id == Number(this.user_id) })
        })
        .then(() => {
          fetch(this.uri + '/' + this.user[0].id, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ password: this.password })
          })
          .then(() => {
            this.$state.store.user_id_forgot = ''
          })
          .catch(err => console.log(err.messages))
        })
        .then(() => {
          this.$router.push('/login')
        })
        .catch(err => {
          console.log(err.messages) 
          this.$router.push('/forgotPassword')
        })
      }
    }
  }
}
</script> 

  