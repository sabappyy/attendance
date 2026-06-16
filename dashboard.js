const scriptURL = 'https://script.google.com/macros/s/AKfycbxKUF4oxXw0x5cjIXSuSghBV-6IQkCp84XrRTz4lMe4qVtJdTWR8HPcTsyF3tiHipYdeg/exec';

const employeeId =
localStorage.getItem('employeeId');

const employeeName =
localStorage.getItem('employeeName');

document.getElementById('name')
.innerHTML = employeeName;

function updateClock(){

const now = new Date();

document.getElementById('date')
.innerHTML = now.toDateString();

document.getElementById('clock')
.innerHTML = now.toLocaleTimeString();

}

setInterval(updateClock,1000);

updateClock();

async function loadAttendance(){

const response = await fetch(
`${scriptURL}?employeeId=${employeeId}`
);

const data = await response.json();

const body =
document.getElementById('attendanceBody');

body.innerHTML = '';

data.forEach(item => {

body.innerHTML += `

<tr>

<td>${item.date}</td>
<td>${item.login}</td>
<td>${item.logout}</td>

</tr>

`;

});

}

loadAttendance();

async function logout(){

const response = await fetch(scriptURL,{

method:'POST',

body:JSON.stringify({

action:'logout',
employeeId,
password:localStorage.getItem(
'employeePassword'
)

})

});

const result = await response.json();

alert(result.message);

window.location.href = 'index.html';

}
