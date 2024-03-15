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

// Connects to the database.
const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "gooddog1",
    database: "employee_tracker_db",
  },
  console.log(`Connected to the employee_tracker_db database.`)
);

// Requests to see all departments.
async function viewdepartments() {
  db.query("SELECT id, name FROM department", function (err, results) {
    console.log("\nID\tName\n---\t----------");
    for (let i = 0; i < results.length; i++) {
      console.log(results[i].id + "\t" + results[i].name);
    }
    console.log(" ");
    reinit();
  });
}

// Requests to see all roles.
async function viewroles() {
  db.query("SELECT id, title, salary FROM role", function (err, results) {
    console.table(results);
    reinit();
  });
}

// Selects a function based on answers to the prompt.
function pickaction(answers) {
  if (answers.action === "View all departments") {
    viewdepartments();
  } else if (answers.action === "View all roles") {
    viewroles();
  }
}

function reinit() {
  inquirer
    .prompt([
      {
        name: "reinit",
        message: "Is there more you would like to do?",
        type: "list",
        choices: ["Yes", "No"],
      },
    ])
    .then((answers) => {
      if (answers.reinit === "Yes") {
        init();
      } else {
        //TODO: Change this so it automatically exits for you.
        console.log("Okay press 'control + c' to exit.");
      }
    });
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
      pickaction(answers);
    });
}

init();
