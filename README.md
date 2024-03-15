[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

# Command Line Employee Tracker

## Description

This is a content management system that can be run in command line. It allows business operators to keep track of their employees by role, and department.

I created this project to prove my knowledge of SQL and Node.js. Additionally it can serve as a great starting point for any future development projects.

It works by creating and accessing a database of employees, roles, and departments that are all interconnected. It then prompts the user as to what tasks they want to complete and runs all the backend code required to complete those tasks.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Tests](#tests)
- [Questions](#questions)

## Installation

To install and run this project you must download the code from Github, Node.js, and SQL. Then after opening the code folder, type in your console 'npm init -y' followed by 'npm install'. Now all the node modules are working. Now in your command line run 'mysql -u root -p' and enter your password. Within the sql command line run 'SOURCE db/schema.sql;' and 'quit'. If you want to prepopulate the database with sample variables you can also run 'SOURCE db/seeds.sql;' before 'quit', but that is not necessary. Finally run 'node index.js' and the application will start.

## Usage

Use this project by following the installation steps listed above and then answering the prompts given to you within the command line. You can view the database in different ways, add to it, change it, and delete things from it without ever leaving the command line.

Video Demonstrating Installation and Usage: https://drive.google.com/file/d/1jRfGBtx-pAYJlLZLPWoHK2_xNbDhdBaq/view?usp=sharing

Use Case Example: A small business owner may want to keep track of all the employees they have and which roles/departments they work in. This would allow them to do all of that and more from one place.

## License

This project is licensed under the terms of the MIT license. See the badge at the top of the README for more details.

## Contributing

Additional Contributors: None, this project was created entirely by Jesse Denier.

3rd Party Assets: CHATGPT was used to assist in writing the console.log sections of the print functions to create nice looking tables.

Tutorials: None

## Tests

No sample tests have currently been written for end users. Feel free to experiment.

## Questions

Feel free to reach out to me with any additional questions through the following methods:

Github Profile: https://www.github.com/JesseDenier

Email Address: jessecdenier@gmail.com
