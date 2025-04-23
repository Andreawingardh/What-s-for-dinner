# What's for Dinner

A web application that randomly generates meal recipes based on user-selected food categories. The app fetches data from [TheMealDB API](https://www.themealdb.com/) to provide users with diverse recipe options.

## Features

- **Category Selection**: Choose from 12 different meal categories including Beef, Chicken, Dessert, Lamb, Pasta, Pork, Seafood, Side, Starter, Vegan, Vegetarian, and Breakfast
- **Random Recipe Generation**: Get a random recipe from your selected category
- **Detailed Recipe Information**: View recipe title, image, country of origin, ingredients with measurements, and full instructions
- **Source Links**: Direct links to the original recipe sources for further information

## Live Demo

[View live demo](https://andreawingardh.github.io/What-s-for-dinner/)

## Technologies Used

- HTML5
- CSS3 (with responsive design)
- JavaScript (Vanilla)
- TheMealDB API

## How It Works

1. The app connects to TheMealDB's API to fetch available recipes by category
2. When a user selects a category, the app:
   - Fetches all meals in that category
   - Randomly selects one meal from the results
   - Fetches detailed information about the selected meal
   - Displays the recipe with all relevant information
3. Users can select a different category at any time to get a new random recipe

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/Andreawingardh/What-s-for-dinner.git
   ```
2. Navigate to the project directory:
   ```
   cd What-s-for-dinner
   ```
3. Open `index.html` in your web browser

## Usage

1. Open the app in your web browser
2. Click on the "Choose your category" dropdown
3. Select a meal category from the dropdown menu
4. View the randomly generated recipe with ingredients and cooking instructions
5. Click on the recipe title to visit the original recipe source
6. Select another category to generate a new random recipe

## API Information

This project uses [TheMealDB API](https://www.themealdb.com/), a free meal recipe database. The app makes use of the following endpoints:

- Filter by category: `https://www.themealdb.com/api/json/v1/1/filter.php?c={category}`
- Look up meal details: `https://www.themealdb.com/api/json/v1/1/lookup.php?i={mealId}`


## License

This project is licensed under the MIT License.

## Acknowledgments

- [TheMealDB](https://www.themealdb.com/) for providing the free API

## Author

Andrea Wingårdh - [GitHub Profile](https://github.com/Andreawingardh)
