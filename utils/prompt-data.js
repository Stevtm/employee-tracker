// import input validation functions
const {
	validateNotNull,
	validateNewDepartment,
	validateNewRole,
	validateUpdatedRole,
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

// add department questions
const addDepartmentQuestions = (departmentsArray) => {
	return [
		{
			type: "input",
			name: "departmentName",
			message: "What is the department's name?",
			validate: (input) => {
				return (
					validateNotNull(input, "department name") &&
					validateNewDepartment(departmentsArray, input)
				);
			},
		},
	];
};

// add role questions
const addRoleQuestions = (dbData) => {
	const roles = dbData[1];
	const departments = dbData[2];
	return [
		{
			type: "input",
			name: "roleTitle",
			message: "What is the role title? ",
			validate: (input) => {
				return (
					validateNotNull(input, "role title") && validateNewRole(roles, input)
				);
			},
		},
		{
			type: "input",
			name: "roleSalary",
			message: "Please enter the salary for this role.",
			validate: (input) => {
				return validateNotNull(input, "salary");
			},
		},
		{
			type: "list",
			name: "roleDepartment",
			message: "Please select the department that this role belongs to.",
			choices: departments,
		},
	];
};

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
	addDepartmentQuestions,
	addEmployeeQuestions,
	addRoleQuestions,
	removeEmployeeQuestions,
	getUpdateEmployee,
	updateManagerQuestions,
	updateRoleQuestions,
};
