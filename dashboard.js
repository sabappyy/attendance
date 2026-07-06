const SCRIPT_URL =
"https://script.google.com/macros/s/AKfycbzPxvg3FdtRaF3XWaQaK5TZskLtRcDzhxVIRjyAvNHyDJ24NKGc0_F0aWZo4YIkaRKm/exec";

const employeeId =
localStorage.getItem("employeeId");

const token =
localStorage.getItem("token");

if(!employeeId || !token){

    window.location.href="index.html";

}

// =====================================================
// CLOCK
// =====================================================

function updateClock(){

    const now = new Date();

    document.getElementById("currentDate").innerHTML =
    now.toDateString();

    document.getElementById("currentTime").innerHTML =
    now.toLocaleTimeString();

}

setInterval(updateClock,1000);

updateClock();

// =====================================================
// LOAD DASHBOARD
// =====================================================

async function loadDashboard(){

    try{

        const response =
        await fetch(

            `${SCRIPT_URL}?action=dashboard&employeeId=${employeeId}&token=${token}`

        );

        const result =
        await response.json();

        if(result.status!="success"){

            alert(result.message);

            logout();

            return;

        }

        document.getElementById("employeeName").innerHTML =
        result.employee.name;

        document.getElementById("employeeInfo").innerHTML =
        `${result.employee.department} | ${result.employee.designation}`;

        document.getElementById("present").innerHTML =
        result.summary.present;

        document.getElementById("absent").innerHTML =
        result.summary.absent;

        document.getElementById("leave").innerHTML =
        result.summary.leave;

        document.getElementById("holiday").innerHTML =
        result.summary.holiday;

        document.getElementById("late").innerHTML =
        result.summary.late;

        document.getElementById("attendance").innerHTML =
        result.summary.attendance + "%";

        loadHistory(result.history);

    }

    catch(error){

        console.log(error);

        alert("Server Error");

    }

}

function loadHistory(history){

    const body =
    document.getElementById("historyBody");

    body.innerHTML="";

    history.forEach(item=>{

        body.innerHTML+=`

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

// =====================================================
// CHECK IN
// =====================================================

async function checkIn(){

    const response =
    await fetch(SCRIPT_URL,{

        method:"POST",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify({

            action:"checkin",

            employeeId,

            token

        })

    });

    const result =
    await response.json();

    alert(result.message);

    loadDashboard();

}

// =====================================================
// CHECK OUT
// =====================================================

async function checkOut(){

    const response =
    await fetch(SCRIPT_URL,{

        method:"POST",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify({

            action:"checkout",

            employeeId,

            token

        })

    });

    const result =
    await response.json();

    alert(result.message);

    loadDashboard();

}

// =====================================================
// LOGOUT
// =====================================================

async function logout(){

    try{

        await fetch(SCRIPT_URL,{

            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify({

                action:"logout",

                employeeId,

                token

            })

        });

    }catch(e){}

    localStorage.clear();

    window.location.href="index.html";

}

loadDashboard();