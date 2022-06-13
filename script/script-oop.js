class RecipeDirectory {
    constructor() {
        this.searchInput = document.querySelector("#search-input");
        this.searchBtn = document.querySelector("#search-btn");
        this.resultsAreaHtml = document.querySelector("#result-area");

        this.searchBtn.addEventListener("click", this.getRecipes);
    }

    getRecipes(cb) {
        fetch(
                `https://www.themealdb.com/api/json/v1/1/filter.php?i=${this.searchInput.value}`
            )
            .then(function(req) {
                return req.json();
            })
            .then(function(data) {
                cb(data);
                console.log(data);
            })
            .catch(function(err) {
                console.log(err.message);
            });
    };






    getRecipes(function cb(data) {
        console.log(data);
    });

    // this.getRecipes(function cb(recipes) {
    //     console.log("rihan");
    //     if (recipes.meals) {
    //         recipes.meals.forEach(function(item) {
    //             this.resultsAreaHtml.innerHTML += `<div class="result-item">
    //                       <img src="${item.strMealThumb}" alt="" />
    //                       <h2>${item.strMeal}</h2>
    //                       <a href="#" id="result-item-btn"> get Details</a>
    //                   </div>`;
    //         });

    //         console.log(recipes);
    //     }
    // })
}

let recipes = new RecipeDirectory();