let email = document.getElementById('login-email')
let password = document.getElementById('login-password')

let email2 = document.getElementById('signup-email')
let password2 = document.getElementById('signup-password')

let emailError = document.querySelector('.error-email')
let passwordError = document.querySelector('.error-password')
let forgotBtn = document.querySelector('.btn-forgot')

let emailError2 = document.querySelector('.error-email-signup')
let passwordError2 = document.querySelector('.error-password-signup')


// ✅ COMMON VALIDATION FUNCTION
function validateAuth(emailvalue, passwordvalue,which) {
    let isValid = true;
    let tt = which

    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(emailvalue)) {
        if(which == 'login'){
            emailError.classList.remove('error-hide')
        }
        else{            
            emailError2.classList.remove('error-hide')
        }
        isValid = false
    }

    if (passwordvalue.length < 8) {
        if(which == 'login'){
            passwordError.classList.remove('error-hide')
            forgotBtn.style.display = 'none'
        }
        else{
            passwordError2.classList.remove('error-hide')
        }
        isValid = false
    }

    return isValid;
}


// ✅ LOGIN FUNCTION
function login(event) {
    if (event) event.preventDefault();

    // reset UI
    emailError.classList.add('error-hide')
    passwordError.classList.add('error-hide')
    forgotBtn.style.display = 'block'

    let emailvalue = email.value.trim()
    let passwordvalue = password.value.trim()

    // 🔁 reuse validation
    let isValid = validateAuth(emailvalue, passwordvalue,'login')
    if (!isValid) return;

    // check email exists
    let findemail = user.find(u => u.email === emailvalue)
console.log(findemail);
    if (!findemail) {
        emailError.classList.remove('error-hide')
        emailError.textContent = 'Email not found'
        return;
    }

    // check password match
    if (passwordvalue === findemail.password) {
        console.log("Login success (frontend only)")
    } else {
        passwordError.classList.remove('error-hide')
        forgotBtn.style.display = 'none'
        passwordError.textContent = 'Password is wrong'
    }
}

let name = document.getElementById('signup-name')
// ✅ SIGNUP FUNCTION (new)
function signup(event) {
    if (event) event.preventDefault();

    // reset UI
    emailError2.classList.add('error-hide')
    passwordError2.classList.add('error-hide')

    let emailvalue = email2.value.trim()
    let passwordvalue = password2.value.trim()
    let namevalue = name.value
    // 🔁 reuse validation
    let isValid = validateAuth(emailvalue, passwordvalue,'signup')
    if (!isValid) return;

    // check if user already exists
    let existingUser = user.find(u => u.email === emailvalue)

    if (existingUser) {
        emailError2.classList.remove('error-hide')
        emailError2.textContent = 'Email already exists'
        return;
    }

    // add new user
    user.push({
        name: namevalue,
        email: emailvalue,
        password: passwordvalue
    })

    console.log("Signup success")
}

document.querySelector('.auth-switch-login').children[0].addEventListener('click', () => {
    window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "smooth"
    });
})
document.querySelector('.auth-switch-signup').children[0].addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
})

let strShow = document.querySelector('.password-strength').children[0]
function passwordCheck() {
    let password = document.getElementById('signup-password').value

    let strength = 0;

    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9)]/.test(password)) strength++;
    console.log(strength);

    strShow.textContent = strength * 20+ "%";
    
    if (strength <= 1) {
        strShow.style.color = "red";
    } 
    else if (strength <= 2) {
        strShow.style.color = "orangered";
    } 
    else if (strength <= 3) {
        strShow.style.color = "orange";
    } 
    else if (strength <= 4) {
        strShow.style.color = "yellowgreen";
    } 
    else {
        strShow.style.color = "green";
    }
    
    
}
