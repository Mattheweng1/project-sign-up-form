const form = document.querySelector('form');

form.noValidate = true;

const errors = form.querySelectorAll('.error');

form.addEventListener('submit', function handleFormSubmit(event) {
    const isValid = form.reportValidity();

    if (!isValid) {
        event.preventDefault();

        for (const field of form.elements) {
            if (field.validationMessage !== "") {
                field.classList.add('flashError');
                setTimeout(() => {
                    field.classList.remove('flashError');
                }, 100);
            }
        }
    }
})

for (const field of form.elements) {
    if (field.validity.valueMissing) {
        field.setCustomValidity("* Please fill out this field.");
    }

    field.addEventListener('invalid', function handleInvalidField(event) {
        field.nextElementSibling.textContent = field.validationMessage;
        event.preventDefault();
    });

    field.addEventListener('input', function handleFieldInput(event) {
        validate(field.id);
    });
}

function validate(fieldID) {
    switch(fieldID) {
        case 'firstName':
            validateFirstName();
            break;
        case 'lastName':
            validateLastName();
            break;
        case 'email':
            validateEmail();
            break;
        case 'phoneNumber':
            validatePhoneNumber();
            break;
        case 'password':
            validatePassword();
            break;
        case 'confirmPassword':
            validateConfirmPassword();
            break;
    }
}

const firstName = document.getElementById('firstName');

function validateFirstName() {
    if (firstName.validity.valueMissing) {
        firstName.setCustomValidity("* You need to enter your first name.");
    } else {
        firstName.setCustomValidity("");
    }

    firstName.reportValidity();

    firstName.nextElementSibling.textContent = firstName.validationMessage;
}

const lastName = document.getElementById('lastName');

function validateLastName() {
    if (lastName.validity.valueMissing) {
        lastName.setCustomValidity("* You need to enter your last name.");
    } else {
        lastName.setCustomValidity("");
    }

    lastName.reportValidity();

    lastName.nextElementSibling.textContent = lastName.validationMessage;
}

const email = document.getElementById('email');

function validateEmail() {
    if (email.validity.valueMissing) {
        email.setCustomValidity("* You need to enter your email.");
    } else if (email.validity.typeMismatch) {
        email.setCustomValidity("* What you entered is not a valid email.")
    } else {
        email.setCustomValidity("");
    }

    email.reportValidity();

    email.nextElementSibling.textContent = email.validationMessage;
}

const phoneNumber = document.getElementById('phoneNumber');

function validatePhoneNumber() {
    if (phoneNumber.validity.valueMissing) {
        phoneNumber.setCustomValidity("* You need to enter your phone number.");
    } else {
        phoneNumber.setCustomValidity("");
    }

    phoneNumber.reportValidity();

    phoneNumber.nextElementSibling.textContent = phoneNumber.validationMessage;
}

const password = document.getElementById('password');

function validatePassword() {
    if (password.validity.valueMissing) {
        password.setCustomValidity("* You need to enter a password.");
    } else if (password.validity.tooShort) {
        password.setCustomValidity(`* The password must be at least ${password.minLength} characters.`);
    } else {
        password.setCustomValidity("");
    }

    password.reportValidity();

    password.nextElementSibling.textContent = password.validationMessage;

    validateConfirmPassword();
}

const confirmPassword = document.getElementById('confirmPassword');

function validateConfirmPassword() {
    if (confirmPassword.validity.valueMissing) {
        confirmPassword.setCustomValidity("* You need to confirm your password.");
    } else if (confirmPassword.value !== password.value) {
        confirmPassword.setCustomValidity("* This needs to match your password.");
    } else {
        confirmPassword.setCustomValidity("");
    }

    confirmPassword.reportValidity();

    confirmPassword.nextElementSibling.textContent = confirmPassword.validationMessage;
}