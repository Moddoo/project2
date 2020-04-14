const db = require("../models");
const Op = require("../models").Sequelize.Op;
const axios = require("axios");
const passport = require("../config/passport");
const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD
    }
});

const characters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z",
    "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "1", "2", "3", "4",
    "5", "6", "7", "8", "9", "0", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "-", "_", "=", "+", "[", "]", "{", "}", ";", ":", ",", ".", ">", "/", "?", "|", "~"];

module.exports = app => {
    //User signup and authentication routes

    app.post("/api/signup", (req, res) => {
        db.User.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        }).then(() => {
            const mailOptions = {
                from: process.env.EMAIL,
                to: req.body.email,
                subject: "Thank you for using Foodzi!",
                text: `Welcome, ${req.body.username}! Thank you for registering an account. You can do many cool things on Foodzi.`
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log(error);
                } else {
                    console.log("Email sent: " + info.response);
                }
            });

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

    app.get("/api/email/:email", (req, res) => {
        const email = req.params.email;
        
        db.User.findAll({
            where: {
                email: email
            }
        }).then(result => {
            const username = result[0].dataValues.username;

            const mailOptions = {
                from: process.env.EMAIL,
                to: email,
                subject: "Your recovered FOODZI username",
                text: `Hello, you requested a recovery for your FOODZI username. Your username is: ${username}.`
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log(error);
                } else {
                    console.log("Email sent: " + info.response);
                }
            });

            return res.sendStatus(200);
        }).catch(err => {
            console.log(err);
            return res.sendStatus(200);
        })
    });

    app.get("/api/password/:email", (req, res) => {
        const email = req.params.email;
        let password = "";
        
        db.User.findAll({
            where: {
                email: email
            }
        }).then(result => {
            const username = result[0].dataValues.username;
            for(let i = 0; i < 16; i++) {
                password += characters[Math.floor(Math.random() * characters.length)];
            }

            const mailOptions = {
                from: process.env.EMAIL,
                to: email,
                subject: "FOODZI Password Reset",
                text: `Hello ${username}, we reset your password. Your new password is: ${password}.`
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log(error);
                } else {
                    console.log("Email sent: " + info.response);
                }
            });

            return res.sendStatus(200);
        }).catch(err => {
            console.log(err);
            return res.sendStatus(200);
        })
    });

    //Post route for creating food log entries

    app.post("/api/food", (req, res) => {
        // console.log(req.body);
        // console.log(req.user);
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

    //Get route for querying and displaying previous weeks of food log

    app.get("/api/previous-weeks/:query", (req, res) => {
        const queryArray = req.params.query.split("-");
        const userID = req.user.id;
        const weekOfYear = parseInt(queryArray[0]);
        console.log(queryArray);
        console.log(userID, weekOfYear);

        if (queryArray.length === 1) {
            console.log("length = 1");
            db.FoodLog.findAll({
                where: {
                    UserId: userID,
                    weekOfYear: weekOfYear
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
                    weekOfYear: {
                        [Op.lte]: weekOfYear
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