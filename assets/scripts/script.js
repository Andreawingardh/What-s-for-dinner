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
             function getStartPositions() {
            recipeContainer.style.display = 'none';
             const header = document.querySelector('header');
             header.style.position = "absolute";
             header.style.top = "40vh";
             document.body.style.backgroundColor = "var(--color-secondary)";
            }