-- drop, create and use database 
DROP DATABASE IF EXISTS employeeTrackerDB;
CREATE DATABASE employeeTrackerDB;
USE employeeTrackerDB;

-- department table
CREATE TABLE departmentTable (
    id INT AUTO_INCREMENT NOT NULL,
    department VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);

-- role table 
CREATE TABLE roleTable (
    id INT AUTO_INCREMENT NOT NULL,
    job_title VARCHAR(30) NOT NULL,
    salary DECIMAL(10,2) NOT NULL,
    department_id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (department_id) REFERENCES departmentTable(id)
);

-- employee table 
CREATE TABLE employeeTable (
    id INT AUTO_INCREMENT NOT NULL,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT, 
    PRIMARY KEY (id),
    FOREIGN KEY (role_id) REFERENCES roleTable(id),
    FOREIGN KEY (manager_id) REFERENCES employeeTable(id)
);