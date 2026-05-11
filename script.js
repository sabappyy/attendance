const scriptURL = 'https://script.google.com/macros/s/AKfycbyjqWs5kZk_83AKaGl8YXWdvSrTCnVP2L7ykjjJXuj_9iajZsVqD9Y7ADo-kpUCOozZ/exec';

async function login(){

const employeeId =
document.getElementById('employeeId').value;

const password =
document.getElementById('password').value;

const status =
document.getElementById('status');

const loginBtn =
document.getElementById('loginBtn');

loginBtn.disabled = true;

const data = {

action:'login',
employeeId,
password

};

try{

const response = await fetch(scriptURL,{

method:'POST',
body:JSON.stringify(data)

});

const result = await response.json();

status.innerHTML = result.message;

if(result.status === 'success'){

localStorage.setItem(
'employeeId',
employeeId
);

localStorage.setItem(
'employeeName',
result.name
);

window.location.href =
'dashboard.html';

}

else{

loginBtn.disabled = false;

}

}

catch(error){

status.innerHTML = 'Connection Error';

loginBtn.disabled = false;

}

}
