async function getData() {
    const API_ENDPOINT = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood';
    const req = await fetch(API_ENDPOINT);
    console.log(req)
    const { meals } = await req.json();
    console.log(meals)
    let html = '';

    for (const meal of meals) {
        html += `
            <li>
                <img width="100" src="${meal.strMealThumb}" alt="${meal.strMeal}">
                ${meal.strMeal}
            </li>
        `
    }
    const display = document.getElementById('top-of-week')
    display.innerHTML = html

}

// cal the function
getData()