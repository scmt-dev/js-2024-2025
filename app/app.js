// hide id splash 3s

setTimeout(() => {

    const splash = document.getElementById('splash');
    splash.style.animation = 'fade-out';

    // After the fade-out transition ends, hide the element
    setTimeout(() => {
        splash.style.display = 'none';
    }, 1000);

}, 2000)