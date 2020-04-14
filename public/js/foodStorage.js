$(document).ready(function () {

    const foodForm = $("#food-form");
    const recipeForm = $("#recipe-form");


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
            console.log(res);
            location.reload();
        })
    })

    recipeForm.on("submit", event => {
        event.preventDefault();

        const recipeInput = $("#recipe-input").val().trim();
            $("#recipe-input").val("");

        console.log(recipeInput)

        $.post("/api/recipe/search", {
            input: recipeInput
        }).then(res => {
            console.log(res);
            location.reload();
        })
    })

    

    // $.get(`/api/food/storage`, data => {
    //     console.log(data);
    // });
});