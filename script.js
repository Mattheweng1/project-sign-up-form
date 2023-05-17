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

function showError(field) {
    field.reportValidity();

    field.nextElementSibling.textContent = field.validationMessage;
}

const firstName = document.getElementById('firstName');

function validateFirstName() {
    if (firstName.validity.valueMissing) {
        firstName.setCustomValidity("* Please fill out this field.");
    } else {
        firstName.setCustomValidity("");
    }

    showError(firstName);
}

const lastName = document.getElementById('lastName');

function validateLastName() {
    if (lastName.validity.valueMissing) {
        lastName.setCustomValidity("* Please fill out this field.");
    } else {
        lastName.setCustomValidity("");
    }

    showError(lastName);
}

const email = document.getElementById('email');

function validateEmail() {
    if (email.validity.valueMissing) {
        email.setCustomValidity("* Please fill out this field.");
    } else if (email.validity.typeMismatch) {
        email.setCustomValidity("* What you entered is not a valid email.")
    } else {
        email.setCustomValidity("");
    }

    showError(email);
}

const phoneNumber = document.getElementById('phoneNumber');

function validatePhoneNumber() {
    if (phoneNumber.validity.valueMissing) {
        phoneNumber.setCustomValidity("* Please fill out this field.");
    } else {
        phoneNumber.setCustomValidity("");
    }

    showError(phoneNumber);
}

const password = document.getElementById('password');

function validatePassword() {
    if (password.validity.valueMissing) {
        password.setCustomValidity("* Please fill out this field.");
    } else if (password.validity.tooShort) {
        password.setCustomValidity(`* The password must be at least ${password.minLength} characters.`);
    } else {
        password.setCustomValidity("");
    }

    showError(password);

    validateConfirmPassword();
}

const confirmPassword = document.getElementById('confirmPassword');

function validateConfirmPassword() {
    if (confirmPassword.validity.valueMissing) {
        confirmPassword.setCustomValidity("* Please fill out this field.");
    } else if (confirmPassword.value !== password.value) {
        confirmPassword.setCustomValidity("* This needs to match your password.");
    } else {
        confirmPassword.setCustomValidity("");
    }

    showError(confirmPassword);
}