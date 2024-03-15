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

// Prints all departments in a nicely formatted box.
async function printDepartments() {
  db.query("SELECT id, name FROM department", function (err, results) {
    if (err) {
      console.error(err);
      return;
    }
    console.log("+----+--------------------+");
    console.log("| id | name               |");
    console.log("+----+--------------------+");
    results.forEach((row) => {
      const { id, name } = row;
      console.log(`| ${id.toString().padStart(2)} | ${name.padEnd(18)} |`);
    });
    console.log("+----+--------------------+");
    reinit();
  });
}

// Prints all roles in a nicely formatted box.
async function printRoles() {
  db.query(
    "SELECT role.id, role.title, role.salary, department.name AS department FROM role JOIN department ON role.department_id = department.id",
    function (err, results) {
      if (err) {
        console.error(err);
        return;
      }
      console.log("+----+--------------------+--------+-----------------+");
      console.log("| id | title              | salary | department      |");
      console.log("+----+--------------------+--------+-----------------+");
      results.forEach((row) => {
        const { id, title, salary, department } = row;
        console.log(
          `| ${id.toString().padStart(2)} | ${title.padEnd(18)} | ${salary
            .toString()
            .padStart(6)} | ${department.toString().padStart(15)} |`
        );
      });
      console.log("+----+--------------------+--------+-----------------+");
      reinit();
    }
  );
}

async function printEmployees() {
  db.query(
    "SELECT employee.id, CONCAT(employee.first_name, ' ', employee.last_name) as name, CONCAT(manager.first_name, ' ', manager.last_name) AS manager, role.title AS title, role.salary AS salary, department.name AS department FROM employee LEFT JOIN employee AS manager ON employee.manager_id = manager.id JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id",
    function (err, results) {
      if (err) {
        console.error(err);
        return;
      }

      // Find maximum lengths for each column
      const maxLengths = {
        id: 0,
        name: 0,
        manager: 0,
        title: 0,
        salary: 0,
        department: 0,
      };
      results.forEach((row) => {
        Object.keys(row).forEach((key) => {
          maxLengths[key] = Math.max(maxLengths[key], String(row[key]).length);
        });
      });

      // Console log header
      console.log(
        "+" +
          "-".repeat(maxLengths.id + 2) +
          "+" +
          "-".repeat(maxLengths.name + 2) +
          "+" +
          "-".repeat(maxLengths.manager + 2) +
          "+" +
          "-".repeat(maxLengths.title + 2) +
          "+" +
          "-".repeat(maxLengths.salary + 2) +
          "+" +
          "-".repeat(maxLengths.department + 2) +
          "+"
      );
      console.log(
        `| id | name${" ".repeat(maxLengths.name - 4)} | manager${" ".repeat(
          maxLengths.manager - 7
        )} | title${" ".repeat(maxLengths.title - 5)} | salary${" ".repeat(
          maxLengths.salary - 6
        )} | department${" ".repeat(maxLengths.department - 10)} |`
      );
      console.log(
        "+" +
          "-".repeat(maxLengths.id + 2) +
          "+" +
          "-".repeat(maxLengths.name + 2) +
          "+" +
          "-".repeat(maxLengths.manager + 2) +
          "+" +
          "-".repeat(maxLengths.title + 2) +
          "+" +
          "-".repeat(maxLengths.salary + 2) +
          "+" +
          "-".repeat(maxLengths.department + 2) +
          "+"
      );

      // Console log rows
      results.forEach((row) => {
        const { id, name, manager, title, salary, department } = row;
        console.log(
          `| ${id.toString().padStart(2)} | ${name.padEnd(maxLengths.name)} | ${
            manager
              ? manager.padEnd(maxLengths.manager)
              : " ".padEnd(maxLengths.manager)
          } | ${title.padEnd(maxLengths.title)} | ${salary
            .toString()
            .padStart(maxLengths.salary)} | ${department.padEnd(
            maxLengths.department
          )} |`
        );
      });

      // Console log footer
      console.log(
        "+" +
          "-".repeat(maxLengths.id + 2) +
          "+" +
          "-".repeat(maxLengths.name + 2) +
          "+" +
          "-".repeat(maxLengths.manager + 2) +
          "+" +
          "-".repeat(maxLengths.title + 2) +
          "+" +
          "-".repeat(maxLengths.salary + 2) +
          "+" +
          "-".repeat(maxLengths.department + 2) +
          "+"
      );

      reinit();
    }
  );
}

// Selects a function based on answers to the prompt.
function pickaction(answers) {
  if (answers.action === "View all departments") {
    printDepartments();
  } else if (answers.action === "View all roles") {
    printRoles();
  } else if (answers.action === "View all employees") {
    printEmployees();
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
        console.log("Press 'control + c' to exit.");
      }
    });
}

// Asks the user for choices regarding logo creation and then runs all logo creation functions.
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
        ],
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
