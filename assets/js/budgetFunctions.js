// Prints the budgets of all department.
async function printDepartmentBudget(answers, db, reInit) {
  db.query(
    `SELECT department.name, SUM(role.salary) AS budget FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id WHERE department.name = ? GROUP BY department.name;`,
    [answers.viewDepartmentBudgetDepartmentName],
    function (err, results) {
      if (err) {
        console.error(err);
        return;
      } else console.log(results);
      reInit();
    }
  );
}

module.exports = { printDepartmentBudget };
