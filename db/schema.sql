DROP TABLE IF EXISTS employee; 
DROP TABLE IF EXISTS role; 
DROP TABLE IF EXISTS deplartment;

CREATE TABLE department (
    id INTEGER AUTO_INCREMENT PRIMARY KEY, 
    name VARCHAR(30) NOT NULL
);

CREATE TABLE role (
    id INTEGER AUTO_INCREMENT PRIMARY KEY, 
    title VARCHAR(30) NOT NULL UNIQUE, 
    salary DECIMAL(11, 2) NOT NULL, 
    department_id INTEGER NOT NULL, 
    CONSTRAINT fk_department FOREIGN KEY (department_id) REFERENCES department (id)
);

CREATE TABLE employee (
    id INTEGER AUTO_INCREMENT PRIMARY KEY, 
    first_name VARCHAR(30) NOT NULL, 
    last_name VARCHAR(30) NOT NULL, 
    role_id INTEGER NOT NULL, 
    manager_id INTEGER, 
    CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES role (id),
    CONSTRAINT fk_manager FOREIGN KEY (manager_id) REFERENCES employee (id)
);
