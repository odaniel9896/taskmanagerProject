require("dotenv").config()
module.exports = {
    host: "localhost",
    username: "root",
    password: "9896123",
    database: process.env.NODE_ENV === "test" ? "db_task_manager_project_test" : "db_task_manager_project",
    dialect: "mysql",
    define: {
      timestamp: true,     
    },
  };