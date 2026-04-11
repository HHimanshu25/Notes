import { renderNotes } from "../notes/note.js";
import { authlogin, authsignup } from "./authAPI.js";
export function renderLogin(app) {
    app.innerHTML = `<div class="auth-container">

        <!-- LOGIN -->
        <section class="auth auth-login">
            <header class="auth-title">Ready to get productive? Login</header>

            <div class="auth-form">

                <label for="login-email">Email</label>
                <input type="email" id="login-email" placeholder="Email address" autocomplete="on">
                <span class="error-email error-hide">Invalid email address</span>

                <label for="login-password">Password</label>
                <input type="password" id="login-password" placeholder="Password">

                <button class="btn-forgot">Forgot Paaassword?</button>
                <p class="error-password error-hide">Invalid password</p>

            </div>

            <div class="auth-footer">
                <button class="btn-login">Login</button>
                <div class="auth-switch-login">
                    Don't have an account?
                    <span>Sign Up</span>
                </div>
            </div>
        </section>


        <!-- SIGNUP -->
        <section class="auth auth-signup">

            <header class="auth-title">Begin your notes taking adventure with us! Sign Up</header>

            <div class="auth-form">

                <label for="signup-name">Name</label>
                <input type="text" id="signup-name" placeholder="Name">

                <label for="signup-email">Email</label>
                <input type="email" id="signup-email" placeholder="Email address">

                <span class="error-email-signup error-hide">Invalid email address</span>

                <label for="signup-password">Password</label>
                <input type="password" id="signup-password" placeholder="Password" oninput="passwordCheck()">

                <p class="error-password-signup error-hide">Invalid password</p>

                <div class="password-strength">
                    Strength: <span>--</span>
                </div>
            </div>

            <div class="auth-footer">
                <button class="btn-signup">Sign Up</button>
                <div class="auth-switch-signup">
                    Already have an account?
                    <span>Login</span>
                </div>
            </div>

        </section>

    </div>`

    // ✅ DOM elements AFTER render
    const email = app.querySelector('#login-email');
    const password = app.querySelector('#login-password');

    const email2 = app.querySelector('#signup-email');
    const password2 = app.querySelector('#signup-password');

    const emailError = app.querySelector('.error-email');
    const passwordError = app.querySelector('.error-password');

    const emailError2 = app.querySelector('.error-email-signup');
    const passwordError2 = app.querySelector('.error-password-signup');
    const forgotBtn = app.querySelector('.btn-forgot')
    const strShow = app.querySelector('.password-strength span');
window.addEventListener('load',()=>{
    email.value = '';
    password.value = '';
})
    // ✅ Switch scroll
    // Scroll down to signup form
    // Go to signup
    app.querySelector('.auth-switch-login span')
        .addEventListener('click', () => {
            app.querySelector('.auth-signup').scrollIntoView({
                behavior: "smooth"
            });
        });

    // Go to login
    app.querySelector('.auth-switch-signup span')
        .addEventListener('click', () => {
            app.querySelector('.auth-login').scrollIntoView({
                behavior: "smooth"
            });
        });


    // ✅ Password strength (FIXED: no inline oninput)
    password2.addEventListener("input", () => {
        let strength = 0;
        const value = password2.value;

        if (value.length >= 8) strength++;
        if (/[A-Z]/.test(value)) strength++;
        if (/[a-z]/.test(value)) strength++;
        if (/[0-9]/.test(value)) strength++;
        if (/[^A-Za-z0-9]/.test(value)) strength++;

        strShow.textContent = strength * 20 + "%";

        if (strength <= 1) strShow.style.color = "red";
        else if (strength <= 2) strShow.style.color = "orangered";
        else if (strength <= 3) strShow.style.color = "orange";
        else if (strength <= 4) strShow.style.color = "yellowgreen";
        else strShow.style.color = "green";
    });



    function validateAuth(emailvalue, passwordvalue, which) {
        let isValid = true;
        let tt = which

        let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(emailvalue)) {
            if (tt == 'login') {
                emailError.classList.remove('error-hide')
                console.log('login email error ');
            }
            else {
                emailError2.classList.remove('error-hide')
            }
            isValid = false
        }

        if (passwordvalue.length < 8) {
            if (tt == 'login') {
                passwordError.classList.remove('error-hide')
                forgotBtn.style.display = 'none'
            }
            else {
                passwordError2.classList.remove('error-hide')
            }
            isValid = false
        }
        console.log('bahi chekcing hoo gyi');
        return isValid;
    }


    // ✅ LOGIN FUNCTION
    app.querySelector('.btn-login').addEventListener('click', () => {
        login()
    })

    async function login() {
        console.log('bhai tu tension met le me chel rha hu');
        // reset UI
        emailError.classList.add('error-hide')
        passwordError.classList.add('error-hide')
        forgotBtn.style.display = 'block'

        let emailvalue = email.value.trim()
        let passwordvalue = password.value.trim()

        // 🔁 reuse validation
        let isValid = validateAuth(emailvalue, passwordvalue, 'login')
        if (!isValid) return;

        let response = await authlogin(emailvalue, passwordvalue)

        console.log(response);
        if (response.success) {
            alert(response.message)
            console.log(response.id);
            localStorage.setItem('token', `${response.id}`)
            renderNotes(app)          
            
        }
        else {
            alert(response.message)
        }
    }

    // ✅ SIGNUP FUNCTION (new)
    app.querySelector('.btn-signup').addEventListener('click', () => {
        signup()
    });

    async function signup() {

        let name = app.querySelector('#signup-name')

        // reset UI
        emailError2.classList.add('error-hide')
        passwordError2.classList.add('error-hide')

        let emailvalue = email2.value.trim()
        let passwordvalue = password2.value.trim()
        let namevalue = name.value
        // 🔁 reuse validation
        let isValid = validateAuth(emailvalue, passwordvalue, 'signup')
        if (!isValid) return;

        // check if user already exists
        let response = await authsignup(namevalue, emailvalue, passwordvalue)

        console.log(response);
        if (response.done) {
            app.querySelector('.auth-login').scrollIntoView({
                    behavior: "smooth"
                });
                email2.value = ''
                password2.value = ''
                name.value = ''
                alert(response.message)
            }
        else if (!response.done) {
            emailError2.classList.remove('error-hide')
            emailError2.textContent = 'Email already exists'            
        }
        else{
            alert(response.message)
        }

        // add new user         


        console.log("Signup success")
    }

}


