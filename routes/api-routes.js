const db = require("../models");
const Op = require("../models").Sequelize.Op;
const axios = require("axios");
const passport = require("../config/passport");
require("dotenv").config();

module.exports = app => {
    //User signup and authentication routes

    app.post("/api/signup", (req, res) => {
        db.User.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        }).then(() => {
            return res.redirect(307, "/api/login");
        }).catch(err => {
            return res.json(err);
          });
    });

    app.post("/api/login", passport.authenticate("local"), (req, res) => {
        return res.sendStatus(200);
    });

    app.get("/logout", (req, res) => {
        req.logout();
        res.redirect("/");
    });

    //Post route for creating food log entries

    app.post("/api/food", (req, res) => {
        console.log(req.body);
        console.log(req.user);
        const food = req.body.food;

        axios.get(`https://api.edamam.com/api/nutrition-data?app_id=${process.env.APP_ID}&app_key=${process.env.API_KEY}&ingr=${food}`).then(response => {
            const responseArray = [response.data.totalNutrients.ENERC_KCAL, response.data.totalNutrients.FAT, response.data.totalNutrients.CHOCDF, response.data.totalNutrients.NA, response.data.totalNutrients.CHOLE]
            
            if(responseArray[0] === undefined) {
                res.json(0);
            }
            else {
                for (let i = 0; i < responseArray.length; i++) {
                    if (responseArray[i] === undefined) {
                        responseArray[i] = { quantity: 0 };
                    }
                }
                console.log(responseArray);

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
                    weekOfYear: req.body.weekOfYear,
                    UserId: req.user.id
                }).then(dbResponse => {
                    res.json(dbResponse);
                });
            }
        });
    });

    //Get route to get and display the current week's food log

    app.get("/api/currentweek/:week", (req, res) => {
        const userID = req.user.id;
        const weekStart = req.params.week.split("-");
        const dateArray = [];

        for(const date of weekStart){
            dateArray.push(parseInt(date));
        }
        console.log(dateArray);

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

    //Get route for querying and displaying previous weeks of food log

    app.get("/api/previous-weeks/:query", (req, res) => {
        const queryArray = req.params.query.split("-");
        const userID = req.user.id;
        const weekID = parseInt(queryArray[0]);
        console.log(queryArray);
        console.log(userID, weekID);

        if (queryArray.length === 1) {
            console.log("length = 1");
            db.FoodLog.findAll({
                where: {
                    UserId: userID,
                    weekID: weekID
                }
            }).then(result => {
                res.json(result);
            });
        }
        else if (queryArray.length === 2) {
            console.log("length = 2");
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
        }
    })

    //Delete route to delete food logs

    app.delete("/api/delete/:foodID", (req, res) => {
        const foodID = req.params.foodID;

        db.FoodLog.destroy({
            where: {
                id: foodID
            }
        }).then(() => {
            res.sendStatus(200);
        });
    });
};