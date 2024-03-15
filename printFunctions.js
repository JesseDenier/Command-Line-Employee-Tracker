// Prints all departments in a nicely formatted box.
async function printDepartments(db, reInit) {
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
    reInit();
  });
}

// Prints all roles in a nicely formatted box.
async function printRoles(db, reInit) {
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
      reInit();
    }
  );
}

async function printEmployees(db, reInit) {
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
      reInit();
    }
  );
}

module.exports = { printDepartments, printRoles, printEmployees };