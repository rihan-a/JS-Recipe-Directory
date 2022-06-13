let searchInput = document.querySelector("#search-input");
let searchBtn = document.querySelector("#search-btn");
let resultsAreaHtml = document.querySelector("#result-area");
let resultItemBtn = document.querySelector(".result-item-btn");
let modelBox = document.querySelector(".model-area");
let closeModelBtn = document.querySelector(".close-model");
let modelInfoArea = document.querySelector("#info");
let loading = document.querySelector("#loading");
let videoLink = document.querySelector(".video-link");

searchBtn.addEventListener("click", getRecipes);
resultsAreaHtml.addEventListener("click", getRecipeDetails);
closeModelBtn.addEventListener("click", closeModelBox);

function getRecipes(data) {
    resultsAreaHtml.innerHTML = "";
    loading.style.display = "block";
    //www.themealdb.com/api/json/v1/1/filter.php?i=chicken_breast
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

function printRecipesHtml(recipes) {
    loading.style.display = "none";
    if (recipes.meals) {
        recipes.meals.forEach(function(item) {
            // console.log(item);
            resultsAreaHtml.innerHTML += `<div class="result-item" data-id="${item.idMeal}">
                      <img src="${item.strMealThumb}" alt="" />
                      <h2>${item.strMeal}</h2>
                      <a class="result-item-btn" > Get Details </a>
                  </div>`;
        });
    } else {
        alert("no data available.");
    }
    searchInput.value = "";
}

function getRecipeDetails(e) {
    if (e.target.classList.contains("result-item-btn")) {
        modelInfoArea.innerHTML = "";
        let id = e.target.parentElement.getAttribute("data-id");

        let url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;

        fetch(url)
            .then((res) => res.json())
            .then((data) => printModelInfo(data))
            .catch((err) => console.log("err"));
        console.log(id);
    }
}

function closeModelBox() {
    modelBox.style.display = "none";
}

function printModelInfo(data) {
    modelBox.style.display = "block";
    let meal = data.meals[0];

    console.log(meal);

    modelInfoArea.innerHTML = `<h2>${meal.strMeal}</h2>
<div class="info-container">
  <div class="info-img">
    <img src="${meal.strMealThumb}" alt="" />
    <div class="video-link">
<a href="${meal.strYoutube}" target="_blank"> Video link </a>
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