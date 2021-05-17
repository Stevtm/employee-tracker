# Employee Tracker

The purpose of this application is to track employee, role, and department information in a SQL database. The user is able to view and add information to the database through command-line prompts.

The application is built using the following tools & packages:

- MySQL
- Inquirer.js
- MySQL2
- console.table

## Application Functionality

The application is able to perform the following functions:

- Display department table data, including:
  - Names
  - IDs
- Display role table data, including:
  - Job Titles
  - Department Each Role Belongs To
  - Salary
- Display employee table data, including:
  - First and Last Names
  - Job Titles
  - Departments
  - Salaries
  - Managers
- Add a New Department
- Add a New Role
- Add a New Employee
- Modify the Role of an Existing Employee

## Video Demonstration

The following video shows a demonstration of the application being used!

https://youtu.be/24rwPSszDBE

## Installation

To use this application, you will need to have Node.js and MySQL installed and configured.

To install the application:

1. Fork the repository
2. Execute `npm install` in the command line
3. Create `.env` and populate it with the following process variables.   
   i. `HOST = localhost`   
   ii. `MYSQL_USER =` Your MySQL Username  
   iii. `MYSQL_PASS =` Your MySQL Password  
   iv. `MYSQL_BD = employee_tracker`  
4. In the MySQL shell, execute the following commands. This will set up the database.   
   i. `SOURCE db/db.sql;`      
   ii. `SOURCE db/schema.sql;`               
   iii. (Optional) `SOURCE db/seeds.sql;`       
  
## Usage

To use this application:

1. Execute `node index.js`
2. Select the desired with the return key
3. Continue to perform actions as desired
4. Quit the application

## References

- MySQL: https://www.mysql.com/
- Inquirer.js: https://www.npmjs.com/package/inquirer
- MySQL2: https://www.npmjs.com/package/mysql2
- console.table: https://www.npmjs.com/package/console.table
