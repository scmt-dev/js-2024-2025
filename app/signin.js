function _id(id) {
    return  document.getElementById(id)
}

async function handleSignIn() {
    const email = _id('email').value;
    const password = _id('password').value;
    const btnLogin = _id('btnLogin');
    btnLogin.disabled = true;
    btnLogin.innerHTML = 'Signing in...';

    const message = _id('message');

    if (!email) {
        message.innerHTML = 'Please input email'
        message.style.display = 'block'
        btnLogin.disabled = false;
        btnLogin.innerHTML = 'Sign in';
        setTimeout(() => {
            message.innerHTML = ''
            message.style.display = 'none'
        }, 3000)
        return
    }
    if (!password) {
        message.innerHTML = 'Please input password'
        message.style.display = 'block'
        btnLogin.disabled = false;
        btnLogin.innerHTML = 'Sign in';
        // hide message after 3s
        setTimeout(() => {
            message.innerHTML = ''
            message.style.display = 'none'
        }, 3000)
        return
    }
    const API = 'https://dummyjson.com/auth/login';
    const req = await fetch(API, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: email,
            password: password
        })
    })
    if (req.status === 200) {
        // go to home page
        const userData = await req.json()
        localStorage.setItem('user', JSON.stringify(userData))
        window.location.href = 'home.html';
        return
    }

    alert('Invalid email or password')
    btnLogin.disabled = false;
    btnLogin.innerHTML = 'Sign in';
}

document.getElementById('btnLogin').addEventListener('click', handleSignIn)