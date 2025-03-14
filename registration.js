

let form = document.querySelector("#form")

form.addEventListener("submit",function(e) {
    e.preventDefault()
    let formData = {
        phoneNumber: document.querySelector('input[name="phone"]').value,
        password: document.querySelector('input[name="pass"]').value,
        email: document.querySelector('input[name="em"]').value,
        firstName: document.querySelector('input[name="fn"]').value,
        lastName: document.querySelector('input[name="ln"]').value,
    }
    // console.log(formData)


    fetch('https://rentcar.stepprojects.ge/api/Users/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    }).then(resp=> resp.json())
    .then(data=> console.log(data))

});



let form1 = document.querySelector("#form1")

form1.addEventListener("submit",function(e) {
    e.preventDefault()
    let formData = {
        phoneNumber: document.querySelector('input[name="phone"]').value,
        password: document.querySelector('input[name="pass"]').value,
        email: document.querySelector('input[name="em"]').value,
        firstName: document.querySelector('input[name="fn"]').value,
        lastName: document.querySelector('input[name="ln"]').value,
    }
    // console.log(formData)


    fetch('https://rentcar.stepprojects.ge/api/Users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    }).then(resp=> resp.json())
    .then(data=> setToken(data))

});


function setToken(obj) {
    localStorage.setItem('token', obj.token);
    localStorage.setItem('userId', obj.id);
    localStorage.setItem('firstName', obj.firstName);
    localStorage.setItem('lastName', obj.lastName);
    localStorage.setItem('email', obj.email);
    setTimeout(function() {
        window.location.href = "./index.html";
    }, 100);
}