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
  // Retrieve the department id corresponding to the given department name
  db.query(
    `SELECT id FROM department WHERE name = ?;`,
    [answers.addRoleDepartment],
    function (err, results) {
      if (err) {
        console.error(err);
        return;
      }
      if (results.length === 0) {
        console.error("Department not found.");
        return;
      }
      const departmentId = results[0].id;

      // Insert the role with the correct department_id
      db.query(
        `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?);`,
        [answers.addRoleTitle, answers.addRoleSalary, departmentId],
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
  );
}

// Adds an employee to the table of employees.
async function addEmployee(answers, db, reInit) {
  // Retrieve the department id corresponding to the given department name
  db.query(
    `SELECT id FROM role WHERE title = ?;`,
    [answers.addEmployeeRole],
    function (err, results) {
      if (err) {
        console.error(err);
        return;
      }
      if (results.length === 0) {
        console.error("Role not found.");
        return;
      }
      const roleId = results[0].id;

      let managerId = null; // Initialize managerId as null

      if (answers.addEmployeeManager !== "None") {
        db.query(
          `SELECT id FROM employee WHERE CONCAT(first_name, " ", last_name) = ?;`,
          [answers.addEmployeeManager],
          function (err, results) {
            if (err) {
              console.error(err);
              return;
            }
            if (results.length === 0) {
              console.error("Manager not found.");
              return;
            }
            managerId = results[0].id;
            insertEmployee(); // Proceed to insert the employee once managerId is determined
          }
        );
      } else {
        insertEmployee(); // If manager is "None", directly proceed to insert the employee
      }

      function insertEmployee() {
        db.query(
          `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?);`,
          [
            answers.addEmployeeFirstName,
            answers.addEmployeeLastName,
            roleId,
            managerId,
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
    }
  );
}

module.exports = { addDepartment, addRole, addEmployee };
