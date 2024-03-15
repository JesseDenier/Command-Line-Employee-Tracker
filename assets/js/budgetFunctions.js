// Prints the budget of the chosen department in a nice table.
async function printDepartmentBudget(answers, db, reInit) {
  db.query(
    `SELECT department.name, SUM(role.salary) AS budget FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id WHERE department.name = ? GROUP BY department.name;`,
    [answers.viewDepartmentBudgetDepartmentName],
    function (err, results) {
      if (err) {
        console.error(err);
        return;
      } else console.log("+-----------------+---------+");
      console.log("| Department      | Budget  |");
      console.log("+-----------------+---------+");
      results.forEach((row) => {
        const { name, budget } = row;
        console.log(
          `| ${name.padEnd(15)} | ${budget.toString().padStart(7)} |`
        );
      });
      console.log("+-----------------+---------+");

      reInit();
    }
  );
}

module.exports = { printDepartmentBudget };
