-- Creates a brand new database
DROP DATABASE IF EXISTS employee_tracker_db;
CREATE DATABASE employee_tracker_db;

-- Focuses future commands to work within the new database.
USE employee_tracker_db;

-- Creates 3 tables with connections throughout.
CREATE TABLE department (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(30)
);
CREATE TABLE role (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30),
  salary DECIMAL,
  department_id INT,
  FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE SET NULL
);
CREATE TABLE employee (
  id INT AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  role_id INT,
  manager_id INT,
  FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE SET NULL,
  FOREIGN KEY (manager_id) REFERENCES employee(id) ON DELETE SET NULL
);