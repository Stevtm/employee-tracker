const validateNotNull = (input, str) => {
	if (!input) {
		console.log(`You must enter a ${str}.`);
		return false;
	}

	return true;
};

const validateNewRole = (updateEmployee) => {
	if (updateEmployee.role === updatedRole) {
		console.log(
			"Please select a role that is different than the employee's current role. "
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

module.exports = { validateNotNull, validateNewRole, validateNewManager };
