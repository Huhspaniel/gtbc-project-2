const bcrypt = require('bcrypt');

module.exports = function (connection, Sequelize) {
    const user = connection.define('user', {
        username: {
            allowNull: false,
            type: Sequelize.STRING,
            validate: {
                is: /^[a-z0-9_-]+$/i,
            },
            unique: {
                args: true,
                msg: 'Username already in use'
            }
        },
        email: {
            allowNull: false,
            type: Sequelize.STRING,
            validate: {
                isEmail: true
            },
            unique: {
                args: true,
                msg: 'Email already in use'
            }
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                len: [8],
                is: /(?=.*[a-z])(?=.*[0-9]).*/i
            }
        },
        firstname: {
            type: Sequelize.STRING,
            validate: {
                is: /^[a-z'-]+$/i
            }
        },
        lastname: {
            type: Sequelize.STRING,
            validate: {
                is: /^[a-z'-]+$/i
            }
        }
    }, {
        underscored: true,
        underscoredAll: true,
        hooks: {
            afterValidate: user => {
                if (user.password) {
                    return bcrypt.hash(user.username + user.password, 10)
                        .then(hash => {
                            user.password = hash;
                        })
                        .catch(err => console.log(err));
                }
            }
        }
    });

    return user;
}