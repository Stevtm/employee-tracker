const inquirer = require("inquirer");

// import methods
const { actions, addEmployeeQuestions } = require("./utils/prompt-data");

// prompt that asks the user which action they would like to take
const promptActions = () => {
	return inquirer.prompt(actions).then((data) => {
		if (data.action === "Add an Employee") {
			return promptAddEmployee();
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
