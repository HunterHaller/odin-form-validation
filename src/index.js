import { isValid } from "date-fns";
import "./styles.css";

//ASSIGNMENT INSTRUCTIONS: "Add the JavaScript code that checks 
// validation as the user progresses through the form. 
// When a user leaves a form field, it should automatically 
// validate that field."

//Validation should be done during typing, not just on submission!

//When invalid, highlight in red or show an error message to guide the user.

//Throw error message if button is pushed while there are errors!

//<form> element has novalidate, so all validation is happening here!

//"If all is well and the form is “submitted”, give the user a high five."

//As shown in the linked pages, we can use event listeners set to 
//watch for "input" to update on every change to the input.
//We can also update on loss of focus with "blur" or "focusout".

//I'll set up a listener for each input box and within that, validate
//the input.

const submitButton = document.querySelector("#submitButton");

//===================================================

//EMAIL:

const email = document.querySelector("#email");
const emailError = document.querySelector("#emailError");

//Regex borrowed from mozilla.org:
const emailRegExp = /^[\w.!#$%&'*+/=?^`{|}~-]+@[a-z\d-]+(?:\.[a-z\d-]+)*$/i;

//isValidEmail: a function to check validity of a string as an email.
//EXECUTION: called inside of other functions.
const isValidEmail = () => {
  if (email.value.length == 0) {
    return false;
  }
  const validity = email.value.length !== 0 && emailRegExp.test(email.value);
  return validity;
};

const setEmailClass = (isValid) => {
  email.className = isValid ? "valid" : "invalid";
};

// Now we can rebuild our validation constraint
// Because we do not rely on CSS pseudo-class, we have to
// explicitly set the valid/invalid class on our email field.
setEmailClass(isValidEmail()); //Set email div's class based on whether the submitted email string is valid.


// Update error message and visibility
const updateEmailError = (isValid) => {
  if (isValid) {
    emailError.textContent = "And what an excellent address it is...";
    emailError.removeAttribute("class");
  } else {
    emailError.textContent = "Write thine address correctly, peasant!";
    emailError.setAttribute("class", "active");
  }
};

// Handle input event to update email validity
const handleEmailInput = () => {
  const validity = isValidEmail();
  setEmailClass(validity);
  updateEmailError(validity);
  console.log("Email input handled!");
};

//================================================

//COUNTRY:

const country = document.querySelector("#country");
const countryError = document.querySelector("#countryError");

const isValidCountry = () => {
  if (country.value.length == 0) {
    return false;
  } else {
    return true;
  }
};

const setCountryClass = (isValid) => {
  country.className = isValid ? "valid" : "invalid";
};

const updateCountryError = (isValid) => {
  if (isValid) {
    countryError.textContent = "And what an excellent country it is...";
    countryError.removeAttribute("class");
  } else {
    countryError.textContent = "Select a country, peasant!";
    countryError.setAttribute("class", "active");
  }
};

const handleCountryInput = () => {
  const validity = isValidCountry();
  setCountryClass(validity);
  updateCountryError(validity);
  console.log("Country input handled!");
}

//===================================================

//POSTAL CODE

const postalCode = document.querySelector("#postalCode");
const postalError = document.querySelector("#postalError");

const isValidPostal = () => {
  if (postalCode.value.length == 0 || postalCode.value < 1) {
    return false;
  } else {
    return true;
  }
};

const setPostalClass = (isValid) => {
  postalCode.className = isValid ? "valid" : "invalid";
};

const updatePostalError = (isValid) => {
  if (isValid) {
    postalError.textContent = "A fine area I have meant to visit mineself!";
    postalError.removeAttribute("class");
  } else {
    postalError.textContent = "Enter a code of the post, peasant!";
    postalError.setAttribute("class", "active");
  }
};

const handlePostalInput = () => {
  const validity = isValidPostal();
  setPostalClass(validity);
  updatePostalError(validity);
  console.log("Handled postal input!");
};

//===================================================

//PASSWORD:

//Regex:
// So I'm trying to take this moment to learn some regex! Just getting down what all the characters mean and how to use it.
// While the email regex was looking to have the string match a specific type that was focused on excluding characters,
// for the password field I was to force inclusion of characters. Thus it should be marked invalid if it PASSES checks with MISSING characters, yes?
// e.g. b1ngo* would pass the test ^[\w*]$, but NOT ^[\w]$, which would bump it out due to having the *. Thus, we can force inclusion of * or other
// special characters by saying that if the string passes an easier check, it's actually incorrect.
//Allowed to contain any alphanumeric character, but must contain a letter, a number, a special character, and be at least 8 characters long. 
const passwordRegExp = /^[\w.!@#$%^&*()-=_+]$/;

const password = document.querySelector("#password");
const passwordConfirm = document.querySelector("#passwordConfirm");

const passwordError = document.querySelector("#passwordError");
const passwordConfirmError = document.querySelector("#passwordConfirmError");

const isValidPassword = () => {
  if (password.value.length !== 0){
    if ((/^[\w]+$/).test(password.value)){ //Check for only alphanumeric:
      console.log("Oh no! Password contains only alphanumeric characters!");
      return false;
    } else if ((/^[\W]+$/).test(password.value)) { //Check for only NON-alphanumeric:
      console.log("Oh gee! Password contains only non-alphanumeric characters!");
      return false;
    } else if (password.value.length < 8) {
      return false;
    } else {
      console.log("Password contains both alphanumeric characters and a special character.");
      return true;
    }
  } else {
    return false;
  };
};

const setPasswordClass = (isValid) => {
  password.className = isValid ? "valid" : "invalid";
}

const updatePasswordError = (isValid) => {
  if (isValid) {
    passwordError.textContent = "A password so secure, even the mighty wizards of Ygtrafan could not divine it!";
    passwordError.removeAttribute("class");
  } else {
    passwordError.textContent = "Write down a suitable password, peasant!";
    passwordError.setAttribute("class", "active");
  }
};

const handlePasswordInput = () => {
  const validity = isValidPassword();
  setPasswordClass(validity);
  updatePasswordError(validity);
  console.log("Handled password input!");
};

const isSamePassword = () => {
  if (passwordConfirm.value.length > 0) {
    console.log("Password confirmation present, checking...");
    return (passwordConfirm.value == password.value);
  }
}

const setConfirmClass = (isValid) => {
  passwordConfirm.className = isValid ? "valid" : "invalid";
}

const updateConfirmError = (isValid) => {
  if (isValid){
    passwordConfirmError.textContent = "Excellent skills in matching, my lord.";
    passwordConfirmError.removeAttribute("class");
  } else {
    passwordConfirmError.textContent = "Thine passwords do not match in the slightest!!";
    passwordConfirmError.setAttribute("class", "active");
  }
}

const handleConfirmInput = () => {
  const validity = isSamePassword();
  setConfirmClass(validity);
  updateConfirmError(validity);
  console.log("Handled password confirmation input!");
}

//===================================================

// Handle form submission to show error if any input is invalid
const handleSubmit = (event) => {
  console.log("Testing submission...");

  event.preventDefault();

  let overallValidity = true;

  //EMAIL:
  const emailValidity = isValidEmail();
  setEmailClass(emailValidity);
  updateEmailError(emailValidity);
  if (emailValidity == false) {
    overallValidity = false;
  }

  //COUNTRY:
  const countryValidity = isValidCountry();
  setCountryClass(countryValidity);
  updateCountryError(countryValidity);
  if (countryValidity == false) {
    overallValidity = false;
  }

  //POSTAL CODE:
  const postalValidity = isValidPostal();
  setPostalClass(postalValidity);
  updatePostalError(postalValidity);
  if (postalValidity == false) {
    overallValidity = false;
  }

  //PASSWORD:
  const passwordValidity = isValidPassword();
  console.log("passwordValidity = " + isValidPassword());
  setPasswordClass(passwordValidity);
  updatePasswordError(passwordValidity);
  if (passwordValidity == false) {
    overallValidity = false;
  }

  //PASSWORD CONFIRM:
  const confirmValidity = isSamePassword();
  setConfirmClass(confirmValidity);
  updateConfirmError(confirmValidity);
  if (confirmValidity == false) {
    overallValidity = false;
  }
  

  //If all inputs are valid, display a message:
  if (overallValidity == true) {
    document.querySelector("#finalResult").textContent = "Excellent submission, my liege! The realm thanks you for your participation."
  }
};

// This defines what happens when the user types in the email field:
email.addEventListener("input", handleEmailInput);
country.addEventListener("input", handleCountryInput);
postalCode.addEventListener("input", handlePostalInput);
password.addEventListener("input", handlePasswordInput);
password.addEventListener("input", handleConfirmInput);

passwordConfirm.addEventListener("input", handlePasswordInput);
passwordConfirm.addEventListener("input", handleConfirmInput);

//PASSWORD:
//Could be made to include certain characters, but otherwise just
//a string of some length!

// CONFIRM PASSWORD:
//The only criteria on this is that it should match the above password
//input exactly.

// This defines what happens when the user tries to submit the data for ALL inputs:
submitButton.addEventListener("click", handleSubmit);