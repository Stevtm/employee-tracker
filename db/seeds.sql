INSERT INTO department (name)
VALUES 
    ("Sales"), 
    ("Engineering"), 
    ("Finance"), 
    ("Legal");

INSERT INTO role (title, salary, department_id)
VALUES 
    ("Sales Lead", 100000.00, 1), 
    ("Salesperson", 65000.00, 1), 
    ("Lead Engineer", 130000.00, 2), 
    ("Software Engineer", 80000.00, 2), 
    ("Account Manager", 85000.00, 3), 
    ("Accountant", 70000.00, 3), 
    ("Legal Team Lead", 90000.00, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id) 
VALUES 
    ("Engineering", "Boss", 3, NULL), 
    ("Engineer", "One", 4, 1), 
    ("Engineer", "Two", 4, 1),
    ("Sales", "Boss", 1, NULL), 
    ("Salesperson", "One", 2, 4),
    ("Salesperson", "Two", 2, 4),
    ("Account", "Boss", 5, NULL), 
    ("Accountant", "One", 6, 7),
    ("Accountant", "Two", 6, 7),
    ("Legal", "Boss", 5, NULL);