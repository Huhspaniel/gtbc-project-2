module.exports = function(connection, Sequelize) {
    const Test = connection.define('Test', {
        name: Sequelize.STRING,
    })
    return Test;
}