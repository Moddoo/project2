module.exports = (sequelize, DataTypes) => {
    const FoodLog = sequelize.define("FoodLog", {
        food_item: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        calories: {
            type: DataTypes.DOUBLE,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        fat: {
            type: DataTypes.DOUBLE,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        carbs: {
            type: DataTypes.DOUBLE,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        sodium: {
            type: DataTypes.DOUBLE,
            validate: {
                len: [1]
            }
        },
        cholesterol: {
            type: DataTypes.DOUBLE,
            validate: {
                len: [1]
            }
        },
        date: {
            type: DataTypes.STRING,
            allowNull: false
        },
        month: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        day: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        year: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        dayID: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        weekID: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });

    FoodLog.associate = models => {
        FoodLog.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });
    };

    return FoodLog;
};