// Imports node modules.
const inquirer = require("inquirer");
const mysql = require("mysql2");
const express = require("express");

// Imports functions from other javascript files.
const {
  printDepartments,
  printRoles,
  printEmployees,
} = require("./assets/js/printFunctions");

const { addDepartment } = require("./assets/js/addFunctions");

const { deleteDepartment } = require("./assets/js/deleteFunctions");

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

// Selects a function based on answers to the prompt.
async function pickaction(answers) {
  if (answers.action === "View all departments") {
    printDepartments(db, reInit);
  } else if (answers.action === "View all roles") {
    printRoles(db, reInit);
  } else if (answers.action === "View all employees") {
    printEmployees(db, reInit);
  } else if (answers.action === "Add a department") {
    addDepartment(answers, db, reInit);
  } else if (answers.action === "Delete a department") {
    deleteDepartment(answers, db, reInit);
  }
}

// Checks if the user is done or has more tasks to complete.
function reInit() {
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
        console.log("Press 'control + c' to exit.");
      }
    });
}

// On application load asks the user what task they need to complete.
async function init() {
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
          "Delete a department",
        ],
      },
      {
        name: "addDepartmentName",
        message: "What is the name of the new department?",
        type: "maxLength",
        maxLength: 15,
        when: (answers) => answers.action === "Add a department",
      },
      {
        name: "deleteDepartmentName",
        message: "What department would you like to delete?",
        type: "maxLength",
        maxLength: 15,
        when: (answers) => answers.action === "Delete a department",
      },
    ])
    .then((answers) => {
      pickaction(answers);
    });
}

init();
//TODO: Add notation.
//TODO: Stop blocking this out but keep it from messing up init.
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
