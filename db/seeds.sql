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
    ("Lead Engineer", 150000.00, 2), 
    ("Software Engineer", 90000.00, 2), 
    ("Account Manager", 100000.00, 3), 
    ("Accountant", 70000.00, 3), 
    ("Legal Team Lead", 110000.00, 4),
    ("Lawyer", 90000.00, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id) 
VALUES 
    ("John", "Doe", 3, NULL),
    ("Penny", "Tool", 4, 1), 
    ("Nathaniel", "Down", 4, 1),
    ("Valentino", "Morose", 1, NULL), 
    ("Eric", "Widget", 2, 4),
    ("Niles", "Peppertrout", 5, NULL), 
    ("Sue", "Ameter", 6, 7),
    ("Ingrid", "Tone", 5, NULL);