async function getMemuTopOfWeek() {
    const API_ENDPOINT = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood';
    const req = await fetch(API_ENDPOINT);
    const { meals } = await req.json();
    console.log(meals);

    let topOfWeek = document.getElementById('top-of-week');
    topOfWeek.innerHTML = '';
    for(const meal of meals) {
        topOfWeek.innerHTML += `
        <a href="menu-detail.html" class="bg-white rounded-lg p-2 w-36">
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}" class="rounded-lg w-full object-cover">
                <div class="mt-2">
                    <h3 class="text-sm font-bold">${meal.strMeal}</h3>
                    <div class="text-green-500 font-semibold">$14.99</div>
                </div>
        </a>
        `;
    }

}

// call the function
getMemuTopOfWeek();