  /* Script for the second page called categories, where only a meal is displayed along with a link to the webpage. */

  const recipeContainer = document.getElementById('recipe');
recipeContainer.style.display = 'none';

  const displayMeal = () => {
    document.getElementById('dropdown-menu').addEventListener('change', () => {
        const category = document.getElementById('dropdown-menu').value;
        fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
        .then((response) => {
            return response.json();
        })
        .then((getMeal) => {
            /* Check if the fetch has worked */
            console.log(getMeal);

            /*Creates a random ingredientKey for accessing a random meal*/
            const ingredientKey = Math.floor(Math.random() * getMeal.meals.length + 1);

            /* Selects a random recipe */
            const generateRandomRecipe = getMeal.meals[ingredientKey];

            fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${generateRandomRecipe.idMeal}`)
            .then((response) => {
                return response.json();
            })
            .then ((getRandomRecipe) => {
                console.log(getRandomRecipe.meals[0]);
                const randomRecipe = getRandomRecipe.meals[0];

                 /*Create variable for recipe-container */
                const recipeContainer = document.getElementById('recipe');
                recipeContainer.style.display = 'flex';
                recipeContainer.style.flexDirection = 'column';

                /* Add meal title */
                const mealTitle = document.getElementById("mealTitle");
                mealTitle.textContent = randomRecipe.strMeal;

                /* Add image */
                const mealImage = document.getElementById("mealImage");
                mealImage.src = randomRecipe.strMealThumb;
                // document.body.style.background = `url(${randomRecipe.strMealThumb}) lightgray 50% / cover no-repeat`;
                // document.body.style.backgroundBlendMode = 'lighten';

                /* Add meal source */
                const mealSource = document.getElementById("mealSource");
                mealSource.href = randomRecipe.strSource;

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

displayMeal();
