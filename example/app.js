
function _id(id) {
    return  document.getElementById(id)
}

function checkEmail() {

    const display = _id('result')
    const email = _id('email')
    if(!email.value) {
        display.innerHTML = 'please input email' 
        display.style.color = 'red'
        return  
    }
    display.style.color = 'green'
    display.style.backgroundColor = 'white'
    display.style.fontSize = '40px';
    display.innerHTML = email.value
}

function changeBg() {
    const color = _id('color')
    const body = _id('body')
    body.style.backgroundColor = color.value
    body.style.color = 'white'
}

let y = 0;
let x = 0;
// add event listener arrow down to body
document.addEventListener('keydown', (e) => {
    console.log(e.key)
    switch (e.key) {
        case 'ArrowDown':
            y += 10
            break;
        case 'ArrowUp':
            y -= 10
            break;
        case 'ArrowLeft':
            x -= 10
            break;
        case 'ArrowRight':
            x += 10
            break;
        case ' ':
            x = 0
            y = 0
            break;
        default:
            break;
    }
    _id('box1').style.top = `${y}px`
    _id('box1').style.left = `${x}px`
})