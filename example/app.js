
function _id(id) {
    return  document.getElementById(id)
}

function checkEmail() {

    const display = _id('result')
    const email = _id('email')
    if(!email.value) {
        display.innerHTML = 'please input email' 
        return  
    }

    display.innerHTML = email.value
}