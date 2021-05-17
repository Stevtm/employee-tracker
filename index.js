const inquirer = require("inquirer");

// import prompt data and mysql2 queries
const {
	actions,
	addDepartmentQuestions,
	addEmployeeQuestions,
	addRoleQuestions,
	updateRoleQuestions,
} = require("./utils/prompt-data");
const {
	viewEmployees,
	viewRoles,
	viewDepartments,
	getDepartments,
	getRoles,
	getEmployees,
	createDepartment,
	createRole,
	createEmployee,
	updateEmployee,
} = require("./utils/queries");

// prompt that asks the user which action they would like to take
const promptActions = () => {
	return inquirer.prompt(actions).then((data) => {
		switch (data.action) {
			case "View All Departments":
				viewDepartments().then(promptActions);
				break;
			case "View All Roles":
				viewRoles().then(promptActions);
				break;
			case "View All Employees":
				viewEmployees().then(promptActions);
				break;
			case "Add a Department":
				getDepartments().then((dbData) => {
					promptAddDepartment(dbData);
				});
				break;
			case "Add a Role":
				getRoles().then((dbData) => {
					promptAddRole(dbData);
				});
				break;
			case "Add an Employee":
				getEmployees().then((dbData) => {
					promptAddEmployee(dbData);
				});
				break;
			case "Update an Employee's Role":
				getEmployees().then((dbData) => {
					promptUpdateEmployee(dbData);
				});
				break;
		}
	});
};

// prompts for adding a new department
const promptAddDepartment = (departmentsArray) => {
	return inquirer
		.prompt(addDepartmentQuestions(departmentsArray))
		.then((data) => {
			createDepartment(data);
		})
		.then(() => {
			console.log("New Department added to database successfully!");
			promptActions();
		});
};

// prompts for new role data
const promptAddRole = (rolesArray) => {
	return inquirer
		.prompt(addRoleQuestions(rolesArray))
		.then((data) => createRole(data))
		.then(() => {
			console.log("New Role added to database successfully!");
			promptActions();
		});
};

// prompts for new emmployee data
const promptAddEmployee = (dbData) => {
	return inquirer
		.prompt(addEmployeeQuestions(dbData))
		.then((data) => {
			createEmployee(data);
		})
		.then(() => {
			console.log("New Employee added to the database successfully!");
			promptActions();
		});
};

// prompt to update an employee's role
const promptUpdateEmployee = (dbData) => {
	return inquirer
		.prompt(updateRoleQuestions(dbData))
		.then((data) => {
			updateEmployee(data);
		})
		.then(() => {
			console.log("Employee Role successfully updated.");
			promptActions();
		});
};

promptActions();
