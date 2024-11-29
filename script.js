


// const randomRecipe = async () => {

// try {
//     const response = await fetch(url);
//     const result = await response.json();
//     const randomRecipe = result.meals;
//     const randomMeal = result.meals[0];

//     console.log('hello');
//     console.log(randomMeal);

//     const recipe = document.getElementById('recipe');

//     recipe.textContent = randomRecipe;
// } catch (error) {
//     console.error('Error fetching recipe:', error);

// }
// }


// const getMyMeanGirlData = async () => {
//     const response = await fetch(url);
//     console.log(response);
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
    for (let i = 1; i < 20; i++) {
console.log(randomRecipe.strIngredient[i]);
    }
}

getIngredients(randomRecipe);

})
.catch(error => {
    console.log(error);
})
})

// // document.getElementById('getRecipeButton').addEventListener('click', () => {
//  const getRandomRecipe = async () => {
//     const response = await fetch('');
//     console.log(response);
//     const result = await response.json();
//     console.log(result);

//      }

//   } catch (error) {
//     console.error('Error fetching recipe:', error);
//   }



    // const recipeContainer = document.getElementById('recipe');
    // const mealHeader = document.createElement('h1');
    // const mealTitle = randomMeal.strMeal;
    // mealHeader.textContent = mealTitle;
    // recipeContainer.appendChild(mealTitle);
// function getRandomRecipe(randomMeal) {
//     // 
//             console.log('hello');

//         }
//     // )
//     // }



// const recipe = document.getElementById('recipe');
// recipe.textContent = randomMeal.strMeal; 
