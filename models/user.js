const bcrypt = require("bcryptjs");

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("User", {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                len: [1, 30]
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [5, 20]
            }
        }
    });

    User.prototype.validPassword = function(password) {
        return bcrypt.compareSync(password, this.password);
    };

    User.addHook("beforeCreate", user => {
        user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
    });

    User.associate = models => {
        User.hasMany(models.Foodzi, {
            onDelete: "cascade"
        });
    };

    return User;
};
