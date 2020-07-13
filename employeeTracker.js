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
}

// VIEW DATA OPTION
// view all employees 
// view all roles 
// view all departments 
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