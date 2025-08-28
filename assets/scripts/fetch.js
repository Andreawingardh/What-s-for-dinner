/* Script for the second page called categories, where only a meal is displayed along with a link to the webpage. */
const recipeContainer = document.getElementById('recipe');
recipeContainer.style.display = 'none';
const header = document.querySelector('header');
header.style.position = "absolute";
header.style.top = "40vh";
document.body.style.backgroundColor = "var(--color-secondary)";

// Function to fetch and display meal for a given category
const fetchMealByCategory = (category) => {
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
            /*Loops through the ingredients list*/
            function getIngredients(randomRecipe) {
                /*Empties the inner HTML of the ingredients list*/
                const mealingredientList = document.getElementById('mealingredientList');
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
            recipeContainer.scrollIntoView({behavior: 'smooth'});
            document.getElementById('dropdown-menu').value = "Please choose a category!";
        })
        .catch(error => {
            console.log(error);
            document.getElementById('dropdown-menu').value = "Please choose a category!";
            showErrorPopup("Failed to load recipe details. Please try again.", () => {
                fetchMealByCategory(category);
            });
        });
    })
    .catch(error => {
        console.log(error);
        document.getElementById('dropdown-menu').value = "Please choose a category!";
        // Show error popup with retry function
        showErrorPopup("Failed to load meals from this category. Please try again.", () => {
            fetchMealByCategory(category);
        });
    });
};

const displayMeal = () => {
    document.getElementById('dropdown-menu').addEventListener('change', () => {
        const category = document.getElementById('dropdown-menu').value;
        if (category && category !== "Please choose a category!") {
            fetchMealByCategory(category);
        }
    });
};

function showErrorPopup(message = "Oops, this recipe didn't load. Please try again", retryCallback = null) {
    const existingPopup = document.querySelector('.error-popup');
    if (existingPopup) {
        existingPopup.remove();
    }

    const popupDiv = document.createElement('div');
    popupDiv.classList.add('error-popup');

    const popupContent = document.createElement('div');
    popupContent.classList.add('popup-content');

    const popupText = document.createElement('p');
    popupText.textContent = message;
    popupText.classList.add('popup-text');

    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('popup-buttons');

    if (retryCallback) {
        const tryAgainBtn = document.createElement('button');
        tryAgainBtn.textContent = 'Try Again';
        tryAgainBtn.classList.add('popup-btn', 'popup-btn-primary');
        tryAgainBtn.onclick = () => {
            popupDiv.classList.add('hide');
            setTimeout(() => popupDiv.remove(), 300);
            retryCallback();
        };
        buttonContainer.appendChild(tryAgainBtn);
    }

    const closeBtn = document.createElement('button');
    closeBtn.textContent = 'Close';
    closeBtn.classList.add('popup-btn', 'popup-btn-secondary');
    closeBtn.onclick = () => {
        popupDiv.classList.add('hide');
        setTimeout(() => popupDiv.remove(), 300);
    };
    buttonContainer.appendChild(closeBtn);

    popupContent.appendChild(popupText);
    popupContent.appendChild(buttonContainer);
    popupDiv.appendChild(popupContent);
    document.body.appendChild(popupDiv);

    setTimeout(() => popupDiv.classList.add('show'), 10);

    setTimeout(() => {
        if (document.body.contains(popupDiv)) {
            popupDiv.classList.add('hide');
            setTimeout(() => popupDiv.remove(), 300);
        }
    }, 8000);
}

displayMeal();
