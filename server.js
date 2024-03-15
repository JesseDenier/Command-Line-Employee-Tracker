//TODO: Write notation
const inquirer = require("inquirer");
const mysql = require("mysql2");
const express = require("express");

//TODO: Write notation
const PORT = process.env.PORT || 3001;
const app = express();

//TODO: Write notation
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connects to the database
const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "gooddog1",
    database: "employee_tracker_db",
  },
  console.log(`Connected to the employee_tracker_db database.`)
);

function viewDepartments(answers) {
  if (answers.action === "View all departments") {
    // Requests to see all departments.
    db.query("SELECT * FROM department", function (err, results) {
      console.log(results);
    });
  }
}

// Asks the user for choices regarding logo creation and then runs all logo creation functions.
function init() {
  inquirer
    .prompt([
      {
        name: "action",
        message: "What would you like to do?",
        type: "list",
        choices: [
          "View all departments",
          "View all roles",
          "View all employees",
          "Add a department",
          "Add a role",
          "Add an employee",
          "Update an employee role",
        ],
      },
    ])
    .then((answers) => {
      viewDepartments(answers);
    });
}

init();
