const inquirer = require("inquirer");

// import prompt data and mysql2 queries
const { actions, addEmployeeQuestions } = require("./utils/prompt-data");
const {
	viewAllEmployees,
	viewAllEmployeesByDepartment,
} = require("./utils/queries");

// prompt that asks the user which action they would like to take
const promptActions = () => {
	return inquirer.prompt(actions).then((data) => {
		switch (data.action) {
			case "View All Departments":
				console.log("In View all Departments");
				break;
			case "View All Roles":
				console.log("In View All Roles");
				break;
			case "View All Employees":
				console.log("In View all Employees");
				viewAllEmployees().then(promptActions);
				break;
			case "Add a Department":
				console.log("In Add a Department");
				break;
			case "Add a Role":
				console.log("In Add a Role");
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
