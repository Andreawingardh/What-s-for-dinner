  /* Script for the second page called categories, where only a meal is displayed along with a link to the webpage. */

    const recipeContainer = document.getElementById('recipe');
    recipeContainer.style.display = 'none';
    const header = document.querySelector('header');
    header.style.position = "absolute";
    header.style.top = "40vh";
    document.body.style.backgroundColor = "var(--color-secondary)";

    // Collapsible ingredients functionality
    const toggleIngredients = () => {
        const ingredientsHeader = document.getElementById('ingredients-header');
        const ingredientsContent = document.getElementById('ingredients-content');
        const ingredientsArrow = document.getElementById('ingredients-arrow');
        
        console.log('Setting up toggle ingredients:', { ingredientsHeader, ingredientsContent, ingredientsArrow });
        
        if (ingredientsHeader && ingredientsContent && ingredientsArrow) {
            // Remove any existing event listeners to prevent duplicates
            ingredientsHeader.removeEventListener('click', handleIngredientsToggle);
            // Add the event listener
            ingredientsHeader.addEventListener('click', handleIngredientsToggle);
            console.log('Event listener added successfully');
        } else {
            console.log('Some elements not found for toggle setup');
        }
    };

    // Handle the toggle functionality
    const handleIngredientsToggle = () => {
        const ingredientsContent = document.getElementById('ingredients-content');
        const ingredientsArrow = document.getElementById('ingredients-arrow');
        
        console.log('Toggle clicked!', { ingredientsContent, ingredientsArrow });
        
        if (ingredientsContent && ingredientsArrow) {
            ingredientsContent.classList.toggle('collapsed');
            ingredientsArrow.classList.toggle('collapsed');
            console.log('Classes toggled successfully');
        } else {
            console.log('Elements not found!');
        }
    };

    // Initialize collapsible functionality when DOM is loaded
    document.addEventListener('DOMContentLoaded', toggleIngredients);

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
                document.querySelector('footer').style.display = "flex";
                header.style.position = "relative";
                header.style.top = "0";
                document.body.style.backgroundColor = "var(--color-white)";
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
                const paragraphs = mealDescription.querySelectorAll('p');
                paragraphs.forEach(p => p.remove());
                let instructions = '';
                instructions = randomRecipe.strInstructions;
                let instructionsArray = [];
                instructionsArray.length = 0;
                instructionsArray = instructions.split("\r\n")
                console.log(instructionsArray);
                instructionsArray.forEach(element => {
                    if(element != '') {
                        const p = document.createElement('p');
                    p.textContent = `${element}`;
                    mealDescription.appendChild(p);
                    }
                });
                
                // mealDescription.textContent = randomRecipe.strInstructions;
                
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

                // Ensure collapsible functionality is available after recipe loads
                toggleIngredients();

                recipeContainer.scrollIntoView({behavior: 'smooth'});

                document.getElementById('dropdown-menu').value = "Please choose a category!";
    


            })

            .catch(error => {
                console.log(error);
                document.getElementById('dropdown-menu').value = "Please choose a category!";
            });

        })

        .catch(error => {
            console.log(error);
            const dialog = document.getElementById("myDialog");
            dialog.showModal(); 
            document.getElementById('dropdown-menu').value = "Please choose a category!";
        })
    })
}

displayMeal();

