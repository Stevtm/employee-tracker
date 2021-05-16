const inquirer = require("inquirer");

// import prompt data and mysql2 queries
const {
	actions,
	addDepartmentQuestions,
	addEmployeeQuestions,
	addRoleQuestions,
} = require("./utils/prompt-data");
const {
	viewEmployees,
	viewRoles,
	viewDepartments,
	getDepartments,
	getRoles,
} = require("./utils/queries");

// prompt that asks the user which action they would like to take
const promptActions = () => {
	return inquirer.prompt(actions).then((data) => {
		switch (data.action) {
			case "View All Departments":
				viewDepartments().then(promptActions);
				break;
			case "View All Roles":
				console.log("In View All Roles");
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
				console.log("In Add an Employee");
				promptAddEmployee();
				break;
			case "Update an Employee's Role":
				console.log("In Update an Employee's Role");
				break;
		}
	});
};

// prompts for adding a new department
const promptAddDepartment = (departmentsArray) => {
	return inquirer
		.prompt(addDepartmentQuestions(departmentsArray))
		.then((data) => {
			console.log(data);
		});
};

// prompts for new role data
const promptAddRole = (rolesArray) => {
	return inquirer
		.prompt(addRoleQuestions(rolesArray))
		.then((data) => console.log(data));
};

// prompts for new emmployee data
const promptAddEmployee = () => {
	// get the list of employees in array format

	return inquirer.prompt(addEmployeeQuestions).then((data) => {
		const { employeeFirstName: firstName, employeeLastName: lastName } = data;
		// function to be added here to add the employee to the database (async)
		console.log(`Added ${firstName} ${lastName} to the database`);
		console.log(data);
	});
};

promptActions();
