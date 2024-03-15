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

module.exports = { addDepartment, addRole };
