// Deletes a department from the table of departments.
async function deleteDepartment(answers, db, reInit) {
  db.query(
    `DELETE FROM department WHERE name = ?;`,
    [answers.deleteDepartmentName],
    function (err) {
      if (err) {
        console.error(err);
        return;
      }
      console.log(
        `${answers.deleteDepartmentName} has been deleted as a department.`
      );
      reInit();
    }
  );
}

// Deletes a role from the table of roles.
async function deleteRole(answers, db, reInit) {
  db.query(
    `DELETE FROM role WHERE title = ?;`,
    [answers.deleteRoleTitle],
    function (err) {
      if (err) {
        console.error(err);
        return;
      }
      console.log(`${answers.deleteRoleTitle} has been deleted as a role.`);
      reInit();
    }
  );
}

// Deletes an employee from the table of employees.
async function deleteEmployee(answers, db, reInit) {
  db.query(
    `DELETE FROM employee WHERE CONCAT(first_name, " ", last_name) = ?;`,
    [answers.deleteEmployeeName],
    function (err) {
      if (err) {
        console.error(err);
        return;
      }
      console.log(
        `${answers.deleteEmployeeName} has been deleted as an employee.`
      );
      reInit();
    }
  );
}

module.exports = { deleteDepartment, deleteRole, deleteEmployee };
