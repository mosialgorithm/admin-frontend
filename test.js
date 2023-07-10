ForgotPass() {
    let user = {}
    fetch('http://localhost:3000/users')
        .then(res => res.json())
        .then(data => {
            user = data.filter(item => {
                // console.log(data)
                return item.email == this.email
            });
            this.$store.state.user_id_forgot = user_id
            localStorage.setItem("user_id_forgot", user[0].id)
            localStorage.setItem("user_email_forgot", user[0].email)
            // ------------------ create code ----------------------
            let code = Math.floor(Math.random() * 100000)
            this.$store.state.code_forgot = code
            console.log(code)
            // -------------------- end of create code---------------
            // =================== Set Code For User ============================
            fetch('http://localhost:3000/users/' + user[0].id, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id: user[0].id,
                    name: user[0].name,
                    email: user[0].email,
                    password: '',
                    code: code,
                })
            })
                .then(() => {
                    localStorage.setItem("recovery_code", code)
                    this.$router.push('/authUser')
                })
                .catch(err => console.log(err.messages))
            // =================== End Of Set Code For User ====================
        })
        .catch(err => console.log(err.messages));
}



fetch(this.uri)
    .then(res => res.json())
    .then(data => {
        // console.log(data)
        user = data.filter(item => {
            return item.id == user_id
        });
        if (this.user_code == Number(this.code)) {
            // this.$store.state.user_id_forgot = user_id
            this.$router.push('/changePass')
        }
        else {
            alert('your entered code is incorrect')
            this.$router.push('/forgotPass')
        }
    })
    .catch(err => console.log(err.messages));








    fetch(this.uri + '/' + this.user_id , {
        method : 'PATCH',
        headers : {'Content-Type':'application/json'},
        body: JSON.stringify({
          // id: user[0].id,
          // name: user[0].name,
          // email: user[0].id,
          password: user_password,
        })
      })
      .then(() => {
        console.log(user[0])
        localStorage.removeItem("recovery_code")
        localStorage.removeItem("user_email_forgot")
        localStorage.removeItem("user_id_forgot")
        this.$state.store.user_id_forgot = ''
        alert("your password is changed successfully")
        console.log("everything is OK")
        this.$router.push('/login')
      })
      .catch(err => console.log(err.messages))