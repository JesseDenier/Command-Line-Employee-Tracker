// Imports node modules.
const inquirer = require("inquirer");
const mysql = require("mysql2");
const express = require("express");

// Imports functions from other javascript files.
const {
  printDepartments,
  printRoles,
  printEmployees,
  printEmployeesbyManager,
  printEmployeesbyDepartment,
} = require("./assets/js/printFunctions");
const {
  addDepartment,
  addRole,
  addEmployee,
} = require("./assets/js/addFunctions");
const {
  deleteDepartment,
  deleteRole,
  deleteEmployee,
} = require("./assets/js/deleteFunctions");
const {
  updateEmployeeRole,
  updateEmployeeManager,
} = require("./assets/js/updateFunctions");
const { printDepartmentBudget } = require("./assets/js/budgetFunctions");

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
async function pickaction(answers, departmentNames, roleTitles, employeeNames) {
  if (answers.action === "View all departments") {
    printDepartments(db, reInit);
  } else if (answers.action === "View all roles") {
    printRoles(db, reInit);
  } else if (answers.action === "View all employees") {
    printEmployees(db, reInit);
  } else if (answers.action === "View employees by manager") {
    printEmployeesbyManager(answers, db, reInit);
  } else if (answers.action === "View employees by department") {
    printEmployeesbyDepartment(answers, db, reInit);
  } else if (answers.action === "View department budget") {
    printDepartmentBudget(answers, db, reInit);
  } else if (answers.action === "Add a department") {
    addDepartment(answers, db, reInit);
  } else if (answers.action === "Add a role") {
    addRole(answers, db, reInit);
  } else if (answers.action === "Add an employee") {
    addEmployee(answers, db, reInit);
  } else if (answers.action === "Update an employee role") {
    updateEmployeeRole(answers, db, reInit);
  } else if (answers.action === "Update an employee manager") {
    updateEmployeeManager(answers, db, reInit);
  } else if (answers.action === "Delete a department") {
    deleteDepartment(answers, db, reInit);
  } else if (answers.action === "Delete a role") {
    deleteRole(answers, db, reInit);
  } else if (answers.action === "Delete an employee") {
    deleteEmployee(answers, db, reInit);
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

      db.query(
        `SELECT CONCAT(first_name, " ", last_name) AS full_name FROM employee;`,
        (err, result) => {
          const employeeNames = result.map((employee) => employee.full_name);

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
                  "View employees by manager",
                  "View employees by department",
                  "View department budget",
                  "Add a department",
                  "Add a role",
                  "Add an employee",
                  "Update an employee role",
                  "Update an employee manager",
                  "Delete a department",
                  "Delete a role",
                  "Delete an employee",
                ],
              },
              {
                name: "viewEmployeesManagerName",
                message:
                  "Which manager would you like to see the employees of?",
                type: "list",
                choices: employeeNames,
                when: (answers) =>
                  answers.action === "View employees by manager",
              },
              {
                name: "viewEmployeesDepartmentName",
                message:
                  "Which department would you like to see the employees of?",
                type: "list",
                choices: departmentNames,
                when: (answers) =>
                  answers.action === "View employees by department",
              },
              {
                name: "viewDepartmentBudgetDepartmentName",
                message:
                  "Which department would you like to see the total budget of?",
                type: "list",
                choices: departmentNames,
                when: (answers) => answers.action === "View department budget",
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
              {
                name: "addRoleDepartment",
                message: "What department is the new role in?",
                type: "list",
                choices: departmentNames,
                when: (answers) => answers.action === "Add a role",
              },
              {
                name: "addEmployeeFirstName",
                message: "What is the employee's first name?",
                type: "maxLength",
                maxLength: 30,
                when: (answers) => answers.action === "Add an employee",
              },
              {
                name: "addEmployeeLastName",
                message: "What is the employee's last name?",
                type: "maxLength",
                maxLength: 30,
                when: (answers) => answers.action === "Add an employee",
              },
              {
                name: "addEmployeeRole",
                message: "What is the employee's role?",
                type: "list",
                choices: roleTitles,
                when: (answers) => answers.action === "Add an employee",
              },
              {
                name: "addEmployeeManager",
                message: "Who is the employee's manager?",
                type: "list",
                choices: ["None"].concat(employeeNames),
                when: (answers) => answers.action === "Add an employee",
              },
              {
                name: "updateEmployeeRoleEmployeeName",
                message: "Which employee would you like to update?",
                type: "list",
                choices: employeeNames,
                when: (answers) => answers.action === "Update an employee role",
              },
              {
                name: "updateEmployeeRoleRoleTitle",
                message: "What role have they been moved to?",
                type: "list",
                choices: roleTitles,
                when: (answers) => answers.action === "Update an employee role",
              },
              {
                name: "updateEmployeeManagerEmployeeName",
                message: "Which employee would you like to update?",
                type: "list",
                choices: employeeNames,
                when: (answers) =>
                  answers.action === "Update an employee manager",
              },
              {
                name: "updateEmployeeManagerManagerName",
                message: "Which manager will be overseeing them?",
                type: "list",
                choices: ["None"].concat(employeeNames),
                when: (answers) =>
                  answers.action === "Update an employee manager",
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
              {
                name: "deleteEmployeeName",
                message: "Which employee would you like to delete?",
                type: "list",
                choices: employeeNames,
                when: (answers) => answers.action === "Delete an employee",
              },
            ])
            .then((answers) => {
              pickaction(answers, departmentNames, roleTitles, employeeNames);
            });
        }
      );
    });
  });
}

init();

//TODO: Add notation.
//TODO: Stop blocking this out but keep it from messing up init.
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
