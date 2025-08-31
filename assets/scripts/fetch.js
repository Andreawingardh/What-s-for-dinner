const recipeContainer = document.getElementById("recipe");
const header = document.querySelector("header");
const footer = document.querySelector("footer");
const loadingEl = document.getElementById("loading");
const dropdown = document.getElementById("dropdown-menu");
const dialog = document.getElementById("myDialog");

const mealTitle = document.getElementById("mealTitle");
const mealImage = document.getElementById("mealImage");
const mealSource = document.getElementById("mealSource");
const mealDescription = document.getElementById("mealDescription");
const ingredientList = document.getElementById("mealingredientList");

function showSpinner() {
  loadingEl.classList.add("active");
}

function hideSpinner() {
  loadingEl.classList.remove("active");
}

function resetDropdown() {
  dropdown.value = "default";
}

function resetUI() {
  recipeContainer.style.display = "none";
  header.classList.add("header--centered");
  document.body.style.backgroundColor = "var(--color-secondary)";
  footer.style.display = "none";
  ingredientList.style.display = "block";
}

function activateUI() {
  header.classList.remove("header--centered");
  document.body.style.backgroundColor = "var(--color-white)";
  footer.style.display = "flex";
}

async function fetchMealsByCategory(category) {
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
  );
  if (!response.ok) throw new Error("Failed to fetch meals");
  return response.json();
}

async function fetchMealDetails(id) {
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
  );
  if (!response.ok) throw new Error("Failed to fetch meal details");
  return response.json();
}

function renderMeal(meal) {
  mealTitle.textContent = meal.strMeal;
  mealImage.src = meal.strMealThumb || "";
  mealImage.alt = meal.strMeal;
  mealSource.href = meal.strSource || "#";

  mealDescription.querySelectorAll("p").forEach((p) => p.remove());
  const instructions = meal.strInstructions?.split("\r\n") || [];
  instructions.forEach((step) => {
    if (step.trim()) {
      const p = document.createElement("p");
      p.textContent = step;
      mealDescription.appendChild(p);
    }
  });

  ingredientList.innerHTML = "";
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ingredient && ingredient.trim()) {
      const li = document.createElement("li");
      li.textContent = `${ingredient}: ${measure || ""}`;
      ingredientList.appendChild(li);
    }
  }

  ingredientList.style.display = "block";

  recipeContainer.style.display = "flex";
  recipeContainer.style.flexDirection = "column";
  recipeContainer.scrollIntoView({ behavior: "smooth" });
}

async function handleCategoryChange(event) {
  const category = event.target.value;
  if (category === "default") return;

  showSpinner();
  resetUI();

  try {
    const mealsData = await fetchMealsByCategory(category);
    const meals = mealsData.meals || [];
    if (meals.length === 0) throw new Error("No meals found");

    const randomMeal =
      meals[Math.floor(Math.random() * meals.length)];

    const mealData = await fetchMealDetails(randomMeal.idMeal);
    const meal = mealData.meals?.[0];
    if (!meal) throw new Error("Meal details missing");

    activateUI();
    renderMeal(meal);
  } catch (error) {
    console.error("Error fetching meal:", error);
    dialog.showModal();
  } finally {
    hideSpinner();
    resetDropdown();
  }
}

function init() {
  resetUI();
  dropdown.addEventListener("change", handleCategoryChange);
}

init();
