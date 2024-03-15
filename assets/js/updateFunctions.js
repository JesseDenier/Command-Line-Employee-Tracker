// Updates an employee's role in the employee table.
async function updateEmployeeRole(answers, db, reInit) {
  db.query(
    `SELECT id FROM role WHERE title = ?;`,
    [answers.updateEmployeeRoleRoleTitle],
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
      db.query(
        `UPDATE employee SET role_id = ? WHERE concat(first_name, " ", last_name) = ?;`,
        [roleId, answers.updateEmployeeRoleEmployeeName],
        function (err) {
          if (err) {
            console.error(err);
            return;
          }
          console.log(
            `${answers.updateEmployeeRoleEmployeeName}'s role been updated.`
          );
          reInit();
        }
      );
    }
  );
}

// Updates an employee's manager in the employee table (If no manager is seleted sets the value to null).
async function updateEmployeeManager(answers, db, reInit) {
  let managerId = null; // Initialize managerId as null
  if (answers.updateEmployeeManagerManagerName !== "None") {
    db.query(
      `SELECT id FROM employee WHERE CONCAT(first_name, " ", last_name) = ?;`,
      [answers.updateEmployeeManagerManagerName],
      function (err, results) {
        if (err) {
          console.error(err);
          return;
        }
        if (results.length === 0) {
          console.error("Role not found.");
          return;
        }
        managerId = results[0].id;
        updateEmployee();
      }
    );
  } else {
    updateEmployee();
  }
  function updateEmployee() {
    db.query(
      `UPDATE employee SET manager_id = ? WHERE concat(first_name, " ", last_name) = ?;`,
      [managerId, answers.updateEmployeeManagerEmployeeName],
      function (err) {
        if (err) {
          console.error(err);
          return;
        }
        console.log(
          `${answers.updateEmployeeManagerEmployeeName}'s manager been updated.`
        );
        reInit();
      }
    );
  }
}

module.exports = { updateEmployeeRole, updateEmployeeManager };
