const recipes = [
{
name: "Tomato Rice",
image:
 "https://images.unsplash.com/photo-1512058564366-18510be2db19",
ingredients: ["rice", "tomato", "onion", "oil", "salt"],
time: "25 minutes",
category: "Lunch",
instructions: "Cook rice. Fry onion and tomato in oil, add salt, and mix with the cooked rice."
},
{
name: "Potato Sandwich",
image: 
"https://images.unsplash.com/photo-1528735602780-2552fd46c7af",
ingredients: ["potato", "bread", "butter", "salt"],
time: "20 minutes",
category: "Breakfast",
instructions: "Boil and mash potatoes. Add salt, spread the mixture on bread, and toast with butter."
},
{
name: "Vegetable Fried Rice",
image:
 "https://images.unsplash.com/photo-1603133872878-684f208fb84b",
ingredients: ["rice", "carrot", "beans", "onion", "oil"],
time: "30 minutes",
category: "Lunch",
instructions: "Cook rice. Stir-fry chopped vegetables and onion, then add rice and mix well."
},
{
name: "Banana Smoothie",
image:"Banana smoothie.jpg.jpeg",
ingredients: ["banana", "milk", "honey"],
time: "5 minutes",
category: "Drinks",
instructions: "Blend banana, milk, and honey until smooth. Serve immediately."
},
{
name: "Onion Omelette",
image: "onion omellete.jpg",
ingredients: ["egg", "onion", "salt", "oil"],
time: "10 minutes",
category: "Breakfast",
instructions: "Beat eggs with chopped onion and salt. Cook in a lightly oiled pan until set."
},
{
name: "Tomato Soup",
image:"tomato-soup.jpg",
 

ingredients: ["tomato", "onion", "salt", "water"],
time: "20 minutes",
category: "Dinner",
instructions: "Cook chopped tomatoes and onion in water until soft. Blend carefully, reheat, and add salt."
}
];

const recipeList = document.getElementById("recipeList");
const ingredientInput = document.getElementById("ingredientInput");
const searchButton = document.getElementById("searchButton");
const message = document.getElementById("message");
const favouriteList = document.getElementById("favouriteList");

let favourites = JSON.parse(localStorage.getItem("favourites")) || [];

function displayRecipes(recipeArray, container) {
container.innerHTML = "";

if (recipeArray.length === 0) {
    container.innerHTML = "<p>No matching recipes found. Try another ingredient!</p>";
    return;
}

recipeArray.forEach(function(recipe) {
    const card = document.createElement("div");
    card.className = "recipe-card";
    const image = document.createElement("img");
image.src = recipe.image;
image.alt = recipe.name;
image.className = "recipe-image";
card.appendChild(image);

    const title = document.createElement("h3");
    title.textContent = recipe.name;

    const category = document.createElement("p");
    category.textContent = "Category: " + recipe.category;

    const time = document.createElement("p");
    time.textContent = "Cooking Time: " + recipe.time;

    const ingredients = document.createElement("p");
    ingredients.textContent = "Ingredients: " + recipe.ingredients.join(", ");

    const instructions = document.createElement("p");
    instructions.textContent = "Instructions: " + recipe.instructions;

    const favouriteButton = document.createElement("button");
    const alreadyFavourite = favourites.some(function(item) {
        return item.name === recipe.name;
    });

    favouriteButton.textContent = alreadyFavourite
        ? "❤️ Remove Favourite"
        : "♡ Add to Favourites";

    favouriteButton.addEventListener("click", function() {
        toggleFavourite(recipe);
    });

    card.appendChild(title);
    card.appendChild(category);
    card.appendChild(time);
    card.appendChild(ingredients);
    card.appendChild(instructions);
    card.appendChild(favouriteButton);

    container.appendChild(card);
});

}

function searchRecipes() {
const ingredient = ingredientInput.value.trim().toLowerCase();

if (ingredient === "") {
    message.textContent = "Please enter an ingredient first.";
    recipeList.innerHTML = "";
    return;
}

const matchingRecipes = recipes.filter(function(recipe) {
    return recipe.ingredients.some(function(item) {
        return item.includes(ingredient);
    });
});

message.textContent = matchingRecipes.length + " recipe(s) found.";
displayRecipes(matchingRecipes, recipeList);

}

function toggleFavourite(recipe) {
const index = favourites.findIndex(function(item) {
return item.name === recipe.name;
});

if (index === -1) {
    favourites.push(recipe);
} else {
    favourites.splice(index, 1);
}

localStorage.setItem("favourites", JSON.stringify(favourites));
displayRecipes(recipes, recipeList);
displayRecipes(favourites, favouriteList);

}

searchButton.addEventListener("click", searchRecipes);

ingredientInput.addEventListener("keydown", function(event) {
if (event.key === "Enter") {
searchRecipes();
}
});

displayRecipes(recipes, recipeList);
displayRecipes(favourites, favouriteList);
const randomButton = document.getElementById("randomButton");

randomButton.addEventListener("click", function() {
    const randomIndex = Math.floor(Math.random() * recipes.length);
    const randomRecipe = recipes[randomIndex];

    message.textContent = "🎉 Surprise! We recommend " + randomRecipe.name;

    displayRecipes([randomRecipe], recipeList);
});

const categoryButtons = document.querySelectorAll(".categoryButton");

categoryButtons.forEach(function(button) {
    button.addEventListener("click", function() {
        const selectedCategory = button.dataset.category;

        if (selectedCategory === "All") {
            displayRecipes(recipes, recipeList);
        } else {
            const filteredRecipes = recipes.filter(function(recipe) {
                return recipe.category === selectedCategory;
            });

            displayRecipes(filteredRecipes, recipeList);
        }

        message.textContent = selectedCategory === "All"
            ? "Showing all recipes! 🍲"
            : "Showing " + selectedCategory + " recipes! 🍽️";
    });
});