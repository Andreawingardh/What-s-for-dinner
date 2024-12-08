  /* Script for the second page called categories, where only a meal is displayed along with a link to the webpage. */


  const displayMeal = () => {
    document.getElementById('display-meal-vegetarian').addEventListener('click', () => {
        fetch('https://www.themealdb.com/api/json/v1/1/filter.php?c=Vegetarian')
        .then((response) => {
            return response.json();
        })
        .then((getVegetarianMeal) => {
            console.log(getVegetarianMeal);
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

        })
        .catch(error => {
            console.log(error);
        })
    })
}

const displayMealChicken = () => {
    document.getElementById('display-meal-chicken').addEventListener('click', () => {
        fetch('https://www.themealdb.com/api/json/v1/1/filter.php?c=Chicken')
        .then((response) => {
            return response.json();
        })
        .then((getVegetarianMeal) => {
            console.log(getVegetarianMeal);
            const ingredientKey = Math.floor(Math.random() * getVegetarianMeal.meals.length + 1);
            const randomRecipe = getVegetarianMeal.meals[ingredientKey];
            console.log(randomRecipe);
            const displayMeal = document.getElementById('category-displayMeal');
            displayMeal.innerHTML = '';
            const mealTitle = document.createElement('h2');
            displayMeal.appendChild(mealTitle);
            mealTitle.textContent = randomRecipe.strMeal;
            const mealImage = document.createElement('img');
            displayMeal.appendChild(mealImage);
            mealImage.src = randomRecipe.strMealThumb;


        })
        .catch(error => {
            console.log(error);
        })
    })
}

const displayMealDessert = () => {
    document.getElementById('display-meal-dessert').addEventListener('click', () => {
        fetch('https://www.themealdb.com/api/json/v1/1/filter.php?c=Dessert')
        .then((response) => {
            return response.json();
        })
        .then((getVegetarianMeal) => {
            console.log(getVegetarianMeal);
            const ingredientKey = Math.floor(Math.random() * getVegetarianMeal.meals.length + 1);
            const randomRecipe = getVegetarianMeal.meals[ingredientKey];
            console.log(randomRecipe);
            const displayMeal = document.getElementById('category-displayMeal');
            displayMeal.innerHTML = '';
            const mealTitle = document.createElement('h2');
            displayMeal.appendChild(mealTitle);
            mealTitle.textContent = randomRecipe.strMeal;
            const mealImage = document.createElement('img');
            displayMeal.appendChild(mealImage);
            mealImage.src = randomRecipe.strMealThumb;

        })
        .catch(error => {
            console.log(error);
        })
    })
}

displayMeal();
displayMealChicken();
displayMealDessert();

/* For next level categories, looking up meal details */
// fetch('www.themealdb.com/api/json/v1/1/lookup.php?i=' + randomRecipe.idMeal)
// .then((response) => {
//     return response.json();
// })
// .then((recipeDetails) => {
// 
// })
