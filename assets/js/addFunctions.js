// Adds a department to the table of departments.
async function addDepartment(answers, db, reInit) {
  db.query(
    `INSERT INTO department (name) VALUES (?);`,
    [answers.addDepartmentName],
    function (err) {
      if (err) {
        console.error(err);
        return;
      }
      console.log(
        `${answers.addDepartmentName} has been added as a new department.`
      );
      reInit();
    }
  );
}

// Adds a role to the table of roles.
async function addRole(answers, db, reInit) {
  db.query(
    `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?);`,
    [answers.addRoleTitle, answers.addRoleSalary, answers.addRoleDepartment],
    function (err) {
      if (err) {
        console.error(err);
        return;
      }
      console.log(`${answers.addRoleTitle} has been added as a new role.`);
      reInit();
    }
  );
}

// Adds an employee to the table of employees.
async function addEmployee(answers, db, reInit) {
  db.query(
    `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?);`,
    [
      answers.addEmployeeFirstName,
      answers.addEmployeeLastName,
      answers.addEmployeeRole,
      answers.addEmployeeManager,
    ],
    function (err) {
      if (err) {
        console.error(err);
        return;
      }
      console.log(
        `${answers.addEmployeeFirstName} ${answers.addEmployeeLastName} has been added as a new employee.`
      );
      reInit();
    }
  );
}

module.exports = { addDepartment, addRole, addEmployee };
