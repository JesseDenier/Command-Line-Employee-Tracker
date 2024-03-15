// Adds a department to the list of departments.
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

module.exports = { deleteDepartment };
