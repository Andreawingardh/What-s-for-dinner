/* Script for the second page called categories, where only a meal is displayed along with a link to the webpage. */
const recipeContainer = document.getElementById('recipe');
recipeContainer.style.display = 'none';
const header = document.querySelector('header');
header.style.position = "absolute";
header.style.top = "40vh";
document.body.style.backgroundColor = "var(--color-secondary)";

// Track the current request to prevent race conditions
let currentRequestId = 0;

// Function to fetch and display meal for a given category
const fetchMealByCategory = (category) => {
    // Increment request ID to track the latest request
    const requestId = ++currentRequestId;

    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    .then((response) => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then((getMeal) => {
        // Check if this is still the current request
        if (requestId !== currentRequestId) {
            console.log('Request cancelled - newer request in progress');
            return;
        }

        // Check if meals exist
        if (!getMeal.meals || getMeal.meals.length === 0) {
            throw new Error('No meals found for this category');
        }

        console.log(getMeal);

        // Creates a random ingredientKey for accessing a random meal
        const ingredientKey = Math.floor(Math.random() * getMeal.meals.length);
        const generateRandomRecipe = getMeal.meals[ingredientKey];

        return fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${generateRandomRecipe.idMeal}`)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then((getRandomRecipe) => {
            // Check again if this is still the current request
            if (requestId !== currentRequestId) {
                console.log('Request cancelled - newer request in progress');
                return;
            }

            if (!getRandomRecipe.meals || getRandomRecipe.meals.length === 0) {
                throw new Error('Recipe details not found');
            }

            // Success - update UI
            document.querySelector('footer').style.display = "flex";
            header.style.position = "relative";
            header.style.top = "0";
            document.body.style.backgroundColor = "var(--color-white)";

            console.log(getRandomRecipe.meals[0]);
            const randomRecipe = getRandomRecipe.meals[0];

            // Create variable for recipe-container
            const recipeContainer = document.getElementById('recipe');
            recipeContainer.style.display = 'flex';
            recipeContainer.style.flexDirection = 'column';

            // Add meal title
            const mealTitle = document.getElementById("mealTitle");
            mealTitle.textContent = randomRecipe.strMeal;

            // Add image
            const mealImage = document.getElementById("mealImage");
            mealImage.src = randomRecipe.strMealThumb;

            // Add meal source
            const mealSource = document.getElementById("mealSource");
            mealSource.href = randomRecipe.strSource;

            // Adds the meal description
            const mealDescription = document.getElementById('mealDescription');
            const paragraphs = mealDescription.querySelectorAll('p');
            paragraphs.forEach(p => p.remove());

            let instructions = randomRecipe.strInstructions;
            let instructionsArray = instructions.split("\r\n");

            console.log(instructionsArray);
            instructionsArray.forEach(element => {
                if(element.trim() !== '') {
                    const p = document.createElement('p');
                    p.textContent = element;
                    mealDescription.appendChild(p);
                }
            });

            // Loops through the ingredients list
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
                        ingredientListElement.textContent = `${ingredient}: ${measure}`;
                        mealingredientList.appendChild(ingredientListElement);
                    }
                }
            }

            getIngredients(randomRecipe);
            recipeContainer.scrollIntoView({behavior: 'smooth'});
            document.getElementById('dropdown-menu').value = "Please choose a category!";
        });
    })
    .catch(error => {
        // Only show error if this is still the current request
        if (requestId === currentRequestId) {
            console.log('Error:', error);
            document.getElementById('dropdown-menu').value = "Please choose a category!";
            showErrorPopup("Failed to load recipe. Please try again.", () => {
                fetchMealByCategory(category);
            });
        }
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
    // Remove any existing error popups
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
