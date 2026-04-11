const AUTH_API = "http://localhost:3000/auth"

export async function authlogin(email, password) {
    const data = await fetch(`${AUTH_API}/login`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email,
            password
        })
    })
    return await data.json();

}

export async function authsignup(name, email, password) {
    const data = await fetch(`${AUTH_API}/register`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name,
            email,
            password
        })
    })
    return await data.json();

}