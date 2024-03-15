// Adds a department to the list of departments.
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

module.exports = { addDepartment };
