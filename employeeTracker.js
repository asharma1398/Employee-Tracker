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
}

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
}

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
}
// view all employees by department – bonus
// View all employees by manager – bonus
// view department’s total utilized budget – bonus 

// ADD DATA OPTION
// add employee
// add role 
// add department 


// REMOVE DATA OPTION
// remove employee - bonus
// remove role - bonus
// remove department – bonus

// UPDATE DATA OPTION
// update employee role
// update employee manager – bonus 