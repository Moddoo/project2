module.exports = (sequelize, DataTypes) => {
    const FoodStorage = sequelize.define("FoodStorage", {
        ingredients: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        number: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                len: [1]
            }
        }
    });

    FoodStorage.associate = models => {
        FoodStorage.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });
    };

    return FoodStorage;
};