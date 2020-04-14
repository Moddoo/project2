$(document).ready(function () {

    const foodForm = $("#food-form");
    const recipeForm = $("#recipe-form");

    const foodList = $("#food-list");
    const recipeList = $("#recipe-list");



    foodForm.on("submit", event => {
        event.preventDefault();

        const foodInput = $("#food-input").val().trim();
            $("#food-input").val("");
        const foodNumber = $("#food-number").val().trim();
            $("#food-number").val("");
            // const queryURL = ``;

        $.post("/api/food/storage", {
            ingredients: foodInput,
            number: foodNumber
        }).then(res => {
            // console.log(res);
            location.reload();
        })
    })

    recipeForm.on("submit", event => {
        event.preventDefault();
        recipeList.empty();
        const recipeInput = $("#recipe-input").val().trim();
            $("#recipe-input").val("");

        // console.log(recipeInput)

        $.post("/api/recipe/search", {
            input: recipeInput
        }).then(res => {
            console.log(res);

            for(const recipes of res){
                recipeList.append(
                `
                <li>
                    <p>${recipes.title}</p>
                    <p>${recipes.readyInMinutes}</p>
                    <p>${recipes.servings}</p>
                </li>
                `)
            }

            // location.reload();
        })
    })

    

    $.get(`/api/food/storage`, data => {
        // console.log(data); 
        for(const foodStorage of data){
            // console.log(foodStorage);
            foodList.append(
                `
                <li>
                    <p>${foodStorage.number}: ${foodStorage.ingredients}</p>
                </li>
                `)
        }
    });
});