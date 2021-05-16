// import input validation functions
const {
	validateNotNull,
	validateNewRole,
	validateNewManager,
} = require("./input-validation");

// arrays of questions for prompts
// list of actions that can be selected
const actions = [
	{
		type: "list",
		name: "action",
		message: "What would you like to do?",
		choices: [
			"View All Departments",
			"View All Roles",
			"View All Employees",
			"Add a Department",
			"Add a Role",
			"Add an Employee",
			"Update an Employee's Role",
		],
		default: "View All Employees",
	},
];

// add employee questions
const addEmployeeQuestions = (employeesArray) => {
	return [
		{
			type: "input",
			name: "employeeFirstName",
			message: "What is the employee's first name?",
			validate: (input) => validateNotNull(input, "first name"),
		},
		{
			type: "input",
			name: "employeeLastName",
			message: "What is the employee's last name?",
			validate: (input) => validateNotNull(input, "last name"),
		},
		{
			type: "list",
			name: "employeeRole",
			message: "What is the employee's role?",
			choices: [
				"Sales Lead",
				"Salesperson",
				"Lead Engineer",
				"Software Engineer",
				"Account Manager",
				"Accountant",
				"Legal Team Lead",
			],
		},
		{
			type: "list",
			name: "employeeManager",
			message: "Who is the employee's manager?",
			choices: [...employeesArray, "No Manager"],
		},
	];
};

// remove employee questions
const removeEmployeeQuestions = (employeesArray) => {
	return [
		{
			type: "list",
			name: "employeeToRemove",
			message: "Which employee do you want to remove?",
			choices: employeesArray,
		},
	];
};

// get employee to update
const getUpdateEmployee = (employeesArray) => {
	return [
		{
			type: "list",
			name: "employeeToUpdateRole",
			message: "Which employee's role do you want to update?",
			choices: employeesArray,
		},
	];
};

// update employee role questions
const updateRoleQuestions = (employeesArray, updateEmployee) => {
	return [
		{
			type: "list",
			name: "updatedRole",
			message: "Which role do you want to assign to the selected employee?",
			choices: [
				"Sales Lead",
				"Salesperson",
				"Lead Engineer",
				"Software Engineer",
				"Account Manager",
				"Accountant",
				"Legal Team Lead",
			],
			validate: (input) => validateNewRole(updateEmployee),
		},
	];
};

// update employee manager questions
const updateManagerQuestions = (employeesArray, updateEmployee) => {
	return [
		{
			type: "list",
			name: "updatedManager",
			message: "Which manager do you want to assign to the selected employee?",
			choices: [...employeesArray, "No Manager"],
			validate: (input) => validateNewManager(updateEmployee),
		},
	];
};

// export arrays
module.exports = {
	actions,
	addEmployeeQuestions,
	removeEmployeeQuestions,
	getUpdateEmployee,
	updateManagerQuestions,
	updateRoleQuestions,
};
