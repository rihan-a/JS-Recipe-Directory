// Variables
let searchInput = document.querySelector("#search-input");
let searchBtn = document.querySelector("#search-btn");
let resultsAreaHtml = document.querySelector("#result-area");
let resultItemBtn = document.querySelector(".result-item-btn");
let modalBox = document.querySelector(".model-area");
let closeModelBtn = document.querySelector(".close-model");
let modalInfoArea = document.querySelector("#info");
let loading = document.querySelector("#loading");
let videoLink = document.querySelector(".video-link");


// Adding event listeners 
searchBtn.addEventListener("click", getRecipes);

searchInput.addEventListener("keydown", function(e) {
    if (e.key === "Enter") {
        getRecipes();
    }
});
resultsAreaHtml.addEventListener("click", getRecipeDetails);
closeModalBtn.addEventListener("click", closeModalBox);


// Function to fetch recipes by ingredient
function getRecipes(data) {
    resultsAreaHtml.innerHTML = "";
    // loading until the datais fetched
    loading.style.display = "block";
    if (searchInput.value != "") {
        let url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInput.value}`;
        fetch(url)
            .then((res) => res.json())
            .then((data) => printRecipesHtml(data))
            .catch((err) => console.log("err"));
    } else {
        alert("Please input an ingredient to find a recipe. ");
        loading.style.display = "none";
    }
}

// Function to inject the recipes into the html
function printRecipesHtml(recipes) {
    loading.style.display = "none";
    if (recipes.meals) {
        recipes.meals.forEach(function(item) {
            resultsAreaHtml.innerHTML += `<div class="result-item" >
                      <img class="result-img" src="${item.strMealThumb}" data-id="${item.idMeal}" alt="" />
                      <h2>${item.strMeal}</h2>
            </div>`;
        });
    } else {
        alert("no data available.");
    }
    searchInput.value = "";
}

// function to get the recipe details by ID
function getRecipeDetails(e) {
    if (e.target.classList.contains("result-img")) {
        modalInfoArea.innerHTML = "";
        let id = e.target.getAttribute("data-id");

        let url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;

        fetch(url)
            .then((res) => res.json())
            .then((data) => printModalInfo(data))
            .catch((err) => console.log("err"));
        console.log(id);
    }
}

function closeModalBox() {
    modalBox.style.display = "none";
}



// function to print the selected recipe detail into the modal
function printModalInfo(data) {
    modalBox.style.display = "block";

    let meal = data.meals[0];

    console.log(meal);

    modalInfoArea.innerHTML = `<h2>${meal.strMeal}</h2>
<div class="info-container">
  <div class="info-img">
    <img src="${meal.strMealThumb}" alt="" />
    <div class="video-link">
<a href="${meal.strYoutube}" target="_blank"> RECIPE VIDEO </a>
</div>
  </div>
  <div class="ingredients-container">
    <h3>Ingredients:</h3>
    <div class="ingredients">
      <h4>${meal.strMeasure1} ${meal.strIngredient1}</h4>
      <h4>${meal.strMeasure2} ${meal.strIngredient2}</h4>
      <h4>${meal.strMeasure3} ${meal.strIngredient3}</h4>
      <h4>${meal.strMeasure4} ${meal.strIngredient4}</h4>
      <h4>${meal.strMeasure5} ${meal.strIngredient5}</h4>
      <h4>${meal.strMeasure6} ${meal.strIngredient6}</h4>
      <h4>${meal.strMeasure7} ${meal.strIngredient7}</h4>
      <h4>${meal.strMeasure8} ${meal.strIngredient8}</h4>
      <h4>${meal.strMeasure9} ${meal.strIngredient9}</h4>
      <h4>${meal.strMeasure10} ${meal.strIngredient10}</h4>
      <h4>${meal.strMeasure11} ${meal.strIngredient11}</h4>
      <h4>${meal.strMeasure12} ${meal.strIngredient12}</h4>
      <h4>${meal.strMeasure13} ${meal.strIngredient13}</h4>
      <h4>${meal.strMeasure14} ${meal.strIngredient14}</h4>
      <h4>${meal.strMeasure15} ${meal.strIngredient15}</h4>
      <h4>${meal.strMeasure16} ${meal.strIngredient16}</h4>
      <h4>${meal.strMeasure17} ${meal.strIngredient17}</h4>
      <h4>${meal.strMeasure18} ${meal.strIngredient18}</h4>
      <h4>${meal.strMeasure19} ${meal.strIngredient19}</h4>
      <h4>${meal.strMeasure20} ${meal.strIngredient20}</h4>
    </div>
    <h4 class="direction">Directions:</h4>
    <p>${meal.strInstructions}
</p>
  </div>
</div>`;
}

