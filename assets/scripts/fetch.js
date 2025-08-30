/* Script for the second page called categories, where only a meal is displayed along with a link to the webpage. */

const recipeContainer = document.getElementById('recipe');
recipeContainer.style.display = 'none';

const header = document.querySelector('header');
header.style.position = "absolute";
header.style.top = "40vh";

document.body.style.backgroundColor = "var(--color-secondary)";

const loadingEl = document.getElementById("loading");
loadingEl.classList.remove("active");

function showSpinner() {
    loadingEl.classList.add("active");
}
function hideSpinner() {
    loadingEl.classList.remove("active");
}

let ingredientDropDownOpen = false;


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
            mealImage.alt = randomRecipe.strMeal;

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

           document.getElementById('Ingredients').addEventListener('click',()=>{
            ingredientDropDownOpen = !ingredientDropDownOpen;
             if(ingredientDropDownOpen){
              getIngredients(randomRecipe);
             }else{
                document.getElementById('mealingredientList').innerHTML = '<div></div>';
             }
             
           })
           document.getElementById('Ingredients').style.cursor = 'pointer'
           document.getElementById('Ingredients').title = 'All Ingredients'

            recipeContainer.scrollIntoView({ behavior: 'smooth' });

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
