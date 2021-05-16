const inquirer = require("inquirer");

// import methods
const { actions, addEmployeeQuestions } = require("./utils/prompt-data");

// prompt that asks the user which action they would like to take
const promptActions = () => {
	return inquirer.prompt(actions).then((data) => {
		switch (data.action) {
			case "View All Employees":
				console.log("In View all Employees");
				break;
			case "View All Employees by Department":
				console.log("In View All Employees by Department");
				break;
			case "View All Employees by Manager":
				console.log("In View All Employees by Manager");
				break;
			case "Add an Employee":
				console.log("In Add an Employee");
				promptAddEmployee();
				break;
			case "Remove an Employee":
				console.log("In Remove an Employee");
				break;
			case "Update an Employee's Role":
				console.log("In Update an Employee's Role");
				break;
			case "Update an Employee's Manager":
				console.log("In Update an Employee's Manager");
				break;
			case "View all Roles":
				console.log("In View all Roles");
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
