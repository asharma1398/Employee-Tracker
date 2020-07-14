// DEPENDENCIES 
// =========================================================================
const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require('console.table');
require("dotenv").config();

// NEEDED VARIABLES 
// =========================================================================

// MYSQL CONNECTION
// =========================================================================
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: process.env.DB_PASS,
    database: "employeeTrackerDB"
  });
  
// APPLICATION PAGE FUNCTIONS 
// =========================================================================
connection.connect(function(err) {
    if (err) throw err;

    console.log(`
    
        ███████╗███╗   ███╗██████╗ ██╗      ██████╗ ██╗   ██╗███████╗███████╗    
        ██╔════╝████╗ ████║██╔══██╗██║     ██╔═══██╗╚██╗ ██╔╝██╔════╝██╔════╝    
        █████╗  ██╔████╔██║██████╔╝██║     ██║   ██║ ╚████╔╝ █████╗  █████╗      
        ██╔══╝  ██║╚██╔╝██║██╔═══╝ ██║     ██║   ██║  ╚██╔╝  ██╔══╝  ██╔══╝      
        ███████╗██║ ╚═╝ ██║██║     ███████╗╚██████╔╝   ██║   ███████╗███████╗    
        ╚══════╝╚═╝     ╚═╝╚═╝     ╚══════╝ ╚═════╝    ╚═╝   ╚══════╝╚══════╝    
                                                                           
                                                                                
           ████████╗██████╗  █████╗  ██████╗██╗  ██╗███████╗██████╗             
           ╚══██╔══╝██╔══██╗██╔══██╗██╔════╝██║ ██╔╝██╔════╝██╔══██╗            
              ██║   ██████╔╝███████║██║     █████╔╝ █████╗  ██████╔╝            
              ██║   ██╔══██╗██╔══██║██║     ██╔═██╗ ██╔══╝  ██╔══██╗            
              ██║   ██║  ██║██║  ██║╚██████╗██║  ██╗███████╗██║  ██║            
              ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝            
                                                                                
                --- Welcome to the Employee Management System ---     
    \n`)
    runMainPage();
});

// MAIN PAGE 
// ---------
function runMainPage() {
    inquirer
        .prompt({
            name: "mainMenuPrompts",
            type: "list",
            message: "Please select from the options below:",
            choices: [
                "View Data",
                "Add Data",
                "Remove Data",
                "Update Data", 
                "EXIT"
            ]
        })
        .then(function(response) {
            switch (response.mainMenuPrompts) {
                case "View Data":
                    runViewData();
                    break;
                
                case "Add Data":
                    runAddData();
                    break;
            
                case "Remove Data":
                    runRemoveData();
                    break;
                
                case "Update Data":
                    runUpdateData();
                    break;

                case "EXIT":
                    console.log("\n         --- You have successfully exited the Employee Tracker Application! ---\n");
                    connection.end();
                    break;
            }
        })
};

// VIEW DATA OPTION
// ----------------
function runViewData() {
    inquirer
        .prompt({
            name: "viewDataPrompts",
            type: "list",
            message: "Please select from the options below:",
            choices: [
                "View All Employees",
                "View All Roles",
                "View All Departments",
                "Return to Main Page"
            ]
        })
        .then(function(response) {
            switch (response.viewDataPrompts) {
                case "View All Employees":
                    runViewEmployees();
                    break;
                
                case "View All Roles":
                    runViewRoles();
                    break;
                
                case "View All Departments":
                    runViewDepartments();
                    break;

                case "Return to Main Page":
                    runMainPage();
                    break;
            }
        })
};

// view all employees 
function runViewEmployees() {
    var query = `SELECT employeeTable.id AS "ID" , employeeTable.first_name AS "Fist Name", employeeTable.last_name AS "Last Name", roleTable.job_title AS "Job Title", departmentTable.department AS "Department", roleTable.salary AS "Salary", CONCAT(manager.first_name, ' ', manager.last_name) AS "Manager" `;
    query += "FROM employeeTable ";
    query += "INNER JOIN roleTable ON employeeTable.role_id = roleTable.id ";
    query += "INNER JOIN departmentTable ON roleTable.department_id = departmentTable.id ";
    query += "LEFT JOIN employeeTable AS manager ON manager.id = employeeTable.manager_id ";

    connection.query(query, function(error, response) {
        if (error) throw error;
        console.log(`\n`)
        console.table(response);
        runMainPage();
    })
};

// view all roles 
function runViewRoles() {
    var query = `SELECT roleTable.id AS "ID", roleTable.job_title AS "Job Title", departmentTable.department AS "Department", roleTable.salary AS "Salary" `;
    query += "FROM roleTable ";
    query += "INNER JOIN departmentTable ON roleTable.department_id = departmentTable.id";

    connection.query(query, function(error, response) {
        if (error) throw error;
        console.log(`\n`)
        console.table(response);
        runMainPage();
    })
};

// view all departments 
function runViewDepartments() {
    var query = `SELECT departmentTable.id AS "ID", departmentTable.department AS "Department" `;
    query += "FROM departmentTable";

    connection.query(query, function(error, response) {
        if (error) throw error;
        console.log(`\n`)
        console.table(response);
        runMainPage();
    })
};
// view all employees by department – bonus
// View all employees by manager – bonus
// view department’s total utilized budget – bonus 

// ADD DATA OPTION
function runAddData() {
    inquirer
        .prompt({
            name: "addDataPrompts",
            type: "list",
            message: "Please select from the options below:",
            choices: [
                "Add Employee",
                "Add Role",
                "Add Department",
                "Return to Main Page"
            ]
        })
        .then(function(response) {
            switch (response.addDataPrompts) {
                case "Add Employee":
                    runAddEmployee();
                    break;
                
                case "Add Role":
                    runAddRole();
                    break;

                
                case "Add Department":
                    runAddDepartment();
                    break;

                case "Return to Main Page":
                    runMainPage();
                    break;
            }
        })
};

// add employee
function runAddEmployee() {
    var query = `SELECT employeeTable.id AS employeeID, CONCAT(employeeTable.first_name, ' ', employeeTable.last_name) AS employee, roleTable.id AS roleID, roleTable.job_title AS role `;
    query += "FROM employeeTable ";
    query += "RIGHT JOIN roleTable ON employeeTable.role_id = roleTable.id"

    connection.query(query, function(error, response) {
        if (error) throw error;
        
        // will be filled with unique roles for user to choose from
        let roleOptions = [];
  
        // will be filled with unique managers for user to choose from
        let managerOptions = [];

        // collect all unique role options 
        response.forEach(function({ role }, i) {
            
            if (role) {
                
                for (var i = 0; i < role.length; i++){
                    if(!roleOptions.includes(role)){
                        roleOptions.push(role);
                    }
                    
                }
                
            }
        })

        // collect all unique manger options 
        response.forEach(function({ employee }, i) {

            if (employee) {
                
                for (var i = 0; i < employee.length; i++){
                    if(!managerOptions.includes(employee)){
                        managerOptions.push(employee);
                    }
                }
                
            }
        })

        inquirer
            .prompt([
                {
                    name: "empFirstName",
                    type: "input",
                    message: "What is the employee's first name?"
                },
                {
                    name: "empLastName",
                    type: "input",
                    message: "What is the employee's last name?"
                },
                {
                    name: "empRole",
                    type: "list",
                    message: "What is the employee's role?",
                    choices: roleOptions
                },
                {
                    name: "empManager",
                    type: "list",
                    message: "Who is the employee's manager?",
                    choices: managerOptions
                }
            ])
            .then(function(response) {
                // identify role id
                let roleIndex = 0;
                for (let i = 0; i < roleOptions.length; i++) {
                    if (response.empRole === roleOptions[i]) {
                        roleIndex = i + 1;
                    }
                }

                // identify manager id
                let managerIndex = 0;
                for (let i = 0; i < managerOptions.length; i++) {
                    if (response.empManager === managerOptions[i]) {
                        managerIndex = i + 1;
                    }
                }

                var insertion = "INSERT INTO employeeTable (first_name, last_name, role_id, manager_id) VALUES ( ?, ?, ?, ?)";

                connection.query(insertion, [response.empFirstName, response.empLastName, roleIndex, managerIndex], function(error, response) {
                    if (error) throw error;

                    console.log("\n                 --- You have successfully added a new employee! ---\n");
                    runMainPage();
                })
            })            

    })
};

// add role 
function runAddRole() {
    var query = "SELECT * FROM departmentTable";

    connection.query(query, function(error, response) {
        if (error) throw error;

        // will be filled with unique departments for user to choose from
        let departmentOptions = [];

        response.forEach(function({ department }, i) {
            if (department) {
                
                for (var i = 0; i < department.length; i++){
                    if(!departmentOptions.includes(department)){
                        departmentOptions.push(department);
                    }
                    
                }
                
            }
        })

        inquirer
            .prompt([
                {
                    name: "newJobTitle",
                    type: "input",
                    message: "What is the name of the new job title?"

                },
                {
                    name: "newSalary",
                    type: "input",
                    message: "What is the salary for the new role?"
                },
                {
                    name: "newRoleDepartment",
                    type: "list",
                    message: "Which department does the role belong to?",
                    choices: departmentOptions
                }
            ])
            .then(function(response) {
                // identify department id
                let departmentIndex = 0;
                for (let i = 0; i < departmentOptions.length; i++) {
                    if (response.newRoleDepartment === departmentOptions[i]) {
                        departmentIndex = i + 1;
                    }
                }
                
                var insertion = "INSERT INTO roleTable (job_title, salary, department_id) VALUES ( ?, ?, ?)"

                connection.query(insertion, [response.newJobTitle, response.newSalary, departmentIndex], function (error, response) {
                    if (error) throw error;

                    console.log("\n                 --- You have successfully added a new role! ---\n");
                    runMainPage();
                })
            })
    })
};

// add department 
function runAddDepartment() {
    inquirer
        .prompt([
            {
                name: "newDepartment",
                type: "input",
                message: "What is the name of the new department?"
            }
        ])
        .then(function(response) {
            var insertion = "INSERT INTO departmentTable (department) VALUES (?)";

            connection.query(insertion, [response.newDepartment], function(error, response) {
                if (error) throw error;

                    console.log("\n                 --- You have successfully added a new Department! ---\n");
                    runMainPage();
            })
        })
};

// REMOVE DATA OPTION
// remove employee - bonus
// remove role - bonus
// remove department – bonus

// UPDATE DATA OPTION
// update employee role
// update employee manager – bonus 