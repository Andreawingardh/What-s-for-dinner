
const url = 'https://www.themealdb.com/api/json/v1/1/random.php';

/* Fetches the data from the API and returns it via console.log */

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

/* Fetches the data and presents it in index.html */

document.getElementById('getRecipeButton').addEventListener('click', () => {
    fetch(url)
    .then((response) => {
        return response.json();
    })
    .then((getRandomRecipe) => {
    /* Access meal */
    const randomRecipe = getRandomRecipe.meals[0];

    /*Create variable for recipe-container */
    const recipeContainer = document.getElementById('recipe');

    /* Add meal title */
    const mealTitle = document.getElementById("mealTitle");
    mealTitle.textContent = randomRecipe.strMeal;

    /* Add image */
    const mealImage = document.getElementById("mealImage");
    mealImage.src = randomRecipe.strMealThumb;

    /* Add meal source */
    const mealSource = document.getElementById("mealSource");
    mealSource.href = randomRecipe.strSource;

    /* Add meal category */
    const mealCategory = document.getElementById('mealCategory');
    mealCategory.textContent = 'Category: ' + randomRecipe.strCategory;

    /*Added meal's country of origin*/
    const mealCountry = document.getElementById('mealCountry');
    mealCountry.textContent = 'Country: ' + randomRecipe.strArea;

    /*Adds the meal description */
    const mealDescription = document.getElementById('mealDescription');
    mealDescription.textContent = randomRecipe.strInstructions;
    
    /*Loops through the ingredients list*/
    function getIngredients(randomRecipe) {

        /*Empties the inner HTML of the ingredients list*/
        mealingredientList.innerHTML = '';
        for (i = 1; i < 20; i++) {

            /*Creates a key for the ingredient to loop through*/
            const ingredientKey = `strIngredient${i}`

            /*Creates a key for the measure to loop through*/
            const measureKey = `strMeasure${i}`;

            /* Creates a variable for the looped through ingredientkey */
            const ingredient = randomRecipe[ingredientKey];

            /* Creates a variable for the looped through measureKey */
            const measure = randomRecipe[measureKey];

            /*If the item in the object has content, uses that content*/
            if (ingredient.trim().length !== 0 || typeof ingredient.trim() != 'string') {

            /*Creates a list element*/
            const ingredientListElement = document.createElement('li');

            /*Assigns the list in the HTML markup a variable*/
            const mealingredientList = document.getElementById('mealingredientList');
            
            /* Adds the ingredient list item content to the list item in the markup */
            ingredientListElement.textContent = ingredient + ': ' + measure;

            /*Appends the list item to the list in the markup*/
            mealingredientList.appendChild(ingredientListElement);


            }
        }  
    
      }
    
      getIngredients(randomRecipe);
    
    // /*Adds the youtube video */
    
    // recipeContainer.removeChild(mealYoutube);
    // if (typeof randomRecipe.strSource.trim() == 'string' && randomRecipe.strSource.length != 0) {
    // const mealYoutube = document.createElement('iframe');
    // recipeContainer.appendChild(mealYoutube);
    // mealYoutube.src = randomRecipe.strSource; }

    
    })
    .catch(error => {
        console.log(error);
    })
    })
    