// Updates an employee's role in the employee table.
async function updateEmployeeRole(answers, db, reInit) {
  db.query(
    `UPDATE employee SET role_id = ? WHERE concat(first_name, " ", last_name) = ?;`,
    [
      answers.updateEmployeeRoleRoleTitle,
      answers.updateEmployeeRoleEmployeeName,
    ],
    function (err) {
      if (err) {
        console.error(err);
        return;
      }
      console.log(
        `${answers.updateEmployeeRoleEmployeeName} role been updated.`
      );
      reInit();
    }
  );
}

module.exports = { updateEmployeeRole };
