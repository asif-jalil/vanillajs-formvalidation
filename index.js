const contactForm = document.querySelector("#contactForm");
const alertToast = document.querySelector("#alertToast");
const alertMsg = document.querySelector("#alertMsg");
const nameEl = document.querySelector("#name");
const usernameEl = document.querySelector("#username");
const emailEl = document.querySelector("#email");
const passwordEl = document.querySelector("#password");
const cPasswordEl = document.querySelector("#cPassword");
const openEyeEls = document.querySelectorAll(".openEye");
const closeEyeEls = document.querySelectorAll(".closeEye");
const openEyeElsArr = Array.from(openEyeEls);
const closeEyeElsArr = Array.from(closeEyeEls);
let contactData = {
    name: "",
    username: "",
    email: "",
    phone: "",
    password: "",
    cPassword: "",
    fbUrl: "",
    slug: "",
};

function showError(el, msg) {
    let label = document.createElement("label");
    label.className = "error";
    label.innerHTML = msg;
    el.parentElement.insertAdjacentElement("beforeend", label);
}

function showAlert(type, msg) {
    let icon;
    alertToast.className = `toast align-items-center bg-${type}`;
    if (type === "danger") {
        icon = `<i class="fas fa-times-circle"></i>`;
    } else {
        icon = `<i class="fas fa-check-circle"></i>`;
    }
    alertMsg.innerHTML = icon + " " + `<span>${msg}</span>`;

    const toast = new bootstrap.Toast(alertToast, {
        delay: 3500,
    });
    toast.show();
}

function handleInputChange(event) {
    let isValidate;
    let errorMsg;
    const lastChild = event.target.parentElement.lastElementChild;

    if (lastChild.classList.contains("error")) {
        lastChild.remove();
    }

    if (event.target.name === "name") {
        const re = /^[a-zA-Z\s]{3,}$/;
        errorMsg = "Allowed characters: letters and space only";
        isValidate = re.test(event.target.value);
    }

    if (event.target.name === "username") {
        const re = /^[\w]{3,}$/;
        errorMsg = "Allowed characters: letter, number, underscore(_) only";
        isValidate = re.test(event.target.value);
    }

    if (event.target.name === "email") {
        const re = /^[\S]+@[\w]+.[\w]+$/;
        errorMsg = "Please provide Actual email format";
        isValidate = re.test(event.target.value);
    }

    if (event.target.name === "phone") {
        const re = /\+?(88)?01[\d]{9}/;
        errorMsg = "Only BD numbers available";
        isValidate = re.test(event.target.value);
    }

    if (event.target.name === "password") {
        const re = /^(?=.*\d)(?=.*[a-zA-z])[\w\s!@#$%&]{6,}$/;
        errorMsg =
            "Password must contains a letter, a number & minimum 6 character or more. Allowed characters: uppercase, lowercase, number, space, !, @, #, $, %, &";
        isValidate = re.test(event.target.value);
    }

    if (event.target.name === "cPassword") {
        const re = /^(?=.*\d)(?=.*[a-zA-z])[\w\s!@#$%&]{6,}$/;
        errorMsg =
            "Password must contains a letter, a number & minimum 6 character or more. Allowed characters: uppercase, lowercase, number, space, !, @, #, $, %, &";
        isValidate = re.test(event.target.value);
    }

    if (event.target.name === "fbUrl") {
        const re = /(http(s)?:\/\/)?(www.)?[a-zA-Z0-9@:%\._\+~#=]{2,}\.[a-z]{2,6}[a-zA-Z0-9@:%\-_\+\.~#?&//=]{0,}/gi;
        errorMsg = "Please provide a valid URL";
        isValidate = re.test(event.target.value);
    }

    if (event.target.name === "slug") {
        const re = /^[a-z0-9-]+$/gi;
        errorMsg = "Please provide a valid slug";
        isValidate = re.test(event.target.value);
    }

    if (isValidate) {
        contactData = { ...contactData, [event.target.name]: event.target.value };
    } else {
        showError(event.target, errorMsg);
    }
}

contactForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const { name, username, email, phone, password, cPassword, fbUrl, slug } = contactData;

    if (contactData) {
        if ((name, username, email, password, cPassword)) {
            if (password === cPassword) {
                console.log(contactData);
                showAlert("success", "You have successfully submit your data. Thank you.");
                this.reset();
            } else {
                showAlert("danger", "Password and confirm password not matched");
            }
        } else {
            !name && showError(nameEl, "Full Name is required");
            !username && showError(usernameEl, "Username is required");
            !email && showError(emailEl, "Email is required");
            !password && showError(passwordEl, "Password is required");
            !cPassword && showError(cPasswordEl, "Confirm Password is required");

            showAlert("danger", "Please provide all required field");
        }
    }
});

function showOrHidePassword(event) {
    let targetInput = event.target.parentElement.nextElementSibling;

    event.target.classList.add("d-none");
    if (event.target.classList.contains("openEye")) {
        event.target.nextElementSibling.classList.remove("d-none");
    } else {
        event.target.previousElementSibling.classList.remove("d-none");
    }

    if (targetInput.getAttribute("type") === "password") {
        targetInput.setAttribute("type", "text");
    } else {
        targetInput.setAttribute("type", "password");
    }
}

openEyeElsArr.forEach((el) => {
    el.addEventListener("click", (e) => showOrHidePassword(e));
});

closeEyeElsArr.forEach((el) => {
    el.addEventListener("click", (e) => showOrHidePassword(e));
});
