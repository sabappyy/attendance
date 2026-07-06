/*************************************************
 * Maze Attendance System V4.0
 * config.js
 *************************************************/

// =====================================================
// API CONFIGURATION
// =====================================================

const CONFIG = {

    API_URL:
    "https://script.google.com/macros/s/AKfycbzPxvg3FdtRaF3XWaQaK5TZskLtRcDzhxVIRjyAvNHyDJ24NKGc0_F0aWZo4YIkaRKm/exec",

    APP_NAME:
    "Maze Attendance System",

    VERSION:
    "4.0"

};

// =====================================================
// LOCAL STORAGE
// =====================================================

const STORAGE = {

    TOKEN:
    "maze_token",

    EMPLOYEE_ID:
    "maze_employee_id",

    EMPLOYEE_NAME:
    "maze_employee_name",

    EMPLOYEE_ROLE:
    "maze_employee_role",

    EMPLOYEE_DEPARTMENT:
    "maze_department",

    EMPLOYEE_DESIGNATION:
    "maze_designation"

};

// =====================================================
// SESSION
// =====================================================

function saveSession(data){

    localStorage.setItem(
        STORAGE.TOKEN,
        data.token
    );

    localStorage.setItem(
        STORAGE.EMPLOYEE_ID,
        data.employee.id
    );

    localStorage.setItem(
        STORAGE.EMPLOYEE_NAME,
        data.employee.name
    );

    localStorage.setItem(
        STORAGE.EMPLOYEE_ROLE,
        data.employee.role
    );

    localStorage.setItem(
        STORAGE.EMPLOYEE_DEPARTMENT,
        data.employee.department
    );

    localStorage.setItem(
        STORAGE.EMPLOYEE_DESIGNATION,
        data.employee.designation
    );

}

function clearSession(){

    localStorage.removeItem(STORAGE.TOKEN);

    localStorage.removeItem(STORAGE.EMPLOYEE_ID);

    localStorage.removeItem(STORAGE.EMPLOYEE_NAME);

    localStorage.removeItem(STORAGE.EMPLOYEE_ROLE);

    localStorage.removeItem(STORAGE.EMPLOYEE_DEPARTMENT);

    localStorage.removeItem(STORAGE.EMPLOYEE_DESIGNATION);

}

function isLoggedIn(){

    return !!localStorage.getItem(
        STORAGE.TOKEN
    );

}

function getEmployeeId(){

    return localStorage.getItem(
        STORAGE.EMPLOYEE_ID
    );

}

function getToken(){

    return localStorage.getItem(
        STORAGE.TOKEN
    );

}

// =====================================================
// API
// =====================================================

async function api(data){

    const response = await fetch(CONFIG.API_URL,{

        method:"POST",

        body:JSON.stringify(data)

    });

    return await response.json();

}