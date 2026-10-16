
const form = document.getElementById("signup-form");

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const passwordInput = document.getElementById("password");

const successMessage = document.getElementById("success-message");

const inputs = [
    nameInput,
    emailInput,
    phoneInput,
    passwordInput
];

// Display an error message
function showError(input, message) {
    const errorElement = document.getElementById(`${input.id}-error`);

    errorElement.textContent = message;
    input.setAttribute("aria-invalid", "true");
}

// Clear an error message
function clearError(input) {
    const errorElement = document.getElementById(`${input.id}-error`);

    errorElement.textContent = "";
    input.setAttribute("aria-invalid", "false");
}

// Validate each input
function validateInput(input) {
    const value = input.value.trim();

    if (value === "") {
        showError(input, "This field is required.");
        return false;
    }

    if (input === nameInput && value.length < 3) {
        showError(input, "Name must be at least 3 characters.");
        return false;
    }

    if (input === emailInput) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(value)) {
            showError(input, "Please enter a valid email address.");
            return false;
        }
    }

    if (input === phoneInput) {
        const phonePattern = /^\+?[0-9]{10,15}$/;

        if (!phonePattern.test(value)) {
            showError(input, "Enter a valid phone number (10–15 digits).");
            return false;
        }
    }

    if (input === passwordInput) {
        const hasUppercase = /[A-Z]/.test(value);
        const hasLowercase = /[a-z]/.test(value);
        const hasNumber = /[0-9]/.test(value);
        const hasMinLength = value.length >= 8;

        if (!hasMinLength || !hasUppercase || !hasLowercase || !hasNumber) {
            showError(
                input,
                "Use at least 8 characters, including uppercase, lowercase, and a number."
            );
            return false;
        }
    }

    clearError(input);
    return true;
}

// Validate while typing
inputs.forEach(function (input) {
    input.addEventListener("input", function () {
        validateInput(input);
        successMessage.textContent = "";
    });

    // Validate when leaving the field
    input.addEventListener("blur", function () {
        validateInput(input);
    });

    // Clear success message when editing
    input.addEventListener("focus", function () {
        successMessage.textContent = "";
    });
});

// Handle form submission
form.addEventListener("submit", function (event) {
    event.preventDefault();

    let isFormValid = true;

    inputs.forEach(function (input) {
        if (!validateInput(input)) {
            isFormValid = false;
        }
    });

if (isFormValid) {
    successMessage.textContent =
        "Account created successfully!";

    form.reset();

    inputs.forEach(function (input) {
        clearError(input);
    });
}

});
