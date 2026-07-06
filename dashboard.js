/*************************************************
 * Maze Attendance System V4.0
 * dashboard.js
 *************************************************/

if (!isLoggedIn()) {

    window.location.href = "index.html";

}

const employeeId = getEmployeeId();
const token = getToken();

// ============================================
// ELEMENTS
// ============================================

const employeeName =
document.getElementById("employeeName");

const employeeInfo =
document.getElementById("employeeInfo");

const present =
document.getElementById("present");

const absent =
document.getElementById("absent");

const leave =
document.getElementById("leave");

const late =
document.getElementById("late");

const attendance =
document.getElementById("attendance");

const historyBody =
document.getElementById("historyBody");

// ============================================
// CLOCK
// ============================================

function updateClock(){

    const now = new Date();

    document.getElementById("todayDate").innerHTML =
    now.toDateString();

    document.getElementById("currentTime").innerHTML =
    now.toLocaleTimeString();

}

setInterval(updateClock,1000);

updateClock();

// ============================================
// LOAD DASHBOARD
// ============================================

async function loadDashboard(){

    try{

        const response =
        await fetch(

            CONFIG.API_URL +
            "?action=dashboard" +
            "&employeeId=" +
            encodeURIComponent(employeeId) +
            "&token=" +
            encodeURIComponent(token)

        );

        const data =
        await response.json();

        if(data.status!=="success"){

            alert(data.message);

            clearSession();

            window.location.href =
            "index.html";

            return;

        }

        employeeName.innerHTML =
        data.employee.name;

        employeeInfo.innerHTML =
        data.employee.department +
        " | " +
        data.employee.designation;

        present.innerHTML =
        data.summary.present;

        absent.innerHTML =
        data.summary.absent;

        leave.innerHTML =
        data.summary.leave;

        late.innerHTML =
        data.summary.late;

        attendance.innerHTML =
        data.summary.attendance + "%";

        historyBody.innerHTML = "";

        data.history.forEach(function(item){

            historyBody.innerHTML += `

            <tr>

                <td>${item.date}</td>

                <td>${item.login}</td>

                <td>${item.logout}</td>

                <td>${item.hours}</td>

                <td>${item.status}</td>

            </tr>

            `;

        });

    }

    catch(err){

        console.error(err);

        alert("Unable to load dashboard.");

    }

}

// ============================================
// CHECK IN
// ============================================

async function checkIn(){

    const result =
    await api({

        action:"checkin",

        employeeId:employeeId,

        token:token

    });

    alert(result.message);

    if(result.status==="success"){

        loadDashboard();

    }

}

// ============================================
// CHECK OUT
// ============================================

async function checkOut(){

    const result =
    await api({

        action:"checkout",

        employeeId:employeeId,

        token:token

    });

    alert(result.message);

    if(result.status==="success"){

        loadDashboard();

    }

}

// ============================================
// LOGOUT
// ============================================

async function logout(){

    try{

        await api({

            action:"logout",

            employeeId:employeeId,

            token:token

        });

    }catch(e){}

    clearSession();

    window.location.href =
    "index.html";

}

// ============================================
// EVENTS
// ============================================

document
.getElementById("checkInBtn")
.addEventListener("click",checkIn);

document
.getElementById("checkOutBtn")
.addEventListener("click",checkOut);

document
.getElementById("logoutBtn")
.addEventListener("click",logout);

// ============================================

loadDashboard();