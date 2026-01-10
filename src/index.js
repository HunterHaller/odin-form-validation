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

//EMAIL:
//Emails needed to formatted correctly.

const email = document.querySelector("#email");
const emailError = document.querySelector("#emailError");

//Regex borrowed from mozilla.org:
const emailRegExp = /^[\w.!#$%&'*+/=?^`{|}~-]+@[a-z\d-]+(?:\.[a-z\d-]+)*$/i;

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

// Update error message and visibility
const updateError = (isValid) => {
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
  updateError(validity);
  console.log("Email input handled!");
};

// Handle form submission to show error if email is invalid
const handleSubmit = (event) => {
  console.log("Testing submission...");

  event.preventDefault();

  const validity = isValidEmail();
  setEmailClass(validity);
  updateError(validity);
};

// Now we can rebuild our validation constraint
// Because we do not rely on CSS pseudo-class, we have to
// explicitly set the valid/invalid class on our email field
setEmailClass(isValidEmail());
// This defines what happens when the user types in the field
email.addEventListener("input", handleEmailInput);
// This defines what happens when the user tries to submit the data
submitButton.addEventListener("click", handleSubmit);

//COUNTRY:
//Country will just be within a droplist, only need to confirm that
//the user has selected an option from the list.

//POSTAL CODE:
//Should be confirmed to be a number greater than 0.

//PASSWORD:
//Could be made to include certain characters, but otherwise just
//a string of some length!

// CONFIRM PASSWORD:
//The only criteria on this is that it should match the above password
//input exactly.