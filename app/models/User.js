module.exports = function(connection, Sequelize) {
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
            allowNull: false
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
    }, { underscored: true, underscoredAll: true })
    return user;
}