document.addEventListener("DOMContentLoaded", () => {
    const forms = document.querySelectorAll("form");

    forms.forEach((form) => {
        form.addEventListener("submit", (e) => {
            let isValid = true;
            const errorMessages = form.querySelectorAll(".error");
            errorMessages.forEach((error) => error.remove());

            // Name validation
            const name = form.querySelector('[name="name"]') || form.querySelector('[name="feedback-name"]');
            if (!name.value.trim()) {
                isValid = false;
                showError(name, "Name is required");
            }

            // Email validation
            const email = form.querySelector('[name="email"]') || form.querySelector('[name="feedback-email"]');
            if (!email.value.trim() || !validateEmail(email.value)) {
                isValid = false;
                showError(email, "Please enter a valid email address");
            }

            // Phone validation (for the Suggest a Recipe form only)
            const phone = form.querySelector('[name="phone"]');
            if (phone && !validatePhone(phone.value)) {
                isValid = false;
                showError(phone, "Please enter a valid phone number");
            }

            if (!isValid) {
                e.preventDefault();
            }
        });
    });

    function showError(input, message) {
        const error = document.createElement("div");
        error.className = "error";
        error.textContent = message;
        input.insertAdjacentElement("afterend", error);
    }

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    function validatePhone(phone) {
        const re = /^\d{10}$/; // Assumes a 10-digit phone number
        return re.test(phone);
    }
});
