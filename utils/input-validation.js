// validate that the input is not null (blank)
const validateNotNull = (input, str) => {
	if (!input) {
		console.log(`You must enter a ${str}.`);
		return false;
	}

	return true;
};

// validate that the entered department does not already exist in the database
const validateNewDepartment = (departmentsArray, newDepartment) => {
	let response = true;

	departmentsArray.forEach((department) => {
		if (department.name === newDepartment) {
			response = false;
			console.log(" --- This department already exists in the database. ---");
			return;
		}
	});

	return response;
};

// validate that the entered role does not aready exist in the database
const validateNewRole = (rolesArray, newRole) => {
	let response = true;

	rolesArray.forEach((role) => {
		if (role.title === newRole) {
			response = false;
			console.log(
				" --- A role with this title already exists in the database. ---"
			);
			return;
		}
	});

	return response;
};

// validate that the updated role is different than the employee's current role
const validateUpdatedRole = (updateEmployee) => {
	if (updateEmployee.role === updatedRole) {
		console.log(
			" --- Please select a role that is different than the employee's current role. ---"
		);
		return false;
	}

	return true;
};

const validateNewManager = (updateEmployee) => {
	if (updateEmployee.manager === updatedManager) {
		console.log(
			"Please select a manager that is different than the employee's current manager"
		);
		return false;
	} else if (updateEmployee.manager === updateEmployee.id) {
		console.log("You cannot select an employee as their own manager.");
		return false;
	}

	return true;
};

module.exports = {
	validateNotNull,
	validateNewDepartment,
	validateNewRole,
	validateUpdatedRole,
	validateNewManager,
};
