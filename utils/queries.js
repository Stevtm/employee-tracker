const db = require("../db/connection");
const cTable = require("console.table");

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

module.exports = { viewDepartments, viewEmployees };
