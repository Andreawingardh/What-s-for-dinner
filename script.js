
const url = 'https://www.themealdb.com/api/json/v1/1/random.php';


document.getElementById('getRecipeButton').addEventListener('click', () => {
fetch(url)
.then((response) => {
    return response.json();
})
.then((getRandomRecipe) => {
const randomRecipe = getRandomRecipe.meals[0];
console.log(randomRecipe.strMeal);
console.log(randomRecipe.strCategory);
console.log(randomRecipe.strArea);
console.log(randomRecipe.strInstructions);

function getIngredients(randomRecipe) {
    for (i = 1; i < 20; i++) {
        const ingredientKey = `strIngredient${i}`
        const ingredient = randomRecipe[ingredientKey];
        if (ingredient.trim().length !== 0 || typeof ingredient.trim() != 'string') {
        console.log(ingredient);
        }
    }

  }

  getIngredients(randomRecipe);



})
.catch(error => {
    console.log(error);
})
})
