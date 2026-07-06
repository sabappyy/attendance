/*************************************************
 * Maze Attendance System V4.0
 * login.js
 *************************************************/

if (isLoggedIn()) {

    window.location.href = "dashboard.html";

}

const loginBtn =
document.getElementById("loginBtn");

const employeeIdInput =
document.getElementById("employeeId");

const passwordInput =
document.getElementById("password");

const message =
document.getElementById("message");

loginBtn.addEventListener(

    "click",

    login

);

passwordInput.addEventListener(

    "keydown",

    function(e){

        if(e.key==="Enter"){

            login();

        }

    }

);

async function login(){

    const employeeId =
    employeeIdInput.value.trim();

    const password =
    passwordInput.value.trim();

    message.innerHTML = "";

    if(employeeId===""){

        message.innerHTML =
        "Employee ID is required.";

        employeeIdInput.focus();

        return;

    }

    if(password===""){

        message.innerHTML =
        "Password is required.";

        passwordInput.focus();

        return;

    }

    loginBtn.disabled = true;

    loginBtn.innerHTML =
    "Signing In...";

    try{

        const result =
        await api({

            action:"login",

            employeeId:employeeId,

            password:password

        });

        if(result.status!=="success"){

            message.innerHTML =
            result.message;

            loginBtn.disabled = false;

            loginBtn.innerHTML =
            "Login";

            return;

        }

        saveSession(result);

        window.location.href =
        "dashboard.html";

    }

    catch(error){

        console.error(error);

        message.innerHTML =
        "Unable to connect to server.";

        loginBtn.disabled = false;

        loginBtn.innerHTML =
        "Login";

    }

}