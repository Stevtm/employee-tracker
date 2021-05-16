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
	// get roles
	const sql1 = `SELECT role.title FROM role`;
	let result = {};

	await db
		.promise()
		.query(sql1)
		.then(([rows, fields]) => {
			result[1] = rows;
		})
		.catch(console.log);

	// get departments
	const sql2 = `SELECT department.name FROM department`;

	await db
		.promise()
		.query(sql2)
		.then(([rows, fields]) => {
			result[2] = rows.map((row) => {
				return row.name;
			});
		})
		.catch(console.log);

	return result;
}

module.exports = {
	viewDepartments,
	viewRoles,
	viewEmployees,
	getDepartments,
	getRoles,
};
