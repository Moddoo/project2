module.exports = (sequelize, DataTypes) => {
    const RecipeStorage = sequelize.define("RecipeStorage", {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        api_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        readyInMinutes: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        servings: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        }
    });

    RecipeStorage.associate = models => {
        RecipeStorage.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });
    };

    return RecipeStorage;
};