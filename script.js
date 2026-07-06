const SCRIPT_URL =
"https://script.google.com/macros/s/AKfycbzPxvg3FdtRaF3XWaQaK5TZskLtRcDzhxVIRjyAvNHyDJ24NKGc0_F0aWZo4YIkaRKm/exec";

// =====================================================
// LOGIN
// =====================================================

async function login() {

    const employeeId =
    document.getElementById("employeeId")
    .value
    .trim();

    const password =
    document.getElementById("password")
    .value
    .trim();

    const status =
    document.getElementById("status");

    const button =
    document.getElementById("loginBtn");

    status.innerHTML = "";

    if (!employeeId) {

        status.innerHTML =
        "Employee ID is required.";

        return;

    }

    if (!password) {

        status.innerHTML =
        "Password is required.";

        return;

    }

    button.disabled = true;
    button.innerHTML = "Please Wait...";

    try {

        const response =
        await fetch(SCRIPT_URL, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({

                action: "login",

                employeeId,

                password

            })

        });

        const result =
        await response.json();

        if (result.status !== "success") {

            status.innerHTML =
            result.message;

            button.disabled = false;
            button.innerHTML = "Login";

            return;

        }

        localStorage.setItem(
            "token",
            result.token
        );

        localStorage.setItem(
            "employeeId",
            result.employee.id
        );

        localStorage.setItem(
            "employeeName",
            result.employee.name
        );

        localStorage.setItem(
            "employeeDepartment",
            result.employee.department
        );

        localStorage.setItem(
            "employeeDesignation",
            result.employee.designation
        );

        localStorage.setItem(
            "employeeRole",
            result.employee.role
        );

        window.location.href =
        "dashboard.html";

    }

    catch (error) {

        console.error(error);

        status.innerHTML =
        "Unable to connect to server.";

        button.disabled = false;
        button.innerHTML = "Login";

    }

}

document
.getElementById("password")
.addEventListener("keypress", function(e){

    if(e.key==="Enter"){

        login();

    }

});