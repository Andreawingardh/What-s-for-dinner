/* Script for the second page called categories, where only a meal is displayed along with a link to the webpage. */

const recipeContainer = document.getElementById('recipe');
recipeContainer.style.display = 'none';

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
        if (category === "default" || category === "Please choose a category!") return;
        showSpinner();
        recipeContainer.style.display = 'none';

        fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
        .then((response) => response.json())
        .then((getMeal) => {
            console.log(getMeal);

            /* Creates a random ingredientKey for accessing a random meal */
            const ingredientKey = Math.floor(Math.random() * getMeal.meals.length);
            const generateRandomRecipe = getMeal.meals[ingredientKey];

            return fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${generateRandomRecipe.idMeal}`);
        })
        .then((response) => response.json())
        .then((getRandomRecipe) => {
            document.querySelector('footer').style.display = "flex";
            header.style.position = "relative";
            header.style.top = "0";
            document.body.style.backgroundColor = "var(--color-white)";

            const randomRecipe = getRandomRecipe.meals[0];

            /* Show recipe, hide spinner */
            hideSpinner();
            recipeContainer.style.display = 'flex';
            recipeContainer.style.flexDirection = 'column';

            /* Add meal title */
            const mealTitle = document.getElementById("mealTitle");
            mealTitle.textContent = randomRecipe.strMeal;

            /* Add image */
            const mealImage = document.getElementById("mealImage");
            mealImage.src = randomRecipe.strMealThumb;

            /* Add meal source */
            const mealSource = document.getElementById("mealSource");
            mealSource.href = randomRecipe.strSource;

            /* Adds the meal description */
            const mealDescription = document.getElementById('mealDescription');
            const paragraphs = mealDescription.querySelectorAll('p');
            paragraphs.forEach(p => p.remove());

            const instructions = randomRecipe.strInstructions;
            const instructionsArray = instructions.split("\r\n");

            instructionsArray.forEach(element => {
                if (element !== '') {
                    const p = document.createElement('p');
                    p.textContent = element;
                    mealDescription.appendChild(p);
                }
            });

            /* Loops through the ingredients list */
            function getIngredients(randomRecipe) {
                const mealingredientList = document.getElementById('mealingredientList');
                mealingredientList.innerHTML = '';

                for (let i = 1; i < 20; i++) {
                    const ingredientKey = `strIngredient${i}`;
                    const measureKey = `strMeasure${i}`;

                    const ingredient = randomRecipe[ingredientKey];
                    const measure = randomRecipe[measureKey];

                    if (ingredient && ingredient.trim().length !== 0) {
                        const ingredientListElement = document.createElement('li');
                        ingredientListElement.textContent = ingredient + ': ' + (measure || '');
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
            const dialog = document.getElementById("myDialog");
            dialog.showModal(); 

            hideSpinner();
            document.getElementById('dropdown-menu').value = "Please choose a category!";
        });
    });
}

displayMeal();
