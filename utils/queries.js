const db = require("../db/connection");
const cTable = require("console.table");

// --- queries for displaying table data ---
// query to view all departments
async function viewDepartments() {
	const sql = `SELECT * FROM department`;

	await db
		.promise()
		.query(sql)
		.then(([rows, fields]) => {
			console.table(rows);
		})
		.catch(console.log);
}

// query to view all roles
async function viewRoles() {
	const sql = `SELECT
                    role.title, 
                    role.id, 
                    department.name AS department, 
                    role.salary
                FROM role
                LEFT JOIN department
                ON role.department_id = department.id`;

	await db
		.promise()
		.query(sql)
		.then(([rows, fields]) => {
			console.table(rows);
		})
		.catch(console.log);
}

// query to view all employees
async function viewEmployees() {
	const sql = `SELECT 
                    emp.id, 
                    emp.first_name, 
                    emp.last_name, 
                    role.title AS title, 
                    role.department_id AS department,
                    role.salary AS salary,
                    CONCAT(manager.first_name, ' ', manager.last_name) AS manager
                FROM employee emp
                LEFT JOIN role
                ON emp.role_id = role.id
                LEFT OUTER JOIN employee manager
                ON emp.manager_id = manager.id`;

	await db
		.promise()
		.query(sql)
		.then(([rows, fields]) => {
			console.table(rows);
		})
		.catch(console.log);
}

// --- queries for fetching db data ---
// query to return department names
async function getDepartments() {
	const sql = `SELECT department.name FROM department`;
	let result;

	await db
		.promise()
		.query(sql)
		.then(([rows, fields]) => {
			result = rows;
		})
		.catch(console.log);

	return result;
}

// query to return role titles and an array of departments
async function getRoles() {
	let dbData = {};

	// get roles
	const sql1 = `SELECT role.title FROM role`;

	await db
		.promise()
		.query(sql1)
		.then(([rows, fields]) => {
			dbData["roles"] = rows;
		})
		.catch(console.log);

	// get departments
	const sql2 = `SELECT department.name FROM department`;

	await db
		.promise()
		.query(sql2)
		.then(([rows, fields]) => {
			dbData["departments"] = rows.map((row) => {
				return row.name;
			});
		})
		.catch(console.log);

	return dbData;
}

// query to return array of role titles and array of employee names
async function getEmployees() {
	let dbData = {};

	// get roles
	const sql1 = `SELECT role.title FROM role`;

	await db
		.promise()
		.query(sql1)
		.then(([rows, fields]) => {
			dbData["roles"] = rows.map((row) => {
				return row.title;
			});
		})
		.catch(console.log);

	// get employees
	const sql2 = `SELECT 
                    employee.first_name, 
                    employee.last_name
                FROM employee`;

	await db
		.promise()
		.query(sql2)
		.then(([rows, fields]) => {
			dbData["employees"] = rows.map((row) => {
				return `${row.first_name} ${row.last_name}`;
			});
		})
		.catch(console.log);

	return dbData;
}

// --- queries to add new db rows ---
// query to add a new department
async function createDepartment(newDepartment) {
	const sql = `INSERT INTO department (name) VALUES (?)`;
	const params = [newDepartment.departmentName];

	await db.promise().query(sql, params);
}

// query to add a new role
async function createRole(newRole) {
	const {
		roleTitle: title,
		roleSalary: salary,
		roleDepartment: department,
	} = newRole;

	// find the id of the department that the role belongs to
	let departmentID;
	const sql1 = `SELECT * FROM department`;

	await db
		.promise()
		.query(sql1)
		.then(([rows, fields]) => {
			rows.forEach((row) => {
				if (row.name === department) {
					departmentID = row.id;
				}
			});
		});

	// add the new role to the database
	const sql2 = `INSERT INTO role (title, salary, department_id)
                VALUES (?, ?, ?)`;
	const params = [title, salary, departmentID];

	await db.promise().query(sql2, params);
}

// query to add a new employee
async function createEmployee(newEmployee) {
	const {
		employeeFirstName: first,
		employeeLastName: last,
		employeeRole: role,
		employeeManager: manager_full,
	} = newEmployee;

	// find the id of the role that the employee belongs to
	let roleID;
	const sql1 = `SELECT role.id, role.title FROM role`;

	await db
		.promise()
		.query(sql1)
		.then(([rows, fields]) => {
			rows.forEach((row) => {
				if (row.title === role) {
					roleID = row.id;
				}
			});
		});

	// find the id of the manager that the employee reports to
	let managerID;
	const manager = manager_full.split(" ");

	const sql2 = `SELECT employee.id, employee.first_name, employee.last_name
                    FROM employee`;

	await db
		.promise()
		.query(sql2)
		.then(([rows, fields]) => {
			rows.forEach((row) => {
				if (row.first_name == manager[0] && row.last_name == manager[1]) {
					managerID = row.id;
				}
			});
		});

	// add the new employee to the database
	const sql3 = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
    VALUES (?, ?, ?, ?)`;
	const params = [first, last, roleID, managerID];

	await db.promise().query(sql3, params);
}

// query to update employee role
async function updateEmployee(newData) {
	const { employeeToUpdateRole: employee_full, updatedRole: role } = newData;
	const employee = employee_full.split(" ");

	// get the ID of the employee being updated
	let employeeID;
	const sql1 = `SELECT employee.id, employee.first_name, employee.last_name
                    FROM employee`;

	await db
		.promise()
		.query(sql1)
		.then(([rows, fields]) => {
			rows.forEach((row) => {
				if (row.first_name == employee[0] && row.last_name == employee[1]) {
					employeeID = row.id;
				}
			});
		});

	// get the ID of the new role
	let roleID;
	const sql2 = `SELECT role.id, role.title FROM role`;

	await db
		.promise()
		.query(sql2)
		.then(([rows, fields]) => {
			rows.forEach((row) => {
				if (row.title === role) {
					roleID = row.id;
				}
			});
		});

	// update the role of the employee
	const sql3 = `UPDATE employee SET role_id = ? WHERE id = ?`;
	const params = [roleID, employeeID];

	await db.promise().query(sql3, params);
}

module.exports = {
	viewDepartments,
	viewRoles,
	viewEmployees,
	getDepartments,
	getRoles,
	getEmployees,
	createDepartment,
	createRole,
	createEmployee,
	updateEmployee,
};
