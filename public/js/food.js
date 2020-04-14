$(document).ready(function () {
    const foodSearch = $("#food-search");
    const hideFoodSearch = $("#hide-food-search");
    const previousWeeks = $("#dropdown1");
    const error = $("#error");

    const sunday = $("#sunday");
    const monday = $("#monday");
    const tuesday = $("#tuesday");
    const wednesday = $("#wednesday");
    const thursday = $("#thursday");
    const friday = $("#friday");
    const saturday = $("#saturday");

    const getDate = day => {
        return moment().day(day).format("dddd, MMMM Do YYYY");
    };

    const getMonth = day => {
        return parseInt(moment().day(day).format("M"));
    };

    const getDay = day => {
        return parseInt(moment().day(day).format("D"));
    };

    const getYear = day => {
        return parseInt(moment().day(day).format("YYYY"));
    }

    const getWeek = (weekNumber, weekDay) => {
        return moment().week(weekNumber).day(weekDay).format("dddd, MMMM Do YYYY");
    }

    const getPastWeeks = (weekNumber, weekDay) => {
        return moment().week(weekNumber).day(weekDay).format("MMMM Do YYYY");
    }

    const displayFoodLog = (foodDataArray, isPastWeek) => {
        let totalCalories = 0;
        let totalFat = 0;
        let totalCarbs = 0;
        let totalSodium = 0;
        let totalCholesterol = 0;

        if (!foodDataArray.length) {
            console.log("no data");
            console.log(weekOfYear);
            sunday.empty().append(`<b>${getWeek(weekOfYear, 0)}</b><span class="add" data-day="0">➕</span>`);
            monday.empty().append(`<b>${getWeek(weekOfYear, 1)}</b><span class="add" data-day="1">➕</span>`);
            tuesday.empty().append(`<b>${getWeek(weekOfYear, 2)}</b><span class="add" data-day="2">➕</span>`);
            wednesday.empty().append(`<b>${getWeek(weekOfYear, 3)}</b><span class="add" data-day="3">➕</span>`);
            thursday.empty().append(`<b>${getWeek(weekOfYear, 4)}</b><span class="add" data-day="4">➕</span>`);
            friday.empty().append(`<b>${getWeek(weekOfYear, 5)}</b><span class="add" data-day="5">➕</span>`);
            saturday.empty().append(`<b>${getWeek(weekOfYear, 6)}</b><span class="add" data-day="6">➕</span>`);
        }
        else if(isPastWeek) {
            console.log("data, past week");
            sunday.empty().append(`<b>${getWeek(foodDataArray[0].weekOfYear, 0)}</b>`);
            monday.empty().append(`<b>${getWeek(foodDataArray[0].weekOfYear, 1)}</b>`);
            tuesday.empty().append(`<b>${getWeek(foodDataArray[0].weekOfYear, 2)}</b>`);
            wednesday.empty().append(`<b>${getWeek(foodDataArray[0].weekOfYear, 3)}</b>`);
            thursday.empty().append(`<b>${getWeek(foodDataArray[0].weekOfYear, 4)}</b>`);
            friday.empty().append(`<b>${getWeek(foodDataArray[0].weekOfYear, 5)}</b>`);
            saturday.empty().append(`<b>${getWeek(foodDataArray[0].weekOfYear, 6)}</b>`);
        }
        else {
            console.log("data, current week");
            sunday.empty().append(`<b>${getWeek(foodDataArray[0].weekOfYear, 0)}</b><span class="add" data-day="0">➕</span>`);
            monday.empty().append(`<b>${getWeek(foodDataArray[0].weekOfYear, 1)}</b><span class="add" data-day="1">➕</span>`);
            tuesday.empty().append(`<b>${getWeek(foodDataArray[0].weekOfYear, 2)}</b><span class="add" data-day="2">➕</span>`);
            wednesday.empty().append(`<b>${getWeek(foodDataArray[0].weekOfYear, 3)}</b><span class="add" data-day="3">➕</span>`);
            thursday.empty().append(`<b>${getWeek(foodDataArray[0].weekOfYear, 4)}</b><span class="add" data-day="4">➕</span>`);
            friday.empty().append(`<b>${getWeek(foodDataArray[0].weekOfYear, 5)}</b><span class="add" data-day="5">➕</span>`);
            saturday.empty().append(`<b>${getWeek(foodDataArray[0].weekOfYear, 6)}</b><span class="add" data-day="6">➕</span>`);
        }

        $("#sunday-calories").empty();
        $("#sunday-carbs").empty();
        $("#sunday-fat").empty();
        $("#sunday-sodium").empty();
        $("#sunday-cholesterol").empty();

        $("#monday-calories").empty();
        $("#monday-carbs").empty();
        $("#monday-fat").empty();
        $("#monday-sodium").empty();
        $("#monday-cholesterol").empty();

        $("#tuesday-calories").empty();
        $("#tuesday-carbs").empty();
        $("#tuesday-fat").empty();
        $("#tuesday-sodium").empty();
        $("#tuesday-cholesterol").empty();

        $("#wednesday-calories").empty();
        $("#wednesday-carbs").empty();
        $("#wednesday-fat").empty();
        $("#wednesday-sodium").empty();
        $("#wednesday-cholesterol").empty();

        $("#thursday-calories").empty();
        $("#thursday-carbs").empty();
        $("#thursday-fat").empty();
        $("#thursday-sodium").empty();
        $("#thursday-cholesterol").empty();

        $("#friday-calories").empty();
        $("#friday-carbs").empty();
        $("#friday-fat").empty();
        $("#friday-sodium").empty();
        $("#friday-cholesterol").empty();

        $("#saturday-calories").empty();
        $("#saturday-carbs").empty();
        $("#saturday-fat").empty();
        $("#saturday-sodium").empty();
        $("#saturday-cholesterol").empty();

        $("#weekly-total-calories").empty()
        $("#weekly-total-carbs").empty()
        $("#weekly-total-fat").empty()
        $("#weekly-total-sodium").empty()
        $("#weekly-total-cholesterol").empty()

        for (const day of foodDataArray) {
            console.log(day);
            totalCalories += Math.round(day.calories);
            totalFat += Math.round(day.fat);
            totalCarbs += Math.round(day.carbs);
            totalSodium += Math.round(day.sodium);
            totalCholesterol += Math.round(day.cholesterol);

            if(isPastWeek) {
                switch (day.dayID.toString()) {
                    case "0":
                        sunday.append(`<br> ${day.food_item}`);
                        $("#sunday-calories").append(`<br> ${Math.round(day.calories)}`);
                        $("#sunday-carbs").append(`<br> ${Math.round(day.carbs)} g`);
                        $("#sunday-fat").append(`<br> ${Math.round(day.fat)} g`);
                        $("#sunday-sodium").append(`<br> ${Math.round(day.sodium)} mg`);
                        $("#sunday-cholesterol").append(`<br> ${Math.round(day.cholesterol)} mg`);
                        break;
    
                    case "1":
                        monday.append(`<br> ${day.food_item}`);
                        $("#monday-calories").append(`<br> ${Math.round(day.calories)}`);
                        $("#monday-carbs").append(`<br> ${Math.round(day.carbs)} g`);
                        $("#monday-fat").append(`<br> ${Math.round(day.fat)} g`);
                        $("#monday-sodium").append(`<br> ${Math.round(day.sodium)} mg`);
                        $("#monday-cholesterol").append(`<br> ${Math.round(day.cholesterol)} mg`);
                        break;
    
                    case "2":
                        tuesday.append(`<br> ${day.food_item}`);
                        $("#tuesday-calories").append(`<br> ${Math.round(day.calories)}`);
                        $("#tuesday-carbs").append(`<br> ${Math.round(day.carbs)} g`);
                        $("#tuesday-fat").append(`<br> ${Math.round(day.fat)} g`);
                        $("#tuesday-sodium").append(`<br> ${Math.round(day.sodium)} mg`);
                        $("#tuesday-cholesterol").append(`<br> ${Math.round(day.cholesterol)} mg`);
                        break;
    
                    case "3":
                        wednesday.append(`<br> ${day.food_item}`);
                        $("#wednesday-calories").append(`<br> ${Math.round(day.calories)}`);
                        $("#wednesday-carbs").append(`<br> ${Math.round(day.carbs)} g`);
                        $("#wednesday-fat").append(`<br> ${Math.round(day.fat)} g`);
                        $("#wednesday-sodium").append(`<br> ${Math.round(day.sodium)} mg`);
                        $("#wednesday-cholesterol").append(`<br> ${Math.round(day.cholesterol)} mg`);
                        break;
    
                    case "4":
                        thursday.append(`<br> ${day.food_item}`);
                        $("#thursday-calories").append(`<br> ${Math.round(day.calories)}`);
                        $("#thursday-carbs").append(`<br> ${Math.round(day.carbs)} g`);
                        $("#thursday-fat").append(`<br> ${Math.round(day.fat)} g`);
                        $("#thursday-sodium").append(`<br> ${Math.round(day.sodium)} mg`);
                        $("#thursday-cholesterol").append(`<br> ${Math.round(day.cholesterol)} mg`);
                        break;
    
                    case "5":
                        friday.append(`<br> ${day.food_item}`);
                        $("#friday-calories").append(`<br> ${Math.round(day.calories)}`);
                        $("#friday-carbs").append(`<br> ${Math.round(day.carbs)} g`);
                        $("#friday-fat").append(`<br> ${Math.round(day.fat)} g`);
                        $("#friday-sodium").append(`<br> ${Math.round(day.sodium)} mg`);
                        $("#friday-cholesterol").append(`<br> ${Math.round(day.cholesterol)} mg`);
                        break;
    
                    default:
                        saturday.append(`<br> ${day.food_item}`);
                        $("#saturday-calories").append(`<br> ${Math.round(day.calories)}`);
                        $("#saturday-carbs").append(`<br> ${Math.round(day.carbs)} g`);
                        $("#saturday-fat").append(`<br> ${Math.round(day.fat)} g`);
                        $("#saturday-sodium").append(`<br> ${Math.round(day.sodium)} mg`);
                        $("#saturday-cholesterol").append(`<br> ${Math.round(day.cholesterol)} mg`);
                }
            }
            else {
                switch (day.dayID.toString()) {
                    case "0":
                        sunday.append(`<br> ${day.food_item} <span class="delete" data-food-id="${day.id}">❌</span>`);
                        $("#sunday-calories").append(`<br>${Math.round(day.calories)}`);
                        $("#sunday-carbs").append(`<br> ${Math.round(day.carbs)} g`);
                        $("#sunday-fat").append(`<br> ${Math.round(day.fat)} g`);
                        $("#sunday-sodium").append(`<br> ${Math.round(day.sodium)} mg`);
                        $("#sunday-cholesterol").append(`<br> ${Math.round(day.cholesterol)} mg`);
                        break;
    
                    case "1":
                        monday.append(`<br> ${day.food_item} <span class="delete" data-food-id="${day.id}">❌</span>`);
                        $("#monday-calories").append(`<br> ${Math.round(day.calories)}`);
                        $("#monday-carbs").append(`<br> ${Math.round(day.carbs)} g`);
                        $("#monday-fat").append(`<br> ${Math.round(day.fat)} g`);
                        $("#monday-sodium").append(`<br> ${Math.round(day.sodium)} mg`);
                        $("#monday-cholesterol").append(`<br> ${Math.round(day.cholesterol)} mg`);
                        break;
    
                    case "2":
                        tuesday.append(`<br> ${day.food_item} <span class="delete" data-food-id="${day.id}">❌</span>`);
                        $("#tuesday-calories").append(`<br> ${Math.round(day.calories)}`);
                        $("#tuesday-carbs").append(`<br> ${Math.round(day.carbs)} g`);
                        $("#tuesday-fat").append(`<br> ${Math.round(day.fat)} g`);
                        $("#tuesday-sodium").append(`<br> ${Math.round(day.sodium)} mg`);
                        $("#tuesday-cholesterol").append(`<br> ${Math.round(day.cholesterol)} mg`);
                        break;
    
                    case "3":
                        wednesday.append(`<br> ${day.food_item} <span class="delete" data-food-id="${day.id}">❌</span>`);
                        $("#wednesday-calories").append(`<br> ${Math.round(day.calories)}`);
                        $("#wednesday-carbs").append(`<br> ${Math.round(day.carbs)} g`);
                        $("#wednesday-fat").append(`<br> ${Math.round(day.fat)} g`);
                        $("#wednesday-sodium").append(`<br> ${Math.round(day.sodium)} mg`);
                        $("#wednesday-cholesterol").append(`<br> ${Math.round(day.cholesterol)} mg`);
                        break;
    
                    case "4":
                        thursday.append(`<br> ${day.food_item} <span class="delete" data-food-id="${day.id}">❌</span>`);
                        $("#thursday-calories").append(`<br> ${Math.round(day.calories)}`);
                        $("#thursday-carbs").append(`<br> ${Math.round(day.carbs)} g`);
                        $("#thursday-fat").append(`<br> ${Math.round(day.fat)} g`);
                        $("#thursday-sodium").append(`<br> ${Math.round(day.sodium)} mg`);
                        $("#thursday-cholesterol").append(`<br> ${Math.round(day.cholesterol)} mg`);
                        break;
    
                    case "5":
                        friday.append(`<br> ${day.food_item} <span class="delete" data-food-id="${day.id}">❌</span>`);
                        $("#friday-calories").append(`<br> ${Math.round(day.calories)}`);
                        $("#friday-carbs").append(`<br> ${Math.round(day.carbs)} g`);
                        $("#friday-fat").append(`<br> ${Math.round(day.fat)} g`);
                        $("#friday-sodium").append(`<br> ${Math.round(day.sodium)} mg`);
                        $("#friday-cholesterol").append(`<br> ${Math.round(day.cholesterol)} mg`);
                        break;
    
                    default:
                        saturday.append(`<br> ${day.food_item} <span class="delete" data-food-id="${day.id}">❌</span>`);
                        $("#saturday-calories").append(`<br> ${Math.round(day.calories)}`);
                        $("#saturday-carbs").append(`<br> ${Math.round(day.carbs)} g`);
                        $("#saturday-fat").append(`<br> ${Math.round(day.fat)} g`);
                        $("#saturday-sodium").append(`<br> ${Math.round(day.sodium)} mg`);
                        $("#saturday-cholesterol").append(`<br> ${Math.round(day.cholesterol)} mg`);
                }
            }
        }
        
        $("#weekly-total-calories").append(`<b>${totalCalories} calories</b>`);
        $("#weekly-total-carbs").append(`<b>${totalCarbs} g</b>`);
        $("#weekly-total-fat").append(`<b>${totalFat} g</b>`);
        $("#weekly-total-sodium").append(`<b>${totalSodium} mg</b>`);
        $("#weekly-total-cholesterol").append(`<b>${totalCholesterol} mg</b>`);

        $(".add").on("click", function () {
            hideFoodSearch.show();
            $("#error-nav").hide();
            day = $(this).data("day");
        });

        $(".delete").on("click", function () {
            const foodID = $(this).data("food-id");
            console.log(foodID);

            $.ajax({
                url: `/api/delete/${foodID}`,
                type: "DELETE",
            }).then(res => {
                location.reload();
            });
        });
    };

    const displayPreviousWeeks = query => {
        $.get(`/api/previous-weeks/${query + "-display"}`, data => {
            console.log(data);

            if (!data.length) {
                console.log("no data");
                return;
            }
            else {
                console.log("data");

                let weekCounter = data[data.length - 1].weekOfYear;
                const weekCounterArray = [];

                for (let foodItem = data.length - 1; foodItem >= 0; foodItem--) {
                    if (weekCounterArray.indexOf(data[foodItem].weekOfYear) === -1) {
                        previousWeeks.append(`<li class="previous-weeks" data-week-id="${weekCounter}"><a href="#!">${getPastWeeks(data[foodItem].weekOfYear, 0)} - ${getPastWeeks(data[foodItem].weekOfYear, 6)}</a></li>`);
                        weekCounterArray.push(data[foodItem].weekOfYear);
                        weekCounter--;
                    }
                }

                $(".previous-weeks").on("click", function () {
                    hideFoodSearch.hide();
                    console.log($(this).data("week-id"));
                    const getWeekOfYear = $(this).data("week-id");
                    let isPastWeek;

                    if(getWeekOfYear === weekOfYear) {
                        isPastWeek = false;
                    }
                    else {
                        isPastWeek = true;
                    }

                    $.get(`/api/previous-weeks/${getWeekOfYear}`, data => {
                        console.log(data);
                        displayFoodLog(data, isPastWeek);
                    });
                });
                
                const elems = document.querySelectorAll('.dropdown-trigger');
                M.Dropdown.init(elems);
            }
        });
    };

    const initializePage = () => {
        hideFoodSearch.hide();
        $("#error-nav").hide();

        $.get(`/api/currentweek/${week}`, data => {
            console.log(week);
            console.log(data);
            if (!data.length) {
                weekOfYear = moment().week();
            }
            else {
                weekOfYear = data[data.length - 1].weekOfYear;
                console.log(weekOfYear);
            }
        }).then(data => {
            displayFoodLog(data, false);
            displayPreviousWeeks(weekOfYear);
        });
    };

    const week = getMonth(0) + "-" + getDay(0) + "-" + getMonth(6) + "-" + getDay(6);
    let weekOfYear;
    let day;

    initializePage();

    foodSearch.on("submit", event => {
        event.preventDefault();

        const food = $("#food-item").val().trim();
        $("#food-item").val("");

        $.post("/api/food", {
            food: food,
            date: getDate(day),
            month: getMonth(day),
            day: getDay(day),
            year: getYear(day),
            dayID: day,
            weekOfYear: weekOfYear
        }).then(res => {
            if(!res){
                console.log("no results");
                $("#error-nav").show();
                error.empty().append("No nutritional information was found.");
            }
            else{
                console.log("results found");
                location.reload();
            }
        });
    });

    $("#icon2").on("click", () => {
        hideFoodSearch.hide();
        $("#error-nav").hide();
    });
});