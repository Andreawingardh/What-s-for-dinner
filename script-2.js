  /* Script for the second page called categories, where only a meal is displayed along with a link to the webpage. */


  const displayMeal = (category, ElementId) => {
    document.getElementById(ElementId).addEventListener('click', () => {
        fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
        .then((response) => {
            return response.json();
        })
        .then((getVegetarianMeal) => {
            /* Check if the fetch has worked */
            console.log(getVegetarianMeal);

            /*Creates a random */
            const ingredientKey = Math.floor(Math.random() * getVegetarianMeal.meals.length + 1);
            const randomRecipe = getVegetarianMeal.meals[ingredientKey];
            console.log(randomRecipe);
            const displayMeal = document.getElementById('category-displayMeal');
            displayMeal.innerHTML = '';
            const mealTitle = document.createElement('h2');
            displayMeal.appendChild(mealTitle);
            const mealImage = document.createElement('img');
            displayMeal.appendChild(mealImage);
            mealImage.src = randomRecipe.strMealThumb;
            mealTitle.textContent = randomRecipe.strMeal;
            fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${randomRecipe.idMeal}`)
            .then((response) => {
                return response.json();
            })
            .then ((mealDetails) => {
                console.log(mealDetails.meals);

            })

            .catch(error => {
                console.log(error);
            });

        })

        .catch(error => {
            console.log(error);
        })
    })
}

displayMeal('Vegetarian', 'display-meal-vegetarian');
displayMeal('Chicken', 'display-meal-chicken');
displayMeal('Dessert', 'display-meal-dessert');

/* For next level categories, looking up meal details */
// fetch('www.themealdb.com/api/json/v1/1/lookup.php?i=' + randomRecipe.idMeal)
// .then((response) => {
//     return response.json();
// })
// .then((recipeDetails) => {
// 
// })
