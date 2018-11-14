module.exports = {
    development: {
        username: "root",
        password: process.env.DB_PASS,
        database: "concert_chat_app",
        host: "127.0.0.1",
        port: 3306,
        dialect: "mysql"
    },
    test: {
        username: "root",
        password: process.env.DB_PASS,
        database: "concert_chat_app_test",
        host: "127.0.0.1",
        dialect: "mysql"
    },
    production: {
        use_env_variable: "JAWSDB_URL"
    }
}
