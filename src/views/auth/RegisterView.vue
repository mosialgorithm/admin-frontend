<template>
  <div class="register-box">
    <div class="register-logo">
      <b>ثبت نام در سایت</b>
    </div>
    <div class="card">
      <div class="card-body register-card-body">
        <p class="login-box-msg"> کاربر جدید</p>

        <form @submit.prevent="userRegister()">
          <div class="input-group mb-3">
            <input type="text" class="form-control" placeholder="نام و نام خانوادگی" v-model="name" :class="{
              'is-invalid': nameError == true,
              'is-valid': nameError == false,
            }">
            <div class="input-group-append">
              <span class="fa fa-user input-group-text"></span>
            </div>
            <div class="invalid-feedback" v-if="nameError">{{ nameErrorMessage }}</div>
          </div>
          <!-- ----------------------------------------------------------------- -->
          <div class="input-group mb-3">
            <input type="email" class="form-control" placeholder="ایمیل" v-model="email" :class="{
              'is-invalid': emailError == true,
              'is-valid': emailError == false,
            }">
            <div class="input-group-append">
              <span class="fa fa-envelope input-group-text"></span>
            </div>
            <div class="invalid-feedback" v-if="emailError">{{ emailErrorMessage }}</div>
          </div>
          <!-- ------------------------------------------------------------------ -->
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
        <hr class="mb-5">
        <!-- ============================================================= -->
        <div class="social-auth-links text-center">
          <a href="#" class="btn btn-block btn-primary btn-sm">
            <i class="fa fa-facebook mr-2"></i>
            ثبت نام با اکانت فیس بود
          </a>
          <a href="#" class="btn btn-block btn-danger btn-sm">
            <i class="fa fa-google-plus mr-2"></i>
            ثبت نام با گوگل
          </a>
        </div>
        <!-- ============================================================= -->
        <router-link to="/login"> <span class="text-sm">من قبلا ثبت نام کرده ام </span></router-link>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "RegisterView",
  data() {
    return {
      // -----------------------------
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      // ------------------------------
      nameError: null,
      emailError: null,
      passwordError: null,
      confirmPasswordError: null,
      // ------------------------------
      nameErrorMessage: null,
      emailErrorMessage: null,
      passwordErrorMessage: null,
      confirmPasswordErrorMessage: null,
      // ------------------------------
      uri: "http://localhost:3000/users",
    }
  },

  methods: {
    userRegister() {
      let access = true
      // ====================== Error Handeling ===================================
      // ------------------------- Name Condition ---------------------------------
      if (this.name.length < 5) {
        this.nameError = true
        this.nameErrorMessage = "your name must be at least 5 character !"
        access = false
        if (this.name.length == 0) {
          this.nameErrorMessage = "Name is Required"
        }
      } else {
        this.nameError = false
        this.nameErrorMessage = ""
      }
      // ------------------------- Email Condition -----------------------------------
      if (this.email.length < 8) {
        this.emailError = true
        this.emailErrorMessage = "your email address is incorrect"
        if (this.email.length == 0) {
          this.emailErrorMessage = "Email is Required"
        }
      } else {
        this.emailError = false,
          this.emailErrorMessage = ""
      }
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
        let user = {
          name: this.name,
          email: this.email,
          password: this.password
        }
        let existUser = ''
        fetch(this.uri)
          .then(res => res.json())
          .then(data => {
            existUser = data.filter(item => {
              return item.email === this.email
            });
            if (existUser.length > 0) {
              this.$notify({ type: "error", text: "This Email is Registered For Another User" });
              this.$router.push('/register')
            } else {
              fetch(this.uri, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(user)
              })
                .then(() => {
                  // this.$notify({ type: "success", text: "User is Created Successfully" });
                  this.$router.push('/login')
                })
                .catch(err => {
                  // this.$notify({ type: "error", text: "An Error is hapened" });
                  this.$router.push('/register')
                  console.log(err.messages)
                })
            }
          })
      }
    }
  }
}
</script>
