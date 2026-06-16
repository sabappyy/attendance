const scriptURL =
'https://script.google.com/macros/s/AKfycbxKUF4oxXw0x5cjIXSuSghBV-6IQkCp84XrRTz4lMe4qVtJdTWR8HPcTsyF3tiHipYdeg/exec';

async function login(){

    const employeeId =
    document.getElementById('employeeId').value.trim();

    const password =
    document.getElementById('password').value.trim();

    const status =
    document.getElementById('status');

    const loginBtn =
    document.getElementById('loginBtn');

    if(!employeeId || !password){
        status.innerHTML =
        'Please enter Employee ID and Password';
        return;
    }

    loginBtn.disabled = true;
    status.innerHTML = 'Checking...';

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

        const result =
        await response.json();

        status.innerHTML =
        result.message || '';

        /*
        success = first login today
        already_logged_in = login exists,
                            logout not done yet
        */

        if(
            result.status === 'success' ||
            result.status === 'already_logged_in'
        ){

            localStorage.setItem(
                'employeeId',
                employeeId
            );

            localStorage.setItem(
                'employeeName',
                result.name
            );

            localStorage.setItem(
                'employeePassword',
                password
            );

            window.location.href =
            'dashboard.html';

        }else{

            loginBtn.disabled = false;

        }

    }catch(error){

        console.error(error);

        status.innerHTML =
        'Connection Error';

        loginBtn.disabled = false;

    }

}
