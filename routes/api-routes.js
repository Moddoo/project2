
const db = require("../models");
const Op = require("../models").Sequelize.Op;
const axios = require("axios");
const passport = require("../config/passport");
require("dotenv").config();


module.exports = app => {
    app.post("/api/signup", (req, res) => {
        db.User.create({
            username: req.body.username,
            password: req.body.password
        }).then(() => {
            res.redirect(307, "/api/login");
        }).catch(err => {
            res.status(401).json(err);
        });
    });

    app.post("/api/login", passport.authenticate("local"), (req, res) => {
        res.json({
            username: req.user.username,
            id: req.user.id
        });
    });

    app.get("/logout", (req, res) => {
        req.logout();
        res.redirect("/");
    });

    // Food Things
    app.post("/api/food", (req, res) => {
        // console.log(req.body);
        // console.log(req.user);
        const food = req.body.food;

        axios.get(req.body.url).then(response => {
            const responseArray = [response.data.totalNutrients.ENERC_KCAL, response.data.totalNutrients.FAT, response.data.totalNutrients.CHOCDF, response.data.totalNutrients.NA, response.data.totalNutrients.CHOLE]
            for(let i = 0; i < responseArray.length; i++){
                if(responseArray[i] === undefined){
                    responseArray[i] = {quantity: 0};
                }
            }
            // console.log(responseArray);

            db.FoodLog.create({
                food_item: food,
                calories: responseArray[0].quantity,
                fat: responseArray[1].quantity,
                carbs: responseArray[2].quantity,
                sodium: responseArray[3].quantity,
                cholesterol: responseArray[4].quantity,
                date: req.body.date,
                month: req.body.month,
                day: req.body.day,
                year: req.body.year,
                dayID: req.body.dayID,
                weekID: req.body.weekID,
                UserId: req.user.id
            }).then(dbResponse => {
                res.json(dbResponse);
            })
        })
    })

    app.get("/api/:date", (req, res) => {
        const userID = req.user.id;
        const weekStart = req.params.date.split("-");
        const dateArray = [];

        for(const date of weekStart){
            dateArray.push(parseInt(date));
        }
        // console.log(dateArray);

        if(dateArray[0] !== dateArray[2]){
            //this if condition isn't tested yet
            const objectResponse = {};

            db.FoodLog.findAll({
                where: {
                    month: dateArray[0],
                    day: {
                        [Op.gte]: dateArray[1]
                    },
                    UserId: userID
                }
            }).then(result => {
                objectResponse[firstMonth] = result;
                db.FoodLog.findAll({
                    where: {
                        month: dateArray[2],
                        day: {
                            [Op.lte]: dateArray[3]
                        },
                        UserId: userID
                    }
                }).then(result => {
                    objectResponse[secondMonth] = result;
                    res.json(objectResponse);
                });
            });
        }
        else{
            db.FoodLog.findAll({
                where: {
                    day: {
                        [Op.between]: [dateArray[1], dateArray[3]]
                    },
                    UserId: userID
                }
            }).then(result => {
                res.json(result);
            })
        }
    })

    app.get("/api/pastweeks/:weekID", (req, res) => {
        const userID = req.user.id;
        const weekID = parseInt(req.params.weekID);

        db.FoodLog.findAll({
            where: {
                UserId: userID,
                weekID: {
                    [Op.lte]: weekID
                }
            }
        }).then(result => {
            res.json(result);
        });
    });

    // Food Storage and Recipe Stuff
    app.get("/api/food/storage", (req, res) => {
        const userID = req.user.id;

        db.FoodStorage.findAll({
            order:[['number', 'DESC']],
            where: {
                UserId: userID
            }
        }).then(result => {
            // console.log(result);
            res.json(result);
        });

    })
    
    app.post("/api/food/storage", (req, res) => {
        // console.log(req.body);
        // console.log(req.user);
        
        db.FoodStorage.create({
            ingredients: req.body.ingredients,
            number: req.body.number,
            UserId: req.user.id
        }).then(dbResponse => {
            res.json(dbResponse);
        })
    })

    app.post("/api/recipe/storage", (req, res) => {
        // console.log(req.body);
        // console.log(req.user);

        for(const obj of req.body){
            db.recipeStorage.create(
                obj
                ).then(dbResponse => {
                res.json(dbResponse);
            })
        }

    })

    app.post("/api/recipe/search", (req, res) => {
        // console.log(req.body.data);
        // console.log(req.user);
        // const userID = req.user.id; 
        const recipeInput = req.body.input;

        axios.get(`https://api.spoonacular.com/recipes/search?apiKey=${process.env.API_KEY2}&query=${recipeInput}&number=10`).then(response => {
            
            // const responseArr = response.data.results
            
            // console.log(response.data)
        // const responseArray = [response.data.totalNutrients.ENERC_KCAL, response.data.totalNutrients.FAT, response.data.totalNutrients.CHOCDF, response.data.totalNutrients.NA, response.data.totalNutrients.CHOLE]
            // for(let i = 0; i < responseArray.length; i++){
            //     if(responseArray[i] === undefined){
            //         responseArray[i] = {quantity: 0};
            //     }
            // }
            // console.log(responseArray); 
            
            const responseData = response.data.results
            
            // console.log(responseData)
            res.json(responseData)

            // for(const resData of responseData){
                // console.log(resData)
            //    res.json(resData)
            // }

           

        }).catch(error => {
            if(error) throw error;
        })
    

        // db.FoodStorage.findAll({
        //     where: {
        //         UserId: userID
        //     }
        // }).then(result => {
        //     console.log(result);
        //     res.json(result);
        // });

    })



};