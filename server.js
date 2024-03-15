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

const { addDepartment, addRole } = require("./assets/js/addFunctions");

const { deleteDepartment, deleteRole } = require("./assets/js/deleteFunctions");

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
  } else if (answers.action === "Add a role") {
    addRole(answers, db, reInit);
  } else if (answers.action === "Delete a department") {
    deleteDepartment(answers, db, reInit);
  } else if (answers.action === "Delete a role") {
    deleteRole(answers, db, reInit);
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
  // Gets db names for list style questions that require them.
  db.query(`SELECT name FROM department;`, (err, result) => {
    const departmentNames = result.map((department) => department.name);
    db.query(`SELECT title FROM role;`, (err, result) => {
      const roleTitles = result.map((role) => role.title);

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
              "Delete a role",
            ],
          },
          {
            name: "addDepartmentName",
            message: "What is the name of the new department?",
            type: "input",
            when: (answers) => answers.action === "Add a department",
          },
          {
            name: "addRoleTitle",
            message: "What is the title of the new role?",
            type: "input",
            when: (answers) => answers.action === "Add a role",
          },
          {
            name: "addRoleSalary",
            message: "What is the salary of the new role?",
            type: "input",
            when: (answers) => answers.action === "Add a role",
          },
          //TODO: This breaks because department.name is not an INT. Need to figure out how to reverse engineer this back to a department.id.
          {
            name: "addRoleDepartment",
            message: "What department is the new role in?",
            type: "list",
            choices: departmentNames,
            when: (answers) => answers.action === "Add a role",
          },
          {
            name: "deleteDepartmentName",
            message: "Which department would you like to delete?",
            type: "list",
            choices: departmentNames,
            when: (answers) => answers.action === "Delete a department",
          },
          {
            name: "deleteRoleTitle",
            message: "Which role would you like to delete?",
            type: "list",
            choices: roleTitles,
            when: (answers) => answers.action === "Delete a role",
          },
        ])
        .then((answers) => {
          pickaction(answers);
        });
    });
  });
}

init();

//TODO: Add notation.
//TODO: Stop blocking this out but keep it from messing up init.
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
