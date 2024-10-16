// hide id splash 3s

setTimeout(() => {

    const splash = document.getElementById('splash');
    splash.style.animation = 'fade-out';

    // After the fade-out transition ends, hide the element
    setTimeout(() => {
        splash.style.display = 'none';
    }, 1000);

}, 2000)

function _id(id) {
    return  document.getElementById(id)
}

function renderHTML(id, html) {
    const display = _id(id)
    display.innerHTML = html
}

async function fetchFoodToTopOfWeek() {
    try {
        const API_URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=rice';
        const req = await fetch(API_URL); // fetch API
        const res = await req.json(); // parse JSON
        const { meals } = res // extract data from JSON

        console.log(res)

        let html = '';
        for(const meal of meals) {
            const { strMealThumb: image, strMeal: title } = meal
            html += `
                <li>
                    <img width="100" src="${image}" alt="${title}">
                    <h3>${title}</h3>
                </li>`
            
        }
        renderHTML('top-of-week', html) // render HTML to DOM element
        
    } catch (error) {
        throw new Error(`[fetchFoodToTopOfWeek]: error: ${error}`)
    }
}
fetchFoodToTopOfWeek()