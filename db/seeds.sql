INSERT INTO department (name)
VALUES ("Imports"),
       ("Exports"),
       ("Marketing"),
       ("Human Resources");

INSERT INTO role (title, salary, department_id)
VALUES ("Sourcing Lead", 12000, 1),
       ("Sourcing Assistant", 60000, 1),
       ("Sales Lead", 120000, 2),
       ("Sales Assistant", 60000, 2),
       ("Creative Director", 300000, 3),
       ("Intern", 24000, 3),
       ("Receptionist", 48000, 4),
       ("Lawyer", 300000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Mark", "Bringintum", 1, NULL),
       ("Mary", "Broughtalot", 1, NULL),
       ("Allen", "Bringer", 2, 1),
       ("Alexandra", "Buyers", 2, 2),
       ("Jimmy", "Salesman", 3, NULL),
       ("Julie", "Salesgal", 3, NULL),
       ("Tommy",  "Sellington", 4, 5),
       ("Trixie", "Sellsalil", 4, 6),
       ("Steve", "Addams", 5, NULL),
       ("Samantha", "Commers", 5, NULL),
       ("Bob", "Coolage", 6, 9),
       ("Belinda", "Poorman", 6, 10),
       ("Fred", "Smiles", 7, NULL),
       ("Flower", "Face", 7, NULL),
       ("Larry", "Lawson", 8, 13),
       ("Lucille", "Gavel", 8, 14);