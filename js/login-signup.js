document.getElementById("signUp").addEventListener('click', (e)=>{
    e.preventDefault();
    document.getElementById("form-container-login").style.display="none";
    document.getElementById("form-container-signUp").style.display="flex";
});

document.getElementById("logIn").addEventListener('click', (e)=>{
    e.preventDefault();
    document.getElementById("form-container-signUp").style.display="none";
    document.getElementById("form-container-login").style.display="flex";
});

//Validations

const form = document.querySelector(".form");
const inputs = document.querySelectorAll(".form input");

const expressions = {
   password1: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,12}$/
}

const fields = {
	password1: false,
    password2: false
}

const validateForm = (e)=>{
    switch(e.target.name){
        case "password1":
            validateField(expressions.password1, e.target, 'password1');
        break;
        case "password2":
            validatePassword2('password2');
        break;
    }
}

inputs.forEach((input)=>{
    input.addEventListener('keyup', validateForm);
    input.addEventListener('blur', validateForm);
})

const validateField = (expression, input, field) => {
    if(expression.test(input.value)){
        document.getElementById(`${field}-group`).classList.remove('form-group-incorrect');
        document.getElementById(`${field}-group`).classList.add('form-group-correct');
        document.querySelector(`#${field}-group i`).classList.add('fas');
        document.querySelector(`#${field}-group i`).classList.add('fa-check-circle');
        document.querySelector(`#${field}-group i`).classList.remove('fa-solid');
        document.querySelector(`#${field}-group i`).classList.remove('fa-circle-exclamation');
        document.querySelector(`#${field}-group`).classList.remove('form-group-error');
        document.querySelector(`#${field}-group .form-input-error`).classList.remove('form-input-error-active');
        fields[field] = true;
    } else {
        document.getElementById(`${field}-group`).classList.add('form-group-incorrect');
        document.getElementById(`${field}-group`).classList.remove('form-group-correct');
        document.querySelector(`#${field}-group i`).classList.add('fa-solid');
        document.querySelector(`#${field}-group i`).classList.add('fa-circle-exclamation');
        document.querySelector(`#${field}-group i`).classList.remove('fas');
        document.querySelector(`#${field}-group i`).classList.remove('fa-check-circle');
        document.querySelector(`#${field}-group`).classList.add('form-group-error');
        document.querySelector(`#${field}-group .form-input-error`).classList.add('form-input-error-active');
        fields[field] = false;
    }
}

const validatePassword2 = (field) => {
    
    let inputPassword1 = document.getElementById('password1').value;
    let inputPassword2 = document.getElementById('password2').value;

    if(inputPassword1 !== inputPassword2){
        document.getElementById(`password2-group`).classList.add('form-group-incorrect');
        document.getElementById(`password2-group`).classList.remove('form-group-correct');
        document.querySelector(`#password2-group i`).classList.add('fa-solid');
        document.querySelector(`#password2-group i`).classList.add('fa-circle-exclamation');
        document.querySelector(`#password2-group i`).classList.remove('fas');
        document.querySelector(`#password2-group i`).classList.remove('fa-check-circle');
        document.querySelector(`#password2-group .form-input-error`).classList.add('form-input-error-active');
        fields[field] = false;
    } else {
        document.getElementById(`password2-group`).classList.remove('form-group-incorrect');
        document.getElementById(`password2-group`).classList.add('form-group-correct');
        document.querySelector(`#password2-group i`).classList.remove('fa-solid');
        document.querySelector(`#password2-group i`).classList.remove('fa-circle-exclamation');
        document.querySelector(`#password2-group i`).classList.add('fas');
        document.querySelector(`#password2-group i`).classList.add('fa-check-circle');
        document.querySelector(`#password2-group .form-input-error`).classList.remove('form-input-error-active');
        fields[field] = true;
    }
}

function redirection(){
    location.href = "home.html";
    form.reset();
}

document.getElementById("registroForm").addEventListener("submit", function(event) {

    if (fields.password1 && fields.password2) {
        event.preventDefault();
        document.getElementById('success-msg').classList.add('success-msg-active');
        setTimeout(() => {
            redirection();
        }, 3000);
    } else {
        event.preventDefault();
    }
});

document.getElementById('btn-submit').addEventListener('click', ()=>{
    redirection();
})
